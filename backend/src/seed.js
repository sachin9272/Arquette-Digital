import 'dotenv/config';
import mongoose from 'mongoose';
import Appointment from './models/Appointment.js';

const DUMMY_APPOINTMENTS = [
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
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
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
    appointmentDate: new Date().toISOString().split('T')[0], // Today
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
    appointmentDate: new Date().toISOString().split('T')[0], // Today
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
    appointmentDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
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
    appointmentDate: new Date().toISOString().split('T')[0], // Today
    timeSlot: '04:30 PM',
    symptomsOrNotes: 'Acute sensitivity to cold liquids on lower right premolar with throbbing pain.',
    consultationFee: 1400,
    status: 'confirmed',
    paymentStatus: 'pay_at_clinic',
  },
];

async function seedDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pralash_clinic';

  console.log(`Connecting to MongoDB at: ${uri}...`);
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

  console.log('Clearing existing sample appointments...');
  await Appointment.deleteMany({});

  console.log(`Inserting ${DUMMY_APPOINTMENTS.length} realistic clinical appointments...`);
  const inserted = await Appointment.insertMany(DUMMY_APPOINTMENTS);

  console.log(`✅ Successfully seeded ${inserted.length} appointments into MongoDB!`);
  process.exit(0);
}

seedDatabase().catch((err) => {
  console.error('❌ Seeding failed:', err.message);
  process.exit(1);
});
