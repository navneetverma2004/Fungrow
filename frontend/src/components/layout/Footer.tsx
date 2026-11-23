import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import {
  ShieldCheck,
  Heart,
  Lock,
  Award,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-funngro-navy text-slate-300 border-t border-slate-800">
      {/* Top Value Proposition Grid */}
      <div className="border-b border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1">Safety & Guardian First</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Strict age verification, parental consent workflows, and privacy protections. We never expose minors' contact info.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1">Guaranteed Payouts</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Transparent milestone escrow tracking. Teenlancers get paid directly upon company approval with complete audit records.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1">Verified Real Experience</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Every project completed builds a verifiable portfolio, certified skill badges, and industry recommendations for college.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-2">
            <Logo variant="light" size="lg" />
            <p className="text-slate-400 text-sm leading-relaxed mt-4 max-w-sm">
              Funngro is India's premier youth career development & freelance project platform. Connecting ambitious teenagers with real-world business opportunities.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> Made for Next-Gen India
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-semibold bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full">
                <Lock className="w-3.5 h-3.5" /> 100% Safe & Moderated
              </span>
            </div>
          </div>

          {/* Teen Links */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Teen Portal</h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/teen" className="hover:text-emerald-400 transition-colors">
                  For Teenlancers
                </Link>
              </li>
              <li>
                <Link to="/teen/explore" className="hover:text-emerald-400 transition-colors">
                  Find Projects
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="hover:text-emerald-400 transition-colors">
                  Create Teen Profile
                </Link>
              </li>
              <li>
                <Link to="/teen/earnings" className="hover:text-emerald-400 transition-colors">
                  Earnings & Wallet
                </Link>
              </li>
              <li>
                <Link to="/teen/leaderboard" className="hover:text-emerald-400 transition-colors">
                  Teen Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Company Portal</h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/company" className="hover:text-indigo-400 transition-colors">
                  For Companies
                </Link>
              </li>
              <li>
                <Link to="/company/post-project" className="hover:text-indigo-400 transition-colors">
                  Post a Project
                </Link>
              </li>
              <li>
                <Link to="/company/talent" className="hover:text-indigo-400 transition-colors">
                  Discover Talent
                </Link>
              </li>
              <li>
                <Link to="/company/active-projects" className="hover:text-indigo-400 transition-colors">
                  Manage Deliverables
                </Link>
              </li>
              <li>
                <Link to="/company/analytics" className="hover:text-indigo-400 transition-colors">
                  Hiring Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Resources */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Platform</h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQs & Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy & Child Safety
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-10 mt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Funngro Smart Web. Empowering ambitious teenagers and modern enterprises.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-400">
              Terms & Conditions
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Demo Mode Enabled</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
