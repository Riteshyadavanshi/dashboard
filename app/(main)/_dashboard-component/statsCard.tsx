import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

interface StatsCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}
export const StatsCard = ({ label, value, icon }: StatsCardProps) => {
  return (
    <Card className="flex-1 hover:bg-slate-100 transition-colors">
      <CardHeader className="font-semibold text-xl hover:text-indigo-600">
        {label}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">{value}</div>
          <div>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};
