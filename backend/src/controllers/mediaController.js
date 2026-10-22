import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import { successResponse, errorResponse } from '../utils/response.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../../uploads');

export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'Please choose an image file to upload.', 400);
    }

    const result = await uploadToCloudinary(req.file.path, {
      folder: 'primeweb_studio/media',
    });

    return successResponse(
      res,
      'Image uploaded successfully.',
      {
        url: result.url,
        publicId: result.publicId,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

export const listMedia = async (req, res, next) => {
  try {
    if (!fs.existsSync(uploadDir)) {
      return successResponse(res, 'Media list loaded.', { files: [] });
    }

    const fileNames = fs.readdirSync(uploadDir);
    const files = fileNames
      .filter((file) => /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(file))
      .map((file) => {
        const stats = fs.statSync(path.join(uploadDir, file));
        return {
          filename: file,
          url: `/uploads/${file}`,
          size: stats.size,
          createdAt: stats.birthtime,
        };
      })
      .sort((a, b) => b.createdAt - a.createdAt);

    return successResponse(res, 'Media list loaded.', { files });
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const sanitizedFilename = path.basename(filename);
    const filePath = path.join(uploadDir, sanitizedFilename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return successResponse(res, 'File deleted successfully.');
    } else {
      return errorResponse(res, 'File not found.', 404);
    }
  } catch (error) {
    next(error);
  }
};
