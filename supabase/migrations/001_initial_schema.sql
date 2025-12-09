-- =====================================================
-- Axiom Tracker - Initial Database Schema
-- =====================================================
-- This migration creates the core tables for the Axiom Tracker application
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
-- =====================================================
-- Stores user account information
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'manager')),
    organization_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone VARCHAR(50),
    avatar_url TEXT
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_organization ON users(organization_id);

-- =====================================================
-- ORGANIZATIONS TABLE
-- =====================================================
-- Stores organization/company information
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    industry VARCHAR(100),
    size VARCHAR(50) CHECK (size IN ('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+')),
    website VARCHAR(255),
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    settings JSONB DEFAULT '{}'::jsonb
);

-- Add foreign key constraint to users table
ALTER TABLE users 
ADD CONSTRAINT fk_users_organization 
FOREIGN KEY (organization_id) 
REFERENCES organizations(id) 
ON DELETE SET NULL;

-- =====================================================
-- CERTIFICATES TABLE
-- =====================================================
-- Stores certificate/credential information
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    certificate_type VARCHAR(100) NOT NULL,
    certificate_name VARCHAR(255) NOT NULL,
    issuing_authority VARCHAR(255),
    certificate_number VARCHAR(100),
    issue_date DATE,
    expiry_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'expiring_soon', 'revoked', 'pending')),
    file_url TEXT,
    file_name VARCHAR(255),
    file_size INTEGER,
    notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    qr_code_url TEXT,
    verification_code VARCHAR(50) UNIQUE
);

-- Create indexes for better query performance
CREATE INDEX idx_certificates_user ON certificates(user_id);
CREATE INDEX idx_certificates_organization ON certificates(organization_id);
CREATE INDEX idx_certificates_expiry ON certificates(expiry_date);
CREATE INDEX idx_certificates_status ON certificates(status);
CREATE INDEX idx_certificates_type ON certificates(certificate_type);

-- =====================================================
-- ALERT_RULES TABLE
-- =====================================================
-- Stores alert configuration rules
CREATE TABLE IF NOT EXISTS alert_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    certificate_type VARCHAR(100),
    days_before_expiry INTEGER[] DEFAULT ARRAY[90, 60, 30, 14, 7, 1],
    notification_channels VARCHAR(50)[] DEFAULT ARRAY['email'],
    recipients JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    escalation_rules JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

CREATE INDEX idx_alert_rules_organization ON alert_rules(organization_id);
CREATE INDEX idx_alert_rules_active ON alert_rules(is_active);

-- =====================================================
-- NOTIFICATIONS TABLE
-- =====================================================
-- Stores notification history
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    certificate_id UUID REFERENCES certificates(id) ON DELETE CASCADE,
    alert_rule_id UUID REFERENCES alert_rules(id) ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('expiry_warning', 'expired', 'renewal_reminder', 'system', 'custom')),
    channel VARCHAR(50) NOT NULL CHECK (channel IN ('email', 'sms', 'push', 'in_app')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'read')),
    sent_at TIMESTAMP WITH TIME ZONE,
    read_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_certificate ON notifications(certificate_id);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- =====================================================
-- AUDIT_LOGS TABLE
-- =====================================================
-- Stores audit trail for compliance
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_organization ON audit_logs(organization_id);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alert_rules_updated_at BEFORE UPDATE ON alert_rules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically update certificate status based on expiry date
CREATE OR REPLACE FUNCTION update_certificate_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.expiry_date < CURRENT_DATE THEN
        NEW.status = 'expired';
    ELSIF NEW.expiry_date <= CURRENT_DATE + INTERVAL '30 days' THEN
        NEW.status = 'expiring_soon';
    ELSE
        NEW.status = 'active';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_certificate_status_trigger 
BEFORE INSERT OR UPDATE OF expiry_date ON certificates
    FOR EACH ROW EXECUTE FUNCTION update_certificate_status();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE alert_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY users_select_own ON users
    FOR SELECT
    USING (auth.uid()::uuid = id);

-- Users can update their own data
CREATE POLICY users_update_own ON users
    FOR UPDATE
    USING (auth.uid()::uuid = id);

-- Certificates: Users can see their own certificates and organization certificates
CREATE POLICY certificates_select_own ON certificates
    FOR SELECT
    USING (
        user_id = auth.uid()::uuid 
        OR organization_id IN (
            SELECT organization_id FROM users WHERE id = auth.uid()::uuid
        )
    );

-- Certificates: Users can insert their own certificates
CREATE POLICY certificates_insert_own ON certificates
    FOR INSERT
    WITH CHECK (user_id = auth.uid()::uuid);

-- Certificates: Users can update their own certificates
CREATE POLICY certificates_update_own ON certificates
    FOR UPDATE
    USING (user_id = auth.uid()::uuid);

-- Certificates: Users can delete their own certificates
CREATE POLICY certificates_delete_own ON certificates
    FOR DELETE
    USING (user_id = auth.uid()::uuid);

-- Notifications: Users can see their own notifications
CREATE POLICY notifications_select_own ON notifications
    FOR SELECT
    USING (user_id = auth.uid()::uuid);

-- =====================================================
-- SEED DATA (Optional - for testing)
-- =====================================================
-- Uncomment to insert sample data

-- INSERT INTO organizations (name, description, industry, size) VALUES
-- ('Acme Corporation', 'Leading provider of innovative solutions', 'Technology', '51-200'),
-- ('Global Industries', 'Manufacturing excellence worldwide', 'Manufacturing', '501-1000');

-- Note: Password is 'password123' hashed with bcrypt
-- INSERT INTO users (email, password_hash, name, role, organization_id) VALUES
-- ('admin@axiomtracker.com', '$2a$10$YourHashedPasswordHere', 'Admin User', 'admin', NULL),
-- ('user@example.com', '$2a$10$YourHashedPasswordHere', 'Test User', 'user', NULL);

-- =====================================================
-- VIEWS FOR REPORTING
-- =====================================================

-- View for expiring certificates
CREATE OR REPLACE VIEW expiring_certificates AS
SELECT 
    c.*,
    u.name as user_name,
    u.email as user_email,
    o.name as organization_name,
    (c.expiry_date - CURRENT_DATE) as days_until_expiry
FROM certificates c
LEFT JOIN users u ON c.user_id = u.id
LEFT JOIN organizations o ON c.organization_id = o.id
WHERE c.expiry_date <= CURRENT_DATE + INTERVAL '90 days'
  AND c.status IN ('active', 'expiring_soon')
ORDER BY c.expiry_date ASC;

-- View for compliance dashboard
CREATE OR REPLACE VIEW compliance_summary AS
SELECT 
    o.id as organization_id,
    o.name as organization_name,
    COUNT(c.id) as total_certificates,
    COUNT(CASE WHEN c.status = 'active' THEN 1 END) as active_certificates,
    COUNT(CASE WHEN c.status = 'expiring_soon' THEN 1 END) as expiring_soon,
    COUNT(CASE WHEN c.status = 'expired' THEN 1 END) as expired_certificates,
    ROUND(
        (COUNT(CASE WHEN c.status = 'active' THEN 1 END)::numeric / 
         NULLIF(COUNT(c.id), 0) * 100), 2
    ) as compliance_percentage
FROM organizations o
LEFT JOIN certificates c ON o.id = c.organization_id
GROUP BY o.id, o.name;

-- =====================================================
-- COMMENTS
-- =====================================================
COMMENT ON TABLE users IS 'Stores user account information and authentication details';
COMMENT ON TABLE organizations IS 'Stores organization/company information for multi-tenant support';
COMMENT ON TABLE certificates IS 'Stores all certificate and credential records';
COMMENT ON TABLE alert_rules IS 'Defines notification rules for certificate expiry alerts';
COMMENT ON TABLE notifications IS 'Tracks all notifications sent to users';
COMMENT ON TABLE audit_logs IS 'Maintains audit trail for compliance and security';
