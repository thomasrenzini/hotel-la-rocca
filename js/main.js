/* ============================================================
   main.js – Hotel la Rocca | Interazioni principali
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* -------- Navbar scroll effect -------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -------- Grand Header: Hamburger & Overlay Drawer -------- */
  const navMenuBtn = document.getElementById('navMenuBtn') || document.querySelector('.nav-menu-btn') || document.querySelector('.nav-toggle');
  const navOverlay = document.getElementById('navOverlay') || document.querySelector('.nav-overlay');
  const navOverlayClose = document.getElementById('navOverlayClose') || document.querySelector('.nav-overlay-close');
  const navOverlayBackdrop = document.getElementById('navOverlayBackdrop') || document.querySelector('.nav-overlay-backdrop');

  const openNavOverlay = () => {
    if (navOverlay) {
      navOverlay.classList.add('open');
      navOverlay.setAttribute('aria-hidden', 'false');
      if (navMenuBtn) navMenuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeNavOverlay = () => {
    if (navOverlay) {
      navOverlay.classList.remove('open');
      navOverlay.setAttribute('aria-hidden', 'true');
      if (navMenuBtn) navMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  if (navMenuBtn) {
    navMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navOverlay && navOverlay.classList.contains('open')) {
        closeNavOverlay();
      } else {
        openNavOverlay();
      }
    });
  }

  if (navOverlayClose) {
    navOverlayClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeNavOverlay();
    });
  }

  if (navOverlayBackdrop) {
    navOverlayBackdrop.addEventListener('click', closeNavOverlay);
  }

  // Close overlay on link click inside drawer
  if (navOverlay) {
    navOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeNavOverlay();
      });
    });
  }

  // Close overlay on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOverlay && navOverlay.classList.contains('open')) {
      closeNavOverlay();
    }
  });

  /* -------- Active nav link (Primary list + Overlay drawer) -------- */
  function normalizeNavSlug(path) {
    if (!path) return 'index';
    let slug = path.split('/').pop().split('?')[0].split('#')[0].toLowerCase();
    slug = slug.replace(/\.html$/, '');
    if (!slug || slug === '.' || slug === 'en' || slug === 'de') return 'index';
    return slug;
  }

  const currentSlug = normalizeNavSlug(window.location.pathname);
  const allNavLinks = document.querySelectorAll('.nav-primary-list a, .nav-overlay-links a, .nav-links a:not(.btn)');
  allNavLinks.forEach(link => {
    link.classList.remove('active');
    const rawHref = link.getAttribute('href') || '';
    const linkSlug = normalizeNavSlug(rawHref);
    
    if (linkSlug === currentSlug) {
      link.classList.add('active');
    }
  });

  /* -------- Shop Button Action -------- */
  document.querySelectorAll('.nav-shop-action').forEach(shopBtn => {
    shopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Mostra messaggio informativo elegante coordinato con la palette del brand
      const currentLang = document.documentElement.lang || 'it';
      const messages = {
        it: "Boutique & Gift Card: Il nostro shop online esclusivo sarà presto disponibile. Per informazioni o regali personalizzati, contattaci direttamente alla reception.",
        en: "Boutique & Gift Cards: Our exclusive online store will be available soon. For bespoke inquiries or gift vouchers, please contact reception directly.",
        de: "Boutique & Gutscheine: Unser exklusiver Online-Shop steht in Kürze zur Verfügung. Für Anfragen oder Geschenkgutscheine wenden Sie sich bitte direkt an die Rezeption."
      };
      alert(messages[currentLang] || messages.it);
    });
  });

  /* -------- Modal Preventivo -------- */
  const modalOverlay = document.getElementById('modal-preventivo');
  const modalClose = document.querySelector('.modal-close');
  const inputCamera = document.getElementById('camera_selezionata');

  /* -------- Lazy Loading Dinamico di Google reCAPTCHA (0 KB al page load) -------- */
  let recaptchaLoaded = false;
  const loadRecaptcha = () => {
    if (recaptchaLoaded) return;
    recaptchaLoaded = true;

    if (document.querySelector('script[src*="google.com/recaptcha"]')) return;

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  };

  window.onRecaptchaLoaded = () => {
    const recaptchaEl = document.querySelector('.g-recaptcha');
    if (recaptchaEl && window.grecaptcha && typeof grecaptcha.render === 'function') {
      try {
        if (recaptchaEl.children.length === 0) {
          grecaptcha.render(recaptchaEl, {
            sitekey: recaptchaEl.getAttribute('data-sitekey')
          });
        }
      } catch (err) {}
    }
  };

  // Apertura modal dal pulsante "Richiedi Preventivo"
  const btnPreventivo = document.querySelectorAll('.btn-richiedi');
  btnPreventivo.forEach(btn => {
    btn.addEventListener('pointerenter', loadRecaptcha, { once: true });
    btn.addEventListener('focus', loadRecaptcha, { once: true });
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      loadRecaptcha();
      const nomeCamera = btn.getAttribute('data-camera');

      if (inputCamera) {
        inputCamera.value = nomeCamera;
        if (inputCamera.tagName === 'INPUT') {
          inputCamera.setAttribute('readonly', 'true');
        }
        inputCamera.dispatchEvent(new Event('change'));
      }

      if (typeof closeNavOverlay === 'function') {
        closeNavOverlay();
      }

      if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Render reCAPTCHA if already loaded
        if (window.grecaptcha && typeof grecaptcha.render === 'function') {
          window.onRecaptchaLoaded();
        }
      }
    });
  });

  // Chiusura modal
  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* -------- Date Inputs & Validation (check-out > check-in) -------- */
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  dateInputs.forEach(inp => {
    inp.setAttribute('min', today);
    inp.style.cursor = 'pointer';

    const openCalendar = () => {
      if (typeof inp.showPicker === 'function') {
        try {
          inp.showPicker();
        } catch (e) {}
      }
    };
    inp.addEventListener('click', openCalendar);
    inp.addEventListener('focus', openCalendar);
  });

  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');

  if (checkinInput && checkoutInput) {
    checkinInput.addEventListener('change', () => {
      if (!checkinInput.value) return;
      const parts = checkinInput.value.split('-');
      if (parts.length === 3) {
        const checkinDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        const nextDay = new Date(checkinDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayStr = `${nextDay.getFullYear()}-${String(nextDay.getMonth() + 1).padStart(2, '0')}-${String(nextDay.getDate()).padStart(2, '0')}`;
        checkoutInput.setAttribute('min', nextDayStr);

        if (checkoutInput.value) {
          const outParts = checkoutInput.value.split('-');
          const checkoutDate = new Date(parseInt(outParts[0], 10), parseInt(outParts[1], 10) - 1, parseInt(outParts[2], 10));
          if (checkoutDate <= checkinDate) {
            checkoutInput.value = nextDayStr;
          }
        }
      }
    });
  }

  /* -------- Form Validation -------- */
  const form = document.getElementById('form-preventivo');
  if (form) {
    form.addEventListener('submit', (e) => {
      const privacy = document.getElementById('privacy');
      if (privacy && !privacy.checked) {
        e.preventDefault();
        const curLang = document.documentElement.lang || 'it';
        const msgs = {
          it: "Devi accettare l'Informativa sulla Privacy e i Termini e Condizioni per procedere.",
          en: "You must accept the Privacy Policy and Terms and Conditions to proceed.",
          de: "Sie müssen die Datenschutzerklärung und die Allgemeinen Geschäftsbedingungen akzeptieren, um fortzufahren."
        };
        alert(msgs[curLang] || msgs.it);
        return false;
      }
    });
  }

  /* -------- Reveal on Scroll (Intersection Observer) -------- */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* -------- Room Carousels Logic -------- */
  const roomCarousels = document.querySelectorAll('.room-carousel');
  roomCarousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const thumbs = carousel.querySelectorAll('.carousel-thumb');
    const currentNumEl = carousel.querySelector('.carousel-counter .current-slide, .carousel-counter .current');
    const btnPrev = carousel.querySelector('.carousel-arrow.prev');
    const btnNext = carousel.querySelector('.carousel-arrow.next');

    if (!slides.length) return;

    let currentIndex = 0;

    const goToSlide = (index) => {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      slides.forEach((s, i) => s.classList.toggle('active', i === index));
      thumbs.forEach((t, i) => t.classList.toggle('active', i === index));

      if (currentNumEl) currentNumEl.textContent = index + 1;
      currentIndex = index;

      // Scroll thumbnail into view if needed
      if (thumbs[index]) {
        thumbs[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    };

    if (btnPrev) {
      btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentIndex - 1);
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentIndex + 1);
      });
    }

    thumbs.forEach((thumb, idx) => {
      thumb.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(idx);
      });
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    const viewport = carousel.querySelector('.carousel-viewport');
    if (viewport) {
      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) goToSlide(currentIndex + 1);
          else goToSlide(currentIndex - 1);
        }
      }, { passive: true });
    }
  });

  /* -------- Lightbox Gallery (supports .carousel-slide and standalone images) -------- */
  const lightboxOverlay = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  let galleryImages = [];
  let currentImageIndex = 0;

  const clickableImages = document.querySelectorAll('.carousel-slide img, .room-gallery-item img, [data-lightbox]');
  if (clickableImages.length > 0 && lightboxOverlay) {
    clickableImages.forEach((img) => {
      const src = img.src;
      if (!galleryImages.includes(src)) {
        galleryImages.push(src);
      }
      img.addEventListener('click', () => {
        currentImageIndex = galleryImages.indexOf(src);
        openLightbox(src);
      });
    });
  }

  function openLightbox(src) {
    if (lightboxImg && lightboxOverlay) {
      lightboxImg.src = src;
      lightboxOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxOverlay) {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function showPrevImage() {
    if (!galleryImages.length) return;
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    if (lightboxImg) lightboxImg.src = galleryImages[currentImageIndex];
  }

  function showNextImage() {
    if (!galleryImages.length) return;
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    if (lightboxImg) lightboxImg.src = galleryImages[currentImageIndex];
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrevImage(); });
  if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNextImage(); });

  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightboxOverlay || !lightboxOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
  });

  /* -------- Smooth Scroll for anchor links -------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* -------- Counter Animation (if present) -------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-count'));
          let current = 0;
          const increment = Math.ceil(target / 60);
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            entry.target.textContent = current;
          }, 25);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  /* -------- Smart Mini-Tag / Badge Camere su Mobile -------- */
  const initRoomAmenitiesMobile = () => {
    const roomAmenitiesContainers = document.querySelectorAll('.room-amenities');
    if (!roomAmenitiesContainers.length) return;

    // Rileva lingua corrente dal tag <html lang="...">
    const lang = (document.documentElement.lang || 'it').toLowerCase();
    const i18nLabels = {
      it: { more: (n) => `+${n}`, less: 'Mostra meno' },
      en: { more: (n) => `+${n}`, less: 'Show less' },
      de: { more: (n) => `+${n}`, less: 'Weniger anzeigen' },
      fr: { more: (n) => `+${n}`, less: 'Voir moins' }
    };
    const t = i18nLabels[lang] || i18nLabels.it;

    roomAmenitiesContainers.forEach(container => {
      const oldToggle = container.querySelector('.room-amenity-toggle');
      if (oldToggle) oldToggle.remove();

      const badges = Array.from(container.querySelectorAll('.room-amenity-badge'));
      if (badges.length > 3) {
        badges.forEach((badge, index) => {
          if (index >= 3) {
            badge.classList.add('badge-hidden-mobile');
          } else {
            badge.classList.remove('badge-hidden-mobile');
          }
        });

        const remainingCount = badges.length - 3;
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'room-amenity-toggle';
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', `${t.more(remainingCount)}`);
        toggleBtn.innerHTML = `<span>${t.more(remainingCount)}</span>`;

        toggleBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const isExpanded = container.classList.toggle('is-expanded');
          toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
          toggleBtn.innerHTML = `<span>${isExpanded ? t.less : t.more(remainingCount)}</span>`;
        });

        container.appendChild(toggleBtn);
      }
    });
  };

  initRoomAmenitiesMobile();

  /* -------- Rooms Grid Horizontal Scroll Controls (Home Page) -------- */
  const initRoomsGridScroll = () => {
    const grid = document.querySelector('.rooms-grid');
    const prevBtn = document.getElementById('roomsScrollPrev');
    const nextBtn = document.getElementById('roomsScrollNext');

    if (!grid) return;

    const updateNavState = () => {
      const maxScroll = grid.scrollWidth - grid.clientWidth - 5;
      if (prevBtn) prevBtn.disabled = grid.scrollLeft <= 5;
      if (nextBtn) nextBtn.disabled = grid.scrollLeft >= maxScroll;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const cardWidth = grid.querySelector('.room-card')?.offsetWidth || 300;
        grid.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const cardWidth = grid.querySelector('.room-card')?.offsetWidth || 300;
        grid.scrollBy({ left: (cardWidth + 16), behavior: 'smooth' });
      });
    }

    grid.addEventListener('scroll', updateNavState, { passive: true });
    window.addEventListener('resize', updateNavState);
    setTimeout(updateNavState, 150);
  };

  initRoomsGridScroll();

  /* -------- Practical Info Cards "Leggi di più" Toggle -------- */
  document.querySelectorAll('.btn-toggle-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.service-card') || btn.parentElement;
      if (!card) return;

      const extra = card.querySelector('.practical-info-extra');
      const body = card.querySelector('.practical-info-body');

      let isExpanded = false;
      if (extra) {
        isExpanded = extra.classList.toggle('is-visible');
      } else if (body) {
        isExpanded = body.classList.toggle('expanded');
      }
      btn.classList.toggle('is-expanded', isExpanded);

      const moreText = btn.getAttribute('data-more') || 'Leggi di più';
      const lessText = btn.getAttribute('data-less') || 'Riduci';

      const labelSpan = btn.querySelector('span');
      if (labelSpan) {
        labelSpan.textContent = isExpanded ? lessText : moreText;
      }
    });
  });

  /* -------- Cookie Consent Banner & Google Maps Preventive Blocking -------- */
  function initCookieConsent() {
    const consentKey = 'cookie_consent';
    const consent = localStorage.getItem(consentKey);

    // Determine current language from html lang attribute or path
    let lang = document.documentElement.lang || 'it';
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/en/') || path.endsWith('/en')) lang = 'en';
    else if (path.includes('/de/') || path.endsWith('/de')) lang = 'de';

    const privacyLink = (lang === 'en' || lang === 'de') ? 'privacy' : 'privacy';

    const translations = {
      it: {
        text: "Utilizziamo cookie tecnici necessari al funzionamento del sito e, previo tuo consenso, cookie di terze parti (Google Maps) per mostrarti la mappa interattiva. Puoi accettare tutti i cookie o continuare solo con i cookie tecnici. Consulta la nostra <a href='" + privacyLink + "'>Privacy Policy</a>.",
        btnReject: "Rifiuta",
        btnAccept: "Accetta",
        mapBlocked: "La mappa interattiva di Google Maps richiede l'accettazione dei cookie di terze parti.",
        mapEnable: "Abilita Mappa ora",
        mapExternal: "Apri su Google Maps &rarr;"
      },
      en: {
        text: "We use technical cookies necessary for website operation and, with your consent, third-party cookies (Google Maps) to display our interactive map. You can accept all cookies or continue with technical cookies only. Read our <a href='" + privacyLink + "'>Privacy Policy</a>.",
        btnReject: "Reject",
        btnAccept: "Accept",
        mapBlocked: "The interactive Google Maps requires acceptance of third-party cookies.",
        mapEnable: "Enable Map now",
        mapExternal: "Open in Google Maps &rarr;"
      },
      de: {
        text: "Wir verwenden technisch notwendige Cookies für den Betrieb der Website und mit Ihrer Einwilligung Cookies von Drittanbietern (Google Maps) zur Anzeige der interaktiven Karte. Sie können alle Cookies akzeptieren oder nur mit technischen Cookies fortfahren. Weitere Informationen in unserer <a href='" + privacyLink + "'>Datenschutzerklärung</a>.",
        btnReject: "Ablehnen",
        btnAccept: "Akzeptieren",
        mapBlocked: "Die interaktive Google Maps Karte erfordert die Annahme von Drittanbieter-Cookies.",
        mapEnable: "Karte jetzt aktivieren",
        mapExternal: "In Google Maps öffnen &rarr;"
      }
    };

    const t = translations[lang] || translations.it;

    // Handle Google Maps in location pages
    const mapIframe = document.querySelector('.location-map iframe');
    const mapContainer = document.querySelector('.location-map');

    function updateMapDisplay(isAccepted) {
      if (!mapContainer || !mapIframe) return;
      let placeholder = document.getElementById('map-cookie-placeholder');

      if (isAccepted) {
        const targetSrc = mapIframe.getAttribute('data-src') || mapIframe.getAttribute('src');
        if (targetSrc && mapIframe.src !== targetSrc) {
          mapIframe.src = targetSrc;
        }
        mapIframe.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
      } else {
        const curSrc = mapIframe.getAttribute('src');
        if (curSrc && curSrc !== 'about:blank' && !curSrc.startsWith('data:')) {
          mapIframe.setAttribute('data-src', curSrc);
          mapIframe.removeAttribute('src');
        }
        mapIframe.style.display = 'none';

        if (!placeholder) {
          placeholder = document.createElement('div');
          placeholder.id = 'map-cookie-placeholder';
          placeholder.className = 'map-cookie-placeholder';
          placeholder.innerHTML = `
            <div class="map-placeholder-content">
              <svg class="map-placeholder-icon" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#C5A059" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <h4>Google Maps</h4>
              <p>${t.mapBlocked}</p>
              <div class="map-placeholder-buttons">
                <button type="button" class="btn btn-primary" id="btn-enable-map">${t.mapEnable}</button>
                <a href="https://maps.google.com/?q=Salita+Alla+Rocca+35+47890+San+Marino" target="_blank" rel="noopener noreferrer" class="btn btn-outline">${t.mapExternal}</a>
              </div>
            </div>
          `;
          mapContainer.appendChild(placeholder);

          const enableBtn = placeholder.querySelector('#btn-enable-map');
          if (enableBtn) {
            enableBtn.addEventListener('click', () => {
              localStorage.setItem(consentKey, 'accepted');
              updateMapDisplay(true);
              hideCookieBanner();
            });
          }
        } else {
          placeholder.style.display = 'flex';
        }
      }
    }

    // Initialize map state
    if (mapContainer && mapIframe) {
      updateMapDisplay(consent === 'accepted');
    }

    // Cookie Banner
    if (!consent) {
      let banner = document.getElementById('cookie-banner');
      if (!banner) {
        banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Informativa Cookie');
        banner.innerHTML = `
          <div class="cookie-banner-content">
            <div class="cookie-banner-text">
              <span class="cookie-shield-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5A059" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </span>
              <p>${t.text}</p>
            </div>
            <div class="cookie-banner-actions">
              <button type="button" class="cookie-btn cookie-btn-reject" id="cookie-btn-reject">${t.btnReject}</button>
              <button type="button" class="cookie-btn cookie-btn-accept" id="cookie-btn-accept">${t.btnAccept}</button>
            </div>
          </div>
        `;
        document.body.appendChild(banner);

        setTimeout(() => {
          banner.classList.add('visible');
        }, 300);

        const acceptBtn = banner.querySelector('#cookie-btn-accept');
        const rejectBtn = banner.querySelector('#cookie-btn-reject');

        if (acceptBtn) {
          acceptBtn.addEventListener('click', () => {
            localStorage.setItem(consentKey, 'accepted');
            hideCookieBanner();
            updateMapDisplay(true);
          });
        }

        if (rejectBtn) {
          rejectBtn.addEventListener('click', () => {
            localStorage.setItem(consentKey, 'rejected');
            hideCookieBanner();
            updateMapDisplay(false);
          });
        }
      }
    }

    function hideCookieBanner() {
      const b = document.getElementById('cookie-banner');
      if (b) {
        b.classList.remove('visible');
        setTimeout(() => {
          b.remove();
        }, 400);
      }
    }
  }

  initCookieConsent();

  /* -------- Inizializzazione icone Lucide (se differite) -------- */
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }

});

/* -------- Caricamento differito del video Hero (per non bloccare LCP e rete) -------- */
function initHeroVideo() {
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    const source = heroVideo.querySelector('source[data-src]');
    if (source && !source.getAttribute('src')) {
      source.src = source.getAttribute('data-src');
      heroVideo.load();
      heroVideo.play().catch(() => {});
    }
  }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initHeroVideo();
} else {
  document.addEventListener('DOMContentLoaded', initHeroVideo);
  window.addEventListener('load', initHeroVideo);
}

