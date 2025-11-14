import { StatCard } from "../StatCard";
import { DollarSign } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="p-4">
      <StatCard 
        title="Total Revenue"
        value="$45,231.89"
        change="+20.1% from last month"
        icon={DollarSign}
        trend="up"
      />
    </div>
  );
}
