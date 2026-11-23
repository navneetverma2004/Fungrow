import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AdminReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Grievance & Moderation Reports</h1>
        <p className="text-xs text-slate-400 mt-1">
          Student protection reports and parent inquiries.
        </p>
      </div>

      <Card className="p-8 bg-slate-800/80 border-slate-700 text-center text-white">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold">Zero Active Policy Violations</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          All flagged conversations and user registration checks are fully resolved within our 24-hour SLA.
        </p>
      </Card>
    </div>
  );
};
