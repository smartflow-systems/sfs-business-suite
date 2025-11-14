import { StatusBadge } from "../StatusBadge";

export default function StatusBadgeExample() {
  return (
    <div className="flex gap-2 flex-wrap p-4">
      <StatusBadge status="draft" />
      <StatusBadge status="pending" />
      <StatusBadge status="paid" />
      <StatusBadge status="overdue" />
      <StatusBadge status="approved" />
      <StatusBadge status="rejected" />
    </div>
  );
}
