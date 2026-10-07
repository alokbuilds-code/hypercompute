/**
 * NVIDIA — BEYOND ACCELERATION
 * Accessibility & Keyboard Trap Utilities
 */

export function initAccessibility() {
  // Trap focus inside modal when open
  const modal = document.getElementById('search-modal');
  if (modal) {
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const focusableEls = modal.querySelectorAll('input, button, a[href], [tabindex]:not([tabindex="-1"])');
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastEl) {
          firstEl.focus();
          e.preventDefault();
        }
      }
    });
  }
}
