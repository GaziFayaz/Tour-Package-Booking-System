-- Database initialization script
-- Run this script in your MySQL database to set up the project

-- Create database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS nestjs_app;

-- Switch to the database
USE nestjs_app;

-- The application will automatically create tables using TypeORM synchronization
-- This is enabled only in development mode (see app.module.ts)

-- Example queries you can run after the application starts:

-- View all tables created by TypeORM
-- SHOW TABLES;

-- View the users table structure
-- DESCRIBE users;

-- Insert sample data
-- INSERT INTO users (email, firstName, lastName) VALUES 
-- ('john.doe@example.com', 'John', 'Doe'),
-- ('jane.smith@example.com', 'Jane', 'Smith');
