import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  PhoneCall,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import { cn } from "../utils";

// ─── Data ────────────────────────────────────────────────────────────────────

const dashboardStats = [
  {
    title: "Total Leads",
    value: "243",
    icon: Users,
    trend: "+12.5%",
    isPositive: true,
    subtitle: "This month",
  },
  {
    title: "Leads Contacted",
    value: "189",
    icon: PhoneCall,
    trend: "+8.2%",
    isPositive: true,
    subtitle: "77.8% contact rate",
  },
  {
    title: "Qualified Leads",
    value: "47",
    icon: CheckCircle2,
    trend: "+23.1%",
    isPositive: true,
    subtitle: "19.3% from contacted",
  },
  {
    title: "Conversion Rate",
    value: "12.4%",
    icon: TrendingUp,
    trend: "+2.1%",
    isPositive: true,
    subtitle: "vs 10.3% last month",
  },
  {
    title: "Avg. Response",
    value: "2.4 hrs",
    icon: Clock,
    trend: "↓18 min",
    isPositive: true,
    subtitle: "Faster than last month",
  },
];

const areaChartData = [
  { name: "Mar 1", leads: 8, won: 1 },
  { name: "Mar 3", leads: 14, won: 2 },
  { name: "Mar 5", leads: 11, won: 2 },
  { name: "Mar 7", leads: 18, won: 3 },
  { name: "Mar 9", leads: 22, won: 4 },
  { name: "Mar 11", leads: 15, won: 3 },
  { name: "Mar 13", leads: 27, won: 6 },
  { name: "Mar 15", leads: 35, won: 8 },
  { name: "Mar 17", leads: 29, won: 5 },
  { name: "Mar 19", leads: 38, won: 9 },
  { name: "Mar 21", leads: 31, won: 7 },
  { name: "Mar 23", leads: 24, won: 5 },
  { name: "Mar 25", leads: 19, won: 4 },
  { name: "Mar 27", leads: 28, won: 6 },
  { name: "Mar 29", leads: 20, won: 4 },
];

const sourceData = [
  { name: "Facebook Ads", value: 42, color: "#1A73E8" },
  { name: "Google Ads",   value: 28, color: "#EA4335" },
  { name: "Website",      value: 18, color: "#9333EA" },
  { name: "Offline",      value: 12, color: "#F97316" },
];

const funnelData = [
  { name: "New Leads",   value: 243, fill: "#94A3B8" },
  { name: "Contacted",   value: 189, fill: "#1A73E8" },
  { name: "Interested",  value: 98,  fill: "#9333EA" },
  { name: "Qualified",   value: 47,  fill: "#10B981" },
  { name: "Won / Closed",value: 31,  fill: "#059669" },
];

const teamData = [
  { name: "Alex M.",  assigned: 98, qualified: 22 },
  { name: "Sam P.",   assigned: 76, qualified: 18 },
  { name: "Ravi K.",  assigned: 42, qualified: 7  },
  { name: "Meena T.", assigned: 27, qualified: 0  },
];

// ─── Subcomponents ───────────────────────────────────────────────────────────

function StatCard({
  title, value, icon: Icon, trend, isPositive, subtitle,
}: {
  title: string; value: string | number; icon: any;
  trend: string; isPositive: boolean; subtitle: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.12)] p-5 border border-slate-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-slate-800 tracking-tight leading-none">
            {value}
          </h3>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#1A73E8] shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex items-center gap-0.5 font-semibold text-xs px-2 py-0.5 rounded-full",
            isPositive ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
          )}
        >
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </span>
        <span className="text-xs text-slate-400">{subtitle}</span>
      </div>
    </div>
  );
}

const CustomFunnelLabel = ({ x, y, width, value, name }: any) => (
  <text
    x={x + width / 2}
    y={y + 22}
    textAnchor="middle"
    dominantBaseline="middle"
    className="text-xs"
    style={{ fontSize: 12, fontWeight: 600, fill: "#fff", pointerEvents: "none" }}
  >
    {name}: {value}
  </text>
);

// ─── Dashboard ───────────────────────────────────────────────────────────────

export function Dashboard() {
  return (
    <div className="flex flex-col h-full space-y-5 pb-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-0.5 font-medium">
            March 2026 · HSR Motors, Bangalore
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 shadow-sm font-medium">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
          <select className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 shadow-sm font-medium">
            <option>All Sources</option>
            <option>Facebook Ads</option>
            <option>Google Ads</option>
            <option>Website</option>
            <option>Offline</option>
          </select>
        </div>
      </div>

      {/* Anomaly Alert Banner */}
      <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-5 py-3 text-sm font-medium shadow-sm">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
        <span>
          <strong>Lead volume is 40% below average today</strong> — Only 3 leads received so far vs. average of 14/day. Check campaign status on Facebook &amp; Google.
        </span>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-5 gap-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Row 2: Area Chart + Donut Chart */}
      <div className="grid grid-cols-3 gap-5">
        {/* Area Chart */}
        <div className="col-span-2 bg-white rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Lead Activity — This Month</h3>
              <p className="text-xs text-slate-400 mt-0.5">New leads received over the last 30 days</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#1A73E8] inline-block" />
                New Leads
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                Won
              </span>
            </div>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#1A73E8" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#1A73E8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorWon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10B981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 12px -2px rgba(0,0,0,0.15)" }}
                  itemStyle={{ color: "#1E293B", fontWeight: 500, fontSize: 13 }}
                />
                <Area type="monotone" dataKey="leads" name="New Leads" stroke="#1A73E8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLeads)" dot={false} />
                <Area type="monotone" dataKey="won"   name="Won"       stroke="#10B981" strokeWidth={2}   fillOpacity={1} fill="url(#colorWon)"   dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] p-6 border border-slate-100 flex flex-col">
          <h3 className="text-base font-semibold text-slate-800 mb-0.5">Leads by Source</h3>
          <p className="text-xs text-slate-400 mb-4">Channel distribution</p>
          <div className="flex-1 relative min-h-[220px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  innerRadius="55%"
                  outerRadius="78%"
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {sourceData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => `${v}%`}
                  contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 12px -2px rgba(0,0,0,0.15)" }}
                  itemStyle={{ fontWeight: 500, fontSize: 13 }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={40}
                  iconType="circle"
                  iconSize={8}
                  formatter={(v) => <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{v}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-8">
              <span className="text-2xl font-bold text-slate-800">243</span>
              <span className="text-xs text-slate-400 font-medium">Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Funnel + Team Performance */}
      <div className="grid grid-cols-2 gap-5">
        {/* Lead Status Funnel */}
        <div className="bg-white rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] p-6 border border-slate-100">
          <h3 className="text-base font-semibold text-slate-800 mb-0.5">Lead Pipeline Funnel</h3>
          <p className="text-xs text-slate-400 mb-5">Stage-by-stage conversion breakdown</p>
          <div className="space-y-2.5">
            {funnelData.map((stage, i) => {
              const pct = Math.round((stage.value / funnelData[0].value) * 100);
              return (
                <div key={stage.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-slate-600">{stage.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{pct}%</span>
                      <span className="text-xs font-bold text-slate-800 w-8 text-right">{stage.value}</span>
                    </div>
                  </div>
                  <div className="h-7 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full rounded-lg flex items-center px-3 transition-all"
                      style={{ width: `${pct}%`, backgroundColor: stage.fill }}
                    >
                      {pct > 20 && (
                        <span className="text-white text-[10px] font-bold truncate">{stage.name}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Team Performance</h3>
              <p className="text-xs text-slate-400 mt-0.5">Leads assigned vs qualified per rep</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-200 inline-block" />
                Assigned
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-400 inline-block" />
                Qualified
              </span>
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 500 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 12px -2px rgba(0,0,0,0.15)" }}
                  itemStyle={{ fontWeight: 500, fontSize: 13 }}
                />
                <Bar dataKey="assigned"  name="Assigned"  fill="#BFDBFE" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="qualified" name="Qualified" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}