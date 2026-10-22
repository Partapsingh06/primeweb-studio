import User from '../models/User.js';
import Inquiry from '../models/Inquiry.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * Admin: Get all registered clients
 */
export const getClientsAdmin = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;
    const query = { role: 'client' };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await User.countDocuments(query);
    const clients = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    return successResponse(res, 'Clients retrieved.', {
      clients,
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
 * Admin: Get client details + associated inquiries
 */
export const getClientDetailsAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await User.findOne({ _id: id, role: 'client' });

    if (!client) {
      return errorResponse(res, 'Client not found.', 404);
    }

    const inquiries = await Inquiry.find({
      $or: [{ client: client._id }, { email: client.email }],
    }).sort({ createdAt: -1 });

    return successResponse(res, 'Client details and history loaded.', {
      client,
      inquiries,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Toggle client status (active / suspended)
 */
export const toggleClientStatusAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await User.findOne({ _id: id, role: 'client' });

    if (!client) {
      return errorResponse(res, 'Client not found.', 404);
    }

    client.status = client.status === 'active' ? 'suspended' : 'active';
    await client.save();

    return successResponse(res, `Client account status updated to ${client.status}.`, {
      client,
    });
  } catch (error) {
    next(error);
  }
};
