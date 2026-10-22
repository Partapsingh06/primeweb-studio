import CEOProfile from '../models/CEOProfile.js';
import Project from '../models/Project.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import { successResponse, errorResponse } from '../utils/response.js';

const DEFAULT_CEO = {
  name: 'Partap Singh',
  title: 'Founder & CEO | Full Stack MERN Developer',
  address: 'Mullanpur Dhaka, Ludhiana, Punjab, India – 144110',
  shortIntro: 'I am a Computer Science Engineering student and full-stack web developer passionate about building modern, responsive, and practical digital solutions for businesses and individuals.',
  biography: 'My focus is on creating user-friendly websites and full-stack applications using modern web technologies. I enjoy turning ideas into functional digital products through thoughtful design, structured development, and continuous learning.',
  technicalSkills: [
    'HTML',
    'CSS',
    'JavaScript',
    'React.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'REST API Development',
    'Responsive Web Design',
    'Git and GitHub',
  ],
  areasOfExpertise: [
    'Full-Stack MERN Architecture',
    'Responsive Frontend Engineering',
    'RESTful API Design & Integration',
    'Client-Focused Custom Web Applications',
  ],
  philosophy: "Great websites combine thoughtful design, useful functionality, performance, and a clear understanding of the user's needs.",
  vision: 'My vision is to help businesses establish a strong digital presence by creating accessible, reliable, and effective web experiences.',
  photoUrl: '',
  photoPublicId: '',
  linkedinUrl: 'https://linkedin.com/in/partap-singh-0ab8003a9',
  githubUrl: 'https://github.com/Partapsingh06',
  instagramUrl: 'https://www.instagram.com/prime.webstudio?vrfl=NmhoMGh4NTZ5djY2',
  contactEmail: 'Partapxsingh05@gmail.com',
};

export const getCEOProfile = async (req, res, next) => {
  try {
    let profile = await CEOProfile.findOne();
    if (!profile) {
      profile = await CEOProfile.create(DEFAULT_CEO);
    }
    return successResponse(res, 'CEO profile loaded.', { profile });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload CEO Profile Photo to Cloudinary and update MongoDB
 */
export const uploadCEOPhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'Please select an image file to upload.', 400);
    }

    // 1. Upload new image to Cloudinary (or local fallback)
    const result = await uploadToCloudinary(req.file.path, {
      folder: 'primeweb_studio/ceo',
    });

    // 2. Fetch existing profile
    let profile = await CEOProfile.findOne();
    if (!profile) {
      profile = new CEOProfile(DEFAULT_CEO);
    }

    const oldPublicId = profile.photoPublicId;

    // 3. Update database record with new Cloudinary URL and publicId
    profile.photoUrl = result.url;
    profile.photoPublicId = result.publicId;
    await profile.save();

    // 4. Safely delete old Cloudinary image only AFTER database update succeeds
    if (oldPublicId && oldPublicId !== result.publicId) {
      try {
        const isReferencedInProjects = await Project.countDocuments({
          thumbnailPublicId: oldPublicId,
        });
        if (isReferencedInProjects === 0) {
          await deleteFromCloudinary(oldPublicId);
        }
      } catch (delErr) {
        console.warn('[CEOPhoto] Old image cleanup skipped:', delErr.message);
      }
    }

    return successResponse(
      res,
      'CEO profile photo uploaded and updated successfully.',
      {
        profile,
        url: result.url,
        publicId: result.publicId,
      },
      200
    );
  } catch (error) {
    next(error);
  }
};

export const updateCEOProfile = async (req, res, next) => {
  try {
    let profile = await CEOProfile.findOne();
    if (!profile) {
      profile = new CEOProfile(DEFAULT_CEO);
    }

    const {
      name,
      title,
      address,
      shortIntro,
      biography,
      technicalSkills,
      areasOfExpertise,
      philosophy,
      vision,
      photoUrl,
      photoPublicId,
      linkedinUrl,
      githubUrl,
      instagramUrl,
      contactEmail,
    } = req.body;

    const oldPublicId = profile.photoPublicId;

    if (name) profile.name = name;
    if (title) profile.title = title;
    if (address !== undefined) profile.address = address;
    if (shortIntro) profile.shortIntro = shortIntro;
    if (biography) profile.biography = biography;
    if (technicalSkills !== undefined) {
      profile.technicalSkills = Array.isArray(technicalSkills)
        ? technicalSkills
        : technicalSkills.split(',').map((s) => s.trim());
    }
    if (areasOfExpertise !== undefined) {
      profile.areasOfExpertise = Array.isArray(areasOfExpertise)
        ? areasOfExpertise
        : areasOfExpertise.split(',').map((s) => s.trim());
    }
    if (philosophy) profile.philosophy = philosophy;
    if (vision) profile.vision = vision;
    if (photoUrl !== undefined) profile.photoUrl = photoUrl;
    if (photoPublicId !== undefined) profile.photoPublicId = photoPublicId;
    if (linkedinUrl !== undefined) profile.linkedinUrl = linkedinUrl;
    if (githubUrl !== undefined) profile.githubUrl = githubUrl;
    if (instagramUrl !== undefined) profile.instagramUrl = instagramUrl;
    if (contactEmail !== undefined) profile.contactEmail = contactEmail;

    await profile.save();

    // If photoPublicId was explicitly replaced or cleared, cleanup old image if not referenced
    if (photoPublicId !== undefined && oldPublicId && oldPublicId !== photoPublicId) {
      try {
        const isReferenced = await Project.countDocuments({
          thumbnailPublicId: oldPublicId,
        });
        if (isReferenced === 0) {
          await deleteFromCloudinary(oldPublicId);
        }
      } catch (delErr) {
        console.warn('[CEOProfile] Old image cleanup skipped:', delErr.message);
      }
    }

    return successResponse(res, 'CEO profile updated successfully.', { profile });
  } catch (error) {
    next(error);
  }
};

