import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { storageService } from '@/services/storageService';
import {
  Sparkles,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  School,
  Star,
  Lock,
} from 'lucide-react';

export const Register: React.FC = () => {
  const [role, setRole] = useState<'teen' | 'company'>('teen');
  const [step, setStep] = useState(1);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Teen Form State
  const [teenData, setTeenData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    schoolCollege: '',
    classGrade: '11th Standard',
    interests: [] as string[],
    skills: '',
    experienceLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    portfolioUrl: '',
    aboutMe: '',
    parentName: '',
    parentPhone: '',
    parentConsentChecked: false,
    termsAccepted: false,
    password: '',
  });

  // Company Form State
  const [companyData, setCompanyData] = useState({
    companyName: '',
    email: '',
    contactPerson: '',
    phone: '',
    website: '',
    industry: 'EdTech & Software',
    companySize: '10-50 employees',
    location: 'Bengaluru, India',
    description: '',
    password: '',
  });

  const availableInterests = [
    'Web Development',
    'App Development',
    'Graphic Design',
    'Video Editing',
    'Content Writing',
    'Digital Marketing',
    'Social Media',
    'Data Entry',
    'Research',
    'Surveys',
    'App Testing',
    'AI/ML',
  ];

  const toggleInterest = (interest: string) => {
    setTeenData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleTeenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teenData.parentConsentChecked) {
      showToast('Please check the parental consent acknowledgement', 'error');
      return;
    }

    // Calculate approximate age
    let age = 16;
    if (teenData.dob) {
      const birthYear = new Date(teenData.dob).getFullYear();
      age = new Date().getFullYear() - birthYear;
    }

    // Save profile to storage
    const newProfile = {
      id: `teen-${Date.now()}`,
      userId: `user-teen-${Date.now()}`,
      displayName: teenData.fullName.split(' ')[0] + ' ' + (teenData.fullName.split(' ')[1]?.[0] || '') + '.',
      tagline: `${teenData.skills || 'Creative Teenlancer'} | ${teenData.classGrade}`,
      aboutMe: teenData.aboutMe || 'Motivated student ready to take on project opportunities.',
      age,
      city: teenData.city,
      state: teenData.state,
      schoolCollege: teenData.schoolCollege,
      classGrade: teenData.classGrade,
      interests: teenData.interests.length ? teenData.interests : ['Web Development'],
      skills: teenData.skills ? teenData.skills.split(',').map((s) => s.trim()) : ['React', 'Communication'],
      experienceLevel: teenData.experienceLevel,
      portfolioUrl: teenData.portfolioUrl,
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200',
      completionScore: 90,
      points: 200,
      badgeLevel: 'Rising Talent',
      isPublic: true,
      totalEarnings: 0,
      availableBalance: 0,
      pendingBalance: 0,
      completedProjectsCount: 0,
      activeProjectsCount: 0,
      rating: 5.0,
      parentConsentApproved: true,
    };

    storageService.updateTeenProfile(newProfile);
    login(teenData.email, 'teen');
    showToast('Welcome to Funngro! Your Teenlancer profile is ready.', 'success');
    navigate('/teen/dashboard');
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComp = {
      id: `comp-${Date.now()}`,
      userId: `user-comp-${Date.now()}`,
      companyName: companyData.companyName,
      contactPerson: companyData.contactPerson,
      phone: companyData.phone,
      website: companyData.website,
      industry: companyData.industry,
      companySize: companyData.companySize,
      location: companyData.location,
      description: companyData.description,
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120',
      isVerified: true,
      totalSpent: 0,
      activeProjectsCount: 0,
      totalProjectsCount: 0,
      rating: 5.0,
    };

    storageService.updateCompanyProfile(newComp);
    login(companyData.email, 'company');
    showToast('Company registered successfully! You can now publish projects.', 'success');
    navigate('/company/dashboard');
  };

  return (
    <div className="min-h-[90vh] py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Logo size="lg" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4">
            Join the Funngro Ecosystem
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Choose your account type below to get started.
          </p>

          {/* Account Role Selector */}
          <div className="inline-flex p-1 bg-slate-200 rounded-2xl mt-5">
            <button
              onClick={() => {
                setRole('teen');
                setStep(1);
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                role === 'teen'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4" /> I am a Teen (Teenlancer)
            </button>
            <button
              onClick={() => {
                setRole('company');
                setStep(1);
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                role === 'company'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" /> I am a Company (Employer)
            </button>
          </div>
        </div>

        {role === 'teen' ? (
          /* TEEN MULTI-STEP WIZARD */
          <Card className="p-8 border-slate-200 shadow-xl">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
              {['Basic', 'Education', 'Interests', 'Skills', 'Consent'].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === i + 1
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                        : step > i + 1
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 hidden sm:inline">{label}</span>
                </div>
              ))}
            </div>

            {/* Step 1: Basic Details */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Step 1: Basic Information</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Please enter your real full name. Only your first name and initial will be displayed to employers.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="e.g. Aarav Sharma"
                    required
                    value={teenData.fullName}
                    onChange={(e) => setTeenData({ ...teenData, fullName: e.target.value })}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="e.g. aarav@student.com"
                    required
                    value={teenData.email}
                    onChange={(e) => setTeenData({ ...teenData, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Mobile Number"
                    placeholder="+91 98765 43210"
                    required
                    value={teenData.phone}
                    onChange={(e) => setTeenData({ ...teenData, phone: e.target.value })}
                  />
                  <Input
                    label="Date of Birth"
                    type="date"
                    required
                    value={teenData.dob}
                    onChange={(e) => setTeenData({ ...teenData, dob: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    placeholder="e.g. Bengaluru"
                    value={teenData.city}
                    onChange={(e) => setTeenData({ ...teenData, city: e.target.value })}
                  />
                  <Input
                    label="State"
                    placeholder="e.g. Karnataka"
                    value={teenData.state}
                    onChange={(e) => setTeenData({ ...teenData, state: e.target.value })}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (!teenData.fullName || !teenData.email) {
                        showToast('Please fill required basic fields', 'error');
                        return;
                      }
                      setStep(2);
                    }}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Next: Education
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Education */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Step 2: Education Details</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Tell us where you are currently studying.
                </p>

                <Input
                  label="School or College Name"
                  placeholder="e.g. National Public School, Indiranagar"
                  required
                  value={teenData.schoolCollege}
                  onChange={(e) => setTeenData({ ...teenData, schoolCollege: e.target.value })}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Class / Education Level
                    </label>
                    <select
                      value={teenData.classGrade}
                      onChange={(e) => setTeenData({ ...teenData, classGrade: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm"
                    >
                      <option value="9th Standard">9th Standard</option>
                      <option value="10th Standard">10th Standard</option>
                      <option value="11th Standard">11th Standard</option>
                      <option value="12th Standard">12th Standard</option>
                      <option value="Undergraduate 1st Year">Undergraduate 1st Year</option>
                    </select>
                  </div>

                  <Input
                    label="Graduation / Board Year"
                    placeholder="e.g. 2027"
                    defaultValue="2027"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} icon={<ArrowLeft className="w-4 h-4" />}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={() => setStep(3)} icon={<ArrowRight className="w-4 h-4" />}>
                    Next: Interests
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Interests */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Step 3: Select Your Interests</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Choose the project domains you are interested in exploring (select all that apply).
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {availableInterests.map((interest) => {
                    const isSelected = teenData.interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span>{interest}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(2)} icon={<ArrowLeft className="w-4 h-4" />}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={() => setStep(4)} icon={<ArrowRight className="w-4 h-4" />}>
                    Next: Skills & Experience
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Skills & Experience */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Step 4: Skills & Bio</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Add tools, software, or programming languages you are familiar with.
                </p>

                <Input
                  label="Skills (Comma-Separated)"
                  placeholder="e.g. React.js, Tailwind CSS, Python, Figma, Canva"
                  value={teenData.skills}
                  onChange={(e) => setTeenData({ ...teenData, skills: e.target.value })}
                />

                <Input
                  label="Portfolio / GitHub / Social URL (Optional)"
                  placeholder="https://github.com/yourhandle or portfolio link"
                  value={teenData.portfolioUrl}
                  onChange={(e) => setTeenData({ ...teenData, portfolioUrl: e.target.value })}
                />

                <Textarea
                  label="About Me (Short Bio)"
                  placeholder="Tell companies why you are passionate about learning and building..."
                  rows={3}
                  value={teenData.aboutMe}
                  onChange={(e) => setTeenData({ ...teenData, aboutMe: e.target.value })}
                />

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(3)} icon={<ArrowLeft className="w-4 h-4" />}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={() => setStep(5)} icon={<ArrowRight className="w-4 h-4" />}>
                    Next: Safety & Verification
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Terms & Parental Consent */}
            {step === 5 && (
              <form onSubmit={handleTeenSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Step 5: Parental Consent & Safety</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Under Funngro's Child Safety policy, every student under 18 must have parental/guardian consent.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Parent / Guardian Name"
                    placeholder="e.g. Rajesh Sharma"
                    required
                    value={teenData.parentName}
                    onChange={(e) => setTeenData({ ...teenData, parentName: e.target.value })}
                  />
                  <Input
                    label="Parent / Guardian Mobile Phone"
                    placeholder="+91 98111 22334"
                    required
                    value={teenData.parentPhone}
                    onChange={(e) => setTeenData({ ...teenData, parentPhone: e.target.value })}
                  />
                </div>

                <Input
                  label="Create a Password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  required
                  value={teenData.password}
                  onChange={(e) => setTeenData({ ...teenData, password: e.target.value })}
                />

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-3">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={teenData.parentConsentChecked}
                      onChange={(e) => setTeenData({ ...teenData, parentConsentChecked: e.target.checked })}
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                      required
                    />
                    <span>
                      I confirm that my parent or guardian is aware of and consents to my participation in educational projects on Funngro.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={teenData.termsAccepted}
                      onChange={(e) => setTeenData({ ...teenData, termsAccepted: e.target.checked })}
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                      required
                    />
                    <span>
                      I agree to the Funngro{' '}
                      <Link to="/terms" className="underline font-bold">Terms of Service</Link>{' '}
                      and{' '}
                      <Link to="/privacy-policy" className="underline font-bold">Privacy Policy</Link>.
                    </span>
                  </label>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(4)} icon={<ArrowLeft className="w-4 h-4" />}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="font-bold"
                    icon={<CheckCircle2 className="w-4 h-4" />}
                  >
                    Complete Registration & Enter
                  </Button>
                </div>
              </form>
            )}
          </Card>
        ) : (
          /* COMPANY REGISTRATION */
          <Card className="p-8 border-slate-200 shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Register Your Organization</h3>
            <p className="text-xs text-slate-500 mb-6">
              Connect with top student Teenlancers and launch high-impact projects.
            </p>

            <form onSubmit={handleCompanySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  placeholder="e.g. Nexus Innovations"
                  required
                  value={companyData.companyName}
                  onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                />
                <Input
                  label="Official Work Email"
                  type="email"
                  placeholder="e.g. contact@nexus.tech"
                  required
                  value={companyData.email}
                  onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Contact Person Name"
                  placeholder="e.g. Ananya Verma"
                  required
                  value={companyData.contactPerson}
                  onChange={(e) => setCompanyData({ ...companyData, contactPerson: e.target.value })}
                />
                <Input
                  label="Official Phone Number"
                  placeholder="+91 98765 43210"
                  required
                  value={companyData.phone}
                  onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Website URL"
                  placeholder="https://nexus.tech"
                  required
                  value={companyData.website}
                  onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                />
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Industry
                  </label>
                  <select
                    value={companyData.industry}
                    onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm"
                  >
                    <option value="EdTech & Software">EdTech & Software</option>
                    <option value="Consumer Goods & D2C">Consumer Goods & D2C</option>
                    <option value="Digital Marketing & Content">Digital Marketing & Content</option>
                    <option value="Gaming & Interactive Media">Gaming & Interactive Media</option>
                    <option value="Sustainability & Agriculture">Sustainability & Agriculture</option>
                  </select>
                </div>
              </div>

              <Textarea
                label="Company Bio / What We Do"
                placeholder="Briefly describe your company mission and the projects you want students to work on..."
                rows={3}
                value={companyData.description}
                onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
              />

              <Input
                label="Create Password"
                type="password"
                placeholder="••••••••"
                required
                value={companyData.password}
                onChange={(e) => setCompanyData({ ...companyData, password: e.target.value })}
              />

              <Button
                type="submit"
                variant="secondary"
                className="w-full font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
                icon={<Building2 className="w-4 h-4" />}
              >
                Register Company & Go to Dashboard
              </Button>
            </form>
          </Card>
        )}

        <div className="mt-6 text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/auth/login" className="font-bold text-emerald-600 hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};
