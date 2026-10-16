export interface HomepageFAQ {
  id: string;
  category: 'Dental' | 'Dermatology' | 'Hair' | 'General & Fees';
  question: string;
  answer: string;
}

export const HOMEPAGE_FAQS: HomepageFAQ[] = [
  {
    id: 'faq-location-hours',
    category: 'General & Fees',
    question: 'Where is PRALASH Clinic located in Bangalore and what are the consultation hours?',
    answer: 'PRALASH Dermystique & Dentique is located at Block 1, 708, 3rd Cross Rd, HRBR Layout 1st Block, Kalyan Nagar, Bengaluru 560043 (near Kalyan Nagar Bus Depot and CMR Main Road). We are open all 7 days a week from 9:30 AM to 8:00 PM for scheduled consultations and emergency triage.',
  },
  {
    id: 'faq-dental-implants-cost',
    category: 'Dental',
    question: 'What is the starting price for 3D-guided dental implants and Invisalign clear aligners?',
    answer: 'Single-tooth 3D computer-guided titanium dental implants start from ₹35,000, which includes digital planning and surgical placement. Invisalign® Clear Aligners typically range from ₹75,000 depending on tooth crowding complexity. We offer transparent treatment estimates and 0% interest EMI options.',
  },
  {
    id: 'faq-emergency-appointments',
    category: 'Dental',
    question: 'Can I get a same-day emergency dentist appointment for acute tooth pain in Kalyan Nagar?',
    answer: 'Yes. We reserve daily emergency priority appointments for acute pulpitis toothaches, broken or knocked-out teeth, lost crowns, and facial dental trauma. You can contact our emergency triage desk immediately at +91 99005 17699 for prompt same-day relief.',
  },
  {
    id: 'faq-acne-scar-lasers',
    category: 'Dermatology',
    question: 'Which medical laser treatments are best for deep acne scars and stubborn melasma?',
    answer: 'Our certified clinical dermatologists utilize multi-modal protocols including Fractional CO2 Laser Resurfacing for rolling and boxcar scars, TCA CROSS for icepick scars, and subcision paired with polynucleotide bio-stimulators. For hormonal melasma, we provide world-standard Cosmelan® depigmentation protocols.',
  },
  {
    id: 'faq-hair-transplant-fue',
    category: 'Hair',
    question: 'How does Bio-Sapphire Micro-FUE Hair Restoration work and what is the recovery time?',
    answer: 'Bio-Sapphire FUE utilizes medical-grade sapphire mineral blades (<0.8mm) to create precise micro-channels in the thinning areas. This guarantees zero linear scars, preserves tissue vascularity, achieves up to 98% graft survival, and enables patients to resume light office work within 3 to 5 days.',
  },
  {
    id: 'faq-insurance-emi',
    category: 'General & Fees',
    question: 'Do you accept health insurance (Mediclaim) and offer 0% interest EMI financing?',
    answer: 'Yes. We provide complete paperwork assistance for cashless Mediclaim and reimbursement claims across eligible maxillofacial surgery, oral cyst removals, trauma reconstructive care, and medical dermatology. Additionally, we partner with leading healthcare financial providers to offer no-cost EMI plans with instant digital approval.',
  },
  {
    id: 'faq-doctors-credentials',
    category: 'General & Fees',
    question: 'Who will perform my procedures and what are the doctors’ qualifications?',
    answer: 'Every diagnostic assessment and surgical procedure is conducted exclusively by senior medical faculty with 12+ to 19+ years of clinical specialization. Our doctors hold advanced degrees (MDS, MD, FRCP, FISHR, BDS) and are accredited members of CDSI, ISHRS, and the Dental Council of India.',
  },
  {
    id: 'faq-appointment-booking',
    category: 'General & Fees',
    question: 'How do I book an appointment with a specialist at PRALASH Bangalore?',
    answer: 'You can book directly through our 24/7 Digital Booking Portal on this website in under 2 minutes, choose your preferred consultant and time slot, consult our interactive AI Care Assistant, or call our desk at +91 99005 17699.',
  },
];



