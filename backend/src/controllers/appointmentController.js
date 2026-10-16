import Appointment from '../models/Appointment.js';
import { sendBookingConfirmationEmail } from '../services/emailService.js';

// @desc    Create a new appointment booking
// @route   POST /api/appointments
// @access  Public
export const createAppointment = async (req, res) => {
  try {
    const {
      patientName,
      email,
      phone,
      age,
      gender,
      department,
      doctor,
      treatment,
      appointmentDate,
      timeSlot,
      symptomsOrNotes,
      consultationFee,
      status,
      paymentStatus,
    } = req.body;

    // Validate required fields
    if (!patientName || !email || !phone || !department || !appointmentDate || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Please provide patientName, email, phone, department, appointmentDate, and timeSlot.',
      });
    }

    // Generate unique booking reference
    const bookingReference = req.body.bookingReference || Appointment.generateReference();
    const resolvedStatus = status || 'confirmed';

    const appointment = new Appointment({
      bookingReference,
      patientName,
      email,
      phone,
      age: age ? Number(age) : undefined,
      gender: gender || 'prefer-not-to-say',
      department,
      doctor: doctor || {
        id: 'clinic-desk',
        name: 'Duty Consultant',
        fee: consultationFee || 1200,
      },
      treatment: treatment || `${department} Specialist Consultation`,
      appointmentDate,
      timeSlot,
      symptomsOrNotes: symptomsOrNotes || '',
      consultationFee: consultationFee || (doctor && doctor.fee) || 1200,
      status: resolvedStatus,
      paymentStatus: paymentStatus || 'pay_at_clinic',
    });

    const saved = await appointment.save();

    // If booking is confirmed, dispatch confirmation email to the customer
    let emailResult = null;
    if (saved.status === 'confirmed') {
      try {
        emailResult = await sendBookingConfirmationEmail(saved);
        if (emailResult && emailResult.success) {
          saved.confirmationEmailSent = true;
          saved.confirmationEmailSentAt = new Date();
          await saved.save();
        }
      } catch (mailErr) {
        console.error('Failed to dispatch confirmation email on creation:', mailErr);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Appointment booking successfully registered.',
      data: saved,
      emailSent: emailResult ? emailResult.success : false,
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create appointment booking.',
      error: error.message,
    });
  }
};

// @desc    Get all appointments with filters & search (For Admin)
// @route   GET /api/appointments
// @access  Admin / Protected
export const getAllAppointments = async (req, res) => {
  try {
    const { status, department, date, search, limit = 100, page = 1 } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (department && department !== 'all') {
      query.department = department;
    }

    if (date) {
      query.appointmentDate = date;
    }

    if (search) {
      query.$or = [
        { patientName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { bookingReference: { $regex: search, $options: 'i' } },
        { 'doctor.name': { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [appointments, total] = await Promise.all([
      Appointment.find(query)
        .sort({ appointmentDate: -1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Appointment.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      count: appointments.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: appointments,
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve appointments.',
      error: error.message,
    });
  }
};

// @desc    Get single appointment by ID or reference
// @route   GET /api/appointments/:id
// @access  Public / Admin
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = id.startsWith('PRL-')
      ? await Appointment.findOne({ bookingReference: id })
      : await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching appointment.',
      error: error.message,
    });
  }
};

// @desc    Update appointment status or admin notes (Admin Action)
// @route   PATCH /api/appointments/:id
// @access  Admin
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes, paymentStatus, appointmentDate, timeSlot, forceEmail } = req.body;

    const existing = await Appointment.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found.',
      });
    }

    const previousStatus = existing.status;

    const updateFields = {};
    if (status) updateFields.status = status;
    if (adminNotes !== undefined) updateFields.adminNotes = adminNotes;
    if (paymentStatus) updateFields.paymentStatus = paymentStatus;
    if (appointmentDate) updateFields.appointmentDate = appointmentDate;
    if (timeSlot) updateFields.timeSlot = timeSlot;

    const updated = await Appointment.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    // If status changed to 'confirmed' (or forceEmail is requested), send email to customer
    let emailResult = null;
    if (status === 'confirmed' && (previousStatus !== 'confirmed' || forceEmail)) {
      try {
        emailResult = await sendBookingConfirmationEmail(updated);
        if (emailResult && emailResult.success) {
          updated.confirmationEmailSent = true;
          updated.confirmationEmailSentAt = new Date();
          await updated.save();
        }
      } catch (mailErr) {
        console.error('Failed to dispatch confirmation email during status update:', mailErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Appointment updated to status: ${updated.status}`,
      data: updated,
      emailSent: emailResult ? emailResult.success : undefined,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update appointment.',
      error: error.message,
    });
  }
};

// @desc    Resend booking confirmation email manually
// @route   POST /api/appointments/:id/send-confirmation
// @access  Admin
export const resendConfirmationEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = id.startsWith('PRL-')
      ? await Appointment.findOne({ bookingReference: id })
      : await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found.',
      });
    }

    const emailResult = await sendBookingConfirmationEmail(appointment);
    if (emailResult.success) {
      appointment.confirmationEmailSent = true;
      appointment.confirmationEmailSentAt = new Date();
      await appointment.save();

      return res.status(200).json({
        success: true,
        message: `Booking confirmation email dispatched successfully to ${appointment.email}`,
        data: appointment,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: `Failed to dispatch email: ${emailResult.error}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to process confirmation email request.',
      error: error.message,
    });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Admin
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Appointment successfully deleted.',
      data: { id: deleted._id, reference: deleted.bookingReference },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete appointment.',
      error: error.message,
    });
  }
};

// @desc    Aggregated analytics & overview stats for Admin Dashboard
// @route   GET /api/appointments/stats/overview
// @access  Admin
export const getAppointmentStats = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const [
      total,
      pending,
      confirmed,
      completed,
      cancelled,
      todayCount,
      dentalCount,
      skinCount,
      hairCount,
      revenueResult,
    ] = await Promise.all([
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: 'pending' }),
      Appointment.countDocuments({ status: 'confirmed' }),
      Appointment.countDocuments({ status: 'completed' }),
      Appointment.countDocuments({ status: 'cancelled' }),
      Appointment.countDocuments({ appointmentDate: today }),
      Appointment.countDocuments({ department: 'Dental' }),
      Appointment.countDocuments({ department: 'Skin' }),
      Appointment.countDocuments({ department: 'Hair' }),
      Appointment.aggregate([
        { $match: { status: { $in: ['confirmed', 'completed'] } } },
        { $group: { _id: null, totalRevenue: { $sum: '$consultationFee' } } },
      ]),
    ]);

    const estimatedRevenue = revenueResult[0]?.totalRevenue || 0;

    return res.status(200).json({
      success: true,
      stats: {
        total,
        pending,
        confirmed,
        completed,
        cancelled,
        todayCount,
        departments: {
          dental: dentalCount,
          skin: skinCount,
          hair: hairCount,
        },
        estimatedRevenue,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to compute appointment stats.',
      error: error.message,
    });
  }
};

// @desc    Seed realistic dummy appointments into MongoDB
// @route   POST /api/appointments/seed
// @access  Admin
export const seedAppointments = async (req, res) => {
  try {
    const dummyData = [
      {
        bookingReference: 'PRL-2026-104921',
        patientName: 'Aarav Sharma',
        email: 'aarav.sharma@gmail.com',
        phone: '+91 98450 12890',
        age: 31,
        gender: 'male',
        department: 'Hair',
        doctor: {
          id: 'dr-priya-nair',
          name: 'Dr. Priya Nair',
          title: 'Senior Trichologist & Hair Transplant Surgeon',
          fee: 1500,
        },
        treatment: 'Growth Factor Concentrate (GFC) Advanced Therapy',
        appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        timeSlot: '10:30 AM',
        symptomsOrNotes: 'Active diffuse shedding along the crown for 4 months. Seeking non-surgical GFC reactivation.',
        consultationFee: 1500,
        status: 'pending',
        paymentStatus: 'pay_at_clinic',
      },
      {
        bookingReference: 'PRL-2026-209418',
        patientName: 'Ananya Deshmukh',
        email: 'ananya.deshmukh@outlook.com',
        phone: '+91 99002 84721',
        age: 27,
        gender: 'female',
        department: 'Dental',
        doctor: {
          id: 'dr-marcus-thornton',
          name: 'Dr. Marcus Thornton',
          title: 'Consultant Orthodontist & Smile Specialist',
          fee: 1400,
        },
        treatment: 'Invisalign® Diamond Elite Clear Aligners',
        appointmentDate: new Date().toISOString().split('T')[0],
        timeSlot: '11:30 AM',
        symptomsOrNotes: 'Orthodontic consultation for minor crowding on upper incisors. Prefers invisible aligners.',
        consultationFee: 1400,
        status: 'confirmed',
        paymentStatus: 'paid',
      },
      {
        bookingReference: 'PRL-2026-318492',
        patientName: 'Rohan Mehra',
        email: 'rohan.mehra@techcorp.in',
        phone: '+91 97411 99023',
        age: 34,
        gender: 'male',
        department: 'Skin',
        doctor: {
          id: 'dr-kavita-sharma',
          name: 'Dr. Kavita Sharma',
          title: 'Lead Aesthetic Dermatologist & Laser Surgeon',
          fee: 1500,
        },
        treatment: 'HydraFacial Elite MD® Medical Infusion',
        appointmentDate: new Date().toISOString().split('T')[0],
        timeSlot: '02:00 PM',
        symptomsOrNotes: 'Deep pore congestion, dull skin, pre-wedding skin glow procedure.',
        consultationFee: 1500,
        status: 'confirmed',
        paymentStatus: 'pay_at_clinic',
      },
      {
        bookingReference: 'PRL-2026-440219',
        patientName: 'Sunita Rao',
        email: 'sunita.rao@yahoo.co.in',
        phone: '+91 98860 33412',
        age: 46,
        gender: 'female',
        department: 'Skin',
        doctor: {
          id: 'dr-kavita-sharma',
          name: 'Dr. Kavita Sharma',
          title: 'Lead Aesthetic Dermatologist & Laser Surgeon',
          fee: 1500,
        },
        treatment: 'Cosmelan® Depigmentation & Melasma Management',
        appointmentDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
        timeSlot: '04:00 PM',
        symptomsOrNotes: 'Persistent hormonal melasma on cheeks after summer travel. Inquiring about Cosmelan mask.',
        consultationFee: 1500,
        status: 'pending',
        paymentStatus: 'pay_at_clinic',
      },
      {
        bookingReference: 'PRL-2026-559102',
        patientName: 'Vikram Patel',
        email: 'vikram.patel@consulting.com',
        phone: '+91 96112 45890',
        age: 42,
        gender: 'male',
        department: 'Dental',
        doctor: {
          id: 'dr-alister-vane',
          name: 'Dr. Alister Vane',
          title: 'Consultant Implantologist & Oral Surgeon',
          fee: 1500,
        },
        treatment: '3D-Guided Titanium Dental Implants',
        appointmentDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        timeSlot: '03:30 PM',
        symptomsOrNotes: 'Lower left first molar extraction done 3 months ago. Ready for 3D guided implant placement.',
        consultationFee: 1500,
        status: 'completed',
        paymentStatus: 'paid',
      },
      {
        bookingReference: 'PRL-2026-670194',
        patientName: 'Meera Iyer',
        email: 'meera.iyer@gmail.com',
        phone: '+91 98455 11928',
        age: 26,
        gender: 'female',
        department: 'Hair',
        doctor: {
          id: 'dr-priya-nair',
          name: 'Dr. Priya Nair',
          title: 'Senior Trichologist & Hair Transplant Surgeon',
          fee: 1500,
        },
        treatment: 'Autologous Scalp PRP Therapy',
        appointmentDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        timeSlot: '05:00 PM',
        symptomsOrNotes: 'Session 2 of 4 maintenance PRP protocol for seasonal hair shedding.',
        consultationFee: 1500,
        status: 'confirmed',
        paymentStatus: 'pay_at_clinic',
      },
      {
        bookingReference: 'PRL-2026-781930',
        patientName: 'Karan Singhania',
        email: 'karan.singhania@fintech.io',
        phone: '+91 99801 77654',
        age: 38,
        gender: 'male',
        department: 'Hair',
        doctor: {
          id: 'dr-priya-nair',
          name: 'Dr. Priya Nair',
          title: 'Senior Trichologist & Hair Transplant Surgeon',
          fee: 1500,
        },
        treatment: 'Bio-Sapphire Micro-FUE Hair Transplant',
        appointmentDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
        timeSlot: '09:30 AM',
        symptomsOrNotes: 'Receding Norwood Stage 3 hairline. Wants graft estimate and hairline design consultation.',
        consultationFee: 1500,
        status: 'pending',
        paymentStatus: 'pay_at_clinic',
      },
      {
        bookingReference: 'PRL-2026-892041',
        patientName: 'Pooja Hegde',
        email: 'pooja.hegde@designstudio.in',
        phone: '+91 98440 66532',
        age: 29,
        gender: 'female',
        department: 'Dental',
        doctor: {
          id: 'dr-marcus-thornton',
          name: 'Dr. Marcus Thornton',
          title: 'Consultant Orthodontist & Smile Specialist',
          fee: 1400,
        },
        treatment: 'Single-Visit Microscopic Root Canal Therapy',
        appointmentDate: new Date().toISOString().split('T')[0],
        timeSlot: '04:30 PM',
        symptomsOrNotes: 'Acute sensitivity to cold liquids on lower right premolar with throbbing pain.',
        consultationFee: 1400,
        status: 'confirmed',
        paymentStatus: 'pay_at_clinic',
      },
    ];

    await Appointment.deleteMany({});
    const inserted = await Appointment.insertMany(dummyData);

    return res.status(200).json({
      success: true,
      message: `Successfully seeded ${inserted.length} realistic dummy appointments into MongoDB.`,
      count: inserted.length,
      data: inserted,
    });
  } catch (error) {
    console.error('Error seeding appointments:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to seed appointments into MongoDB.',
      error: error.message,
    });
  }
};
