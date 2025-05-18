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
    
    // Update script loading to use dynamic loading approach with proper async patterns
    content = content.replace(
    /<script src="https:\/\/maps\.googleapis\.com\/maps\/api\/js\?key=.*&callback=initMap" defer><\/script>/,
    `<script>
        // Load Maps API dynamically
        function loadGoogleMapsApi() {
        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap&loading=async&v=weekly";
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