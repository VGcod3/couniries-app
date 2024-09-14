"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { usePopulationInfo } from "@/hooks/useCountries";
import { useCountryCode } from "@/hooks/useCountryCode";
import { Skeleton } from "./ui/skeleton";

export const description = "A line chart";

const chartConfig = {
  desktop: {
    label: "Population",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function PopulationChart() {
  const countryCode = useCountryCode();
  const { data, isPending, error } = usePopulationInfo(countryCode);

  if (isPending) {
    return <ChartSkeleton />;
  }

  if (error) {
    return (
      <h3 className="font-bold text-red-600 text-xl">Unable to load data</h3>
    );
  }

  const lastValue = data![data!.length - 1].value;
  const avgForLast20Years =
    data!.slice(-20).reduce((acc, curr) => acc + curr.value, 0) / 20;

  const percentageChange = Math.abs(
    ((lastValue - avgForLast20Years) / avgForLast20Years) * 100
  ).toFixed(2);

  const trendingUp = lastValue > avgForLast20Years;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Population Chart</CardTitle>
        <CardDescription>From 1961 - Till 2018</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 10,
              right: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="year" tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending {trendingUp ? "up" : "down"} by {percentageChange}% for the
          last 20 years
          {trendingUp ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing stats from 1961 to 2018
        </div>
      </CardFooter>
    </Card>
  );
}

const ChartSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Population Chart</CardTitle>
        <Skeleton className="w-32 h-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-[20vw] min-h-40" />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <Skeleton className="w-64 h-5" />
        </div>
        <div className="leading-none text-muted-foreground">
          <Skeleton className="w-80 h-4" />
        </div>
      </CardFooter>
    </Card>
  );
};
