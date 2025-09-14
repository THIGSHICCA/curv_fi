"use client";
import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import { FaUsers, FaDollarSign } from "react-icons/fa";

interface Props {
  total_budget: { min: number; max: number };
  allocation_breakdown: Array<{
    category: string;
    amount: { min: number; max: number };
    percentage: number;
  }>;
  fundManagement: string;
  clientCurrency: string;
  totalTeam?: number;
  totalCost?: number;
}

const COLORS = [
  "#059669",
  "#10B981",
  "#34D399",
  "#6EE7B7",
  "#A7F3D0",
  "#047857",
  "#065F46",
];

const BudgetVisualization: React.FC<Props> = ({
  total_budget,
  allocation_breakdown,
  fundManagement,
  clientCurrency,
  totalTeam = 5,
  totalCost,
}) => {
  const pieData = allocation_breakdown.map((item) => ({
    name: item.category,
    value: item.percentage,
  }));

  const barData = allocation_breakdown.map((item) => ({
    category: item.category,
    min: item.amount.min,
    max: item.amount.max,
  }));

  return (
    <div className="ml-0 md:ml-10 mt-10 md:mt-0 w-full max-w-4xl p-6 bg-viridian-50 rounded-3xl shadow-xl transition-all duration-500">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-viridian-900">
        Generated Budget
      </h2>

      {/* Budget & Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-5 bg-viridian-100 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <p className="text-sm text-viridian-700 font-semibold">
            Total Budget
          </p>
          <p className="text-2xl md:text-3xl font-bold text-viridian-900 mt-2">
            {total_budget.min.toLocaleString()} -{" "}
            {total_budget.max.toLocaleString()} {clientCurrency}
          </p>
        </div>

        <div className="p-5 bg-viridian-100 rounded-2xl shadow-md flex items-center gap-3 hover:shadow-lg transition-shadow">
          <div className="p-3 bg-viridian-200 text-viridian-900 rounded-full">
            <FaUsers size={24} />
          </div>
          <div>
            <p className="text-sm text-viridian-700 font-semibold">
              Total Team
            </p>
            <p className="text-xl md:text-2xl font-bold text-viridian-900">
              {totalTeam}
            </p>
          </div>
        </div>

        <div className="p-5 bg-viridian-100 rounded-2xl shadow-md flex items-center gap-3 hover:shadow-lg transition-shadow">
          <div className="p-3 bg-viridian-200 text-viridian-900 rounded-full">
            <FaDollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-viridian-700 font-semibold">
              Total Cost
            </p>
            <p className="text-xl md:text-2xl font-bold text-viridian-900">
              {totalCost?.toLocaleString() || total_budget.max.toLocaleString()}{" "}
              {clientCurrency}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start mb-8">
        {/* Pie Chart */}
        <div className="w-full md:w-2/3">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                label={false} // hide labels inside the pie
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="w-full md:w-1/3 flex flex-col justify-center gap-3">
          <h3 className="font-semibold text-viridian-800 mb-2 text-lg">
            Categories
          </h3>
          {allocation_breakdown.map((item, index) => (
            <div key={item.category} className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}></div>
              <p className="text-viridian-700 font-medium">
                {item.category} ({item.percentage}%)
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={barData}
          margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
          <XAxis dataKey="category" tick={{ fill: "#065F46" }} />
          <YAxis tick={{ fill: "#065F46" }} />
          <Tooltip />
          <Bar dataKey="min" stackId="a" fill="#34D399" radius={[5, 5, 0, 0]} />
          <Bar dataKey="max" stackId="a" fill="#059669" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Fund Management Advice */}
      <div className="p-5 bg-viridian-50/80 rounded-2xl border border-viridian-200 shadow-inner text-viridian-800 text-base mt-6">
        <p className="font-semibold mb-2">Fund Management Advice:</p>
        <p>{fundManagement}</p>
      </div>
    </div>
  );
};

export default BudgetVisualization;
