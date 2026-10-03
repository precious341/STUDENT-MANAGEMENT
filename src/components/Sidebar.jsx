import React from 'react';
import { 
  LayoutGrid, 
  Users, 
  UserPlus, 
  BarChart2, 
  Settings, 
  GraduationCap, 
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({
  activeTab,
  setActiveTab,
  studentCount,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'students', label: 'Students', icon: Users, badge: studentCount },
    { id: 'registration', label: 'Registration', icon: UserPlus },
    { id: 'results', label: 'Results', icon: BarChart2 },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#1b43b6] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out
        lg:static lg:translate-x-0
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top Header & Brand */}
        <div>
          <div className="flex items-center gap-3 px-6 py-6 border-b border-blue-600/40">
            <div className="w-10 h-10 rounded-xl bg-blue-500/80 flex items-center justify-center text-white shadow-inner">
              <GraduationCap className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-none">EduRecords</h1>
              <p className="text-blue-200 text-xs mt-1 font-medium">Student management</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="px-4 py-6">
            <p className="px-3 text-[11px] font-semibold text-blue-200/70 tracking-wider uppercase mb-3">
              Main Menu
            </p>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpenMobile(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer
                      ${isActive 
                        ? 'bg-[#2952cc] text-white font-semibold shadow-sm' 
                        : 'text-blue-100/90 hover:bg-blue-600/30 hover:text-white'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-200'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span className={`
                        text-xs font-semibold px-2 py-0.5 rounded-full tabular-nums
                        ${isActive ? 'bg-white/20 text-white' : 'bg-blue-900/40 text-blue-200'}
                      `}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="pt-6 mt-6 border-t border-blue-600/30">
              <p className="px-3 text-[11px] font-semibold text-blue-200/70 tracking-wider uppercase mb-3">
                System
              </p>
              
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setIsOpenMobile(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer
                  ${activeTab === 'settings' 
                    ? 'bg-[#2952cc] text-white font-semibold shadow-sm' 
                    : 'text-blue-100/90 hover:bg-blue-600/30 hover:text-white'
                  }
                `}
              >
                <Settings className="w-4 h-4 text-blue-200" />
                <span>About & Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* User profile section at the bottom */}
        <div className="p-4 border-t border-blue-600/40">
          <div className="flex items-center justify-between p-2 rounded-xl bg-blue-900/30 border border-blue-500/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center tracking-tight shadow-sm">
                AR
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white leading-tight">Admin user</p>
                <p className="text-xs text-blue-200/80">Registrar</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('settings')}
              title="Registrar Settings"
              className="text-blue-200 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
