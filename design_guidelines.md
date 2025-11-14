# Design Guidelines: Business Management Platform

## Design Approach
**Reference-Based with Design System Foundation**

Primary references: Stripe Dashboard, FreshBooks, Linear
- Stripe's clarity and precision for financial data
- FreshBooks' approachable professionalism for invoicing
- Linear's modern typography and spacing for workflows

Rationale: B2B financial tools require trust through clarity, consistency, and professional polish while maintaining efficiency for daily use.

## Typography System

**Font Stack:**
- Primary: Inter (Google Fonts) - for UI, forms, tables
- Accent: Space Grotesk (Google Fonts) - for headings, CTAs

**Hierarchy:**
- Page Titles: text-4xl font-bold (Space Grotesk)
- Section Headers: text-2xl font-semibold (Space Grotesk)
- Card Titles: text-xl font-semibold (Inter)
- Body Text: text-base font-normal (Inter)
- Labels: text-sm font-medium uppercase tracking-wide (Inter)
- Metadata: text-sm font-normal (Inter)
- Fine Print: text-xs (Inter)

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16
- Tight spacing: p-2, gap-2 (within compact components)
- Standard spacing: p-4, gap-4, mb-6 (forms, cards)
- Section spacing: p-8, py-12, gap-8 (page sections)
- Page margins: p-16 (large desktop views)

**Grid Structure:**
- Dashboard: 12-column grid (grid-cols-12)
- Invoice/Proposal Lists: Single column cards with internal grid for data
- Forms: Two-column layout on desktop (grid-cols-2), single on mobile
- Document Preview: 60/40 split (preview/details)

**Container Widths:**
- Dashboard/App: max-w-7xl mx-auto
- Forms: max-w-4xl mx-auto
- Document Preview: max-w-6xl mx-auto

## Component Library

**Navigation:**
- Top bar: Fixed header with logo left, user profile/actions right, height h-16
- Sidebar: 240px wide, collapsible to 64px icon-only, fixed position
- Breadcrumbs: Below header for multi-level navigation

**Cards:**
- Invoice/Proposal Cards: Rounded-lg, border, p-6, with status badges, hover:shadow-md transition
- Stat Cards: Compact (p-4), display key metrics with icons, grid layout
- Document Preview: Large card with embedded iframe/canvas for PDF preview

**Tables:**
- Line Items: Striped rows, sticky header, editable cells
- Invoice List: Sortable columns, status indicators, action menu per row
- Responsive: Stack to cards on mobile

**Forms:**
- Input fields: Rounded-md, border, px-4 py-2, focus ring
- Labels: Font-medium, mb-2, required asterisk
- Field groups: Space-y-6 for vertical rhythm
- Multi-step forms: Progress indicator at top, prev/next buttons at bottom
- Invoice builder: Dynamic line item rows with add/remove buttons

**Buttons:**
- Primary: Rounded-md px-6 py-2.5 font-semibold
- Secondary: Border variant with transparent background
- Icon buttons: Square (w-10 h-10), rounded-md
- Action menu: Three-dot overflow menu for row actions

**Status & Badges:**
- Status pills: Rounded-full px-3 py-1 text-xs font-semibold
- States: Draft, Pending, Paid, Overdue, Approved, Rejected
- Placement: Top-right of cards, inline in tables

**Modals:**
- Document signer: Full-screen overlay with signature canvas centered
- Confirmation dialogs: Centered, max-w-md, rounded-lg
- Quick actions: Slide-over panel from right (w-96)

**Document Elements:**
- PDF Preview: Border, shadow-lg, embedded in 60% width container
- Signature Canvas: Border-dashed, min-h-48, with clear/save actions below
- Branding Upload: Image upload zone with drag-drop, preview thumbnail

**Dashboard Widgets:**
- Revenue chart: Line graph, h-64, with time period selector
- Recent activity: Timeline format, max 5 items with "view all" link
- Quick stats: 4-column grid (grid-cols-4) on desktop, stack on mobile
- Pending actions: Compact list with action buttons

## Icons
Use Heroicons (outline for default, solid for active states) via CDN
Key icons: DocumentText, CurrencyDollar, PencilSquare, CheckCircle, Clock, UserGroup

## Animations
Minimal, performance-focused:
- Transitions: transition-all duration-200 for hover states
- Loading states: Skeleton screens for table/card loading
- Status changes: Simple fade transition
- NO scroll animations, parallax, or complex interactions

## Images
**Hero Image:** No traditional hero section
**Branding:** Company logo upload in settings (max 200px width)
**Document Assets:** User-uploaded images for proposal customization
**Placeholder Images:** Use simple SVG placeholders for empty states (not photos)

## Page-Specific Layouts

**Dashboard:**
- Top: Stats grid (4 columns)
- Middle: Revenue chart (full width)
- Bottom: Two columns - Recent invoices (left), Pending actions (right)

**Invoice/Proposal Builder:**
- Left: Form with line items table, client selector, notes
- Right: Live preview card showing final document appearance
- Bottom: Save draft / Send buttons

**Client Onboarding:**
- Multi-step wizard (3-4 steps): Details → Documents → Signature → Complete
- Progress bar at top, centered form below, max-w-2xl

**Invoice List:**
- Filters bar: Status dropdown, date range, search input
- Table with sortable columns: Number, Client, Amount, Due Date, Status, Actions
- Pagination at bottom

This creates a professional, trustworthy interface optimized for frequent business use with clear information hierarchy and efficient workflows.