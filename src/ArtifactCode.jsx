import React, { useState } from 'react';
import { ChevronRight, ChevronDown, ChevronUp, Type, AlignLeft, BarChart2, MousePointer, Sparkles } from 'lucide-react';

const ToggleSwitch = ({ isOn, onToggle }) => (
  <button
    className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
      isOn ? 'bg-purple-500' : 'bg-gray-300'
    }`}
    onClick={onToggle}
  >
    <div
      className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
        isOn ? 'translate-x-6' : 'translate-x-0'
      }`}
    />
  </button>
);

const SectionTitle = ({ icon: Icon, title, isExpanded, onToggle }) => (
  <div
    className="flex items-center justify-between py-3 cursor-pointer"
    onClick={onToggle}
  >
    <div className="flex items-center">
      <Icon size={20} className="mr-2 text-gray-600" />
      <h3 className="font-semibold text-gray-800">{title}</h3>
    </div>
    {isExpanded ? (
      <ChevronUp size={20} className="text-gray-400" />
    ) : (
      <ChevronDown size={20} className="text-gray-400" />
    )}
  </div>
);

const AutoApplyButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mb-4"
  >
    <Sparkles className="w-5 h-5 text-blue-500" />
    <span className="text-gray-700 font-medium">Auto-apply</span>
  </button>
);

const ChartSettingsUI = () => {
  const [settings, setSettings] = useState({
    titleAndLabels: {
      title: true,
      subtitle: false,
      source: false,
      dataLabels: true,
    },
    xAxis: {
      title: true,
      label: true,
      scale: false,
    },
    yAxis: {
      title: true,
      label: true,
      scale: false,
    },
    interaction: {
      tooltips: true,
      animations: false,
      filter: false,
      legend: true,
    },
  });

  const [expandedSections, setExpandedSections] = useState({
    titleAndLabels: true,
    xAxis: false,
    yAxis: false,
    interaction: false,
  });

  const [activeTab, setActiveTab] = useState('customize');
  const [interactionOption, setInteractionOption] = useState('option1');

  const toggleSection = (section) => {
    if (interactionOption === 'option1') {
      setExpandedSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    } else {
      setExpandedSections(prev => {
        const newState = Object.keys(prev).reduce((acc, key) => {
          acc[key] = key === section ? !prev[key] : false;
          return acc;
        }, {});
        return newState;
      });
    }
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

  const autoApply = () => {
    const newSettings = { ...settings };
    const newExpandedSections = { ...expandedSections };
    let totalOptions = 0;
    let changedOptions = 0;

    Object.keys(newSettings).forEach(section => {
      newExpandedSections[section] = true;
      Object.keys(newSettings[section]).forEach(option => {
        totalOptions++;
        if (Math.random() < 0.8) {
          newSettings[section][option] = Math.random() < 0.5;
          changedOptions++;
        }
      });
    });

    while (changedOptions < Math.round(totalOptions * 0.8)) {
      const randomSection = Object.keys(newSettings)[Math.floor(Math.random() * Object.keys(newSettings).length)];
      const randomOption = Object.keys(newSettings[randomSection])[Math.floor(Math.random() * Object.keys(newSettings[randomSection]).length)];
      if (newSettings[randomSection][randomOption] === settings[randomSection][randomOption]) {
        newSettings[randomSection][randomOption] = !newSettings[randomSection][randomOption];
        changedOptions++;
      }
    }

    setSettings(newSettings);
    setExpandedSections(newExpandedSections);
    console.log('Auto-apply triggered: 80% of options randomized and all accordions opened');
  };

  const renderSection = (section, icon, title, isLast = false) => (
    <div className={`${isLast ? '' : 'border-b border-gray-200'} pb-2`}>
      <SectionTitle
        icon={icon}
        title={title}
        isExpanded={expandedSections[section]}
        onToggle={() => toggleSection(section)}
      />
      {expandedSections[section] && (
        <div className="ml-6 mb-2">
          {Object.entries(settings[section]).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2">
              <span className="text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <div className="flex items-center">
                <ToggleSwitch isOn={value} onToggle={() => toggleSetting(section, key)} />
                <ChevronRight size={20} className="ml-2 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 relative">
      <div className="absolute top-4 left-4 flex space-x-2">
        <button
          className={`px-3 py-1 rounded ${interactionOption === 'option1' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setInteractionOption('option1')}
        >
          Option 1
        </button>
        <button
          className={`px-3 py-1 rounded ${interactionOption === 'option2' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setInteractionOption('option2')}
        >
          Option 2
        </button>
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div 
          className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden" 
          style={{ 
            height: '90vh', 
            maxHeight: '1068px'
          }}
        >
          <div className="h-full flex flex-col">
            <div className="px-4 py-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <BarChart2 size={20} className="mr-2" />
                  <span className="font-semibold text-gray-800">Bar chart</span>
                </div>
                <ChevronDown size={20} className="text-gray-400" />
              </div>
              
              <div className="flex mb-6 border-b border-gray-200">
                <button
                  className={`flex-1 text-center pb-2 ${activeTab === 'data' ? 'text-purple-600 font-semibold border-b-2 border-purple-600' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('data')}
                >
                  Data
                </button>
                <button
                  className={`flex-1 text-center pb-2 ${activeTab === 'customize' ? 'text-purple-600 font-semibold border-b-2 border-purple-600' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('customize')}
                >
                  Customize
                </button>
              </div>

              <AutoApplyButton onClick={autoApply} />
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-5">
              <div className="space-y-2">
                {renderSection('titleAndLabels', Type, 'Title and labels')}
                {renderSection('xAxis', AlignLeft, 'X axis')}
                {renderSection('yAxis', BarChart2, 'Y axis')}
                {renderSection('interaction', MousePointer, 'Interaction', true)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSettingsUI;
