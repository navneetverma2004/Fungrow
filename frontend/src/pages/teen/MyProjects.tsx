import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { storageService } from '@/services/storageService';
import { useAuth } from '@/context/AuthContext';
import { Briefcase, Clock, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

export const MyProjects: React.FC = () => {
  const { teenProfile } = useAuth();
  const assignedProjects = storageService.getAssignedProjects().filter(
    (a) => a.teenId === (teenProfile?.id || 'teen-1')
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">My Active Projects</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Assigned projects currently underway with company milestones and deadlines.
          </p>
        </div>
        <Link to="/teen/tasks">
          <Button variant="primary" size="sm">
            Open Tasks & Submission
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {assignedProjects.map((project) => (
          <Card key={project.id} className="p-6 border-slate-200" hover>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
                  {project.companyName}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1.5">{project.projectTitle}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                  <span>Assigned: {new Date(project.assignedDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-700 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Deadline: {project.deadline}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 flex-shrink-0">
                <Badge variant={project.workStatus === 'Submitted' ? 'blue' : project.workStatus === 'Revision Requested' ? 'amber' : 'green'}>
                  {project.workStatus}
                </Badge>
                <span className="text-lg font-extrabold text-emerald-600">
                  ₹{project.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Milestones Preview */}
            <div className="pt-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Milestones Progress ({project.milestones.filter((m) => m.isCompleted).length} / {project.milestones.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {project.milestones.map((m, idx) => (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-xl border text-xs ${
                      m.isCompleted
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : idx === project.currentMilestoneIndex
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-900 ring-2 ring-indigo-100'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span>Milestone {idx + 1}</span>
                      <span>₹{m.payoutAmount.toLocaleString()}</span>
                    </div>
                    <p className="line-clamp-1">{m.title}</p>
                    <div className="mt-2 text-[10px] font-semibold">
                      {m.isCompleted ? '✓ Completed' : `Due: ${m.deadline}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
