/**
 * NVIDIA — BEYOND ACCELERATION
 * Command Palette & Narrative Search Index
 */

const SEARCH_INDEX = [
  { title: "Jensen Huang & The Vision", tag: "Chapter 02", url: "#jensen-vision" },
  { title: "The People Behind NVIDIA (Founders & Culture)", tag: "Chapter 03", url: "#people-culture-pinned" },
  { title: "Santa Clara Headquarters (Endeavor & Voyager)", tag: "Chapter 04", url: "#headquarters" },
  { title: "From People to Technology Progression", tag: "Chapter 05", url: "#tech-progression-pinned" },
  { title: "GeForce 256 (1999 — World's First GPU)", tag: "Product / 1999", url: "#pinned-products" },
  { title: "CUDA Parallel Architecture (2006)", tag: "Product / 2006", url: "#pinned-products" },
  { title: "GeForce RTX 4090 & Ada Lovelace", tag: "Gaming / Ada", url: "#gaming-rtx" },
  { title: "Grace CPU Superchip (Arm Neoverse)", tag: "Product / 2020", url: "#pinned-products" },
  { title: "BlueField-3 DPU Infrastructure Processor", tag: "Product / 2022", url: "#pinned-products" },
  { title: "Blackwell B200 Ultra Dual-Die GPU", tag: "Hardware / 208B", url: "#pinned-products" },
  { title: "DGX GB200 NVL72 Liquid-Cooled Rack", tag: "AI Factory / 130 TB/s", url: "#datacenter-ai" },
  { title: "DRIVE Thor Centralized AV Superchip", tag: "Automotive / 2000 TFLOPS", url: "#physical-ai" },
  { title: "Omniverse Digital Twins & Isaac Sim", tag: "Physical AI / OpenUSD", url: "#physical-ai" },
  { title: "CUDA-Q Hybrid Quantum-Classical Computing", tag: "Research / Quantum", url: "#quantum-research" }
];

export function initSearch() {
  const modal = document.getElementById('search-modal');
  const triggerBtn = document.getElementById('search-trigger-btn');
  const closeBtn = document.getElementById('search-close-btn');
  const inputField = document.getElementById('search-query-field');
  const resultsList = document.getElementById('search-results-list');

  if (!modal || !inputField || !resultsList) return;

  function openSearch() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    inputField.value = '';
    renderResults(SEARCH_INDEX);
    setTimeout(() => inputField.focus(), 50);
  }

  function closeSearch() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (triggerBtn) triggerBtn.focus();
  }

  function renderResults(items) {
    resultsList.innerHTML = '';
    if (items.length === 0) {
      resultsList.innerHTML = '<li style="padding: 18px 20px; color: #666; font-family: monospace; font-size: 13px;">No matching editorial sections found.</li>';
      return;
    }

    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'search-result-item';
      li.innerHTML = `
        <a href="${item.url}">
          <span>${item.title}</span>
          <span class="search-result-tag">${item.tag}</span>
        </a>
      `;
      li.querySelector('a').addEventListener('click', () => {
        closeSearch();
      });
      resultsList.appendChild(li);
    });
  }

  inputField.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderResults(SEARCH_INDEX);
      return;
    }
    const filtered = SEARCH_INDEX.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.tag.toLowerCase().includes(query)
    );
    renderResults(filtered);
  });

  if (triggerBtn) {
    triggerBtn.addEventListener('click', openSearch);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSearch);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeSearch();
    }
  });
}
