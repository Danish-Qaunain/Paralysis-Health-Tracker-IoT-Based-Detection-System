/*
  # Create tables for IoT sensor data

  1. New Tables
    - `sensor_readings`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, foreign key)
      - `heart_rate` (numeric)
      - `body_temperature` (numeric)
      - `muscle_activity` (numeric)
      - `timestamp` (timestamptz)
      - `alert_status` (text)

  2. Security
    - Enable RLS on `sensor_readings` table
    - Add policies for authenticated users to read sensor data
*/

CREATE TABLE IF NOT EXISTS sensor_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  heart_rate numeric NOT NULL,
  body_temperature numeric NOT NULL,
  muscle_activity numeric NOT NULL,
  timestamp timestamptz DEFAULT now(),
  alert_status text NOT NULL DEFAULT 'normal',
  CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES auth.users(id)
);

ALTER TABLE sensor_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read sensor data"
  ON sensor_readings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = patient_id);

CREATE INDEX idx_sensor_readings_patient_timestamp 
  ON sensor_readings(patient_id, timestamp DESC);