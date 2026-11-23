import {
  INITIAL_USERS,
  INITIAL_TEEN_PROFILES,
  INITIAL_COMPANIES,
  INITIAL_PROJECTS,
  INITIAL_APPLICATIONS,
  INITIAL_ASSIGNED_PROJECTS,
  INITIAL_TRANSACTIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CONVERSATIONS,
} from '@/data/mockData';
import {
  User,
  TeenProfile,
  CompanyProfile,
  Project,
  Application,
  AssignedProject,
  Transaction,
  NotificationItem,
  Conversation,
  Message,
} from '@/types';

const STORAGE_KEYS = {
  USERS: 'funngro_users',
  TEEN_PROFILES: 'funngro_teen_profiles',
  COMPANIES: 'funngro_companies',
  PROJECTS: 'funngro_projects',
  APPLICATIONS: 'funngro_applications',
  ASSIGNED_PROJECTS: 'funngro_assigned_projects',
  TRANSACTIONS: 'funngro_transactions',
  NOTIFICATIONS: 'funngro_notifications',
  CONVERSATIONS: 'funngro_conversations',
  MESSAGES_PREFIX: 'funngro_messages_',
};

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (e) {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

export const storageService = {
  // Projects
  getProjects(): Project[] {
    return getItem<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  },
  getProjectById(id: string): Project | undefined {
    const list = this.getProjects();
    return list.find((p) => p.id === id);
  },
  createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'applicantCount'>): Project {
    const projects = this.getProjects();
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      applicantCount: 0,
      createdAt: new Date().toISOString(),
    };
    projects.unshift(newProject);
    setItem(STORAGE_KEYS.PROJECTS, projects);
    return newProject;
  },

  // Applications
  getApplications(): Application[] {
    return getItem<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  },
  createApplication(appData: Omit<Application, 'id' | 'appliedDate' | 'lastUpdated' | 'status'>): Application {
    const apps = this.getApplications();
    const newApp: Application = {
      ...appData,
      id: `app-${Date.now()}`,
      appliedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      status: 'Submitted',
    };
    apps.unshift(newApp);
    setItem(STORAGE_KEYS.APPLICATIONS, apps);

    // Increment applicant count on project
    const projects = this.getProjects();
    const project = projects.find((p) => p.id === appData.projectId);
    if (project) {
      project.applicantCount += 1;
      setItem(STORAGE_KEYS.PROJECTS, projects);
    }

    return newApp;
  },
  updateApplicationStatus(appId: string, status: Application['status'], feedbackNote?: string): Application | undefined {
    const apps = this.getApplications();
    const index = apps.findIndex((a) => a.id === appId);
    if (index === -1) return undefined;
    apps[index].status = status;
    apps[index].lastUpdated = new Date().toISOString();
    if (feedbackNote) apps[index].feedbackNote = feedbackNote;
    setItem(STORAGE_KEYS.APPLICATIONS, apps);
    return apps[index];
  },

  // Assigned Projects
  getAssignedProjects(): AssignedProject[] {
    return getItem<AssignedProject[]>(STORAGE_KEYS.ASSIGNED_PROJECTS, INITIAL_ASSIGNED_PROJECTS);
  },
  submitWork(assignedId: string, workSummary: string, links: string[]): AssignedProject | undefined {
    const assigned = this.getAssignedProjects();
    const item = assigned.find((a) => a.id === assignedId);
    if (!item) return undefined;
    item.workStatus = 'Submitted';
    item.submissionRecord = {
      submittedAt: new Date().toISOString(),
      workSummary,
      links,
    };
    setItem(STORAGE_KEYS.ASSIGNED_PROJECTS, assigned);
    return item;
  },
  reviewSubmission(assignedId: string, action: 'approve' | 'revise', feedback?: string): AssignedProject | undefined {
    const assigned = this.getAssignedProjects();
    const item = assigned.find((a) => a.id === assignedId);
    if (!item) return undefined;

    if (action === 'approve') {
      item.workStatus = 'Approved';
      if (item.submissionRecord) {
        item.submissionRecord.approvedAt = new Date().toISOString();
      }
      // Credit wallet if milestone exists
      if (item.milestones[item.currentMilestoneIndex]) {
        item.milestones[item.currentMilestoneIndex].isCompleted = true;
      }
    } else {
      item.workStatus = 'Revision Requested';
      if (item.submissionRecord) {
        item.submissionRecord.revisionFeedback = feedback;
      }
    }
    setItem(STORAGE_KEYS.ASSIGNED_PROJECTS, assigned);
    return item;
  },

  // Transactions
  getTransactions(userId?: string): Transaction[] {
    const txns = getItem<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);
    if (userId) return txns.filter((t) => t.userId === userId);
    return txns;
  },
  requestWithdrawal(userId: string, amount: number, upiId: string): Transaction {
    const txns = this.getTransactions();
    const newTxn: Transaction = {
      id: `txn-${Date.now()}`,
      userId,
      type: 'withdrawal',
      amount,
      description: `Simulated Payout to UPI: ${upiId}`,
      status: 'completed',
      date: new Date().toISOString(),
      paymentMethod: 'UPI',
      referenceId: `UPI-SIM-${Math.floor(1000000 + Math.random() * 9000000)}`,
    };
    txns.unshift(newTxn);
    setItem(STORAGE_KEYS.TRANSACTIONS, txns);

    // Update teen wallet
    const profiles = this.getTeenProfiles();
    const teen = profiles.find((t) => t.id === userId || t.userId === userId);
    if (teen) {
      teen.availableBalance = Math.max(0, teen.availableBalance - amount);
      setItem(STORAGE_KEYS.TEEN_PROFILES, profiles);
    }

    return newTxn;
  },

  // Notifications
  getNotifications(userId?: string): NotificationItem[] {
    const list = getItem<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    if (userId) return list.filter((n) => n.userId === userId);
    return list;
  },
  markNotificationRead(id: string): void {
    const list = this.getNotifications();
    const item = list.find((n) => n.id === id);
    if (item) {
      item.isRead = true;
      setItem(STORAGE_KEYS.NOTIFICATIONS, list);
    }
  },

  // Teen Profiles
  getTeenProfiles(): TeenProfile[] {
    return getItem<TeenProfile[]>(STORAGE_KEYS.TEEN_PROFILES, INITIAL_TEEN_PROFILES);
  },
  getTeenProfileByUserId(userId: string): TeenProfile | undefined {
    return this.getTeenProfiles().find((t) => t.userId === userId || t.id === userId);
  },
  updateTeenProfile(profile: TeenProfile): void {
    const list = this.getTeenProfiles();
    const idx = list.findIndex((t) => t.id === profile.id);
    if (idx !== -1) {
      list[idx] = profile;
    } else {
      list.push(profile);
    }
    setItem(STORAGE_KEYS.TEEN_PROFILES, list);
  },

  // Companies
  getCompanies(): CompanyProfile[] {
    return getItem<CompanyProfile[]>(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
  },
  getCompanyProfileByUserId(userId: string): CompanyProfile | undefined {
    return this.getCompanies().find((c) => c.userId === userId || c.id === userId);
  },
  updateCompanyProfile(profile: CompanyProfile): void {
    const list = this.getCompanies();
    const idx = list.findIndex((c) => c.id === profile.id);
    if (idx !== -1) {
      list[idx] = profile;
    } else {
      list.push(profile);
    }
    setItem(STORAGE_KEYS.COMPANIES, list);
  },

  // Conversations & Messages
  getConversations(): Conversation[] {
    return getItem<Conversation[]>(STORAGE_KEYS.CONVERSATIONS, INITIAL_CONVERSATIONS);
  },
  getMessages(conversationId: string): Message[] {
    const defaultMessages: Record<string, Message[]> = {
      'conv-1': [
        {
          id: 'msg-1',
          conversationId: 'conv-1',
          senderId: 'user-comp-1',
          senderName: 'Ananya Verma',
          senderRole: 'company',
          text: 'Hi Aarav! Welcome aboard the Quiz Component project. We are excited to collaborate with you.',
          timestamp: '2026-11-04T13:00:00Z',
        },
        {
          id: 'msg-2',
          conversationId: 'conv-1',
          senderId: 'user-teen-1',
          senderName: 'Aarav Sharma',
          senderRole: 'teen',
          text: 'Thanks Ananya! I reviewed the Figma specs. I will have the first 2 math quiz components ready with drag-and-drop support by Tuesday.',
          timestamp: '2026-11-04T13:15:00Z',
        },
        {
          id: 'msg-3',
          conversationId: 'conv-1',
          senderId: 'user-teen-1',
          senderName: 'Aarav Sharma',
          senderRole: 'teen',
          text: 'Hey Ananya, just pushed Milestone 1 deliverables with confetti animations! Here is the live demo link: https://nexus-quiz-ui-preview.vercel.app',
          timestamp: '2026-11-12T16:35:00Z',
        },
        {
          id: 'msg-4',
          conversationId: 'conv-1',
          senderId: 'user-comp-1',
          senderName: 'Ananya Verma',
          senderRole: 'company',
          text: 'Awesome work on the confetti animation Aarav! We tested it on Chrome and iOS Safari and it is super smooth.',
          timestamp: '2026-11-13T11:20:00Z',
        },
      ],
    };

    return getItem<Message[]>(STORAGE_KEYS.MESSAGES_PREFIX + conversationId, defaultMessages[conversationId] || []);
  },
  sendMessage(conversationId: string, message: Omit<Message, 'id' | 'timestamp'>): Message {
    const list = this.getMessages(conversationId);
    const newMsg: Message = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    list.push(newMsg);
    setItem(STORAGE_KEYS.MESSAGES_PREFIX + conversationId, list);

    // Update conversation last message
    const convs = this.getConversations();
    const conv = convs.find((c) => c.id === conversationId);
    if (conv) {
      conv.lastMessage = message.text;
      conv.lastUpdated = newMsg.timestamp;
      setItem(STORAGE_KEYS.CONVERSATIONS, convs);
    }
    return newMsg;
  },

  // Reset demo data
  resetDemoData(): void {
    setItem(STORAGE_KEYS.USERS, INITIAL_USERS);
    setItem(STORAGE_KEYS.TEEN_PROFILES, INITIAL_TEEN_PROFILES);
    setItem(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
    setItem(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    setItem(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    setItem(STORAGE_KEYS.ASSIGNED_PROJECTS, INITIAL_ASSIGNED_PROJECTS);
    setItem(STORAGE_KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);
    setItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    setItem(STORAGE_KEYS.CONVERSATIONS, INITIAL_CONVERSATIONS);
  },
};
