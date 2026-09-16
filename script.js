/**
 * Personal Web Dashboard & Precision Timekeeper
 * Architecture: Clean Vanilla JS, Reactive State, LocalStorage Persistence
 */

// Default Profile State
const DEFAULT_PROFILE = {
  name: "Yu Ya Ting",
  title: "Software Engineer & Creative Technologist",
  bio: "Building elegant web interfaces, scalable systems, and thoughtful digital experiences.",
  email: "yating.yu@example.com"
};

// Global App State
const state = {
  is24Hour: localStorage.getItem('personal_web_format') !== '12h', // default to 24h
  theme: localStorage.getItem('personal_web_theme') || 'aurora',
  profile: (() => {
    try {
      const saved = JSON.parse(localStorage.getItem('personal_web_profile'));
      if (saved && saved.name && saved.name !== "Alex Vance" && saved.name !== "Jane Doe") {
        return saved;
      }
    } catch (e) {}
    return DEFAULT_PROFILE;
  })()
};

// DOM Elements Cache
const elements = {
  // Navigation & Controls
  body: document.body,
  formatToggle: document.getElementById('format-toggle'),
  formatLabel: document.getElementById('format-label'),
  themeBtn: document.getElementById('theme-btn'),
  themeMenu: document.getElementById('theme-menu'),
  themeOptions: document.querySelectorAll('.theme-opt'),
  editProfileBtn: document.getElementById('edit-profile-btn'),
  brandMonogram: document.getElementById('brand-monogram'),

  // Profile
  displayName: document.getElementById('display-name'),
  displayTitle: document.getElementById('display-title'),
  displayBio: document.getElementById('display-bio'),
  avatarInitials: document.getElementById('avatar-initials'),
  quickEditNameBtn: document.getElementById('quick-edit-name-btn'),
  greetingPrefix: document.getElementById('greeting-prefix'),
  daytimePill: document.getElementById('daytime-pill'),
  daytimeIcon: document.getElementById('daytime-icon'),
  daytimeLabel: document.getElementById('daytime-label'),

  // Master Clock
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
  ampm: document.getElementById('ampm'),
  ampmContainer: document.getElementById('ampm-container'),
  formatPill: document.getElementById('format-pill'),
  tzName: document.getElementById('tz-name'),
  fullDate: document.getElementById('full-date'),

  // Day Progress
  dayProgressPct: document.getElementById('day-progress-pct'),
  dayProgressFill: document.getElementById('day-progress-fill'),
  dayProgressDetail: document.getElementById('day-progress-detail'),

  // World Clocks
  timeNy: document.getElementById('time-ny'),
  timeLon: document.getElementById('time-lon'),
  timeTyo: document.getElementById('time-tyo'),
  timeSyd: document.getElementById('time-syd'),

  // Metrics
  statDayYear: document.getElementById('stat-day-year'),
  statWeekYear: document.getElementById('stat-week-year'),
  statYearPct: document.getElementById('stat-year-pct'),
  currentYear: document.getElementById('current-year'),
  footerYear: document.getElementById('footer-year'),

  // Connect & Actions
  copyEmailBtn: document.getElementById('copy-email-btn'),
  copyEmailLabel: document.getElementById('copy-email-label'),

  // Modal
  customModal: document.getElementById('custom-modal'),
  closeModalBtn: document.getElementById('close-modal-btn'),
  cancelModalBtn: document.getElementById('cancel-modal-btn'),
  profileForm: document.getElementById('profile-form'),
  inputName: document.getElementById('input-name'),
  inputTitle: document.getElementById('input-title'),
  inputBio: document.getElementById('input-bio'),
  inputEmail: document.getElementById('input-email'),

  // Toast
  toastContainer: document.getElementById('toast-container')
};

/* ==========================================================================
   Helper Functions
   ========================================================================== */

/** Generate two-letter uppercase initials from full name */
function getInitials(name) {
  if (!name) return "YT";
  const trimmed = name.trim();
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    if (trimmed.length <= 3) return trimmed.toUpperCase();
    return trimmed.substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Show temporary toast notification */
function showToast(message, icon = "✨") {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/* ==========================================================================
   Profile Management
   ========================================================================== */

function renderProfile() {
  const { profile } = state;
  elements.displayName.textContent = profile.name || "Your Name";
  elements.displayTitle.textContent = profile.title || "Developer & Creator";
  elements.displayBio.textContent = profile.bio || "Crafting digital experiences.";
  
  const initials = getInitials(profile.name);
  elements.avatarInitials.textContent = initials;
  elements.brandMonogram.textContent = initials;

  if (elements.copyEmailBtn) {
    elements.copyEmailBtn.setAttribute('data-email', profile.email || "hello@example.com");
  }
}

function openProfileModal() {
  elements.inputName.value = state.profile.name || "";
  elements.inputTitle.value = state.profile.title || "";
  elements.inputBio.value = state.profile.bio || "";
  elements.inputEmail.value = state.profile.email || "";

  elements.customModal.showModal();
  elements.inputName.focus();
}

function closeProfileModal() {
  elements.customModal.close();
}

function handleProfileSave(e) {
  e.preventDefault();
  const updatedProfile = {
    name: elements.inputName.value.trim() || DEFAULT_PROFILE.name,
    title: elements.inputTitle.value.trim() || DEFAULT_PROFILE.title,
    bio: elements.inputBio.value.trim() || DEFAULT_PROFILE.bio,
    email: elements.inputEmail.value.trim() || DEFAULT_PROFILE.email
  };

  state.profile = updatedProfile;
  localStorage.setItem('personal_web_profile', JSON.stringify(updatedProfile));
  
  renderProfile();
  closeProfileModal();
  showToast("Profile updated successfully!", "🚀");
}

/* ==========================================================================
   Theme Management
   ========================================================================== */

function setTheme(newTheme) {
  state.theme = newTheme;
  elements.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('personal_web_theme', newTheme);

  elements.themeOptions.forEach(opt => {
    if (opt.dataset.theme === newTheme) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });
}

function toggleThemeMenu(e) {
  e.stopPropagation();
  const isExpanded = elements.themeMenu.classList.contains('show');
  if (isExpanded) {
    elements.themeMenu.classList.remove('show');
    elements.themeBtn.setAttribute('aria-expanded', 'false');
  } else {
    elements.themeMenu.classList.add('show');
    elements.themeBtn.setAttribute('aria-expanded', 'true');
  }
}

/* ==========================================================================
   Precision Clock Engine
   ========================================================================== */

function updateClock() {
  const now = new Date();

  // Local hours, minutes, seconds
  const rawHours = now.getHours();
  const rawMinutes = now.getMinutes();
  const rawSeconds = now.getSeconds();

  // Format 12H vs 24H
  let displayHours = rawHours;
  let ampmStr = "AM";

  if (!state.is24Hour) {
    ampmStr = rawHours >= 12 ? "PM" : "AM";
    displayHours = rawHours % 12;
    displayHours = displayHours ? displayHours : 12; // '0' should be '12'
    elements.ampmContainer.style.display = "block";
    elements.ampm.textContent = ampmStr;
  } else {
    elements.ampmContainer.style.display = "none";
  }

  // Two-digit padding
  elements.hours.textContent = String(displayHours).padStart(2, '0');
  elements.minutes.textContent = String(rawMinutes).padStart(2, '0');
  elements.seconds.textContent = String(rawSeconds).padStart(2, '0');

  // Greeting & Daytime Indicator
  updateGreeting(rawHours);

  // Full Date String
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  elements.fullDate.textContent = now.toLocaleDateString(undefined, dateOptions);

  // Day Progress Calculation
  const secondsElapsed = (rawHours * 3600) + (rawMinutes * 60) + rawSeconds;
  const dayProgress = (secondsElapsed / 86400) * 100;
  elements.dayProgressFill.style.width = `${dayProgress.toFixed(1)}%`;
  elements.dayProgressPct.textContent = `${dayProgress.toFixed(1)}%`;

  const hoursRemaining = (23 - rawHours);
  const minutesRemaining = (59 - rawMinutes);
  elements.dayProgressDetail.textContent = `${hoursRemaining}h ${minutesRemaining}m remaining in today`;

  // World Clocks
  updateWorldClocks(now);
}

function updateGreeting(hours) {
  let greeting = "Good evening, I'm";
  let icon = "✨";
  let label = "Evening";

  if (hours >= 5 && hours < 12) {
    greeting = "Good morning, I'm";
    icon = "☀️";
    label = "Morning";
  } else if (hours >= 12 && hours < 17) {
    greeting = "Good afternoon, I'm";
    icon = "🌤️";
    label = "Afternoon";
  } else if (hours >= 17 && hours < 22) {
    greeting = "Good evening, I'm";
    icon = "🌙";
    label = "Evening";
  } else {
    greeting = "Good night, I'm";
    icon = "🌌";
    label = "Night";
  }

  elements.greetingPrefix.textContent = greeting;
  elements.daytimeIcon.textContent = icon;
  elements.daytimeLabel.textContent = label;
}

function updateWorldClocks(now) {
  const formatCityTime = (timeZone) => {
    try {
      const options = {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: !state.is24Hour
      };
      return new Intl.DateTimeFormat('en-US', options).format(now);
    } catch {
      return "--:--";
    }
  };

  elements.timeNy.textContent = formatCityTime('America/New_York');
  elements.timeLon.textContent = formatCityTime('Europe/London');
  elements.timeTyo.textContent = formatCityTime('Asia/Tokyo');
  elements.timeSyd.textContent = formatCityTime('Australia/Sydney');
}

function updateCalendarMetrics() {
  const now = new Date();
  const year = now.getFullYear();

  elements.currentYear.textContent = year;
  elements.footerYear.textContent = year;

  // Day of Year
  const startOfYear = new Date(year, 0, 1);
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay) + 1;
  elements.statDayYear.textContent = dayOfYear;

  // Week of Year
  const weekNumber = Math.ceil((((now - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);
  elements.statWeekYear.textContent = weekNumber;

  // Year Progress Percentage
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const totalDays = isLeapYear ? 366 : 365;
  const yearPct = Math.min(100, Math.round((dayOfYear / totalDays) * 100));
  elements.statYearPct.textContent = `${yearPct}%`;

  // Local Timezone Offset
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offsetMinutes = -now.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const sign = offsetMinutes >= 0 ? '+' : '-';
    elements.tzName.textContent = `${tz} (UTC${sign}${offsetHours})`;
  } catch {
    elements.tzName.textContent = "Local Time";
  }
}

/* ==========================================================================
   Event Listeners & Initialization
   ========================================================================== */

function setupEventListeners() {
  // 12H / 24H Toggle
  elements.formatToggle.addEventListener('click', () => {
    state.is24Hour = !state.is24Hour;
    localStorage.setItem('personal_web_format', state.is24Hour ? '24h' : '12h');
    elements.formatLabel.textContent = state.is24Hour ? '24H' : '12H';
    elements.formatPill.textContent = state.is24Hour ? '24-HOUR MODE' : '12-HOUR MODE';
    updateClock();
    showToast(`Switched to ${state.is24Hour ? '24-hour' : '12-hour'} format`, "⏱️");
  });

  // Theme Dropdown Toggle
  elements.themeBtn.addEventListener('click', toggleThemeMenu);

  // Theme Options
  elements.themeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      setTheme(opt.dataset.theme);
      elements.themeMenu.classList.remove('show');
      elements.themeBtn.setAttribute('aria-expanded', 'false');
      showToast(`Applied ${opt.dataset.theme.toUpperCase()} theme`, "🎨");
    });
  });

  // Dismiss theme dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!elements.themeBtn.contains(e.target) && !elements.themeMenu.contains(e.target)) {
      elements.themeMenu.classList.remove('show');
      elements.themeBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Profile Customization Modal
  elements.editProfileBtn.addEventListener('click', openProfileModal);
  elements.quickEditNameBtn.addEventListener('click', openProfileModal);
  elements.displayName.addEventListener('click', openProfileModal);

  elements.closeModalBtn.addEventListener('click', closeProfileModal);
  elements.cancelModalBtn.addEventListener('click', closeProfileModal);
  elements.profileForm.addEventListener('submit', handleProfileSave);

  // Close modal when clicking backdrop
  elements.customModal.addEventListener('click', (e) => {
    const rect = elements.customModal.getBoundingClientRect();
    const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      closeProfileModal();
    }
  });

  // Copy Email Button
  elements.copyEmailBtn.addEventListener('click', async () => {
    const emailToCopy = elements.copyEmailBtn.getAttribute('data-email') || state.profile.email;
    try {
      await navigator.clipboard.writeText(emailToCopy);
      elements.copyEmailLabel.textContent = "Email Copied! ✓";
      elements.copyEmailBtn.classList.add('copied');
      showToast(`Copied ${emailToCopy} to clipboard!`, "📋");

      setTimeout(() => {
        elements.copyEmailLabel.textContent = "Copy Email";
        elements.copyEmailBtn.classList.remove('copied');
      }, 2500);
    } catch {
      showToast(`Email: ${emailToCopy}`, "✉️");
    }
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.customModal.open) {
      closeProfileModal();
    }
  });
}

// Initialization
function init() {
  setTheme(state.theme);
  elements.formatLabel.textContent = state.is24Hour ? '24H' : '12H';
  elements.formatPill.textContent = state.is24Hour ? '24-HOUR MODE' : '12-HOUR MODE';
  
  renderProfile();
  updateCalendarMetrics();
  updateClock();

  // Run precision clock loop every 250ms for razor-sharp second transitions
  setInterval(updateClock, 250);

  setupEventListeners();
}

// Boot on DOM ready
document.addEventListener('DOMContentLoaded', init);
