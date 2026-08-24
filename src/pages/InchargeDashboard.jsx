import React from 'react';
import { useAppContext } from '../context/AppContext';
import RequestCard from '../components/RequestCard';
import StatsCard from '../components/StatsCard';
import { FileText, CheckCircle, Clock, Users } from 'lucide-react';

const InchargeDashboard = () => {
  const { currentUser, requests } = useAppContext();
  
  // Filter for incharge's department
  const deptRequests = requests.filter(r => r.dept === currentUser.department);
  
  const pendingRequests = deptRequests.filter(r => r.status === 'pending');
  const historyRequests = deptRequests.filter(r => r.status !== 'pending');
  
  const totalCount = deptRequests.length;
  const pendingCount = pendingRequests.length;
  const approvedCount = deptRequests.filter(r => r.status === 'approved').length;
  const leftCount = deptRequests.filter(r => r.left).length;

  return (
    <div>
      <div className="flex-between mb-6">
        <div>
          <h2>Department Overview ({currentUser.department})</h2>
          <p>Incharge Dashboard • {currentUser.name}</p>
        </div>
      </div>

      <div className="grid-4 mb-6">
        <StatsCard title="Total Dept Requests" value={totalCount} icon={FileText} />
        <StatsCard title="Pending Review" value={pendingCount} colorClass="text-warning" icon={Clock} />
        <StatsCard title="Approved" value={approvedCount} colorClass="text-success" icon={CheckCircle} />
        <StatsCard title="Currently Out" value={leftCount} colorClass="text-secondary" icon={Users} />
      </div>

      <div className="grid-2">
        <div>
          <h3 className="mb-4">Pending Approvals <span className="badge badge-pending">{pendingCount}</span></h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pendingRequests.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '3rem 1rem' }}>
                No pending requests. All caught up!
              </div>
            ) : (
              pendingRequests.map(req => <RequestCard key={req.id} request={req} />)
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-4">Department History</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {historyRequests.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '3rem 1rem' }}>
                No history available.
              </div>
            ) : (
              historyRequests.slice(0, 10).map(req => <RequestCard key={req.id} request={req} />) // Show latest 10
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InchargeDashboard;
