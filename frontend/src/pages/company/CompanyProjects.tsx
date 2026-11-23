import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { storageService } from '@/services/storageService';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { PlusCircle, Users, Clock, Edit3, Pause, CheckCircle2, Search } from 'lucide-react';

export const CompanyProjects: React.FC = () => {
  const { companyProfile } = useAuth();
  const { showToast } = useToast();
  const companyId = companyProfile?.id || 'comp-1';

  const [projects, setProjects] = useState(
    storageService.getProjects().filter((p) => p.companyId === companyId)
  );
  const [filter, setFilter] = useState('All');

  const toggleStatus = (id: string, current: string) => {
    const next = current === 'paused' ? 'published' : 'paused';
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: next as any } : p))
    );
    showToast(`Project status changed to ${next}`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Project Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Oversee published listings, pause applications, or edit requirements.
          </p>
        </div>
        <Link to="/company/post-project">
          <Button variant="primary" size="sm" icon={<PlusCircle className="w-4 h-4" />}>
            Post New Project
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {projects.map((p) => (
          <Card key={p.id} className="p-6 border-slate-200" hover>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="indigo" size="sm">{p.category}</Badge>
                  <span className="text-xs text-slate-500">{p.durationWeeks} Weeks • {p.projectType}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 max-w-2xl">{p.shortDescription}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
                  <span>Stipend: <strong className="text-emerald-700">₹{p.stipendAmount.toLocaleString()}</strong></span>
                  <span>•</span>
                  <span>Openings: <strong>{p.openingsCount}</strong></span>
                  <span>•</span>
                  <span>Applicants: <strong className="text-indigo-600">{p.applicantCount} candidates</strong></span>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
                <Badge variant={p.status === 'published' ? 'green' : 'amber'}>
                  {p.status}
                </Badge>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => toggleStatus(p.id, p.status)}
                  >
                    {p.status === 'paused' ? 'Activate' : 'Pause'}
                  </Button>
                  <Link to="/company/applications">
                    <Button variant="secondary" size="sm" className="text-xs">
                      View Applicants ({p.applicantCount})
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
