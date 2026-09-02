export const MOCK_USERS = {
  student: {
    uid: "stu_001",
    name: "Rahul Sharma",
    email: "rahul@college.edu",
    role: "student",
    roll: "CSE2023012",
    department: "CSE",
    section: "A",
    year: "3rd Year"
  },
  incharge: {
    uid: "inc_001",
    name: "Dr. Kumar",
    email: "kumar@college.edu",
    role: "incharge",
    department: "CSE",
    section: "A"
  },
  admin: {
    uid: "adm_001",
    name: "Prof. Gupta",
    email: "admin@college.edu",
    role: "admin"
  },
  security: {
    uid: "sec_001",
    name: "Guard Singh",
    email: "security@college.edu",
    role: "security"
  }
};

export const MOCK_REQUESTS = [
  {
    id: "LV-001",
    name: "Rahul Sharma",
    roll: "CSE2023012",
    dept: "CSE",
    section: "A",
    year: "3rd Year",
    reasonType: "Medical Emergency",
    reason: "Doctor appointment at City Hospital",
    status: "approved",
    inchargeApproved: true,
    adminApproved: true,
    left: false,
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "LV-002",
    name: "Sneha Reddy",
    roll: "MECH2021056",
    dept: "MECH",
    section: "A",
    year: "4th Year",
    reasonType: "Personal",
    reason: "Family function",
    status: "pending",
    inchargeApproved: false,
    adminApproved: false,
    left: false,
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  }
];
