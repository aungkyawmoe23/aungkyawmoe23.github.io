// public/js/animations.js
document.addEventListener('DOMContentLoaded', function() {
  // Configure the Intersection Observer
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements with the 'scroll-animate' class
  const animatedElements = document.querySelectorAll('.scroll-animate');
  
  // Observe each element
  animatedElements.forEach(element => {
    observer.observe(element);
  });
});