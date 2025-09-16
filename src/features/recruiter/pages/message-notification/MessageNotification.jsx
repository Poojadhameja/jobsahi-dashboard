import React, { useState } from 'react'
import {
  LuBell,
  LuMessageSquare,
} from "react-icons/lu";
import { MatrixCard } from "../../../admin/components/metricCard";
import { PillNavigation } from "../../../../shared/components/navigation";
import MessagesCenter from "./Message";
import Notifications from "./Notifications";

const MessageNotification = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Navigation tabs configuration
  const navigationTabs = [
    { id: 'messages', label: 'Messages', icon: LuMessageSquare },
    { id: 'notifications', label: 'Notifications', icon: LuBell }
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-6">
        <MatrixCard 
          title="Message & Notification Center"
          subtitle="Communicate with candidates and manage notifications efficiently"
          className="mb-6"
        />
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <PillNavigation 
            tabs={navigationTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Action Link */}
        <div className="flex justify-end mb-4">
          <a
            href="#templates"
            className="text-sm text-[#0B537D] underline underline-offset-2 hover:text-[#5B9821] transition-colors"
          >
            View All Templates
          </a>
        </div>
      </div>

      {/* Main content will be rendered based on activeTab */}
      <div className="max-w-6xl mx-auto">
        {activeTab === 0 ? (
          <MessagesCenter />
        ) : (
          <Notifications />
        )}
      </div>
    </div>
  )
}

export default MessageNotification
