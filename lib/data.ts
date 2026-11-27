import { connectToDatabase } from "@/lib/mongodb";
import Project, { IProject } from "@/models/Project";
import PricingPlan, { IPricingPlan } from "@/models/PricingPlan";
import Testimonial, { ITestimonial } from "@/models/Testimonial";
import BlogPost, { IBlogPost } from "@/models/BlogPost";

// Fallback content mirrors the seed data so the site still renders
// correctly before MONGODB_URI is configured or `npm run seed` has run.

const fallbackProjects: IProject[] = [
  {
    name: "Painite Travels",
    category: "Travel / Tourism",
    order: 1,
    imageUrl: "/projects/painite-travels.jpg",
    websiteUrl: "https://www.painitetravels.com/",
  },
  {
    name: "Skillship",
    category: "Educational Platform",
    order: 2,
    imageUrl: "/projects/skillship.jpg",
    websiteUrl: "https://skillship.in",
  },
  {
    name: "Trueway Network",
    category: "Production Support Services",
    order: 3,
    imageUrl: "/projects/trueway-network.jpg",
    websiteUrl: "https://truewaynetwork.com/",
  },
  {
    name: "Shrimani Bhadravir",
    category: "Industrial E-commerce",
    order: 4,
    imageUrl:
      "https://nexmogen.com/wp-content/uploads/2026/01/Website-services-nexmogen-Website.png",
    websiteUrl: "https://shrimanibhadravirindustries.com",
  },
  {
    name: "MHW Consultancy",
    category: "Consultancy / NGO",
    order: 5,
    imageUrl: "/projects/mhw-consultancy.jpg",
    websiteUrl: "https://www.mhwconsultancy.com/",
  },
  {
    name: "Neyveda",
    category: "Ayurvedic Wellness / E-commerce",
    order: 6,
    imageUrl: "/projects/neyveda.jpg",
    websiteUrl: "https://www.neyveda.com/",
  },
  {
    name: "Dasault International School",
    category: "Education / School",
    order: 7,
    imageUrl: "/projects/dasault-international-school.jpg",
    websiteUrl: "https://www.dasaultinternationalschool.com/",
  },
  {
    name: "Shiksha Dwar Foundation",
    category: "NGO / Foundation",
    order: 8,
    imageUrl: "/projects/shiksha-dwar-foundation.jpg",
    websiteUrl: "https://www.shikshadwarfoundation.org/",
  },
  {
    name: "Harvest Vita",
    category: "Food / Wellness Brand",
    order: 9,
    imageUrl: "/projects/harvest-vita.jpg",
    websiteUrl: "https://www.harvestvita.com/",
  },
  {
    name: "Fateh Ki Kachori",
    category: "Food / Restaurant",
    order: 10,
    imageUrl: "/projects/fateh-ki-kachori.jpg",
    websiteUrl: "https://www.fatehkikachori.com/",
  },
  {
    name: "PowerPulz",
    category: "Business / Brand",
    order: 11,
    imageUrl: "/projects/powerpulz.jpg",
    websiteUrl: "https://www.powerpulz.com/",
  },
  {
    name: "Namita Ji",
    category: "Personal / Professional Brand",
    order: 12,
    imageUrl: "/projects/namita-ji.jpg",
    websiteUrl: "https://namitaji.in/",
  },
  {
    name: "Amoohaa Farms",
    category: "Agriculture / Farm Brand",
    order: 13,
    imageUrl: "/projects/amoohaa-farms.jpg",
    websiteUrl: "https://www.amoohaafarms.com/",
  },
];

const fallbackPricingPlans: IPricingPlan[] = [
  {
    name: "Starter",
    price: "₹30,000",
    features: [
      "5-page responsive website",
      "3-month maintenance",
      "Basic SEO setup",
      "Free hosting & domain for 1 year",
    ],
    highlighted: false,
    order: 1,
  },
  {
    name: "Premium",
    price: "₹50,000",
    features: [
      "10-page responsive website",
      "Basic mobile app",
      "6-month maintenance",
      "Digital marketing included",
    ],
    highlighted: true,
    order: 2,
  },
  {
    name: "Business",
    price: "₹1,00,000",
    features: [
      "Full website & mobile app development",
      "Comprehensive digital marketing",
      "Priority support",
      "Custom integrations",
    ],
    highlighted: false,
    order: 3,
  },
];

const fallbackTestimonials: ITestimonial[] = [
  {
    name: "Harsh Bhardwaj",
    role: "CEO, SkillShip",
    quote:
      "Working with this team has been a game-changer. Their creativity and attention to detail are exceptional. They delivered designs that exceeded our expectations, blending functionality with stunning aesthetics. Highly recommend for anyone looking for top-tier design services!",
    order: 1,
    imageUrl: "/testimonials/harsh-bhardwaj.jpg",
    rating: 4.5,
  },
  {
    name: "Dharmendra Aarya",
    role: "CEO, Aarya Construction",
    quote:
      "Nexmogen provided exceptional service from the very beginning. Their professionalism and dedication to delivering high-quality work were evident throughout the project. The team's expertise and creativity brought our vision to life in ways we couldn't have imagined. Truly a pleasure to work with!",
    order: 2,
    imageUrl:
      "https://nexmogen.com/wp-content/uploads/2024/12/Dharmendra-Aarya-768x768.jpg",
    rating: 4.5,
  },
  {
    name: "Anil Bhardwaj",
    role: "CEO, Royal Grip",
    quote:
      "Working with Nexmogen was an amazing experience! Their team truly understands our needs and delivers top-notch results every time. From start to finish, they maintained clear communication and attention to detail, ensuring everything exceeded our expectations. Highly recommend!",
    order: 3,
    imageUrl: "https://nexmogen.com/wp-content/uploads/2025/02/harsh-papa.jpg",
    rating: 4.5,
  },
];

export const fallbackBlogPosts: IBlogPost[] = [
  {
    title: "How to Simplify Boolean Expressions with a Karnaugh Map",
    slug: "karnaugh-map-simplifier-guide",
    excerpt:
      "A worked K-map example in SOP and POS form, the grouping rules that matter, and an online solver to check your answer.",
    author: "Nexmogen Team",
    published: true,
    createdAt: new Date("2026-11-27"),
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    content: `A Karnaugh map, or K-map, is a truth table redrawn as a grid so that terms you can combine sit next to each other. Instead of applying Boolean algebra identities one by one, you circle groups of cells and read the simplified expression straight off the map. A simpler expression usually means fewer logic gates in the finished circuit.

The Grouping Rules

Rows and columns follow Gray code order (00, 01, 11, 10), so neighbouring cells differ in only one variable. Groups must be rectangles containing 1, 2, 4, 8 or more cells in powers of two. Make each group as large as possible, use as few groups as possible, and remember that the edges of the map wrap around. Groups may overlap. Cells marked "don't care" can be included when they make a group bigger and ignored otherwise.

A Worked Example

Take a function of three variables, A, B and C, that is 1 for minterms 0, 1, 2, 3 and 7. Put A on the rows and BC on the columns. The whole A = 0 row is filled with ones, which makes a group of four and reduces to A' (NOT A). The remaining one, minterm 7, pairs with minterm 3 directly above it. B and C stay at 1 in both cells while A changes, so the pair reduces to BC. The result is F = A' + BC.

SOP and POS Forms

Grouping the ones gives a sum of products (SOP), as above. Grouping the zeros gives a product of sums (POS). In this example the zeros are at 4, 5 and 6, and the two pairs they form give F = (A' + B)(A' + C). Both expressions describe the same function, so pick whichever needs less hardware with the gates you have.

Check Your Work Online

Once you have solved a map by hand, you can verify it with the K-map solver at https://karnaughmapsimplifier.com/ . It handles 2 to 5 variables in SOP or POS form and shows step-by-step solutions, truth tables and circuits built with standard, NAND-only or NOR-only gates. You can also download the solution as a PDF.`,
  },
  {
    title: "3 Python Projects Every Beginner Should Build",
    slug: "python-projects-for-beginners",
    excerpt:
      "Reading syntax only gets you so far — these three small, complete projects turn Python fundamentals into muscle memory.",
    author: "Nexmogen Team",
    published: true,
    createdAt: new Date("2026-01-10"),
    imageUrl:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    content: `If you're new to Python, the fastest way to make the syntax stick isn't another tutorial — it's building something small and complete. Each of these three projects takes an afternoon at most and exercises a different core skill: functions and input handling, loops and randomness, and conditional logic.

1. A Multi-Function Calculator

A calculator forces you to handle user input safely, branch on an operator, and deal with edge cases like division by zero. Structure it as a function per operation, then a loop that keeps asking for calculations until the user quits. The skill you're really practicing here is input validation — checking that what the user typed is actually a number before you try to do math with it.

2. A Number-Guessing Game

Have the program pick a random number in a range, then loop while the player guesses, printing "too high" or "too low" after each attempt and counting how many guesses it took. This is where Python's random module and while loops click into place, and it's a natural place to add a twist later, like a limited number of attempts or a difficulty setting that changes the range.

3. Rock, Paper, Scissors

Pit the player against a computer opponent that picks randomly, then compare the two choices with a small set of conditionals to decide the winner. It looks simple, but mapping out the win conditions cleanly is a good first exercise in writing conditional logic that's easy to read rather than a tangle of nested if-statements.

None of these projects needs a framework or a library beyond the standard library. That's the point — building them from scratch is what makes loops, conditionals, functions, and input handling feel like tools you own rather than syntax you're memorizing. Once you're comfortable with all three, try combining ideas: add a scoring system to rock-paper-scissors, or let the calculator handle a full expression instead of one operation at a time.`,
  },
  {
    title: "ChatGPT vs DeepSeek: Which AI Tool Is Right for You?",
    slug: "chatgpt-vs-deepseek",
    excerpt:
      "Two capable conversational AI platforms, two different philosophies. Here's how to think about picking between them.",
    author: "Nexmogen Team",
    published: true,
    createdAt: new Date("2026-01-21"),
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    content: `Conversational AI has moved from novelty to daily tool for a lot of teams, and two names come up constantly when businesses are choosing a platform: ChatGPT and DeepSeek. They solve overlapping problems but come from different priorities, so the right pick depends more on your use case than on which one is objectively "better."

Where They Come From

ChatGPT, built on OpenAI's GPT architecture, is the more established, general-purpose option — strong at writing, coding help, brainstorming, and broad knowledge tasks, with a large ecosystem of integrations around it. DeepSeek is newer and leans into deep data analysis and industry-specific customization, with privacy controls that are often a bigger selling point for businesses handling sensitive information.

Where They Differ

For general-purpose writing, coding assistance, and fast answers, ChatGPT's maturity and ecosystem tend to win. For workflows that involve heavier data analysis or need a model tuned closely to a specific industry or dataset, DeepSeek's customization options and privacy posture make it the stronger fit. Pricing follows a similar split: ChatGPT offers an accessible free tier that's great for individuals and small teams, while DeepSeek leans toward custom pricing suited to businesses with specific deployment needs.

Making the Call

Neither tool wins across the board. If you need a capable, well-integrated assistant for everyday writing and development work, ChatGPT is the easier starting point. If your priority is specialized analysis over sensitive or industry-specific data, DeepSeek's customization and privacy controls are worth the extra setup. The most common pattern we see with clients is not choosing one — it's matching the tool to the task and letting both coexist in the stack.`,
  },
];

async function safeConnect() {
  try {
    await connectToDatabase();
    return true;
  } catch {
    return false;
  }
}

export async function getProjects(): Promise<IProject[]> {
  const docs = (await safeConnect())
    ? await Project.find().sort({ order: 1 }).lean<IProject[]>()
    : [];
  const projects = docs.length ? docs : fallbackProjects;
  return projects.filter((project) => project.name !== "Shrimani Bhadravir");
}

export async function getPricingPlans(): Promise<IPricingPlan[]> {
  if (!(await safeConnect())) return fallbackPricingPlans;
  const docs = await PricingPlan.find().sort({ order: 1 }).lean<IPricingPlan[]>();
  return docs.length ? docs : fallbackPricingPlans;
}

export async function getTestimonials(): Promise<ITestimonial[]> {
  if (!(await safeConnect())) return fallbackTestimonials;
  const docs = await Testimonial.find().sort({ order: 1 }).lean<ITestimonial[]>();
  return docs.length ? docs : fallbackTestimonials;
}

export async function getBlogPosts(): Promise<IBlogPost[]> {
  if (!(await safeConnect())) return fallbackBlogPosts;
  const docs = await BlogPost.find({ published: true })
    .sort({ createdAt: -1 })
    .lean<IBlogPost[]>();
  return docs.length ? docs : fallbackBlogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<IBlogPost | null> {
  if (!(await safeConnect())) {
    return fallbackBlogPosts.find((post) => post.slug === slug) ?? null;
  }
  const doc = await BlogPost.findOne({ slug, published: true }).lean<IBlogPost>();
  if (doc) return doc;
  return fallbackBlogPosts.find((post) => post.slug === slug) ?? null;
}
