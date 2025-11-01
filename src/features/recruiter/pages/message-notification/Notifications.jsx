import React, { useState } from "react";
import { LuBell, LuCheck, LuX, LuUser, LuCalendar, LuFileText } from "react-icons/lu";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "application",
      title: "New Application Received",
      message: "John Doe applied for Software Engineer position",
      time: "2 hours ago",
      unread: true,
      icon: LuUser,
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      type: "interview",
      title: "Interview Scheduled",
      message: "Interview with Jane Smith scheduled for tomorrow at 2:00 PM",
      time: "4 hours ago",
      unread: true,
      icon: LuCalendar,
      iconColor: "text-[var(--color-secondary)]"
    },
    {
      id: 3,
      type: "document",
      title: "Document Uploaded",
      message: "Mike Johnson uploaded their resume",
      time: "1 day ago",
      unread: false,
      icon: LuFileText,
      iconColor: "text-purple-600"
    },
    {
      id: 4,
      type: "system",
      title: "System Update",
      message: "Your dashboard has been updated with new features",
      time: "2 days ago",
      unread: false,
      icon: LuBell,
      iconColor: "text-orange-600"
    }
  ]);

  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return notification.unread;
    return notification.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, unread: false }))
    );
  };

  const getNotificationBg = (notification) => {
    if (notification.unread) {
      return "bg-green-50";
    }
    return "bg-white";
  };

  return (
    <div className="p-2 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--color-secondary)] rounded-full flex items-center justify-center">
              <LuBell size={20} className="text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Notifications</h1>
          </div>
          <button
            onClick={markAllAsRead}
            className="px-3 py-2 text-xs sm:text-sm text-[var(--color-secondary)] border border-[var(--color-secondary)] rounded-lg hover:bg-[var(--color-secondary)] hover:text-white font-bold transition-colors w-full sm:w-auto"
          >
            Mark All as Read
          </button>
        </div>
        <p className="text-sm sm:text-base text-gray-600">Stay updated with your latest notifications</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2">
          {[
            { key: "all", label: "All" },
            { key: "unread", label: "Unread" },
            { key: "application", label: "Applications" },
            { key: "interview", label: "Interviews" },
            { key: "system", label: "System" }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                filter === tab.key
                  ? 'bg-[var(--color-secondary)] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className={`p-3 sm:p-4 rounded-lg border shadow-sm transition-colors ${getNotificationBg(notification)} ${
                  notification.unread ? 'border-green-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                      notification.type === 'application' ? 'bg-blue-100' :
                      notification.type === 'interview' ? 'bg-green-100' :
                      notification.type === 'document' ? 'bg-purple-100' :
                      'bg-orange-100'
                    }`}>
                      <IconComponent size={16} className={`${notification.iconColor} sm:hidden`} />
                      <IconComponent size={20} className={`${notification.iconColor} hidden sm:block`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 mb-2 text-xs sm:text-sm line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm text-gray-500">{notification.time}</span>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-[var(--color-secondary)] rounded-full"></div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 sm:gap-2 self-end sm:self-start">
                        {notification.unread && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1.5 sm:p-2 text-gray-400 hover:text-[var(--color-secondary)] hover:bg-green-100 rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <LuCheck size={14} className="sm:hidden" />
                            <LuCheck size={16} className="hidden sm:block" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete notification"
                        >
                          <LuX size={14} className="sm:hidden" />
                          <LuX size={16} className="hidden sm:block" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LuBell size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up! No new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;