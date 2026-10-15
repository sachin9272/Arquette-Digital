# PRALASH Clinic - Admin Panel (React App)

A modern, responsive, clinical administration React application built with **Vite + React 19 + Lucide Icons** to monitor, triage, and manage patient appointments for **PRALASH Dermystique & Dentique** multi-speciality clinic.

---

## 🚀 Features

- **📊 Live Clinical Dashboard**: Real-time KPI summary cards (Total Bookings, Pending Review, Confirmed Appointments, and Estimated Consultation Fee Revenue in INR ₹).
- **📋 Appointment Registry**: Full table view displaying Booking Reference (`PRL-2026-XXXX`), Patient Name, Phone, Email, Specialty, Attending Doctor, Treatment, Date, and Time Slot.
- **🔍 Real-Time Search & Multi-Filters**: Instant search across patient names, contact info, and reference IDs, with one-click filtering by Specialty (`Dental`, `Skin`, `Hair`) and Status (`Pending`, `Confirmed`, `Completed`, `Cancelled`).
- **⚡ 1-Click Status Triage**: Quick action buttons to **Confirm**, **Complete**, or **Cancel** appointments.
- **👁️ Medical Notes & Detail Modal**: Inspect patient complaints, prior clinical notes, and assigned doctor details.
- **➕ New Walk-In Booking Modal**: Receptionist tool to quickly register new appointments directly into the database.
- **📑 Export CSV**: One-click spreadsheet export for clinical reporting and accounting.
- **🛡️ Resilient Dual-Mode**: Automatically syncs with the Node.js + MongoDB backend on `http://localhost:5000`, with high-fidelity sample data fallback if the database server is offline.

---

## 🛠 Running the Admin Panel

```bash
cd adminpanel
npm install
npm run dev
```

The application will start on: **`http://localhost:3001`**

---

## 🔗 Architecture Overview

```
PRALASH Clinic Ecosystem:
├── frontend/     (Port 3000) -> Public 10-page patient website with booking engine & AI chatbot
├── backend/      (Port 5000) -> Express.js + MongoDB REST API (/api/appointments)
└── adminpanel/   (Port 3001) -> Dedicated React app for clinic coordinators & doctors
```
