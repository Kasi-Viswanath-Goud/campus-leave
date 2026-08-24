import React from 'react';

const StatsCard = ({ title, value, colorClass = "text-primary", icon: Icon }) => {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
          {title}
        </p>
        <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }} className={colorClass}>
          {value}
        </h3>
      </div>
      {Icon && (
        <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-full)' }}>
          <Icon size={24} className={colorClass} />
        </div>
      )}
    </div>
  );
};

export default StatsCard;
