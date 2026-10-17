import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
    },
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: [true, 'Contact email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 120,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer-not-to-say'],
      default: 'prefer-not-to-say',
    },
    department: {
      type: String,
      required: [true, 'Clinical department is required'],
      enum: ['Dental', 'Skin', 'Hair'],
      index: true,
    },
    doctor: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      title: { type: String },
      fee: { type: Number, default: 1200 },
    },
    treatment: {
      type: String,
      required: [true, 'Treatment or primary complaint is required'],
      trim: true,
    },
    appointmentDate: {
      type: String,
      required: [true, 'Appointment date is required (YYYY-MM-DD)'],
      index: true,
    },
    timeSlot: {
      type: String,
      required: [true, 'Appointment time slot is required'],
    },
    symptomsOrNotes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    consultationFee: {
      type: Number,
      required: true,
      default: 1200,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'pay_at_clinic'],
      default: 'pay_at_clinic',
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    rejectionReason: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    confirmationEmailSent: {
      type: Boolean,
      default: false,
    },
    confirmationEmailSentAt: {
      type: Date,
    },
    rejectionEmailSent: {
      type: Boolean,
      default: false,
    },
    rejectionEmailSentAt: {
      type: Date,
    },
    emailError: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Helper static method to generate a unique booking reference
appointmentSchema.statics.generateReference = function () {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `PRL-${year}-${randomSuffix}`;
};

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
