import React, { useState, useEffect } from 'react';
import {
  API_BASE,
  DOCTOR_API,
  THEME_API,
  BLOG_API,
  CLINIC_THEMES,
} from './constants/theme';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import AppointmentsTab from './components/appointments/AppointmentsTab';
import DoctorsTab from './components/doctors/DoctorsTab';
import BlogsTab from './components/blogs/BlogsTab';
import AnalyticsTab from './components/analytics/AnalyticsTab';
import ThemeTab from './components/theme/ThemeTab';
import AppointmentDetailModal from './components/modals/AppointmentDetailModal';
import NewAppointmentModal from './components/modals/NewAppointmentModal';
import NewDoctorModal from './components/modals/NewDoctorModal';
import NewBlogModal from './components/modals/NewBlogModal';
import ConfirmModal from './components/common/ConfirmModal';
import Toast from './components/common/Toast';

export default function App() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentTheme, setCurrentTheme] = useState('clinical');
  const [backendConnected, setBackendConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'doctors' | 'blogs' | 'analytics' | 'theme'

  // Appointment Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Doctor Filters & Search
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [doctorDeptFilter, setDoctorDeptFilter] = useState('all');
  const [doctorStatusFilter, setDoctorStatusFilter] = useState('all');

  // Blog Filters & Search
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [blogDeptFilter, setBlogDeptFilter] = useState('all');
  const [blogStatusFilter, setBlogStatusFilter] = useState('all');

  // Modals & UI States
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null);
  const [toast, setToast] = useState(null);

  // Theme & Async Action States
  const [updatingThemeId, setUpdatingThemeId] = useState(null);
  const [themeNotification, setThemeNotification] = useState('');
  const [uploadingDoctorPhoto, setUploadingDoctorPhoto] = useState(false);
  const [photoUploadSuccess, setPhotoUploadSuccess] = useState(false);
  const [uploadingBlogCover, setUploadingBlogCover] = useState(false);
  const [blogCoverSuccess, setBlogCoverSuccess] = useState(false);
  const [sendingEmailId, setSendingEmailId] = useState(null);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 4500);
  };

  // Form State: New Booking
  const [newBooking, setNewBooking] = useState({
    patientName: '',
    email: '',
    phone: '',
    department: 'Dental',
    treatment: 'Comprehensive Oral Examination & RVG',
    appointmentDate: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 AM',
    doctorName: 'Dr. Marcus Thornton',
    consultationFee: 1400,
    symptomsOrNotes: '',
  });

  // Form State: New Doctor
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    title: '',
    department: 'Dental',
    qualifications: '',
    experienceYears: 10,
    fee: 1500,
    bio: '',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    availability: 'Mon - Fri (9:30 AM - 5:30 PM)',
    specializations: '',
    isActive: true,
  });

  // Form State: New Blog
  const [newBlog, setNewBlog] = useState({
    title: '',
    department: 'Dental',
    authorName: 'Dr. Marcus Thornton',
    authorRole: 'Senior Consultant Orthodontist',
    authorImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
    readTime: '5 min read',
    excerpt: '',
    content: '',
    tags: '',
    coverImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1000',
    isActive: true,
  });

  // Fetch functions
  const fetchAppointments = async () => {
    try {
      const res = await fetch(API_BASE);
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setAppointments(json.data);
          setBackendConnected(true);
        }
      } else {
        setBackendConnected(false);
      }
    } catch {
      setBackendConnected(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${DOCTOR_API}?includeInactive=true`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setDoctors(json.data);
        }
      }
    } catch (err) {
      console.warn('Error fetching doctors from API:', err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${BLOG_API}?includeInactive=true`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setBlogs(json.data);
        }
      }
    } catch (err) {
      console.warn('Error fetching blogs from API:', err);
    }
  };

  const fetchTheme = async () => {
    try {
      const res = await fetch(THEME_API);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data?.theme) {
          setCurrentTheme(json.data.theme);
        }
      }
    } catch (err) {
      console.warn('Error fetching theme from API:', err);
    }
  };

  const refreshAll = async () => {
    setLoading(true);
    await Promise.all([fetchAppointments(), fetchDoctors(), fetchTheme(), fetchBlogs()]);
    setLoading(false);
  };

  useEffect(() => {
    refreshAll();
  }, []);

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      apt.patientName.toLowerCase().includes(query) ||
      apt.email.toLowerCase().includes(query) ||
      apt.phone.includes(query) ||
      apt.bookingReference.toLowerCase().includes(query) ||
      apt.doctor?.name.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const matchesDept = departmentFilter === 'all' || apt.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  // Filtered Doctors
  const filteredDoctors = doctors.filter((doc) => {
    const query = doctorSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      doc.name.toLowerCase().includes(query) ||
      doc.title.toLowerCase().includes(query) ||
      doc.qualifications.toLowerCase().includes(query) ||
      doc.specializations?.some((s) => s.toLowerCase().includes(query));

    const matchesDept = doctorDeptFilter === 'all' || doc.department === doctorDeptFilter;
    const isDocActive = doc.isActive !== false;
    const matchesStatus =
      doctorStatusFilter === 'all' ||
      (doctorStatusFilter === 'active' && isDocActive) ||
      (doctorStatusFilter === 'inactive' && !isDocActive);

    return matchesSearch && matchesDept && matchesStatus;
  });

  // Filtered Blogs
  const filteredBlogs = blogs.filter((blog) => {
    const query = blogSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      blog.title.toLowerCase().includes(query) ||
      blog.excerpt?.toLowerCase().includes(query) ||
      blog.authorName?.toLowerCase().includes(query) ||
      blog.tags?.some((t) => t.toLowerCase().includes(query));

    const matchesDept = blogDeptFilter === 'all' || blog.department === blogDeptFilter;
    const isBlogActive = blog.isActive !== false;
    const matchesStatus =
      blogStatusFilter === 'all' ||
      (blogStatusFilter === 'active' && isBlogActive) ||
      (blogStatusFilter === 'inactive' && !isBlogActive);

    return matchesSearch && matchesDept && matchesStatus;
  });

  // Theme update handler
  const handleSelectTheme = async (themeId) => {
    if (updatingThemeId) return; // Prevent duplicate clicks
    setUpdatingThemeId(themeId);
    setThemeNotification('');
    try {
      const res = await fetch(THEME_API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: themeId, updatedBy: 'Admin Console' }),
      });
      const json = await res.json();
      if (json.success) {
        setCurrentTheme(themeId);
        const themeObj = CLINIC_THEMES.find((t) => t.id === themeId);
        const successMsg = `Website theme updated to "${themeObj?.name}". The live public website has been switched!`;
        setThemeNotification(successMsg);
        showToast(successMsg, 'success');
        setTimeout(() => setThemeNotification(''), 7000);
      } else {
        showToast(json.message || 'Failed to update theme.', 'error');
      }
    } catch (err) {
      console.error('Error updating theme:', err);
      showToast('Error updating theme: ' + err.message, 'error');
    } finally {
      setUpdatingThemeId(null);
    }
  };

  // Upload Doctor Photo
  const handleDoctorPhotoFileSelect = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setUploadingDoctorPhoto(true);
    setPhotoUploadSuccess(false);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${DOCTOR_API}/upload-image`, {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.imageUrl) {
        setNewDoctor((prev) => ({ ...prev, image: json.imageUrl }));
        setPhotoUploadSuccess(true);
      } else {
        alert(json.message || 'Failed to upload photo to Cloudinary');
      }
    } catch (err) {
      alert('Error connecting to Cloudinary service: ' + err.message);
    } finally {
      setUploadingDoctorPhoto(false);
    }
  };

  // Upload Blog Cover Photo
  const handleBlogCoverFileSelect = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setUploadingBlogCover(true);
    setBlogCoverSuccess(false);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${BLOG_API}/upload-image`, {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.imageUrl) {
        setNewBlog((prev) => ({ ...prev, coverImage: json.imageUrl }));
        setBlogCoverSuccess(true);
      } else {
        alert(json.message || 'Failed to upload photo to Cloudinary');
      }
    } catch (err) {
      alert('Error connecting to Cloudinary service: ' + err.message);
    } finally {
      setUploadingBlogCover(false);
    }
  };

  // Seed Appointments
  const handleSeedAppointments = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Reset & Seed MongoDB Appointments',
      message: 'This will reset the appointment registry and populate 8 realistic clinic bookings with verified patient records.',
      confirmLabel: 'Seed Appointments',
      cancelLabel: 'Cancel',
      type: 'warning',
      onConfirm: async () => {
        setConfirmModal(null);
        setLoading(true);
        try {
          const res = await fetch(`${API_BASE}/seed`, { method: 'POST' });
          if (res.ok) {
            await fetchAppointments();
            showToast('8 clinical appointments seeded into MongoDB!', 'success');
          } else {
            showToast('Failed to seed appointments.', 'error');
          }
        } catch {
          showToast('Network error while seeding appointments.', 'error');
        } finally {
          setLoading(false);
        }
      },
    });
  };



  // Update Appointment Status (Confirmed or Rejected/Cancelled)
  const handleUpdateStatus = async (id, newStatus, reason) => {
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
    );

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          rejectionReason: reason,
          forceEmail: true,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchAppointments();
        if (newStatus === 'confirmed') {
          if (data.emailSent) {
            showToast(`Appointment CONFIRMED & confirmation email sent to ${data.data?.email}!`, 'success');
          } else if (data.emailError) {
            showToast(`Status CONFIRMED. (Email note: ${data.emailError})`, 'warning');
          } else {
            showToast(`Appointment status updated to CONFIRMED.`, 'success');
          }
        } else if (newStatus === 'cancelled') {
          if (data.emailSent) {
            showToast(`Appointment REJECTED & notification email sent to ${data.data?.email}.`, 'info');
          } else if (data.emailError) {
            showToast(`Status CANCELLED. (Email note: ${data.emailError})`, 'warning');
          } else {
            showToast(`Appointment status updated to CANCELLED.`, 'info');
          }
        } else {
          showToast(`Appointment status updated to ${newStatus.toUpperCase()}`, 'info');
        }

        if (selectedAppointment && selectedAppointment._id === id && data.data) {
          setSelectedAppointment(data.data);
        }
      } else {
        showToast(`Failed to update status: ${data.message || 'Server error'}`, 'error');
      }
    } catch {
      showToast('Failed to update appointment status.', 'error');
    }
  };

  // Resend Confirmation Email
  const handleResendEmail = async (id) => {
    setSendingEmailId(id);
    try {
      const res = await fetch(`${API_BASE}/${id}/send-confirmation`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Booking confirmation email sent to ${data.data?.email}!`, 'success');
        await fetchAppointments();
        if (selectedAppointment && selectedAppointment._id === id) {
          setSelectedAppointment(data.data);
        }
      } else {
        showToast(`Failed to send email: ${data.message || data.error || 'Check SMTP configuration'}`, 'error');
      }
    } catch (err) {
      showToast(`Error sending email: ${err.message}`, 'error');
    } finally {
      setSendingEmailId(null);
    }
  };

  // Resend / Send Rejection Email
  const handleResendRejectionEmail = async (id, reason) => {
    setSendingEmailId(id);
    try {
      const res = await fetch(`${API_BASE}/${id}/send-rejection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Rejection notice email sent to ${data.data?.email}!`, 'info');
        await fetchAppointments();
        if (selectedAppointment && selectedAppointment._id === id) {
          setSelectedAppointment(data.data);
        }
      } else {
        showToast(`Failed to send rejection email: ${data.message || data.error || 'Check SMTP configuration'}`, 'error');
      }
    } catch (err) {
      showToast(`Error sending email: ${err.message}`, 'error');
    } finally {
      setSendingEmailId(null);
    }
  };

  // Delete Appointment
  const handleDeleteAppointment = (aptOrId) => {
    const apt = typeof aptOrId === 'object' ? aptOrId : appointments.find((a) => a._id === aptOrId) || { _id: aptOrId };

    setConfirmModal({
      isOpen: true,
      title: 'Delete Appointment Record',
      message: 'Are you sure you want to permanently delete this appointment record from the database? This action is irreversible.',
      itemDetails: {
        name: apt.patientName || 'Appointment Record',
        ref: apt.bookingReference || apt._id,
        dept: apt.department ? `${apt.department} Department` : null,
        date: apt.appointmentDate ? `${apt.appointmentDate} ${apt.timeSlot ? `• ${apt.timeSlot}` : ''}` : null,
      },
      confirmLabel: 'Delete Record',
      cancelLabel: 'Keep Appointment',
      type: 'danger',
      onConfirm: async () => {
        setConfirmModal(null);
        setAppointments((prev) => prev.filter((a) => a._id !== apt._id));
        if (selectedAppointment && selectedAppointment._id === apt._id) {
          setSelectedAppointment(null);
        }
        try {
          const res = await fetch(`${API_BASE}/${apt._id}`, { method: 'DELETE' });
          if (res.ok) {
            showToast(`Appointment for ${apt.patientName || 'patient'} deleted successfully.`, 'success');
          } else {
            showToast('Failed to delete on server.', 'error');
          }
        } catch {
          showToast('Network error while deleting appointment.', 'error');
        }
      },
    });
  };

  // Toggle Doctor Active / Inactive Status
  const handleToggleDoctorStatus = async (doc) => {
    const doctorId = doc._id || doc.doctorId;
    const currentStatus = doc.isActive !== false;
    const newStatus = !currentStatus;

    setDoctors((prev) =>
      prev.map((d) =>
        (d._id === doc._id || d.doctorId === doc.doctorId)
          ? { ...d, isActive: newStatus }
          : d
      )
    );

    try {
      const res = await fetch(`${DOCTOR_API}/${doctorId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newStatus }),
      });

      if (res.ok) {
        showToast(
          `${doc.name} is now ${newStatus ? 'ACTIVE (visible on frontend)' : 'INACTIVE (hidden from frontend)'}`,
          newStatus ? 'success' : 'info'
        );
      } else {
        setDoctors((prev) =>
          prev.map((d) =>
            (d._id === doc._id || d.doctorId === doc.doctorId)
              ? { ...d, isActive: currentStatus }
              : d
          )
        );
        showToast('Failed to update doctor visibility status on server.', 'error');
      }
    } catch {
      setDoctors((prev) =>
        prev.map((d) =>
          (d._id === doc._id || d.doctorId === doc.doctorId)
            ? { ...d, isActive: currentStatus }
            : d
        )
      );
      showToast('Network error while updating doctor visibility.', 'error');
    }
  };

  // Delete Doctor
  const handleDeleteDoctor = (id, name) => {
    setConfirmModal({
      isOpen: true,
      title: 'Remove Specialist Doctor',
      message: `Are you sure you want to remove Dr. ${name} from the active clinic specialist directory?`,
      itemDetails: {
        name: `Dr. ${name}`,
        ref: 'Doctor Registry Entry',
        dept: 'Clinic Specialists',
      },
      confirmLabel: 'Remove Doctor',
      cancelLabel: 'Keep Doctor',
      type: 'danger',
      onConfirm: async () => {
        setConfirmModal(null);
        try {
          const res = await fetch(`${DOCTOR_API}/${id}`, { method: 'DELETE' });
          if (res.ok) {
            await fetchDoctors();
            showToast(`Dr. ${name} removed from clinic directory.`, 'success');
          } else {
            showToast('Failed to delete doctor on server.', 'error');
          }
        } catch {
          showToast('Network error while deleting doctor.', 'error');
        }
      },
    });
  };

  // Toggle Blog Active / Deactive Status
  const handleToggleBlogStatus = async (blog) => {
    const blogId = blog._id || blog.blogId || blog.slug;
    const currentStatus = blog.isActive !== false;
    const newStatus = !currentStatus;

    setBlogs((prev) =>
      prev.map((b) =>
        (b._id === blog._id || b.blogId === blog.blogId || b.slug === blog.slug)
          ? { ...b, isActive: newStatus }
          : b
      )
    );

    try {
      const res = await fetch(`${BLOG_API}/${blogId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newStatus }),
      });

      if (res.ok) {
        showToast(
          `"${blog.title.slice(0, 30)}..." is now ${newStatus ? 'ACTIVE (visible on website)' : 'DEACTIVE (hidden from website)'}`,
          newStatus ? 'success' : 'info'
        );
      } else {
        setBlogs((prev) =>
          prev.map((b) =>
            (b._id === blog._id || b.blogId === blog.blogId || b.slug === blog.slug)
              ? { ...b, isActive: currentStatus }
              : b
          )
        );
        showToast('Failed to update blog visibility status on server.', 'error');
      }
    } catch {
      setBlogs((prev) =>
        prev.map((b) =>
          (b._id === blog._id || b.blogId === blog.blogId || b.slug === blog.slug)
            ? { ...b, isActive: currentStatus }
            : b
        )
      );
      showToast('Network error while updating blog visibility.', 'error');
    }
  };

  // Delete Blog
  const handleDeleteBlog = (idOrSlug, title) => {
    setConfirmModal({
      isOpen: true,
      title: 'Remove Health Guide Article',
      message: `Are you sure you want to permanently delete "${title}" from the clinic blog database?`,
      itemDetails: {
        name: title,
        ref: 'Health Guide Entry',
        dept: 'Patient Education Repository',
      },
      confirmLabel: 'Delete Article',
      cancelLabel: 'Keep Article',
      type: 'danger',
      onConfirm: async () => {
        setConfirmModal(null);
        try {
          const res = await fetch(`${BLOG_API}/${idOrSlug}`, { method: 'DELETE' });
          if (res.ok) {
            await fetchBlogs();
            showToast('Health guide article removed successfully.', 'success');
          } else {
            showToast('Failed to delete blog article on server.', 'error');
          }
        } catch {
          showToast('Network error while deleting article.', 'error');
        }
      },
    });
  };

  // Submit New Booking
  const handleCreateAppointmentSubmit = async (e) => {
    e.preventDefault();
    const reference = `PRL-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const record = {
      bookingReference: reference,
      patientName: newBooking.patientName,
      email: newBooking.email,
      phone: newBooking.phone,
      department: newBooking.department,
      treatment: newBooking.treatment,
      doctor: {
        id: 'assigned-doc',
        name: newBooking.doctorName,
        fee: Number(newBooking.consultationFee) || 1200,
      },
      appointmentDate: newBooking.appointmentDate,
      timeSlot: newBooking.timeSlot,
      consultationFee: Number(newBooking.consultationFee) || 1200,
      symptomsOrNotes: newBooking.symptomsOrNotes,
      status: 'confirmed',
    };

    setShowCreateModal(false);

    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (res.ok) {
        await fetchAppointments();
        showToast(`Appointment confirmed for ${newBooking.patientName}!`, 'success');
      }
    } catch (err) {
      console.warn('Backend save failed:', err);
    }

    setNewBooking({
      patientName: '',
      email: '',
      phone: '',
      department: 'Dental',
      treatment: 'Comprehensive Oral Examination & RVG',
      appointmentDate: new Date().toISOString().split('T')[0],
      timeSlot: '10:00 AM',
      doctorName: 'Dr. Marcus Thornton',
      consultationFee: 1400,
      symptomsOrNotes: '',
    });
  };

  // Submit New Doctor
  const handleAddDoctorSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: newDoctor.name,
      title: newDoctor.title,
      department: newDoctor.department,
      qualifications: newDoctor.qualifications,
      experienceYears: Number(newDoctor.experienceYears) || 5,
      fee: Number(newDoctor.fee) || 1500,
      bio: newDoctor.bio,
      image: newDoctor.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
      availability: newDoctor.availability,
      specializations: newDoctor.specializations
        ? newDoctor.specializations.split(',').map((s) => s.trim())
        : [newDoctor.department],
      isActive: newDoctor.isActive !== undefined ? newDoctor.isActive : true,
    };

    try {
      const res = await fetch(DOCTOR_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchDoctors();
        setShowAddDoctorModal(false);
        setNewDoctor({
          name: '',
          title: '',
          department: 'Dental',
          qualifications: '',
          experienceYears: 10,
          fee: 1500,
          bio: '',
          image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
          availability: 'Mon - Fri (9:30 AM - 5:30 PM)',
          specializations: '',
          isActive: true,
        });
        showToast(`Dr. ${payload.name} successfully added to database!`, 'success');
      } else {
        showToast('Failed to save doctor to database.', 'error');
      }
    } catch {
      showToast('Error saving doctor to database.', 'error');
    }
  };

  // Submit New Blog
  const handleAddBlogSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: newBlog.title,
      department: newBlog.department,
      authorName: newBlog.authorName,
      authorRole: newBlog.authorRole || 'Consultant Specialist',
      authorImage: newBlog.authorImage || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
      readTime: newBlog.readTime || '5 min read',
      excerpt: newBlog.excerpt,
      content: newBlog.content,
      tags: newBlog.tags,
      coverImage: newBlog.coverImage || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
      isActive: newBlog.isActive !== undefined ? newBlog.isActive : true,
    };

    try {
      const res = await fetch(BLOG_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchBlogs();
        setShowAddBlogModal(false);
        setNewBlog({
          title: '',
          department: 'Dental',
          authorName: 'Dr. Marcus Thornton',
          authorRole: 'Senior Consultant Orthodontist',
          authorImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
          readTime: '5 min read',
          excerpt: '',
          content: '',
          tags: '',
          coverImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1000',
          isActive: true,
        });
        showToast(`Article "${payload.title}" created successfully!`, 'success');
      } else {
        showToast('Failed to save article to database.', 'error');
      }
    } catch {
      showToast('Error saving article to database.', 'error');
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Reference,Patient Name,Phone,Email,Department,Doctor,Treatment,Date,Time Slot,Fee (INR),Status'];
    const rows = filteredAppointments.map((a) =>
      `"${a.bookingReference}","${a.patientName}","${a.phone}","${a.email}","${a.department}","${a.doctor?.name || ''}","${a.treatment}","${a.appointmentDate}","${a.timeSlot}",${a.consultationFee || 1200},"${a.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pralash-appointments-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Quick Book Doctor
  const handleQuickBookDoctor = (doc) => {
    setNewBooking((prev) => ({
      ...prev,
      doctorName: doc.name,
      department: doc.department,
      consultationFee: doc.fee,
    }));
    setShowCreateModal(true);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f8fafc] font-sans text-slate-800 antialiased select-none">
      {/* SIDEBAR COMPONENT */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        appointmentsCount={appointments.length}
        doctorsCount={doctors.length}
        blogsCount={blogs.length}
        currentTheme={currentTheme}
        backendConnected={backendConnected}
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col min-w-0 bg-[#f8fafc]">
        {/* HEADER COMPONENT */}
        <Header
          activeTab={activeTab}
          loading={loading}
          onSeedAppointments={handleSeedAppointments}
          onExportCSV={handleExportCSV}
          onOpenCreateAppointment={() => setShowCreateModal(true)}
          onOpenAddDoctor={() => setShowAddDoctorModal(true)}
          onOpenAddBlog={() => setShowAddBlogModal(true)}
        />

        {/* TAB 1: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <AppointmentsTab
            appointments={appointments}
            filteredAppointments={filteredAppointments}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            onRefresh={refreshAll}
            onViewAppointment={setSelectedAppointment}
            onUpdateStatus={handleUpdateStatus}
            onDeleteAppointment={handleDeleteAppointment}
            onResendEmail={handleResendEmail}
            sendingEmailId={sendingEmailId}
          />
        )}

        {/* TAB 2: DOCTORS */}
        {activeTab === 'doctors' && (
          <DoctorsTab
            doctors={doctors}
            filteredDoctors={filteredDoctors}
            doctorSearchQuery={doctorSearchQuery}
            setDoctorSearchQuery={setDoctorSearchQuery}
            doctorDeptFilter={doctorDeptFilter}
            setDoctorDeptFilter={setDoctorDeptFilter}
            doctorStatusFilter={doctorStatusFilter}
            setDoctorStatusFilter={setDoctorStatusFilter}
            onToggleDoctorStatus={handleToggleDoctorStatus}
            onDeleteDoctor={handleDeleteDoctor}
            onQuickBookDoctor={handleQuickBookDoctor}
          />
        )}

        {/* TAB 3: HEALTH GUIDES & BLOGS */}
        {activeTab === 'blogs' && (
          <BlogsTab
            blogs={blogs}
            filteredBlogs={filteredBlogs}
            blogSearchQuery={blogSearchQuery}
            setBlogSearchQuery={setBlogSearchQuery}
            blogDeptFilter={blogDeptFilter}
            setBlogDeptFilter={setBlogDeptFilter}
            blogStatusFilter={blogStatusFilter}
            setBlogStatusFilter={setBlogStatusFilter}
            onToggleBlogStatus={handleToggleBlogStatus}
            onDeleteBlog={handleDeleteBlog}
          />
        )}

        {/* TAB 4: CLINICAL ANALYTICS */}
        {activeTab === 'analytics' && (
          <AnalyticsTab
            appointments={appointments}
            doctors={doctors}
            blogs={blogs}
          />
        )}

        {/* TAB 5: THEME & APPEARANCE */}
        {activeTab === 'theme' && (
          <ThemeTab
            currentTheme={currentTheme}
            updatingThemeId={updatingThemeId}
            themeNotification={themeNotification}
            onSelectTheme={handleSelectTheme}
          />
        )}
      </div>

      {/* MODAL 1: APPOINTMENT DETAILS */}
      <AppointmentDetailModal
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        onUpdateStatus={handleUpdateStatus}
        onResendEmail={handleResendEmail}
        onResendRejectionEmail={handleResendRejectionEmail}
        sendingEmailId={sendingEmailId}
      />

      {/* MODAL 2: NEW WALK-IN APPOINTMENT */}
      <NewAppointmentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateAppointmentSubmit}
        newBooking={newBooking}
        setNewBooking={setNewBooking}
        doctors={doctors}
      />

      {/* MODAL 3: ADD NEW DOCTOR */}
      <NewDoctorModal
        isOpen={showAddDoctorModal}
        onClose={() => setShowAddDoctorModal(false)}
        onSubmit={handleAddDoctorSubmit}
        newDoctor={newDoctor}
        setNewDoctor={setNewDoctor}
        uploadingDoctorPhoto={uploadingDoctorPhoto}
        photoUploadSuccess={photoUploadSuccess}
        onDoctorPhotoFileSelect={handleDoctorPhotoFileSelect}
      />

      {/* MODAL 4: ADD NEW HEALTH GUIDE BLOG */}
      <NewBlogModal
        isOpen={showAddBlogModal}
        onClose={() => setShowAddBlogModal(false)}
        onSubmit={handleAddBlogSubmit}
        newBlog={newBlog}
        setNewBlog={setNewBlog}
        uploadingBlogCover={uploadingBlogCover}
        blogCoverSuccess={blogCoverSuccess}
        onBlogCoverFileSelect={handleBlogCoverFileSelect}
      />

      {/* CONFIRMATION DIALOG MODAL */}
      <ConfirmModal
        modal={confirmModal}
        onClose={() => setConfirmModal(null)}
      />

      {/* TOAST NOTIFICATIONS */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
