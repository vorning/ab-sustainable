document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
    
    themeToggleBtn.addEventListener('click', function() {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Dark mode example demo
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeDemo = document.getElementById('dark-mode-demo');
    
    darkModeToggle.addEventListener('click', function() {
        darkModeDemo.classList.toggle('dark');
        updateDarkModeStats();
    });
    
    // Reduced motion example demo
    const motionToggle = document.getElementById('motion-toggle');
    const animatedElement = document.querySelector('.animated-element');
    
    motionToggle.addEventListener('click', function() {
        animatedElement.classList.toggle('animate');
        updateMotionStats();
    });
    
    // Carbon calculator functionality
    const calculateButton = document.getElementById('calculate-carbon');
    const calculatorResults = document.querySelector('.calculator-results');
    const carbonResult = document.getElementById('carbon-result');
    const treeResult = document.getElementById('tree-result');
    
    calculateButton.addEventListener('click', function() {
        const pageSize = parseFloat(document.getElementById('page-size').value);
        const monthlyVisits = parseFloat(document.getElementById('monthly-visits').value);
        const hostingType = document.getElementById('hosting-type').value;
        
        // Calculate carbon footprint
        // Formula: page size (KB) * visits * 0.0000002 kg CO2 per KB
        // Green hosting reduces emissions by 60%
        let carbonFootprint = pageSize * monthlyVisits * 0.0000002 * 12; // Annual emission
        
        if (hostingType === 'green') {
            carbonFootprint *= 0.4; // 60% reduction
        }
        
        // Calculate trees needed to offset
        // On average, one tree absorbs about 21 kg of CO2 per year
        const treesNeeded = carbonFootprint / 21;
        
        // Display results
        carbonResult.textContent = carbonFootprint.toFixed(2);
        treeResult.textContent = treesNeeded.toFixed(1);
        calculatorResults.classList.add('active');
    });
    
    // Keep track of sustainable choices
    function updateDarkModeStats() {
        let darkModeActivations = parseInt(localStorage.getItem('darkModeActivations') || '0');
        darkModeActivations++;
        localStorage.setItem('darkModeActivations', darkModeActivations);
        
        // Could add a visual indicator showing how many times dark mode was activated
        console.log(`Dark mode has been activated ${darkModeActivations} times, saving approximately ${(darkModeActivations * 0.05).toFixed(2)} kWh of energy`);
    }
    
    function updateMotionStats() {
        let motionReductions = parseInt(localStorage.getItem('motionReductions') || '0');
        motionReductions++;
        localStorage.setItem('motionReductions', motionReductions);
        
        // Could add a visual indicator showing how many times reduced motion was activated
        console.log(`Reduced motion has been activated ${motionReductions} times, saving approximately ${(motionReductions * 0.02).toFixed(2)} kWh of energy`);
    }
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(function(image) {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        });
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Check if reduced motion is preferred
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                
                if (prefersReducedMotion) {
                    // Just jump to the section without animation
                    targetElement.scrollIntoView();
                } else {
                    // Smooth scroll with animation
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Page load time calculation
    const pageLoadTime = performance.now();
    console.log(`Page fully loaded in ${pageLoadTime.toFixed(2)} milliseconds`);
    
    // Optional: Add a performance metrics display
    const footer = document.querySelector('.footer-bottom');
    const performanceMetric = document.createElement('p');
    performanceMetric.textContent = `Page loaded in ${pageLoadTime.toFixed(0)}ms`;
    performanceMetric.style.fontSize = '0.8rem';
    performanceMetric.style.opacity = '0.7';
    footer.appendChild(performanceMetric);
});