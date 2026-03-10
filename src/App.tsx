import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SiteSettingsProvider } from "@/contexts/SiteSettingsContext";
import { CopyProtection } from "@/components/CopyProtection";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import Index from "./pages/Index";

// Lazy load non-critical pages
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const KnowledgeBank = lazy(() => import("./pages/KnowledgeBank"));
const Community = lazy(() => import("./pages/Community"));
const KcseProject = lazy(() => import("./pages/KcseProject"));
const KcseComputerStudies = lazy(() => import("./pages/KcseComputerStudies"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

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
            <SidebarProvider defaultOpen={false}>
              <div className="min-h-screen flex w-full">
                <div className="flex-1 flex flex-col min-w-0">
                  <Header />
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/kcse" element={<KnowledgeBank />} />
                      <Route path="/knowledge-bank" element={<KnowledgeBank />} />
                      <Route path="/kcse-2026-project" element={<KcseProject />} />
                      <Route path="/kcse-2026-computer-studies-project" element={<KcseComputerStudies />} />
                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/blogs/:slug" element={<BlogPost />} />
                      <Route path="/tags/:tag" element={<Blogs />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/articles" element={<Articles />} />
                      <Route path="/articles/:slug" element={<ArticleDetail />} />
                      <Route path="/admin" element={<Admin />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </div>
                <AppSidebar />
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </TooltipProvider>
      </SiteSettingsProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
