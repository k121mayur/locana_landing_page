/**
 * LOCANA — Core UI & Interaction Controller
 */

/**
 * LOCANA — Core UI & Interaction Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initScrollReveal();
  initCounterUp();
  initFaqAccordion();
  initPlatformFilamentFlower();
  initArcCardCarousel();
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
   4. Locana Platform — FilamentFlower Canvas & 7 Orbital Pillars
   Based on Framer Filamentflower (AHkv5e)
   ========================================================================== */
function initPlatformFilamentFlower() {
  const wrap = document.getElementById('platform-flower-wrap');
  const canvas = document.getElementById('platform-flower-canvas');
  const trackEl = document.getElementById('platform-orbit-track');
  const orbitItems = document.querySelectorAll('#platform-orbit-items .node-orbit-item');
  const chips = document.querySelectorAll('#platform-chips-container .wheel-chip');
  const badgeTextEl = document.getElementById('platform-badge-text');
  const badgeEl = document.getElementById('platform-badge');
  const titleEl = document.getElementById('platform-title');
  const descEl = document.getElementById('platform-desc');
  const capabilitiesEl = document.getElementById('platform-capabilities');

  if (!wrap || !canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const platformPillars = [
    {
      key: 'ground-truth',
      num: '01',
      badge: 'Pillar 01 · Verification Workflow',
      badgeClass: 'badge-blue',
      strokeColor: '#2563EB',
      title: 'HOW GROUND TRUTHING WORKS?',
      desc: 'A seamless 6-step verification lifecycle transforming complex institutional requirements into auditable primary ground intelligence.',
      steps: [
        { num: '01', name: 'Post', desc: 'Institution submits target geography, sample quotas, protocol guidelines & timelines.' },
        { num: '02', name: 'Match', desc: 'Locana engine matches requirement to certified local node leads & dialect-fluent teams.' },
        { num: '03', name: 'Assign', desc: 'Standardized CAPI digital forms, geofenced clusters & protocol briefings deployed.' },
        { num: '04', name: 'Execute', desc: 'Local researchers conduct field tasks with 100% FPIC consent & live GPS telemetry logging.' },
        { num: '05', name: 'Verify', desc: 'Automated logic checks, cryptographic timestamp hashes & mandatory 10% supervisor back-checks.' },
        { num: '06', name: 'Pay', desc: 'Instant, transparent payouts directly to certified local field professionals upon QC clearance.' }
      ]
    },
    {
      key: 'elevate',
      num: '02',
      badge: 'Pillar 02 · Skilling & Capacity',
      badgeClass: 'badge-emerald',
      strokeColor: '#059669',
      title: 'Elevate',
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
      desc: 'Unlocking Digital Public Infrastructure (DPI), essential public services, formal financial credit, and government entitlements for last-mile citizens.',
      capabilities: [
        'DPI enablement & assisted onboarding for rural households',
        'FPO/SHG financial grading unlocking formal banking credit',
        'Direct citizen feedback loops for evidence-based policy corrections'
      ]
    }
  ];

  // Filament flower configuration matching Framer component specs for 7 Platform Pillars
  const cfg = {
    lineColor: '#2563EB',
    labelColor: '#1D4ED8',
    nodes: 140,
    petals: 7,
    curve: 0.88,
    drift: 0.38,
    spin: 0.014,
    lineOpacity: 0.28,
    ringDots: true,
    waveSpeed: 2.2,
    waveDensity: 3,
    hoverPush: 90,
    hoverRadius: 280,
    buildTime: 1.8,
    showLabels: true,
    labels: [
      'GROUND TRUTH · VERIFICATION',
      'ELEVATE · 6-TIER SKILLING',
      'SAGE · AI & ECONOMETRICS',
      'ROOTS · 150+ DIALECTS',
      'REACH · 225+ DISTRICTS',
      'CONNECT · TWO-SIDED NETWORK',
      'ACCESS · DPI & INCLUSION',
      '48-HR SLA TURNAROUND'
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
    R = Math.min(W, H) * 0.35;

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

  // Orbital Nodes, Chips & Right-Side Details Card Interactions
  let activePillarKey = 'ground-truth';

  function updateDetails(key) {
    const data = platformPillars.find(p => p.key === key);
    if (!data) return;
    activePillarKey = key;

    // Update active state on flower orbital items
    orbitItems.forEach((item) => {
      const isCurrent = item.getAttribute('data-pillar') === key;
      item.classList.toggle('active', isCurrent);
      const btn = item.querySelector('.node-anchor-btn');
      if (btn) btn.setAttribute('aria-expanded', isCurrent ? 'true' : 'false');
      if (isCurrent) {
        const angleDeg = parseFloat(item.getAttribute('data-angle')) || 0;
        const rad = (angleDeg * Math.PI) / 180;
        mouse.x = cx + Math.cos(rad) * R * 0.85;
        mouse.y = cy + Math.sin(rad) * R * 0.85;
        mouse.on = true;
      }
    });

    // Update active state on chips
    chips.forEach(chip => {
      chip.classList.toggle('active', chip.getAttribute('data-pillar') === key);
    });

    // Update right-side details card
    const detailsCard = document.getElementById('platform-details-content');
    if (detailsCard) {
      detailsCard.style.opacity = '0.7';
      detailsCard.style.transform = 'translateY(4px)';

      setTimeout(() => {
        if (badgeTextEl) badgeTextEl.textContent = data.badge;
        if (badgeEl) badgeEl.className = `wheel-details-badge badge ${data.badgeClass}`;
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;

        if (capabilitiesEl) {
          if (key === 'ground-truth' && data.steps) {
            capabilitiesEl.innerHTML = `
              <div class="gt-steps-grid">
                ${data.steps.map(step => `
                  <div class="gt-step-item">
                    <div class="gt-step-header">
                      <span class="gt-step-num">STEP ${step.num}</span>
                      <span class="gt-step-name">${step.name}</span>
                    </div>
                    <p class="gt-step-desc">${step.desc}</p>
                  </div>
                `).join('')}
              </div>
            `;
          } else if (data.capabilities) {
            capabilitiesEl.innerHTML = `
              <ul class="wheel-capabilities-list">
                ${data.capabilities.map(cap => `
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${data.strokeColor}" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>${cap}</span>
                  </li>
                `).join('')}
              </ul>
            `;
          }
        }

        detailsCard.style.opacity = '1';
        detailsCard.style.transform = 'translateY(0)';
      }, 150);
    }
  }

  orbitItems.forEach((item) => {
    const key = item.getAttribute('data-pillar');
    const btn = item.querySelector('.node-anchor-btn');

    const handleSelect = (e) => {
      if (e) e.stopPropagation();
      updateDetails(key);
    };

    item.addEventListener('click', handleSelect);
    if (btn) btn.addEventListener('click', handleSelect);

    item.addEventListener('mouseenter', () => {
      const angleDeg = parseFloat(item.getAttribute('data-angle')) || 0;
      const rad = (angleDeg * Math.PI) / 180;
      mouse.x = cx + Math.cos(rad) * R * 0.85;
      mouse.y = cy + Math.sin(rad) * R * 0.85;
      mouse.on = true;
    });

    item.addEventListener('mouseleave', () => {
      const currentActiveItem = document.querySelector('#platform-orbit-items .node-orbit-item.active');
      if (currentActiveItem) {
        const angleDeg = parseFloat(currentActiveItem.getAttribute('data-angle')) || 0;
        const rad = (angleDeg * Math.PI) / 180;
        mouse.x = cx + Math.cos(rad) * R * 0.85;
        mouse.y = cy + Math.sin(rad) * R * 0.85;
        mouse.on = true;
      } else {
        mouse.on = false;
      }
    });
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-pillar');
      updateDetails(key);
    });
  });

  // Initial display setup
  updateDetails('ground-truth');
}

/* ==========================================================================
   8. Locana Local Node — Framer ArcCardCarousel Component
   Infinite 3D Arc Card Carousel with Dynamic Y-Tilt and Magnetic Snap
   Data: People, + Skills, + Technology, + Assets, + Trust
   ========================================================================== */
function initArcCardCarousel() {
  const container = document.getElementById('arc-carousel-container');
  const stage = document.getElementById('arc-carousel-stage');
  const chips = document.querySelectorAll('#node-chips-container .wheel-chip');
  const prevBtn = document.getElementById('arc-nav-prev');
  const nextBtn = document.getElementById('arc-nav-next');

  if (!container || !stage) return;

  const pillarData = [
    {
      key: 'people',
      num: '01',
      code: '001',
      title: 'People',
      category: 'Frontline Talent',
      accentColor: '#2563EB',
      image: 'assets/images/hero_field_network.jpg',
      desc: 'Locally resident, certified enumerators, supervisors, and community coordinators who live in the district.'
    },
    {
      key: 'skills',
      num: '02',
      code: '002',
      title: '+ Skills',
      category: 'Ethics & Protocols',
      accentColor: '#059669',
      image: 'assets/images/frontline_skilling_workshop.jpg',
      desc: 'Standardized training in research ethics, FPIC consent protocols, survey methodologies, and digital tools.'
    },
    {
      key: 'technology',
      num: '03',
      code: '003',
      title: '+ Technology',
      category: 'Mobile Telemetry & CAPI',
      accentColor: '#7C3AED',
      image: 'assets/images/locana_tech_telemetry.jpg',
      desc: 'Locana mobile fieldwork application, GPS geofencing, real-time telemetry, and offline-first CAPI data sync.'
    },
    {
      key: 'assets',
      num: '04',
      code: '004',
      title: '+ Assets',
      category: 'Hardware & Micro-Hubs',
      accentColor: '#D97706',
      image: 'assets/images/geospatial_agri_survey.jpg',
      desc: 'Verified field devices, RTK/GNSS tools, local transport networks, and micro-hub logistics nodes.'
    },
    {
      key: 'trust',
      num: '05',
      code: '005',
      title: '+ Trust',
      category: 'Community Capital',
      accentColor: '#DB2777',
      image: 'assets/images/vernacular_ai_voice.jpg',
      desc: 'Deep community roots, Panchayat relationships, cultural alignment, and institutional credibility.'
    }
  ];

  // Tile items twice (10 items) for a continuous 360-degree seamless infinite arc
  const items = [...pillarData, ...pillarData];
  const count = items.length;

  function getGeometry() {
    const w = window.innerWidth;
    if (w <= 640) {
      return {
        radius: 750,
        spacing: 19,
        cardWidth: 230,
        cardHeight: 335,
        arcOffset: 195,
        tiltAmount: 14,
        sensitivity: 1.15
      };
    } else if (w <= 1024) {
      return {
        radius: 1120,
        spacing: 14,
        cardWidth: 260,
        cardHeight: 375,
        arcOffset: 220,
        tiltAmount: 17,
        sensitivity: 1.05
      };
    } else {
      return {
        radius: 1400,
        spacing: 11.8,
        cardWidth: 282,
        cardHeight: 395,
        arcOffset: 235,
        tiltAmount: 20,
        sensitivity: 1.0
      };
    }
  }

  let geo = getGeometry();

  // Math helper functions mirroring Framer ArcCardCarousel specs
  function wrapAngle(deg, period) {
    const half = period / 2;
    let a = deg % period;
    if (a < -half) a += period;
    if (a >= half) a -= period;
    return a;
  }

  function cardTransform(theta, tilt, radius) {
    const rad = (theta * Math.PI) / 180;
    const x = radius * Math.sin(rad);
    const y = -radius * Math.cos(rad);
    return `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotateZ(${theta}deg) rotateY(${tilt}deg)`;
  }

  function cardOpacity(theta, fadeStart, fadeEnd) {
    const t = Math.abs(theta);
    if (t <= fadeStart) return 1;
    if (t >= fadeEnd) return 0;
    return 1 - (t - fadeStart) / (fadeEnd - fadeStart);
  }

  // Build card DOM elements
  stage.innerHTML = '';
  const cardEls = [];

  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'arc-card';
    card.setAttribute('data-pillar', item.key);
    card.setAttribute('data-index', i);
    card.style.setProperty('--card-accent', item.accentColor);
    card.style.width = `${geo.cardWidth}px`;
    card.style.height = `${geo.cardHeight}px`;

    card.innerHTML = `
      <div class="arc-card-inner">
        <div class="arc-card-media-wrap">
          <img src="${item.image}" alt="${item.title} — ${item.category}" class="arc-card-img" draggable="false" loading="lazy" />
          <div class="arc-card-gradient"></div>
          <div class="arc-card-badge-row">
            <span class="arc-card-tag" style="background: ${item.accentColor}22; color: ${item.accentColor}; border: 1px solid ${item.accentColor}44;">
              ${item.category}
            </span>
            <span class="arc-card-num-chip">${item.num}</span>
          </div>
        </div>
        <div class="arc-card-content">
          <div class="arc-card-head">
            <h3 class="arc-card-title">${item.title}</h3>
            <span class="arc-card-code" style="color: ${item.accentColor};">${item.code}</span>
          </div>
          <p class="arc-card-desc">${item.desc}</p>
        </div>
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (dragMoved) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      rotateToIndex(i);
    });

    stage.appendChild(card);
    cardEls.push(card);
  });

  // State proxies & auto-drift state
  const rotProxy = { r: 0 };
  const tiltProxy = { t: 0 };
  let raf = null;
  let rotTween = null;
  let tiltTween = null;

  const AUTO_SPEED = 1.8; // degrees per second for gentle ambient drift
  let isHovered = false;
  let isVisible = true;
  let resumeAutoTime = 0;
  let lastNow = performance.now();

  const easeOutCubic = p => 1 - Math.pow(1 - p, 3);

  function setTilt(value) {
    tiltTween = {
      from: tiltProxy.t,
      to: value,
      start: performance.now(),
      dur: 480
    };
    ensureFrame();
  }

  function frame(now) {
    raf = null;
    let active = false;
    const dt = Math.min((now - lastNow) / 1000, 0.05);
    lastNow = now;

    if (rotTween) {
      const p = Math.min(1, (now - rotTween.start) / rotTween.dur);
      rotProxy.r = rotTween.from + (rotTween.to - rotTween.from) * easeOutCubic(p);
      if (p >= 1) {
        rotTween = null;
        resumeAutoTime = now + 1200; // brief pause after tween completes
      } else {
        active = true;
      }
    } else if (!dragging && !isHovered && isVisible && now > resumeAutoTime) {
      // Gentle ambient drift
      rotProxy.r += AUTO_SPEED * dt;
      active = true;
    }

    if (tiltTween) {
      const p = Math.min(1, (now - tiltTween.start) / tiltTween.dur);
      tiltProxy.t = tiltTween.from + (tiltTween.to - tiltTween.from) * easeOutCubic(p);
      if (p >= 1) tiltTween = null;
      else active = true;
    }

    render();

    if (active || (!dragging && !isHovered && isVisible)) {
      raf = requestAnimationFrame(frame);
    }
  }

  function ensureFrame() {
    lastNow = performance.now();
    if (raf == null) raf = requestAnimationFrame(frame);
  }

  function render() {
    const rot = rotProxy.r;
    const tlt = tiltProxy.t;
    const period = count * geo.spacing;
    const half = period / 2;
    const fadeEnd = Math.min(88, half - 2.5);
    const fadeStart = Math.max(10, fadeEnd - 18);

    stage.style.top = `${geo.arcOffset + geo.radius}px`;

    let closestIdx = 0;
    let minTheta = 99999;

    for (let i = 0; i < count; i++) {
      const el = cardEls[i];
      if (!el) continue;
      const theta = wrapAngle(i * geo.spacing - rot, period);
      el.style.transform = cardTransform(theta, tlt, geo.radius);
      el.style.opacity = String(cardOpacity(theta, fadeStart, fadeEnd));
      el.style.zIndex = String(Math.round(1000 - Math.abs(theta)));

      const absT = Math.abs(theta);
      if (absT < minTheta) {
        minTheta = absT;
        closestIdx = i;
      }
    }

    // Mark active center card
    cardEls.forEach((el, idx) => {
      if (idx === closestIdx) el.classList.add('active');
      else el.classList.remove('active');
    });

    // Synchronize navigation chips
    const activeKey = items[closestIdx].key;
    chips.forEach(chip => {
      if (chip.getAttribute('data-pillar') === activeKey) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  // Pointer drag interaction
  let dragging = false;
  let lastX = 0;
  let downX = 0;
  let dragMoved = false;
  let lastT = 0;
  let velocity = 0;
  let dir = 0;
  let target = rotProxy.r;

  function onDown(e) {
    dragging = true;
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
    lastX = clientX;
    downX = clientX;
    dragMoved = false;
    lastT = performance.now();
    velocity = 0;
    dir = 0;
    rotTween = null;
    target = rotProxy.r;
    container.style.cursor = 'grabbing';
  }

  function onMove(e) {
    if (!dragging) return;
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
    const now = performance.now();
    const dx = clientX - lastX;
    const dt = Math.max(now - lastT, 1);

    if (Math.abs(clientX - downX) > 6) dragMoved = true;

    // Direction-aware 3D tilt
    if (Math.abs(dx) > 1.2) {
      const newDir = dx > 0 ? 1 : -1;
      if (newDir !== dir) {
        dir = newDir;
        setTilt(dir * geo.tiltAmount);
      }
    }

    const dDeg = -(dx / geo.radius) * (180 / Math.PI) * geo.sensitivity;
    target += dDeg;
    const instV = dDeg / (dt / 1000);
    velocity = velocity * 0.6 + instV * 0.4;
    rotProxy.r = target;
    render();

    lastX = clientX;
    lastT = now;
  }

  function onUp() {
    if (!dragging) return;
    dragging = false;
    dir = 0;
    container.style.cursor = 'grab';
    setTilt(0);

    // Snap to nearest slot with velocity fling bias
    const bias = Math.max(-geo.spacing, Math.min(geo.spacing, velocity * 0.08));
    const snapped = Math.round((target + bias) / geo.spacing) * geo.spacing;
    target = snapped;
    rotTween = {
      from: rotProxy.r,
      to: snapped,
      start: performance.now(),
      dur: 560
    };
    ensureFrame();
  }

  function rotateToIndex(idx) {
    const period = count * geo.spacing;
    const theta = wrapAngle(idx * geo.spacing - rotProxy.r, period);
    const to = rotProxy.r + theta;
    rotTween = {
      from: rotProxy.r,
      to: to,
      start: performance.now(),
      dur: 600
    };
    ensureFrame();
  }

  function rotateToPillar(key) {
    const period = count * geo.spacing;
    let bestIdx = -1;
    let minDiff = 999999;
    items.forEach((item, i) => {
      if (item.key === key) {
        const theta = Math.abs(wrapAngle(i * geo.spacing - rotProxy.r, period));
        if (theta < minDiff) {
          minDiff = theta;
          bestIdx = i;
        }
      }
    });
    if (bestIdx >= 0) rotateToIndex(bestIdx);
  }

  // Bind pointer & touch events
  container.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);

  // Pause auto-drift on hover, resume after leaving
  container.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  container.addEventListener('mouseleave', () => {
    isHovered = false;
    resumeAutoTime = performance.now() + 800;
    ensureFrame();
  });

  container.addEventListener('touchstart', () => {
    isHovered = true;
  }, { passive: true });

  container.addEventListener('touchend', () => {
    isHovered = false;
    resumeAutoTime = performance.now() + 1200;
    ensureFrame();
  });

  // Bind navigation chips
  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const key = chip.getAttribute('data-pillar');
      resumeAutoTime = performance.now() + 2200;
      rotateToPillar(key);
    });
  });

  // Prev / Next button listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const snapped = Math.round((rotProxy.r - geo.spacing) / geo.spacing) * geo.spacing;
      resumeAutoTime = performance.now() + 2000;
      rotTween = { from: rotProxy.r, to: snapped, start: performance.now(), dur: 500 };
      ensureFrame();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const snapped = Math.round((rotProxy.r + geo.spacing) / geo.spacing) * geo.spacing;
      resumeAutoTime = performance.now() + 2000;
      rotTween = { from: rotProxy.r, to: snapped, start: performance.now(), dur: 500 };
      ensureFrame();
    });
  }

  // Optimize performance: run auto-drift only when section is visible
  if (window.IntersectionObserver) {
    const io = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible) ensureFrame();
      else if (raf != null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }, { threshold: 0.05 });
    io.observe(container);
  }

  // Handle responsive resizing
  function onResize() {
    geo = getGeometry();
    cardEls.forEach(card => {
      card.style.width = `${geo.cardWidth}px`;
      card.style.height = `${geo.cardHeight}px`;
    });
    render();
  }

  window.addEventListener('resize', onResize);

  // Initial render & launch auto-drift frame
  render();
  ensureFrame();
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
