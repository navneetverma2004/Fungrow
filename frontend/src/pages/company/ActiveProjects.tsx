import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';
import { storageService } from '@/services/storageService';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { AssignedProject } from '@/types';
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export const ActiveProjects: React.FC = () => {
  const { companyProfile } = useAuth();
  const { showToast } = useToast();
  const companyId = companyProfile?.id || 'comp-1';

  const [activeProjects, setActiveProjects] = useState<AssignedProject[]>(
    storageService.getAssignedProjects().filter((a) => a.companyId === companyId)
  );

  const [reviewingProject, setReviewingProject] = useState<AssignedProject | null>(null);
  const [revisionFeedback, setRevisionFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = (assignedId: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const updated = storageService.reviewSubmission(assignedId, 'approve');
      if (updated) {
        setActiveProjects((prev) =>
          prev.map((p) => (p.id === assignedId ? updated : p))
        );
        showToast('Milestone deliverables approved! Milestone payout released to student wallet.', 'success');
        setReviewingProject(null);
      }
    }, 700);
  };

  const handleRequestRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingProject || !revisionFeedback.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const updated = storageService.reviewSubmission(reviewingProject.id, 'revise', revisionFeedback);
      if (updated) {
        setActiveProjects((prev) =>
          prev.map((p) => (p.id === reviewingProject.id ? updated : p))
        );
        showToast('Revision request sent to the student with your notes.', 'info');
        setReviewingProject(null);
        setRevisionFeedback('');
      }
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Active Projects & Deliverables</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review work submitted by Teenlancers, approve milestones to release payments, or request revisions.
        </p>
      </div>

      <div className="space-y-6">
        {activeProjects.map((project) => (
          <Card key={project.id} className="p-6 border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase">
                  Teenlancer: {project.teenName}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{project.projectTitle}</h3>
                <span className="text-xs text-slate-500">
                  Assigned on: {new Date(project.assignedDate).toLocaleDateString()} • Deadline: {project.deadline}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={project.workStatus === 'Submitted' ? 'blue' : project.workStatus === 'Approved' ? 'green' : 'amber'}>
                  {project.workStatus}
                </Badge>
                <span className="text-base font-extrabold text-slate-900">
                  ₹{project.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submission Record Details if Submitted */}
            {project.submissionRecord && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-bold text-slate-700">Student Submission Details:</span>
                  <span>Submitted: {new Date(project.submissionRecord.submittedAt).toLocaleString()}</span>
                </div>

                <p className="text-slate-800 text-sm leading-relaxed">
                  "{project.submissionRecord.workSummary}"
                </p>

                {project.submissionRecord.links.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-indigo-600 font-bold hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> {link}
                  </a>
                ))}

                {/* Review actions */}
                {project.workStatus === 'Submitted' && (
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReviewingProject(project)}
                    >
                      Request Revisions
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleApprove(project.id)}
                      icon={<CheckCircle2 className="w-4 h-4" />}
                    >
                      Approve & Release Milestone
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Revision Request Modal */}
      {reviewingProject && (
        <Modal
          isOpen={!!reviewingProject}
          onClose={() => setReviewingProject(null)}
          title="Request Deliverable Revisions"
          description={reviewingProject.projectTitle}
          maxWidth="md"
        >
          <form onSubmit={handleRequestRevision} className="space-y-4">
            <Textarea
              label="Revision Feedback Notes"
              placeholder="Explain clearly what needs adjustments or additions..."
              rows={4}
              required
              value={revisionFeedback}
              onChange={(e) => setRevisionFeedback(e.target.value)}
            />
            <div className="flex justify-end gap-2 pt-3">
              <Button type="button" variant="outline" onClick={() => setReviewingProject(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isProcessing}>
                Send Revision Request
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
