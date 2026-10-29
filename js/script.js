/**
 * IRONCORE FITNESS — JAVASCRIPT INTERACTIONS
 * Pure Vanilla JavaScript (ES6+) | Zero External Dependencies
 */

"use strict";

/* ==========================================================================
   1. EDITABLE BUSINESS CONFIGURATION
   ==========================================================================
   Gym owners or developers can easily replace these placeholder details.
   ========================================================================== */
const IRONCORE_CONFIG = {
  gymName: "IRONCORE FITNESS",
  // Replace with the client's actual WhatsApp phone number with country code (no '+' or spaces)
  whatsappNumber: "919876543210", 
  whatsappPrefillMessage: "Hi IRONCORE Fitness! I'm interested in joining and would like to book a free trial session.",
  contactPhone: "+91 98765 43210",
  contactEmail: "enquiry@ironcorefitness.demo",
  address: "Plot 42, Sector 18, Commercial Hub, New Delhi, India",
  hours: {
    weekdays: "5:30 AM – 10:30 PM",
    sunday: "7:00 AM – 8:00 PM"
  }
};

/* ==========================================================================
   2. DOM READY INITIALIZATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initMobileMenu();
  initSmoothScroll();
  initScrollspy();
  initPlanSelection();
  initTestimonialSlider();
  initContactForm();
  initWhatsAppLinks();
  initDateConstraints();
  initScrollReveal();
});

/* ==========================================================================
   3. STICKY NAVBAR ON SCROLL
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // run once on load
}

/* ==========================================================================
   4. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  const backdrop = document.querySelector(".mobile-backdrop");
  const closeBtn = document.querySelector("#mobile-drawer-close");
  const navLinks = document.querySelectorAll(".mobile-nav-link, .mobile-drawer .btn");

  if (!toggleBtn || !drawer || !backdrop) return;

  const openMenu = () => {
    toggleBtn.classList.add("open");
    drawer.classList.add("open");
    backdrop.classList.add("open");
    toggleBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    toggleBtn.classList.remove("open");
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  backdrop.addEventListener("click", closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   5. SMOOTH SCROLLING WITH NAVBAR OFFSET
   ========================================================================== */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#" || !targetId.startsWith("#")) return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const navbar = document.querySelector(".navbar");
      const navOffset = navbar ? navbar.offsetHeight : 70;
      const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navOffset;

      window.scrollTo({
        top: targetPos,
        behavior: "smooth"
      });
    });
  });
}

/* ==========================================================================
   6. SCROLLSPY (ACTIVE NAV STATE)
   ========================================================================== */
function initScrollspy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ==========================================================================
   7. MEMBERSHIP PLAN PRE-SELECTION
   ========================================================================== */
function initPlanSelection() {
  const planButtons = document.querySelectorAll(".btn-select-plan");
  const planDropdown = document.getElementById("membership-plan");
  const planBanner = document.getElementById("selected-plan-banner");
  const planNameSpan = document.getElementById("selected-plan-name");
  const clearPlanBtn = document.getElementById("btn-clear-plan");
  const freeTrialBtn = document.getElementById("btn-free-trial");

  const selectPlan = (planValue, planDisplayName) => {
    if (planDropdown) {
      planDropdown.value = planValue;
    }

    if (planBanner && planNameSpan) {
      planNameSpan.textContent = planDisplayName || planValue.toUpperCase();
      planBanner.classList.add("visible");
    }

    // Scroll to contact form smoothly
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const navbar = document.querySelector(".navbar");
      const navOffset = navbar ? navbar.offsetHeight : 70;
      const targetPos = contactSection.getBoundingClientRect().top + window.scrollY - navOffset;

      window.scrollTo({
        top: targetPos,
        behavior: "smooth"
      });
    }

    // Briefly highlight the dropdown field
    if (planDropdown) {
      planDropdown.focus();
      planDropdown.style.boxShadow = "0 0 0 3px rgba(198, 255, 0, 0.4)";
      setTimeout(() => {
        planDropdown.style.boxShadow = "";
      }, 1500);
    }
  };

  planButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const plan = btn.getAttribute("data-plan") || "pro";
      const planNames = {
        basic: "Basic (₹799/mo)",
        pro: "Pro — Recommended (₹1,499/mo)",
        elite: "Elite VIP (₹2,499/mo)"
      };
      selectPlan(plan, planNames[plan] || plan.toUpperCase());
    });
  });

  if (freeTrialBtn) {
    freeTrialBtn.addEventListener("click", (e) => {
      e.preventDefault();
      selectPlan("trial", "Complimentary 1-Day Trial Pass");
    });
  }

  if (clearPlanBtn) {
    clearPlanBtn.addEventListener("click", () => {
      if (planDropdown) planDropdown.value = "";
      if (planBanner) planBanner.classList.remove("visible");
    });
  }

  // Update banner if user manually changes dropdown
  if (planDropdown && planBanner && planNameSpan) {
    planDropdown.addEventListener("change", () => {
      const selectedOption = planDropdown.options[planDropdown.selectedIndex];
      if (planDropdown.value) {
        planNameSpan.textContent = selectedOption.text;
        planBanner.classList.add("visible");
      } else {
        planBanner.classList.remove("visible");
      }
    });
  }
}

/* ==========================================================================
   8. TESTIMONIAL SLIDER (VANILLA JAVASCRIPT)
   ========================================================================== */
function initTestimonialSlider() {
  const track = document.querySelector(".testimonial-track");
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.querySelector(".slider-btn-prev");
  const nextBtn = document.querySelector(".slider-btn-next");
  const dotsContainer = document.querySelector(".slider-dots");

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayInterval = null;

  // Create dot indicators dynamically if not already in markup
  if (dotsContainer && dotsContainer.children.length === 0) {
    slides.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.classList.add("slider-dot");
      dot.setAttribute("type", "button");
      dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
      if (idx === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  const updateDots = () => {
    const dots = document.querySelectorAll(".slider-dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });
  };

  const goToSlide = (index) => {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Autoplay function
  const startAutoplay = () => {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, 6000);
  };

  const stopAutoplay = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  };

  // Pause on hover
  const sliderWrapper = document.querySelector(".slider-wrapper");
  if (sliderWrapper) {
    sliderWrapper.addEventListener("mouseenter", stopAutoplay);
    sliderWrapper.addEventListener("mouseleave", startAutoplay);
  }

  // Touch Swipe Gesture Support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  const handleSwipe = () => {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  };

  // Keyboard navigation
  sliderWrapper?.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  startAutoplay();
}

/* ==========================================================================
   9. CONTACT / ENQUIRY FORM VALIDATION & CLIENT-SIDE HANDLING
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("enquiry-form");
  const formCard = document.querySelector(".enquiry-form-card");
  const successCard = document.getElementById("form-success-card");
  const resetBtn = document.getElementById("btn-reset-form");

  if (!form) return;

  const fields = {
    name: {
      el: document.getElementById("full-name"),
      group: document.getElementById("group-full-name"),
      errorEl: document.getElementById("error-full-name"),
      validate: (val) => {
        if (!val.trim()) return "Full name is required.";
        if (val.trim().length < 2) return "Please enter at least 2 characters.";
        return "";
      }
    },
    phone: {
      el: document.getElementById("phone-number"),
      group: document.getElementById("group-phone-number"),
      errorEl: document.getElementById("error-phone-number"),
      validate: (val) => {
        const cleaned = val.replace(/[\s\-\(\)]/g, "");
        if (!cleaned) return "Mobile phone number is required.";
        // Indian mobile number validation (10 digits starting with 6,7,8,9, or prefixed by +91 / 0)
        const indiaPhoneRegex = /^(?:(?:\+|0{0,2})91)?[6-9]\d{9}$/;
        if (!indiaPhoneRegex.test(cleaned)) {
          return "Please enter a valid 10-digit Indian phone number (e.g. 98765 43210).";
        }
        return "";
      }
    },
    email: {
      el: document.getElementById("email-address"),
      group: document.getElementById("group-email-address"),
      errorEl: document.getElementById("error-email-address"),
      validate: (val) => {
        if (!val.trim()) return ""; // Optional field
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) {
          return "Please enter a valid email address.";
        }
        return "";
      }
    },
    plan: {
      el: document.getElementById("membership-plan"),
      group: document.getElementById("group-membership-plan"),
      errorEl: document.getElementById("error-membership-plan"),
      validate: (val) => {
        if (!val) return "Please select a membership plan or trial pass.";
        return "";
      }
    },
    date: {
      el: document.getElementById("visit-date"),
      group: document.getElementById("group-visit-date"),
      errorEl: document.getElementById("error-visit-date"),
      validate: (val) => {
        if (!val) return "Please choose your preferred visit date.";
        const selectedDate = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          return "Visit date cannot be in the past.";
        }
        return "";
      }
    }
  };

  const validateField = (fieldKey) => {
    const field = fields[fieldKey];
    if (!field || !field.el) return true;

    const errorMsg = field.validate(field.el.value);
    if (errorMsg) {
      field.group.classList.add("has-error");
      if (field.errorEl) field.errorEl.textContent = errorMsg;
      return false;
    } else {
      field.group.classList.remove("has-error");
      if (field.errorEl) field.errorEl.textContent = "";
      return true;
    }
  };

  // Add blur listeners for instant inline feedback
  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    if (field.el) {
      field.el.addEventListener("blur", () => validateField(key));
      field.el.addEventListener("input", () => {
        if (field.group.classList.contains("has-error")) {
          validateField(key);
        }
      });
    }
  });

  // Handle Form Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    let firstInvalidField = null;

    Object.keys(fields).forEach((key) => {
      const valid = validateField(key);
      if (!valid) {
        isValid = false;
        if (!firstInvalidField) {
          firstInvalidField = fields[key].el;
        }
      }
    });

    if (!isValid) {
      if (firstInvalidField) firstInvalidField.focus();
      return;
    }

    // Populate Success Card Summary
    const submittedData = {
      name: fields.name.el.value.trim(),
      phone: fields.phone.el.value.trim(),
      plan: fields.plan.el.options[fields.plan.el.selectedIndex].text,
      date: fields.date.el.value,
      refId: "IC-" + Math.floor(100000 + Math.random() * 900000)
    };

    const sumName = document.getElementById("sum-name");
    const sumPhone = document.getElementById("sum-phone");
    const sumPlan = document.getElementById("sum-plan");
    const sumDate = document.getElementById("sum-date");
    const sumRef = document.getElementById("sum-ref");

    if (sumName) sumName.textContent = submittedData.name;
    if (sumPhone) sumPhone.textContent = submittedData.phone;
    if (sumPlan) sumPlan.textContent = submittedData.plan;
    if (sumDate) sumDate.textContent = submittedData.date;
    if (sumRef) sumRef.textContent = submittedData.refId;

    // Transition from form to success view
    form.style.display = "none";
    const planBanner = document.getElementById("selected-plan-banner");
    if (planBanner) planBanner.style.display = "none";

    if (successCard) {
      successCard.classList.add("active");
    }

    // Scroll to success card smoothly
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Reset form handler
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      Object.keys(fields).forEach((key) => {
        fields[key].group.classList.remove("has-error");
        if (fields[key].errorEl) fields[key].errorEl.textContent = "";
      });

      const planBanner = document.getElementById("selected-plan-banner");
      if (planBanner) {
        planBanner.classList.remove("visible");
        planBanner.style.display = "";
      }

      if (successCard) successCard.classList.remove("active");
      form.style.display = "";
      initDateConstraints();
    });
  }
}

/* ==========================================================================
   10. WHATSAPP ENQUIRY BUTTON INTEGRATION
   ========================================================================== */
function initWhatsAppLinks() {
  const whatsappUrl = `https://wa.me/${IRONCORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(IRONCORE_CONFIG.whatsappPrefillMessage)}`;
  
  const floatingBtn = document.getElementById("floating-whatsapp");
  const inFormBtn = document.getElementById("contact-whatsapp-btn");

  if (floatingBtn) {
    floatingBtn.href = whatsappUrl;
  }
  if (inFormBtn) {
    inFormBtn.href = whatsappUrl;
  }
}

/* ==========================================================================
   11. DATE INPUT RESTRICTIONS
   ========================================================================== */
function initDateConstraints() {
  const dateInput = document.getElementById("visit-date");
  if (!dateInput) return;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const minDate = `${yyyy}-${mm}-${dd}`;
  dateInput.setAttribute("min", minDate);
}

/* ==========================================================================
   12. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!elements.length) return;

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  elements.forEach((el) => observer.observe(el));
}
