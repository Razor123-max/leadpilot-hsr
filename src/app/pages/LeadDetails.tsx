import { useParams, Link } from 'react-router';
import {
  Mail, Phone, MapPin, Calendar, Clock, Edit3,
  MessageSquare, CheckCircle, XCircle, ArrowLeft,
  FileText, Activity, Car, Tag, Zap, AlertTriangle,
  PhoneCall, CheckCircle2, Timer
} from 'lucide-react';
import { mockLeads, leadStatusColors } from '../data';
import { cn } from '../utils';

// ─── Per-lead extras (tags, timeline, NBA) ───────────────────────────────────
const leadExtras: Record<string, {
  tags: string[];
  timelineToBuy: string;
  showNBA: boolean;
  nbaMessage: string;
}> = {
  'L-001': {
    tags: ['Hot Lead', 'Test Drive Requested'],
    timelineToBuy: 'Within 1 month',
    showNBA: false,
    nbaMessage: '',
  },
  'L-002': {
    tags: ['Price Sensitive', 'Comparing Models'],
    timelineToBuy: 'Within 2-3 months',
    showNBA: true,
    nbaMessage: 'Priya hasn\'t been followed up since last contact — Schedule a callback now.',
  },
  'L-003': {
    tags: ['Warm Lead', 'Needs Finance Info'],
    timelineToBuy: 'Within 3 months',
    showNBA: true,
    nbaMessage: 'Amit hasn\'t been contacted in 4 days — Call Now before the lead goes cold.',
  },
  'L-004': {
    tags: ['High Value', 'Fleet Buyer'],
    timelineToBuy: 'Immediate',
    showNBA: false,
    nbaMessage: '',
  },
  'L-005': {
    tags: ['New Lead'],
    timelineToBuy: 'Exploring',
    showNBA: true,
    nbaMessage: 'Vikram is unassigned — Assign to a sales rep and make first contact.',
  },
  'L-006': {
    tags: ['Closed Lost'],
    timelineToBuy: 'Not in market',
    showNBA: false,
    nbaMessage: '',
  },
  'L-007': {
    tags: ['Warm Lead', 'Looking for EMI Options'],
    timelineToBuy: 'Within 2 months',
    showNBA: false,
    nbaMessage: '',
  },
  'L-008': {
    tags: ['Qualified', 'Ready to Close'],
    timelineToBuy: 'This week',
    showNBA: false,
    nbaMessage: '',
  },
};

const defaultExtras = {
  tags: ['New Lead'],
  timelineToBuy: 'Exploring',
  showNBA: false,
  nbaMessage: '',
};

const tagColors: Record<string, string> = {
  'Hot Lead':            'bg-red-50 text-red-600 border-red-200',
  'Warm Lead':           'bg-orange-50 text-orange-600 border-orange-200',
  'High Value':          'bg-purple-50 text-purple-700 border-purple-200',
  'Fleet Buyer':         'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Test Drive Requested':'bg-blue-50 text-blue-600 border-blue-200',
  'Price Sensitive':     'bg-amber-50 text-amber-700 border-amber-200',
  'Comparing Models':    'bg-slate-50 text-slate-600 border-slate-200',
  'Needs Finance Info':  'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Qualified':           'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Ready to Close':      'bg-green-50 text-green-700 border-green-200',
  'Looking for EMI Options':'bg-teal-50 text-teal-700 border-teal-200',
  'New Lead':            'bg-slate-50 text-slate-500 border-slate-200',
  'Closed Lost':         'bg-red-50 text-red-400 border-red-100',
  'Not in market':       'bg-slate-50 text-slate-400 border-slate-200',
};

// ─── Component ───────────────────────────────────────────────────────────────

export function LeadDetails() {
  const { id } = useParams<{ id: string }>();
  const lead = mockLeads.find(l => l.id === id) || mockLeads[0];
  const extras = leadExtras[lead.id] || defaultExtras;

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Link to="/leads" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#1A73E8] font-medium transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Leads List
        </Link>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors shadow-sm bg-white">
            <XCircle className="w-4 h-4" />
            Mark Lost
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-200 text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-colors shadow-sm bg-white">
            <CheckCircle className="w-4 h-4" />
            Mark Won
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A73E8] text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* ⚡ Next Best Action Banner */}
      {extras.showNBA && (
        <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl px-5 py-3.5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800 flex items-center gap-1.5">
                <span>⚡ Next Best Action</span>
              </p>
              <p className="text-xs text-amber-700 mt-0.5">{extras.nbaMessage}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A73E8] text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <PhoneCall className="w-3.5 h-3.5" />
              Call Now
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-200 text-amber-700 text-xs font-semibold rounded-lg hover:bg-amber-50 transition-colors">
              <Calendar className="w-3.5 h-3.5" />
              Schedule
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-5">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] border border-slate-100 p-6 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-br from-[#1A73E8] to-blue-400 opacity-10" />
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-[#1A73E8] text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-blue-500/30 z-10 border-4 border-white mb-4">
              {lead.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h2 className="text-xl font-bold text-slate-800 z-10">{lead.name}</h2>
            <div className={cn(
              "mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold z-10 border border-transparent shadow-sm",
              leadStatusColors[lead.status].bg,
              leadStatusColors[lead.status].text
            )}>
              <span className={cn("w-1.5 h-1.5 rounded-full", leadStatusColors[lead.status].dot)} />
              {lead.status}
            </div>

            {/* Contact Info */}
            <div className="w-full mt-5 pt-5 border-t border-slate-100 space-y-3 text-left">
              <a href={`mailto:${lead.email}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#1A73E8] transition-colors cursor-pointer p-2 -mx-2 rounded-lg hover:bg-blue-50 group">
                <Mail className="w-4 h-4 text-slate-400 group-hover:text-[#1A73E8] shrink-0" />
                <span className="font-medium truncate">{lead.email}</span>
              </a>
              <a href={`tel:${lead.phone}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#1A73E8] transition-colors cursor-pointer p-2 -mx-2 rounded-lg hover:bg-blue-50 group">
                <Phone className="w-4 h-4 text-slate-400 group-hover:text-[#1A73E8] shrink-0" />
                <span className="font-medium">{lead.phone}</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-500 p-2 -mx-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Bangalore, Karnataka</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full mt-5 flex gap-2">
              <button className="flex-1 flex justify-center items-center gap-2 py-2 bg-slate-50 text-slate-700 hover:bg-[#1A73E8] hover:text-white rounded-lg text-sm font-medium transition-colors border border-slate-200 hover:border-transparent">
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button className="flex-1 flex justify-center items-center gap-2 py-2 bg-[#1A73E8] text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20">
                <Phone className="w-4 h-4" />
                Call
              </button>
            </div>
          </div>

          {/* Lead Details Card */}
          <div className="bg-white rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] border border-slate-100 p-5">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">Lead Details</h3>
            <div className="space-y-4 text-sm">
              {/* Vehicle Interest */}
              <div>
                <p className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5" /> Vehicle Interest
                </p>
                <p className="font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-100">{lead.interest}</p>
              </div>
              {/* Budget */}
              <div>
                <p className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> Budget Range
                </p>
                <p className="font-semibold text-slate-700">{lead.budget}</p>
              </div>
              {/* Timeline to Buy */}
              <div>
                <p className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                  <Timer className="w-3.5 h-3.5" /> Timeline to Buy
                </p>
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
                  extras.timelineToBuy === 'Immediate' || extras.timelineToBuy === 'This week'
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : extras.timelineToBuy.includes('1 month')
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                )}>
                  <Clock className="w-3 h-3" />
                  {extras.timelineToBuy}
                </span>
              </div>
              {/* Source */}
              <div>
                <p className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Lead Source
                </p>
                <span className="inline-flex px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">
                  {lead.source}
                </span>
              </div>
              {/* Tags */}
              <div>
                <p className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {extras.tags.map(tag => (
                    <span
                      key={tag}
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border",
                        tagColors[tag] || 'bg-slate-50 text-slate-500 border-slate-200'
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Assigned Rep */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-slate-400 text-xs font-semibold mb-2">Assigned Representative</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shadow-sm border border-blue-200">
                    {lead.assignedTo.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className={cn(
                    "font-semibold text-sm",
                    lead.assignedTo === 'Unassigned' ? 'text-slate-400 italic' : 'text-slate-800'
                  )}>
                    {lead.assignedTo}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Quick Actions Tabs */}
          <div className="bg-white rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
            <div className="flex border-b border-slate-100 bg-slate-50">
              <button className="flex-1 py-3 px-4 text-sm font-semibold text-[#1A73E8] bg-white border-b-2 border-[#1A73E8]">
                Log Activity
              </button>
              <button className="flex-1 py-3 px-4 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100/50 transition-colors">
                New Task
              </button>
              <button className="flex-1 py-3 px-4 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100/50 transition-colors">
                Schedule Event
              </button>
            </div>
            <div className="p-5">
              <textarea
                placeholder="Log a call, meeting, or add a note..."
                className="w-full h-24 p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] bg-slate-50 resize-none transition-all placeholder:text-slate-400 mb-3"
              />
              {/* Quick outcome tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {['Call Connected', 'Left Voicemail', 'Test Drive Done', 'Sent Brochure', 'Follow-up Required'].map(label => (
                  <button key={label} className="px-2.5 py-1 rounded-full border border-slate-200 text-xs text-slate-500 hover:border-[#1A73E8] hover:text-[#1A73E8] hover:bg-blue-50 transition-colors font-medium">
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button className="p-2 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><Phone className="w-4 h-4" /></button>
                  <button className="p-2 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><Mail className="w-4 h-4" /></button>
                  <button className="p-2 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><Calendar className="w-4 h-4" /></button>
                </div>
                <button className="px-5 py-2 rounded-lg bg-[#1A73E8] text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
                  Save Note
                </button>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-slate-800">Activity Timeline</h3>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                {['All', 'Calls', 'Notes', 'Status'].map((f, i) => (
                  <button key={f} className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-semibold transition-all",
                    i === 0 ? "bg-white text-slate-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}>{f}</button>
                ))}
              </div>
            </div>

            <div className="relative pl-6 space-y-7 before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-slate-100">
              {/* Item 1 */}
              <div className="relative">
                <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[#1A73E8] shadow-sm z-10">
                  <Phone className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-semibold text-slate-800 text-sm">Outbound Call</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Today, 10:30 AM</span>
                  <span className="ml-auto text-[10px] bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full border border-blue-100">Connected</span>
                </div>
                <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  Spoke with {lead.name.split(' ')[0]} regarding the {lead.interest}. Very interested but wants to test drive first. Scheduled for this Saturday at 2 PM.
                </div>
                <p className="text-xs text-slate-400 mt-2 font-medium">Logged by Alex Morgan</p>
              </div>

              {/* Item 2 */}
              <div className="relative">
                <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-emerald-600 shadow-sm z-10">
                  <Calendar className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-semibold text-slate-800 text-sm">Test Drive Scheduled</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Today, 10:35 AM</span>
                </div>
                <div className="text-sm text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-100 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Test drive booked for {lead.interest} SX — Mar 14, 2026 at 2:00 PM
                </div>
              </div>

              {/* Item 3 — Status change */}
              <div className="relative">
                <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-purple-600 shadow-sm z-10">
                  <Activity className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-semibold text-slate-800 text-sm">Status Updated</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Mar 7, 3:15 PM</span>
                </div>
                <div className="text-sm text-slate-500">
                  Status changed <span className="font-medium text-slate-700">New → Contacted</span> by Alex Morgan
                </div>
              </div>

              {/* Item 4 */}
              <div className="relative">
                <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-slate-500 shadow-sm z-10">
                  <MessageSquare className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-semibold text-slate-800 text-sm">Lead Created</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Mar 1, 2026</span>
                </div>
                <div className="text-sm text-slate-500">
                  Lead originated from <span className="font-medium text-slate-700">{lead.source}</span> inquiry. Initially expressed interest in {lead.interest} models under {lead.budget.split(' – ')[1] || lead.budget}.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
