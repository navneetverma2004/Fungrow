import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const Terms: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="indigo" size="md">Platform Agreement</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-2">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500">Effective Date: November 2026</p>
        </div>

        <Card className="p-8 md:p-12 border-slate-200 space-y-8 text-slate-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. Nature of the Platform</h2>
            <p>
              Funngro provides an experiential learning and freelance project ecosystem where student Teenlancers collaborate with verified companies on project-based micro assignments. Funngro is not an employer, but a marketplace facilitator ensuring safety, escrow, and quality standards.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. Prohibition of Unpaid or Exploitative Work</h2>
            <p>
              Companies are strictly prohibited from posting unpaid work disguised as assessments or tests. Every assignment must offer fair, guaranteed compensation. Hazardous, physical, or age-inappropriate work is strictly banned and results in immediate account suspension.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. Intellectual Property Rights</h2>
            <p>
              Upon complete payout approval for a milestone, all intellectual property rights for the deliverables created for that project transfer directly to the paying company, while the Teenlancer retains the right to display the work in their personal Funngro portfolio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. Milestone Escrow & Dispute Resolution</h2>
            <p>
              Both parties agree to use Funngro’s guided milestone workflow. In the rare event of a disagreement regarding deliverable quality, Funngro moderators review submitted work against the agreed objectives to ensure a fair resolution.
            </p>
          </section>
        </Card>
      </div>
    </div>
  );
};
