document.addEventListener('DOMContentLoaded', function() {
  // Initialize skill progress animations
  const skillBars = document.querySelectorAll('.skill-progress');
  
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to animate skill bars when in viewport
  function animateSkillBars() {
    skillBars.forEach(bar => {
      if (isInViewport(bar)) {
        bar.style.width = bar.style.width || '0%';
        const targetWidth = bar.getAttribute('style').split(':')[1].trim();
        bar.style.width = targetWidth;
      }
    });
  }
  
  // Trigger animation on scroll
  window.addEventListener('scroll', animateSkillBars);
  // Trigger once on page load
  animateSkillBars();
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would normally send the data to a server
      // For demonstration, we'll just log it and show a success message
      console.log({
        name,
        email,
        subject,
        message
      });
      
      // Reset form
      contactForm.reset();
      
      // Show success message
      const formButton = contactForm.querySelector('button[type="submit"]');
      const originalText = formButton.textContent;
      
      formButton.textContent = 'Message Sent!';
      formButton.style.backgroundColor = '#10B981'; // Green color
      
      // Reset button after 3 seconds
      setTimeout(() => {
        formButton.textContent = originalText;
        formButton.style.backgroundColor = '';
      }, 3000);
    });
  }
  
  // Enhanced typing animation for hero name
  const heroTitle = document.querySelector('.hero-content h1');
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    const nameStart = originalText.indexOf('Hunter Howard');
    
    heroTitle.innerHTML = originalText.slice(0, nameStart) + 
      '<span class="name-typing"></span>';
    
    const nameElement = heroTitle.querySelector('.name-typing');
    const name = 'Hunter Howard';
    
    function typeWriterName() {
      let i = 0;
      function type() {
        if (i < name.length) {
          nameElement.innerHTML += name.charAt(i);
          i++;
          setTimeout(type, 100);
        }
      }
      type();
    }
    
    // Start typing animation with a delay
    setTimeout(typeWriterName, 500);
  }
});