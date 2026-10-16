import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { BLOG_POSTS, DOCTORS } from '@/data/clinicData';
import { BlogPost } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    const res = await fetch(`${apiBase}/api/blogs/${slug}`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        if (d.isActive === false) return null;
        return {
          id: d.blogId || d.id || d._id,
          slug: d.slug,
          title: d.title,
          excerpt: d.excerpt,
          content: d.content || [],
          department: d.department,
          authorName: d.authorName,
          authorRole: d.authorRole,
          authorImage: d.authorImage,
          readTime: d.readTime || '5 min read',
          publishedDate: d.publishedDate,
          coverImage: d.coverImage,
          tags: d.tags || [],
          isActive: d.isActive ?? true,
        };
      }
    }
  } catch {
    // fallback
  }

  const staticPost = BLOG_POSTS.find((p) => p.slug === slug);
  if (staticPost && staticPost.isActive !== false) {
    return staticPost;
  }
  return null;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.title} | Arquette Patient Education`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id && p.department === post.department && p.isActive !== false).slice(0, 2);
  const authorDoctor = DOCTORS.find((d) => d.name === post.authorName);

  return (
    <div className="w-full flex flex-col py-12 lg:py-16">
      <SEOJsonLd
        type="Clinic"
        data={{
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: post.coverImage,
          datePublished: post.publishedDate,
          author: {
            '@type': 'Person',
            name: post.authorName,
            jobTitle: post.authorRole,
          },
        }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumb Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-secondary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Patient Guides</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <Badge variant="secondary" size="md">
            {post.department} Care Guide
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-primary tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author & Meta bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-brand-border/60">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-brand-border">
                <Image
                  src={post.authorImage}
                  alt={post.authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-brand-text">{post.authorName}</div>
                <div className="text-xs text-brand-muted">{post.authorRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-brand-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-secondary" />
                <span>{post.publishedDate}</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-secondary" />
                <span>{post.readTime}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-brand-border mb-12">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none space-y-6 text-brand-text leading-relaxed text-base sm:text-lg">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-brand-text/90">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-8 mt-10 border-t border-brand-border/60">
          <span className="text-xs font-bold text-brand-muted uppercase mr-2">Topics:</span>
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-brand-surface-low border border-brand-border text-brand-text font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Card & Direct Consult CTA */}
        {authorDoctor && (
          <div className="mt-12 p-8 rounded-3xl bg-brand-surface border border-brand-border shadow-xs flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-brand-secondary">
              <Image
                src={authorDoctor.image}
                alt={authorDoctor.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left space-y-2">
              <span className="text-[10px] uppercase font-bold text-brand-secondary tracking-widest">
                Article Medical Reviewer
              </span>
              <h3 className="text-xl font-bold text-brand-text">{authorDoctor.name}</h3>
              <p className="text-xs text-brand-muted line-clamp-2">{authorDoctor.bio}</p>
            </div>
            <Link href={`/booking?doctor=${authorDoctor.id}`} className="shrink-0">
              <Button variant="secondary" size="sm">
                Book with {authorDoctor.name.split(' ')[1]}
              </Button>
            </Link>
          </div>
        )}

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-brand-border/60 space-y-6">
            <h3 className="text-xl font-bold text-brand-primary">Related Clinical Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="p-5 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-secondary/40 transition-colors group"
                >
                  <span className="text-xs font-bold text-brand-secondary">{rel.department}</span>
                  <h4 className="text-base font-bold text-brand-text group-hover:text-brand-secondary transition-colors mt-1">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-brand-muted line-clamp-2 mt-2">{rel.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
