import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="green" size="md">Data Protection & Child Safety</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-2">
            Privacy Policy & Youth Safeguards
          </h1>
          <p className="text-xs text-slate-500">Last Updated: November 2026 • Compliant with Indian DPDP Act Principles</p>
        </div>

        <Card className="p-8 md:p-12 border-slate-200 space-y-8 text-slate-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. Our Commitment to Minor Safety</h2>
            <p>
              Funngro operates with Safety by Design. Because many of our users are between 13 and 17 years old, we enforce enhanced data protection principles: data minimization, parental verification, and zero public exposure of minors' contact coordinates.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. Parental & Guardian Consent</h2>
            <p>
              Users under the age of 18 must have an authorized parent or guardian confirm their platform registration. Parents have full authority to review their teenager’s project assignments, earnings ledger, and request account deactivation at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. Data Minimization & Privacy-Safe Display</h2>
            <p>
              Teen profiles display only a chosen first name and initial (e.g. "Aarav S."), education level, and portfolio work. Direct personal mobile numbers, home addresses, and private email addresses are strictly kept confidential and never shared with employers or public visitors.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. Communication Safety & Content Moderation</h2>
            <p>
              All messaging between teenagers and companies takes place through monitored in-platform conversation channels. Automated filters and human moderators flag inappropriate language, off-platform solicitation, or unsolicited external contact requests.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">5. Financial Information & Payouts</h2>
            <p>
              Wallet balances and simulated/live UPI withdrawal destinations are encrypted. Teenagers cannot alter core financial records or ledger balances directly; all payouts require verified identity validation and guardian authorization where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">6. Grievance Officer & Contact</h2>
            <p>
              In accordance with Indian digital protection laws, if you have any questions or wish to exercise your rights regarding personal data, please contact our Grievance Officer at <strong>safety@funngro.com</strong>.
            </p>
          </section>
        </Card>
      </div>
    </div>
  );
};
