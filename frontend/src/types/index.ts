export type UserRole = 'teen' | 'company' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  avatarUrl?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface TeenProfile {
  id: string;
  userId: string;
  displayName: string;
  tagline: string;
  aboutMe: string;
  dob?: string;
  age: number;
  city: string;
  state: string;
  schoolCollege: string;
  classGrade: string;
  interests: string[];
  skills: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  portfolioUrl?: string;
  githubUrl?: string;
  behanceUrl?: string;
  avatarUrl: string;
  completionScore: number;
  points: number;
  badgeLevel: string;
  isPublic: boolean;
  totalEarnings: number;
  availableBalance: number;
  pendingBalance: number;
  completedProjectsCount: number;
  activeProjectsCount: number;
  rating: number;
  parentConsentApproved?: boolean;
}

export interface CompanyProfile {
  id: string;
  userId: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  website: string;
  industry: string;
  companySize: string;
  location: string;
  description: string;
  logoUrl: string;
  isVerified: boolean;
  totalSpent: number;
  activeProjectsCount: number;
  totalProjectsCount: number;
  rating: number;
}

export type ProjectCategory = 
  | 'Web Development'
  | 'App Development'
  | 'Graphic Design'
  | 'Video Editing'
  | 'Content Writing'
  | 'Digital Marketing'
  | 'Social Media'
  | 'Data Entry'
  | 'Research'
  | 'Surveys'
  | 'App Testing'
  | 'AI/ML'
  | 'Other';

export type ProjectStatus = 'draft' | 'published' | 'active' | 'completed' | 'paused' | 'closed';

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  deadline: string;
  payoutAmount: number;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  companyIndustry?: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  detailedDescription: string;
  objectives: string[];
  responsibilities: string[];
  deliverables: string[];
  requiredSkills: string[];
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  projectType: 'remote' | 'on-site' | 'hybrid';
  durationWeeks: number;
  stipendAmount: number;
  openingsCount: number;
  applicantCount: number;
  deadline: string;
  status: ProjectStatus;
  createdAt: string;
  featured?: boolean;
  matchScore?: number;
  milestones?: ProjectMilestone[];
}

export type ApplicationStatus = 
  | 'Submitted' 
  | 'Under Review' 
  | 'Shortlisted' 
  | 'Accepted' 
  | 'Rejected' 
  | 'Withdrawn';

export interface Application {
  id: string;
  projectId: string;
  projectTitle: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  teenId: string;
  teenName: string;
  teenAvatar: string;
  teenSkills: string[];
  teenRating: number;
  teenEducation: string;
  coverLetter: string;
  portfolioLinks: string[];
  appliedDate: string;
  status: ApplicationStatus;
  feedbackNote?: string;
  lastUpdated: string;
}

export type WorkStatus = 
  | 'Not Started'
  | 'In Progress'
  | 'Submitted'
  | 'Under Review'
  | 'Revision Requested'
  | 'Approved'
  | 'Completed';

export interface AssignedProject {
  id: string;
  projectId: string;
  projectTitle: string;
  companyId: string;
  companyName: string;
  teenId: string;
  teenName: string;
  assignedDate: string;
  deadline: string;
  totalAmount: number;
  workStatus: WorkStatus;
  currentMilestoneIndex: number;
  milestones: ProjectMilestone[];
  submissionRecord?: {
    submittedAt: string;
    workSummary: string;
    links: string[];
    revisionFeedback?: string;
    approvedAt?: string;
  };
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'earning' | 'withdrawal' | 'payout';
  amount: number;
  description: string;
  projectTitle?: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  paymentMethod?: string;
  referenceId: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'payment';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  attachmentUrl?: string;
}

export interface Conversation {
  id: string;
  participantA: { id: string; name: string; role: UserRole; avatar: string };
  participantB: { id: string; name: string; role: UserRole; avatar: string };
  projectTitle: string;
  projectId: string;
  lastMessage: string;
  lastUpdated: string;
  unreadCount: number;
}
