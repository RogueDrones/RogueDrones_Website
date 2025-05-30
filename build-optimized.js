/**
 * build-optimized.js
 * Fixed build script for Cloudflare Pages environment variables
 */

// Don't require dotenv in Cloudflare Pages - it gets env vars differently
// require('dotenv').config(); // Comment this out for Cloudflare Pages

const fs = require('fs-extra');
const path = require('path');
const { minify } = require('terser');
const { minify: minifyHtml } = require('html-minifier-terser');

// Environment variables - Access directly from process.env (Cloudflare Pages provides these)
console.log('=== ENVIRONMENT VARIABLES CHECK ===');
console.log('EMAILJS_PUBLIC_KEY available:', !!process.env.EMAILJS_PUBLIC_KEY);
console.log('EMAILJS_SERVICE_ID available:', !!process.env.EMAILJS_SERVICE_ID);
console.log('EMAILJS_TEMPLATE_ID available:', !!process.env.EMAILJS_TEMPLATE_ID);
console.log('MAPBOX_ACCESS_TOKEN available:', !!process.env.MAPBOX_ACCESS_TOKEN);
console.log('=====================================');

// Get environment variables with fallbacks
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || 'pk.eyJ1Ijoicm9ndWUtZHJvbmVzIiwiYSI6ImNtMGhiOXg2ajA2a2IybG9ndWJ0Nm1lZzMifQ.NinfkW9LV2o2zhE9YjyUSg';
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || 'jYYdiIKGp82fYj07q';
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || 'service_afgq4m7';
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || 'template_my8et0g';

console.log('Using values:');
console.log('EMAILJS_PUBLIC_KEY:', EMAILJS_PUBLIC_KEY.substring(0, 10) + '...');
console.log('EMAILJS_SERVICE_ID:', EMAILJS_SERVICE_ID);
console.log('EMAILJS_TEMPLATE_ID:', EMAILJS_TEMPLATE_ID);

// Paths
const distPath = './dist';

// Ensure dist directory exists and is empty
fs.emptyDirSync(distPath);

// Specify which files/folders to copy
console.log('Copying files to dist directory...');
const filesToCopy = [
  { src: './static-index.html', dest: path.join(distPath, 'index.html') },
  { src: './css', dest: path.join(distPath, 'css') },
  { src: './js', dest: path.join(distPath, 'js') },
  { src: './images', dest: path.join(distPath, 'images') }
];

// Copy each file/folder
filesToCopy.forEach(({ src, dest }) => {
  if (fs.existsSync(src)) {
    if (fs.lstatSync(src).isDirectory()) {
      fs.copySync(src, dest);
      console.log(`Copied directory: ${src} -> ${dest}`);
    } else {
      fs.copySync(src, dest);
      console.log(`Copied file: ${src} -> ${dest}`);
    }
  } else {
    console.warn(`Warning: Source does not exist: ${src}`);
  }
});

// Process HTML files
const processHtmlFiles = async () => {
  console.log('Processing HTML files...');
  
  const htmlFiles = getFilesWithExtension(distPath, '.html');
  
  for (const file of htmlFiles) {
    console.log(`Processing HTML: ${file}`);
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace Mapbox access token placeholder
    content = content.replace(
      /YOUR_MAPBOX_ACCESS_TOKEN_HERE/g,
      MAPBOX_ACCESS_TOKEN
    );
    
    // Add preload hints for critical images
    content = content.replace(
      '<head>',
      `<head>
    <!-- Preload critical images -->
    <link rel="preload" as="image" href="images/home_image_comp.JPG">
    <link rel="preload" as="image" href="images/rogue_drones_white.png">
    <!-- DNS prefetch for external resources -->
    <link rel="dns-prefetch" href="//cdn.jsdelivr.net">
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="//api.mapbox.com">
    <link rel="dns-prefetch" href="//fonts.googleapis.com">`
    );

    // Add image optimization attributes
    content = content.replace(
      /<img([^>]*src="images\/[^"]*"[^>]*)>/g,
      '<img$1 loading="lazy" decoding="async">'
    );

    // Optimize hero image loading specifically
    content = content.replace(
      /style="background-image: url\('images\/home_image_comp\.JPG'\);"/,
      `style="background-image: url('images/home_image_comp.JPG'); background-size: cover; background-position: center; will-change: transform;"`
    );
    
    // Minify HTML
    const minified = await minifyHtml(content, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    });
    
    fs.writeFileSync(file, minified);
  }
};

// Process JS files - CRITICAL SECTION
const processJsFiles = async () => {
  console.log('Processing JavaScript files...');
  
  const jsFiles = getFilesWithExtension(distPath, '.js');
  
  for (const file of jsFiles) {
    console.log(`Processing JS: ${file}`);
    let content = fs.readFileSync(file, 'utf8');
    
    console.log('Original content contains placeholders:', {
      publicKey: content.includes('YOUR_EMAILJS_PUBLIC_KEY_HERE'),
      serviceId: content.includes('YOUR_EMAILJS_SERVICE_ID_HERE'),
      templateId: content.includes('YOUR_EMAILJS_TEMPLATE_ID_HERE'),
      mapbox: content.includes('YOUR_MAPBOX_ACCESS_TOKEN_HERE')
    });
    
    // Replace tokens - EXACT MATCHES
    const originalContent = content;
    
    content = content.replace(
      /YOUR_MAPBOX_ACCESS_TOKEN_HERE/g,
      MAPBOX_ACCESS_TOKEN
    );
    
    content = content.replace(
      /YOUR_EMAILJS_PUBLIC_KEY_HERE/g,
      EMAILJS_PUBLIC_KEY
    );
    
    content = content.replace(
      /YOUR_EMAILJS_SERVICE_ID_HERE/g,
      EMAILJS_SERVICE_ID
    );
    
    content = content.replace(
      /YOUR_EMAILJS_TEMPLATE_ID_HERE/g,
      EMAILJS_TEMPLATE_ID
    );
    
    // Log replacement results
    const replacements = originalContent !== content;
    console.log(`Replacements made in ${file}:`, replacements);
    
    if (replacements) {
      console.log('✅ Token replacement successful');
    } else {
      console.log('❌ No token replacements made - check placeholder text');
    }
    
    // Minify JS
    const result = await minify(content, {
      compress: {
        drop_console: false, // Keep console for debugging
        drop_debugger: true,
      },
      mangle: {
        toplevel: false, // Don't mangle for easier debugging
      },
      output: {
        comments: false
      },
      sourceMap: false
    });
    
    fs.writeFileSync(file, result.code);
    console.log(`Minified and saved: ${file}`);
  }
};

// Process CSS files
const processCssFiles = async () => {
  console.log('Processing CSS files...');
  
  const cssFiles = getFilesWithExtension(distPath, '.css');
  
  for (const file of cssFiles) {
    console.log(`Processing CSS: ${file}`);
    let content = fs.readFileSync(file, 'utf8');
    
    // Add Mapbox-specific CSS optimizations
    const mapboxStyles = `
/* Mapbox Container Styling */
.mapbox-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 400px;
    transition: transform 0.3s ease;
    border: 2px solid #ff6f61;
    border-radius: 0.25rem;
}

.mapbox-container:hover {
    transform: scale(1.02);
}

/* Mapbox popup styling */
.mapboxgl-popup-content {
    padding: 10px !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
}

.mapboxgl-popup-tip {
    border-top-color: white !important;
}

/* Control styling */
.mapboxgl-ctrl-group {
    background-color: rgba(255, 255, 255, 0.9) !important;
    border-radius: 6px !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
}

.mapboxgl-ctrl button:hover {
    background-color: rgba(255, 111, 97, 0.1) !important;
    color: #ff6f61 !important;
}

.mapboxgl-ctrl-geolocate {
    background-color: #ff6f61 !important;
    color: white !important;
}

.mapboxgl-ctrl-geolocate:hover {
    background-color: #e55a4f !important;
}

@media (max-width: 767px) {
    .mapbox-container {
        height: 300px;
        margin-top: 2rem;
    }
}
`;
    
    // Add critical CSS optimizations and Mapbox styles
    content = `/* Critical CSS optimizations */
html { font-display: swap; }
img { max-width: 100%; height: auto; }
.hero-logo { content-visibility: auto; }

${mapboxStyles}

${content}`;
    
    // Minify CSS
    const minified = await minifyHtml(`<style>${content}</style>`, {
      minifyCSS: true
    });
    
    // Extract the CSS from the minified HTML
    const extractedCSS = minified.match(/<style>(.*?)<\/style>/s)[1];
    
    fs.writeFileSync(file, extractedCSS);
  }
};

// Helper function to get all files with a specific extension
function getFilesWithExtension(dir, extension, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      getFilesWithExtension(fullPath, extension, files);
    } else if (entry.name.endsWith(extension)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Create enhanced _headers file for Cloudflare
const createHeadersFile = () => {
  console.log('Creating enhanced _headers file for Cloudflare...');
  
  const headersContent = `# Enhanced headers for Rogue Drones website
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.jsdelivr.net https://api.mapbox.com https://cdnjs.cloudflare.com https://static.cloudflareinsights.com 'unsafe-inline'; style-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com https://api.mapbox.com 'unsafe-inline'; img-src 'self' data: https://*.mapbox.com https://*.mapbox.cn blob:; connect-src 'self' https://*.mapbox.com https://*.mapbox.cn https://*.philhardman.workers.dev https://rogue-drones-website.philhardman.workers.dev https://api.emailjs.com; font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com data:; frame-src 'self'; object-src 'none'; worker-src 'self' blob:
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: no-referrer-when-downgrade
  Permissions-Policy: geolocation=self, microphone=(), camera=()

# Cache static assets
/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=2592000
  Accept-Ranges: bytes

# Main HTML file
/
  Cache-Control: public, max-age=3600

/index.html
  Cache-Control: public, max-age=3600
`;

  fs.writeFileSync(path.join(distPath, '_headers'), headersContent);
};

// Create robots.txt file
const createRobotsTxt = () => {
  console.log('Creating robots.txt...');
  
  const robotsContent = `User-agent: *
Allow: /
Disallow: /cgi-bin/
Disallow: /tmp/

# Sitemap
Sitemap: https://roguedrones.co.nz/sitemap.xml
`;

  fs.writeFileSync(path.join(distPath, 'robots.txt'), robotsContent);
};

// Create sitemap for better SEO
const createSitemap = () => {
  console.log('Creating sitemap.xml...');
  
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://roguedrones.co.nz/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemapContent);
};

// Main build function
const build = async () => {
  try {
    console.log('🚀 Starting optimized build process...');
    console.log('Environment check completed above ⬆️');
    console.log('');
    
    await processHtmlFiles();
    await processJsFiles();
    await processCssFiles();
    createHeadersFile();
    createRobotsTxt();
    createSitemap();
    
    console.log('✅ Build completed successfully!');
    console.log('');
    console.log('📊 Build Summary:');
    console.log('- Environment variables loaded from Cloudflare Pages');
    console.log('- Token replacement completed');
    console.log('- Files minified and optimized');
    console.log('- Ready for deployment');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
};

// Run the build process
build();
