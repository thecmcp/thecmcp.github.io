let pages = [];

// Only pages within this many of the open spread are rendered. Rendering all
// of them at once (each page is a full-size 3D layer with a large image)
// uses more memory than phones allow, and Safari crashes the tab.
const RENDER_RADIUS = 2;

document.addEventListener('DOMContentLoaded', function() {
    const flipBook = document.getElementById('flipbook');
    for (let i = 0; i <= NUM_PAGES; i+=2) {
        let page = document.createElement('div');
        page.classList.add('page');
        page.id = `page${Math.floor(i/2)}`;
        page.style.zIndex = Math.floor(NUM_PAGES/2) - Math.floor(i/2);

        let frontPage = document.createElement('div');
        frontPage.classList.add('front_page');
        let front_content = document.createElement('img');
        front_content.classList.add('content');
        front_content.dataset.src = `assets/pages/${i}.webp`;
        front_content.alt = `Page ${i}`;
        frontPage.appendChild(front_content);

        let edge_shading = document.createElement('img');
        edge_shading.classList.add('edge_shading');
        edge_shading.src = 'assets/images/edge_shading_front.webp';
        edge_shading.alt = 'Edge Shading';
        frontPage.appendChild(edge_shading);
        page.appendChild(frontPage);
        
        let backPage = document.createElement('div');
        backPage.classList.add('back_page');
        let back_content = document.createElement('img');
        back_content.classList.add('content');
        back_content.dataset.src = `assets/pages/${i+1}.webp`;
        back_content.alt = `Page ${i+1}`;
        backPage.appendChild(back_content);

        let back_edge_shading = document.createElement('img');
        back_edge_shading.classList.add('edge_shading');
        back_edge_shading.src = 'assets/images/edge_shading_back.webp';
        back_edge_shading.alt = 'Edge Shading';
        backPage.appendChild(back_edge_shading);
        page.appendChild(backPage);

        page.addEventListener('click', function() {
            flipPage(page);
        });

        flipBook.appendChild(page);
        pages.push(page);
    }

    pages[0].classList.add('front_cover');
    pages[pages.length - 1].classList.add('back_cover');
    renderNearbyPages();

    // Start scrolled to the middle so the closed cover is in view
    const container = flipBook.closest('.container');
    container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
});

const flipPage = (page) => {
    
    page.style.zIndex = pages.length;
    let pageIndex = parseInt(page.id.replace('page', ''));
    console.log(pageIndex);

    for (let i = 0; i < pages.length; i++) {
        if (i < pageIndex) {
            pages[i].style.zIndex = pages.length - pageIndex + i;
        } else if (i == pageIndex) {
            pages[i].style.zIndex = pages.length;
        }
        else {
            pages[i].style.zIndex = pages.length - i - 1;
        }
    }

    if (page.classList.contains('flipped')) {
        page.classList.remove('flipped');
    } else {
        page.classList.add('flipped');
    }

    renderNearbyPages();
};

// Shows pages near the open spread and removes the rest (and their images)
// from rendering so their memory can be freed
const renderNearbyPages = () => {
    const current = pages.filter((p) => p.classList.contains('flipped')).length;

    pages.forEach((page, i) => {
        const nearby = Math.abs(i - current) <= RENDER_RADIUS;
        page.classList.toggle('far', !nearby);
        page.querySelectorAll('img.content').forEach((img) => {
            if (nearby && !img.getAttribute('src')) {
                img.src = img.dataset.src;
            } else if (!nearby && img.getAttribute('src')) {
                img.removeAttribute('src');
            }
        });
    });
};