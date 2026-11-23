import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { storageService } from '@/services/storageService';

export const AdminProjects: React.FC = () => {
  const projects = storageService.getProjects();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Project Moderation Queue</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review all employer project postings to ensure age appropriateness and zero unpaid labor.
        </p>
      </div>

      <div className="space-y-3">
        {projects.map((p) => (
          <Card key={p.id} className="p-5 bg-slate-800/80 border-slate-700 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase">{p.category}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{p.title}</h3>
                <span className="text-xs text-slate-400">{p.companyName} • Stipend: ₹{p.stipendAmount.toLocaleString()}</span>
              </div>
              <Badge variant="green" size="sm">Approved / Active</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
