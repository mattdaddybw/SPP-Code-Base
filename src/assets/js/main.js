const body = document.querySelector('body');
const navContainer = document.querySelector('header nav');
const toggleBtn = document.querySelector('.nav-toggle');
// const navLinks = document.querySelector('.nav-links');

// if (!toggleBtn || !navContainer) return;

// toggleBtn.addEventListener('click', () => {
//   // navContainer.classList.add('animate');
//   // navLinks.style.setProperty('right', '0');
//   navContainer.classList.toggle('menu-open');
//   body.classList.add('body-menu-open')
// });

if (navContainer && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        navContainer.classList.add('menu-animated');
        const isOpen = navContainer.classList.toggle('menu-open');

        body.classList.toggle('body-menu-open', isOpen);
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });
    const desktopQuery = window.matchMedia('(min-width: 801px)');

    desktopQuery.addEventListener('change', (event) => {
      if (event.matches) {
          navContainer.classList.remove('menu-open', 'menu-animated');
          body.classList.remove('body-menu-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
}

// navContainer.addEventListener('transitionend', (event) => {
//   if (event.propertyName === 'transform') {
//     // navContainer.classList.remove('animate');
//     if (!navContainer.classList.contains('menu-open')) {
//       // navLinks.style.setProperty('right', '100vw');
//       body.classList.remove('body-menu-open')
//     }
//     console.log('transition done!');
//   }
// });