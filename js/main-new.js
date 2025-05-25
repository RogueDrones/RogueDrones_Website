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