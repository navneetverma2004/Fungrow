import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { storageService } from '@/services/storageService';
import { useAuth } from '@/context/AuthContext';
import { Application, ApplicationStatus } from '@/types';
import { FileText, Clock, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';

export const MyApplications: React.FC = () => {
  const { teenProfile } = useAuth();
  const [filter, setFilter] = useState<string>('All');

  const allApplications = storageService.getApplications().filter(
    (a) => a.teenId === (teenProfile?.id || 'teen-1')
  );

  const filterTabs = ['All', 'Submitted', 'Under Review', 'Shortlisted', 'Accepted', 'Rejected'];

  const filtered = allApplications.filter((app) => {
    if (filter === 'All') return true;
    return app.status === filter;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Accepted':
        return <Badge variant="green" dot>{status}</Badge>;
      case 'Shortlisted':
        return <Badge variant="indigo" dot>{status}</Badge>;
      case 'Under Review':
        return <Badge variant="amber" dot>{status}</Badge>;
      case 'Rejected':
        return <Badge variant="rose" dot>{status}</Badge>;
      default:
        return <Badge variant="slate" dot>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">My Project Applications</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Track the status of all your submitted proposals and employer review stages.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filter === tab
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((app) => (
            <Card key={app.id} className="p-6 border-slate-200" hover>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{app.companyName}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">
                      Applied on {new Date(app.appliedDate).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {app.projectTitle}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{app.coverLetter}"
                  </p>

                  {app.feedbackNote && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Company Feedback: </strong>
                        {app.feedbackNote}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 flex-shrink-0">
                  {getStatusBadge(app.status)}
                  <Link to={`/teen/projects/${app.projectId}`}>
                    <Button variant="outline" size="sm" className="text-xs">
                      View Project
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center text-slate-500 border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No Applications in "{filter}"</h3>
          <p className="text-xs text-slate-500 mb-4">
            Discover active projects and submit your first proposal.
          </p>
          <Link to="/teen/explore">
            <Button variant="primary" size="sm">
              Explore Projects
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
};
