import React from 'react';
import { useAppContext } from '../context/AppContext';
import RequestCard from '../components/RequestCard';
import StatsCard from '../components/StatsCard';
import { Globe, CheckCircle, Clock, Navigation } from 'lucide-react';

const AdminDashboard = () => {
  const { requests, users, approveUser, rejectUser } = useAppContext();
  
  const pendingRequests = requests.filter(r => r.status === 'pending');
  const pendingStaff = (users || []).filter(u => u.role !== 'student' && u.status === 'pending');
  
  const totalCount = requests.length;
  const pendingCount = pendingRequests.length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const leftCount = requests.filter(r => r.left).length;

  // Department Overview stats
  const depts = ['CSE', 'ECE', 'MECH', 'CIVIL', 'IT'];
  const deptStats = depts.map(dept => {
    const dReqs = requests.filter(r => r.dept === dept);
    return {
      name: dept,
      total: dReqs.length,
      pending: dReqs.filter(r => r.status === 'pending').length,
      approved: dReqs.filter(r => r.status === 'approved').length,
      left: dReqs.filter(r => r.left).length
    };
  }).filter(d => d.total > 0);

  return (
    <div>
      <div className="flex-between mb-6">
        <div>
          <h2>College-Wide Overview</h2>
          <p>Admin Dashboard</p>
        </div>
      </div>

      <div className="grid-4 mb-6">
        <StatsCard title="Total College Requests" value={totalCount} icon={Globe} />
        <StatsCard title="Pending" value={pendingCount} colorClass="text-warning" icon={Clock} />
        <StatsCard title="Approved" value={approvedCount} colorClass="text-success" icon={CheckCircle} />
        <StatsCard title="Left Campus" value={leftCount} colorClass="text-secondary" icon={Navigation} />
      </div>

      {pendingStaff.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-4">Pending Staff Approvals <span className="badge badge-pending">{pendingStaff.length}</span></h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {pendingStaff.map(staff => (
              <div key={staff.uid} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {staff.name}
                    <span style={{ fontSize: '0.65rem', padding: '0.125rem 0.375rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase' }}>
                      {staff.role}
                    </span>
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {staff.email} {staff.department ? `• ${staff.department}` : ''}{staff.section ? ` (${staff.section})` : ''}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }} onClick={() => rejectUser(staff.uid)}>Reject</button>
                  <button className="btn btn-primary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }} onClick={() => approveUser(staff.uid)}>Approve</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid-2">
        <div>
          <h3 className="mb-4">All Pending Requests <span className="badge badge-pending">{pendingCount}</span></h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pendingRequests.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '3rem 1rem' }}>
                No pending requests across the college.
              </div>
            ) : (
              pendingRequests.map(req => <RequestCard key={req.id} request={req} />)
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-4">Today's Overview by Department</h3>
          <div className="card">
            {deptStats.length === 0 ? (
              <p style={{ color: 'var(--text-tertiary)', textAlign: 'center', margin: '2rem 0' }}>No active department data.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {deptStats.map(dept => (
                  <div key={dept.name} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                    <div className="flex-between mb-4">
                      <h4 style={{ margin: 0 }}>{dept.name} Dept</h4>
                      <span style={{ fontWeight: 600 }}>{dept.total} requests</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--warning-text)' }}>[{dept.pending} Pending]</span>
                      <span style={{ color: 'var(--success-text)' }}>[{dept.approved} Approved]</span>
                      <span style={{ color: 'var(--text-secondary)' }}>[{dept.left} Left]</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
