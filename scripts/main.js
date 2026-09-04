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
   Modern Connected Platform Ecosystem Controller (Aplyd-Inspired Celestial Radar)
   Ground Truth • Elevate • Sage • Roots • Reach • Connect • Access
   ========================================================================== */
function initPlatformWheel() {
  const radarNodes = document.querySelectorAll('.radar-node');
  const serviceNodes = document.querySelectorAll('.platform-service-node');
  const beamGroup = document.getElementById('radar-beam-group');
  const centerHub = document.getElementById('radar-center-hub');
  const detailsCard = document.getElementById('platform-details-content') || document.getElementById('wheel-details-content');
  const closeBtn = document.getElementById('details-close-btn');
  const ecosystemLayout = document.getElementById('platform-ecosystem-layout');
  const badgeTextEl = document.getElementById('pillar-badge-text');
  const badgeEl = document.getElementById('pillar-badge');
  const titleEl = document.getElementById('pillar-title');
  const descEl = document.getElementById('pillar-desc');
  const capabilitiesEl = document.getElementById('pillar-capabilities');
  const gtWorkflowBox = document.getElementById('gt-workflow-box');

  // Floating tooltip elements
  const tooltipEl = document.getElementById('radar-node-tooltip');
  const tooltipBadge = document.getElementById('tooltip-badge');
  const tooltipTitle = document.getElementById('tooltip-title');
  const tooltipTagline = document.getElementById('tooltip-tagline');
  const tooltipColorDot = document.getElementById('tooltip-color-dot');
  let activePillarKey = null;

  if (!radarNodes.length && !serviceNodes.length && !document.querySelectorAll('.wheel-slice').length) return;

  const pillarsData = {
    'ground-truth': {
      title: 'Ground Truth',
      badge: 'Field Intelligence · Verification',
      tagline: 'Auditable, uncompromised primary data collection & back-checks.',
      badgeClass: 'badge-blue',
      strokeColor: '#2563EB',
      desc: 'Auditable, uncompromised primary data collection. Combining CAPI logic gates, sub-meter GPS polygon logging, recorded voice consent, and mandatory 10% independent supervisor back-checks.',
      capabilities: [
        'Zero-curbstoning guarantee with cryptographic timestamp hashes',
        'Real-time district quota tracking & velocity anomaly filters',
        'Donor-grade primary datasets ready for econometric STATA/R modeling'
      ],
      isGroundTruth: true
    },
    'elevate': {
      title: 'Elevate',
      badge: 'Capacity · Skilling & Certification',
      tagline: 'Frontline skilling, credentialing & standardized field ethics.',
      badgeClass: 'badge-emerald',
      strokeColor: '#059669',
      desc: 'Continuous frontline capacity building and credentialing. Standardizing research ethics, digital literacy, and field protocol execution for thousands of rural youth and enumerators.',
      capabilities: [
        'Structured certification modules across 6 professional tiers',
        'Fee-back credentialing model on first paid project assignment',
        'Vernacular interactive training delivered in 20+ regional languages'
      ],
      isGroundTruth: false
    },
    'sage': {
      title: 'Sage',
      badge: 'Specialist Advisory · Econometric Design & AI',
      tagline: 'Domain specialists, econometric evaluation & Indic AI corpora.',
      badgeClass: 'badge-purple',
      strokeColor: '#7C3AED',
      desc: 'Connecting institutional partners with seasoned domain specialists, econometricians, and AI researchers to design rigorous evaluations, agro-intelligence frameworks, and Indic voice corpora.',
      capabilities: [
        'Quasi-experimental impact evaluations & RCT protocol design',
        'PMFBY-aligned yield assessment algorithms & crop cutting science',
        'Multi-modal vernacular AI training datasets & acoustic phonetics'
      ],
      isGroundTruth: false
    },
    'roots': {
      title: 'Roots',
      badge: 'Grassroots Network · Community Fluency',
      tagline: 'Deep community embeddedness & 150+ regional dialect fluency.',
      badgeClass: 'badge-amber',
      strokeColor: '#D97706',
      desc: 'Deep community embeddedness and cultural fluency. Partnering with local NGOs, FPOs, and community anchors to ensure authentic grassroots access, elder consent, and zero resistance.',
      capabilities: [
        'Dialect-matched interviewer pairing across 150+ regional dialects',
        'Gender-matched fieldwork for sensitive health & SHG programs',
        'Panchayat & local leadership liaison for uninterrupted access'
      ],
      isGroundTruth: false
    },
    'reach': {
      title: 'Reach',
      badge: 'Pan-India Fleet · 48-Hour Logistics',
      tagline: 'Turnkey 48-hour field mobilization across 225+ districts.',
      badgeClass: 'badge-blue',
      strokeColor: '#0284C7',
      desc: 'Pan-India physical mobility and rapid field mobilization across 225+ districts, tribal forest belts, and digital dark zones within 48 hours.',
      capabilities: [
        'Turnkey 48-hour mobilization across 25 states & union territories',
        'Offline-first mobile CAPI tools with asynchronous sync',
        'Distributed micro-hub logistics for physical sample collection'
      ],
      isGroundTruth: false
    },
    'connect': {
      title: 'Connect',
      badge: 'Orchestration · Two-Sided Platform Router',
      tagline: 'Two-sided platform router matching institutional demand to nodes.',
      badgeClass: 'badge-amber',
      strokeColor: '#EA580C',
      desc: 'Intelligent platform router matching institutional requirements (Govt, CSR, AI labs, Corporates) directly with certified local node capacity across India.',
      capabilities: [
        'Automated algorithmic matching by geography, dialect, and tier',
        'Unified client portal with live quota completion telemetry',
        'Transparent direct payouts to local field professionals'
      ],
      isGroundTruth: false
    },
    'access': {
      title: 'Access',
      badge: 'Citizen Impact · Digital & Financial Inclusion',
      tagline: 'Digital Public Infrastructure (DPI) & formal credit enablement.',
      badgeClass: 'badge-purple',
      strokeColor: '#4F46E5',
      desc: 'Unlocking Digital Public Infrastructure (DPI), essential public services, formal financial credit, and government entitlements for last-mile citizens.',
      capabilities: [
        'DPI enablement & assisted onboarding for remote rural households',
        'FPO/SHG financial grading unlocking formal banking credit',
        'Direct citizen feedback loops for evidence-based policy corrections'
      ],
      isGroundTruth: false
    }
  };

  // Precalculated radian coordinates and tooltip placements for the 7 celestial radar nodes (R=210, Center=320,320)
  const nodeCoords = {
    'ground-truth': { x: 320, y: 110, angle: -Math.PI / 2, tooltipPos: 'bottom' },
    'elevate':      { x: 481, y: 185, angle: Math.atan2(185 - 320, 481 - 320), tooltipPos: 'left' },
    'connect':      { x: 523, y: 374, angle: Math.atan2(374 - 320, 523 - 320), tooltipPos: 'left' },
    'access':       { x: 320, y: 530, angle: Math.PI / 2, tooltipPos: 'top' },
    'reach':        { x: 148, y: 440, angle: Math.atan2(440 - 320, 148 - 320), tooltipPos: 'right' },
    'roots':        { x: 117, y: 266, angle: Math.atan2(266 - 320, 117 - 320), tooltipPos: 'right' },
    'sage':         { x: 200, y: 148, angle: Math.atan2(148 - 320, 200 - 320), tooltipPos: 'bottom-right' }
  };

  // Draw dynamic laser flare fan beam radiating from center to active node
  function drawRadarBeam(key, strokeColor = '#d97706') {
    if (!beamGroup) return;
    const coord = nodeCoords[key];
    if (!coord) {
      beamGroup.innerHTML = '';
      return;
    }

    const cx = 320;
    const cy = 320;
    const baseAngle = coord.angle;

    // Laser rays configuration matching Aplyd's celestial flare fan
    const rays = [
      { degOffset: 0,    len: 285, width: 2.5, opacity: 0.95 },
      { degOffset: -3,   len: 265, width: 1.6, opacity: 0.75 },
      { degOffset: 3,    len: 265, width: 1.6, opacity: 0.75 },
      { degOffset: -6,   len: 245, width: 1.2, opacity: 0.50 },
      { degOffset: 6,    len: 245, width: 1.2, opacity: 0.50 },
      { degOffset: -9.5, len: 220, width: 0.8, opacity: 0.30 },
      { degOffset: 9.5,  len: 220, width: 0.8, opacity: 0.30 }
    ];

    // Subtle ambient flare wedge behind the laser rays
    const wedgeAngleSpan = 0.18; // ~10 degrees
    const wedgeR = 270;
    const a1 = baseAngle - wedgeAngleSpan;
    const a2 = baseAngle + wedgeAngleSpan;
    const x1 = cx + wedgeR * Math.cos(a1);
    const y1 = cy + wedgeR * Math.sin(a1);
    const x2 = cx + wedgeR * Math.cos(a2);
    const y2 = cy + wedgeR * Math.sin(a2);
    const wedgePath = `M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${wedgeR} ${wedgeR} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;

    let svgHtml = `
      <path d="${wedgePath}" fill="${strokeColor}" fill-opacity="0.08" class="radar-beam-wedge" />
    `;

    rays.forEach(r => {
      const rad = baseAngle + (r.degOffset * Math.PI / 180);
      const ex = cx + r.len * Math.cos(rad);
      const ey = cy + r.len * Math.sin(rad);
      svgHtml += `
        <line x1="${cx}" y1="${cy}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}"
              class="radar-beam-ray"
              style="stroke: ${strokeColor}; stroke-width: ${r.width}px; opacity: ${r.opacity};" />
      `;
    });

    beamGroup.innerHTML = svgHtml;
  }

  function closeDetails() {
    if (detailsCard) {
      detailsCard.classList.add('is-off');
    }
    if (ecosystemLayout) {
      ecosystemLayout.classList.add('radar-centered');
    }
    radarNodes.forEach(node => {
      node.classList.remove('active');
      node.setAttribute('aria-selected', 'false');
    });
    serviceNodes.forEach(node => {
      node.classList.remove('active');
    });
    document.querySelectorAll('.wheel-slice').forEach(slice => {
      slice.classList.remove('active');
    });
    if (beamGroup) {
      beamGroup.innerHTML = '';
    }
  }

  function showTooltip(key) {
    if (!tooltipEl) return;
    const data = pillarsData[key];
    const coord = nodeCoords[key];
    if (!data || !coord) return;

    if (tooltipTitle) tooltipTitle.textContent = data.title;
    if (tooltipBadge) tooltipBadge.textContent = data.badge.split('·')[0].trim();
    if (tooltipTagline) tooltipTagline.textContent = data.tagline || (data.desc.substring(0, 65) + '...');
    if (tooltipColorDot) {
      tooltipColorDot.style.backgroundColor = data.strokeColor;
      tooltipColorDot.style.boxShadow = `0 0 8px ${data.strokeColor}`;
    }

    const leftPercent = (coord.x / 640) * 100;
    const topPercent = (coord.y / 640) * 100;
    tooltipEl.style.left = `${leftPercent.toFixed(2)}%`;
    tooltipEl.style.top = `${topPercent.toFixed(2)}%`;

    tooltipEl.className = `radar-node-tooltip is-visible pos-${coord.tooltipPos || 'bottom'}`;
  }

  function hideTooltip() {
    if (!tooltipEl) return;
    tooltipEl.classList.remove('is-visible');
  }

  function closeDetails() {
    activePillarKey = null;
    hideTooltip();
    if (detailsCard) {
      detailsCard.classList.add('is-off');
    }
    if (ecosystemLayout) {
      ecosystemLayout.classList.add('radar-centered');
    }
    radarNodes.forEach(node => {
      node.classList.remove('active');
      node.setAttribute('aria-selected', 'false');
    });
    serviceNodes.forEach(node => {
      node.classList.remove('active');
    });
    document.querySelectorAll('.wheel-slice').forEach(slice => {
      slice.classList.remove('active');
    });
    if (beamGroup) {
      beamGroup.innerHTML = '';
    }
  }

  function selectPillar(key) {
    const data = pillarsData[key];
    if (!data) return;

    activePillarKey = key;
    hideTooltip();

    // Reveal side panel and transition layout
    if (ecosystemLayout) {
      ecosystemLayout.classList.remove('radar-centered');
    }
    if (detailsCard) {
      detailsCard.classList.remove('is-off');
    }

    // Update active states on SVG radar nodes
    radarNodes.forEach(node => {
      const isMatch = node.getAttribute('data-pillar') === key;
      node.classList.toggle('active', isMatch);
      node.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    // Update active states on list nodes (if present)
    serviceNodes.forEach(node => {
      node.classList.toggle('active', node.getAttribute('data-pillar') === key);
    });

    // Backward compatibility if legacy slices exist
    document.querySelectorAll('.wheel-slice').forEach(slice => {
      slice.classList.toggle('active', slice.getAttribute('data-pillar') === key);
    });

    // Draw connecting laser flare beam to active node
    drawRadarBeam(key, data.strokeColor);

    // Update Details pane with smooth fade
    if (detailsCard) {
      detailsCard.style.opacity = '0.6';
      detailsCard.style.transform = 'translateY(4px)';

      setTimeout(() => {
        if (badgeTextEl) badgeTextEl.textContent = data.badge;
        if (badgeEl) {
          badgeEl.className = `platform-details-badge badge ${data.badgeClass}`;
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

        // Show 6-step lifecycle specifically for Ground Truth
        if (gtWorkflowBox) {
          if (data.isGroundTruth) {
            gtWorkflowBox.style.display = 'block';
          } else {
            gtWorkflowBox.style.display = 'none';
          }
        }

        detailsCard.style.opacity = '1';
        detailsCard.style.transform = 'translateY(0)';
      }, 120);
    }
  }

  // Hover & Click listeners for SVG radar nodes
  radarNodes.forEach(node => {
    const key = node.getAttribute('data-pillar');

    // On hover: instantly shoot/move laser flare beam & reveal celestial tooltip
    node.addEventListener('mouseenter', () => {
      const data = pillarsData[key];
      if (data) {
        drawRadarBeam(key, data.strokeColor);
        showTooltip(key);
      }
    });

    // On mouse leave: hide tooltip & return beam to currently clicked pillar (or clear if none)
    node.addEventListener('mouseleave', () => {
      hideTooltip();
      if (activePillarKey && pillarsData[activePillarKey]) {
        drawRadarBeam(activePillarKey, pillarsData[activePillarKey].strokeColor);
      } else {
        if (beamGroup) beamGroup.innerHTML = '';
      }
    });

    // On click: lock selection & reveal full details panel
    node.addEventListener('click', (e) => {
      e.preventDefault();
      selectPillar(key);
    });

    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectPillar(key);
      }
    });
  });

  // Canvas mouseleave safeguard
  const radarCanvas = document.getElementById('platform-radar-canvas');
  if (radarCanvas) {
    radarCanvas.addEventListener('mouseleave', () => {
      hideTooltip();
      if (activePillarKey && pillarsData[activePillarKey]) {
        drawRadarBeam(activePillarKey, pillarsData[activePillarKey].strokeColor);
      } else {
        if (beamGroup) beamGroup.innerHTML = '';
      }
    });
  }

  // Click listeners for list nodes (if present)
  serviceNodes.forEach(node => {
    node.addEventListener('click', (e) => {
      e.preventDefault();
      const key = node.getAttribute('data-pillar');
      selectPillar(key);
    });
  });

  // Close button dismiss listener
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDetails();
    });
  }

  // Center Hub "LOCANA" reset click listener
  if (centerHub) {
    centerHub.addEventListener('mouseenter', () => {
      hideTooltip();
    });
    centerHub.addEventListener('click', (e) => {
      e.preventDefault();
      closeDetails();
    });
    centerHub.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeDetails();
      }
    });
  }

  // Initially: side info bar is OFF, radar is centered, no beam is drawn
  closeDetails();
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
