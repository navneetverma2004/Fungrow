import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { storageService } from '@/services/storageService';
import { Trophy, Star, Sparkles, Award } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const teens = storageService.getTeenProfiles().sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Teenlancer Leaderboard</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Top performing students ranked by XP, verified completed projects, and client ratings.
          </p>
        </div>
        <Badge variant="amber" size="md">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Season 4 Active
        </Badge>
      </div>

      <Card className="border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {teens.map((teen, idx) => (
            <div
              key={teen.id}
              className={`p-4 sm:px-6 flex items-center justify-between gap-4 transition-colors ${
                idx < 3 ? 'bg-amber-50/20' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm ${
                    idx === 0
                      ? 'bg-amber-400 text-slate-900 shadow-sm'
                      : idx === 1
                      ? 'bg-slate-300 text-slate-800'
                      : idx === 2
                      ? 'bg-amber-700/60 text-white'
                      : 'text-slate-500'
                  }`}
                >
                  {idx + 1}
                </div>

                <img
                  src={teen.avatarUrl}
                  alt={teen.displayName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                />

                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    {teen.displayName}
                    {idx === 0 && <Trophy className="w-4 h-4 text-amber-500" />}
                  </h4>
                  <span className="text-xs text-slate-500">{teen.tagline}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div className="hidden sm:block">
                  <span className="text-xs font-bold text-slate-800 block">
                    {teen.completedProjectsCount} Projects
                  </span>
                  <span className="text-[11px] text-amber-500 font-semibold flex items-center gap-0.5 justify-end">
                    <Star className="w-3 h-3 fill-amber-400" /> {teen.rating}
                  </span>
                </div>

                <div>
                  <span className="text-sm font-extrabold text-indigo-600 block">
                    {teen.points} XP
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">
                    {teen.badgeLevel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
