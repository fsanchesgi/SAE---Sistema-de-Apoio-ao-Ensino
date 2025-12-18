// Conexão com Supabase
const supabaseUrl = 'https://vhwhjnghtmlrfieiwssi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZod2hqbmdodG1scmZpZWl3c3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTM4OTUsImV4cCI6MjA4MTU2OTg5NX0.XV6vxBeRtIcDNEGsJuDU_wPcnm2qmK8ZoHEuHQR2TMU';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.3 });

cards.forEach(card => observer.observe(card));

