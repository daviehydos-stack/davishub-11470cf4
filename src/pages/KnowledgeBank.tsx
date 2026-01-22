import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { 
  Database, 
  FileText, 
  Users, 
  Wifi, 
  CreditCard, 
  Building, 
  Settings, 
  CheckCircle,
  BookOpen,
  Server,
  Shield,
  Clock
} from "lucide-react";

const KnowledgeBank = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="Azani Internet Service Provider Information System - Complete 2026 KCSE Computer Project Guide | Paper 451/3"
        description="Comprehensive guide to the Azani ISP Information System - the official 2026 KCSE Computer Studies Project (Paper 451/3). Learn about institution registration, bandwidth packages, billing systems, database design, forms, queries, reports, and complete documentation for Milestone 1 and Milestone 2."
        canonical="https://www.azaniispproject.co.ke/kcse"
        ogTitle="Azani ISP 2026 KCSE Computer Project - Complete Knowledge Base"
        ogDescription="Everything you need to know about the Azani Internet Service Provider Information System for KCSE 2026 Computer Studies Project Paper 451/3."
        keywords={[
          "Azani ISP",
          "Azani Internet Service Provider",
          "2026 KCSE Computer Project",
          "KCSE 451/3",
          "KCSE Computer Studies Project",
          "Milestone 1",
          "Milestone 2",
          "MS Access Project",
          "KNEC Computer Project",
          "Azani ISP database",
          "Azani ISP documentation",
          "Azani bandwidth packages",
          "institution registration system",
          "ISP billing system",
          "KCSE project Kenya",
          "computer project 2026",
          "Azani Company",
          "internet service provider project"
        ]}
      />
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                2026 KCSE Computer Studies Project (451/3)
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Azani Internet Service Provider Information System
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Complete knowledge base for the official KNEC 2026 KCSE Computer Studies Project. 
                This comprehensive guide covers everything from institution registration to bandwidth management, 
                billing systems, and database implementation.
              </p>
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
                Project Overview
              </h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  <strong>Azani</strong> is a company that deals with provision of internet services and internet 
                  infrastructure to learning institutions. These institutions include primary schools, junior schools, 
                  senior schools, and colleges across Kenya.
                </p>
                
                <p>
                  The <strong>Azani Internet Service Provider Information System</strong> is the official 
                  <strong> 2026 KCSE Computer Studies Project (Paper 451/3)</strong> set by the Kenya National 
                  Examinations Council (KNEC). This 7-month project runs from January 2026 to July 2026 and requires 
                  students to develop a comprehensive Microsoft Access database management system.
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto text-primary mb-2" />
                  <p className="font-bold">7 Months</p>
                  <p className="text-sm text-muted-foreground">Project Duration</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <FileText className="w-6 h-6 mx-auto text-primary mb-2" />
                  <p className="font-bold">Paper 451/3</p>
                  <p className="text-sm text-muted-foreground">Exam Paper</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <Database className="w-6 h-6 mx-auto text-primary mb-2" />
                  <p className="font-bold">MS Access</p>
                  <p className="text-sm text-muted-foreground">Database Platform</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <CheckCircle className="w-6 h-6 mx-auto text-primary mb-2" />
                  <p className="font-bold">2 Milestones</p>
                  <p className="text-sm text-muted-foreground">Project Phases</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services & Pricing Section */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
                Azani ISP Services & Pricing Structure
              </h2>
              
              {/* Registration */}
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <Building className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Institution Registration</h3>
                    <p className="text-muted-foreground mb-3">
                      Institutions interested in Azani's services are required to pay a registration fee 
                      of <strong>KSh 8,500</strong> to the company. This covers onboarding and initial setup.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bandwidth Packages */}
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <Wifi className="w-8 h-8 text-primary flex-shrink-0" />
                  <div className="w-full">
                    <h3 className="font-semibold text-xl mb-4">Internet Bandwidth Packages</h3>
                    <p className="text-muted-foreground mb-4">
                      Azani offers various internet services where the cost per month is based on bandwidth:
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 font-semibold">Bandwidth</th>
                            <th className="text-right py-2 font-semibold">Monthly Cost (KSh)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50">
                            <td className="py-2">4 MBPS</td>
                            <td className="text-right">1,200</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">10 MBPS</td>
                            <td className="text-right">2,000</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">20 MBPS</td>
                            <td className="text-right">3,500</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">25 MBPS</td>
                            <td className="text-right">4,000</td>
                          </tr>
                          <tr>
                            <td className="py-2">50 MBPS</td>
                            <td className="text-right">7,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installation */}
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <Settings className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Installation Process</h3>
                    <p className="text-muted-foreground mb-3">
                      When an institution requests services, Azani visits the site to establish readiness 
                      for internet installation. The company assesses the number of users and infrastructure 
                      requirements. Ready institutions pay an <strong>installation fee of KSh 10,000</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* LAN & PC Sales */}
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <Server className="w-8 h-8 text-primary flex-shrink-0" />
                  <div className="w-full">
                    <h3 className="font-semibold text-xl mb-4">Infrastructure Sales</h3>
                    <p className="text-muted-foreground mb-4">
                      Institutions not meeting requirements may purchase from Azani:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground mb-4 space-y-1">
                      <li>Personal Computers: <strong>KSh 40,000 each</strong></li>
                    </ul>
                    <p className="text-muted-foreground mb-3">LAN Nodes pricing:</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 font-semibold">Number of Nodes</th>
                            <th className="text-right py-2 font-semibold">Cost (KSh)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50">
                            <td className="py-2">2 - 10 nodes</td>
                            <td className="text-right">10,000</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">11 - 20 nodes</td>
                            <td className="text-right">20,000</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">21 - 40 nodes</td>
                            <td className="text-right">30,000</td>
                          </tr>
                          <tr>
                            <td className="py-2">41 - 100 nodes</td>
                            <td className="text-right">40,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing & Fines */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <CreditCard className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Billing, Fines & Policies</h3>
                    <ul className="text-muted-foreground space-y-2">
                      <li><strong>Upgrade Discount:</strong> 10% discount on upgraded bandwidth cost</li>
                      <li><strong>Payment Due:</strong> End of current month</li>
                      <li><strong>Overdue Fine:</strong> 15% of unpaid amount</li>
                      <li><strong>Disconnection:</strong> If not paid by 10th of following month</li>
                      <li><strong>Reconnection Fee:</strong> KSh 1,000</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Requirements */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
                System Requirements & Tasks
              </h2>
              
              <p className="text-muted-foreground text-center mb-10">
                The database management system for Azani Company must perform the following tasks:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Registration Module
                  </h3>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>• Register institutions requiring services</li>
                    <li>• Capture personal details of contact person</li>
                    <li>• Track institution type (primary, junior, senior, college)</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment Capture
                  </h3>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>• Registration fees (KSh 8,500)</li>
                    <li>• Installation fees (KSh 10,000)</li>
                    <li>• Monthly bandwidth payments</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Report Generation
                  </h3>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>• List of registered institutions</li>
                    <li>• List of defaulters (unpaid bills)</li>
                    <li>• Disconnection issues list</li>
                    <li>• Infrastructure requirements per institution</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-primary" />
                    Computations
                  </h3>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>• Total installation cost per institution</li>
                    <li>• PC and LAN services cost</li>
                    <li>• Monthly charges for upgrades</li>
                    <li>• Overdue fines and reconnection fees</li>
                    <li>• Aggregate amounts by institution</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
                Project Milestones
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Milestone 1 */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">1</span>
                    <div>
                      <h3 className="font-semibold text-xl">Milestone 1</h3>
                      <p className="text-sm text-muted-foreground">Documentation (30 Marks)</p>
                    </div>
                  </div>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>✓ Problem Statement & Definition</li>
                    <li>✓ Overview of Existing System</li>
                    <li>✓ Proposed System Analysis</li>
                    <li>✓ Entity Relationship Diagram (ERD)</li>
                    <li>✓ Data Flow Diagrams (DFD)</li>
                    <li>✓ System Flowcharts</li>
                    <li>✓ Table Design with Data Types</li>
                    <li>✓ Input/Output Design</li>
                    <li>✓ Normalization (1NF, 2NF, 3NF)</li>
                  </ul>
                </div>

                {/* Milestone 2 */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">2</span>
                    <div>
                      <h3 className="font-semibold text-xl">Milestone 2</h3>
                      <p className="text-sm text-muted-foreground">Database (70 Marks)</p>
                    </div>
                  </div>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>✓ Microsoft Access Database</li>
                    <li>✓ Minimum 5 Related Tables</li>
                    <li>✓ Table Relationships</li>
                    <li>✓ Data Entry Forms</li>
                    <li>✓ Input Validation Rules</li>
                    <li>✓ Queries with Calculations</li>
                    <li>✓ Reports (minimum 3)</li>
                    <li>✓ Navigation System</li>
                    <li>✓ User Manual</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Database Design */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
                Database Design Elements
              </h2>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
                <p>
                  The Azani ISP database should include properly designed tables with appropriate relationships. 
                  Key database elements include:
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Tables</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Institutions</li>
                    <li>• Contact Persons</li>
                    <li>• Services/Bandwidth</li>
                    <li>• Payments</li>
                    <li>• Infrastructure</li>
                    <li>• Billing</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Forms</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Institution Registration</li>
                    <li>• Service Subscription</li>
                    <li>• Payment Entry</li>
                    <li>• Equipment Purchase</li>
                    <li>• Billing Management</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Reports</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Institution List</li>
                    <li>• Defaulters Report</li>
                    <li>• Monthly Revenue</li>
                    <li>• Infrastructure Summary</li>
                    <li>• Disconnection Report</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-2">What is the Azani ISP 2026 KCSE Computer Project?</h3>
                  <p className="text-muted-foreground text-sm">
                    The Azani Internet Service Provider Information System is the official 2026 KCSE 
                    Computer Studies Project (Paper 451/3) by KNEC. It requires students to develop 
                    a Microsoft Access database for managing internet services to learning institutions.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-2">What does the Azani ISP project include?</h3>
                  <p className="text-muted-foreground text-sm">
                    The project covers institution registration (KSh 8,500), bandwidth packages 
                    (4MBPS-50MBPS), installation tracking (KSh 10,000), PC sales (KSh 40,000), 
                    LAN nodes (KSh 10,000-40,000), upgrade discounts (10%), overdue fines (15%), 
                    disconnection management, and reconnection fees (KSh 1,000).
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-2">What are Milestone 1 and Milestone 2?</h3>
                  <p className="text-muted-foreground text-sm">
                    Milestone 1 (30 marks) covers documentation including problem statement, ERD, 
                    DFD, and system design. Milestone 2 (70 marks) involves building the actual 
                    Microsoft Access database with tables, forms, queries, and reports.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-2">When is the 2026 KCSE project due?</h3>
                  <p className="text-muted-foreground text-sm">
                    The project runs from January 2026 to July 2026 (7 months). Students must 
                    submit both hard copy documentation and soft copy (CD-R/CD-RW/DVD-R/DVD-RW) 
                    of their system and documentation.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-2">What database software is required?</h3>
                  <p className="text-muted-foreground text-sm">
                    Students are expected to use a Database Management System, specifically 
                    Microsoft Access, when developing their projects as specified by KNEC.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hidden SEO Content - visually hidden but accessible to crawlers */}
        <div className="sr-only" aria-hidden="true">
          <h2>Complete Azani ISP Project Keywords and Information</h2>
          <p>
            Azani Internet Service Provider Information System KCSE 2026 Computer Project Paper 451/3 
            Kenya National Examinations Council KNEC Microsoft Access Database Management System 
            Institution Registration Bandwidth Packages 4MBPS 10MBPS 20MBPS 25MBPS 50MBPS 
            Installation Fee Registration Fee Monthly Payments LAN Nodes Personal Computers 
            Overdue Fines Disconnection Reconnection Infrastructure Requirements 
            Primary Schools Junior Schools Senior Schools Colleges Learning Institutions 
            Milestone 1 Documentation Problem Statement Entity Relationship Diagram ERD 
            Data Flow Diagram DFD System Flowchart Table Design Normalization 1NF 2NF 3NF 
            Milestone 2 Database Forms Queries Reports Navigation User Manual 
            KCSE Computer Studies Project 2026 Kenya Secondary Education 
            Download Azani ISP Project Complete Documentation and Database 
            Azani Company Internet Services Kenya Education Technology 
            Computer Project Materials KCSE Preparation Study Guide 
            MS Access Tutorial Database Design Best Practices 
            Student Project Support KCSE Success Computer Studies Excellence
          </p>
          
          <h3>Azani ISP Project Marking Scheme and Requirements</h3>
          <p>
            Milestone 1 Documentation carries 30 Marks. It includes: Problem Statement and Definition, 
            Overview of Existing System analysis, Proposed System objectives and benefits, 
            Entity Relationship Diagram (ERD) showing all entities and relationships, 
            Data Flow Diagrams (DFD) Level 0 and Level 1, System Flowcharts with proper symbols, 
            Table Design with field names data types and sizes, Input Output Design specifications, 
            Database Normalization to 1NF 2NF and 3NF.
            
            Milestone 2 Database Construction carries 70 Marks. It requires: Microsoft Access Database 
            with minimum 5 properly related tables, Table Relationships using primary and foreign keys, 
            Data Entry Forms with input validation and professional design, Queries with calculations 
            for costs fines discounts and aggregate functions, Reports minimum 3 with grouping sorting 
            and summary sections, Navigation System with switchboard or menu, User Manual with 
            installation and usage instructions.
          </p>
          
          <h3>Azani ISP System Database Tables</h3>
          <p>
            The Azani ISP database should contain these tables: tblInstitutions storing institution 
            details including InstitutionID InstitutionName InstitutionType Location County ContactPersonID 
            RegistrationDate RegistrationFee. tblContactPersons storing FirstName LastName PhoneNumber 
            Email Position. tblBandwidthPackages storing PackageID PackageName BandwidthMBPS MonthlyCost. 
            tblServiceSubscriptions storing SubscriptionID InstitutionID PackageID StartDate EndDate Status. 
            tblPayments storing PaymentID InstitutionID PaymentType Amount PaymentDate ReceiptNumber. 
            tblInfrastructure storing InfrastructureID InstitutionID NumberOfPCs LANNodes TotalCost. 
            tblBilling storing BillingID InstitutionID BillingMonth AmountDue AmountPaid OverdueFine 
            DisconnectionStatus ReconnectionFee.
          </p>
          
          <h3>Azani ISP Queries and Calculations</h3>
          <p>
            Required queries include: qryRegisteredInstitutions listing all registered institutions with 
            contact details. qryDefaulters showing institutions with unpaid bills past due date. 
            qryDisconnectionList showing institutions disconnected for non-payment. 
            qryInfrastructureRequirements showing PC and LAN requirements per institution. 
            qryTotalInstallationCost calculating registration fee plus installation fee plus infrastructure cost. 
            qryPCandLANCosts calculating number of PCs times 40000 plus LAN nodes cost based on tier. 
            qryUpgradedBandwidthCharges calculating new package cost minus 10 percent discount. 
            qryMonthlyChargesByCategory grouping charges by institution type with totals for internet 
            overdue fines and reconnection fees. qryAggregateByInstitution showing total amounts 
            sorted by institution name.
          </p>
          
          <h3>Azani ISP Forms Design</h3>
          <p>
            Institution Registration Form captures institution name type location county contact person 
            details registration fee payment. Service Subscription Form links institution to bandwidth 
            package with start date. Payment Entry Form records registration installation and monthly 
            payments with receipt generation. Infrastructure Purchase Form captures PC quantities and 
            LAN node requirements with automatic cost calculation. Billing Management Form shows current 
            bills overdue status fines and payment tracking. Main Menu Form provides navigation to all 
            system functions. Login Form provides security with username and password validation.
          </p>
          
          <h3>Azani ISP Reports</h3>
          <p>
            Required reports include: Registered Institutions Report listing all institutions grouped 
            by type with contact information. Defaulters Report showing institutions with outstanding 
            payments including overdue amounts and fine calculations. Disconnection Report listing 
            institutions disconnected with dates and outstanding balances. Infrastructure Summary Report 
            showing equipment requirements and costs per institution. Monthly Revenue Report showing 
            income from registration installation subscriptions and reconnections. Institution Account 
            Statement showing payment history and current balance for individual institutions.
          </p>
          
          <h3>VBA Code and Automation</h3>
          <p>
            Visual Basic for Applications code should include: Form Load events to initialize controls 
            and set default values. Before Update events for data validation checking required fields 
            and valid ranges. Button Click procedures for navigation calculation and report generation. 
            Custom functions for calculating overdue fines as 15 percent of unpaid amount, upgrade 
            discounts as 10 percent of new package cost, LAN costs based on node tiers, total 
            installation costs combining all fees. Error handling with appropriate messages for 
            user guidance.
          </p>
          
          <h3>Contact Information</h3>
          <p>
            Azani ISP Project Help and Support available via WhatsApp at 0115475543. 
            Email hello@azaniispproject.co.ke. Website www.azaniispproject.co.ke. 
            Location Nairobi Kenya. Instant delivery after payment. 100% original plagiarism-free work. 
            Money-back guarantee if not satisfied. Complete Milestone 1 and Milestone 2 available. 
            Pricing starts at KES 500 for Milestone 1.
          </p>
          
          <ul>
            <li>Azani ISP 2026 KCSE Computer Project</li>
            <li>KCSE Paper 451/3 Azani Internet Service Provider</li>
            <li>Azani ISP Database Milestone 2</li>
            <li>Azani ISP Documentation Milestone 1</li>
            <li>KNEC Computer Studies Project 2026</li>
            <li>Microsoft Access Azani ISP System</li>
            <li>Azani Bandwidth Packages 4MBPS to 50MBPS</li>
            <li>Institution Registration KSh 8500</li>
            <li>Installation Fee KSh 10000</li>
            <li>LAN Nodes Pricing Kenya Schools</li>
            <li>Overdue Fine 15 Percent</li>
            <li>Reconnection Fee KSh 1000</li>
            <li>Upgrade Discount 10 Percent</li>
            <li>KCSE Project Download Kenya</li>
            <li>Computer Project 2026 Free Guide</li>
            <li>Azani ISP Project PDF Download</li>
            <li>KCSE Computer Project Sample</li>
            <li>Azani Internet Service Provider Kenya</li>
            <li>Computer Studies Project Help</li>
            <li>KCSE 2026 Project Azani</li>
            <li>Azani ISP ERD Entity Relationship Diagram</li>
            <li>Azani ISP DFD Data Flow Diagram</li>
            <li>Azani ISP System Flowchart</li>
            <li>Azani ISP Table Design</li>
            <li>Azani ISP Forms Design</li>
            <li>Azani ISP Queries SQL</li>
            <li>Azani ISP Reports Access</li>
            <li>Azani ISP VBA Code</li>
            <li>Azani ISP User Manual</li>
            <li>How to do Azani ISP project</li>
            <li>Azani ISP project step by step</li>
            <li>Azani ISP project complete solution</li>
            <li>Best Azani ISP project Kenya</li>
            <li>Buy Azani ISP project online</li>
            <li>Azani ISP project instant download</li>
          </ul>
        </div>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Get Your Complete Azani ISP Project
              </h2>
              <p className="text-muted-foreground mb-8">
                Download professionally prepared Milestone 1 documentation and Milestone 2 database. 
                100% original work with instant WhatsApp delivery.
              </p>
              <a
                href="https://wa.link/4mq5mb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Download Now - KES 500
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default KnowledgeBank;
