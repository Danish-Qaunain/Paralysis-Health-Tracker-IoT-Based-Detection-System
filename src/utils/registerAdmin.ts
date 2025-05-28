import { supabase } from '../lib/supabase';

const email = 'qaunain05@gmail.com';
const password = 'Mddanish@1108';
const fullName = 'Admin';
const username = 'qaunain05';

export async function registerAdmin() {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password
  });

  if (signUpError) {
    console.error('Sign up failed:', signUpError.message);
    return;
  }

  const user = signUpData.user;
  if (user) {
    const { error: insertError } = await supabase.from('profiles').insert([
      {
        id: user.id,
        full_name: fullName,
        username,
        role: 'admin'
      }
    ]);

    if (insertError) {
      console.error('Profile insert failed:', insertError.message);
    } else {
      console.log('Admin registered successfully!');
    }
  }
}
