import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { storageService } from '@/services/storageService';
import {
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Target,
  Zap,
  TrendingUp,
  FileCheck2,
  PlusCircle,
  Briefcase,
  Star,
  Clock,
  Layers,
  ChevronRight,
  Plus,
  Minus,
} from 'lucide-react';

export const CompanyLanding: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const talentProfiles = storageService.getTeenProfiles().slice(0, 4);

  const perks = [
    {
      icon: Zap,
      title: 'Digital Native Intuition',
      desc: 'Gen Z lives on social media, Discord, and code playgrounds. They instinctively know what resonates with youth consumers.',
    },
    {
      icon: Target,
      title: 'High Focus & Agility',
      desc: 'Micro-projects with dedicated students mean rapid completion cycles without bureaucratic delays or agency overheads.',
    },
    {
      icon: TrendingUp,
      title: 'Superior Cost Efficiency',
      desc: 'Transparent project pricing. Complete targeted research, testing, or creative collateral at a fraction of traditional firm costs.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Risk Escrow Guarantee',
      desc: 'Milestone escrow ensures your budget is strictly protected. Payouts are made only after you review and approve deliverables.',
    },
  ];

  const workflowSteps = [
    {
      num: '01',
      title: 'Define Project & Budget',
      desc: 'Outline objectives, deliverables, required skills, and stipend using our guided project wizard.',
    },
    {
      num: '02',
      title: 'Smart Applications Flow In',
      desc: 'Review filtered applications with student portfolio links, ratings, and custom proposals.',
    },
    {
      num: '03',
      title: 'Assign & Track Milestones',
      desc: 'Collaborate inside a private workspace, receive progress updates, and inspect deliverables.',
    },
    {
      num: '04',
      title: 'Approve & Release Payment',
      desc: 'Review work, request revisions if required, and approve completion with an instant rating and feedback.',
    },
  ];

  const faqs = [
    {
      q: 'How does Funngro verify the quality of student work?',
      a: 'We evaluate students through skill assessments, verified portfolios, and past project ratings. Plus, you have 100% control to review deliverables and request revisions before approving milestone payments.',
    },
    {
      q: 'What types of companies hire on Funngro?',
      a: 'Over 3,500 enterprises hire on Funngro, ranging from high-growth tech startups and D2C brands to EdTech companies and marketing agencies.',
    },
    {
      q: 'Can our company request NDA or intellectual property assignment?',
      a: 'Yes. All project deliverables belong exclusively to the publishing company upon milestone payout, backed by our platform standard IP terms.',
    },
    {
      q: 'How fast can we receive candidate proposals?',
      a: 'Most projects receive their first qualified student proposals within 4 to 8 hours of being published.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* COMPANY HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-funngro-navy to-slate-900 text-white pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-6">
              <Building2 className="w-3.5 h-3.5" />
              <span>For Modern Enterprises & Growing Startups</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Find Young Talent.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300">
                Build Something Great.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10">
              Connect with motivated young creators, discover emerging talent, and manage meaningful projects through one intelligent platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/company/post-project" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 font-bold"
                  icon={<PlusCircle className="w-5 h-5" />}
                >
                  Post a Project
                </Button>
              </Link>
              <Link to="/how-it-works" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-slate-800 text-white border-slate-700 hover:bg-slate-700 font-bold"
                  icon={<ArrowRight className="w-5 h-5 text-slate-400" />}
                >
                  Explore How It Works
                </Button>
              </Link>
            </div>

            {/* Metric Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-10 border-t border-slate-800/80">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-2xl font-bold text-indigo-400">&lt; 8 Hours</div>
                <div className="text-xs text-slate-400 mt-0.5">Average Match Time</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-2xl font-bold text-white">98.4%</div>
                <div className="text-xs text-slate-400 mt-0.5">Project Satisfaction</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-2xl font-bold text-emerald-400">Escrow Protected</div>
                <div className="text-xs text-slate-400 mt-0.5">Approve Before Paying</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-2xl font-bold text-amber-400">3,500+</div>
                <div className="text-xs text-slate-400 mt-0.5">Companies Registered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY COMPANIES CHOOSE FUNNGRO */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Competitive Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
              Why Forward-Thinking Businesses Choose Funngro
            </h2>
            <p className="text-base text-slate-600">
              Supercharge your creative pipelines, product beta testing, and youth insights with ambitious talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((p) => {
              const Icon = p.icon;
              return (
                <Card key={p.title} className="p-6 border-slate-200" hover>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* HIRING WORKFLOW */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Streamlined Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
              How Project Hiring Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {workflowSteps.map((s) => (
              <Card key={s.num} className="p-6 border-slate-200" hover>
                <div className="text-2xl font-extrabold text-indigo-600 mb-3">{s.num}</div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{s.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VERIFIED TALENT SHOWCASE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                Talent Pool
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Discover Emerging High-Skill Teenlancers
              </h2>
            </div>
            <Link to="/company/talent" className="mt-4 md:mt-0 text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              Search Full Talent Directory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {talentProfiles.map((talent) => (
              <Card key={talent.id} className="p-6 text-center" hover>
                <img
                  src={talent.avatarUrl}
                  alt={talent.displayName}
                  className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-indigo-50 mb-4"
                />
                <h4 className="text-base font-bold text-slate-900">{talent.displayName}</h4>
                <p className="text-xs text-indigo-600 font-semibold mb-2">{talent.badgeLevel}</p>
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {talent.aboutMe}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
                  {talent.skills.slice(0, 3).map((s) => (
                    <Badge key={s} variant="slate" size="sm">
                      {s}
                    </Badge>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {talent.rating}
                  </span>
                  <span>{talent.completedProjectsCount} Completed</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY FAQS */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Company & Employer FAQs
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-slate-900 text-sm"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <Minus className="w-4 h-4 text-indigo-600" /> : <Plus className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-funngro-navy via-slate-900 to-indigo-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Build Your Next Feature or Campaign with Gen Z Talent.
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
            Create an employer account, post a project in 3 minutes, and start reviewing qualified candidate proposals today.
          </p>
          <Link to="/company/post-project">
            <Button
              variant="primary"
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 shadow-xl font-bold"
              icon={<PlusCircle className="w-5 h-5" />}
            >
              Post a Project Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
