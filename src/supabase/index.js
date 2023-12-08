import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ativdebfkwuwbivntqhp.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0aXZkZWJma3d1d2Jpdm50cWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NzMxMTEsImV4cCI6MjAxNzU0OTExMX0.L8EGRdRRh0_GdhTjO-6aiyKNobM4uidg0NwREsK8pik"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase