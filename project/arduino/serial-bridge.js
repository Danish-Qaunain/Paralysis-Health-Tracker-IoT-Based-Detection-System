const { SerialPort } = require('serialport');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const port = new SerialPort({
  path: '/dev/ttyUSB0', // Update this to match your Arduino port
  baudRate: 115200,
});

port.on('data', async (data) => {
  try {
    const healthData = JSON.parse(data.toString());
    
    // Insert data into Supabase
    const { error } = await supabase
      .from('health_data')
      .insert([
        {
          patient_id: process.env.PATIENT_ID, // Set this in .env
          heart_rate: healthData.heart_rate,
          temperature: healthData.temperature,
          flex_request: healthData.flex_request,
          fall_status: healthData.fall_status
        }
      ]);

    if (error) {
      console.error('Error inserting data:', error);
    }
  } catch (err) {
    console.error('Error processing data:', err);
  }
});

port.on('error', (err) => {
  console.error('Serial port error:', err);
});