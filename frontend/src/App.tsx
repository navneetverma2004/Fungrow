import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TeenLayout } from '@/components/layout/TeenLayout';
import { CompanyLayout } from '@/components/layout/CompanyLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';

// Public Pages
import { Home } from '@/pages/public/Home';
import { TeenLanding } from '@/pages/public/TeenLanding';
import { CompanyLanding } from '@/pages/public/CompanyLanding';
import { HowItWorks } from '@/pages/public/HowItWorks';
import { About } from '@/pages/public/About';
import { Contact } from '@/pages/public/Contact';
import { FAQ } from '@/pages/public/FAQ';
import { PrivacyPolicy } from '@/pages/public/PrivacyPolicy';
import { Terms } from '@/pages/public/Terms';
import { NotFound } from '@/pages/public/NotFound';

// Auth Pages
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { VerifyEmail } from '@/pages/auth/VerifyEmail';

// Teen Portal Pages
import { TeenDashboard } from '@/pages/teen/TeenDashboard';
import { ExploreProjects } from '@/pages/teen/ExploreProjects';
import { ProjectDetails } from '@/pages/teen/ProjectDetails';
import { MyApplications } from '@/pages/teen/MyApplications';
import { MyProjects } from '@/pages/teen/MyProjects';
import { Tasks } from '@/pages/teen/Tasks';
import { Portfolio } from '@/pages/teen/Portfolio';
import { Earnings } from '@/pages/teen/Earnings';
import { Leaderboard } from '@/pages/teen/Leaderboard';
import { Referrals } from '@/pages/teen/Referrals';
import { Messages as TeenMessages } from '@/pages/teen/Messages';
import { Notifications as TeenNotifications } from '@/pages/teen/Notifications';
import { Settings as TeenSettings } from '@/pages/teen/Settings';

// Company Portal Pages
import { CompanyDashboard } from '@/pages/company/CompanyDashboard';
import { PostProject } from '@/pages/company/PostProject';
import { CompanyProjects } from '@/pages/company/CompanyProjects';
import { CompanyApplications } from '@/pages/company/CompanyApplications';
import { DiscoverTalent } from '@/pages/company/DiscoverTalent';
import { ActiveProjects } from '@/pages/company/ActiveProjects';
import { Payments } from '@/pages/company/Payments';
import { Analytics } from '@/pages/company/Analytics';
import { CompanyProfile } from '@/pages/company/CompanyProfile';
import { CompanySettings } from '@/pages/company/CompanySettings';

// Admin Portal Pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminUsers } from '@/pages/admin/AdminUsers';
import { AdminProjects } from '@/pages/admin/AdminProjects';
import { AdminPayments } from '@/pages/admin/AdminPayments';
import { AdminReports } from '@/pages/admin/AdminReports';

const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes with Navbar and Footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/teen" element={<TeenLanding />} />
              <Route path="/company" element={<CompanyLanding />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              
              {/* Auth Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/auth/verify-email" element={<VerifyEmail />} />
            </Route>

            {/* Teen Application Routes */}
            <Route path="/teen" element={<TeenLayout />}>
              <Route path="dashboard" element={<TeenDashboard />} />
              <Route path="explore" element={<ExploreProjects />} />
              <Route path="projects/:projectId" element={<ProjectDetails />} />
              <Route path="my-applications" element={<MyApplications />} />
              <Route path="my-projects" element={<MyProjects />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="earnings" element={<Earnings />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="referrals" element={<Referrals />} />
              <Route path="messages" element={<TeenMessages />} />
              <Route path="notifications" element={<TeenNotifications />} />
              <Route path="profile" element={<TeenSettings />} />
              <Route path="settings" element={<TeenSettings />} />
            </Route>

            {/* Company Application Routes */}
            <Route path="/company" element={<CompanyLayout />}>
              <Route path="dashboard" element={<CompanyDashboard />} />
              <Route path="post-project" element={<PostProject />} />
              <Route path="projects" element={<CompanyProjects />} />
              <Route path="projects/:projectId" element={<ProjectDetails />} />
              <Route path="applications" element={<CompanyApplications />} />
              <Route path="talent" element={<DiscoverTalent />} />
              <Route path="active-projects" element={<ActiveProjects />} />
              <Route path="payments" element={<Payments />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="messages" element={<TeenMessages />} />
              <Route path="notifications" element={<TeenNotifications />} />
              <Route path="profile" element={<CompanyProfile />} />
              <Route path="settings" element={<CompanySettings />} />
            </Route>

            {/* Admin Application Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="companies" element={<AdminUsers />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="applications" element={<AdminProjects />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminReports />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
