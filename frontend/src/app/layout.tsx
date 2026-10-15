import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { CLINIC_INFO } from '@/data/clinicData';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';
import { HealthcareChatbot } from '@/components/clinic/HealthcareChatbot';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0A1E34',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://pralash.com'),
  title: {
    default: `${CLINIC_INFO.name} | Advanced Multi-Speciality Medical Care`,
    template: `%s | ${CLINIC_INFO.name}`,
  },
  description:
    'PRALASH Dermystique & Dentique multi-speciality healthcare clinic in HRBR Layout, Kalyan Nagar, Bengaluru. Specialized clinical care across Cosmetic Dentistry, Medical Dermatology, Trichology, and Hair Restoration.',
  keywords: [
    'PRALASH Dermystique & Dentique',
    'Dental clinic Kalyan Nagar Bangalore',
    'Best skin clinic HRBR Layout',
    'Hair transplant clinic Bangalore',
    'GFC hair treatment Bengaluru',
    'Invisalign clear aligners Bangalore',
    'Painless root canal Bengaluru',
    'HydraFacial Bangalore',
  ],
  authors: [{ name: 'PRALASH Dermystique & Dentique Clinical Board' }],
  creator: 'Arquette Digital',
  publisher: 'PRALASH Dermystique & Dentique',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${CLINIC_INFO.name} | Advanced Dental, Skin & Hair Clinic Bangalore`,
    description:
      'Pioneering diagnostic accuracy and specialized treatments across Dental, Dermatology, and Hair Restoration in HRBR Layout, Kalyan Nagar, Bengaluru.',
    url: 'https://pralash.com',
    siteName: CLINIC_INFO.name,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'PRALASH Dermystique & Dentique Bengaluru',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${CLINIC_INFO.name} | Advanced Dental, Skin & Hair Clinic Bangalore`,
    description:
      'Pioneering diagnostic accuracy and specialized treatments across Dental, Dermatology, and Hair Restoration in HRBR Layout, Kalyan Nagar, Bengaluru.',
    images: ['https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="clinical" className={plusJakartaSans.variable}>
      <head>
        <SEOJsonLd type="Clinic" />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-background text-brand-text antialiased selection:bg-brand-secondary selection:text-white">
        <ThemeProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <HealthcareChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
