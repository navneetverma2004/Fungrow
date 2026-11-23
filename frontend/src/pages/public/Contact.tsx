import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/context/ToastContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ShieldAlert,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    role: 'Teenlancer',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Support ticket submitted successfully! Reference #TK-' + Math.floor(1000 + Math.random() * 9000), 'success');
      setFormData({ name: '', email: '', subject: '', role: 'Teenlancer', message: '' });
    }, 1000);
  };

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">
            Contact Support & Safety
          </h1>
          <p className="text-base text-slate-600">
            Have a question about a project, payment, or child safety guideline? Our dedicated team is here to help 7 days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-8 border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Direct Channels</h3>
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Email Inquiries</h5>
                    <p className="text-slate-600 text-xs mt-0.5">support@funngro.com</p>
                    <p className="text-slate-600 text-xs">companies@funngro.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Child Safety & Grievance</h5>
                    <p className="text-slate-600 text-xs mt-0.5">safety@funngro.com</p>
                    <p className="text-slate-400 text-[11px]">Strict 24-hr resolution SLA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Operating Hours</h5>
                    <p className="text-slate-600 text-xs mt-0.5">Monday - Saturday: 9:00 AM – 8:00 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Headquarters</h5>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Funngro Technologies Pvt. Ltd.<br />
                      Indiranagar, Bengaluru, Karnataka 560038
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Ticket Submission Form */}
          <div className="lg:col-span-7">
            <Card className="p-8 border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Send Us a Message</h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill out the form below. We typically reply within 2 to 4 hours during business days.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Full Name"
                    placeholder="e.g. Aarav Sharma"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="e.g. user@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Subject"
                    placeholder="Brief description of your issue"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      I am a:
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500"
                    >
                      <option value="Teenlancer">Teenlancer</option>
                      <option value="Parent/Guardian">Parent / Guardian</option>
                      <option value="Company/Employer">Company / Employer</option>
                      <option value="School Educator">School / Educator</option>
                    </select>
                  </div>
                </div>

                <Textarea
                  label="Message / Query Details"
                  placeholder="Please describe how we can assist you..."
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto"
                  isLoading={isSubmitting}
                  icon={<Send className="w-4 h-4" />}
                >
                  Submit Ticket
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
