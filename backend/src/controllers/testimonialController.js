import Testimonial from '../models/Testimonial.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isPublished: true, isVerified: true }).sort({ createdAt: -1 });
    return successResponse(res, 'Testimonials retrieved.', { testimonials });
  } catch (error) {
    next(error);
  }
};

export const getAllTestimonialsAdmin = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return successResponse(res, 'All testimonials loaded for admin.', { testimonials });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const { clientName, clientRole, clientCompany, avatar, content, rating, projectTitle, isPublished, isVerified } = req.body;

    if (!clientName || !content) {
      return errorResponse(res, 'Client name and testimonial content are required.', 400);
    }

    const testimonial = await Testimonial.create({
      clientName,
      clientRole: clientRole || '',
      clientCompany: clientCompany || '',
      avatar: avatar || '',
      content,
      rating: rating ? Number(rating) : 5,
      projectTitle: projectTitle || '',
      isVerified: isVerified !== undefined ? Boolean(isVerified) : true,
      isPublished: Boolean(isPublished),
    });

    return successResponse(res, 'Testimonial created successfully.', { testimonial }, 201);
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return errorResponse(res, 'Testimonial not found.', 404);
    }

    const { clientName, clientRole, clientCompany, avatar, content, rating, projectTitle, isPublished, isVerified } = req.body;

    if (clientName) testimonial.clientName = clientName;
    if (clientRole !== undefined) testimonial.clientRole = clientRole;
    if (clientCompany !== undefined) testimonial.clientCompany = clientCompany;
    if (avatar !== undefined) testimonial.avatar = avatar;
    if (content !== undefined) testimonial.content = content;
    if (rating !== undefined) testimonial.rating = Number(rating);
    if (projectTitle !== undefined) testimonial.projectTitle = projectTitle;
    if (isPublished !== undefined) testimonial.isPublished = Boolean(isPublished);
    if (isVerified !== undefined) testimonial.isVerified = Boolean(isVerified);

    await testimonial.save();

    return successResponse(res, 'Testimonial updated successfully.', { testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return errorResponse(res, 'Testimonial not found.', 404);
    }

    return successResponse(res, 'Testimonial deleted successfully.');
  } catch (error) {
    next(error);
  }
};
