import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, BookOpen, MessageCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Explore our KCSE Computer Studies resources or return to the homepage."
        noindex={true}
      />
      
      <main className="flex-1 pt-16 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Illustration */}
            <div className="relative mb-8">
              <h1 className="text-[10rem] md:text-[14rem] font-display font-bold text-primary/10 leading-none select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-16 h-16 md:w-24 md:h-24 text-primary animate-pulse" />
              </div>
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Oops! Page not found
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/blogs">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Guides
                </Link>
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="bg-secondary/30 border border-border rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">
                Popular Resources
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 text-left">
                <Link 
                  to="/#download" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ArrowLeft className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      Get Your Project
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Download complete materials
                    </p>
                  </div>
                </Link>
                <a 
                  href="https://chat.whatsapp.com/IO7QQrf6GH3IRHDMDAbNwm" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      Join Community
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Get help on WhatsApp
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Tried path */}
            <p className="mt-8 text-sm text-muted-foreground">
              Tried to access: <code className="bg-secondary px-2 py-1 rounded text-xs">{location.pathname}</code>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
