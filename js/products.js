/**
 * NVIDIA — BEYOND ACCELERATION
 * Product Journey & Interactive Ray Tracing Demonstrator
 */

export function initProducts() {
  // Pinned Product Scrub Navigation (Click or Keyboard Fallback)
  const productItems = document.querySelectorAll('.product-pinned-item');
  const scrubTrack = document.querySelector('.scrub-track');
  const scrubFill = document.querySelector('.scrub-fill');
  const scrubText = document.querySelector('.product-scrub-text');

  let currentProductIndex = 0;
  const total = productItems.length;

  function switchProduct(idx) {
    if (idx < 0 || idx >= total) return;
    currentProductIndex = idx;

    productItems.forEach((p, i) => {
      if (i === idx) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    if (scrubFill) {
      const pct = Math.round(((idx + 1) / total) * 100);
      scrubFill.style.width = `${pct}%`;
    }

    if (scrubText) {
      scrubText.textContent = `0${idx + 1} / 0${total}`;
    }
  }

  if (scrubTrack) {
    scrubTrack.style.cursor = 'pointer';
    scrubTrack.addEventListener('click', (e) => {
      const rect = scrubTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = clickX / rect.width;
      const targetIdx = Math.min(total - 1, Math.max(0, Math.floor(pct * total)));
      switchProduct(targetIdx);
    });
  }

  // Ray Tracing Comparison Toggle
  const rtButtons = document.querySelectorAll('.rt-mode-btn');
  const rtRasterView = document.getElementById('rt-view-raster');
  const rtPathView = document.getElementById('rt-view-pathtracing');
  const rtStatusText = document.getElementById('rt-status-annotation');

  if (rtButtons.length > 0 && rtRasterView && rtPathView) {
    rtButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-rt-mode');

        rtButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (mode === 'raster') {
          rtRasterView.style.display = 'flex';
          rtPathView.style.display = 'none';
          if (rtStatusText) {
            rtStatusText.textContent = 'TRADITIONAL RASTERIZATION: Screen-space approximations, baked shadow maps, flat specular highlights without secondary bounces.';
          }
        } else {
          rtRasterView.style.display = 'none';
          rtPathView.style.display = 'flex';
          if (rtStatusText) {
            rtStatusText.textContent = 'FULL NEURAL PATH TRACING: Real-time physically accurate multi-bounce photon tracing, DLSS 3.5 Ray Reconstruction, infinite reflections.';
          }
        }
      });
    });
  }
}
