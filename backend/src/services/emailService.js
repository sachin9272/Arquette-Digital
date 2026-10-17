import nodemailer from 'nodemailer';

/**
 * Configure Nodemailer Transporter using environment variables.
 * Supports SMPT_MAIL / SMPT_PASSWORD (as defined in .env) and SMTP_MAIL / SMTP_PASSWORD fallbacks.
 */
const getTransporter = () => {
  const user = (process.env.SMPT_MAIL || process.env.SMTP_MAIL || process.env.EMAIL_USER || '').trim().replace(/^["']|["']$/g, '');
  const rawPass = (process.env.SMPT_PASSWORD || process.env.SMTP_PASSWORD || process.env.EMAIL_PASS || '').trim().replace(/^["']|["']$/g, '');
  // Strip extraneous spaces from Gmail 16-character App Passwords
  const pass = rawPass.replace(/\s+/g, '');

  if (!user || !pass) {
    console.warn('⚠️ [Email Service] SMPT_MAIL or SMPT_PASSWORD not defined in environment variables.');
    return null;
  }

  const customHost = (process.env.SMTP_HOST || '').trim();
  const customPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;

  if (customHost) {
    return nodemailer.createTransport({
      host: customHost,
      port: customPort,
      secure: customPort === 465,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
    // Optional timeout settings to prevent hanging connections
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
};

/**
 * Test SMTP connection and print status to console
 */
const verifySmtpConnection = async () => {
  try {
    const transporter = getTransporter();
    if (!transporter) return false;
    await transporter.verify();
    console.log('✅ [Email Service] SMTP connection established successfully with Gmail service.');
    return true;
  } catch (error) {
    if (error.responseCode === 535 || error.message.includes('535') || error.message.includes('BadCredentials')) {
      console.error('❌ [Email Service] SMTP authentication failed: Invalid Gmail credentials (535 Bad Credentials).');
      console.error('👉 Fix: Please generate a 16-character Google App Password (not your normal Google account password) at https://myaccount.google.com/apppasswords and update SMPT_PASSWORD in backend/.env');
    } else {
      console.error('❌ [Email Service] SMTP connection verification failed:', error.message);
    }
    return false;
  }
};

/**
 * Format date nicely for email display (e.g., "Saturday, 24 October 2026")
 */
const formatFriendlyDate = (dateStr) => {
  if (!dateStr) return 'Scheduled Date';
  try {
    const [year, month, day] = dateStr.split('-');
    if (year && month && day) {
      const d = new Date(Number(year), Number(month) - 1, Number(day));
      return d.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
};

/**
 * Generate iCalendar (ICS) event buffer for email attachment
 */
const generateIcsAttachment = (appointment) => {
  const ref = appointment.bookingReference || 'PRL-APPOINTMENT';
  const patient = appointment.patientName || 'Patient';
  const doctorName = appointment.doctor?.name || 'PRALASH Specialist Consultant';
  const dept = appointment.department || 'Consultation';
  const dateStr = appointment.appointmentDate ? appointment.appointmentDate.replace(/-/g, '') : '20261020';

  // Construct start date string YYYYMMDD
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PRALASH Dermystique & Dentique//Appointment Scheduler//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${ref}@pralash.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART;VALUE=DATE:${dateStr}`,
    `SUMMARY:Medical Consultation with ${doctorName} (${dept})`,
    `DESCRIPTION:Appointment Reference: ${ref}\\nPatient: ${patient}\\nDepartment: ${dept}\\nTreatment: ${appointment.treatment || dept}\\nTime Slot: ${appointment.timeSlot}\\nLocation: PRALASH Clinic, Kalyan Nagar, Bengaluru. Phone: +91 99005 17699`,
    'LOCATION:PRALASH Clinic, Block 1, 708, 3rd Cross Rd, HRBR Layout 1st Block, Kalyan Nagar, Bengaluru 560043',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT120M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Upcoming Consultation at PRALASH Clinic in 2 hours',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return {
    filename: `PRALASH_Appointment_${ref}.ics`,
    content: icsData,
    contentType: 'text/calendar; charset=utf-8; method=REQUEST',
  };
};

/**
 * Generate modern responsive HTML email template for Booking Confirmation
 */
const generateEmailHtml = (appointment) => {
  const ref = appointment.bookingReference || 'N/A';
  const patientName = appointment.patientName || 'Valued Patient';
  const doctorName = appointment.doctor?.name || 'PRALASH Specialist Consultant';
  const doctorTitle = appointment.doctor?.title || 'Senior Consultant';
  const department = appointment.department || 'Clinical Consultation';
  const treatment = appointment.treatment || `${department} Specialist Consultation`;
  const dateDisplay = formatFriendlyDate(appointment.appointmentDate);
  const timeSlot = appointment.timeSlot || 'Scheduled Slot';
  const fee = appointment.consultationFee ? `₹${appointment.consultationFee.toLocaleString('en-IN')}` : '₹1,200';
  const paymentStatus = appointment.paymentStatus === 'paid' ? 'Paid Online' : 'Pay at Clinic Reception';

  const deptBadgeColors = {
    Dental: { bg: '#E0F2FE', text: '#0369A1', border: '#BAE6FD' },
    Skin: { bg: '#FCE7F3', text: '#BE185D', border: '#FBCFE8' },
    Hair: { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
  };
  const badge = deptBadgeColors[department] || { bg: '#F1F5F9', text: '#334155', border: '#CBD5E1' };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation - PRALASH Clinic</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
    }
    img {
      border: 0;
      display: block;
    }
    .wrapper {
      width: 100%;
      background-color: #f1f5f9;
      padding: 30px 12px;
    }
    .container {
      max-width: 620px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
      border: 1px solid #e2e8f0;
    }
    .header-banner {
      background: linear-gradient(135deg, #094052 0%, #0D5C75 60%, #14B8A6 100%);
      padding: 36px 32px 30px;
      text-align: center;
      color: #ffffff;
    }
    .clinic-brand {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #ffffff;
      margin: 0 0 6px;
      text-transform: uppercase;
    }
    .clinic-tagline {
      font-size: 13px;
      color: #ccfbf1;
      margin: 0;
      font-weight: 500;
      letter-spacing: 0.3px;
    }
    .status-badge-wrapper {
      margin-top: 20px;
      display: inline-block;
      background-color: rgba(255, 255, 255, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 9999px;
      padding: 6px 18px;
    }
    .status-badge-text {
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .content-body {
      padding: 32px;
    }
    .greeting-title {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 8px;
    }
    .greeting-desc {
      font-size: 14px;
      line-height: 1.6;
      color: #475569;
      margin: 0 0 24px;
    }
    .ticket-card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .ticket-header {
      border-bottom: 1px dashed #cbd5e1;
      padding-bottom: 16px;
      margin-bottom: 18px;
    }
    .ref-label {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.8px;
      margin: 0 0 4px;
    }
    .ref-value {
      font-size: 22px;
      font-family: 'Courier New', Courier, monospace;
      font-weight: 800;
      color: #0D5C75;
      letter-spacing: 1px;
      margin: 0;
    }
    .detail-row {
      margin-bottom: 14px;
    }
    .detail-label {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-bottom: 2px;
    }
    .detail-value {
      font-size: 15px;
      font-weight: 600;
      color: #0f172a;
    }
    .highlight-pill {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 6px;
      text-transform: uppercase;
    }
    .action-button {
      display: inline-block;
      background: #0D5C75;
      color: #ffffff !important;
      text-decoration: none;
      padding: 13px 26px;
      font-size: 14px;
      font-weight: 700;
      border-radius: 10px;
      margin-top: 6px;
      text-align: center;
    }
    .instructions-box {
      background-color: #eff6ff;
      border-left: 4px solid #3b82f6;
      border-radius: 8px;
      padding: 18px;
      margin-bottom: 24px;
    }
    .instructions-title {
      font-size: 13px;
      font-weight: 700;
      color: #1e3a8a;
      text-transform: uppercase;
      margin: 0 0 8px;
      letter-spacing: 0.5px;
    }
    .instructions-list {
      margin: 0;
      padding-left: 18px;
      color: #1e40af;
      font-size: 13px;
      line-height: 1.6;
    }
    .location-card {
      background-color: #fcfcfc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .footer-section {
      background-color: #0f172a;
      color: #94a3b8;
      padding: 28px 32px;
      font-size: 12px;
      line-height: 1.6;
      text-align: center;
    }
    .footer-link {
      color: #38bdf8;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      
      <!-- HEADER -->
      <div class="header-banner">
        <div class="clinic-brand">PRALASH</div>
        <div class="clinic-tagline">Dermystique &amp; Dentique • Advanced Multi-Specialty Care</div>
        <div class="status-badge-wrapper">
          <span class="status-badge-text">✓ Appointment Confirmed</span>
        </div>
      </div>

      <!-- MAIN CONTENT -->
      <div class="content-body">
        <div class="greeting-title">Hello ${patientName},</div>
        <p class="greeting-desc">
          Your appointment at <strong>PRALASH Dermystique &amp; Dentique</strong> has been successfully confirmed. 
          Our clinical specialists are ready to welcome you. Below is your official consultation summary and visit guide.
        </p>

        <!-- BOOKING PASS TICKET -->
        <div class="ticket-card">
          <div class="ticket-header">
            <div class="ref-label">Official Booking Reference</div>
            <div class="ref-value">${ref}</div>
          </div>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%" valign="top" class="detail-row">
                <div class="detail-label">Date &amp; Day</div>
                <div class="detail-value" style="color: #0D5C75;">📅 ${dateDisplay}</div>
              </td>
              <td width="50%" valign="top" class="detail-row">
                <div class="detail-label">Confirmed Time Slot</div>
                <div class="detail-value" style="color: #0D5C75;">⏰ ${timeSlot}</div>
              </td>
            </tr>

            <tr>
              <td width="50%" valign="top" class="detail-row">
                <div class="detail-label">Department</div>
                <div style="margin-top: 4px;">
                  <span class="highlight-pill" style="background-color: ${badge.bg}; color: ${badge.text}; border: 1px solid ${badge.border};">
                    ${department} Care
                  </span>
                </div>
              </td>
              <td width="50%" valign="top" class="detail-row">
                <div class="detail-label">Procedure / Consultation</div>
                <div class="detail-value">${treatment}</div>
              </td>
            </tr>

            <tr>
              <td width="50%" valign="top" class="detail-row">
                <div class="detail-label">Attending Specialist</div>
                <div class="detail-value">${doctorName}</div>
                <div style="font-size: 11px; color: #64748b;">${doctorTitle}</div>
              </td>
              <td width="50%" valign="top" class="detail-row">
                <div class="detail-label">Consultation Fee</div>
                <div class="detail-value">${fee}</div>
                <div style="font-size: 11px; color: #16a34a; font-weight: 600;">Status: ${paymentStatus}</div>
              </td>
            </tr>

            ${appointment.phone
      ? `
            <tr>
              <td colspan="2" valign="top" class="detail-row" style="padding-top: 6px; border-top: 1px solid #f1f5f9;">
                <div class="detail-label">Registered Contact Phone</div>
                <div class="detail-value" style="font-size: 13px;">📞 ${appointment.phone}</div>
              </td>
            </tr>`
      : ''
    }
          </table>
        </div>

        <!-- CLINIC LOCATION -->
        <div class="location-card">
          <div style="font-size: 12px; font-weight: 700; color: #0D5C75; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
            📍 Clinic Location &amp; Directions
          </div>
          <div style="font-size: 14px; font-weight: 600; color: #0f172a; margin-bottom: 4px;">
            PRALASH Dermystique &amp; Dentique Multi-Specialty Clinic
          </div>
          <div style="font-size: 13px; color: #475569; line-height: 1.5; margin-bottom: 12px;">
            Block 1, 708, 3rd Cross Rd, HRBR Layout 1st Block, Kalyan Nagar, Bengaluru, Karnataka 560043.<br>
            <span style="font-size: 12px; color: #64748b;">(2 mins from Kalyan Nagar Bus Depot. Dedicated patient parking available).</span>
          </div>
          <a href="https://maps.google.com/?q=PRALASH+Clinic+HRBR+Layout+Kalyan+Nagar+Bengaluru" target="_blank" class="action-button">
            View on Google Maps →
          </a>
        </div>

        <!-- CLINICAL CHECKLIST & INSTRUCTIONS -->
        <div class="instructions-box">
          <div class="instructions-title">📋 Patient Visit Guidelines</div>
          <ul class="instructions-list">
            <li><strong>Arrival:</strong> Please arrive 10-15 minutes prior to your designated time slot to complete initial health screening.</li>
            <li><strong>Medical Records:</strong> Kindly bring past diagnostic X-rays, lab investigations, or relevant doctor prescriptions.</li>
            <li><strong>Sterilization:</strong> PRALASH follows strict hospital-grade Class-B autoclave sterilization protocols for patient safety.</li>
            <li><strong>Rescheduling:</strong> If you need to modify your booking time, please call our desk at least 2 hours in advance.</li>
          </ul>
        </div>

        <!-- CONTACT HELPLINE -->
        <div style="text-align: center; padding: 12px 0;">
          <div style="font-size: 13px; color: #64748b; margin-bottom: 6px;">Need immediate assistance or have clinical questions?</div>
          <div style="font-size: 15px; font-weight: 700; color: #0D5C75;">
            📞 Helpline: <a href="tel:+919900517699" style="color: #0D5C75; text-decoration: none;">+91 99005 17699</a> &nbsp;|&nbsp; 
            ✉️ Email: <a href="mailto:care@pralash.com" style="color: #0D5C75; text-decoration: none;">care@pralash.com</a>
          </div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">
            Open All 7 Days: 9:30 AM – 8:00 PM
          </div>
        </div>

      </div>

      <!-- FOOTER -->
      <div class="footer-section">
        <p style="margin: 0 0 8px; font-weight: 600; color: #f8fafc;">
          PRALASH Dermystique &amp; Dentique Multi-Specialty Clinic
        </p>
        <p style="margin: 0 0 12px; font-size: 11px; color: #64748b;">
          Awarded 4.8★ Rated Clinic in Bangalore • Bio-Sapphire FUE &amp; GFC Center • Digital CAD/CAM Implant Suite • CDSI &amp; ISHRS Registered
        </p>
        <p style="margin: 0; font-size: 11px; color: #475569;">
          This is an automated confirmation email regarding your confirmed clinical reservation at PRALASH.
        </p>
      </div>

    </div>
  </div>
</body>
</html>
  `.trim();
};

/**
 * Generate plain-text version of confirmation email
 */
const generateEmailText = (appointment) => {
  const ref = appointment.bookingReference || 'N/A';
  const patient = appointment.patientName || 'Patient';
  const doc = appointment.doctor?.name || 'PRALASH Specialist Consultant';
  const dept = appointment.department || 'Consultation';
  const dateStr = formatFriendlyDate(appointment.appointmentDate);
  const time = appointment.timeSlot || 'Scheduled Time';
  const fee = appointment.consultationFee ? `₹${appointment.consultationFee}` : '₹1,200';

  return `
PRALASH Dermystique & Dentique - Appointment Confirmed
======================================================

Dear ${patient},

Your appointment has been confirmed at PRALASH Dermystique & Dentique Multi-Specialty Clinic.

APPOINTMENT SUMMARY:
-------------------
• Booking Reference: ${ref}
• Date: ${dateStr}
• Time Slot: ${time}
• Department: ${dept} Care
• Procedure / Purpose: ${appointment.treatment || dept}
• Attending Specialist: ${doc}
• Consultation Fee: ${fee} (Pay at Clinic Reception)
• Patient Phone: ${appointment.phone || 'N/A'}

CLINIC LOCATION:
---------------
PRALASH Dermystique & Dentique
Block 1, 708, 3rd Cross Rd, HRBR Layout 1st Block, Kalyan Nagar, Bengaluru, Karnataka 560043.
(Landmark: Near Kalyan Nagar Bus Depot. Dedicated patient parking available).

PATIENT GUIDELINES:
------------------
1. Please arrive 10-15 minutes prior to your appointment.
2. Kindly carry any prior dental X-rays, skin reports, or medication history.
3. For rescheduling or queries, reach us at:
   - Phone: +91 99005 17699
   - Email: care@pralash.com
   - Open All 7 Days: 9:30 AM – 8:00 PM

We look forward to providing you with world-class clinical care!

Warm regards,
Patient Care Team
PRALASH Dermystique & Dentique Multi-Specialty Clinic
Bengaluru, India
`.trim();
};

/**
 * Core function: Dispatches appointment booking confirmation email
 *
 * @param {Object} appointment - Mongoose appointment document or plain object
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
const sendBookingConfirmationEmail = async (appointment) => {
  try {
    if (!appointment || !appointment.email) {
      console.warn('⚠️ [Email Service] Skipping email: Appointment has no recipient email address.');
      return { success: false, error: 'Recipient email missing' };
    }

    const transporter = getTransporter();
    if (!transporter) {
      console.warn('⚠️ [Email Service] Transporter not initialized. Check SMPT_MAIL & SMPT_PASSWORD.');
      return { success: false, error: 'SMTP transporter not configured' };
    }

    const senderMail = process.env.SMPT_MAIL || process.env.SMTP_MAIL || 'care@pralash.com';
    const fromAddress = `"PRALASH Clinic" <${senderMail}>`;
    const subject = `Confirmed: Your Consultation at PRALASH Clinic (${appointment.bookingReference || 'Medical Booking'})`;

    const mailOptions = {
      from: fromAddress,
      to: appointment.email.trim(),
      subject,
      text: generateEmailText(appointment),
      html: generateEmailHtml(appointment),
      attachments: [generateIcsAttachment(appointment)],
    };

    console.log(`📨 [Email Service] Sending booking confirmation email to: ${appointment.email} (Ref: ${appointment.bookingReference})...`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ [Email Service] Confirmation email delivered! Message ID: ${info.messageId}`);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error(`❌ [Email Service] Failed to send email to ${appointment?.email}:`, error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Generate responsive HTML email for appointment rejection / cancellation
 */
const generateRejectionEmailHtml = (appointment, reason) => {
  const ref = appointment.bookingReference || 'N/A';
  const patientName = appointment.patientName || 'Valued Patient';
  const doctorName = appointment.doctor?.name || 'Specialist Consultant';
  const department = appointment.department || 'Clinical';
  const dateDisplay = formatFriendlyDate(appointment.appointmentDate);
  const timeSlot = appointment.timeSlot || 'Requested Slot';
  const cleanReason =
    reason ||
    appointment.rejectionReason ||
    appointment.adminNotes ||
    'Requested doctor or clinical operatory is fully committed for the selected time window.';
  const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Update - PRALASH Clinic</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
    }
    .wrapper {
      width: 100%;
      background-color: #f1f5f9;
      padding: 30px 12px;
    }
    .container {
      max-width: 620px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
    }
    .header-banner {
      background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
      padding: 36px 32px 30px;
      text-align: center;
      color: #ffffff;
    }
    .clinic-brand {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #ffffff;
      margin: 0 0 6px;
      text-transform: uppercase;
    }
    .clinic-tagline {
      font-size: 13px;
      color: #cbd5e1;
      margin: 0;
      font-weight: 500;
    }
    .status-badge-wrapper {
      margin-top: 18px;
      display: inline-block;
      background-color: rgba(239, 68, 68, 0.18);
      border: 1px solid rgba(239, 68, 68, 0.4);
      border-radius: 9999px;
      padding: 6px 18px;
    }
    .status-badge-text {
      color: #fca5a5;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .content-body {
      padding: 32px;
    }
    .greeting-title {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 8px;
    }
    .greeting-desc {
      font-size: 14px;
      line-height: 1.6;
      color: #475569;
      margin: 0 0 24px;
    }
    .ticket-card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #ef4444;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .ticket-header {
      border-bottom: 1px dashed #cbd5e1;
      padding-bottom: 12px;
      margin-bottom: 14px;
    }
    .ref-label {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 700;
      color: #64748b;
      margin: 0 0 4px;
    }
    .ref-value {
      font-size: 20px;
      font-family: 'Courier New', Courier, monospace;
      font-weight: 800;
      color: #334155;
      margin: 0;
    }
    .detail-label {
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .detail-value {
      font-size: 13px;
      font-weight: 600;
      color: #1e293b;
    }
    .reason-box {
      margin-top: 14px;
      padding: 12px 14px;
      background-color: #fff1f2;
      border: 1px solid #fecdd3;
      border-radius: 8px;
    }
    .action-button {
      display: inline-block;
      background: linear-gradient(135deg, #094052 0%, #0D5C75 100%);
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(13, 92, 117, 0.25);
    }
    .footer-section {
      background-color: #0f172a;
      padding: 24px;
      text-align: center;
      color: #94a3b8;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      
      <!-- HEADER -->
      <div class="header-banner">
        <div class="clinic-brand">PRALASH CLINIC</div>
        <div class="clinic-tagline">Dermystique &amp; Dentique • Kalyan Nagar, Bengaluru</div>
        <div class="status-badge-wrapper">
          <span class="status-badge-text">Appointment Status: Slot Unavailable</span>
        </div>
      </div>

      <!-- BODY -->
      <div class="content-body">
        <h2 class="greeting-title">Dear ${patientName},</h2>
        <p class="greeting-desc">
          Thank you for reaching out to PRALASH Dermystique &amp; Dentique. We are writing to update you regarding your requested consultation. Regrettably, our clinical desk is unable to confirm this specific slot:
        </p>

        <!-- TICKET SUMMARY -->
        <div class="ticket-card">
          <div class="ticket-header">
            <div class="ref-label">Booking Reference</div>
            <div class="ref-value">${ref}</div>
          </div>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%" valign="top" style="padding-bottom: 12px;">
                <div class="detail-label">Requested Date</div>
                <div class="detail-value">📅 ${dateDisplay}</div>
              </td>
              <td width="50%" valign="top" style="padding-bottom: 12px;">
                <div class="detail-label">Requested Time Slot</div>
                <div class="detail-value">⏰ ${timeSlot}</div>
              </td>
            </tr>
            <tr>
              <td width="50%" valign="top">
                <div class="detail-label">Department</div>
                <div class="detail-value">${department} Care</div>
              </td>
              <td width="50%" valign="top">
                <div class="detail-label">Attending Specialist</div>
                <div class="detail-value">${doctorName}</div>
              </td>
            </tr>
          </table>

          <div class="reason-box">
            <div style="font-size: 11px; font-weight: 700; color: #be123c; text-transform: uppercase; margin-bottom: 3px;">
              Clinical Desk Note / Reason:
            </div>
            <div style="font-size: 13px; color: #881337; line-height: 1.5;">
              ${cleanReason}
            </div>
          </div>
        </div>

        <!-- RESCHEDULE CTA -->
        <div style="text-align: center; margin: 24px 0 28px;">
          <a href="${frontendUrl}/booking?dept=${department}" target="_blank" class="action-button">
            📅 Select an Alternative Slot Online →
          </a>
          <div style="font-size: 11px; color: #64748b; margin-top: 8px;">
            Zero advance fee required • Instant priority rescheduling
          </div>
        </div>

        <!-- CONTACT HELPLINE -->
        <div style="text-align: center; padding: 14px 0; border-top: 1px solid #f1f5f9;">
          <div style="font-size: 13px; color: #64748b; margin-bottom: 6px;">Prefer to coordinate directly with our patient triage team?</div>
          <div style="font-size: 15px; font-weight: 700; color: #0D5C75;">
            📞 Priority Phone: <a href="tel:+919900517699" style="color: #0D5C75; text-decoration: none;">+91 99005 17699</a> &nbsp;|&nbsp; 
            ✉️ Email: <a href="mailto:care@pralash.com" style="color: #0D5C75; text-decoration: none;">care@pralash.com</a>
          </div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">
            Open All 7 Days: 9:30 AM – 8:00 PM (Valet parking available)
          </div>
        </div>

      </div>

      <!-- FOOTER -->
      <div class="footer-section">
        <p style="margin: 0 0 6px; font-weight: 600; color: #f8fafc;">
          PRALASH Dermystique &amp; Dentique Multi-Specialty Clinic
        </p>
        <p style="margin: 0; font-size: 11px; color: #64748b;">
          Block 1, 708, 3rd Cross Rd, HRBR Layout 1st Block, Kalyan Nagar, Bengaluru 560043
        </p>
      </div>

    </div>
  </div>
</body>
</html>
  `.trim();
};

/**
 * Generate plain-text version of rejection email
 */
const generateRejectionEmailText = (appointment, reason) => {
  const ref = appointment.bookingReference || 'N/A';
  const patient = appointment.patientName || 'Patient';
  const doc = appointment.doctor?.name || 'Specialist Consultant';
  const dept = appointment.department || 'Consultation';
  const dateStr = formatFriendlyDate(appointment.appointmentDate);
  const time = appointment.timeSlot || 'Requested Time';
  const cleanReason =
    reason ||
    appointment.rejectionReason ||
    appointment.adminNotes ||
    'Requested doctor or slot is unavailable.';
  const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');

  return `
PRALASH Dermystique & Dentique - Appointment Status Update
==========================================================

Dear ${patient},

Thank you for choosing PRALASH Dermystique & Dentique Multi-Specialty Clinic.

We regret to inform you that your requested appointment slot could not be confirmed:

• Booking Reference: ${ref}
• Requested Date: ${dateStr}
• Requested Slot: ${time}
• Department: ${dept} Care
• Attending Specialist: ${doc}
• Reason: ${cleanReason}

RESCHEDULING OPTIONS:
---------------------
You can select an alternative consultation date or specialist anytime online:
${frontendUrl}/booking?dept=${dept}

Or connect directly with our patient triage coordinators:
• Phone: +91 99005 17699
• Email: care@pralash.com
• Open All 7 Days: 9:30 AM – 8:00 PM

We sincerely apologize for any inconvenience caused and look forward to welcoming you soon.

Warm regards,
Patient Care Team
PRALASH Dermystique & Dentique
Kalyan Nagar, Bengaluru
`.trim();
};

/**
 * Core function: Dispatches appointment booking rejection/cancellation email
 *
 * @param {Object} appointment - Mongoose appointment document or plain object
 * @param {string} [reason] - Optional cancellation/rejection reason
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
const sendBookingRejectionEmail = async (appointment, reason) => {
  try {
    if (!appointment || !appointment.email) {
      console.warn('⚠️ [Email Service] Skipping rejection email: Appointment has no recipient email address.');
      return { success: false, error: 'Recipient email missing' };
    }

    const transporter = getTransporter();
    if (!transporter) {
      console.warn('⚠️ [Email Service] Transporter not initialized. Check SMPT_MAIL & SMPT_PASSWORD.');
      return { success: false, error: 'SMTP transporter not configured' };
    }

    const senderMail = process.env.SMPT_MAIL || process.env.SMTP_MAIL || 'care@pralash.com';
    const fromAddress = `"PRALASH Clinic" <${senderMail}>`;
    const subject = `Update on Your Consultation Request (${appointment.bookingReference || 'Medical Booking'}) - PRALASH Clinic`;

    const mailOptions = {
      from: fromAddress,
      to: appointment.email.trim(),
      subject,
      text: generateRejectionEmailText(appointment, reason),
      html: generateRejectionEmailHtml(appointment, reason),
    };

    console.log(`📨 [Email Service] Sending rejection/cancellation email to: ${appointment.email} (Ref: ${appointment.bookingReference})...`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ [Email Service] Rejection email delivered! Message ID: ${info.messageId}`);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error(`❌ [Email Service] Failed to send rejection email to ${appointment?.email}:`, error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export {
  sendBookingConfirmationEmail,
  sendBookingRejectionEmail,
  verifySmtpConnection,
  getTransporter,
};

export default {
  sendBookingConfirmationEmail,
  sendBookingRejectionEmail,
  verifySmtpConnection,
  getTransporter,
};
