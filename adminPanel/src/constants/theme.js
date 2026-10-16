export const SERVER_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
export const FRONTEND_URL = (import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');

export const API_BASE = `${SERVER_BASE}/api/appointments`;
export const DOCTOR_API = `${SERVER_BASE}/api/doctors`;
export const THEME_API = `${SERVER_BASE}/api/theme`;
export const BLOG_API = `${SERVER_BASE}/api/blogs`;

export const CLINIC_THEMES = [
  {
    id: 'clinical',
    name: 'Clinical Teal (Official Pralash Default)',
    tagline: 'Modern clinical precision with restorative surgical teal and soothing cyan.',
    primaryColor: '#0D5C75',
    secondaryColor: '#14B8A6',
    accentColor: '#0284C7',
    badge: 'Standard Clinic Theme',
    previewBg: '#F8FAFC',
    textColor: '#0F172A',
  },
  {
    id: 'emerald',
    name: 'Nordic Emerald',
    tagline: 'Soothing organic eucalyptus tone, tailored for holistic wellness and trichology.',
    primaryColor: '#064E3B',
    secondaryColor: '#10B981',
    accentColor: '#34D399',
    badge: 'Holistic & Scalp',
    previewBg: '#F0FDF4',
    textColor: '#064E3B',
  },
  {
    id: 'sapphire',
    name: 'Royal Sapphire',
    tagline: 'Authoritative deep navy and vibrant azure for high-precision surgical excellence.',
    primaryColor: '#1E3A8A',
    secondaryColor: '#3B82F6',
    accentColor: '#60A5FA',
    badge: 'High-Tech Surgery',
    previewBg: '#EFF6FF',
    textColor: '#1E3A8A',
  },
  {
    id: 'rose',
    name: 'Aesthetic Rose Gold',
    tagline: 'Luxury aesthetic dermatology, anti-aging cosmetology, and gentle skin rejuvenation.',
    primaryColor: '#831843',
    secondaryColor: '#F43F5E',
    accentColor: '#FB7185',
    badge: 'Cosmetic & Skin Care',
    previewBg: '#FFF1F2',
    textColor: '#831843',
  },
  {
    id: 'dark',
    name: 'Midnight Obsidian',
    tagline: 'Sleek nocturnal contrast with glowing surgical cyan and restorative teal.',
    primaryColor: '#090D16',
    secondaryColor: '#06B6D4',
    accentColor: '#38BDF8',
    badge: 'Dark Mode UI',
    previewBg: '#090D16',
    textColor: '#F8FAFC',
  },
];

export const formatTableDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = Number(parts[0]);
      const month = Number(parts[1]) - 1;
      const day = Number(parts[2]);
      const d = new Date(year, month, day);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
};

export const getInitials = (name) => {
  if (!name) return 'PT';
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || '')
    .join('');
};
