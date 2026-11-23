import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { storageService } from '@/services/storageService';
import { Search, Star, ExternalLink, ShieldCheck, Mail } from 'lucide-react';

export const DiscoverTalent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');

  const allTeens = storageService.getTeenProfiles();

  const skillsList = ['All', 'React.js', 'Figma', 'Python', 'Video Editing', 'Content Writing', 'AI/ML'];

  const filtered = allTeens.filter((t) => {
    const matchesSearch =
      t.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.aboutMe.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = selectedSkill === 'All' || t.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Discover Young Talent</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore privacy-safe verified student profiles with documented project accomplishments.
        </p>
      </div>

      {/* Search & Filter */}
      <Card className="p-4 border-slate-200">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search by student skills, domain, or interests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {skillsList.map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedSkill === skill
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Talent Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((teen) => (
          <Card key={teen.id} className="p-6 flex flex-col justify-between" hover>
            <div>
              <div className="flex items-start gap-3.5 mb-4">
                <img
                  src={teen.avatarUrl}
                  alt={teen.displayName}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{teen.displayName}</h3>
                  <span className="text-xs text-indigo-600 font-semibold">{teen.badgeLevel}</span>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {teen.rating} Rating
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                {teen.aboutMe}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {teen.skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{teen.completedProjectsCount} Projects Completed</span>
              {teen.portfolioUrl && (
                <a
                  href={teen.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  Portfolio <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
