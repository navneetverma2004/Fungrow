import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { User, School, MapPin, Lock, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user, teenProfile, updateTeenProfileState } = useAuth();
  const { showToast } = useToast();

  const [displayName, setDisplayName] = useState(teenProfile?.displayName || 'Aarav S.');
  const [tagline, setTagline] = useState(teenProfile?.tagline || '');
  const [aboutMe, setAboutMe] = useState(teenProfile?.aboutMe || '');
  const [city, setCity] = useState(teenProfile?.city || 'Bengaluru');
  const [schoolCollege, setSchoolCollege] = useState(teenProfile?.schoolCollege || 'National Public School');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTeenProfileState({
      displayName,
      tagline,
      aboutMe,
      city,
      schoolCollege,
    });
    showToast('Profile and settings updated successfully!', 'success');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Profile & Account Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Update your public profile, bio, and educational credentials.
        </p>
      </div>

      <Card className="p-8 border-slate-200">
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Display Name (Privacy-Safe)"
            placeholder="e.g. Aarav S."
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <Input
            label="Tagline / Headline"
            placeholder="e.g. Full Stack & Mobile Dev Enthusiast | Class 11"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="School / College"
              value={schoolCollege}
              onChange={(e) => setSchoolCollege(e.target.value)}
            />
            <Input
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <Textarea
            label="About Me (Bio)"
            rows={4}
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          />

          <Button type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  );
};
