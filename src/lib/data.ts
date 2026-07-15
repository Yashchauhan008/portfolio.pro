export const siteConfig = {
  name: "Yash Chauhan",
  firstName: "Yash",
  lastName: "Chauhan",
  role: "Fullstack Engineer",
  tagline: "Crafting digital experiences with precision & soul.",
  location: "Morbi, Gujarat, India",
  email: "yashchauhan1775@gmail.com",
  phone: "+91 9974588518",
  url: "https://yash-chauhan.vercel.app",
  avatar: "/images/head.png",
  resume: "/yash-chauhan-resume.pdf",
  socials: {
    github: "https://github.com/Yashchauhan008",
    linkedin: "https://www.linkedin.com/in/yashchauhan008/",
    instagram: "https://www.instagram.com/yash_chauhan_________",
  },
  about: [
    "I'm a fullstack engineer from Gujarat, India. I build software at SFPL, and spend the rest of my time shipping my own products, freelance work, and open-source tools.",
    "I build scalable web applications end-to-end: from freelance client sites managed through their complete lifecycle, to an enterprise inventory system tracking ₹4 crore in assets, to a component library used for expressive motion design. I care deeply about the details — typography, easing curves, and the last 10% that makes an interface feel inevitable.",
  ],
  workProcess: [
    { step: "01", title: "Contact Me" },
    { step: "02", title: "Gather Requirements" },
    { step: "03", title: "Wireframe & Designing" },
    { step: "04", title: "Development & Testing" },
    { step: "05", title: "Deliver to Customer" },
  ],
};

export const skills = {
  languages: ["JavaScript", "TypeScript", "Java", "Python"],
  frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js", "Angular"],
  backend: ["Node.js", "Express", "MongoDB", "REST APIs"],
  tools: [
    "Hostinger",
    "VPS",
    "Portainer",
    "Nginx",
    "AWS S3",
    "EC2",
    "Git",
    "Figma",
    "Cloudinary",
    "Notion",
  ],
};

export const marqueeSkills = [
  "React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS",
  "Framer Motion", "GSAP", "Three.js", "Express", "UI/UX", "Java", "Python",
];

export const timeline = [
  {
    title: "B.Tech in Computer Science",
    org: "Darshan University, Rajkot",
    period: "2022 — Dec 2025",
    status: "completed",
    description:
      "Completed my 4-year engineering degree with a CGPA of 8.53 — the foundation years where I fell in love with building for the web.",
    links: [],
  },
  {
    title: "Teaching Assistant — Web Development",
    org: "Darshan University · alongside my degree",
    period: "2023 — Dec 2025",
    status: "completed",
    description:
      "For the last 2 years of college, I taught what I love — mentoring students in web development, conducting tutorials, and supporting faculty with curriculum and project guidance.",
    links: [],
  },
  {
    title: "Freelance Software Developer",
    org: "Self-Employed · Remote",
    period: "2024 — Dec 2025",
    status: "completed",
    description:
      "From my 5th to 8th semester, I delivered software projects for real clients — handling everything from consultation and design to development, deployment, and hosting.",
    links: [],
  },
  {
    title: "Co-founder",
    org: "The NextGen World · Startup",
    period: "Mar 2025 — May 2025",
    status: "completed",
    description:
      "Co-founded The NextGen World — a technology and skills development platform from Rajkot, empowering learners and businesses with future-ready AI skills.",
    links: [
      {
        label: "LinkedIn ↗",
        href: "https://www.linkedin.com/company/the-nextgen-world/",
      },
      {
        label: "Instagram ↗",
        href: "https://www.instagram.com/thenextgenworld/",
      },
    ],
  },
  {
    title: "Software Developer",
    org: "SFPL — Specific Fire Protection Limited",
    period: "Jul 2025 — Present",
    status: "current",
    description:
      "Building software at SFPL, a fire safety company on a mission to 'Make Fire Safe India' — including SFPL Connect, an IoT fire monitoring platform with hardware, web portal, and mobile app. 10+ years of industry experience, 150+ projects.",
    links: [{ label: "specificfire.in ↗", href: "https://specificfire.in/" }],
  },
  {
    title: "Part-time Freelance Developer",
    org: "The NextGen World · Startup",
    period: "2026 — Present",
    status: "current",
    description:
      "Alongside my job, I build products part-time for The NextGen World — a young startup shipping for the next generation.",
    links: [
      {
        label: "LinkedIn ↗",
        href: "https://www.linkedin.com/company/the-nextgen-world/",
      },
      {
        label: "Instagram ↗",
        href: "https://www.instagram.com/thenextgenworld/",
      },
    ],
  },
];

export type Project = {
  index: string;
  title: string;
  year: string;
  stack: string[];
  description: string;
  link: string;
  repo: string;
  image: string;
  accent: string;
  caseStudy?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Shanvi Enterprise",
    caseStudy: "/projects/shanvi-enterprise",
    year: "2025",
    stack: ["MERN Stack", "VPS", "Ubuntu"],
    description:
      "Enterprise inventory management system tracking ₹4 crore in assets — built on the MERN stack and deployed to production on a self-managed VPS.",
    link: "https://shanvientp.in/",
    repo: "https://github.com/Yashchauhan008/shanvi",
    image: "/images/shanvi.png",
    accent: "#f59e0b",
  },
  {
    index: "02",
    title: "Meganea",
    caseStudy: "/projects/meganea",
    year: "2025",
    stack: ["React 19", "Node.js", "MongoDB", "Docker"],
    description:
      "Supply-chain platform for a ceramic tile exporter — two role-scoped apps (India operations + Dubai sales) on one API, tracing tiles from factory QC to customer delivery. ~49K LOC delivered solo.",
    link: "https://india.meganea.in",
    repo: "",
    image: "/images/projects/meganea/india-login.png",
    accent: "#14b8a6",
  },
  {
    index: "03",
    title: "NotchPal",
    caseStudy: "/projects/notchpal",
    year: "2026",
    stack: ["Swift", "SwiftUI", "AppKit", "CoreAudio"],
    description:
      "A macOS notch companion — Now Playing, file shelf, camera mirror, and a volume/brightness HUD living around the MacBook notch. Built with SPM only, no Xcode.",
    link: "",
    repo: "",
    image: "/images/projects/notchpal/expanded.png",
    accent: "#a78bfa",
  },
  {
    index: "04",
    title: "Elev8Labs",
    year: "2024",
    stack: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    description:
      "Creative agency portfolio for a client — custom UI, expressive motion, and fully responsive design.",
    link: "https://elev8labs.in",
    repo: "https://github.com/Yashchauhan008/elev8labs",
    image: "/images/elev8labs.png",
    accent: "#8b5cf6",
  },
  {
    index: "05",
    title: "Nirvana",
    caseStudy: "/projects/nirvana",
    year: "2026",
    stack: ["Next.js 16", "GSAP", "OGL · Three.js", "PostgreSQL"],
    description:
      "Cinematic ecommerce for luxury chain-mounted eyewear — hand-written GLSL hero, Lenis + ScrollTrigger choreography, Razorpay token payments, and a full admin dashboard.",
    link: "https://www.nirvana.style/",
    repo: "",
    image: "/images/projects/nirvana/banner-1.png",
    accent: "#c9a15f",
  },
  {
    index: "06",
    title: "BrainRot Counter",
    caseStudy: "/projects/brainrot",
    year: "2026",
    stack: ["Chrome MV3", "Next.js 16", "PostgreSQL"],
    description:
      "An extension + web platform that counts every Reel and Short you watch — and roasts you into stopping. Compete with friends for the cleanest brain.",
    link: "https://brainrot.quicklabs.pro",
    repo: "",
    image: "/images/projects/brainrot/portal.png",
    accent: "#f43f5e",
  },
];

/* Archive-only projects — shown on /projects below the featured ones.
   Add entries here as you ship: image is optional (used for hover preview). */
export type ArchiveProject = {
  title: string;
  year: string;
  stack: string[];
  link?: string;
  repo?: string;
  image?: string;
  caseStudy?: string;
};

export const moreProjects: ArchiveProject[] = [
  {
    title: "Vapor UI",
    year: "2025",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://vapor-ui.vercel.app",
    repo: "https://github.com/Yashchauhan008/vapor-ui",
    image: "/images/vapor-ui.png",
    caseStudy: "/projects/vapor-ui",
  },
  {
    title: "QuickLabs Pro",
    year: "2024 — 2026",
    stack: ["React 19", "TypeScript", "PostgreSQL", "Express"],
    link: "https://quicklabs.pro",
    repo: "https://github.com/Yashchauhan008/studybuddy-v2",
    image: "/images/projects/quicklabs/home.png",
    caseStudy: "/projects/quicklabs-pro",
  },
  {
    title: "PopClock",
    year: "2025",
    stack: ["Vanilla JS", "Manifest V3"],
    link: "https://chromewebstore.google.com/detail/popclock-floating-time-ti/mnadajlookkgclepgniefdcgjnndbppm?hl=en",
    image: "/images/projects/popclock/menu.png",
    caseStudy: "/projects/popclock",
  },
  {
    title: "Yash's New Tab",
    year: "2025",
    stack: ["Vanilla JS", "Manifest V3"],
    link: "https://chromewebstore.google.com/detail/yashs-new-tab/gdblidbljmifeifmoofnofjiiakopbmi?hl=en-GB",
    image: "/images/projects/newtab/home.png",
    caseStudy: "/projects/yashs-new-tab",
  },
  {
    title: "The IQIC",
    year: "2024",
    stack: ["HTML", "CSS", "JavaScript"],
    link: "https://theiqic.vercel.app",
    repo: "https://github.com/Yashchauhan008/iqic",
    image: "/images/iqic.png",
  },
  {
    title: "Campaign Website",
    year: "2023",
    stack: ["React", "Node.js", "Multer", "Cloudinary"],
    link: "https://venchers-campaign.vercel.app",
    repo: "https://github.com/Yashchauhan008/venchers-campaign",
    image: "/images/campaign.png",
  },
];

/* photo highlights — drop real photos into /public/images/highlights/
   with these exact filenames to replace the generated placeholders */
export const highlights = [
  {
    title: "1st Runner-up — Puzzle Parade",
    detail: "Coding + aptitude competition · Darshan University",
    year: "2023",
    image: "/images/highlights/puzzle-parade.jpg",
  },
  {
    title: "Co-founded The NextGen World",
    detail: "AI & skills development startup · Rajkot",
    year: "2025",
    image: "/images/highlights/nextgen-world.jpg",
  },
  {
    title: "Teaching Assistant",
    detail: "Mentored students in web development · Darshan University",
    year: "2023 — 2025",
    image: "/images/highlights/teaching.jpg",
  },
  {
    title: "3rd Runner-up — Web Artisan",
    detail: "Web development competition · Frolic",
    year: "2023",
    image: "/images/highlights/web-artisan.jpg",
  },
  {
    title: "Hackathon Runs",
    detail: "DAIICT · MSU · Darshan University",
    year: "2022 — 2024",
    image: "/images/highlights/hackathons.jpg",
  },
  {
    title: "Google Cloud Event",
    detail: "Cloud computing skills program",
    year: "2024",
    image: "/images/highlights/google-cloud.jpg",
  },
];

