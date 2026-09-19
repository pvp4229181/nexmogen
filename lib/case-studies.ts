/**
 * Long-form case study copy for the /case-studies page.
 *
 * Kept separate from the Project documents in MongoDB: the portfolio carousel
 * only needs name/category/image, while these narratives are static editorial
 * content that never changes per environment.
 */

export interface CaseStudy {
  slug: string;
  name: string;
  category: string;
  /** Sector / one-line positioning shown next to the title. */
  sector: string;
  imageUrl?: string;
  websiteUrl?: string;
  summary: string;
  challenge: string;
  approach: string[];
  delivered: string[];
  stack: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "painite-travels",
    name: "Painite Travels",
    category: "Travel / Tourism",
    sector: "Luxury travel",
    imageUrl: "/projects/painite-travels.jpg",
    websiteUrl: "https://www.painitetravels.com/",
    summary:
      "A boutique destination management company selling private, bespoke journeys across India, Nepal, Bhutan, Sri Lanka and the Maldives.",
    challenge:
      "Bespoke travel is sold on trust and atmosphere, not on price lists. The site had to feel as considered as the journeys themselves, while still guiding a high-intent visitor from browsing destinations to starting a private enquiry.",
    approach: [
      "Built the homepage around full-bleed destination imagery so the first impression carries the luxury positioning.",
      "Structured the catalogue by destination and by experience type, so visitors can enter from either 'where' or 'what'.",
      "Made the private enquiry the single primary action, repeated at every natural decision point instead of a generic contact form at the end.",
    ],
    delivered: [
      "Destination and experience browsing across five countries",
      "Editorial journal section for long-form travel writing",
      "Private enquiry flow as the primary conversion path",
      "Responsive layouts tuned for image-led storytelling",
    ],
    stack: ["Website Development", "UI/UX Design", "SEO Setup"],
  },
  {
    slug: "skillship",
    name: "Skillship",
    category: "Educational Platform",
    sector: "EdTech / LMS",
    imageUrl: "/projects/skillship.jpg",
    websiteUrl: "https://skillship.in",
    summary:
      "An AI-powered learning management system built for Indian schools, covering teaching infrastructure, adaptive assessment and career guidance.",
    challenge:
      "A school LMS has three different audiences — administrators, teachers and students — and each judges the product on a different promise. The platform needed to explain a broad AI feature set without becoming a feature dump.",
    approach: [
      "Framed the product as one infrastructure layer, then let each module (assessment, career guidance, content upload) prove itself underneath.",
      "Led with concrete mechanics such as adaptive quizzing and PDF-to-course generation rather than abstract AI claims.",
      "Separated the decision-maker path from the day-to-day user path so a principal and a teacher each reach the right page quickly.",
    ],
    delivered: [
      "Marketing site for a multi-module AI learning platform",
      "Module-level pages for assessment, career guidance and content tools",
      "Demo and onboarding funnel aimed at school decision-makers",
    ],
    stack: ["Website Development", "SaaS Product UI", "Backend Integration"],
  },
  {
    slug: "trueway-network",
    name: "Trueway Network",
    category: "Production Support Services",
    sector: "Film production services",
    imageUrl: "https://nexmogen.com/wp-content/uploads/2026/01/Frame-1-1.png",
    websiteUrl: "https://truewaynetwork.com/",
    summary:
      "Line production, location scouting, filming permissions and production fixing for crews shooting across North India.",
    challenge:
      "International production teams shortlist fixers fast and on evidence. The site had to establish regional coverage, permit capability and past work inside the first screen.",
    approach: [
      "Led with service coverage — line production, permissions, logistics, fixing — instead of a generic agency introduction.",
      "Named the regions explicitly (Delhi, Agra, Rajasthan, Varanasi) so location-driven searches land on matching copy.",
      "Placed recent work directly beneath the services so credibility follows capability without an extra click.",
    ],
    delivered: [
      "Service architecture covering production, permits and logistics",
      "Region-led content for location and permission searches",
      "Recent work showcase and direct enquiry routing",
    ],
    stack: ["WordPress Development", "SEO Setup", "Website Maintenance"],
  },
  {
    slug: "shrimani-bhadravir",
    name: "Shrimani Bhadravir",
    category: "Industrial E-commerce",
    sector: "Industrial supply",
    imageUrl:
      "https://nexmogen.com/wp-content/uploads/2026/01/Website-services-nexmogen-Website.png",
    summary:
      "An industrial products storefront built to move a catalogue-driven business onto the web.",
    challenge:
      "Industrial buyers arrive knowing the specification they need. Browsing matters less than finding an exact product and getting a quote without friction.",
    approach: [
      "Organised the catalogue around product families so a specification-led buyer can narrow down in two steps.",
      "Kept enquiry and quote requests attached to each product rather than on a separate contact page.",
      "Prioritised fast, low-weight pages for buyers on patchy mobile connections.",
    ],
    delivered: [
      "Category-driven product catalogue",
      "Per-product enquiry and quote requests",
      "Mobile-first layouts for on-site buyers",
    ],
    stack: ["E-commerce Development", "Website Development"],
  },
  {
    slug: "mhw-consultancy",
    name: "MHW Consultancy",
    category: "Consultancy / NGO",
    sector: "Accounting & compliance",
    imageUrl: "/projects/mhw-consultancy.jpg",
    websiteUrl: "https://www.mhwconsultancy.com/",
    summary:
      "Accounting, compliance and NGO advisory services, paired with a training arm running courses for organisations across India.",
    challenge:
      "Two businesses share one brand: advisory work sold to organisations, and courses sold to individuals. Each needed its own path without splitting the site in half.",
    approach: [
      "Gave consulting and courses parallel entry points in the navigation instead of nesting one inside the other.",
      "Used a rotating hero to carry the different service propositions without stacking three competing headlines.",
      "Added sign-in and enrolment affordances for the training side while keeping consulting on an enquiry-led path.",
    ],
    delivered: [
      "Dual-track navigation for consulting and training",
      "Course listing with enrolment and account access",
      "Service pages for accounting, compliance and NGO advisory",
      "Light and dark presentation modes",
    ],
    stack: ["Website Development", "UI/UX Design", "Backend Integration"],
  },
  {
    slug: "neyveda",
    name: "Neyveda",
    category: "Ayurvedic Wellness / E-commerce",
    sector: "Ayurvedic D2C",
    imageUrl: "/projects/neyveda.jpg",
    websiteUrl: "https://www.neyveda.com/",
    summary:
      "A D2C Ayurvedic brand selling hair oils, serums, herbal powders and skin care made with fully herbal actives.",
    challenge:
      "Ayurvedic buyers shop by concern — hair fall, scalp health, skin type — not by product name, and they need proof before a first purchase.",
    approach: [
      "Merchandised the catalogue by ritual and concern so visitors shop the problem, not the SKU list.",
      "Put ingredient provenance next to the products rather than on a separate about page.",
      "Used customer reviews as an in-page trust layer through the purchase path.",
    ],
    delivered: [
      "Concern-led product merchandising",
      "Ingredient and ritual storytelling beside each range",
      "Review-backed product pages and checkout flow",
    ],
    stack: ["E-commerce Development", "UI/UX Design", "Digital Marketing"],
  },
  {
    slug: "dasault-international-school",
    name: "Dasault International School",
    category: "Education / School",
    sector: "K-12 education",
    imageUrl: "/projects/dasault-international-school.jpg",
    websiteUrl: "https://www.dasaultinternationalschool.com/",
    summary:
      "A Ghaziabad school presenting its academic philosophy, stage-by-stage curriculum and campus life to prospective parents.",
    challenge:
      "Admissions decisions are made by parents comparing schools in a single sitting. The site had to answer philosophy, curriculum, facilities and admissions in one uninterrupted scroll.",
    approach: [
      "Opened with the school's promise and a message from the director to establish voice before detail.",
      "Laid the curriculum out stage by stage so parents can find their child's year quickly.",
      "Used campus photography as evidence rather than decoration, placed next to the claims it supports.",
    ],
    delivered: [
      "Stage-by-stage curriculum presentation",
      "Director's message and school philosophy sections",
      "Campus gallery and milestone highlights",
      "Admissions enquiry path for parents",
    ],
    stack: ["Website Development", "UI/UX Design", "SEO Setup"],
  },
  {
    slug: "shiksha-dwar-foundation",
    name: "Shiksha Dwar Foundation",
    category: "NGO / Foundation",
    sector: "Non-profit",
    imageUrl: "/projects/shiksha-dwar-foundation.jpg",
    websiteUrl: "https://www.shikshadwarfoundation.org/",
    summary:
      "A public charitable trust working across Delhi, Bihar, Uttar Pradesh, Rajasthan and Haryana on education, livelihood, healthcare and youth empowerment.",
    challenge:
      "Donors, CSR partners and volunteers all need different proof from the same site — impact evidence, programme detail and a way to get involved — without burying any of them.",
    approach: [
      "Put measured impact near the top so credibility lands before the programme detail.",
      "Split the four programme areas into their own sections so each can be read on its own.",
      "Kept donation and volunteering actions persistent rather than confined to a single page.",
    ],
    delivered: [
      "Impact-first homepage structure",
      "Programme sections across education, livelihood, healthcare and youth",
      "Multi-state coverage presentation",
      "Donation and volunteer enquiry routes",
    ],
    stack: ["Website Development", "SEO Setup", "Website Maintenance"],
  },
  {
    slug: "harvest-vita",
    name: "Harvest Vita",
    category: "Food / Wellness Brand",
    sector: "Farm-to-home food",
    imageUrl: "/projects/harvest-vita.jpg",
    websiteUrl: "https://www.harvestvita.com/",
    summary:
      "The consumer food brand from Amooha Farms — dehydrated fruits and vegetables, cold-pressed oils, heritage flours and whole spices, sold farm to home.",
    challenge:
      "'Pure and honest' is the entire proposition of the category and the least believable claim in it. The site needed to make provenance concrete across four unrelated product families.",
    approach: [
      "Anchored the brand story in the farm it comes from, so sourcing is a fact on the page rather than a slogan.",
      "Gave each product family its own space instead of flattening them into one grid.",
      "Led the shop with bestsellers to give first-time visitors an obvious starting point.",
    ],
    delivered: [
      "Storefront across four distinct product families",
      "Provenance and quality storytelling tied to the parent farm",
      "Bestseller-led merchandising and checkout",
    ],
    stack: ["E-commerce Development", "Brand Storytelling", "Digital Marketing"],
  },
  {
    slug: "fateh-ki-kachori",
    name: "Fateh Ki Kachori",
    category: "Food / Restaurant",
    sector: "Heritage food brand",
    imageUrl: "/projects/fateh-ki-kachori.jpg",
    websiteUrl: "https://www.fatehkikachori.com/",
    summary:
      "A Delhi street-food institution — Fateh, the Mustache Man — brought online without losing the character it was built on.",
    challenge:
      "The equity here is a person and a stall, not a logo. A polished restaurant template would have erased exactly what customers come for.",
    approach: [
      "Built the site around the founder's story so the brand voice stays in the copy, not just the photography.",
      "Kept the menu short and visual, matching how the stall actually serves.",
      "Made 'find our stall' a first-class action, since footfall is the real conversion.",
    ],
    delivered: [
      "Founder-led brand narrative",
      "Visual menu of what's served fresh",
      "Stall locator and customer testimonials",
    ],
    stack: ["Website Development", "Brand Storytelling", "Digital Marketing"],
  },
  {
    slug: "powerpulz",
    name: "PowerPulz",
    category: "Business / Brand",
    sector: "Performance nutrition",
    imageUrl: "/projects/powerpulz.jpg",
    websiteUrl: "https://www.powerpulz.com/",
    summary:
      "A performance nutrition brand from the Amoohaa Farms group, selling clean-label products with no fillers to a fitness-minded audience.",
    challenge:
      "Performance nutrition is a crowded, claim-heavy category, and the brand also sells beyond one market — so the store had to handle currency and language differences from day one.",
    approach: [
      "Set a high-contrast, dark storefront so product photography and the clean-label claim carry the page.",
      "Built currency and language switching into the header rather than bolting it on at checkout.",
      "Added a myth-busting section to answer category scepticism before it reaches the cart.",
    ],
    delivered: [
      "Multi-currency, multi-language storefront",
      "Product catalogue with cart and customer accounts",
      "Editorial blog and myth-busting content",
      "Light and dark presentation modes",
    ],
    stack: ["E-commerce Development", "UI/UX Design", "Digital Marketing"],
  },
  {
    slug: "namita-ji",
    name: "Namita Ji",
    category: "Personal / Professional Brand",
    sector: "Traditional Indian food",
    imageUrl: "/projects/namita-ji.jpg",
    websiteUrl: "https://namitaji.in/",
    summary:
      "Traditional Indian snacks — anarsa, thekua, litti masala, namkeen — sold under a personal brand built on home-style cooking.",
    challenge:
      "Regional snacks sell on familiarity and craving, not on nutrition panels. The store needed to feel like home cooking while still working as real e-commerce.",
    approach: [
      "Merchandised by craving rather than by category, matching how customers actually decide.",
      "Carried the Madhubani visual language through the design so the regional identity is in the interface, not only the copy.",
      "Kept the product range tight so each item gets a full, appetising presentation.",
    ],
    delivered: [
      "Craving-led shop navigation",
      "Madhubani-inspired visual identity across the store",
      "Product pages for the full traditional snack range",
    ],
    stack: ["E-commerce Development", "UI/UX Design", "Brand Storytelling"],
  },
  {
    slug: "amoohaa-farms",
    name: "Amoohaa Farms",
    category: "Agriculture / Farm Brand",
    sector: "Agri-business",
    imageUrl: "/projects/amoohaa-farms.jpg",
    websiteUrl: "https://www.amoohaafarms.com/",
    summary:
      "The farm-led food and nutrition business behind Harvest Vita and PowerPulz, speaking to both trade buyers and consumers.",
    challenge:
      "A parent brand has to introduce its own sub-brands without competing with them, and address sourcing partners and end customers on the same page.",
    approach: [
      "Told the farm-to-market journey end to end so the group's structure explains itself.",
      "Gave Harvest Vita and PowerPulz clear routes out of the parent site instead of duplicating their catalogues.",
      "Used sourcing credibility as the trade-facing proof point alongside the consumer story.",
    ],
    delivered: [
      "Parent-brand site introducing two consumer sub-brands",
      "Farm-to-market process explanation",
      "Trade-facing sourcing credibility section",
      "Editorial updates from the farm",
    ],
    stack: ["Website Development", "Brand Storytelling", "SEO Setup"],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

/** Project documents carry no slug, so the carousel matches on name. */
export function getCaseStudySlugByName(name: string) {
  const key = normalizeName(name);
  return caseStudies.find((study) => normalizeName(study.name) === key)?.slug;
}

function normalizeName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}
