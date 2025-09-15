import React, { useState } from 'react'
import { 
  LuTrendingUp, 
  LuHistory, 
  LuCreditCard, 
  LuStar 
} from 'react-icons/lu'
import { MatrixCard } from '../../components/metricCard'
import { PillNavigation } from '../../../../shared/components/navigation'
import RevenueDashboard from './revenue_dashboard'
import OrderHistory from './order_history'
import SubscriptionPlan from './subscription_plan'
import FeaturedContent from './featured_content'

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
                    titleColor="text-[#1A569A]"
                    subtitleColor="text-[#1A569A]"
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