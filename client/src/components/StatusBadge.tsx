import { Badge } from "@/components/ui/badge";

type Status = "draft" | "pending" | "paid" | "overdue" | "approved" | "rejected";

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  pending: { label: "Pending", className: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  paid: { label: "Paid", className: "bg-chart-3/10 text-chart-3 border-chart-3/20" },
  overdue: { label: "Overdue", className: "bg-destructive/10 text-destructive border-destructive/20" },
  approved: { label: "Approved", className: "bg-chart-3/10 text-chart-3 border-chart-3/20" },
  rejected: { label: "Rejected", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={`${config.className} rounded-full`}
      data-testid={`badge-status-${status}`}
    >
      {config.label}
    </Badge>
  );
}
