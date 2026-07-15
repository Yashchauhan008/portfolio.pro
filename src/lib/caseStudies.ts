export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  type: string;
  status: string;
  stack: string[];
  accent: string;
  image: string;
  links: { label: string; href: string }[];
  overview: string[];
  stats: { value: string; label: string }[];
  problem: { heading: string; paragraphs: string[] };
  built: {
    heading: string;
    intro: string;
    categories: { name: string; count: string; examples: string }[];
  };
  features: { heading: string; items: { title: string; desc: string }[] };
  challenges: {
    heading: string;
    items: { title: string; desc: string }[];
  };
  outcome: { heading: string; paragraphs: string[] };
  next: { heading: string; items: string[] };
  /** Extra project shots shown under the hero (hero image is included automatically). */
  gallery?: {
    src: string;
    caption: string;
    /** When set, the carousel slide is a YouTube embed (src is used as the thumbnail). */
    youtubeId?: string;
  }[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "vapor-ui": {
    slug: "vapor-ui",
    title: "Vapor UI",
    tagline:
      "An animation-first React component library — expressive, copy-paste-able motion for the web.",
    year: "2025",
    role: "Solo designer & developer",
    type: "Open-source component library",
    status: "Active development",
    stack: [
      "React 19",
      "Framer Motion",
      "GSAP",
      "anime.js",
      "Three.js / R3F",
      "Lottie",
    ],
    accent: "#0ea5e9",
    image: "/images/projects/vapor-ui/chandelier-preview.png",
    links: [
      { label: "Live site", href: "https://vapor-ui.vercel.app" },
      { label: "Source code", href: "https://github.com/Yashchauhan008/vapor-ui" },
    ],
    overview: [
      "Vapor UI is a React component library and interactive playground for expressive motion design. Every component ships with a live preview, syntax-highlighted source, a prop table with live controls, and its exact dependency list — so a developer can lift any component into their project in minutes.",
      "I designed and built the entire thing solo: the components, the docs engine that showcases them, and the visual identity that ties it together.",
    ],
    stats: [
      { value: "27", label: "Components" },
      { value: "5", label: "Categories" },
      { value: "6", label: "Motion engines" },
      { value: "100%", label: "Open source" },
    ],
    problem: {
      heading: "The problem",
      paragraphs: [
        "Great motion design lives scattered across CodePens, agency sites, and half-documented snippets. Every time I started a client project, I found myself rebuilding the same reveals, card interactions, and background effects from scratch — each time wiring up Framer Motion, GSAP, or Three.js slightly differently.",
        "I wanted one place where production-ready motion components live together: tweakable through props, documented with real code, and honest about their dependencies. Build it once, reuse it everywhere.",
      ],
    },
    built: {
      heading: "What I built",
      intro:
        "27 interactive components organised into five categories, each powered by the engine best suited to the effect:",
      categories: [
        {
          name: "Text animations",
          count: "5",
          examples: "Aurora Title, Sparkles Title, fade / slide / wave reveals",
        },
        {
          name: "Cards",
          count: "7",
          examples:
            "Card Stack, Flip Gallery, Instagram Carousel, Magic Wand Reveal, Canvas Card",
        },
        {
          name: "Backgrounds",
          count: "6",
          examples: "Black Hole, Tunnel, Fire Particles, Pipe Grid, Chandelier",
        },
        {
          name: "Animated elements",
          count: "6",
          examples:
            "Apple Dock, Elastic Accordion, Mouse Mask, Memory Game, Tech Stack Showcase",
        },
        {
          name: "Form elements",
          count: "3",
          examples: "Action Button, Fullscreen Navbar, Testimonial Carousel",
        },
      ],
    },
    features: {
      heading: "The docs engine",
      items: [
        {
          title: "Live preview + code, side by side",
          desc: "Every component page has preview and code tabs — what you see is exactly what you copy.",
        },
        {
          title: "Prop tables with live controls",
          desc: "Range sliders and toggles let you tweak props in the browser and watch the animation respond in real time.",
        },
        {
          title: "Honest dependency lists",
          desc: "Each component declares exactly which engines it needs — no installing the whole world for one button.",
        },
        {
          title: "A showcase that practises what it preaches",
          desc: "Custom cursor, category pages, and page transitions — the docs site itself is built from the library's own motion language.",
        },
      ],
    },
    challenges: {
      heading: "Technical challenges",
      items: [
        {
          title: "Taming GSAP inside React",
          desc: "ScrollTrigger timelines and imperative tweens need disciplined cleanup on unmount — otherwise React 19's Strict Mode double-invocation duplicates triggers and leaks listeners. I standardised a context-based cleanup pattern across every GSAP component.",
        },
        {
          title: "One feel across six engines",
          desc: "Framer Motion, GSAP, anime.js, React Three Fiber, Lottie, and AutoAnimate all have different mental models. The library normalises them behind consistent prop APIs — durations, easings, and triggers read the same regardless of what's underneath.",
        },
        {
          title: "Keeping heavy scenes at 60fps",
          desc: "WebGL backgrounds like Black Hole and Tunnel are the flashiest components and the easiest way to melt a laptop. Capped device-pixel-ratio, paused off-screen scenes, and lazy-mounted canvases keep the playground smooth even with multiple demos open.",
        },
        {
          title: "Copy-paste developer experience",
          desc: "The unit of reuse is a single component, not an npm install. That meant every demo's source had to be genuinely self-contained — a constraint that forced better component boundaries everywhere.",
        },
      ],
    },
    outcome: {
      heading: "Outcome",
      paragraphs: [
        "Vapor UI became my personal motion toolkit — components from it have shipped in real client work, including agency sites where expressive motion was the core deliverable.",
        "Building the library taught me more about animation performance, API design, and React lifecycle edge cases than any single client project could. It's also the project that made motion design a signature of my work.",
      ],
    },
    next: {
      heading: "What's next",
      items: [
        "Publish @vapor-ui/core to npm",
        "TypeScript migration",
        "CLI to scaffold components into any project",
        "Docs search & theming",
      ],
    },
    gallery: [
      {
        src: "/images/projects/vapor-ui/chandelier-preview.png",
        caption: "Chandelier background — live preview in the docs playground",
      },
      {
        src: "/images/projects/vapor-ui/chandelier-code.png",
        caption: "Docs page — usage snippet and full component source",
      },
      {
        src: "/images/projects/vapor-ui/mask-mouse.png",
        caption: "Mask Mouse Effect — reveal text under a cursor-following mask",
      },
      {
        src: "/images/vapor-ui.png",
        caption: "Component playground — text animations and interactive effects",
      },
    ],
  },

  "shanvi-enterprise": {
    slug: "shanvi-enterprise",
    title: "Shanvi Enterprise",
    tagline:
      "An inventory management system running a wooden-pallet manufacturer's ₹4 crore stock — my first freelance delivery, still live in production.",
    year: "2025",
    role: "Freelance fullstack engineer",
    type: "Client project · Inventory management",
    status: "Live in production",
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Docker", "VPS · Nginx"],
    accent: "#f59e0b",
    image: "/images/shanvi.png",
    links: [
      { label: "Live site", href: "https://shanvientp.in/" },
      { label: "Source code", href: "https://github.com/Yashchauhan008/shanvi" },
    ],
    overview: [
      "Shanvi Enterprise manufactures wooden pallets and industrial packing in Morbi. Their inventory — films, angle boards, caps, thermocol, seventeen distinct raw materials — was tracked on paper while roughly ₹4 crore of stock moved through factories and party accounts.",
      "As my first freelance client, I handled the complete lifecycle: requirements, data modelling, the MERN build, PDF/Excel reporting, deployment to a self-managed Ubuntu VPS, and the handover docs their team still uses.",
    ],
    stats: [
      { value: "₹4Cr", label: "Stock tracked in production" },
      { value: "17", label: "Raw material types" },
      { value: "12K+", label: "Lines of code" },
      { value: "2", label: "Apps — IMS + public site" },
    ],
    problem: {
      heading: "The problem",
      paragraphs: [
        "Every order and bill changed the stock of multiple materials at once, across parties, factories, and pallet sizes. On paper, a single missed entry meant hours of reconciliation — and nobody could answer 'how much film do we actually have?' without walking the warehouse.",
        "The client needed one source of truth their staff could operate daily: record an order, and the inventory, the party ledger, and the reports all update together — correctly, every time.",
      ],
    },
    built: {
      heading: "What I built",
      intro:
        "A production inventory platform plus a public marketing site, organised around the workflows the staff already knew:",
      categories: [
        {
          name: "Inventory engine",
          count: "17",
          examples:
            "Material-level stock per production house, auto-adjusted by every order and bill",
        },
        {
          name: "Orders & bills",
          count: "2-way",
          examples:
            "Stock-out orders and stock-in bills with line items, soft-delete with inventory restore",
        },
        {
          name: "Master data",
          count: "4",
          examples: "Parties, their factories, associate companies, pallet sizes — full CRUD with detail pages",
        },
        {
          name: "Reports & invoices",
          count: "PDF/XLS",
          examples: "jsPDF invoices, SheetJS Excel exports, filtered order reports",
        },
        {
          name: "Analytics",
          count: "Live",
          examples: "Dashboard charts and pallet net-balance stats via MongoDB aggregation",
        },
      ],
    },
    features: {
      heading: "Details that mattered",
      items: [
        {
          title: "Transactions that can't half-happen",
          desc: "Order writes and inventory adjustments run inside MongoDB multi-document transactions — the order and its stock changes commit or roll back together.",
        },
        {
          title: "Human-readable order IDs",
          desc: "Staff reference orders by numbers like ORD-0042, generated atomically from a counter collection so two simultaneous orders can never collide.",
        },
        {
          title: "Search the way staff think",
          desc: "Filter by party, factory, source, or date range; look an order up by its custom ID; paginate through years of history.",
        },
        {
          title: "Dark mode & polish",
          desc: "Theme toggle, framer-motion transitions, and a UI the client's non-technical staff picked up in a day.",
        },
      ],
    },
    challenges: {
      heading: "Technical challenges",
      items: [
        {
          title: "Modelling polymorphic sources",
          desc: "Orders can originate from the production house or an associate company. Mongoose dynamic refPath references let one Order schema point at either collection cleanly instead of duplicating models.",
        },
        {
          title: "Concurrent stock math",
          desc: "Two staff members saving orders at the same moment must not corrupt counts. Atomic $inc updates inside sessions, plus an atomic counter for sequential IDs, made writes safe under concurrency.",
        },
        {
          title: "Owning the whole deployment",
          desc: "No platform-as-a-service — I provisioned the Hostinger VPS, wrote the Dockerfile and compose config, set up Nginx and PM2, and documented the runbook for handover.",
        },
      ],
    },
    outcome: {
      heading: "Outcome",
      paragraphs: [
        "The system has run the client's daily operations since launch, tracking stock worth about ₹4 crore. Orders, bills, and reports that took hours on paper are now minutes of data entry.",
        "As a first freelance project it set the template for everything after: scope honestly, model the client's real world, and own the delivery all the way to the server.",
      ],
    },
    next: {
      heading: "What's next",
      items: ["Server-side auth hardening", "Role-based permissions", "Mobile-friendly stock entry"],
    },
    gallery: [
      {
        src: "/images/shanvi.png",
        caption: "Inventory dashboard — stock, parties, and live balances",
      },
      { src: "/images/projects/shanvi/site.png", caption: "The public marketing site at shanvientp.in" },
      { src: "/images/projects/shanvi/factory.jpg", caption: "The real world it models — pallet manufacturing" },
      { src: "/images/projects/shanvi/pallets.jpg", caption: "Finished wooden pallets ready for dispatch" },
    ],
  },

  meganea: {
    slug: "meganea",
    title: "Meganea",
    tagline:
      "A two-country supply-chain platform for a ceramic tile exporter — factory QC in India to customer delivery in Dubai, one traceable pipeline.",
    year: "2025",
    role: "Freelance fullstack engineer",
    type: "Client project · Supply-chain platform",
    status: "Live in production",
    stack: ["React 19", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Cloudinary", "Docker", "Nginx"],
    accent: "#14b8a6",
    image: "/images/projects/meganea/india-login.png",
    links: [{ label: "India portal", href: "https://india.meganea.in" }],
    overview: [
      "Meganea imports ceramic tiles manufactured in India and sells them from Dubai. The physical pipeline — factory, quality check, pallets, containers, sea freight, warehouse, customer — existed only in WhatsApp threads and spreadsheets split across two countries.",
      "I built their whole digital operation: two role-scoped React apps (India operations, Dubai sales) on one Express/MongoDB API, so a tile can be traced from the factory that fired it to the customer who bought it.",
    ],
    stats: [
      { value: "49K", label: "Lines of code" },
      { value: "3", label: "Apps — India, Dubai, API" },
      { value: "19", label: "API resource modules" },
      { value: "6", label: "User roles" },
    ],
    problem: {
      heading: "The problem",
      paragraphs: [
        "Stock in this business isn't one number — a tile design can be available in Dubai, booked by a customer, being restocked, sitting in a factory, or on the water. Decisions like 'can I promise this order?' need all five buckets, per design, in real time.",
        "And the two sides work differently: India thinks in purchase orders, QC passes, pallets and containers; Dubai thinks in bookings, LPOs, and deliveries. One interface for both would have served neither.",
      ],
    },
    built: {
      heading: "What I built",
      intro:
        "One API, two tailored frontends, and a status machine for every physical object in the pipeline:",
      categories: [
        {
          name: "Procurement & QC",
          count: "IN",
          examples:
            "Factories, purchase orders with embedded QC history, a Draft→Manufacturing→QC→Packing status machine",
        },
        {
          name: "Packing & shipping",
          count: "IN",
          examples:
            "Pallets and khatlis as trackable units, loading plans, container lifecycle from Empty to Delivered",
        },
        {
          name: "Sales & dispatch",
          count: "DXB",
          examples:
            "Customer companies, salesman bookings with LPO numbers, partial dispatches with proof images",
        },
        {
          name: "Restock pipeline",
          count: "DXB→IN",
          examples:
            "Dubai raises restock requests that become India purchase orders, with per-item transit tracking",
        },
        {
          name: "Audit & admin",
          count: "ALL",
          examples:
            "Activity logs for every create/update/status change, reconciliation module, role-based access for 6 roles",
        },
        {
          name: "Reporting",
          count: "PDF/XLS",
          examples: "Dashboards with charts per country, Excel and PDF exports",
        },
      ],
    },
    features: {
      heading: "Engineering that held it together",
      items: [
        {
          title: "Five-bucket stock model",
          desc: "Each tile tracks available / booked / restocking / in-factory / in-transit quantities separately, so both countries see truthful availability instead of one misleading total.",
        },
        {
          title: "Soft-delete done properly",
          desc: "Archived records keep who/when/why, query hooks hide them everywhere automatically, and partial unique indexes let names be reused after archival — no orphaned constraints.",
        },
        {
          title: "IDs people can say out loud",
          desc: "PO-00042 style sequential IDs generated atomically from a counter collection, for every entity staff reference on calls between countries.",
        },
        {
          title: "History on the document",
          desc: "QC results, arrival events, and status changes live as embedded sub-documents with timestamps and actors — every object carries its own audit trail.",
        },
      ],
    },
    challenges: {
      heading: "Technical challenges",
      items: [
        {
          title: "Modelling the physical world",
          desc: "A pallet is a real object that moves through factories, containers, and ships. Explicit status machines with guarded transitions (a container can't dispatch before it's loaded) kept the data honest against reality.",
        },
        {
          title: "Two apps, one truth",
          desc: "India and Dubai needed different pages, roles, and vocabulary over the same entities. A shared API with role-scoped routes and two purpose-built React apps beat one bloated interface.",
        },
        {
          title: "Freelance-scale scope",
          desc: "Nineteen resource modules, six roles, and ~49K lines delivered solo — surviving that meant consistent patterns (controller/model/route layering, one soft-delete recipe, one ID generator) applied everywhere.",
        },
      ],
    },
    outcome: {
      heading: "Outcome",
      paragraphs: [
        "Meganea's India and Dubai teams now run procurement, shipping, and sales on the platform, with every physical movement recorded and auditable. Restock decisions that needed phone calls across a 1.5-hour time difference are now a dashboard glance.",
        "It's the largest system I've shipped solo — and the project that taught me that supply-chain software is really a truthfulness problem: the database must never claim something the warehouse can't confirm.",
      ],
    },
    next: {
      heading: "What's next",
      items: ["Dubai warehouse app hardening", "Container ETA tracking", "Accounting exports"],
    },
    gallery: [
      {
        src: "/images/projects/meganea/india-login.png",
        caption: "India operations portal — role-scoped login",
      },
    ],
  },

  "quicklabs-pro": {
    slug: "quicklabs-pro",
    title: "QuickLabs Pro",
    tagline:
      "The study-resource platform my university actually needed — verified lab solutions, in-browser previews, and 150+ student users.",
    year: "2024 — 2026",
    role: "Solo designer, developer & operator",
    type: "Product · Learning platform",
    status: "Live · 150+ students",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind 4 · shadcn/ui",
      "TanStack Query",
      "Node.js · Express",
      "PostgreSQL",
    ],
    accent: "#10b981",
    image: "/images/projects/quicklabs/home.png",
    links: [{ label: "Live site", href: "https://quicklabs.pro" }],
    overview: [
      "Every semester, the same ritual: lab manuals due, solutions scattered across WhatsApp groups in blurry photos, seniors' PDFs lost forever. QuickLabs started as 'Study Buddy' — my cheeky fix for that — and grew into a real platform where students share verified lab solutions and study material, scoped to their university, branch, batch, and semester.",
      "Version one served 150+ authenticated students at my university. The Pro rebuild re-architected everything: TypeScript end to end, PostgreSQL with raw SQL, in-browser document preview, and a proper social layer.",
    ],
    stats: [
      { value: "150+", label: "Student users on v1" },
      { value: "21K", label: "Lines of TypeScript" },
      { value: "15", label: "PostgreSQL tables" },
      { value: "10×75MB", label: "Files per upload" },
    ],
    problem: {
      heading: "The problem",
      paragraphs: [
        "University study material has a discovery problem and a trust problem. The files exist — in someone's drive, some group chat, some senior's laptop — but finding the right solution for your batch's version of the lab, and knowing it's correct, is pure luck.",
        "I wanted uploads organised by the academic hierarchy students actually live in (university → branch → batch → semester), previewable without downloading mystery files, and rated by the peers who used them. And yes — it began as a joke about 'leaking' assignment solutions for my own convenience. The university's students profited; so did my transcript.",
      ],
    },
    built: {
      heading: "What I built",
      intro:
        "A full platform around documents, subjects, and the students themselves:",
      categories: [
        {
          name: "Materials",
          count: "2 kinds",
          examples:
            "Informational docs and lab solutions — multi-file uploads, per-attachment management, zip downloads",
        },
        {
          name: "In-browser preview",
          count: "4 formats",
          examples: "PDF, DOCX, PPTX, and images render in the browser — no download roulette",
        },
        {
          name: "Academic scoping",
          count: "4 levels",
          examples: "University → branch → batch year → semester filtering on every list",
        },
        {
          name: "Social layer",
          count: "★",
          examples: "Peer ratings, student bookmarks, enquiry threads with voting, leaderboard",
        },
        {
          name: "Fair-use quotas",
          count: "Daily",
          examples: "Per-student upload/download limits with race-proof accounting",
        },
      ],
    },
    features: {
      heading: "Engineering highlights",
      items: [
        {
          title: "Race-proof daily quotas",
          desc: "Quota accounting uses Postgres advisory transaction locks plus SELECT … FOR UPDATE, so parallel downloads can't slip past the daily limit — the kind of correctness usually skipped in student projects.",
        },
        {
          title: "One handler, two audiences",
          desc: "Router factories instantiate the same endpoints under /admin and /students with different role guards — no duplicated controllers, no drift between the two scopes.",
        },
        {
          title: "Streaming zip downloads",
          desc: "Multi-file documents stream as a zip built on the fly with archiver — slugified, de-duplicated names, no temp files, correct Content-Disposition even for Unicode filenames.",
        },
        {
          title: "Database as last line of defence",
          desc: "Postgres triggers enforce the 10-files-per-document cap, partial unique indexes guarantee one main file per document, and CHECK constraints stop self-ratings — invariants hold even if app code slips.",
        },
      ],
    },
    challenges: {
      heading: "Technical challenges",
      items: [
        {
          title: "Office formats in the browser",
          desc: "PDF is easy; DOCX and PPTX aren't. Wiring mammoth, docx-preview, and a PPTX renderer behind one preview hook — with graceful fallbacks per format — took more iteration than any backend feature.",
        },
        {
          title: "Raw SQL by choice",
          desc: "No ORM: a WithDatabase higher-order function injects a pooled client into every controller and guarantees release. Writing the SQL by hand made the data model tighter and the slow queries obvious.",
        },
        {
          title: "Operating a real user base",
          desc: "150+ students meant real support: quota disputes, upload failures on hostel Wi-Fi, takedown requests. Running the platform taught as much as building it.",
        },
      ],
    },
    outcome: {
      heading: "Outcome",
      paragraphs: [
        "QuickLabs became the unofficial material hub for my batch — 150+ students authenticated through Google and used verified lab solutions instead of chasing files through chat history.",
        "The Pro rebuild is my reference codebase for doing full-stack TypeScript properly: typed end to end, invariants in the database, and a UI (Tailwind 4 + shadcn) that finally looks like the product it always wanted to be.",
      ],
    },
    next: {
      heading: "What's next",
      items: ["SuperDesk AI doubt-solver", "More universities", "Mobile PWA polish"],
    },
    gallery: [
      {
        src: "/images/projects/quicklabs/home.png",
        caption: "QuickLabs Pro home — verified labs for university students",
      },
      { src: "/images/projects/quicklabs/features.png", caption: "Feature grid and platform stats" },
      { src: "/images/projects/quicklabs/hero-art.png", caption: "The QuickLabs Pro hero art" },
      { src: "/images/studybuddy.png", caption: "Earlier StudyBuddy branding that became QuickLabs" },
    ],
  },

  nirvana: {
    slug: "nirvana",
    title: "Nirvana",
    tagline:
      "A cinematic ecommerce experience for luxury chain-mounted eyewear — hand-written WebGL shaders, GSAP choreography, and a full commerce backend.",
    year: "2026",
    role: "Fullstack engineer & motion engineer",
    type: "Client product · Ecommerce",
    status: "Live",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "GSAP · Lenis",
      "OGL · Three.js",
      "Express · PostgreSQL",
      "Razorpay",
      "AWS S3",
    ],
    accent: "#c9a15f",
    image: "/images/projects/nirvana/banner-1.png",
    links: [{ label: "Live site", href: "https://www.nirvana.style/" }],
    overview: [
      "Nirvana (Gravis India) makes armless, chain-mounted eyewear — jewellery you see through. A product this unusual can't be sold with a template storefront; the site itself has to feel like the object: weightless, precise, a little theatrical.",
      "I built all three layers: a cinematic Next.js storefront with custom WebGL, an Express/PostgreSQL commerce backend with Razorpay, and a React admin dashboard for the catalog and orders.",
    ],
    stats: [
      { value: "34K", label: "Lines of TypeScript" },
      { value: "3", label: "Apps — store, API, admin" },
      { value: "60fps", label: "WebGL hero on mobile too" },
      { value: "15%", label: "Token-payment checkout" },
    ],
    problem: {
      heading: "The problem",
      paragraphs: [
        "Luxury buyers don't scroll product grids — they linger. The brief was a storefront that earns that lingering: cinematic motion, editorial pacing, and photography treated like a gallery, without melting phones or breaking accessibility.",
        "Underneath the theatre it still had to be a real Indian ecommerce business: GST-aware invoicing, partial 'token' payments for made-to-order pieces, inquiry flows for hesitant buyers, and an admin panel the brand can run alone.",
      ],
    },
    built: {
      heading: "What I built",
      intro: "Three applications that share one design language and one source of truth:",
      categories: [
        {
          name: "Cinematic storefront",
          count: "WebGL",
          examples:
            "OGL cylinder hero with custom GLSL shaders, Three.js visual gallery, marquee, SVG page transitions",
        },
        {
          name: "Commerce backend",
          count: "50+",
          examples:
            "Endpoints for catalog, carts, orders, Razorpay + webhook verification, OTP auth, GST tax model",
        },
        {
          name: "Admin dashboard",
          count: "18",
          examples:
            "Pages for products with crop-and-upload imagery, orders, customers, inquiries, category filters",
        },
        {
          name: "Infrastructure",
          count: "8 crons",
          examples:
            "S3 storage, Sharp→WebP conversion, guest-cart cleanup, Postgres backups, Socket.IO notifications",
        },
      ],
    },
    features: {
      heading: "Motion & commerce highlights",
      items: [
        {
          title: "A hero written in GLSL",
          desc: "The landing cylinder is raw OGL with hand-written vertex/fragment shaders and a particle field — radius, FOV, DPR, and particle count all scale by device, and particles switch off entirely on mobile.",
        },
        {
          title: "Scroll that feels engineered",
          desc: "Lenis smooth-scroll synced to GSAP ScrollTrigger through a shared refresh scheduler, with limitCallbacks and lag smoothing — and every animation respects prefers-reduced-motion.",
        },
        {
          title: "Money stored in paisa",
          desc: "All prices are integers in paisa with rupee values derived in generated columns — no floating-point money anywhere. The GST model ships with the full Indian state/GST-code table.",
        },
        {
          title: "Token payments",
          desc: "Made-to-order pieces support a 15% deposit (min ₹2,000) through Razorpay, verified by webhook signature — the order state machine treats partial and full payment as first-class paths.",
        },
      ],
    },
    challenges: {
      heading: "Technical challenges",
      items: [
        {
          title: "WebGL that degrades gracefully",
          desc: "The same scene must run on a gaming laptop and a three-year-old Android. Device-tiered settings, IntersectionObserver-gated lazy init, and DPR caps keep the gallery smooth instead of aspirational.",
        },
        {
          title: "SSR meets canvas",
          desc: "Next.js App Router server-renders everything the WebGL heroes can't be — dynamic imports with ssr:false, hydration-safe transitions, and a dual API layer for server and client callers keep both worlds happy.",
        },
        {
          title: "Payment edge cases",
          desc: "Webhook-verified Razorpay flows have to survive double-fires, abandoned checkouts, and token-vs-full ambiguity — the order lifecycle encodes every path explicitly rather than trusting the happy case.",
        },
      ],
    },
    outcome: {
      heading: "Outcome",
      paragraphs: [
        "The storefront is live at nirvana.style — cinematic WebGL hero, GSAP scroll choreography, and a full commerce stack behind it.",
        "It's the project where my two halves — motion design and backend engineering — finally ship as one product. The reference demos I built for it now live in my animation toolkit.",
      ],
    },
    next: {
      heading: "What's next",
      items: ["Lookbook editorial pages", "Ongoing catalog & campaign drops"],
    },
    gallery: [
      {
        src: "/images/projects/nirvana/banner-1.png",
        caption: "Cinematic storefront hero — chain-mounted eyewear",
      },
      { src: "/images/projects/nirvana/banner-2.png", caption: "Editorial hero banner" },
      { src: "/images/projects/nirvana/model-1.png", caption: "The product — chain-mounted eyewear" },
      { src: "/images/projects/nirvana/model-4.png", caption: "Campaign photography from the collection" },
    ],
  },

  popclock: {
    slug: "popclock",
    title: "PopClock",
    tagline:
      "A floating clock & timer Chrome extension built for fun on a 5-hour road trip — now 300+ users on the Chrome Web Store.",
    year: "2025",
    role: "Solo developer",
    type: "Chrome extension",
    status: "Live · 300+ users",
    stack: ["Vanilla JavaScript", "Manifest V3", "chrome.storage", "CSS"],
    accent: "#22d3ee",
    image: "/images/projects/popclock/menu.png",
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/popclock-floating-time-ti/mnadajlookkgclepgniefdcgjnndbppm?hl=en",
      },
      {
        label: "Watch demo",
        href: "https://www.youtube.com/watch?v=LS7jINeB1_U",
      },
    ],
    overview: [
      "Morbi to Ahmedabad is about five hours by road. Somewhere past Chotila I decided the trip needed a deliverable: a draggable clock that floats over every webpage, because fullscreen tabs kept hiding my system clock during presentations and movies.",
      "By the time we reached Ahmedabad, v1 worked. I polished it, shipped it to the Chrome Web Store, and it quietly crossed 300 users — my first taste of strangers using something I made for fun.",
    ],
    stats: [
      { value: "5hrs", label: "Road trip to v1" },
      { value: "300+", label: "Chrome Web Store users" },
      { value: "~800", label: "Lines of vanilla JS" },
      { value: "0", label: "Frameworks used" },
    ],
    problem: {
      heading: "The problem",
      paragraphs: [
        "Fullscreen anything — videos, presentations, games — hides your clock. Alt-tabbing to check the time breaks flow, and no timer survives the tab you set it in.",
        "The fix had to be invisible until wanted: a small clock you can drag anywhere, on any site, with a timer that keeps counting even if you refresh or wander across the web.",
      ],
    },
    built: {
      heading: "What I built",
      intro: "One content script, zero dependencies, everything custom:",
      categories: [
        {
          name: "Floating clock",
          count: "1",
          examples: "Draggable, viewport-clamped, 12/24-hour toggle, optional seconds, hideable",
        },
        {
          name: "Timer system",
          count: "6+1",
          examples: "Presets from 1 minute to 1 hour plus custom HH:MM, with progress bar and sound",
        },
        {
          name: "Custom context menu",
          count: "DOM",
          examples: "Right-click menu built from scratch — toggles, timer presets, blocklist access",
        },
        {
          name: "Per-site blocklist",
          count: "Options",
          examples: "An options page to keep the clock off chosen domains",
        },
      ],
    },
    features: {
      heading: "Small details, real UX",
      items: [
        {
          title: "Timers that survive anything",
          desc: "The end-time is persisted to chrome.storage, so a refresh or navigation recomputes the remaining time — and if the deadline passed while you were away, completion fires immediately.",
        },
        {
          title: "Drag without jank",
          desc: "Pointer-event dragging clamped to the viewport, so the clock can't be lost off-screen — the whole interaction is ~40 lines of vanilla JS.",
        },
        {
          title: "Polite by default",
          desc: "Only the storage permission, no analytics, no network calls — the widget is a guest on every page it visits.",
        },
        {
          title: "Finish-line feedback",
          desc: "A bundled chime and a dismissable overlay when the timer completes — visible even over fullscreen video.",
        },
      ],
    },
    challenges: {
      heading: "Technical challenges",
      items: [
        {
          title: "Living inside other people's pages",
          desc: "A content script shares the DOM with every website's CSS. Aggressive resets, maximal z-index discipline, and defensive selectors keep the clock intact on sites that style everything.",
        },
        {
          title: "State without a backend",
          desc: "Settings, timer state, and the blocklist all live in chrome.storage.local with a tiny sync layer — the extension behaves identically across tabs without any server.",
        },
        {
          title: "Shipping from the passenger seat",
          desc: "Five hours, a laptop, and mobile hotspot internet. Scope ruthlessly: clock first, drag second, timer third — everything else waited for the store release.",
        },
      ],
    },
    outcome: {
      heading: "Outcome",
      paragraphs: [
        "PopClock crossed 300+ users on the Chrome Web Store with zero marketing beyond a link in my bio — proof that a well-scoped tiny tool finds its audience.",
        "It also set my template for extension side-projects: vanilla JS, minimal permissions, ship fast, and let the store listing do the talking.",
      ],
    },
    next: {
      heading: "What's next",
      items: ["chrome.alarms for battery-friendly timing", "Pomodoro presets", "Store listing refresh"],
    },
    gallery: [
      {
        src: "https://img.youtube.com/vi/LS7jINeB1_U/maxresdefault.jpg",
        youtubeId: "LS7jINeB1_U",
        caption: "Demo — floating clock, drag, and timer on a live page",
      },
      {
        src: "/images/projects/popclock/menu.png",
        caption: "PopClock controls — format, timer, and focus options",
      },
      { src: "/images/projects/popclock/page.png", caption: "The floating clock riding a live webpage" },
      { src: "/images/projects/popclock/store.png", caption: "Live on the Chrome Web Store" },
    ],
  },

  "yashs-new-tab": {
    slug: "yashs-new-tab",
    title: "Yash's New Tab",
    tagline:
      "A macOS-flavoured new-tab replacement — animated clock faces, a dock, an app drawer, and seven themes. Live on the Chrome Web Store.",
    year: "2025",
    role: "Solo developer",
    type: "Chrome extension",
    status: "Live on Chrome Web Store",
    stack: ["Vanilla JavaScript · ES modules", "Manifest V3", "chrome.search", "CSS"],
    accent: "#fb923c",
    image: "/images/projects/newtab/home.png",
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/yashs-new-tab/gdblidbljmifeifmoofnofjiiakopbmi?hl=en-GB",
      },
    ],
    overview: [
      "I open a new tab a few hundred times a day, and Chrome's default is a search box and guilt. I wanted mine to feel like my Mac's desktop: a big beautiful clock, a dock of the apps I actually use, and everything else one keystroke away.",
      "So I built it — a full new-tab override in vanilla ES modules, with four animated clock faces (including an orange with a leaf), a macOS dock, a categorised app drawer, notes, and seven themes.",
    ],
    stats: [
      { value: "4", label: "Animated clock faces" },
      { value: "7", label: "Colour themes" },
      { value: "80+", label: "Curated apps in the drawer" },
      { value: "~3K", label: "Lines of vanilla JS" },
    ],
    problem: {
      heading: "The problem",
      paragraphs: [
        "The new tab page is the most-seen screen in a browser and the least loved. Existing replacements are either bloated dashboards begging for accounts, or wallpapers with a clock and nothing useful.",
        "I wanted the macOS feel — dock, launcher, personality — with zero accounts, zero tracking, and search that still goes through whatever engine the browser prefers.",
      ],
    },
    built: {
      heading: "What I built",
      intro: "A desktop, not a dashboard:",
      categories: [
        {
          name: "Clock faces",
          count: "4",
          examples: "An SVG ring clock, a flip-digit clock, the orange, and a classic — plus size control",
        },
        {
          name: "Dock & app drawer",
          count: "80+",
          examples: "macOS-style dock with hover magnify, a categorised launcher of curated web apps",
        },
        {
          name: "Notes",
          count: "📌",
          examples: "Quick notes with optional pinned notes floating on the desktop",
        },
        {
          name: "Personalisation",
          count: "7",
          examples: "Themes, your name on the greeting, custom shortcuts, a new-tabs-opened counter",
        },
      ],
    },
    features: {
      heading: "Details that make it feel native",
      items: [
        {
          title: "Search that respects the browser",
          desc: "Enter routes through chrome.search.query, so results open in the user's actual default engine — with quick-switch icons for Google, Bing, DuckDuckGo, and Brave.",
        },
        {
          title: "Favicons without an asset pipeline",
          desc: "App icons resolve through Google's favicon service per domain — 80+ sites in the drawer without shipping 80 images.",
        },
        {
          title: "Instant paint",
          desc: "A new tab opens constantly; the page renders from local state with no network on the critical path, so the clock is ticking before your fingers leave Cmd+T.",
        },
        {
          title: "Everything persists locally",
          desc: "Themes, notes, shortcuts, and the tab counter live in browser storage — no accounts, nothing leaves the machine.",
        },
      ],
    },
    challenges: {
      heading: "Technical challenges",
      items: [
        {
          title: "Escaping the monolith",
          desc: "V1 was one 1,850-line script.js. The rewrite split it into focused ES modules — dock, drawer, notes, personalisation, a clock manager with four renderers — making each face a plug-in instead of a special case.",
        },
        {
          title: "Four clocks, one manager",
          desc: "Each face has its own render loop and DOM needs. A small clock-manager contract (mount, tick, unmount) lets faces swap live from settings without leaking intervals.",
        },
        {
          title: "Theming without a framework",
          desc: "Seven themes ride a single data-theme attribute and CSS custom properties — the whole system swaps palettes with zero JS repaint work.",
        },
      ],
    },
    outcome: {
      heading: "Outcome",
      paragraphs: [
        "It shipped to the Chrome Web Store and became my own daily default — the tab I see hundreds of times a day is finally mine, and the orange clock makes people ask 'wait, what is that?' in every screen share.",
        "Together with PopClock it proved a pattern I like: small, opinionated browser tools, shipped fast, no accounts, no noise.",
      ],
    },
    next: {
      heading: "What's next",
      items: ["Custom wallpapers", "Drawer editing UI", "Weather chip"],
    },
    gallery: [
      {
        src: "/images/projects/newtab/home.png",
        caption: "New tab — animated clock, dock, and themed desktop feel",
      },
      { src: "/images/projects/newtab/store.png", caption: "The Chrome Web Store listing" },
    ],
  },

  brainrot: {
    slug: "brainrot",
    title: "BrainRot Counter",
    tagline:
      "An extension + web platform that counts every Reel and Short you watch — and roasts you into stopping. Compete with friends for the cleanest brain.",
    year: "2026",
    role: "Solo designer & developer",
    type: "Product · Extension + web platform",
    status: "Live at brainrot.quicklabs.pro",
    stack: [
      "Chrome MV3",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Express 5",
      "PostgreSQL",
      "Socket.IO",
      "Tailwind 4",
    ],
    accent: "#f472b6",
    image: "/images/projects/brainrot/portal.png",
    links: [{ label: "Portal", href: "https://brainrot.quicklabs.pro" }],
    overview: [
      "Everyone knows they watch too many Reels; nobody knows how many. BrainRot Counter answers that with a floating brain bubble that counts every Instagram Reel and YouTube Short you watch — and visibly rots as you blow past your daily target.",
      "It's a full product: a Manifest V3 extension doing the counting, an Express/PostgreSQL backend syncing events, and a Next.js portal with stats, history charts, settings, and a friends leaderboard where the lowest count wears the crown.",
    ],
    stats: [
      { value: "3", label: "Apps — extension, API, portal" },
      { value: "24h", label: "Rolling count window" },
      { value: "4", label: "Stages of brain rot" },
      { value: "0", label: "Video IDs stored — ever" },
    ],
    problem: {
      heading: "The problem",
      paragraphs: [
        "Screen-time dashboards are easy to ignore because they arrive after the fact, in a settings menu you never open. The feedback has to live where the scrolling happens — on the video, in the moment, slightly judgmental.",
        "And it had to be private by design: counting what you watch must not mean recording what you watch.",
      ],
    },
    built: {
      heading: "What I built",
      intro: "Three coordinated pieces around one loop — count, sync, shame, repeat:",
      categories: [
        {
          name: "Counting engine",
          count: "2",
          examples:
            "Reels + Shorts detection from SPA URLs, swipe-vs-back disambiguation, rolling 24h window",
        },
        {
          name: "Rot effects",
          count: "4+",
          examples:
            "A 4-stage rotting brain icon, progressive screen fade, milestone roast popups, optional hard-block wall",
        },
        {
          name: "Sync pipeline",
          count: "≤100",
          examples:
            "Offline outbox, idempotent batched uploads, server reconciliation for new devices",
        },
        {
          name: "Social & portal",
          count: "Next 16",
          examples:
            "Friends leaderboard with invite codes, history charts, settings that sync to the extension",
        },
      ],
    },
    features: {
      heading: "Engineering under the joke",
      items: [
        {
          title: "Privacy as architecture",
          desc: "Video IDs are used in memory only to tell a new Short from a back-swipe — what leaves the device is {platform, timestamp, random event id}. There is nothing to leak.",
        },
        {
          title: "Idempotent event sync",
          desc: "Events queue in an outbox and upload in batches with client-generated IDs; the server dedupes on (user, event id), so retries, offline stretches, and reinstalls can't double-count.",
        },
        {
          title: "Auth done properly",
          desc: "Short-lived access tokens with one-use rotating refresh tokens — reuse is treated as theft and kills the session family. The portal hands tokens to the extension via postMessage.",
        },
        {
          title: "Hard block that actually blocks",
          desc: "Past your limit, a capture-phase event wall swallows scrolling input on the feed — polite enough to disable in settings, annoying enough to work.",
        },
      ],
    },
    challenges: {
      heading: "Technical challenges",
      items: [
        {
          title: "Counting on hostile ground",
          desc: "Instagram and YouTube are SPAs that rewrite URLs without navigation events. Polling the location, fingerprinting transitions, and separating swipe-up from back-swipe took real care to keep counts honest.",
        },
        {
          title: "Distributed truth",
          desc: "The count lives on the badge, the bubble, and the portal simultaneously. A reconcile step rebuilds local state from the server's recent events, so a fresh install agrees with your history.",
        },
        {
          title: "Full product surface, solo",
          desc: "One person shipping an extension, an 81-file TypeScript API, and a Next.js portal means brutal prioritisation — the roast messages were, obviously, non-negotiable scope.",
        },
      ],
    },
    outcome: {
      heading: "Outcome",
      paragraphs: [
        "BrainRot Counter is live — the portal at brainrot.quicklabs.pro onboards you with Google, the extension counts and roasts, and friends compete for the crown. The Chrome Web Store release is packaged and pending listing assets.",
        "It's my favourite kind of project: a meme on the surface, and underneath it, the most careful auth and sync engineering I've shipped.",
      ],
    },
    next: {
      heading: "What's next",
      items: ["Chrome Web Store listing", "Weekly recap emails", "Mobile companion (planned)"],
    },
    gallery: [
      {
        src: "/images/projects/brainrot/portal.png",
        caption: "BrainRot portal — stats, history, and the friends leaderboard",
      },
    ],
  },

  notchpal: {
    slug: "notchpal",
    title: "NotchPal",
    tagline:
      "A macOS notch companion in Swift/SwiftUI — Now Playing, a file shelf, a mirror, and a system HUD living around the MacBook notch. Built without Xcode.",
    year: "2026",
    role: "Solo developer",
    type: "macOS app · Swift & SwiftUI",
    status: "Personal daily driver",
    stack: ["Swift", "SwiftUI", "AppKit", "CoreAudio", "IOKit", "AVFoundation", "MediaRemote"],
    accent: "#a78bfa",
    image: "/images/projects/notchpal/expanded.png",
    links: [],
    overview: [
      "The MacBook notch is dead space with prime real estate. NotchPal turns it into a control surface: hover and it blooms into a panel with Now Playing controls, a drag-and-drop file shelf, a camera mirror, timers with a countdown ring traced around the notch itself — plus a battery readout in the corner.",
      "It's also a systems project: no Xcode (Swift Package Manager and command-line tools only), private-framework spelunking for media metadata, and an NSPanel that has to live where AppKit insists windows can't.",
    ],
    stats: [
      { value: "0", label: "Xcode involved" },
      { value: "3", label: "Tabs — Home, Shelf, Mirror" },
      { value: "26px", label: "HUD that grows below the notch" },
      { value: "100%", label: "Swift + SwiftUI" },
    ],
    problem: {
      heading: "The problem",
      paragraphs: [
        "Apps like NotchNook proved the notch can be useful — but I wanted mine: my animations, my features, my rules, and a codebase I understand down to the window server.",
        "The hard parts are all systems problems. macOS 15.4+ returns empty Now Playing data to third-party binaries; AppKit actively pushes windows out of the menu-bar zone; and the volume HUD needed to appear without any of the permissions a global event tap requires.",
      ],
    },
    built: {
      heading: "What I built",
      intro: "A borderless panel over the notch, and everything that lives inside it:",
      categories: [
        {
          name: "Now Playing",
          count: "♪",
          examples:
            "Artwork, controls, progress — via a MediaRemote helper, with AppleScript fallback for Music/Spotify",
        },
        {
          name: "Shelf & Mirror",
          count: "2",
          examples: "A drag-and-drop file tray that follows you between apps, and a camera mirror tab",
        },
        {
          name: "System HUD",
          count: "26px",
          examples:
            "Volume and brightness changes stretch the notch downward with an animated level bar",
        },
        {
          name: "Timer & widgets",
          count: "◔",
          examples:
            "A countdown ring traced around the notch silhouette, presets, and a battery badge in the corner",
        },
      ],
    },
    features: {
      heading: "The systems work",
      items: [
        {
          title: "Beating the MediaRemote lockout",
          desc: "macOS 15.4+ answers MediaRemote queries only for Apple-signed processes — so a helper runs via /usr/bin/swift (an Apple-signed interpreter), streams now-playing JSON over stdout, and takes play/pause commands on stdin.",
        },
        {
          title: "A window where windows can't go",
          desc: "The panel overrides constrainFrameRect to defeat AppKit's menu-bar eviction, and sets its level above the main menu — ordered carefully, because isFloatingPanel silently resets window level.",
        },
        {
          title: "Volume HUD with zero permissions",
          desc: "A CoreAudio property listener on the default output device catches every volume/mute change — no event tap, no Accessibility prompt — and brightness polls a private DisplayServices getter that fails silently if Apple removes it.",
        },
        {
          title: "Choreographed, not just animated",
          desc: "Open: window grows silently, then the shape springs into it, then content fades in. Close: exact reverse. Resizing and animating in the same pass makes SwiftUI pop instead of spring — sequencing is the feature.",
        },
      ],
    },
    challenges: {
      heading: "Technical challenges",
      items: [
        {
          title: "No Xcode, on purpose",
          desc: "The whole app builds with swift build and a shell script that assembles and ad-hoc signs the .app bundle — which meant learning exactly what Xcode does for you, then doing it by hand.",
        },
        {
          title: "Windows that resize without flinching",
          desc: "The collapsed pill grows wings for media, stretches down for the HUD, and blooms into a panel — each needs the NSWindow resized at the right moment relative to the SwiftUI animation, or the whole illusion collapses.",
        },
        {
          title: "Graceful private-API failure",
          desc: "MediaRemote and DisplayServices are private frameworks that can vanish any release. Every private call sits behind a fallback (AppleScript polling, feature disabling) so the app degrades instead of crashing.",
        },
      ],
    },
    outcome: {
      heading: "Outcome",
      paragraphs: [
        "NotchPal runs on my Mac every day — music control, file shelf, volume HUD, and timers all living in the notch, with the exact feel I wanted because every spring constant is mine.",
        "It's the project that took me from web developer to systems developer: window servers, CoreAudio listeners, process signing, and the discipline of building against APIs that owe you nothing.",
      ],
    },
    next: {
      heading: "What's next",
      items: ["Clipboard history tab", "Calendar peek", "Public beta build"],
    },
    gallery: [
      {
        src: "/images/projects/notchpal/expanded.png",
        caption: "Expanded notch shelf — Now Playing, files, and quick tools",
      },
      {
        src: "/images/projects/notchpal/hud.png",
        caption: "Volume HUD stretching below the notch — media wings stay put",
      },
      {
        src: "/images/projects/notchpal/collapsed.png",
        caption: "Collapsed pill with now-playing wings",
      },
    ],
  },
};
