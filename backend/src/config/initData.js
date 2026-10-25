import Service from '../models/Service.js';
import Project from '../models/Project.js';
import PricingPackage from '../models/PricingPackage.js';
import CEOProfile from '../models/CEOProfile.js';
import SiteSettings from '../models/SiteSettings.js';
import BlogPost from '../models/BlogPost.js';
import Testimonial from '../models/Testimonial.js';
import User from '../models/User.js';

export const ensureInitialData = async () => {
  try {
    // 1. Site Settings
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
      console.log('[InitData] Default Site Settings seeded.');
    } else {
      const existingSettings = await SiteSettings.findOne();
      if (existingSettings) {
        let modified = false;
        if (!existingSettings.businessEmail || existingSettings.businessEmail === 'contact@primewebstudio.com') {
          existingSettings.businessEmail = 'Partapxsingh05@gmail.com';
          modified = true;
        }
        if (!existingSettings.address || existingSettings.address === 'Remote Digital Agency (Serving Global Clients)') {
          existingSettings.address = 'Mullanpur Dhaka, Ludhiana, Punjab, India';
          modified = true;
        }
        if (!existingSettings.linkedinUrl || existingSettings.linkedinUrl === 'https://linkedin.com') {
          existingSettings.linkedinUrl = 'https://www.linkedin.com/in/partap-singh-0ab8003a9';
          modified = true;
        }
        if (!existingSettings.githubUrl || existingSettings.githubUrl === 'https://github.com') {
          existingSettings.githubUrl = 'https://github.com/Partapsingh06';
          modified = true;
        }
        if (!existingSettings.instagramUrl) {
          existingSettings.instagramUrl = 'https://www.instagram.com/prime.webstudio?vrfl=NmhoMGh4NTZ5djY2';
          modified = true;
        }
        if (modified) {
          await existingSettings.save();
          console.log('[InitData] Site Settings synced with updated agency contact and social info.');
        }
      }
    }

    // 2. CEO Profile
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
      console.log('[InitData] CEO Profile seeded for Partap Singh.');
    } else {
      const existingCeo = await CEOProfile.findOne();
      if (existingCeo) {
        let modified = false;
        if (!existingCeo.address) {
          existingCeo.address = 'Mullanpur Dhaka, Ludhiana, Punjab, India – 144110';
          modified = true;
        }
        if (!existingCeo.contactEmail || existingCeo.contactEmail === 'contact@primewebstudio.com') {
          existingCeo.contactEmail = 'Partapxsingh05@gmail.com';
          modified = true;
        }
        if (!existingCeo.title || existingCeo.title === 'Founder & CEO, PrimeWeb Studio') {
          existingCeo.title = 'Founder & CEO | Full Stack MERN Developer';
          modified = true;
        }
        if (!existingCeo.instagramUrl) {
          existingCeo.instagramUrl = 'https://www.instagram.com/prime.webstudio?vrfl=NmhoMGh4NTZ5djY2';
          modified = true;
        }
        if (!existingCeo.linkedinUrl || existingCeo.linkedinUrl === 'https://linkedin.com') {
          existingCeo.linkedinUrl = 'https://www.linkedin.com/in/partap-singh-0ab8003a9';
          modified = true;
        }
        if (!existingCeo.githubUrl || existingCeo.githubUrl === 'https://github.com') {
          existingCeo.githubUrl = 'https://github.com/Partapsingh06';
          modified = true;
        }
        if (modified) {
          await existingCeo.save();
          console.log('[InitData] CEO Profile synced with latest contact & social info.');
        }
      }
    }

    // 3. Services
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
      console.log('[InitData] 6 default Services seeded.');
    }

    // 4. Projects
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
      console.log('[InitData] 4 demonstration Projects seeded.');
    }

    // 5. Pricing Packages
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
      console.log('[InitData] 3 Pricing Packages seeded.');
    }

    // 6. Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.create([
        {
          clientName: 'Aarav Sharma',
          clientRole: 'Co-Founder',
          clientCompany: 'ArtisanCraft Studio',
          avatar: '',
          content: 'PrimeWeb Studio completely modernized our business website. The design with the lavender accents is stunning, mobile responsiveness is flawless, and inquiries doubled in the first month!',
          rating: 5,
          projectTitle: 'ArtisanCraft Digital Storefront',
          isVerified: true,
          isPublished: true,
        },
        {
          clientName: 'Priya Mehra',
          clientRole: 'Managing Director',
          clientCompany: 'Nexus Logistics',
          avatar: '',
          content: 'Partap and the PrimeWeb Studio team delivered our custom client portal ahead of schedule. Clean code, scalable MERN backend, and exceptional communication throughout.',
          rating: 5,
          projectTitle: 'Enterprise Logistics Web Portal',
          isVerified: true,
          isPublished: true,
        },
        {
          clientName: 'Rohit Verma',
          clientRole: 'Tech Lead',
          clientCompany: 'CloudSphere',
          avatar: '',
          content: 'The attention to UI detail, SEO performance, and responsive animations really set PrimeWeb Studio apart from other web development agencies we have worked with.',
          rating: 5,
          projectTitle: 'SaaS Product Marketing Suite',
          isVerified: true,
          isPublished: true,
        },
      ]);
      console.log('[InitData] 3 Testimonials seeded.');
    }

    // 7. Blog Post
    const blogCount = await BlogPost.countDocuments();
    if (blogCount === 0) {
      await BlogPost.create({
        title: 'Building Modern Web Applications: Why Architecture and Performance Matter',
        slug: 'building-modern-web-applications-architecture-and-performance',
        excerpt: 'Discover why clean architectural foundations, component-driven design, and responsive optimizations determine the real success of modern digital solutions.',
        content: `### The Digital First Impression\n\nIn today's fast-paced digital ecosystem, your website is often the very first touchpoint prospective clients and customers interact with. Within three seconds of arriving, visitors form lasting impressions about your credibility, technical proficiency, and brand quality.\n\n### Key Pillars of a High-Impact Website\n\n1. **Responsive-First Design**: Users browse across a multitude of device form factors — from compact mobile smartphones to 4K desktop displays. A responsive-first philosophy guarantees that navigation, typography, and interactive controls adapt gracefully.\n2. **Speed and Core Web Vitals**: Modern search algorithms and users demand instantaneous feedback. By optimizing asset delivery, minimizing unused scripts, and keeping DOM structures clean, load times drop drastically.\n3. **Robust Backend Engineering**: Visual aesthetics must be backed by secure, dependable APIs, structured data models, and strict authorization layers.\n4. **Accessible Typography and Clean Contrast**: Using accessible color contrast, such as our lavender-purple palette against crisp white backgrounds, ensures readability for all users.\n\n### Partnering for Long-Term Growth\n\nWhether building a sleek brand portfolio, a custom business website, or a scalable MERN-stack platform, thoughtful planning at the discovery phase saves countless hours and delivers measurable business outcomes.`,
        category: 'Web Development',
        tags: ['Web Development', 'MERN Stack', 'Performance', 'UI/UX'],
        readTime: '4 min read',
        isPublished: true,
        publishedAt: new Date(),
        author: 'PrimeWeb Studio Team',
      });
      console.log('[InitData] Blog post seeded.');
    }

    // 8. Admin User
    const adminEmail = (process.env.ADMIN_INITIAL_EMAIL || 'admin@primewebstudio.com').trim().toLowerCase();
    const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'AdminSecurePass2026!';
    const adminName = (process.env.ADMIN_INITIAL_NAME || 'PrimeWeb Admin').trim();

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        status: 'active',
      });
      console.log(`[InitData] Default Admin account created: ${adminEmail}`);
    } else {
      // Check if password reset/sync is explicitly requested via environment flag
      const shouldReset =
        process.env.ADMIN_RESET_PASSWORD === 'true' ||
        process.env.ADMIN_FORCE_PASSWORD_RESET === 'true';

      if (shouldReset) {
        existingAdmin.password = adminPassword;
        if (adminName) existingAdmin.name = adminName;
        existingAdmin.role = 'admin';
        existingAdmin.status = 'active';
        await existingAdmin.save();
        console.log(`[InitData] Admin credentials securely reset for: ${adminEmail} (triggered by ADMIN_RESET_PASSWORD)`);
      }
    }
  } catch (error) {
    console.error('[InitData] Error ensuring initial data:', error.message);
  }
};
