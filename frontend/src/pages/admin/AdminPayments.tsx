import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { storageService } from '@/services/storageService';

export const AdminPayments: React.FC = () => {
  const txns = storageService.getTransactions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Platform Transaction Audit Logs</h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete ledger of milestone releases, student wallet withdrawals, and escrow deposits.
        </p>
      </div>

      <Card className="bg-slate-800/80 border-slate-700 overflow-hidden text-white">
        <div className="divide-y divide-slate-700">
          {txns.map((t) => (
            <div key={t.id} className="p-4 flex items-center justify-between text-xs sm:text-sm">
              <div>
                <h4 className="font-bold text-white">{t.description}</h4>
                <span className="text-xs text-slate-400">{new Date(t.date).toLocaleString()} • Ref: {t.referenceId}</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-emerald-400 block">₹{t.amount.toLocaleString()}</span>
                <Badge variant="green" size="sm">{t.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
