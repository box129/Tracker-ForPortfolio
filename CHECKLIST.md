# 📋 Axiom Tracker - Setup Checklist

Use this checklist to track your setup progress and ensure everything is configured correctly.

## ✅ Phase 1: Initial Setup

- [ ] **Node.js Installed**

  - Version 18 or higher
  - Verify: `node --version`

- [ ] **Dependencies Installed**

  - Run: `npm install`
  - No errors during installation

- [ ] **Project Structure Verified**
  - All folders present (app, lib, supabase)
  - All key files present (package.json, .gitignore)

## ✅ Phase 2: Supabase Setup

- [ ] **Supabase Account Created**

  - Signed up at [supabase.com](https://supabase.com)
  - Email verified

- [ ] **Supabase Project Created**

  - Project name: ******\_\_\_\_******
  - Region selected: ******\_\_\_\_******
  - Database password saved securely: ✓

- [ ] **Database Schema Deployed**

  - Opened Supabase SQL Editor
  - Ran `001_initial_schema.sql`
  - No errors reported
  - Tables created successfully

- [ ] **Sample Data Added (Optional)**

  - Ran `002_sample_data.sql`
  - Test users created
  - Sample certificates added

- [ ] **Database Verified**
  - Can see tables in Table Editor
  - Row counts match expectations
  - Views are working (expiring_certificates, compliance_summary)

## ✅ Phase 3: Environment Configuration

- [ ] **API Credentials Obtained**

  - Supabase URL copied: ✓
  - Anon/Public key copied: ✓
  - Service Role key copied: ✓

- [ ] **NextAuth Secret Generated**

  - Used: [ ] OpenSSL [ ] Online generator [ ] Node.js
  - Secret saved: ✓

- [ ] **.env.local File Created**

  - File exists in project root
  - All variables filled in:
    - [ ] SUPABASE_URL
    - [ ] SUPABASE_SERVICE_ROLE_KEY
    - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
    - [ ] NEXTAUTH_SECRET
    - [ ] NEXTAUTH_URL

- [ ] **Environment Variables Verified**
  - No placeholder values remaining
  - No syntax errors
  - File saved

## ✅ Phase 4: Application Testing

- [ ] **Development Server Started**

  - Run: `npm run dev`
  - Server starts without errors
  - Accessible at http://localhost:3000

- [ ] **Landing Page Works**

  - Homepage loads correctly
  - All sections visible (Hero, About, How It Works, Features, FAQ)
  - Images load properly
  - Navigation works

- [ ] **Login Page Accessible**

  - Can navigate to /login
  - Form displays correctly
  - No console errors

- [ ] **Authentication Works**

  - Can log in with test credentials (if sample data added)
  - Email: admin@axiomtracker.com
  - Password: password123
  - Redirects after login

- [ ] **Database Connection Verified**
  - No Supabase connection errors
  - Can query database from app
  - RLS policies working

## ✅ Phase 5: Security Verification

- [ ] **.env.local Not in Git**

  - File listed in .gitignore
  - Not tracked by git
  - Verify: `git status` (should not show .env.local)

- [ ] **Service Role Key Secure**

  - Only used in server-side code
  - Not exposed in client components
  - Not in browser console

- [ ] **Password Hashing Works**
  - Passwords stored as hashes in database
  - No plain text passwords
  - Login works with hashed passwords

## ✅ Phase 6: Documentation Review

- [ ] **README.md Read**

  - Understand project structure
  - Know available scripts
  - Familiar with tech stack

- [ ] **SETUP_INSTRUCTIONS.md Read**

  - Followed all steps
  - Understand troubleshooting tips
  - Know where to get help

- [ ] **supabase/README.md Read**

  - Understand database schema
  - Know how to run queries
  - Familiar with RLS policies

- [ ] **supabase/SCHEMA.md Reviewed**
  - Understand table relationships
  - Know certificate status flow
  - Familiar with indexes and triggers

## 🎯 Next Steps Checklist

After completing setup, work on these features:

### Immediate (Week 1)

- [ ] Implement signup functionality

  - Create API route for user registration
  - Hash passwords with bcryptjs
  - Insert new users into database
  - Handle validation and errors

- [ ] Test complete auth flow
  - Signup → Login → Logout
  - Password validation
  - Email uniqueness check

### Short-term (Week 2-3)

- [ ] Build authenticated dashboard

  - Create protected route
  - Add session check
  - Display user information
  - Show certificate summary

- [ ] Create certificate upload feature
  - File upload component
  - Form validation
  - Save to Supabase storage
  - Create database record

### Medium-term (Week 4-6)

- [ ] Alert configuration UI

  - Create alert rules form
  - List existing rules
  - Edit/delete rules
  - Test notifications

- [ ] Compliance dashboard
  - Certificate statistics
  - Expiring certificates list
  - Compliance percentage
  - Charts and graphs

### Long-term (Month 2+)

- [ ] Email notifications

  - Set up email service (SendGrid, Resend, etc.)
  - Create email templates
  - Schedule notification jobs
  - Test delivery

- [ ] Forgot password flow

  - Password reset request
  - Email with reset link
  - Password update form
  - Security measures

- [ ] Advanced features
  - QR code generation
  - Certificate verification
  - Bulk upload
  - Export reports
  - Mobile responsiveness improvements

## 🐛 Troubleshooting Checklist

If something doesn't work, check these:

### Server Won't Start

- [ ] Node.js version is 18+
- [ ] All dependencies installed
- [ ] No port conflicts (3000 in use)
- [ ] No syntax errors in code

### Database Connection Fails

- [ ] Supabase project is active
- [ ] Correct URL in .env.local
- [ ] Correct API keys in .env.local
- [ ] Internet connection working
- [ ] Firewall not blocking connection

### Login Doesn't Work

- [ ] User exists in database
- [ ] Password hash is correct
- [ ] Email is lowercase
- [ ] NEXTAUTH_SECRET is set
- [ ] No errors in console

### Environment Variables Not Working

- [ ] .env.local file exists
- [ ] File is in project root
- [ ] No typos in variable names
- [ ] Server restarted after changes
- [ ] No extra spaces in values

### Build Errors

- [ ] TypeScript errors resolved
- [ ] All imports correct
- [ ] No missing dependencies
- [ ] ESLint warnings addressed

## 📊 Success Metrics

You've successfully set up Axiom Tracker when:

✅ Development server runs without errors
✅ Can access landing page at http://localhost:3000
✅ Can log in with test credentials
✅ Database queries work correctly
✅ No console errors in browser
✅ All environment variables configured
✅ .env.local is not tracked by git
✅ Can see data in Supabase dashboard

## 📝 Notes Section

Use this space for your own notes:

**Supabase Project Details:**

- Project Name: ******\_\_\_\_******
- Project ID: ******\_\_\_\_******
- Region: ******\_\_\_\_******
- Database Password: (stored securely)

**Important Dates:**

- Setup Started: ******\_\_\_\_******
- Database Created: ******\_\_\_\_******
- First Successful Login: ******\_\_\_\_******

**Custom Configuration:**

- Port (if not 3000): ******\_\_\_\_******
- Custom domain: ******\_\_\_\_******
- Other notes: ******\_\_\_\_******

---

## 🎉 Completion

Date Completed: ******\_\_\_\_******

Completed By: ******\_\_\_\_******

Ready for Development: [ ] Yes [ ] No

---

**Next: Start building features! Check the roadmap in README.md**
