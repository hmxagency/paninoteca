// GSAP Animasyonları (Yüklenince çalışan efektler)
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();

// Hero bölümündeki yazıların sırayla gelmesi
tl.to(".hero-subtitle", {
  y: 0,
  opacity: 1,
  duration: 1,
  ease: "power3.out",
})
  .to(
    ".hero-title",
    { scale: 1, opacity: 1, duration: 1.2, ease: "expo.out" },
    "-=0.5",
  )
  .to(".hero-desc", { opacity: 1, duration: 1 }, "-=0.8");

// Swiper Slider Ayarları (Kaydırma özelliği)
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.2, // Mobilde 1.2 kart görünsün
  spaceBetween: 20,
  centeredSlides: false,
  grabCursor: true,
  breakpoints: {
    640: { slidesPerView: 2.2 }, // Tablet
    1024: { slidesPerView: 3.5 }, // Masaüstü
  },
  navigation: {
    nextEl: ".swiper-next-btn",
    prevEl: ".swiper-prev-btn",
  },
});

// PROCESS SECTION TABS (Burger vs Tea Geçişi)
function switchProcess(category) {
  // HTML Elementlerini Seç
  const burgerContent = document.getElementById("burger-process");
  const teaContent = document.getElementById("tea-process");
  const titleHighlight = document.getElementById("process-title-highlight");

  // Butonları Seç (index sırasına göre: 0->Burger, 1->Tea)
  const buttons = document.querySelectorAll(".tab-btn");
  const burgerBtn = buttons[0];
  const teaBtn = buttons[1];

  if (category === "burger") {
    // İçeriği Değiştir
    burgerContent.style.display = "grid"; // Burger'i göster
    teaContent.style.display = "none"; // Çayı gizle

    // Buton Stillerini Değiştir
    burgerBtn.classList.add("active-burger");
    burgerBtn.classList.remove("active-tea"); // Güvenlik için
    teaBtn.classList.remove("active-tea");

    // İlk açılıştaki 'active' classını temizle
    burgerBtn.classList.remove("active");

    // Başlık Rengini Değiştir
    titleHighlight.style.color = "#ccff00"; // Yeşil
  } else if (category === "tea") {
    // İçeriği Değiştir
    burgerContent.style.display = "none"; // Burger'i gizle
    teaContent.style.display = "grid"; // Çayı göster

    // Buton Stillerini Değiştir
    teaBtn.classList.add("active-tea");
    burgerBtn.classList.remove("active-burger");
    burgerBtn.classList.remove("active"); // Varsayılan active'i sil

    // Başlık Rengini Değiştir
    titleHighlight.style.color = "#ff0055"; // Pembe
  }
}

// PARALLAX VIDEO MOVEMENT (GSAP ScrollTrigger)
// Biz sayfayı kaydırdıkça, video elementi bizimle beraber ama daha yavaş hareket edecek.
gsap.to(".parallax-video", {
  yPercent: 30, // Videoyu kendi yüksekliğinin %30'u kadar aşağı kaydır
  ease: "none", // Doğrusal hareket (takılmadan)
  scrollTrigger: {
    trigger: ".video-parallax-section", // Tetikleyici bölüm
    start: "top bottom", // Bölüm ekranın altına girdiğinde başla
    end: "bottom top", // Bölüm ekranın üstünden çıktığında bitir
    scrub: 1, // Kaydırma hızına bağla (1 sn gecikmeli yumuşak takip)
  },
});

// LOCATIONS (ŞUBE) DEĞİŞTİRME FONKSİYONU
function switchBranch(branchName) {
  // Tüm şube içeriklerini gizle
  const contents = document.querySelectorAll(".branch-content");
  contents.forEach((content) => {
    content.classList.remove("active-branch");
    content.classList.add("hidden-branch");
  });

  // Tüm butonların aktifliğini kaldır
  const buttons = document.querySelectorAll(".branch-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });

  // Seçilen şubeyi göster
  const selectedContent = document.getElementById("branch-" + branchName);
  selectedContent.classList.remove("hidden-branch");
  selectedContent.classList.add("active-branch");

  // Tıklanan butonu aktif yap
  // (event.target kullanmak yerine basit döngü ile bulabiliriz veya manuel index)
  // Basitlik için: HTML'deki onclick içine 'this' göndermedik, bu yüzden butonları manuel eşleştirelim.

  // Basit çözüm: Butonları sırayla kontrol et
  if (branchName === "millet") buttons[0].classList.add("active");
  if (branchName === "atis") buttons[1].classList.add("active");
  if (branchName === "kent") buttons[2].classList.add("active");
}

// GÜNCELLENMİŞ ŞUBE DEĞİŞTİRME FONKSİYONU (RENKLİ)
function switchBranch(branchName) {
  // 1. İçerikleri Yönet
  const contents = document.querySelectorAll(".branch-content");
  contents.forEach((content) => {
    content.classList.remove("active-branch");
    content.classList.add("hidden-branch");
  });

  const selectedContent = document.getElementById("branch-" + branchName);
  selectedContent.classList.remove("hidden-branch");
  selectedContent.classList.add("active-branch");

  // 2. Butonları ve Renkleri Yönet
  const buttons = document.querySelectorAll(".branch-btn");
  const titleHighlight = document.getElementById("branch-title-highlight");

  // Önce tüm butonlardan renk sınıflarını temizle
  buttons.forEach((btn) => {
    btn.classList.remove(
      "active",
      "active-millet",
      "active-atis",
      "active-kent",
    );
  });

  // 3. Seçilen Şubeye Göre Renk Ata
  if (branchName === "millet") {
    buttons[0].classList.add("active-millet"); // 1. Buton (Millet)
    titleHighlight.style.color = "#ccff00"; // Yeşil
  } else if (branchName === "atis") {
    buttons[1].classList.add("active-atis"); // 2. Buton (Atış)
    titleHighlight.style.color = "#8a2be2"; // Mor
  } else if (branchName === "kent") {
    buttons[2].classList.add("active-kent"); // 3. Buton (Kent)
    titleHighlight.style.color = "#ff0055"; // Pembe
  }
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Hamburger butona tıklandığında aç/kapat
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Linklere tıklandığında menüyü otomatik kapat
document.querySelectorAll(".nav-links a, .btn-order").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});
