import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Compass, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <div className="text-center max-w-md mx-auto">
        <span className="text-6xl font-extrabold text-emerald-600 block mb-4">404</span>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h1>
        <p className="text-sm text-slate-600 mb-8">
          The page you are looking for doesn't exist or has moved. Explore opportunities for teens or employers below.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" icon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link to="/teen/explore">
            <Button variant="outline" icon={<Compass className="w-4 h-4" />}>
              Explore Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
