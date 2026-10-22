import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import QuoteModal from './components/common/QuoteModal';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import PricingPage from './pages/PricingPage';
import ProcessPage from './pages/ProcessPage';
import CEOPage from './pages/CEOPage';
import TestimonialsPage from './pages/TestimonialsPage';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import QuotePage from './pages/QuotePage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Client Dashboard
import ClientLayout from './layouts/ClientLayout';
import ClientDashboard from './pages/client/ClientDashboard';
import ClientInquiries from './pages/client/ClientInquiries';
import ClientProfile from './pages/client/ClientProfile';

// Admin Dashboard
import AdminLayout from './layouts/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminProjects from './pages/admin/AdminProjects';
import AdminServices from './pages/admin/AdminServices';
import AdminPricing from './pages/admin/AdminPricing';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminClients from './pages/admin/AdminClients';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminCEO from './pages/admin/AdminCEO';
import AdminMedia from './pages/admin/AdminMedia';
import AdminSettings from './pages/admin/AdminSettings';

import api from './services/api';

const App = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Load site settings for branding & footer
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data?.data?.settings) {
          setSettings(res.data.data.settings);
        }
      } catch (e) {
        // Fallback gracefully
      }
    };
    fetchSettings();
  }, []);

  // Determine if current route is in dashboard
  const isDashboardRoute =
    location.pathname.startsWith('/admin') || location.pathname.startsWith('/client');

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboardRoute && <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />}

      <main className="flex-grow">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home onOpenQuote={() => setIsQuoteOpen(true)} />} />
          <Route path="/about" element={<About onOpenQuote={() => setIsQuoteOpen(true)} />} />
          <Route path="/services" element={<Services onOpenQuote={() => setIsQuoteOpen(true)} />} />
          <Route path="/projects" element={<Projects onOpenQuote={() => setIsQuoteOpen(true)} />} />
          <Route
            path="/projects/:slug"
            element={<ProjectDetails onOpenQuote={() => setIsQuoteOpen(true)} />}
          />
          <Route path="/pricing" element={<PricingPage onOpenQuote={() => setIsQuoteOpen(true)} />} />
          <Route path="/process" element={<ProcessPage onOpenQuote={() => setIsQuoteOpen(true)} />} />
          <Route path="/ceo" element={<CEOPage onOpenQuote={() => setIsQuoteOpen(true)} />} />
          <Route
            path="/testimonials"
            element={<TestimonialsPage onOpenQuote={() => setIsQuoteOpen(true)} />}
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/faq" element={<FAQPage onOpenQuote={() => setIsQuoteOpen(true)} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Client Dashboard (Protected) */}
          <Route
            path="/client"
            element={
              <ProtectedRoute requiredRole="client">
                <ClientLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ClientDashboard />} />
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="inquiries" element={<ClientInquiries />} />
            <Route path="profile" element={<ClientProfile />} />
          </Route>

          {/* Admin Dashboard (Protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="dashboard" element={<AdminOverview />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="pricing" element={<AdminPricing />} />
            <Route path="leads" element={<AdminInquiries />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="ceo" element={<AdminCEO />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isDashboardRoute && <Footer settings={settings} />}

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
};

export default App;
