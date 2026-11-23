import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { storageService } from '@/services/storageService';
import { useToast } from '@/context/ToastContext';
import { ShieldCheck, Ban, CheckCircle2 } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState(storageService.getTeenProfiles());

  const handleToggleVerify = (id: string) => {
    showToast('User verification status updated', 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Manage Teenlancer Accounts</h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor youth profiles, parental consent status, and moderation actions.
        </p>
      </div>

      <Card className="bg-slate-800/80 border-slate-700 overflow-hidden text-white">
        <div className="divide-y divide-slate-700">
          {users.map((u) => (
            <div key={u.id} className="p-4 sm:px-6 flex items-center justify-between gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <img src={u.avatarUrl} alt={u.displayName} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-white flex items-center gap-2">
                    {u.displayName}
                    <Badge variant="green" size="sm">Consent Verified</Badge>
                  </h4>
                  <span className="text-xs text-slate-400">{u.schoolCollege} • {u.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-emerald-400">
                  ₹{u.totalEarnings.toLocaleString()} Earned
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-900 border-slate-700 text-slate-300 text-xs"
                  onClick={() => handleToggleVerify(u.id)}
                >
                  Audit Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
