import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    doctorId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Professional title is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: ['Dental', 'Skin', 'Hair'],
      index: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    experienceYears: {
      type: Number,
      required: true,
      min: 1,
    },
    rating: {
      type: Number,
      default: 4.9,
      min: 1,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 150,
    },
    image: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      default: 'Mon - Fri (9:30 AM - 6:00 PM)',
    },
    fee: {
      type: Number,
      required: true,
      default: 1500,
    },
    bio: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
      default: ['English', 'Hindi'],
    },
    specializations: {
      type: [String],
      default: [],
    },
    isAvailableToday: {
      type: Boolean,
      default: true,
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

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
