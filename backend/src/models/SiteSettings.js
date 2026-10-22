import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    websiteName: {
      type: String,
      default: 'PrimeWeb Studio',
      trim: true,
    },
    tagline: {
      type: String,
      default: 'Your Vision. Our Creation.',
      trim: true,
    },
    logoUrl: {
      type: String,
      default: '',
    },
    faviconUrl: {
      type: String,
      default: '',
    },
    businessEmail: {
      type: String,
      default: 'Partapxsingh05@gmail.com',
      trim: true,
    },
    contactPhone: {
      type: String,
      default: '',
      trim: true,
    },
    whatsappNumber: {
      type: String,
      default: '',
      trim: true,
    },
    businessHours: {
      type: String,
      default: 'Mon - Fri: 9:00 AM - 6:00 PM IST',
      trim: true,
    },
    address: {
      type: String,
      default: 'Mullanpur Dhaka, Ludhiana, Punjab, India',
      trim: true,
    },
    linkedinUrl: {
      type: String,
      default: 'https://www.linkedin.com/in/partap-singh-0ab8003a9',
      trim: true,
    },
    githubUrl: {
      type: String,
      default: 'https://github.com/Partapsingh06',
      trim: true,
    },
    instagramUrl: {
      type: String,
      default: 'https://www.instagram.com/prime.webstudio?vrfl=NmhoMGh4NTZ5djY2',
      trim: true,
    },
    footerContent: {
      type: String,
      default: 'PrimeWeb Studio is a modern digital agency specializing in professional website development, full-stack MERN applications, and bespoke web solutions.',
    },
    seoDefaultTitle: {
      type: String,
      default: 'PrimeWeb Studio — Modern Digital Agency & Full-Stack Web Development',
    },
    seoDefaultDesc: {
      type: String,
      default: 'Professional website development, full-stack MERN applications, e-commerce platforms, and portfolio websites crafted with modern technologies.',
    },
  },
  {
    timestamps: true,
  }
);

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
export default SiteSettings;
