import PricingPackage from '../models/PricingPackage.js';
import { successResponse, errorResponse } from '../utils/response.js';

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export const getPricingPackages = async (req, res, next) => {
  try {
    const packages = await PricingPackage.find({ isPublished: true }).sort({ order: 1 });
    return successResponse(res, 'Pricing packages retrieved.', { packages });
  } catch (error) {
    next(error);
  }
};

export const getAllPricingAdmin = async (req, res, next) => {
  try {
    const packages = await PricingPackage.find().sort({ order: 1 });
    return successResponse(res, 'All pricing packages loaded for admin.', { packages });
  } catch (error) {
    next(error);
  }
};

export const createPricingPackage = async (req, res, next) => {
  try {
    const { name, price, billingPeriod, description, badge, features, popular, ctaText, order, isPublished } = req.body;

    if (!name || !price || !description) {
      return errorResponse(res, 'Package name, price, and description are required.', 400);
    }

    let slug = slugify(name);
    let existing = await PricingPackage.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const pkg = await PricingPackage.create({
      name,
      slug,
      price,
      billingPeriod: billingPeriod || 'Starting price',
      description,
      badge: badge || '',
      features: Array.isArray(features) ? features : [],
      popular: Boolean(popular),
      ctaText: ctaText || 'Get Started',
      order: order || 0,
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
    });

    return successResponse(res, 'Pricing package created successfully.', { package: pkg }, 201);
  } catch (error) {
    next(error);
  }
};

export const updatePricingPackage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pkg = await PricingPackage.findById(id);

    if (!pkg) {
      return errorResponse(res, 'Package not found.', 404);
    }

    const { name, price, billingPeriod, description, badge, features, popular, ctaText, order, isPublished } = req.body;

    if (name) pkg.name = name;
    if (price !== undefined) pkg.price = price;
    if (billingPeriod !== undefined) pkg.billingPeriod = billingPeriod;
    if (description !== undefined) pkg.description = description;
    if (badge !== undefined) pkg.badge = badge;
    if (features !== undefined) pkg.features = Array.isArray(features) ? features : pkg.features;
    if (popular !== undefined) pkg.popular = Boolean(popular);
    if (ctaText !== undefined) pkg.ctaText = ctaText;
    if (order !== undefined) pkg.order = order;
    if (isPublished !== undefined) pkg.isPublished = Boolean(isPublished);

    await pkg.save();

    return successResponse(res, 'Pricing package updated successfully.', { package: pkg });
  } catch (error) {
    next(error);
  }
};

export const deletePricingPackage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pkg = await PricingPackage.findByIdAndDelete(id);

    if (!pkg) {
      return errorResponse(res, 'Package not found.', 404);
    }

    return successResponse(res, 'Pricing package deleted successfully.');
  } catch (error) {
    next(error);
  }
};
