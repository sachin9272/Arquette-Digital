import { CLINIC_INFO, DOCTORS, ALL_SERVICES_CATALOG, DENTAL_SERVICE, SKIN_SERVICE, HAIR_SERVICE } from '@/data/clinicData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  actionLink?: {
    label: string;
    url: string;
  };
  doctorCard?: {
    id: string;
    name: string;
    title: string;
    image: string;
    fee: number;
    department: string;
  };
}

// Diagnostic and medical recommendation trigger keywords that MUST trigger safety guardrail
const DIAGNOSTIC_KEYWORDS = [
  'diagnose', 'diagnosis', 'do i have', 'am i having', 'cancer', 'tumor', 'melanoma',
  'infection', 'what medicine', 'prescribe', 'prescription', 'antibiotic', 'painkiller',
  'is it dangerous', 'symptoms of', 'cure my', 'treat my disease', 'why is my skin peeling off',
  'blood in spit', 'lump in neck', 'rash is spreading'
];

export function processHealthcareQuery(query: string): ChatMessage {
  const lower = query.toLowerCase().trim();
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const msgId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

  // 1. SAFETY & MEDICAL NON-DIAGNOSIS GUARDRAIL
  const isDiagnostic = DIAGNOSTIC_KEYWORDS.some((kw) => lower.includes(kw));
  if (isDiagnostic) {
    return {
      id: msgId,
      sender: 'bot',
      text: `⚠️ **Medical Safety Advisory**: As an AI clinical assistant, I am strictly programmed **not to provide diagnoses, clinical assessments, or personalized medication recommendations**.\n\nMedical conditions require an in-person physical examination by a certified physician or surgeon.\n\nWould you like to schedule a confidential in-person evaluation with one of our specialists at our clinic in Kalyan Nagar?`,
      timestamp: now,
      actionLink: {
        label: 'Book Clinical Consultation',
        url: '/booking',
      },
      quickReplies: ['View Our Doctors', 'Clinic Timings', 'Call Emergency Desk'],
    };
  }

  // 2. CLINIC TIMINGS & HOURS
  if (
    lower.includes('timing') ||
    lower.includes('hours') ||
    lower.includes('open') ||
    lower.includes('sunday') ||
    lower.includes('weekend') ||
    lower.includes('time') ||
    lower.includes('schedule')
  ) {
    return {
      id: msgId,
      sender: 'bot',
      text: `🕒 **PRALASH Clinic Operating Hours**:\n\n• **${CLINIC_INFO.operatingHours}**\n• We are open **all 7 days a week** for your convenience.\n\nAppointments can be booked in advance or walk-ins are welcomed during clinical hours.`,
      timestamp: now,
      actionLink: {
        label: 'Schedule an Appointment',
        url: '/booking',
      },
      quickReplies: ['Clinic Location', 'Our Doctors', 'Hair Treatments', 'Dental Care'],
    };
  }

  // 3. CLINIC LOCATION, ADDRESS & TRANSIT
  if (
    lower.includes('location') ||
    lower.includes('address') ||
    lower.includes('where') ||
    lower.includes('direction') ||
    lower.includes('reach') ||
    lower.includes('metro') ||
    lower.includes('parking') ||
    lower.includes('map')
  ) {
    return {
      id: msgId,
      sender: 'bot',
      text: `📍 **PRALASH Clinic Location**:\n\n**${CLINIC_INFO.legalName}**\n${CLINIC_INFO.address.street}, ${CLINIC_INFO.address.city} – ${CLINIC_INFO.address.postcode}.\n\n• **Transit:** Nearest metro stations are Baiyappanahalli & Swami Vivekananda Road (Purple Line).\n• **Bus Hub:** Kalyan Nagar Bus Depot is a 2-minute walk.\n• **Parking:** Dedicated on-site patient parking with valet support.\n• **Phone:** ${CLINIC_INFO.phone}`,
      timestamp: now,
      actionLink: {
        label: 'Open Contact & Directions Page',
        url: '/contact',
      },
      quickReplies: ['Book Visit', 'Clinic Timings', 'Consultation Fees'],
    };
  }

  // 4. APPOINTMENT BOOKING GUIDANCE
  if (
    lower.includes('book') ||
    lower.includes('appointment') ||
    lower.includes('consultation') ||
    lower.includes('schedule') ||
    lower.includes('reserve') ||
    lower.includes('slot')
  ) {
    return {
      id: msgId,
      sender: 'bot',
      text: `📅 **Book an Appointment at PRALASH**:\n\nYou can book your appointment online in under 2 minutes through our interactive booking engine.\n\n1. Select your specialty (Dental, Skin, or Hair)\n2. Choose your preferred specialist\n3. Pick your preferred date and time slot\n\nYou will receive immediate SMS & email confirmation.`,
      timestamp: now,
      actionLink: {
        label: 'Launch Booking Engine',
        url: '/booking',
      },
      quickReplies: ['Our Doctors', 'Treatment Prices', 'Clinic Timings'],
    };
  }

  // 5. SPECIFIC DOCTORS SEARCH
  const matchedDoctor = DOCTORS.find((d) => lower.includes(d.name.toLowerCase()) || lower.includes(d.name.toLowerCase().replace('dr. ', '')));
  if (matchedDoctor) {
    return {
      id: msgId,
      sender: 'bot',
      text: `👨‍⚕️ **${matchedDoctor.name}**\n**${matchedDoctor.title} (${matchedDoctor.department} Care)**\n\n• **Qualifications:** ${matchedDoctor.qualifications}\n• **Experience:** ${matchedDoctor.experienceYears}+ Years\n• **Rating:** ${matchedDoctor.rating}★ (${matchedDoctor.reviewCount} reviews)\n• **Consultation Fee:** ₹${matchedDoctor.fee.toLocaleString('en-IN')}\n• **Availability:** ${matchedDoctor.availability}\n\n*${matchedDoctor.bio}*`,
      timestamp: now,
      actionLink: {
        label: `Book with ${matchedDoctor.name}`,
        url: `/booking?doctor=${matchedDoctor.id}`,
      },
      doctorCard: {
        id: matchedDoctor.id,
        name: matchedDoctor.name,
        title: matchedDoctor.title,
        image: matchedDoctor.image,
        fee: matchedDoctor.fee,
        department: matchedDoctor.department,
      },
      quickReplies: ['View All Doctors', 'Dental Services', 'Skin Services', 'Hair Services'],
    };
  }

  // General "Doctors" / "Specialists" query
  if (lower.includes('doctor') || lower.includes('specialist') || lower.includes('physician') || lower.includes('dentist') || lower.includes('dermatologist')) {
    const list = DOCTORS.slice(0, 4)
      .map((d) => `• **${d.name}** – ${d.title} (Fee: ₹${d.fee.toLocaleString('en-IN')})`)
      .join('\n');

    return {
      id: msgId,
      sender: 'bot',
      text: `👨‍⚕️ **PRALASH Senior Clinical Faculty**:\n\n${list}\n\nAll our consultants have 10–22+ years of hospital-grade clinical experience across Bangalore and international medical boards.`,
      timestamp: now,
      actionLink: {
        label: 'Browse All Doctors & Profiles',
        url: '/doctors',
      },
      quickReplies: ['Dr. Marcus Thornton', 'Dr. Priya Nair', 'Dr. Kavita Sharma', 'Book Appointment'],
    };
  }

  // 6. HAIR RESTORATION & GFC / PRP
  if (
    lower.includes('hair') ||
    lower.includes('gfc') ||
    lower.includes('prp') ||
    lower.includes('fue') ||
    lower.includes('transplant') ||
    lower.includes('bald') ||
    lower.includes('alopecia')
  ) {
    return {
      id: msgId,
      sender: 'bot',
      text: `💇 **PRALASH Hair Restoration & Trichology Center**:\n\n• **Bio-Sapphire Micro-FUE Hair Transplant:** from ₹45,000 (direct hair implantation, natural hairline)\n• **Growth Factor Concentrate (GFC):** from ₹7,500 (3x higher growth factor yield than standard PRP)\n• **Autologous Scalp PRP:** from ₹5,500\n• **Scalp Micropigmentation (SMP):** from ₹15,000\n• **Digital Trichoscopy Diagnostics:** ₹2,500\n\nAll procedures are performed by certified ISHRS medical surgeons.`,
      timestamp: now,
      actionLink: {
        label: 'Explore Hair Treatments',
        url: '/services/hair',
      },
      quickReplies: ['GFC vs PRP Info', 'Book Hair Consultation', 'Our Trichologists'],
    };
  }

  // 7. DENTAL TREATMENTS, IMPLANTS, ALIGNERS & RCT
  if (
    lower.includes('dental') ||
    lower.includes('teeth') ||
    lower.includes('tooth') ||
    lower.includes('implant') ||
    lower.includes('aligner') ||
    lower.includes('invisalign') ||
    lower.includes('root canal') ||
    lower.includes('rct') ||
    lower.includes('braces') ||
    lower.includes('whitening')
  ) {
    return {
      id: msgId,
      sender: 'bot',
      text: `🦷 **PRALASH Dentique Services & Pricing**:\n\n• **3D-Guided Titanium Dental Implants:** from ₹35,000\n• **Invisalign & Clear Aligners:** from ₹75,000\n• **Handcrafted Porcelain Veneers / E-Max:** from ₹15,000/tooth\n• **Painless Single-Sitting Laser RCT:** from ₹7,500\n• **Philips Zoom Laser Teeth Whitening:** from ₹8,000\n• **Deep Ultrasonic Periodontal Hygiene:** from ₹2,500\n\nEquipped with Carl Zeiss microscopes, digital RVG, and computerized painless wand anesthesia.`,
      timestamp: now,
      actionLink: {
        label: 'View Dental Services',
        url: '/services/dental',
      },
      quickReplies: ['Clear Aligners Info', 'Dental Implants', 'Book Dental Visit'],
    };
  }

  // 8. SKIN, HYDRAFACIAL, ACNE & COSMELAN
  if (
    lower.includes('skin') ||
    lower.includes('hydrafacial') ||
    lower.includes('acne') ||
    lower.includes('scar') ||
    lower.includes('peel') ||
    lower.includes('cosmelan') ||
    lower.includes('glow') ||
    lower.includes('facial') ||
    lower.includes('botox') ||
    lower.includes('laser')
  ) {
    return {
      id: msgId,
      sender: 'bot',
      text: `✨ **PRALASH Dermystique Skin & Laser Care**:\n\n• **HydraFacial Elite MD®:** from ₹4,500 (instant glow, zero downtime)\n• **Fractional CO2 Laser Resurfacing:** from ₹9,500 (deep acne scars)\n• **Medical Acne Eradication Protocol:** from ₹3,500\n• **Cosmelan® Depigmentation & Melasma Kit:** from ₹18,000\n• **Profhilo® Bio-Remodelling & Skin Boosters:** from ₹16,000\n• **Carbon Laser Peel (Hollywood Glow):** from ₹4,500\n\nAll laser treatments use US FDA approved platforms administered by certified dermatologists.`,
      timestamp: now,
      actionLink: {
        label: 'View Skin Treatments',
        url: '/services/skin',
      },
      quickReplies: ['HydraFacial Info', 'Acne Scar Treatments', 'Book Skin Doctor'],
    };
  }

  // 9. GENERAL PRICING & COST QUERY
  if (lower.includes('cost') || lower.includes('price') || lower.includes('fee') || lower.includes('rate') || lower.includes('rupee')) {
    return {
      id: msgId,
      sender: 'bot',
      text: `💳 **PRALASH Treatment Starting Prices (in INR ₹)**:\n\n• **Doctor Specialist Consultation:** ₹1,200 – ₹1,500\n• **HydraFacial Elite MD:** from ₹4,500\n• **GFC Hair Growth Therapy:** from ₹7,500\n• **Bio-Sapphire FUE Hair Transplant:** from ₹45,000\n• **Single-Sitting Laser RCT:** from ₹7,500\n• **3D-Guided Dental Implant:** from ₹35,000\n• **Invisalign Clear Aligners:** from ₹75,000\n\nWe provide 0% interest EMI options and cashless insurance assistance for eligible treatments.`,
      timestamp: now,
      actionLink: {
        label: 'View Full Services Catalog',
        url: '/services',
      },
      quickReplies: ['Hair Pricing', 'Dental Pricing', 'Book Appointment'],
    };
  }

  // 10. GREETINGS
  if (lower === 'hi' || lower === 'hello' || lower === 'hey' || lower.includes('good morning') || lower.includes('good evening')) {
    return {
      id: msgId,
      sender: 'bot',
      text: `Hello! 👋 Welcome to **PRALASH Dermystique & Dentique**.\n\nI am your AI Healthcare Assistant. How can I assist you today?\n\n• Ask about our **Dental, Skin, or Hair services**\n• Check **clinic timings & directions** in Kalyan Nagar\n• Learn about our **doctors & fees**\n• Or **book an appointment** in under 2 minutes.`,
      timestamp: now,
      quickReplies: ['Clinic Timings & Location', 'Our Doctors', 'Hair Treatments', 'Book an Appointment'],
    };
  }

  // 11. FALLBACK / UNANSWERABLE QUERY (HANDLES WITHOUT INVENTING MEDICAL INFORMATION)
  return {
    id: msgId,
    sender: 'bot',
    text: `Thank you for reaching out. To ensure complete medical accuracy and patient safety, I only share verified clinic protocols and administrative information.\n\nFor questions requiring personalized clinical evaluation or specific administrative inquiries not listed in our catalog, please contact our clinic team directly:\n\n• **Phone:** ${CLINIC_INFO.phone}\n• **Email:** ${CLINIC_INFO.email}\n• **Clinic Desk:** Block 1, HRBR Layout, Kalyan Nagar, Bengaluru\n\nWould you like to schedule an in-person consultation with one of our specialists?`,
    timestamp: now,
    actionLink: {
      label: 'Book Consultation',
      url: '/booking',
    },
    quickReplies: ['Our Doctors', 'Services & Prices', 'Clinic Timings', 'Contact Information'],
  };
}
