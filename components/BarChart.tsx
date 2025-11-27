"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export const description = "An interactive bar chart";

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ChartBarProps {
  className?: string;
  data: { label: string; value: number; date: string }[];
  color?: string;
  title: string;
}

export function ChartBar({
  data,
  className,
  color = "--chart-1",
  title,
}: ChartBarProps) {
  return (
    <Card className="py-0">
      <CardHeader className="mt-2">
        <CardTitle className="font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className={cn("aspect-auto h-[180px] w-full", className)}
        >
          <BarChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="value"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />

            <Bar dataKey="value" fill={`var(${color})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
