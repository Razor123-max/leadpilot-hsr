import { NavLink, Outlet, useLocation } from 'react-router';
import { LayoutDashboard, Users, UserRound, Kanban, Bell, Settings, ChevronRight } from 'lucide-react';
import { cn } from '../utils';

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { label: 'Lead Listing',    icon: Users,           path: '/leads'       },
    { label: 'Lead Details',    icon: UserRound,       path: '/leads/L-001' },
    { label: 'Lead Management', icon: Kanban,          path: '/management'  },
    { label: 'Dashboard',       icon: LayoutDashboard, path: '/'            },
  ];

  return (
    <aside className="w-64 bg-[#1E293B] text-white flex flex-col min-h-screen font-['Inter'] fixed top-0 left-0 bottom-0 z-50">
      {/* Brand */}
      <div className="h-20 flex items-center px-5 border-b border-slate-700/50">
        <img
          src="/hsr-logo.png"
          alt="HSR Motors"
          className="h-14 w-auto object-contain drop-shadow-lg"
        />
      </div>


      {/* Section Label */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Main Menu</p>
      </div>

      {/* Nav Links */}
      <div className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === '/leads' && location.pathname === '/leads') ||
            (item.path !== '/' && item.path !== '/leads' && location.pathname.startsWith(item.path));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={() => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-[#1A73E8] text-white shadow-md shadow-blue-900/30"
                  : "text-slate-300 hover:bg-slate-700/60 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4 transition-colors shrink-0",
                isActive ? "text-white" : "text-slate-400 group-hover:text-white"
              )} />
              {item.label}
              {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
            </NavLink>
          );
        })}
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-700/60 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center border-2 border-slate-600 shadow-sm">
            <span className="text-[11px] font-bold text-white">AK</span>
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Arjun Kapoor</p>
            <p className="text-xs text-slate-400">Sales Rep</p>
          </div>
          <Settings className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
        </button>
      </div>
    </aside>
  );
}

export function Layout() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-['Inter']">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider">HSR Motors</span>
            <span className="text-slate-300 mx-1">·</span>
            <span className="text-slate-400">Bangalore, Karnataka</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-[#F8FAFC]">
          <div className="max-w-[1200px] mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
