function toggleNavBar() {
    let orbitingLogo = document.getElementById('orbiting-logo');
    let navSide = document.getElementById('nav-side');
    if (window.scrollY > 100) {
        orbitingLogo.classList.add('shrink');
        navSide.style.transform = 'translateX(0%)';
    } else {
        orbitingLogo.classList.remove('shrink');
        navSide.style.transform = 'translateX(-100%)';
    }
}

document.addEventListener('DOMContentLoaded', createOrbit);
window.addEventListener('scroll', toggleNavBar);