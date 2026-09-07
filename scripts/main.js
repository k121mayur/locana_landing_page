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
  initWorkflowToggle();
  initOrbitrailCarousel();
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
  const badgeTextEl = document.getElementById('platform-badge-text');
  const badgeEl = document.getElementById('platform-badge');
  const titleEl = document.getElementById('platform-title');
  const descEl = document.getElementById('platform-desc');
  const capabilitiesEl = document.getElementById('platform-capabilities');
  const detailsCard = document.getElementById('platform-details-content');

  if (!wrap || !canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const platformPillars = [
    {
      key: 'ground-truth',
      num: '01',
      badge: 'Pillar 01 · Ground Truth',
      badgeClass: 'badge-blue',
      strokeColor: '#173E9A',
      title: 'Ground Truth',
      desc: 'Reliable primary intelligence from the ground.',
      capabilities: [
        'Verify',
        'Survey',
        'Audit',
        'Monitor',
        'Annotate'
      ]
    },
    {
      key: 'access',
      num: '02',
      badge: 'Pillar 02 · Access',
      badgeClass: 'badge-blue',
      strokeColor: '#173E9A',
      title: 'Access',
      desc: 'Connect people to information, services, schemes and opportunities.',
      capabilities: [
        'Link',
        'Include',
        'Enable',
        'Support'
      ]
    },
    {
      key: 'connect',
      num: '03',
      badge: 'Pillar 03 · Connect',
      badgeClass: 'badge-amber',
      strokeColor: '#F28C28',
      title: 'Connect',
      desc: 'Meaningful connections between local ecosystems and institutions/markets.',
      capabilities: [
        'Market',
        'Partnership',
        'Showcase',
        'Network'
      ]
    },
    {
      key: 'reach',
      num: '04',
      badge: 'Pillar 04 · Reach',
      badgeClass: 'badge-teal',
      strokeColor: '#008C7A',
      title: 'Reach',
      desc: 'Extend products, services and execution to the last mile.',
      capabilities: [
        'Deliver',
        'Distribute',
        'Logistics',
        'Fulfil'
      ]
    },
    {
      key: 'roots',
      num: '05',
      badge: 'Pillar 05 · Roots',
      badgeClass: 'badge-amber',
      strokeColor: '#F28C28',
      title: 'Roots',
      desc: 'Build durable local relationships and understand local ecosystems.',
      capabilities: [
        'Discover',
        'Strengthen',
        'Communities',
        'Institutions'
      ]
    },
    {
      key: 'sage',
      num: '06',
      badge: 'Pillar 06 · Sage',
      badgeClass: 'badge-purple',
      strokeColor: '#6D43B5',
      title: 'Sage',
      desc: 'Turn field knowledge into evidence, insight and better decisions.',
      capabilities: [
        'Research',
        'Insights',
        'Expertise',
        'Advisory'
      ]
    },
    {
      key: 'elevate',
      num: '07',
      badge: 'Pillar 07 · Elevate',
      badgeClass: 'badge-emerald',
      strokeColor: '#2E9E4D',
      title: 'Elevate',
      desc: 'Build local capability and create pathways to better work and outcomes.',
      capabilities: [
        'Assess',
        'Upskill',
        'Empower',
        'Train',
        'Certify',
        'Deploy'
      ]
    }
  ];

  // Filament flower configuration matching Framer component specs for 7 Platform Pillars
  const cfg = {
    lineColor: '#173E9A',
    labelColor: '#0B2B6B',
    nodes: 140,
    petals: 7,
    curve: 0.88,
    drift: 0.38,
    spin: 0.014,
    lineOpacity: 0.52,
    ringDots: true,
    waveSpeed: 2.2,
    waveDensity: 3,
    hoverPush: 90,
    hoverRadius: 280,
    buildTime: 1.8,
    showLabels: true,
    labels: [
      'GROUND TRUTH · VERIFICATION',
      'ELEVATE · PROFESSIONAL SKILLING',
      'SAGE · AI & ECONOMETRICS',
      'ROOTS · 150+ DIALECTS',
      'REACH · 225+ DISTRICTS',
      'CONNECT · TWO-SIDED NETWORK',
      'ACCESS · DPI & INCLUSION',
      'RAPID DEPLOYMENT NETWORK'
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
    W = Math.max(r.width, 340);
    H = Math.max(r.height, 460);
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
    const dotR = Math.max(1.8, R * 0.009);

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = 1.45;
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
        const grad = 1 - 0.5 * um;
        const wave = 0.5 + 0.5 * Math.sin(um * cfg.waveDensity * Math.PI - ws + nd.jitter * 30);

        ctx.globalAlpha = cfg.lineOpacity * nd.bright * grad * Math.max(0.2, wave);
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

      for (const l of active) {
        const age = t - l.born;
        const u = Math.max(0, Math.min(1, age / l.life));
        const fade = Math.sin(u * Math.PI);
        const curA = l.ang + rot * 0.4;
        const lx = cx + Math.cos(curA) * (R * 1.08);
        const ly = cy + Math.sin(curA) * (R * 1.08);

        ctx.fillStyle = cfg.labelColor || '#0B2B6B';
        ctx.globalAlpha = 0.85 * fade;
        ctx.fillText(l.text, lx, ly);
      }
      ctx.globalAlpha = 1;
    }
  }

  function loop(t) {
    if (!isVisible) return;
    render(t, true);
    raf = requestAnimationFrame(loop);
  }

  // Pointer interaction
  function updatePointer(e) {
    const r = wrap.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    mouse.x = touch.clientX - r.left;
    mouse.y = touch.clientY - r.top;
    mouse.on = true;
  }

  wrap.addEventListener('pointerenter', (e) => {
    updatePointer(e);
  });

  wrap.addEventListener('pointermove', (e) => {
    updatePointer(e);
  });

  wrap.addEventListener('pointerleave', () => {
    mouse.on = false;
  });

  // Dynamic Details Card Updation
  function updateDetails(key) {
    const data = platformPillars.find(p => p.key === key);
    if (!data) return;

    if (data.strokeColor) {
      cfg.lineColor = data.strokeColor;
      cfg.labelColor = data.strokeColor;
    }

    // Update active node styling
    orbitItems.forEach(item => {
      if (item.getAttribute('data-pillar') === key) {
        item.classList.add('active');
        item.style.zIndex = '10';
      } else {
        item.classList.remove('active');
        item.style.zIndex = '5';
      }
    });

    if (detailsCard) {
      detailsCard.style.opacity = '0';
      detailsCard.style.transform = 'translateY(6px)';

      setTimeout(() => {
        if (badgeTextEl) badgeTextEl.textContent = data.badge;
        if (badgeEl) badgeEl.className = `wheel-details-badge badge ${data.badgeClass}`;
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;

        if (capabilitiesEl) {
          if (data.capabilities) {
            capabilitiesEl.innerHTML = `
              <ul class="wheel-capabilities-list">
                ${data.capabilities.map(cap => `
                  <li>
                    <span class="cap-check-icon" style="background: ${data.strokeColor}15; color: ${data.strokeColor};">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
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

  // ResizeObserver for reliable canvas dimensions
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => {
      measure();
    });
    ro.observe(wrap);
  }

  // IntersectionObserver for performance
  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible && !raf) {
        raf = requestAnimationFrame(loop);
      } else if (!isVisible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }, { threshold: 0.1 });
    observer.observe(wrap);
  }

  window.addEventListener('resize', measure, { passive: true });

  measure();
  buildNodes(cfg.nodes);
  raf = requestAnimationFrame(loop);

  // Initial display setup
  updateDetails('ground-truth');
}

/* ==========================================================================
   7. How Locana Works — Ground Truth Workflow Accordion
   ========================================================================== */
function initWorkflowToggle() {
  const toggleBtn = document.getElementById('gt-accordion-toggle');
  const box = document.getElementById('gt-accordion');
  if (!toggleBtn || !box) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = box.classList.toggle('is-expanded');
    toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  });
}

/* ==========================================================================
   8. Locana Local Node — Framer Orbitrail Carousel Component
   (https://framer.com/m/OrbitrailCarousel-3Z5nfB.js@nHEmjPvyiUtKJ2GbRnrG)
   Elliptical Orbital Carousel with Animated Guide Path, Core Anchor & Physics
   Pillars:
   Pillar 1 - People: Local professionals with geographic and community familiarity.
   Pillar 2 - Skills: Domain, fieldwork, digital and service-specific capabilities.
   Pillar 3 - Technology: Mobile tools, communication, workflow, verification and reporting.
   Pillar 4 - Assets: Local access, mobility, devices, relationships and practical resources.
   Pillar 5 - Trust: Community familiarity, ethical engagement and accountable execution.
   ========================================================================== */
function initOrbitrailCarousel() {
  const container = document.getElementById('orbitrail-container');
  const stage = document.getElementById('orbitrail-stage');
  const guidePathEl = document.getElementById('orbitrail-guide-path');
  const guideSvgEl = document.getElementById('orbitrail-guide-svg');
  const chips = document.querySelectorAll('#node-chips-container .wheel-chip');
  const prevBtn = document.getElementById('orbitrail-nav-prev');
  const nextBtn = document.getElementById('orbitrail-nav-next');
  const cards = Array.from(document.querySelectorAll('#orbitrail-stage .orbitrail-card'));

  if (!container || !stage || cards.length === 0) return;

  const numCards = cards.length; // 5
  const stepAngle = 360 / numCards; // 72 deg
  const START_ANGLE = 90; // 90 degrees places Pillar 1 at the bottom/front center
  const GUIDE_SEGMENTS = 96;

  function getOrbitPoint(angle, radius, horizontal, vertical, skewX, skewY) {
    const radians = (angle * Math.PI) / 180;
    const ellipseX = Math.cos(radians) * radius * horizontal;
    const ellipseY = Math.sin(radians) * radius * vertical;
    return {
      x: ellipseX + ellipseY * skewX,
      y: ellipseY + ellipseX * skewY
    };
  }

  function getGuidePath(radius, horizontal, vertical, skewX, skewY) {
    return Array.from({ length: GUIDE_SEGMENTS }, (_, index) => {
      const point = getOrbitPoint((index * 360) / GUIDE_SEGMENTS, radius, horizontal, vertical, skewX, skewY);
      return `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    }).join(' ');
  }

  function getGuidePathLength(radius, horizontal, vertical, skewX, skewY) {
    let length = 0;
    const first = getOrbitPoint(0, radius, horizontal, vertical, skewX, skewY);
    let previous = first;
    for (let index = 1; index < GUIDE_SEGMENTS; index += 1) {
      const point = getOrbitPoint((index * 360) / GUIDE_SEGMENTS, radius, horizontal, vertical, skewX, skewY);
      length += Math.hypot(point.x - previous.x, point.y - previous.y);
      previous = point;
    }
    length += Math.hypot(first.x - previous.x, first.y - previous.y);
    return Math.max(1, length);
  }

  function getSeamlessGuideGap(pathLength, dash, gap) {
    if (dash <= 0 || gap <= 0) return gap;
    const cycleCount = Math.max(1, Math.round(pathLength / (dash + gap)));
    return Math.max(0, pathLength / cycleCount - dash);
  }

  function getNormalizedAngleDelta(delta) {
    if (delta > 180) return delta - 360;
    if (delta < -180) return delta + 360;
    return delta;
  }

  function getGeometry() {
    const w = window.innerWidth;
    if (w <= 640) {
      return {
        radius: 175,
        horizontal: 0.96,
        vertical: 0.80,
        skewX: 0,
        skewY: 0,
        speed: 5.5,
        sensitivity: 1.15
      };
    } else if (w <= 1024) {
      return {
        radius: 260,
        horizontal: 1.28,
        vertical: 0.68,
        skewX: 0,
        skewY: 0,
        speed: 4.5,
        sensitivity: 1.05
      };
    } else {
      return {
        radius: 320,
        horizontal: 1.42,
        vertical: 0.64,
        skewX: 0,
        skewY: 0,
        speed: 4.0,
        sensitivity: 1.0
      };
    }
  }

  let geo = getGeometry();
  let pathLength = 1;

  function updateGuideSvg() {
    if (!guideSvgEl || !guidePathEl) return;
    const guidePadding = 24;
    const guideWidth = geo.radius * (geo.horizontal + Math.abs(geo.skewX) * geo.vertical) * 2;
    const guideHeight = geo.radius * (geo.vertical + Math.abs(geo.skewY) * geo.horizontal) * 2;
    const guideViewWidth = Math.max(1, guideWidth + guidePadding * 2);
    const guideViewHeight = Math.max(1, guideHeight + guidePadding * 2);

    guideSvgEl.setAttribute('viewBox', `${-guideViewWidth / 2} ${-guideViewHeight / 2} ${guideViewWidth} ${guideViewHeight}`);
    guideSvgEl.style.width = `${guideViewWidth}px`;
    guideSvgEl.style.height = `${guideViewHeight}px`;

    const guidePath = getGuidePath(geo.radius, geo.horizontal, geo.vertical, geo.skewX, geo.skewY);
    guidePathEl.setAttribute('d', `${guidePath} Z`);

    pathLength = getGuidePathLength(geo.radius, geo.horizontal, geo.vertical, geo.skewX, geo.skewY);
    const seamlessGap = getSeamlessGuideGap(pathLength, 6, 8);
    guidePathEl.setAttribute('stroke-dasharray', `6 ${seamlessGap.toFixed(2)}`);
  }

  updateGuideSvg();

  // Animation, motion & physics state
  let currentAngle = 0;
  let isTweening = false;
  let tweenStart = 0;
  let tweenFrom = 0;
  let tweenTo = 0;
  let tweenDuration = 600;
  let inertiaVelocity = 0;
  let guideDashOffset = 0;
  let isHovered = false;
  let isVisible = true;
  let lastNow = performance.now();
  let raf = null;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function render() {
    const maxVerticalY = geo.radius * geo.vertical;
    let closestIndex = 0;
    let minAngleDiff = 999999;

    cards.forEach((card, index) => {
      const angle = START_ANGLE + currentAngle + (index * stepAngle);
      const pt = getOrbitPoint(angle, geo.radius, geo.horizontal, geo.vertical, geo.skewX, geo.skewY);

      // Normalized difference to front focal point (START_ANGLE = 90 deg)
      let diff = ((angle - START_ANGLE) % 360 + 540) % 360 - 180;
      if (Math.abs(diff) < minAngleDiff) {
        minAngleDiff = Math.abs(diff);
        closestIndex = index;
      }

      // 3D perspective depth: pt.y ranges from -maxVerticalY to +maxVerticalY
      const depthT = Math.max(0, Math.min(1, (pt.y + maxVerticalY) / (2 * maxVerticalY)));
      const scale = 0.88 + 0.16 * depthT;
      const opacity = 0.78 + 0.22 * depthT;
      const zIndex = Math.round(100 + pt.y);

      card.style.left = `calc(50% + ${pt.x.toFixed(2)}px)`;
      card.style.top = `calc(50% + ${pt.y.toFixed(2)}px)`;
      card.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.zIndex = zIndex;
    });

    // Mark active center/front card
    cards.forEach((card, idx) => {
      if (idx === closestIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Synchronize navigation chips
    const activePillar = cards[closestIndex].getAttribute('data-pillar');
    chips.forEach(chip => {
      if (chip.getAttribute('data-pillar') === activePillar) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    // Animate guide dash offset in sync with orbit
    if (guidePathEl) {
      guidePathEl.style.strokeDashoffset = `${guideDashOffset.toFixed(2)}`;
    }
  }

  function frame(now) {
    raf = null;
    const dt = Math.min((now - lastNow) / 1000, 0.05);
    lastNow = now;

    if (isTweening) {
      const elapsed = now - tweenStart;
      const p = Math.min(1, elapsed / tweenDuration);
      currentAngle = tweenFrom + (tweenTo - tweenFrom) * easeOutCubic(p);
      guideDashOffset = -currentAngle * (pathLength / 360);
      if (p >= 1) {
        isTweening = false;
        currentAngle = tweenTo;
      }
    } else if (dragging) {
      // Handled in pointermove
    } else {
      // Inertia decay
      if (Math.abs(inertiaVelocity) > 0.1) {
        currentAngle += inertiaVelocity * dt;
        guideDashOffset = -currentAngle * (pathLength / 360);
        inertiaVelocity *= Math.exp(-4.2 * dt);
      } else {
        inertiaVelocity = 0;
        // Ambient continuous orbital drift (matching Framer Orbitrail speed)
        if (!isHovered && isVisible) {
          const orbitalSpeed = geo.speed;
          currentAngle += orbitalSpeed * dt;
          guideDashOffset = -currentAngle * (pathLength / 360);
        }
      }
    }

    render();

    if (isVisible) {
      raf = requestAnimationFrame(frame);
    }
  }

  function ensureFrame() {
    lastNow = performance.now();
    if (raf == null) raf = requestAnimationFrame(frame);
  }

  // Pointer drag interaction with inertia
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let lastAngle = 0;
  let lastTime = 0;
  let dragMoved = false;

  function getPointerAngle(e) {
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
    const clientY = e.clientY ?? (e.touches && e.touches[0].clientY) ?? 0;
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
  }

  function onPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    dragging = true;
    dragMoved = false;
    isTweening = false;
    inertiaVelocity = 0;
    container.classList.add('is-dragging');

    startX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
    startY = e.clientY ?? (e.touches && e.touches[0].clientY) ?? 0;
    lastAngle = getPointerAngle(e);
    lastTime = performance.now();
  }

  function onPointerMove(e) {
    if (!dragging) return;
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
    const clientY = e.clientY ?? (e.touches && e.touches[0].clientY) ?? 0;
    const movedPx = Math.hypot(clientX - startX, clientY - startY);
    if (movedPx > 6) dragMoved = true;

    const angle = getPointerAngle(e);
    const now = performance.now();
    const dt = Math.max((now - lastTime) / 1000, 0.001);

    const angleDelta = getNormalizedAngleDelta(angle - lastAngle) * geo.sensitivity;
    currentAngle += angleDelta;
    inertiaVelocity = (angleDelta / dt) * 0.9;
    guideDashOffset = -currentAngle * (pathLength / 360);

    lastAngle = angle;
    lastTime = now;
    render();
  }

  function onPointerUp() {
    if (!dragging) return;
    dragging = false;
    container.classList.remove('is-dragging');
    ensureFrame();
  }

  container.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);

  // Hover slowdown: pause / slow ambient drift when reading cards
  container.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  container.addEventListener('mouseleave', () => {
    isHovered = false;
    ensureFrame();
  });

  // Smooth rotation to a specific card index
  function rotateToIndex(targetIndex) {
    isTweening = true;
    tweenStart = performance.now();
    tweenFrom = currentAngle;
    const desiredBase = -targetIndex * stepAngle;
    const period = 360;
    const delta = ((desiredBase - (currentAngle % period)) + 540) % 360 - 180;
    tweenTo = currentAngle + delta;
    tweenDuration = 550;
    inertiaVelocity = 0;
    ensureFrame();
  }

  // Card click to rotate into view
  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      if (dragMoved) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      rotateToIndex(index);
    });
  });

  // Navigation chips
  chips.forEach((chip, chipIndex) => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPillar = chip.getAttribute('data-pillar');
      const idx = cards.findIndex(c => c.getAttribute('data-pillar') === targetPillar);
      if (idx !== -1) {
        rotateToIndex(idx);
      } else {
        rotateToIndex(chipIndex);
      }
    });
  });

  // Prev / Next button listeners
  function getClosestIndex() {
    let closestIndex = 0;
    let minAngleDiff = 999999;
    cards.forEach((_, index) => {
      const angle = START_ANGLE + currentAngle + (index * stepAngle);
      let diff = Math.abs(((angle - START_ANGLE) % 360 + 540) % 360 - 180);
      if (diff < minAngleDiff) {
        minAngleDiff = diff;
        closestIndex = index;
      }
    });
    return closestIndex;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const cur = getClosestIndex();
      const prevIdx = (cur - 1 + numCards) % numCards;
      rotateToIndex(prevIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const cur = getClosestIndex();
      const nextIdx = (cur + 1) % numCards;
      rotateToIndex(nextIdx);
    });
  }

  // Visibility observer for performance optimization
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

  // Responsive resizing
  function onResize() {
    geo = getGeometry();
    updateGuideSvg();
    render();
  }

  window.addEventListener('resize', onResize);

  // Initial render & run animation frame
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
