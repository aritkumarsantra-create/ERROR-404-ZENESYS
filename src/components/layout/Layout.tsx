import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { AddCustomerModal } from '../customers/AddCustomerModal';
import { CustomerDrawer } from '../customers/CustomerDrawer';
import { useCustomer } from '../../context/CustomerContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  const { selectedDrawerCustomer, setSelectedDrawerCustomer } = useCustomer();

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors flex">
      {/* Navigation Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <Topbar
          onOpenMobileMenu={() => setIsMobileOpen(true)}
          onOpenAddCustomer={() => setIsAddCustomerOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

      {/* Slide-over Customer Quick View Drawer */}
      <CustomerDrawer
        customer={selectedDrawerCustomer}
        onClose={() => setSelectedDrawerCustomer(null)}
      />

      {/* Add New Customer Modal */}
      <AddCustomerModal
        isOpen={isAddCustomerOpen}
        onClose={() => setIsAddCustomerOpen(false)}
      />
    </div>
  );
};
