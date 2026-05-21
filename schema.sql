-- =====================================================
-- Database Schema Initialization
-- =====================================================

BEGIN;

-- =====================================================
-- Schemas
-- =====================================================

CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS app;

-- =====================================================
-- Extensions (optional but common in production)
-- =====================================================

-- Uncomment if using UUIDs in future
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- auth.users
-- =====================================================

CREATE TABLE IF NOT EXISTS auth.users (
    id              SERIAL PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   TEXT NOT NULL,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Index to optimize login lookups
CREATE INDEX IF NOT EXISTS idx_auth_users_email
    ON auth.users (email);

-- =====================================================
-- app.requirements
-- =====================================================

CREATE TABLE IF NOT EXISTS app.requirements (
    id              SERIAL PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,

    status          VARCHAR(20) NOT NULL
                        CHECK (status IN ('open', 'processed', 'obsolete')),

    -- Logical ownership (no FK by design)
    user_id         INTEGER NOT NULL,

    created_at      TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Indexes
-- =====================================================

-- Per-user access pattern
CREATE INDEX IF NOT EXISTS idx_app_requirements_user_id
    ON app.requirements (user_id);

-- Optional filtering
CREATE INDEX IF NOT EXISTS idx_app_requirements_status
    ON app.requirements (status);

-- Combined index for common queries
CREATE INDEX IF NOT EXISTS idx_app_requirements_user_status
    ON app.requirements (user_id, status);

-- =====================================================
-- Constraints & Notes
-- =====================================================

-- NOTE:
-- No foreign key constraint is defined between app.requirements.user_id
-- and auth.users.id to maintain schema independence as per system design.
-- Data integrity is enforced at the application layer.

COMMIT;