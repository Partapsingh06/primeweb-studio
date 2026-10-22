import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    note: { type: String, required: true },
    author: { type: String, default: 'Admin' },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const inquirySchema = new mongoose.Schema(
  {
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Valid email is required'],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    companyName: {
      type: String,
      trim: true,
      default: '',
    },
    serviceRequired: {
      type: String,
      required: [true, 'Service required is required'],
      default: 'Business Website Development',
    },
    estimatedBudget: {
      type: String,
      default: '₹5,000 - ₹15,000',
    },
    projectTimeline: {
      type: String,
      default: 'Within 2-4 weeks',
    },
    projectDescription: {
      type: String,
      required: [true, 'Project description is required'],
      minlength: [10, 'Please provide at least 10 characters describing your project'],
    },
    preferredContactMethod: {
      type: String,
      enum: ['Email', 'Phone', 'WhatsApp'],
      default: 'Email',
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Discussion', 'In Progress', 'Completed', 'Closed'],
      default: 'New',
      index: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    internalNotes: [noteSchema],
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    adminResponse: {
      type: String,
      default: '',
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

inquirySchema.index({ createdAt: -1 });

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
