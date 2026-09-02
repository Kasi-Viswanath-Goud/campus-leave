import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { LogIn, UserPlus, GraduationCap } from 'lucide-react';

const Login = () => {
  const { login, registerStudent, registerStaff } = useAppContext();
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerType, setRegisterType] = useState('student');
  const [successMsg, setSuccessMsg] = useState('');
  
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
    
    const result = login(identifier);
    if (!result.success) {
      setError(result.message || 'Invalid credentials. User not found.');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regRoll || !regPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (registerType === 'student') {
      registerStudent({
        name: regName,
        roll: regRoll,
        department: regDept,
        section: regSection,
        year: regYear
      });
    } else {
      const data = {
        name: regName,
        email: regRoll
      };
      if (registerType === 'incharge') {
        data.department = regDept;
        data.section = regSection;
      }
      registerStaff(data, registerType);
      setSuccessMsg('Registration successful. Please wait for Admin approval.');
      setRegName('');
      setRegRoll('');
      setRegPassword('');
      setIsRegistering(false);
    }
  };

  return (
    <div className="app-container flex-center" style={{ backgroundColor: 'var(--bg-primary)', padding: '2rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', animation: 'fadeIn 0.5s ease-out' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #ef4444, #f59e0b, #10b981, #3b82f6, #a855f7, #ec4899)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.25rem', margin: '0 auto 1rem auto' }}>
            <GraduationCap size={28} />
          </div>
          <h2 style={{ margin: '0 0 0.5rem 0' }}>
            Welcome to {"CampusLeave".split('').map((char, i) => (
              <span key={i} style={{ color: ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#f43f5e'][i] }}>
                {char}
              </span>
            ))}
          </h2>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            {isRegistering ? 'Create an account' : 'Sign in to continue'}
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'var(--danger-bg)', color: 'var(--danger-text)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        {successMsg && (
          <div style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success-text)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {successMsg}
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
              Don't have an account? <button type="button" onClick={() => { setIsRegistering(true); setError(''); setSuccessMsg(''); }} style={{ color: 'var(--primary)', fontWeight: 600 }}>Register</button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                <input type="radio" name="regType" checked={registerType === 'student'} onChange={() => setRegisterType('student')} />
                Student
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                <input type="radio" name="regType" checked={registerType === 'incharge'} onChange={() => setRegisterType('incharge')} />
                Incharge
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                <input type="radio" name="regType" checked={registerType === 'admin'} onChange={() => setRegisterType('admin')} />
                Admin
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                <input type="radio" name="regType" checked={registerType === 'security'} onChange={() => setRegisterType('security')} />
                Security
              </label>
            </div>

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
              <label className="form-label">{registerType === 'student' ? 'Roll Number' : 'Email Address'}</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder={registerType === 'student' ? "e.g. CSE2023015" : "e.g. name@college.edu"} 
                value={regRoll}
                onChange={(e) => setRegRoll(e.target.value)}
                required 
              />
            </div>

            {(registerType === 'student' || registerType === 'incharge') && (
              <div style={{ display: 'grid', gridTemplateColumns: registerType === 'student' ? '1fr 1fr 1fr' : '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Dept</label>
                  <select className="form-select" value={regDept} onChange={(e) => setRegDept(e.target.value)} style={{ padding: '0.625rem 0.5rem' }}>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="IT">IT</option>
                  </select>
                </div>
                
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Section</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. A" 
                    value={regSection}
                    onChange={(e) => setRegSection(e.target.value)}
                    required={(registerType === 'student' || registerType === 'incharge')} 
                  />
                </div>
                
                {registerType === 'student' && (
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Year</label>
                    <select className="form-select" value={regYear} onChange={(e) => setRegYear(e.target.value)} style={{ padding: '0.625rem 0.5rem' }}>
                      <option value="1st Year">1st</option>
                      <option value="2nd Year">2nd</option>
                      <option value="3rd Year">3rd</option>
                      <option value="4th Year">4th</option>
                    </select>
                  </div>
                )}
              </div>
            )}

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
              <UserPlus size={18} /> Register as {registerType.charAt(0).toUpperCase() + registerType.slice(1)}
            </button>
            
            <p style={{ textAlign: 'center', fontSize: '0.875rem', marginTop: '1rem' }}>
              Already have an account? <button type="button" onClick={() => { setIsRegistering(false); setError(''); setSuccessMsg(''); }} style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign In</button>
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
