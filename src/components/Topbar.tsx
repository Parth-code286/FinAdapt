import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { useDebounce } from '@/hooks/useDebounce';

export function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const pageTitle = useMemo(() => {
    const path = location.pathname.replace('/', '');
    return path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || 'Dashboard';
  }, [location.pathname]);

  const unreadCount = useMemo(
    () => state.notifications.filter((n) => !n.read).length,
    [state.notifications]
  );

  const recentNotifications = useMemo(
    () => state.notifications.slice(0, 5),
    [state.notifications]
  );

  return (
    <header className="sticky top-0 z-30 h-16 bg-background border-b border-border flex items-center justify-between px-6">
      {/* Page Title */}
      <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>

      {/* Search & Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 bg-secondary border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <FaBell className="text-lg text-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-elevated overflow-hidden"
              >
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto scrollbar-thin">
                  {recentNotifications.length === 0 ? (
                    <p className="p-4 text-sm text-muted-foreground text-center">No notifications</p>
                  ) : (
                    recentNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors cursor-pointer ${
                          !notif.read ? 'bg-primary/5' : ''
                        }`}
                        onClick={() => navigate('/notifications')}
                      >
                        <p className="text-sm text-foreground">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.date}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-3 border-t border-border text-center">
                  <button
                    onClick={() => {
                      navigate('/notifications');
                      setShowNotifications(false);
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    View All
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <FaUser className="text-primary" />
            </div>
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-elevated overflow-hidden"
              >
                <div className="p-3 border-b border-border">
                  <p className="font-medium text-sm text-foreground">{state.profile.fullName}</p>
                  <p className="text-xs text-muted-foreground">{state.profile.email}</p>
                </div>
                <button
                  onClick={() => {
                    navigate('/profile');
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <FaUser /> Profile
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors border-t border-border"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
