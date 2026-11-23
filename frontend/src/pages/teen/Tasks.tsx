import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { storageService } from '@/services/storageService';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { AssignedProject } from '@/types';
import {
  CheckSquare,
  Clock,
  Send,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';

export const Tasks: React.FC = () => {
  const { teenProfile } = useAuth();
  const { showToast } = useToast();
  const [assignedProjects, setAssignedProjects] = useState<AssignedProject[]>(
    storageService.getAssignedProjects().filter((a) => a.teenId === (teenProfile?.id || 'teen-1'))
  );

  const [selectedProject, setSelectedProject] = useState<AssignedProject | null>(null);
  const [submissionSummary, setSubmissionSummary] = useState('');
  const [deliverableLink, setDeliverableLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenSubmission = (project: AssignedProject) => {
    setSelectedProject(project);
    setSubmissionSummary(project.submissionRecord?.workSummary || '');
    setDeliverableLink(project.submissionRecord?.links[0] || '');
  };

  const handleSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const updated = storageService.submitWork(
        selectedProject.id,
        submissionSummary,
        deliverableLink ? [deliverableLink] : ['https://github.com/aarav-codes/project-demo']
      );

      if (updated) {
        setAssignedProjects((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
        showToast('Work submitted for company review!', 'success');
        setSelectedProject(null);
      }
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Tasks & Deliverables Submission</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Submit completed deliverables, code repositories, design prototypes, and view revision notes.
        </p>
      </div>

      <div className="space-y-6">
        {assignedProjects.map((project) => (
          <Card key={project.id} className="p-6 border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase">
                  {project.companyName}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{project.projectTitle}</h3>
                <span className="text-xs text-slate-500">
                  Deadline: {project.deadline} • Amount: ₹{project.totalAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={project.workStatus === 'Submitted' ? 'blue' : project.workStatus === 'Revision Requested' ? 'amber' : 'green'}>
                  {project.workStatus}
                </Badge>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenSubmission(project)}
                  icon={<Send className="w-3.5 h-3.5" />}
                >
                  {project.workStatus === 'Submitted' ? 'Resubmit Work' : 'Submit Deliverables'}
                </Button>
              </div>
            </div>

            {/* Revision note banner if present */}
            {project.submissionRecord?.revisionFeedback && (
              <div className="mb-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-950 font-bold mb-0.5">
                    Company Requested Revision:
                  </strong>
                  {project.submissionRecord.revisionFeedback}
                </div>
              </div>
            )}

            {/* Submission preview */}
            {project.submissionRecord && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-semibold text-slate-700">Last Submitted Deliverable:</span>
                  <span>{new Date(project.submissionRecord.submittedAt).toLocaleString()}</span>
                </div>
                <p className="text-slate-800">{project.submissionRecord.workSummary}</p>
                {project.submissionRecord.links.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-600 font-bold hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> {link}
                  </a>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Submission Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title="Submit Project Deliverables"
          description={selectedProject.projectTitle}
          maxWidth="lg"
        >
          <form onSubmit={handleSubmitWork} className="space-y-4">
            <Textarea
              label="Deliverable Summary & Notes"
              placeholder="Explain the work you completed, how to test/view it, and any notes for the company..."
              rows={4}
              required
              value={submissionSummary}
              onChange={(e) => setSubmissionSummary(e.target.value)}
            />

            <Input
              label="Deliverable Link (GitHub, Figma, Google Drive, Vercel)"
              placeholder="https://github.com/..."
              required
              value={deliverableLink}
              onChange={(e) => setDeliverableLink(e.target.value)}
            />

            <div className="flex justify-end gap-2 pt-3">
              <Button type="button" variant="outline" onClick={() => setSelectedProject(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>
                Submit to Company
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
