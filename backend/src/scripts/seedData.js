import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import mongoose from 'mongoose';
import { connectDB, closeDB } from '../config/db.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import PricingPackage from '../models/PricingPackage.js';
import CEOProfile from '../models/CEOProfile.js';
import SiteSettings from '../models/SiteSettings.js';
import BlogPost from '../models/BlogPost.js';

const seed = async () => {
  try {
    await connectDB();
    console.log('[Seed] Seeding database with initial agency data...');

    // 1. Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.create([
        {
          title: 'Business Website Development',
          slug: 'business-website-development',
          shortDescription: 'Tailored, responsive websites engineered to establish credibility, generate qualified leads, and represent your brand.',
          fullDescription: 'We build high-converting corporate and business websites using modern technologies. Each site is custom-crafted to reflect your brand identity, load fast on all devices, and convert visitors into loyal customers.',
          icon: 'Globe',
          benefits: ['Mobile-first responsive architecture', 'Lightning-fast load performance', 'Search engine optimized foundation', 'Integrated contact and lead capture forms'],
          deliverables: ['Custom UI/UX layout', 'Contact & inquiry forms', 'On-page SEO optimization', 'Analytics integration', 'Comprehensive documentation'],
          startingPrice: '₹5,999',
          order: 1,
          isPublished: true,
        },
        {
          title: 'Full-Stack MERN Development',
          slug: 'full-stack-mern-development',
          shortDescription: 'Robust, dynamic web applications developed with MongoDB, Express.js, React.js, and Node.js for scalability.',
          fullDescription: 'Harness the full power of the MERN stack for custom web portals, SaaS platforms, client management tools, and dynamic database applications engineered for reliability and high concurrency.',
          icon: 'Layers',
          benefits: ['Scalable component-based architecture', 'RESTful API integration with JSON data', 'Secure JWT authentication & authorization', 'Efficient MongoDB data modeling'],
          deliverables: ['Frontend React SPA/Next.js interface', 'Backend Express REST API', 'MongoDB database schemas & indexes', 'Admin and client roles', 'API documentation'],
          startingPrice: '₹12,999',
          order: 2,
          isPublished: true,
        },
        {
          title: 'E-commerce Development',
          slug: 'e-commerce-development',
          shortDescription: 'Feature-rich online stores built for high conversions, smooth user checkouts, and effortless product management.',
          fullDescription: 'From product catalogs and filter systems to secure checkout workflows and inventory management, we deliver e-commerce solutions that empower merchants to sell efficiently online.',
          icon: 'ShoppingCart',
          benefits: ['Seamless product browsing & filtering', 'Secure payment gateway integration', 'Automated order and stock tracking', 'Optimized mobile checkout experience'],
          deliverables: ['Product catalog system', 'Cart & checkout workflow', 'Payment integration', 'Customer account portal', 'Admin order dashboard'],
          startingPrice: '₹9,999',
          order: 3,
          isPublished: true,
        },
        {
          title: 'Portfolio Website Development',
          slug: 'portfolio-website-development',
          shortDescription: 'Impactful personal and creator portfolio websites designed to highlight your work, projects, and personal brand.',
          fullDescription: 'Showcase your skills, creative works, and professional journey with a refined, fast portfolio website tailored for developers, designers, freelancers, and executives.',
          icon: 'Briefcase',
          benefits: ['Distinctive visual identity', 'Interactive case studies & galleries', 'Fast loading with minimal bloat', 'Easy project and resume updates'],
          deliverables: ['Hero intro and about section', 'Dynamic project showcase', 'Skills matrix and timeline', 'Contact CTA with direct links', 'Responsive mobile layout'],
          startingPrice: '₹2,999',
          order: 4,
          isPublished: true,
        },
        {
          title: 'UI/UX Design',
          slug: 'ui-ux-design',
          shortDescription: 'Intuitive user interface and user experience design focused on clarity, accessibility, and modern aesthetics.',
          fullDescription: 'We craft clear design systems, wireframes, and high-fidelity interactive prototypes that guide users effortlessly through digital touchpoints while elevating your brand perception.',
          icon: 'Palette',
          benefits: ['Curated modern color palettes and typography', 'User-centric usability flows', 'Accessible component hierarchies', 'Design consistency across screens'],
          deliverables: ['Wireframes and user journeys', 'High-fidelity mockups', 'Interactive design prototypes', 'Reusable component libraries', 'Developer handoff specs'],
          startingPrice: '₹4,999',
          order: 5,
          isPublished: true,
        },
        {
          title: 'Website Maintenance',
          slug: 'website-maintenance',
          shortDescription: 'Continuous technical support, security patches, performance optimization, and content updates.',
          fullDescription: 'Keep your web application running smoothly with proactive maintenance, scheduled dependency updates, speed tuning, and quick troubleshooting support.',
          icon: 'Wrench',
          benefits: ['Proactive security patching', 'Periodic performance audits', 'Database backup oversight', 'Prompt technical assistance'],
          deliverables: ['Uptime monitoring setup', 'Dependency updates', 'Security audit review', 'Bug fixes & minor content revisions'],
          startingPrice: '₹1,999/mo',
          order: 6,
          isPublished: true,
        },
      ]);
      console.log('[Seed] 6 default Services seeded.');
    }

    // 2. Demonstration Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.create([
        {
          title: 'Manmeet Creations — Handmade Art and Craft Website',
          slug: 'manmeet-creations',
          shortDescription: 'Elegantly curated web showcase for artisanal handmade crafts, resin art, and personalized creative gifts.',
          description: 'Manmeet Creations is a digital storefront and showcase built for a creative handmade art and craft studio. The application highlights bespoke creations, handcrafted resin pieces, and festive hampers with high-resolution visual galleries, inquiry flows, and mobile-first browsing.',
          category: 'Web Development',
          technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'Responsive UI'],
          liveUrl: '',
          githubUrl: '',
          featured: true,
          isPublished: true,
          clientName: 'Demonstration Showcase (Art & Craft)',
          order: 1,
        },
        {
          title: 'Weather App — Weather Information Application',
          slug: 'weather-app',
          shortDescription: 'Real-time weather tracking application providing instant meteorological forecasts, search, and intuitive data visuals.',
          description: 'An interactive weather forecasting application designed to deliver real-time atmospheric data, temperature trends, wind velocity, humidity, and 5-day forecasts with smooth animations and dynamic thematic weather backgrounds.',
          category: 'MERN Stack',
          technologies: ['JavaScript', 'React.js', 'OpenWeather API', 'CSS Modules', 'Axios'],
          liveUrl: '',
          githubUrl: '',
          featured: true,
          isPublished: true,
          clientName: 'Demonstration Project (Web Utility)',
          order: 2,
        },
        {
          title: 'E-commerce Store — Online Shopping Experience',
          slug: 'ecommerce-store',
          shortDescription: 'Modern e-commerce platform featuring dynamic product catalogs, filtering, cart management, and seamless order workflows.',
          description: 'A comprehensive full-stack e-commerce solution engineered with product search, category filtering, cart management, state persistence, and responsive checkout flows tailored for modern online retailers.',
          category: 'E-commerce',
          technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
          liveUrl: '',
          githubUrl: '',
          featured: true,
          isPublished: true,
          clientName: 'Demonstration Project (Commerce)',
          order: 3,
        },
        {
          title: 'Business Website — Corporate Web Presence',
          slug: 'business-website-showcase',
          shortDescription: 'Professional corporate web presence engineered with high-impact value propositions, service breakdowns, and lead capture.',
          description: 'A polished, clean business web application built to convert visitors through structured storytelling, customer pain-point addressing, service tiers, and interactive contact forms.',
          category: 'Web Development',
          technologies: ['React.js', 'Tailwind CSS', 'Vite', 'REST API'],
          liveUrl: '',
          githubUrl: '',
          featured: false,
          isPublished: true,
          clientName: 'Demonstration Project (Corporate)',
          order: 4,
        },
      ]);
      console.log('[Seed] 4 demonstration Projects seeded.');
    }

    // 3. Pricing Packages
    const pricingCount = await PricingPackage.countDocuments();
    if (pricingCount === 0) {
      await PricingPackage.create([
        {
          name: 'Starter Website',
          slug: 'starter-website',
          price: '₹2,999',
          billingPeriod: 'Illustrative Starting Price',
          description: 'Ideal for individuals, personal brands, and simple portfolios seeking a fast, refined web presence.',
          badge: 'Best for Portfolios',
          popular: false,
          ctaText: 'Start Your Project',
          order: 1,
          isPublished: true,
          features: [
            { title: 'Single or Multi-Section Landing Layout', included: true },
            { title: 'Mobile-First Responsive Design', included: true },
            { title: 'Contact & Social Link Integration', included: true },
            { title: 'Basic SEO & Speed Optimization', included: true },
            { title: 'Full-Stack MERN Architecture', included: false },
            { title: 'E-Commerce / Payment Gateway', included: false },
          ],
        },
        {
          name: 'Business Website',
          slug: 'business-website',
          price: '₹5,999',
          billingPeriod: 'Illustrative Starting Price',
          description: 'Tailored for small businesses, startups, and service providers seeking lead generation and trust.',
          badge: 'Most Popular',
          popular: true,
          ctaText: 'Build Business Website',
          order: 2,
          isPublished: true,
          features: [
            { title: 'Up to 5 Custom-Designed Pages', included: true },
            { title: 'Interactive Inquiry & Quote Form', included: true },
            { title: 'Comprehensive On-Page SEO Setup', included: true },
            { title: 'Performance Optimization & Caching', included: true },
            { title: 'Admin Contact Management Ready', included: true },
            { title: 'Payment Gateway Integration', included: false },
          ],
        },
        {
          name: 'E-commerce Website',
          slug: 'ecommerce-website',
          price: '₹9,999',
          billingPeriod: 'Illustrative Starting Price',
          description: 'Full-featured online store crafted for businesses ready to sell products and manage orders smoothly.',
          badge: 'Full Solution',
          popular: false,
          ctaText: 'Launch Online Store',
          order: 3,
          isPublished: true,
          features: [
            { title: 'Custom Product Catalog & Filters', included: true },
            { title: 'Cart & Secure Checkout Workflows', included: true },
            { title: 'Order & Customer Tracking Structure', included: true },
            { title: 'Payment Gateway Setup Guidance', included: true },
            { title: 'Mobile-Optimized Shopping Experience', included: true },
            { title: 'Admin Product & Inventory Management', included: true },
          ],
        },
      ]);
      console.log('[Seed] 3 Pricing Packages seeded.');
    }

    // 4. CEO Profile
    const ceoCount = await CEOProfile.countDocuments();
    if (ceoCount === 0) {
      await CEOProfile.create({
        name: 'Partap Singh',
        title: 'Founder & CEO | Full Stack MERN Developer',
        address: 'Mullanpur Dhaka, Ludhiana, Punjab, India – 144110',
        shortIntro: 'I am a Computer Science Engineering student and full-stack web developer passionate about building modern, responsive, and practical digital solutions for businesses and individuals.',
        biography: 'My focus is on creating user-friendly websites and full-stack applications using modern web technologies. I enjoy turning ideas into functional digital products through thoughtful design, structured development, and continuous learning.',
        technicalSkills: [
          'HTML',
          'CSS',
          'JavaScript',
          'React.js',
          'Node.js',
          'Express.js',
          'MongoDB',
          'REST API Development',
          'Responsive Web Design',
          'Git and GitHub',
        ],
        areasOfExpertise: [
          'Full-Stack MERN Architecture',
          'Responsive Frontend Engineering',
          'RESTful API Design & Integration',
          'Client-Focused Custom Web Applications',
        ],
        philosophy: "Great websites combine thoughtful design, useful functionality, performance, and a clear understanding of the user's needs.",
        vision: 'My vision is to help businesses establish a strong digital presence by creating accessible, reliable, and effective web experiences.',
        photoUrl: '',
        linkedinUrl: 'https://www.linkedin.com/in/partap-singh-0ab8003a9',
        githubUrl: 'https://github.com/Partapsingh06',
        instagramUrl: 'https://www.instagram.com/prime.webstudio?vrfl=NmhoMGh4NTZ5djY2',
        contactEmail: 'Partapxsingh05@gmail.com',
      });
      console.log('[Seed] CEO Profile seeded for Partap Singh.');
    }

    // 5. Site Settings
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create({
        websiteName: 'PrimeWeb Studio',
        tagline: 'Your Vision. Our Creation.',
        businessEmail: 'Partapxsingh05@gmail.com',
        contactPhone: '',
        whatsappNumber: '',
        businessHours: 'Mon - Fri: 9:00 AM - 6:00 PM IST',
        address: 'Mullanpur Dhaka, Ludhiana, Punjab, India',
        linkedinUrl: 'https://www.linkedin.com/in/partap-singh-0ab8003a9',
        githubUrl: 'https://github.com/Partapsingh06',
        instagramUrl: 'https://www.instagram.com/prime.webstudio?vrfl=NmhoMGh4NTZ5djY2',
        footerContent: 'PrimeWeb Studio is a modern digital agency specializing in professional website development, full-stack MERN applications, and bespoke web solutions.',
        seoDefaultTitle: 'PrimeWeb Studio — Modern Digital Agency & Full-Stack Web Development',
        seoDefaultDesc: 'Professional website development, full-stack MERN applications, e-commerce platforms, and portfolio websites crafted with modern technologies.',
      });
      console.log('[Seed] Site Settings seeded.');
    }

    // 6. Blog Post
    const blogCount = await BlogPost.countDocuments();
    if (blogCount === 0) {
      await BlogPost.create({
        title: 'Building Modern Web Applications: Why Architecture and Performance Matter',
        slug: 'building-modern-web-applications-architecture-and-performance',
        excerpt: 'Discover why clean architectural foundations, component-driven design, and responsive optimizations determine the real success of modern digital solutions.',
        content: `
### The Digital First Impression

In today's fast-paced digital ecosystem, your website is often the very first touchpoint prospective clients and customers interact with. Within three seconds of arriving, visitors form lasting impressions about your credibility, technical proficiency, and brand quality.

### Key Pillars of a High-Impact Website

1. **Responsive-First Design**: Users browse across a multitude of device form factors — from compact mobile smartphones to 4K desktop displays. A responsive-first philosophy guarantees that navigation, typography, and interactive controls adapt gracefully.
2. **Speed and Core Web Vitals**: Modern search algorithms and users demand instantaneous feedback. By optimizing asset delivery, minimizing unused scripts, and keeping DOM structures clean, load times drop drastically.
3. **Robust Backend Engineering**: Visual aesthetics must be backed by secure, dependable APIs, structured data models, and strict authorization layers.
4. **Accessible Typography and Clean Contrast**: Using accessible color contrast, such as our lavender-purple palette against crisp white backgrounds, ensures readability for all users.

### Partnering for Long-Term Growth

Whether building a sleek brand portfolio, a custom business website, or a scalable MERN-stack platform, thoughtful planning at the discovery phase saves countless hours and delivers measurable business outcomes.
        `,
        category: 'Web Development',
        tags: ['Web Development', 'MERN Stack', 'Performance', 'UI/UX'],
        readTime: '4 min read',
        isPublished: true,
        publishedAt: new Date(),
        author: 'PrimeWeb Studio Team',
      });
      console.log('[Seed] Initial sample Blog Post seeded.');
    }

    console.log('[Seed] Database initialization complete!');
  } catch (error) {
    console.error('[Seed] Error during seeding:', error.message);
  } finally {
    await closeDB();
    process.exit(0);
  }
};

seed();
