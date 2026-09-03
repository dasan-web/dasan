const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function getAllLocalCss() {
  let combinedCss = '';
  const searchDirs = [
    path.join(__dirname, '../.next/static/chunks'),
    path.join(__dirname, '../.next/dev/static/chunks')
  ];

  for (const dir of searchDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        if (file.endsWith('.css')) {
          try {
            const content = fs.readFileSync(path.join(dir, file), 'utf8');
            combinedCss += '\n/* ' + file + ' */\n' + content;
          } catch (e) {}
        }
      }
    }
  }
  return combinedCss;
}

function toBase64(filename) {
  let p = path.join(__dirname, '../', filename);
  if (!fs.existsSync(p)) {
    p = path.join(__dirname, '../public/', filename);
  }
  if (fs.existsSync(p)) {
    const ext = path.extname(p).toLowerCase().replace('.', '');
    const mime = ext === 'svg' ? 'image/svg+xml' : (ext === 'jpg' || ext === 'jpeg') ? 'image/jpeg' : `image/${ext}`;
    return `data:${mime};base64,${fs.readFileSync(p).toString('base64')}`;
  }
  return null;
}

function makeStandaloneHtml(rawHtml, domain, isFirst = false) {
  let html = rawHtml;

  // 1. Remove Next.js dynamic hydration scripts that crash on file:///
  html = html.replace(/<script\b[^>]*src="[^"]*\/_next\/static\/chunks\/[^"]*"[^>]*><\/script>/gi, '');
  html = html.replace(/<script\b[^>]*id="__NEXT_DATA__"[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script\b[^>]*fetchpriority="low"[^>]*><\/script>/gi, '');

  // 2. Video source resolution
  html = html.replace(/src="\/20260721\.mp4"/g, 'src="20260721.mp4"');
  html = html.replace(/src="https:\/\/dasan-sigma\.vercel\.app\/20260721\.mp4"/g, 'src="20260721.mp4"');

  // 3. Inline critical images as Base64 for 100% fail-safe offline rendering
  const base64Map = {
    'dasan_logo_new_1.png': toBase64('dasan_logo_new_1.png'),
    'dasan_ci_text_authentic.png': toBase64('dasan_ci_text_authentic.png'),
    'core_business_factory.jpg': toBase64('core_business_factory.jpg'),
    'core_business_finished.png': toBase64('core_business_finished.png'),
    'core_business_cmo.jpg': toBase64('core_business_cmo.jpg'),
    'core_business_api.jpg': toBase64('core_business_api.jpg'),
    'poster_main.jpg': toBase64('poster_main.jpg'),
    'press_exhibition.png': toBase64('press_exhibition.png'),
    'press_factory.png': toBase64('press_factory.png'),
    'press_ceo.png': toBase64('press_ceo.png')
  };

  for (const [name, b64] of Object.entries(base64Map)) {
    if (b64) {
      const regSrc = new RegExp(`src="(?:\/|public\/)?${name.replace('.', '\\.')}"`, 'g');
      html = html.replace(regSrc, `src="${b64}"`);
      const regPoster = new RegExp(`poster="(?:\/|public\/)?${name.replace('.', '\\.')}"`, 'g');
      html = html.replace(regPoster, `poster="${b64}"`);
    }
  }

  // Fallback for any other local public files
  html = html.replace(/src="\/([^\"]+\.(?:png|jpg|jpeg|svg|webp))"/g, (match, p1) => {
    if (fs.existsSync(path.join(__dirname, '../', p1))) {
      return `src="${p1}"`;
    }
    if (fs.existsSync(path.join(__dirname, '../public/', p1))) {
      return `src="public/${p1}"`;
    }
    return match;
  });

  // 4. Specific fix for Inquiry Bottom Banner gradient
  html = html.replace(
    'class="w-full bg-gradient-to-r from-brand-green to-brand-green-dark py-8 md:py-10 px-6 md:px-16 lg:px-24 z-10"',
    'class="w-full bg-gradient-to-r from-brand-green to-brand-green-dark py-8 md:py-10 px-6 md:px-16 lg:px-24 z-10" style="background: linear-gradient(to right, #008953, #006c42) !important;"'
  );

  // 5. Tag hero overlay and content for bulletproof styling
  html = html.replace(
    'class="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10"',
    'class="hero-white-overlay"'
  );
  html = html.replace(
    'class="relative z-10 w-full px-6 md:px-16 lg:px-24"',
    'class="hero-content w-full px-6 md:px-16 lg:px-24"'
  );

  // 6. UNFREEZE SSR-HIDDEN ANIMATED ELEMENTS WITHOUT DESTROYING THEIR DISPLAY / GRID LAYOUT
  html = html.replace(/style="([^"]*)"/gi, (match, p1) => {
    let s = p1;
    // Don't unfreeze products container before scroll
    if (!s.includes('pointer-events:none;transform:translateY(20px)') && !s.includes('pointer-events: none; transform: translateY(20px)')) {
      s = s.replace(/opacity\s*:\s*0(?:\.0+)?\s*;?/gi, 'opacity:1;');
    }
    s = s.replace(/transform\s*:\s*translateY\([^)]+\)\s*;?/gi, 'transform:none;');
    s = s.replace(/transform\s*:\s*scale\(0\.98\)\s*;?/gi, 'transform:none;');
    return `style="${s}"`;
  });

  // 7. Inlined CSS Injection (Tailwind Play CDN + Brand styles)
  const localCss = getAllLocalCss();
  
  const headAdditions = `
  <!-- Tailwind CSS & Pretendard Font CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'brand-green': '#008953',
            'brand-green-dark': '#006c42',
            'brand-cyan': '#00B4D8',
            'brand-blue': '#1A365D',
            'brand-accent': '#84BD00'
          },
          fontFamily: {
            pretendard: ['Pretendard', 'sans-serif'],
            sans: ['Pretendard', 'sans-serif'],
            paperlogy: ['Pretendard', 'sans-serif']
          }
        }
      }
    }
  </script>
  <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
  
  <style>
    ${localCss}
    
    body { margin: 0; padding: 0; font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif; background-color: #ffffff; }
    
    /* ========================================================================= */
    /* BULLETPROOF HERO VIDEO & GRADIENT OVERLAY (100% IDENTICAL TO LOCALHOST)   */
    /* ========================================================================= */
    #hero {
      position: relative !important;
      width: 100% !important;
      height: 90vh !important;
      min-height: 620px !important;
      overflow: hidden !important;
      display: flex !important;
      align-items: center !important;
      background: #ffffff !important;
    }
    @media (min-width: 768px) {
      #hero {
        height: calc(100vh - 80px) !important;
      }
    }
    #hero .absolute.inset-0.z-0 {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100% !important;
      height: 100% !important;
      overflow: hidden !important;
      background-color: #ffffff !important;
      z-index: 1 !important;
    }
    #hero video {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      min-width: 100% !important;
      min-height: 100% !important;
      object-fit: cover !important;
      object-position: center !important;
      z-index: 1 !important;
      opacity: 0.95 !important;
      transform: none !important;
      translate: none !important;
    }
    .hero-white-overlay,
    #hero div[class*="bg-gradient-to-r"] {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background: linear-gradient(to right, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0.3) 80%, rgba(255,255,255,0.0) 100%) !important;
      z-index: 2 !important;
      pointer-events: none !important;
    }
    .hero-content,
    #hero > div.relative.z-10 {
      position: relative !important;
      z-index: 10 !important;
      width: 100% !important;
    }

    /* Slogan and Hexagon transition styling */
    #standalone-slogan-layer {
      transition: opacity 0.2s ease-out;
    }
    #standalone-products-layer {
      transition: opacity 0.25s ease-out, transform 0.25s ease-out;
    }
    #standalone-hex-container {
      transition: transform 0.15s ease-out;
      will-change: transform;
    }

    .animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }
    .animate-float-medium { animation: floatMedium 6s ease-in-out infinite; }
    @keyframes floatSlow { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(3deg); } }
    @keyframes floatMedium { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(-2deg); } }
  </style>
  `;

  if (html.includes('<head>')) {
    html = html.replace('<head>', `<head>${headAdditions}`);
  }

  // 8. Interactive Standalone Engine (Video Autoplay & Showcase Scroll)
  let interactiveScript = `
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // 1. Force autoplay background video
      const v = document.querySelector('#hero video');
      if (v) {
        v.muted = true;
        v.playsInline = true;
        v.play().catch(e => console.log('Video autoplay:', e));
      }

      // 2. Standalone Scroll Engine for Hexagon & Products Showcase
      const section = document.getElementById('products');
      if (section) {
        const stickyWrapper = section.querySelector('.sticky');
        if (stickyWrapper) {
          const sloganLayer = stickyWrapper.children[0];
          const productsLayer = stickyWrapper.children[1];
          const svgEl = sloganLayer ? sloganLayer.querySelector('svg') : null;
          const hexContainer = svgEl ? svgEl.closest('div') : null;

          if (sloganLayer) sloganLayer.id = 'standalone-slogan-layer';
          if (productsLayer) productsLayer.id = 'standalone-products-layer';
          if (hexContainer) hexContainer.id = 'standalone-hex-container';

          function onScroll() {
            const rect = section.getBoundingClientRect();
            const totalScroll = section.offsetHeight - window.innerHeight;
            const currentScroll = -rect.top;
            const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));

            if (progress < 0.35) {
              const p = progress / 0.35;
              if (sloganLayer) {
                sloganLayer.style.opacity = Math.max(0, 1 - p * 1.3);
                sloganLayer.style.pointerEvents = 'none';
              }
              if (hexContainer) {
                hexContainer.style.transform = 'scale(' + (1 + p * 18) + ')';
              }
              if (productsLayer) {
                productsLayer.style.opacity = '0';
                productsLayer.style.transform = 'translateY(40px)';
                productsLayer.style.pointerEvents = 'none';
              }
            } else {
              const p = Math.min(1, (progress - 0.35) / 0.25);
              if (sloganLayer) {
                sloganLayer.style.opacity = '0';
                sloganLayer.style.pointerEvents = 'none';
              }
              if (productsLayer) {
                productsLayer.style.opacity = p;
                productsLayer.style.transform = 'translateY(' + ((1 - p) * 30) + 'px)';
                productsLayer.style.pointerEvents = 'auto';
              }
            }
          }

          window.addEventListener('scroll', onScroll, { passive: true });
          onScroll();
        }
      }
    });
  </script>
  `;

  html = html.replace('</body>', `${interactiveScript}</body>`);
  return html;
}

async function run() {
  console.log('Generating First_20260824.html with clean layout from localhost:3000 ...');
  try {
    const localRaw = await fetchUrl('http://localhost:3000/');
    const localClean = makeStandaloneHtml(localRaw, 'http://localhost:3000', true);
    fs.writeFileSync(path.join(__dirname, '../First_20260824.html'), localClean, 'utf8');
    fs.writeFileSync(path.join(__dirname, '../First_2060824.html'), localClean, 'utf8');
    console.log('First_20260824.html & First_2060824.html successfully created!');
  } catch (err) {
    console.error('Error fetching Localhost:', err);
  }

  console.log('Generating Main_20260824.html ...');
  try {
    const vercelRaw = await fetchUrl('https://dasan-sigma.vercel.app/');
    const vercelClean = makeStandaloneHtml(vercelRaw, 'https://dasan-sigma.vercel.app', false);
    fs.writeFileSync(path.join(__dirname, '../Main_20260824.html'), vercelClean, 'utf8');
    console.log('Main_20260824.html successfully created!');
  } catch (err) {
    console.error('Error fetching Vercel:', err);
  }
}

run();
