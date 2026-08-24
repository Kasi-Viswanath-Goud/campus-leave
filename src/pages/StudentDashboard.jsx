import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import RequestCard from '../components/RequestCard';
import StatsCard from '../components/StatsCard';
import { Send, FileText, CheckCircle, Clock } from 'lucide-react';

const StudentDashboard = () => {
  const { currentUser, requests, addRequest } = useAppContext();
  
  const myRequests = requests.filter(r => r.roll === currentUser.roll);
  const pendingCount = myRequests.filter(r => r.status === 'pending').length;
  const approvedCount = myRequests.filter(r => r.status === 'approved').length;
  const leftCount = myRequests.filter(r => r.left).length;

  const [formData, setFormData] = useState({
    reasonType: 'Medical Emergency',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.reason) return;
    
    addRequest({
      name: currentUser.name,
      roll: currentUser.roll,
      dept: currentUser.department,
      section: currentUser.section || 'A', // Fallback for old mock data
      year: currentUser.year,
      reasonType: formData.reasonType,
      reason: formData.reason
    });
    setFormData({ ...formData, reason: '' });
  };

  return (
    <div>
      <div className="flex-between mb-6">
        <div>
          <h2>Welcome, {currentUser.name.split(' ')[0]}</h2>
          <p>Student Dashboard • {currentUser.department} {currentUser.section ? `(${currentUser.section})` : ''} • {currentUser.year}</p>
        </div>
      </div>

      <div className="grid-4 mb-6">
        <StatsCard title="Total Requests" value={myRequests.length} icon={FileText} />
        <StatsCard title="Pending" value={pendingCount} colorClass="text-warning" icon={Clock} />
        <StatsCard title="Approved" value={approvedCount} colorClass="text-success" icon={CheckCircle} />
        <StatsCard title="Used Leaves" value={leftCount} colorClass="text-secondary" icon={CheckCircle} />
      </div>

      <div className="grid-2">
        <div>
          <h3 className="mb-4">Request Permission to Leave</h3>
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Student Details</label>
                <input type="text" className="form-input mb-4" value={`${currentUser.name} (${currentUser.roll})`} disabled />
              </div>
              
              <div className="form-group">
                <label className="form-label">Reason Type</label>
                <select 
                  className="form-select"
                  value={formData.reasonType}
                  onChange={(e) => setFormData({...formData, reasonType: e.target.value})}
                >
                  <option value="Medical Emergency">Medical Emergency</option>
                  <option value="Family Function">Family Function</option>
                  <option value="Official Work">Official Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Details</label>
                <textarea 
                  className="form-textarea" 
                  rows="4" 
                  placeholder="Provide specific details about your leave..."
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={18} /> Submit Request
              </button>
            </form>
          </div>
        </div>

        <div>
          <h3 className="mb-4">My Requests</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {myRequests.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '3rem 1rem' }}>
                No leave requests found.
              </div>
            ) : (
              myRequests.map(req => <RequestCard key={req.id} request={req} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
