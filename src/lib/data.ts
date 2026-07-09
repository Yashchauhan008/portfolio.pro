export const siteConfig = {
  name: "Yash Chauhan",
  firstName: "Yash",
  lastName: "Chauhan",
  role: "Fullstack Developer",
  tagline: "Crafting digital experiences with precision & soul.",
  location: "Morbi, Gujarat, India",
  email: "yashchauhan1775@gmail.com",
  phone: "+91 9974588518",
  url: "https://yash-chauhan.vercel.app",
  avatar: "/images/head.png",
  socials: {
    github: "https://github.com/Yashchauhan008",
    linkedin: "https://www.linkedin.com/in/yashchauhan008/",
    instagram: "https://www.instagram.com/yash_chauhan_________",
  },
  about: [
    "I'm a fullstack developer from Gujarat, India. By day I build software at SFPL — an IoT-powered fire safety company — and by night I ship products part-time for The NextGen World, a young startup.",
    "I build scalable web applications end-to-end: from freelance client sites managed through their complete lifecycle, to an enterprise inventory system tracking ₹4 crore in assets, to a component library used for expressive motion design. I care deeply about the details — typography, easing curves, and the last 10% that makes an interface feel inevitable.",
  ],
  stats: [
    { value: "80+", label: "Repositories" },
    { value: "150+", label: "Platform users served" },
    { value: "₹4Cr", label: "Assets managed in prod" },
    { value: "8.53", label: "CGPA · Darshan University" },
  ],
};

export const skills = {
  languages: ["JavaScript", "TypeScript", "Java", "Python", "C"],
  frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js", "Angular"],
  backend: ["Node.js", "Express", "MongoDB", "REST APIs", "VPS Deployment"],
  tools: ["Git", "Figma", "Blender", "Spline", "Cloudinary", "Notion"],
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
    title: "Software Developer",
    org: "SFPL — Specific Fire Protection Limited",
    period: "Jan 2026 — Present",
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

export const projects = [
  {
    index: "01",
    title: "Vapor UI",
    year: "2025",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description:
      "A modern React component library with 20+ reusable components — text animations, background effects, and interactive elements powered by Framer Motion.",
    link: "https://vapor-ui.vercel.app",
    repo: "https://github.com/Yashchauhan008/vapor-ui",
    image: "/images/vapor-ui.png",
    accent: "#0ea5e9",
  },
  {
    index: "02",
    title: "Shanvi Enterprise",
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
    index: "03",
    title: "Study Buddy",
    year: "2024",
    stack: ["React", "Node.js", "Kinde Auth", "MongoDB"],
    description:
      "A learning management system serving 150+ authenticated university students with verified lab manual solutions, Google auth, and complete UI/UX design.",
    link: "https://quicklabs.fun",
    repo: "https://github.com/Yashchauhan008/studybuddy-v2",
    image: "/images/studybuddy.png",
    accent: "#10b981",
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
    title: "The IQIC",
    year: "2024",
    stack: ["HTML", "CSS", "JavaScript"],
    description:
      "Freelance business website for a quality inspection company — professional, comprehensive, responsive.",
    link: "https://theiqic.vercel.app",
    repo: "https://github.com/Yashchauhan008/iqic",
    image: "/images/iqic.png",
    accent: "#ef4444",
  },
  {
    index: "06",
    title: "Campaign Website",
    year: "2023",
    stack: ["React", "Node.js", "Multer", "Cloudinary"],
    description:
      "Interactive campaign platform for coding competitions with a block-based photo sharing system and cloud file uploads.",
    link: "https://venchers-campaign.vercel.app",
    repo: "https://github.com/Yashchauhan008/venchers-campaign",
    image: "/images/campaign.png",
    accent: "#ec4899",
  },
];

export const awards = [
  {
    title: "1st Runner-up — Puzzle Parade",
    detail: "Coding + aptitude competition · Darshan University",
    year: "2023",
  },
  {
    title: "3rd Runner-up — Web Artisan",
    detail: "Web development competition · Frolic",
    year: "2023",
  },
  {
    title: "Multi-hackathon Participant",
    detail: "DAIICT · MSU · Darshan University",
    year: "2022 — 2024",
  },
  {
    title: "Google Cloud Event",
    detail: "Cloud computing skills program",
    year: "2024",
  },
];

