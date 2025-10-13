import React from 'react'
import AppLayout from '../../../shared/components/AppLayout.jsx'
import Header from './AdminHeader.jsx'
import { adminSidebarItems } from './adminSidebarItems.jsx'

export default function AdminLayout() {
  return (
    <AppLayout header={Header} sidebarItems={adminSidebarItems} brand="JOBSAHI" roleLabel="Admin" />
  )
}
