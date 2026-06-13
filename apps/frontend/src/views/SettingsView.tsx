import React, { useState } from 'react';
import { GlassCard } from '@/components/shared/GlassCard';
import { Settings, User, Plug, Info } from 'lucide-react';

const SettingsView: React.FC = () => {
  const [activeSetting, setActiveSetting] = useState('general');

  const renderSettingContent = () => {
    switch (activeSetting) {
      case 'general':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-falizText">General Settings</h3>
            <p className="text-falizMutedText">Configure general application settings.</p>
            {/* Add general settings forms/components here */}
            <div className="bg-elevated p-4 rounded-lg border border-falizBorder">
              <label htmlFor="theme" className="block text-falizText mb-2">Theme</label>
              <select id="theme" className="w-full p-2 rounded bg-void border border-falizBorder focus:outline-none focus:ring-1 focus:ring-oracle-DEFAULT">
                <option>Deep Oracle (Dark)</option>
                <option disabled>Light (Coming Soon)</option>
              </select>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-falizText">Account Settings</h3>
            <p className="text-falizMutedText">Manage your FALIZ AI account and integrations.</p>
            {/* Add account settings forms/components here */}
            <div className="bg-elevated p-4 rounded-lg border border-falizBorder">
              <p className="text-falizText">Connected Accounts:</p>
              <ul className="list-disc list-inside text-falizMutedText mt-2">
                <li>Google Calendar</li>
                <li>Gmail</li>
                <li>Spotify</li>
              </ul>
              <button className="mt-4 px-4 py-2 bg-cyber-DEFAULT rounded-md text-white hover:bg-cyber-dim">Manage Integrations</button>
            </div>
          </div>
        );
      case 'plugins':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-falizText">Plugin Management</h3>
            <p className="text-falizMutedText">Enable or disable FALIZ AI plugins.</p>
            {/* Add plugin management components here */}
            <div className="bg-elevated p-4 rounded-lg border border-falizBorder">
              <div className="flex items-center justify-between mb-2">
                <span className="text-falizText">Voice Engine</span>
                <input type="checkbox" className="toggle toggle-oracle" defaultChecked />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-falizText">Calendar & Time</span>
                <input type="checkbox" className="toggle toggle-oracle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-falizText">Smart Home</span>
                <input type="checkbox" className="toggle toggle-oracle" />
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-falizText">About FALIZ AI</h3>
            <p className="text-falizMutedText">Information about your FALIZ AI system.</p>
            {/* Add about information here */}
            <div className="bg-elevated p-4 rounded-lg border border-falizBorder">
              <p className="text-falizText">Version: 1.0.0-production</p>
              <p className="text-falizText">Codename: ORACLE</p>
              <p className="text-falizText">Developed by: Manus AI</p>
              <p className="text-falizMutedText mt-2">Your life, intelligently orchestrated.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 flex h-full">
      <div className="w-1/4 pr-4 border-r border-falizBorder">
        <h1 className="text-2xl font-syne font-bold text-falizText mb-6">Settings</h1>
        <ul className="space-y-2">
          <li className={`p-2 rounded-md cursor-pointer ${activeSetting === 'general' ? 'bg-oracle-dim' : 'hover:bg-falizMuted'}`} onClick={() => setActiveSetting('general')}>
            <Settings size={18} className="inline-block mr-2" /> General
          </li>
          <li className={`p-2 rounded-md cursor-pointer ${activeSetting === 'account' ? 'bg-oracle-dim' : 'hover:bg-falizMuted'}`} onClick={() => setActiveSetting('account')}>
            <User size={18} className="inline-block mr-2" /> Account
          </li>
          <li className={`p-2 rounded-md cursor-pointer ${activeSetting === 'plugins' ? 'bg-oracle-dim' : 'hover:bg-falizMuted'}`} onClick={() => setActiveSetting('plugins')}>
            <Plug size={18} className="inline-block mr-2" /> Plugins
          </li>
          <li className={`p-2 rounded-md cursor-pointer ${activeSetting === 'about' ? 'bg-oracle-dim' : 'hover:bg-falizMuted'}`} onClick={() => setActiveSetting('about')}>
            <Info size={18} className="inline-block mr-2" /> About
          </li>
        </ul>
      </div>

      <div className="w-3/4 pl-4 overflow-y-auto">
        <GlassCard title="" className="h-full">
          {renderSettingContent()}
        </GlassCard>
      </div>
    </div>
  );
};

export default SettingsView;
