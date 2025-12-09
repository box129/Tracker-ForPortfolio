# 🚀 Axiom Tracker - Setup Instructions

Welcome to Axiom Tracker! Follow these steps to get your application up and running.

## 📋 Prerequisites

Before you begin, make sure you have:

- ✅ Node.js 18+ installed ([Download here](https://nodejs.org))
- ✅ npm or yarn package manager
- ✅ A Supabase account ([Sign up here](https://supabase.com))
- ✅ Git (optional, for version control)

## 🛠️ Installation Steps

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including Next.js, React, Supabase, NextAuth, and Tailwind CSS.

### Step 2: Set Up Supabase Database

#### 2.1 Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in the details:
   - **Organization**: Select or create one
   - **Name**: `axiom-tracker` (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose the closest to your location
4. Click **"Create new project"**
5. Wait 2-3 minutes for the project to initialize

#### 2.2 Run Database Migrations

1. In your Supabase dashboard, navigate to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Open the file `supabase/migrations/001_initial_schema.sql` in this project
4. Copy all the SQL code
5. Paste it into the Supabase SQL Editor
6. Click **"Run"** (or press `Ctrl+Enter`)
7. Wait for the success message

✅ Your database schema is now set up!

#### 2.3 (Optional) Add Sample Data

For testing, you can add sample data:

1. Open `supabase/migrations/002_sample_data.sql`
2. Copy the SQL code
3. Paste into Supabase SQL Editor
4. Click **"Run"**

⚠️ **Note**: Sample data includes test users with password `password123` (hashed)

### Step 3: Configure Environment Variables

#### 3.1 Get Your Supabase Credentials

In your Supabase dashboard:

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")
   - **service_role** key (under "Project API keys") - **Keep this secret!**

#### 3.2 Update .env.local File

1. Open the `.env.local` file in the project root
2. Replace the placeholder values:

```env
# Replace with your actual Supabase URL
SUPABASE_URL=https://your-project-id.supabase.co

# Replace with your service role key (keep secret!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-actual-key

# Replace with your anon/public key
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-actual-key

# Generate a random secret (see below)
NEXTAUTH_SECRET=your-generated-secret-here

# Keep as is for local development
NEXTAUTH_URL=http://localhost:3000
```

#### 3.3 Generate NextAuth Secret

**Option A - Using OpenSSL** (Mac/Linux/Git Bash):

```bash
openssl rand -base64 32
```

**Option B - Using Online Generator**:
Visit [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

**Option C - Using Node.js**:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the generated secret and paste it as `NEXTAUTH_SECRET` in `.env.local`

### Step 4: Start the Development Server

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

🎉 **Success!** Your application is now running!

## 🧪 Testing the Setup

### Test 1: Access the Landing Page

1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the Axiom Tracker homepage
3. Navigation should work (Home, Features, FAQs)

### Test 2: Test Authentication

#### If you added sample data:

1. Click **"Login"** in the navigation
2. Use these test credentials:
   - **Email**: `admin@axiomtracker.com`
   - **Password**: `password123`
3. Click **"Log in"**
4. You should be redirected to the homepage (logged in)

#### If you didn't add sample data:

1. Click **"Get Started"** or **"Login"**
2. Click **"Sign up here"**
3. Create a new account
4. (Note: Signup functionality needs to be implemented - see next steps)

### Test 3: Verify Database Connection

1. Go to Supabase dashboard → **Table Editor**
2. You should see these tables:
   - users
   - organizations
   - certificates
   - alert_rules
   - notifications
   - audit_logs

## 📁 Project Structure

```
axiom-tracker/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   └── auth/[...nextauth]/   # NextAuth configuration
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
│   ├── forgot-password/          # Password reset page
│   ├── page.tsx                  # Landing page
│   └── layout.tsx                # Root layout
├── lib/                          # Utility functions
│   └── supabase.ts              # Supabase client
├── supabase/                     # Database files
│   ├── migrations/              # SQL migration files
│   └── README.md                # Database setup guide
├── .env.local                    # Environment variables (DO NOT COMMIT)
├── .env.local.example           # Environment template
└── package.json                 # Dependencies
```

## 🔐 Security Best Practices

### Environment Variables

- ✅ **Never** commit `.env.local` to version control
- ✅ `.env.local` is already in `.gitignore`
- ✅ Use `.env.local.example` as a template for team members
- ✅ Keep `SUPABASE_SERVICE_ROLE_KEY` secret (server-side only)

### Passwords

- ✅ All passwords are hashed with bcrypt (10 rounds)
- ✅ Never store plain-text passwords
- ✅ Use strong passwords in production

### Database Security

- ✅ Row Level Security (RLS) is enabled on all tables
- ✅ Users can only access their own data
- ✅ Audit logs track all important actions

## 🐛 Troubleshooting

### Issue: "Missing Supabase configuration" Error

**Solution**:

- Check that `.env.local` exists and has correct values
- Restart the dev server after updating `.env.local`
- Verify your Supabase project is active

### Issue: Login Fails with "Invalid credentials"

**Solution**:

- Verify the user exists in the `users` table
- Check that the password hash is correct
- Ensure the email is lowercase in the database
- Check Supabase logs for detailed errors

### Issue: "Cannot find module" Errors

**Solution**:

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: Port 3000 Already in Use

**Solution**:

```bash
# Use a different port
npm run dev -- -p 3001
```

### Issue: Database Connection Fails

**Solution**:

- Verify your Supabase project is running
- Check your internet connection
- Confirm the `SUPABASE_URL` is correct
- Test the connection in Supabase dashboard

## 📚 Next Steps

Now that your setup is complete, you can:

1. ✅ **Implement Signup Functionality** - Add user registration
2. ✅ **Build the Dashboard** - Create authenticated user dashboard
3. ✅ **Add Certificate Management** - Upload and track certificates
4. ✅ **Configure Alerts** - Set up expiry notifications
5. ✅ **Create Reports** - Build compliance dashboards

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 💬 Getting Help

If you encounter issues:

1. Check the `supabase/README.md` for database-specific help
2. Review the error messages carefully
3. Check Supabase logs in the dashboard
4. Verify all environment variables are set correctly

## 🎯 Quick Start Checklist

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Supabase project created
- [ ] Database migrations run
- [ ] `.env.local` configured with credentials
- [ ] NextAuth secret generated
- [ ] Dev server running (`npm run dev`)
- [ ] Landing page accessible
- [ ] Login tested (if using sample data)

---

**Ready to build something amazing!** 🚀

Last Updated: December 2024
