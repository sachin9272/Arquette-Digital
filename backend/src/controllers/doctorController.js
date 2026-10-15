const path = require('path');
const fs = require('fs');
const Doctor = require('../models/Doctor');
const {
  uploadBufferToCloudinary,
  uploadUrlToCloudinary,
} = require('../config/cloudinary');

const SEED_DOCTORS = [
  {
    doctorId: 'dr-sarah-jenkins',
    name: 'Dr. Sarah Jenkins',
    title: 'Senior Consultant Dermatologist & Laser Surgeon',
    department: 'Skin',
    qualifications: 'MBBS, MD (Dermatology), FRCP, FAAD',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    availability: 'Mon, Wed, Fri (9:00 AM - 4:00 PM)',
    fee: 1800,
    bio: 'Dr. Jenkins is an internationally acclaimed dermatologist specializing in laser resurfacing, severe acne protocol, and non-invasive skin rejuvenation.',
    languages: ['English', 'French'],
    specializations: ['Laser Resurfacing', 'Acne Scar Revision', 'Melasma & Pigmentation', 'Skin Cancer Screening'],
    isAvailableToday: true,
  },
  {
    doctorId: 'dr-alister-vance',
    name: 'Dr. Alistair Vance',
    title: 'Chief of Implantology & Cosmetic Dentistry',
    department: 'Dental',
    qualifications: 'BDS, MSc Implant Dentistry (London), FDS RCS',
    experienceYears: 19,
    rating: 4.95,
    reviewCount: 489,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    availability: 'Tue, Thu, Sat (8:30 AM - 5:00 PM)',
    fee: 1500,
    bio: 'Pioneering dental surgeon dedicated to minimally invasive 3D-guided dental implants, digital smile design, and porcelain veneer transformations.',
    languages: ['English', 'German'],
    specializations: ['Dental Implants', 'Full Mouth Reconstruction', 'Porcelain Veneers', 'Sedation Dentistry'],
    isAvailableToday: true,
  },
  {
    doctorId: 'dr-priya-patel',
    name: 'Dr. Priya Patel',
    title: 'Lead Trichologist & Hair Restoration Surgeon',
    department: 'Hair',
    qualifications: 'MBBS, MD, FISHRS (Certified Trichologist)',
    experienceYears: 14,
    rating: 4.88,
    reviewCount: 278,
    image: 'https://res.cloudinary.com/dcahokqjx/image/upload/v1792093429/pralash_doctors/zoqiwm0vdhbukatuuc6s.jpg',
    availability: 'Mon, Tue, Thu, Fri (10:00 AM - 6:00 PM)',
    fee: 1650,
    bio: 'Dr. Patel combines microscopic trichoscopic analysis with robotic FUE hair transplants and bio-cellular PRP therapies to restore natural density.',
    languages: ['English', 'Hindi', 'Gujarati'],
    specializations: ['FUE Hair Transplants', 'Scalp PRP Therapy', 'Alopecia Areata Protocols', 'Female Pattern Thinning'],
    isAvailableToday: false,
  },
  {
    doctorId: 'dr-marcus-thornton',
    name: 'Dr. Marcus Thornton',
    title: 'Senior Consultant Orthodontist',
    department: 'Dental',
    qualifications: 'BDS, MOrth RCS (Eng), Diamond Invisalign Provider',
    experienceYears: 12,
    rating: 4.92,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
    availability: 'Wed, Thu, Fri (9:00 AM - 5:30 PM)',
    fee: 1400,
    bio: 'Recognized as a Premier Elite Invisalign provider in Bangalore, Dr. Thornton creates harmonious smiles without traditional wire braces.',
    languages: ['English', 'Spanish'],
    specializations: ['Clear Aligners (Invisalign)', 'Complex Malocclusion', 'Accelerated Orthodontics', 'Retention Systems'],
    isAvailableToday: true,
  },
  {
    doctorId: 'dr-elena-rostova',
    name: 'Dr. Elena Rostova',
    title: 'Consultant Aesthetic Dermatologist',
    department: 'Skin',
    qualifications: 'MD, Board Certified Aesthetic Medicine (BCAM)',
    experienceYears: 11,
    rating: 4.85,
    reviewCount: 220,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600',
    availability: 'Mon, Tue, Wed, Sat (9:00 AM - 4:00 PM)',
    fee: 1700,
    bio: 'Specializing in facial harmonisation, medical-grade chemical peels, and non-surgical thread lifting with subtle, natural, youthful results.',
    languages: ['English', 'Russian'],
    specializations: ['Facial Harmonisation', 'Dermal Fillers & Biostimulators', 'Hydrafacial MD', 'Collagen Induction Therapy'],
    isAvailableToday: true,
  },
  {
    doctorId: 'dr-julian-hayes',
    name: 'Dr. Julian Hayes',
    title: 'Consultant Trichology Surgeon & Hair Pathologist',
    department: 'Hair',
    qualifications: 'MB ChB, MRCS, Dipl. Hair Restoration Surgery',
    experienceYears: 15,
    rating: 4.91,
    reviewCount: 195,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    availability: 'Tue, Thu, Sat (10:00 AM - 5:00 PM)',
    fee: 1750,
    bio: 'Renowned expert in reconstructive hairline grafting, donor area preservation, and combination polynucleotide scalp therapies.',
    languages: ['English'],
    specializations: ['Direct Hair Implantation (DHI)', 'Eyebrow & Beard Restoration', 'Scalp Micropigmentation (SMP)', 'Polynucleotides'],
    isAvailableToday: false,
  },
  {
    doctorId: 'dr-kavita-sharma',
    name: 'Dr. Kavita Sharma',
    title: 'Specialist Endodontist & Restorative Dental Surgeon',
    department: 'Dental',
    qualifications: 'BDS, MDS Endodontics, MEndo RCS (Edin)',
    experienceYears: 13,
    rating: 4.89,
    reviewCount: 265,
    image: '/images/doctors/dr-kavita-sharma.jpg',
    availability: 'Mon, Wed, Fri, Sat (9:00 AM - 5:00 PM)',
    fee: 1450,
    bio: 'Dedicated to single-visit painless root canal therapy using surgical operating microscopes with a tooth preservation rate of 99.2%.',
    languages: ['English', 'Hindi'],
    specializations: ['Microscopic Root Canal', 'Dental Trauma Management', 'Tooth Re-treatment', 'Crown & Onlay Restorations'],
    isAvailableToday: true,
  },
];

// Helper to ensure an image is stored in Cloudinary only
const ensureCloudinaryImage = async (imageInput, file) => {
  // If file buffer is provided via Multer
  if (file && file.buffer) {
    return await uploadBufferToCloudinary(file.buffer, { folder: 'pralash_doctors' });
  }

  // If URL/path provided
  if (imageInput && typeof imageInput === 'string') {
    // If already hosted on Cloudinary, keep it
    if (imageInput.includes('res.cloudinary.com')) {
      return imageInput;
    }

    // Check if it's a relative local image path
    if (imageInput.startsWith('/')) {
      const candidatePaths = [
        path.resolve(__dirname, '../../../frontend/public', imageInput.replace(/^\//, '')),
        path.resolve(__dirname, '../../public', imageInput.replace(/^\//, '')),
      ];
      for (const p of candidatePaths) {
        if (fs.existsSync(p)) {
          return await uploadUrlToCloudinary(p, { folder: 'pralash_doctors' });
        }
      }
    }

    // Remote HTTP / HTTPS URL (Unsplash or external)
    if (imageInput.startsWith('http://') || imageInput.startsWith('https://')) {
      return await uploadUrlToCloudinary(imageInput, { folder: 'pralash_doctors' });
    }
  }

  // Fallback default avatar uploaded to Cloudinary
  return await uploadUrlToCloudinary(
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    { folder: 'pralash_doctors' }
  );
};

// @desc    Get all doctors with optional department filter & search
// @route   GET /api/doctors
// @access  Public
exports.getAllDoctors = async (req, res) => {
  try {
    const { department, search } = req.query;
    const query = {};

    if (department && department !== 'all') {
      query.department = department;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { specializations: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const doctors = await Doctor.find(query).sort({ rating: -1, experienceYears: -1 });

    return res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve doctors.',
      error: error.message,
    });
  }
};

// @desc    Get single doctor by doctorId or _id
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = id.startsWith('dr-')
      ? await Doctor.findOne({ doctorId: id })
      : await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching doctor.',
      error: error.message,
    });
  }
};

// @desc    Upload doctor photo directly to Cloudinary
// @route   POST /api/doctors/upload-image
// @access  Admin
exports.uploadDoctorImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided for upload.',
      });
    }

    const secureUrl = await uploadBufferToCloudinary(req.file.buffer, {
      folder: 'pralash_doctors',
    });

    return res.status(200).json({
      success: true,
      message: 'Doctor photo successfully stored in Cloudinary.',
      imageUrl: secureUrl,
    });
  } catch (error) {
    console.error('Cloudinary photo upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Cloudinary photo upload failed.',
      error: error.message,
    });
  }
};

// @desc    Add a new doctor (stores image in Cloudinary only)
// @route   POST /api/doctors
// @access  Admin
exports.createDoctor = async (req, res) => {
  try {
    const {
      name,
      title,
      department,
      qualifications,
      experienceYears,
      fee,
      bio,
      availability,
      languages,
      specializations,
      isAvailableToday,
    } = req.body;

    if (!name || !title || !department || !qualifications) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, title, department, and qualifications.',
      });
    }

    // Ensure image is uploaded and stored in Cloudinary only
    let cloudinaryImageUrl;
    try {
      cloudinaryImageUrl = await ensureCloudinaryImage(req.body.image, req.file);
    } catch (uploadErr) {
      console.error('Failed to upload doctor image to Cloudinary:', uploadErr);
      return res.status(500).json({
        success: false,
        message: 'Doctor image must be stored in Cloudinary, but the upload failed.',
        error: uploadErr.message,
      });
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const doctorId = req.body.doctorId || (slug.startsWith('dr-') ? slug : `dr-${slug}`);

    const doctor = new Doctor({
      doctorId,
      name,
      title,
      department,
      qualifications,
      experienceYears: Number(experienceYears) || 5,
      rating: 4.9,
      reviewCount: 50,
      image: cloudinaryImageUrl,
      availability: availability || 'Mon - Fri (9:30 AM - 5:30 PM)',
      fee: Number(fee) || 1500,
      bio: bio || `${name} is an experienced specialist at PRALASH Clinic.`,
      languages: Array.isArray(languages)
        ? languages
        : typeof languages === 'string'
        ? languages.split(',').map((s) => s.trim())
        : ['English', 'Hindi'],
      specializations: Array.isArray(specializations)
        ? specializations
        : typeof specializations === 'string'
        ? specializations.split(',').map((s) => s.trim())
        : [department],
      isAvailableToday: isAvailableToday !== undefined ? Boolean(isAvailableToday) : true,
    });

    const saved = await doctor.save();

    return res.status(201).json({
      success: true,
      message: 'Doctor successfully added with Cloudinary image storage.',
      data: saved,
    });
  } catch (error) {
    console.error('Error adding doctor:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add doctor.',
      error: error.message,
    });
  }
};

// @desc    Update doctor details (stores image in Cloudinary only)
// @route   PATCH /api/doctors/:id
// @access  Admin
exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };

    if (req.file || (req.body.image && !req.body.image.includes('res.cloudinary.com'))) {
      updateFields.image = await ensureCloudinaryImage(req.body.image, req.file);
    }

    const updated = await Doctor.findOneAndUpdate(
      id.startsWith('dr-') ? { doctorId: id } : { _id: id },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Doctor updated successfully.',
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update doctor.',
      error: error.message,
    });
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Admin
exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Doctor.findOneAndDelete(
      id.startsWith('dr-') ? { doctorId: id } : { _id: id }
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Doctor deleted successfully.',
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete doctor.',
      error: error.message,
    });
  }
};

// @desc    Seed all available doctors into MongoDB with Cloudinary image storage
// @route   POST /api/doctors/seed
// @access  Admin
exports.seedDoctors = async (req, res) => {
  try {
    console.log('Seeding doctors and uploading all images to Cloudinary...');

    // Upload each seed doctor's photo to Cloudinary
    const seededWithCloudinary = await Promise.all(
      SEED_DOCTORS.map(async (doc) => {
        try {
          const cloudinaryUrl = await ensureCloudinaryImage(doc.image);
          return {
            ...doc,
            image: cloudinaryUrl,
          };
        } catch (uploadError) {
          console.warn(`Cloudinary upload failed for ${doc.name}, using fallback:`, uploadError.message);
          return doc;
        }
      })
    );

    await Doctor.deleteMany({});
    const inserted = await Doctor.insertMany(seededWithCloudinary);

    return res.status(200).json({
      success: true,
      message: `Successfully seeded ${inserted.length} doctors into MongoDB with Cloudinary storage.`,
      count: inserted.length,
      data: inserted,
    });
  } catch (error) {
    console.error('Error seeding doctors with Cloudinary:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to seed doctors into MongoDB.',
      error: error.message,
    });
  }
};
