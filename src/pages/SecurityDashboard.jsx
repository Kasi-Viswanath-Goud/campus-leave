import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Shield, Search, CheckCircle, XCircle, LogOut } from 'lucide-react';

const SecurityDashboard = () => {
  const { requests, markAsLeft } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Security only cares if incharge approved it (as per requirements)
  const clearedRequests = requests.filter(r => r.status === 'approved' && r.inchargeApproved && !r.left);
  const notClearedRequests = requests.filter(r => (r.status === 'pending' || r.status === 'rejected') && !r.left);

  const searchResult = searchTerm.length > 2 
    ? requests.find(r => 
        (r.roll.toLowerCase().includes(searchTerm.toLowerCase()) || 
         r.name.toLowerCase().includes(searchTerm.toLowerCase())) && !r.left
      )
    : null;

  return (
    <div>
      <div className="flex-between mb-6">
        <div>
          <h2>Gate Verification</h2>
          <p>Security Dashboard • Read-Only</p>
        </div>
        <div style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--danger-bg)', color: 'var(--danger-text)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <Shield size={18} />
          SECURITY POST
        </div>
      </div>

      <div className="grid-2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 className="mb-4">Search Student</h3>
            <div className="form-group" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-tertiary)' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter Roll Number or Name..." 
                style={{ paddingLeft: '2.5rem' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {searchTerm.length > 2 && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: searchResult ? (searchResult.inchargeApproved ? 'var(--success-bg)' : 'var(--danger-bg)') : 'var(--bg-primary)' }}>
                {searchResult ? (
                  <>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: searchResult.inchargeApproved ? 'var(--success-text)' : 'var(--danger-text)' }}>
                      {searchResult.inchargeApproved ? '✅ CLEARED — ALLOW EXIT' : '❌ NOT CLEARED — STOP'}
                    </h4>
                    <p style={{ margin: 0, fontWeight: 600 }}>{searchResult.name} ({searchResult.roll})</p>
                    <p style={{ margin: 0, fontSize: '0.875rem' }}>{searchResult.dept} • {searchResult.year}</p>
                    
                    {searchResult.inchargeApproved && (
                      <button 
                        className="btn btn-primary" 
                        style={{ marginTop: '1rem', width: '100%' }}
                        onClick={() => {
                          markAsLeft(searchResult.id);
                          setSearchTerm('');
                        }}
                      >
                        <LogOut size={16} /> Mark as Left Campus
                      </button>
                    )}
                  </>
                ) : (
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>No active request found for this student.</p>
                )}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-4">Cleared to Leave ({clearedRequests.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {clearedRequests.slice(0, 5).map(req => (
                <div key={req.id} className="card" style={{ padding: '1rem', borderLeft: '4px solid var(--success)' }}>
                  <div className="flex-between">
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0' }}>{req.name}</h4>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{req.roll} • {req.dept}</p>
                    </div>
                    <CheckCircle size={20} className="text-success" />
                  </div>
                </div>
              ))}
              {clearedRequests.length === 0 && <p style={{ color: 'var(--text-tertiary)' }}>No cleared students waiting to leave.</p>}
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4">Not Cleared / Pending ({notClearedRequests.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {notClearedRequests.slice(0, 8).map(req => (
              <div key={req.id} className="card" style={{ padding: '1rem', borderLeft: req.status === 'rejected' ? '4px solid var(--danger)' : '4px solid var(--warning)' }}>
                <div className="flex-between">
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0' }}>{req.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{req.roll} • {req.dept}</p>
                  </div>
                  <div>
                    {req.status === 'rejected' ? (
                      <span className="badge badge-rejected" style={{ fontSize: '0.65rem' }}>Rejected</span>
                    ) : (
                      <span className="badge badge-pending" style={{ fontSize: '0.65rem' }}>Pending</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {notClearedRequests.length === 0 && <p style={{ color: 'var(--text-tertiary)' }}>No pending students.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
