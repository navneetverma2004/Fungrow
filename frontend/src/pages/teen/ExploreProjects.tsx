import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { storageService } from '@/services/storageService';
import { Project, ProjectCategory } from '@/types';
import {
  Search,
  Filter,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Briefcase,
} from 'lucide-react';

export const ExploreProjects: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'stipend-high' | 'match'>('match');

  const allProjects = storageService.getProjects();

  const categories = [
    'All',
    'Web Development',
    'Graphic Design',
    'Video Editing',
    'Content Writing',
    'App Testing',
    'Research',
    'Surveys',
    'Social Media',
    'Digital Marketing',
    'Data Entry',
  ];

  const filteredProjects = useMemo(() => {
    return allProjects
      .filter((project) => {
        const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
        const matchesLevel = selectedLevel === 'All' || project.experienceLevel === selectedLevel;
        const matchesSearch =
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

        let matchesDuration = true;
        if (selectedDuration === '1-week') matchesDuration = project.durationWeeks <= 1;
        if (selectedDuration === '2-weeks') matchesDuration = project.durationWeeks === 2;
        if (selectedDuration === '3-plus') matchesDuration = project.durationWeeks >= 3;

        return matchesCategory && matchesLevel && matchesSearch && matchesDuration;
      })
      .sort((a, b) => {
        if (sortBy === 'stipend-high') return b.stipendAmount - a.stipendAmount;
        if (sortBy === 'latest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return (b.matchScore || 80) - (a.matchScore || 80);
      });
  }, [allProjects, searchQuery, selectedCategory, selectedLevel, selectedDuration, sortBy]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Explore Projects</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse {allProjects.length} verified projects from approved companies with guaranteed milestone stipends.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 sm:p-6 border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-6 relative">
            <Input
              placeholder="Search by title, keywords or skills (e.g. React, Figma, Reels)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Skill Levels</option>
              <option value="Beginner">Beginner Friendly</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="match">Sort by: Smart Match Score</option>
              <option value="stipend-high">Sort by: Highest Stipend</option>
              <option value="latest">Sort by: Newest First</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Card>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="p-6 flex flex-col justify-between border-slate-200/90" hover>
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={project.companyLogo}
                      alt={project.companyName}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 bg-white"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block line-clamp-1">
                        {project.companyName}
                      </span>
                      <span className="text-[11px] text-slate-500">{project.projectType} • {project.durationWeeks} Weeks</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    ₹{project.stipendAmount.toLocaleString()}
                  </span>
                </div>

                <div className="mb-2">
                  <Badge variant="indigo" size="sm" className="mb-2">
                    {project.category}
                  </Badge>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                    {project.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.requiredSkills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {project.requiredSkills.length > 3 && (
                    <span className="text-[11px] text-slate-400 self-center">
                      +{project.requiredSkills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-bold text-emerald-700">{project.matchScore || 85}% Match</span>
                </div>
                <Link to={`/teen/projects/${project.id}`}>
                  <Button variant="primary" size="sm" className="text-xs font-bold">
                    View & Apply
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center text-slate-500 border-slate-200">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No Projects Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            No projects matched your search or filters. Try choosing "All Categories" or searching for a different skill.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory('All');
              setSelectedLevel('All');
              setSearchQuery('');
            }}
          >
            Clear All Filters
          </Button>
        </Card>
      )}
    </div>
  );
};
