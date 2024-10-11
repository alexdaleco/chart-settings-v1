import React, { useState } from 'react';
import { ChevronRight, Type, Layers, AlignLeft, BarChart2, Sparkles } from 'lucide-react';

const ToggleSwitch = ({ isOn, onToggle }) => (
  <button
    className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
      isOn ? 'bg-purple-500' : 'bg-gray-300'
    }`}
    onClick={onToggle}
  >
    <div
      className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
        isOn ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

const SettingItem = ({ label, isOn, hasSubMenu, onToggle, disabled }) => (
  <div className={`flex items-center justify-between py-2 ${disabled ? 'opacity-50' : ''}`}>
    <span className="flex-grow">{label}</span>
    <div className="flex items-center">
      <ToggleSwitch isOn={isOn} onToggle={onToggle} />
      {hasSubMenu && <ChevronRight size={20} className="ml-2 text-gray-400" />}
    </div>
  </div>
);

const SectionTitle = ({ icon: Icon, title, isOn, onToggle, collapsible }) => (
  <div className={`flex items-center justify-between mt-6 mb-2 ${collapsible ? 'cursor-pointer' : ''}`} onClick={collapsible ? onToggle : undefined}>
    <div className="flex items-center">
      <Icon size={20} className="mr-2 text-gray-600" />
      <h3 className="font-semibold text-gray-700">{title}</h3>
    </div>
    <ToggleSwitch isOn={isOn} onToggle={(e) => {
      e.stopPropagation();
      onToggle();
    }} />
  </div>
);

const EnhanceButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mb-4"
  >
    <Sparkles className="w-5 h-5 text-blue-500" />
    <span className="text-gray-700 font-medium">Enhance</span>
  </button>
);

const ChartSettingsUI = () => {
  const [settings, setSettings] = useState({
    text: {
      enabled: true,
      chartTitle: true,
      chartSubtitle: true,
      source: false,
      dataLabels: false,
      totals: false,
    },
    elements: {
      enabled: true,
      legend: true,
      filter: false,
      gridLines: true,
    },
    horizontalAxis: {
      enabled: true,
      labels: true,
      title: true,
      scale: false,
    },
    verticalAxis: {
      enabled: true,
      labels: true,
      title: true,
      scale: false,
    },
  });

  const [option, setOption] = useState('collapsible');

  const toggleSection = (section) => {
    setSettings((prev) => {
      const newEnabledState = !prev[section].enabled;
      const updatedSection = Object.keys(prev[section]).reduce((acc, key) => {
        acc[key] = key === 'enabled' ? newEnabledState : newEnabledState;
        return acc;
      }, {});
      
      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  };

  const toggleSetting = (section, setting) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: !prev[section][setting],
      },
    }));
  };

  const enhanceAll = () => {
    setSettings(prev => {
      const enhanced = {};
      for (const section in prev) {
        enhanced[section] = Object.keys(prev[section]).reduce((acc, key) => {
          if (key === 'enabled') {
            acc[key] = true;
          } else {
            acc[key] = Math.random() < 0.85;
          }
          return acc;
        }, {});
      }
      return enhanced;
    });
  };

  const renderSection = (section, icon, title) => (
    <div className={option === 'collapsible' ? `transition-all duration-300 ease-in-out overflow-hidden ${settings[section].enabled ? 'max-h-96' : 'max-h-12'}` : ''}>
      <SectionTitle icon={icon} title={title} isOn={settings[section].enabled} onToggle={() => toggleSection(section)} collapsible={option === 'collapsible'} />
      {(option === 'non-collapsible' || settings[section].enabled) && 
        Object.entries(settings[section])
          .filter(([key]) => key !== 'enabled')
          .map(([key, value]) => (
            <SettingItem
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              isOn={value}
              hasSubMenu={true}
              onToggle={() => toggleSetting(section, key)}
              disabled={!settings[section].enabled}
            />
          ))
      }
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <div className="absolute top-4 left-4 flex space-x-4">
        <button 
          className={`pb-2 ${option === 'collapsible' ? 'text-purple-600 font-semibold border-b-2 border-purple-600' : 'text-gray-600'}`}
          onClick={() => setOption('collapsible')}
        >
          Option 1 (Collapsible)
        </button>
        <button 
          className={`pb-2 ${option === 'non-collapsible' ? 'text-purple-600 font-semibold border-b-2 border-purple-600' : 'text-gray-600'}`}
          onClick={() => setOption('non-collapsible')}
        >
          Option 2 (Non-collapsible)
        </button>
      </div>
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden" style={{ maxHeight: '1100px', height: '90vh' }}>
          <div className="px-4 py-5 h-full flex flex-col">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <BarChart2 size={20} className="mr-2" />
                  <span className="font-semibold">Bar chart</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
              
              <div className="flex space-x-4 mb-4">
                <button className="text-gray-600 pb-2">Data</button>
                <button className="text-purple-600 font-semibold pb-2 border-b-2 border-purple-600">Settings</button>
              </div>

              <EnhanceButton onClick={enhanceAll} />
            </div>

            <div className="flex-grow overflow-y-auto pr-2">
              {renderSection('text', Type, 'Text')}
              {renderSection('elements', Layers, 'Elements')}
              {renderSection('horizontalAxis', AlignLeft, 'Horizontal axis')}
              {renderSection('verticalAxis', BarChart2, 'Vertical axis')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSettingsUI;
