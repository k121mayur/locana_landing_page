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
  initFilamentFlowerNode();
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
   7-Part Interactive 3D Orbit Carousel Platform
   Ground Truth • Elevate • Sage • Roots • Reach • Connect • Access
   ========================================================================== */
function initPlatformWheel() {
  const container = document.getElementById('orbit-platform-container');
  const spinner = document.getElementById('orbit-spinner');
  const cameraEl = document.getElementById('orbit-camera');
  const tiltEl = document.getElementById('orbit-tilt');
  const chips = document.querySelectorAll('.wheel-chip');
  const badgeTextEl = document.getElementById('pillar-badge-text');
  const badgeEl = document.getElementById('pillar-badge');
  const titleEl = document.getElementById('pillar-title');
  const descEl = document.getElementById('pillar-desc');
  const capabilitiesEl = document.getElementById('pillar-capabilities');

  if (!container || !spinner) return;

  const pillars = [
    {
      key: 'ground-truth',
      num: '01',
      badge: 'Pillar 01 · Verification Workflow',
      badgeClass: 'badge-blue',
      strokeColor: '#2563EB',
      title: 'HOW GROUND TRUTHING WORKS?',
      cardTitle: 'HOW GROUND TRUTHING WORKS?',
      category: 'Verification',
      tag: '6-Step Field Protocol',
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>',
      desc: 'A seamless 6-step verification lifecycle transforming complex institutional requirements into auditable primary ground intelligence.',
      steps: [
        { num: '01', name: 'Post', desc: 'Institution submits target geography, sample quotas, protocol guidelines & timelines.' },
        { num: '02', name: 'Match', desc: 'Locana engine matches requirement to certified local node leads & dialect-fluent teams.' },
        { num: '03', name: 'Assign', desc: 'Standardized CAPI digital forms, geofenced clusters & protocol briefings deployed.' },
        { num: '04', name: 'Execute', desc: 'Local researchers conduct field tasks with 100% FPIC consent & live GPS telemetry logging.' },
        { num: '05', name: 'Verify', desc: 'Automated logic checks, cryptographic timestamp hashes & mandatory 10% supervisor back-checks.' },
        { num: '06', name: 'Pay', desc: 'Instant, transparent payouts directly to certified local field professionals upon QC clearance.' }
      ],
      capabilities: [
        'Zero-curbstoning guarantee with cryptographic timestamp hashes',
        'Real-time district quota tracking & velocity anomaly filters',
        'Donor-grade datasets ready for econometric STATA/R modeling'
      ]
    },
    {
      key: 'elevate',
      num: '02',
      badge: 'Pillar 02 · Skilling & Capacity',
      badgeClass: 'badge-emerald',
      strokeColor: '#059669',
      title: 'Elevate',
      category: 'Skilling',
      tag: '6-Tier Credentialing',
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.2"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>',
      desc: 'Continuous frontline capacity building and credentialing. Standardizing research ethics, digital literacy, and field protocol execution for thousands of rural enumerators.',
      capabilities: [
        'Structured certification modules across 6 professional tiers',
        '100% Fee-Back credentialing model on first paid assignment',
        'Vernacular interactive training in 20+ regional languages'
      ]
    },
    {
      key: 'sage',
      num: '03',
      badge: 'Pillar 03 · Intelligence & Advisory',
      badgeClass: 'badge-purple',
      strokeColor: '#7C3AED',
      title: 'Sage',
      category: 'AI Advisory',
      tag: 'Econometrics & RCT',
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2.2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>',
      desc: 'Domain-specific evaluation design, econometric modeling, and AI advisory. Bridging multilateral donor mandates with ground execution realities.',
      capabilities: [
        'Quasi-experimental impact evaluations & RCT protocol design',
        'PMFBY-aligned yield assessment algorithms & crop cutting science',
        'Multi-modal vernacular AI training datasets & acoustic phonetics'
      ]
    },
    {
      key: 'roots',
      num: '04',
      badge: 'Pillar 04 · Community Fluency',
      badgeClass: 'badge-amber',
      strokeColor: '#D97706',
      title: 'Roots',
      category: 'Community',
      tag: '150+ Dialects & Trust',
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
      desc: 'Deep community embeddedness and cultural fluency. Local researchers living in the target blocks ensure authentic access, elder consent, and zero resistance.',
      capabilities: [
        'Dialect-matched interviewer pairing across 150+ dialects',
        'Gender-matched fieldwork for sensitive health & SHG programs',
        'Panchayat & local leadership liaison for uninterrupted access'
      ]
    },
    {
      key: 'reach',
      num: '05',
      badge: 'Pillar 05 · Pan-India Logistics',
      badgeClass: 'badge-blue',
      strokeColor: '#0284C7',
      title: 'Reach',
      category: 'Logistics',
      tag: '225+ Districts Pan-India',
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>',
      desc: 'Pan-India physical mobility and rapid field mobilization across 225+ districts, tribal forest belts, and digital dark zones within 48 hours.',
      capabilities: [
        'Turnkey 48-hour mobilization across 25 states & union territories',
        'Offline-first mobile CAPI tools with asynchronous sync',
        'Distributed micro-hub logistics for physical sample collection'
      ]
    },
    {
      key: 'connect',
      num: '06',
      badge: 'Pillar 06 · Network Orchestration',
      badgeClass: 'badge-amber',
      strokeColor: '#EA580C',
      title: 'Connect',
      category: 'Network',
      tag: 'Two-Sided Matching Rails',
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2.2"><rect x="2" y="2" width="8" height="8" rx="2"></rect><rect x="14" y="2" width="8" height="8" rx="2"></rect><rect x="8" y="14" width="8" height="8" rx="2"></rect><path d="M6 10v2a2 2 0 0 0 2 2h4"></path><path d="M18 10v2a2 2 0 0 1-2 2h-4"></path></svg>',
      desc: 'Two-sided network coordination linking institutional mandates (Govt, CSR, AI labs, Corporates) directly to verified local grassroots capacity.',
      capabilities: [
        'Automated algorithmic matching by geography, dialect, and tier',
        'Unified client portal with live quota completion telemetry',
        'Transparent direct payouts to local field professionals'
      ]
    },
    {
      key: 'access',
      num: '07',
      badge: 'Pillar 07 · Digital & Financial Inclusion',
      badgeClass: 'badge-purple',
      strokeColor: '#4F46E5',
      title: 'Access',
      category: 'Inclusion',
      tag: 'DPI & Credit Unlocking',
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2.2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',
      desc: 'Unlocking Digital Public Infrastructure (DPI), essential public services, formal financial credit, and government entitlements for last-mile citizens.',
      capabilities: [
        'DPI enablement & assisted onboarding for rural households',
        'FPO/SHG financial grading unlocking formal banking credit',
        'Direct citizen feedback loops for evidence-based policy corrections'
      ]
    }
  ];

  const pillarMap = {};
  pillars.forEach((p, idx) => {
    p.slotAngle = (idx * 360) / pillars.length;
    pillarMap[p.key] = p;
  });

  // Geometry Constants
  const isMobile = window.innerWidth <= 640;
  const RADIUS = isMobile ? 215 : 275;
  const CARD_W = isMobile ? 135 : 155;
  const CARD_H = isMobile ? 195 : 220;
  const CURVE_SEGMENTS = 4;
  const SLICE_BLEED = 1;
  const CARD_ARC = (CARD_W / RADIUS) * (180 / Math.PI);
  const sliceStep = CARD_W / CURVE_SEGMENTS;
  const sliceW = sliceStep + 2 * SLICE_BLEED;

  // 3D Motion Constants
  const TILT_X = 4;
  const TILT_Z = -12;
  const BACK_DIM = 0.58;
  const DRAG_SPEED = 0.18;
  const DRAG_VEL_SMOOTH = 0.2;
  const GLIDE_FALL = 0.52;
  const GLIDE_SETTLE = 0.35;
  const FLICK_MAX = 650;
  const AUTO_SPEED = 3.2;
  const ROCK_TILT = 2.2;
  const ROCK_SHIFT = 8;
  const ROCK_SMOOTH = 2.5;

  let activePillarKey = 'ground-truth';
  const cardNodes = [];
  const sliceNodes = [];

  // Build 3D Curved Cards DOM
  spinner.innerHTML = '';
  pillars.forEach((pillar, slotIndex) => {
    const cardEl = document.createElement('div');
    cardEl.className = `orbit-card ${pillar.key === activePillarKey ? 'active' : ''}`;
    cardEl.setAttribute('data-pillar', pillar.key);
    cardEl.style.setProperty('--active-color', pillar.strokeColor);
    cardEl.style.width = `${CARD_W}px`;
    cardEl.style.height = `${CARD_H}px`;
    cardEl.style.transform = `translate(-50%, -50%) rotateY(${pillar.slotAngle}deg)`;

    // Curvature vertical slices
    for (let j = 0; j < CURVE_SEGMENTS; j++) {
      const sliceAngle = ((j + 0.5) / CURVE_SEGMENTS - 0.5) * CARD_ARC;
      const sliceBox = document.createElement('div');
      sliceBox.className = 'orbit-card-slice';
      sliceBox.style.width = `${sliceW}px`;
      sliceBox.style.height = `${CARD_H}px`;
      sliceBox.style.transform = `translate(-50%, -50%) rotateY(${sliceAngle}deg) translateZ(${RADIUS}px)`;

      // Left and right border rounding for edges of curved card
      const isFirst = j === 0;
      const isLast = j === CURVE_SEGMENTS - 1;
      const rad = 18;
      sliceBox.style.borderTopLeftRadius = isFirst ? `${rad}px` : '0';
      sliceBox.style.borderBottomLeftRadius = isFirst ? `${rad}px` : '0';
      sliceBox.style.borderTopRightRadius = isLast ? `${rad}px` : '0';
      sliceBox.style.borderBottomRightRadius = isLast ? `${rad}px` : '0';

      const inner = document.createElement('div');
      inner.className = 'orbit-card-inner';
      inner.style.width = `${CARD_W}px`;
      inner.style.height = `${CARD_H}px`;
      inner.style.left = `${SLICE_BLEED - j * sliceStep}px`;

      inner.innerHTML = `
        <div class="orbit-card-accent" style="background: ${pillar.strokeColor};"></div>
        <div class="orbit-card-header">
          <span class="orbit-card-number">${pillar.num}</span>
          <span class="orbit-card-badge" style="background: ${pillar.strokeColor}18; color: ${pillar.strokeColor};">${pillar.category}</span>
        </div>
        <div class="orbit-card-icon-wrap" style="background: ${pillar.strokeColor}12;">
          ${pillar.iconSvg}
        </div>
        <div class="orbit-card-title" style="${pillar.key === 'ground-truth' ? 'font-size: 0.88rem; line-height: 1.25;' : ''}">${pillar.cardTitle || pillar.title}</div>
        <div class="orbit-card-tag">${pillar.tag}</div>
      `;

      sliceBox.appendChild(inner);
      cardEl.appendChild(sliceBox);
      sliceNodes.push({ slotIndex, inner });
    }

    cardEl.addEventListener('click', (e) => {
      e.stopPropagation();
      rotateToPillar(pillar.key);
    });

    spinner.appendChild(cardEl);
    cardNodes.push({ key: pillar.key, el: cardEl, slotAngle: pillar.slotAngle });
  });

  // State Management
  const state = {
    angle: 0,
    targetAngle: null,
    drift: 0,
    dragOffset: 0,
    glideVel: 0,
    pointerX: 0,
    pointerY: 0,
    rockTilt: 0,
    rockShift: 0,
    isDragging: false
  };

  // Sync Details Card
  function updateDetailsPane(key) {
    const data = pillarMap[key];
    if (!data) return;
    activePillarKey = key;

    // Update active class on card elements
    cardNodes.forEach(c => {
      if (c.key === key) c.el.classList.add('active');
      else c.el.classList.remove('active');
    });

    // Update active class on quick nav chips
    chips.forEach(chip => {
      if (chip.getAttribute('data-pillar') === key) chip.classList.add('active');
      else chip.classList.remove('active');
    });

    // Update details pane
    const detailsCard = document.getElementById('wheel-details-content');
    if (detailsCard) {
      detailsCard.style.opacity = '0.7';
      detailsCard.style.transform = 'translateY(4px)';

      setTimeout(() => {
        if (badgeTextEl) badgeTextEl.textContent = data.badge;
        if (badgeEl) badgeEl.className = `wheel-details-badge badge ${data.badgeClass}`;
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;

        if (capabilitiesEl) {
          if (data.steps && data.steps.length) {
            capabilitiesEl.className = 'gt-steps-grid';
            capabilitiesEl.innerHTML = data.steps.map(step => `
              <div class="gt-step-item">
                <div class="gt-step-header">
                  <span class="gt-step-num">STEP ${step.num}</span>
                  <span class="gt-step-name">${step.name}</span>
                </div>
                <p class="gt-step-desc">${step.desc}</p>
              </div>
            `).join('');
          } else {
            capabilitiesEl.className = 'wheel-capabilities-list';
            capabilitiesEl.innerHTML = data.capabilities.map(cap => `
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${data.strokeColor}" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>${cap}</span>
              </li>
            `).join('');
          }
        }

        detailsCard.style.opacity = '1';
        detailsCard.style.transform = 'translateY(0)';
      }, 140);
    }
  }

  // Smoothly Rotate To A Specific Pillar
  function rotateToPillar(key) {
    const p = pillarMap[key];
    if (!p) return;

    // We want (p.slotAngle + targetAngle) = 0 mod 360  =>  targetAngle = -p.slotAngle
    const desiredAngle = -p.slotAngle;
    const currentAngle = state.angle;

    // Find shortest angular path
    let diff = (desiredAngle - currentAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    state.targetAngle = currentAngle + diff;
    state.glideVel = 0;
    updateDetailsPane(key);
  }

  // Determine which card is currently closest to the front (0 deg)
  function detectFrontCard(currentAngle) {
    let closestKey = activePillarKey;
    let minDiff = Infinity;

    pillars.forEach(p => {
      let worldAngle = (p.slotAngle + currentAngle) % 360;
      if (worldAngle > 180) worldAngle -= 360;
      if (worldAngle < -180) worldAngle += 360;

      const diff = Math.abs(worldAngle);
      if (diff < minDiff) {
        minDiff = diff;
        closestKey = p.key;
      }
    });

    if (closestKey !== activePillarKey && minDiff < 32) {
      updateDetailsPane(closestKey);
    }
  }

  // Cosine Shading for Real Depth
  function applyDepthShading(currentAngle) {
    sliceNodes.forEach(item => {
      const p = pillars[item.slotIndex];
      const worldDeg = (p.slotAngle + currentAngle) % 360;
      const rad = (worldDeg * Math.PI) / 180;
      // Cosine brightness formula: front (cos = 1) -> 1.0, back (cos = -1) -> 1 - BACK_DIM
      const b = (1 - BACK_DIM * Math.max(0, -Math.cos(rad))).toFixed(3);
      item.inner.style.filter = `brightness(${b})`;
    });
  }

  // Animation Frame Loop
  let rafId = null;
  let lastTime = 0;
  let inView = false;

  function tick(now) {
    if (!lastTime) lastTime = now;
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;

    if (!state.isDragging) {
      if (state.targetAngle !== null) {
        // Spring smoothly to target
        const diff = state.targetAngle - state.angle;
        state.angle += diff * Math.min(1, 8.5 * dt);
        if (Math.abs(diff) < 0.1) {
          state.angle = state.targetAngle;
          state.targetAngle = null;
        }
      } else {
        // Ambient idle drift
        state.drift += AUTO_SPEED * dt;

        // Inertial flick glide
        if (Math.abs(state.glideVel) > GLIDE_SETTLE) {
          state.glideVel *= Math.exp(-GLIDE_FALL * dt);
          state.dragOffset += state.glideVel * dt;
        } else {
          state.glideVel = 0;
        }

        const target = state.drift + state.dragOffset;
        state.angle += (target - state.angle) * (1 - Math.exp(-7 * dt));
      }
    }

    // Render spinner rotation
    spinner.style.transform = `rotateY(${state.angle}deg)`;
    applyDepthShading(state.angle);

    if (state.isDragging || Math.abs(state.glideVel) > 0) {
      detectFrontCard(state.angle);
    }

    // Boat rocking parallax following pointer
    const k = 1 - Math.exp(-ROCK_SMOOTH * dt);
    state.rockTilt += (state.pointerY * ROCK_TILT - state.rockTilt) * k;
    state.rockShift += (-state.pointerX * ROCK_SHIFT - state.rockShift) * k;

    if (tiltEl) {
      tiltEl.style.transform = `rotateZ(${TILT_Z}deg) rotateX(${TILT_X + state.rockTilt}deg)`;
    }
    if (cameraEl) {
      cameraEl.style.transform = `translate(${state.rockShift}px, 0px)`;
    }

    rafId = requestAnimationFrame(tick);
  }

  // Intersection Observer for performance
  const io = new IntersectionObserver((entries) => {
    inView = entries.some(e => e.isIntersecting);
    if (inView && rafId === null) {
      lastTime = 0;
      rafId = requestAnimationFrame(tick);
    } else if (!inView && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }, { threshold: 0.1 });
  io.observe(container);

  // Pointer Drag & Momentum Tracking
  let dragId = null;
  let lastX = 0;
  let lastDragTime = 0;
  let dragVel = 0;

  function onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (dragId !== null) return;
    dragId = e.pointerId;
    state.isDragging = true;
    state.targetAngle = null;
    state.glideVel = 0;
    lastX = e.clientX;
    lastDragTime = performance.now();
    dragVel = 0;

    container.setPointerCapture?.(e.pointerId);
    container.style.cursor = 'grabbing';
  }

  function onPointerMove(e) {
    if (e.pointerId !== dragId) return;
    const now = performance.now();
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    const dtMs = Math.max(1, now - lastDragTime);
    lastDragTime = now;

    // Exponential moving average for flick velocity
    dragVel = dragVel * (1 - DRAG_VEL_SMOOTH) + (dx / dtMs) * 1000 * DRAG_VEL_SMOOTH;

    state.dragOffset += dx * DRAG_SPEED;
    state.angle += dx * DRAG_SPEED;
  }

  function onPointerUp(e) {
    if (e.pointerId !== dragId) return;
    dragId = null;
    state.isDragging = false;
    container.style.cursor = 'grab';

    // Impart flick velocity onto glide
    state.glideVel = Math.max(-FLICK_MAX, Math.min(FLICK_MAX, dragVel * DRAG_SPEED));
    dragVel = 0;

    // Detect front card after drag release
    detectFrontCard(state.angle);
  }

  container.addEventListener('pointerdown', onPointerDown);
  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerup', onPointerUp);
  container.addEventListener('pointercancel', onPointerUp);

  // Desktop Pointer Parallax Tracking
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (!w || !h) return;
    state.pointerX = (e.clientX / w) * 2 - 1;
    state.pointerY = (e.clientY / h) * 2 - 1;
  }, { passive: true });

  // Quick Nav Chips Listeners
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-pillar');
      rotateToPillar(key);
    });
  });

  // Initial Sync
  updateDetailsPane('ground-truth');
  applyDepthShading(0);
}

/* ==========================================================================
   Smooth Anchor Scrolling
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

/* ==========================================================================
   8. Locana Local Node — FilamentFlower Canvas & Orbital Cards System
   Based on Framer Filamentflower (AHkv5e)
   ========================================================================== */
function initFilamentFlowerNode() {
  const wrap = document.getElementById('filament-flower-wrap');
  const canvas = document.getElementById('filament-flower-canvas');
  const trackEl = document.getElementById('filament-orbit-track');
  const orbitItems = document.querySelectorAll('.node-orbit-item');
  const quickPills = document.querySelectorAll('.node-quick-pill');

  if (!wrap || !canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Filament flower configuration matching Framer component specs, optimized for clean light background
  const cfg = {
    lineColor: '#2563EB',
    labelColor: '#1D4ED8',
    nodes: 130,
    petals: 5,
    curve: 0.9,
    drift: 0.4,
    spin: 0.014,
    lineOpacity: 0.26,
    ringDots: true,
    waveSpeed: 2.2,
    waveDensity: 3,
    hoverPush: 90,
    hoverRadius: 280,
    buildTime: 1.8,
    showLabels: true,
    labels: [
      'PEOPLE · 225+ DISTRICTS',
      'SKILLS · FPIC & ETHICS',
      'TECHNOLOGY · GPS HASH',
      'ASSETS · MICRO-HUBS',
      'TRUST · PANCHAYAT ALIGNED',
      'AUTONOMOUS UNIT',
      'CAPI VALIDATION',
      '48-HR SLA'
    ],
    labelSize: 10,
    trailingDots: false
  };

  const LABEL_STACK = 'ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace';

  let W = 0, H = 0, cx = 0, cy = 0, R = 0, DPR = 1;
  let nodeList = [];
  let rot = 0, curveT = 0, energy = 0, lastT = 0;
  let active = [], lastSpawn = 0;
  const mouse = { x: -9999, y: -9999, on: false };
  const SAMPLES = 24;
  let raf = 0;
  let isVisible = true;

  function buildNodes(n) {
    nodeList = [];
    for (let i = 0; i < n; i++) {
      nodeList.push({
        a0: (i / n) * Math.PI * 2,
        jitter: (Math.random() - 0.5) * 0.18,
        bright: 0.6 + Math.random() * 0.4
      });
    }
  }

  function positionNodesOnOrbit() {
    if (!orbitItems.length) return;
    orbitItems.forEach((item) => {
      const angleDeg = parseFloat(item.getAttribute('data-angle')) || 0;
      const rad = (angleDeg * Math.PI) / 180;
      const nx = cx + Math.cos(rad) * R;
      const ny = cy + Math.sin(rad) * R;
      item.style.left = `${nx}px`;
      item.style.top = `${ny}px`;
    });
  }

  function measure() {
    const r = wrap.getBoundingClientRect();
    W = Math.max(1, r.width);
    H = Math.max(1, r.height);
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    cx = W * 0.5;
    cy = H * 0.5;
    // Radius of circular outline - leaves ample margin for outward-pointing small cards
    R = Math.min(W, H) * 0.34;

    if (trackEl) {
      trackEl.style.width = `${R * 2}px`;
      trackEl.style.height = `${R * 2}px`;
    }

    positionNodesOnOrbit();
  }

  function render(t, animate) {
    const dt = lastT ? Math.min(t - lastT, 50) : 16;
    lastT = t;

    if (nodeList.length !== (cfg.nodes | 0)) {
      buildNodes(cfg.nodes | 0);
    }

    if (animate) {
      rot += cfg.spin * 0.016;
      curveT += (dt / 1000) * cfg.drift;
      energy += (mouse.on ? 1 : -1) * (dt / 1000) / (mouse.on ? cfg.buildTime : 0.9);
      energy = Math.max(0, Math.min(1, energy));
    }

    const ws = (t / 1000) * cfg.waveSpeed;
    const dotR = Math.max(1.2, R * 0.006);

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = 1.15;
    ctx.lineCap = 'round';
    ctx.strokeStyle = cfg.lineColor;

    for (const nd of nodeList) {
      const a = nd.a0 + rot;
      const ex = cx + Math.cos(a) * R;
      const ey = cy + Math.sin(a) * R;
      const tang = cfg.curve * Math.sin(cfg.petals * nd.a0 + curveT) + nd.jitter;
      const ca = a + tang;
      const cr = R * 0.5;
      const ctrlx = cx + Math.cos(ca) * cr;
      const ctrly = cy + Math.sin(ca) * cr;

      const bx = [], by = [];
      for (let s = 0; s <= SAMPLES; s++) {
        const u = s / SAMPLES, iu = 1 - u;
        bx[s] = iu * iu * cx + 2 * iu * u * ctrlx + u * u * ex;
        by[s] = iu * iu * cy + 2 * iu * u * ctrly + u * u * ey;
      }

      let amp = 0, sign = 1;
      const nx = -Math.sin(a), ny = Math.cos(a);

      if (energy > 0.001) {
        let md = 1e9;
        for (let s = 0; s <= SAMPLES; s += 3) {
          const dx = bx[s] - mouse.x, dy = by[s] - mouse.y;
          const d = dx * dx + dy * dy;
          if (d < md) md = d;
        }
        md = Math.sqrt(md);
        if (md < cfg.hoverRadius) {
          amp = 0.5 * (1 + Math.cos(Math.PI * (md / cfg.hoverRadius))) * cfg.hoverPush * energy;
          const mx = bx[SAMPLES >> 1] - mouse.x, my = by[SAMPLES >> 1] - mouse.y;
          sign = (mx * nx + my * ny >= 0) ? 1 : -1;
        }
      }

      for (let s = 0; s < SAMPLES; s++) {
        const u0 = s / SAMPLES, u1 = (s + 1) / SAMPLES;
        const k0 = amp ? sign * amp * Math.sin(Math.PI * u0) : 0;
        const k1 = amp ? sign * amp * Math.sin(Math.PI * u1) : 0;
        const x0 = bx[s] + nx * k0, y0 = by[s] + ny * k0;
        const x1 = bx[s + 1] + nx * k1, y1 = by[s + 1] + ny * k1;
        const um = (u0 + u1) / 2;
        const grad = 1 - 0.62 * um;
        const wave = 0.45 + 0.55 * Math.sin(um * cfg.waveDensity * Math.PI - ws + nd.jitter * 30);

        ctx.globalAlpha = cfg.lineOpacity * nd.bright * grad * Math.max(0, wave);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';

    // Ring Dots along circle outline
    if (cfg.ringDots) {
      ctx.fillStyle = cfg.lineColor;
      for (const nd of nodeList) {
        const a = nd.a0 + rot;
        ctx.globalAlpha = 0.55 + 0.45 * nd.bright;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * R, cy + Math.sin(a) * R, dotR, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // Process labels drifting around the perimeter
    if (cfg.showLabels && cfg.labels && cfg.labels.length) {
      active = active.filter(l => t - l.born < l.life);
      if (animate && t - lastSpawn > 800 && active.length < 4) {
        lastSpawn = t;
        let ang = null;
        for (let tries = 0; tries < 14; tries++) {
          const cand = Math.random() * Math.PI * 2;
          let ok = true;
          for (const l of active) {
            const d = Math.abs(((cand - l.ang + Math.PI) % (Math.PI * 2)) - Math.PI);
            if (d < 0.65) { ok = false; break; }
          }
          if (ok) { ang = cand; break; }
        }
        if (ang !== null) {
          active.push({
            text: cfg.labels[Math.random() * cfg.labels.length | 0],
            ang,
            born: t,
            life: 2000 + Math.random() * 1500
          });
        }
      }

      const px = Math.max(8, Math.min(cfg.labelSize || 10, R * 0.042));
      ctx.font = `${px.toFixed(0)}px ${LABEL_STACK}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = cfg.labelColor;

      for (const l of active) {
        const p = (t - l.born) / l.life;
        ctx.globalAlpha = animate ? 0.75 * Math.sin(p * Math.PI) : 0.6;
        const aa = l.ang + rot;
        const lr = R * 1.08;
        ctx.fillText((l.text || '') + (cfg.trailingDots ? '...' : ''), cx + Math.cos(aa) * lr, cy + Math.sin(aa) * lr);
      }
      ctx.globalAlpha = 1;
    }
  }

  // Animation Loop
  const loop = (t) => {
    if (isVisible) {
      render(t, true);
      raf = requestAnimationFrame(loop);
    }
  };

  const startLoop = () => {
    if (!raf) {
      lastT = 0;
      raf = requestAnimationFrame(loop);
    }
  };

  const stopLoop = () => {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  // Mouse / Pointer Interaction
  const handlePointerMove = (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
    mouse.on = true;
  };

  const handlePointerLeave = () => {
    mouse.on = false;
  };

  wrap.addEventListener('pointermove', handlePointerMove);
  wrap.addEventListener('pointerdown', handlePointerMove);
  wrap.addEventListener('pointerleave', handlePointerLeave);

  // Setup Observer & Resize
  measure();
  buildNodes(cfg.nodes);
  render(0, false);

  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => {
      measure();
    });
    ro.observe(wrap);
  } else {
    window.addEventListener('resize', measure);
  }

  if (window.IntersectionObserver) {
    const io = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible) startLoop();
      else stopLoop();
    }, { threshold: 0.1 });
    io.observe(wrap);
  } else {
    startLoop();
  }

  // Orbital Cards & Hover / Click Interactions
  function setActiveNode(index) {
    orbitItems.forEach((item, i) => {
      const btn = item.querySelector('.node-anchor-btn');
      if (i === index) {
        item.classList.add('active');
        if (btn) btn.setAttribute('aria-expanded', 'true');
        // Point canvas mouse physics toward this node
        const angleDeg = parseFloat(item.getAttribute('data-angle')) || 0;
        const rad = (angleDeg * Math.PI) / 180;
        mouse.x = cx + Math.cos(rad) * R * 0.8;
        mouse.y = cy + Math.sin(rad) * R * 0.8;
        mouse.on = true;
      } else {
        item.classList.remove('active');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });

    quickPills.forEach((pill, i) => {
      pill.classList.toggle('active', i === index);
    });
  }

  orbitItems.forEach((item, index) => {
    // Hover: show small card & flex filaments
    item.addEventListener('mouseenter', () => {
      setActiveNode(index);
    });

    item.addEventListener('mouseleave', () => {
      item.classList.remove('active');
      const btn = item.querySelector('.node-anchor-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      mouse.on = false;
    });

    // Click / Touch: toggle card
    const btn = item.querySelector('.node-anchor-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isNowActive = item.classList.contains('active');
        if (isNowActive) {
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
          mouse.on = false;
        } else {
          setActiveNode(index);
        }
      });
    }
  });

  // Quick Selector Pills
  quickPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const targetIdx = parseInt(pill.getAttribute('data-target'), 10);
      setActiveNode(targetIdx);
    });
  });
}

