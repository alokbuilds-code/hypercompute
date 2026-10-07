/**
 * NVIDIA — BEYOND ACCELERATION
 * Navigation & Story Timeline Progress Tracker
 */

export function initNavigation() {
  const header = document.querySelector('.global-header');
  const progressBar = document.getElementById('story-progress-bar');
  const telemetryChapter = document.getElementById('telemetry-chapter-text');
  const navLinks = document.querySelectorAll('.nav-link-item');
  const sections = document.querySelectorAll('.narrative-section[id]');

  // Scroll Progress Calculator
  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    if (header) {
      if (scrollTop > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active Chapter Observer
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const title = entry.target.getAttribute('data-chapter-title') || id.toUpperCase();
          const num = entry.target.getAttribute('data-chapter-num') || '01';

          if (telemetryChapter) {
            telemetryChapter.textContent = `CH ${num} / ${title}`;
          }

          navLinks.forEach((linkItem) => {
            const anchor = linkItem.querySelector('a');
            if (anchor && anchor.getAttribute('href') === `#${id}`) {
              linkItem.classList.add('active');
            } else {
              linkItem.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach((sec) => observer.observe(sec));
  }

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
