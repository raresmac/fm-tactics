// Get all headers with the class 'tooltip-header'
const headers = document.querySelectorAll('.tooltip-header');
const tooltip = document.getElementById('tooltip');

// Function to show the tooltip with animation
headers.forEach(header => {
  header.addEventListener('mouseenter', (event) => {
    const tooltipText = event.target.getAttribute('data-tooltip');
    
    // Set the tooltip text
    tooltip.textContent = tooltipText;
    
    // Position the tooltip above the header
    const headerRect = event.target.getBoundingClientRect();
    tooltip.style.left = `${headerRect.left}px`;
    tooltip.style.top = `${headerRect.top - tooltip.offsetHeight - 10}px`; // 10px offset for animation
    
    // Show the tooltip with the fade-in animation
    tooltip.classList.add('show');
  });

  header.addEventListener('mouseleave', () => {
    // Hide the tooltip
    tooltip.classList.remove('show');
  });
});
