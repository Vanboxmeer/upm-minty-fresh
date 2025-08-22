import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CaseStudies from "./pages/CaseStudies";
import PaymentGrowth from "./pages/PaymentGrowth";
import PaymentScale from "./pages/PaymentScale";
import PaymentDominate from "./pages/PaymentDominate";
import About from "./pages/About";
import HelpCenter from "./pages/HelpCenter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Contact from "./pages/Contact";
import AffiliateSignup from "./pages/AffiliateSignup";
import PartnerDashboard from "./pages/PartnerDashboard";
import NotFound from "./pages/NotFound";
import RSSFeed from "./pages/RSSFeed";

// Admin imports
import { BlogDashboard } from "./pages/admin/BlogDashboard";
import { BlogPostCreate } from "./pages/admin/BlogPostCreate";
import { BlogPostEdit } from "./pages/admin/BlogPostEdit";
import AdminLogin from "./pages/admin/AdminLogin";
import AffiliateDashboard from "./pages/admin/AffiliateDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminAuthProvider>
          <ScrollToTop />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/payment/growth" element={<PaymentGrowth />} />
          <Route path="/payment/scale" element={<PaymentScale />} />
          <Route path="/payment/dominate" element={<PaymentDominate />} />
          <Route path="/about" element={<About />} />
          <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
               <Route path="/terms-of-service" element={<TermsOfService />} />
               <Route path="/rss" element={<RSSFeed />} />
               <Route path="/feed" element={<RSSFeed />} />
               
            <Route path="/contact" element={<Contact />} />
            <Route path="/affiliate-signup" element={<AffiliateSignup />} />
            <Route path="/partner-dashboard" element={<PartnerDashboard />} />
           
           {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AffiliateDashboard /></ProtectedRoute>} />
          <Route path="/admin/blog" element={<ProtectedRoute><BlogDashboard /></ProtectedRoute>} />
          <Route path="/admin/blog/new" element={<ProtectedRoute><BlogPostCreate /></ProtectedRoute>} />
          <Route path="/admin/blog/edit/:id" element={<ProtectedRoute><BlogPostEdit /></ProtectedRoute>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
