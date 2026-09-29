document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector('body');
  const navContainer = document.querySelector('header nav');
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navContainer) return;

  toggleBtn.addEventListener('click', () => {
    navContainer.classList.add('animate');
    navLinks.style.setProperty('right', '0');
    navContainer.classList.toggle('menu-open');
    body.classList.add('body-menu-open');
  });
})