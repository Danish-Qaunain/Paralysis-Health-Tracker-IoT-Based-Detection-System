import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface SensorData {
  patient_id: string;
  heart_rate: number;
  body_temperature: number;
  muscle_activity: number;
  alert_status?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const data: SensorData = await req.json();

    // Validate the incoming data
    if (!data.patient_id || !data.heart_rate || !data.body_temperature || !data.muscle_activity) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Calculate alert status based on vital signs
    let alert_status = 'normal';
    if (
      data.heart_rate > 100 || data.heart_rate < 60 ||
      data.body_temperature > 38 || data.body_temperature < 36
    ) {
      alert_status = 'warning';
    }
    if (
      data.heart_rate > 120 || data.heart_rate < 50 ||
      data.body_temperature > 39 || data.body_temperature < 35
    ) {
      alert_status = 'critical';
    }

    // Insert the sensor reading
    const { error } = await supabase
      .from('sensor_readings')
      .insert({
        patient_id: data.patient_id,
        heart_rate: data.heart_rate,
        body_temperature: data.body_temperature,
        muscle_activity: data.muscle_activity,
        alert_status: data.alert_status || alert_status
      });

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: 'Data received successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});