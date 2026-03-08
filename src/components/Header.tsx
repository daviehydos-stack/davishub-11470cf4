import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              alt="Azani ISP Logo"
              className="w-8 h-8 rounded-lg object-cover"
              width={32}
              height={32}
              loading="eager"
              src="/lovable-uploads/085bda9e-8e4e-4986-9404-8fc0e43e2cf5.png"
            />
            <span className="font-display text-xl font-bold">
              Azani<span className="text-primary">ISP</span>
            </span>
          </Link>

          {/* Sidebar Trigger */}
          <SidebarTrigger className="p-2 text-foreground hover:bg-secondary/50 rounded-lg transition-colors">
            <Menu size={24} />
          </SidebarTrigger>
        </div>
      </div>
    </header>
  );
}
