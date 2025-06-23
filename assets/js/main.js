/**
* Template Name: BestAIApps
* Updated: Jan 2025 for AI Tools Directory
* Author: Custom Design for AI Tools Platform
* License: Custom License
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
    
    // Always apply scrolled class since header is fixed
    if (window.scrollY > 50) {
      selectBody.classList.add('scrolled');
    } else {
      selectBody.classList.remove('scrolled');
    }
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
  }
  
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100 // Adjust offset for fixed header
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper !== 'undefined') {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      });
    }
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  function initIsotope() {
    if (typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
      document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
        let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
        let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
        let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

        let initIsotope;
        imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
          initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter: filter,
            sortBy: sort
          });
        });

        isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
          filters.addEventListener('click', function() {
            isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
            this.classList.add('filter-active');
            initIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });
            if (typeof aosInit === 'function') {
              aosInit();
            }
          }, false);
        });
      });
    }
  }

  window.addEventListener("load", initIsotope);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop) - 80, // Account for fixed header
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200; // Adjust for fixed header
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Hero search functionality
   */
  function performHeroSearch() {
    const searchInput = document.getElementById('heroSearch');
    if (searchInput) {
      const searchTerm = searchInput.value;
      if (searchTerm.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
      }
    }
  }

  // Make performHeroSearch globally available
  window.performHeroSearch = performHeroSearch;

  // Enter key support for hero search
  const heroSearchInput = document.getElementById('heroSearch');
  if (heroSearchInput) {
    heroSearchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performHeroSearch();
      }
    });
  }

  /**
   * Search suggestions functionality
   */
  const searchSuggestions = [
    'ChatGPT', 'Midjourney', 'GitHub Copilot', 'Notion AI', 'Canva AI',
    'AI writing tools', 'AI image generators', 'AI code assistants',
    'AI design tools', 'AI productivity apps', 'AI analytics tools',
    'Grammarly', 'Jasper AI', 'Copy.ai', 'Runway ML', 'Stable Diffusion',
    'OpenAI', 'Anthropic Claude', 'Google Bard', 'Microsoft Copilot'
  ];

  function showSearchSuggestions(input) {
    const value = input.value.toLowerCase();
    if (value.length < 2) {
      hideSearchSuggestions();
      return;
    }

    const suggestions = searchSuggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(value)
    ).slice(0, 5);

    if (suggestions.length === 0) {
      hideSearchSuggestions();
      return;
    }

    // Create and show suggestions dropdown
    let dropdown = document.querySelector('.search-suggestions');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'search-suggestions';
      dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        max-height: 200px;
        overflow-y: auto;
        margin-top: 4px;
      `;
      input.parentElement.style.position = 'relative';
      input.parentElement.appendChild(dropdown);
    }

    dropdown.innerHTML = suggestions.map(suggestion => 
      `<div class="suggestion-item" style="padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #f1f5f9; transition: background-color 0.2s;">${suggestion}</div>`
    ).join('');

    // Add click handlers to suggestions
    dropdown.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f8fafc';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
      });
      
      item.addEventListener('click', () => {
        input.value = item.textContent;
        hideSearchSuggestions();
        performHeroSearch();
      });
    });

    // Hide suggestions when clicking outside
    setTimeout(() => {
      document.addEventListener('click', hideSearchSuggestionsOnClickOutside);
    }, 0);
  }

  function hideSearchSuggestions() {
    const dropdown = document.querySelector('.search-suggestions');
    if (dropdown) {
      dropdown.remove();
    }
    document.removeEventListener('click', hideSearchSuggestionsOnClickOutside);
  }

  function hideSearchSuggestionsOnClickOutside(e) {
    const searchContainer = document.querySelector('.search-container');
    const dropdown = document.querySelector('.search-suggestions');
    
    if (searchContainer && dropdown && !searchContainer.contains(e.target)) {
      hideSearchSuggestions();
    }
  }

  // Add search suggestions to hero search
  if (heroSearchInput) {
    heroSearchInput.addEventListener('input', function() {
      showSearchSuggestions(this);
    });
  }

  /**
   * Track tool clicks for analytics
   */
  function trackToolClick(toolName, category) {
    // Analytics tracking code
    console.log(`Tool clicked: ${toolName} in category: ${category}`);
    
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'tool_click', {
        event_category: 'Tools',
        event_label: toolName,
        custom_parameter_1: category
      });
    }
  }

  /**
   * Add click tracking to tool cards
   */
  function initToolTracking() {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
      const toolNameElement = card.querySelector('h3');
      const categoryElement = card.querySelector('.tool-category');
      
      if (toolNameElement && categoryElement) {
        const toolName = toolNameElement.textContent;
        const category = categoryElement.textContent;
        
        card.addEventListener('click', function(e) {
          if (!e.target.closest('.tool-actions')) {
            trackToolClick(toolName, category);
          }
        });
      }
    });
  }

  /**
   * Newsletter form handling
   */
  function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your backend
        console.log('Newsletter signup:', email);
        
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
          gtag('event', 'newsletter_signup', {
            event_category: 'Newsletter',
            event_label: 'hero_newsletter'
          });
        }
        
        // Show success message
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '';
          this.reset();
        }, 3000);
      });
    }
  }

  /**
   * Contact form handling
   */
  function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const loading = this.querySelector('.loading');
        const errorMessage = this.querySelector('.error-message');
        const sentMessage = this.querySelector('.sent-message');
        const submitBtn = this.querySelector('button[type="submit"]');
        
        // Show loading state
        if (loading) loading.style.display = 'block';
        if (errorMessage) errorMessage.style.display = 'none';
        if (sentMessage) sentMessage.style.display = 'none';
        if (submitBtn) submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
          if (loading) loading.style.display = 'none';
          if (sentMessage) sentMessage.style.display = 'block';
          if (submitBtn) submitBtn.disabled = false;
          this.reset();
          
          // Analytics tracking
          if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_form_submit', {
              event_category: 'Contact',
              event_label: 'main_contact_form'
            });
          }
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            if (sentMessage) sentMessage.style.display = 'none';
          }, 5000);
        }, 2000);
      });
    }
  }

  /**
   * Smooth scrolling for anchor links
   */
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerHeight = document.querySelector('#header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Add loading states to buttons
   */
  function initButtonLoadingStates() {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
      button.addEventListener('click', function() {
        if (this.href && !this.href.includes('#') && !this.target) {
          this.style.opacity = '0.7';
          this.style.pointerEvents = 'none';
          
          setTimeout(() => {
            this.style.opacity = '1';
            this.style.pointerEvents = 'auto';
          }, 2000);
        }
      });
    });
  }

  /**
   * Lazy loading for images
   */
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Enhanced card hover effects
   */
  function initCardHoverEffects() {
    // Category items hover effects
    document.querySelectorAll('.category-item').forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
      });
    });

    // Tool cards hover effects
    document.querySelectorAll('.tool-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
      });
    });

    // Blog items hover effects
    document.querySelectorAll('.blog-item').forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
      });
    });

    // Modern cards hover effects
    document.querySelectorAll('.modern-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
      });
    });
  }

  /**
   * Intersection Observer for animations
   */
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.modern-card, .category-item, .tool-card, .stats-item, .blog-item').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Performance optimization: Debounce function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Optimized scroll handler for parallax effects
   */
  function initParallaxEffects() {
    const handleScroll = debounce(() => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.hero');
      
      parallaxElements.forEach(element => {
        const speed = scrolled * 0.1;
        element.style.transform = `translateY(${speed}px)`;
      });
    }, 10);

    window.addEventListener('scroll', handleScroll);
  }

  /**
   * Error handling for external resources
   */
  function initErrorHandling() {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+';
        this.alt = 'Image not available';
      });
    });
  }

  /**
   * Dark mode toggle functionality
   */
  function initDarkMode() {
    // Create dark mode toggle button (optional)
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }

    function toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    }

    // Make toggleDarkMode globally available
    window.toggleDarkMode = toggleDarkMode;
  }

  /**
   * Keyboard navigation support
   */
  function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
      
      // ESC key to close mobile menu
      if (e.key === 'Escape') {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
        hideSearchSuggestions();
      }
    });

    document.addEventListener('mousedown', function() {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  /**
   * Analytics event tracking
   */
  function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
    
    // Console log for debugging
    console.log(`Analytics Event: ${category} - ${action} - ${label}`);
  }

  /**
   * Initialize all analytics tracking
   */
  function initAnalyticsTracking() {
    // Track newsletter signups
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function() {
        trackEvent('Newsletter', 'signup', 'hero_newsletter');
      });
    }

    // Track tool clicks
    document.querySelectorAll('.tool-card .btn-primary').forEach(btn => {
      btn.addEventListener('click', function() {
        const toolCard = this.closest('.tool-card');
        const toolName = toolCard.querySelector('h3').textContent;
        trackEvent('Tool', 'click', toolName);
      });
    });

    // Track category clicks
    document.querySelectorAll('.category-item').forEach(item => {
      item.addEventListener('click', function() {
        const categoryName = this.querySelector('h3').textContent;
        trackEvent('Category', 'click', categoryName);
      });
    });

    // Track search usage
    if (heroSearchInput) {
      heroSearchInput.addEventListener('focus', function() {
        trackEvent('Search', 'focus', 'hero_search');
      });
    }

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', debounce(() => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        trackEvent('Scroll', 'depth', `${scrollPercent}%`);
      }
    }, 1000));
  }

  /**
   * Service Worker registration for PWA capabilities
   */
  function initServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  /**
   * Initialize search filters (for search page)
   */
  function initSearchFilters() {
    const filtersToggle = document.querySelector('.filters-toggle');
    const filtersContent = document.querySelector('.filters-content');
    
    if (filtersToggle && filtersContent) {
      filtersToggle.addEventListener('click', function() {
        filtersContent.classList.toggle('show');
        const icon = this.querySelector('i');
        if (icon) {
          icon.classList.toggle('bi-chevron-down');
          icon.classList.toggle('bi-chevron-up');
        }
      });
    }

    // Handle filter changes
    const filterInputs = document.querySelectorAll('.filter-group select, .filter-group input');
    filterInputs.forEach(input => {
      input.addEventListener('change', function() {
        // Trigger search with new filters
        console.log('Filter changed:', this.name, this.value);
        // You would implement actual filtering logic here
      });
    });
  }

  /**
   * Initialize tooltips
   */
  function initTooltips() {
    // Simple tooltip implementation
    document.querySelectorAll('[data-tooltip]').forEach(element => {
      element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('data-tooltip');
        tooltip.style.cssText = `
          position: absolute;
          background: #333;
          color: white;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 14px;
          z-index: 10000;
          pointer-events: none;
          white-space: nowrap;
        `;
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
      });
      
      element.addEventListener('mouseleave', function() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
          tooltip.remove();
        }
      });
    });
  }

  /**
   * Initialize copy to clipboard functionality
   */
  function initCopyToClipboard() {
    document.querySelectorAll('[data-copy]').forEach(button => {
      button.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = this.textContent;
          this.textContent = 'Copied!';
          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        });
      });
    });
  }

  /**
   * Initialize all functionality when DOM is loaded
   */
  function initializeApp() {
    initToolTracking();
    initNewsletterForm();
    initContactForm();
    initSmoothScrolling();
    initButtonLoadingStates();
    initLazyLoading();
    initCardHoverEffects();
    initScrollAnimations();
    initParallaxEffects();
    initErrorHandling();
    initDarkMode();
    initKeyboardNavigation();
    initAnalyticsTracking();
    initServiceWorker();
    initSearchFilters();
    initTooltips();
    initCopyToClipboard();
    
    console.log('BestAIApps initialized successfully');
  }

  /**
   * Initialize when DOM is ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
      } else {
    initializeApp();
  }

  /**
   * Handle window resize events
   */
  function handleResize() {
    // Recalculate positions and sizes on resize
    const header = document.querySelector('#header');
    if (header) {
      const headerHeight = header.offsetHeight;
      document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
    }

    // Hide search suggestions on resize
    hideSearchSuggestions();

    // Close mobile menu on resize to desktop
    if (window.innerWidth > 1199 && document.querySelector('.mobile-nav-active')) {
      mobileNavToogle();
    }
  }

  window.addEventListener('resize', debounce(handleResize, 250));

  /**
   * Handle page visibility changes
   */
  function handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden, pause any animations or timers
      console.log('Page hidden');
    } else {
      // Page is visible, resume animations or timers
      console.log('Page visible');
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);

  /**
   * Handle online/offline status
   */
  function handleOnlineStatus() {
    if (navigator.onLine) {
      console.log('App is online');
      document.body.classList.remove('offline');
    } else {
      console.log('App is offline');
      document.body.classList.add('offline');
    }
  }

  window.addEventListener('online', handleOnlineStatus);
  window.addEventListener('offline', handleOnlineStatus);

  /**
   * Custom event system for inter-component communication
   */
  const EventBus = {
    events: {},
    
    on(event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    },
    
    emit(event, data) {
      if (this.events[event]) {
        this.events[event].forEach(callback => callback(data));
      }
    },
    
    off(event, callback) {
      if (this.events[event]) {
        this.events[event] = this.events[event].filter(cb => cb !== callback);
      }
    }
  };

  // Make EventBus globally available
  window.EventBus = EventBus;

  /**
   * Performance monitoring
   */
  function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        
        console.log(`Page load time: ${loadTime}ms`);
        
        // Track performance with analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'timing_complete', {
            name: 'page_load',
            value: Math.round(loadTime)
          });
        }
      }
    });

    // Monitor Core Web Vitals
    if ('web-vitals' in window) {
      // This would require importing the web-vitals library
      // getCLS(console.log);
      // getFID(console.log);
      // getLCP(console.log);
    }
  }

  /**
   * Accessibility improvements
   */
  function initAccessibility() {
    // Add skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView();
        }
      });
    }

    // Improve focus management for modals and dropdowns
    document.addEventListener('keydown', function(e) {
      // Trap focus in mobile menu when open
      if (document.querySelector('.mobile-nav-active') && e.key === 'Tab') {
        const focusableElements = document.querySelectorAll('.navmenu a, .mobile-nav-toggle');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });

    // Announce dynamic content changes to screen readers
    function announceToScreenReader(message) {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }

    // Make announceToScreenReader globally available
    window.announceToScreenReader = announceToScreenReader;
  }

  /**
   * Form validation utilities
   */
  function initFormValidation() {
    // Custom form validation
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
          e.preventDefault();
        }
      });

      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', function() {
          validateField(this);
        });
      });
    });

    function validateForm(form) {
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      return isValid;
    }

    function validateField(field) {
      const value = field.value.trim();
      let isValid = true;
      let errorMessage = '';

      // Required field validation
      if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
      }

      // Email validation
      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
      }

      // URL validation
      if (field.type === 'url' && value) {
        try {
          new URL(value);
        } catch {
          isValid = false;
          errorMessage = 'Please enter a valid URL';
        }
      }

      // Show/hide error message
      showFieldError(field, isValid ? '' : errorMessage);
      
      return isValid;
    }

    function showFieldError(field, message) {
      let errorElement = field.parentNode.querySelector('.field-error');
      
      if (message) {
        if (!errorElement) {
          errorElement = document.createElement('div');
          errorElement.className = 'field-error';
          errorElement.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 4px;';
          field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
        field.classList.add('error');
      } else {
        if (errorElement) {
          errorElement.remove();
        }
        field.classList.remove('error');
      }
    }
  }

  /**
   * Local storage utilities
   */
  const Storage = {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn('LocalStorage not available:', e);
      }
    },

    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.warn('LocalStorage not available:', e);
        return defaultValue;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn('LocalStorage not available:', e);
      }
    },

    clear() {
      try {
        localStorage.clear();
      } catch (e) {
        console.warn('LocalStorage not available:', e);
      }
    }
  };

  // Make Storage globally available
  window.Storage = Storage;

  /**
   * Cookie utilities
   */
  const Cookie = {
    set(name, value, days = 30) {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    },

    get(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },

    remove(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  };

  // Make Cookie globally available
  window.Cookie = Cookie;

  /**
   * Initialize additional features
   */
  function initAdditionalFeatures() {
    initPerformanceMonitoring();
    initAccessibility();
    initFormValidation();
    
    // Initialize user preferences
    const savedPreferences = Storage.get('userPreferences', {});
    if (savedPreferences.darkMode) {
      document.body.classList.add('dark-mode');
    }

    // Save user preferences on page unload
    window.addEventListener('beforeunload', () => {
      const preferences = {
        darkMode: document.body.classList.contains('dark-mode'),
        lastVisit: new Date().toISOString()
      };
      Storage.set('userPreferences', preferences);
    });
  }

  // Initialize additional features
  window.addEventListener('load', initAdditionalFeatures);

  /**
   * Global error handler
   */
  window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    
    // Track errors with analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: e.error.toString(),
        fatal: false
      });
    }
  });

  /**
   * Unhandled promise rejection handler
   */
  window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    
    // Track promise rejections with analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: 'Unhandled Promise Rejection: ' + e.reason,
        fatal: false
      });
    }
  });

  /**
   * Export main functions for external use
   */
  window.BestAIApps = {
    performHeroSearch,
    toggleDarkMode,
    trackEvent,
    EventBus,
    Storage,
    Cookie,
    announceToScreenReader: window.announceToScreenReader
  };

  console.log('BestAIApps main.js loaded successfully');

})();

/**
 * Additional utility functions outside the main IIFE
 */

/**
 * Format numbers with commas
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Truncate text to specified length
 */
function truncateText(text, length = 100) {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

/**
 * Generate random ID
 */
function generateId(prefix = 'id') {
  return prefix + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to element
 */
function scrollToElement(element, offset = 0) {
  const headerHeight = document.querySelector('#header')?.offsetHeight || 0;
  const elementPosition = element.offsetTop - headerHeight - offset;
  
  window.scrollTo({
    top: elementPosition,
    behavior: 'smooth'
  });
}

/**
 * Get URL parameters
 */
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

/**
 * Set URL parameter without page reload
 */
function setUrlParameter(name, value) {
  const url = new URL(window.location);
  url.searchParams.set(name, value);
  window.history.pushState({}, '', url);
}

// Make utility functions globally available
window.Utils = {
  formatNumber,
  truncateText,
  generateId,
  isInViewport,
  scrollToElement,
  getUrlParameter,
  setUrlParameter
};

