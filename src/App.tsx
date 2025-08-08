import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import PaymentGold from "./pages/PaymentGold";
import PaymentSilver from "./pages/PaymentSilver";
import PaymentGrowth from "./pages/PaymentGrowth";
import PaymentScale from "./pages/PaymentScale";
import PaymentDominate from "./pages/PaymentDominate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/payment/gold" element={<PaymentGold />} />
          <Route path="/payment/silver" element={<PaymentSilver />} />
          <Route path="/payment/growth" element={<PaymentGrowth />} />
          <Route path="/payment/scale" element={<PaymentScale />} />
          <Route path="/payment/dominate" element={<PaymentDominate />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
