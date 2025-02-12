function toggleNavBar() {

    if (window.innerWidth <= 768) {
        return;
    }

    let orbitingLogo = document.getElementById('orbiting-logo');
    let navSide = document.getElementById('nav-side');
    let scrollDown = document.getElementById('scroll-down');
    if (window.scrollY > 100) {
        orbitingLogo.classList.add('shrink');
        navSide.style.transform = 'translateX(0%)';
        scrollDown.style.display = 'none';
    } else {
        orbitingLogo.classList.remove('shrink');
        navSide.style.transform = 'translateX(-100%)';
        scrollDown.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createOrbit();
    const scrollDown = document.getElementById('scroll-down');
    scrollDown.addEventListener('click', () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });
    window.addEventListener('scroll', toggleNavBar);
});