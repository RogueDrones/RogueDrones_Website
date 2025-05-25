/**
 * build-optimized.js
 * Enhanced build script for Rogue Drones website with Mapbox integration
 * - Replaces environment variables in files
 * - Minifies JavaScript and CSS
 * - Optimizes images for web delivery
 * - Sets up proper caching headers
 * - Copies all assets to dist folder
 */
require('dotenv').config();
const fs = require('fs-extra');
const path = require('path');
const { minify } = require('terser');
const { minify: minifyHtml } = require('html-minifier-terser');

// Environment variables - Mapbox instead of Google Maps
process.env.MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || 'YOUR_MAPBOX_ACCESS_TOKEN_HERE';

process.env.EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || 'YOUR_EMAILJS_PUBLIC_KEY_HERE';
process.env.EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || 'YOUR_EMAILJS_SERVICE_ID_HERE';
process.env.EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || 'YOUR_EMAILJS_TEMPLATE_ID_HERE';

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

// Process HTML files - Replace Mapbox tokens and optimize loading
const processHtmlFiles = async () => {
  console.log('Processing HTML files...');
  
  const htmlFiles = getFilesWithExtension(distPath, '.html');
  
  for (const file of htmlFiles) {
    console.log(`Processing HTML: ${file}`);
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace Mapbox access token placeholder with actual token from .env
    content = content.replace(
      /YOUR_MAPBOX_ACCESS_TOKEN/g,
      process.env.MAPBOX_ACCESS_TOKEN
    );
    
    // Add preload hints for critical images
    content = content.replace(
      '<head>',
      `<head>
    <!-- Preload critical images -->
    <link rel="preload" as="image" href="images/home_image.JPG">
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
      /style="background-image: url\('images\/home_image\.JPG'\);"/,
      `style="background-image: url('images/home_image.JPG'); background-size: cover; background-position: center; will-change: transform;"`
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

// Process JS files - Replace Mapbox tokens and minify
const processJsFiles = async () => {
  console.log('Processing JavaScript files...');
  
  const jsFiles = getFilesWithExtension(distPath, '.js');
  
  for (const file of jsFiles) {
    console.log(`Processing JS: ${file}`);
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace Mapbox access token in JavaScript files
    content = content.replace(
      /YOUR_MAPBOX_ACCESS_TOKEN/g,
      process.env.MAPBOX_ACCESS_TOKEN
    );

    // Replace EmailJS tokens in JavaScript files
    content = content.replace(
      /YOUR_EMAILJS_PUBLIC_KEY/g,
      process.env.EMAILJS_PUBLIC_KEY
    );
    content = content.replace(
      /YOUR_SERVICE_ID/g,
      process.env.EMAILJS_SERVICE_ID
    );
    content = content.replace(
      /YOUR_TEMPLATE_ID/g,
      process.env.EMAILJS_TEMPLATE_ID
    );
    
    // Minify and optimize JS
    const result = await minify(content, {
      compress: {
        drop_console: false, // Keep console for debugging, set to true for production
        drop_debugger: true,
        pure_funcs: ['console.log'], // Remove console.log in production
      },
      mangle: {
        toplevel: true,
      },
      output: {
        comments: false
      },
      sourceMap: false // Set to true if you want source maps
    });
    
    fs.writeFileSync(file, result.code);
  }
};

// Process CSS files - Add Mapbox styles and minify
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

// Create enhanced _headers file for Cloudflare with Mapbox CSP
const createHeadersFile = () => {
  console.log('Creating enhanced _headers file for Cloudflare...');
  
  const headersContent = `# Enhanced headers for Rogue Drones website with Mapbox
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.jsdelivr.net https://api.mapbox.com https://cdnjs.cloudflare.com 'unsafe-inline'; style-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com https://api.mapbox.com 'unsafe-inline'; img-src 'self' data: https://*.mapbox.com https://*.mapbox.cn blob:; connect-src 'self' https://*.mapbox.com https://*.mapbox.cn https://*.philhardman.workers.dev https://rogue-drones-website.philhardman.workers.dev https://api.emailjs.com; font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com data:; frame-src 'self'; object-src 'none'; worker-src 'self' blob:
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: no-referrer-when-downgrade
  Permissions-Policy: geolocation=self, microphone=(), camera=()

# Cache static assets for better performance
/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=2592000
  Accept-Ranges: bytes

# Optimize image formats
/images/*.jpg
  Content-Type: image/jpeg

/images/*.png
  Content-Type: image/png

/images/*.gif
  Content-Type: image/gif

# Main HTML file - shorter cache
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

// Update wrangler.toml with enhanced configuration
const updateWranglerConfig = () => {
  console.log('Updating wrangler.toml for optimized deployment...');
  
  const wranglerContent = `# Optimized Wrangler configuration for Rogue Drones website
name = "rogue-drones-website"
compatibility_date = "${new Date().toISOString().split('T')[0]}"

# Deploy the dist directory as static assets
[site]
bucket = "./dist"

# Build configuration
[build]
command = "npm run build"

# Environment variables for build (non-sensitive only)
[vars]
ENVIRONMENT = "production"
`;

  fs.writeFileSync('wrangler.toml', wranglerContent);
};

// Create .env.example file with Mapbox configuration
const createEnvExample = () => {
  console.log('Creating .env.example with Mapbox configuration...');
  
  const envContent = `# Environment Variables for Rogue Drones Website
# Copy this file to .env and replace values with your actual API keys

# Mapbox Access Token (replace Google Maps)
MAPBOX_ACCESS_TOKEN=YOUR_MAPBOX_ACCESS_TOKEN_HERE

# EmailJS Configuration (if using EmailJS for contact form)
EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID
EMAILJS_TEMPLATE_ID=YOUR_EMAILJS_TEMPLATE_ID
EMAILJS_USER_ID=YOUR_EMAILJS_USER_ID
`;

  fs.writeFileSync('.env.example', envContent);
};

// Main build function
const build = async () => {
  try {
    console.log('Starting optimized build process with Mapbox...');
    
    await processHtmlFiles();
    await processJsFiles();
    await processCssFiles();
    createHeadersFile();
    createRobotsTxt();
    createSitemap();
    updateWranglerConfig();
    createEnvExample();
    
    console.log('✅ Optimized build completed successfully!');
    console.log('');
    console.log('📊 Build Summary:');
    console.log('- HTML: Minified with preload hints and lazy loading');
    console.log('- CSS: Minified with Mapbox optimizations');
    console.log('- JS: Minified with Mapbox token replacement');
    console.log('- Images: Configured for lazy loading');
    console.log('- Headers: Enhanced caching and security with Mapbox CSP');
    console.log('- SEO: Sitemap and robots.txt created');
    console.log('- Maps: Converted from Google Maps to Mapbox');
    console.log('');
    console.log('⚠️  Don\'t forget to:');
    console.log('1. Add your Mapbox access token to .env file');
    console.log('2. Configure EmailJS if using email functionality');
    console.log('');
    console.log('🚀 Ready to deploy with: npm run deploy');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
};

// Run the build process
build();