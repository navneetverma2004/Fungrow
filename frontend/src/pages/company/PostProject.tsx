import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { storageService } from '@/services/storageService';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { ProjectCategory } from '@/types';
import {
  PlusCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  Clock,
  Wand2,
} from 'lucide-react';

export const PostProject: React.FC = () => {
  const navigate = useNavigate();
  const { companyProfile } = useAuth();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development' as ProjectCategory,
    shortDescription: '',
    detailedDescription: '',
    objectives: 'Build 5 interactive React widgets\nEnsure keyboard navigation\nDeploy live demo on Vercel',
    responsibilities: 'Review design mockups\nWrite clean modular TypeScript code\nSubmit Git repository',
    deliverables: 'GitHub repository with documentation\nLive Vercel preview link',
    requiredSkills: 'React.js, TypeScript, Tailwind CSS',
    experienceLevel: 'Intermediate' as 'Beginner' | 'Intermediate' | 'Advanced',
    projectType: 'remote' as 'remote' | 'on-site' | 'hybrid',
    durationWeeks: 2,
    stipendAmount: 4500,
    openingsCount: 1,
    deadline: '2026-12-15',
  });

  const handleAiPolish = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setIsAiGenerating(false);
      setFormData((prev) => ({
        ...prev,
        detailedDescription: `We are looking for a creative and motivated student Teenlancer to help develop a responsive ${prev.category} project. You will work directly with our engineering team, follow clean coding principles, and build a production-quality feature for our active users.`,
        shortDescription: `Build high-quality ${prev.category} deliverables with guidance from experienced engineers. Perfect for ambitious high-school and college coders.`,
      }));
      showToast('AI polished project description based on your category!', 'success');
    }, 800);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDescription) {
      showToast('Please fill all required project fields', 'error');
      return;
    }

    const newProject = storageService.createProject({
      companyId: companyProfile?.id || 'comp-1',
      companyName: companyProfile?.companyName || 'Nexus Innovations',
      companyLogo: companyProfile?.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120',
      companyIndustry: companyProfile?.industry || 'Technology',
      title: formData.title,
      category: formData.category,
      shortDescription: formData.shortDescription,
      detailedDescription: formData.detailedDescription || formData.shortDescription,
      objectives: formData.objectives.split('\n').filter(Boolean),
      responsibilities: formData.responsibilities.split('\n').filter(Boolean),
      deliverables: formData.deliverables.split('\n').filter(Boolean),
      requiredSkills: formData.requiredSkills.split(',').map((s) => s.trim()),
      experienceLevel: formData.experienceLevel,
      projectType: formData.projectType,
      durationWeeks: Number(formData.durationWeeks),
      stipendAmount: Number(formData.stipendAmount),
      openingsCount: Number(formData.openingsCount),
      deadline: formData.deadline,
      status: 'published',
      featured: true,
      matchScore: 95,
    });

    showToast('Project published successfully and is now discoverable to Teenlancers!', 'success');
    navigate('/company/projects');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Post a New Project</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete our 5-step guided wizard to attract talented high-school and college creators.
        </p>
      </div>

      <Card className="p-8 border-slate-200 shadow-xl">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 text-xs font-bold text-slate-600">
          {['Info', 'Requirements', 'Timeline', 'Budget', 'Publish'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center ${
                  step === i + 1
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                    : step > i + 1
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className="hidden sm:inline">{label}</span>
            </div>
          ))}
        </div>

        {/* STEP 1: Basic Project Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Step 1: Project Information</h3>

            <Input
              label="Project Title"
              placeholder="e.g. Build Interactive Quiz Widgets in React"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm"
              >
                <option value="Web Development">Web Development</option>
                <option value="App Development">App Development</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Video Editing">Video Editing</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Social Media">Social Media</option>
                <option value="Data Entry">Data Entry</option>
                <option value="Research">Research</option>
                <option value="Surveys">Surveys</option>
                <option value="App Testing">App Testing</option>
                <option value="AI/ML">AI/ML</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Short Summary
                </label>
                <button
                  type="button"
                  onClick={handleAiPolish}
                  className="text-xs text-indigo-600 font-bold flex items-center gap-1 hover:underline"
                >
                  <Wand2 className="w-3.5 h-3.5" /> AI Description Helper
                </button>
              </div>
              <Textarea
                placeholder="2-3 sentences summarizing the project goals..."
                rows={2}
                required
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              />
            </div>

            <Textarea
              label="Detailed Scope / Description"
              placeholder="Provide background, expectations, and any helpful context..."
              rows={4}
              value={formData.detailedDescription}
              onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
            />

            <div className="flex justify-end pt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  if (!formData.title) {
                    showToast('Please provide a project title', 'error');
                    return;
                  }
                  setStep(2);
                }}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Next: Requirements
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Requirements */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Step 2: Candidate Requirements</h3>

            <Input
              label="Required Skills (Comma-Separated)"
              placeholder="e.g. React.js, Tailwind CSS, TypeScript, Git"
              value={formData.requiredSkills}
              onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Experience Level
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as any })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm"
                >
                  <option value="Beginner">Beginner Friendly</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <Input
                label="Number of Openings"
                type="number"
                min={1}
                value={formData.openingsCount}
                onChange={(e) => setFormData({ ...formData, openingsCount: Number(e.target.value) })}
              />
            </div>

            <Textarea
              label="Key Objectives (One per line)"
              rows={3}
              value={formData.objectives}
              onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
            />

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)} icon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button variant="secondary" onClick={() => setStep(3)} icon={<ArrowRight className="w-4 h-4" />}>
                Next: Work Details
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Timeline & Deliverables */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Step 3: Timeline & Deliverables</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Work Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value as any })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm"
                >
                  <option value="remote">100% Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <Input
                label="Duration (Weeks)"
                type="number"
                min={1}
                value={formData.durationWeeks}
                onChange={(e) => setFormData({ ...formData, durationWeeks: Number(e.target.value) })}
              />

              <Input
                label="Application Deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>

            <Textarea
              label="Expected Deliverables (One per line)"
              rows={3}
              value={formData.deliverables}
              onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
            />

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)} icon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button variant="secondary" onClick={() => setStep(4)} icon={<ArrowRight className="w-4 h-4" />}>
                Next: Compensation
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: Compensation */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Step 4: Compensation & Escrow</h3>

            <Input
              label="Fixed Project Stipend (INR)"
              type="number"
              placeholder="e.g. 4500"
              required
              value={formData.stipendAmount}
              onChange={(e) => setFormData({ ...formData, stipendAmount: Number(e.target.value) })}
            />

            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 space-y-2">
              <strong className="block font-bold">Safe Escrow Terms:</strong>
              <p>
                Milestone funds are funded securely into platform escrow upon candidate assignment. Funds are released to the student only after you review and approve their deliverables.
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(3)} icon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button variant="secondary" onClick={() => setStep(5)} icon={<ArrowRight className="w-4 h-4" />}>
                Next: Review & Publish
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: Review & Publish */}
        {step === 5 && (
          <form onSubmit={handlePublish} className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Step 5: Review & Publish</h3>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Project Title:</span>
                <span className="font-bold text-slate-900">{formData.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Category:</span>
                <Badge variant="indigo">{formData.category}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Stipend:</span>
                <span className="font-extrabold text-emerald-700">₹{formData.stipendAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span>{formData.durationWeeks} Weeks • {formData.projectType}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(4)} icon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button
                type="submit"
                variant="secondary"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                Publish Project to Teenlancers
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};
