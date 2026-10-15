# PRALASH Clinic - Node.js & MongoDB Backend

Robust Node.js and MongoDB REST API backend for **PRALASH Dermystique & Dentique** clinic to manage patient appointment bookings, doctor assignments, and admin management dashboards.

---

## 🛠 Tech Stack
- **Runtime:** Node.js (v20+)
- **Framework:** Express.js 4.x
- **Database:** MongoDB via Mongoose 8.x
- **CORS:** Configured for Next.js frontend (`http://localhost:3000`)
- **Logger:** Morgan HTTP request logger

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                        # MongoDB connection & reconnection handler
│   ├── models/
│   │   └── Appointment.js               # Mongoose Schema & unique booking reference generator
│   ├── controllers/
│   │   └── appointmentController.js     # Booking logic, admin queries, status updates & stats
│   ├── routes/
│   │   └── appointmentRoutes.js         # REST endpoints mapping
│   └── server.js                        # Express server entry point
├── .env.example
├── .env                                 # Configuration file (PORT, MONGODB_URI)
├── package.json
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Verify or edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/pralash_clinic
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```
> *Tip: You can use a local MongoDB instance (`mongodb://127.0.0.1:27017/...`) or a MongoDB Atlas cloud connection string (`mongodb+srv://<user>:<password>@cluster.mongodb.net/pralash_clinic`).*

### 3. Run Development Server
```bash
npm run dev
```
Server will start on: **`http://localhost:5000`**

---

## 📡 API Endpoints

### 1. Public Booking API
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/appointments` | Register a new patient booking |
| `GET` | `/api/appointments/:id` | Get single appointment by MongoDB `_id` or `bookingReference` (e.g. `PRL-2026-123456`) |

#### Sample Request Body (`POST /api/appointments`):
```json
{
  "patientName": "Aarav Sharma",
  "email": "aarav.sharma@example.com",
  "phone": "+91 98765 43210",
  "age": 29,
  "gender": "male",
  "department": "Hair",
  "doctor": {
    "id": "dr-priya-nair",
    "name": "Dr. Priya Nair",
    "title": "Senior Trichologist & Hair Transplant Surgeon",
    "fee": 1500
  },
  "treatment": "Growth Factor Concentrate (GFC) Advanced Therapy",
  "appointmentDate": "2026-10-22",
  "timeSlot": "11:30 AM",
  "symptomsOrNotes": "Experiencing active diffuse hair thinning for 4 months.",
  "consultationFee": 1500
}
```

---

### 2. Admin Management APIs
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/appointments` | List all bookings with filtering & search |
| `PATCH` | `/api/appointments/:id` | Update status (`confirmed`, `completed`, `cancelled`) or add admin notes |
| `DELETE` | `/api/appointments/:id` | Cancel/remove an appointment |
| `GET` | `/api/appointments/stats/overview` | Admin dashboard analytics & revenue summary |

#### Query Parameters for `GET /api/appointments`:
- `status`: Filter by `pending`, `confirmed`, `completed`, or `cancelled`
- `department`: Filter by `Dental`, `Skin`, or `Hair`
- `search`: Case-insensitive search on patient name, email, phone, or reference code
- `date`: Filter by specific appointment date (`YYYY-MM-DD`)
- `page` & `limit`: Pagination parameters

---

## 🔒 Status Lifecycle
```
[pending] ──(Admin approves)──> [confirmed] ──(Patient visits)──> [completed]
    │                                  │
    └──────────(Cancelled)─────────────┴───────> [cancelled]
```
