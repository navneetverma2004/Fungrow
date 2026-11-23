import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Users, Copy, Sparkles, Gift, CheckCircle2 } from 'lucide-react';

export const Referrals: React.FC = () => {
  const { showToast } = useToast();
  const referralCode = 'AARAV-TEEN-2026';

  const handleCopy = () => {
    navigator.clipboard?.writeText(referralCode);
    showToast('Referral code copied to clipboard!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Invite Friends & Earn Rewards</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Share Funngro with classmates. When they complete their first project, both of you get 250 XP reward points!
        </p>
      </div>

      <Card className="p-8 border-slate-200 bg-gradient-to-br from-indigo-500/10 via-white to-emerald-500/10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
          <Gift className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">Your Unique Referral Code</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
          Share this code with friends when they register. They get a priority profile badge, and you earn bonus XP.
        </p>

        <div className="inline-flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="font-mono font-extrabold text-lg text-slate-900 px-4">
            {referralCode}
          </span>
          <Button variant="primary" size="sm" onClick={handleCopy} icon={<Copy className="w-4 h-4" />}>
            Copy Code
          </Button>
        </div>
      </Card>

      <Card className="p-6 border-slate-200">
        <h4 className="text-sm font-bold text-slate-900 mb-4">How Funngro Referrals Work</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-emerald-600 block mb-1">1. Share Code</span>
            Send your code or link via WhatsApp, Discord, or Instagram to fellow students.
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-indigo-600 block mb-1">2. Friend Completes Project</span>
            Your friend signs up, sets up their profile, and delivers their first company project.
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-amber-600 block mb-1">3. Both Get 250 XP</span>
            XP boosts your rank on the national Teenlancer Leaderboard.
          </div>
        </div>
      </Card>
    </div>
  );
};
