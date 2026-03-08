import { useState } from 'react';
import { MoreHorizontal, Plus, Search, Zap, ToggleRight, Users } from 'lucide-react';
import { mockLeads, leadStatusColors, type LeadStatus } from '../data';
import { cn } from '../utils';

type ExtendedStatus = LeadStatus | 'Closed';

const ALL_STAGES: ExtendedStatus[] = ['New', 'Contacted', 'Interested', 'Qualified', 'Not Interested', 'Closed'];

const stageColors: Record<ExtendedStatus, { dot: string; header: string }> = {
  'New':            { dot: 'bg-yellow-400',  header: 'bg-yellow-50  border-yellow-200' },
  'Contacted':      { dot: 'bg-blue-500',    header: 'bg-blue-50    border-blue-200'   },
  'Interested':     { dot: 'bg-purple-500',  header: 'bg-purple-50  border-purple-200' },
  'Qualified':      { dot: 'bg-emerald-500', header: 'bg-emerald-50 border-emerald-200'},
  'Not Interested': { dot: 'bg-red-400',     header: 'bg-red-50     border-red-200'    },
  'Closed':         { dot: 'bg-slate-400',   header: 'bg-slate-100  border-slate-300'  },
};

// Mock closed leads since data doesn't have them
const closedLeads = [
  { id: 'L-009', name: 'Kavya Nair',    interest: 'Maruti Baleno', budget: '₹9L – ₹11L', assignedTo: 'Ravi K.' },
  { id: 'L-010', name: 'Arjun Kapoor',  interest: 'Honda Amaze',   budget: '₹8L – ₹10L', assignedTo: 'Sam P.'  },
];

export function LeadManagement() {
  const [view, setView] = useState<'kanban' | 'table'>('kanban');

  const getLeadsByStage = (stage: ExtendedStatus) => {
    if (stage === 'Closed') return closedLeads;
    return mockLeads.filter(l => l.status === (stage as LeadStatus));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-slate-800">Lead Management</h1>
        <p className="text-sm text-slate-500 mt-0.5 font-medium">
          Pipeline overview &amp; bulk operations
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search board..."
              className="pl-9 pr-4 py-2 w-64 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] bg-white shadow-sm placeholder:text-slate-400"
            />
          </div>
          {/* View toggle */}
          <div className="flex items-center bg-slate-100 rounded-lg p-1 gap-1">
            <button
              onClick={() => setView('kanban')}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-semibold transition-all",
                view === 'kanban' ? "bg-white text-[#1A73E8] shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Kanban View
            </button>
            <button
              onClick={() => setView('table')}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-semibold transition-all",
                view === 'table' ? "bg-white text-[#1A73E8] shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Table View
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Team avatars */}
          <div className="flex -space-x-2 mr-1">
            {['AM', 'SP', 'RK'].map((initials, i) => (
              <div key={i} className={cn(
                "w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-sm",
                i === 0 ? "bg-slate-300 text-slate-700" : i === 1 ? "bg-blue-200 text-blue-700" : "bg-emerald-200 text-emerald-700"
              )}>
                {initials}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-bold shadow-sm">
              +2
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A73E8] text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 h-full min-w-max">
          {ALL_STAGES.map((stage) => {
            const leads = getLeadsByStage(stage);
            const colors = stageColors[stage];

            return (
              <div key={stage} className="flex flex-col w-72 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Column Header */}
                <div className={cn(
                  "px-4 py-3 border-b flex items-center justify-between",
                  colors.header
                )}>
                  <div className="flex items-center gap-2">
                    <span className={cn("w-2.5 h-2.5 rounded-full", colors.dot)} />
                    <h3 className="font-semibold text-slate-800 text-sm">{stage}</h3>
                    <span className="bg-white/80 border border-slate-200 text-slate-600 text-[11px] font-bold px-2 py-0.5 rounded-full ml-1 shadow-sm">
                      {leads.length}
                    </span>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-white/60 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Cards */}
                <div className="p-3 flex-1 overflow-y-auto space-y-2.5 bg-slate-50/40">
                  {leads.map((lead: any) => (
                    <div
                      key={lead.id}
                      className="bg-white p-3.5 rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-[#1A73E8]/30 transition-all cursor-grab active:cursor-grabbing group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-slate-800 text-sm group-hover:text-[#1A73E8] transition-colors">
                          {lead.name}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 border border-slate-200">
                          {lead.id}
                        </span>
                      </div>
                      <div className="mb-3">
                        <p className="text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-100 w-fit">
                          {lead.interest}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 pl-0.5">{lead.budget}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <span className={cn("w-2 h-2 rounded-full", lead.assignedTo !== 'Unassigned' ? "bg-emerald-400" : "bg-slate-300")} />
                          <span className={lead.assignedTo === 'Unassigned' ? 'italic text-slate-400' : ''}>{lead.assignedTo}</span>
                        </div>
                        {lead.assignedTo !== 'Unassigned' && (
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold border border-white shadow-sm">
                            {lead.assignedTo.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <button className="w-full py-2 flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-[#1A73E8] hover:bg-blue-50/50 rounded-lg border border-dashed border-slate-200 hover:border-[#1A73E8]/40 transition-all font-medium">
                    <Plus className="w-3.5 h-3.5" />
                    Add lead
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Auto-Routing Rules Section */}
      <div className="mt-4 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-[#1A73E8]" />
          <h3 className="text-sm font-bold text-slate-800">Auto-Routing Rules</h3>
          <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full border border-blue-100">Automation</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { rule: "Facebook leads → Auto-assign to Alex M.", active: true },
            { rule: "New leads uncontacted >24h → Notify Manager", active: true },
            { rule: "Round-robin: New leads split evenly across team", active: false },
          ].map((item, i) => (
            <div key={i} className={cn(
              "flex items-center justify-between px-4 py-3 rounded-lg border text-sm",
              item.active ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200"
            )}>
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-slate-700 font-medium text-xs">{item.rule}</span>
              </div>
              <div className={cn(
                "ml-3 w-10 h-5 rounded-full flex items-center shrink-0 px-0.5 transition-colors",
                item.active ? "bg-emerald-500 justify-end" : "bg-slate-300 justify-start"
              )}>
                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
