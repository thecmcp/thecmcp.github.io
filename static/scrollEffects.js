function toggleNavBar() {

    if (window.innerWidth <= 768) {
        return;
    }

    let navSide = document.getElementById('nav-side');
    if (window.scrollY > 100) {
        navSide.style.transform = 'translateX(0%)';
    } else {
        navSide.style.transform = 'translateX(-100%)';
    }
}

function toggleOrbitingLogo() {
    if (window.innerWidth <= 768) {
        return;
    }

    let orbitingLogo = document.getElementById('orbiting-logo');
    if (window.scrollY > 100) {
        positionOrbitingLogo();
        orbitingLogo.classList.add('shrink');
    } else {
        orbitingLogo.classList.remove('shrink');
    }
}

// Places the shrunk logo midway between the side nav's top and bottom items
function positionOrbitingLogo() {
    let topItems = document.querySelector('.nav-side .top-items');
    let bottomItems = document.querySelector('.nav-side .bottom-items');
    if (!topItems || !bottomItems) {
        return;
    }

    let gapTop = topItems.getBoundingClientRect().bottom;
    let gapBottom = bottomItems.getBoundingClientRect().top;
    let orbitingLogo = document.getElementById('orbiting-logo');
    orbitingLogo.style.setProperty('--orbit-shrink-top', `${(gapTop + gapBottom) / 2}px`);
}

function toggleScrollDown() {
    let scrollDown = document.getElementById('scroll-down');
    if (window.scrollY > 100) {
        scrollDown.style.display = 'none';
    } else {
        scrollDown.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('home')) {
        createOrbit();
    }
    const scrollDown = document.getElementById('scroll-down');
    scrollDown.addEventListener('click', () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });
    window.addEventListener('scroll', toggleNavBar);
    window.addEventListener('scroll', toggleScrollDown);
    if (document.body.classList.contains('home')) {
        window.addEventListener('scroll', toggleOrbitingLogo);
        window.addEventListener('resize', positionOrbitingLogo);
    }
});