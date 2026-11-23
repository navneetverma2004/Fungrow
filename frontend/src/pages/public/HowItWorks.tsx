import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Wallet,
  CheckCircle2,
  Users,
  Building2,
  FileText,
  Clock,
  Layers,
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activePortal, setActivePortal] = useState<'teen' | 'company'>('teen');

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="green" size="md">Complete Walkthrough</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-3 mb-4">
            How Funngro Works
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            A comprehensive, dual-sided guide explaining how Teenlancers discover certified projects and how companies hire top young talent.
          </p>

          <div className="inline-flex p-1 bg-slate-200 rounded-xl mt-6">
            <button
              onClick={() => setActivePortal('teen')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activePortal === 'teen'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Teenlancer Pathway
            </button>
            <button
              onClick={() => setActivePortal('company')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activePortal === 'company'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Company Pathway
            </button>
          </div>
        </div>

        {activePortal === 'teen' ? (
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-8 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Register & Complete Profile</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    Sign up with your basic details, school or college name, and age. Pick your interests (Web Development, Video Editing, AI, Design, etc.) and list your skills. Add your portfolio or GitHub links if you have them.
                  </p>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Parental / Guardian Consent check ensures full safety compliance under Indian policies.</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Discover Matched Projects</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    Our smart recommendation engine scores projects based on your skills and interests. Filter by duration, budget, and difficulty level (Beginner, Intermediate, Advanced).
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Submit a Proposal & Get Accepted</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    Write a concise application note explaining why you are excited about the project and attach sample work. When the company accepts your application, the project moves to your active dashboard.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Submit Deliverables & Request Review</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    Work on the project according to the deadline. Submit links to your code repository, design Figma, or video file. The company can review and either approve or request constructive revisions.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Earn Direct Payouts & Certified Badge</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    Once approved, your stipend is credited instantly to your Funngro wallet balance. Withdraw to UPI or verified bank account anytime. Plus, an official certificate of experience is added to your portfolio!
                  </p>
                </div>
              </div>
            </Card>

            <div className="text-center pt-4">
              <Link to="/teen/explore">
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Start Exploring Projects
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-8 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Create an Employer Account</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Set up your company profile with your company name, industry, website, and verification credentials.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Post a Project with Milestones</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Define project scope, deliverables, timeline, required skills, and stipend budget. Our AI helper can assist in polishing requirements.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Review & Shortlist Candidates</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    View candidate submissions, inspect work portfolios, and accept the best student creator with 1 click.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Inspect Deliverables & Approve</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Review submitted assets directly in the company workspace. Release payments with full confidence and leave an endorsement.
                  </p>
                </div>
              </div>
            </Card>

            <div className="text-center pt-4">
              <Link to="/company/post-project">
                <Button variant="secondary" size="lg" icon={<Building2 className="w-5 h-5" />}>
                  Post a Project Today
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
