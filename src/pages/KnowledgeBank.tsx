import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { 
  Database, 
  Code, 
  BookOpen,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Table,
  Link2,
  FileCode
} from "lucide-react";

const KnowledgeBank = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="Database Implementation Tutorial | Azani ISP Access Database Guide"
        description="Step-by-step tutorial on implementing the Azani ISP Microsoft Access database. Learn table relationships, query design, form creation, and VBA automation for your KCSE Computer Studies project."
        canonical="https://www.azaniispproject.co.ke/knowledge-bank"
        ogTitle="Azani ISP Database Implementation Guide"
        ogDescription="Master Microsoft Access database development for the Azani ISP project with our comprehensive implementation tutorial."
        keywords={[
          "Azani ISP database tutorial",
          "Microsoft Access implementation",
          "database relationships tutorial",
          "Access queries guide",
          "VBA automation Access",
          "KCSE database project help",
          "Access forms design",
          "database normalization examples",
          "SQL queries tutorial"
        ]}
      />
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Implementation Tutorial
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Database Implementation Guide
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Learn how to implement the Azani ISP database in Microsoft Access. This tutorial covers 
                practical database development techniques, from table creation to advanced query design.
              </p>
            </div>
          </div>
        </section>

        {/* Step 1: Table Creation */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  1
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold">
                  Creating Database Tables
                </h2>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <Table className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl mb-4">Setting Up Your Tables</h3>
                    <p className="text-muted-foreground mb-4">
                      Start by opening Microsoft Access and creating a new blank database. Name it 
                      "AzaniISP.accdb". The first step is creating well-structured tables with 
                      appropriate field types.
                    </p>
                    
                    <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold mb-2">Example: tblInstitutions</h4>
                      <div className="text-sm space-y-2 font-mono">
                        <div className="flex justify-between">
                          <span>InstitutionID</span>
                          <span className="text-primary">AutoNumber (Primary Key)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>InstitutionName</span>
                          <span className="text-primary">Short Text (255)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>InstitutionType</span>
                          <span className="text-primary">Short Text (50)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Location</span>
                          <span className="text-primary">Short Text (255)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>RegistrationDate</span>
                          <span className="text-primary">Date/Time</span>
                        </div>
                        <div className="flex justify-between">
                          <span>RegistrationFee</span>
                          <span className="text-primary">Currency</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <strong className="text-blue-900 dark:text-blue-100">Pro Tip:</strong>
                        <p className="text-blue-800 dark:text-blue-200 mt-1">
                          Use AutoNumber for primary keys to ensure unique identification. 
                          Set field sizes appropriately to save database space.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Relationships */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  2
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold">
                  Establishing Table Relationships
                </h2>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Link2 className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl mb-4">Creating Foreign Key Relationships</h3>
                    <p className="text-muted-foreground mb-4">
                      Navigate to Database Tools → Relationships. Add all your tables to the 
                      Relationships window. Create relationships by dragging primary keys to 
                      corresponding foreign keys in related tables.
                    </p>

                    <div className="space-y-4">
                      <div className="bg-secondary/30 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Key Relationships:</h4>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          <li>• tblInstitutions.InstitutionID → tblServiceSubscriptions.InstitutionID (One-to-Many)</li>
                          <li>• tblBandwidthPackages.PackageID → tblServiceSubscriptions.PackageID (One-to-Many)</li>
                          <li>• tblInstitutions.InstitutionID → tblPayments.InstitutionID (One-to-Many)</li>
                          <li>• tblInstitutions.InstitutionID → tblBilling.InstitutionID (One-to-Many)</li>
                        </ul>
                      </div>

                      <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong className="text-amber-900 dark:text-amber-100">Important:</strong>
                          <p className="text-amber-800 dark:text-amber-200 mt-1">
                            Always enforce referential integrity to maintain data consistency. 
                            Enable cascade updates but be careful with cascade deletes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Queries */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  3
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold">
                  Building Queries with Calculations
                </h2>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Database className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div className="w-full">
                    <h3 className="font-semibold text-xl mb-4">Creating Calculated Fields</h3>
                    <p className="text-muted-foreground mb-4">
                      Queries are essential for extracting and calculating data. Here's how to create 
                      queries with business logic for the Azani ISP system.
                    </p>

                    <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold mb-3">Query Example: Overdue Fine Calculation</h4>
                      <div className="text-sm mb-3">
                        <p className="text-muted-foreground mb-2">SQL View:</p>
                        <pre className="bg-background border border-border rounded p-3 overflow-x-auto">
{`SELECT 
  InstitutionName,
  AmountDue,
  AmountPaid,
  [AmountDue] - [AmountPaid] AS Balance,
  ([AmountDue] - [AmountPaid]) * 0.15 AS OverdueFine
FROM tblBilling
WHERE [AmountPaid] < [AmountDue]
  AND DueDate < Date();`}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold mb-3">Query Example: Upgrade Discount</h4>
                      <div className="text-sm">
                        <p className="text-muted-foreground mb-2">Calculated Field:</p>
                        <pre className="bg-background border border-border rounded p-3 overflow-x-auto">
{`DiscountedCost: [NewPackageCost] * 0.9`}
                        </pre>
                        <p className="text-muted-foreground mt-2 text-xs">
                          This applies a 10% discount to upgraded bandwidth packages
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4: Forms */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  4
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold">
                  Designing User-Friendly Forms
                </h2>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <FileCode className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl mb-4">Form Design Best Practices</h3>
                    <p className="text-muted-foreground mb-4">
                      Forms are the primary interface for data entry. Use the Form Wizard as a starting 
                      point, then customize with Layout View and Design View.
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="bg-secondary/30 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Input Validation Rules</h4>
                        <div className="text-sm space-y-1 font-mono text-muted-foreground">
                          <div><strong>Registration Fee:</strong> =8500</div>
                          <div><strong>Installation Fee:</strong> =10000</div>
                          <div><strong>Phone Number:</strong> Like "07########" Or Like "01########"</div>
                          <div><strong>Email:</strong> Like "*@*.*"</div>
                        </div>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Combo Box Setup</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          For InstitutionType field, create a combo box with these options:
                        </p>
                        <ul className="text-sm text-muted-foreground list-disc pl-5">
                          <li>Primary School</li>
                          <li>Junior School</li>
                          <li>Senior School</li>
                          <li>College</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 5: VBA Code */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  5
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold">
                  Adding VBA Automation
                </h2>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Code className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div className="w-full">
                    <h3 className="font-semibold text-xl mb-4">Automating Calculations</h3>
                    <p className="text-muted-foreground mb-4">
                      Use VBA to automate complex calculations and improve user experience.
                    </p>

                    <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold mb-3">VBA Example: Calculate LAN Cost</h4>
                      <pre className="bg-background border border-border rounded p-3 overflow-x-auto text-xs">
{`Private Sub NumberOfNodes_AfterUpdate()
    Dim nodes As Integer
    Dim cost As Currency
    
    nodes = Me.NumberOfNodes
    
    If nodes >= 2 And nodes <= 10 Then
        cost = 10000
    ElseIf nodes >= 11 And nodes <= 20 Then
        cost = 20000
    ElseIf nodes >= 21 And nodes <= 40 Then
        cost = 30000
    ElseIf nodes >= 41 And nodes <= 100 Then
        cost = 40000
    Else
        MsgBox "Invalid number of nodes", vbExclamation
        Exit Sub
    End If
    
    Me.LANCost = cost
End Sub`}
                      </pre>
                    </div>

                    <div className="flex items-start gap-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <strong className="text-green-900 dark:text-green-100">Best Practice:</strong>
                        <p className="text-green-800 dark:text-green-200 mt-1">
                          Always include error handling in your VBA code. Use Option Explicit at 
                          the top of modules to catch variable declaration errors.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Checklist */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
                Implementation Checklist
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Database Structure
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>☐ Create all required tables with proper field types</li>
                    <li>☐ Set primary keys for each table</li>
                    <li>☐ Establish relationships with referential integrity</li>
                    <li>☐ Add lookup tables for dropdown values</li>
                    <li>☐ Apply validation rules to fields</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Queries & Calculations
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>☐ Create select queries for data retrieval</li>
                    <li>☐ Build parameter queries for filtering</li>
                    <li>☐ Add calculated fields for business logic</li>
                    <li>☐ Create aggregate queries for summaries</li>
                    <li>☐ Test all queries with sample data</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Forms Design
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>☐ Design data entry forms for all tables</li>
                    <li>☐ Add combo boxes for lookup fields</li>
                    <li>☐ Implement input validation</li>
                    <li>☐ Create navigation buttons</li>
                    <li>☐ Add VBA code for automation</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Reports & Documentation
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>☐ Design professional reports with grouping</li>
                    <li>☐ Add report headers and footers</li>
                    <li>☐ Include summary calculations</li>
                    <li>☐ Create a main menu/switchboard</li>
                    <li>☐ Write comprehensive user manual</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
                Common Implementation Mistakes to Avoid
              </h2>

              <div className="space-y-4">
                <div className="bg-card border border-l-4 border-l-red-500 rounded-xl p-5">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Incorrect Data Types
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Wrong:</strong> Using Text for currency amounts or dates
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Correct:</strong> Use Currency for money, Date/Time for dates, Number for calculations
                  </p>
                </div>

                <div className="bg-card border border-l-4 border-l-red-500 rounded-xl p-5">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Missing Relationships
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Wrong:</strong> Not linking tables or forgetting referential integrity
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Correct:</strong> Always create proper relationships and enforce integrity
                  </p>
                </div>

                <div className="bg-card border border-l-4 border-l-red-500 rounded-xl p-5">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    No Input Validation
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Wrong:</strong> Allowing any value in forms without checks
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Correct:</strong> Add validation rules, required fields, and format masks
                  </p>
                </div>

                <div className="bg-card border border-l-4 border-l-red-500 rounded-xl p-5">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Poor Naming Conventions
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Wrong:</strong> Using spaces or generic names like "Table1", "Form1"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Correct:</strong> Use prefixes (tbl, frm, qry, rpt) and descriptive names
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testing Section */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
                Testing Your Database
              </h2>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Data Entry Testing</h3>
                    <p className="text-sm text-muted-foreground">
                      Test all forms with valid and invalid data. Ensure validation rules catch errors 
                      and provide helpful messages.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Query Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Run queries with different parameters to verify calculations. Check that overdue 
                      fines, discounts, and totals compute correctly.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Report Accuracy</h3>
                    <p className="text-sm text-muted-foreground">
                      Generate reports and cross-check totals manually. Ensure grouping, sorting, 
                      and summary fields work as expected.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Navigation Testing</h3>
                    <p className="text-sm text-muted-foreground">
                      Click through all menu options and buttons. Verify that every navigation 
                      element leads to the correct destination.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <BookOpen className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Need the Complete Implemented Database?
              </h2>
              <p className="text-muted-foreground mb-8">
                Get a professionally developed Azani ISP database with all tables, relationships, 
                queries, forms, and reports fully implemented and tested.
              </p>
              <a
                href="https://wa.link/4mq5mb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Complete Database - KES 500
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
