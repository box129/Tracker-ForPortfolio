# 🎯 Axiom Tracker

A modern certificate and compliance management platform built with Next.js, React, TypeScript, and Supabase. Axiom Tracker helps organizations automate certificate tracking, manage safety orientations, and maintain 100% compliance with intelligent expiration alerts and real-time dashboards.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-2.87-3ECF8E?style=flat-square&logo=supabase)

## ✨ Features

- 🔐 **Secure Authentication** - NextAuth.js with credential-based login
- 📜 **Certificate Management** - Track all employee credentials in one place
- 🔔 **Smart Alerts** - Automatic notifications before certificates expire
- 📊 **Compliance Dashboard** - Real-time analytics and reporting
- 🏢 **Multi-tenant Support** - Organization-based access control
- 🔍 **QR Verification** - Quick certificate validation
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🔒 **Row Level Security** - Database-level data protection

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Supabase account ([Sign up free](https://supabase.com))
- npm or yarn package manager

### Installation

1. **Clone the repository** (or download the project)

```bash
cd axiom-tracker
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Supabase database**

Follow the detailed guide in [`SETUP_INSTRUCTIONS.md`](./SETUP_INSTRUCTIONS.md)

Quick version:

- Create a Supabase project
- Run the SQL migration in `supabase/migrations/001_initial_schema.sql`
- (Optional) Add sample data with `002_sample_data.sql`

4. **Configure environment variables**

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXTAUTH_SECRET=generate-a-random-secret
NEXTAUTH_URL=http://localhost:3000
```

5. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application! 🎉

## 📚 Documentation

- **[Setup Instructions](./SETUP_INSTRUCTIONS.md)** - Complete setup guide
- **[Database Guide](./supabase/README.md)** - Database schema and configuration
- **[SQL Queries](./supabase/queries.sql)** - Common database operations

## 🏗️ Project Structure

```
axiom-tracker/
├── app/                          # Next.js app directory
│   ├── api/auth/[...nextauth]/  # Authentication API
│   ├── login/                   # Login page
│   ├── signup/                  # Signup page
│   ├── forgot-password/         # Password reset
│   ├── page.tsx                 # Landing page
│   └── layout.tsx               # Root layout
├── lib/                         # Utility functions
│   └── supabase.ts             # Supabase client
├── supabase/                    # Database files
│   ├── migrations/             # SQL migrations
│   ├── queries.sql             # Common queries
│   └── README.md               # Database docs
├── .env.local.example          # Environment template
└── package.json                # Dependencies
```

## 🗄️ Database Schema

The application uses the following core tables:

- **users** - User accounts and authentication
- **organizations** - Company/organization data
- **certificates** - Certificate and credential records
- **alert_rules** - Notification configuration
- **notifications** - Notification history
- **audit_logs** - Compliance audit trail

See [`supabase/README.md`](./supabase/README.md) for detailed schema documentation.

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: NextAuth.js
- **Database**: Supabase (PostgreSQL)
- **Password Hashing**: bcryptjs
- **Deployment**: Vercel (recommended)

## 🔐 Security Features

- ✅ Row Level Security (RLS) on all database tables
- ✅ Bcrypt password hashing (10 rounds)
- ✅ JWT-based session management
- ✅ Environment variable protection
- ✅ Audit logging for compliance
- ✅ Organization-based data isolation

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🧪 Testing

If you added sample data, you can test with:

- **Email**: `admin@axiomtracker.com`
- **Password**: `password123`

## 🚧 Roadmap

- [ ] Implement signup functionality
- [ ] Build authenticated dashboard
- [ ] Add certificate upload feature
- [ ] Create alert configuration UI
- [ ] Build compliance reports
- [ ] Add email notifications
- [ ] Implement forgot password flow
- [ ] Add multi-language support
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 💬 Support

For issues or questions:

- Check the [Setup Instructions](./SETUP_INSTRUCTIONS.md)
- Review the [Database Guide](./supabase/README.md)
- Check existing issues or create a new one

---

**Built with ❤️ using Next.js and Supabase**
