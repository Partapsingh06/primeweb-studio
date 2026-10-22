import mongoose from 'mongoose';

const ceoProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Partap Singh',
      trim: true,
    },
    title: {
      type: String,
      required: true,
      default: 'Founder & CEO | Full Stack MERN Developer',
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      default: 'Mullanpur Dhaka, Ludhiana, Punjab, India – 144110',
    },
    shortIntro: {
      type: String,
      required: true,
      default: 'I am a Computer Science Engineering student and full-stack web developer passionate about building modern, responsive, and practical digital solutions for businesses and individuals.',
    },
    biography: {
      type: String,
      required: true,
      default: 'My focus is on creating user-friendly websites and full-stack applications using modern web technologies. I enjoy turning ideas into functional digital products through thoughtful design, structured development, and continuous learning.',
    },
    technicalSkills: [{
      type: String,
      trim: true,
    }],
    areasOfExpertise: [{
      type: String,
      trim: true,
    }],
    philosophy: {
      type: String,
      required: true,
      default: "Great websites combine thoughtful design, useful functionality, performance, and a clear understanding of the user's needs.",
    },
    vision: {
      type: String,
      required: true,
      default: 'My vision is to help businesses establish a strong digital presence by creating accessible, reliable, and effective web experiences.',
    },
    photoUrl: {
      type: String,
      default: '', // Cloudinary or secure image URL
    },
    photoPublicId: {
      type: String,
      default: '',
      trim: true,
    },
    linkedinUrl: {
      type: String,
      trim: true,
      default: 'https://www.linkedin.com/in/partap-singh-0ab8003a9',
    },
    githubUrl: {
      type: String,
      trim: true,
      default: 'https://github.com/Partapsingh06',
    },
    instagramUrl: {
      type: String,
      trim: true,
      default: 'https://www.instagram.com/prime.webstudio?vrfl=NmhoMGh4NTZ5djY2',
    },
    contactEmail: {
      type: String,
      trim: true,
      default: 'Partapxsingh05@gmail.com',
    },
  },
  {
    timestamps: true,
  }
);

const CEOProfile = mongoose.model('CEOProfile', ceoProfileSchema);
export default CEOProfile;
