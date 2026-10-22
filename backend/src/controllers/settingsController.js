import SiteSettings from '../models/SiteSettings.js';
import { successResponse, errorResponse } from '../utils/response.js';

const DEFAULT_SETTINGS = {
  websiteName: 'PrimeWeb Studio',
  tagline: 'Your Vision. Our Creation.',
  logoUrl: '',
  faviconUrl: '',
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
};

export const getSiteSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(DEFAULT_SETTINGS);
    }
    return successResponse(res, 'Site settings loaded.', { settings });
  } catch (error) {
    next(error);
  }
};

export const updateSiteSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(DEFAULT_SETTINGS);
    }

    const {
      websiteName,
      tagline,
      logoUrl,
      faviconUrl,
      businessEmail,
      contactPhone,
      whatsappNumber,
      businessHours,
      address,
      linkedinUrl,
      githubUrl,
      instagramUrl,
      footerContent,
      seoDefaultTitle,
      seoDefaultDesc,
    } = req.body;

    if (websiteName) settings.websiteName = websiteName;
    if (tagline) settings.tagline = tagline;
    if (logoUrl !== undefined) settings.logoUrl = logoUrl;
    if (faviconUrl !== undefined) settings.faviconUrl = faviconUrl;
    if (businessEmail !== undefined) settings.businessEmail = businessEmail;
    if (contactPhone !== undefined) settings.contactPhone = contactPhone;
    if (whatsappNumber !== undefined) settings.whatsappNumber = whatsappNumber;
    if (businessHours !== undefined) settings.businessHours = businessHours;
    if (address !== undefined) settings.address = address;
    if (linkedinUrl !== undefined) settings.linkedinUrl = linkedinUrl;
    if (githubUrl !== undefined) settings.githubUrl = githubUrl;
    if (instagramUrl !== undefined) settings.instagramUrl = instagramUrl;
    if (footerContent !== undefined) settings.footerContent = footerContent;
    if (seoDefaultTitle !== undefined) settings.seoDefaultTitle = seoDefaultTitle;
    if (seoDefaultDesc !== undefined) settings.seoDefaultDesc = seoDefaultDesc;

    await settings.save();

    return successResponse(res, 'Site settings updated successfully.', { settings });
  } catch (error) {
    next(error);
  }
};
