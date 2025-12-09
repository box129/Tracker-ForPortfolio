-- =====================================================
-- Axiom Tracker - Sample Data (Optional)
-- =====================================================
-- This migration adds sample data for testing
-- ONLY run this in development/testing environments

-- =====================================================
-- SAMPLE ORGANIZATIONS
-- =====================================================
INSERT INTO organizations (id, name, description, industry, size, website) VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'Tech Innovations Inc.',
    'Leading technology solutions provider',
    'Technology',
    '51-200',
    'https://techinnovations.example.com'
),
(
    '22222222-2222-2222-2222-222222222222',
    'Healthcare Solutions Ltd.',
    'Comprehensive healthcare management services',
    'Healthcare',
    '201-500',
    'https://healthcaresolutions.example.com'
),
(
    '33333333-3333-3333-3333-333333333333',
    'Construction Masters',
    'Professional construction and safety services',
    'Construction',
    '11-50',
    'https://constructionmasters.example.com'
);

-- =====================================================
-- SAMPLE USERS
-- =====================================================
-- Password for all test users: "password123"
-- Hash generated with: bcrypt.hash("password123", 10)
-- You should generate your own hash using bcryptjs

INSERT INTO users (id, email, password_hash, name, role, organization_id, email_verified) VALUES
(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'admin@axiomtracker.com',
    '$2b$10$CsDn8SZM4AO2mEWjItbMGOw2xS9XMzo/Kls53E7H8TCAurL8ld7jm',
    'Admin User',
    'admin',
    NULL,
    true
),
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'john.doe@techinnovations.com',
    '$2b$10$CsDn8SZM4AO2mEWjItbMGOw2xS9XMzo/Kls53E7H8TCAurL8ld7jm',
    'John Doe',
    'manager',
    '11111111-1111-1111-1111-111111111111',
    true
),
(
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'jane.smith@healthcaresolutions.com',
    '$2b$10$CsDn8SZM4AO2mEWjItbMGOw2xS9XMzo/Kls53E7H8TCAurL8ld7jm',
    'Jane Smith',
    'user',
    '22222222-2222-2222-2222-222222222222',
    true
),
(
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'mike.johnson@constructionmasters.com',
    '$2b$10$CsDn8SZM4AO2mEWjItbMGOw2xS9XMzo/Kls53E7H8TCAurL8ld7jm',
    'Mike Johnson',
    'user',
    '33333333-3333-3333-3333-333333333333',
    true
);

-- =====================================================
-- SAMPLE CERTIFICATES
-- =====================================================
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
) VALUES
-- Active certificates
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '11111111-1111-1111-1111-111111111111',
    'Professional Certification',
    'AWS Solutions Architect',
    'Amazon Web Services',
    'AWS-SA-2024-001',
    '2024-01-15',
    '2026-01-15',
    'Professional level certification for cloud architecture',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
),
(
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '22222222-2222-2222-2222-222222222222',
    'Medical License',
    'Registered Nurse License',
    'State Medical Board',
    'RN-2023-5678',
    '2023-03-01',
    '2025-03-01',
    'Valid nursing license for state practice',
    'cccccccc-cccc-cccc-cccc-cccccccccccc'
),
-- Expiring soon certificates
(
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    '33333333-3333-3333-3333-333333333333',
    'Safety Certification',
    'OSHA 30-Hour Construction',
    'OSHA',
    'OSHA-30-2024-9876',
    '2024-02-01',
    CURRENT_DATE + INTERVAL '25 days',
    'Construction safety certification expiring soon',
    'dddddddd-dddd-dddd-dddd-dddddddddddd'
),
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '11111111-1111-1111-1111-111111111111',
    'Security Clearance',
    'CompTIA Security+',
    'CompTIA',
    'SEC-PLUS-2024-4321',
    '2024-06-15',
    CURRENT_DATE + INTERVAL '15 days',
    'Security certification needs renewal',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
),
-- Expired certificate
(
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '22222222-2222-2222-2222-222222222222',
    'CPR Certification',
    'CPR/AED Certification',
    'American Heart Association',
    'CPR-2023-1111',
    '2023-01-10',
    '2024-01-10',
    'Expired - needs immediate renewal',
    'cccccccc-cccc-cccc-cccc-cccccccccccc'
),
-- More active certificates
(
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    '33333333-3333-3333-3333-333333333333',
    'Professional License',
    'General Contractor License',
    'State Licensing Board',
    'GC-2024-7890',
    '2024-05-01',
    '2027-05-01',
    'Valid contractor license',
    'dddddddd-dddd-dddd-dddd-dddddddddddd'
);

-- =====================================================
-- SAMPLE ALERT RULES
-- =====================================================
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
) VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'Professional Certifications Alert',
    'Alert for all professional certifications',
    'Professional Certification',
    ARRAY[90, 60, 30, 14, 7, 1],
    ARRAY['email', 'in_app'],
    '["john.doe@techinnovations.com", "admin@techinnovations.com"]'::jsonb,
    true,
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
),
(
    '22222222-2222-2222-2222-222222222222',
    'Medical License Renewal',
    'Critical alerts for medical licenses',
    'Medical License',
    ARRAY[120, 90, 60, 30, 14, 7, 3, 1],
    ARRAY['email', 'sms', 'in_app'],
    '["jane.smith@healthcaresolutions.com", "compliance@healthcaresolutions.com"]'::jsonb,
    true,
    'cccccccc-cccc-cccc-cccc-cccccccccccc'
),
(
    '33333333-3333-3333-3333-333333333333',
    'Safety Certifications',
    'OSHA and safety certification alerts',
    'Safety Certification',
    ARRAY[60, 30, 14, 7],
    ARRAY['email', 'in_app'],
    '["mike.johnson@constructionmasters.com", "safety@constructionmasters.com"]'::jsonb,
    true,
    'dddddddd-dddd-dddd-dddd-dddddddddddd'
);

-- =====================================================
-- SAMPLE NOTIFICATIONS
-- =====================================================
INSERT INTO notifications (
    user_id,
    certificate_id,
    type,
    channel,
    title,
    message,
    status,
    sent_at
) 
SELECT 
    c.user_id,
    c.id,
    'expiry_warning',
    'email',
    'Certificate Expiring Soon',
    'Your ' || c.certificate_name || ' will expire on ' || c.expiry_date::text,
    'sent',
    NOW() - INTERVAL '2 days'
FROM certificates c
WHERE c.status = 'expiring_soon'
LIMIT 3;

-- =====================================================
-- SAMPLE AUDIT LOGS
-- =====================================================
INSERT INTO audit_logs (
    user_id,
    organization_id,
    action,
    resource_type,
    resource_id,
    new_values
) VALUES
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '11111111-1111-1111-1111-111111111111',
    'CREATE',
    'certificate',
    (SELECT id FROM certificates WHERE certificate_number = 'AWS-SA-2024-001'),
    '{"certificate_name": "AWS Solutions Architect"}'::jsonb
),
(
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '22222222-2222-2222-2222-222222222222',
    'CREATE',
    'alert_rule',
    (SELECT id FROM alert_rules WHERE name = 'Medical License Renewal'),
    '{"name": "Medical License Renewal", "is_active": true}'::jsonb
);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify the data was inserted correctly

-- Check organizations
-- SELECT * FROM organizations;

-- Check users
-- SELECT id, email, name, role, organization_id FROM users;

-- Check certificates
-- SELECT certificate_name, certificate_type, status, expiry_date FROM certificates;

-- Check expiring certificates view
-- SELECT * FROM expiring_certificates;

-- Check compliance summary
-- SELECT * FROM compliance_summary;
