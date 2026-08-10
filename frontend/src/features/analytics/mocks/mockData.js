export const TRAINING_FEEDBACK_DATA = [
  { month: "Jan", rating: 4.2 },
  { month: "Feb", rating: 4.4 },
  { month: "Mar", rating: 4.5 },
  { month: "Apr", rating: 4.7 }
];

export const PROJECT_BUDGET_DATA = [
  { name: "Digital", value: 45000 },
  { name: "Cloud", value: 35000 },
  { name: "Data & AI", value: 55000 },
  { name: "Agile", value: 15000 }
];

export const FRESHER_FUNNEL_DATA = [
  { stage: "Registered Candidates", count: 486, percent: 100 },
  { stage: "Onboarding Commenced", count: 420, percent: 86 },
  { stage: "Assessments Cleared", count: 350, percent: 72 },
  { stage: "Assigned to Projects", count: 280, percent: 57 }
];

export const FRESHER_ROWS = [
  { id: "#FR-8821", name: "Jane Doe", dept: "Computer Science", date: "Oct 12, 2023", progress: 75, status: "Active" },
  { id: "#FR-8822", name: "Marcus Smith", dept: "Business Admin", date: "Oct 15, 2023", progress: 40, status: "In Review" },
  { id: "#FR-8823", name: "Aria Lee", dept: "Visual Design", date: "Oct 18, 2023", progress: 95, status: "Advancing" }
];

export const SKILL_GAP_DATA = [
  { month: "Jan", required: 85, current: 64 },
  { month: "Feb", required: 85, current: 68 },
  { month: "Mar", required: 85, current: 75 },
  { month: "Apr", required: 85, current: 81 }
];

export const PREDICTIVE_FORECAST_DATA = [
  { month: "Jan", actual: 120, forecast: 120 },
  { month: "Feb", actual: 155, forecast: 160 },
  { month: "Mar", actual: 190, forecast: 185 },
  { month: "Apr", forecast: 210 }
];

export const LEARNING_HOURS_DATA = [
  { month: "Jan", selfGuided: 3200, classroom: 1800 },
  { month: "Feb", selfGuided: 4100, classroom: 2200 },
  { month: "Mar", selfGuided: 5400, classroom: 2600 }
];

export const LEARNING_CATEGORIES_DATA = [
  { name: "Cloud Infrastructure", value: 42 },
  { name: "AI & Data Engineering", value: 38 },
  { name: "Agile & Project Mgmt", value: 12 },
  { name: "Frontend / Fullstack", value: 8 }
];

export const AI_TRANSFORMATION_DATA = [
  { stage: "Registered Candidates", count: 980, percent: 100 },
  { stage: "AI Foundation Passed", count: 720, percent: 73 },
  { stage: "Copilot Enabled", count: 540, percent: 55 },
  { stage: "AI Champions Confirmed", count: 180, percent: 18 }
];

// --- Consolidated Dashboard Mock Fallbacks ---

export const COVERAGE_MOCK = {
  kpis: {
    totalEmployees: 12,
    employeesCovered: 9,
    coveragePercentage: 75.0,
    pendingEmployees: 3
  },
  charts: {
    regionData: [
      { name: "India", value: 5 },
      { name: "North America", value: 4 },
      { name: "Europe", value: 3 }
    ],
    departmentData: [
      { name: "Engineering", value: 8 },
      { name: "Consulting", value: 2 },
      { name: "Operations", value: 2 }
    ],
    projectData: [
      { name: "Phoenix", value: 4 },
      { name: "Helios", value: 3 },
      { name: "Apollo", value: 2 }
    ],
    practiceData: [
      { name: "Frontend", value: 4 },
      { name: "DevOps", value: 3 },
      { name: "Backend", value: 5 }
    ]
  },
  tables: {
    content: [
      { id: 1, name: "Rahul Sharma", email: "rahul.sharma@xebia.com", avatar: "", region: "India", businessUnit: "Digital", department: "Engineering", practice: "Frontend", project: "Phoenix", learningPath: "React Development v19", hours: 32, completion: 85, status: "In Progress", dateJoined: "2024-01-15" },
      { id: 2, name: "John Doe", email: "john.doe@xebia.com", avatar: "", region: "North America", businessUnit: "Cloud", department: "Engineering", practice: "DevOps", project: "Helios", learningPath: "DevOps Foundation", hours: 40, completion: 100, status: "Completed", dateJoined: "2023-11-10" }
    ],
    totalPages: 1,
    currentPage: 1,
    totalElements: 2
  }
};

export const CERTIFICATIONS_MOCK = {
  kpis: {
    assignedVouchers: 92,
    scheduledExams: 37,
    certifiedEmployees: 8,
    completionRate: 66.0,
    activeCertifications: 8,
    expiredCertifications: 4
  },
  charts: {
    certTechDistribution: [
      { name: "AWS", value: 28 },
      { name: "Google", value: 22 },
      { name: "Microsoft", value: 15 }
    ],
    certRegionDistribution: [
      { name: "India", value: 45 },
      { name: "North America", value: 35 },
      { name: "Europe", value: 20 }
    ],
    certDeptDistribution: [
      { name: "Engineering", certifications: 62 },
      { name: "Consulting", certifications: 28 }
    ],
    certBUDistribution: [
      { name: "Cloud & DevOps", value: 50 },
      { name: "Data & AI", value: 35 }
    ],
    certProjectDistribution: [
      { name: "GenAI Portal", certifications: 28 },
      { name: "Banking Mig.", certifications: 22 }
    ]
  },
  tables: {
    content: [
      { id: "CERT001", name: "AWS Certified Solutions Architect", provider: "AWS", employeeName: "David Miller", department: "Consulting", region: "North America", level: "Associate", expiry: "2029-02-15", status: "Active" },
      { id: "CERT002", name: "Google Cloud Professional Data Engineer", provider: "Google", employeeName: "John Doe", department: "Engineering", region: "North America", level: "Professional", expiry: "2027-11-10", status: "Active" }
    ],
    totalPages: 1,
    currentPage: 1
  }
};

export const CHAMPIONS_MOCK = {
  kpis: {
    topLearners: 12,
    aiChampionsCount: 3,
    certifiedEmployees: 8,
    recognitionAwards: 12
  },
  charts: {
    championLearningHours: [
      { name: "John", hours: 140 },
      { name: "Ananya", hours: 124 }
    ],
    championReadiness: [
      { name: "John", score: 97 },
      { name: "Ananya", score: 92 }
    ],
    championCertScore: [
      { name: "John", certs: 120 },
      { name: "Ananya", certs: 100 }
    ]
  },
  tables: {
    content: [
      { id: "EMP001", name: "Ananya Sharma", department: "Engineering", practice: "Generative AI", learningHours: 124, readinessScore: 92, recognition: "AI Pioneer", active: true },
      { id: "EMP002", name: "David Miller", department: "Consulting", practice: "AWS Cloud", learningHours: 98, readinessScore: 88, recognition: "Cloud Guru", active: true }
    ],
    totalPages: 1,
    currentPage: 1
  }
};

export const FLAGSHIP_MOCK = {
  kpis: {
    totalPrograms: 8,
    activePrograms: 5,
    participants: 3360,
    completionRate: 88,
    learningHours: 73900,
    feedbackRating: 4.6
  },
  charts: {
    flagshipDistribution: [
      { name: "Cloud & DevOps", value: 35 },
      { name: "Data & AI", value: 40 }
    ],
    flagshipParticipationTrend: [
      { month: "Jan", activeParticipants: 340 },
      { month: "Feb", activeParticipants: 420 }
    ],
    flagshipCompletionTrend: [
      { month: "Jan", rate: 82 },
      { month: "Feb", rate: 84 }
    ]
  },
  tables: {
    content: [
      { id: "PROG001", name: "Generative AI Academy", category: "AI & ML", participantsCount: 450, completionRate: 88, learningHours: 12000, feedbackRating: 4.8, status: "Active" },
      { id: "PROG002", name: "Cloud Pioneer Academy", category: "Cloud", participantsCount: 620, completionRate: 92, learningHours: 18500, feedbackRating: 4.6, status: "Active" }
    ],
    totalPages: 1,
    currentPage: 1
  }
};

export const TRENDS_MOCK = {
  kpis: {
    totalEnrollments: 3450,
    completionRate: 88.5,
    learningVelocity: 580,
    activeGrowth: "+15%",
    avgSessionDuration: 38,
    engagementScore: 92
  },
  charts: {
    enrollmentVsCompletion: [
      { month: "Jan", enrollments: 310, completions: 180 },
      { month: "Feb", enrollments: 380, completions: 240 }
    ],
    engagementDistribution: [
      { name: "High Engagement", value: 62 },
      { name: "Moderate Engagement", value: 28 }
    ],
    activeUsersGrowth: [
      { month: "Jan", activeUsers: 450, newUsers: 110 },
      { month: "Feb", activeUsers: 520, newUsers: 140 }
    ],
    monthlyLearningHours: [
      { month: "Jan", hours: 3200 },
      { month: "Feb", hours: 4100 }
    ]
  },
  tables: {
    content: [
      { month: "Jan", enrollments: 310, completions: 180, activeUsers: 450, newUsers: 110, hours: 3200, rate: 3.4 },
      { month: "Feb", enrollments: 380, completions: 240, activeUsers: 520, newUsers: 140, hours: 4100, rate: 3.8 }
    ],
    totalPages: 1,
    currentPage: 1
  }
};

export const EXECUTIVE_MOCK = {
  kpis: {
    registrants: 1850,
    activeCourses: 42,
    certificationsEarned: 240,
    aiReadinessIndex: 85
  },
  charts: {
    enrollmentTrend: [
      { month: "Jan", enrollments: 120 },
      { month: "Feb", enrollments: 180 }
    ]
  }
};
