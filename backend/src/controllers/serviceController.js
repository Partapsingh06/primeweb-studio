import Service from '../models/Service.js';
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

export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isPublished: true }).sort({ order: 1 });
    return successResponse(res, 'Services retrieved.', { services });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const service = await Service.findOne({ slug });
    if (!service) {
      return errorResponse(res, 'Service not found.', 404);
    }
    return successResponse(res, 'Service retrieved.', { service });
  } catch (error) {
    next(error);
  }
};

export const getAllServicesAdmin = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    return successResponse(res, 'All services loaded for admin.', { services });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const { title, shortDescription, fullDescription, icon, benefits, deliverables, startingPrice, order, isPublished } = req.body;

    if (!title || !shortDescription || !fullDescription) {
      return errorResponse(res, 'Title, short description, and full description are required.', 400);
    }

    let slug = slugify(title);
    let existing = await Service.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const service = await Service.create({
      title,
      slug,
      shortDescription,
      fullDescription,
      icon: icon || 'Code',
      benefits: Array.isArray(benefits) ? benefits : (benefits ? benefits.split('\n').filter(Boolean) : []),
      deliverables: Array.isArray(deliverables) ? deliverables : (deliverables ? deliverables.split('\n').filter(Boolean) : []),
      startingPrice: startingPrice || '',
      order: order || 0,
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
    });

    return successResponse(res, 'Service created successfully.', { service }, 201);
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return errorResponse(res, 'Service not found.', 404);
    }

    const { title, shortDescription, fullDescription, icon, benefits, deliverables, startingPrice, order, isPublished } = req.body;

    if (title) service.title = title;
    if (shortDescription !== undefined) service.shortDescription = shortDescription;
    if (fullDescription !== undefined) service.fullDescription = fullDescription;
    if (icon !== undefined) service.icon = icon;
    if (benefits !== undefined) {
      service.benefits = Array.isArray(benefits) ? benefits : benefits.split('\n').filter(Boolean);
    }
    if (deliverables !== undefined) {
      service.deliverables = Array.isArray(deliverables) ? deliverables : deliverables.split('\n').filter(Boolean);
    }
    if (startingPrice !== undefined) service.startingPrice = startingPrice;
    if (order !== undefined) service.order = order;
    if (isPublished !== undefined) service.isPublished = Boolean(isPublished);

    await service.save();

    return successResponse(res, 'Service updated successfully.', { service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return errorResponse(res, 'Service not found.', 404);
    }

    return successResponse(res, 'Service deleted successfully.');
  } catch (error) {
    next(error);
  }
};
