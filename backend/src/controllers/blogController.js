import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import { uploadBufferToCloudinary, uploadUrlToCloudinary } from '../config/cloudinary.js';

export const SEED_BLOGS = [
  {
    blogId: 'blog-1',
    slug: 'clear-aligners-vs-traditional-braces-guide',
    title: 'Clear Aligners vs. Traditional Braces: What Specialist Orthodontists Want You to Know',
    excerpt: 'Discover the clinical differences, wear-time discipline, and aesthetic considerations when deciding between Invisalign and ceramic braces.',
    department: 'Dental',
    authorName: 'Dr. Marcus Thornton',
    authorRole: 'Senior Consultant Orthodontist',
    authorImage: 'https://res.cloudinary.com/dcahokqjx/image/upload/v1792093446/pralash_doctors/tfggij5mtti0qf8ccosu.jpg',
    readTime: '5 min read',
    publishedDate: 'October 10, 2026',
    coverImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1000',
    tags: ['Orthodontics', 'Invisalign', 'Digital Smile Design'],
    isActive: true,
    content: [
      'For decades, metal brackets and archwires were the sole method to resolve complex malocclusion. However, advancements in thermoplastic polyurethanes have revolutionized orthodontics.',
      'Clear aligners work via a sequence of digitally rendered custom trays that exert gentle, continuous micro-forces. Because the aligners are removable for meals and brushing, periodontal inflammation is significantly reduced compared to fixed brackets.',
      'Key clinical consideration: Patient compliance is critical. For optimal results, clear aligners must be worn 22 hours per day. Those who cannot commit to this rhythm may achieve more predictable results with aesthetic ceramic fixed appliances.'
    ]
  },
  {
    blogId: 'blog-2',
    slug: 'post-summer-melasma-and-pigmentation-reversal',
    title: 'Post-Summer Melasma & Hyperpigmentation: Clinical Laser vs. Chemical Exfoliation',
    excerpt: 'Why heat and UV trigger deep dermal pigment in Indian skin types, and the dual-step protocol dermatologists rely on to reverse sun spots safely.',
    department: 'Skin',
    authorName: 'Dr. Premalatha V.',
    authorRole: 'Co-Founder & Chief Consultant Dermatologist',
    authorImage: 'https://res.cloudinary.com/dcahokqjx/image/upload/v1792093445/pralash_doctors/gwzgfenkpsssgp72oal0.jpg',
    readTime: '6 min read',
    publishedDate: 'October 02, 2026',
    coverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000',
    tags: ['Dermatology', 'Melasma', 'Q-Switched Laser', 'Skin Brightening'],
    isActive: true,
    content: [
      'Ultraviolet radiation directly stimulates melanocytes, but many patients are unaware that infrared heat alone can cause melasma rebound. In tropical climates like Bangalore, clinical clinics see a surge in rebound pigmentation following warm seasons.',
      'To address this without triggering post-inflammatory hyperpigmentation (PIH), we apply a bi-phasic approach: first, topically quieting tyrosinase enzymes using tranexamic acid, azelaic acid, and glutathione, followed by gentle fractional Q-switched Nd:YAG laser passes.',
      'Patients must remember that broad-spectrum physical sunscreen containing zinc oxide and iron oxides is essential to shield against visible blue light emitted by indoor monitors and atmospheric daylight.'
    ]
  },
  {
    blogId: 'blog-3',
    slug: 'understanding-early-hair-shedding-prp-treatments',
    title: 'Telogen Effluvium vs. Androgenetic Thinning: When is PRP Truly Effective?',
    excerpt: 'Not all hair shedding is permanent baldness. Learn how trichoscopic diagnostics determine the exact cause of thinning hair and when cellular therapy works.',
    department: 'Hair',
    authorName: 'Dr. Priya Patel',
    authorRole: 'Lead Trichologist & Hair Restoration Surgeon',
    authorImage: 'https://res.cloudinary.com/dcahokqjx/image/upload/v1792093429/pralash_doctors/zoqiwm0vdhbukatuuc6s.jpg',
    readTime: '7 min read',
    publishedDate: 'September 24, 2026',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000',
    tags: ['Trichology', 'Hair Loss', 'GFC Therapy', 'Scalp PRP'],
    isActive: true,
    content: [
      'Differentiating between diffuse hair shedding (telogen effluvium) and progressive miniaturization (androgenetic alopecia) requires microscopic examination of the scalp. Viewing hair shafts under 70x magnification reveals caliber variability indicative of DHT sensitivity.',
      'Platelet-Rich Plasma (PRP) and Growth Factor Concentrate (GFC) are highly potent when hair follicles are miniaturized yet still vascularized. PRP infuses PDGF, VEGF, and TGF-beta into the dermal papilla, stimulating anagen phase transition.',
      'If a follicle has been dormant for over four to five years, surgical Bio-Sapphire FUE grafting represents the clinically verified solution for regaining natural hairline density.'
    ]
  },
  {
    blogId: 'blog-4',
    slug: 'what-to-expect-during-dental-implant-surgery',
    title: '3D Guided Surgery: What Truly Happens During a Modern Dental Implant Procedure',
    excerpt: 'Demystifying surgical dental implants: from 3D CBCT computer planning to painless single-visit titanium placement and ceramic crown restoration.',
    department: 'Dental',
    authorName: 'Prof. Dr. Lalith V. Anand',
    authorRole: 'Senior Periodontist & Global Implantology Mentor',
    authorImage: 'https://res.cloudinary.com/dcahokqjx/image/upload/v1792093447/pralash_doctors/yifa1qbkcw2qxaaoknrz.jpg',
    readTime: '4 min read',
    publishedDate: 'September 15, 2026',
    coverImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000',
    tags: ['Implantology', '3D CBCT', 'Full Mouth Rehab', 'Oral Surgery'],
    isActive: true,
    content: [
      'Modern implant dentistry has transitioned completely into virtual planning. Using 3D CBCT scans, we fabricate a micro-surgical guide that ensures millimeter-exact angle and depth of insertion.',
      'The placement itself takes approximately 20 to 30 minutes under gentle computer-controlled local anesthesia. Medical-grade titanium creates a biological bond called osseointegration with surrounding alveolar bone cells over 8 to 12 weeks.',
      'Once fused, the implant acts as a permanent prosthetic root, capable of bearing the identical bite force of a natural adult molar without harming adjacent healthy teeth.'
    ]
  },
  {
    blogId: 'blog-5',
    slug: 'mole-checks-and-early-melanoma-detection',
    title: "The ABCDE Rule of Skin Checks: A Dermatologist's Guide to Mole Health",
    excerpt: 'How to identify dysplastic moles at home, when to book a dermatoscope screening, and why early detection is 99% curable.',
    department: 'Skin',
    authorName: 'Dr. Premalatha V.',
    authorRole: 'Co-Founder & Chief Consultant Dermatologist',
    authorImage: 'https://res.cloudinary.com/dcahokqjx/image/upload/v1792093445/pralash_doctors/gwzgfenkpsssgp72oal0.jpg',
    readTime: '5 min read',
    publishedDate: 'August 28, 2026',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
    tags: ['Dermatology', 'Mole Check', 'Skin Health', 'Dermoscopy'],
    isActive: true,
    content: [
      'Skin changes are one of the few health concerns visible with the naked eye. Remembering the ABCDE rule can save lives: Asymmetry, Border irregularity, Color variegation, Diameter over 6mm, and Evolution over time.',
      'Automated total body mapping captures every lesion in calibrated digital microscopy, alerting the clinician to fractional alterations imperceptible to casual inspection.',
      'We recommend an annual full-body mole check for anyone with fair skin, more than 50 moles, or a direct family history of atypical moles.'
    ]
  },
  {
    blogId: 'blog-6',
    slug: 'post-fue-transplant-care-timeline',
    title: "Your First 14 Days After an FUE Hair Transplant: The Surgeon's Post-Op Manual",
    excerpt: 'Step-by-step guidance on gentle saline washing, sleeping posture, and resuming workouts following follicular unit extraction.',
    department: 'Hair',
    authorName: 'Dr. Priya Patel',
    authorRole: 'Lead Trichologist & Hair Restoration Surgeon',
    authorImage: 'https://res.cloudinary.com/dcahokqjx/image/upload/v1792093429/pralash_doctors/zoqiwm0vdhbukatuuc6s.jpg',
    readTime: '6 min read',
    publishedDate: 'August 12, 2026',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000',
    tags: ['Hair Transplant', 'FUE Post-Op', 'Recovery', 'Hair Growth'],
    isActive: true,
    content: [
      'The first 72 hours post-transplant are pivotal for graft survival. Follicular units are anchoring into freshly vascularized recipient slits, requiring continuous thermal saline hydration.',
      'Sleeping at a 45-degree angle during nights 1 through 4 prevents fluid from settling into the forehead and eyelids.',
      'By day 10, all scabs can be gently massaged off in the shower using baby shampoo, and light cardiovascular exercise can safely resume.'
    ]
  }
];

const getBlogFilter = (idOrSlug) => {
  if (!idOrSlug) return {};
  if (mongoose.isValidObjectId(idOrSlug)) {
    return { $or: [{ _id: idOrSlug }, { blogId: idOrSlug }, { slug: idOrSlug }] };
  }
  return { $or: [{ blogId: idOrSlug }, { slug: idOrSlug }] };
};

// @desc    Get all blogs (filtered by active for public unless includeInactive=true)
// @route   GET /api/blogs
export const getAllBlogs = async (req, res) => {
  try {
    const { department, search, includeInactive } = req.query;
    const query = {};

    if (includeInactive !== 'true' && includeInactive !== true) {
      query.isActive = { $ne: false };
    }

    if (department && department !== 'all' && department !== 'All') {
      query.department = department;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { authorName: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Sort by createdAt descending
    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve blogs.',
      error: error.message,
    });
  }
};

// @desc    Get single blog by slug, blogId, or _id
// @route   GET /api/blogs/:idOrSlug
export const getBlogBySlugOrId = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const { includeInactive } = req.query;

    const blog = await Blog.findOne(getBlogFilter(idOrSlug));

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog article not found.',
      });
    }

    if (includeInactive !== 'true' && blog.isActive === false) {
      return res.status(404).json({
        success: false,
        message: 'Blog article is currently inactive.',
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching blog article.',
      error: error.message,
    });
  }
};

// @desc    Upload blog cover image to Cloudinary
// @route   POST /api/blogs/upload-image
export const uploadBlogImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided for upload.',
      });
    }

    const secureUrl = await uploadBufferToCloudinary(req.file.buffer, {
      folder: 'pralash_blogs',
    });

    return res.status(200).json({
      success: true,
      message: 'Blog image uploaded successfully.',
      imageUrl: secureUrl,
    });
  } catch (error) {
    console.error('Cloudinary blog photo upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Cloudinary blog photo upload failed.',
      error: error.message,
    });
  }
};

// @desc    Create new blog post
// @route   POST /api/blogs
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      department,
      authorName,
      authorRole,
      authorImage,
      readTime,
      publishedDate,
      tags,
      isActive,
    } = req.body;

    if (!title || !excerpt || !department || !authorName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, excerpt, department, and authorName.',
      });
    }

    let coverImageUrl = req.body.coverImage || '';
    if (req.file) {
      coverImageUrl = await uploadBufferToCloudinary(req.file.buffer, { folder: 'pralash_blogs' });
    }

    if (!coverImageUrl) {
      coverImageUrl = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000';
    }

    const slug = (req.body.slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const blogId = req.body.blogId || `blog-${Date.now()}`;

    // Process content into array if passed as string
    let parsedContent = [];
    if (Array.isArray(content)) {
      parsedContent = content;
    } else if (typeof content === 'string') {
      parsedContent = content.split('\n\n').map((p) => p.trim()).filter(Boolean);
    }

    let parsedTags = [];
    if (Array.isArray(tags)) {
      parsedTags = tags;
    } else if (typeof tags === 'string') {
      parsedTags = tags.split(',').map((t) => t.trim()).filter(Boolean);
    }

    const blog = new Blog({
      blogId,
      slug,
      title,
      excerpt,
      content: parsedContent.length > 0 ? parsedContent : [excerpt],
      department,
      authorName,
      authorRole: authorRole || 'Consultant Specialist',
      authorImage: authorImage || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
      readTime: readTime || '5 min read',
      publishedDate: publishedDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      coverImage: coverImageUrl,
      tags: parsedTags,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    const saved = await blog.save();

    return res.status(201).json({
      success: true,
      message: 'Blog article created successfully.',
      data: saved,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create blog article.',
      error: error.message,
    });
  }
};

// @desc    Update existing blog post (or toggle active/deactive status)
// @route   PATCH /api/blogs/:idOrSlug
export const updateBlog = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const updateFields = { ...req.body };

    if (req.file) {
      updateFields.coverImage = await uploadBufferToCloudinary(req.file.buffer, { folder: 'pralash_blogs' });
    }

    if (req.body.isActive !== undefined) {
      updateFields.isActive = Boolean(req.body.isActive);
    }

    if (typeof updateFields.content === 'string') {
      updateFields.content = updateFields.content.split('\n\n').map((p) => p.trim()).filter(Boolean);
    }

    if (typeof updateFields.tags === 'string') {
      updateFields.tags = updateFields.tags.split(',').map((t) => t.trim()).filter(Boolean);
    }

    const updated = await Blog.findOneAndUpdate(
      getBlogFilter(idOrSlug),
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Blog article not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Blog article updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update blog article.',
      error: error.message,
    });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:idOrSlug
export const deleteBlog = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const deleted = await Blog.findOneAndDelete(getBlogFilter(idOrSlug));

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Blog article not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Blog article deleted successfully.',
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete blog article.',
      error: error.message,
    });
  }
};

// @desc    Seed existing blog articles into MongoDB
// @route   POST /api/blogs/seed
export const seedBlogs = async (req, res) => {
  try {
    console.log('Seeding existing blog articles into MongoDB...');

    // Upsert each seed blog so changes or missing entries are restored
    const results = [];
    for (const blog of SEED_BLOGS) {
      const existing = await Blog.findOne({ $or: [{ blogId: blog.blogId }, { slug: blog.slug }] });
      if (!existing) {
        const created = await Blog.create({ ...blog, isActive: true });
        results.push(created);
      } else {
        // Keep existing isActive state if set, else ensure true
        existing.title = blog.title;
        existing.excerpt = blog.excerpt;
        existing.content = blog.content;
        existing.department = blog.department;
        existing.authorName = blog.authorName;
        existing.authorRole = blog.authorRole;
        existing.authorImage = blog.authorImage;
        existing.readTime = blog.readTime;
        existing.publishedDate = blog.publishedDate;
        existing.coverImage = blog.coverImage;
        existing.tags = blog.tags;
        if (existing.isActive === undefined) existing.isActive = true;
        await existing.save();
        results.push(existing);
      }
    }

    const allBlogs = await Blog.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: `Successfully seeded ${results.length} blog articles into MongoDB.`,
      count: allBlogs.length,
      data: allBlogs,
    });
  } catch (error) {
    console.error('Error seeding blogs:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to seed blog articles.',
      error: error.message,
    });
  }
};
