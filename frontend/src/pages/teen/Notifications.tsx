import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { storageService } from '@/services/storageService';
import { useAuth } from '@/context/AuthContext';
import { Bell, CheckCircle2, DollarSign, Info } from 'lucide-react';

export const Notifications: React.FC = () => {
  const { teenProfile } = useAuth();
  const [notifications, setNotifications] = useState(
    storageService.getNotifications(teenProfile?.id || 'teen-1')
  );

  const markRead = (id: string) => {
    storageService.markNotificationRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Notifications</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Recent updates on applications, milestone approvals, and payments.
        </p>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <Card
            key={n.id}
            onClick={() => markRead(n.id)}
            className={`p-4 sm:p-5 border-slate-200 cursor-pointer transition-colors ${
              !n.isRead ? 'bg-emerald-50/30 border-emerald-200' : ''
            }`}
            hover
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-xl flex-shrink-0 ${
                  n.type === 'payment'
                    ? 'bg-emerald-100 text-emerald-700'
                    : n.type === 'success'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {n.type === 'payment' ? (
                  <DollarSign className="w-5 h-5" />
                ) : (
                  <Bell className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{n.title}</h4>
                  <span className="text-[10px] text-slate-400">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
              </div>

              {!n.isRead && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-2" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
