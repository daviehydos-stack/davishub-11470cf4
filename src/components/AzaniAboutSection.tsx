import { Building2, Wifi, Server, CreditCard, FileText, Database } from "lucide-react";
export function AzaniAboutSection() {
  return <section id="about-azani" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              About the Project
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
              2026 KCSE Computer Project - Azani ISP System (Paper 451/3)
            </h2>
          </div>

          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              The <strong className="text-foreground">Azani Internet Service Provider Information System</strong> is the official 2026 KCSE Computer Studies Project (Paper 451/3) by KNEC. This 7-month project (January-July 2026) requires students to develop a Microsoft Access database for Azani Company, which provides internet services to Kenyan learning institutions.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-primary" />
                  System Features
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Institution registration (KES 8,500)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Server className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Bandwidth packages: 4MBPS (KES 1,200) to 50MBPS (KES 7,000)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CreditCard className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Installation (KES 10,000), PC sales (KES 40,000)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Wifi className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>LAN nodes (KES 10,000-40,000), upgrade discounts (10%)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  What You Get
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Database className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Milestone 1:</strong> Documentation with problem statement, ERD, DFD, normalization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Database className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Milestone 2:</strong> Working MS Access database with tables, forms, queries, reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Overdue fines (15%), disconnection management, reconnection fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>All KNEC-required reports included</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-center text-lg">500+ KCSE students scored 90%+ in our past projects. Complete package includes Milestone 1 documentation and Milestone 2 working database. 100% original, plagiarism-free content.<strong className="text-foreground">500+ KCSE students</strong> ​
            </p>
          </div>
        </div>
      </div>
    </section>;
}