import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";
import PageLoader from "@/components/PageLoader";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { PackageSelectionProvider } from "@/contexts/PackageSelectionContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";

// The homepage stays eagerly imported: it is the most common landing page, and
// code-splitting it would add a round-trip before the largest contentful paint.
import Index from "./pages/Index";

/**
 * Every other route is lazy-loaded.
 *
 * Previously all 27 pages were imported eagerly, so a visitor reading one blog
 * post downloaded the whole site — including the admin dashboard and the rich
 * blog editor, which no public visitor can even reach. That produced a single
 * 1.68 MB JavaScript chunk that had to be parsed before anything rendered.
 */
const Services = lazy(() => import("./pages/Services"));
const Creators = lazy(() => import("./pages/Creators"));
const MediaForBrands = lazy(() => import("./pages/MediaForBrands"));
const VibeCoding = lazy(() => import("./pages/VibeCoding"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const PaymentGrowth = lazy(() => import("./pages/PaymentGrowth"));
const PaymentScale = lazy(() => import("./pages/PaymentScale"));
const PaymentDominate = lazy(() => import("./pages/PaymentDominate"));
const About = lazy(() => import("./pages/About"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const ThinkTank = lazy(() => import("./pages/ThinkTank"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Contact = lazy(() => import("./pages/Contact"));
const AffiliateSignup = lazy(() => import("./pages/AffiliateSignup"));
const PartnerDashboard = lazy(() => import("./pages/PartnerDashboard"));
const OurProducts = lazy(() => import("./pages/OurProducts"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RSSFeed = lazy(() => import("./pages/RSSFeed"));
const TrendingNews = lazy(() => import("./pages/TrendingNews"));

// Admin routes — never loaded for public visitors.
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const BlogDashboard = lazy(() =>
  import("./pages/admin/BlogDashboard").then((m) => ({ default: m.BlogDashboard }))
);
const BlogPostCreate = lazy(() =>
  import("./pages/admin/BlogPostCreate").then((m) => ({ default: m.BlogPostCreate }))
);
const BlogPostEdit = lazy(() =>
  import("./pages/admin/BlogPostEdit").then((m) => ({ default: m.BlogPostEdit }))
);
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AffiliateDashboard = lazy(() => import("./pages/admin/AffiliateDashboard"));

// Floating widgets appear on every page but are not needed for first paint.
const BoltChatWidget = lazy(() => import("@/components/TankChatWidget"));
const TelegramChat = lazy(() => import("@/components/TelegramChat"));

const queryClient = new QueryClient();

/** Shown while a route chunk is fetched. Matches the pre-hydration loader. */
const RouteFallback = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
    }}
  >
    <img
      src="/lovable-uploads/upm-logo.png"
      alt=""
      aria-hidden="true"
      width={80}
      height={80}
      style={{ objectFit: "contain", opacity: 0.85 }}
    />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AdminAuthProvider>
            <PackageSelectionProvider>
              <PageLoader />
              <ScrollToTop />

              <Suspense fallback={null}>
                <BoltChatWidget />
                <TelegramChat />
              </Suspense>

              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/creators" element={<Creators />} />
                  <Route path="/media-for-brands" element={<MediaForBrands />} />
                  <Route path="/vibe-coding" element={<VibeCoding />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/trending" element={<TrendingNews />} />
                  <Route path="/payment/growth" element={<PaymentGrowth />} />
                  <Route path="/payment/scale" element={<PaymentScale />} />
                  <Route path="/payment/dominate" element={<PaymentDominate />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/help-center" element={<HelpCenter />} />
                  <Route path="/think-tank" element={<ThinkTank />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/rss" element={<RSSFeed />} />
                  <Route path="/feed" element={<RSSFeed />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/affiliate-signup" element={<AffiliateSignup />} />
                  <Route path="/partner-dashboard" element={<PartnerDashboard />} />
                  <Route path="/our-products" element={<OurProducts />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin/dashboard"
                    element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
                  />
                  <Route
                    path="/admin/blog"
                    element={<ProtectedRoute><BlogDashboard /></ProtectedRoute>}
                  />
                  <Route
                    path="/admin/blog/new"
                    element={<ProtectedRoute><BlogPostCreate /></ProtectedRoute>}
                  />
                  <Route
                    path="/admin/blog/edit/:id"
                    element={<ProtectedRoute><BlogPostEdit /></ProtectedRoute>}
                  />
                  <Route
                    path="/admin/affiliates"
                    element={<ProtectedRoute><AffiliateDashboard /></ProtectedRoute>}
                  />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </PackageSelectionProvider>
          </AdminAuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
