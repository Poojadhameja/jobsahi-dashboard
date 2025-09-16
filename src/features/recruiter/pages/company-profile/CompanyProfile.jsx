import React, { useState } from "react";
import {
  LuBuilding2,
  LuUsers,
  LuSettings,
} from "react-icons/lu";

// Import components
import CompanyInfo from './CompanyInfo'
import TeamManagement from './TeamManagement'
import Preferences from './Preferences'
import { PillNavigation } from "@shared/components/navigation";
import { COLORS } from "@shared/WebConstant";

const CompanyProfile = () => {
  // Tab configuration
  const tabs = [
    { id: "company-info", label: "Company Info", icon: LuBuilding2 },
    { id: "team-management", label: "Team Management", icon: LuUsers },
    { id: "preferences", label: "Preferences", icon: LuSettings },
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = tabs[activeIndex]?.id || "company-info";

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.lightblue }}>
      {/* Title */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold" style={{ color: COLORS.PRIMARY }}>
            Company Profile &amp; Settings
          </h1>
          <p style={{ color: COLORS.GRAY_600 }}>
            Manage your company information and team settings
          </p>
        </div>

        {/* Tabs — USING YOUR PillNavigation */}
        <PillNavigation
          tabs={tabs}
          activeTab={activeIndex}
          onTabChange={setActiveIndex}
          className="mb-8"
        />

        {/* CONTENT */}
        {activeTab === "company-info" && <CompanyInfo />}
        {activeTab === "team-management" && <TeamManagement />}
        {activeTab === "preferences" && <Preferences />}
      </div>
    </div>
  )
}

export default CompanyProfile
