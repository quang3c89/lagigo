# 🛠️ LaGiGo — Hướng dẫn Fix từng bước cho Cursor

> Website: https://lagigo.vercel.app  
> Repo: https://github.com/quang3c89/lagigo  
> Tình trạng hiện tại: 1 file `index.html` đơn, 1.24MB, ảnh base64 inline  

---

## 📋 TỔNG QUAN CÁC BƯỚC

| Bước | Nhiệm vụ | Ưu tiên | Thời gian ước tính |
|------|----------|---------|-------------------|
| 1 | Tái cấu trúc project (tách file) | 🔴 P0 | 30 phút |
| 2 | Tối ưu ảnh & performance | 🔴 P0 | 1 giờ |
| 3 | Cải thiện Hero section + Booking Form | 🔴 P0 | 2 giờ |
| 4 | Sticky Header + Mobile FAB | 🟠 P1 | 1 giờ |
| 5 | Social Proof & Trust Signals | 🟠 P1 | 1 giờ |
| 6 | Typography & Spacing & Visual Hierarchy | 🟠 P1 | 1.5 giờ |
| 7 | Micro-animations & UX Polish | 🟡 P2 | 1 giờ |
| 8 | SEO & Meta Tags | 🟡 P2 | 30 phút |
| 9 | Responsive & Mobile Fixes | 🟡 P2 | 1 giờ |
| 10 | Accessibility & Performance Final | 🟢 P3 | 1 giờ |

---

## 🔴 BƯỚC 1 — Tái cấu trúc project

### Mục tiêu
Tách file `index.html` 1.24MB thành cấu trúc project chuẩn.

### Cấu trúc thư mục mục tiêu
```
lagigo/
├── index.html          ← HTML thuần, không có inline CSS/JS/base64
├── css/
│   ├── style.css       ← Toàn bộ CSS
│   └── animations.css  ← CSS animations riêng
├── js/
│   └── main.js         ← Toàn bộ JavaScript
├── images/
│   ├── logo.webp
│   ├── hero-bg.webp
│   ├── car-1.webp
│   └── ...             ← Tất cả ảnh đã convert sang WebP
└── favicon.ico
```

### Prompt cho Cursor
```
Tách file index.html hiện tại thành cấu trúc project riêng biệt:
1. Tạo thư mục css/ và tách toàn bộ nội dung trong thẻ <style> ra file css/style.css
2. Tạo thư mục js/ và tách toàn bộ nội dung trong thẻ <script> ra file js/main.js
3. Trong index.html, thay <style>...</style> bằng <link rel="stylesheet" href="css/style.css">
4. Trong index.html, thay <script>...</script> bằng <script src="js/main.js" defer></script>
5. Giữ nguyên toàn bộ nội dung, chỉ tách ra thôi, không thay đổi logic
```

---

## 🔴 BƯỚC 2 — Tối ưu ảnh & Performance

### Mục tiêu
- Loại bỏ tất cả ảnh base64 khỏi HTML
- Convert ảnh sang WebP
- Thêm lazy loading
- Thêm resource hints

### Prompt cho Cursor
```
Tối ưu performance cho LaGiGo:

1. Tìm tất cả thẻ <img> hoặc background-image có giá trị "data:image/..." (base64):
   - Decode base64 thành file ảnh thực
   - Lưu vào thư mục images/ với tên có nghĩa (hero-bg.jpg, car-sedan.jpg, ...)
   - Thay src="data:image/..." bằng src="images/ten-anh.webp"

2. Thêm loading="lazy" cho TẤT CẢ thẻ <img> ngoại trừ ảnh đầu tiên trong viewport (hero image)

3. Thêm width và height attribute cho mọi thẻ <img> để tránh layout shift

4. Thêm vào <head> của index.html:
   <link rel="preload" as="image" href="images/hero-bg.webp">
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="dns-prefetch" href="https://fonts.gstatic.com">

5. Thêm attribute fetchpriority="high" cho ảnh hero (ảnh đầu tiên người dùng nhìn thấy)

Mục tiêu: HTML file chỉ còn < 30KB sau khi tách ảnh
```

---

## 🔴 BƯỚC 3 — Hero Section + Booking Form

### Mục tiêu
Đây là fix quan trọng nhất về conversion. Hero section phải có:
- Headline rõ ràng với value proposition
- Booking form ngay on-fold
- CTA nổi bật

### Thiết kế Hero mới
```
┌─────────────────────────────────────────────────┐
│  [LOGO]              [SĐT] [Đặt ngay]           │  ← Sticky header
├─────────────────────────────────────────────────┤
│                                                 │
│  Xe luôn sẵn — Giá tốt nhất La Gi              │  ← H1
│  Đặt xe nhanh trong 60 giây                     │  ← Subheadline
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │  📍 Điểm đón    →   📍 Điểm đến          │  │  ← Booking form
│  │  📅 Ngày         🕐 Giờ đón              │  │
│  │  👤 Loại xe      [  🚗 ĐẶT XE NGAY  ]   │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ⭐ 4.9/5  •  10,000+ chuyến  •  ✓ An toàn    │  ← Social proof mini
└─────────────────────────────────────────────────┘
```

### Prompt cho Cursor
```
Thay thế Hero section hiện tại trong index.html bằng đoạn HTML/CSS sau.
Đặt vào ngay sau thẻ <header> hoặc ở đầu <main>:

HTML (thêm vào body):
---
<section class="hero" id="hero">
  <div class="hero__overlay"></div>
  <div class="container">
    <div class="hero__content">
      <h1 class="hero__title">
        Xe luôn sẵn — Giá tốt nhất La Gi
      </h1>
      <p class="hero__sub">
        Đặt xe nhanh trong 60 giây · Tài xế kinh nghiệm · Giá cố định, không phát sinh
      </p>

      <!-- BOOKING FORM -->
      <div class="booking-form">
        <div class="booking-form__grid">
          <div class="booking-form__field">
            <label for="pickup">📍 Điểm đón</label>
            <input type="text" id="pickup" placeholder="Nhập địa chỉ đón...">
          </div>
          <div class="booking-form__field">
            <label for="dropoff">🏁 Điểm đến</label>
            <input type="text" id="dropoff" placeholder="Nhập địa chỉ đến...">
          </div>
          <div class="booking-form__field">
            <label for="date">📅 Ngày</label>
            <input type="date" id="date">
          </div>
          <div class="booking-form__field">
            <label for="time">🕐 Giờ đón</label>
            <input type="time" id="time">
          </div>
          <div class="booking-form__field">
            <label for="cartype">🚗 Loại xe</label>
            <select id="cartype">
              <option value="">Chọn loại xe</option>
              <option value="4cho">Xe 4 chỗ</option>
              <option value="7cho">Xe 7 chỗ</option>
              <option value="16cho">Xe 16 chỗ</option>
              <option value="29cho">Xe 29 chỗ</option>
              <option value="45cho">Xe 45 chỗ</option>
            </select>
          </div>
          <button class="btn-book" onclick="handleBooking()">
            🚗 Đặt xe ngay
          </button>
        </div>
      </div>

      <!-- MINI SOCIAL PROOF -->
      <div class="hero__trust">
        <span>⭐ 4.9/5 đánh giá</span>
        <span>•</span>
        <span>10,000+ chuyến thành công</span>
        <span>•</span>
        <span>✓ Bảo hiểm toàn hành trình</span>
      </div>
    </div>
  </div>
</section>
---

CSS (thêm vào css/style.css):
---
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: url('images/hero-bg.webp') center/cover no-repeat;
  padding: 120px 0 80px;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.hero__content {
  max-width: 780px;
}

.hero__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 16px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.hero__sub {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255,255,255,0.9);
  margin-bottom: 32px;
  line-height: 1.6;
}

.booking-form {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  margin-bottom: 24px;
}

.booking-form__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.booking-form__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.booking-form__field label {
  font-size: 13px;
  font-weight: 600;
  color: #444;
}

.booking-form__field input,
.booking-form__field select {
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: #222;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.booking-form__field input:focus,
.booking-form__field select:focus {
  outline: none;
  border-color: #2e7d32;
}

.btn-book {
  grid-column: span 2;
  background: #e65c00;
  background: linear-gradient(135deg, #e65c00, #f9a825);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px 24px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  letter-spacing: 0.5px;
}

.btn-book:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(230, 92, 0, 0.45);
}

.btn-book:active {
  transform: translateY(0);
}

.hero__trust {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  color: rgba(255,255,255,0.9);
  font-size: 14px;
  align-items: center;
}

@media (max-width: 640px) {
  .booking-form__grid {
    grid-template-columns: 1fr;
  }
  .btn-book {
    grid-column: span 1;
  }
}
---

JS (thêm vào js/main.js):
---
function handleBooking() {
  const pickup = document.getElementById('pickup').value;
  const dropoff = document.getElementById('dropoff').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const cartype = document.getElementById('cartype').value;

  if (!pickup || !dropoff) {
    alert('Vui lòng nhập điểm đón và điểm đến!');
    return;
  }

  // Thay số điện thoại thực của LaGiGo vào đây
  const phone = '0123456789';
  const msg = `Tôi muốn đặt xe:\n📍 Đón: ${pickup}\n🏁 Đến: ${dropoff}\n📅 Ngày: ${date} lúc ${time}\n🚗 Loại xe: ${cartype}`;
  window.open(`https://zalo.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}
---
```

---

## 🟠 BƯỚC 4 — Sticky Header + Mobile FAB

### Mục tiêu
- Header cố định khi scroll
- Floating Action Button trên mobile

### Prompt cho Cursor
```
1. Tìm thẻ <header> trong index.html và thêm class "sticky-header" vào

2. Thêm CSS sau vào css/style.css:

.sticky-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 20px rgba(0,0,0,0.08);
  transition: background 0.3s, box-shadow 0.3s;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sticky-header .header-phone {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2e7d32;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
}

.sticky-header .header-cta {
  background: #e65c00;
  color: #fff;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.2s;
}

.sticky-header .header-cta:hover {
  background: #bf360c;
}

/* Floating Action Button - chỉ hiện trên mobile */
.fab-book {
  display: none;
  position: fixed;
  bottom: 24px;
  right: 20px;
  z-index: 999;
  background: linear-gradient(135deg, #e65c00, #f9a825);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 6px 24px rgba(230, 92, 0, 0.5);
  cursor: pointer;
  text-decoration: none;
  align-items: center;
  gap: 8px;
  animation: fab-pulse 2s infinite;
}

@keyframes fab-pulse {
  0%, 100% { box-shadow: 0 6px 24px rgba(230, 92, 0, 0.5); }
  50% { box-shadow: 0 6px 40px rgba(230, 92, 0, 0.75); }
}

@media (max-width: 768px) {
  .fab-book {
    display: flex;
  }
}

3. Thêm vào trong <header>:
   <a href="tel:0123456789" class="header-phone">📞 0123 456 789</a>
   <a href="#hero" class="header-cta">Đặt xe ngay</a>

4. Thêm vào trước thẻ </body>:
   <a href="#hero" class="fab-book">🚗 Đặt xe ngay</a>

5. Thêm JS vào main.js để ẩn FAB khi người dùng đang nhìn thấy booking form:
   const observer = new IntersectionObserver(entries => {
     const fab = document.querySelector('.fab-book');
     if (fab) fab.style.display = entries[0].isIntersecting ? 'none' : 'flex';
   });
   const heroForm = document.querySelector('.booking-form');
   if (heroForm) observer.observe(heroForm);
```

---

## 🟠 BƯỚC 5 — Social Proof & Trust Signals

### Mục tiêu
Thêm các yếu tố tạo lòng tin: review, số liệu, chứng nhận.

### Prompt cho Cursor
```
Thêm 2 section mới vào index.html, đặt ngay sau hero section:

SECTION 1 — Stats Bar (dải số liệu nhanh):
---
<section class="stats-bar">
  <div class="container">
    <div class="stats-bar__grid">
      <div class="stat-item">
        <span class="stat-num">10,000+</span>
        <span class="stat-label">Chuyến thành công</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">4.9⭐</span>
        <span class="stat-label">Đánh giá trung bình</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">5 năm</span>
        <span class="stat-label">Kinh nghiệm hoạt động</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">100%</span>
        <span class="stat-label">Có bảo hiểm hành khách</span>
      </div>
    </div>
  </div>
</section>
---

CSS cho stats-bar:
.stats-bar {
  background: #1b5e20;
  padding: 32px 0;
}
.stats-bar__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  text-align: center;
}
.stat-item { color: #fff; }
.stat-num {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.2;
}
.stat-label {
  font-size: 13px;
  opacity: 0.85;
  margin-top: 4px;
  display: block;
}
@media (max-width: 640px) {
  .stats-bar__grid { grid-template-columns: repeat(2, 1fr); }
}

---

SECTION 2 — Reviews (Đánh giá khách hàng):
---
<section class="reviews" id="danh-gia">
  <div class="container">
    <h2 class="section-title">Khách hàng nói gì về LaGiGo?</h2>
    <div class="reviews__grid">
      <div class="review-card">
        <div class="review-stars">⭐⭐⭐⭐⭐</div>
        <p class="review-text">"Đặt xe nhanh, tài xế đúng giờ, xe sạch sẽ. Sẽ dùng lại lần sau!"</p>
        <div class="review-author">
          <div class="review-avatar">HT</div>
          <div>
            <strong>Hoàng Thị T.</strong>
            <span>Khách từ Phan Thiết</span>
          </div>
        </div>
      </div>
      <div class="review-card">
        <div class="review-stars">⭐⭐⭐⭐⭐</div>
        <p class="review-text">"Giá cả hợp lý, không lo bị chặt chém. Xe 7 chỗ rộng rãi, đi cả gia đình rất tiện."</p>
        <div class="review-author">
          <div class="review-avatar">NV</div>
          <div>
            <strong>Nguyễn Văn M.</strong>
            <span>Khách từ TP. HCM</span>
          </div>
        </div>
      </div>
      <div class="review-card">
        <div class="review-stars">⭐⭐⭐⭐⭐</div>
        <p class="review-text">"Tôi thường xuyên di chuyển La Gi - Bình Thuận. LaGiGo luôn đúng hẹn, rất tin tưởng."</p>
        <div class="review-author">
          <div class="review-avatar">LP</div>
          <div>
            <strong>Lê Phương A.</strong>
            <span>Khách thân thiết</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
---

CSS cho reviews:
.reviews {
  padding: 80px 0;
  background: #f9fafb;
}
.section-title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 48px;
  color: #1a1a1a;
}
.reviews__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.review-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  border: 1px solid #f0f0f0;
}
.review-stars { font-size: 18px; margin-bottom: 12px; }
.review-text {
  color: #444;
  line-height: 1.7;
  font-size: 15px;
  margin-bottom: 16px;
  font-style: italic;
}
.review-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.review-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #c8e6c9;
  color: #1b5e20;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.review-author strong {
  display: block;
  font-size: 14px;
  color: #222;
}
.review-author span {
  font-size: 12px;
  color: #888;
}
@media (max-width: 768px) {
  .reviews__grid { grid-template-columns: 1fr; }
}
```

---

## 🟠 BƯỚC 6 — Typography & Visual Hierarchy

### Mục tiêu
Áp dụng type scale nhất quán, tăng whitespace, cải thiện contrast.

### Prompt cho Cursor
```
Thêm CSS reset và type scale vào đầu file css/style.css:

/* === RESET & BASE === */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: 'Be Vietnam Pro', 'Segoe UI', system-ui, -apple-system, sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: #1a1a1a;
  background: #fff;
  -webkit-font-smoothing: antialiased;
}

/* === TYPE SCALE (8-point grid) === */
h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; line-height: 1.15; }
h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 700; line-height: 1.3; }
h3 { font-size: clamp(1.125rem, 2vw, 1.5rem); font-weight: 600; line-height: 1.4; }
h4 { font-size: 1.125rem; font-weight: 600; }
p  { font-size: 1rem; line-height: 1.7; color: #444; }

/* === SPACING SCALE === */
section { padding: 80px 0; }
.section-title { margin-bottom: 48px; }

/* === COLOR PALETTE === */
:root {
  --green-primary: #2e7d32;
  --green-dark: #1b5e20;
  --green-light: #c8e6c9;
  --orange-primary: #e65c00;
  --orange-light: #fff3e0;
  --text-primary: #1a1a1a;
  --text-secondary: #555;
  --text-muted: #888;
  --bg-light: #f9fafb;
  --border: #e8e8e8;
  --white: #ffffff;
}

/* === LINK & BUTTON BASE === */
a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; }

/* Thêm Google Font vào <head> của index.html: */
/* <link rel="preconnect" href="https://fonts.googleapis.com"> */
/* <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet"> */

Sau đó duyệt toàn bộ CSS trong style.css và:
1. Thay mọi font-size cứng (vd: font-size: 12px trên p) bằng giá trị tương đương dùng rem
2. Thay mọi padding section < 60px thành padding: 80px 0
3. Tăng line-height của p tag lên 1.7 nếu chưa đủ
4. Đảm bảo text màu xám trên nền trắng có contrast ratio ≥ 4.5:1 (không dùng màu nhạt hơn #767676 trên nền trắng)
```

---

## 🟡 BƯỚC 7 — Micro-animations & UX Polish

### Mục tiêu
Thêm scroll-reveal, hover effects, loading states để trang sống động hơn.

### Prompt cho Cursor
```
Thêm vào file css/animations.css:

/* === SCROLL REVEAL === */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }

/* === CARD HOVER === */
.review-card,
.feature-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.review-card:hover,
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
}

/* === COUNTER ANIMATION === */
.stat-num {
  display: inline-block;
}

/* === RESPECTS REDUCED MOTION === */
@media (prefers-reduced-motion: reduce) {
  .reveal, .review-card, .feature-card {
    transition: none;
    opacity: 1;
    transform: none;
  }
}

Thêm vào js/main.js:

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

Sau đó thêm class "reveal" vào các card, section title, và data-count vào stat numbers:
- .review-card → thêm class="review-card reveal"
- .stat-num → thêm data-count="10000" (hoặc số tương ứng)
- Thêm <link rel="stylesheet" href="css/animations.css"> vào <head>
```

---

## 🟡 BƯỚC 8 — SEO & Meta Tags

### Prompt cho Cursor
```
Thay thế toàn bộ nội dung trong thẻ <head> của index.html bằng đoạn sau
(giữ nguyên các <link> CSS và <script> đã có, chỉ thêm meta tags mới):

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#2e7d32">

<!-- SEO Core -->
<title>LaGiGo – Đặt xe La Gi uy tín, giá tốt | Xe 4-45 chỗ</title>
<meta name="description" content="Đặt xe La Gi (Bình Thuận) nhanh chóng, an toàn. Xe 4, 7, 16, 29, 45 chỗ. Tài xế kinh nghiệm, giá cố định, có bảo hiểm. Gọi ngay hoặc đặt online!">
<meta name="keywords" content="đặt xe La Gi, xe La Gi, thuê xe Bình Thuận, xe du lịch La Gi, LaGiGo">
<link rel="canonical" href="https://lagigo.vercel.app/">

<!-- Open Graph (Facebook, Zalo share) -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://lagigo.vercel.app/">
<meta property="og:title" content="LaGiGo – Đặt xe La Gi uy tín, giá tốt">
<meta property="og:description" content="Đặt xe La Gi nhanh chóng, an toàn. Xe 4-45 chỗ. Tài xế kinh nghiệm, giá cố định, có bảo hiểm.">
<meta property="og:image" content="https://lagigo.vercel.app/images/og-image.webp">
<meta property="og:locale" content="vi_VN">
<meta property="og:site_name" content="LaGiGo">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="LaGiGo – Đặt xe La Gi uy tín, giá tốt">
<meta name="twitter:description" content="Đặt xe La Gi nhanh chóng, an toàn. Xe 4-45 chỗ.">
<meta name="twitter:image" content="https://lagigo.vercel.app/images/og-image.webp">

<!-- Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "LaGiGo",
  "description": "Dịch vụ đặt xe La Gi, Bình Thuận uy tín, giá tốt",
  "url": "https://lagigo.vercel.app",
  "telephone": "+84-123-456-789",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "La Gi",
    "addressRegion": "Bình Thuận",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "10.6667",
    "longitude": "107.7667"
  },
  "openingHours": "Mo-Su 00:00-24:00",
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "10000"
  }
}
</script>

<!-- Performance Hints -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="image" href="images/hero-bg.webp" fetchpriority="high">

<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="apple-touch-icon" href="images/apple-touch-icon.png">
```

---

## 🟡 BƯỚC 9 — Responsive & Mobile Fixes

### Prompt cho Cursor
```
Kiểm tra và fix responsive cho toàn bộ website. Thêm vào cuối css/style.css:

/* === RESPONSIVE BREAKPOINTS === */

/* Tablet: 768px */
@media (max-width: 768px) {
  section { padding: 60px 0; }
  .container { padding: 0 16px; }

  /* Navigation */
  .nav-links {
    display: none;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    z-index: 999;
  }
  .nav-links.open { display: flex; }

  /* Grid adjustments */
  .stats-bar__grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .reviews__grid { grid-template-columns: 1fr; }
}

/* Mobile: 480px */
@media (max-width: 480px) {
  h1 { font-size: 1.875rem; }
  h2 { font-size: 1.5rem; }
  section { padding: 48px 0; }

  .booking-form { padding: 16px; }
  .booking-form__grid { grid-template-columns: 1fr; gap: 10px; }
  .btn-book { font-size: 16px; padding: 12px 20px; }

  .stats-bar__grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .stat-num { font-size: 1.5rem; }
}

/* Touch targets - đảm bảo min 44px */
a, button, input, select, textarea {
  min-height: 44px;
}

/* Fix input zoom on iOS */
@media (max-width: 768px) {
  input[type="text"],
  input[type="date"],
  input[type="time"],
  select {
    font-size: 16px !important; /* Ngăn iOS tự zoom khi focus */
  }
}

Sau đó kiểm tra bằng cách mở DevTools → Toggle Device Toolbar, test trên:
- iPhone SE: 375px
- iPhone 14: 390px
- iPad: 768px
- Desktop: 1280px
Báo cáo bất kỳ element nào bị tràn hoặc không hiển thị đúng.
```

---

## 🟢 BƯỚC 10 — Accessibility & Performance Final Check

### Prompt cho Cursor
```
Chạy checklist cuối cùng:

1. ACCESSIBILITY - Kiểm tra và fix:
   a. Mọi thẻ <img> phải có alt="" (hoặc alt mô tả nội dung)
   b. Mọi button phải có text hoặc aria-label
   c. Form inputs phải có <label> liên kết đúng (for="id")
   d. Thêm aria-label cho navigation: <nav aria-label="Menu chính">
   e. Thêm role="main" vào thẻ <main>
   f. Kiểm tra tab order hợp lý (có thể navigate bằng bàn phím)
   g. Focus visible style: thêm CSS outline cho :focus-visible

2. PERFORMANCE - Thêm vào index.html:
   a. Thêm rel="preload" cho font chính
   b. Thêm <link rel="manifest" href="manifest.json"> cho PWA cơ bản
   c. Minify css/style.css và js/main.js (dùng lệnh: npx csso css/style.css -o css/style.min.css)
   d. Đổi sang dùng file .min trong production

3. ANALYTICS - Thêm vào trước </body>:
   <!-- Google Analytics 4 -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX'); // Thay bằng GA4 ID thực
   </script>

4. Tạo file vercel.json để tối ưu cache headers:
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/css/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=86400, stale-while-revalidate=604800" }
      ]
    }
  ]
}

5. Tạo robots.txt:
User-agent: *
Allow: /
Sitemap: https://lagigo.vercel.app/sitemap.xml

6. Tạo sitemap.xml cơ bản:
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lagigo.vercel.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 🔧 FAQ — Các lỗi thường gặp khi fix

| Lỗi | Nguyên nhân | Cách fix |
|-----|------------|----------|
| CSS không load | Đường dẫn href sai | Dùng đường dẫn tương đối: `href="css/style.css"` |
| Ảnh không hiện | Base64 chưa decode đúng | Dùng `atob()` hoặc tool online decode base64 to file |
| Font bị zoom trên iOS | Font-size < 16px trong input | Đặt font-size: 16px cho input trên mobile |
| FAB che nội dung | z-index conflict | Đặt z-index FAB = 999, header = 1000 |
| Scroll reveal không chạy | IntersectionObserver chưa support | Thêm polyfill hoặc check `if ('IntersectionObserver' in window)` |
| Booking form gửi nhưng không làm gì | Thiếu action URL | Kết nối Zalo/form backend theo hướng dẫn Bước 3 |

---

## ✅ Checklist hoàn thành

- [ ] Bước 1: File đã tách thành html / css / js / images
- [ ] Bước 2: Ảnh base64 đã thay bằng file WebP, có lazy loading
- [ ] Bước 3: Hero section có booking form hoạt động được
- [ ] Bước 4: Sticky header và FAB mobile hiển thị đúng
- [ ] Bước 5: Stats bar và review section đã thêm
- [ ] Bước 6: Type scale và spacing nhất quán toàn site
- [ ] Bước 7: Scroll reveal và hover animation chạy mượt
- [ ] Bước 8: Meta tags, OG, Schema.org đã thêm đầy đủ
- [ ] Bước 9: Responsive đúng trên mobile 375px, tablet 768px
- [ ] Bước 10: Alt text, aria-label, GA4, vercel.json đã xong

---

*Tài liệu này được tạo bởi Claude cho dự án LaGiGo — lagigo.vercel.app*
