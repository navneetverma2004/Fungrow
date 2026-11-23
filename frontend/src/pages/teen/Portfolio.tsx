import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
  Award,
  Star,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Share2,
  Sparkles,
  School,
  MapPin,
  Calendar,
} from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { user, teenProfile, updateTeenProfileState } = useAuth();
  const { showToast } = useToast();
  const [isPublic, setIsPublic] = useState(teenProfile?.isPublic ?? true);

  const togglePublic = () => {
    const next = !isPublic;
    setIsPublic(next);
    updateTeenProfileState({ isPublic: next });
    showToast(next ? 'Portfolio is now publicly shareable' : 'Portfolio set to private', 'info');
  };

  const copyShareLink = () => {
    navigator.clipboard?.writeText(window.location.origin + `/portfolio/${teenProfile?.id || 'teen-1'}`);
    showToast('Shareable portfolio link copied to clipboard!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Portfolio Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Student Portfolio</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Your certified experience, completed client projects, and verified credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={togglePublic}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              isPublic
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            {isPublic ? 'Publicly Visible' : 'Private'}
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyShareLink}
            icon={<Share2 className="w-4 h-4" />}
          >
            Share Portfolio
          </Button>
        </div>
      </div>

      {/* Main Profile Showcase Card */}
      <Card className="p-8 border-slate-200 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={teenProfile?.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200'}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-emerald-500/20 shadow-md"
          />

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-extrabold text-slate-900">
                {teenProfile?.displayName || 'Aarav S.'}
              </h2>
              <Badge variant="green" size="sm">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Teenlancer
              </Badge>
              <Badge variant="indigo" size="sm">
                {teenProfile?.badgeLevel || 'Pro Teenlancer'}
              </Badge>
            </div>

            <p className="text-sm font-semibold text-slate-700">
              {teenProfile?.tagline || 'Full Stack & Mobile Dev Enthusiast | Class 11'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <School className="w-3.5 h-3.5 text-slate-400" />
                {teenProfile?.schoolCollege || 'National Public School'}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {teenProfile?.city || 'Bengaluru'}, {teenProfile?.state || 'Karnataka'}
              </span>
              <span className="flex items-center gap-1 font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {teenProfile?.rating || 4.9} Rating
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-2 max-w-2xl">
              {teenProfile?.aboutMe}
            </p>
          </div>
        </div>
      </Card>

      {/* Skills Badges Card */}
      <Card className="p-6 border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-3">Verified Skills</h3>
        <div className="flex flex-wrap gap-2">
          {teenProfile?.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>
      </Card>

      {/* Completed Client Projects Showcase */}
      <Card className="p-6 border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-4">Completed Projects & Achievements</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                Nexus Innovations • EdTech
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                Interactive React Component Library for Math Quizzes
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Delivered 5 reusable quiz widgets with confetti animations and keyboard navigation.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant="green">5.0 Star</Badge>
              <span className="text-xs font-bold text-slate-700">₹4,500</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                AeroByte Games • Gaming
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                Beta Testing & Physics Bug Log for Casual Runner
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Completed 20 levels, logged 14 bugs with video proof and gameplay difficulty curves.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant="green">4.8 Star</Badge>
              <span className="text-xs font-bold text-slate-700">₹2,000</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
