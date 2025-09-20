import React, { useState } from 'react'
import { 
  LuTrendingUp, 
  LuHistory, 
  LuCreditCard, 
  LuStar 
} from 'react-icons/lu'
import { MatrixCard } from '../../../../shared/components/metricCard'
import { PillNavigation } from '../../../../shared/components/navigation'
import RevenueDashboard from './RevenueDashboard'
import OrderHistory from './OrderHistory'
import SubscriptionPlan from './SubscriptionPlan'
import FeaturedContent from './FeaturedContent'

export default function BusinessRevenue() {
    const [activeTab, setActiveTab] = useState(0)
  
    const navigationTabs = [
        {
            id: 'revenue-dashboard',
            label: 'Revenue Dashboard',
            icon: LuTrendingUp
        },
        {
            id: 'order-history',
            label: 'Order history & Logs',
            icon: LuHistory
        },
        {
            id: 'subscription-plans',
            label: 'Subscription Plans',
            icon: LuCreditCard
        },
        {
            id: 'featured-content',
            label: 'Featured Content',
            icon: LuStar
        }
    ]

    return (
        <div className="min-h-screen ">
            {/* Header Section */}
            <div className="mb-5">
                <MatrixCard 
                    title="Business & Revenue Panel"
                    subtitle="Manage your revenue streams, subscriptions, and featured content"
                    titleColor="text-primary"
                    subtitleColor="text-primary"
                />
            </div>

            {/* Navigation Bar */}
            <div className="mb-5">
                <PillNavigation 
                    tabs={navigationTabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    className="justify-center"
                />
            </div>

            {/* Content Area */}
            <div>
                {activeTab === 0 && <RevenueDashboard />}
                {activeTab === 1 && <OrderHistory />}
                {activeTab === 2 && <SubscriptionPlan />}
                {activeTab === 3 && <FeaturedContent />}
            </div>
        </div>
    )
}