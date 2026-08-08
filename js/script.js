document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("mainNavbar");
  const year = document.getElementById("year");

  // Current year
  year.textContent = new Date().getFullYear();

  // Navbar background on scroll
  const updateNavbar = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 35);
  };
  updateNavbar();
  window.addEventListener("scroll", updateNavbar);

  // Close mobile navbar after clicking a menu item
  document.querySelectorAll("#mainMenu .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("mainMenu");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Active navigation link based on section
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`.navbar-nav .nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    });
  }, { rootMargin: "-40% 0px -50% 0px" });

  sections.forEach(section => observer.observe(section));

  // Animated counters
  const counters = document.querySelectorAll(".counter");
  let counterStarted = false;

  const animateCounters = () => {
    if (counterStarted) return;
    const stats = document.querySelector(".stats-section");
    if (!stats) return;

    const rect = stats.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      counterStarted = true;

      counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        const duration = 1500;
        const start = performance.now();

        const update = now => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(target * eased).toLocaleString();
          if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
      });
    }
  };

  window.addEventListener("scroll", animateCounters);
  animateCounters();

  // Contact form
  const toastElement = document.getElementById("successToast");
  const toast = bootstrap.Toast.getOrCreateInstance(toastElement);

  document.getElementById("contactForm").addEventListener("submit", event => {
    event.preventDefault();
    event.target.reset();
    toast.show();
  });

  // Booking form
  document.getElementById("bookingForm").addEventListener("submit", event => {
    event.preventDefault();

    const modalElement = document.getElementById("bookingModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.hide();

    event.target.reset();
    setTimeout(() => toast.show(), 350);
  });

  // Pause hero autoplay while pointer is over carousel controls
  const carousel = document.getElementById("vehicleCarousel");
  carousel.addEventListener("mouseenter", () => {
    bootstrap.Carousel.getOrCreateInstance(carousel).pause();
  });

  carousel.addEventListener("mouseleave", () => {
    bootstrap.Carousel.getOrCreateInstance(carousel).cycle();
  });
});
