import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

const RequestCard = ({ request }) => {
  const { currentUser, updateRequestStatus } = useAppContext();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="badge badge-pending"><Clock size={12} className="mr-1" style={{marginRight: '4px'}}/> Pending</span>;
      case 'approved': return <span className="badge badge-approved"><CheckCircle size={12} className="mr-1" style={{marginRight: '4px'}}/> Approved</span>;
      case 'rejected': return <span className="badge badge-rejected"><XCircle size={12} className="mr-1" style={{marginRight: '4px'}}/> Rejected</span>;
      default: return null;
    }
  };

  const handleApprove = () => updateRequestStatus(request.id, 'approved', currentUser.role);
  const handleReject = () => updateRequestStatus(request.id, 'rejected', currentUser.role);

  return (
    <div className="card mb-4">
      <div className="card-header">
        <div>
          <h4 style={{ margin: '0 0 0.25rem 0' }}>{request.name} <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 400 }}>• {request.roll}</span></h4>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>{request.dept} {request.section ? `(${request.section})` : ''} • {request.year}</p>
        </div>
        <div>{getStatusBadge(request.status)}</div>
      </div>
      
      <div style={{ margin: '1rem 0', padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={16} /> {request.reasonType}
        </p>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>{request.reason}</p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
          Requested on: {new Date(request.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex-between">
        <div style={{ fontSize: '0.75rem', display: 'flex', gap: '1rem' }}>
          <span style={{ color: request.inchargeApproved ? 'var(--success)' : 'var(--text-secondary)' }}>
            {request.inchargeApproved ? '●' : '○'} Incharge
          </span>
          <span style={{ color: request.adminApproved ? 'var(--success)' : 'var(--text-secondary)' }}>
            {request.adminApproved ? '●' : '○'} Admin
          </span>
        </div>
        
        {/* Actions for Approvers */}
        {(currentUser.role === 'incharge' || currentUser.role === 'admin') && request.status === 'pending' && (
          <div className="flex-center gap-2">
            <button className="btn btn-secondary" onClick={handleReject}>Reject</button>
            <button className="btn btn-primary" onClick={handleApprove}>Approve</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
