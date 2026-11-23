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
  TrendingUp,
  CheckCircle2,
  Code2,
  Palette,
  Video,
  PenTool,
  BrainCircuit,
  Search,
  Users,
  Building2,
  DollarSign,
  ChevronRight,
  Star,
  Quote,
  Layers,
  HelpCircle,
  Plus,
  Minus,
} from 'lucide-react';

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'teens' | 'companies'>('teens');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const featuredProjects = storageService.getProjects().slice(0, 3);

  const categories = [
    { name: 'Web Development', icon: Code2, count: '48+ Projects', color: 'text-emerald-500 bg-emerald-50' },
    { name: 'Graphic Design', icon: Palette, count: '65+ Projects', color: 'text-indigo-500 bg-indigo-50' },
    { name: 'Video Editing', icon: Video, count: '38+ Projects', color: 'text-rose-500 bg-rose-50' },
    { name: 'Content Writing', icon: PenTool, count: '52+ Projects', color: 'text-amber-500 bg-amber-50' },
    { name: 'AI & Data Analytics', icon: BrainCircuit, count: '29+ Projects', color: 'text-sky-500 bg-sky-50' },
    { name: 'App Testing & QA', icon: Search, count: '34+ Projects', color: 'text-purple-500 bg-purple-50' },
  ];

  const faqs = [
    {
      q: 'Is Funngro safe and legal for teenagers under 18 in India?',
      a: 'Yes, 100%. Funngro is designed around safety by design and compliance with Indian labor policies and child protection standards. Teenagers register with parental/guardian consent, projects are strictly educational and creative, and all communication and payments are monitored and safeguarded.',
    },
    {
      q: 'How do Teenlancers get paid?',
      a: 'Companies fund milestones before work begins. Once you deliver the project and the company approves it, the payout is credited immediately to your Funngro wallet, withdrawable directly via UPI or verified guardian bank account.',
    },
    {
      q: 'What kind of work can companies assign on Funngro?',
      a: 'Real freelance and project-based assignments: web development, graphic design, social media reels, survey insights, beta testing, and research. Unpaid labor disguised as "tests" and unsafe or physical gigs are strictly prohibited.',
    },
    {
      q: 'Do students get work experience certificates?',
      a: 'Yes! Every approved project generates an official verified Funngro Certificate of Completion and portfolio badge recognized by leading universities and startups.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-funngro-navy text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Decorative background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 animate-pulse-subtle">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>India's #1 Experiential Freelance Platform for Teens</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
                Where Young Talent Meets{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300">
                  Real-World Opportunities.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10">
                Discover meaningful projects, work with ambitious companies, develop practical skills, and take your first steps towards financial independence.
              </p>

              {/* Two CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                <Link to="/teen" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto shadow-lg shadow-emerald-600/30 font-bold"
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    Explore Opportunities – For Teens
                  </Button>
                </Link>

                <Link to="/company" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto bg-slate-800/80 text-white border-slate-700 hover:bg-slate-800 font-bold"
                    icon={<Building2 className="w-5 h-5 text-indigo-400" />}
                  >
                    Hire Young Talent – For Companies
                  </Button>
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center sm:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">150K+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Verified Teens</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">3,500+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Active Companies</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">₹4.2 Cr+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Earned by Students</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Ecosystem Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Floating highlight card 1 */}
                <div className="absolute -top-6 -left-6 z-20 bg-slate-800/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700 shadow-xl hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    ₹
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Milestone Credited</div>
                    <div className="text-sm font-bold text-white">₹4,500 to Aarav S.</div>
                  </div>
                </div>

                {/* Main Hero Showcase Card */}
                <Card className="bg-slate-900/90 backdrop-blur-md border-slate-700/80 p-6 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">Live Project Feed</span>
                  </div>

                  <div className="space-y-4">
                    {featuredProjects.map((p) => (
                      <div
                        key={p.id}
                        className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/40 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                              {p.category}
                            </span>
                            <h4 className="text-sm font-bold text-white line-clamp-1">{p.title}</h4>
                            <span className="text-xs text-slate-400">{p.companyName}</span>
                          </div>
                          <span className="text-xs font-bold text-white bg-slate-700 px-2 py-1 rounded-md flex-shrink-0">
                            ₹{p.stipendAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-700/40 text-[11px] text-slate-400">
                          <span>{p.durationWeeks} Weeks • Remote</span>
                          <span className="text-emerald-400 font-semibold">{p.applicantCount} applied</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Safe Escrow Protected</span>
                    <Link
                      to="/teen/explore"
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      View All 15+ Projects <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>

                {/* Floating highlight card 2 */}
                <div className="absolute -bottom-6 -right-6 z-20 bg-slate-800/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700 shadow-xl hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Certificate Verified</div>
                    <div className="text-sm font-bold text-white">Full Stack React Badge</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Simple & Streamlined
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
              How Funngro Powers the Ecosystem
            </h2>
            <p className="text-base text-slate-600">
              A transparent, safe, and skill-first bridge connecting eager young minds with progressive companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <Card className="p-8 border-slate-200 hover:border-emerald-300 relative group" hover>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-lg mb-6 group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Discover or Post</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Teens browse verified projects across web development, content, design, and AI. Companies post clear project deliverables and budgets in minutes.
              </p>
            </Card>

            <Card className="p-8 border-slate-200 hover:border-indigo-300 relative group" hover>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-lg mb-6 group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Collaborate & Deliver</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Teens apply with a portfolio proposal. Once accepted, both parties collaborate through safe in-app milestones with clear deadline checkpoints.
              </p>
            </Card>

            <Card className="p-8 border-slate-200 hover:border-amber-300 relative group" hover>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-lg mb-6 group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Get Paid & Certified</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Approved work triggers immediate wallet payout via UPI. Teens earn certified portfolio credentials while companies achieve great ROI.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* TWO-SIDED PLATFORM COMPARISON TAB */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Dual Ecosystem Value
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
              Built for Ambitious Teens & Forward Companies
            </h2>
            <div className="inline-flex p-1 bg-slate-200 rounded-xl mt-4">
              <button
                onClick={() => setActiveTab('teens')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'teens'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Teenlancers
              </button>
              <button
                onClick={() => setActiveTab('companies')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'companies'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Companies
              </button>
            </div>
          </div>

          {activeTab === 'teens' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Real Financial Independence</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Earn your first income before turning 18. Gain financial literacy and manage your earnings transparently.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Showcase Verifiable Work</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Replace empty resumes with live projects, GitHub links, and client testimonials that impress top college admissions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Safe, Monitored Environment</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Protected platform with parental consent, privacy safeguards, and no public exposure of phone numbers or addresses.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to="/teen">
                    <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                      Explore Teen Portal
                    </Button>
                  </Link>
                </div>
              </div>

              <Card className="p-6 bg-gradient-to-br from-emerald-500/10 via-white to-teal-500/10 border-emerald-200">
                <div className="text-xs font-bold text-emerald-700 uppercase mb-2">Teen Success Spotlight</div>
                <h4 className="text-xl font-extrabold text-slate-900 mb-2">Aarav Sharma (Class 11)</h4>
                <p className="text-sm text-slate-600 mb-4">
                  "I learned React in school, but Funngro gave me real projects with EdTech companies. In 3 months I completed 8 projects and earned ₹24,500 while managing my exams!"
                </p>
                <div className="flex items-center gap-3">
                  <Badge variant="green">React Developer</Badge>
                  <Badge variant="indigo">National Hackathon Winner</Badge>
                </div>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Authentic Gen Z Perspective</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Hire digital natives who instinctively understand short-form video algorithms, modern design aesthetics, and youth consumption habits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Agile, Cost-Effective Turnaround</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Complete targeted creative, testing, and research tasks at high speed without burdensome agency retainers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Escrow Milestone Protection</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Funds are only released once deliverables are submitted, verified, and approved by your team.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to="/company">
                    <Button variant="secondary" size="md" icon={<Building2 className="w-4 h-4" />}>
                      Explore Company Portal
                    </Button>
                  </Link>
                </div>
              </div>

              <Card className="p-6 bg-gradient-to-br from-indigo-500/10 via-white to-sky-500/10 border-indigo-200">
                <div className="text-xs font-bold text-indigo-700 uppercase mb-2">Company Case Study</div>
                <h4 className="text-xl font-extrabold text-slate-900 mb-2">Nexus Innovations</h4>
                <p className="text-sm text-slate-600 mb-4">
                  "Funngro connected us with talented high school coders who built our interactive quiz modules faster and with more creative enthusiasm than traditional contract agencies."
                </p>
                <div className="flex items-center gap-3">
                  <Badge variant="indigo">8 Projects Completed</Badge>
                  <Badge variant="green">4.9 Star Rating</Badge>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* FEATURED PROJECT CATEGORIES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Explore Skills
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                Trending Project Domains
              </h2>
            </div>
            <Link to="/teen/explore" className="mt-4 md:mt-0 text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              Browse All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.name}
                  to={`/teen/explore?category=${encodeURIComponent(c.name)}`}
                  className="p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-card-hover hover:-translate-y-1 transition-all bg-white text-center flex flex-col items-center group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${c.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{c.name}</h4>
                  <span className="text-xs text-slate-500">{c.count}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
              Real Experiences (Demo Voices)
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4">
              Trusted by Teenlancers and Businesses Across India
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/80 border-slate-700 p-6 text-white">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                "As a 16-year-old who loved making video reels, Funngro gave me legitimate clients without having to hide my age. I edited 10 reels for a study app and earned ₹5,000 in 2 weeks!"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  alt="Kabir"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-sm font-bold text-white">Kabir R. (15 yrs)</h5>
                  <span className="text-xs text-slate-400">DPS R.K. Puram, Delhi</span>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800/80 border-slate-700 p-6 text-white">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                "Our marketing team needed Gen Z Instagram carousels for a snack brand. Diya delivered exceptional typography and visuals that outperformed our agency campaigns!"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100"
                  alt="Ananya"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-sm font-bold text-white">Vikram Malhotra</h5>
                  <span className="text-xs text-slate-400">Marketing Head, Zephyr Brand Labs</span>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800/80 border-slate-700 p-6 text-white">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                "As a parent, I was initially cautious about online work. Funngro's parental consent system and safe payment escrow gave me complete peace of mind. My daughter gained massive confidence."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
                  alt="Parent"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-sm font-bold text-white">Sunita Ghosh</h5>
                  <span className="text-xs text-slate-400">Parent of Anika (Teenlancer)</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Got Questions?
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-slate-900 text-base"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link to="/faq" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">
              Have more questions? Visit our Help Center & FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of teenagers developing real skills and forward-thinking companies building the future together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth/register">
              <Button
                variant="secondary"
                size="lg"
                className="bg-slate-900 text-white hover:bg-slate-800 shadow-xl font-bold"
                icon={<Sparkles className="w-5 h-5 text-amber-300" />}
              >
                Sign Up as Teenlancer
              </Button>
            </Link>
            <Link to="/company/post-project">
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-slate-900 border-white hover:bg-slate-100 shadow-xl font-bold"
                icon={<Building2 className="w-5 h-5 text-indigo-600" />}
              >
                Post Your First Project
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
