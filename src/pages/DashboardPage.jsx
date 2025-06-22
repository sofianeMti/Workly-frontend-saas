import React from "react";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import data from "../app/dashboard/data.json";
import { ChartRadarDots } from "@/components/chart-radar-dots";

function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-6">
      {/* <SectionCards /> */}
      <div className="w-full">
        <ChartAreaInteractive />
      </div>
      <div className="flex gap-4 w-full">
        <ChartRadarDots />
        <ChartRadarDots />
      </div>
      {/* <DataTable data={data} /> */}
    </div>
  );
}

export default DashboardPage;