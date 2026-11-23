import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { storageService } from '@/services/storageService';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, DollarSign, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Payments: React.FC = () => {
  const { companyProfile } = useAuth();
  const transactions = storageService.getTransactions().filter((t) => t.userId === 'comp-1' || t.type === 'payout');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Payments & Escrow Billing</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track project spending, escrow deposits, and download tax invoices.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6 border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Total Approved Spending
          </span>
          <div className="text-3xl font-extrabold text-slate-900">
            ₹{companyProfile?.totalSpent?.toLocaleString() || '85,000'}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            Across 8 delivered projects
          </span>
        </Card>

        <Card className="p-6 border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Escrow Funds Committed
          </span>
          <div className="text-3xl font-extrabold text-indigo-600">₹14,500</div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Secured for 3 ongoing assignments
          </span>
        </Card>

        <Card className="p-6 border-slate-200 bg-emerald-50/50 border-emerald-200">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
            Escrow Protection
          </span>
          <div className="text-sm font-bold text-emerald-950 flex items-center gap-1.5 mt-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" /> 100% Protected
          </div>
          <p className="text-[11px] text-emerald-700 mt-1">
            Funds are released strictly upon your final deliverable approval.
          </p>
        </Card>
      </div>

      <Card className="border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Payment History & Receipts</h3>
          <span className="text-xs text-slate-400 font-mono">Simulated Audit Logs</span>
        </div>

        <div className="divide-y divide-slate-100">
          {transactions.map((txn) => (
            <div key={txn.id} className="p-4 sm:px-6 flex items-center justify-between gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 flex-shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{txn.description}</h4>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {new Date(txn.date).toLocaleDateString()} • Ref: {txn.referenceId}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="font-extrabold text-slate-900 block">
                  ₹{txn.amount.toLocaleString()}
                </span>
                <Badge variant="green" size="sm">Completed</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
