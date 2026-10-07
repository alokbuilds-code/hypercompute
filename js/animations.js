/**
 * NVIDIA — BEYOND ACCELERATION
 * Hard Scroll Choreography & GSAP ScrollTrigger Motion Engineering
 * 
 * Distinct Motion Personalities:
 * - Jensen: SLOW + CINEMATIC
 * - People: DOCUMENTARY + LAYERED
 * - Offices: ARCHITECTURAL + PARALLAX
 * - Hardware: TECHNICAL + PRECISE
 * - Products: PINNED + TRANSFORMATIONAL
 * - AI: MONUMENTAL + SCALE
 * - Gaming: FAST + CONTROLLED
 * - Robotics: MECHANICAL + STRUCTURED
 */

export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Standard Fallback for basic elements
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (prefersReducedMotion || !window.gsap || !window.ScrollTrigger) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    document.querySelectorAll('.quote-line').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Register GSAP ScrollTrigger
  window.gsap.registerPlugin(window.ScrollTrigger);

  // =========================================================================
  // 00 — DOCUMENTARY HERO: MONUMENTAL SCALE & CONTINUOUS TRANSITION
  // =========================================================================
  const heroSection = document.getElementById('prologue');
  const heroHeadline = document.querySelector('#prologue .monumental-heading');
  const heroLines = document.querySelectorAll('.hero-title-line');
  const heroLead = document.querySelector('.hero-lead-text');
  const heroSilicon = document.querySelector('.hero-silicon-showcase');

  if (heroSection && heroHeadline) {
    // Entrance animation upon introCompleted event or instant if intro was already done
    const playHeroEntrance = () => {
      window.gsap.fromTo(heroLines, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out' }
      );
      if (heroLead) {
        window.gsap.fromTo(heroLead, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, delay: 0.4, ease: 'power2.out' }
        );
      }
      if (heroSilicon) {
        window.gsap.fromTo(heroSilicon, 
          { scale: 0.94, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, delay: 0.3, ease: 'power2.out' }
        );
      }
    };

    window.addEventListener('introCompleted', playHeroEntrance);
    if (!document.body.classList.contains('intro-active')) {
      playHeroEntrance();
    }

    // Scroll choreography on Hero
    const heroTl = window.gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8
      }
    });

    // Headline scales slightly and shifts with depth
    heroTl.to(heroHeadline, {
      scale: 1.04,
      yPercent: -18,
      ease: 'none'
    }, 0);

    // Silicon showcase moves with independent depth parallax
    if (heroSilicon) {
      heroTl.to(heroSilicon, {
        yPercent: -28,
        scale: 0.96,
        ease: 'none'
      }, 0);
    }
  }

  // =========================================================================
  // 01 — JENSEN HUANG: SLOW + CINEMATIC
  // =========================================================================
  const jensenSection = document.getElementById('jensen-vision');
  const jensenImg = document.querySelector('.jensen-portrait-img');
  const jensenStage = document.querySelector('.jensen-portrait-stage');
  const quoteLines = document.querySelectorAll('.quote-line');
  const jensenBadge = document.querySelector('.portrait-badge-overlay');

  if (jensenSection && jensenImg) {
    // Initial State: starts large & clipped
    window.gsap.set(jensenImg, {
      scale: 1.3,
      transformOrigin: 'center 25%'
    });

    const jensenTl = window.gsap.timeline({
      scrollTrigger: {
        trigger: jensenSection,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 1
      }
    });

    // Image slowly scales into composition
    jensenTl.to(jensenImg, {
      scale: 1.0,
      ease: 'power1.out',
      duration: 2
    });

    // Badge slides into position
    if (jensenBadge) {
      jensenTl.from(jensenBadge, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=1.2');
    }

    // Editorial statement appears line-by-line
    if (quoteLines.length > 0) {
      jensenTl.to(quoteLines, {
        opacity: 1,
        y: 0,
        stagger: 0.6,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=1.5');
    }

    // Horizontal shift towards end of scroll
    jensenTl.to(jensenImg, {
      xPercent: -4,
      duration: 1,
      ease: 'none'
    });
  }

  // =========================================================================
  // 02 — PEOPLE & CULTURE: DOCUMENTARY + LAYERED PINNED SEQUENCE
  // =========================================================================
  const peopleSection = document.getElementById('people-culture-pinned');
  const layer1 = document.querySelector('.people-image-layer--01');
  const layer2 = document.querySelector('.people-image-layer--02');
  const layer3 = document.querySelector('.people-image-layer--03');
  const disciplineTags = document.querySelectorAll('.discipline-tag-item');

  if (peopleSection && layer1 && layer2 && layer3) {
    const peopleTl = window.gsap.timeline({
      scrollTrigger: {
        trigger: peopleSection,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1
      }
    });

    // Layer 1 expands
    peopleTl.to(layer1, {
      scale: 1.08,
      duration: 1.5,
      ease: 'power1.inOut'
    });

    // Tag 1 (ENGINEERING) -> Tag 2 (AI RESEARCH)
    peopleTl.call(() => setActiveDiscipline(0), null, 0.2);
    peopleTl.call(() => setActiveDiscipline(1), null, 1.2);

    // Layer 2 wipes in / overlaps Layer 1 with diagonal clip-path
    peopleTl.to(layer2, {
      opacity: 1,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 2,
      ease: 'power2.inOut'
    });

    // Tag 3 (SOFTWARE) -> Tag 4 (HARDWARE)
    peopleTl.call(() => setActiveDiscipline(2), null, 2.0);
    peopleTl.call(() => setActiveDiscipline(3), null, 2.8);

    // Layer 3 slides in horizontally
    peopleTl.to(layer3, {
      opacity: 1,
      xPercent: 0,
      duration: 2,
      ease: 'power2.out'
    });

    // Tag 5 (ROBOTICS)
    peopleTl.call(() => setActiveDiscipline(4), null, 3.8);

    function setActiveDiscipline(idx) {
      disciplineTags.forEach((t, i) => {
        if (i === idx) t.classList.add('active');
        else t.classList.remove('active');
      });
    }
  }

  // =========================================================================
  // 03 — OFFICES: ARCHITECTURAL + PARALLAX
  // =========================================================================
  const officeSection = document.getElementById('headquarters');
  const officeImg = document.querySelector('.architecture-panorama-img');
  const blueprintGrid = document.querySelector('.architectural-blueprint-overlay');
  const panoramaPlate = document.querySelector('.panorama-caption-plate');

  if (officeSection && officeImg) {
    const officeTl = window.gsap.timeline({
      scrollTrigger: {
        trigger: officeSection,
        start: 'top 70%',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Image zooms slowly
    officeTl.to(officeImg, {
      scale: 1.2,
      yPercent: 8,
      ease: 'none'
    });

    // Blueprint grid opacity increases
    if (blueprintGrid) {
      officeTl.to(blueprintGrid, {
        opacity: 0.9,
        ease: 'none'
      }, 0);
    }

    // Caption plate parallax
    if (panoramaPlate) {
      officeTl.to(panoramaPlate, {
        yPercent: -15,
        ease: 'none'
      }, 0);
    }
  }

  // =========================================================================
  // 04 — HARD PROGRESSION: FROM PEOPLE TO HARDWARE (TECHNICAL + PRECISE)
  // =========================================================================
  const progressionSection = document.getElementById('tech-progression-pinned');
  const stepCards = document.querySelectorAll('.progression-step-card');
  const stepPills = document.querySelectorAll('.step-indicator-pill');

  if (progressionSection && stepCards.length > 0) {
    const progTl = window.gsap.timeline({
      scrollTrigger: {
        trigger: progressionSection,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 0.8
      }
    });

    stepCards.forEach((card, index) => {
      if (index === 0) return; // First card starts active

      progTl.to(stepCards[index - 1], {
        opacity: 0,
        scale: 0.9,
        y: -40,
        duration: 1,
        ease: 'power2.inOut'
      });

      progTl.to(card, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.4');

      progTl.call(() => {
        stepPills.forEach((p, i) => {
          if (i === index) p.classList.add('active');
          else p.classList.remove('active');
        });
      }, null, index);
    });
  }

  // =========================================================================
  // 05 — PRODUCTS: PINNED & TRANSFORMATIONAL SHOWCASE
  // =========================================================================
  const productsSection = document.getElementById('pinned-products');
  const productItems = document.querySelectorAll('.product-pinned-item');
  const scrubFill = document.querySelector('.scrub-fill');
  const scrubText = document.querySelector('.product-scrub-text');

  if (productsSection && productItems.length > 0) {
    const totalProducts = productItems.length;

    const prodTl = window.gsap.timeline({
      scrollTrigger: {
        trigger: productsSection,
        start: 'top top',
        end: `+=${totalProducts * 100}%`,
        pin: true,
        scrub: 0.5
      }
    });

    productItems.forEach((item, idx) => {
      if (idx === 0) {
        // Initial product active
        item.classList.add('active');
        return;
      }

      // Step transition
      prodTl.call(() => {
        productItems.forEach((p, i) => {
          if (i === idx) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });

        // Update progress track
        if (scrubFill) {
          const pct = Math.round(((idx + 1) / totalProducts) * 100);
          scrubFill.style.width = `${pct}%`;
        }
        if (scrubText) {
          scrubText.textContent = `0${idx + 1} / 0${totalProducts}`;
        }
      }, null, idx);

      // Spacer between product scroll steps
      prodTl.to({}, { duration: 1.2 });
    });
  }

  // =========================================================================
  // 06 — AI & DATA CENTER: MONUMENTAL + SCALE
  // =========================================================================
  const datacenterSection = document.getElementById('datacenter-ai');
  const rackImg = document.querySelector('.datacenter-rack-media img');
  const aiNodes = document.querySelectorAll('.ai-chain-node');
  const datacenterHead = document.querySelector('#datacenter-ai .section-heading-xl');

  if (datacenterSection && rackImg) {
    const aiTl = window.gsap.timeline({
      scrollTrigger: {
        trigger: datacenterSection,
        start: 'top 65%',
        end: 'bottom 20%',
        scrub: 1
      }
    });

    // Massive Rack scales from 0.88 to 1.05
    aiTl.fromTo(rackImg, 
      { scale: 0.88, filter: 'brightness(0.8)' },
      { scale: 1.05, filter: 'brightness(1.05)', ease: 'power2.out', duration: 2 }
    );

    // Headline letter spacing expand
    if (datacenterHead) {
      aiTl.to(datacenterHead, {
        letterSpacing: '0.02em',
        ease: 'none',
        duration: 1.5
      }, 0);
    }

    // Sequence nodes illuminate sequentially
    if (aiNodes.length > 0) {
      aiTl.to(aiNodes, {
        backgroundColor: '#76B900',
        color: '#000000',
        borderColor: '#76B900',
        boxShadow: '0 0 16px rgba(118, 185, 0, 0.4)',
        stagger: 0.4,
        duration: 0.8,
        ease: 'power2.out'
      }, 0.5);
    }
  }

  // =========================================================================
  // 07 — GAMING: FAST + CONTROLLED
  // =========================================================================
  const gamingSection = document.getElementById('gaming-rtx');
  const gamingImg = document.querySelector('#tab-rtx img');

  if (gamingSection) {
    window.gsap.from(gamingSection.querySelector('.raytracing-interactive-box'), {
      scrollTrigger: {
        trigger: gamingSection,
        start: 'top 75%'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  // =========================================================================
  // 08 — ROBOTICS: MECHANICAL + STRUCTURED
  // =========================================================================
  const roboticsSection = document.getElementById('physical-ai');
  const triadCards = document.querySelectorAll('.triad-card');

  if (roboticsSection && triadCards.length > 0) {
    window.gsap.from(triadCards, {
      scrollTrigger: {
        trigger: roboticsSection,
        start: 'top 70%'
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.9,
      ease: 'power2.out'
    });
  }
}
