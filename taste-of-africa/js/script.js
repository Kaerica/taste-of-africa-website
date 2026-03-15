document.addEventListener('DOMContentLoaded', () => {

  /* NAV TOGGLE */
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  /* ACTIVE LINK */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* NEWSLETTER SUBSCRIBE (front-end only) */
  const emailRegex = /^[\\w.!#$%&'*+/=?`{|}~-]+@[\\w-]+(\\.[\\w-]+)+$/;
  const handleSubscribe = (input) => {
    const email = (input.value || '').trim();
    if (!email || !emailRegex.test(email)) {
      alert('Please enter a valid email to subscribe.');
      return;
    }
    alert('Thanks for subscribing! We will be in touch at ' + email);
    input.value = '';
  };
  document.querySelectorAll('.newsletter-inline').forEach(form => {
    const input = form.querySelector('input[type=\"email\"]');
    const btn   = form.querySelector('button');
    if (btn && input) {
      btn.addEventListener('click', (e) => { e.preventDefault(); handleSubscribe(input); });
    }
  });

  /* RECIPE FILTER */
  const rfbBtns = document.querySelectorAll('.rfb-btn');
  const rcards  = document.querySelectorAll('.rcard');
  if (rfbBtns.length) {
    rfbBtns.forEach(btn => btn.addEventListener('click', () => {
      rfbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      rcards.forEach(c => { c.style.display = (f === 'all' || c.dataset.region === f) ? '' : 'none'; });
    }));
  }

  /* FAVORITES */
  const getFavs = () => { try { return JSON.parse(localStorage.getItem('toa_favs') || '[]'); } catch { return []; } };
  const saveFavs = f => localStorage.setItem('toa_favs', JSON.stringify(f));

  document.querySelectorAll('.fav-btn').forEach(btn => {
    const id = btn.dataset.id; if (!id) return;
    const favs = getFavs();
    if (favs.includes(id)) { btn.classList.add('active'); btn.querySelector('.heart').textContent = '♥'; btn.querySelector('.fav-label').textContent = 'Saved'; }
    btn.addEventListener('click', () => {
      let f = getFavs();
      const isFav = f.includes(id);
      f = isFav ? f.filter(x => x !== id) : [...f, id];
      saveFavs(f);
      btn.classList.toggle('active', !isFav);
      btn.querySelector('.heart').textContent = !isFav ? '♥' : '♡';
      btn.querySelector('.fav-label').textContent = !isFav ? 'Saved' : 'Save to My Collection';
    });
  });

});
