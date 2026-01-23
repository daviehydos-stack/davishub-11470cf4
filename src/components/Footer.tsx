import { Link } from "react-router-dom";
import { MessageCircle, Mail, MapPin } from "lucide-react";
export function Footer() {
  const currentYear = new Date().getFullYear();
  const quickLinks = [{
    href: "/",
    label: "Home"
  }, {
    href: "/#download",
    label: "Pricing"
  }, {
    href: "/blogs",
    label: "Blog"
  }, {
    href: "/#contact",
    label: "Contact"
  }];
  return <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img alt="Azani ISP Logo" className="w-8 h-8 rounded-lg object-cover" width={32} height={32} src="/lovable-uploads/2ce88f57-9148-449d-b1ec-c167b50e692a.jpg" />
              <span className="font-display text-xl font-bold text-foreground">
                Azani<span className="text-primary">ISP</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">Helping students ace their Computer Studies projects with original, exam-ready ISP management system materials and dedicated support. Projects are for learning only. Students must submit their own original work.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => <li key={link.href}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-foreground">Contact</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                +254 115 475 543   
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                hello@azaniispproject.co.ke
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Azani ISP Project. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made for Kenyan students
          </p>
        </div>
      </div>
    </footer>;
}