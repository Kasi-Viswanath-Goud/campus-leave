import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS, MOCK_REQUESTS } from '../data/mockData';

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('campusLeaveUsers');
    return saved ? JSON.parse(saved) : Object.values(MOCK_USERS);
  });
  
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('campusLeaveUser');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('campusLeaveRequests');
    return saved ? JSON.parse(saved) : MOCK_REQUESTS;
  });

  useEffect(() => {
    localStorage.setItem('campusLeaveUsers', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('campusLeaveRequests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('campusLeaveUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('campusLeaveUser');
    }
  }, [currentUser]);

  const login = (identifier) => {
    const user = users.find(u => u.roll === identifier || u.email === identifier);
    if (user) {
      if (user.status === 'pending') {
        return { success: false, message: 'Your account is pending admin approval.' };
      }
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials. User not found.' };
  };

  const registerStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      uid: `stu_${Date.now()}`,
      role: 'student'
    };
    setUsers([...users, newStudent]);
    setCurrentUser(newStudent);
  };

  const registerStaff = (staffData, role) => {
    const newStaff = {
      ...staffData,
      uid: `${role}_${Date.now()}`,
      role: role,
      status: 'pending'
    };
    setUsers([...users, newStaff]);
    return { success: true };
  };

  const approveUser = (uid) => {
    setUsers(users.map(u => u.uid === uid ? { ...u, status: 'approved' } : u));
  };

  const rejectUser = (uid) => {
    setUsers(users.filter(u => u.uid !== uid));
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addRequest = (requestData) => {
    const newRequest = {
      ...requestData,
      id: `LV-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      status: 'pending',
      inchargeApproved: false,
      adminApproved: false,
      left: false,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    setRequests([newRequest, ...requests]);
  };

  const updateRequestStatus = (id, newStatus, role) => {
    setRequests(requests.map(req => {
      if (req.id === id) {
        const updatedReq = { ...req, status: newStatus };
        if (newStatus === 'approved') {
          if (role === 'incharge') updatedReq.inchargeApproved = true;
          if (role === 'admin') updatedReq.adminApproved = true;
        } else if (newStatus === 'rejected') {
           // Either incharge or admin rejection marks the whole request rejected
        }
        return updatedReq;
      }
      return req;
    }));
  };

  const markAsLeft = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, left: true, leftTime: new Date().toISOString() } : req
    ));
  };

  return (
    <AppContext.Provider value={{
      users,
      currentUser,
      requests,
      login,
      logout,
      registerStudent,
      registerStaff,
      approveUser,
      rejectUser,
      addRequest,
      updateRequestStatus,
      markAsLeft
    }}>
      {children}
    </AppContext.Provider>
  );
};
