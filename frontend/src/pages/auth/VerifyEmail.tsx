import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';
import { MailCheck, ArrowRight } from 'lucide-react';

export const VerifyEmail: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <div className="max-w-md w-full text-center">
        <Logo size="md" />
        <Card className="p-8 mt-6 border-slate-200">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <MailCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Verify Your Email</h2>
          <p className="text-xs text-slate-600 leading-relaxed mb-6">
            We sent a verification link to your registered email address. Please click the link to confirm your account and start accepting projects.
          </p>
          <div className="space-y-3">
            <Link to="/teen/dashboard">
              <Button variant="primary" className="w-full font-bold" icon={<ArrowRight className="w-4 h-4" />}>
                Continue to Dashboard (Demo Active)
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="w-full text-xs">
                Didn't receive email? Contact Support
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
