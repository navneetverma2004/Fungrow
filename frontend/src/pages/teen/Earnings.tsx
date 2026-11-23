import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { storageService } from '@/services/storageService';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Transaction } from '@/types';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  AlertCircle,
} from 'lucide-react';

export const Earnings: React.FC = () => {
  const { user, teenProfile, updateTeenProfileState } = useAuth();
  const { showToast } = useToast();

  const [transactions, setTransactions] = useState<Transaction[]>(
    storageService.getTransactions(teenProfile?.id || 'teen-1')
  );

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);

  const availableBalance = teenProfile?.availableBalance ?? 8200;
  const pendingBalance = teenProfile?.pendingBalance ?? 4500;
  const totalEarnings = teenProfile?.totalEarnings ?? 24500;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);

    if (isNaN(amountNum) || amountNum <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }
    if (amountNum > availableBalance) {
      showToast('Withdrawal amount exceeds available balance', 'error');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newTxn = storageService.requestWithdrawal(
        teenProfile?.id || 'teen-1',
        amountNum,
        upiId
      );

      setTransactions((prev) => [newTxn, ...prev]);
      updateTeenProfileState({
        availableBalance: Math.max(0, availableBalance - amountNum),
      });

      setIsWithdrawModalOpen(false);
      setWithdrawAmount('');
      showToast(`₹${amountNum.toLocaleString()} successfully transferred to ${upiId} (Demo mode)!`, 'success');
    }, 900);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Earnings & Wallet</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Transparent milestone payouts, withdrawal ledger, and guaranteed escrow earnings.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsWithdrawModalOpen(true)}
          icon={<ArrowUpRight className="w-4 h-4" />}
          className="font-bold"
        >
          Withdraw Funds (UPI)
        </Button>
      </div>

      {/* Wallet Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6 border-slate-200 bg-gradient-to-br from-emerald-500/10 via-white to-teal-500/10">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
            Available Balance
          </span>
          <div className="text-3xl font-extrabold text-emerald-700">
            ₹{availableBalance.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
            Instant withdrawal available via UPI
          </span>
        </Card>

        <Card className="p-6 border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Pending Milestones
          </span>
          <div className="text-3xl font-extrabold text-slate-800">
            ₹{pendingBalance.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Held in escrow pending company review
          </span>
        </Card>

        <Card className="p-6 border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Lifetime Earned
          </span>
          <div className="text-3xl font-extrabold text-slate-900">
            ₹{totalEarnings.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Across 8 approved client assignments
          </span>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Transaction History & Audit Trail</h3>
          <span className="text-xs text-slate-400 font-mono">Demo Verified Records</span>
        </div>

        <div className="divide-y divide-slate-100">
          {transactions.map((txn) => (
            <div key={txn.id} className="p-4 sm:px-6 flex items-center justify-between gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl flex items-center justify-center ${
                    txn.type === 'withdrawal'
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  {txn.type === 'withdrawal' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownLeft className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{txn.description}</h4>
                  <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                    <span>{new Date(txn.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="font-mono">{txn.referenceId}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`font-extrabold block ${
                    txn.type === 'withdrawal' ? 'text-slate-800' : 'text-emerald-600'
                  }`}
                >
                  {txn.type === 'withdrawal' ? '-' : '+'}₹{txn.amount.toLocaleString()}
                </span>
                <Badge variant={txn.status === 'completed' ? 'green' : 'amber'} size="sm">
                  {txn.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Simulated UPI Withdrawal Modal */}
      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        title="Withdraw Funds (UPI Payout)"
        description="Demo wallet payout simulation with instant audit log"
      >
        <form onSubmit={handleWithdraw} className="space-y-4">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
            Available to withdraw: <strong>₹{availableBalance.toLocaleString()}</strong>
          </div>

          <Input
            label="Amount (INR)"
            type="number"
            placeholder="e.g. 2000"
            required
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />

          <Input
            label="UPI VPA ID (e.g. GooglePay, PhonePe)"
            placeholder="e.g. student@okaxis or 9876543210@paytm"
            required
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Zero platform fees. Payouts are credited directly to your bank account via UPI.</span>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button type="button" variant="outline" onClick={() => setIsWithdrawModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isProcessing}>
              Confirm Payout
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
