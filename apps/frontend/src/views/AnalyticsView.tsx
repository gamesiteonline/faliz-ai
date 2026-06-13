import React from 'react';
import { GlassCard } from '@/components/shared/GlassCard';
import { BarChart2, TrendingUp, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const mockProductivityData = [
  { name: 'Mon', tasksCompleted: 4, focusHours: 3.5 },
  { name: 'Tue', tasksCompleted: 6, focusHours: 5.0 },
  { name: 'Wed', tasksCompleted: 3, focusHours: 2.0 },
  { name: 'Thu', tasksCompleted: 7, focusHours: 6.0 },
  { name: 'Fri', tasksCompleted: 5, focusHours: 4.0 },
  { name: 'Sat', tasksCompleted: 2, focusHours: 1.0 },
  { name: 'Sun', tasksCompleted: 1, focusHours: 0.5 },
];

const mockTaskStatusData = [
  { name: 'Completed', value: 70, fill: 'var(--color-success)' },
  { name: 'Pending', value: 20, fill: 'var(--color-warning)' },
  { name: 'Overdue', value: 10, fill: 'var(--color-danger)' },
];

const AnalyticsView: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-syne font-bold text-falizText mb-6">Analytics & Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard title="Weekly Productivity" icon={<TrendingUp size={20} className="text-oracle-DEFAULT" />}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockProductivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-muted)" />
              <XAxis dataKey="name" stroke="var(--color-muted-text)" />
              <YAxis stroke="var(--color-muted-text)" />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                itemStyle={{ color: 'var(--color-text)' }}
                labelStyle={{ color: 'var(--color-oracle)' }}
              />
              <Legend />
              <Line type="monotone" dataKey="tasksCompleted" stroke="var(--color-cyber)" name="Tasks Completed" />
              <Line type="monotone" dataKey="focusHours" stroke="var(--color-oracle)" name="Focus Hours" />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard title="Task Status Distribution" icon={<Activity size={20} className="text-cyber-DEFAULT" />}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockTaskStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-muted)" />
              <XAxis dataKey="name" stroke="var(--color-muted-text)" />
              <YAxis stroke="var(--color-muted-text)" />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                itemStyle={{ color: 'var(--color-text)' }}
                labelStyle={{ color: 'var(--color-oracle)' }}
              />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* More analytics widgets can be added here */}
    </div>
  );
};

export default AnalyticsView;
