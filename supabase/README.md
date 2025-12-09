# Supabase Database Setup Guide

This guide will help you set up the Axiom Tracker database in Supabase.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A new Supabase project created

## Step-by-Step Setup

### 1. Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in the details:
   - **Name**: Axiom Tracker
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to initialize

### 2. Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll need these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - **Keep this secret!**

### 3. Update Environment Variables

1. Open the `.env.local` file in the root of this project
2. Replace the placeholder values with your actual Supabase credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Generate a NextAuth secret:
   - Run: `openssl rand -base64 32` in your terminal
   - Or visit: https://generate-secret.vercel.app/32
   - Copy the generated secret and paste it:

```env
NEXTAUTH_SECRET=your-generated-secret-here
```

### 4. Run Database Migrations

#### Option A: Using Supabase SQL Editor (Recommended)

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the contents of `migrations/001_initial_schema.sql`
4. Paste it into the SQL Editor
5. Click "Run" or press `Ctrl+Enter`
6. Wait for the migration to complete (you should see "Success" message)

#### Option B: Using Supabase CLI (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-id

# Run migrations
supabase db push
```

### 5. (Optional) Add Sample Data

For testing purposes, you can add sample data:

1. Go to **SQL Editor** in Supabase
2. Copy the contents of `migrations/002_sample_data.sql`
3. Paste and run it

**⚠️ Warning**: Only run sample data in development environments!

### 6. Verify the Setup

Run these queries in the SQL Editor to verify everything is set up correctly:

```sql
-- Check if tables were created
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- Check users table
SELECT COUNT(*) FROM users;

-- Check certificates table
SELECT COUNT(*) FROM certificates;

-- View expiring certificates
SELECT * FROM expiring_certificates;

-- View compliance summary
SELECT * FROM compliance_summary;
```

## Database Schema Overview

### Core Tables

1. **users** - User accounts and authentication
2. **organizations** - Company/organization information
3. **certificates** - Certificate and credential records
4. **alert_rules** - Notification configuration
5. **notifications** - Notification history
6. **audit_logs** - Audit trail for compliance

### Views

1. **expiring_certificates** - Certificates expiring within 90 days
2. **compliance_summary** - Organization compliance statistics

### Key Features

- ✅ Automatic timestamp updates (`updated_at`)
- ✅ Automatic certificate status updates based on expiry date
- ✅ Row Level Security (RLS) policies for data protection
- ✅ Indexes for optimal query performance
- ✅ Audit logging for compliance tracking

## Security Notes

### Row Level Security (RLS)

RLS is enabled on all tables to ensure users can only access their own data:

- Users can only see their own profile
- Users can only see certificates from their organization
- Notifications are private to each user
- Audit logs are organization-scoped

### Service Role Key

⚠️ **IMPORTANT**: The `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS policies.

- **Never** expose it in client-side code
- **Never** commit it to version control
- Only use it in server-side code (API routes, server components)

## Troubleshooting

### Migration Fails

If the migration fails:

1. Check for syntax errors in the SQL
2. Ensure you're using PostgreSQL 14+ (Supabase default)
3. Try running migrations in smaller chunks
4. Check Supabase logs for detailed error messages

### Connection Issues

If you can't connect to the database:

1. Verify your credentials in `.env.local`
2. Check that your Supabase project is active
3. Ensure you're using the correct project URL
4. Check your network/firewall settings

### RLS Policy Issues

If you get permission errors:

1. Verify RLS policies are correctly set up
2. Check that you're authenticated correctly
3. Ensure the user has the right role/permissions
4. Temporarily disable RLS for debugging (re-enable after!)

## Next Steps

After setting up the database:

1. ✅ Test the authentication flow (login/signup)
2. ✅ Create your first certificate record
3. ✅ Set up alert rules
4. ✅ Test the compliance dashboard

## Useful SQL Queries

### Create a Test User Manually

```sql
-- Password: "password123"
INSERT INTO users (email, password_hash, name, role)
VALUES (
    'test@example.com',
    '$2a$10$rKvVPZqGN5P5K5Z5Z5Z5ZeO5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    'Test User',
    'user'
);
```

### Check Certificate Status Distribution

```sql
SELECT status, COUNT(*) as count
FROM certificates
GROUP BY status;
```

### Find Certificates Expiring This Month

```sql
SELECT certificate_name, expiry_date, user_id
FROM certificates
WHERE expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
ORDER BY expiry_date;
```

### View Recent Audit Logs

```sql
SELECT
    u.name as user_name,
    al.action,
    al.resource_type,
    al.created_at
FROM audit_logs al
LEFT JOIN users u ON al.user_id = u.id
ORDER BY al.created_at DESC
LIMIT 20;
```

## Support

For issues or questions:

- Check the [Supabase Documentation](https://supabase.com/docs)
- Visit the [Supabase Discord](https://discord.supabase.com)
- Review the migration files for schema details

---

**Last Updated**: December 2024
