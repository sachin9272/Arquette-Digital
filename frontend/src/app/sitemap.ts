import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/data/clinicData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arquetteclinic.com';

  const staticPages = [
    '',
    '/about',
    '/doctors',
    '/services',
    '/services/dental',
    '/services/skin',
    '/services/hair',
    '/booking',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.startsWith('/services') || route === '/booking' ? 0.9 : 0.8,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
