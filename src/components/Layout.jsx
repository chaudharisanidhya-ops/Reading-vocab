import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, HelpCircle, Book, Bookmark, TrendingUp } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
  { name: 'Daily Quiz', path: '/quiz', icon: <HelpCircle size={20} /> },
  { name: 'Dictionary', path: '/dictionary', icon: <Book size={20} /> },
  { name: 'Saved Words', path: '/saved', icon: <Bookmark size={20} /> },
  { name: 'Progress', path: '/progress', icon: <TrendingUp size={20} /> },
];

const Sidebar = () => {
  return (
    <div className="sidebar" style={{ padding: '24px 0' }}>
      <div style={{ padding: '0 24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Book color="white" size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', margin: 0 }}>PTE Vocab</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Academic Success</p>
          </div>
        </div>
      </div>
      
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              color: isActive ? 'var(--primary)' : 'var(--text-main)',
              backgroundColor: isActive ? 'var(--secondary)' : 'transparent',
              fontWeight: isActive ? 600 : 500,
              transition: 'all 0.2s'
            })}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '24px' }}>
        <div style={{ backgroundColor: 'var(--primary)', borderRadius: '12px', padding: '20px', color: 'white', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', opacity: 0.8, margin: '0 0 12px 0' }}>Master 5000+ Words</p>
          <button className="btn" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>Upgrade to Pro</button>
        </div>
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-container">
          <Outlet />
        </div>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '10px',
              fontWeight: isActive ? 600 : 500,
            })}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
