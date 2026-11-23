import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Search, Plus, Minus, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      category: 'Teenlancers',
      q: 'Who can register as a Teenlancer on Funngro?',
      a: 'Any teenager between the ages of 13 and 19 currently studying in high school, junior college, or early undergraduate programs in India can join Funngro.',
    },
    {
      category: 'Teenlancers',
      q: 'How much money can I earn per project?',
      a: 'Stipends generally range between ₹1,500 and ₹8,000 per project depending on complexity, required skill set, and duration. All amounts are set clearly upfront.',
    },
    {
      category: 'Parents & Guardians',
      q: 'How does the parental consent process work?',
      a: 'During registration, teenagers provide their parent or guardian’s verified contact. A secure digital authorization link is sent detailing platform policies and safety guidelines before any work begins.',
    },
    {
      category: 'Parents & Guardians',
      q: 'Will my child’s phone number or photo be visible to strangers?',
      a: 'No. We strictly adhere to child data privacy guidelines. Only first names with last initials (e.g. "Diya M.") and work portfolio samples are visible. Phone numbers and home addresses are never published.',
    },
    {
      category: 'Companies',
      q: 'How does milestone escrow protect our company budget?',
      a: 'When you assign a project, milestone funds are held in secure escrow. You inspect the deliverables first; funds are released to the student’s wallet only after you click approve.',
    },
    {
      category: 'Companies',
      q: 'What if submitted work does not meet our requirements?',
      a: 'You can request revisions directly through our project review interface with specific feedback notes. Students will resubmit updated work.',
    },
    {
      category: 'Payments',
      q: 'How can teenagers withdraw their earnings?',
      a: 'Available balances can be withdrawn directly via UPI (e.g. Google Pay, PhonePe, Paytm) or to a verified bank account with zero platform withdrawal fees.',
    },
  ];

  const categories = ['All', 'Teenlancers', 'Parents & Guardians', 'Companies', 'Payments'];

  const filtered = faqItems.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="indigo" size="md">Knowledge Base</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-3 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-8">
            Find answers to commonly asked questions about Teenlancing, parent safeguards, project posting, and payments.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative mb-6">
            <Input
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-colors">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-slate-900 text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        {faq.category}
                      </span>
                      <span>{faq.q}</span>
                    </div>
                    {isOpen ? <Minus className="w-4 h-4 text-emerald-600 flex-shrink-0" /> : <Plus className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <Card className="p-8 text-center text-slate-500">
              No matching questions found for "{searchQuery}".
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
