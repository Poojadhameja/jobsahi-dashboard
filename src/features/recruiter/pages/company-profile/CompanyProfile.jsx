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
import { MatrixCard } from "../../../../shared/components/metricCard";
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
    <div className="space-y-5">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-6">
        <MatrixCard 
          title="Company Profile & Settings"
          subtitle="Manage your company information and team settings"
          className="mb-6"
        />
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <PillNavigation 
            tabs={tabs}
            activeTab={activeIndex}
            onTabChange={setActiveIndex}
          />
        </div>
      </div>

      {/* Main content will be rendered based on activeTab */}
      <div className="max-w-6xl mx-auto">
        {activeTab === "company-info" && <CompanyInfo />}
        {activeTab === "team-management" && <TeamManagement />}
        {activeTab === "preferences" && <Preferences />}
      </div>
    </div>
  )
}

export default CompanyProfile
