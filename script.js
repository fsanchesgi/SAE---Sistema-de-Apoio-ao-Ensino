// Conexão com Supabase
const supabaseUrl = 'https://vhwhjnghtmlrfieiwssi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZod2hqbmdodG1scmZpZWl3c3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTM4OTUsImV4cCI6MjA4MTU2OTg5NX0.XV6vxBeRtIcDNEGsJuDU_wPcnm2qmK8ZoHEuHQR2TMU';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const imagens = document.querySelectorAll('.hero-carousel img');
let index = 0;

setInterval(() => {
  imagens[index].classList.remove('active');
  index = (index + 1) % imagens.length;
  imagens[index].classList.add('active');
}, 4000);

// animação ao rolar
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
});

document.querySelectorAll('.section, .card').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = '0.6s';
  observer.observe(el);
});

