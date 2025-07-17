A modern full-stack web app to manage student fee payments, built with MongoDB Atlas and real-time updates. Designed to be simple, secure, and mobile-friendly!

🚀 Features
🔐 Secure Login — Passwords are hashed using bcrypt with custom session management.

🗄️ MongoDB Atlas — All data is stored safely in a cloud database using Prisma ORM.

⚡ Live Updates — Fee statuses auto-refresh every 5 seconds.

📱 Mobile-Responsive — Works great on all screen sizes with support for dark and light modes.

💳 Fake Payments — A payment simulation system to test fee payments.

🎨 Stylish UI — Built with glass morphism, custom animations, and clean design.

🔍 Search Filters — Quickly find students by name or email.

📊 Dashboard — Simple analytics and student overview.

🛠️ Tech Stack
Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS

Backend: Next.js API Routes with Prisma

Database: MongoDB Atlas

Authentication: bcrypt + session cookies

UI Libraries: Radix UI, Lucide Icons

Styling: Tailwind CSS + custom animations

📋 How to Run the Project
1. Clone and Install

git clone <your-repo>
cd student-fee-management
npm install

Start the App

npm run dev
Now open your browser and go to http://localhost:3000 🎉
Database Structure
🧑 Students
id, name, email, username, password (hashed), feesPaid, createdAt, updatedAt

🕒 Sessions
id, studentId, expiresAt, createdAt

💳 Payments
id, studentId, amount, paymentMethod, transactionId, status, createdAt

✨ Highlight Features
🔒 Secure Auth
bcrypt password hashing with 12 salt rounds

Sessions stored in cookies

Auto session expiry and cleanup

Input validation & protection

📱 Great UX
Responsive and mobile-first design

Light/Dark theme toggle

Smooth loading and animations

Real-time data fetching

Powerful search and filters

💳 Payment Simulation
Test payments using different methods

Track fee payment history

View transaction statuses

🎨 Modern UI
Glass morphism design

Gradient backgrounds and CSS transitions

Interactive UI elements

🚀 Scripts Available
Script	What It Does
npm run dev	Starts the app in development
npm run build	Builds the app for production
npm run start	Runs the production build
npm run lint	Lints your code
npm run db:generate	Generates Prisma client
npm run db:push	Syncs schema with database
npm run db:studio	Opens Prisma Studio
npm run db:seed	Seeds test data into DB

🌐 Deployment Guide
Recommended: Vercel
Push your code to GitHub

Connect repo with Vercel

Add environment variables

Deploy 🚀

Other Hosting
Build with: npm run build

Set up env variables

Serve the production build

📁 Folder Structure

├── app/
│   ├── api/            # API endpoints
│   ├── all-students/   # All students page
│   ├── profile/        # Student profile
│   ├── payment/        # Payment page
│   ├── login/          # Login form
│   └── signup/         # Signup form
├── components/         # Reusable UI components
├── lib/                # DB & utilities
├── prisma/             # Prisma schema + seed
└── public/             # Static files (images, etc.)

🤝 Want to Contribute?
Fork this repo

Create a new branch for your changes

Make your updates

Push and create a pull request

Let’s build it together!

