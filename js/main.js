/**
 * NVIDIA — BEYOND ACCELERATION
 * Main Application Orchestrator
 */

import { initIntro } from './intro.js';
import { initNavigation } from './navigation.js';
import { initProducts } from './products.js';
import { initSearch } from './search.js';
import { initAnimations } from './animations.js';
import { initAccessibility } from './accessibility.js';

document.addEventListener('DOMContentLoaded', () => {
  initIntro();
  initNavigation();
  initProducts();
  initSearch();
  initAnimations();
  initAccessibility();
  console.log('NVIDIA — Beyond Acceleration: Documentary Experience Initialized.');
});
