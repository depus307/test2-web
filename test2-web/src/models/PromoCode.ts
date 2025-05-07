import mongoose, { Schema, Document } from 'mongoose';

export interface IPromoCode extends Document {
  code: string;
  description: string;
  validUntil: Date;
  isActive: boolean;
  maxUses: number;
  currentUses: number;
  createdAt: Date;
  updatedAt: Date;
  courses: mongoose.Types.ObjectId[];
}

const PromoCodeSchema = new Schema<IPromoCode>(
  {
    code: {
      type: String,
      required: [true, 'Please provide a promo code'],
      uppercase: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    validUntil: {
      type: Date,
      required: [true, 'Please provide an expiration date'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    maxUses: {
      type: Number,
      default: 0, // 0 means unlimited
    },
    currentUses: {
      type: Number,
      default: 0,
    },
    courses: [{
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Please provide at least one course ID']
    }]
  },
  { timestamps: true }
);

// Add index for faster lookup
PromoCodeSchema.index({ code: 1 });

const PromoCode = mongoose.models.PromoCode || 
  mongoose.model<IPromoCode>('PromoCode', PromoCodeSchema);

export default PromoCode; 