import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Ensure dotenv has loaded backend/.env regardless of import order
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

/**
 * Safely parse Cloudinary credentials from either separate variables or CLOUDINARY_URL
 */
export const getCloudinaryCredentials = () => {
  const cloudinaryUrl = process.env.CLOUDINARY_URL?.trim();
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

  // If CLOUDINARY_URL is present, parse components
  if (cloudinaryUrl && cloudinaryUrl.startsWith('cloudinary://')) {
    try {
      const parsed = new URL(cloudinaryUrl);
      return {
        cloudName: parsed.hostname,
        apiKey: parsed.username,
        apiSecret: parsed.password,
        source: 'CLOUDINARY_URL',
        isComplete: Boolean(parsed.hostname && parsed.username && parsed.password),
        missing: [],
      };
    } catch {
      // Invalid URL format
    }
  }

  const missing = [];
  if (!cloudName) missing.push('CLOUDINARY_CLOUD_NAME');
  if (!apiKey) missing.push('CLOUDINARY_API_KEY');
  if (!apiSecret) missing.push('CLOUDINARY_API_SECRET');

  return {
    cloudName: cloudName || '',
    apiKey: apiKey || '',
    apiSecret: apiSecret || '',
    source: 'SEPARATE_VARS',
    isComplete: missing.length === 0,
    missing,
  };
};

export const isCloudinaryConfigured = () => {
  const creds = getCloudinaryCredentials();
  return creds.isComplete;
};

// Safe diagnostic initialization
const initCloudinary = () => {
  const creds = getCloudinaryCredentials();
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET?.trim();

  if (creds.isComplete) {
    cloudinary.config({
      cloud_name: creds.cloudName,
      api_key: creds.apiKey,
      api_secret: creds.apiSecret,
      secure: true,
    });
    console.log(`[Cloudinary] Initialized with Cloud Name: ${creds.cloudName}`);
  } else if (creds.cloudName && uploadPreset) {
    cloudinary.config({
      cloud_name: creds.cloudName,
      secure: true,
    });
    console.log(`[Cloudinary] Initialized with Cloud Name: ${creds.cloudName} (unsigned upload mode)`);
  } else {
    console.warn(
      `[Cloudinary] Credentials not fully configured. Missing: ${creds.missing.join(', ')} ` +
      `(safe diagnostic: secret values are never printed). Using secure local file storage fallback.`
    );
  }

  if (uploadPreset) {
    console.log(`[Cloudinary] Unsigned upload preset: ${uploadPreset}`);
  }
};

initCloudinary();

/**
 * Upload a file to Cloudinary
 * Strategy:
 *   1. If an unsigned upload preset is configured, use it directly (no API key permission needed)
 *   2. Otherwise, attempt signed upload with API key/secret
 *   3. Fall back to local storage if Cloudinary is not configured at all
 *
 * @param {string} localFilePath - Path to file saved on disk by multer
 * @param {object} options - Upload options (folder, etc.)
 * @returns {Promise<{ url: string, publicId: string, bytes: number, format: string }>}
 */
export const uploadToCloudinary = async (localFilePath, options = {}) => {
  const folder = options.folder || 'primeweb_studio';
  const creds = getCloudinaryCredentials();
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET?.trim();

  if (creds.isComplete || (creds.cloudName && uploadPreset)) {
    // Ensure SDK knows the cloud name at minimum
    cloudinary.config({
      cloud_name: creds.cloudName,
      api_key: creds.apiKey || undefined,
      api_secret: creds.apiSecret || undefined,
      secure: true,
    });

    try {
      let result;

      if (uploadPreset) {
        // Unsigned upload: uses the upload preset (no create permission needed on API key)
        console.log(`[Cloudinary] Using unsigned upload with preset: ${uploadPreset}`);
        result = await cloudinary.uploader.unsigned_upload(localFilePath, uploadPreset, {
          folder,
          resource_type: 'auto',
          ...options,
          // Remove options that conflict with unsigned uploads
          overwrite: undefined,
        });
      } else {
        // Signed upload: requires API key with create permission
        result = await cloudinary.uploader.upload(localFilePath, {
          folder,
          resource_type: 'auto',
          overwrite: true,
          ...options,
        });
      }

      // Remove temporary local file upon successful upload
      try {
        if (fs.existsSync(localFilePath)) {
          fs.unlinkSync(localFilePath);
        }
      } catch (cleanupErr) {
        console.warn('[Cloudinary] Could not remove temp file after upload:', cleanupErr.message);
      }

      return {
        url: result.secure_url,
        publicId: result.public_id,
        bytes: result.bytes,
        format: result.format,
      };
    } catch (uploadError) {
      console.error('[Cloudinary] Upload error:', uploadError.message);

      // Provide actionable guidance for common errors
      if (uploadError.message?.includes('missing permissions') || uploadError.http_code === 403) {
        const permissionHelp =
          `Cloudinary Error (403 Forbidden): Upload was rejected. ` +
          `If using signed upload, the API Key lacks the "create" permission. ` +
          `If using unsigned upload, verify the upload preset "${uploadPreset || '(not set)'}" exists ` +
          `and is set to "Unsigned" mode in your Cloudinary Console (Settings -> Upload -> Upload presets).`;
        console.error(`[Cloudinary] ${permissionHelp}`);
        throw new Error(permissionHelp);
      }

      if (uploadError.message?.includes('Upload preset') && uploadError.message?.includes('not found')) {
        throw new Error(
          `Cloudinary upload preset "${uploadPreset}" not found. ` +
          `Please create it in your Cloudinary Console: Settings -> Upload -> Upload presets -> Add upload preset. ` +
          `Set Signing Mode to "Unsigned" and Preset name to "${uploadPreset}".`
        );
      }

      throw new Error(`Cloudinary upload failed: ${uploadError.message}`);
    }
  }

  // Graceful Fallback: Local storage URL when Cloudinary is not configured
  const filename = path.basename(localFilePath);
  const localUrl = `/uploads/${filename}`;
  const localPublicId = `local_${filename}`;

  return {
    url: localUrl,
    publicId: localPublicId,
    bytes: fs.existsSync(localFilePath) ? fs.statSync(localFilePath).size : 0,
    format: path.extname(localFilePath).replace('.', ''),
  };
};

/**
 * Delete an asset from Cloudinary or local fallback storage
 * @param {string} publicId - Cloudinary public_id or local identifier
 * @returns {Promise<{ result: string }>}
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return { result: 'not_found' };

  if (publicId.startsWith('local_')) {
    const filename = publicId.replace('local_', '');
    const localPath = path.resolve('uploads', filename);
    if (fs.existsSync(localPath)) {
      try {
        fs.unlinkSync(localPath);
        return { result: 'ok' };
      } catch (err) {
        console.warn('[Storage] Failed to delete local fallback file:', err.message);
      }
    }
    return { result: 'not_found' };
  }

  const creds = getCloudinaryCredentials();
  if (creds.isComplete) {
    cloudinary.config({
      cloud_name: creds.cloudName,
      api_key: creds.apiKey,
      api_secret: creds.apiSecret,
      secure: true,
    });

    try {
      const res = await cloudinary.uploader.destroy(publicId);
      console.log(`[Cloudinary] Asset deleted (${publicId}):`, res.result);
      return res;
    } catch (err) {
      console.error(`[Cloudinary] Failed to delete asset (${publicId}):`, err.message);
      return { result: 'error', error: err.message };
    }
  }

  return { result: 'skipped_not_configured' };
};

export default cloudinary;
