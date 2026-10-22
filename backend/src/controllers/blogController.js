import BlogPost from '../models/BlogPost.js';
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

export const getBlogPosts = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await BlogPost.countDocuments(query);
    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    return successResponse(res, 'Blog posts retrieved.', {
      posts,
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

export const getBlogPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug });

    if (!post) {
      return errorResponse(res, 'Blog post not found.', 404);
    }

    if (!post.isPublished && (!req.user || req.user.role !== 'admin')) {
      return errorResponse(res, 'Blog post not available.', 404);
    }

    const related = await BlogPost.find({
      category: post.category,
      _id: { $ne: post._id },
      isPublished: true,
    }).limit(3);

    return successResponse(res, 'Blog post retrieved.', { post, related });
  } catch (error) {
    next(error);
  }
};

export const getAllBlogPostsAdmin = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await BlogPost.countDocuments(query);
    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    return successResponse(res, 'All blog posts loaded for admin.', {
      posts,
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

export const createBlogPost = async (req, res, next) => {
  try {
    const { title, excerpt, content, coverImage, author, category, tags, readTime, isPublished, seoTitle, seoDescription } = req.body;

    if (!title || !excerpt || !content) {
      return errorResponse(res, 'Title, excerpt, and content are required.', 400);
    }

    let slug = slugify(title);
    let existing = await BlogPost.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const post = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage || '',
      author: author || 'PrimeWeb Studio',
      category: category || 'Web Development',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t) => t.trim()) : []),
      readTime: readTime || '4 min read',
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      publishedAt: isPublished ? new Date() : null,
      seoTitle: seoTitle || `${title} | PrimeWeb Studio Blog`,
      seoDescription: seoDescription || excerpt,
    });

    return successResponse(res, 'Blog post created successfully.', { post }, 201);
  } catch (error) {
    next(error);
  }
};

export const updateBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findById(id);

    if (!post) {
      return errorResponse(res, 'Blog post not found.', 404);
    }

    const { title, excerpt, content, coverImage, author, category, tags, readTime, isPublished, seoTitle, seoDescription } = req.body;

    if (title) post.title = title;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (content !== undefined) post.content = content;
    if (coverImage !== undefined) post.coverImage = coverImage;
    if (author !== undefined) post.author = author;
    if (category !== undefined) post.category = category;
    if (tags !== undefined) {
      post.tags = Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim());
    }
    if (readTime !== undefined) post.readTime = readTime;
    if (isPublished !== undefined) {
      if (!post.isPublished && isPublished) {
        post.publishedAt = new Date();
      }
      post.isPublished = Boolean(isPublished);
    }
    if (seoTitle !== undefined) post.seoTitle = seoTitle;
    if (seoDescription !== undefined) post.seoDescription = seoDescription;

    await post.save();

    return successResponse(res, 'Blog post updated successfully.', { post });
  } catch (error) {
    next(error);
  }
};

export const deleteBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      return errorResponse(res, 'Blog post not found.', 404);
    }

    return successResponse(res, 'Blog post deleted successfully.');
  } catch (error) {
    next(error);
  }
};
