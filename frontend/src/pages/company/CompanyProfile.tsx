import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Building2, ShieldCheck, Save, Globe, Phone, MapPin } from 'lucide-react';

export const CompanyProfile: React.FC = () => {
  const { companyProfile, updateCompanyProfileState } = useAuth();
  const { showToast } = useToast();

  const [companyName, setCompanyName] = useState(companyProfile?.companyName || 'Nexus Innovations');
  const [contactPerson, setContactPerson] = useState(companyProfile?.contactPerson || 'Ananya Verma');
  const [website, setWebsite] = useState(companyProfile?.website || 'https://nexus.tech');
  const [phone, setPhone] = useState(companyProfile?.phone || '+91 98765 43210');
  const [location, setLocation] = useState(companyProfile?.location || 'Bengaluru, India');
  const [description, setDescription] = useState(companyProfile?.description || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyProfileState({
      companyName,
      contactPerson,
      website,
      phone,
      location,
      description,
    });
    showToast('Company profile updated successfully!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Company Profile</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Public information shown to Teenlancers when reviewing your project postings.
        </p>
      </div>

      <Card className="p-8 border-slate-200">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <img
              src={companyProfile?.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120'}
              alt="Logo"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{companyName}</h3>
                <Badge variant="green" size="sm">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </Badge>
              </div>
              <span className="text-xs text-slate-500">{companyProfile?.industry || 'Technology'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Company Legal Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
            <Input
              label="Contact Person"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Website URL"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <Input
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <Input
            label="Location / City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <Textarea
            label="Company Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  );
};
