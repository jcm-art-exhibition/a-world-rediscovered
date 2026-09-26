/* ============================================================
   Shared site chrome: persistent audio + credits controls, the
   cross-page fade transition, and the on-load content reveal utility.
   Pairs with chrome.css — see that file's header comment for the
   markup each page needs. Load this after the audio/credits markup
   (e.g. right before </body>, alongside atmosphere.js).

   Design notes for future edits (change ONCE here, applies everywhere):
   - The mute PREFERENCE is remembered across pages via localStorage
     (key below), since this is a classic multi-page site: navigating
     to a new page always restarts the track from 0:00 (there's no way
     to carry a single <audio> element across a full page load without
     a much bigger architecture change), but at least whether the
     visitor wanted it on or off travels with them.
   - The fade transition hides the page via body.page-transition{opacity:0}
     (see chrome.css) and only ever reveals it from JS, so a <noscript>
     fallback in the markup is required — see the snippet below — or a
     no-JS visitor would see a permanently blank page.
   ============================================================ */

/* Markup snippet each page includes once, right after <body>:

  <body class="page-transition">
  <noscript><style>body.page-transition{opacity:1 !important;}</style></noscript>

*/

(function () {
  /* ============================================================
     Cross-page fade transition
     ============================================================ */
  var body = document.body;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function reveal() {
    requestAnimationFrame(function () {
      body.classList.remove('is-leaving');
      body.classList.add('is-ready');
    });
  }
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    reveal();
  } else {
    document.addEventListener('DOMContentLoaded', reveal);
  }
  // Safety net: never leave the page invisible if something above fails.
  setTimeout(reveal, 1500);

  // Restore from the back/forward cache in the revealed state, in case
  // the page was cached mid-fade-out when the visitor navigated away.
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) reveal();
  });

  function isInternalNavLink(link) {
    if (!link || !link.getAttribute) return false;
    if (link.target && link.target !== '' && link.target !== '_self') return false;
    if (link.hasAttribute('data-coming-soon')) return false;
    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#') return false; // in-page anchor
    if (/^([a-z]+:)?\/\//i.test(href)) return false; // external / protocol-relative
    if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return false;
    return true;
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var link = e.target.closest('a[href]');
    if (!isInternalNavLink(link)) return;
    e.preventDefault();
    var href = link.getAttribute('href');
    if (reduceMotion) {
      window.location.href = href;
      return;
    }
    body.classList.remove('is-ready');
    body.classList.add('is-leaving');
    setTimeout(function () { window.location.href = href; }, 320);
  });

  /* ============================================================
     On-load content reveal (data-reveal elements)
     ============================================================ */
  var revealEls = document.querySelectorAll('[data-reveal]');
  revealEls.forEach(function (el, i) {
    var stagger = i * 130;
    var extra = parseInt(el.getAttribute('data-reveal-delay') || '0', 10) || 0;
    var delay = reduceMotion ? 0 : 320 + stagger + extra;
    setTimeout(function () { el.classList.add('is-revealed'); }, delay);
  });

  /* ============================================================
     Background music
     No browser allows audible autoplay before the visitor has
     interacted with the page at all. The closest real equivalent,
     and what this does: start the track muted immediately on
     landing (muted autoplay IS allowed everywhere) so it's buffered
     and ready, then unmute the instant the visitor actually wants
     sound. The default (no stored preference yet) assumes they want
     it, not that they've opted out — so the icon shows the "on" glyph
     from the start and the very first interaction of any kind,
     including the first scroll, is enough to make it audible without
     requiring a click. Clicking the icon is the explicit, reliable
     way to start or stop it at any time: it always acts on whether
     the track is ACTUALLY audible right now, never on a separate flag
     that can drift out of sync with that — so a click is guaranteed
     to do what it looks like it's about to do (silent -> starts
     playing, audible -> mutes), rather than occasionally muting a
     track that hadn't even started yet. That choice is remembered on
     the next page.
     ============================================================ */
  var PREF_KEY = 'awr_audio_enabled';
  var TIME_KEY = 'awr_audio_time';
  (function () {
    var audio = document.getElementById('bgAudio');
    var toggle = document.getElementById('audioToggle');
    if (!audio || !toggle) return;
    var iconOn = toggle.querySelector('.audio-icon-on');
    var iconOff = toggle.querySelector('.audio-icon-off');
    audio.volume = 0.35;
    // Below 1024px the page shows only the desktop-only message (see
    // chrome.css), so the music must stay silent there too.
    var gateMQ = window.matchMedia('(max-width: 1023.98px)');
    var storedPref = null;
    try { storedPref = window.localStorage.getItem(PREF_KEY); } catch (err) { /* ignore */ }
    // No stored preference (first visit, or a fresh browser) defaults
    // to wanting sound, not off — a returning visitor's own explicit
    // choice always wins over this default.
    var enabled = storedPref !== 'off';
    var revealed = false;

    // Resume from wherever the visitor left off on the previous page,
    // so the track reads as one continuous piece across exhibit pages
    // instead of restarting every time they navigate - the Mirror
    // exhibit gets this for free by being a single page; this gives
    // the multi-page exhibits the same continuity. Session-scoped: a
    // fresh tab still starts the track from the top.
    var storedTime = null;
    try { storedTime = parseFloat(window.sessionStorage.getItem(TIME_KEY)); } catch (err) { /* ignore */ }
    if (storedTime && isFinite(storedTime) && storedTime > 0) {
      audio.addEventListener('loadedmetadata', function () {
        audio.currentTime = (audio.duration && isFinite(audio.duration)) ? (storedTime % audio.duration) : storedTime;
      }, { once: true });
    }

    function syncIcon() {
      iconOn.style.display = enabled ? 'block' : 'none';
      iconOff.style.display = enabled ? 'none' : 'block';
      toggle.setAttribute('aria-pressed', String(!enabled));
      toggle.setAttribute('aria-label', enabled ? 'Mute background music' : 'Play background music');
    }

    // Muted autoplay is permitted by every major browser, so this
    // succeeds immediately on page load.
    audio.muted = true;
    if (!gateMQ.matches) audio.play().catch(function () { /* extremely rare even muted; the toggle and interaction listeners below cover it too */ });

    function revealAudio() {
      if (!enabled || revealed || gateMQ.matches) return;
      revealed = true;
      audio.muted = false;
      audio.play().catch(function () { revealed = false; });
    }
    ['pointerdown', 'keydown', 'scroll', 'touchstart', 'wheel'].forEach(function (evt) {
      window.addEventListener(evt, revealAudio, { passive: true });
    });

    toggle.addEventListener('click', function () {
      // Base the toggle on whether the track is actually audible
      // right now, not on the `enabled` flag alone — that flag
      // defaults to true before anything has played (nothing has
      // unmuted it yet), so blindly flipping it here would turn a
      // click into "mute a track that was never actually playing"
      // instead of starting it.
      var isAudible = !audio.muted && !audio.paused;
      enabled = !isAudible;
      try { window.localStorage.setItem(PREF_KEY, enabled ? 'on' : 'off'); } catch (err) { /* ignore */ }
      if (enabled) {
        revealed = true;
        audio.muted = false;
        audio.play().catch(function () {});
      } else {
        audio.muted = true;
        audio.pause();
      }
      syncIcon();
    });

    // Persist the current position periodically and on navigation
    // away, so the next page (or a reload) resumes close to here.
    window.setInterval(function () {
      try { window.sessionStorage.setItem(TIME_KEY, String(audio.currentTime)); } catch (err) { /* ignore */ }
    }, 1000);
    window.addEventListener('pagehide', function () {
      try { window.sessionStorage.setItem(TIME_KEY, String(audio.currentTime)); } catch (err) { /* ignore */ }
    });

    // Crossing the 1024px line while the page is open: silence the
    // track when the gate appears, let it carry on when it goes away.
    function onGateChange() {
      if (gateMQ.matches) { audio.pause(); }
      else { audio.play().catch(function () {}); }
    }
    if (gateMQ.addEventListener) gateMQ.addEventListener('change', onGateChange);
    else if (gateMQ.addListener) gateMQ.addListener(onGateChange);

    syncIcon();
  })();

  /* ============================================================
     Credits popup
     ============================================================ */
  (function () {
    var toggle = document.getElementById('creditsToggle');
    var overlay = document.getElementById('creditsOverlay');
    var closeBtn = document.getElementById('creditsClose');
    if (!toggle || !overlay || !closeBtn) return;
    var lastFocused = null;

    function onKeydown(e) {
      if (e.key === 'Escape') close();
    }
    function open() {
      lastFocused = document.activeElement;
      overlay.classList.add('is-open');
      closeBtn.focus();
      document.addEventListener('keydown', onKeydown);
    }
    function close() {
      overlay.classList.remove('is-open');
      document.removeEventListener('keydown', onKeydown);
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    toggle.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
  })();
})();
