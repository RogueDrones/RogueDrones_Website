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
    ]
}
```

# api.md

```md
AIzaSyCkCfjNvZudhVc4uhIDurq-GIB8MzkP448
```

# build.js

```js
/**
 * build.js
 * Build script for Rogue Drones website
 * - Replaces environment variables in files
 * - Minifies JavaScript
 * - Minifies HTML
 * - Copies all assets to dist folder
 */
require('dotenv').config();
const fs = require('fs-extra');
const path = require('path');
const { minify } = require('terser');
const { minify: minifyHtml } = require('html-minifier-terser');

// Paths
const distPath = './dist';

// Ensure dist directory exists and is empty
fs.emptyDirSync(distPath);

// Specify which files/folders to copy
console.log('Copying files to dist directory...');
const filesToCopy = [
  { src: './index-new.html', dest: path.join(distPath, 'index.html') },
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

// Process HTML files - Replace API keys and minify
const processHtmlFiles = async () => {
  console.log('Processing HTML files...');
  
  const htmlFiles = getFilesWithExtension(distPath, '.html');
  
  for (const file of htmlFiles) {
    console.log(`Processing HTML: ${file}`);
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace API key placeholder with actual key from .env
    content = content.replace(
      /AIzaSyCkCfjNvZudhVc4uhIDurq-GIB8MzkP448/g,
      process.env.GOOGLE_MAPS_API_KEY
    );
    
    // Update script loading to use dynamic loading approach
    content = content.replace(
      /<script src="https:\/\/maps\.googleapis\.com\/maps\/api\/js\?key=.*&callback=initMap" defer><\/script>/,
      `<script>
        // Load Maps API dynamically
        function loadGoogleMapsApi() {
          const script = document.createElement('script');
          script.src = "https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap";
          script.defer = true;
          script.async = true;
          script.onerror = function() {
            console.error('Google Maps API failed to load');
            // Could add fallback behavior here
          };
          document.head.appendChild(script);
        }
        // Call this once the DOM is fully loaded
        window.addEventListener('DOMContentLoaded', loadGoogleMapsApi);
      </script>`
    );
    
    // Minify HTML
    const minified = await minifyHtml(content, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true
    });
    
    fs.writeFileSync(file, minified);
  }
};

// Process JS files - Minify and obfuscate
const processJsFiles = async () => {
  console.log('Processing JavaScript files...');
  
  const jsFiles = getFilesWithExtension(distPath, '.js');
  
  for (const file of jsFiles) {
    console.log(`Processing JS: ${file}`);
    const content = fs.readFileSync(file, 'utf8');
    
    // Minify and obfuscate JS
    const result = await minify(content, {
      compress: {
        drop_console: false, // Set to true in production
      },
      mangle: true, // This helps with obfuscation
      output: {
        comments: false
      }
    });
    
    fs.writeFileSync(file, result.code);
  }
};

// Process CSS files - Minify
const processCssFiles = async () => {
  console.log('Processing CSS files...');
  
  const cssFiles = getFilesWithExtension(distPath, '.css');
  
  for (const file of cssFiles) {
    console.log(`Processing CSS: ${file}`);
    const content = fs.readFileSync(file, 'utf8');
    
    // Minify CSS using HTML minifier
    const minified = await minifyHtml(content, {
      minifyCSS: true
    });
    
    fs.writeFileSync(file, minified);
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

// Create _headers file for Cloudflare/Netlify (instead of .htaccess)
const createHeadersFile = () => {
  console.log('Creating _headers file for Cloudflare...');
  
  const headersContent = `# Security headers for Cloudflare
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.jsdelivr.net https://maps.googleapis.com https://cdnjs.cloudflare.com 'unsafe-inline'; style-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com 'unsafe-inline'; img-src 'self' data: https://*.googleapis.com https://*.gstatic.com; connect-src 'self' https://*.googleapis.com; font-src 'self' https://cdnjs.cloudflare.com data:; frame-src 'self'; object-src 'none'
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: no-referrer-when-downgrade
  Permissions-Policy: geolocation=self, microphone=(), camera=()
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
`;

  fs.writeFileSync(path.join(distPath, 'robots.txt'), robotsContent);
};

// Create a sample .env.example file for documentation
const createEnvExample = () => {
  console.log('Creating .env.example...');
  
  const envContent = `# Environment Variables for Rogue Drones Website
# Copy this file to .env and replace values with your actual API keys

# Google Maps API Key
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
`;

  // This goes in the project root, not in dist
  fs.writeFileSync('.env.example', envContent);
};

// Update the contact form
const updateContactForm = async () => {
  console.log('Updating contact form to use Cloudflare Worker...');
  
  const indexFile = path.join(distPath, 'index.html');
  if (fs.existsSync(indexFile)) {
    let content = fs.readFileSync(indexFile, 'utf8');
    
    // Add our form handling JavaScript before the closing body tag
    const formScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Contact form handler
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get submit button
      const submitButton = document.querySelector('#contact-form button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
      
      // Get form data
      const formData = new FormData(this);
      
      try {
        // TODO: Replace with your actual Cloudflare Worker URL
        const response = await fetch('https://YOUR_WORKER_URL.workers.dev', {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        // Handle response
        if (result.success) {
          // Reset form
          this.reset();
          
          // Show success message
          const formContainer = document.querySelector('.contact-form');
          const successMessage = document.createElement('div');
          successMessage.className = 'alert alert-success mt-3';
          successMessage.innerHTML = '<strong>Thank you!</strong> Your message has been sent. We\\'ll get back to you soon.';
          formContainer.appendChild(successMessage);
          
          // Remove message after 5 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        } else {
          // Show error message
          const formContainer = document.querySelector('.contact-form');
          const errorMessage = document.createElement('div');
          errorMessage.className = 'alert alert-danger mt-3';
          errorMessage.innerHTML = \`<strong>Error:</strong> \${result.error || 'Something went wrong. Please try again.'}\`;
          formContainer.appendChild(errorMessage);
          
          // Remove message after 5 seconds
          setTimeout(() => {
            errorMessage.remove();
          }, 5000);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        
        // Show error message
        const formContainer = document.querySelector('.contact-form');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger mt-3';
        errorMessage.innerHTML = '<strong>Error:</strong> Could not connect to the server. Please try again later.';
        formContainer.appendChild(errorMessage);
        
        // Remove message after 5 seconds
        setTimeout(() => {
          errorMessage.remove();
        }, 5000);
      } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
      }
    });
  }
});
</script>
`;

    // Insert form script before </body>
    content = content.replace('</body>', `${formScript}\n</body>`);
    fs.writeFileSync(indexFile, content);
  }
};

// Main build function
const build = async () => {
  try {
    await processHtmlFiles();
    await processJsFiles();
    await processCssFiles();
    createHeadersFile(); // Use _headers instead of .htaccess for GitHub Pages
    createRobotsTxt();
    createEnvExample();
    await updateContactForm();
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
};

// Run the build process
build();
```

# css\styles-new.css

```css
/* 
 * styles-new.css
 * Custom CSS for the Rogue Drones one-page landing site
 */

/* ===== General Styling ===== */
body {
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: #000;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
}

.section-title {
    font-weight: 700;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
}

.section-title::after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background-color: #ff6f61;
    margin-top: 10px;
}

/* ===== Hero Section ===== */
#hero {
    position: relative;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0;
}

#hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);  /* Dark overlay for better text visibility */
}

.hero-content {
    position: relative;
    z-index: 10;
    max-width: 800px;
}

.hero-logo {
    max-height: 450px;
    width: auto;
}

.btn-primary {
    background-color: #ff6f61;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background-color: #e55a4f;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* ===== About Section ===== */
#about {
    padding: 100px 0;
    background-color: #f8f9fa;
}

#about img {
    transition: transform 0.3s ease;
}

#about img:hover {
    transform: scale(1.02);
}

/* Google Maps Container Styling */
.google-earth-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 400px;
    transition: transform 0.3s ease;
    border: 2px solid #ff6f61;
    border-radius: 0.25rem;
}

.google-earth-container:hover {
    transform: scale(1.02);
}

/* Location button styling - compact icon version */
.location-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    background-color: #ff6f61;
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.location-button:hover {
    background-color: #e55a4f;
    transform: scale(1.05);
}

.location-button i {
    color: white;
    font-size: 16px;
}

/* Custom location label */
.location-label {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 2px;
    border-radius: 3px;
    margin-top: 50px;
}

/* Improved info window styling with logo */
.map-info {
    padding: 1px;
    height: auto;
    width: auto;
    text-align: center;
}

.map-logo {
    height: 100px;
    width: auto;
    margin-bottom: 20px;
}

@media (max-width: 767px) {
    .google-earth-container {
        height: 300px;
        margin-top: 2rem;
    }
}

/* ===== Services Section ===== */
#services {
    padding: 100px 0;
    background-color: #000;
    position: relative;
}

.service-box {
    border: 2px solid #ff6f61;
    border-radius: 10px;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.service-box:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(255, 111, 97, 0.2);
}

.service-icon {
    color: #ff6f61;
    text-align: center;
}

.service-features {
    list-style-type: none;
    padding-left: 0;
    margin-top: 1rem;
}

.service-features li {
    padding: 0.5rem 0;
    position: relative;
    padding-left: 1.5rem;
    font-size: 0.9rem;
}

.service-features li::before {
    content: "✓";
    color: #ff6f61;
    position: absolute;
    left: 0;
}

/* ===== Services Section ===== */
#services {
    padding: 100px 0;
    background-color: #000;
    position: relative;
}

.service-box {
    border: 2px solid #ff6f61;
    border-radius: 10px;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.service-box:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(255, 111, 97, 0.2);
}

.service-icon {
    color: #ff6f61;
    text-align: center;
}

.service-features {
    list-style-type: none;
    padding-left: 0;
    margin-top: 1rem;
}

.service-features li {
    padding: 0.5rem 0;
    position: relative;
    padding-left: 1.5rem;
    font-size: 0.9rem;
}

.service-features li::before {
    content: "✓";
    color: #ff6f61;
    position: absolute;
    left: 0;
}

/* ===== Portfolio Section ===== */
#portfolio {
    padding: 100px 0;
    background-color: #f8f9fa;
}

/* Fixed height image container */
.carousel-item .col-md-6:first-child {
    height: 450px; /* Fixed height for all image containers */
    overflow: hidden; /* Prevents overflow */
    display: flex;
    align-items: center;
}

/* Image styling */
.carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* This crops the image to fill the container while maintaining aspect ratio */
    display: block; /* Removes any extra space below the image */
}

/* Repositioned carousel controls */
.carousel-control-prev,
.carousel-control-next {
    background-color: rgba(0, 0, 0, 0.5);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    opacity: 0.8;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

/* Position controls outside the content */
.carousel-control-prev {
    left: -50px; /* Position outside the carousel */
}

.carousel-control-next {
    right: -50px; /* Position outside the carousel */
}

/* Hover effect for controls */
.carousel-control-prev:hover,
.carousel-control-next:hover {
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 1;
}

/* Control icons */
.carousel-control-prev-icon,
.carousel-control-next-icon {
    width: 20px;
    height: 20px;
}

/* Indicators at bottom */
.carousel-indicators {
    position: absolute;
    bottom: -40px; /* Position below the carousel */
}

.carousel-indicators button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 0 5px;
    background-color: #ccc;
}

.carousel-indicators .active {
    background-color: #ff6f61;
}

/* Mobile-first approach for carousel captions */
.carousel-caption {
    width: 100%;
    padding: 0 10px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    text-align: left;
    position: static !important;
    color: #333 !important;
}

.carousel-caption h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
}

.carousel-caption p {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    line-height: 1.4;
}

/* Specifically target the technology section */
.carousel-caption p:last-child {
    white-space: normal;
    width: 100%;
    max-width: 100%;
}

/* Responsive adjustments */
@media (max-width: 992px) {
    /* Move controls back inside on smaller screens */
    .carousel-control-prev {
        left: 10px;
    }
    
    .carousel-control-next {
        right: 10px;
    }
    
    /* Make controls more transparent on mobile */
    .carousel-control-prev,
    .carousel-control-next {
        background-color: rgba(0, 0, 0, 0.3);
        width: 35px;
        height: 35px;
    }
}

@media (max-width: 768px) {
    .carousel-item .col-md-6:first-child {
        height: 300px; /* Smaller height on mobile */
    }
    
    /* Adjust caption font sizes */
    .carousel-caption h3 {
        font-size: 1.2rem;
    }
    
    .carousel-caption p {
        font-size: 0.9rem;
    }
}

@media (min-width: 768px) {
    /* Only apply these styles on larger screens */
    .carousel-caption h3 {
        font-size: 1.75rem;
    }
    
    .carousel-caption p {
        font-size: 1rem;
    }
}

/* ===== Testimonials Section ===== */
#testimonials {
    padding: 100px 0;
    background-color: #2d2d2d;
    position: relative;
}

.testimonial-box {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    position: relative;
}

.fa-quote-left {
    color: #ff6f61;
    opacity: 0.5;
}

.testimonial-author {
    margin-top: 1.5rem;
    font-weight: bold;
}

/* ===== Contact Section ===== */
#contact {
    padding: 100px 0;
    background-color: #f8f9fa;
}

.contact-form {
    border-top: 4px solid #ff6f61;
}

.contact-info i {
    color: #ff6f61;
    font-size: 1.25rem;
}

.form-control:focus {
    border-color: #ff6f61;
    box-shadow: 0 0 0 0.25rem rgba(255, 111, 97, 0.25);
}

/* ===== Footer ===== */
footer {
    background-color: #1a1a1a;
    padding: 4rem 0 2rem;
}

/* Two-column layout for the footer */
.footer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
}

/* Left column - Logo and copyright */
.footer-brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.footer-brand img {
    height: 150px;
    width: auto;
    margin-bottom: 1.0rem;
}

.footer-brand .copyright {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    margin-bottom: 1.0rem;
}

/* Right column - Links and social */
.footer-links {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2rem;
}

/* Navigation links */
.footer-nav {
    display: flex;
    gap: 2rem;
}

.footer-nav a {
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    position: relative;
    padding-bottom: 1.5 rem;
    transition: color 0.3s ease;
}

.footer-nav a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #ff6f61;
    transition: width 0.3s ease;
}

.footer-nav a:hover {
    color: #ff6f61;
}

.footer-nav a:hover::after {
    width: 100%;
}

/* Social icons */
.footer-social {
    display: flex;
    gap: 1.2rem;
}

.footer-social a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    transition: all 0.3s ease;
}

.footer-social a:hover {
    background-color: #ff6f61;
    transform: translateY(-3px);
}

/* Responsive adjustments */
@media (max-width: 767px) {
    .footer-grid {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2.5rem;
    }
    
    .footer-brand, .footer-links {
        align-items: center;
    }
    
    .footer-brand img {
        margin-bottom: 1rem;
    }
    
    .footer-nav {
        gap: 1.5rem;
    }
}

/* ===== Responsive Adjustments ===== */
@media (max-width: 991px) {
    .section-title {
        text-align: center;
        display: block;
    }
    
    .section-title::after {
        margin: 10px auto 0;
    }
    
    #about {
        text-align: center;
    }
    
    #about img {
        margin-top: 2rem;
    }
}

@media (max-width: 768px) {
    #hero {
        height: 80vh;
    }
    
    .hero-logo {
        max-height: 200px;
    }
    
    .service-box {
        margin-bottom: 2rem;
    }
    
    /* Improve carousel for mobile */
    .carousel-item .row {
        flex-direction: column;
    }
    
    .carousel-item .col-md-6:first-child {
        margin-bottom: 1rem;
    }
    
    /* Adjust spacing for mobile */
    #portfolio {
        padding: 50px 0;
    }
    
    #portfolio .container {
        padding-left: 15px;
        padding-right: 15px;
        max-width: 100%;
    }
    
    /* Fix for the carousel item width */
    .carousel-item {
        padding: 0 5px;
    }
}

@media (max-width: 576px) {
    .hero-logo {
        max-height: 180px;
    }
    
    h1.display-4 {
        font-size: 2.5rem;
    }
    
    .btn-lg {
        padding: 0.5rem 1rem;
        font-size: 1rem;
    }
    
    #testimonials .lead {
        font-size: 1rem;
    }
}

/* ===== Smooth Scrolling ===== */
html {
    scroll-behavior: smooth;
}

/* ===== Animations ===== */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.fadeIn {
    animation: fadeIn 1s ease-out forwards;
}
```

# images\App Background - 2048 x 2732px.gif

This is a binary file of the type: Image

# images\desktop.ini

```ini
[LocalizedFileNames]
App Background - 2048 x 2732px.gif=@App Background - 2048 x 2732px.gif,0
Screenshot 2025-05-17 182209.png=@Screenshot 2025-05-17 182209.png,0

```

# images\GorseBusters.png

This is a binary file of the type: Image

# images\home_image.JPG

This is a binary file of the type: Image

# images\rogue_drones_black.png

This is a binary file of the type: Image

# images\rogue_drones_white.png

This is a binary file of the type: Image

# images\Screenshot 2025-05-17 200041.png

This is a binary file of the type: Image

# index-new.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rogue Drones - Mapping the Future</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/styles-new.css">
    <!-- Font Awesome for icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <!-- Google Maps JavaScript API - Will be replaced by dynamic loading script -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkCfjNvZudhVc4uhIDurq-GIB8MzkP448&callback=initMap" defer></script>
</head>

<body>
    <!-- Hero Section -->
    <section id="hero" class="d-flex flex-column justify-content-center" style="background-image: url('images/home_image.JPG');">
        <div class="container hero-content text-center text-white">
            <img src="images/rogue_drones_white.png" alt="Rogue Drones Logo" class="mb-4 img-fluid hero-logo">
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
                    <div id="map-container" class="google-earth-container rounded shadow-lg">
                        <!-- Map will be loaded here by JavaScript -->
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

    <!-- Portfolio Section with Manual Carousel -->
    <section id="portfolio" class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title text-center mb-5">Our Work</h2>
            <div id="portfolio-carousel" class="carousel slide" data-bs-interval="false">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="images/Screenshot 2025-05-17 200041.png" class="d-block w-100 rounded" alt="Project 1">
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
                    <div class="carousel-item">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="images/GorseBusters.png" class="d-block w-100 rounded" alt="Project 2">
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
                                <img src="images/App Background - 2048 x 2732px.gif" class="d-block w-100 rounded" alt="Project 3">
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
                    <p class="lead mb-4">Interested in working with us? Have questions about our services?<br class="d-none d-md-block"> Drop us a line, and we'll get back to you as soon as possible.</p>
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
                    <img src="images/rogue_drones_white.png" alt="Rogue Drones Logo">
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
    <!-- Custom JS -->
    <script src="js/main-new.js"></script>
</body>
</html>
```

# js\main-new.js

```js
/**
 * js/main-new.js
 * Custom JavaScript for the Rogue Drones one-page landing site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animation on scroll
    initScrollAnimation();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize the contact form
    initContactForm();
    
    // Portfolio carousel extra functionality
    initPortfolioCarousel();
    
});

/**
 * Initializes animations for elements as they scroll into view
 */
function initScrollAnimation() {
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.service-box, .section-title, #about img, .contact-form');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add the fadeIn class when the element is visible
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                // Once the animation is done, no need to observe anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // relative to viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: '0px' // no margin
    });
    
    // Observe each element
    animateElements.forEach(element => {
        // Remove any existing animation
        element.classList.remove('fadeIn');
        // Set initial state
        element.style.opacity = '0';
        // Observe the element
        observer.observe(element);
    });
}

/**
 * Initializes smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    // Get all links that have an hash
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Only scroll if the target exists
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Get the target's position relative to the viewport
                    const rect = targetElement.getBoundingClientRect();
                    
                    // Get the current scroll position
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    // Calculate the target's position on the page
                    const targetPosition = rect.top + scrollTop;
                    
                    // Scroll to the target position
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Initialize Google Maps with New Zealand focus
 */
let map;
function initMap() {
    // Check if the map container exists
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;
    
    // Create the map centered on New Zealand
    map = new google.maps.Map(mapContainer, {
        center: { lat: -41.2, lng: 172.5 }, // Center of New Zealand
        zoom: 5,
        mapTypeId: 'satellite', // Start with satellite view
        tilt: 0,
        heading: 0,
        // UI controls
        zoomControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true,
        gestureHandling: 'greedy' // Makes it easier to navigate on touch devices
    });
    
    // Add a marker for Dunedin
    const dunedinMarker = new google.maps.Marker({
        position: { lat: -45.8742, lng: 170.5035 },
        map: map,
        title: 'Rogue Drones - Dunedin'
    });

    // Add an info window for the marker with logo
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="map-info">
                <img src="images/rogue_drones_black.png" alt="Rogue Drones" class="map-logo">
            </div>
        `
    });

    // Open info window when marker is clicked
    dunedinMarker.addListener('click', function() {
        infoWindow.open(map, dunedinMarker);
    });
        
    // Add a "Find My Location" button if geolocation is available
    if (navigator.geolocation) {
        const locationButton = document.createElement('button');
        locationButton.innerHTML = '<i class="fas fa-location-arrow"></i>';
        locationButton.title = 'Find my location';
        locationButton.classList.add('btn', 'btn-sm', 'location-button');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(locationButton);
        
        locationButton.addEventListener('click', function() {
            // Get user's location
            navigator.geolocation.getCurrentPosition(
                // Success callback
                // Success callback for getting user location
                function(position) {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    // Add marker for user location with custom label
                    const userMarker = new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: 'Your Location',
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 8,
                            fillColor: '#4285F4',
                            fillOpacity: 1,
                            strokeColor: '#ffffff',
                            strokeWeight: 2
                        },
                        label: {
                            text: 'You are here',
                            color: '#ffffff',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            className: 'location-label'
                        }
                    });
                    
                    // Center map on user location
                    map.setCenter(userLocation);
                    map.setZoom(12);
                    
                    // No info window - cleaner look
                },
                // Error callback
                function() {
                    alert('Unable to get your location. Please check your browser settings to ensure location access is enabled.');
                }
            );
        });
    }
}

/**
 * Initializes the contact form with validation and submission handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form fields
        if (!validateForm(name, email, message)) {
            return;
        }
        
        // Simulate form submission
        simulateFormSubmission(name, email, subject, message);
    });
}

/**
 * Validates the contact form fields
 * @param {string} name - The name field value
 * @param {string} email - The email field value
 * @param {string} message - The message field value
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(name, email, message) {
    let isValid = true;
    
    // Simple validation
    if (name === '') {
        alert('Please enter your name');
        isValid = false;
    } else if (email === '') {
        alert('Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        isValid = false;
    } else if (message === '') {
        alert('Please enter a message');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

/**
 * Simulates a form submission
 * In a real implementation, this would send data to a server
 * @param {string} name - The name field value
 * @param {string} email - The email field value
 * @param {string} subject - The subject field value
 * @param {string} message - The message field value
 */
function simulateFormSubmission(name, email, subject, message) {
    // Disable the submit button
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
    
    // Simulate an AJAX request with a timeout
    setTimeout(() => {
        // Reset the form
        document.getElementById('contact-form').reset();
        
        // Re-enable the button and show success message
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
        
        // Display success message
        const formContainer = document.querySelector('.contact-form');
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.innerHTML = '<strong>Thank you!</strong> Your message has been sent. We\'ll get back to you soon.';
        formContainer.appendChild(successMessage);
        
        // Remove the success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
        
        // In a real implementation, you would send data to your server here
        console.log('Form submitted with the following data:');
        console.log({ name, email, subject, message });
    }, 1500); // Simulate network delay
}

/**
 * Initializes the portfolio carousel without auto-rotation
 */
function initPortfolioCarousel() {
    const carousel = document.getElementById('portfolio-carousel');
    
    if (!carousel) return;
    
    // Initialize carousel with auto-play disabled
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: false, // Disable auto-rotation
        wrap: true,      // Allow wrapping from last to first slide
        keyboard: true   // Enable keyboard controls
    });
    
    // Add keyboard navigation for the carousel
    document.addEventListener('keydown', (event) => {
        if (isElementInViewport(carousel)) {
            if (event.key === 'ArrowLeft') {
                carouselInstance.prev();
            } else if (event.key === 'ArrowRight') {
                carouselInstance.next();
            }
        }
    });
}

/**
 * Checks if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - Whether the element is in the viewport
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
```

# package.json

```json
{
  "name": "rogue-drones-website",
  "version": "1.0.0",
  "description": "Rogue Drones website with security enhancements",
  "main": "index.js",
  "scripts": {
    "build": "node build.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "drone",
    "mapping",
    "website"
  ],
  "author": "Rogue Drones",
  "license": "ISC",
  "dependencies": {
    "dotenv": "^16.5.0",
    "fs-extra": "^11.3.0",
    "html-minifier-terser": "^7.2.0",
    "terser": "^5.39.2"
  }
}

```

