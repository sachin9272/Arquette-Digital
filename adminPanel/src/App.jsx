import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Search,
  CheckCircle2,
  Clock3,
  XCircle,
  RefreshCw,
  Phone,
  Mail,
  Plus,
  Stethoscope,
  ExternalLink,
  Download,
  Trash2,
  Eye,
  Check,
  X,
  Database,
  TrendingUp,
  Palette,
  CloudUpload
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api/appointments';
const DOCTOR_API = 'http://localhost:5000/api/doctors';
const THEME_API = 'http://localhost:5000/api/theme';

const CLINIC_THEMES = [
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

export default function App() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [currentTheme, setCurrentTheme] = useState('clinical');
  const [updatingTheme, setUpdatingTheme] = useState(false);
  const [themeNotification, setThemeNotification] = useState('');
  const [uploadingDoctorPhoto, setUploadingDoctorPhoto] = useState(false);
  const [photoUploadSuccess, setPhotoUploadSuccess] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'doctors' | 'analytics' | 'theme'
  const [sendingEmailId, setSendingEmailId] = useState(null);

  // Appointment Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Doctor Filters & Search
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [doctorDeptFilter, setDoctorDeptFilter] = useState('all');

  // Modals
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);

  // New Booking State
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
    symptomsOrNotes: ''
  });

  // New Doctor State
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
    specializations: ''
  });

  // Fetch appointments from MongoDB backend
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

  // Fetch doctors from MongoDB backend
  const fetchDoctors = async () => {
    try {
      const res = await fetch(DOCTOR_API);
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

  // Fetch active theme from MongoDB backend
  const fetchTheme = async () => {
    try {
      const res = await fetch(THEME_API);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data && json.data.theme) {
          setCurrentTheme(json.data.theme);
        }
      }
    } catch (err) {
      console.warn('Error fetching theme from API:', err);
    }
  };

  // Update website theme (Admin only)
  const handleSelectTheme = async (themeId) => {
    setUpdatingTheme(true);
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
        setThemeNotification(`Website theme updated to "${themeObj?.name}". The live public website has been switched!`);
        setTimeout(() => setThemeNotification(''), 7000);
      }
    } catch (err) {
      alert('Error updating theme: ' + err.message);
    } finally {
      setUpdatingTheme(false);
    }
  };

  // Upload doctor photo to Cloudinary
  const handleDoctorPhotoFileSelect = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setUploadingDoctorPhoto(true);
    setPhotoUploadSuccess(false);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/api/doctors/upload-image', {
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

  const refreshAll = async () => {
    setLoading(true);
    await Promise.all([fetchAppointments(), fetchDoctors(), fetchTheme()]);
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
      (apt.doctor && apt.doctor.name.toLowerCase().includes(query));

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
    return matchesSearch && matchesDept;
  });

  // Re-seed Appointments in DB
  const handleSeedAppointments = async () => {
    if (!window.confirm('Reset and seed 8 realistic dummy appointments into MongoDB?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/seed`, { method: 'POST' });
      if (res.ok) {
        await fetchAppointments();
      }
    } catch (err) {
      console.error('Failed to seed appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  // Re-seed Doctors in DB
  const handleSeedDoctors = async () => {
    if (!window.confirm('Seed all 7 clinical specialist doctors into MongoDB?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${DOCTOR_API}/seed`, { method: 'POST' });
      if (res.ok) {
        await fetchDoctors();
        alert('All available doctors seeded successfully into MongoDB!');
      }
    } catch (err) {
      console.error('Failed to seed doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  // Quick Status Updater for Appointments
  const handleUpdateStatus = async (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
    );

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        await fetchAppointments();
      }
    } catch (err) {
      console.error('Failed to update status on server:', err);
    }
  };

  // Manual Trigger to Send / Resend Booking Confirmation Email
  const handleResendEmail = async (id) => {
    setSendingEmailId(id);
    try {
      const res = await fetch(`${API_BASE}/${id}/send-confirmation`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        alert(`Booking confirmation email sent successfully to ${data.data?.email}!`);
        await fetchAppointments();
        if (selectedAppointment && selectedAppointment._id === id) {
          setSelectedAppointment(data.data);
        }
      } else {
        alert(`Failed to send email: ${data.message || 'Check SMTP configuration in backend/.env'}`);
      }
    } catch (err) {
      alert(`Error sending email: ${err.message}`);
    } finally {
      setSendingEmailId(null);
    }
  };

  // Delete Appointment
  const handleDeleteAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment record?')) return;

    setAppointments((prev) => prev.filter((a) => a._id !== id));
    try {
      await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete on server:', err);
    }
  };

  // Create new appointment handler
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
        fee: Number(newBooking.consultationFee) || 1200
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
        body: JSON.stringify(record)
      });
      if (res.ok) {
        await fetchAppointments();
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
      symptomsOrNotes: ''
    });
  };

  // Create new doctor handler
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
          specializations: ''
        });
        alert(`Doctor ${payload.name} successfully added to database!`);
      } else {
        alert('Failed to save doctor to database.');
      }
    } catch (err) {
      console.error('Failed to add doctor:', err);
    }
  };

  // Delete doctor handler
  const handleDeleteDoctor = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove ${name} from the clinic database?`)) return;

    try {
      const res = await fetch(`${DOCTOR_API}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchDoctors();
      }
    } catch (err) {
      console.error('Failed to delete doctor:', err);
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

  // Computed KPI Metrics
  const totalCount = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const totalRevenue = appointments
    .filter((a) => a.status === 'confirmed' || a.status === 'completed')
    .reduce((sum, a) => sum + (a.consultationFee || 1200), 0);

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">P</div>
          <div>
            <div className="brand-title">PRALASH Clinic</div>
            <div className="brand-subtitle">Management Console</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            <Calendar size={18} />
            <span>All Appointments ({appointments.length})</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'doctors' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctors')}
          >
            <Stethoscope size={18} />
            <span>Consultant Doctors ({doctors.length})</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <TrendingUp size={18} />
            <span>Department Analytics</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'theme' ? 'active' : ''}`}
            onClick={() => setActiveTab('theme')}
          >
            <Palette size={18} />
            <span>Theme & Appearance</span>
            <span style={{
              marginLeft: 'auto',
              fontSize: '0.65rem',
              padding: '2px 7px',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.12)',
              color: '#38bdf8',
              fontWeight: 800,
              textTransform: 'capitalize'
            }}>
              {currentTheme}
            </span>
          </button>
        </nav>

        <div className="sidebar-footer">
          {/* Connection status pill */}
          <div style={{
            fontSize: '0.72rem',
            padding: '8px 12px',
            borderRadius: '10px',
            background: backendConnected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            color: backendConnected ? '#6ee7b7' : '#fcd34d',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: `1px solid ${backendConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
          }}>
            <Database size={14} />
            <span>{backendConnected ? 'MongoDB Live • Real Database Data' : 'Backend Offline (Port 5000)'}</span>
          </div>

          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)', width: '100%', fontSize: '0.78rem' }}
          >
            <span>Open Public Website</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {activeTab === 'appointments' && 'Appointments & Patient Triage'}
              {activeTab === 'doctors' && 'Consultant Specialists Directory'}
              {activeTab === 'analytics' && 'Clinical Department Analytics'}
              {activeTab === 'theme' && 'Website Theme & Aesthetic Configuration'}
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              HRBR Layout, Kalyan Nagar Clinic &bull; Mon–Sun 9:30 AM – 8:00 PM
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {activeTab === 'appointments' && (
              <>
                <button
                  onClick={handleSeedAppointments}
                  className="btn btn-outline"
                  title="Reset & seed realistic clinical dummy appointments into MongoDB"
                >
                  <Database size={15} />
                  <span>Re-Seed DB</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="btn btn-outline"
                  title="Export appointments to CSV spreadsheet"
                >
                  <Download size={15} />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn btn-secondary"
                >
                  <Plus size={16} />
                  <span>New Appointment</span>
                </button>
              </>
            )}

            {activeTab === 'doctors' && (
              <>
                <button
                  onClick={handleSeedDoctors}
                  className="btn btn-outline"
                  title="Seed all 7 clinical specialists into MongoDB"
                >
                  <Database size={15} />
                  <span>Seed Doctors to DB</span>
                </button>

                <button
                  onClick={() => setShowAddDoctorModal(true)}
                  className="btn btn-secondary"
                >
                  <Plus size={16} />
                  <span>Add New Doctor</span>
                </button>
              </>
            )}
          </div>
        </header>

        {/* TAB 1: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <main className="admin-content">
            {/* STATS OVERVIEW CARDS */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <span>Total Bookings</span>
                  <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                    <Calendar size={18} />
                  </div>
                </div>
                <div className="stat-value">{totalCount}</div>
                <div className="stat-footer">Stored live in MongoDB</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span>Pending Review</span>
                  <div className="stat-icon" style={{ background: '#fef3c7', color: '#b45309' }}>
                    <Clock3 size={18} />
                  </div>
                </div>
                <div className="stat-value" style={{ color: '#b45309' }}>{pendingCount}</div>
                <div className="stat-footer">Needs clinical coordinator action</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span>Confirmed Visits</span>
                  <div className="stat-icon" style={{ background: '#d1fae5', color: '#065f46' }}>
                    <CheckCircle2 size={18} />
                  </div>
                </div>
                <div className="stat-value" style={{ color: '#065f46' }}>{confirmedCount}</div>
                <div className="stat-footer">Doctor slot locked</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span>Est. Consultation Revenue</span>
                  <div className="stat-icon" style={{ background: '#ecfdf5', color: '#006a61' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem' }}>₹</span>
                  </div>
                </div>
                <div className="stat-value">₹{totalRevenue.toLocaleString('en-IN')}</div>
                <div className="stat-footer">From confirmed & completed visits</div>
              </div>
            </div>

            {/* CONTROLS & SEARCH BAR */}
            <div className="controls-bar">
              <div className="search-box">
                <Search size={16} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Search patient name, phone, email, or PRL ref..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="filter-group">
                {/* Department Filter */}
                <select
                  className="filter-select"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="all">All Specialties</option>
                  <option value="Dental">🦷 Dental</option>
                  <option value="Skin">✨ Skin</option>
                  <option value="Hair">💇 Hair</option>
                </select>

                {/* Status Filter */}
                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  onClick={fetchAppointments}
                  className="btn btn-outline"
                  style={{ padding: '8px 12px' }}
                  title="Refresh from MongoDB backend"
                >
                  <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* APPOINTMENTS TABLE */}
            <div className="table-card">
              <div className="table-header">
                <div>
                  <span className="table-title">Appointment Registry</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                    ({filteredAppointments.length} record{filteredAppointments.length === 1 ? '' : 's'})
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Showing verified MongoDB records
                </span>
              </div>

              <div className="table-responsive">
                <table className="appointments-table">
                  <thead>
                    <tr>
                      <th>Ref & Patient</th>
                      <th>Specialty</th>
                      <th>Doctor & Treatment</th>
                      <th>Date & Time</th>
                      <th>Fee</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--text-muted)' }}>
                          <Calendar size={36} color="#cbd5e1" style={{ margin: '0 auto 12px auto' }} />
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                            No appointments match current filters
                          </div>
                          <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                            Try clearing your search query or click &quot;Re-Seed DB&quot; to restore sample records.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((apt) => (
                        <tr key={apt._id}>
                          <td>
                            <div style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--secondary)', fontSize: '0.78rem' }}>
                              {apt.bookingReference}
                            </div>
                            <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem', marginTop: '2px' }}>
                              {apt.patientName}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <Phone size={11} />
                                {apt.phone}
                              </span>
                              <span>&bull;</span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <Mail size={11} />
                                {apt.email}
                              </span>
                            </div>
                          </td>

                          <td>
                            <span className={`badge badge-${apt.department ? apt.department.toLowerCase() : 'dept'}`}>
                              {apt.department === 'Dental' ? '🦷 Dental' : apt.department === 'Skin' ? '✨ Skin' : '💇 Hair'}
                            </span>
                          </td>

                          <td>
                            <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.82rem' }}>
                              {apt.doctor?.name || 'Duty Specialist'}
                            </div>
                            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {apt.treatment}
                            </div>
                          </td>

                          <td>
                            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                              {apt.appointmentDate}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                              <Clock size={12} />
                              <span>{apt.timeSlot}</span>
                            </div>
                          </td>

                          <td>
                            <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>
                              ₹{(apt.consultationFee || 1200).toLocaleString('en-IN')}
                            </div>
                          </td>

                          <td>
                            <span className={`badge badge-${apt.status}`}>
                              {apt.status === 'confirmed' && <CheckCircle2 size={12} />}
                              {apt.status === 'pending' && <Clock3 size={12} />}
                              {apt.status === 'completed' && <Check size={12} />}
                              {apt.status === 'cancelled' && <XCircle size={12} />}
                              <span>{apt.status?.toUpperCase()}</span>
                            </span>
                          </td>

                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                              <button
                                onClick={() => setSelectedAppointment(apt)}
                                className="btn btn-outline btn-sm"
                                title="View Details & Medical Notes"
                              >
                                <Eye size={13} />
                              </button>

                              {apt.status === 'pending' && (
                                <button
                                  onClick={() => handleUpdateStatus(apt._id, 'confirmed')}
                                  className="btn btn-action-confirm btn-sm"
                                  title="Confirm Appointment"
                                >
                                  Confirm
                                </button>
                              )}

                              {apt.status === 'confirmed' && (
                                <button
                                  onClick={() => handleUpdateStatus(apt._id, 'completed')}
                                  className="btn btn-action-complete btn-sm"
                                  title="Mark Completed"
                                >
                                  Complete
                                </button>
                              )}

                              {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                                <button
                                  onClick={() => handleUpdateStatus(apt._id, 'cancelled')}
                                  className="btn btn-action-cancel btn-sm"
                                  title="Cancel Appointment"
                                >
                                  Cancel
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteAppointment(apt._id)}
                                className="btn btn-outline btn-sm"
                                style={{ color: '#ef4444', borderColor: '#fecaca' }}
                                title="Delete Record"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        )}

        {/* TAB 2: CONSULTANT DOCTORS */}
        {activeTab === 'doctors' && (
          <main className="admin-content">
            <div className="controls-bar">
              <div className="search-box">
                <Search size={16} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Search doctor by name, qualifications, or specialty..."
                  value={doctorSearchQuery}
                  onChange={(e) => setDoctorSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <select
                  className="filter-select"
                  value={doctorDeptFilter}
                  onChange={(e) => setDoctorDeptFilter(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  <option value="Dental">🦷 Dental</option>
                  <option value="Skin">✨ Skin</option>
                  <option value="Hair">💇 Hair</option>
                </select>

                <button
                  onClick={fetchDoctors}
                  className="btn btn-outline"
                  style={{ padding: '8px 12px' }}
                  title="Refresh Doctors"
                >
                  <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* Doctors Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {filteredDoctors.map((doc) => (
                <div key={doc._id || doc.doctorId} className="stat-card" style={{ gap: '14px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '14px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                      <img
                        src={doc.image}
                        alt={doc.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <span className={`badge badge-${doc.department ? doc.department.toLowerCase() : 'dept'}`} style={{ fontSize: '0.65rem' }}>
                        {doc.department}
                      </span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '2px', color: 'var(--text-main)' }}>
                        {doc.name}
                      </h4>
                      <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {doc.title}
                      </p>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, background: 'var(--bg-main)', padding: '10px 12px', borderRadius: '10px' }}>
                    <div><strong>Credentials:</strong> {doc.qualifications}</div>
                    <div style={{ marginTop: '2px' }}><strong>Experience:</strong> {doc.experienceYears}+ Years</div>
                    <div style={{ marginTop: '2px' }}><strong>Availability:</strong> {doc.availability}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--secondary)' }}>
                      Fee: ₹{doc.fee?.toLocaleString('en-IN') || '1,500'}
                    </div>

                    <button
                      onClick={() => handleDeleteDoctor(doc._id || doc.doctorId, doc.name)}
                      className="btn btn-outline btn-sm"
                      style={{ color: '#ef4444', borderColor: '#fecaca' }}
                      title="Remove Doctor"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* TAB 3: ANALYTICS */}
        {activeTab === 'analytics' && (
          <main className="admin-content">
            <div className="table-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px' }}>
                Department Distribution & Performance
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div style={{ padding: '20px', borderRadius: '14px', background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                  <h4 style={{ fontWeight: 800, color: '#0369a1', fontSize: '1rem' }}>🦷 Dental Treatments</h4>
                  <p style={{ fontSize: '0.8rem', color: '#0284c7', marginTop: '4px' }}>
                    Implants, Clear Aligners, Laser RCT & Veneers
                  </p>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0c4a6e', marginTop: '12px' }}>
                    {appointments.filter((a) => a.department === 'Dental').length} Bookings
                  </div>
                </div>

                <div style={{ padding: '20px', borderRadius: '14px', background: '#fefce8', border: '1px solid #fef08a' }}>
                  <h4 style={{ fontWeight: 800, color: '#a16207', fontSize: '1rem' }}>✨ Dermatology & Skin</h4>
                  <p style={{ fontSize: '0.8rem', color: '#ca8a04', marginTop: '4px' }}>
                    HydraFacial, Acne Scar Revision, Melasma Peels
                  </p>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#713f12', marginTop: '12px' }}>
                    {appointments.filter((a) => a.department === 'Skin').length} Bookings
                  </div>
                </div>

                <div style={{ padding: '20px', borderRadius: '14px', background: '#faf5ff', border: '1px solid #e9d5ff' }}>
                  <h4 style={{ fontWeight: 800, color: '#7e22ce', fontSize: '1rem' }}>💇 Hair & Trichology</h4>
                  <p style={{ fontSize: '0.8rem', color: '#9333ea', marginTop: '4px' }}>
                    Bio-Sapphire FUE, GFC & PRP Scalp Therapies
                  </p>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#581c87', marginTop: '12px' }}>
                    {appointments.filter((a) => a.department === 'Hair').length} Bookings
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* TAB 4: THEME & APPEARANCE (ADMIN-ONLY THEME CONTROL) */}
        {activeTab === 'theme' && (
          <main className="admin-content">
            <div className="table-card" style={{ padding: '28px', maxWidth: '1200px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Palette size={20} color="var(--secondary)" />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      Global Website Theme & Color Palette
                    </h3>
                    <span style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', background: '#e0f2fe', color: '#0284c7', fontWeight: 700 }}>
                      Admin-Only Control
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '680px' }}>
                    The public website theme can only be updated from this administrator panel. When you apply a new theme below, it instantly saves to MongoDB and updates the entire live public website across all 10 pages in real time.
                  </p>
                </div>

                <a
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>Preview Live Website</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              {themeNotification && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: '#d1fae5',
                  border: '1px solid #6ee7b7',
                  color: '#065f46',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '20px'
                }}>
                  <CheckCircle2 size={18} />
                  <span>{themeNotification}</span>
                </div>
              )}

              {/* THEME PREVIEWS GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
                {CLINIC_THEMES.map((th) => {
                  const isActive = currentTheme === th.id;
                  return (
                    <div
                      key={th.id}
                      style={{
                        padding: '22px',
                        borderRadius: '16px',
                        background: '#ffffff',
                        border: isActive ? '2px solid #006a61' : '1px solid var(--border-color)',
                        boxShadow: isActive ? '0 10px 25px -5px rgba(0, 106, 97, 0.2)' : 'var(--shadow-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '16px',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {isActive && (
                        <div style={{
                          position: 'absolute',
                          top: '14px',
                          right: '14px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          background: '#d1fae5',
                          color: '#065f46',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          border: '1px solid #a7f3d0'
                        }}>
                          <Check size={12} />
                          <span>ACTIVE LIVE THEME</span>
                        </div>
                      )}

                      <div>
                        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
                          {th.badge}
                        </div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                          {th.name}
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                          {th.tagline}
                        </p>

                        {/* Color Swatches */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: th.primaryColor, border: '1px solid rgba(0,0,0,0.1)' }} />
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Primary</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: th.secondaryColor, border: '1px solid rgba(0,0,0,0.1)' }} />
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Secondary</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: th.accentColor, border: '1px solid rgba(0,0,0,0.1)' }} />
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Accent</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                            <div style={{ width: '56px', height: '28px', borderRadius: '6px', background: th.previewBg, border: '1px solid rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: th.textColor }}>
                              Aa
                            </div>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Canvas</span>
                          </div>
                        </div>

                        {/* Live UI Mock Preview */}
                        <div style={{
                          marginTop: '16px',
                          padding: '12px',
                          borderRadius: '10px',
                          background: th.previewBg,
                          border: '1px solid rgba(0,0,0,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: th.primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.65rem', fontWeight: 900 }}>
                              A
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: th.textColor }}>
                              PRALASH
                            </span>
                          </div>
                          <button
                            type="button"
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              background: th.secondaryColor,
                              color: '#ffffff',
                              border: 'none',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              cursor: 'default'
                            }}
                          >
                            Book Visit
                          </button>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div>
                        {isActive ? (
                          <div style={{
                            padding: '10px',
                            borderRadius: '10px',
                            background: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            textAlign: 'center',
                            color: '#166534',
                            fontWeight: 700,
                            fontSize: '0.82rem'
                          }}>
                            ✓ Currently Active on Public Site
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSelectTheme(th.id)}
                            disabled={updatingTheme}
                            className="btn btn-secondary"
                            style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}
                          >
                            <Palette size={14} />
                            <span>{updatingTheme ? 'Switching Theme...' : `Set "${th.name.split(' (')[0]}" as Active Theme`}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        )}
      </div>

      {/* APPOINTMENT DETAIL MODAL */}
      {selectedAppointment && (
        <div className="modal-overlay" onClick={() => setSelectedAppointment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div>
                <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--secondary)', fontSize: '0.85rem' }}>
                  {selectedAppointment.bookingReference}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2px' }}>
                  {selectedAppointment.patientName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.85rem' }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700 }}>PHONE</div>
                <div style={{ fontWeight: 600 }}>{selectedAppointment.phone}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700 }}>EMAIL</div>
                <div style={{ fontWeight: 600 }}>{selectedAppointment.email}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700 }}>DEPARTMENT</div>
                <div style={{ fontWeight: 600 }}>{selectedAppointment.department} Suite</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700 }}>ATTENDING DOCTOR</div>
                <div style={{ fontWeight: 600 }}>{selectedAppointment.doctor?.name || 'Duty Specialist'}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700 }}>DATE & TIME</div>
                <div style={{ fontWeight: 600 }}>{selectedAppointment.appointmentDate} at {selectedAppointment.timeSlot}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700 }}>CONSULTATION FEE</div>
                <div style={{ fontWeight: 800, color: 'var(--secondary)' }}>
                  ₹{(selectedAppointment.consultationFee || 1200).toLocaleString('en-IN')}
                </div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700 }}>CONFIRMATION EMAIL STATUS</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: '0.85rem' }}>
                  {selectedAppointment.confirmationEmailSent ? (
                    <span style={{ color: '#16a34a', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={14} /> Sent to {selectedAppointment.email}
                      {selectedAppointment.confirmationEmailSentAt && (
                        <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.75rem' }}>
                          ({new Date(selectedAppointment.confirmationEmailSentAt).toLocaleTimeString()})
                        </span>
                      )}
                    </span>
                  ) : (
                    <span style={{ color: '#b45309', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock3 size={14} /> Not Dispatched / Pending
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>
                PATIENT MEDICAL NOTES / PRIMARY COMPLAINT
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                {selectedAppointment.symptomsOrNotes || 'No specific clinical symptoms or advance notes provided.'}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px' }}>
              <button
                onClick={() => handleResendEmail(selectedAppointment._id)}
                disabled={sendingEmailId === selectedAppointment._id}
                className="btn btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                title="Send confirmation email to patient"
              >
                <Mail size={15} />
                <span>
                  {sendingEmailId === selectedAppointment._id
                    ? 'Dispatching Mail...'
                    : selectedAppointment.confirmationEmailSent
                    ? 'Resend Email'
                    : 'Send Confirmation Email'}
                </span>
              </button>

              {selectedAppointment.status === 'pending' && (
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedAppointment._id, 'confirmed');
                    setSelectedAppointment(null);
                  }}
                  className="btn btn-secondary"
                >
                  <Check size={16} />
                  <span>Confirm Appointment</span>
                </button>
              )}
              <button onClick={() => setSelectedAppointment(null)} className="btn btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW APPOINTMENT MODAL */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Create Walk-In Appointment</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Register patient appointment and save directly to MongoDB
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateAppointmentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={newBooking.patientName}
                    onChange={(e) => setNewBooking({ ...newBooking, patientName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={newBooking.phone}
                    onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="patient@example.com"
                  value={newBooking.email}
                  onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Specialty Department</label>
                  <select
                    value={newBooking.department}
                    onChange={(e) => setNewBooking({ ...newBooking, department: e.target.value })}
                  >
                    <option value="Dental">🦷 Dental Care</option>
                    <option value="Skin">✨ Dermatology & Skin</option>
                    <option value="Hair">💇 Hair & Trichology</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Attending Consultant</label>
                  <select
                    value={newBooking.doctorName}
                    onChange={(e) => setNewBooking({ ...newBooking, doctorName: e.target.value })}
                  >
                    {doctors.length > 0 ? (
                      doctors.map((d) => (
                        <option key={d._id || d.doctorId} value={d.name}>
                          {d.name} ({d.department} - ₹{d.fee})
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Dr. Marcus Thornton">Dr. Marcus Thornton (Dental - ₹1,400)</option>
                        <option value="Dr. Priya Nair">Dr. Priya Nair (Hair - ₹1,500)</option>
                        <option value="Dr. Kavita Sharma">Dr. Kavita Sharma (Skin - ₹1,500)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Appointment Date</label>
                  <input
                    type="date"
                    required
                    value={newBooking.appointmentDate}
                    onChange={(e) => setNewBooking({ ...newBooking, appointmentDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Time Slot</label>
                  <select
                    value={newBooking.timeSlot}
                    onChange={(e) => setNewBooking({ ...newBooking, timeSlot: e.target.value })}
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Procedure / Treatment</label>
                <input
                  type="text"
                  placeholder="e.g. Bio-Sapphire FUE Consultation or HydraFacial"
                  value={newBooking.treatment}
                  onChange={(e) => setNewBooking({ ...newBooking, treatment: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Medical Symptoms / Notes</label>
                <textarea
                  rows={2}
                  placeholder="Optional patient notes or prior history..."
                  value={newBooking.symptomsOrNotes}
                  onChange={(e) => setNewBooking({ ...newBooking, symptomsOrNotes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-secondary">
                  Save Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD NEW DOCTOR MODAL */}
      {showAddDoctorModal && (
        <div className="modal-overlay" onClick={() => setShowAddDoctorModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Add New Specialist Doctor</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Save to MongoDB and dynamically render to website
                </p>
              </div>
              <button
                onClick={() => setShowAddDoctorModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddDoctorSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Doctor Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Khanna"
                    value={newDoctor.name}
                    onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Department *</label>
                  <select
                    value={newDoctor.department}
                    onChange={(e) => setNewDoctor({ ...newDoctor, department: e.target.value })}
                  >
                    <option value="Dental">🦷 Dental Care</option>
                    <option value="Skin">✨ Dermatology & Skin</option>
                    <option value="Hair">💇 Hair & Trichology</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Professional Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Consultant Periodontist & Implant Surgeon"
                  value={newDoctor.title}
                  onChange={(e) => setNewDoctor({ ...newDoctor, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Qualifications *</label>
                  <input
                    type="text"
                    required
                    placeholder="BDS, MDS, FDS RCS"
                    value={newDoctor.qualifications}
                    onChange={(e) => setNewDoctor({ ...newDoctor, qualifications: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Experience (Years) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="50"
                    value={newDoctor.experienceYears}
                    onChange={(e) => setNewDoctor({ ...newDoctor, experienceYears: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Consultation Fee (INR ₹) *</label>
                  <input
                    type="number"
                    required
                    min="500"
                    step="50"
                    value={newDoctor.fee}
                    onChange={(e) => setNewDoctor({ ...newDoctor, fee: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Availability Schedule</label>
                  <input
                    type="text"
                    placeholder="Mon, Wed, Fri (9:00 AM - 4:00 PM)"
                    value={newDoctor.availability}
                    onChange={(e) => setNewDoctor({ ...newDoctor, availability: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CloudUpload size={16} color="var(--secondary)" />
                    <strong>Doctor Photo (Cloudinary Storage Only) *</strong>
                  </span>
                  {uploadingDoctorPhoto && (
                    <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 700 }}>
                      Uploading to Cloudinary...
                    </span>
                  )}
                  {photoUploadSuccess && (
                    <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                      ✓ Stored on Cloudinary
                    </span>
                  )}
                </label>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '4px' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleDoctorPhotoFileSelect}
                    style={{ fontSize: '0.82rem', padding: '6px', border: '1px dashed var(--border-color)', borderRadius: '8px', width: '100%' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                  {newDoctor.image && (
                    <img
                      src={newDoctor.image}
                      alt="Doctor Preview"
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '10px',
                        objectFit: 'cover',
                        border: '2px solid #006a61',
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Direct Cloudinary URL or image source..."
                    value={newDoctor.image}
                    onChange={(e) => setNewDoctor({ ...newDoctor, image: e.target.value })}
                    style={{ fontSize: '0.78rem', color: '#64748b' }}
                  />
                </div>
                <span style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '3px', display: 'block' }}>
                  ☁️ Automatically uploaded & permanently hosted on Cloudinary (cloud: dcahokqjx).
                </span>
              </div>

              <div className="form-group">
                <label>Specializations (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Dental Implants, Smile Design, Bone Grafting"
                  value={newDoctor.specializations}
                  onChange={(e) => setNewDoctor({ ...newDoctor, specializations: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Clinical Biography *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Brief doctor bio highlighting medical credentials and patient philosophy..."
                  value={newDoctor.bio}
                  onChange={(e) => setNewDoctor({ ...newDoctor, bio: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddDoctorModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-secondary">
                  Save Doctor to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
