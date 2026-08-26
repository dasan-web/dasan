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

function makeStandaloneHtml(rawHtml, domain, isFirst = false) {
  let html = rawHtml;

  // 1. Remove Next.js dynamic hydration scripts that crash on file:///
  html = html.replace(/<script\b[^>]*src="[^"]*\/_next\/static\/chunks\/[^"]*"[^>]*><\/script>/gi, '');
  html = html.replace(/<script\b[^>]*id="__NEXT_DATA__"[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script\b[^>]*fetchpriority="low"[^>]*><\/script>/gi, '');

  // 2. Fix local assets
  if (isFirst) {
    // Video: use local file directly so it plays instantly without remote network dependency
    html = html.replace(/src="\/20260721\.mp4"/g, 'src="20260721.mp4"');
    html = html.replace(/src="https:\/\/dasan-sigma\.vercel\.app\/20260721\.mp4"/g, 'src="20260721.mp4"');

    // Local static images
    html = html.replace(/src="\/dasan_logo_new_1\.png"/g, 'src="dasan_logo_new_1.png"');
    html = html.replace(/src="\/press_([^\"]+)\.png"/g, 'src="press_$1.png"');
    html = html.replace(/src="\/([^\"]+\.(?:png|jpg|jpeg|svg|webp))"/g, (match, p1) => {
      if (fs.existsSync(path.join(__dirname, '../', p1))) {
        return `src="${p1}"`;
      }
      return match;
    });

    // Tag hero overlay and content for bulletproof styling
    html = html.replace(
      'class="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10"',
      'class="hero-white-overlay"'
    );
    html = html.replace(
      'class="relative z-10 w-full px-6 md:px-16 lg:px-24"',
      'class="hero-content w-full px-6 md:px-16 lg:px-24"'
    );
  } else {
    // For Main_20260824.html:
    html = html.replace(/stroke-dasharray="0\s+1"/gi, 'stroke-dasharray="none"');
    html = html.replace(/stroke-dasharray="0,1"/gi, 'stroke-dasharray="none"');
    html = html.replace(/stroke-dasharray:\s*0\s+1;?/gi, 'stroke-dasharray:none;');
    html = html.replace(/stroke-dashoffset="[^"]*"/gi, 'stroke-dashoffset="0"');
    html = html.replace(/pathLength="1"/gi, '');
    
    html = html.replace(/<polygon([^>]*)opacity="0"([^>]*)>/gi, '<polygon$1opacity="1"$2>');
    html = html.replace(/<circle([^>]*)opacity="0"([^>]*)>/gi, '<circle$1opacity="1"$2>');
    html = html.replace(/<line([^>]*)opacity="0"([^>]*)>/gi, '<line$1opacity="1"$2>');
    html = html.replace(/<path([^>]*)opacity="0"([^>]*)>/gi, '<path$1opacity="1"$2>');

    html = html.replace(/opacity:\s*0\s*;?/gi, 'opacity:1;');
    html = html.replace(/transform:\s*scale\([^)]+\)[^;"]*;?/gi, 'transform:none;');
    
    html = html.replace(/src="(\/[^"]+)"/g, (match, p1) => {
      if (p1.startsWith('//') || p1.startsWith('http')) return match;
      return `src="https://dasan-sigma.vercel.app${p1}"`;
    });
  }

  // 3. Inlined CSS Injection (Tailwind + Brand styles)
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

    /* Core Tech SVG styling for Main */
    #core-tech * {
      opacity: 1 !important;
      visibility: visible !important;
    }
    #core-tech svg {
      opacity: 1 !important;
      visibility: visible !important;
      overflow: visible !important;
    }
    #core-tech svg polygon {
      stroke: #008953 !important;
      stroke-width: 2.5px !important;
      stroke-dasharray: none !important;
      opacity: 1 !important;
    }
    #core-tech svg line {
      stroke: #008953 !important;
      stroke-width: 1.8px !important;
      stroke-dasharray: none !important;
      opacity: 1 !important;
    }
    #core-tech svg circle {
      stroke: #008953 !important;
      stroke-width: 2.5px !important;
      fill: #ffffff !important;
      opacity: 1 !important;
    }
    #core-tech div[style*="clip-path"] {
      transform: none !important;
    }

    .animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }
    .animate-float-medium { animation: floatMedium 6s ease-in-out infinite; }
    @keyframes floatSlow { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(3deg); } }
    @keyframes floatMedium { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(-2deg); } }
    
    /* Standalone Scroll Animation Transitions for First */
    #standalone-pill-container {
      transition: transform 0.15s ease-out, border-radius 0.15s ease-out;
      will-change: transform, border-radius;
    }
    #standalone-slogan {
      transition: opacity 0.2s ease-out;
    }
    #standalone-products-layer {
      transition: opacity 0.25s ease-out, transform 0.25s ease-out;
    }
    #standalone-dasan-text {
      transition: opacity 0.15s ease-out;
    }
  </style>
  `;

  if (html.includes('<head>')) {
    html = html.replace('<head>', `<head>${headAdditions}`);
  }

  // 4. Standalone JavaScript (Video Autoplay & Smooth Scroll Engine)
  let interactiveScript = `
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Force autoplay background video
      const v = document.querySelector('#hero video');
      if (v) {
        v.muted = true;
        v.playsInline = true;
        v.play().catch(e => console.log('Video autoplay:', e));
      }
  `;

  if (isFirst) {
    interactiveScript += `
      // Standalone Scroll Engine for Pill & Products
      const section = document.getElementById('products');
      if (section) {
        const stickyWrapper = section.querySelector('.sticky');
        if (stickyWrapper) {
          const sloganLayer = stickyWrapper.children[0];
          const productsLayer = stickyWrapper.children[1];
          
          if (sloganLayer) {
            const sloganText = sloganLayer.querySelector('.flex.flex-col.items-center.text-center');
            const pillBox = sloganLayer.querySelector('.absolute.top-1/2');
            const dasanText = pillBox ? pillBox.querySelector('span') : null;
            
            if (sloganText) sloganText.id = 'standalone-slogan';
            if (pillBox) pillBox.id = 'standalone-pill-container';
            if (dasanText) dasanText.id = 'standalone-dasan-text';
          }
          
          if (productsLayer) {
            productsLayer.id = 'standalone-products-layer';
          }

          function onScroll() {
            const rect = section.getBoundingClientRect();
            const totalScroll = section.offsetHeight - window.innerHeight;
            const currentScroll = -rect.top;
            const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));

            const sloganEl = document.getElementById('standalone-slogan');
            const pillEl = document.getElementById('standalone-pill-container');
            const dasanEl = document.getElementById('standalone-dasan-text');
            const prodEl = document.getElementById('standalone-products-layer');

            // 1. Slogan Fade (0 ~ 0.28)
            if (sloganEl) {
              sloganEl.style.opacity = Math.max(0, 1 - (progress / 0.28));
            }

            // 2. DASAN text fade (0 ~ 0.15)
            if (dasanEl) {
              dasanEl.style.opacity = Math.max(0, 1 - (progress / 0.15));
            }

            // 3. Pill Scale (0 ~ 0.75: scale 1 -> 32)
            if (pillEl) {
              let scale = 1;
              let radius = '9999px';
              if (progress <= 0.2) {
                scale = 1 + (progress / 0.2) * 1.5;
              } else if (progress <= 0.5) {
                scale = 2.5 + ((progress - 0.2) / 0.3) * 6.5;
              } else if (progress <= 0.75) {
                scale = 9 + ((progress - 0.5) / 0.25) * 23;
                radius = '32px';
              } else {
                scale = 32;
                radius = '0px';
              }
              pillEl.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
              pillEl.style.borderRadius = radius;
              pillEl.parentElement.style.opacity = progress >= 0.8 ? '0' : '1';
            }

            // 4. Products reveal (0.65 ~ 0.88)
            if (prodEl) {
              if (progress < 0.65) {
                prodEl.style.opacity = '0';
                prodEl.style.transform = 'translateY(50px)';
                prodEl.style.pointerEvents = 'none';
              } else {
                const pOp = Math.min(1, (progress - 0.65) / 0.23);
                const pY = (1 - pOp) * 50;
                prodEl.style.opacity = pOp;
                prodEl.style.transform = 'translateY(' + pY + 'px)';
                prodEl.style.pointerEvents = 'auto';
              }
            }
          }

          window.addEventListener('scroll', onScroll, { passive: true });
          onScroll();
        }
      }
    `;
  }

  interactiveScript += `
    });
  </script>
  `;

  html = html.replace('</body>', `${interactiveScript}</body>`);
  return html;
}

async function run() {
  console.log('Generating First_20260824.html with full-width video and gradient overlay ...');
  try {
    const localRaw = await fetchUrl('http://localhost:3000/');
    const localClean = makeStandaloneHtml(localRaw, 'http://localhost:3000', true);
    fs.writeFileSync(path.join(__dirname, '../First_20260824.html'), localClean, 'utf8');
    fs.writeFileSync(path.join(__dirname, '../First_2060824.html'), localClean, 'utf8');
    console.log('First_20260824.html successfully created!');
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
