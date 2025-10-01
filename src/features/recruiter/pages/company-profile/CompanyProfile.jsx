import React, { useState } from "react";
import { LuBuilding2, LuUsers, LuSettings } from "react-icons/lu";
import { MatrixCard } from "@shared/components/metricCard";
import { PillNavigation } from "@shared/components/navigation";
import CompanyInfo from "./CompanyInformation";
import TeamManagement from "./TeamManagement";
import Preferences from "./Preferences";

const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "company-info",
      label: "Company Info",
      icon: LuBuilding2,
      component: <CompanyInfo />
    },
    {
      id: "team-management",
      label: "Team Management",
      icon: LuUsers,
      component: <TeamManagement />
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: LuSettings,
      component: <Preferences />
    }
  ];

  return (
    <div className="space-y-5">
      {/* Header Section using MatrixCard */}
      <MatrixCard
        title="Company Profile & Settings"
        subtitle="Manage your company information and team settings"
        className=""
      />

      {/* Navigation Pills using PillNavigation */}
      <div className="flex justify-center">
        <PillNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className=""
        />
      </div>

      {/* Tab Content */}
      <div className="mt-5">
        {tabs[activeTab]?.component}
      </div>
    </div>
  );
};

export default CompanyProfile;