/**
 * Personal Page & Live Clock Application
 */

(function () {
  'use strict';

  // --- State & Settings ---
  const state = {
    is24Hour: localStorage.getItem('pref_format_24h') === 'true',
    theme: localStorage.getItem('pref_theme') || 'violet',
    name: localStorage.getItem('user_profile_name') || 'Alex Morgan',
    tagline: localStorage.getItem('user_profile_tagline') || 'Creative Developer • Problem Solver'
  };

  // --- DOM Elements ---
  const el = {
    // Clock
    hours: document.getElementById('clockHours'),
    minutes: document.getElementById('clockMinutes'),
    seconds: document.getElementById('clockSeconds'),
    period: document.getElementById('clockPeriod'),
    formatToggle: document.getElementById('formatToggle'),
    formatLabel: document.getElementById('formatLabel'),
    secondsBar: document.getElementById('secondsBar'),
    dateFull: document.getElementById('dateFull'),
    timezoneText: document.getElementById('timezoneText'),
    dayPercentText: document.getElementById('dayPercentText'),
    dayProgressBar: document.getElementById('dayProgressBar'),

    // Stats
    weekNum: document.getElementById('weekNum'),
    dayOfYear: document.getElementById('dayOfYear'),
    focusStatus: document.getElementById('focusStatus'),
    footerYear: document.getElementById('footerYear'),

    // Profile & Identity
    userName: document.getElementById('userName'),
    editNameBtn: document.getElementById('editNameBtn'),
    userTagline: document.getElementById('userTagline'),
    avatarInitials: document.getElementById('avatarInitials'),
    greetingIcon: document.getElementById('greetingIcon'),
    greetingText: document.getElementById('greetingText'),

    // Interactive & Controls
    themePicker: document.getElementById('themePicker'),
    themeDots: document.querySelectorAll('.theme-dot'),
    copyEmailBtn: document.getElementById('copyEmailBtn'),
    copyEmailText: document.getElementById('copyEmailText'),
    toast: document.getElementById('toast'),
    toastText: document.getElementById('toastText')
  };

  // --- Helper: Pad with zeros ---
  function pad(num) {
    return num.toString().padStart(2, '0');
  }

  // --- Update Avatar Initials ---
  function updateAvatarInitials(name) {
    if (!name || !name.trim()) {
      el.avatarInitials.textContent = '✦';
      return;
    }
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      el.avatarInitials.textContent = parts[0].substring(0, 2).toUpperCase();
    } else {
      el.avatarInitials.textContent = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
  }

  // --- Time & Calendar Calculations ---
  function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }

  function getGreeting(hour) {
    if (hour >= 5 && hour < 12) {
      return { text: 'Good morning', icon: '🌅', focus: 'Deep Focus' };
    } else if (hour >= 12 && hour < 17) {
      return { text: 'Good afternoon', icon: '☀️', focus: 'Collaboration' };
    } else if (hour >= 17 && hour < 22) {
      return { text: 'Good evening', icon: '🌆', focus: 'Creative Flow' };
    } else {
      return { text: 'Good night', icon: '🌙', focus: 'Rest & Recharge' };
    }
  }

  // --- Core Clock Update Engine ---
  function updateClock() {
    const now = new Date();
    const rawHours = now.getHours();
    const rawMinutes = now.getMinutes();
    const rawSeconds = now.getSeconds();
    const rawMillis = now.getMilliseconds();

    // 12h vs 24h formatting
    let displayHours = rawHours;
    let periodText = '';

    if (state.is24Hour) {
      el.period.style.display = 'none';
    } else {
      el.period.style.display = 'inline-block';
      periodText = rawHours >= 12 ? 'PM' : 'AM';
      displayHours = rawHours % 12;
      displayHours = displayHours === 0 ? 12 : displayHours;
    }

    el.hours.textContent = pad(displayHours);
    el.minutes.textContent = pad(rawMinutes);
    el.seconds.textContent = pad(rawSeconds);
    el.period.textContent = periodText;

    // Smooth seconds progress bar:
    const secondsProgress = ((rawSeconds + rawMillis / 1000) / 60) * 100;
    el.secondsBar.style.width = `${secondsProgress.toFixed(1)}%`;

    // Day journey progress
    const totalSecondsToday = rawHours * 3600 + rawMinutes * 60 + rawSeconds;
    const dayPercent = (totalSecondsToday / 86400) * 100;
    el.dayPercentText.textContent = `${dayPercent.toFixed(1)}%`;
    el.dayProgressBar.style.width = `${dayPercent.toFixed(1)}%`;

    // Dynamic Greeting
    const greeting = getGreeting(rawHours);
    el.greetingIcon.textContent = greeting.icon;
    el.greetingText.textContent = greeting.text;
    el.focusStatus.textContent = greeting.focus;
  }

  // --- Static/Periodic Date Info Update ---
  function updateDateInfo() {
    const now = new Date();

    // Full localized date: e.g. "Wednesday, September 16, 2026"
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    el.dateFull.textContent = now.toLocaleDateString(undefined, options);

    // Timezone string
    const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';
    const offsetMinutes = -now.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const offsetRemMin = Math.abs(offsetMinutes) % 60;
    const offsetSign = offsetMinutes >= 0 ? '+' : '-';
    const offsetStr = `UTC${offsetSign}${offsetHours}${offsetRemMin > 0 ? ':' + pad(offsetRemMin) : ''}`;
    el.timezoneText.textContent = `${offsetStr} • ${tzName}`;

    // Stats
    el.dayOfYear.textContent = `Day ${getDayOfYear(now)}`;
    el.weekNum.textContent = `Week ${getWeekNumber(now)}`;
    if (el.footerYear) {
      el.footerYear.textContent = now.getFullYear();
    }
  }

  // --- Toast Notification ---
  let toastTimer = null;
  function showToast(message) {
    el.toastText.textContent = message;
    el.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.toast.classList.remove('show');
    }, 2500);
  }

  // --- Theme Controller ---
  function applyTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    state.theme = themeName;
    localStorage.setItem('pref_theme', themeName);

    el.themeDots.forEach(dot => {
      dot.classList.toggle('active', dot.dataset.color === themeName);
    });
  }

  // --- Format Toggle (12h / 24h) ---
  function toggleFormat() {
    state.is24Hour = !state.is24Hour;
    localStorage.setItem('pref_format_24h', state.is24Hour);
    el.formatLabel.textContent = state.is24Hour ? '24H' : '12H';
    updateClock();
    showToast(`Time format: ${state.is24Hour ? '24-hour' : '12-hour'} mode`);
  }

  // --- Event Listeners Setup ---
  function setupEvents() {
    // 12/24h toggle
    el.formatToggle.addEventListener('click', toggleFormat);

    // Theme dots
    el.themeDots.forEach(dot => {
      dot.addEventListener('click', () => {
        applyTheme(dot.dataset.color);
        showToast(`Theme switched to ${dot.dataset.color.toUpperCase()}`);
      });
    });

    // Editable Name
    el.userName.addEventListener('blur', () => {
      const cleanName = el.userName.innerText.trim() || 'Alex Morgan';
      el.userName.innerText = cleanName;
      state.name = cleanName;
      localStorage.setItem('user_profile_name', cleanName);
      updateAvatarInitials(cleanName);
      showToast('Name updated & saved!');
    });

    el.userName.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        el.userName.blur();
      }
    });

    el.editNameBtn.addEventListener('click', () => {
      el.userName.focus();
      // Select text for easy replace
      const range = document.createRange();
      range.selectNodeContents(el.userName);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    });

    // Editable Tagline
    el.userTagline.addEventListener('blur', () => {
      const cleanTagline = el.userTagline.innerText.trim() || 'Creator • Developer • Thinker';
      el.userTagline.innerText = cleanTagline;
      state.tagline = cleanTagline;
      localStorage.setItem('user_profile_tagline', cleanTagline);
      showToast('Tagline saved!');
    });

    el.userTagline.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        el.userTagline.blur();
      }
    });

    // Copy Contact button
    el.copyEmailBtn.addEventListener('click', () => {
      const contactInfo = `${state.name} <hello@example.com>`;
      navigator.clipboard?.writeText(contactInfo).then(() => {
        showToast('Contact info copied to clipboard!');
      }).catch(() => {
        showToast('Contact: hello@example.com');
      });
    });
  }

  // --- Initialization ---
  function init() {
    // Apply saved state
    applyTheme(state.theme);
    el.formatLabel.textContent = state.is24Hour ? '24H' : '12H';
    el.userName.innerText = state.name;
    el.userTagline.innerText = state.tagline;
    updateAvatarInitials(state.name);

    // Initial render
    updateDateInfo();
    updateClock();

    // High frequency update for real-time smoothness
    setInterval(updateClock, 100);

    // Update date / stats every minute
    setInterval(updateDateInfo, 60000);

    setupEvents();
  }

  // Boot on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
