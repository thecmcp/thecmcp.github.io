let text = 'AGITATE, EDUCATE, ORGANIZE, ';

let animation_duration = 6;
let animation_delay = animation_duration / text.length;

function createOrbit() {
    let system = document.getElementById('orbit-container');
    
    for (let i = 0; i < text.length; i++) {
        let orbit = document.createElement('span');
        orbit.className = 'orbit';
        orbit.style.animationDelay = `${i * animation_delay}s`;
    
        let moon = document.createElement('span');
        moon.className = 'moon';

        let letter = document.createElement('h4');
        letter.textContent = text[i];
        moon.appendChild(letter);

        orbit.appendChild(moon);
    
        system.appendChild(orbit);
    }
}