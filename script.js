/*
=======================================
  CodeWithW3S - Main JavaScript
  Author: CodeWithW3S
  Version: 1.0
=======================================
*/

// ===== Document Ready Function =====
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Initialize components
  initMobileMenu();
  initSkillBars();
  initBackToTop();
  initTypedEffect();
  initTestimonialSlider();
  initContactForm();
  initCodeEditor();
  
  // Add scroll animations
  initScrollAnimations();
});

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
  const menuIcon = document.querySelector('.menu-icon');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (menuIcon && navbar) {
    menuIcon.addEventListener('click', function() {
      this.classList.toggle('active');
      navbar.classList.toggle('active');
      
      // Toggle menu icon appearance
      const menuLines = this.querySelectorAll('.menu-line');
      if (this.classList.contains('active')) {
        menuLines[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        menuLines[1].style.opacity = '0';
        menuLines[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      } else {
        menuLines[0].style.transform = 'none';
        menuLines[1].style.opacity = '1';
        menuLines[2].style.transform = 'none';
      }
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuIcon.classList.remove('active');
        navbar.classList.remove('active');
        
        // Reset menu icon
        const menuLines = menuIcon.querySelectorAll('.menu-line');
        menuLines[0].style.transform = 'none';
        menuLines[1].style.opacity = '1';
        menuLines[2].style.transform = 'none';
      });
    });
  }
}

// ===== Skill Bars Animation =====
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  if (skillBars.length) {
    const animateSkillBars = () => {
      skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
          bar.style.width = width + '%';
        }
      });
    };
    
    // Use Intersection Observer for triggering animation
    const skillSection = document.querySelector('.skills');
    if (skillSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      observer.observe(skillSection);
    }
  }
}

// ===== Back To Top Button =====
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ===== Typed.js Effect =====
function initTypedEffect() {
  const jobTitleElement = document.querySelector('.job-title');
  
  if (jobTitleElement && typeof Typed !== 'undefined') {
    new Typed(jobTitleElement, {
      strings: [
        'Web Development Tutorials', 
        'Programming Courses', 
        'Coding Projects',
        'Learn to Code with Us'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 500,
      loop: true
    });
  }
}

// ===== Testimonial Slider =====
function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (track && slides.length && dots.length && prevBtn && nextBtn) {
    let currentIndex = 0;
    
    // Function to update slide position
    const updateSlidePosition = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update active dot
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };
    
    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
      updateSlidePosition();
    });
    
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
      updateSlidePosition();
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlidePosition();
      });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
      updateSlidePosition();
    }, 5000);
  }
}

// ===== Contact Form Validation =====
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.querySelector('.form-success');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset previous error messages
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(message => {
        message.textContent = '';
      });
      
      // Validate form
      let isValid = true;
      
      // Name validation
      const nameInput = document.getElementById('name');
      if (!nameInput.value.trim()) {
        const nameError = nameInput.nextElementSibling;
        nameError.textContent = 'Name is required';
        isValid = false;
      }
      
      // Email validation
      const emailInput = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        const emailError = emailInput.nextElementSibling;
        emailError.textContent = 'Email is required';
        isValid = false;
      } else if (!emailRegex.test(emailInput.value)) {
        const emailError = emailInput.nextElementSibling;
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
      }
      
      // Subject validation
      const subjectInput = document.getElementById('subject');
      if (!subjectInput.value.trim()) {
        const subjectError = subjectInput.nextElementSibling;
        subjectError.textContent = 'Subject is required';
        isValid = false;
      }
      
      // Message validation
      const messageInput = document.getElementById('message');
      if (!messageInput.value.trim()) {
        const messageError = messageInput.nextElementSibling;
        messageError.textContent = 'Message is required';
        isValid = false;
      }
      
      // If form is valid, show success message
      if (isValid && formSuccess) {
        // In a real application, you would submit the form data to a server here
        console.log('Form submitted successfully');
        
        // Show success message
        formSuccess.style.opacity = '1';
        formSuccess.style.visibility = 'visible';
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.style.opacity = '0';
          formSuccess.style.visibility = 'hidden';
        }, 5000);
      }
    });
  }
}

// ===== Interactive Code Editor =====
function initCodeEditor() {
  const editorTabs = document.querySelectorAll('.editor-tab');
  const editorCodes = document.querySelectorAll('.editor-code');
  const runBtn = document.querySelector('.run-btn');
  const resultFrame = document.getElementById('result-frame');
  
  if (editorTabs.length && editorCodes.length && runBtn && resultFrame) {
    // Switch between editor tabs
    editorTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs and code blocks
        editorTabs.forEach(t => t.classList.remove('active'));
        editorCodes.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding code block
        this.classList.add('active');
        const tabType = this.getAttribute('data-tab');
        document.getElementById(`${tabType}-code`).classList.add('active');
      });
    });
    
    // Run code when button is clicked
    runBtn.addEventListener('click', function() {
      const htmlCode = document.querySelector('#html-code pre code').textContent;
      const cssCode = document.querySelector('#css-code pre code').textContent;
      const jsCode = document.querySelector('#js-code pre code').textContent;
      
      // Create a document with the HTML, CSS, and JavaScript
      const resultDoc = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
        </html>
      `;
      
      // Display the result
      resultFrame.innerHTML = '';
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      resultFrame.appendChild(iframe);
      
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(resultDoc);
      iframeDocument.close();
    });
    
    // Run code initially
    runBtn.click();
  }
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const animatables = document.querySelectorAll('.section-title, .about-content, .skill-card, .project-card, .testimonial-card, .contact-form, .contact-info-card');
  
  if (animatables.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatables.forEach(element => {
      observer.observe(element);
    });
  }
  
  // Special animation for project cards
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length) {
    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-slideUp');
          }, index * 100);
          projectObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => {
      projectObserver.observe(card);
    });
  }
}