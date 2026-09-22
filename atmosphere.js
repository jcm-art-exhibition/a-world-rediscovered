/* ============================================================
   Shared atmosphere: drifting dust motes
   Used by: index.html (Lobby + Corridor cave air), parallel-room.html
   Requires: <div class="dust-layer" id="dustLayer" aria-hidden="true"></div>
             in the HTML body, plus atmosphere.js loaded before </body>.
             A page may include additional dust-layer divs (any id) to
             get a second, independently seeded/positioned mote field —
             e.g. one scoped inside a pinned section so it reads as air
             flow in one particular scene rather than the whole page.
   Requires CSS variable --whisper to be defined (design tokens).

   Design notes for future edits (change ONCE here, applies everywhere):
   - Opacity is a static CSS property (var(--mote-op)), NOT animated.
     This is deliberate: it guarantees motes are visibly correct even
     if the animation fails to run for any reason. Do not move opacity
     back into the @keyframes — that was the root cause of two earlier
     bugs (bright flash on load, and total invisibility).
   - The page-wide layer uses a simple back-and-forth drift (0% ->
     ~50% -> 100%, same start/end state) — not a one-way loop — so the
     infinite loop never needs a position "jump".
   - The corridor layer instead does a true one-way, constant-speed
     sweep (see .corridor-dust in atmosphere.css): every mote is
     spawned already off-screen past the right edge (xMin/xSpread
     below) and travels a fixed distance left, off the far side of the
     screen, before the animation loops. Because both the spawn point
     and the fully-travelled point are off-screen (clipped by
     .corridor-sticky's overflow:hidden), the loop's reset is
     invisible even though the motion itself never reverses — it
     always reads as air moving right to left, never floating.
   - Seeded PRNG (mulberry32) keeps the mote arrangement identical on
     every load, every browser, every platform — no visual drift
     between "preview" and a real browser, or between reloads.
   ============================================================ */

(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function mulberry32(seed) {
        return function () {
            seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
            let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    // Renders `count` seeded, drifting dust motes into the given layer
    // element. Each layer gets its own seed so multiple layers on the
    // same page (e.g. the page-wide layer and a corridor-scoped one)
    // never look like copies of each other.
    function renderDustLayer(layer, count, seed, opts) {
        if (!layer) return;
        const rand = mulberry32(seed);
        const sizeMin = (opts && opts.sizeMin) || 1;
        const sizeRange = (opts && opts.sizeRange) || 2;
        const opMin = (opts && opts.opMin) || 0.09;
        const opRange = (opts && opts.opRange) || 0.18;
        const durMin = (opts && opts.durMin) || 12;
        const durRange = (opts && opts.durRange) || 10;
        // Default range (-12..+12) drifts either way; pass a fully
        // negative driftXMin/driftXSpread (e.g. -46/28) to make every
        // mote in this layer push the same direction instead.
        const driftXMin = (opts && opts.driftXMin != null) ? opts.driftXMin : -12;
        const driftXSpread = (opts && opts.driftXSpread != null) ? opts.driftXSpread : 24;
        // Default spawn range (0..100%) covers the whole layer. For a
        // one-way sweep (see .corridor-dust in atmosphere.css), spawn
        // motes already off-screen in the direction they travel FROM
        // (xMin > 100 = starting past the right edge) so the loop's
        // reset back to their spawn point happens off-screen too.
        const xMin = (opts && opts.xMin != null) ? opts.xMin : 0;
        const xSpread = (opts && opts.xSpread != null) ? opts.xSpread : 100;

        let html = '';
        for (let i = 0; i < count; i++) {
            const x = (rand() * xSpread + xMin).toFixed(2);
            const y = (rand() * 100).toFixed(2);
            const size = (rand() * sizeRange + sizeMin).toFixed(2);
            const op = (rand() * opRange + opMin).toFixed(2);
            const dur = (rand() * durRange + durMin).toFixed(1);
            const delayMax = (opts && opts.delayMax != null) ? opts.delayMax : 14;
            const delay = (rand() * delayMax).toFixed(1);
            const driftX = (rand() * driftXSpread + driftXMin).toFixed(1);
            const driftClass = reduceMotion ? '' : ' is-drifting';
            html += `<div class="dust-mote${driftClass}" style="left:${x}%; top:${y}%; width:${size}px; height:${size}px; --mote-op:${op}; --dur:${dur}s; --delay:${delay}s; --drift-x:${driftX}px;"></div>`;
        }
        layer.innerHTML = html;
    }

    renderDustLayer(document.getElementById('dustLayer'), 24, 1337);

    // Corridor cave-air layer: a continuous right-to-left sweep (see
    // xMin/xSpread — every mote spawns off-screen past the right edge)
    // instead of random floating, so it reads as air being pulled the
    // same direction the room cards travel as you scroll deeper in.
    renderDustLayer(document.getElementById('corridorDust'), 40, 4242, {
        sizeMin: 1.4, sizeRange: 2.6, opMin: 0.14, opRange: 0.24, durMin: 9, durRange: 7,
        xMin: 100, xSpread: 55, delayMax: 8
    });
})();
