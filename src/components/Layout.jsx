import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { LogOut, User as UserIcon, GraduationCap } from 'lucide-react';

const Layout = () => {
  const { currentUser, logout } = useAppContext();

  return (
    <div className="app-container">
      <header style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        borderBottom: '1px solid var(--border-color)',
        padding: '1rem 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #ef4444, #f59e0b, #10b981, #3b82f6, #a855f7, #ec4899)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
              <GraduationCap size={20} />
            </div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>
              {"CampusLeave".split('').map((char, i) => (
                <span key={i} style={{ color: ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#f43f5e'][i] }}>
                  {char}
                </span>
              ))}
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>{currentUser?.name}</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{currentUser?.role}</p>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <UserIcon size={20} />
            </div>
            <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={logout}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
