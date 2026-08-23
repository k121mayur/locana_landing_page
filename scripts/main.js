/**
 * LOCANA — Core UI & Interaction Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initScrollReveal();
  initCounterUp();
  initFaqAccordion();
  initPlatformWheel();
  initSmoothScroll();
});

/* ==========================================================================
   Navigation Bar Scroll & State Handler
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.header-nav');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   Mobile Menu Drawer Toggle
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    const isOpen = drawer.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen ? `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    ` : `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="4" y1="12" x2="20" y2="12"></line>
        <line x1="4" y1="6" x2="20" y2="6"></line>
        <line x1="4" y1="18" x2="20" y2="18"></line>
      </svg>
    `;
  });

  // Close drawer on link click
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

/* ==========================================================================
   Scroll Reveal with IntersectionObserver
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   Animated Numeric Counters
   ========================================================================== */
function initCounterUp() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1400;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOutProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(target * easeOutProgress);

          el.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
          }
        };

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => counterObserver.observe(c));
}

/* ==========================================================================
   FAQ Accordions
   ========================================================================== */
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all other items in this accordion
      const parentAccordion = item.closest('.faq-accordion');
      if (parentAccordion) {
        parentAccordion.querySelectorAll('.faq-item').forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
      }

      item.classList.toggle('active', !isActive);
    });
  });
}

/* ==========================================================================
   7-Part Interactive Platform Wheel
   Ground Truth • Elevate • Sage • Roots • Reach • Connect • Access
   ========================================================================== */
function initPlatformWheel() {
  const slices = document.querySelectorAll('.wheel-slice');
  const chips = document.querySelectorAll('.wheel-chip');
  const badgeTextEl = document.getElementById('pillar-badge-text');
  const badgeEl = document.getElementById('pillar-badge');
  const titleEl = document.getElementById('pillar-title');
  const descEl = document.getElementById('pillar-desc');
  const capabilitiesEl = document.getElementById('pillar-capabilities');

  if (!slices.length && !chips.length) return;

  const pillarsData = {
    'ground-truth': {
      title: 'Ground Truth',
      badge: 'Pillar 01 · Verification',
      badgeClass: 'badge-blue',
      strokeColor: '#2563EB',
      desc: 'Auditable, uncompromised primary data collection. Combining CAPI logic gates, sub-meter GPS polygon logging, recorded voice consent, and mandatory 10% independent back-checks.',
      capabilities: [
        'Zero-curbstoning guarantee with cryptographic timestamp hashes',
        'Real-time district quota tracking & velocity anomaly filters',
        'Donor-grade datasets ready for econometric STATA/R modeling'
      ]
    },
    'elevate': {
      title: 'Elevate',
      badge: 'Pillar 02 · Skilling & Capacity',
      badgeClass: 'badge-emerald',
      strokeColor: '#059669',
      desc: 'Continuous frontline capacity building and credentialing. Standardizing research ethics, digital literacy, and field protocol execution for thousands of rural enumerators.',
      capabilities: [
        'Structured certification modules across 6 professional tiers',
        '100% Fee-Back credentialing model on first paid assignment',
        'Vernacular interactive training in 20+ regional languages'
      ]
    },
    'sage': {
      title: 'Sage',
      badge: 'Pillar 03 · Intelligence & Advisory',
      badgeClass: 'badge-purple',
      strokeColor: '#7C3AED',
      desc: 'Domain-specific evaluation design, econometric modeling, and AI advisory. Bridging multilateral donor mandates with ground execution realities.',
      capabilities: [
        'Quasi-experimental impact evaluations & RCT protocol design',
        'PMFBY-aligned yield assessment algorithms & crop cutting science',
        'Multi-modal vernacular AI training datasets & acoustic phonetics'
      ]
    },
    'roots': {
      title: 'Roots',
      badge: 'Pillar 04 · Community Fluency',
      badgeClass: 'badge-amber',
      strokeColor: '#D97706',
      desc: 'Deep community embeddedness and cultural fluency. Local researchers living in the target blocks ensure authentic access, elder consent, and zero resistance.',
      capabilities: [
        'Dialect-matched interviewer pairing across 150+ dialects',
        'Gender-matched fieldwork for sensitive health & SHG programs',
        'Panchayat & local leadership liaison for uninterrupted access'
      ]
    },
    'reach': {
      title: 'Reach',
      badge: 'Pillar 05 · Pan-India Logistics',
      badgeClass: 'badge-blue',
      strokeColor: '#0284C7',
      desc: 'Pan-India physical mobility and rapid field mobilization across 225+ districts, tribal forest belts, and digital dark zones within 48 hours.',
      capabilities: [
        'Turnkey 48-hour mobilization across 25 states & union territories',
        'Offline-first mobile CAPI tools with asynchronous sync',
        'Distributed micro-hub logistics for physical sample collection'
      ]
    },
    'connect': {
      title: 'Connect',
      badge: 'Pillar 06 · Network Orchestration',
      badgeClass: 'badge-amber',
      strokeColor: '#EA580C',
      desc: 'Two-sided network coordination linking institutional mandates (Govt, CSR, AI labs, Corporates) directly to verified local grassroots capacity.',
      capabilities: [
        'Automated algorithmic matching by geography, dialect, and tier',
        'Unified client portal with live quota completion telemetry',
        'Transparent direct payouts to local field professionals'
      ]
    },
    'access': {
      title: 'Access',
      badge: 'Pillar 07 · Digital & Financial Inclusion',
      badgeClass: 'badge-purple',
      strokeColor: '#4F46E5',
      desc: 'Unlocking Digital Public Infrastructure (DPI), essential public services, formal financial credit, and government entitlements for last-mile citizens.',
      capabilities: [
        'DPI enablement & assisted onboarding for rural households',
        'FPO/SHG financial grading unlocking formal banking credit',
        'Direct citizen feedback loops for evidence-based policy corrections'
      ]
    }
  };

  function selectPillar(key) {
    const data = pillarsData[key];
    if (!data) return;

    // Update active states on slices
    slices.forEach(slice => {
      if (slice.getAttribute('data-pillar') === key) {
        slice.classList.add('active');
      } else {
        slice.classList.remove('active');
      }
    });

    // Update active states on chips
    chips.forEach(chip => {
      if (chip.getAttribute('data-pillar') === key) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    // Update Details pane with smooth fade
    const detailsCard = document.getElementById('wheel-details-content');
    if (detailsCard) {
      detailsCard.style.opacity = '0.7';
      detailsCard.style.transform = 'translateY(4px)';

      setTimeout(() => {
        if (badgeTextEl) badgeTextEl.textContent = data.badge;
        if (badgeEl) {
          badgeEl.className = `wheel-details-badge badge ${data.badgeClass}`;
        }
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;

        if (capabilitiesEl) {
          capabilitiesEl.innerHTML = data.capabilities.map(cap => `
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${data.strokeColor}" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${cap}</span>
            </li>
          `).join('');
        }

        detailsCard.style.opacity = '1';
        detailsCard.style.transform = 'translateY(0)';
      }, 150);
    }
  }

  // Click listeners for SVG slices
  slices.forEach(slice => {
    slice.addEventListener('click', () => {
      const key = slice.getAttribute('data-pillar');
      selectPillar(key);
    });
  });

  // Click listeners for Chips
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-pillar');
      selectPillar(key);
    });
  });
}

/* ==========================================================================
   Smooth Anchor Scrolling
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
