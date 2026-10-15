import React from 'react';
import { CLINIC_INFO } from '@/data/clinicData';

interface SEOJsonLdProps {
  type?: 'Clinic' | 'MedicalProcedure' | 'Physician' | 'FAQPage';
  data?: Record<string, unknown>;
}

export const SEOJsonLd: React.FC<SEOJsonLdProps> = ({ type = 'Clinic', data = {} }) => {
  let schema: Record<string, unknown> = {};

  if (type === 'Clinic') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'MedicalClinic',
      name: CLINIC_INFO.name,
      legalName: CLINIC_INFO.legalName,
      description: CLINIC_INFO.description,
      url: 'https://arquetteclinic.com',
      telephone: CLINIC_INFO.phone,
      emergencyTelephone: CLINIC_INFO.emergencyPhone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CLINIC_INFO.address.street,
        addressLocality: CLINIC_INFO.address.city,
        postalCode: CLINIC_INFO.address.postcode,
        addressCountry: CLINIC_INFO.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '13.0175162',
        longitude: '77.6417083',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:30',
          closes: '20:00',
        },
      ],
      medicalSpecialty: [
        'Dentistry',
        'Dermatology',
        'Hair Restoration',
        'Internal Medicine',
      ],
      hasMap: 'https://maps.google.com/?q=PRALASH+Dermystique+Dentique+HRBR+Layout+Kalyan+Nagar+Bengaluru',
      ...data,
    };
  } else if (type === 'FAQPage' && data.faqs) {
    const faqs = data.faqs as { question: string; answer: string }[];
    schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  } else {
    schema = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
