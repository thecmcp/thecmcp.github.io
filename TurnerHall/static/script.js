document.addEventListener("DOMContentLoaded", () => {
    const flipBook = document.getElementById("flip_book");

    // Add the front cover
    flipBook.innerHTML += `
        <div class="page" id="front_cover">
            <div class="front_page">
                <label for="front_checkbox"></label>
                <img class="edge_shading" src="./assets/images/front_page_edge_shading.webp" alt="Front page edge shading">
                <img class="front_content" src="./assets/images/front_cover.webp" alt="Front content">
            </div>
            <div class="back_page">
                <label for="front_checkbox"></label>
                <img class="edge_shading" src="./assets/images/back_page_edge_shading.webp" alt="Back page edge shading">
                <img class="back_content" src="./assets/images/inside_front_cover.webp" alt="Back content">
            </div>
        </div>
    `;

    // Fetch all images in the assets/images/pages directory
    const imagePaths = [
        "page1.webp", "page2.webp", "page3.webp", "page4.webp"
    ];
});


document.addEventListener("DOMContentLoaded", () => {
    const flipBook = document.getElementById("flip_book");

    // Add the front cover
    flipBook.innerHTML += `
        <div class="page" id="front_cover">
            <div class="front_page">
                <label for="front_checkbox"></label>
                <img class="edge_shading" src="./assets/images/front_page_edge_shading.webp" alt="Front page edge shading">
                <img class="front_content" src="./assets/images/front_cover.webp" alt="Front content">
            </div>
            <div class="back_page">
                <label for="front_checkbox"></label>
                <img class="edge_shading" src="./assets/images/back_page_edge_shading.webp" alt="Back page edge shading">
                <img class="back_content" src="./assets/images/inside_front_cover.webp" alt="Back content">
            </div>
        </div>
    `;

    // Fetch all images in the assets/images/pages directory
    const imagePaths = [
        "page1.webp", "page2.webp", "page3.webp", "page4.webp"
    ];
});