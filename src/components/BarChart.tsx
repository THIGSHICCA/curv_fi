'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface AmountRange {
  min: number;
  max: number;
}

interface Allocation {
  category: string;
  amount: AmountRange;
}

interface BudgetBarChartProps {
  allocation_breakdown: Allocation[];
  budgetCurrency?: string;
}

const BudgetBarChart: React.FC<BudgetBarChartProps> = ({
  allocation_breakdown,
  budgetCurrency = 'USD',
}) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prepare chart data
  const chartData = allocation_breakdown.map((item) => ({
    name: item.category,
    min: item.amount?.min || 0,
    extra: (item.amount?.max || 0) - (item.amount?.min || 0),
  }));

  // Responsive adjustments
  const leftMargin = windowWidth < 640 ? 80 : 140; // small screens
  const chartHeight = Math.max(60 * chartData.length, 300);
  const barGap = windowWidth < 640 ? 10 : 20;

  return (
    <div className="mb-6 bg-white p-4 rounded-xl shadow border border-gray-200 ">
      <h3 className="text-xl font-semibold mb-4 text-center text-viridian-900">
        Allocation Breakdown
      </h3>

      <ResponsiveContainer width="100%" height={chartHeight}>
        
        <BarChart 

          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barGap={barGap}
        >
          <XAxis
            type="number"
            tick={{ fill: '#065f46', fontWeight: 500, fontSize: 12 }}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={leftMargin}
            tick={{ fill: '#065f46', fontWeight: 600, fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number, name, props) => {
              const item = props.payload;
              return `${budgetCurrency} ${item.min.toLocaleString()} - ${budgetCurrency} ${(item.min + item.extra).toLocaleString()}`;
            }}
          />
          <Legend verticalAlign="top" height={36} />

          {/* Bars */}
          
          <Bar dataKey="min" stackId="a" fill="#16a34a" name="Minimum" />
          <Bar dataKey="extra" stackId="a" fill="#a7f3d0" name="Extra (Min→Max)" radius={[0, 10, 10, 0]} />
          
        </BarChart>
      </ResponsiveContainer>
      
    </div>
  );
};

export default BudgetBarChart;
