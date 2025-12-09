# Database Schema Visualization

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AXIOM TRACKER DATABASE SCHEMA                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│   ORGANIZATIONS      │
├──────────────────────┤
│ • id (PK)           │
│ • name              │
│ • description       │
│ • industry          │
│ • size              │
│ • website           │
│ • logo_url          │
│ • settings (JSONB)  │
│ • created_at        │
│ • updated_at        │
│ • is_active         │
└──────────────────────┘
         │
         │ 1:N
         ▼
┌──────────────────────┐         ┌──────────────────────┐
│       USERS          │         │    CERTIFICATES      │
├──────────────────────┤         ├──────────────────────┤
│ • id (PK)           │◄────────┤ • id (PK)           │
│ • email (UNIQUE)    │   1:N   │ • user_id (FK)      │
│ • password_hash     │         │ • organization_id   │
│ • name              │         │ • certificate_type  │
│ • role              │         │ • certificate_name  │
│ • organization_id   │         │ • issuing_authority │
│ • phone             │         │ • certificate_number│
│ • avatar_url        │         │ • issue_date        │
│ • created_at        │         │ • expiry_date       │
│ • updated_at        │         │ • status            │
│ • last_login        │         │ • file_url          │
│ • is_active         │         │ • notes             │
│ • email_verified    │         │ • metadata (JSONB)  │
└──────────────────────┘         │ • qr_code_url       │
         │                       │ • verification_code │
         │ 1:N                   │ • created_at        │
         │                       │ • updated_at        │
         ▼                       │ • created_by (FK)   │
┌──────────────────────┐         └──────────────────────┘
│   NOTIFICATIONS      │                  │
├──────────────────────┤                  │
│ • id (PK)           │                  │ 1:N
│ • user_id (FK)      │◄─────────────────┘
│ • certificate_id    │
│ • alert_rule_id     │
│ • type              │
│ • channel           │
│ • title             │
│ • message           │
│ • status            │
│ • sent_at           │
│ • read_at           │
│ • metadata (JSONB)  │
│ • created_at        │
└──────────────────────┘
         ▲
         │ N:1
         │
┌──────────────────────┐
│    ALERT_RULES       │
├──────────────────────┤
│ • id (PK)           │
│ • organization_id   │
│ • name              │
│ • description       │
│ • certificate_type  │
│ • days_before_expiry│
│ • notification_ch[] │
│ • recipients (JSONB)│
│ • is_active         │
│ • escalation_rules  │
│ • created_at        │
│ • updated_at        │
│ • created_by (FK)   │
└──────────────────────┘

┌──────────────────────┐
│    AUDIT_LOGS        │
├──────────────────────┤
│ • id (PK)           │
│ • user_id (FK)      │
│ • organization_id   │
│ • action            │
│ • resource_type     │
│ • resource_id       │
│ • old_values (JSONB)│
│ • new_values (JSONB)│
│ • ip_address        │
│ • user_agent        │
│ • created_at        │
└──────────────────────┘
```

## Table Relationships

### Primary Relationships

1. **Organizations → Users** (1:N)

   - One organization can have many users
   - Users belong to one organization (or none)

2. **Users → Certificates** (1:N)

   - One user can have many certificates
   - Each certificate belongs to one user

3. **Organizations → Certificates** (1:N)

   - One organization can have many certificates
   - Certificates can be organization-scoped

4. **Users → Notifications** (1:N)

   - One user can have many notifications
   - Each notification is for one user

5. **Certificates → Notifications** (1:N)

   - One certificate can trigger many notifications
   - Each notification can relate to one certificate

6. **Alert Rules → Notifications** (1:N)
   - One alert rule can generate many notifications
   - Each notification can be triggered by one rule

### Audit Relationships

- **Users → Audit Logs** (1:N)
- **Organizations → Audit Logs** (1:N)
- Audit logs track changes to any resource

## Certificate Status Flow

```
┌─────────────┐
│   PENDING   │ (Initial upload/creation)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   ACTIVE    │ (Expiry date > 30 days away)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ EXPIRING    │ (Expiry date ≤ 30 days away)
│    SOON     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   EXPIRED   │ (Expiry date < today)
└─────────────┘

       OR

┌─────────────┐
│   REVOKED   │ (Manually revoked)
└─────────────┘
```

## Notification Flow

```
Certificate Expiry Date Approaching
              ▼
    Check Alert Rules
              ▼
    Match Certificate Type
              ▼
    Calculate Days Until Expiry
              ▼
    Is it in days_before_expiry array?
              ▼
         Create Notification
              ▼
    Send via configured channels
    (email, SMS, in-app, push)
              ▼
    Log in notifications table
              ▼
    Update status (sent/failed)
```

## Row Level Security (RLS) Policies

### Users Table

- ✅ Users can SELECT their own record
- ✅ Users can UPDATE their own record
- ❌ Users cannot DELETE their own record
- ❌ Users cannot INSERT new users (admin only)

### Certificates Table

- ✅ Users can SELECT their own certificates
- ✅ Users can SELECT organization certificates
- ✅ Users can INSERT their own certificates
- ✅ Users can UPDATE their own certificates
- ✅ Users can DELETE their own certificates

### Notifications Table

- ✅ Users can SELECT their own notifications
- ❌ Users cannot modify notifications

### Organizations Table

- ✅ Users can SELECT their organization
- ❌ Users cannot modify organization data

### Alert Rules Table

- ✅ Users can SELECT organization rules
- ✅ Managers can INSERT/UPDATE/DELETE rules

### Audit Logs Table

- ✅ Users can SELECT organization logs
- ❌ Users cannot modify audit logs

## Indexes for Performance

### Users

- `idx_users_email` - Fast email lookups for login
- `idx_users_organization` - Organization queries

### Certificates

- `idx_certificates_user` - User's certificates
- `idx_certificates_organization` - Org certificates
- `idx_certificates_expiry` - Expiry date queries
- `idx_certificates_status` - Status filtering
- `idx_certificates_type` - Type filtering

### Notifications

- `idx_notifications_user` - User notifications
- `idx_notifications_certificate` - Certificate alerts
- `idx_notifications_status` - Unread notifications
- `idx_notifications_created` - Recent notifications

### Audit Logs

- `idx_audit_logs_user` - User activity
- `idx_audit_logs_organization` - Org activity
- `idx_audit_logs_resource` - Resource history
- `idx_audit_logs_created` - Recent activity

## Triggers

### 1. Auto-update `updated_at`

- Tables: users, organizations, certificates, alert_rules
- Trigger: BEFORE UPDATE
- Action: Set `updated_at = NOW()`

### 2. Auto-update Certificate Status

- Table: certificates
- Trigger: BEFORE INSERT OR UPDATE
- Action: Set status based on expiry_date
  - expired: expiry_date < today
  - expiring_soon: expiry_date ≤ today + 30 days
  - active: expiry_date > today + 30 days

## Views

### 1. expiring_certificates

Shows all certificates expiring within 90 days with user and organization details.

### 2. compliance_summary

Aggregates certificate statistics by organization:

- Total certificates
- Active count
- Expiring soon count
- Expired count
- Compliance percentage

## Data Types Reference

### JSONB Fields

**organizations.settings**

```json
{
  "notification_preferences": {
    "email_enabled": true,
    "sms_enabled": false
  },
  "branding": {
    "primary_color": "#000000",
    "logo_url": "https://..."
  }
}
```

**certificates.metadata**

```json
{
  "uploaded_by": "user_id",
  "file_hash": "sha256...",
  "ocr_extracted": true,
  "custom_fields": {
    "department": "Engineering"
  }
}
```

**alert_rules.recipients**

```json
["user1@example.com", "user2@example.com"]
```

**alert_rules.escalation_rules**

```json
{
  "levels": [
    {
      "days_before": 7,
      "recipients": ["manager@example.com"]
    },
    {
      "days_before": 1,
      "recipients": ["director@example.com"]
    }
  ]
}
```

## Best Practices

### When Creating Certificates

1. Always set `user_id` and `created_by`
2. Ensure `expiry_date` is in the future
3. Use consistent `certificate_type` values
4. Add meaningful notes for context

### When Creating Alert Rules

1. Set realistic `days_before_expiry` values
2. Test notification channels before enabling
3. Keep recipient lists up to date
4. Use descriptive names

### When Querying Data

1. Use indexes for filtering (status, type, dates)
2. Leverage views for common queries
3. Use JSONB operators for metadata queries
4. Limit results for large datasets

### Security

1. Never expose `SUPABASE_SERVICE_ROLE_KEY`
2. Always use RLS policies
3. Validate user input before INSERT/UPDATE
4. Log sensitive operations in audit_logs
5. Regularly review audit logs for anomalies
