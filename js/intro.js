/**
 * NVIDIA — BEYOND ACCELERATION
 * Dedicated Cinematic Brand Ident Controller
 * 
 * Strict Specification:
 * - Pure dedicated brand intro (5.5s - 6.0s)
 * - Authentic NVIDIA logo centered alone in dark green atmosphere
 * - NO hero content, no navigation, no taglines visible during intro
 * - Timeline:
 *   0.0s - 1.0s: Pure darkness / deep graphite green. Nothing visible.
 *   1.0s - 2.2s: Logo slowly emerges: opacity 0 -> 1, scale 0.82 -> 1, blur 12px -> 0.
 *   2.2s - 3.7s: Calm prestige hold for ~1.5 seconds.
 *   3.7s - 5.3s: Slowly scale 1.0 -> 1.08, opacity 1 -> 0, blur 0 -> 6px.
 *   5.3s - 5.8s: Smooth dissolution into the documentary hero.
 */

export function initIntro() {
  const introEl = document.getElementById('cinematic-intro');
  const logoEl = document.getElementById('intro-logo');
  const skipBtn = document.getElementById('intro-skip-btn');
  const headerEl = document.querySelector('.global-header');
  const mainContent = document.getElementById('main-content');

  if (!introEl || !logoEl) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function finishIntro() {
    introEl.classList.add('intro-finished');
    document.body.classList.remove('intro-active');

    // Smoothly reveal header and main content
    if (headerEl) {
      headerEl.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      headerEl.style.opacity = '1';
      headerEl.style.visibility = 'visible';
      headerEl.style.transform = 'translateY(0)';
    }

    if (mainContent) {
      mainContent.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
      mainContent.style.opacity = '1';
      mainContent.style.visibility = 'visible';
    }

    // Trigger hero entrance event
    window.dispatchEvent(new CustomEvent('introCompleted'));

    setTimeout(() => {
      introEl.style.display = 'none';
    }, 800);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', finishIntro);
  }

  // Escape key skip
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !introEl.classList.contains('intro-finished')) {
      finishIntro();
    }
  });

  if (prefersReducedMotion) {
    finishIntro();
    return;
  }

  // Ensure body lock and hide hero/header while intro runs
  document.body.classList.add('intro-active');
  if (headerEl) {
    headerEl.style.opacity = '0';
    headerEl.style.visibility = 'hidden';
    headerEl.style.transform = 'translateY(-10px)';
  }
  if (mainContent) {
    mainContent.style.opacity = '0';
    mainContent.style.visibility = 'hidden';
  }

  // Initial State: 0.0s - 1.0s (Hidden, scale 0.82, blur 12px)
  logoEl.style.opacity = '0';
  logoEl.style.transform = 'scale(0.82)';
  logoEl.style.filter = 'blur(12px)';

  // GSAP Cinematic Timeline Orchestration
  if (window.gsap) {
    const tl = window.gsap.timeline({
      onComplete: finishIntro
    });

    // 0.0s - 1.0s: Pure darkness hold
    tl.to({}, { duration: 1.0 });

    // 1.0s - 2.2s: Slow emergence from darkness into crisp focus
    tl.to(logoEl, {
      opacity: 1,
      scale: 1.0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    });

    // 2.2s - 3.7s: Calm hold for ~1.5s
    tl.to(logoEl, {
      scale: 1.015,
      duration: 1.5,
      ease: 'sine.inOut'
    });

    // 3.7s - 5.3s: Slow dissolution & expansion
    tl.to(logoEl, {
      scale: 1.08,
      opacity: 0,
      filter: 'blur(6px)',
      duration: 1.6,
      ease: 'power2.inOut'
    });

    // 5.3s - 5.8s: Intro curtain fade
    tl.to(introEl, {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.out'
    }, '-=0.2');

  } else {
    // Native Fallback
    setTimeout(() => {
      logoEl.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s ease-out';
      logoEl.style.opacity = '1';
      logoEl.style.transform = 'scale(1.0)';
      logoEl.style.filter = 'blur(0px)';
    }, 1000);

    setTimeout(() => {
      logoEl.style.transition = 'opacity 1.6s cubic-bezier(0.4, 0, 0.2, 1), transform 1.6s cubic-bezier(0.4, 0, 0.2, 1), filter 1.6s ease-in';
      logoEl.style.opacity = '0';
      logoEl.style.transform = 'scale(1.08)';
      logoEl.style.filter = 'blur(6px)';
    }, 3700);

    setTimeout(finishIntro, 5400);
  }
}
