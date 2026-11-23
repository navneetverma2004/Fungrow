import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { storageService } from '@/services/storageService';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Wallet,
  TrendingUp,
  CheckCircle2,
  Code2,
  Palette,
  Video,
  PenTool,
  BrainCircuit,
  Search,
  Lock,
  Compass,
  Star,
  Trophy,
  ChevronRight,
  Clock,
  Heart,
  Plus,
  Minus,
} from 'lucide-react';

export const TeenLanding: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const allProjects = storageService.getProjects();

  const categories = [
    'All',
    'Web Development',
    'Graphic Design',
    'Video Editing',
    'Content Writing',
    'App Testing',
    'Research',
  ];

  const filteredProjects = selectedCategory === 'All'
    ? allProjects.slice(0, 4)
    : allProjects.filter((p) => p.category === selectedCategory).slice(0, 4);

  const steps = [
    {
      num: '01',
      title: 'Create Your Profile',
      desc: 'Showcase your school, skills, interests and hobbies. Add links to GitHub, Behance or past school assignments.',
    },
    {
      num: '02',
      title: 'Parent/Guardian Consent',
      desc: 'Complying with safety standards, a simple digital consent link is confirmed by your parent or guardian.',
    },
    {
      num: '03',
      title: 'Smart Project Match',
      desc: 'Our engine matches you with real company projects that suit your current skill level and academic schedule.',
    },
    {
      num: '04',
      title: 'Collaborate & Deliver',
      desc: 'Submit your work deliverables through guided milestones with direct company feedback.',
    },
    {
      num: '05',
      title: 'Earn & Get Certified',
      desc: 'Receive direct UPI/bank payouts in your Funngro wallet and earn accredited work completion certificates.',
    },
  ];

  const faqs = [
    {
      q: 'Can I do projects while going to school or preparing for exams?',
      a: 'Absolutely! Funngro projects are micro-assignments taking 4 to 10 hours a week with flexible remote schedules designed to fit around your homework, classes, and exams.',
    },
    {
      q: 'What if I am a beginner with no prior freelance experience?',
      a: 'We have projects tagged as "Beginner" specifically intended for first-time Teenlancers. Companies value your creativity and fresh perspective.',
    },
    {
      q: 'Will my school teachers or college admissions recognize my certificates?',
      a: 'Yes. Funngro certificates contain verified project credentials, company signatures, and skill tags, widely used by alumni in university portfolios.',
    },
    {
      q: 'Is my personal contact information shared with companies?',
      a: 'No. To protect minors, we use privacy-safe display names (e.g., "Aarav S."). Direct phone numbers and personal emails are never shared publicly.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* TEEN HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-funngro-navy via-slate-900 to-indigo-950 text-white pt-16 pb-20 lg:pt-24 lg:pb-32">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-6">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>For Teenlancers (Ages 13-19)</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Turn Your Skills Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300">
                Real Opportunities.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10">
              Find projects that match your interests, collaborate with companies, gain practical experience, and build a portfolio that grows with you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/teen/explore" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-xl shadow-emerald-500/25 font-bold"
                  icon={<Compass className="w-5 h-5" />}
                >
                  Explore Projects Now
                </Button>
              </Link>
              <Link to="/auth/register" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-slate-800 text-white border-slate-700 hover:bg-slate-700 font-bold"
                  icon={<Sparkles className="w-5 h-5 text-amber-300" />}
                >
                  Create Your Free Profile
                </Button>
              </Link>
            </div>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-10 border-t border-slate-800/80">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-2xl font-bold text-emerald-400">₹2,000 - ₹8,000</div>
                <div className="text-xs text-slate-400 mt-0.5">Average Stipend / Project</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-2xl font-bold text-white">100% Remote</div>
                <div className="text-xs text-slate-400 mt-0.5">Work from Home</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-2xl font-bold text-indigo-400">Verified Certs</div>
                <div className="text-xs text-slate-400 mt-0.5">College Admissions Edge</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-2xl font-bold text-amber-400">Direct UPI</div>
                <div className="text-xs text-slate-400 mt-0.5">Instant Wallet Payouts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-STEP WORKING PROCESS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Clear Path
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
              Your 5-Step Journey on Funngro
            </h2>
            <p className="text-base text-slate-600">
              From signing up to receiving your first income and certificate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((s, idx) => (
              <Card
                key={s.num}
                className="p-6 border-slate-200 hover:border-emerald-400 flex flex-col justify-between"
                hover
              >
                <div>
                  <span className="text-3xl font-extrabold text-emerald-600 mb-4 block">
                    {s.num}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{s.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-700">
                  <span>Step {idx + 1} of 5</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE PROJECT EXPLORER PREVIEW */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                Live Openings
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Discover Exciting Student Projects
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 mt-4 md:mt-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="p-5 flex flex-col justify-between" hover>
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge variant="indigo" size="sm">
                      {project.category}
                    </Badge>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      ₹{project.stipendAmount.toLocaleString()}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-1 line-clamp-2">
                    {project.title}
                  </h4>
                  <p className="text-xs font-medium text-slate-500 mb-3">
                    {project.companyName}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {project.durationWeeks} Weeks
                    </span>
                    <span className="font-semibold text-slate-700">{project.projectType}</span>
                  </div>
                  <Link to={`/teen/projects/${project.id}`}>
                    <Button variant="outline" size="sm" className="w-full text-xs font-bold">
                      View Project Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/teen/explore">
              <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                View All {allProjects.length} Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SAFETY & PARENTAL CONSENT BANNER */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-funngro-navy text-white p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-4">
                  <ShieldCheck className="w-4 h-4" /> Safety By Design
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
                  Your Safety and Privacy Are Our Highest Priority.
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-2xl mb-6">
                  We believe in protecting young minds. All projects undergo manual moderation, private user contacts are never displayed, companies are pre-screened, and parental consent is integrated from day one.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Parental Consent System
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Monitored Messaging
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Unpaid Exploitation
                  </span>
                </div>
              </div>
              <div className="md:col-span-4 flex justify-center md:justify-end">
                <Link to="/privacy-policy">
                  <Button
                    variant="outline"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  >
                    Read Safety Policies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEEN FAQS */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Teenlancer FAQs
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
                    {isOpen ? <Minus className="w-4 h-4 text-emerald-600" /> : <Plus className="w-4 h-4 text-slate-400" />}
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
    </div>
  );
};
