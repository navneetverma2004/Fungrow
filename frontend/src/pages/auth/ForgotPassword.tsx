import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/common/Logo';
import { useToast } from '@/context/ToastContext';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Password reset link sent to ' + email, 'success');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <Logo size="md" />
          <h2 className="text-2xl font-bold text-slate-900 mt-4">Reset Password</h2>
          <p className="text-xs text-slate-500 mt-1">
            Enter your registered email address and we'll send a secure password reset link.
          </p>
        </div>

        <Card className="p-8 border-slate-200">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900">Check Your Email</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We have sent instructions to <strong>{email}</strong>. Please check your inbox and spam folders.
              </p>
              <Link to="/auth/login">
                <Button variant="outline" className="w-full mt-4">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="e.g. user@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4 text-slate-400" />}
              />
              <Button type="submit" variant="primary" className="w-full font-bold">
                Send Reset Link
              </Button>
              <div className="text-center pt-2">
                <Link to="/auth/login" className="text-xs text-slate-500 hover:text-slate-900">
                  Remember your password? Log in
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
