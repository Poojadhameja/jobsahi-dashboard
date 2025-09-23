import React, { useState } from "react";
import { LuBuilding2, LuUsers, LuSettings } from "react-icons/lu";
import { MatrixCard } from "../../../../shared/components/metricCard";
import { PillNavigation } from "../../../../shared/components/navigation";
import InstituteProfile from "./InstituteProfile";
import StaffManagement from "./StaffManagement";
import NotificationPreferences from "./NotificationPreferences";

const ProfileSetting = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "institute-profile",
      label: "Institute Profile",
      icon: LuBuilding2,
      component: <InstituteProfile />
    },
    {
      id: "staff-management",
      label: "Staff Management",
      icon: LuUsers,
      component: <StaffManagement />
    },
    {
      id: "notification-preferences",
      label: "Notification Preferences",
      icon: LuSettings,
      component: <NotificationPreferences />
    }
  ];

  return (
    <div className="space-y-5">
      {/* Header Section using MatrixCard */}
      <MatrixCard
        title="Institute Settings"
        subtitle="Manage your institute profile and system settings"
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

export default ProfileSetting;

