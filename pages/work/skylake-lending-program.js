import WorkCaseStudy from '@/components/WorkCaseStudy';
import {
  FaCalendarAlt,
  FaUsers,
  FaLayerGroup,
  FaUserShield,
  FaFileInvoiceDollar,
  FaChartLine,
  FaMoneyBillWave,
  FaBook,
  FaComments,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaCog,
  FaBell,
  FaFilePdf,
  FaWallet,
  FaSyncAlt,
  FaLock,
  FaTachometerAlt,
  FaHistory,
  FaMobileAlt,
} from 'react-icons/fa';

const IMG = '/WorksAssets/SkylakeLendingProgram_imgs';

const project = {
  name: 'Skylake Lending Program',
  tagline: 'Loan Management & Lending Operations Platform',
  period: '2026 to Present',
  live: 'https://lending.skylakedmv.com',
  liveLabel: 'Visit lending.skylakedmv.com',
  role: 'Full Stack Developer',
  category: 'Web App',
  featured: true,
  detailCover: `${IMG}/skylake-finance-dashboard.webp`,
  detailCoverAlt:
    'Skylake Lending finance dashboard showing action items, cash on hand and the application pipeline',
  summary:
    'An end to end lending platform for Skylake Properties: borrowers apply and pay online, finance officers approve, disburse and verify, and every peso lands in a ledger that reconciles itself against cash on hand.',
  stats: [
    { icon: FaUsers, value: '38', label: 'Borrower accounts' },
    { icon: FaCalendarAlt, value: '2026', label: 'In production since' },
    { icon: FaUserShield, value: '3', label: 'Role based portals' },
    { icon: FaFileInvoiceDollar, value: '450+', label: 'Transactions recorded' },
    { icon: FaLayerGroup, value: '30+', label: 'Screens built' },
  ],
  problem:
    'Skylake Properties ran its employee lending program on paper forms, spreadsheets and GCash screenshots passed around on chat. Nobody could say what the company had on hand without adding up a column by hand, late payments were caught only when someone remembered to look, and a borrower asking for a statement meant rebuilding their history from scratch.',
  approachLabel: 'My Role',
  approach:
    'I built the whole system from scratch and I still maintain it. That covers the Next.js front end for all three portals, the headless WordPress REST backend and its MySQL schema, the token authentication and route guards, the ledger and cash propagation engine, the reporting and PDF exports, and the deployment on Vercel. It is the lending system of Skylake Properties Company and it runs the program day to day.',
  outcome: [
    'Replaced paper forms and spreadsheets with one system covering application, approval, disbursement, payment and collection',
    'Cash on hand is always current, because every disbursement and verified payment writes into the same running chain',
    'Overdue accounts surface on their own with the late fee already computed, instead of waiting for someone to notice',
  ],
  modulesNote:
    'Three portals, each with its own navigation, guarded by role at the route level.',
  modules: [
    { icon: FaTachometerAlt, label: 'Dashboards', tag: 'All roles' },
    { icon: FaClipboardCheck, label: 'Applications', tag: 'Finance' },
    { icon: FaMoneyBillWave, label: 'Disbursements', tag: 'Finance' },
    { icon: FaFileInvoiceDollar, label: 'Payments', tag: 'Finance' },
    { icon: FaExclamationTriangle, label: 'Late Payments', tag: 'Finance' },
    { icon: FaBook, label: 'Borrower Ledger', tag: 'Report' },
    { icon: FaWallet, label: 'Cash Ledger', tag: 'Report' },
    { icon: FaChartLine, label: 'Total Charges', tag: 'Report' },
    { icon: FaSyncAlt, label: 'Loan Terms', tag: 'Report' },
    { icon: FaCog, label: 'Loan Settings', tag: 'Finance' },
    { icon: FaLayerGroup, label: 'Loan Products', tag: 'Finance' },
    { icon: FaFilePdf, label: 'Manual Entry', tag: 'Finance' },
    { icon: FaUsers, label: 'Manage Borrowers', tag: 'Admin' },
    { icon: FaUserShield, label: 'Manage Finance', tag: 'Admin' },
    { icon: FaHistory, label: 'Activity Log', tag: 'Admin' },
    { icon: FaComments, label: 'Messages', tag: 'All roles' },
    { icon: FaBell, label: 'Notifications', tag: 'All roles' },
    { icon: FaMobileAlt, label: 'Apply for Loan', tag: 'Borrower' },
  ],
  contributionsHeading: { plain: 'What I', accent: 'Built' },
  contributions: [
    {
      icon: FaLock,
      title: 'Authentication and route guards',
      text: 'Bearer tokens hashed in the database, held in an HttpOnly cookie so page scripts can never read them. Middleware revalidates every protected request and sends the wrong role back to its own dashboard.',
    },
    {
      icon: FaBook,
      title: 'The ledger engine',
      text: 'Loan transactions, payments and cash entries mirror one another. Editing any one of them propagates to the others and rebuilds the running balances, so the books cannot drift apart.',
    },
    {
      icon: FaWallet,
      title: 'Cash on hand',
      text: 'A running chain where every row stores the balance after it. Edits are projected against the chain before they are written, so a change that would overdraw the company is refused rather than half applied.',
    },
    {
      icon: FaClipboardCheck,
      title: 'Application to disbursement',
      text: 'A multi section application form with uploads and a live fee breakdown, then review, approve or decline with a reason, and release against a GCash reference once cash is confirmed to cover it.',
    },
    {
      icon: FaExclamationTriangle,
      title: 'Collections',
      text: 'Overdue tracking by severity after a five day grace period, with the late fee computed from the outstanding balance and a reminder that opens Messages with the text already written.',
    },
    {
      icon: FaChartLine,
      title: 'Reporting and exports',
      text: 'Seven finance reports over the same ledger, each with filters, CSV export and a natively drawn PDF built on a shared letterhead rather than a screenshot of the page.',
    },
  ],
  features: [
    {
      icon: FaTachometerAlt,
      title: 'A dashboard built around what needs doing',
      text: 'Five action item cards count exactly what is waiting: applications to review, payments to verify, disbursements to release, approvals to date and overdue accounts. Cash on hand sits directly beneath them, because almost every one of those actions depends on it.',
      image: `${IMG}/skylake-finance-dashboard.webp`,
      alt: 'Skylake Lending finance dashboard with action items, cash on hand and application pipeline',
    },
    {
      icon: FaBook,
      title: 'One ledger per borrower, reconciled both ways',
      text: 'Every charge, payment and adjustment on a loan in one running balance, alongside the terms it was locked at. Correct a row here and the payment record, the cash entry and the loan totals all move with it.',
      image: `${IMG}/skylake-finance-borrower-ledger.webp`,
      alt: 'Skylake Lending borrower ledger showing a full transaction history with running balance',
    },
    {
      icon: FaExclamationTriangle,
      title: 'Collections that chase themselves',
      text: 'Overdue accounts are graded by how long they have been late, with the fee already worked out and the last contact recorded. Remind jumps straight into the conversation with that borrower.',
      image: `${IMG}/skylake-finance-late-payments.webp`,
      alt: 'Skylake Lending late payments screen grading overdue accounts by severity',
    },
    {
      icon: FaFileInvoiceDollar,
      title: 'Payment verification with the whole story attached',
      text: 'Opening a submitted payment shows where it came from and a month by month tracker of the loan it belongs to, so an officer can see what this one transfer settles before verifying it.',
      image: `${IMG}/skylake-finance-payment-details.webp`,
      alt: 'Skylake Lending payment verification modal with a monthly payment tracker',
    },
    {
      icon: FaMobileAlt,
      title: 'A borrower portal that answers the obvious questions',
      text: 'Balance, next payment, due date and progress on one screen, with the full transaction history behind it. Borrowers can pay ahead for several months at once, each slot showing as awaiting verification until finance confirms it.',
      image: `${IMG}/skylake-borrower-make-a-payment.webp`,
      alt: 'Skylake Lending borrower payment screen with a monthly payment tracker',
    },
    {
      icon: FaComments,
      title: 'Messaging in the same place as the money',
      text: 'Finance officers hold conversations with borrowers without leaving the system, so a payment question and the record it refers to are never in two different apps.',
      image: `${IMG}/skylake-finance-messages.webp`,
      alt: 'Skylake Lending messages screen with borrower conversations',
    },
  ],
  technicalHighlights: [
    'The auth token lives in an HttpOnly cookie and is injected server side by a same origin proxy, so it never reaches browser JavaScript and cannot be stolen by a script on the page.',
    'Middleware revalidates the token against the backend on every protected request, which means deactivating an account logs that person out on their next click rather than whenever their token expires.',
    'Loan transactions, payment records and cash entries are deliberate mirrors, and a set of propagation helpers keeps them in step. Matching is explicit: a disbursement by loan reference, a payment by loan reference and transfer reference together, never a guess.',
    'Cash edits are projected against the running chain before anything is written, so a change that would leave the company short is refused instead of partly applied.',
    'Interest is flat rate and locked at application time, so a later change to the configured rate can never rewrite what an existing borrower owes.',
    'Database migrations are version gated and run at most once per schema version, rather than on every request.',
    'Server sent events push updates to open portals, with a timed poll behind them so a dropped connection still catches up.',
    'Finance reports draw their PDFs natively from a shared letterhead library rather than rasterising the page, so exports stay searchable and sharp.',
    'Five failed sign ins trigger a fifteen minute lockout, and the login response never reveals whether it was the address or the password that was wrong.',
  ],
  techstack: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'WordPress REST API',
    'PHP',
    'MySQL',
    'Nodemailer',
    'jsPDF',
    'Vercel',
  ],
  gallery: [
    {
      src: `${IMG}/skylake-landing-hero.webp`,
      alt: 'Skylake Lending Program public site hero',
    },
    {
      src: `${IMG}/skylake-landing-how-it-works.webp`,
      alt: 'Skylake Lending Program how it works steps and video guides',
    },
    {
      src: `${IMG}/skylake-finance-dashboard.webp`,
      alt: 'Skylake Lending finance dashboard with action items and cash on hand',
    },
    {
      src: `${IMG}/skylake-finance-borrower-ledger.webp`,
      alt: 'Skylake Lending borrower ledger with full transaction history',
    },
    {
      src: `${IMG}/skylake-finance-late-payments.webp`,
      alt: 'Skylake Lending late payments and overdue account tracking',
    },
    {
      src: `${IMG}/skylake-finance-payments-report.webp`,
      alt: 'Skylake Lending payments received report with grouped charge types',
    },
    {
      src: `${IMG}/skylake-finance-payment-details.webp`,
      alt: 'Skylake Lending payment verification modal',
    },
    {
      src: `${IMG}/skylake-finance-messages.webp`,
      alt: 'Skylake Lending finance messages and borrower conversations',
    },
    {
      src: `${IMG}/skylake-borrower-dashboard.webp`,
      alt: 'Skylake Lending borrower portal dashboard',
    },
    {
      src: `${IMG}/skylake-borrower-make-a-payment.webp`,
      alt: 'Skylake Lending borrower make a payment screen',
    },
  ],
};

export default function SkylakeLendingProgramPage() {
  return <WorkCaseStudy project={project} />;
}
