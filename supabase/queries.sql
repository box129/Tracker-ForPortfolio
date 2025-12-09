-- Quick Reference: Common Database Queries for Axiom Tracker
-- Copy and paste these into Supabase SQL Editor as needed

-- =====================================================
-- USER MANAGEMENT
-- =====================================================

-- Create a new user with hashed password
-- Note: Generate password hash using bcryptjs in your application
INSERT INTO users (email, password_hash, name, role)
VALUES (
    'newuser@example.com',
    '$2a$10$...your-hashed-password',
    'New User Name',
    'user'
);

-- Find user by email
SELECT id, email, name, role, created_at, last_login
FROM users
WHERE email = 'user@example.com';

-- Update user profile
UPDATE users
SET name = 'Updated Name', phone = '+1234567890'
WHERE id = 'user-uuid-here';

-- Deactivate user account
UPDATE users
SET is_active = false
WHERE email = 'user@example.com';

-- List all active users
SELECT id, email, name, role, created_at
FROM users
WHERE is_active = true
ORDER BY created_at DESC;

-- =====================================================
-- CERTIFICATE MANAGEMENT
-- =====================================================

-- Add a new certificate
INSERT INTO certificates (
    user_id,
    organization_id,
    certificate_type,
    certificate_name,
    issuing_authority,
    certificate_number,
    issue_date,
    expiry_date,
    notes,
    created_by
) VALUES (
    'user-uuid',
    'org-uuid',
    'Professional Certification',
    'AWS Solutions Architect',
    'Amazon Web Services',
    'AWS-2024-001',
    '2024-01-01',
    '2026-01-01',
    'Professional level certification',
    'user-uuid'
);

-- Find all certificates for a user
SELECT 
    certificate_name,
    certificate_type,
    expiry_date,
    status,
    issuing_authority
FROM certificates
WHERE user_id = 'user-uuid'
ORDER BY expiry_date ASC;

-- Find expiring certificates (next 30 days)
SELECT 
    c.certificate_name,
    c.expiry_date,
    c.status,
    u.name as user_name,
    u.email as user_email,
    (c.expiry_date - CURRENT_DATE) as days_remaining
FROM certificates c
JOIN users u ON c.user_id = u.id
WHERE c.expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
  AND c.status != 'expired'
ORDER BY c.expiry_date ASC;

-- Find all expired certificates
SELECT 
    certificate_name,
    expiry_date,
    user_id
FROM certificates
WHERE status = 'expired'
ORDER BY expiry_date DESC;

-- Update certificate status manually
UPDATE certificates
SET status = 'active'
WHERE id = 'certificate-uuid';

-- Delete a certificate
DELETE FROM certificates
WHERE id = 'certificate-uuid';

-- =====================================================
-- COMPLIANCE REPORTING
-- =====================================================

-- Get compliance summary for an organization
SELECT * FROM compliance_summary
WHERE organization_id = 'org-uuid';

-- Get all expiring certificates (uses view)
SELECT * FROM expiring_certificates
ORDER BY days_until_expiry ASC;

-- Certificate status breakdown
SELECT 
    status,
    COUNT(*) as count,
    ROUND(COUNT(*)::numeric / (SELECT COUNT(*) FROM certificates) * 100, 2) as percentage
FROM certificates
GROUP BY status
ORDER BY count DESC;

-- Certificates by type
SELECT 
    certificate_type,
    COUNT(*) as total,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active,
    COUNT(CASE WHEN status = 'expired' THEN 1 END) as expired,
    COUNT(CASE WHEN status = 'expiring_soon' THEN 1 END) as expiring_soon
FROM certificates
GROUP BY certificate_type
ORDER BY total DESC;

-- Monthly expiration forecast
SELECT 
    DATE_TRUNC('month', expiry_date) as month,
    COUNT(*) as certificates_expiring
FROM certificates
WHERE expiry_date >= CURRENT_DATE
GROUP BY DATE_TRUNC('month', expiry_date)
ORDER BY month ASC
LIMIT 12;

-- =====================================================
-- ALERT RULES
-- =====================================================

-- Create a new alert rule
INSERT INTO alert_rules (
    organization_id,
    name,
    description,
    certificate_type,
    days_before_expiry,
    notification_channels,
    recipients,
    is_active,
    created_by
) VALUES (
    'org-uuid',
    'Professional Certifications Alert',
    'Alerts for all professional certifications',
    'Professional Certification',
    ARRAY[90, 60, 30, 14, 7, 1],
    ARRAY['email', 'in_app'],
    '["user1@example.com", "user2@example.com"]'::jsonb,
    true,
    'user-uuid'
);

-- List all active alert rules
SELECT 
    name,
    certificate_type,
    days_before_expiry,
    notification_channels,
    is_active
FROM alert_rules
WHERE is_active = true
ORDER BY name;

-- Disable an alert rule
UPDATE alert_rules
SET is_active = false
WHERE id = 'rule-uuid';

-- =====================================================
-- NOTIFICATIONS
-- =====================================================

-- Get unread notifications for a user
SELECT 
    title,
    message,
    type,
    created_at
FROM notifications
WHERE user_id = 'user-uuid'
  AND status != 'read'
ORDER BY created_at DESC;

-- Mark notification as read
UPDATE notifications
SET status = 'read', read_at = NOW()
WHERE id = 'notification-uuid';

-- Get notification history
SELECT 
    n.title,
    n.message,
    n.type,
    n.channel,
    n.status,
    n.created_at,
    c.certificate_name
FROM notifications n
LEFT JOIN certificates c ON n.certificate_id = c.id
WHERE n.user_id = 'user-uuid'
ORDER BY n.created_at DESC
LIMIT 50;

-- Delete old read notifications (older than 90 days)
DELETE FROM notifications
WHERE status = 'read'
  AND read_at < NOW() - INTERVAL '90 days';

-- =====================================================
-- AUDIT LOGS
-- =====================================================

-- View recent audit logs
SELECT 
    u.name as user_name,
    al.action,
    al.resource_type,
    al.created_at,
    al.ip_address
FROM audit_logs al
LEFT JOIN users u ON al.user_id = u.id
ORDER BY al.created_at DESC
LIMIT 100;

-- Audit logs for specific user
SELECT 
    action,
    resource_type,
    resource_id,
    created_at
FROM audit_logs
WHERE user_id = 'user-uuid'
ORDER BY created_at DESC;

-- Audit logs for specific resource
SELECT 
    u.name as user_name,
    al.action,
    al.old_values,
    al.new_values,
    al.created_at
FROM audit_logs al
LEFT JOIN users u ON al.user_id = u.id
WHERE al.resource_type = 'certificate'
  AND al.resource_id = 'certificate-uuid'
ORDER BY al.created_at DESC;

-- =====================================================
-- ORGANIZATIONS
-- =====================================================

-- Create a new organization
INSERT INTO organizations (name, description, industry, size, website)
VALUES (
    'New Company Inc.',
    'Description of the company',
    'Technology',
    '11-50',
    'https://example.com'
);

-- List all organizations
SELECT id, name, industry, size, created_at
FROM organizations
WHERE is_active = true
ORDER BY name;

-- Get organization with user count
SELECT 
    o.name,
    o.industry,
    COUNT(u.id) as user_count
FROM organizations o
LEFT JOIN users u ON o.id = u.organization_id
GROUP BY o.id, o.name, o.industry
ORDER BY user_count DESC;

-- =====================================================
-- MAINTENANCE QUERIES
-- =====================================================

-- Update all certificate statuses (run daily)
UPDATE certificates
SET status = CASE
    WHEN expiry_date < CURRENT_DATE THEN 'expired'
    WHEN expiry_date <= CURRENT_DATE + INTERVAL '30 days' THEN 'expiring_soon'
    ELSE 'active'
END
WHERE status != 'revoked';

-- Clean up old notifications (older than 6 months)
DELETE FROM notifications
WHERE created_at < NOW() - INTERVAL '6 months'
  AND status = 'read';

-- Vacuum and analyze tables (optimize performance)
VACUUM ANALYZE users;
VACUUM ANALYZE certificates;
VACUUM ANALYZE notifications;

-- Check table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- =====================================================
-- USEFUL STATISTICS
-- =====================================================

-- Overall system statistics
SELECT 
    (SELECT COUNT(*) FROM users WHERE is_active = true) as active_users,
    (SELECT COUNT(*) FROM organizations WHERE is_active = true) as active_organizations,
    (SELECT COUNT(*) FROM certificates) as total_certificates,
    (SELECT COUNT(*) FROM certificates WHERE status = 'active') as active_certificates,
    (SELECT COUNT(*) FROM certificates WHERE status = 'expiring_soon') as expiring_soon,
    (SELECT COUNT(*) FROM certificates WHERE status = 'expired') as expired_certificates;

-- User activity summary
SELECT 
    u.name,
    u.email,
    COUNT(c.id) as certificate_count,
    MAX(c.created_at) as last_certificate_added,
    u.last_login
FROM users u
LEFT JOIN certificates c ON u.id = c.user_id
WHERE u.is_active = true
GROUP BY u.id, u.name, u.email, u.last_login
ORDER BY certificate_count DESC;

-- Certificates expiring per month (next 12 months)
SELECT 
    TO_CHAR(expiry_date, 'YYYY-MM') as month,
    COUNT(*) as expiring_count
FROM certificates
WHERE expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '12 months'
  AND status != 'expired'
GROUP BY TO_CHAR(expiry_date, 'YYYY-MM')
ORDER BY month;
