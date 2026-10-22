import Project from '../models/Project.js';
import Inquiry from '../models/Inquiry.js';
import User from '../models/User.js';
import BlogPost from '../models/BlogPost.js';
import Service from '../models/Service.js';
import { successResponse } from '../utils/response.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProjects,
      publishedProjects,
      totalInquiries,
      newInquiries,
      inProgressInquiries,
      totalClients,
      publishedBlogs,
      totalServices,
      recentInquiries,
      latestProjects,
      statusCounts,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ isPublished: true }),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'New' }),
      Inquiry.countDocuments({ status: 'In Progress' }),
      User.countDocuments({ role: 'client' }),
      BlogPost.countDocuments({ isPublished: true }),
      Service.countDocuments({ isPublished: true }),
      Inquiry.find().sort({ createdAt: -1 }).limit(5),
      Project.find().sort({ createdAt: -1 }).limit(5),
      Inquiry.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

    const statusDistribution = statusCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    return successResponse(res, 'Dashboard statistics loaded.', {
      counts: {
        totalProjects,
        publishedProjects,
        totalInquiries,
        newInquiries,
        inProgressInquiries,
        totalClients,
        publishedBlogs,
        totalServices,
      },
      statusDistribution,
      recentInquiries,
      latestProjects,
    });
  } catch (error) {
    next(error);
  }
};
