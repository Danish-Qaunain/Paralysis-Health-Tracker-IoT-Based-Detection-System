import { supabase } from '../lib/supabase';

export async function registerPatient({
  email,
  password,
  fullName,
  username,
}: {
  email: string;
  password: string;
  fullName: string;
  username: string;
}) {
  // Step 1: Create user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    throw new Error(`Sign up failed: ${signUpError.message}`);
  }

  const user = signUpData.user;
  if (!user) {
    throw new Error('User creation failed');
  }

  // Step 2: Insert profile
  const { error: insertError } = await supabase.from('profiles').insert([
    {
      id: user.id,
      full_name: fullName,
      username,
      role: 'patient',
    },
  ]);

  if (insertError) {
    throw new Error(`Profile insert failed: ${insertError.message}`);
  }

  return true;
}
