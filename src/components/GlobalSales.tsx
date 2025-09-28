"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Static Sales Data (replace later with API/Power BI)
const data = [
  { country: "USA", sales: 1200000, trend: [900000, 1000000, 1100000, 1200000] },
  { country: "India", sales: 1500000, trend: [1200000, 1300000, 1400000, 1500000] },
  { country: "UK", sales: 900000, trend: [800000, 850000, 880000, 900000] },
  { country: "Japan", sales: 700000, trend: [650000, 670000, 690000, 700000] },
];

export default function GlobalSales() {
  // Switch mode: "static" or "powerbi"
  const [mode] = useState<"static" | "powerbi">("static");

  if (mode === "powerbi") {
    return (
      <div className="card p-4 h-[400px]">
        <h3 className="text-xl font-bold mb-4">🌍 Global Sales (Power BI)</h3>
        <iframe
          width="100%"
          height="100%"
          src="https://app.powerbi.com/view?r=YOUR_REPORT_ID"
          frameBorder="0"
          allowFullScreen={true}
          className="rounded-lg shadow-md"
        />
      </div>
    );
  }

  // Default: Static Mode
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Leaderboard */}
      <div className="card p-6">
        <h3 className="text-xl font-bold mb-4">🌍 Sales Leaderboard</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} layout="vertical" margin={{ top: 5, bottom: 5, left: 20 }}>
            <XAxis type="number" hide />
            <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
            <Bar dataKey="sales" fill="#4f46e5" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* KPI Cards with Sparkline */}
      <div className="grid grid-cols-2 gap-6">
        {data.map((item, idx) => (
          <div key={idx} className="card p-4">
            <h4 className="font-semibold">{item.country}</h4>
            <p className="text-[color:var(--color-primary)] font-bold">
              ${item.sales.toLocaleString()}
            </p>
            <ResponsiveContainer width="100%" height={50}>
              <LineChart data={item.trend.map((v, i) => ({ value: v, index: i }))}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}
