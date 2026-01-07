export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  created_at: string;
  slug: string;
  category: string;
  published: boolean;
}

export const SAMPLE_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "Victory School Club Membership System: Complete Project Guide",
    slug: "victory-school-club-membership-system-guide",
    excerpt:
      "Everything you need to know about the KCSE 2025/2026 Computer Studies project. Learn about database design, forms, queries, and documentation requirements.",
    content: `
<h2>What is the Victory School Club Membership System?</h2>
<p>The Victory School Club Membership System is the official KCSE Computer Studies project for 2025/2026. This project tests your ability to design and implement a database management system that tracks student club memberships in a school setting.</p>

<h2>Project Requirements Overview</h2>
<p>According to KNEC guidelines, your project must demonstrate mastery in several key areas:</p>

<h3>1. System Analysis & Design</h3>
<ul>
<li><strong>Problem Statement:</strong> Clearly define the challenges in managing club memberships manually</li>
<li><strong>Objectives:</strong> List 4-6 SMART objectives your system will achieve</li>
<li><strong>System Requirements:</strong> Hardware, software, and user requirements</li>
</ul>

<h3>2. Database Design</h3>
<ul>
<li><strong>Entity Relationship Diagram (ERD):</strong> Show relationships between Students, Clubs, Memberships, Activities</li>
<li><strong>Data Dictionary:</strong> Document all tables, fields, data types, and constraints</li>
<li><strong>Normalization:</strong> Your database must be in at least 3NF (Third Normal Form)</li>
</ul>

<h3>3. Implementation</h3>
<ul>
<li><strong>Tables:</strong> Create at least 4 related tables with appropriate primary and foreign keys</li>
<li><strong>Forms:</strong> Design user-friendly forms for data entry and navigation</li>
<li><strong>Queries:</strong> Create at least 5 queries including parameter queries</li>
<li><strong>Reports:</strong> Generate at least 3 professional reports with grouping and summaries</li>
</ul>

<h3>4. Documentation</h3>
<p>Your documentation should include:</p>
<ul>
<li>Title page with your details and school information</li>
<li>Table of contents</li>
<li>Introduction and background</li>
<li>System analysis and design documents</li>
<li>Screenshots of your implementation</li>
<li>Testing and validation results</li>
<li>User manual</li>
<li>Conclusion and recommendations</li>
</ul>

<h2>Common Mistakes to Avoid</h2>
<ol>
<li><strong>Poor normalization:</strong> Repeating data across tables</li>
<li><strong>Missing relationships:</strong> Not properly linking tables with foreign keys</li>
<li><strong>Incomplete documentation:</strong> Skipping sections or providing insufficient detail</li>
<li><strong>Generic forms:</strong> Not customizing forms for user experience</li>
</ol>

<h2>Tips for Scoring Maximum Marks</h2>
<p>Based on the KNEC marking scheme, focus on:</p>
<ul>
<li>Clear, professional documentation (30% of marks)</li>
<li>Proper database design and relationships (25% of marks)</li>
<li>Functional queries and reports (25% of marks)</li>
<li>User interface and forms (20% of marks)</li>
</ul>
    `,
    image_url:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800",
    author: "Victory Team",
    category: "Project Guide",
    created_at: new Date().toISOString(),
    published: true,
  },
  {
    id: "2",
    title: "Database Normalization for KCSE: A Step-by-Step Guide",
    slug: "database-normalization-kcse-guide",
    excerpt:
      "Master 1NF, 2NF, and 3NF with practical examples from the Victory School Club Membership System. Essential knowledge for your project.",
    content: `
<h2>Why Normalization Matters</h2>
<p>Database normalization is a critical component of your KCSE Computer Studies project. KNEC examiners specifically look for proper normalization to award marks. Let's break down each normal form with examples from the Club Membership System.</p>

<h2>First Normal Form (1NF)</h2>
<p>A table is in 1NF when:</p>
<ul>
<li>Each column contains only atomic (indivisible) values</li>
<li>Each column has a unique name</li>
<li>There are no repeating groups</li>
</ul>

<h3>Example - Before 1NF:</h3>
<p>Students table with: StudentID, Name, Clubs (Music, Drama, Science)</p>

<h3>After 1NF:</h3>
<p>Create a separate Memberships table to handle multiple club enrollments per student.</p>

<h2>Second Normal Form (2NF)</h2>
<p>A table is in 2NF when:</p>
<ul>
<li>It is already in 1NF</li>
<li>All non-key attributes depend on the entire primary key</li>
</ul>

<h3>Example:</h3>
<p>In a Memberships table with composite key (StudentID, ClubID), store only attributes that depend on both keys together. Move StudentName to the Students table.</p>

<h2>Third Normal Form (3NF)</h2>
<p>A table is in 3NF when:</p>
<ul>
<li>It is already in 2NF</li>
<li>No transitive dependencies exist (non-key columns don't depend on other non-key columns)</li>
</ul>

<h3>Example:</h3>
<p>If StudentAddress depends on StudentID, and CountyName depends on CountyCode, split into separate tables to eliminate transitive dependency.</p>

<h2>Practical Database Structure for Club Membership System</h2>
<ol>
<li><strong>tblStudents:</strong> StudentID (PK), FirstName, LastName, Form, Stream, DateOfBirth</li>
<li><strong>tblClubs:</strong> ClubID (PK), ClubName, ClubType, Patron, MeetingDay</li>
<li><strong>tblMemberships:</strong> MembershipID (PK), StudentID (FK), ClubID (FK), JoinDate, Role, Status</li>
<li><strong>tblActivities:</strong> ActivityID (PK), ClubID (FK), ActivityName, ActivityDate, Venue</li>
</ol>

<h2>Key Takeaway</h2>
<p>Your database design section is worth 25% of your project marks. Take time to properly normalize your tables and document your normalization process in your project documentation.</p>
    `,
    image_url:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
    author: "Victory Team",
    category: "Database",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    published: true,
  },
  {
    id: "3",
    title: "Creating Professional Reports in MS Access",
    slug: "professional-reports-ms-access",
    excerpt:
      "Learn how to create reports that impress examiners. Includes grouping, sorting, calculations, and formatting tips for maximum marks.",
    content: `
<h2>Reports in Your KCSE Project</h2>
<p>Reports are a crucial part of your Computer Studies project. They demonstrate your ability to present data meaningfully. KNEC expects at least 3 well-designed reports in your project.</p>

<h2>Essential Reports for Club Membership System</h2>

<h3>1. Membership List Report</h3>
<p>A comprehensive list grouped by club showing all members.</p>
<ul>
<li><strong>Grouping:</strong> By ClubName</li>
<li><strong>Sorting:</strong> By StudentName within each group</li>
<li><strong>Include:</strong> Club header, member details, member count per club</li>
</ul>

<h3>2. Club Activities Summary Report</h3>
<p>Overview of all activities conducted by each club.</p>
<ul>
<li><strong>Grouping:</strong> By Club and Month</li>
<li><strong>Calculations:</strong> Total activities per club</li>
<li><strong>Include:</strong> Activity dates, venues, participation numbers</li>
</ul>

<h3>3. Student Participation Report</h3>
<p>Individual student's club involvement.</p>
<ul>
<li><strong>Parameter:</strong> Student ID or Name (make it a parameter query report)</li>
<li><strong>Include:</strong> All clubs joined, roles held, activities attended</li>
</ul>

<h2>Formatting Tips for Maximum Marks</h2>
<ol>
<li><strong>Header:</strong> Include school name, report title, date generated</li>
<li><strong>Footer:</strong> Page numbers, your name/ID</li>
<li><strong>Alignment:</strong> Numbers right-aligned, text left-aligned</li>
<li><strong>Spacing:</strong> Consistent margins and spacing throughout</li>
<li><strong>Totals:</strong> Use Sum, Count, Avg functions in report footer</li>
</ol>

<h2>Common Mistakes</h2>
<ul>
<li>Reports that are just raw data dumps without organization</li>
<li>Missing headers and footers</li>
<li>No grouping or sorting</li>
<li>Poor formatting that makes data hard to read</li>
</ul>

<h2>Pro Tip</h2>
<p>When documenting your reports, include screenshots showing both the design view and the print preview. Explain what each report shows and why it's useful for the school administration.</p>
    `,
    image_url:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    author: "Victory Team",
    category: "MS Access",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    published: true,
  },
];
