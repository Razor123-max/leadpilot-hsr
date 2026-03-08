export type LeadStatus = 'New' | 'Contacted' | 'Interested' | 'Qualified' | 'Not Interested';
export type LeadSource = 'Facebook' | 'Google' | 'Website' | 'Offline';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  status: LeadStatus;
  source: LeadSource;
  dateAdded: string;
  lastActivity: string;
  lastContact: string;
  assignedTo: string;
  budget: string;
  isStale?: boolean;
  isDuplicate?: boolean;
}

export const mockLeads: Lead[] = [
  {
    id: 'L-001',
    name: 'Rahul Sharma',
    email: 'rahul.s@example.com',
    phone: '+91 98765 43210',
    interest: 'Hyundai Creta',
    status: 'Contacted',
    source: 'Website',
    dateAdded: '2026-03-08T10:00:00Z',
    lastActivity: '2026-03-08T10:00:00Z',
    lastContact: 'Never',
    assignedTo: 'Alex M.',
    budget: '₹15L - ₹18L',
  },
  {
    id: 'L-002',
    name: 'Priya Mehta',
    email: 'priya.m@example.com',
    phone: '+91 98765 43211',
    interest: 'Honda City',
    status: 'Contacted',
    source: 'Google',
    dateAdded: '2026-03-07T14:30:00Z',
    lastActivity: '2026-03-08T09:15:00Z',
    lastContact: '2026-03-08T09:15:00Z',
    assignedTo: 'Sam P.',
    budget: '₹12L - ₹15L',
    isDuplicate: true,
  },
  {
    id: 'L-003',
    name: 'Amit Patel',
    email: 'amit.p@example.com',
    phone: '+91 98765 43212',
    interest: 'Kia Seltos',
    status: 'Interested',
    source: 'Facebook',
    dateAdded: '2026-03-04T09:00:00Z',
    lastActivity: '2026-03-04T10:30:00Z',
    lastContact: '2026-03-04T10:30:00Z',
    assignedTo: 'Alex M.',
    budget: '₹14L - ₹17L',
    isStale: true,
  },
  {
    id: 'L-004',
    name: 'Sneha Reddy',
    email: 'sneha.r@example.com',
    phone: '+91 98765 43213',
    interest: 'Toyota Innova',
    status: 'Qualified',
    source: 'Offline',
    dateAdded: '2026-03-05T16:20:00Z',
    lastActivity: '2026-03-07T11:00:00Z',
    lastContact: '2026-03-07T11:00:00Z',
    assignedTo: 'Sam P.',
    budget: '₹20L - ₹25L',
  },
  {
    id: 'L-005',
    name: 'Vikram Singh',
    email: 'vikram.s@example.com',
    phone: '+91 98765 43214',
    interest: 'Mahindra Thar',
    status: 'New',
    source: 'Website',
    dateAdded: '2026-03-08T08:45:00Z',
    lastActivity: '2026-03-08T08:45:00Z',
    lastContact: 'Never',
    assignedTo: 'Unassigned',
    budget: '₹18L - ₹20L',
  },
  {
    id: 'L-006',
    name: 'Anjali Desai',
    email: 'anjali.d@example.com',
    phone: '+91 98765 43215',
    interest: 'Maruti Swift',
    status: 'Not Interested',
    source: 'Google',
    dateAdded: '2026-02-28T14:00:00Z',
    lastActivity: '2026-03-02T16:45:00Z',
    lastContact: '2026-03-02T16:45:00Z',
    assignedTo: 'Alex M.',
    budget: '₹8L - ₹10L',
  },
  {
    id: 'L-007',
    name: 'Rohan Gupta',
    email: 'rohan.g@example.com',
    phone: '+91 98765 43216',
    interest: 'Tata Nexon',
    status: 'Contacted',
    source: 'Facebook',
    dateAdded: '2026-03-06T13:10:00Z',
    lastActivity: '2026-03-07T15:20:00Z',
    lastContact: '2026-03-07T15:20:00Z',
    assignedTo: 'Ravi K.',
    budget: '₹10L - ₹14L',
  },
  {
    id: 'L-008',
    name: 'Neha Verma',
    email: 'neha.v@example.com',
    phone: '+91 98765 43217',
    interest: 'Hyundai Verna',
    status: 'Qualified',
    source: 'Offline',
    dateAdded: '2026-03-02T10:15:00Z',
    lastActivity: '2026-03-06T14:00:00Z',
    lastContact: '2026-03-06T14:00:00Z',
    assignedTo: 'Sam P.',
    budget: '₹14L - ₹16L',
  }
];

export const leadStatusColors: Record<LeadStatus, { bg: string, text: string, dot: string }> = {
  'New': { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  'Contacted': { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
  'Interested': { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
  'Qualified': { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500' },
  'Not Interested': { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
};

export const dashboardStats = {
  totalLeads: 243,
  activeLeads: 156,
  conversionRate: '12.4%',
  newToday: 14,
};

export const chartData = [
  { name: 'Mon', leads: 12, won: 2 },
  { name: 'Tue', leads: 19, won: 4 },
  { name: 'Wed', leads: 15, won: 3 },
  { name: 'Thu', leads: 22, won: 5 },
  { name: 'Fri', leads: 28, won: 8 },
  { name: 'Sat', leads: 35, won: 10 },
  { name: 'Sun', leads: 20, won: 4 },
];
