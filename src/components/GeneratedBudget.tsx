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
  suggested_team_size?: number;
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
  suggested_team_size = 5,
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
    <div
      className="p-6 rounded-3xl shadow-xl transition-all duration-500
                 bg-white/10 backdrop-blur-md border border-white/20">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-viridian-50">
        Generated Budget
      </h2>

      {/* Budget & Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          className="p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow 
                        bg-white/0 backdrop-blur-sm border border-white/30">
          <p className="text-sm text-viridian-50 font-semibold">Total Budget</p>
          <p className="text-2xl md:text-3xl font-bold text-viridian-50 mt-2">
            {total_budget.min.toLocaleString()} -{" "}
            {total_budget.max.toLocaleString()} {clientCurrency}
          </p>
        </div>

        <div
          className="p-5 rounded-2xl shadow-md flex items-center gap-3 hover:shadow-lg transition-shadow 
                        bg-white/0 backdrop-blur-sm border border-white/30">
          <div className="p-3 bg-white/30 rounded-full shadow-sm">
            <FaUsers size={24} className="text-viridian-50" />
          </div>
          <div>
            <p className="text-sm text-viridian-50 font-semibold">Total Team</p>
            <p className="text-xl md:text-2xl font-bold text-viridian-50">
              {suggested_team_size}
            </p>
          </div>
        </div>

        <div
          className="p-5 rounded-2xl shadow-md flex items-center gap-3 hover:shadow-lg transition-shadow 
                        bg-white/0 backdrop-blur-sm border border-white/30">
          <div className="p-3 bg-white/30 rounded-full shadow-sm">
            <FaDollarSign size={24} className="text-viridian-50" />
          </div>
          <div>
            <p className="text-sm text-viridian-50 font-semibold">Total Cost</p>
            <p className="text-xl md:text-2xl font-bold text-viridian-50">
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
                label={false}>
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
          <h3 className="font-semibold text-viridian-50 mb-2 text-lg">
            Categories
          </h3>
          {allocation_breakdown.map((item, index) => (
            <div key={item.category} className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}></div>
              <p className="text-viridian-50 font-medium">
                {item.category} ({item.percentage}%)
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className=" backdrop-blur-sm border border-white/30 p-4 rounded-2xl shadow-inner">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={barData}
            margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
            <XAxis dataKey="category" tick={{ fill: "#fff" }} />
            <YAxis tick={{ fill: "#fff" }} />
            <Tooltip />
            <Bar
              dataKey="min"
              stackId="a"
              fill="#34D399"
              radius={[5, 5, 0, 0]}
            />
            <Bar
              dataKey="max"
              stackId="a"
              fill="#059669"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Fund Management Advice */}
      <div
        className="p-5 mt-6 rounded-2xl shadow-inner 
                      bg-gradient-to-r from-viridian-400/20 to-viridian-950/30 backdrop-blur-sm border border-white/30 
                      text-viridian-50 text-base">
        <p className="font-semibold mb-2">Fund Management Advice:</p>
        <p>{fundManagement}</p>
      </div>
    </div>
  );
};

export default BudgetVisualization;
