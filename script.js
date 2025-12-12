/* --- 1. INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Animation Library (AOS)
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true
    });

    // Initialize 3D Tilt for Service Cards
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    loadProperties();
    initCursor();
    initCalculator();
});

/* --- 2. FUTURISTIC CURSOR LOGIC --- */
function initCursor() {
    const dot = document.querySelector("[data-cursor-dot]");
    const outline = document.querySelector("[data-cursor-outline]");

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        // Outline follows with delay (Smooth effect)
        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });
}

/* --- 3. PROPERTY DATA & SLIDER --- */
const properties = [
    {
        title: "The Lal Kothi",
        location: "Lal Kothi",
        price: "₹ 5.2 Cr",
        image: "images/lalkothi.png"
    },
    {
        title: "Pullu Mansion",
        location: "Sivad Area",
        price: "₹ 8.5 Cr",
        image: "images/sivadarea.png"
    },
    {
        title: "Skyline Heights",
        location: "C-Scheme",
        price: "₹ 2.8 Cr",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop"
    },
    
    {
        title: "Urban Oasis",
        location: "Malviya Nagar",
        price: "₹ 3.1 Cr",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop"
    }
];

function loadProperties() {
    const list = document.getElementById('property-list');
    
    // Scroller Container Styles
    list.style.display = "flex";
    list.style.gap = "30px";
    list.style.overflowX = "auto";
    list.style.padding = "20px 0";
    list.style.scrollBehavior = "smooth";
    list.style.scrollbarWidth = "none"; 

    properties.forEach(prop => {
        const card = document.createElement('div');
        // Card Styling
        card.style.minWidth = "320px";
        card.style.background = "rgba(255,255,255,0.03)";
        card.style.border = "1px solid rgba(255,255,255,0.1)";
        card.style.borderRadius = "15px";
        card.style.padding = "15px";
        card.style.color = "#fff";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        
        // Encode data for URL
        const queryParams = new URLSearchParams({
            title: prop.title,
            price: prop.price,
            location: prop.location,
            image: prop.image
        }).toString();

        card.innerHTML = `
            <div style="position:relative; height:200px; overflow:hidden; border-radius:10px; margin-bottom:15px;">
                <img src="${prop.image}" style="width:100%; height:100%; object-fit:cover; transition:0.5s;">
            </div>
            <h3 style="font-family:'Playfair Display', serif; font-size:1.4rem; margin-bottom:5px;">${prop.title}</h3>
            <p style="color:#a0a0a0; font-size:0.9rem; margin-bottom:15px;"><i class="fas fa-map-marker-alt" style="color:#c5a059;"></i> ${prop.location}</p>
            
            <div style="margin-top:auto; display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.1); padding-top:15px;">
                <div style="color:#c5a059; font-weight:bold; font-size:1.1rem;">${prop.price}</div>
                <button class="btn-details" onclick="playAndOpen('${queryParams}')">View Details</button>
            </div>
        `;
        list.appendChild(card);
    });

    // Slider Buttons
    document.getElementById('nextProp').addEventListener('click', () => {
        list.scrollBy({ left: 320, behavior: 'smooth' });
    });
    document.getElementById('prevProp').addEventListener('click', () => {
        list.scrollBy({ left: -320, behavior: 'smooth' });
    });
}

// Function to Play Sound and Open New Tab
function playAndOpen(queryParams) {
    // 1. Play sound on current page
    const audio = document.getElementById('home-audio');
    if(audio) {
        audio.play().catch(e => console.log("Audio play failed: ", e));
    }

    // 2. Open new tab immediately
    window.open(`details.html?${queryParams}`, '_blank');
}
/* --- 4. MORTGAGE CALCULATOR --- */
function initCalculator() {
    const priceInput = document.getElementById('priceRange');
    const dpInput = document.getElementById('dpRange');
    const intInput = document.getElementById('intRange');
    
    const priceVal = document.getElementById('priceValue');
    const dpVal = document.getElementById('dpValue');
    const intVal = document.getElementById('intValue');
    const resultDisplay = document.getElementById('emiResult');

    function calculateEMI() {
        const P = parseFloat(priceInput.value); // Principal
        const dpPercent = parseFloat(dpInput.value);
        const r = parseFloat(intInput.value) / 12 / 100; // Monthly Interest
        const n = 20 * 12; // 20 Years Tenure Fixed for simplicity

        const loanAmount = P - (P * (dpPercent / 100));
        
        // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
        const emi = loanAmount * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));

        // Update Display Text
        priceVal.innerText = `₹ ${(P / 10000000).toFixed(2)} Cr`;
        dpVal.innerText = `${dpPercent}%`;
        intVal.innerText = `${intInput.value}%`;

        // Format Result to Indian Currency
        resultDisplay.innerText = "₹ " + Math.round(emi).toLocaleString('en-IN');
    }

    // Attach Listeners
    priceInput.addEventListener('input', calculateEMI);
    dpInput.addEventListener('input', calculateEMI);
    intInput.addEventListener('input', calculateEMI);

    // Initial Calc
    calculateEMI();
}
/* --- 5. MOBILE MENU LOGIC --- */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle Menu
        navLinks.classList.toggle('nav-active');
        
        // Toggle Hamburger Icon Animation (Optional: change icon)
        if(navLinks.classList.contains('nav-active')){
            hamburger.innerHTML = '<i class="fas fa-times"></i>'; // Change to X
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>'; // Back to Bars
        }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}