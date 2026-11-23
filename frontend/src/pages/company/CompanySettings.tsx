import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Lock, Bell, Shield, Save } from 'lucide-react';

export const CompanySettings: React.FC = () => {
  const { showToast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Security and notification settings updated!', 'success');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Account & Security Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage password, notification preferences, and team access.
        </p>
      </div>

      <Card className="p-8 border-slate-200">
        <form onSubmit={handleSave} className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Change Password</h3>
          <Input label="Current Password" type="password" placeholder="••••••••" />
          <Input label="New Password" type="password" placeholder="••••••••" />
          <Input label="Confirm New Password" type="password" placeholder="••••••••" />

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Notification Preferences
            </h3>
            <div className="space-y-2 text-xs text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
                <span>Notify via email when a new proposal is submitted</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
                <span>Notify when milestone deliverables are submitted for review</span>
              </label>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
              Save Settings
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
