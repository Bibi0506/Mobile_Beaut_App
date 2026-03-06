document.addEventListener("DOMContentLoaded", () => {
    
    // 1. COMPONENT LOADER
    const loadComponent = (id, file) => {
        return fetch(file) // Added 'return' so we can wait for it
            .then(response => {
                if (!response.ok) throw new Error(`${file} not found`);
                return response.text();
            })
            .then(data => {
                document.getElementById(id).innerHTML = data;
                
                //setup the menu AFTER the header is loaded
                if (id === "header") {
                    setupMenu();
                }
            })
            .catch(err => console.error(err));
    };

    loadComponent("header", "header.html");
    loadComponent("footer", "footer.html");

    // 2. MENU LOGIC FUNCTION
    function setupMenu() {
        const hamburger = document.getElementById('hamburger-btn');
        const closeBtn = document.getElementById('close-btn');
        const mainMenu = document.getElementById('main-menu');

        console.log("Menu Setup Initialized"); // Check browser console to see this

        if (hamburger && mainMenu) {
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                mainMenu.classList.add('active');
            });
        }

        if (closeBtn && mainMenu) {
            closeBtn.addEventListener('click', () => {
                mainMenu.classList.remove('active');
            });
        }

        // Close menu if a link is clicked
        const links = document.querySelectorAll('.menu a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mainMenu.classList.remove('active');
            });
        });
    }

    // 3. REVIEW SYSTEM LOGIC 
    const stars = document.querySelectorAll(".star");
    const ratingDisplay = document.getElementById("rating");
    const reviewText = document.getElementById("review");
    const submitBtn = document.getElementById("submit");
    const reviewsContainer = document.getElementById("reviews");
    
    let selectedRating = 0;
    let currentSlide = 0;

    // Handle Star Selection
    stars.forEach((star) => {
        star.addEventListener("click", () => {
            selectedRating = parseInt(star.getAttribute("data-value"));
            ratingDisplay.innerText = selectedRating;
            stars.forEach((s, index) => {
                s.classList.toggle("active", index < selectedRating);
            });
        });
    });

    // Carousel Update Function
    function updateCarousel() {
        const cards = document.querySelectorAll(".review-card");
        if (cards.length === 0) return;
        const cardWidth = cards[0].offsetWidth + 20; // width + gap
        reviewsContainer.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    }

    // Handle Submit
    submitBtn.addEventListener("click", () => {
        const text = reviewText.value.trim();
        if (selectedRating === 0 || !text) {
            alert("Please select a rating and write a short review!");
            return;
        }

        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");
        const starIcons = "⭐".repeat(selectedRating);

        reviewCard.innerHTML = `
            <div style="font-size: 0.85rem; margin-bottom: 5px;">${starIcons}</div>
            <p style="color: var(--dark-text); font-weight: 600; margin-bottom: 4px;">Verified Client</p>
            <p style="font-size: 0.9rem; line-height: 1.4;">"${text}"</p>
        `;

        reviewsContainer.prepend(reviewCard);

        // Reset Form
        reviewText.value = "";
        selectedRating = 0;
        ratingDisplay.innerText = "0";
        stars.forEach(s => s.classList.remove("active"));

        // Move to the new review
        currentSlide = 0;
        updateCarousel();
    });

    // 3. CAROUSEL CONTROLS
    document.getElementById("nextBtn").addEventListener("click", () => {
        const cards = document.querySelectorAll(".review-card");
        if (currentSlide < cards.length - 1) {
            currentSlide++;
            updateCarousel();
        }
    });

    document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });
});

// function setupMenu() {
    const hamburger = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-btn');
    const mainMenu = document.getElementById('main-menu');

    if (hamburger && mainMenu) {
        // Open the menu
        hamburger.addEventListener('click', () => {
            mainMenu.classList.add('active');
        });
    }

    if (closeBtn && mainMenu) {
        // Close the menu
        closeBtn.addEventListener('click', () => {
            mainMenu.classList.remove('active');
        });
    }

    // Close menu if a link is clicked
    const links = document.querySelectorAll('.menu a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            mainMenu.classList.remove('active');
        });
    });


// Run setup immediately AND after a slight delay 
// (Useful if your header is loaded via fetch/main.js)
document.addEventListener('DOMContentLoaded', setupMenu);
window.onload = setupMenu;