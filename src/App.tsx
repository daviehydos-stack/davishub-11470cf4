import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SiteSettingsProvider } from "@/contexts/SiteSettingsContext";
import { CopyProtection } from "@/components/CopyProtection";
import Index from "./pages/Index";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import KnowledgeBank from "./pages/KnowledgeBank";
import Community from "./pages/Community";
import KcseProject from "./pages/KcseProject";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="victory-theme">
    <QueryClientProvider client={queryClient}>
      <SiteSettingsProvider>
        <TooltipProvider>
          <CopyProtection />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/kcse" element={<KnowledgeBank />} />
              <Route path="/knowledge-bank" element={<KnowledgeBank />} />
              <Route path="/kcse-2026-project" element={<KcseProject />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogPost />} />
              <Route path="/tags/:tag" element={<Blogs />} />
              <Route path="/community" element={<Community />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SiteSettingsProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
