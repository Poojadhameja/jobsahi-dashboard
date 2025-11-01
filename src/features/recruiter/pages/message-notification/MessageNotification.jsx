import React, { useState } from "react";
import { LuMessageSquare, LuBell, LuFileText } from "react-icons/lu";
import { MatrixCard } from "@shared/components/metricCard";
import { PillNavigation } from "@shared/components/navigation";
import Message from "./Message";
import Notifications from "./Notifications";
import Templates from "./Templates";
const MessageNotification = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "messages",
      label: "Messages",
      icon: LuMessageSquare,
      component: <Message />
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: LuBell,
      component: <Notifications />
    },
    {
      id: "templates",
      label: "Templates",
      icon: LuFileText,
      component: <Templates />
    }
  ];

  return (
    <div className="space-y-5">
      {/* Header Section using MatrixCard */}
      <MatrixCard
        title="Messages & Notifications"
        subtitle="Manage your communication and notification settings"
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

export default MessageNotification;
