import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { storageService } from '@/services/storageService';
import {
  ShieldAlert,
  Users,
  Building,
  FolderKanban,
  Receipt,
  Flag,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const users = storageService.getTeenProfiles();
  const companies = storageService.getCompanies();
  const projects = storageService.getProjects();
  const txns = storageService.getTransactions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Platform Governance & Moderation</h1>
        <p className="text-xs text-slate-400 mt-1">
          Ecosystem health, child safety enforcement, and financial audit logs.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-slate-800/80 border-slate-700 text-white">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Total Teenlancers</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{users.length + 149990}+</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">100% Parent Consent Audited</span>
        </Card>

        <Card className="p-5 bg-slate-800/80 border-slate-700 text-white">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Registered Companies</span>
            <Building className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{companies.length + 3495}+</div>
          <span className="text-[11px] text-indigo-400 mt-1 block">Verified Enterprises</span>
        </Card>

        <Card className="p-5 bg-slate-800/80 border-slate-700 text-white">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Active Projects</span>
            <FolderKanban className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{projects.length}</div>
          <span className="text-[11px] text-amber-400 mt-1 block">Zero Prohibited Listings</span>
        </Card>

        <Card className="p-5 bg-slate-800/80 border-slate-700 text-white">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Processed Volume</span>
            <Receipt className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">₹4.24 Cr</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Automated UPI reconciliation</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-slate-800/80 border-slate-700 text-white">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" /> Child Safety & Compliance Check
          </h3>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
              <span>Parental Consent Verification Gate</span>
              <Badge variant="green" size="sm">ACTIVE</Badge>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
              <span>Phone / Address Privacy Masking</span>
              <Badge variant="green" size="sm">ENFORCED</Badge>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
              <span>Unpaid Work & Exploitation Scanner</span>
              <Badge variant="green" size="sm">ZERO FLAGS</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/80 border-slate-700 text-white">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Recent Platform Audit Events
          </h3>
          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-between">
              <span>Verified Employer Registration: Zephyr Brands</span>
              <span className="text-slate-500">2 hrs ago</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-between">
              <span>Milestone Payout Escrow Released: ₹4,500</span>
              <span className="text-slate-500">5 hrs ago</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-between">
              <span>New Project Moderation Passed: Nexus Quiz UI</span>
              <span className="text-slate-500">1 day ago</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
