import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  color?: "blue" | "green" | "purple" | "orange";
  icon?: React.ReactNode;
}

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className={`bg-card p-6 rounded border border-border`}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-muted-foreground text-sm font-medium">{label}</h4>
          <p className={`text-3xl font-bold text-primary mt-2`}>{value}</p>
        </div>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
    </div>
  );
}
