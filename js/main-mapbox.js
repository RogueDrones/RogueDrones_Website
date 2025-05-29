/**
 * js/main-mapbox.js
 * Updated with EmailJS integration for contact form
 */

// Mapbox public access token
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9ndWUtZHJvbmVzIiwiYSI6ImNtMGhiOXg2ajA2a2IybG9ndWJ0Nm1lZzMifQ.NinfkW9LV2o2zhE9YjyUSg';

// EmailJS configuration - these will be replaced by build script
const EMAILJS_CONFIG = {
    publicKey: 'jYYdiIKGp82fYj07q',
    serviceId: 'service_afgq4m7',
    templateId: 'template_my8et0g'
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    // Initialize EmailJS
    emailjs.init({
        publicKey: EMAILJS_CONFIG.publicKey
    });
    
    initScrollAnimation();
    initSmoothScrolling();
    initContactFormWithEmailJS();
    initPortfolioCarousel();
    initMapboxMap();
});

/**
 * Initialize Mapbox map
 */
function initMapboxMap() {
    console.log('Initializing Mapbox map...');
    
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) {
        console.error('Map container not found!');
        return;
    }
    
    // Clear the loading spinner
    mapContainer.innerHTML = '';
    
    try {
        // Create the map centered on New Zealand
        const map = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [172.5, -41.0], // [longitude, latitude] for center of New Zealand
            zoom: 4.0,
            pitch: 0,
            bearing: 0
        });

        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
        map.addControl(new mapboxgl.ScaleControl({
            maxWidth: 100,
            unit: 'metric'
        }), 'bottom-left');

        // Wait for map to load before adding markers
        map.on('load', function() {
            console.log('Mapbox map loaded successfully');
            
            // Add marker for Dunedin
            const dunedinMarker = new mapboxgl.Marker({
                color: '#ff6f61' // Rogue Drones brand color
            })
            .setLngLat([170.5035, -45.8742])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div style="text-align: center; padding: 10px;">
                    <img src="images/rogue_drones_black.png" alt="Rogue Drones" style="height: 60px; margin-bottom: 10px;">
                    <h6 style="margin: 5px 0;">Rogue Drones</h6>
                    <p style="margin: 0; color: #666;">Dunedin, New Zealand</p>
                </div>
            `))
            .addTo(map);

            // Add geolocation control
            if (navigator.geolocation) {
                const geolocateControl = new mapboxgl.GeolocateControl({
                    positionOptions: { enableHighAccuracy: true },
                    trackUserLocation: true,
                    showUserHeading: true,
                    showAccuracyCircle: true,
                    fitBoundsOptions: { maxZoom: 12 }
                });
                map.addControl(geolocateControl, 'top-left');
            }
        });

        // Handle map errors
        map.on('error', function(error) {
            console.error('Mapbox error:', error);
            mapContainer.innerHTML = '<p class="text-center p-4">Map temporarily unavailable</p>';
        });

    } catch (error) {
        console.error('Error initializing Mapbox:', error);
        mapContainer.innerHTML = '<p class="text-center p-4">Map temporarily unavailable</p>';
    }
}

/**
 * Initialize contact form with EmailJS
 */
function initContactFormWithEmailJS() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim() || 'Contact Form Submission';
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!validateForm(name, email, message)) {
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        try {
            // Send email using EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'philhardman@roguedrones.co.nz'
            };
            
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );
            
            console.log('Email sent successfully:', response);
            
            // Reset form and show success message
            contactForm.reset();
            showFormMessage('success', '🎉 Thank you! Your message has been sent successfully. We\'ll get back to you soon!');
            
        } catch (error) {
            console.error('Error sending email:', error);
            showFormMessage('error', '❌ Sorry, there was an error sending your message. Please try emailing us directly at info@roguedrones.co.nz');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

function validateForm(name, email, message) {
    if (name === '') {
        showFormMessage('error', 'Please enter your name');
        return false;
    }
    if (email === '' || !isValidEmail(email)) {
        showFormMessage('error', 'Please enter a valid email address');
        return false;
    }
    if (message === '' || message.length < 10) {
        showFormMessage('error', 'Please enter a message (at least 10 characters)');
        return false;
    }
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(type, messageText) {
    const formContainer = document.querySelector('.contact-form');
    const existingMessages = formContainer.querySelectorAll('.alert');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    const alertClass = type === 'success' ? 'success' : 'danger';
    messageDiv.className = `alert alert-${alertClass} mt-3`;
    messageDiv.innerHTML = messageText;
    formContainer.appendChild(messageDiv);
    
    // Auto-remove message after 8 seconds
    setTimeout(() => {
        if (messageDiv && messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 8000);
}

/**
 * Initialize scroll animations
 */
function initScrollAnimation() {
    const animateElements = document.querySelectorAll('.service-box, .section-title, #about img, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

/**
 * Initialize smooth scrolling
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Initialize portfolio carousel
 */
function initPortfolioCarousel() {
    const carousel = document.getElementById('portfolio-carousel');
    if (!carousel) return;
    
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: false,
        wrap: true,
        keyboard: true
    });
    
    document.addEventListener('keydown', (event) => {
        if (isElementInViewport(carousel)) {
            if (event.key === 'ArrowLeft') carouselInstance.prev();
            if (event.key === 'ArrowRight') carouselInstance.next();
        }
    });
}

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && 
           rect.bottom <= window.innerHeight && 
           rect.right <= window.innerWidth;
}
