/**
 * Personal Portfolio & Interactive Clock Hub
 * Engineered for Pengjie
 * Pure Vanilla JavaScript (ES6+) - Zero dependencies
 */

// ==========================================================================
// 1. App State & Default Profile Configuration
// ==========================================================================
const DEFAULT_PROFILE = {
  name: '彭絜 (Clairy Peng)',
  role: 'Full-Stack Developer',
  bio: 'Passionate software engineer focused on architecting resilient web applications, intuitive user interfaces, and high-throughput systems. Dedicated to clean code, performance optimization, and continuous learning.',
  email: 'clairypeng@gmail.com',
  avatar: 'assets/avatar.jpg'
};


const AppState = {
  theme: localStorage.getItem('site_theme') || 'dark', // 'dark' | 'cyberpunk' | 'light'
  timeFormat24H: localStorage.getItem('clock_format') !== '12h', // Default 24H
  particlesEnabled: localStorage.getItem('particles_enabled') !== 'false',
  profile: JSON.parse(localStorage.getItem('user_profile') || 'null') || { ...DEFAULT_PROFILE },
  activeSkillFilter: 'all',
  activeProjectFilter: 'all'
};

// Skills Configuration
const SkillsData = [
  // Frontend
  {
    category: 'frontend',
    name: 'JavaScript (ES6+)',
    icon: '⚡',
    level: 'Expert',
    desc: 'Deep mastery of asynchronous patterns, closures, event loop, and modern browser APIs.',
    tags: ['ESNext', 'DOM Engine', 'Web APIs']
  },
  {
    category: 'frontend',
    name: 'TypeScript',
    icon: '📘',
    level: 'Advanced',
    desc: 'Strongly typed architectures, generics, utility types, and strict interface designs.',
    tags: ['Type Safety', 'Interfaces', 'Generics']
  },
  {
    category: 'frontend',
    name: 'React & Next.js',
    icon: '⚛️',
    level: 'Advanced',
    desc: 'Component design, hooks, SSR/SSG rendering, state management, and performance tuning.',
    tags: ['Hooks', 'App Router', 'Server Components']
  },
  {
    category: 'frontend',
    name: 'HTML5 & Modern CSS',
    icon: '🎨',
    level: 'Expert',
    desc: 'Semantic web, responsive layouts, CSS Grid/Flexbox, custom properties, and fluid typography.',
    tags: ['Glassmorphism', 'Animations', 'Mobile First']
  },
  {
    category: 'frontend',
    name: 'Vue.js Ecosystem',
    icon: '💚',
    level: 'Proficient',
    desc: 'Composition API, reactive state management, Pinia, and reactive UI architecture.',
    tags: ['Composition API', 'Pinia', 'Vite']
  },

  // Backend
  {
    category: 'backend',
    name: 'Node.js & Express',
    icon: '🟢',
    level: 'Advanced',
    desc: 'Scalable RESTful microservices, event emitters, stream processing, and middlewares.',
    tags: ['REST APIs', 'Middleware', 'Microservices']
  },
  {
    category: 'backend',
    name: 'Python',
    icon: '🐍',
    level: 'Advanced',
    desc: 'FastAPI, automation scripts, backend services, data modeling, and scripting.',
    tags: ['FastAPI', 'Data Pipelines', 'Automation']
  },
  {
    category: 'backend',
    name: 'PostgreSQL & SQL',
    icon: '🐘',
    level: 'Advanced',
    desc: 'Relational data modeling, schema indexing, ACID transactions, and query optimization.',
    tags: ['Relational DB', 'Indexing', 'ORMs']
  },
  {
    category: 'backend',
    name: 'Redis & Caching',
    icon: '🔴',
    level: 'Proficient',
    desc: 'In-memory key-value caching, pub/sub channels, distributed locks, and session storage.',
    tags: ['In-Memory', 'Pub/Sub', 'Rate Limiting']
  },

  // DevOps & Cloud
  {
    category: 'devops',
    name: 'Docker & Containers',
    icon: '🐳',
    level: 'Advanced',
    desc: 'Containerizing applications, multi-stage builds, compose networks, and lean images.',
    tags: ['Containers', 'Docker Compose', 'Microservices']
  },
  {
    category: 'devops',
    name: 'Git & GitHub Actions',
    icon: '🐙',
    level: 'Expert',
    desc: 'Automated CI/CD pipelines, semantic release workflows, code linting, and branch strategies.',
    tags: ['CI/CD', 'Workflows', 'Version Control']
  },
  {
    category: 'devops',
    name: 'GitHub Pages & Vercel',
    icon: '🚀',
    level: 'Expert',
    desc: 'Zero-configuration static site deployment, custom domains, DNS, and edge CDN distribution.',
    tags: ['Static Hosting', 'Zero-Build', 'Edge CDN']
  },

  // Core & Tools
  {
    category: 'core',
    name: 'Linux & Shell Scripting',
    icon: '🐧',
    level: 'Advanced',
    desc: 'Zsh/Bash scripting, server configuration, system monitoring, and terminal workflows.',
    tags: ['Bash/Zsh', 'SSH', 'CLI Tools']
  },
  {
    category: 'core',
    name: 'Web Performance & SEO',
    icon: '📈',
    level: 'Advanced',
    desc: 'Core Web Vitals, asset minification, lazy loading, accessibility (a11y), and semantic metadata.',
    tags: ['Lighthouse 100', 'CWV', 'Accessibility']
  }
];

// Featured Projects Configuration
const ProjectsData = [
  {
    category: 'tools',
    title: 'Personal Portfolio & Real-Time Clock Hub',
    tag: 'Live Showpiece',
    icon: '⏱️',
    desc: 'Ultra-fast, zero-dependency personal portfolio featuring a live analog/digital timekeeper, timezone visualizer, dark/light/cyberpunk themes, and automated GitHub Pages compatibility.',
    badges: ['HTML5', 'Vanilla CSS', 'ES6+ JS', 'GitHub Pages'],
    demoUrl: '#clock',
    githubUrl: 'https://github.com'
  },
  {
    category: 'fullstack',
    title: 'CloudMetrics Real-Time Dashboard',
    tag: 'Full-Stack',
    icon: '📊',
    desc: 'Interactive infrastructure metrics monitoring platform with live streaming telemetry via WebSockets, configurable health alerts, and responsive glassmorphic charts.',
    badges: ['TypeScript', 'React', 'Node.js', 'WebSocket', 'Tailwind'],
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com'
  },
  {
    category: 'frontend',
    title: 'TaskCraft Kanban Flow Engine',
    tag: 'Productivity Tool',
    icon: '📋',
    desc: 'Lightweight offline-first task management workspace with smooth drag-and-drop mechanics, markdown card notes, keyboard navigation shortcuts, and LocalStorage synchronization.',
    badges: ['JavaScript', 'HTML5 Drag/Drop', 'CSS Grid', 'IndexedDB'],
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com'
  },
  {
    category: 'tools',
    title: 'MicroCore API Gateway Boilerplate',
    tag: 'Developer Tool',
    icon: '🛡️',
    desc: 'Production-ready starter engine for microservices providing automated JWT token validation, rate-limiting, centralized logging, and automatic Swagger OpenAPI documentation.',
    badges: ['Node.js', 'Express', 'Docker', 'Jest', 'OpenAPI'],
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com'
  },
  {
    category: 'fullstack',
    title: 'DevSnippets Code Vault',
    tag: 'Knowledge App',
    icon: '💻',
    desc: 'Searchable developer code snippet repository with syntax highlighting, tag categorization, instant clipboard sharing, and one-click GitHub Gist export integration.',
    badges: ['React', 'Next.js', 'PostgreSQL', 'Prisma'],
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com'
  },
  {
    category: 'frontend',
    title: 'Aura UI Glass Component Kit',
    tag: 'Design System',
    icon: '✨',
    desc: 'A modern, accessible UI kit designed with subtle glassmorphism, dynamic color variables, fluid animations, and zero heavy third-party framework overhead.',
    badges: ['Vanilla CSS', 'Web Components', 'Design System'],
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com'
  }
];

// World Clocks Configuration
const WorldTimezones = [
  { id: 'wc-shanghai', timeZone: 'Asia/Shanghai' },
  { id: 'wc-tokyo', timeZone: 'Asia/Tokyo' },
  { id: 'wc-london', timeZone: 'Europe/London' },
  { id: 'wc-newyork', timeZone: 'America/New_York' },
  { id: 'wc-sf', timeZone: 'America/Los_Angeles' }
];

// ==========================================================================
// 2. Real-Time JavaScript Clock Engine & Timestamp Copy
// ==========================================================================
class RealTimeClock {
  constructor() {
    this.hoursEl = document.getElementById('time-hours');
    this.minutesEl = document.getElementById('time-minutes');
    this.secondsEl = document.getElementById('time-seconds');
    this.ampmEl = document.getElementById('time-ampm');
    this.dateEl = document.getElementById('calendar-date');
    this.workStatusEl = document.getElementById('work-status');
    this.statusTextEl = document.getElementById('status-text');
    this.timezoneTextEl = document.getElementById('clock-timezone-text');
    this.timezoneBadge = document.getElementById('clock-timezone-badge');
    this.navClockEl = document.getElementById('nav-clock-text');
    this.formatToggleBtn = document.getElementById('format-toggle');
    this.formatToggleLabel = document.getElementById('format-toggle-label');

    this.seg24h = document.getElementById('seg-24h');
    this.seg12h = document.getElementById('seg-12h');

    this.handHour = document.getElementById('hand-hour');
    this.handMinute = document.getElementById('hand-minute');
    this.handSecond = document.getElementById('hand-second');

    // Dynamic greeting elements
    this.greetingIcon = document.getElementById('greeting-icon');
    this.greetingText = document.getElementById('greeting-text');

    // Timestamp export elements
    this.valIso = document.getElementById('val-iso');
    this.valEpoch = document.getElementById('val-epoch');
    this.valLocal = document.getElementById('val-local');

    this.init();
  }

  init() {
    this.detectTimezone();
    this.updateToggleControls();
    this.setupEventListeners();
    this.setupTimestampExport();

    // Start tick loop
    this.tick();
    setInterval(() => this.tick(), 1000);
    // Smooth analog hand interpolation
    this.tickAnalogSmooth();
  }

  detectTimezone() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';
      const offsetMinutes = -new Date().getTimezoneOffset();
      const offsetHours = offsetMinutes / 60;
      const offsetSign = offsetHours >= 0 ? '+' : '';
      const offsetStr = `GMT${offsetSign}${offsetHours}`;

      if (this.timezoneTextEl) {
        this.timezoneTextEl.textContent = `${tz} (${offsetStr}) • Live Detected`;
      }
    } catch (e) {
      if (this.timezoneTextEl) {
        this.timezoneTextEl.textContent = 'Local Timezone';
      }
    }
  }

  setupEventListeners() {
    if (this.formatToggleBtn) {
      this.formatToggleBtn.addEventListener('click', () => {
        AppState.timeFormat24H = !AppState.timeFormat24H;
        localStorage.setItem('clock_format', AppState.timeFormat24H ? '24h' : '12h');
        this.updateToggleControls();
        this.tick();
      });
    }

    if (this.seg24h && this.seg12h) {
      this.seg24h.addEventListener('click', () => {
        if (!AppState.timeFormat24H) {
          AppState.timeFormat24H = true;
          localStorage.setItem('clock_format', '24h');
          this.updateToggleControls();
          this.tick();
        }
      });

      this.seg12h.addEventListener('click', () => {
        if (AppState.timeFormat24H) {
          AppState.timeFormat24H = false;
          localStorage.setItem('clock_format', '12h');
          this.updateToggleControls();
          this.tick();
        }
      });
    }

    // Timezone badge click to copy
    if (this.timezoneBadge) {
      this.timezoneBadge.addEventListener('click', () => {
        const text = this.timezoneTextEl ? this.timezoneTextEl.textContent : 'Local Time';
        copyToClipboard(text);
        showToast(`Copied Timezone: ${text}`, '🌍');
      });
    }
  }

  updateToggleControls() {
    if (this.formatToggleLabel) {
      this.formatToggleLabel.textContent = AppState.timeFormat24H ? 'Mode: 24H' : 'Mode: 12H';
    }
    if (this.ampmEl) {
      this.ampmEl.style.display = AppState.timeFormat24H ? 'none' : 'inline-block';
    }
    if (this.seg24h && this.seg12h) {
      this.seg24h.classList.toggle('active', AppState.timeFormat24H);
      this.seg12h.classList.toggle('active', !AppState.timeFormat24H);
    }
  }

  setupTimestampExport() {
    const btnIso = document.getElementById('btn-copy-iso');
    const btnEpoch = document.getElementById('btn-copy-epoch');
    const btnLocal = document.getElementById('btn-copy-local');

    if (btnIso) {
      btnIso.addEventListener('click', () => {
        const iso = new Date().toISOString();
        copyToClipboard(iso);
        showToast(`Copied ISO 8601: ${iso}`, '📋');
      });
    }

    if (btnEpoch) {
      btnEpoch.addEventListener('click', () => {
        const epoch = Math.floor(Date.now() / 1000).toString();
        copyToClipboard(epoch);
        showToast(`Copied Unix Epoch: ${epoch}`, '📋');
      });
    }

    if (btnLocal) {
      btnLocal.addEventListener('click', () => {
        const local = this.formatLocalString(new Date());
        copyToClipboard(local);
        showToast(`Copied Local Timestamp: ${local}`, '📋');
      });
    }
  }

  formatLocalString(d) {
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  tick() {
    const now = new Date();

    const rawHours = now.getHours();
    const rawMinutes = now.getMinutes();
    const rawSeconds = now.getSeconds();

    let displayHours = rawHours;
    let ampm = '';

    if (!AppState.timeFormat24H) {
      ampm = rawHours >= 12 ? 'PM' : 'AM';
      displayHours = rawHours % 12;
      displayHours = displayHours ? displayHours : 12;
    }

    const pad = (n) => String(n).padStart(2, '0');

    // Update digital readout
    if (this.hoursEl) this.hoursEl.textContent = pad(displayHours);
    if (this.minutesEl) this.minutesEl.textContent = pad(rawMinutes);
    if (this.secondsEl) this.secondsEl.textContent = pad(rawSeconds);
    if (this.ampmEl) this.ampmEl.textContent = ampm;

    // Update mini navbar clock
    if (this.navClockEl) {
      this.navClockEl.textContent = `${pad(rawHours)}:${pad(rawMinutes)}:${pad(rawSeconds)}`;
    }

    // Update Date
    if (this.dateEl) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      this.dateEl.textContent = now.toLocaleDateString(undefined, options);
    }

    // Update Dynamic Greeting (Morning/Afternoon/Evening/Night)
    this.updateGreeting(rawHours);

    // Update Work Status
    this.updateWorkStatus(rawHours, now.getDay());

    // Update World Clocks
    this.updateWorldClocks(now);

    // Update Timestamp values
    if (this.valIso) this.valIso.textContent = now.toISOString().slice(11, 19);
    if (this.valEpoch) this.valEpoch.textContent = Math.floor(now.getTime() / 1000);
    if (this.valLocal) this.valLocal.textContent = `${pad(rawHours)}:${pad(rawMinutes)}:${pad(rawSeconds)}`;
  }

  tickAnalogSmooth() {
    const updateHands = () => {
      const now = new Date();
      const ms = now.getMilliseconds();
      const sec = now.getSeconds() + ms / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;

      const secDeg = sec * 6;
      const minDeg = min * 6;
      const hrDeg = hr * 30;

      if (this.handSecond) this.handSecond.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
      if (this.handMinute) this.handMinute.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
      if (this.handHour) this.handHour.style.transform = `translateX(-50%) rotate(${hrDeg}deg)`;

      requestAnimationFrame(updateHands);
    };
    requestAnimationFrame(updateHands);
  }

  updateGreeting(hours) {
    let greeting = 'Good day';
    let icon = '✨';

    if (hours >= 5 && hours < 12) {
      greeting = 'Good morning';
      icon = '🌅';
    } else if (hours >= 12 && hours < 18) {
      greeting = 'Good afternoon';
      icon = '☀️';
    } else if (hours >= 18 && hours < 22) {
      greeting = 'Good evening';
      icon = '🌇';
    } else {
      greeting = 'Good night';
      icon = '🌙';
    }

    if (this.greetingText && this.greetingText.textContent !== greeting) {
      this.greetingText.textContent = greeting;
    }
    if (this.greetingIcon && this.greetingIcon.textContent !== icon) {
      this.greetingIcon.textContent = icon;
    }
  }

  updateWorkStatus(hours, dayOfWeek) {
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    const isWorkHours = (hours >= 9 && hours < 19);

    if (this.workStatusEl && this.statusTextEl) {
      if (!isWeekend && isWorkHours) {
        this.workStatusEl.className = 'work-status-pill status-online';
        this.statusTextEl.textContent = '🟢 In Deep Work & Available for Discussion';
      } else if (isWeekend) {
        this.workStatusEl.className = 'work-status-pill status-offline';
        this.statusTextEl.textContent = '☕ Weekend Exploring & Open Source Hacking';
      } else {
        this.workStatusEl.className = 'work-status-pill status-offline';
        this.statusTextEl.textContent = '🌙 Off-Hours • Recharging & Reading';
      }
    }
  }

  updateWorldClocks(now) {
    WorldTimezones.forEach(({ id, timeZone }) => {
      const el = document.getElementById(id);
      if (!el) return;
      try {
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: !AppState.timeFormat24H
        });
        el.textContent = timeStr;
      } catch (e) {
        el.textContent = '--:--';
      }
    });
  }
}

// ==========================================================================
// 3. Interactive Particle Background (Canvas)
// ==========================================================================
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = Math.min(65, Math.floor(window.innerWidth / 22));
    this.mouse = { x: null, y: null, radius: 140 };
    this.animationFrameId = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    this.createParticles();
    if (AppState.particlesEnabled) {
      this.start();
    } else {
      this.stop();
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.numParticles = Math.min(65, Math.floor(window.innerWidth / 22));
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 1.8 + 1,
        color: this.getParticleColor()
      });
    }
  }

  getParticleColor() {
    if (AppState.theme === 'cyberpunk') {
      return Math.random() > 0.5 ? '#00f0ff' : '#ff007f';
    } else if (AppState.theme === 'light') {
      return '#6366f1';
    }
    return Math.random() > 0.5 ? '#6366f1' : '#06b6d4';
  }

  start() {
    if (this.animationFrameId) return;
    this.canvas.style.display = 'block';

    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const color = this.getParticleColor();

      // Update and draw particles
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

        // Mouse interaction
        if (this.mouse.x !== null && this.mouse.y !== null) {
          const dx = this.mouse.x - p.x;
          const dy = this.mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < this.mouse.radius) {
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * 0.8;
            p.y -= Math.sin(angle) * 0.8;
          }
        }

        // Draw particle dot
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = 0.5;
        this.ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = color;
            this.ctx.globalAlpha = 0.15 * (1 - dist / 110);
            this.ctx.lineWidth = 0.8;
            this.ctx.stroke();
          }
        }
      }

      this.ctx.globalAlpha = 1;
      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvas.style.display = 'none';
    }
  }

  toggle() {
    AppState.particlesEnabled = !AppState.particlesEnabled;
    localStorage.setItem('particles_enabled', AppState.particlesEnabled);
    if (AppState.particlesEnabled) {
      this.createParticles();
      this.start();
      showToast('Particle Background: Enabled 🌌', '✨');
    } else {
      this.stop();
      showToast('Particle Background: Disabled 🛑', '⚙️');
    }
  }
}

// ==========================================================================
// 4. In-Place Profile Customizer with LocalStorage
// ==========================================================================
class ProfileManager {
  constructor() {
    this.nameEl = document.getElementById('profile-name');
    this.roleEl = document.getElementById('profile-role');
    this.bioEl = document.getElementById('profile-bio');
    this.emailEl = document.getElementById('email-address');
    this.avatarEl = document.getElementById('profile-avatar');

    this.navBrandEl = document.getElementById('nav-brand-name');
    this.footerBrandEl = document.getElementById('footer-brand-name');
    this.copyrightEl = document.getElementById('copyright-name');

    // Modal elements
    this.modal = document.getElementById('profile-modal');
    this.openBtn = document.getElementById('btn-open-edit-profile');
    this.mobileOpenBtn = document.getElementById('m-btn-edit-profile');
    this.closeBtn = document.getElementById('btn-close-profile-modal');
    this.cancelBtn = document.getElementById('btn-cancel-profile');
    this.resetBtn = document.getElementById('btn-reset-profile');
    this.form = document.getElementById('profile-edit-form');

    this.inputName = document.getElementById('input-profile-name');
    this.inputRole = document.getElementById('input-profile-role');
    this.inputBio = document.getElementById('input-profile-bio');
    this.inputEmail = document.getElementById('input-profile-email');
    this.inputAvatar = document.getElementById('input-profile-avatar');

    this.presetBtns = document.querySelectorAll('.preset-avatar-btn');

    this.init();
  }

  init() {
    this.applyProfile(AppState.profile);
    this.setupModalEvents();
  }

  applyProfile(profile) {
    if (!profile) return;

    if (this.nameEl) this.nameEl.textContent = profile.name;
    if (this.roleEl) this.roleEl.textContent = profile.role;
    if (this.bioEl) this.bioEl.textContent = profile.bio;
    if (this.emailEl) this.emailEl.textContent = profile.email;
    if (this.avatarEl) {
      this.avatarEl.src = profile.avatar || 'assets/avatar.jpg';
    }

    if (this.navBrandEl) this.navBrandEl.textContent = profile.name;
    if (this.footerBrandEl) this.footerBrandEl.textContent = profile.name;
    if (this.copyrightEl) this.copyrightEl.textContent = profile.name;
  }

  setupModalEvents() {
    const openModal = () => {
      this.inputName.value = AppState.profile.name;
      this.inputRole.value = AppState.profile.role;
      this.inputBio.value = AppState.profile.bio;
      this.inputEmail.value = AppState.profile.email;
      this.inputAvatar.value = AppState.profile.avatar;
      this.modal.classList.add('open');
      this.modal.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
      this.modal.classList.remove('open');
      this.modal.setAttribute('aria-hidden', 'true');
    };

    if (this.openBtn) this.openBtn.addEventListener('click', openModal);
    if (this.mobileOpenBtn) this.mobileOpenBtn.addEventListener('click', openModal);
    if (this.closeBtn) this.closeBtn.addEventListener('click', closeModal);
    if (this.cancelBtn) this.cancelBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) closeModal();
      });
    }

    // Avatar Presets
    this.presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-avatar');
        this.inputAvatar.value = url;
        this.presetBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // Reset Defaults
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        AppState.profile = { ...DEFAULT_PROFILE };
        localStorage.removeItem('user_profile');
        this.applyProfile(AppState.profile);
        closeModal();
        showToast('Restored default profile settings! 🔄', '✨');
      });
    }

    // Save Form
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const updated = {
          name: this.inputName.value.trim() || DEFAULT_PROFILE.name,
          role: this.inputRole.value.trim() || DEFAULT_PROFILE.role,
          bio: this.inputBio.value.trim() || DEFAULT_PROFILE.bio,
          email: this.inputEmail.value.trim() || DEFAULT_PROFILE.email,
          avatar: this.inputAvatar.value.trim() || DEFAULT_PROFILE.avatar
        };

        AppState.profile = updated;
        localStorage.setItem('user_profile', JSON.stringify(updated));
        this.applyProfile(updated);
        closeModal();
        showToast(`Profile saved to localStorage! 💾`, '🎉');
      });
    }
  }
}

// ==========================================================================
// 5. Theme Manager (Dark, Cyberpunk, Light)
// ==========================================================================
function setupThemeManager(particleSystem) {
  const toggleBtn = document.getElementById('theme-toggle');
  const iconEl = document.getElementById('theme-icon');
  const tagEl = document.getElementById('theme-name-tag');

  const themes = ['dark', 'cyberpunk', 'light'];

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    AppState.theme = theme;
    localStorage.setItem('site_theme', theme);

    if (iconEl && tagEl) {
      if (theme === 'cyberpunk') {
        iconEl.textContent = '⚡';
        tagEl.textContent = 'Cyberpunk';
      } else if (theme === 'light') {
        iconEl.textContent = '☀️';
        tagEl.textContent = 'Light';
      } else {
        iconEl.textContent = '🌙';
        tagEl.textContent = 'Dark';
      }
    }

    // Refresh particle colors
    if (particleSystem && AppState.particlesEnabled) {
      particleSystem.createParticles();
    }
  };

  applyTheme(AppState.theme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentIndex = themes.indexOf(AppState.theme);
      const nextIndex = (currentIndex + 1) % themes.length;
      const nextTheme = themes[nextIndex];
      applyTheme(nextTheme);
      showToast(`Switched to ${nextTheme.toUpperCase()} Mode`, '🎨');
    });
  }
}

// ==========================================================================
// 6. UI Renderers: Skills & Projects
// ==========================================================================
function renderSkills(filter = 'all') {
  const container = document.getElementById('skills-grid');
  if (!container) return;

  const filtered = filter === 'all'
    ? SkillsData
    : SkillsData.filter(s => s.category === filter);

  container.innerHTML = filtered.map(skill => `
    <div class="skill-card" data-category="${skill.category}">
      <div class="skill-card-top">
        <div class="skill-icon-wrap">${skill.icon}</div>
        <span class="skill-level-badge">${skill.level}</span>
      </div>
      <h3 class="skill-name">${skill.name}</h3>
      <p class="skill-desc">${skill.desc}</p>
      <div class="skill-tags">
        ${skill.tags.map(t => `<span class="skill-subtag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderProjects(filter = 'all') {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const filtered = filter === 'all'
    ? ProjectsData
    : ProjectsData.filter(p => p.category === filter);

  container.innerHTML = filtered.map(project => `
    <article class="project-card" data-category="${project.category}">
      <div class="project-banner">
        <div class="project-banner-pattern"></div>
        <div class="project-icon-large">${project.icon}</div>
        <span class="project-category-tag">${project.tag}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.desc}</p>
        <div class="project-tech-badges">
          ${project.badges.map(b => `<span class="tech-badge">${b}</span>`).join('')}
        </div>
      </div>
      <div class="project-actions">
        <a href="${project.demoUrl}" class="project-link live-demo" title="Explore ${project.title}">
          <span>View Live</span>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link" title="Source Code">
          <span>Source</span>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
      </div>
    </article>
  `).join('');
}

// ==========================================================================
// 7. Interactive Helpers: Filters, Clipboard, Toast, Navigation
// ==========================================================================
function setupFilterTabs() {
  const skillTabs = document.querySelectorAll('#skill-filters .filter-tab');
  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSkills(tab.getAttribute('data-filter'));
    });
  });

  const projectTabs = document.querySelectorAll('#project-filters .filter-tab');
  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      projectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderProjects(tab.getAttribute('data-filter'));
    });
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const temp = document.createElement('input');
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand('copy');
  document.body.removeChild(temp);
  return Promise.resolve();
}

function setupCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const emailVal = document.getElementById('email-address')?.textContent || AppState.profile.email;
      try {
        await copyToClipboard(emailVal);
        copyBtn.querySelector('.copy-text').textContent = 'Copied!';
        copyBtn.classList.add('copied');
        showToast('Email address copied to clipboard!', '📋');

        setTimeout(() => {
          copyBtn.querySelector('.copy-text').textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 2500);
      } catch (err) {
        showToast('Could not auto-copy. Please select email manually.', '⚠️');
      }
    });
  }
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', '⚠️');
      return;
    }

    const submitBtn = document.getElementById('btn-submit-form');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';
    }

    setTimeout(() => {
      showToast(`Thank you ${name}! Your message has been prepared.`, '🎉');
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Message Sent!</span> <span class="btn-emoji">✅</span>';
        setTimeout(() => {
          submitBtn.innerHTML = '<span>Send Message</span> <span class="btn-emoji">🚀</span>';
        }, 3000);
      }
    }, 900);
  });
}

function setupMobileNav() {
  const toggleBtn = document.getElementById('nav-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggleBtn.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

function showToast(message, icon = '✨') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-hide');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

// ==========================================================================
// 8. Typewriter Effect
// ==========================================================================
function setupTypewriterEffect() {
  const roleEl = document.getElementById('profile-role');
  if (!roleEl) return;

  const baseRole = AppState.profile.role || 'Full-Stack Developer';
  const roles = [
    baseRole,
    'Creative Technologist',
    'Open-Source Builder',
    'Clean Architecture Advocate',
    'UI/UX Craftsperson'
  ];

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = true;
  let isPaused = true;

  const type = () => {
    // If user edited profile role and it changed, update roles[0]
    if (AppState.profile.role && roles[0] !== AppState.profile.role) {
      roles[0] = AppState.profile.role;
    }

    const currentRole = roles[roleIndex];

    if (isPaused) {
      setTimeout(() => {
        isPaused = false;
        type();
      }, isDeleting ? 2200 : 500);
      return;
    }

    if (isDeleting) {
      charIndex--;
      roleEl.textContent = currentRole.substring(0, charIndex);
      if (charIndex <= 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 300);
        return;
      }
    } else {
      charIndex++;
      roleEl.textContent = currentRole.substring(0, charIndex);
      if (charIndex === currentRole.length) {
        isDeleting = true;
        isPaused = true;
        setTimeout(type, 2200);
        return;
      }
    }

    const speed = isDeleting ? 40 : 80;
    setTimeout(type, speed);
  };

  setTimeout(type, 2200);
}

// ==========================================================================
// 9. App Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Initialize Particle Canvas
  const particles = new ParticleSystem();

  // Setup particle toggle button
  const particleBtn = document.getElementById('particle-toggle-btn');
  if (particleBtn) {
    particleBtn.addEventListener('click', () => {
      particles.toggle();
    });
  }

  // Initialize Profile Manager (localStorage)
  new ProfileManager();

  // Initialize Clock
  new RealTimeClock();

  // Initialize Content
  renderSkills('all');
  renderProjects('all');

  // Initialize Interactivity & Multi-Theme
  setupThemeManager(particles);
  setupTypewriterEffect();
  setupFilterTabs();
  setupCopyEmail();
  setupContactForm();
  setupMobileNav();
  setupScrollSpy();
});

