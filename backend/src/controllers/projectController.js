import Project from '../models/Project.js';
import CEOProfile from '../models/CEOProfile.js';
import { deleteFromCloudinary } from '../config/cloudinary.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Helper to slugify string
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

/**
 * Public: Get published projects
 */
export const getProjects = async (req, res, next) => {
  try {
    const { category, featured, search, page = 1, limit = 50 } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    return successResponse(res, 'Projects retrieved.', {
      projects,
      pagination: {
        total,
        page: parseInt(page, 10),
        pages: Math.ceil(total / parseInt(limit, 10)),
        limit: parseInt(limit, 10),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Public: Get single project by slug
 */
export const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug });

    if (!project) {
      return errorResponse(res, 'Project not found.', 404);
    }

    // If not published and not admin, deny
    if (!project.isPublished && (!req.user || req.user.role !== 'admin')) {
      return errorResponse(res, 'Project not available.', 404);
    }

    // Related projects in same category
    const related = await Project.find({
      category: project.category,
      _id: { $ne: project._id },
      isPublished: true,
    }).limit(3);

    return successResponse(res, 'Project retrieved.', { project, related });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get all projects (including un-published)
 */
export const getAllProjectsAdmin = async (req, res, next) => {
  try {
    const { search, category, page = 1, limit = 100 } = req.query;
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (category && category !== 'All') {
      query.category = category;
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    return successResponse(res, 'All projects loaded for admin.', {
      projects,
      pagination: {
        total,
        page: parseInt(page, 10),
        pages: Math.ceil(total / parseInt(limit, 10)),
        limit: parseInt(limit, 10),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Create Project
 */
export const createProject = async (req, res, next) => {
  try {
    const {
      title,
      description,
      shortDescription,
      category,
      thumbnail,
      thumbnailPublicId,
      images,
      technologies,
      liveUrl,
      githubUrl,
      featured,
      isPublished,
      clientName,
      seoTitle,
      seoDescription,
      order,
    } = req.body;

    if (!title || !description) {
      return errorResponse(res, 'Title and description are required.', 400);
    }

    let slug = slugify(title);
    let existing = await Project.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`;
    }

    const project = await Project.create({
      title,
      slug,
      description,
      shortDescription: shortDescription || description.slice(0, 160),
      category: category || 'Web Development',
      thumbnail: thumbnail || '',
      thumbnailPublicId: thumbnailPublicId || '',
      images: Array.isArray(images) ? images : [],
      technologies: Array.isArray(technologies)
        ? technologies
        : (technologies ? technologies.split(',').map((t) => t.trim()).filter(Boolean) : []),
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      featured: Boolean(featured),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      clientName: clientName || 'Demonstration Project',
      seoTitle: seoTitle || `${title} | PrimeWeb Studio Portfolio`,
      seoDescription: seoDescription || shortDescription || '',
      order: order !== undefined ? Number(order) : 0,
    });

    return successResponse(res, 'Project created successfully.', { project }, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Update Project
 */
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return errorResponse(res, 'Project not found.', 404);
    }

    const {
      title,
      description,
      shortDescription,
      category,
      thumbnail,
      thumbnailPublicId,
      images,
      technologies,
      liveUrl,
      githubUrl,
      featured,
      isPublished,
      clientName,
      seoTitle,
      seoDescription,
      order,
    } = req.body;

    const oldThumbnailPublicId = project.thumbnailPublicId;

    if (title && title !== project.title) {
      project.title = title;
    }

    if (description !== undefined) project.description = description;
    if (shortDescription !== undefined) project.shortDescription = shortDescription;
    if (category !== undefined) project.category = category;
    if (thumbnail !== undefined) project.thumbnail = thumbnail;
    if (thumbnailPublicId !== undefined) project.thumbnailPublicId = thumbnailPublicId;
    if (images !== undefined) project.images = Array.isArray(images) ? images : project.images;
    if (technologies !== undefined) {
      project.technologies = Array.isArray(technologies)
        ? technologies
        : technologies.split(',').map((t) => t.trim()).filter(Boolean);
    }
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (featured !== undefined) project.featured = Boolean(featured);
    if (isPublished !== undefined) project.isPublished = Boolean(isPublished);
    if (clientName !== undefined) project.clientName = clientName;
    if (seoTitle !== undefined) project.seoTitle = seoTitle;
    if (seoDescription !== undefined) project.seoDescription = seoDescription;
    if (order !== undefined) project.order = Number(order);

    await project.save();

    // If thumbnail was replaced and old one existed, delete old Cloudinary image only if not referenced elsewhere
    if (thumbnailPublicId !== undefined && oldThumbnailPublicId && oldThumbnailPublicId !== thumbnailPublicId) {
      try {
        const otherProjCount = await Project.countDocuments({
          thumbnailPublicId: oldThumbnailPublicId,
          _id: { $ne: project._id },
        });
        const ceoCount = await CEOProfile.countDocuments({
          photoPublicId: oldThumbnailPublicId,
        });
        if (otherProjCount === 0 && ceoCount === 0) {
          await deleteFromCloudinary(oldThumbnailPublicId);
        }
      } catch (delErr) {
        console.warn('[Project] Old thumbnail cleanup skipped:', delErr.message);
      }
    }

    return successResponse(res, 'Project updated successfully.', { project });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Delete Project
 */
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return errorResponse(res, 'Project not found.', 404);
    }

    const publicIdToDelete = project.thumbnailPublicId;

    await Project.findByIdAndDelete(id);

    // If project image is on Cloudinary, delete it ONLY when not referenced by another record
    if (publicIdToDelete) {
      try {
        const remainingCount = await Project.countDocuments({
          thumbnailPublicId: publicIdToDelete,
        });
        const ceoCount = await CEOProfile.countDocuments({
          photoPublicId: publicIdToDelete,
        });
        if (remainingCount === 0 && ceoCount === 0) {
          await deleteFromCloudinary(publicIdToDelete);
        }
      } catch (delErr) {
        console.warn('[Project] Image cleanup on delete skipped:', delErr.message);
      }
    }

    return successResponse(res, 'Project deleted successfully.');
  } catch (error) {
    next(error);
  }
};

