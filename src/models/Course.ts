import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  order: number;
}

export interface ICourse extends Document {
  title: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  instructor: {
    name: string;
    bio: string;
    avatarUrl?: string;
  };
  videos: IVideo[];
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  requiresPromoCode: boolean;
}

const VideoSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: [true, 'Please provide a video title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  videoUrl: {
    type: String,
    required: [true, 'Please provide a video URL'],
  },
  thumbnailUrl: {
    type: String,
    required: [true, 'Please provide a thumbnail URL'],
  },
  duration: {
    type: Number,
    required: [true, 'Please provide video duration in seconds'],
  },
  order: {
    type: Number,
    required: [true, 'Please provide the order in the course'],
  },
});

const CourseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    thumbnailUrl: {
      type: String,
      required: [true, 'Please provide a thumbnail URL'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Programming',
        'Design',
        'Business',
        'Marketing',
        'Personal Development',
        'Other',
      ],
    },
    instructor: {
      name: {
        type: String,
        required: [true, 'Please provide instructor name'],
      },
      bio: {
        type: String,
        required: [true, 'Please provide instructor bio'],
      },
      avatarUrl: {
        type: String,
      },
    },
    videos: [VideoSchema],
    featured: {
      type: Boolean,
      default: false,
    },
    requiresPromoCode: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Add indexes for faster queries
CourseSchema.index({ title: 'text', description: 'text' });
CourseSchema.index({ category: 1 });
CourseSchema.index({ featured: 1 });

const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course; 