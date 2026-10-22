import Notification from '../models/Notification.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getMyNotifications = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin'
      ? { $or: [{ recipient: null }, { recipient: req.user._id }] }
      : { recipient: req.user._id };

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(30);

    const unreadCount = await Notification.countDocuments({ ...query, read: false });

    return successResponse(res, 'Notifications retrieved.', { notifications, unreadCount });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);

    if (!notification) {
      return errorResponse(res, 'Notification not found.', 404);
    }

    notification.read = true;
    await notification.save();

    return successResponse(res, 'Notification marked as read.');
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin'
      ? { $or: [{ recipient: null }, { recipient: req.user._id }] }
      : { recipient: req.user._id };

    await Notification.updateMany(query, { read: true });

    return successResponse(res, 'All notifications marked as read.');
  } catch (error) {
    next(error);
  }
};
