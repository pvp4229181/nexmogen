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
