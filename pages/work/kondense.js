import WorkCaseStudy from '@/components/WorkCaseStudy';
import {
  FaCalendarAlt,
  FaComments,
  FaUsers,
  FaLayerGroup,
  FaUserShield,
  FaColumns,
  FaRobot,
  FaProjectDiagram,
  FaTasks,
  FaTachometerAlt,
  FaMagic,
  FaKey,
} from 'react-icons/fa';

const project = {
  name: 'Kondense',
  tagline: 'CRM, Outreach & Automation Platform',
  period: '2026 to Present',
  live: 'https://kondense.ai/',
  liveLabel: 'Visit kondense.ai',
  role: 'Developer',
  category: 'Web App',
  featured: true,
  detailCover: '/WorksAssets/Kondense_imgs/kondense-dashboard.webp',
  detailCoverAlt: 'Kondense CRM dashboard with a needs-attention queue and sales metrics',
  summary:
    'A multi-tenant CRM that puts pipelines, two-way texting, AI-drafted replies, workflow automation and team operations behind one login and one permission model.',
  stats: [
    { icon: FaUsers, value: '5K+', label: 'Contacts managed' },
    { icon: FaCalendarAlt, value: '2026', label: 'In production since' },
    { icon: FaComments, value: '4', label: 'Messaging channels' },
    { icon: FaLayerGroup, value: '7', label: 'Technologies' },
    { icon: FaUserShield, value: 'Multi', label: 'Tenant workspaces' },
  ],
  problem:
    'Sales-led teams were running the business across a CRM, a separate texting tool, a drip service, a no-code connector and a pile of spreadsheets, none of which shared data or permissions. Follow-ups slipped, leads piled onto whichever rep was online, and nobody had one screen that said what needed attention today.',
  approachLabel: 'My Role',
  approach:
    'Kondense replaces that stack with one Next.js and Supabase platform on a single data model. I am a developer on the team behind it, working on the features assigned to me and on bug fixes across the app, alongside the rest of the developers.',
  outcome: [
    'One login, one data model and one permission system in place of a stack of disconnected tools',
    'Runs a live sales and delivery team day to day, with thousands of contacts and deals across multiple pipelines',
    'Follow-ups run on their own: AI-written texts, waits and branches, with quiet hours and do-not-contact enforced on every send',
  ],
  contributionsHeading: { plain: 'Across the', accent: 'Platform' },
  contributions: [
    {
      icon: FaColumns,
      title: 'CRM & pipelines',
      text: 'Multiple Kanban pipelines, saved server-side filter views, CSV import with column mapping, duplicate detection and round-robin lead assignment.',
    },
    {
      icon: FaComments,
      title: 'Two-way messaging',
      text: 'iMessage, SMS, RCS and WhatsApp through a Blooio integration, with encrypted credential storage and a connection test that never messages anyone.',
    },
    {
      icon: FaRobot,
      title: 'SMS Agent',
      text: 'Configurable AI assistants, each with its own persona, knowledge documents, example messages and a “Try it” sandbox, drafting replies in context.',
    },
    {
      icon: FaProjectDiagram,
      title: 'Visual workflow builder',
      text: 'Built on React Flow, with triggers on stage, tag, reply, owner or campaign, then waits, branches, A/B splits, AI prompts and webhooks, and a run history for every workflow.',
    },
    {
      icon: FaKey,
      title: 'Roles & permissions',
      text: 'Custom roles with screen-level access per workspace, and delete-impact previews before a role, stage or metric is removed.',
    },
    {
      icon: FaTasks,
      title: 'Operations modules',
      text: 'Task tracker, org board with published revisions, versioned policies, KPI statistics, onboarding checklists and daily production sheets.',
    },
  ],
  features: [
    {
      icon: FaTachometerAlt,
      title: 'A dashboard that asks for decisions',
      text: 'Instead of a wall of charts, the home screen collapses everything overdue, stalled or unassigned into a short list of rows, each one a decision, above live sales and team metrics.',
      image: '/WorksAssets/Kondense_imgs/kondense-dashboard.webp',
      alt: 'Kondense CRM dashboard with a needs-attention queue and sales metrics',
    },
    {
      icon: FaMagic,
      title: 'Automation without a connector',
      text: 'A drag-and-drop workflow canvas: pick what starts it, then chain texts, waits, tags, stage moves, questions and AI prompts. Every run is recorded so you can see what happened to each lead.',
      image: '/WorksAssets/Kondense_imgs/kondense-workflow.webp',
      alt: 'Kondense visual workflow builder with trigger, wait and send-text steps',
    },
    {
      icon: FaRobot,
      title: 'An AI agent you teach',
      text: 'Each SMS assistant gets its own voice, documents and example messages. It copies their tone, never their facts. Times, prices and links always come from what it has been taught.',
      image: '/WorksAssets/Kondense_imgs/kondense-ai.webp',
      alt: "Kondense SMS Agent settings for configuring an AI assistant's voice and knowledge",
    },
    {
      icon: FaUserShield,
      title: 'Permissions people understand',
      text: "A role is a job title that decides which screens someone can open. People can hold several roles, and built-in roles can't be deleted out from under the owner.",
      image: '/WorksAssets/Kondense_imgs/kondense-roles.webp',
      alt: 'Kondense roles screen showing screen-level permissions per role',
    },
  ],
  technicalHighlights: [
    "Scheduled sends are keyed to their workflow step, so a retry after a timeout can't double-text a lead.",
    'Round-robin assignment uses a compare-and-swap cursor, keeping distribution fair when a burst of leads lands in the same second.',
    'Do-not-contact is checked on every sending path, including campaigns, sequences and workflows, independently of whether a deal is marked lost.',
    'Contact filters are held server-side rather than in the URL, so names and numbers never reach logs or referrer headers.',
    'Multi-tenant workspaces let one account switch between companies, each with its own roles, branding and data.',
    "Quiet hours and daily sending caps protect a number's reputation without anyone watching the queue.",
  ],
  techstack: ['Next.js', 'React', 'Supabase', 'React Flow', 'Tailwind CSS', 'Vercel', 'Blooio'],
  gallery: [
    {
      src: '/WorksAssets/Kondense_imgs/kondense-dashboard.webp',
      alt: 'Kondense CRM dashboard with a needs-attention queue and sales metrics',
    },
    {
      src: '/WorksAssets/Kondense_imgs/kondense-workflow.webp',
      alt: 'Kondense visual workflow builder with trigger, wait and send-text steps',
    },
    {
      src: '/WorksAssets/Kondense_imgs/kondense-ai.webp',
      alt: "Kondense SMS Agent settings for configuring an AI assistant's voice and knowledge",
    },
    {
      src: '/WorksAssets/Kondense_imgs/kondense-roles.webp',
      alt: 'Kondense roles screen showing screen-level permissions per role',
    },
    {
      src: '/WorksAssets/Kondense_imgs/kondense-hero.webp',
      alt: 'Kondense marketing site homepage hero',
    },
    {
      src: '/WorksAssets/Kondense_imgs/kondense-modules.webp',
      alt: 'Kondense module deep-dive section on the marketing site',
    },
    {
      src: '/WorksAssets/Kondense_imgs/kondense-mobile.webp',
      alt: 'Kondense homepage on a mobile phone',
      mobile: true,
    },
  ],
};

export default function KondensePage() {
  return <WorkCaseStudy project={project} />;
}
