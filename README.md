# PrimeWeb Studio — Premium Full-Stack Digital Agency Website

> **Tagline:** *Your Vision. Our Creation.*  
> **Brand Identity:** A production-grade digital agency web application crafted for **PrimeWeb Studio**, specializing in professional website development, full-stack MERN platforms, e-commerce stores, and high-converting business portfolios.

---

## 🎨 Color Palette & Design System

The application strictly implements the **Purple Lavender and White** design scheme:

| Color Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Purple** | `#7C3AED` | Primary brand accent, CTA highlights, active indicators |
| **Secondary Purple** | `#6D28D9` | Button hover states, dark gradients |
| **Soft Violet** | `#A78BFA` | Glow accents, muted badges, borders |
| **Light Lavender** | `#F5F3FF` | Alternating section backgrounds, subtle card fills |
| **Lavender Border** | `#DDD6FE` | Subtle component card and input borders |
| **Dark Navy** | `#1E1B4B` | High-contrast headings, dark section containers |
| **Body Text** | `#475569` | High-readability paragraph text |
| **Muted Text** | `#64748B` | Subtitles, helper text, timestamps |
| **Success** | `#059669` | Status indicators, verified badges, confirmation |
| **Error** | `#DC2626` | Form validation errors, alerts, danger states |

---

## 🚀 Key Features

### 1. Public Agency Pages (20+ Screens)
* **Home (`/`)**: Hero with browser window mockups, code preview, 4 value propositions, 6 services, portfolio showcase, 6-step timeline, 3 pricing tiers, verified client feedback prompt, CEO preview, accordion FAQ, and final CTA.
* **About Us (`/about`)**: Agency story, founder background, core values, mission statement.
* **Services (`/services`)**: In-depth breakdowns of deliverables, technology choices, starting rates, and consultation CTAs.
* **Projects / Portfolio (`/projects`)**: Filterable project gallery with category tags (Web Dev, MERN, E-commerce, Portfolio, UI/UX), search bar, and demonstration case studies.
* **Project Details (`/projects/:slug`)**: Deep-dive case studies, architecture, technologies, live demo and repository links, and related projects.
* **Pricing (`/pricing`)**: 3 editable investment packages (Starter ₹2,999, Business ₹5,999, E-commerce ₹9,999) with illustrative pricing disclaimers and custom quote calculator.
* **Our Process (`/process`)**: Comprehensive 6-phase engineering workflow (Discovery, Planning, Development, QA, Deployment, Support).
* **Dedicated CEO Profile (`/ceo`)**: Personal and executive profile for **Partap Singh** (Founder & CEO), technical skillset, philosophy, vision, social links, and portrait.
* **Testimonials (`/testimonials`)**: Verified client reviews with an honest invitation prompt when no verified reviews are published.
* **Blog & Articles (`/blog` & `/blog/:slug`)**: Engineering guides with search, categories, and estimated reading time.
* **Contact Us (`/contact`)**: Lead capture form with instant reference code generation (`PWS-YYYYMM-XXXX`), business email, hours, and agency location.
* **Request a Quote (`/quote` & Global Modal)**: Dedicated multi-step quotation form accessible from any screen.
* **FAQ (`/faq`)**: Interactive accordions categorized by development, pricing, and maintenance.
* **Legal (`/privacy-policy` & `/terms`)**: Production-ready privacy and terms policies.
* **Custom 404 (`*`)**: Branded not-found screen with quick recovery navigation.

### 2. Client Portal & Dashboard (`/client`)
* **Client Registration & Login**: Bcrypt password hashing, session cookies, duplicate email prevention.
* **Client Overview (`/client/dashboard`)**: Summary metrics, active and completed project counts.
* **Inquiries Tracker (`/client/inquiries`)**: Detailed ledger of submitted quote requests, status tracking (`New`, `In Discussion`, `In Progress`, `Completed`), and admin response notes.
* **Client Data Isolation**: Server-enforced authorization ensuring clients can only view their own records.
* **Profile Management (`/client/profile`)**: Update name, phone, company, and change password securely.

### 3. Administrator Console (`/admin`)
* **Secure RBAC**: Role-based access control protecting all `/api/*` administrative endpoints with 401/403 responses.
* **Live Overview (`/admin/dashboard`)**: Real statistics aggregated from MongoDB (Total Projects, Inquiries by Status, Registered Clients, Published Blogs).
* **Project Management (`/admin/projects`)**: Create, update, toggle featured/published, delete, and upload thumbnails.
* **Service Management (`/admin/services`)**: Create and update services, deliverables, starting prices, and icons.
* **Pricing Tier Editor (`/admin/pricing`)**: Modify package prices, features, badges, and popular highlights.
* **Lead / Inquiry Management (`/admin/leads`)**: Filter by status, assign priority (`Low`, `Medium`, `High`), record internal team notes, add client updates, and **Export Leads to CSV**.
* **Client Directory (`/admin/clients`)**: Inspect registered clients, view associated project inquiries, and suspend/reactivate accounts.
* **Testimonial Moderation (`/admin/testimonials`)**: Add verified feedback, manage publish status.
* **Blog Publisher (`/admin/blogs`)**: Draft and publish articles with categories, tags, and reading times.
* **CEO Profile Editor (`/admin/ceo`)**: Live update of CEO bio, technical skills, philosophy, vision, and upload executive portrait.
* **Media Library (`/admin/media`)**: Image upload with 5MB validation, clipboard URL copy, and file management.
* **Site Settings (`/admin/settings`)**: Agency name, tagline, email, phone, WhatsApp number, business hours, and SEO metadata.

---

## 🛠️ Technology Stack

* **Frontend**: React 18, Vite 6, Tailwind CSS 3, React Router v6, Axios, Lucide React Icons, Framer Motion.
* **Backend**: Node.js, Express.js 4, MongoDB & Mongoose 8.
* **Security & Auth**: JWT (JSON Web Tokens), HTTP-Only Cookies, Bcrypt.js, Helmet, Express Rate Limit, Input Validation.
* **Testing**: Node Native Test Runner (`node --test`), Supertest, MongoDB Memory Server.

---

## 📁 Project Structure

```
Prime Web Studio/
├── package.json                   # Root scripts for running and testing
├── .gitignore                     # Git ignore rules for node_modules, env, dist
├── README.md                      # Comprehensive documentation
│
├── backend/                       # Express & MongoDB REST API
│   ├── package.json
│   ├── .env.example               # Example backend environment variables
│   ├── .env                       # Local development environment configuration
│   ├── tests/
│   │   └── api.test.js            # 15 automated integration tests
│   ├── uploads/                   # Uploaded image files
│   └── src/
│       ├── app.js                 # Express app configuration & middleware
│       ├── server.js              # Server entry point & graceful shutdown
│       ├── config/
│       │   ├── db.js              # Safe MongoDB connection & fail-safe strategy
│       │   └── multer.js          # Image upload storage and MIME validation
│       ├── controllers/           # Controllers for auth, projects, leads, ceo, etc.
│       ├── middleware/            # JWT auth, RBAC, error handling, rate limiting
│       ├── models/                # 11 Mongoose Schemas (User, Project, Inquiry, etc.)
│       ├── routes/                # REST API route handlers
│       ├── scripts/
│       │   ├── createAdmin.js     # Secure CLI script for administrator creation
│       │   └── seedData.js        # Initial data seed (services, demos, CEO, pricing)
│       └── utils/                 # Standard responses and mailer utility
│
└── frontend/                      # React & Vite Single Page Application
    ├── package.json
    ├── vite.config.js             # Vite configuration with vendor chunk splitting
    ├── tailwind.config.js         # Tailwind palette configuration
    ├── postcss.config.js
    ├── index.html                 # SEO Meta tags & Schema.org JSON-LD
    ├── public/
    │   ├── robots.txt             # Search crawler directives
    │   └── sitemap.xml            # Search engine sitemap
    └── src/
        ├── main.jsx               # Application entry point
        ├── App.jsx                # Route hierarchy and global modal setup
        ├── context/
        │   └── AuthContext.jsx    # Persistent auth state and user roles
        ├── services/
        │   └── api.js             # Centralized Axios client with interceptors
        ├── styles/
        │   └── index.css          # Tailwind CSS directives & gradient utilities
        ├── layouts/
        │   ├── ClientLayout.jsx   # Client portal sidebar & drawer
        │   └── AdminLayout.jsx    # Admin console sidebar & navigation
        ├── components/
        │   └── common/            # Navbar, Footer, QuoteModal, ProtectedRoute
        └── pages/
            ├── Home.jsx           # Premium agency homepage
            ├── About.jsx          # Agency story & mission
            ├── Services.jsx       # Complete services catalog
            ├── Projects.jsx       # Filterable portfolio & demonstrations
            ├── ProjectDetails.jsx # Detailed case study reader
            ├── PricingPage.jsx    # Investment tiers & calculators
            ├── ProcessPage.jsx    # 6-step engineering workflow
            ├── CEOPage.jsx        # Dedicated Partap Singh CEO profile
            ├── TestimonialsPage.jsx# Verified client reviews
            ├── Blog.jsx           # Engineering articles & search
            ├── BlogDetails.jsx    # Article reader
            ├── Contact.jsx        # Contact form & lead capture
            ├── QuotePage.jsx      # Standalone project estimation page
            ├── FAQPage.jsx        # Categorized accordions
            ├── PrivacyPolicy.jsx  # Legal privacy statement
            ├── Terms.jsx          # Terms and conditions
            ├── NotFound.jsx       # Custom 404 page
            ├── Login.jsx          # Unified Sign In
            ├── Register.jsx       # Client account registration
            ├── ForgotPassword.jsx # Secure password reset request
            ├── ResetPassword.jsx  # Password token updater
            ├── client/            # Client dashboard, inquiries, and profile
            └── admin/             # 10 Admin management modules
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `5000` |
| `NODE_ENV` | Environment mode | `development` / `production` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `FRONTEND_URL` | Frontend origin for CORS | `http://localhost:5173` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `min_32_characters_secret_string` |
| `JWT_EXPIRES_IN` | Token lifespan | `7d` |
| `COOKIE_SECRET` | Secret key for signed cookies | `cookie_secret_string` |
| `ADMIN_INITIAL_EMAIL` | Default email for initial admin script | `admin@primewebstudio.com` |
| `ADMIN_INITIAL_PASSWORD`| Default password for initial admin script | `SecurePassword123!` |
| `EMAIL_HOST` | *(Optional)* SMTP host for emails | `smtp.mailtrap.io` |
| `EMAIL_PORT` | *(Optional)* SMTP port | `587` |
| `EMAIL_USER` | *(Optional)* SMTP username | `username` |
| `EMAIL_PASS` | *(Optional)* SMTP password | `password` |
| `CLOUDINARY_CLOUD_NAME` | *(Optional)* Cloudinary Cloud Name for media | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | *(Optional)* Cloudinary API Key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | *(Optional)* Cloudinary API Secret | `your_api_secret` |

### Frontend (`frontend/.env`)

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base API URL | `/api` (proxied by Vite in dev) |

---

## ⚡ Installation & Local Setup

### 1. Prerequisites
* Node.js v18+ (tested on Node v24.16.0)
* npm v9+

### 2. Install Dependencies

Install root, backend, and frontend packages:
```bash
# In the project root:
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 3. Initialize the Database & Admin

1. Configure `backend/.env` with your **MongoDB Atlas** connection string (`MONGODB_URI`).
2. Run database seeding to populate default services, demonstration projects, CEO profile, and pricing:
```bash
npm run seed
```
3. Securely create the initial Administrator account:
```bash
# Option A: Reads credentials from backend/.env (ADMIN_INITIAL_EMAIL & ADMIN_INITIAL_PASSWORD)
npm run create:admin

# Option B: Pass credentials directly via CLI
node backend/src/scripts/createAdmin.js admin@primewebstudio.com YourStrongPassword123! "PrimeWeb Admin"
```

### 4. Running the Application

Open two terminal windows:

**Terminal 1 (Backend API):**
```bash
npm run dev:backend
# Starts Express server at http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
npm run dev:frontend
# Starts Vite dev server at http://localhost:5173
```

Now open `http://localhost:5173` in your browser.

---

## 🧪 Testing & Production Build

### Execute Backend Automated Tests
The backend test suite executes 15 integration tests verifying:
* Client registration & duplicate prevention
* Login with valid & invalid credentials
* Protected admin routes & client isolation
* Project CRUD operations
* Inquiry creation & reference number generation
* Admin status updates and internal notes
* Input validation & error sanitization

Run tests with:
```bash
npm test
```

### Build Frontend Production Bundle
```bash
npm run build
```
Builds the optimized production assets to `frontend/dist/` with chunk splitting.

---

## 🌐 Production Deployment Guide

### Frontend Deployment (Vercel or Netlify)
1. Set Root Directory to `frontend`.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Environment Variables:
   * `VITE_API_URL`: `https://your-backend-domain.com/api`

### Backend Deployment (Render, Railway, or VPS)
1. Root Directory: `backend`
2. Build Command: `npm install`
3. Start Command: `node src/server.js`
4. Set Environment Variables:
   * `NODE_ENV`: `production`
   * `MONGODB_URI`: `mongodb+srv://...` (from MongoDB Atlas)
   * `FRONTEND_URL`: `https://your-frontend-domain.vercel.app`
   * `PUBLIC_SITE_URL`: `https://your-frontend-domain.vercel.app`
   * `JWT_SECRET`: Random 64-character secret
   * `COOKIE_SECRET`: Random 32-character secret

---

## 🛡️ Security Protections

* **Helmet Security Headers**: Strict CSP, cross-origin resource policy, and header hardening.
* **Rate Limiting**: Brute-force protection on authentication and lead submission routes.
* **HTTP-Only Cookies**: JWT tokens stored securely to defend against XSS attacks.
* **Password Hashing**: Strong bcrypt salt rounds (12 rounds).
* **Safe Error Handlers**: Stack traces and internal secrets are suppressed in production mode.
* **File Upload Filters**: Whitelist restriction to valid image MIME types with 5MB limits.

---

© 2026 PrimeWeb Studio. All rights reserved.
