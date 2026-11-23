import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { storageService } from '@/services/storageService';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building2,
  Award,
  ShieldCheck,
  ArrowLeft,
  FileText,
  Send,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user, teenProfile } = useAuth();
  const { showToast } = useToast();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [portfolioLink, setPortfolioLink] = useState(teenProfile?.portfolioUrl || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const project = storageService.getProjectById(projectId || '');
  const myApplications = storageService.getApplications();
  const existingApp = myApplications.find(
    (a) => a.projectId === projectId && a.teenId === (teenProfile?.id || 'teen-1')
  );

  if (!project) {
    return (
      <Card className="p-12 text-center text-slate-500 max-w-lg mx-auto">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Project Not Found</h3>
        <p className="text-xs text-slate-500 mb-4">
          The requested project does not exist or has closed for applications.
        </p>
        <Link to="/teen/explore">
          <Button variant="outline">Browse Other Projects</Button>
        </Link>
      </Card>
    );
  }

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverLetter.trim()) {
      showToast('Please write a brief proposal note', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      storageService.createApplication({
        projectId: project.id,
        projectTitle: project.title,
        companyId: project.companyId,
        companyName: project.companyName,
        companyLogo: project.companyLogo,
        teenId: teenProfile?.id || 'teen-1',
        teenName: teenProfile?.displayName || user?.fullName || 'Aarav Sharma',
        teenAvatar: teenProfile?.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200',
        teenSkills: teenProfile?.skills || ['React.js', 'Tailwind CSS'],
        teenRating: teenProfile?.rating || 4.9,
        teenEducation: teenProfile?.classGrade || 'Class 11',
        coverLetter,
        portfolioLinks: portfolioLink ? [portfolioLink] : [],
      });

      setIsApplyModalOpen(false);
      showToast('Application submitted successfully! The company has been notified.', 'success');
      navigate('/teen/my-applications');
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/teen/explore" className="hover:text-slate-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Explore
        </Link>
        <span>/</span>
        <span className="text-slate-700 truncate">{project.title}</span>
      </div>

      {/* Main Header Card */}
      <Card className="p-6 sm:p-8 border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <img
              src={project.companyLogo}
              alt={project.companyName}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 bg-white"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="indigo" size="sm">
                  {project.category}
                </Badge>
                <span className="text-xs font-semibold text-slate-500">{project.projectType}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
                {project.title}
              </h1>
              <span className="text-xs font-bold text-indigo-600 block">
                {project.companyName} • {project.companyIndustry || 'Verified Enterprise'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-3 flex-shrink-0">
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block">Guaranteed Stipend</span>
              <span className="text-2xl font-extrabold text-emerald-600">
                ₹{project.stipendAmount.toLocaleString()}
              </span>
            </div>

            {existingApp ? (
              <Badge variant="green" size="md">
                Application Status: {existingApp.status}
              </Badge>
            ) : (
              <Button
                variant="primary"
                size="md"
                className="font-bold shadow-md shadow-emerald-500/20"
                onClick={() => setIsApplyModalOpen(true)}
                icon={<Send className="w-4 h-4" />}
              >
                Apply for Project
              </Button>
            )}
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs text-slate-600">
          <div>
            <span className="text-slate-400 block mb-0.5">Duration</span>
            <span className="font-bold text-slate-800">{project.durationWeeks} Weeks</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Experience Level</span>
            <span className="font-bold text-slate-800">{project.experienceLevel}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Application Deadline</span>
            <span className="font-bold text-slate-800">{project.deadline}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Openings</span>
            <span className="font-bold text-slate-800">{project.openingsCount} Candidate(s)</span>
          </div>
        </div>
      </Card>

      {/* Two Column Layout: Project Info vs Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Detailed Overview */}
          <Card className="p-6 border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-3">Project Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line mb-6">
              {project.detailedDescription}
            </p>

            <h3 className="text-base font-bold text-slate-900 mb-3">Core Objectives</h3>
            <ul className="space-y-2 mb-6">
              {project.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-base font-bold text-slate-900 mb-3">Expected Deliverables</h3>
            <ul className="space-y-2">
              {project.deliverables.map((del, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-2" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Required Skills */}
          <Card className="p-6 border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-3">Required Skills & Tools</h3>
            <div className="flex flex-wrap gap-2">
              {project.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar: Company Info & Safety Shield */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              About the Employer
            </h3>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={project.companyLogo}
                alt={project.companyName}
                className="w-10 h-10 rounded-xl object-cover bg-white ring-1 ring-slate-200"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{project.companyName}</h4>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Company
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Verified employer partnering with Funngro to provide experiential project opportunities for talented teenagers.
            </p>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
              <div>Industry: {project.companyIndustry || 'Technology'}</div>
              <div>Payment Escrow: 100% Guaranteed</div>
            </div>
          </Card>

          <Card className="p-5 border-emerald-200 bg-emerald-50/50">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Student Safety Assured</span>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              All communications and milestone reviews take place safely inside the Funngro dashboard. Never share your private contact information.
            </p>
          </Card>
        </div>
      </div>

      {/* Application Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Apply for Project"
        description={project.title}
        maxWidth="lg"
      >
        <form onSubmit={handleApply} className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>Stipend: <strong className="text-emerald-700">₹{project.stipendAmount.toLocaleString()}</strong></span>
            <span>Duration: <strong>{project.durationWeeks} Weeks</strong></span>
          </div>

          <Textarea
            label="Proposal / Cover Letter"
            placeholder="Tell the company why you are a great fit, which tools you will use, and past similar work..."
            rows={4}
            required
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />

          <Input
            label="Relevant Work / Portfolio Link"
            placeholder="https://github.com/your-username or portfolio link"
            value={portfolioLink}
            onChange={(e) => setPortfolioLink(e.target.value)}
          />

          <div className="pt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsApplyModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              icon={<Send className="w-4 h-4" />}
            >
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
