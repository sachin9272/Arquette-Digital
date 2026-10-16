import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    blogId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      required: [true, 'Blog slug is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      trim: true,
    },
    content: {
      type: [String],
      required: true,
      default: [],
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: ['Dental', 'Skin', 'Hair', 'Internal Medicine'],
      index: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    authorRole: {
      type: String,
      default: 'Consultant Specialist',
      trim: true,
    },
    authorImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    publishedDate: {
      type: String,
      default: () =>
        new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
    },
    coverImage: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
