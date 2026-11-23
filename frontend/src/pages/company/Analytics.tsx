import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

export const Analytics: React.FC = () => {
  const categoryData = [
    { name: 'Web Dev', count: 4, color: '#10B981' },
    { name: 'Graphic Design', count: 3, color: '#6366F1' },
    { name: 'Testing', count: 2, color: '#F59E0B' },
    { name: 'Video Editing', count: 2, color: '#EC4899' },
  ];

  const funnelData = [
    { stage: 'Views', value: 340 },
    { stage: 'Proposals', value: 85 },
    { stage: 'Shortlisted', value: 24 },
    { stage: 'Assigned', value: 12 },
    { stage: 'Delivered', value: 10 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Hiring Analytics & ROI</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Real-time metrics on candidate engagement, delivery speed, and category performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Projects by Category</h3>
              <p className="text-xs text-slate-500">Distribution of company project postings</p>
            </div>
            <Badge variant="indigo">Overview</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-2 text-xs">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600">{item.name} ({item.count})</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Hiring Funnel */}
        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Hiring Conversion Funnel</h3>
              <p className="text-xs text-slate-500">From project view to successful delivery</p>
            </div>
            <Badge variant="green">92% Completion</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical">
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis dataKey="stage" type="category" stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                  }}
                />
                <Bar dataKey="value" fill="#10B981" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
