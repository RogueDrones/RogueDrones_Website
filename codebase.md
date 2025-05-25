# _headers

```
# Enhanced headers for Rogue Drones website with Mapbox
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

```

# .github\workflows\deploy.yml

```yml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build site
        run: npm run build
        env:
          MAPBOX_ACCESS_TOKEN: ${{ secrets.MAPBOX_ACCESS_TOKEN }}
          EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}
          EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
          EMAILJS_TEMPLATE_ID: ${{ secrets.EMAILJS_TEMPLATE_ID }}
          
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
          
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

# .gitignore

```
# Node modules
node_modules/

# Build directory
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# macOS files
.DS_Store
.AppleDouble
.LSOverride

# Windows files
Thumbs.db
ehthumbs.db
Desktop.ini

# Editor directories
.idea/
.vscode/
*.swp
*.swo
```

# .vscode\settings.json

```json
{
    "cSpell.words": [
        "democratise",
        "Durq",
        "HUSL",
        "organisation",
        "roguedronesnz",
        "specialise",
        "videography",
        "Zudh"
    ],
    "postman.settings.dotenv-detection-notification-visibility": false
}
```

# build-optimized.js

```js
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
```

# package.json

```json
{
  "name": "rogue-drones-website",
  "version": "1.0.0",
  "description": "Rogue Drones website with security enhancements and optimizations",
  "main": "index.js",
  "scripts": {
    "build": "node build-optimized.js",
    "build:basic": "node build.js",
    "deploy:site": "npx wrangler pages deploy dist",
    "deploy:worker": "npx wrangler deploy contact-form-worker.js --name rogue-drones-contact",
    "deploy:full": "npm run build && npm run deploy:site && npm run deploy:worker",
    "dev": "npx wrangler pages dev dist --port 3000",
    "preview": "npm run build && npm run dev",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "drone",
    "mapping",
    "website",
    "gis",
    "cloudflare"
  ],
  "author": "Rogue Drones",
  "license": "ISC",
  "dependencies": {
    "dotenv": "^16.5.0",
    "fs-extra": "^11.3.0",
    "html-minifier-terser": "^7.2.0",
    "terser": "^5.39.2"
  },
  "devDependencies": {
    "wrangler": "^3.0.0"
  }
}
```

# robots.txt

```txt
User-agent: *
Allow: /
Disallow: /cgi-bin/
Disallow: /tmp/

# Sitemap
Sitemap: https://roguedrones.co.nz/sitemap.xml

```

# sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://roguedrones.co.nz/</loc>
    <lastmod>2025-05-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

# static-index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rogue Drones - Mapping the Future</title>
    
    <!-- Preload critical resources for faster loading -->
    <link rel="preload" as="image" href="images/home_image_comp.JPG">
    <link rel="preload" as="image" href="images/rogue_drones_white.png">
    
    <!-- DNS prefetch for external resources -->
    <link rel="dns-prefetch" href="//cdn.jsdelivr.net">
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="//api.mapbox.com">
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/styles-new.css">
    <!-- Font Awesome for icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    
    <!-- Mapbox GL JS -->
    <link href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js"></script>
    
    <!-- EmailJS CDN -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
</head>

<body>
    <!-- Hero Section -->
    <section id="hero" class="d-flex flex-column justify-content-center" style="background-image: url('images/home_image_comp.JPG');">
        <div class="container hero-content text-center text-white">
            <img src="images/rogue_drones_white.png" alt="Rogue Drones Logo" class="mb-4 img-fluid hero-logo" loading="eager">
            <h1 class="display-4 mb-3">Mapping the Future</h1>
            <p class="lead mb-4">Affordable, reliable tech solutions for everyone.</p>
            <a href="#contact" class="btn btn-primary btn-lg">Get in Touch</a>
        </div>
    </section>

    <!-- About Us Section -->
    <section id="about" class="py-5 bg-light">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h2 class="section-title">Your World, Your Way</h2>
                    <p class="lead">We specialise in providing high-quality, cost-effective websites and app building services. Whether you're a small business, a volunteer organisation, or an individual, we have the tools and expertise to help you map your world.</p>
                    <p class="lead">At Rogue Drones, we believe that cutting-edge technology should be accessible to everyone. Our mission is to democratise access to tech systems and custom applications that can transform how you interact with your environment.</p>
                </div>
                <div class="col-lg-6">
                    <div id="map-container" class="mapbox-container rounded shadow-lg">
                        <div class="text-center p-4">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading map...</span>
                            </div>
                            <p class="mt-2">Loading interactive map...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-5">
        <div class="container">
            <h2 class="section-title text-center text-white mb-5">Our Services</h2>
            <div class="row">
                <div class="col-md-4">
                    <div class="service-box bg-dark text-white p-4 mb-4">
                        <div class="service-icon mb-3">
                            <i class="fas fa-map-marked-alt fa-3x"></i>
                        </div>
                        <h3>Mapping & GIS Services</h3>
                        <p>Affordable mapping solutions, from basic mapping to advanced GIS, to help you manage your environment.</p>
                        <ul class="service-features">
                            <li>Aerial photography & videography</li>
                            <li>Topographic mapping</li>
                            <li>3D terrain modeling</li>
                            <li>GIS data collection & analysis</li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="service-box bg-dark text-white p-4 mb-4">
                        <div class="service-icon mb-3">
                            <i class="fas fa-mobile-alt fa-3x"></i>
                        </div>
                        <h3>App Development</h3>
                        <p>Custom app development crafted to streamline your workflow, delivering solutions without the high costs.</p>
                        <ul class="service-features">
                            <li>Mobile applications</li>
                            <li>Data collection tools</li>
                            <li>Custom GIS interfaces</li>
                            <li>Workflow automation</li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="service-box bg-dark text-white p-4 mb-4">
                        <div class="service-icon mb-3">
                            <i class="fas fa-headset fa-3x"></i>
                        </div>
                        <h3>Solutions & Support</h3>
                        <p>Offering low-cost solutions and ongoing support to help you implement and maintain the tools you need.</p>
                        <ul class="service-features">
                            <li>Technical training</li>
                            <li>System implementation</li>
                            <li>Ongoing maintenance</li>
                            <li>Custom solutions development</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Portfolio Section -->
    <section id="portfolio" class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title text-center mb-5">Our Work</h2>
            <div id="portfolio-carousel" class="carousel slide" data-bs-interval="false">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="images/Screenshot 2025-05-17 200041.png" class="d-block w-100 rounded" alt="Project 1" loading="lazy">
                            </div>
                            <div class="col-md-6 d-flex align-items-center">
                                <div class="carousel-caption text-start text-dark position-relative">
                                    <h3>Have you seen lizards?</h3>
                                    <p>We designed and built HUSL to assist a team with the data collection of native skinks.</p>
                                    <p><strong>Tech:</strong> Mobile app, GIS, Data collection</p>
                                                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="images/GorseBusters.png" class="d-block w-100 rounded" alt="Project 2" loading="lazy">
                            </div>
                            <div class="col-md-6 d-flex align-items-center">
                                <div class="carousel-caption text-start text-dark position-relative">
                                    <h3>Busting Gorse</h3> 
                                    <p>We designed and built a portfolio website for GorseBusters, enabling them to showcase their work.</p> 
                                    <p><strong>Tech:</strong> Open source, Low-cost, Low maintenance</p>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="images/App Background - 2048 x 2732px.gif" class="d-block w-100 rounded" alt="Project 3" loading="lazy">
                            </div>
                            <div class="col-md-6 d-flex align-items-center">
                                <div class="carousel-caption text-start text-dark position-relative">
                                    <h3>Planting planning</h3>
                                    <p>We worked with a small business to map native planting areas, providing data for planning and analysis.</p>
                                    <p><strong>Tech:</strong> Aerial photos, GIS, data collection app</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#portfolio-carousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#portfolio-carousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-5 text-center text-white">
        <div class="container">
            <h2 class="section-title mb-5">What Our Clients Say</h2>
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="testimonial-box p-4">
                        <i class="fas fa-quote-left fa-3x mb-3"></i>
                        <p class="lead mb-4">"Love it. Bloody awesome. And I don't say that lightly, I'm usually really hard to please"</p>
                        <div class="testimonial-author">
                            <p class="mb-0">Baz Hughes</p>
                            <p class="text-white-50">Founder, GorseBusters</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Form Section -->
    <section id="contact" class="py-5 bg-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <h2 class="section-title">Get In Touch</h2>
                    <p class="lead mb-4">Interested in working with us? Have questions about our services? <br class="d-none d-md-block"> Drop us a line, and we'll get back to you as soon as possible.</p>
                    <div class="contact-info mb-4">
                        <div class="d-flex mb-3">
                            <i class="fas fa-map-marker-alt me-3 mt-1"></i>
                            <p>Dunedin, New Zealand</p>
                        </div>
                        <div class="d-flex mb-3">
                            <i class="fas fa-envelope me-3 mt-1"></i>
                            <p><a href="mailto:info@roguedrones.co.nz" class="text-dark">info@roguedrones.co.nz</a></p>
                        </div>
                        <div class="d-flex mb-3">
                            <i class="fab fa-instagram me-3 mt-1"></i>
                            <p><a href="https://www.instagram.com/roguedronesnz" target="_blank" class="text-dark">@roguedronesnz</a></p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <form id="contact-form" class="contact-form p-4 bg-white rounded shadow">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" name="name" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="subject" class="form-label">Subject</label>
                            <input type="text" class="form-control" id="subject" name="subject">
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Message</label>
                            <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-grid">
                <!-- Left column - Logo and copyright -->
                <div class="footer-brand">
                    <img src="images/rogue_drones_white.png" alt="Rogue Drones Logo" loading="lazy">
                    <p class="copyright">&copy; 2024 Rogue Drones. All rights reserved.</p>
                </div>
                
                <!-- Right column - Navigation and social -->
                <div class="footer-links">
                    <!-- Navigation links -->
                    <div class="footer-nav">
                        <a href="#about">About</a>
                        <a href="#services">Services</a>
                        <a href="#portfolio">Our work</a>
                    </div>
                    
                    <!-- Social media icons -->
                    <div class="footer-social">
                        <p class="text-white">Follow us:</p>
                        <a href="https://www.instagram.com/roguedronesnz" target="_blank" aria-label="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/phil-hardman-587751343/" target="_blank" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
    <!-- Custom JS with Mapbox -->
    <script src="js/main-mapbox.js"></script>
</body>
</html>
```

# wrangler.toml

```toml
# Optimized Wrangler configuration for Rogue Drones website
name = "rogue-drones-website"
compatibility_date = "2025-05-25"

# Deploy the dist directory as static assets
[site]
bucket = "./dist"

# Build configuration
[build]
command = "npm run build"

# Environment variables for build (non-sensitive only)
[vars]
ENVIRONMENT = "production"

```

