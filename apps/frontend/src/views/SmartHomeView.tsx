import React from 'react';
import { GlassCard } from '@/components/shared/GlassCard';
import { Lightbulb, Home } from 'lucide-react';

const SmartHomeView: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-syne font-bold text-falizText mb-6">Smart Home Control</h1>

      <GlassCard title="Connected Devices" icon={<Lightbulb size={20} className="text-oracle-DEFAULT" />}>
        <p className="text-falizMutedText">Integrate with Home Assistant to control your smart devices.</p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center bg-elevated p-3 rounded-lg border border-falizBorder">
            <Home size={20} className="mr-3 text-cyber-DEFAULT" />
            <span className="text-falizText">Living Room Lights</span>
            <span className="ml-auto text-falizMutedText">On</span>
          </li>
          <li className="flex items-center bg-elevated p-3 rounded-lg border border-falizBorder">
            <Home size={20} className="mr-3 text-cyber-DEFAULT" />
            <span className="text-falizText">Thermostat</span>
            <span className="ml-auto text-falizMutedText">22°C</span>
          </li>
        </ul>
        <p className="text-falizMutedText text-sm mt-4">More smart home controls and automations coming soon!</p>
      </GlassCard>
    </div>
  );
};

export default SmartHomeView;
