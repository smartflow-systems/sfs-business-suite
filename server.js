import express from "express";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Security: helmet sets secure HTTP headers
app.use(helmet());

// CORS: restrict to known origins in production
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
  : [];
app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? (allowedOrigins.length ? allowedOrigins : false)
    : "*",
  credentials: true,
}));

// Rate limiting: global API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

// Stricter limiter for lead submission
const leadsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many lead submissions, please try again later." },
});

app.use("/api/", apiLimiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Internal admin token check (set ADMIN_TOKEN env var)
function requireAdminToken(req, res, next) {
  const token = req.headers["x-admin-token"];
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken || token !== adminToken) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  next();
}

// Load config once at startup
const config = JSON.parse(readFileSync("./public/site.config.json", "utf-8"));

// Ensure data directory exists
const dataDir = "./data";
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Leads database file path
const leadsFile = join(dataDir, "leads.json");

// Initialize leads file if it doesn't exist
if (!existsSync(leadsFile)) {
  writeFileSync(leadsFile, JSON.stringify({ leads: [] }, null, 2));
}

// Helper: Read leads
function readLeads() {
  try {
    const data = readFileSync(leadsFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading leads file");
    return { leads: [] };
  }
}

// Helper: Write leads
function writeLeads(data) {
  try {
    writeFileSync(leadsFile, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing leads file");
    return false;
  }
}

// serve everything from /public
app.use(express.static("public"));

// health check
app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// API: Submit Lead
app.post("/api/leads", leadsLimiter, (req, res) => {
  try {
    const { firstName, lastName, email, company, phone, source } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, and email are required"
      });
    }

    // Validate input lengths to prevent oversized payloads slipping through
    if (
      typeof firstName !== "string" || firstName.length > 100 ||
      typeof lastName !== "string" || lastName.length > 100 ||
      typeof email !== "string" || email.length > 254
    ) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // Read existing leads
    const data = readLeads();

    // Check for duplicate email
    const existingLead = data.leads.find(lead => lead.email === email);
    if (existingLead) {
      return res.status(200).json({
        success: true,
        message: "Lead already exists",
        leadId: existingLead.id
      });
    }

    // Create new lead
    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      firstName,
      lastName,
      email,
      company: company || "",
      phone: phone || "",
      source: source || "direct",
      status: "new",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    data.leads.push(newLead);

    if (!writeLeads(data)) {
      throw new Error("Failed to save lead");
    }

    console.log("New lead captured");

    res.status(201).json({
      success: true,
      message: "Lead captured successfully",
      leadId: newLead.id
    });

  } catch (error) {
    console.error("Lead submission error");
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

// API: Get All Leads — requires admin token
app.get("/api/leads", requireAdminToken, (_req, res) => {
  try {
    const data = readLeads();
    res.json({
      success: true,
      count: data.leads.length,
      leads: data.leads
    });
  } catch (error) {
    console.error("Error fetching leads");
    res.status(500).json({
      success: false,
      message: "Failed to fetch leads"
    });
  }
});

// API: Stripe Checkout (placeholder)
app.post("/api/stripe/checkout", (req, res) => {
  try {
    const { planId } = req.body;

    // Validate planId is a simple alphanumeric string
    if (!planId || typeof planId !== "string" || !/^[a-zA-Z0-9_-]{1,64}$/.test(planId)) {
      return res.status(400).json({ success: false, message: "Invalid plan ID" });
    }

    const pricingData = JSON.parse(readFileSync("./public/pricing.json", "utf-8"));
    const plan = pricingData.plans.find(p => p.id === planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found"
      });
    }

    res.json({
      success: true,
      message: "Stripe integration pending",
      planId,
      plan: plan.name,
      price: plan.price,
      url: `/contact.html?plan=${encodeURIComponent(planId)}`
    });

  } catch (error) {
    console.error("Checkout error");
    res.status(500).json({
      success: false,
      message: "Failed to create checkout session"
    });
  }
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ success: false, message: "Internal server error" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`serving on ${port}`));
export default app;
