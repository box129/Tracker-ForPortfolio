# Post-Signup Onboarding Flow

## Overview
After users successfully create an account via the signup page, they are guided through a two-step onboarding process:

1. **Invite Employees** - Add team members to the organization
2. **Setup Successful** - Confirmation that invitations have been sent

---

## Flow Diagram

```
Signup Form (/login/signup)
    ↓
    [User fills: First Name, Last Name, Email, Password]
    ↓
    [Validate password & form fields]
    ↓
    [Account created]
    ↓
Invite Employees (/onboarding/invite-employees)
    ↓
    [User adds employee email(s)]
    ↓
    [Optional: Click "Add Another Employee" to add more]
    ↓
    [Click "Next" to send invitations]
    ↓
Setup Successful (/onboarding/setup-successful)
    ↓
    [Shows success confirmation with checkmark]
    ↓
    [Click "Proceed" to go to dashboard]
    ↓
Dashboard (/dashboard)
```

---

## Page 1: Invite Employees
**Route**: `/onboarding/invite-employees`  
**File**: `app/onboarding/invite-employees/page.tsx`

### Features
- **Dynamic Employee Fields**: Add multiple employee emails
- **Validation**: Ensures valid email format and at least one email is provided
- **Add Another Employee Button**: Allows users to add multiple employees in one flow
- **Next Button**: Proceeds to success page after validation
- **Error Handling**: Clear error messages for validation failures
- **Loading State**: Shows spinner during submission

### Layout
- **Left Section** (Desktop only): Background image with dark overlay and hero text
- **Right Section**: Form with employee email input fields and action buttons
- **Responsive**: Mobile-first design, adapts to all screen sizes

### Form Validation
```typescript
// Email regex validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rules:
✓ At least one email required
✓ Valid email format required
✓ Error message if validation fails
```

### API Integration Points
```typescript
// TODO: Implement in backend
POST /api/auth/invite-employees
{
  emails: string[]  // Array of employee emails
}

Response:
{
  success: boolean
  message: string
  invitationsSent: number
}
```

---

## Page 2: Setup Successful
**Route**: `/onboarding/setup-successful`  
**File**: `app/onboarding/setup-successful/page.tsx`

### Features
- **Success Icon**: Animated green checkmark in concentric circles
- **Confirmation Message**: "Setup Successful" heading
- **Email Confirmation**: Notifies user that emails have been sent
- **Proceed Button**: Routes to dashboard

### Layout
- **Left Section** (Desktop only): Background image with dark overlay and hero text
- **Right Section**: Centered success message with icon, heading, description, and button
- **Responsive**: Mobile-first design

### Color Scheme for Success Icon
- **Outer Ring**: `#f1fff1` (very light green)
- **Middle Ring**: `#caffc7` (light green)
- **Inner Circle**: `#0bd200` (bright green)
- **Checkmark Icon**: White on green background

---

## User Journey

### New Organization Owner
```
1. Visits /login
2. Clicks "Create Account"
3. Fills signup form on /login/signup
4. Account created successfully
5. Redirects to /onboarding/invite-employees
6. Adds team member emails
7. Clicks "Add Another Employee" (optional) to add more
8. Clicks "Next"
9. Invitations sent to employees
10. Sees success message on /onboarding/setup-successful
11. Clicks "Proceed" → /dashboard
12. Dashboard loads for account owner
```

### Invited Employee
```
1. Receives invitation email
2. Clicks email link to register
3. Registers account on /login/signup
4. Is added to organization automatically
5. Accesses shared organization dashboard
```

---

## Design System

### Typography
- **Headings** (32-36px): `font-unbounded`, font-semibold
- **Body Text** (20-22px): `font-montserrat`, font-normal
- **Labels** (20px): `font-montserrat`, font-normal

### Colors
- **Primary Background**: White (`#ffffff`)
- **Input Background**: Light Gray (`#f3f3f3`)
- **Text**: Black (`#000000`)
- **Secondary Text**: Dark Gray (`#7c7c7c`)
- **Borders**: Black (`#000000`)
- **Error**: Red (`#DC2626`)
- **Success Green**: Bright Green (`#0bd200`)

### Spacing
- **Form Fields**: 32px horizontal padding, 29px vertical padding
- **Input Height**: 82px (includes padding)
- **Button Height**: 69px
- **Gap between elements**: 15px (labels to inputs), 32px (form sections), 93px (icon to buttons)

### Border Radius
- **Inputs**: 8px
- **Buttons**: 8px
- **Icons**: 106px (full circle for outer ring)

---

## Component Breakdown

### Shared Header Component
All onboarding pages include:
- Logo and "Axiom Tracker" text
- "Back to Website" link
- Background image with dark overlay
- Hero text: "Never Miss Your Credential Renewal Again"
- Animated arrow button

### Invite Employees Page Components
1. **Page Title & Description**
   - Heading: "Invite Employees"
   - Subheading: "Invite employees to manage credentials"

2. **Email Input Fields**
   - Dynamic fields based on user input
   - Labeled as "Employee Email", "Employee Email 2", etc.
   - Placeholder: "Enter email address"
   - Full width responsive

3. **Add Another Employee Button**
   - Border style with black outline
   - Hover effect (background turns black, text white)
   - Adds new input field to form

4. **Next Button**
   - Full width black button
   - White text
   - Loading state with spinner
   - Disabled while submitting

### Setup Successful Page Components
1. **Success Icon Container**
   - Three concentric circles with gradient green
   - Checkmark icon in center
   - Takes up significant visual space

2. **Confirmation Text**
   - "Setup Successful" heading
   - Descriptive message about emails sent

3. **Proceed Button**
   - Full width black button
   - Routes to dashboard

---

## State Management

### Invite Employees Page
```typescript
interface State {
  employees: string[]              // Array of email addresses
  isSubmitting: boolean            // Form submission state
  error: string                    // Error message if any
}

// Methods:
handleEmailChange(index, value)    // Update specific email
handleAddAnother()                 // Add new email field
handleNext()                       // Validate and submit
```

---

## Error Handling

### Validation Errors
```typescript
if (validEmails.length === 0) {
  error = "Please enter at least one employee email"
}

if (!emailRegex.test(email)) {
  error = "Please enter valid email addresses"
}

if (submitError) {
  error = "Failed to send invitations. Please try again."
}
```

### User Feedback
- Red error box appears above form fields
- Error message is clear and actionable
- Button disabled during submission
- Loading spinner shows progress

---

## Mobile Responsiveness

### Breakpoints
- **Mobile** (<640px): 
  - Single column layout
  - Hidden background image
  - Adjusted padding and spacing
  - Full-width inputs and buttons

- **Tablet** (640px-1024px): 
  - Adjusted spacing and font sizes
  - Optimized padding

- **Desktop** (>1024px): 
  - Two-column split layout (50/50)
  - Full background images visible
  - Optimized spacing and typography

### Mobile-First Classes
```
- h-[40vh] lg:h-screen         // Image height
- px-6 lg:px-8                 // Horizontal padding
- text-sm lg:text-base         // Typography scaling
- w-1/2 vs w-full              // Full-width on mobile
- flex-col lg:flex-row         // Stacked on mobile
```

---

## Next Steps (TODO)

1. **Implement Backend API**
   - Create `/api/auth/invite-employees` endpoint
   - Validate emails and create invitations
   - Send invitation emails with registration links

2. **Email Service Integration**
   - Set up email provider (Resend, SendGrid, etc.)
   - Create invitation email template
   - Include unique registration links for invitees

3. **Database Updates**
   - Create `invitations` table for tracking
   - Add user relationship to organizations
   - Track invitation status and sent date

4. **Dashboard Integration**
   - Create `/dashboard` page for authenticated users
   - Show organization info and team members
   - Display onboarding status

5. **Invited User Flow**
   - Handle invitation links
   - Pre-populate organization in signup
   - Automatically add to organization on signup

---

## Testing Checklist

- [ ] Test creating account → redirects to invite employees
- [ ] Test adding one employee email → validates correctly
- [ ] Test adding multiple employees → all emails collected
- [ ] Test invalid email format → shows error message
- [ ] Test without email → shows required error
- [ ] Test "Add Another Employee" button → adds new field
- [ ] Test "Next" button → shows loading spinner
- [ ] Test success page → displays with icon animation
- [ ] Test "Proceed" button → routes to dashboard
- [ ] Test mobile layout → responsive on all sizes
- [ ] Test form submission error handling
- [ ] Test back navigation links

---

## File Locations

```
app/
├── login/
│   └── signup/
│       └── page.tsx                  # Updated to redirect to invite-employees
├── onboarding/
│   ├── invite-employees/
│   │   └── page.tsx                  # Employee invitation form
│   └── setup-successful/
│       └── page.tsx                  # Success confirmation
└── dashboard/
    └── page.tsx                      # (TODO) To be created
```

---

## Images & Assets

### Invite Employees Page Assets
- Background image: Professional at desk (dark overlay)
- Logo: Axiom Tracker logo
- Back arrow icon
- Animated arrow button

### Setup Successful Page Assets
- Background image: Professional at desk (dark overlay)
- Logo: Axiom Tracker logo
- Back arrow icon
- Animated arrow button
- Checkmark icon (SVG)

All images are fetched from Figma API URLs and cached for 7 days.

---

**Status**: ✅ IMPLEMENTED  
**Ready for**: Backend integration, testing, deployment
