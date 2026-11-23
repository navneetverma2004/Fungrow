import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  ShieldCheck,
  Target,
  HeartHandshake,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="indigo" size="md">Our Mission & Philosophy</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-3 mb-6">
            Empowering the Next Generation with Real Experience.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Funngro was built on a bold premise: teenagers shouldn't have to wait until college graduation to gain real-world project skills, financial literacy, and career clarity.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              Why We Founded Funngro
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Traditional education focuses heavily on theory, leaving a massive gap between textbook knowledge and what modern companies actually look for: hands-on problem solving, initiative, deadline discipline, and practical tool mastery.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Meanwhile, forward-thinking startups and brands crave authentic youth perspectives, digital native fluency, and cost-effective creative bandwidth. Funngro bridges this divide safely, transparently, and productively.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Over 150,000+ students across 250+ Indian cities
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Zero tolerance for unpaid labor disguised as "tests"
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Parental consent & child safety built into every flow
              </div>
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-br from-funngro-navy via-slate-900 to-indigo-950 text-white border-slate-800">
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Our Core Principles</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="p-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-xs mt-0.5">01</span>
                <div>
                  <strong className="text-white block">Safety by Design</strong>
                  Protecting young creators with privacy shields, moderated chats, and guardian signoffs.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-xs mt-0.5">02</span>
                <div>
                  <strong className="text-white block">Dignity of Work</strong>
                  Fair compensation for every completed milestone with protected escrow.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-xs mt-0.5">03</span>
                <div>
                  <strong className="text-white block">Verifiable Credentials</strong>
                  Real portfolio evidence that helps students get admitted to dream colleges.
                </div>
              </li>
            </ul>
          </Card>
        </div>

        {/* Stats */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 md:p-12 text-center mb-16 shadow-card">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-8">Platform Impact in Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-emerald-600">150,000+</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Teenlancers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-indigo-600">3,500+</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Companies</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-amber-500">₹4.2 Cr+</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Paid to Students</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900">98.4%</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Satisfaction</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/teen">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              Join the Funngro Movement
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
