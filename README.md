# Nexmogen

Next.js (App Router, TypeScript) rebuild of nexmogen.com, with an animated
hero (Framer Motion), Tailwind CSS styling, and MongoDB (Mongoose) for
contact form submissions, portfolio projects, pricing plans, testimonials,
and blog posts.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Copy the env example and add your MongoDB connection string:

   ```
   cp .env.local.example .env.local
   ```

   Set `MONGODB_URI` to a MongoDB Atlas (or local) connection string.

3. Seed the database with the site's starting content (portfolio projects,
   pricing plans, testimonials, one sample blog post):

   ```
   npm run seed
   ```

4. Run the dev server:

   ```
   npm run dev
   ```

   Open http://localhost:3000.

Note: if `MONGODB_URI` isn't set yet, the site still renders using built-in
fallback content (see `lib/data.ts`) — only the contact form and blog will
require a working database connection.

## Structure

Contact submissions accept JSON up to 16 KB with server-side field validation.
MongoDB stores atomic rate-limit counters: 30 valid attempts per minute across
the site, and 5 per normalized email per hour (fixed windows). This shared site
limit also bounds abuse using rotating email addresses, but can temporarily
limit legitimate traffic during an attack. Expired counters use a MongoDB TTL
index; the database user must be able to create the collection and index.
If MongoDB is unavailable, submissions fail closed. Run
`npx tsx scripts/check-contact-security.ts` for isolated endpoint checks that
do not write to the real database.

Remote optimized images are restricted to `nexmogen.com/wp-content/uploads/`
and `images.unsplash.com/photo-*`. Add explicit trusted hosts if database
content needs images from another source.

- `app/` — pages: home, about, services, contact, blog, privacy
- `app/api/contact/route.ts` — POST endpoint that saves contact form
  submissions to MongoDB
- `components/` — UI components, including `Hero.tsx` (Framer Motion hero
  animation) and `Reveal.tsx` (scroll-triggered reveal animation)
- `models/` — Mongoose schemas: `ContactSubmission`, `Project`,
  `PricingPlan`, `Testimonial`, `BlogPost`
- `lib/mongodb.ts` — cached Mongoose connection helper
- `lib/data.ts` — server-side data fetchers with fallback content
- `scripts/seed.ts` — seeds MongoDB with initial content (`npm run seed`)
