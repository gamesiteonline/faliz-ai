import React from 'react';
import { GlassCard } from '../shared/GlassCard';
import { ListTodo } from 'lucide-react';
import { useGetTasksQuery } from '@/store/api/tasks.api';

const TaskSummary: React.FC = () => {
  const { data: tasks, isLoading, isError } = useGetTasksQuery();

  if (isLoading) return <GlassCard title="Task Summary"><p>Loading tasks...</p></GlassCard>;
  if (isError) return <GlassCard title="Task Summary"><p className="text-danger">Failed to load tasks.</p></GlassCard>;

  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter(task => task.status === 'completed').length || 0;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <GlassCard title="Task Summary" icon={<ListTodo size={20} className="text-oracle-DEFAULT" />}>
      <div className="space-y-2">
        <p className="text-falizText">Total Tasks: <span className="font-semibold">{totalTasks}</span></p>
        <p className="text-falizText">Completed: <span className="font-semibold text-success">{completedTasks}</span></p>
        <p className="text-falizText">Pending: <span className="font-semibold text-warning">{pendingTasks}</span></p>
      </div>
    </GlassCard>
  );
};

export default TaskSummary;
