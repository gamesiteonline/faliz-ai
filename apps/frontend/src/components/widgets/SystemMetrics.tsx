import React from 'react';
import { GlassCard } from '../shared/GlassCard';
import { Cpu, Memory, HardDrive, Network } from 'lucide-react';
import { useGetSystemMetricsQuery } from '@/store/api/system.api';

const SystemMetrics: React.FC = () => {
  const { data: metrics, isLoading, isError } = useGetSystemMetricsQuery();

  if (isLoading) return <GlassCard title="System Metrics"><p>Loading metrics...</p></GlassCard>;
  if (isError) return <GlassCard title="System Metrics"><p className="text-danger">Failed to load metrics.</p></GlassCard>;

  return (
    <GlassCard title="System Metrics" icon={<Cpu size={20} className="text-cyber-DEFAULT" />}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Cpu size={16} className="text-cyber-DEFAULT mr-2" />
            <span className="text-falizText">CPU:</span>
          </div>
          <span className="text-falizText font-semibold">{metrics?.cpuUsage.toFixed(1) || 'N/A'}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Memory size={16} className="text-cyber-DEFAULT mr-2" />
            <span className="text-falizText">RAM:</span>
          </div>
          <span className="text-falizText font-semibold">{metrics?.memoryUsage.toFixed(1) || 'N/A'}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <HardDrive size={16} className="text-cyber-DEFAULT mr-2" />
            <span className="text-falizText">Disk:</span>
          </div>
          <span className="text-falizText font-semibold">{metrics?.diskUsage.toFixed(1) || 'N/A'}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Network size={16} className="text-cyber-DEFAULT mr-2" />
            <span className="text-falizText">Net (DL/UL):</span>
          </div>
          <span className="text-falizText font-semibold">
            {(metrics?.networkActivity.download / 1024 / 1024).toFixed(2) || 'N/A'}MB/s / 
            {(metrics?.networkActivity.upload / 1024 / 1024).toFixed(2) || 'N/A'}MB/s
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

export default SystemMetrics;
