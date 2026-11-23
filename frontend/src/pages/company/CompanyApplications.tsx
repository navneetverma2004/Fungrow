import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { storageService } from '@/services/storageService';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Application, ApplicationStatus } from '@/types';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Star,
  Clock,
  Sparkles,
  UserCheck,
} from 'lucide-react';

export const CompanyApplications: React.FC = () => {
  const { companyProfile } = useAuth();
  const { showToast } = useToast();
  const companyId = companyProfile?.id || 'comp-1';

  const [applications, setApplications] = useState<Application[]>(
    storageService.getApplications().filter((a) => a.companyId === companyId)
  );
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const handleStatusChange = (appId: string, status: ApplicationStatus) => {
    const updated = storageService.updateApplicationStatus(appId, status);
    if (updated) {
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? updated : a))
      );
      showToast(`Candidate application marked as ${status}! Teen notified.`, 'success');
      setSelectedApp(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Candidate Applications</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review proposals from student Teenlancers. Inspect portfolios and shortlist or accept candidates.
        </p>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id} className="p-6 border-slate-200" hover>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <img
                  src={app.teenAvatar}
                  alt={app.teenName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{app.teenName}</h3>
                    <span className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {app.teenRating}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 block mb-2">{app.teenEducation}</span>

                  <div className="text-xs text-indigo-700 font-semibold mb-2">
                    Applied for: <strong>{app.projectTitle}</strong>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 max-w-2xl leading-relaxed">
                    "{app.coverLetter}"
                  </p>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {app.teenSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex flex-col sm:items-end gap-3 flex-shrink-0">
                <Badge variant={app.status === 'Accepted' ? 'green' : app.status === 'Shortlisted' ? 'indigo' : 'slate'}>
                  {app.status}
                </Badge>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setSelectedApp(app)}
                  >
                    View Details
                  </Button>
                  {app.status !== 'Accepted' && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="text-xs font-bold"
                      onClick={() => handleStatusChange(app.id, 'Accepted')}
                      icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    >
                      Accept
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Review Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title="Review Candidate Proposal"
          description={selectedApp.teenName}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase text-slate-500">Proposal</span>
              <p className="text-sm text-slate-800 bg-slate-50 p-4 rounded-xl mt-1 leading-relaxed">
                {selectedApp.coverLetter}
              </p>
            </div>

            {selectedApp.portfolioLinks.length > 0 && (
              <div>
                <span className="text-xs font-bold uppercase text-slate-500">Portfolio Links</span>
                <div className="space-y-1.5 mt-1">
                  {selectedApp.portfolioLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> {link}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleStatusChange(selectedApp.id, 'Rejected')}
              >
                Reject Application
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(selectedApp.id, 'Shortlisted')}
                >
                  Shortlist
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleStatusChange(selectedApp.id, 'Accepted')}
                >
                  Accept Candidate
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
