/*
  # Create authentication tables

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password` (text)
      - `role` (text)
      - `preferences` (jsonb)
      - `created_at` (timestamp)
    - `patients`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `name` (text)
      - `age` (integer)
      - `email` (text)
      - `phone` (text)
      - `patient_id` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'patient')),
  preferences jsonb DEFAULT '{"theme": "light", "fontSize": "medium", "alertSound": true, "chartRefreshRate": 3000}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  age integer NOT NULL CHECK (age > 0),
  email text NOT NULL,
  phone text NOT NULL,
  patient_id text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can update own preferences"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policies for patients table
CREATE POLICY "Admins can manage all patients"
  ON patients
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Patients can read own data"
  ON patients
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password, role)
VALUES ('admin', '$2a$10$xJ1Qp6jYL5S7D8yZl1z3aOt0TXXDPQo1CG1YqYw1qX9OvB6z3.Kxe', 'admin')
ON CONFLICT (username) DO NOTHING;