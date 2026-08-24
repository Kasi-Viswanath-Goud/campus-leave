import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { LogOut, User as UserIcon } from 'lucide-react';

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
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
              CL
            </div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>CampusLeave</h1>
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
