/**
 * LOCANA — Interactive Tools & Calculators
 * - Tier Earning Potential Calculator
 * - Institutional Field Deployment Estimator
 * - Dual-Mode Application Form Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initTierCalculator();
  initFieldEstimator();
  initFormTabSwitcher();
  initFormSubmissions();
});

/* ==========================================================================
   1. Tier Earning Potential Calculator
   ========================================================================== */
function initTierCalculator() {
  const daysSlider = document.getElementById('calc-days-slider');
  const daysDisplay = document.getElementById('calc-days-display');
  const tierSelect = document.getElementById('calc-tier-select');
  const monthlyEarningsEl = document.getElementById('calc-monthly-earnings');
  const annualEarningsEl = document.getElementById('calc-annual-earnings');
  const feebackStatusEl = document.getElementById('calc-feeback-status');
  const dayrateDisplayEl = document.getElementById('calc-dayrate-display');

  if (!daysSlider || !tierSelect || !monthlyEarningsEl) return;

  const tierRates = {
    'basic': { rate: 600, name: 'Basic (Entry Level)', fee: 0 },
    'economy': { rate: 850, name: 'Economy Certified (₹99)', fee: 99 },
    'silver': { rate: 1100, name: 'Silver (₹499)', fee: 499 },
    'gold': { rate: 1350, name: 'Gold CASP (₹999)', fee: 999 },
    'diamond': { rate: 1750, name: 'Diamond Manager (₹1,499)', fee: 1499 },
    'platinum': { rate: 2200, name: 'Platinum Fellow (Merit)', fee: 0 }
  };

  function updateCalculations() {
    const days = parseInt(daysSlider.value, 10);
    const tierKey = tierSelect.value;
    const tierData = tierRates[tierKey] || tierRates['gold'];

    if (daysDisplay) daysDisplay.textContent = `${days} Days / Month`;
    if (dayrateDisplayEl) dayrateDisplayEl.textContent = `₹${tierData.rate.toLocaleString()} / Day`;

    const monthlyTotal = days * tierData.rate;
    const annualTotal = monthlyTotal * 12;

    monthlyEarningsEl.textContent = `₹${monthlyTotal.toLocaleString()}`;
    if (annualEarningsEl) annualEarningsEl.textContent = `₹${annualTotal.toLocaleString()}`;

    if (feebackStatusEl) {
      if (tierData.fee > 0) {
        feebackStatusEl.innerHTML = `
          <span class="badge badge-emerald">100% Fee-Back Eligible</span>
          <p class="calc-micro-note">Your ₹${tierData.fee} enrollment fee is credited back on your 1st QC-approved assignment.</p>
        `;
      } else if (tierKey === 'basic') {
        feebackStatusEl.innerHTML = `<span class="badge badge-outline">Free Enrollment</span>`;
      } else {
        feebackStatusEl.innerHTML = `<span class="badge badge-ochre">Top Tier + Revenue Share</span>`;
      }
    }
  }

  daysSlider.addEventListener('input', updateCalculations);
  tierSelect.addEventListener('change', updateCalculations);
  updateCalculations();
}

/* ==========================================================================
   2. Institutional Field Deployment Estimator
   ========================================================================== */
function initFieldEstimator() {
  const serviceSelect = document.getElementById('estimator-service');
  const sampleSlider = document.getElementById('estimator-sample-slider');
  const sampleDisplay = document.getElementById('estimator-sample-display');
  const geographySelect = document.getElementById('estimator-geography');
  const timelineResultEl = document.getElementById('estimator-timeline');
  const qcAuditsEl = document.getElementById('estimator-qcaudits');
  const researchersResultEl = document.getElementById('estimator-researchers');

  if (!sampleSlider || !serviceSelect || !timelineResultEl) return;

  function updateEstimator() {
    const samples = parseInt(sampleSlider.value, 10);
    const service = serviceSelect.value;
    const geo = geographySelect ? geographySelect.value : 'multi';

    if (sampleDisplay) {
      sampleDisplay.textContent = `${samples.toLocaleString()} Verified Samples`;
    }

    // Calculation logic
    let samplesPerResearcherDay = 5;
    if (service === 'vernacular_ai') samplesPerResearcherDay = 4;
    if (service === 'geospatial') samplesPerResearcherDay = 3;
    if (service === 'skilling') samplesPerResearcherDay = 15;

    let researchersNeeded = Math.ceil(samples / (samplesPerResearcherDay * 12));
    if (researchersNeeded < 4) researchersNeeded = 4;

    let estimatedDays = Math.ceil(samples / (researchersNeeded * samplesPerResearcherDay)) + 4; // +4 days buffer & training
    if (estimatedDays > 35) estimatedDays = 35; // Parallel scaling cap

    const backCheckAudits = Math.ceil(samples * 0.10); // 10% mandatory back-check

    timelineResultEl.textContent = `${estimatedDays} Working Days`;
    if (researchersResultEl) researchersResultEl.textContent = `${researchersNeeded} Certified Researchers`;
    if (qcAuditsEl) qcAuditsEl.textContent = `${backCheckAudits.toLocaleString()} Multi-Layer Back-Checks (10%)`;
  }

  sampleSlider.addEventListener('input', updateEstimator);
  serviceSelect.addEventListener('change', updateEstimator);
  if (geographySelect) geographySelect.addEventListener('change', updateEstimator);

  updateEstimator();
}

/* ==========================================================================
   3. Dual Mode Form Switcher & Handlers
   ========================================================================== */
function initFormTabSwitcher() {
  const tabButtons = document.querySelectorAll('.form-tab-btn');
  const institutionalPane = document.getElementById('form-pane-institutional');
  const researcherPane = document.getElementById('form-pane-researcher');

  if (!tabButtons.length || !institutionalPane || !researcherPane) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-tab');
      if (target === 'institutional') {
        institutionalPane.style.display = 'block';
        researcherPane.style.display = 'none';
      } else {
        institutionalPane.style.display = 'none';
        researcherPane.style.display = 'block';
      }
    });
  });
}

function initFormSubmissions() {
  const forms = document.querySelectorAll('form[data-locana-form]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12"></circle>
        </svg>
        <span>Processing Dispatch...</span>
      `;

      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align: center; padding: 2.5rem 1rem;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--emerald-100); color: var(--emerald-600); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem; color: var(--ink-900);">Brief Received Successfully</h3>
            <p style="color: var(--text-secondary); max-width: 440px; margin: 0 auto 1.5rem auto; font-size: 0.9375rem;">
              Our Central Coordination Cell has received your dispatch parameters. A dedicated Associate Director will respond with an auditable field scope and quote within <strong>48 hours</strong>.
            </p>
            <span class="badge badge-emerald">Ref #LOC-${Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
        `;
      }, 1000);
    });
  });
}
