
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://mhaabkcfmowwwmzhadoz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oYWFia2NmbW93d3dtemhhZG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MDkwNzQsImV4cCI6MjAzNjE4NTA3NH0.CLWfvfjsaTT4bG6n5pLkYwCg3Qdw3dtvHbZ0pNUnVEU')