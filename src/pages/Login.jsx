import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { LogIn, UserPlus } from 'lucide-react';

const Login = () => {
  const { login, registerStudent } = useAppContext();
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Login State
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  // Register State
  const [regName, setRegName] = useState('');
  const [regRoll, setRegRoll] = useState('');
  const [regDept, setRegDept] = useState('CSE');
  const [regSection, setRegSection] = useState('');
  const [regYear, setRegYear] = useState('1st Year');
  const [regPassword, setRegPassword] = useState('');

  const [error, setError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!identifier) {
      setError('Please enter your Roll Number or Email.');
      return;
    }
    
    const success = login(identifier);
    if (!success) {
      setError('Invalid credentials. User not found.');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regRoll || !regPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    registerStudent({
      name: regName,
      roll: regRoll,
      department: regDept,
      section: regSection,
      year: regYear
    });
    // registerStudent automatically logs them in
  };

  return (
    <div className="app-container flex-center" style={{ backgroundColor: 'var(--bg-primary)', padding: '2rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', animation: 'fadeIn 0.5s ease-out' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.25rem', margin: '0 auto 1rem auto' }}>
            CL
          </div>
          <h2 style={{ margin: '0 0 0.5rem 0' }}>Welcome to CampusLeave</h2>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            {isRegistering ? 'Create a student account' : 'Sign in to continue'}
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'var(--danger-bg)', color: 'var(--danger-text)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        {!isRegistering ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label">Roll Number / Email Address</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. CSE2023012 or name@college.edu" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required 
              />
            </div>

            <div className="form-group mb-6">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>* Any password works for testing</p>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <LogIn size={18} /> Sign In
            </button>
            
            <p style={{ textAlign: 'center', fontSize: '0.875rem', marginTop: '1rem' }}>
              Don't have an account? <button type="button" onClick={() => { setIsRegistering(true); setError(''); }} style={{ color: 'var(--primary)', fontWeight: 600 }}>Register</button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. John Doe" 
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Roll Number</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. CSE2023015" 
                value={regRoll}
                onChange={(e) => setRegRoll(e.target.value)}
                required 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Dept</label>
                <select className="form-select" value={regDept} onChange={(e) => setRegDept(e.target.value)} style={{ padding: '0.625rem 0.5rem' }}>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="IT">IT</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Section</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. A" 
                  value={regSection}
                  onChange={(e) => setRegSection(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Year</label>
                <select className="form-select" value={regYear} onChange={(e) => setRegYear(e.target.value)} style={{ padding: '0.625rem 0.5rem' }}>
                  <option value="1st Year">1st</option>
                  <option value="2nd Year">2nd</option>
                  <option value="3rd Year">3rd</option>
                  <option value="4th Year">4th</option>
                </select>
              </div>
            </div>

            <div className="form-group mb-6">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••" 
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <UserPlus size={18} /> Register as Student
            </button>
            
            <p style={{ textAlign: 'center', fontSize: '0.875rem', marginTop: '1rem' }}>
              Already have an account? <button type="button" onClick={() => { setIsRegistering(false); setError(''); }} style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign In</button>
            </p>
          </form>
        )}

        {!isRegistering && (
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Demo Accounts (Auto-Fill)
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}
                onClick={() => { setIdentifier('CSE2023012'); setPassword('password'); }}
              >
                🧑‍🎓 Student
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}
                onClick={() => { setIdentifier('kumar@college.edu'); setPassword('password'); }}
              >
                👨‍🏫 Incharge
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}
                onClick={() => { setIdentifier('admin@college.edu'); setPassword('password'); }}
              >
                👑 Admin
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}
                onClick={() => { setIdentifier('security@college.edu'); setPassword('password'); }}
              >
                🛡️ Security
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
