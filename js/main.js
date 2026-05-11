
// NAVBAR SCROLL
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// SET DATE DEFAULT
document.getElementById('depdate').valueAsDate = new Date(Date.now() + 86400000);

// BOOKING TABS
function setTab(el, type) {
  document.querySelectorAll('.booking-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// PRICE CALCULATION
const priceData = {
  lagi: { hcm: {p4:1200000, p7:1600000, km:'190 km', time:'~3h00'}, tsn: {p4:1350000, p7:1750000, km:'200 km', time:'~3h30'}, dalat: {p4:980000, p7:1280000, km:'110 km', time:'~2h00'}, vungtau: {p4:850000, p7:1150000, km:'140 km', time:'~2h30'}, phantiet: {p4:350000, p7:480000, km:'35 km', time:'~45 phút'} },
  phantiet: { hcm: {p4:1100000, p7:1500000, km:'185 km', time:'~2h45'}, tsn: {p4:1300000, p7:1650000, km:'195 km', time:'~3h15'}, dalat: {p4:900000, p7:1200000, km:'90 km', time:'~1h45'} },
  vungtau: { hcm: {p4:650000, p7:900000, km:'110 km', time:'~2h00'}, tsn: {p4:750000, p7:1000000, km:'120 km', time:'~2h15'} },
};
const nameMap = {lagi:'LaGi', phantiet:'Phan Thiết', vungtau:'Vũng Tàu', hcm:'Hồ Chí Minh', tsn:'Sân bay TSN', dalat:'Đà Lạt'};

function calcPrice() {
  const from = document.getElementById('pickup').value;
  const to = document.getElementById('dest').value;
  const type = document.getElementById('cartype').value;
  const preview = document.getElementById('pricePreview');
  if (!from || !to) { preview.classList.remove('visible'); return; }
  const routes = priceData[from];
  if (!routes || !routes[to]) { preview.classList.remove('visible'); return; }
  const d = routes[to];
  const price = type === '4' ? d.p4 : d.p7;
  document.getElementById('previewRoute').textContent = `${nameMap[from]} → ${nameMap[to]}`;
  document.getElementById('previewPrice').textContent = price.toLocaleString('vi-VN') + 'đ';
  document.getElementById('previewDist').textContent = d.km;
  document.getElementById('previewTime').textContent = d.time;
  preview.classList.add('visible');
}

function handleBooking() {
  const from = document.getElementById('pickup').value;
  const to = document.getElementById('dest').value;
  const cartype = document.getElementById('cartype').value;
  const depdate = document.getElementById('depdate').value;

  // Check if route not found
  if (!from || !to) {
    // Open quote modal if both empty or no match
    document.getElementById('quoteModal').classList.add('open');
    return;
  }

  const routes = priceData[from];
  if (!routes || !routes[to]) {
    // Route exists in selects but no price data
    document.getElementById('quoteModal').classList.add('open');
    if (from && nameMap[from]) document.getElementById('quoteFrom').value = nameMap[from];
    if (to && nameMap[to]) document.getElementById('quoteTo').value = nameMap[to];
    return;
  }

  // Show customer info modal
  const d = routes[to];
  const price = cartype === '4' ? d.p4 : d.p7;
  const dateStr = depdate ? new Date(depdate).toLocaleDateString('vi-VN') : '';
  document.getElementById('bookingModalSummary').textContent =
    nameMap[from] + ' → ' + nameMap[to] + '  |  ' + price.toLocaleString('vi-VN') + 'đ  |  Xe ' + cartype + ' chỗ' + (dateStr ? '  |  ' + dateStr : '');
  document.getElementById('customerBookingModal').classList.add('open');
}

function submitBooking() {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  if (!name) { alert('Vui lòng nhập họ và tên'); return; }
  if (!phone || phone.length < 9) { alert('Vui lòng nhập số điện thoại hợp lệ'); return; }
  const note = document.getElementById('custNote').value.trim();
  document.getElementById('customerBookingModal').classList.remove('open');
  document.getElementById('successMsg').innerHTML =
    'Xin chào <strong>' + name + '</strong>!<br>Chúng tôi đã nhận yêu cầu của bạn.';
  document.getElementById('successModal').classList.add('open');
  // Reset form
  document.getElementById('custName').value = '';
  document.getElementById('custPhone').value = '';
  document.getElementById('custNote').value = '';
}

function submitQuote() {
  const phone = document.getElementById('quotePhone').value.trim();
  if (!phone || phone.length < 9) { alert('Vui lòng nhập số điện thoại để chúng tôi liên hệ'); return; }
  const name = document.getElementById('quoteName').value.trim();
  document.getElementById('quoteModal').classList.remove('open');
  document.getElementById('successMsg').innerHTML =
    (name ? 'Xin chào <strong>' + name + '</strong>!<br>' : '') +
    'Chúng tôi sẽ gọi báo giá cho bạn trong <strong style="color:var(--green)">15 phút</strong>.';
  document.getElementById('successModal').classList.add('open');
}

// SMOOTH SCROLL
function scrollTo(id) {
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

// ADMIN
function openAdminLogin() {
  document.getElementById('bookingModal').classList.add('open');
}

function loginAdmin() {
  const u = document.getElementById('adminUser').value;
  const p = document.getElementById('adminPass').value;
  if (u === 'admin' && p === 'lagigo2024') {
    document.getElementById('bookingModal').classList.remove('open');
    document.getElementById('admin-dashboard').classList.add('open');
  } else {
    alert('Tên đăng nhập hoặc mật khẩu không đúng.\n(Gợi ý: admin / lagigo2024)');
  }
}

function closeAdmin() {
  document.getElementById('admin-dashboard').classList.remove('open');
}

// ADMIN NAV ACTIVE
document.querySelectorAll('.admin-nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// FADE IN ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.route-card, .vehicle-card, .why-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// --- Scroll Reveal ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- Animated Counter ---
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const isDecimal = target % 1 !== 0;
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = isDecimal
      ? (eased * target).toFixed(1)
      : Math.round(eased * target).toLocaleString('vi-VN');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const val = parseFloat(el.dataset.count);
      if (val) animateCounter(el, val);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

const fabObserver = new IntersectionObserver(entries => {
  const fab = document.querySelector('.fab-book');
  if (fab) fab.style.display = entries[0].isIntersecting ? 'none' : 'flex';
});
const heroForm = document.querySelector('.booking-form');
if (heroForm) fabObserver.observe(heroForm);

function handleBooking() {
  const pickup = document.getElementById('pickup')?.value?.trim();
  const dropoff = document.getElementById('dropoff')?.value?.trim();
  const date = document.getElementById('date')?.value || '';
  const time = document.getElementById('time')?.value || '';
  const cartype = document.getElementById('cartype')?.value || '';

  if (!pickup || !dropoff) {
    alert('Vui lòng nhập điểm đón và điểm đến!');
    return;
  }

  const phone = '0123456789';
  const msg = `Tôi muốn đặt xe:\n📍 Đón: ${pickup}\n🏁 Đến: ${dropoff}\n📅 Ngày: ${date} lúc ${time}\n🚗 Loại xe: ${cartype}`;
  window.open(`https://zalo.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

