// theme management
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);

  const icon = document.getElementById("theme-icon");
  icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";

  // If you are not using the form web component you can comment this out
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.setAttribute("theme", newTheme);
  }

  localStorage.setItem("theme", newTheme);
}

function initializeTheme() {
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  document.documentElement.setAttribute("data-theme", savedTheme);

  const icon = document.getElementById("theme-icon");
  if (icon) {
    icon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }

  // If you are not using the form web component from DevManSam777 you can comment this out
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.setAttribute("theme", savedTheme);
  }
}

// smooth scrolling
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        closeMobileMenu();
      }
    });
  });
}

// mobile menu functionality
function initializeMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  if (mobileMenuBtn && navLinks) {
    const overlay = document.createElement("div");
    overlay.className = "mobile-menu-overlay";
    body.appendChild(overlay);

    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    overlay.addEventListener("click", () => {
      closeMobileMenu();
    });

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    });
  }
}

function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

  if (navLinks && overlay && mobileMenuBtn) {
    const isOpen = navLinks.classList.contains("mobile-open");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
}

function openMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

  navLinks.classList.add("mobile-open");
  overlay.classList.add("active");
  mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

  if (navLinks && overlay && mobileMenuBtn) {
    navLinks.classList.remove("mobile-open");
    overlay.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = "";
  }
}



function initializeSystemThemeListener() {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  mediaQuery.addListener((e) => {
    if (!localStorage.getItem("theme")) {
      const newTheme = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);

      const icon = document.getElementById("theme-icon");
      if (icon) {
        icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
      }

      const contactForm = document.getElementById("contact-form");
      if (contactForm) {
        contactForm.setAttribute("theme", newTheme);
      }
    }
  });
}

function handleWindowResize() {
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}

// initialize everything
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  initializeSmoothScrolling();
  initializeFormEventHandlers();
  initializeMobileMenu();
  initializeHeaderScrollEffect();
  initializeScrollAnimations();
  initializeSystemThemeListener();
  handleWindowResize();

  // Optional: Initialize blog functionality
  // Uncomment the lines below if you want to use the blog feature:
  // initializeBlogCards();
  // fetchHashnodePosts();

  // set dynamic copyright year
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  console.log("Portfolio site initialized successfully!");
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Page is hidden
  } else {
    // Page is visible
  }
});
