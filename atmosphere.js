/* ============================================================
   Shared atmosphere: drifting dust motes
   Used by: index.html (Lobby), parallel-room.html (Parallel Room hub)
   Requires: <div class="dust-layer" id="dustLayer" aria-hidden="true"></div>
             and atmosphere.css loaded in <head>.

   Design notes for future edits (change ONCE here, applies everywhere):
   - Opacity is a static CSS property (var(--mote-op)), NOT animated.
     This is deliberate: it guarantees motes are visibly correct even
     if the animation fails to run for any reason. Do not move opacity
     back into the @keyframes — that was the root cause of two earlier
     bugs (bright flash on load, and total invisibility).
   - Motion is a simple back-and-forth drift (0% -> 50% -> 100%, same
     start/end state), not a one-way loop. This avoids needing any
     opacity trickery to hide a position "jump" at the loop boundary.
   - Seeded PRNG (mulberry32) keeps the mote arrangement identical on
     every load, every browser, every platform — no visual drift
     between "preview" and a real browser, or between reloads.
   ============================================================ */

(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dustLayer = document.getElementById('dustLayer');
    if (!dustLayer) return; // page didn't include the dust-layer div; nothing to do

   function mulberry32(seed) {
         return function () {
                 seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
                 let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
                 t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
                 return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
         };
   }
    const rand = mulberry32(1337);

   const moteCount = 24;
    let html = '';
    for (let i = 0; i < moteCount; i++) {
          const x = (rand() * 100).toFixed(2);
          const y = (rand() * 100).toFixed(2);
          const size = (rand() * 2 + 1).toFixed(2);
          const op = (rand() * 0.18 + 0.09).toFixed(2);
          const dur = (rand() * 10 + 12).toFixed(1);
          const delay = (rand() * 14).toFixed(1);
          const driftX = (rand() * 24 - 12).toFixed(1);
          const driftClass = reduceMotion ? '' : ' is-drifting';
          html += `<div class="dust-mote${driftClass}" style="left:${x}%; top:${y}%; width:${size}px; height:${size}px; --mote-op:${op}; --dur:${dur}s; --delay:${delay}s; --drift-x:${driftX}px;"></div>`;
    }
    dustLayer.innerHTML = html;
})();
