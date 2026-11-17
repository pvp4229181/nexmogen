import {
  FiCode,
  FiCpu,
  FiLayers,
  FiUsers,
  FiTrendingUp,
  FiSmartphone,
} from "react-icons/fi";

export interface ServiceDetail {
  icon: typeof FiCode;
  slug: string;
  title: string;
  description: string;
  tagline: string;
  overview: string;
  features: { title: string; description: string }[];
  process: { title: string; description: string }[];
  techStack?: string[];
  stats?: { value: string; label: string }[];
  ctaLabel: string;
}

export const services: ServiceDetail[] = [
  {
    icon: FiCode,
    slug: "website-development",
    title: "Website Development",
    description:
      "Create high-performance, SEO-optimized websites designed to convert visitors into customers. We build fast, secure, and responsive business websites, landing pages, and e-commerce platforms focused on user experience, search visibility, performance optimization, and consistent lead generation.",
    tagline: "Beautiful design meets powerful functionality",
    overview:
      "We build custom websites that pair a distinctive, on-brand look with fast, reliable engineering — designed from day one to load quickly, work on every device, and turn visitors into customers.",
    features: [
      {
        title: "Built for Speed",
        description: "Pages load in under two seconds thanks to optimized assets and modern tooling.",
      },
      {
        title: "Every Device Covered",
        description: "Adaptive, responsive layouts that hold up on desktop, tablet, and mobile alike.",
      },
      {
        title: "Bespoke Design",
        description: "A custom look built around your brand — never a generic template.",
      },
      {
        title: "Locked Down Security",
        description: "SSL certificates, regular updates, and proactive vulnerability protection.",
      },
      {
        title: "Search-Ready from Day One",
        description: "Clean, semantic code and SEO best practices baked into every build.",
      },
      {
        title: "Ongoing Support",
        description: "Post-launch maintenance and support packages so the site keeps performing.",
      },
    ],
    process: [
      { title: "Consultation", description: "We map your goals, audience, and requirements." },
      { title: "Design", description: "Mockups and interactive previews for your sign-off." },
      { title: "Development", description: "Clean code, built and tested across browsers and devices." },
      { title: "Launch & Monitor", description: "Deployment followed by ongoing performance monitoring." },
    ],
    techStack: ["React", "Next.js", "Node.js", "Tailwind CSS", "WordPress"],
    ctaLabel: "Get a Free Consultation",
  },
  {
    icon: FiCpu,
    slug: "ai-agents-for-business",
    title: "AI Agents for Business",
    description:
      "Empower your business with intelligent AI agents built for automation and efficiency. We develop custom AI agents for sales, customer support, HR, lead qualification, and appointment booking, helping businesses streamline operations, reduce manual work, and scale faster with lower operational costs.",
    tagline: "Intelligent automation tailored to your business",
    overview:
      "Custom AI agents that take repetitive, high-volume work off your team's plate — from qualifying leads to answering support questions — so you can scale without scaling headcount.",
    features: [
      { title: "Sales Agents", description: "Qualify leads and hold conversations around the clock." },
      { title: "Customer Support", description: "Resolve common queries automatically and escalate the rest." },
      { title: "HR & Recruitment", description: "Screen candidates and schedule interviews automatically." },
      { title: "Lead Qualification", description: "Prioritize the prospects most likely to convert." },
      { title: "Appointment Booking", description: "Manage calendars and bookings without manual back-and-forth." },
      { title: "Workflow Automation", description: "Eliminate repetitive, manual tasks across your operations." },
    ],
    process: [
      { title: "Needs Assessment", description: "We identify where automation delivers the most value." },
      { title: "Custom Development", description: "Agents built and trained around your specific workflows." },
      { title: "Training & Testing", description: "Rigorous testing before anything goes live." },
      { title: "Deployment & Support", description: "Launched with ongoing monitoring and support." },
    ],
    stats: [
      { value: "24/7", label: "Availability" },
      { value: "60%", label: "Cost Reduction" },
      { value: "Weeks", label: "To Deploy" },
    ],
    ctaLabel: "Book a Free Consultation",
  },
  {
    icon: FiLayers,
    slug: "saas-software-development",
    title: "SaaS Software Development",
    description:
      "Build scalable and secure SaaS platforms tailored to your business goals. We provide custom SaaS software development from MVP to full-scale products, delivering subscription-based solutions with modern architectures, seamless integrations, and long-term performance for startups and enterprises.",
    tagline: "SaaS development, from MVP to enterprise scale",
    overview:
      "We design and build subscription-based software platforms — from a first MVP that proves out your idea to a multi-tenant, enterprise-grade product built to scale.",
    features: [
      { title: "Rapid MVP Prototyping", description: "Validate your concept fast and get in front of users or investors." },
      { title: "Full-Scale Platforms", description: "Multi-tenant architecture built for growth." },
      { title: "Legacy Modernization", description: "Bring older systems into a modern SaaS architecture." },
      { title: "APIs & Integrations", description: "Connect your platform to the tools your customers already use." },
      { title: "Cross-Platform Delivery", description: "Web and mobile apps from a shared foundation." },
      { title: "Compliance & Security", description: "Built with GDPR, HIPAA, and SOC2 requirements in mind." },
    ],
    process: [
      { title: "Discovery & Planning", description: "Defining scope, architecture, and success metrics." },
      { title: "UI/UX Design", description: "Designing the experience before a line of code is locked in." },
      { title: "Agile Development", description: "Iterative development with regular check-ins." },
      { title: "Deployment & Scaling", description: "Launch, then optimize as usage grows." },
    ],
    techStack: [
      "React", "Vue", "Angular", "Node.js", "Python", "Ruby", "Java",
      "PostgreSQL", "MongoDB", "Redis", "AWS", "Azure", "GCP",
    ],
    ctaLabel: "Schedule a Free Consultation",
  },
  {
    icon: FiUsers,
    slug: "crm-software-development",
    title: "CRM Software Solutions",
    description:
      "Optimize operations with custom CRM software designed for your workflow. Our CRM solutions help businesses manage leads, customers, sales pipelines, reporting, and automation, providing real-time insights that improve productivity, customer relationships, and revenue growth.",
    tagline: "Manage leads, customers, and pipelines in one place",
    overview:
      "A CRM built around how your team actually sells and supports customers — with automated lead capture, a visual pipeline, and real-time reporting instead of a rigid off-the-shelf tool.",
    features: [
      { title: "Lead & Pipeline Management", description: "Automated capture, scoring, routing, and a visual, customizable pipeline." },
      { title: "Customer Intelligence", description: "360° customer profiles with full interaction history and segmentation." },
      { title: "Automation & Workflows", description: "Email nurture campaigns and automated notifications and approvals." },
      { title: "Analytics & Reporting", description: "Real-time dashboards, custom reports, and predictive analytics." },
      { title: "Mobile CRM", description: "Full access on the go, including offline mode." },
      { title: "Service & Quoting", description: "Support ticketing plus quote and proposal generation." },
    ],
    stats: [
      { value: "40%", label: "Sales Increase" },
      { value: "35%", label: "Cost Reduction" },
      { value: "50%", label: "Faster Response" },
      { value: "60%", label: "Better Decisions" },
    ],
    process: [
      { title: "Discovery", description: "Mapping your sales and support workflows." },
      { title: "Design", description: "Designing the pipeline, dashboards, and automations around your process." },
      { title: "Build & Integrate", description: "Development plus integrations with your existing tools." },
      { title: "Launch & Support", description: "Rollout, training, and ongoing support." },
    ],
    techStack: ["Gmail & Outlook", "Slack & Teams", "Shopify & WooCommerce", "Accounting tools"],
    ctaLabel: "Book a Free Demo",
  },
  {
    icon: FiTrendingUp,
    slug: "digital-marketing-services",
    title: "Digital Marketing & Growth Solutions",
    description:
      "Grow your brand with data-driven digital marketing strategies that deliver measurable results. We offer SEO, paid advertising, social media marketing, and conversion optimization to attract targeted traffic, generate qualified leads, and achieve consistent growth through monthly plans.",
    tagline: "Data-driven marketing to grow your brand",
    overview:
      "Targeted traffic and lead generation built on data, not guesswork — SEO, paid campaigns, social, and content working together and refined against real performance numbers every month.",
    features: [
      { title: "SEO Optimization", description: "Keyword research, technical fixes, content, and backlink strategy." },
      { title: "Paid Advertising", description: "ROI-focused campaigns across Google Ads and social platforms." },
      { title: "Social Media Marketing", description: "Content, community management, and paid social execution." },
      { title: "Conversion Optimization", description: "Testing and landing page improvements that lift conversion rates." },
      { title: "Content Marketing", description: "Blog posts, video, and case studies that drive engagement." },
      { title: "Email Marketing", description: "Automated sequences and nurture campaigns." },
    ],
    stats: [
      { value: "300%", label: "Traffic Growth" },
      { value: "50%", label: "Spend Efficiency" },
      { value: "40%", label: "More Leads" },
      { value: "5x", label: "ROI Improvement" },
    ],
    process: [
      { title: "Strategy", description: "Building a plan around your goals and audience." },
      { title: "Execution", description: "Launching campaigns across the right channels." },
      { title: "Monitoring", description: "Tracking performance against real numbers, not vanity metrics." },
      { title: "Optimize & Scale", description: "Doubling down on what works." },
    ],
    ctaLabel: "Request a Free Marketing Audit",
  },
  {
    icon: FiSmartphone,
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description:
      "Develop powerful mobile applications that support business growth and engagement. We build Android, iOS, and cross-platform mobile apps focused on performance, scalability, secure architecture, smooth user experience, and long-term maintenance and support.",
    tagline: "Native and cross-platform apps that perform",
    overview:
      "Android, iOS, and cross-platform mobile apps built for performance, security, and a great user experience — with support that continues well after launch.",
    features: [
      { title: "Native Android", description: "Kotlin/Java development optimized around Material Design." },
      { title: "Native iOS", description: "Swift/SwiftUI development aligned with Apple's guidelines." },
      { title: "Cross-Platform", description: "React Native and Flutter for a single, cost-effective codebase." },
      { title: "Secure Architecture", description: "Enterprise-grade security, encryption, and biometric authentication." },
      { title: "Backend Integration", description: "Seamless connections to the systems you already run." },
      { title: "App Store Launch", description: "Guided submission plus ongoing maintenance and updates." },
    ],
    process: [
      { title: "Discovery", description: "Requirements analysis and technical planning." },
      { title: "Design", description: "Wireframing and user testing before development starts." },
      { title: "Agile Development", description: "Iterative builds with continuous QA." },
      { title: "Launch & Support", description: "App store deployment and long-term support." },
    ],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    ctaLabel: "Schedule a Free Consultation",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
