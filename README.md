# 🎓 Student Fee Management System

A modern, full-stack web application for managing student fee payments with MongoDB Atlas, real-time updates, and responsive design.

## 🚀 Features

- **🔐 Secure Authentication**: bcrypt password hashing with session management
- **🗄️ MongoDB Atlas**: Cloud database with Prisma ORM
- **⚡ Real-time Updates**: Live fee status updates every 5 seconds
- **📱 Responsive Design**: Mobile-first approach with dark/light themes
- **💳 Payment Simulation**: Realistic payment processing flow
- **🎨 Modern UI**: Glass morphism effects and smooth animations
- **🔍 Advanced Search**: Filter and search students by name/email
- **📊 Dashboard Analytics**: Payment statistics and student overview

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: MongoDB Atlas (Cloud)
- **Authentication**: Custom secure sessions with bcrypt
- **UI Components**: Radix UI, Lucide Icons
- **Styling**: Tailwind CSS with custom animations

## 📋 Setup Instructions

### 1. Clone & Install
\`\`\`bash
git clone <your-repo>
cd student-fee-management
npm install
\`\`\`

### 2. Environment Setup
Create `.env.local` file:
\`\`\`env
DATABASE_URL="mongodb+srv://shivamshekhawat:Shivam%4000@cluster1.1c5nk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
NEXTAUTH_SECRET="your-super-secret-key-generate-random-string"
NODE_ENV="development"
\`\`\`

### 3. Database Setup
\`\`\`bash
# Generate Prisma client
npm run db:generate

# Push schema to MongoDB
npm run db:push

# Seed database with sample data
npm run db:seed
\`\`\`

### 4. Run Application
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` 🎉

## 🔐 Demo Credentials

| Username | Password | Status |
|----------|----------|---------|
| `shivam07` | `shiv00` | Fees Pending |
| `jane@student.com` | `password123` | Fees Paid |
| `bob@student.com` | `password123` | Fees Pending |
| `alice@student.com` | `password123` | Fees Paid |

## 📊 Database Schema

### Students Collection
- **id**: ObjectId (Primary Key)
- **name**: String
- **email**: String (Unique)
- **username**: String (Unique, Optional)
- **password**: String (Hashed)
- **feesPaid**: Boolean
- **createdAt/updatedAt**: DateTime

### Sessions Collection
- **id**: ObjectId (Primary Key)
- **studentId**: ObjectId (Foreign Key)
- **expiresAt**: DateTime
- **createdAt**: DateTime

### Payments Collection
- **id**: ObjectId (Primary Key)
- **studentId**: ObjectId (Foreign Key)
- **amount**: Number (in cents)
- **paymentMethod**: String
- **transactionId**: String (Unique)
- **status**: String
- **createdAt**: DateTime

## 🎯 Key Features

### 🔒 Security
- Password hashing with bcrypt (12 salt rounds)
- HTTP-only cookies for sessions
- Session expiration and cleanup
- Input validation and sanitization

### 📱 User Experience
- Responsive design (mobile-first)
- Dark/Light theme toggle
- Loading states and animations
- Real-time data updates
- Search and filter functionality

### 💳 Payment System
- Simulated payment processing
- Multiple payment methods (Card, PayPal, Bank)
- Transaction history
- Payment status tracking

### 🎨 UI/UX
- Glass morphism design
- Smooth animations and transitions
- Custom CSS animations
- Gradient backgrounds
- Interactive components

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed database with sample data |

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
1. Build: `npm run build`
2. Set environment variables
3. Deploy `dist` folder

## 📁 Project Structure

\`\`\`
├── app/
│   ├── api/           # API routes
│   ├── all-students/  # Students page
│   ├── profile/       # Profile page
│   ├── payment/       # Payment page
│   ├── login/         # Login page
│   └── signup/        # Signup page
├── components/        # Reusable components
├── lib/              # Utilities and database
├── prisma/           # Database schema and seed
└── public/           # Static assets
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is for educational purposes.

---

**Made with ❤️ using Next.js, MongoDB Atlas, and Prisma**
