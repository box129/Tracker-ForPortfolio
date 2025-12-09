# Complete User Authentication & Onboarding Flow

## 🎯 Five-Page User Journey

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       AUTHENTICATION FLOW                                │
│                  (Existing Implementation)                              │
└─────────────────────────────────────────────────────────────────────────┘

1. LOGIN CHOICE SCREEN
   Route: /login
   
   ┌─────────────────────────────────────────────────────┐
   │  Logo  Back to Website                              │
   │                                                     │
   │  [LEFT IMAGE]    Hi Welcome to                     │
   │  with Hero Text  Axiom Tracker                     │
   │  and Button                                         │
   │                  ┌──────────────────────────────┐  │
   │                  │      Login                   │  │
   │                  │  (light gray button)         │  │
   │                  └──────────────────────────────┘  │
   │                                                     │
   │                  ┌──────────────────────────────┐  │
   │                  │   Create Account             │  │
   │                  │   (black button)             │  │
   │                  └──────────────────────────────┘  │
   └─────────────────────────────────────────────────────┘
                     ↙                      ↘
            SIGNIN FLOW              SIGNUP FLOW


2. SIGN IN PAGE ←─────────┐
   Route: /login/signin   │
                          │
   ┌──────────────────────┐
   │ Logo Back to Website │
   │                      │
   │ [LEFT IMAGE]         │
   │ with Hero Text       │  3. SIGN UP PAGE
   │ and Button           │     Route: /login/signup
   │                      │
   │ Welcome Back         │     ┌────────────────────┐
   │                      │     │ Logo  Back         │
   │ ┌──────────────────┐ │     │                    │
   │ │ Email input      │ │     │ [LEFT IMAGE]       │
   │ └──────────────────┘ │     │ Hero              │
   │                      │     │                    │
   │ ┌──────────────────┐ │     │ Create Account     │
   │ │ Password         │ │     │                    │
   │ └──────────────────┘ │     │ ┌────────────────┐│
   │ ☐ Remember Me        │     │ │First │Last     ││
   │ Forgot Password?     │     │ ├──────┴────────┤│
   │                      │     │ │Email input     ││
   │ ┌──────────────────┐ │     │ │Password input  ││
   │ │ Log in ►         │ │     │ │"8+ chars,      ││
   │ └──────────────────┘ │     │ │numbers,symbols"││
   │                      │     │ │                ││
   │ Don't have account?  │     │ │[Create Account]││
   │ Sign up here         │     │ └────────────────┘│
   └──────────────────────┘     │ Already have      │
            ↓                    │ account? Login    │
    Navigates to home           └────────────────────┘
    (if credentials valid)              ↓
                            [Account created successfully]
                                        ↓

┌─────────────────────────────────────────────────────────────────────────┐
│                      ONBOARDING FLOW                                     │
│                    (NEW - Just Added)                                   │
└─────────────────────────────────────────────────────────────────────────┘

4. INVITE EMPLOYEES PAGE
   Route: /onboarding/invite-employees
   
   ┌─────────────────────────────────────────────────────┐
   │  Logo  Back to Website                              │
   │                                                     │
   │  [LEFT IMAGE]    Invite Employees                  │
   │  with Hero Text  Invite employees to manage        │
   │  and Button      credentials                       │
   │                                                     │
   │                  ┌──────────────────────────────┐  │
   │                  │ Employee Email               │  │
   │                  │ [Enter email address]        │  │
   │                  └──────────────────────────────┘  │
   │                                                     │
   │                  ┌──────────────────────────────┐  │
   │                  │ Employee Email 2 (optional)  │  │
   │                  │ [Enter email address]        │  │
   │                  └──────────────────────────────┘  │
   │                                                     │
   │                  ┌──────────────────────────────┐  │
   │                  │ Add Another Employee         │  │
   │                  │ (outline button)             │  │
   │                  └──────────────────────────────┘  │
   │                                                     │
   │                  ┌──────────────────────────────┐  │
   │                  │ Next ►                       │  │
   │                  │ (black button)               │  │
   │                  └──────────────────────────────┘  │
   └─────────────────────────────────────────────────────┘
              [Validates emails and sends invitations]
                            ↓

5. SETUP SUCCESSFUL PAGE
   Route: /onboarding/setup-successful
   
   ┌─────────────────────────────────────────────────────┐
   │  Logo  Back to Website                              │
   │                                                     │
   │  [LEFT IMAGE]                                       │
   │  with Hero Text                                     │
   │  and Button          ┌──────────────────────────┐  │
   │                      │       ✓                  │  │
   │                      │    (green checkmark      │  │
   │                      │    in concentric        │  │
   │                      │    circles)             │  │
   │                      └──────────────────────────┘  │
   │                                                     │
   │                  Setup Successful                   │
   │                                                     │
   │                  Email(s) has been sent to the     │
   │                  employees to create their account │
   │                                                     │
   │                  ┌──────────────────────────────┐  │
   │                  │ Proceed ►                    │  │
   │                  │ (black button)               │  │
   │                  └──────────────────────────────┘  │
   └─────────────────────────────────────────────────────┘
                            ↓
                    Navigates to Dashboard
                    (/dashboard)
```

---

## 📊 Flow Summary Table

| Step | Page | Route | Purpose | User Action | Outcome |
|------|------|-------|---------|-------------|---------|
| 1 | Login Choice | `/login` | Choose auth method | Click "Create Account" | Go to Signup |
| 2 | Signup Form | `/login/signup` | Create account | Fill form + click "Create Account" | Account created, go to Invite |
| 3 | Invite Employees | `/onboarding/invite-employees` | Add team members | Add emails + click "Next" | Invitations sent, go to Success |
| 4 | Success Message | `/onboarding/setup-successful` | Confirm invitations | Click "Proceed" | Redirect to Dashboard |
| 5 | Dashboard | `/dashboard` | Main app | (To be implemented) | Start using app |

---

## 🔀 Alternative: Login Flow

```
LOGIN CHOICE (/login)
        ↓
    Click "Login"
        ↓
SIGNIN PAGE (/login/signin)
        ↓
    Enter Credentials
        ↓
VALIDATE CREDENTIALS (NextAuth)
        ↓
    Success: JWT token issued
    Failure: Show error message
        ↓
    [On Success]
        ↓
DASHBOARD (/dashboard)
    Start using app
```

---

## 🎨 Design Consistency

### All Pages Include:
✅ Left section with background image (desktop only)  
✅ Dark overlay (60% opacity black)  
✅ Hero text and animated arrow button  
✅ Axiom Tracker logo in header  
✅ "Back to Website" navigation link  
✅ Responsive design (mobile/tablet/desktop)  
✅ Consistent typography (Unbounded, Montserrat, Geist fonts)  
✅ Black and white color scheme  
✅ Rounded corners on inputs and buttons  

### Form Pages (Signup & Invite):
✅ Controlled form inputs with validation  
✅ Error message display  
✅ Loading states with spinners  
✅ Full-width responsive layout  

---

## 📱 Responsive Design Strategy

### Mobile (<640px)
- Stack layout vertically
- Hide background images
- Full-width inputs and buttons
- Reduced padding and font sizes
- Touch-friendly button sizes

### Tablet (640px-1024px)
- Increased spacing
- Larger typography
- Adjusted padding
- Optimized for landscape

### Desktop (>1024px)
- Two-column split layout (50/50)
- Full background images visible
- Larger typography (up to 48px)
- Generous spacing

---

## 🔐 Authentication Methods

### Signup & Onboarding
1. User creates account with email/password
2. Password hashed with bcryptjs
3. User stored in Supabase database
4. Invited employees get invitation emails
5. Employees create accounts to join organization

### Login
1. User enters email and password
2. NextAuth validates credentials
3. Password verified against hash
4. JWT token issued on success
5. Session maintained for logged-in user

---

## 📧 Email Integration (TODO)

### Invitation Emails Sent To:
- New employees added during onboarding
- Email contains:
  - Invitation from account owner
  - Link to register account
  - Organization pre-populated
  - Welcome message

### Email Service:
- Recommended: Resend, SendGrid, or Mailgun
- Requires: Email template, API key
- Status: API endpoint placeholder created

---

## ✅ Implementation Status

### Completed ✨
- ✅ Login choice screen
- ✅ Signup form with validation
- ✅ Signin form with NextAuth integration
- ✅ Invite employees form with dynamic fields
- ✅ Setup successful confirmation page
- ✅ Complete navigation flow
- ✅ Responsive design on all pages
- ✅ Error handling and validation
- ✅ Loading states and user feedback
- ✅ Comprehensive documentation

### Todo 📋
- ⏳ Backend signup API endpoint
- ⏳ Backend invite employees API endpoint
- ⏳ Email service integration
- ⏳ Forgot password flow
- ⏳ Dashboard page
- ⏳ Protected routes middleware
- ⏳ Session persistence

---

## 🚀 Testing the Flow

### Quick Start
1. Navigate to `http://localhost:3000/login`
2. Click "Create Account"
3. Fill form (any test data)
4. Submit → Should redirect to `/onboarding/invite-employees`
5. Add employee email
6. Click "Next" → Should redirect to `/onboarding/setup-successful`
7. Click "Proceed" → Should redirect to `/dashboard` (will show 404 until dashboard created)

### Test URLs
- Choice Screen: `http://localhost:3000/login`
- Signup: `http://localhost:3000/login/signup`
- Signin: `http://localhost:3000/login/signin`
- Invite: `http://localhost:3000/onboarding/invite-employees`
- Success: `http://localhost:3000/onboarding/setup-successful`

---

**Last Updated**: December 9, 2025  
**Status**: ✅ Frontend Complete - Ready for API Integration  
**Next Phase**: Backend implementation and testing
