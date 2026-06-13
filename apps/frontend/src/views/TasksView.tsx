import React from 'react';
import { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from '@/store/api/tasks.api';
import { Task } from '@/types/task.types';
import { GlassCard } from '@/components/shared/GlassCard';
import { ListTodo, PlusCircle, Edit, Trash2, CheckCircle } from 'lucide-react';
import { OracleButton } from '@/components/shared/OracleButton';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  status: z.enum(['pending', 'in-progress', 'completed']).default('pending'),
});

type TaskFormInputs = z.infer<typeof taskSchema>;

const TasksView: React.FC = () => {
  const { data: tasks, isLoading, isError, refetch } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormInputs>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskFormInputs) => {
    try {
      await addTask(data).unwrap();
      reset();
      refetch();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      await updateTask({ id: task.id, updates: { status: task.status === 'completed' ? 'pending' : 'completed' } }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p className="text-danger">Error loading tasks.</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-syne font-bold text-falizText mb-6">Your Tasks</h1>

      <GlassCard title="Add New Task" icon={<PlusCircle size={20} className="text-cyber-DEFAULT" />}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Task Title"
              {...register("title")}
              className="w-full p-2 rounded bg-void border border-falizBorder focus:outline-none focus:ring-1 focus:ring-oracle-DEFAULT"
            />
            {errors.title && <p className="text-danger text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <textarea
              placeholder="Description (optional)"
              {...register("description")}
              rows={3}
              className="w-full p-2 rounded bg-void border border-falizBorder focus:outline-none focus:ring-1 focus:ring-oracle-DEFAULT"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-falizMutedText mb-1">Due Date</label>
              <input
                type="date"
                {...register("dueDate")}
                className="w-full p-2 rounded bg-void border border-falizBorder focus:outline-none focus:ring-1 focus:ring-oracle-DEFAULT"
              />
            </div>
            <div>
              <label className="block text-sm text-falizMutedText mb-1">Priority</label>
              <select
                {...register("priority")}
                className="w-full p-2 rounded bg-void border border-falizBorder focus:outline-none focus:ring-1 focus:ring-oracle-DEFAULT"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <OracleButton type="submit" className="w-full">
            <PlusCircle size={18} className="mr-2" /> Add Task
          </OracleButton>
        </form>
      </GlassCard>

      <GlassCard title="All Tasks" icon={<ListTodo size={20} className="text-oracle-DEFAULT" />} className="mt-6">
        {tasks && tasks.length > 0 ? (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between bg-elevated p-3 rounded-lg border border-falizBorder">
                <div className="flex-1">
                  <h3 className={`font-semibold text-falizText ${task.status === 'completed' ? 'line-through opacity-70' : ''}`}>{task.title}</h3>
                  {task.description && <p className="text-falizMutedText text-sm mt-1">{task.description}</p>}
                  <div className="flex items-center text-xs text-falizMutedText mt-2 space-x-3">
                    {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                    <span className={`capitalize ${task.priority === 'high' ? 'text-danger' : task.priority === 'medium' ? 'text-warning' : ''}`}>Priority: {task.priority}</span>
                    <span className="capitalize">Status: {task.status}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <OracleButton onClick={() => handleToggleComplete(task)} className="p-2 bg-transparent hover:bg-falizMuted">
                    <CheckCircle size={20} className={task.status === 'completed' ? 'text-success' : 'text-falizMutedText'} />
                  </OracleButton>
                  <OracleButton onClick={() => handleDelete(task.id)} className="p-2 bg-transparent hover:bg-falizMuted">
                    <Trash2 size={20} className="text-danger" />
                  </OracleButton>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-falizMutedText">No tasks found. Add one above!</p>
        )}
      </GlassCard>
    </div>
  );
};

export default TasksView;
