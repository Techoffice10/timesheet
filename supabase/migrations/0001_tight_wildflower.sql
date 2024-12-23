/*
  # Initial Schema Setup for Team Management App

  1. New Tables
    - users
      - Extended user profile information
    - schedules
      - Employee work schedules
    - time_entries
      - Time clock entries
    - tasks
      - Task management
    
  2. Security
    - RLS enabled on all tables
    - Policies for authenticated users
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'manager', 'employee')),
  department text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  title text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Time entries table
CREATE TABLE IF NOT EXISTS time_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  assigned_to uuid REFERENCES users(id) NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed')),
  due_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Schedules policies
CREATE POLICY "Users can view all schedules"
  ON schedules
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own schedules"
  ON schedules
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Time entries policies
CREATE POLICY "Users can view their own time entries"
  ON time_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own time entries"
  ON time_entries
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Tasks policies
CREATE POLICY "Users can view all tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage assigned tasks"
  ON tasks
  FOR ALL
  TO authenticated
  USING (auth.uid() = assigned_to);