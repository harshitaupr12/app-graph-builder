import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Settings, User, Moon, Sun, LogOut, HelpCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-14 border-b border-gray-200/50 dark:border-gray-800/50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 sticky top-0 z-50"
    >
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <div className="w-4 h-4 border-2 border-white rounded" />
          </div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            App Graph Builder
          </h1>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, apps..."
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-all group relative"
          >
            <AnimatePresence mode="wait">
              {theme === 'light' ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-4 h-4 text-gray-600 group-hover:text-gray-900" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-4 h-4 text-gray-400 group-hover:text-gray-200" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </div>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors relative group"
            >
              <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowNotifications(false)}
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 rounded-xl backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <NotificationItem 
                        title="Service Down" 
                        message="Auth Service is experiencing issues"
                        time="2m ago"
                        type="error"
                      />
                      <NotificationItem 
                        title="High CPU Usage" 
                        message="API Gateway CPU at 85%"
                        time="5m ago"
                        type="warning"
                      />
                      <NotificationItem 
                        title="Deployment Success" 
                        message="Production API v2.1.0 deployed"
                        time="10m ago"
                        type="success"
                      />
                    </div>
                    <div className="p-2 border-t border-gray-200/50 dark:border-gray-700/50">
                      <button className="w-full px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        View All Notifications
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Settings */}
          <button className="w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors group relative">
            <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200" />
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              Settings
            </div>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              <User className="w-4 h-4 text-white" />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserMenu(false)}
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50">
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">Harshita Upreti</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">harshita@example.com</p>
                    </div>
                    <div className="p-1">
                      <MenuItem icon={User} label="Profile" onClick={() => console.log('Profile')} />
                      <MenuItem icon={Settings} label="Settings" onClick={() => console.log('Settings')} />
                      <MenuItem icon={HelpCircle} label="Help" onClick={() => console.log('Help')} />
                      <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                      <MenuItem icon={LogOut} label="Logout" onClick={() => console.log('Logout')} danger />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function NotificationItem({ 
  title, 
  message, 
  time, 
  type 
}: { 
  title: string; 
  message: string; 
  time: string; 
  type: 'error' | 'warning' | 'success';
}) {
  const colors = {
    error: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    warning: 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    success: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  };

  return (
    <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex items-start gap-3">
        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${colors[type]}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{message}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{time}</p>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ 
  icon: Icon, 
  label, 
  onClick,
  danger 
}: { 
  icon: React.ElementType; 
  label: string; 
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button 
      onClick={onClick}
      className={`w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-3 transition-colors text-left ${
        danger ? 'text-red-600 dark:text-red-400' : ''
      }`}
    >
      <Icon className={`w-4 h-4 ${danger ? '' : 'text-gray-600 dark:text-gray-400'}`} />
      <span className={`text-sm ${danger ? '' : 'text-gray-700 dark:text-gray-300'}`}>{label}</span>
    </button>
  );
}
