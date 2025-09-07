import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { SupabaseAuthProvider } from "../auth/SupabaseAuthProvider";
import RequireAuth from "../auth/RequireAuth";
import { getPortalCoreConfig } from "../../lib/env";

interface PortalLayoutProps {
  children?: React.ReactNode;
}

export function PortalLayout({ children }: PortalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { enabled } = getPortalCoreConfig();

  if (!enabled) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portal Core Disabled</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            This feature is currently disabled. Set VITE_FEATURE_PORTAL_CORE=true to enable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <SupabaseAuthProvider>
      <RequireAuth>
        <div className="h-screen flex bg-background">
          <PortalSidebar isOpen={sidebarOpen} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <PortalHeader
              isSidebarOpen={sidebarOpen}
              onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            />
            
            <main className="flex-1 overflow-auto">
              <div className="h-full">
                {children || <Outlet />}
              </div>
            </main>
          </div>
        </div>
      </RequireAuth>
    </SupabaseAuthProvider>
  );
}

function PortalSidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-gray-900 text-white`}>
      <div className="p-4">
        <h2 className={`${isOpen ? 'block' : 'hidden'} text-xl font-bold`}>
          Portal Core
        </h2>
        <div className={`${isOpen ? 'hidden' : 'block'} text-center`}>
          <div className="w-8 h-8 bg-indigo-600 rounded mx-auto"></div>
        </div>
      </div>
      
      <nav className="mt-8">
        <a
          href="/portal"
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <span className="mr-3">📊</span>
          {isOpen && <span>Dashboard</span>}
        </a>
        <a
          href="/portal/client-updates"
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <span className="mr-3">📝</span>
          {isOpen && <span>Client Updates</span>}
        </a>
        <a
          href="/portal/profile"
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <span className="mr-3">👤</span>
          {isOpen && <span>Profile</span>}
        </a>
      </nav>
    </div>
  );
}

function PortalHeader({ 
  isSidebarOpen, 
  onMenuToggle 
}: { 
  isSidebarOpen: boolean; 
  onMenuToggle: () => void; 
}) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Portal Core
          </span>
          <button
            onClick={() => {
              // Sign out logic would go here
              window.location.href = '/portal/auth/signin';
            }}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
