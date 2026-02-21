import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase anon key
const SUPABASE_URL = 'https://glepubhuqkfhyhwinvfu.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

if (SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY_HERE') {
  console.warn('\n⚠️ WARNING: Please replace YOUR_SUPABASE_ANON_KEY_HERE with your actual Anon Key before running!\n');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testSupabase() {
  console.log('Testing Supabase Connection & Insert Operation...');

  try {
    const testData = {
      Name: "Test User",
      Email: "test@example.com",
      Message: "This is a test message from the troubleshooting script."
    };

    console.log('Attempting to insert:', testData);

    // Perform the insert operation and select the returned row
    const { data, error, status } = await supabase
      .from('users')
      .insert([testData])
      .select();

    if (error) {
      console.error('\n❌ Insert failed!');
      console.error('Status Code:', status);
      console.error('Error Details:', error);

      // Analyze common issues
      if (error.code === '42501') {
        console.error('\n🔍 Diagnosis: Row Level Security (RLS) is blocking the insert.');
        console.error('Since the dashboard bypasses RLS, manual inserts work, but app inserts (using the anon key) are denied.');
        console.error('Fix: Go to Supabase Dashboard -> Authentication -> Policies -> "users" table, and create a policy that allows "INSERT" for the "anon" role (or "public").');
      } else if (error.code === 'PGRST204') {
        console.error('\n🔍 Diagnosis: Column name mismatch.');
        console.error('Ensure the column names (Name, Email, Message) exactly match the case and spelling in Postgres.');
      }
    } else {
      console.log('\n✅ Insert successful!');
      console.log('Inserted Data:', data);
      console.log('\nIf this works but your app does not, the issue is likely in your app code (e.g., swallowed errors, missing await, or wrong form data structure).');
    }
  } catch (err) {
    console.error('\n❌ Unexpected Error connecting to Supabase:', err.message || err);
    console.error('Check your network connection and the Supabase URL.');
  }
}

testSupabase();
