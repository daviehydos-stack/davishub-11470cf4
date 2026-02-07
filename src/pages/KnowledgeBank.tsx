import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Database, BookOpen, Download, CheckCircle, MessageCircle, Clock, Users, Award, Target, Lightbulb, Code, Table, FileSpreadsheet, AlertCircle } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const KnowledgeBank = () => {
  const { getDownloadUrl, redirectMode } = useSiteSettings();
  const downloadUrl = getDownloadUrl();
  const buttonText = redirectMode === "whatsapp" ? "Order on WhatsApp" : "Get Complete Project Files";

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 overflow-x-hidden">
      <SEOHead
        title="KCSE 2026 Computer Project Complete Guide | Azani ISP Database System"
        description="Comprehensive guide for KCSE 2026 Computer Studies Project (451/3). Complete documentation on Azani Internet Service Provider Information System - tables, forms, queries, reports, and implementation guide."
        canonical="https://www.azaniispproject.co.ke/kcse"
        ogTitle="KCSE 2026 Computer Project - Complete Azani ISP Guide & Documentation"
        ogDescription="Everything you need for the 2026 KCSE Computer Studies Project. Detailed breakdown of database tables, forms, queries, reports, calculations, and system requirements."
        keywords={[
          "KCSE 2026 Computer Project",
          "Azani ISP Project",
          "Azani Internet Service Provider",
          "KCSE 451/3",
          "Computer Studies Project Kenya",
          "MS Access Database Project",
          "KCSE Database System",
          "Computer Project Documentation",
          "KCSE Milestone 1",
          "KCSE Milestone 2",
          "Database Tables Design",
          "ER Diagrams KCSE",
          "System Flowcharts",
          "KNEC Computer Project",
          "2026 KCSE Project Guide"
        ]}
      />
      <Header />
      <main className="flex-1 pt-20 w-full max-w-full">
        {/* Hero Section */}
        <section className="py-8 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10"></div>
          <div className="container mx-auto px-4 relative max-w-full">
            <div className="max-w-5xl mx-auto text-center">
              <Badge className="mb-3 md:mb-6 bg-blue-600 text-white border-0 px-3 md:px-6 py-1.5 md:py-2 text-[10px] md:text-sm font-semibold animate-fade-in whitespace-normal">
                Official 2026 KCSE Computer Studies Project (451/3)
              </Badge>
              <h1 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900 dark:from-blue-100 dark:via-purple-200 dark:to-blue-100 bg-clip-text text-transparent animate-fade-in leading-tight">
                Azani Internet Service Provider
                <span className="block text-base sm:text-xl md:text-3xl lg:text-4xl mt-1 md:mt-4 text-slate-700 dark:text-slate-300">
                  Complete Database Information System Guide
                </span>
              </h1>
              <p className="text-sm md:text-xl text-slate-600 dark:text-slate-400 mb-4 md:mb-10 max-w-3xl mx-auto leading-relaxed px-2 animate-fade-in">
                Your comprehensive resource for understanding and mastering the 2026 KCSE Computer Studies Project. 
                From system analysis to database implementation - everything you need to excel.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center px-2">
                <Button asChild size="default" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full sm:w-auto text-sm md:text-base">
                  <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Download Now
                  </a>
                </Button>
                <Button asChild size="default" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all transform hover:scale-105 w-full sm:w-auto text-sm md:text-base">
                  <a href="https://wa.link/jox26j" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Get Expert Help on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-10 md:py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 max-w-full">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="font-display text-2xl md:text-4xl font-bold mb-3 md:mb-4">
                  Understanding the Azani ISP Project
                </h2>
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
                  Official KNEC Computer Studies Paper 3 for KCSE 2026
                </p>
              </div>
              
              <div className="prose prose-sm md:prose-lg dark:prose-invert max-w-none">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-8 rounded-2xl border border-blue-200 dark:border-blue-800 mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">What is Azani ISP?</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                    Azani Internet Service Provider is a company that specializes in providing internet services and 
                    infrastructure to educational institutions across Kenya. Their clients include primary schools, 
                    junior schools, senior schools, and colleges. The company offers bandwidth packages ranging from 
                    4 MBPS to 50 MBPS, along with LAN infrastructure installation and computer sales.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold text-lg mb-3 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-blue-600" />
                      Registration & Installation
                    </h4>
                    <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                      <li>• Registration Fee: <strong>KSh 8,500</strong></li>
                      <li>• Installation Fee: <strong>KSh 10,000</strong></li>
                      <li>• Reconnection Fee: <strong>KSh 1,000</strong></li>
                      <li>• PC Purchase: <strong>KSh 40,000</strong> each</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold text-lg mb-3 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-purple-600" />
                      Payment Policies
                    </h4>
                    <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                      <li>• Payment due: End of current month</li>
                      <li>• Overdue fine: <strong>15%</strong> of amount</li>
                      <li>• Disconnection: After 10th day of next month</li>
                      <li>• Upgrade discount: <strong>10%</strong> off new bandwidth</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Pricing Tables */}
        <section className="py-16 bg-gradient-to-b from-slate-100 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-display text-4xl font-bold mb-12 text-center">
                Azani Service Pricing Structure
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Bandwidth Pricing */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                    <h3 className="text-2xl font-bold flex items-center">
                      <Database className="mr-3 h-6 w-6" />
                      Internet Bandwidth Packages
                    </h3>
                    <p className="text-blue-100 mt-2">Monthly subscription costs</p>
                  </div>
                  <div className="p-6">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 font-semibold">Bandwidth</th>
                          <th className="text-right py-3 font-semibold">Monthly Cost</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        <tr><td className="py-3">4 MBPS</td><td className="text-right font-semibold">KSh 1,200</td></tr>
                        <tr><td className="py-3">10 MBPS</td><td className="text-right font-semibold">KSh 2,000</td></tr>
                        <tr><td className="py-3">20 MBPS</td><td className="text-right font-semibold">KSh 3,500</td></tr>
                        <tr><td className="py-3">25 MBPS</td><td className="text-right font-semibold">KSh 4,000</td></tr>
                        <tr className="bg-blue-50 dark:bg-blue-950"><td className="py-3 font-semibold">50 MBPS</td><td className="text-right font-bold text-blue-600">KSh 7,000</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* LAN Pricing */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
                    <h3 className="text-2xl font-bold flex items-center">
                      <FileSpreadsheet className="mr-3 h-6 w-6" />
                      LAN Infrastructure Costs
                    </h3>
                    <p className="text-purple-100 mt-2">One-time installation fees</p>
                  </div>
                  <div className="p-6">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 font-semibold">Number of Nodes</th>
                          <th className="text-right py-3 font-semibold">Installation Cost</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        <tr><td className="py-3">2 - 10 nodes</td><td className="text-right font-semibold">KSh 10,000</td></tr>
                        <tr><td className="py-3">11 - 20 nodes</td><td className="text-right font-semibold">KSh 20,000</td></tr>
                        <tr><td className="py-3">21 - 40 nodes</td><td className="text-right font-semibold">KSh 30,000</td></tr>
                        <tr className="bg-purple-50 dark:bg-purple-950"><td className="py-3 font-semibold">41 - 100 nodes</td><td className="text-right font-bold text-purple-600">KSh 40,000</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Requirements */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-4xl font-bold mb-12 text-center">
              KCSE Project Requirements Breakdown
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800 shadow-lg">
                <FileText className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="font-display text-2xl font-semibold mb-3">Milestone 1: Documentation</h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" /> Problem definition & analysis</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" /> System flowcharts</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" /> Data flow diagrams</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" /> ER diagrams</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" /> Table structures & designs</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" /> Form & report layouts</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-8 rounded-2xl border-2 border-purple-200 dark:border-purple-800 shadow-lg">
                <Database className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4" />
                <h3 className="font-display text-2xl font-semibold mb-3">Milestone 2: Database</h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-purple-600 mt-0.5 flex-shrink-0" /> Complete MS Access database</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-purple-600 mt-0.5 flex-shrink-0" /> Normalized table structures</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-purple-600 mt-0.5 flex-shrink-0" /> Data entry forms with validation</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-purple-600 mt-0.5 flex-shrink-0" /> Complex queries & calculations</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-purple-600 mt-0.5 flex-shrink-0" /> Professional reports</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-purple-600 mt-0.5 flex-shrink-0" /> VBA code for automation</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-8 rounded-2xl border-2 border-green-200 dark:border-green-800 shadow-lg">
                <BookOpen className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                <h3 className="font-display text-2xl font-semibold mb-3">Additional Requirements</h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" /> User manual & installation guide</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" /> System testing documentation</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" /> Implementation plan</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" /> Backup & recovery procedures</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" /> Security measures</li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" /> Complete bibliography</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Database Components */}
        <section className="py-16 bg-gradient-to-b from-slate-100 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-4xl font-bold mb-4 text-center">
                Required Database Components
              </h2>
              <p className="text-center text-slate-600 dark:text-slate-400 mb-12 text-lg">
                Essential tables, forms, queries, and reports for your MS Access database
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Tables */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center mb-6">
                    <Table className="h-8 w-8 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold">Database Tables</h3>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="font-semibold text-blue-600 mr-2">•</span>
                      <div>
                        <strong>tblInstitutions</strong> - Store institution details, addresses, contact info
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-blue-600 mr-2">•</span>
                      <div>
                        <strong>tblContactPersons</strong> - Personal details of institution representatives
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-blue-600 mr-2">•</span>
                      <div>
                        <strong>tblBandwidthPackages</strong> - Available bandwidth options and pricing
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-blue-600 mr-2">•</span>
                      <div>
                        <strong>tblServiceSubscriptions</strong> - Track which services institutions use
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-blue-600 mr-2">•</span>
                      <div>
                        <strong>tblPayments</strong> - Record all payment transactions
                      </div>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <a href="https://shop.azaniispproject.co.ke/" target="_blank" rel="noopener noreferrer">
                      View All Tables & Complete Database →
                    </a>
                  </Button>
                </div>

                {/* Forms */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center mb-6">
                    <Code className="h-8 w-8 text-purple-600 mr-3" />
                    <h3 className="text-2xl font-bold">Data Entry Forms</h3>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="font-semibold text-purple-600 mr-2">•</span>
                      <div>
                        <strong>frmInstitutionRegistration</strong> - Register new institutions with validation
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-purple-600 mr-2">•</span>
                      <div>
                        <strong>frmPaymentEntry</strong> - Record payments with automatic calculations
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-purple-600 mr-2">•</span>
                      <div>
                        <strong>frmServiceSubscription</strong> - Manage bandwidth and service subscriptions
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-purple-600 mr-2">•</span>
                      <div>
                        <strong>frmLANInstallation</strong> - Record LAN infrastructure details
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-purple-600 mr-2">•</span>
                      <div>
                        <strong>frmMainDashboard</strong> - Navigation menu and system overview
                      </div>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                    <a href="https://shop.azaniispproject.co.ke/" target="_blank" rel="noopener noreferrer">
                      View All Forms & Templates →
                    </a>
                  </Button>
                </div>

                {/* Queries */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center mb-6">
                    <Database className="h-8 w-8 text-green-600 mr-3" />
                    <h3 className="text-2xl font-bold">Required Queries</h3>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="font-semibold text-green-600 mr-2">•</span>
                      <div>
                        <strong>qryRegisteredInstitutions</strong> - List all registered institutions
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-green-600 mr-2">•</span>
                      <div>
                        <strong>qryDefaulters</strong> - Identify institutions with overdue payments
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-green-600 mr-2">•</span>
                      <div>
                        <strong>qryDisconnections</strong> - Track disconnection issues and dates
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-green-600 mr-2">•</span>
                      <div>
                        <strong>qryTotalInstallationCosts</strong> - Sum registration + installation + LAN
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-green-600 mr-2">•</span>
                      <div>
                        <strong>qryUpgradeCharges</strong> - Calculate upgrade costs with 10% discount
                      </div>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <a href="https://shop.azaniispproject.co.ke/" target="_blank" rel="noopener noreferrer">
                      View All Queries & SQL Code →
                    </a>
                  </Button>
                </div>

                {/* Reports */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center mb-6">
                    <FileText className="h-8 w-8 text-orange-600 mr-3" />
                    <h3 className="text-2xl font-bold">Generated Reports</h3>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="font-semibold text-orange-600 mr-2">•</span>
                      <div>
                        <strong>rptRegisteredInstitutions</strong> - Complete institution listing
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-orange-600 mr-2">•</span>
                      <div>
                        <strong>rptDefaulters</strong> - Overdue accounts with fines
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-orange-600 mr-2">•</span>
                      <div>
                        <strong>rptDisconnections</strong> - Service disconnection report
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-orange-600 mr-2">•</span>
                      <div>
                        <strong>rptInfrastructure</strong> - Infrastructure requirements summary
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-orange-600 mr-2">•</span>
                      <div>
                        <strong>rptMonthlyRevenue</strong> - Revenue breakdown by service
                      </div>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                    <a href="https://shop.azaniispproject.co.ke/" target="_blank" rel="noopener noreferrer">
                      View All Reports & Layouts →
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculations Required */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-display text-4xl font-bold mb-4 text-center">
                Required System Calculations
              </h2>
              <p className="text-center text-slate-600 dark:text-slate-400 mb-12 text-lg">
                Your database must automatically compute these values
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Total Installation Cost Per Institution
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Registration fee (KSh 8,500) + Installation fee (KSh 10,000) + LAN costs (based on nodes)
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-purple-600" />
                    PC and LAN Service Costs
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    (Number of PCs × KSh 40,000) + LAN infrastructure cost based on node range
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-6 rounded-xl border border-green-200 dark:border-green-800">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    Monthly Charges for Upgraded Services
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    New bandwidth cost with 10% discount applied for upgrades
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-orange-600" />
                    Total Monthly Charges with Fines
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Bandwidth charge + overdue fine (15% if late) + reconnection fee (KSh 1,000 if applicable)
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 p-6 rounded-xl border border-red-200 dark:border-red-800">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-red-600" />
                    Charges by Institution Category
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Grouped totals for primary schools, junior schools, senior schools, and colleges
                  </p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-indigo-600" />
                    Aggregate Amount Per Institution
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Sum of all services (bandwidth + LAN + PCs + fees) sorted by institution name
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="py-16 bg-gradient-to-b from-slate-100 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-4xl font-bold mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12 text-lg">
              Everything you need to know about the KCSE 2026 Computer Project
            </p>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {/* General Questions */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-blue-600">What is the Azani ISP project about?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  The Azani Internet Service Provider project is the official KCSE 2026 Computer Studies Paper 3 (451/3). 
                  It requires students to develop a complete database management system for a company that provides internet 
                  services to educational institutions. The project includes system analysis, database design, implementation 
                  in MS Access, and comprehensive documentation.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-purple-600">How many tables should my database have?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  The project requires a minimum of 5 core tables, but a comprehensive solution typically includes 10-11 tables: 
                  tblInstitutions, tblContactPersons, tblBandwidthPackages, tblServiceSubscriptions, tblPayments, 
                  tblInfrastructureRequirements, tblPCPurchases, tblLANPurchases, tblUpgrades, tblDisconnections, and 
                  tblReconnections. These tables must be properly normalized and related with primary/foreign keys.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-green-600">What forms are required for the project?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  You need at least 4 functional forms with proper validation: Institution Registration Form, Payment Entry Form, 
                  Service Subscription Form, and LAN Installation Form. Additionally, you should include a Main Dashboard/Menu, 
                  Reports Menu, and optionally a Login Form for security. Forms must include proper data validation, error handling, 
                  and navigation buttons.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-orange-600">How many queries do I need to create?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  The project requires a minimum of 10 queries including: registered institutions, defaulters list, disconnection 
                  issues, infrastructure requirements, total installation costs, PC and LAN costs, upgrade charges with discounts, 
                  monthly charges by category, aggregate services per institution, and overdue fines calculation. Each query should 
                  demonstrate different SQL operations like SELECT, JOIN, GROUP BY, and calculated fields.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-red-600">What reports must be generated?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  You need to create at least 6 professional reports: Registered Institutions Report, Defaulters Report (showing 
                  overdue accounts), Disconnection Report, Infrastructure Requirements Report, Monthly Revenue Report (breakdown 
                  by service), and Institution Summary Report (aggregating all services per institution). Reports should include 
                  headers, footers, page numbers, dates, and proper formatting.
                </p>
              </div>

              {/* Technical Questions */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-indigo-600">How do I calculate the 10% upgrade discount?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  When an institution upgrades to a higher bandwidth, apply a 10% discount to the new bandwidth cost. Formula: 
                  New Monthly Charge = (New Bandwidth Price) × 0.90. For example, upgrading to 50 MBPS (KSh 7,000) with discount 
                  = KSh 7,000 × 0.90 = KSh 6,300. This should be calculated automatically in your upgrade query or form.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-pink-600">How do I handle the 15% overdue fine calculation?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  If payment is not made by month end, apply 15% surcharge on the total amount due. Formula: Overdue Fine = 
                  (Monthly Bandwidth Charge) × 0.15. Use date functions to check if current date is past the payment deadline. 
                  The fine should be added to the total amount due, and if still unpaid by the 10th of next month, trigger 
                  disconnection status.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-teal-600">What VBA code should I include?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Include VBA for: automatic calculation of installation costs, bandwidth pricing based on selection, LAN costs 
                  based on node ranges, overdue fine calculations, upgrade discount application, form validation (preventing empty 
                  required fields), navigation between forms, auto-generating unique IDs, and date/time stamping. The code should 
                  make the system functional and automated.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-cyan-600">How should I structure my ER diagram?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Your Entity-Relationship diagram should show all entities (tables) with their attributes (fields) and 
                  relationships. Use one-to-many relationships where appropriate: one institution can have many payments, many 
                  service subscriptions, etc. Clearly mark primary keys (underlined) and foreign keys. Show cardinality (1:M) 
                  and ensure referential integrity is enforced.
                </p>
              </div>

              {/* Documentation Questions */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-amber-600">What should be in Milestone 1 documentation?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Milestone 1 includes: Introduction (company background, services), Problem Definition (current system issues), 
                  Problem Solution (how database solves them), System Analysis (existing vs proposed system), System Design 
                  (flowcharts, DFDs, ER diagrams), Table Structures (with field names and data types), Form Designs (layouts and 
                  screenshots), Report Layouts, and Storage/Processing Requirements. Typically 40-60 pages with proper formatting.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-lime-600">What goes into the System Testing section?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Document testing using three data types: Normal Data (valid entries that should be accepted), Abnormal Data 
                  (invalid entries that should be rejected with error messages), and Extreme Data (boundary values). Test each 
                  form, query, and report. Include screenshots showing validation working, error messages appearing, and correct 
                  calculations. Create a test plan table with test cases, expected results, and actual results.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-emerald-600">What should the User Manual include?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  The User Manual should cover: Installation Requirements (hardware: 4GB RAM, Windows 10; software: MS Access 2016+), 
                  Installation Steps (copying files, first run), System Navigation (how to use each form, menu structure), Data Entry 
                  Procedures (step-by-step guides with screenshots), Report Generation (how to access and print reports), 
                  Troubleshooting Common Issues, and Data Backup/Recovery Procedures. Make it clear enough for a non-technical user.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-rose-600">How should I format the documentation?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Use professional formatting: Title page with project name, your name, and school; Declaration and Supervisor 
                  Declaration pages; Table of Contents with page numbers; Acknowledgments and Dedication; Main content with clear 
                  headings (1.0, 1.1, etc.); Include screenshots, diagrams, and tables where relevant; Bibliography citing all 
                  sources; Appendix with flowchart symbols and additional material. Use Times New Roman 12pt, 1.5 line spacing.
                </p>
              </div>

              {/* Implementation Questions */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-violet-600">What changeover method should I recommend?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  The recommended changeover method is Phased Implementation. This allows gradual transition from manual to 
                  computerized system: Phase 1 (Month 1) - Install and test with sample data; Phase 2 (Month 2) - Run parallel 
                  with manual system; Phase 3 (Month 3) - Full migration with training; Phase 4 (Month 4) - Complete switchover. 
                  This minimizes risk and allows error detection before full implementation.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-fuchsia-600">What security measures should the system have?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Implement: User Authentication (login form with username/password), Role-Based Access Control (admin vs regular 
                  user privileges), Data Encryption for sensitive information, Audit Trails (logging who accessed/modified data and 
                  when), Regular Automated Backups (daily to external storage), Password Protection on database file, and User 
                  Activity Monitoring. Document each security feature in your System Implementation chapter.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-8 00 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-sky-600">How do I demonstrate data normalization?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Show your database is in Third Normal Form (3NF): 1NF - Eliminate repeating groups (each field contains atomic 
                  values); 2NF - Remove partial dependencies (non-key attributes depend on entire primary key); 3NF - Remove 
                  transitive dependencies (non-key attributes depend only on primary key). Document the normalization process 
                  showing how you eliminated redundancy and improved data integrity.
                </p>
              </div>

              {/* Submission Questions */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-blue-600">What files should be on my flash disk?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Your flash disk should contain: 1) Complete MS Access database file (.accdb), 2) Full documentation in PDF and 
                  Word formats, 3) All screenshots organized in folders, 4) Backup copy of database, 5) ReadMe file with instructions, 
                  6) Any supporting files (logo images, etc.). Label the flash disk with your name, index number, and "KCSE 2026 
                  Computer Project - Azani ISP".
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-purple-600">How is the project marked/graded?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Marking scheme typically allocates marks for: Documentation quality and completeness (25-30%), Database design 
                  and normalization (20-25%), Forms functionality and validation (15-20%), Queries complexity and accuracy (15-20%), 
                  Reports quality and formatting (10-15%), VBA code and automation (10-15%), Testing and implementation (5-10%). 
                  Ensure all requirements are met and well-documented to maximize marks.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-green-600">Can I customize or add extra features?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Yes! While you must meet all minimum requirements, adding extra features demonstrates initiative and can earn 
                  bonus marks. Consider adding: SMS notifications for overdue payments, graphical dashboards with charts, advanced 
                  search functionality, data import/export to Excel, automatic invoice generation, customer portal, or mobile-friendly 
                  interface. Document any additional features clearly in your project.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-orange-600">Where can I get help if I'm stuck?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  You can get expert help through our WhatsApp support at +254115475543. We provide guidance on database design, 
                  query optimization, VBA coding, documentation structure, and troubleshooting. You can also purchase complete 
                  project files (Milestone 1 documentation, Milestone 2 database, or complete package) from our shop at 
                  shop.azaniispproject.co.ke for reference and learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-4xl font-bold mb-6">
                Ready to Excel in Your KCSE Computer Project?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Get the complete Azani ISP project files with full documentation, working database, 
                and dedicated WhatsApp support to ensure your success.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl text-lg px-8 py-6">
                  <a href="https://shop.azaniispproject.co.ke/" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-6 w-6" />
                    Download Complete Project
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  <a href="https://wa.link/jox26j" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-6 w-6" />
                    Chat with Us on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content - Hidden but crawlable */}
        <div className="sr-only" aria-hidden="true">
          <h2>KCSE 2026 Computer Studies Project Complete Information</h2>
          
          <h3>Project Timeline and Duration</h3>
          <p>The KCSE 2026 Computer Studies Project (451/3) runs from January 2026 to July 2026, giving students 7 months to complete both Milestone 1 (Documentation) and Milestone 2 (Database Implementation).</p>
          
          <h3>Database Management System Requirements</h3>
          <p>Students must use Microsoft Access or equivalent database management system. The project requires normalized database design, minimum 5 tables with proper relationships, data entry forms with validation, complex queries including calculations and aggregations, professional reports with headers and footers, and VBA code for automation.</p>
          
          <h3>Azani Company Background</h3>
          <p>Azani is a fictional Internet Service Provider company specializing in educational institutions including primary schools, junior schools, senior schools, and colleges across Kenya. Services include internet connectivity, LAN infrastructure installation, computer sales, and technical support.</p>
          
          <h3>Complete Pricing Structure</h3>
          <p>Registration fee: KSh 8,500 one-time. Installation fee: KSh 10,000 for ready institutions. Bandwidth packages: 4 MBPS (KSh 1,200/month), 10 MBPS (KSh 2,000/month), 20 MBPS (KSh 3,500/month), 25 MBPS (KSh 4,000/month), 50 MBPS (KSh 7,000/month). LAN nodes: 2-10 nodes (KSh 10,000), 11-20 nodes (KSh 20,000), 21-40 nodes (KSh 30,000), 41-100 nodes (KSh 40,000). Personal computers: KSh 40,000 each.</p>
          
          <h3>Payment Policies and Penalties</h3>
          <p>Monthly payment due by end of current month. Late payment penalty: 15% surcharge on total amount. Disconnection after 10th day of subsequent month if unpaid. Reconnection fee: KSh 1,000. Upgrade discount: 10% off new bandwidth cost for existing customers upgrading to higher speeds.</p>
          
          <h3>Required Database Tables</h3>
          <p>tblInstitutions stores institution name, address, telephone, location, category. tblContactPersons stores representative details. tblBandwidthPackages stores available speeds and monthly costs. tblServiceSubscriptions links institutions to their chosen services. tblPayments records all financial transactions with dates and amounts. tblInfrastructureRequirements tracks LAN needs. tblPCPurchases records computer sales. tblLANPurchases records network installations. tblUpgrades tracks bandwidth upgrades with discounts. tblDisconnections logs service suspensions. tblReconnections records reactivations with fees.</p>
          
          <h3>Required Forms</h3>
          <p>Institution Registration Form for capturing new client details. Payment Entry Form for recording all payments. Service Subscription Form for bandwidth selection. LAN Installation Form for network setup. Main Dashboard for system navigation. Reports Menu for accessing all reports. Login Form for user authentication and security.</p>
          
          <h3>Required Queries</h3>
          <p>qryRegisteredInstitutions lists all clients. qryDefaulters identifies overdue accounts with fines. qryDisconnections shows suspended services. qryInfrastructureRequirements calculates total installation costs. qryTotalInstallationCosts sums registration plus installation plus LAN. qryPCandLANCosts calculates hardware expenses. qryUpgradeCharges computes new costs with 10% discount. qryMonthlyChargesByCategory groups charges by institution type. qryAggregateServices totals all services per institution. qryOverdueFines calculates 15% penalties.</p>
          
          <h3>Required Reports</h3>
          <p>Registered Institutions Report with complete client listing. Defaulters Report showing overdue accounts and fines. Disconnection Report listing suspended services with dates and reasons. Infrastructure Requirements Report detailing LAN and PC needs per institution. Monthly Revenue Report breaking down income by service type. Institution Summary Report aggregating all services and charges per client.</p>
          
          <h3>System Analysis Components</h3>
          <p>Problem definition identifying manual system limitations: data redundancy, calculation errors, slow report generation, no backup, limited security. Problem solution through computerized database: centralized data storage, automatic calculations, referential integrity, comprehensive reporting, user authentication, regular backups. Feasibility study covering technical, economic, operational, and schedule feasibility.</p>
          
          <h3>System Design Elements</h3>
          <p>System flowchart showing data flow from input through processing to output. Program flowchart detailing logic and decision points. Entity-Relationship diagram showing all tables and relationships. Data Flow Diagrams at context, level 0, and level 1. Table structures with field names, data types, sizes, and constraints. Form designs with layouts and navigation. Report layouts with headers, details, and footers.</p>
          
          <h3>Implementation Requirements</h3>
          <p>Hardware: minimum 4GB RAM, 2.4 GHz processor, 21 inch LCD monitor, CD/DVD drive, peripheral devices. Software: Windows 10 or newer, Microsoft Access 2016 or newer, antivirus software. Changeover method: phased implementation over 3-4 months. Staff training: scheduled sessions covering system operation and maintenance. Data backup: daily automated backups to external storage.</p>
          
          <h3>Testing Procedures</h3>
          <p>Normal data testing with valid entries. Abnormal data testing with invalid inputs to verify validation. Extreme data testing at boundary values. Form navigation testing. Query accuracy verification. Report generation testing. Relationship integrity testing. Security feature verification. Performance testing with large datasets.</p>
          
          <h3>Documentation Structure</h3>
          <p>Title page, declarations, acknowledgments, dedication, table of contents, list of figures and tables. Chapter 1 Introduction with company background. Chapter 2 System Analysis with problem definition and solution. Chapter 3 System Design with flowcharts and diagrams. Chapter 4 Storage requirements. Chapter 5 System Construction with screenshots. Chapter 6 System Testing with test cases. Chapter 7 Implementation plan. Chapter 8 User Manual. Chapter 9 Conclusion, recommendations, bibliography, appendix.</p>
          
          <h3>VBA Code Requirements</h3>
          <p>Automatic ID generation for records. Price calculation based on bandwidth selection. LAN cost computation from node ranges. Overdue fine calculation using date functions. Upgrade discount application. Form validation preventing empty fields. Navigation between forms. Search and filter functionality. Data export to Excel. Automatic backup procedures.</p>
          
          <h3>Normalization Process</h3>
          <p>First Normal Form eliminates repeating groups ensuring atomic values. Second Normal Form removes partial dependencies. Third Normal Form eliminates transitive dependencies. All tables have primary keys. Foreign keys enforce referential integrity. No calculated fields stored in tables. Lookup tables for bandwidth packages and LAN pricing.</p>
          
          <h3>Contact and Support Information</h3>
          <p>Phone: 0115475543. WhatsApp: +254115475543. Website: www.azaniispproject.co.ke. Shop: shop.azaniispproject.co.ke. Email: hello@azaniispproject.co.ke. Location: Nairobi, Kenya. Support hours: Monday to Friday 8am-6pm, Saturday 9am-5pm. Response time: Within 2 hours for WhatsApp messages.</p>
          
          <h3>Project Deliverables</h3>
          <p>Printed documentation (hardcopy bound). Soft copy documentation in PDF and Word formats. Complete MS Access database file. Flash disk with all project files. Screenshots of all forms, queries, and reports. User manual with step-by-step instructions. System testing documentation. Implementation and backup procedures. Bibliography and references.</p>
          
          <h3>Common Mistakes to Avoid</h3>
          <p>Incomplete documentation missing required sections. Poor database design without normalization. Forms without proper validation. Queries not demonstrating required calculations. Reports without professional formatting. Missing VBA code for automation. Inadequate testing documentation. No user manual or installation guide. Plagiarism or copying without attribution. Late submission past deadline.</p>
          
          <h3>Success Tips</h3>
          <p>Start early, don't wait until last minute. Plan documentation structure before writing. Design database schema carefully with normalization. Test each component thoroughly. Include screenshots throughout documentation. Use professional formatting consistently. Proofread for grammar and spelling. Follow KNEC guidelines exactly. Back up work regularly. Seek help when stuck rather than guessing.</p>
          
          <h3>Additional Keywords</h3>
          <p>KCSE computer project 2026, Azani ISP system, database management Kenya, MS Access project, computer studies 451/3, KNEC project guidelines, database normalization tutorial, ER diagram examples, VBA code Access, system analysis documentation, implementation manual, KCSE exam preparation, computer project help, student database project, educational ISP system</p>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default KnowledgeBank;
