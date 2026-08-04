# Core Balance Studio — ERP & CRM Operational Manual

This guide outlines the operational workflows and tools provided in the **Core Balance Studio Admin Portal** (`/admin`).

---

## 👥 1. Client Relationship Management (CRM)

### A. Lifecycle Pipeline (`/admin/crm`)
Clients progress through 6 defined stages:
1. **Lead**: Contact submitted via inquiry form.
2. **First Trial**: Booked their first session.
3. **Active Member**: Regularly attending classes.
4. **VIP**: Achieved 50+ completed classes or high LTV.
5. **At Risk**: No class attendance for **>14 days**.
6. **Churned**: Inactive for >30 days.

### B. At-Risk Churn Prevention
- The CRM automatically highlights At-Risk clients in amber.
- Clicking any client card opens the **Interaction History Drawer**.
- Administrators can trigger 1-click **WhatsApp Win-Back** messages or issue a **30% Promo Code**.

---

## 💼 2. Staff Payroll & Commission Engine (`/admin/payroll`)

### A. Rate Calculation Formula
$$\text{Class Earnings} = \text{Base Rate} + \max(0, \text{Attendees} - \text{Threshold}) \times \text{Per-Head Bonus}$$

- **Senior Instructor Rate**: KES 3,500 base + KES 150/head for attendees over 6.
- **Clinical Specialist Rate**: KES 5,000 base + KES 200/head for attendees over 4.

### B. M-Pesa B2C Batch Payouts
1. Admin reviews individual class commission breakdowns.
2. Click **"Approve Payroll"** to verify session counts.
3. Click **"Batch Pay Approved"** to trigger automated Safaricom M-Pesa B2C disbursements to instructor phone numbers.
4. Transaction reference numbers (e.g. `B2C-994812`) and timestamps are recorded automatically.

---

## 🔧 3. Equipment & Inventory Maintenance (`/admin/inventory`)

### A. Reformer Bed Health Logs
- **Spring Tension Health**: Percentage indicator representing spring age and tension wear.
- **Service Scheduling**: Change status from *Operational* to *Service Due* or *In Maintenance*.
- **Technician Logs**: Log technician name, service cost in KES, and replaced parts (*e.g., 4 red springs, carriage wheels*).

### B. Retail POS & Public Webstore (`/shop`)
- **Stock Levels**: Real-time stock counters with automatic **Low Stock Alerts** when inventory falls below threshold.
- **In-Studio POS Checkout**: Add items to front-desk cart, execute payment, and print digital receipts (`POS-884910`).
- **Public Shop**: Clients can purchase grip socks, mats, water bottles, and resistance bands online.

---

## 📅 4. Staff Rota & Live Attendance (`/admin/rota`)

- **Weekly Timetable**: 7-day visual matrix displaying instructor assignments (`Teaching`, `Admin`, `Substitute Cover`, `Day Off`).
- **Live Attendance View**: Daily check-in status (`Present`, `Late`, `Absent`). Automatically flags shift coverage requirements if an instructor is absent.

---

## 📊 5. Feedback & Net Promoter Score (`/admin/feedback`)

- **NPS Metric**: $NPS = \% \text{Promoters (9-10)} - \% \text{Detractors (0-6)}$.
- **Weekly Trend**: Recharts line chart mapping studio NPS over time.
- **Review Moderation**: Filter reviews by Promoter, Passive, or Detractor. Escalate negative feedback directly to the studio manager.
