import React, { useState, ReactNode } from "react";

interface NavigationBarProps {
  tabs: {
    title: string;
    icon: ReactNode;
    content: React.ReactNode;
  }[];
}

const NavigationBar = ({ tabs }: NavigationBarProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-item ${activeTab === index ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.icon || tab.title}
          </div>
        ))}
      </div>
      <div className="tab-content">{tabs[activeTab].content}</div>
    </div>
  );
};

export default NavigationBar;
