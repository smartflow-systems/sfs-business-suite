import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, FileText, FileEdit, Clock, TrendingUp, Plus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 12400 },
  { month: "Feb", revenue: 14500 },
  { month: "Mar", revenue: 18200 },
  { month: "Apr", revenue: 21000 },
  { month: "May", revenue: 25400 },
  { month: "Jun", revenue: 32100 },
];

const recentInvoices = [
  { id: "INV-001", client: "Acme Corp", amount: "$2,450", status: "paid" as const, date: "2024-01-15" },
  { id: "INV-002", client: "TechStart Inc", amount: "$5,200", status: "pending" as const, date: "2024-01-14" },
  { id: "INV-003", client: "Global Solutions", amount: "$1,800", status: "overdue" as const, date: "2024-01-10" },
];

const pendingActions = [
  { type: "proposal", client: "New Client Co", action: "Review proposal", time: "2 hours ago" },
  { type: "invoice", client: "Acme Corp", action: "Send follow-up", time: "5 hours ago" },
  { type: "onboarding", client: "StartupXYZ", action: "Complete onboarding", time: "1 day ago" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold font-heading" data-testid="text-dashboard-title">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your business.</p>
        </div>
        <div className="flex gap-2">
          <Button data-testid="button-new-invoice">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
          <Button variant="outline" data-testid="button-new-proposal">
            <Plus className="h-4 w-4 mr-2" />
            New Proposal
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1% from last month"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Invoices Sent"
          value="23"
          change="+5 this month"
          icon={FileText}
          trend="up"
        />
        <StatCard
          title="Active Proposals"
          value="8"
          change="3 pending review"
          icon={FileEdit}
          trend="neutral"
        />
        <StatCard
          title="Pending Payments"
          value="$12,450"
          change="5 invoices overdue"
          icon={Clock}
          trend="down"
        />
      </div>

      <Card data-testid="card-revenue-chart">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-heading">Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the past 6 months</CardDescription>
            </div>
            <Button variant="outline" size="sm" data-testid="button-view-details">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--chart-1))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card data-testid="card-recent-invoices">
          <CardHeader>
            <CardTitle className="font-heading">Recent Invoices</CardTitle>
            <CardDescription>Latest invoices from your clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div 
                  key={invoice.id} 
                  className="flex items-center justify-between p-4 rounded-md border hover-elevate"
                  data-testid={`invoice-${invoice.id}`}
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">{invoice.client}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-semibold">{invoice.amount}</p>
                    <StatusBadge status={invoice.status} />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4" data-testid="button-view-all-invoices">
              View All Invoices
            </Button>
          </CardContent>
        </Card>

        <Card data-testid="card-pending-actions">
          <CardHeader>
            <CardTitle className="font-heading">Pending Actions</CardTitle>
            <CardDescription>Items that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingActions.map((action, index) => (
                <div 
                  key={index} 
                  className="flex items-start justify-between p-4 rounded-md border hover-elevate"
                  data-testid={`action-${index}`}
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{action.client}</p>
                    <p className="text-sm text-muted-foreground">{action.action}</p>
                    <p className="text-xs text-muted-foreground">{action.time}</p>
                  </div>
                  <Button size="sm" variant="outline" data-testid={`button-action-${index}`}>
                    Action
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
