# 🚀 Render.com Deployment Guide for Axiom Tracker

This guide will walk you through deploying your Next.js Axiom Tracker application to Render.com - a free, Upwork-friendly hosting platform.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- [x] Your code pushed to GitHub (public or private repository)
- [x] A Render.com account (sign up at https://render.com)
- [x] Your Supabase credentials ready
- [x] All environment variables documented

---

## 🎯 Step 1: Prepare Your Repository

### 1.1 Ensure Your Code is on GitHub

```bash
# If not already pushed, run:
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 1.2 Verify Build Script

Your `package.json` should have these scripts (already configured):

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

✅ **Status**: Your package.json is correctly configured!

---

## 🌐 Step 2: Create a Render Account

1. Go to **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with:
   - GitHub (recommended - easier integration)
   - GitLab
   - Or email

---

## 🔧 Step 3: Deploy Your Application

### 3.1 Create a New Web Service

1. **Log in to Render Dashboard**
2. Click **"New +"** button (top right)
3. Select **"Web Service"**

### 3.2 Connect Your Repository

1. Click **"Connect a repository"**
2. If first time:
   - Click **"Configure account"**
   - Authorize Render to access your GitHub
   - Select repositories (all or specific ones)
3. Find and select your **`axiom-tracker`** repository
4. Click **"Connect"**

### 3.3 Configure Your Web Service

Fill in the following settings:

| Field              | Value                                                         |
| ------------------ | ------------------------------------------------------------- |
| **Name**           | `axiom-tracker` (or your preferred name)                      |
| **Region**         | Choose closest to your target users (e.g., Frankfurt, Oregon) |
| **Branch**         | `main` (or your default branch)                               |
| **Root Directory** | Leave blank (unless your app is in a subdirectory)            |
| **Runtime**        | `Node`                                                        |
| **Build Command**  | `npm install && npm run build`                                |
| **Start Command**  | `npm start`                                                   |
| **Instance Type**  | **Free**                                                      |

### 3.4 Add Environment Variables

Click **"Advanced"** to expand environment variables section.

Add the following environment variables (click **"Add Environment Variable"** for each):

#### Required Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=https://your-app-name.onrender.com
NODE_ENV=production
```

#### How to Get These Values:

**Supabase Credentials:**

1. Go to your Supabase project dashboard
2. Click **Settings** → **API**
3. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

**NextAuth Secret:**

```bash
# Generate a secure random string (run in terminal):
openssl rand -base64 32
```

**NextAuth URL:**

- Will be: `https://axiom-tracker.onrender.com` (or your chosen name)
- You can update this after deployment

### 3.5 Deploy!

1. Click **"Create Web Service"** at the bottom
2. Render will start building your application
3. Watch the build logs in real-time

---

## ⏱️ Step 4: Wait for Deployment

### What Happens During Deployment:

1. **Cloning**: Render clones your GitHub repository
2. **Installing**: Runs `npm install` to install dependencies
3. **Building**: Runs `npm run build` to build your Next.js app
4. **Starting**: Starts your application with `npm start`

**Expected Time**: 3-5 minutes for first deployment

### Build Status:

- 🟡 **Yellow (In Progress)**: Building...
- 🟢 **Green (Live)**: Successfully deployed!
- 🔴 **Red (Failed)**: Check logs for errors

---

## 🎉 Step 5: Access Your Live Application

Once deployment is complete:

1. Your app will be live at: **`https://axiom-tracker.onrender.com`**
2. Click the URL at the top of the Render dashboard
3. Test your application!

---

## 🔄 Step 6: Update NEXTAUTH_URL (Important!)

After your first deployment:

1. Copy your live URL (e.g., `https://axiom-tracker.onrender.com`)
2. In Render Dashboard:
   - Go to **Environment** tab
   - Find `NEXTAUTH_URL`
   - Update it to your actual Render URL
   - Click **"Save Changes"**
3. Render will automatically redeploy

---

## 🔄 Automatic Deployments

**Good News**: Render automatically deploys when you push to GitHub!

Every time you:

```bash
git push origin main
```

Render will:

1. Detect the changes
2. Automatically rebuild
3. Deploy the new version

---

## ⚙️ Important Render.com Notes

### Free Tier Limitations:

✅ **Included:**

- 750 hours/month of runtime
- Automatic HTTPS
- Custom domains (if you want to add later)
- Automatic deployments from Git
- Environment variables

⚠️ **Limitations:**

- **Cold Starts**: Free services spin down after 15 minutes of inactivity
  - First request after inactivity takes 30-60 seconds to wake up
  - Subsequent requests are fast
- **750 hours/month**: Enough for one service running 24/7

### Preventing Cold Starts (Optional):

If you want to keep your app always warm, you can:

1. Upgrade to paid plan ($7/month)
2. Use a free uptime monitor (e.g., UptimeRobot) to ping your app every 10 minutes

---

## 🐛 Troubleshooting

### Build Fails?

**Check these common issues:**

1. **Missing Dependencies**
   - Ensure all packages are in `package.json` dependencies (not devDependencies)
2. **Environment Variables**

   - Verify all required env vars are set
   - No typos in variable names

3. **Build Errors**
   - Check build logs in Render dashboard
   - Test locally: `npm run build`

### App Not Loading?

1. **Check Logs**:

   - Go to **Logs** tab in Render dashboard
   - Look for error messages

2. **Verify Environment Variables**:

   - Go to **Environment** tab
   - Ensure all variables are set correctly

3. **Check Supabase Connection**:
   - Verify Supabase credentials are correct
   - Ensure Supabase project is active

### Database Connection Issues?

1. **Supabase URL Whitelist**:
   - Render uses dynamic IPs
   - Ensure Supabase allows connections from any IP (default setting)

---

## 📱 Sharing on Upwork

Once deployed, you can share your Render link on Upwork:

✅ **Professional Format**:

```
Live Demo: https://axiom-tracker.onrender.com

Note: This is hosted on Render's free tier.
The first load may take 30-60 seconds if the service was idle.
```

✅ **Render links are generally accepted by Upwork** (unlike Vercel)

---

## 🎨 Custom Domain (Optional - Future)

Want to use your own domain later?

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In Render Dashboard:
   - Go to **Settings** → **Custom Domains**
   - Click **"Add Custom Domain"**
   - Follow DNS configuration instructions
3. Update `NEXTAUTH_URL` to your custom domain

---

## 📊 Monitoring Your App

### Render Dashboard Features:

- **Metrics**: View CPU, memory usage
- **Logs**: Real-time application logs
- **Events**: Deployment history
- **Shell**: Access to your app's shell (for debugging)

---

## 🔐 Security Checklist

Before going live:

- [ ] All environment variables are set
- [ ] `NEXTAUTH_SECRET` is a strong random string
- [ ] Supabase RLS (Row Level Security) policies are configured
- [ ] No sensitive data in your GitHub repository
- [ ] `.env.local` is in `.gitignore`

---

## 📞 Support

**Render Documentation**: https://render.com/docs
**Render Community**: https://community.render.com
**Status Page**: https://status.render.com

---

## 🚀 Quick Reference

### Your Deployment URL:

```
https://axiom-tracker.onrender.com
(or your chosen name)
```

### Redeploy Manually:

1. Go to Render Dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

### View Logs:

1. Render Dashboard → **Logs** tab

### Update Environment Variables:

1. Render Dashboard → **Environment** tab
2. Add/Edit variables
3. Click **"Save Changes"** (auto-redeploys)

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Repository connected to Render
- [ ] Build and start commands configured
- [ ] All environment variables added
- [ ] First deployment successful
- [ ] `NEXTAUTH_URL` updated with live URL
- [ ] Application tested and working
- [ ] Link ready to share on Upwork

---

**Happy Deploying! 🎉**

If you encounter any issues, check the troubleshooting section or the build logs in your Render dashboard.
