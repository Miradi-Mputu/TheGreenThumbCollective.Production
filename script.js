// script.js - Simple JavaScript for website features

// LIGHTBOX FUNCTION - For viewing images bigger
function setupLightbox() {
    // Get the lightbox and its parts
    const lightbox = document.getElementById("imageModal");
    const lightboxImg = document.getElementById("modalImage");
    const caption = document.getElementById("caption");
    const closeBtn = document.querySelector(".modal-close");
    
    // If no lightbox on page, stop here
    if (!lightbox) return;
    
    // Get all clickable images
    const images = document.querySelectorAll(".picture-layout img");
    
    // Make each image open lightbox when clicked
    images.forEach(function(image) {
        image.onclick = function() {
            lightbox.style.display = "block";
            lightboxImg.src = this.src;
            caption.innerHTML = this.alt;
        }
    });
    
    // Close lightbox when X is clicked
    if (closeBtn) {
        closeBtn.onclick = function() {
            lightbox.style.display = "none";
        }
    }
    
    // Close lightbox when clicking outside image
    window.onclick = function(event) {
        if (event.target == lightbox) {
            lightbox.style.display = "none";
        }
    }
}

// CONTACT FORM CHECKING
function setupContactFormValidation() {
    const form = document.getElementById('contactForm');
    
    // If no form on page, stop here
    if (!form) return;
    
    // When form is submitted, check everything
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Don't reload page
        
        let allGood = true; // Start assuming everything is good
        
        // Check name field
        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (name.value.trim() === '') {
            nameError.style.display = 'block';
            allGood = false;
        } else {
            nameError.style.display = 'none';
        }
        
        // Check email field
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '' || !emailPattern.test(email.value)) {
            emailError.style.display = 'block';
            allGood = false;
        } else {
            emailError.style.display = 'none';
        }
        
        // Check message field
        const message = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        if (message.value.trim() === '') {
            messageError.style.display = 'block';
            allGood = false;
        } else {
            messageError.style.display = 'none';
        }
        
        // If everything is good, show success and clear form
        if (allGood) {
            alert('Thank you! Your message has been sent.');
            form.reset();
        }
    });
}

// ENQUIRY FORM CHECKING
function setupEnquiryFormValidation() {
    const form = document.getElementById('enquiryForm');
    
    // If no form on page, stop here
    if (!form) return;
    
    // When form is submitted, check everything
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Don't reload page
        
        let allGood = true; // Start assuming everything is good
        
        // Check enquiry type field
        const enquiryType = document.getElementById('enquiryType');
        if (enquiryType.value === '') {
            allGood = false;
            // Add visual feedback
            enquiryType.style.borderColor = '#e74c3c';
        } else {
            enquiryType.style.borderColor = '';
        }
        
        // Check name field
        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (name.value.trim() === '') {
            nameError.style.display = 'block';
            allGood = false;
        } else {
            nameError.style.display = 'none';
        }
        
        // Check email field
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '' || !emailPattern.test(email.value)) {
            emailError.style.display = 'block';
            allGood = false;
        } else {
            emailError.style.display = 'none';
        }
        
        // Check phone field
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        const phonePattern = /^[0-9]{10}$/;
        if (phone.value.trim() === '' || !phonePattern.test(phone.value)) {
            phoneError.style.display = 'block';
            allGood = false;
        } else {
            phoneError.style.display = 'none';
        }
        
        // Check message field
        const message = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        if (message.value.trim() === '') {
            messageError.style.display = 'block';
            allGood = false;
        } else {
            messageError.style.display = 'none';
        }
        
        // If everything is good, show success and clear form
        if (allGood) {
            alert('Thank you! Your enquiry has been submitted. We will get back to you soon with a quote.');
            form.reset();
        }
    });
    
    // Set minimum date for preferredDate field to today
    const today = new Date().toISOString().split('T')[0];
    const preferredDate = document.getElementById('preferredDate');
    if (preferredDate) {
        preferredDate.min = today;
    }
    
    // Auto-format phone number
    const phone = document.getElementById('phone');
    if (phone) {
        phone.addEventListener('input', function() {
            // Remove any non-digit characters
            this.value = this.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });
    }
}

// SIMPLE SHOPPING CART
function setupShoppingCart() {
    // Only work on products page
    if (!window.location.href.includes('products.html')) return;
    
    let cartItems = []; // Empty cart to start
    
    // Create cart counter display
    const cartDisplay = document.createElement('div');
    cartDisplay.textContent = 'Cart: 0';
    cartDisplay.className = 'cart-counter';
    document.body.appendChild(cartDisplay);
    
    // Get all product containers
    const productContainers = document.querySelectorAll('.product-container');
    
    productContainers.forEach(function(container) {
        // Create add to cart button
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.className = 'add-to-cart-btn';
        
        // Add button inside the product container after the product info
        container.appendChild(addButton);
        
        addButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Don't trigger lightbox when clicking button
            
            // Get product name from the product info
            const productInfo = container.querySelector('.product-info');
            const productName = productInfo.textContent;
            
            // Add to cart
            cartItems.push(productName);
            
            // Update cart display
            cartDisplay.textContent = `Cart: ${cartItems.length}`;
            
            // Show confirmation
            alert(`Added ${productName} to cart!`);
            
            // Button feedback
            addButton.textContent = '✓';
            addButton.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
            
            setTimeout(() => {
                addButton.textContent = '+';
                addButton.style.background = 'linear-gradient(135deg, #056a08, #4CAF50)';
            }, 1000);
        });
    });
}

// Initialize all functions when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupLightbox();
    setupContactFormValidation();
    setupEnquiryFormValidation();
    setupShoppingCart();
});