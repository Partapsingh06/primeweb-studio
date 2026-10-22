import mongoose from 'mongoose';

const pricingFeatureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    included: { type: Boolean, default: true },
  },
  { _id: false }
);

const pricingPackageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Package name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    price: {
      type: String,
      required: [true, 'Price label is required'],
      default: '₹2,999',
    },
    billingPeriod: {
      type: String,
      default: 'Starting price',
    },
    description: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      default: '',
    },
    features: [pricingFeatureSchema],
    popular: {
      type: Boolean,
      default: false,
    },
    ctaText: {
      type: String,
      default: 'Get Started',
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

pricingPackageSchema.index({ order: 1, isPublished: 1 });

const PricingPackage = mongoose.model('PricingPackage', pricingPackageSchema);
export default PricingPackage;
