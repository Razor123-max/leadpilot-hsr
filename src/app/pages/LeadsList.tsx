import { useState } from 'react';
import { Link } from 'react-router';
import {
  Search, Plus, ChevronDown, CheckSquare, Square,
  MoreHorizontal, AlertTriangle, AlertCircle,
  Facebook, Globe, Store, ChevronLeft, ChevronRight,
  Phone, SearchX
} from 'lucide-react';
import { mockLeads, leadStatusColors, type LeadStatus } from '../data';
import { cn } from '../utils';

function SourceBadge({ source }: { source: string }) {
  if (source === 'Facebook') {
    return (
      <div className="flex items-center gap-2 text-slate-700">
        <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center text-blue-600">
          <Facebook className="w-3 h-3" />
        </div>
        Facebook
      </div>
    );
  }
  if (source === 'Google') {
    return (
      <div className="flex items-center gap-2 text-slate-700">
        <div className="w-5 h-5 rounded bg-red-100 flex items-center justify-center text-red-600">
          <Search className="w-3 h-3" />
        </div>
        Google
      </div>
    );
  }
  if (source === 'Website') {
    return (
      <div className="flex items-center gap-2 text-slate-700">
        <div className="w-5 h-5 rounded bg-purple-100 flex items-center justify-center text-purple-600">
          <Globe className="w-3 h-3" />
        </div>
        Website
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 text-slate-700">
      <div className="w-5 h-5 rounded bg-slate-200 flex items-center justify-center text-slate-600">
        <Store className="w-3 h-3" />
      </div>
      Offline
    </div>
  );
}

export function LeadsList() {
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');

  const filteredLeads = mockLeads.filter(lead => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.phone.includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.interest.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleLead = (id: string) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedLeads(newSelected);
  };

  const toggleAll = () => {
    if (selectedLeads.size === filteredLeads.length && filteredLeads.length > 0) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(filteredLeads.map(l => l.id)));
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-slate-800">All Leads</h1>
        <p className="text-sm text-slate-500 mt-0.5 font-medium">
          {filteredLeads.length} of 243 leads
          {(searchQuery || statusFilter !== 'All') && (
            <span className="ml-2 text-[#1A73E8] font-semibold">· Filtered</span>
          )}
        </p>
      </div>

      {/* Top Action Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone, car model..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-[280px] rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] bg-white transition-all shadow-sm placeholder:text-slate-400"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as LeadStatus | 'All')}
              className="appearance-none pl-3 pr-8 py-2 border border-slate-200 bg-white rounded-lg text-sm text-slate-600 hover:bg-slate-50 shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Interested">Interested</option>
              <option value="Qualified">Qualified</option>
              <option value="Not Interested">Not Interested</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm text-slate-600 hover:bg-slate-50 shadow-sm transition-colors font-medium">
            Date Range <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm text-slate-600 hover:bg-slate-50 shadow-sm transition-colors font-medium">
            Assigned To <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A73E8] text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      </div>

      {/* Bulk Actions Bar */}
      {selectedLeads.size > 0 && (
        <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 mb-3 text-sm animate-in slide-in-from-top-1">
          <span className="font-semibold text-blue-800">{selectedLeads.size} leads selected</span>
          <span className="text-blue-300">·</span>
          <button className="text-blue-600 hover:text-blue-800 font-medium">Assign To ▾</button>
          <button className="text-blue-600 hover:text-blue-800 font-medium">Move Stage ▾</button>
          <button className="text-blue-600 hover:text-blue-800 font-medium">Export CSV</button>
          <button className="text-red-500 hover:text-red-700 font-medium ml-2">Archive</button>
          <button onClick={() => setSelectedLeads(new Set())} className="ml-auto text-slate-400 hover:text-slate-600 text-xs">✕ Clear</button>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden flex flex-col flex-1">

        {filteredLeads.length === 0 ? (
          /* ── Empty State ── */
          <div className="flex-1 flex flex-col items-center justify-center py-24 text-center px-8">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-5 shadow-sm">
              <SearchX className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1.5">No leads found</h3>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              No leads match
              {searchQuery ? <><strong className="text-slate-600"> "{searchQuery}"</strong></> : ''}
              {statusFilter !== 'All' ? <> with status <strong className="text-slate-600">"{statusFilter}"</strong></> : ''}.
              Try adjusting your search terms or clearing the filters.
            </p>
            <div className="flex gap-3">
              <button
                onClick={resetFilters}
                className="px-5 py-2 rounded-lg bg-[#1A73E8] text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Clear Search
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200 sticky top-0 z-10 font-semibold tracking-wider">
                  <tr>
                    <th className="px-5 py-4 w-12 text-center">
                      <button onClick={toggleAll} className="text-slate-400 hover:text-[#1A73E8] transition-colors">
                        {selectedLeads.size === filteredLeads.length && filteredLeads.length > 0
                          ? <CheckSquare className="w-4 h-4" />
                          : <Square className="w-4 h-4" />}
                      </button>
                    </th>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Phone</th>
                    <th className="px-5 py-4">Source</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Assigned To</th>
                    <th className="px-5 py-4">Created Date</th>
                    <th className="px-5 py-4">Last Activity</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={cn(
                        "transition-colors group",
                        lead.isStale
                          ? "bg-amber-50/50 hover:bg-amber-100/50"
                          : "odd:bg-white even:bg-slate-50/50 hover:bg-slate-100/50",
                        selectedLeads.has(lead.id) && !lead.isStale && "bg-blue-50/50"
                      )}
                    >
                      <td className="px-5 py-4 text-center">
                        <button onClick={() => toggleLead(lead.id)} className={cn("transition-colors", selectedLeads.has(lead.id) ? "text-[#1A73E8]" : "text-slate-300 group-hover:text-slate-400")}>
                          {selectedLeads.has(lead.id) ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <Link to={`/leads/${lead.id}`} className="font-semibold text-slate-900 hover:text-[#1A73E8] hover:underline block">{lead.name}</Link>
                            <span className="text-slate-500 text-xs">{lead.interest}</span>
                          </div>
                          {lead.isDuplicate && (
                            <div title="Possible duplicate lead" className="ml-1 cursor-help">
                              <AlertTriangle className="w-4 h-4 text-amber-500" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600 font-medium">{lead.phone}</td>
                      <td className="px-5 py-4"><SourceBadge source={lead.source} /></td>
                      <td className="px-5 py-4">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
                          leadStatusColors[lead.status].bg,
                          leadStatusColors[lead.status].text
                        )}>
                          {lead.status}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {lead.assignedTo !== 'Unassigned' && (
                            <div className="w-6 h-6 rounded-full bg-slate-200 border border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-slate-600">
                              {lead.assignedTo.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                          <span className={cn("font-medium", lead.assignedTo === 'Unassigned' ? "text-slate-400 italic" : "text-slate-700")}>
                            {lead.assignedTo}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {new Date(lead.dateAdded).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-5 py-4">
                        {lead.isStale ? (
                          <div className="flex flex-col gap-1">
                            <span className="text-slate-600">
                              {new Date(lead.lastActivity).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="text-amber-600 text-xs font-semibold flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> Not contacted in 48h
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-600">
                            {new Date(lead.lastActivity).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button title="Quick Call" className="p-1.5 rounded-md text-slate-400 hover:bg-blue-50 hover:text-[#1A73E8] transition-colors">
                            <Phone className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
              <div className="text-sm font-medium text-slate-500">
                Showing 1–{filteredLeads.length} of 243 leads
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 border border-slate-200 rounded-md text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors disabled:opacity-50">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-[#1A73E8] bg-[#1A73E8]/10 text-[#1A73E8] rounded-md shadow-sm font-semibold text-sm">1</button>
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 font-medium text-sm">2</button>
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 font-medium text-sm">3</button>
                <span className="px-1 text-slate-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 font-medium text-sm">31</button>
                <button className="p-1.5 border border-slate-200 rounded-md text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
