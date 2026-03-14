import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = () => {
    closeMenu();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const navLinks = [{
    href: "/",
    label: "Home"
  }, {
    href: "/#download",
    label: "Pricing"
  }, {
    href: "/kcse-2026-computer-studies-project",
    label: "KCSE 2026 Project"
  }, {
    href: "/kcse",
    label: "KCSE Guide"
  }, {
    href: "/community",
    label: "Community"
  }, {
    href: "/blogs",
    label: "Blog"
  }];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (location.pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
      closeMenu();
    }
  };

  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent")}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <img alt="Azani ISP Logo" className="w-8 h-8 rounded-lg object-cover" width={32} height={32} loading="eager" src="/lovable-uploads/4910ae35-3b9c-4675-84d8-e600896dfc4f.webp" />
            <span className="font-display text-xl font-bold">
              Azani<span className="text-primary">ISP</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => link.href.startsWith("/#") ? <a key={link.href} href={link.href} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} onClick={(e) => handleSmoothScroll(e, link.href)}>
                  {link.label}
                </a> : <Link key={link.href} to={link.href} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", location.pathname === link.href ? "text-foreground bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} onClick={handleNavClick}>
                  {link.label}
                </Link>)}
          </nav>

          {/* Desktop CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button asChild className="bg-brand-purple hover:bg-brand-purple-dark font-semibold">
              <a href="#download">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button className="p-2 text-foreground" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => link.href.startsWith("/#") ? <a key={link.href} href={link.href} className={cn("px-4 py-3 rounded-lg text-sm font-medium transition-colors", "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} onClick={(e) => handleSmoothScroll(e, link.href)}>
                  {link.label}
                </a> : <Link key={link.href} to={link.href} className={cn("px-4 py-3 rounded-lg text-sm font-medium transition-colors", location.pathname === link.href ? "text-foreground bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} onClick={handleNavClick}>
                  {link.label}
                </Link>)}
            <Button asChild className="mt-2 bg-brand-purple hover:bg-brand-purple-dark font-semibold">
              <a href="#download" onClick={handleNavClick}>Get Started</a>
            </Button>
          </nav>
        </div>}
    </header>;
}