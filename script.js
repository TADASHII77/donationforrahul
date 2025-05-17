// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Add click handlers for donation buttons
    const donationButtons = document.querySelectorAll('.donation-amounts .btn');
    donationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            donationButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // If it's the custom amount button, show input
            if (this.textContent === 'Custom') {
                const customAmount = prompt('Enter your donation amount:');
                if (customAmount && !isNaN(customAmount)) {
                    showDonationConfirmation(customAmount);
                }
            } else {
                showDonationConfirmation(this.textContent);
            }
        });
    });

    // Payment method buttons
    const paymentButtons = document.querySelectorAll('.payment-options .btn');
    paymentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const method = this.textContent.trim();
            showPaymentMethod(method);
        });
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero-section');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    // Update progress bar animation
    const progressBar = document.querySelector('.progress-bar');
    let progress = 0;
    const targetProgress = 65; // This should match the aria-valuenow

    function updateProgress() {
        if (progress < targetProgress) {
            progress++;
            progressBar.style.width = progress + '%';
            progressBar.setAttribute('aria-valuenow', progress);
            setTimeout(updateProgress, 30);
        }
    }

    // Start progress animation when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateProgress();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(document.querySelector('.progress'));

    // Add hover effect to medical expenses
    const medicalExpenses = document.querySelectorAll('.medical-expenses li');
    medicalExpenses.forEach(expense => {
        expense.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        expense.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Image Gallery Functionality
    const mainImage = document.querySelector('.main-image img');
    const imageGrid = document.querySelectorAll('.image-grid img');
    
    imageGrid.forEach(img => {
        img.addEventListener('click', function() {
            // Store the main image source
            const mainSrc = mainImage.src;
            // Update main image with clicked image
            mainImage.src = this.src;
            // Update clicked image with main image
            this.src = mainSrc;
            
            // Add animation effect
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 100);
        });
    });

    // Add lightbox functionality
    function createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <img src="" alt="Enlarged view">
            </div>
        `;
        document.body.appendChild(lightbox);
        return lightbox;
    }

    const lightbox = createLightbox();
    const lightboxImg = lightbox.querySelector('img');
    const closeLightbox = lightbox.querySelector('.close-lightbox');

    // Open lightbox when clicking main image
    mainImage.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close lightbox
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Emotional Music Control
    const emotionalMusic = document.getElementById('emotionalMusic');
    const emotionalMusicToggle = document.getElementById('emotionalMusicToggle');
    const emotionalMusicIcon = emotionalMusicToggle.querySelector('i');

    // Function to toggle music
    function toggleEmotionalMusic() {
        if (emotionalMusic.paused) {
            emotionalMusic.play().catch(error => {
                console.log("Autoplay prevented:", error);
            });
            emotionalMusicIcon.classList.remove('fa-volume-mute');
            emotionalMusicIcon.classList.add('fa-volume-up');
        } else {
            emotionalMusic.pause();
            emotionalMusicIcon.classList.remove('fa-volume-up');
            emotionalMusicIcon.classList.add('fa-volume-mute');
        }
    }

    // Try to play music immediately when page loads
    emotionalMusic.play().catch(error => {
        console.log("Initial autoplay prevented:", error);
        // If autoplay fails, try to play on first user interaction
        document.addEventListener('click', function() {
            emotionalMusic.play().then(() => {
                emotionalMusicIcon.classList.remove('fa-volume-mute');
                emotionalMusicIcon.classList.add('fa-volume-up');
            }).catch(error => {
                console.log("Playback failed:", error);
            });
        }, { once: true });
    });

    // Add click event listener to the toggle button
    emotionalMusicToggle.addEventListener('click', toggleEmotionalMusic);

    // Set initial volume
    emotionalMusic.volume = 0.5; // Set to 50% volume
});

// Show donation confirmation
function showDonationConfirmation(amount) {
    const modal = document.createElement('div');
    modal.className = 'donation-modal';
    modal.innerHTML = `
        <div class="donation-modal-content">
            <h3>Thank You for Your Donation!</h3>
            <p>Your contribution of ${amount} will help make a difference.</p>
            <p>A confirmation email has been sent to your registered email address.</p>
            <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Show payment method
function showPaymentMethod(method) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="payment-modal-content">
            <h3>Complete Your Donation</h3>
            <p>You've selected ${method} as your payment method.</p>
            <div class="payment-form">
                <div class="form-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" maxlength="19">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM/YY" maxlength="5">
                    </div>
                    <div class="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="123" maxlength="3">
                    </div>
                </div>
                <button class="btn btn-primary">Complete Payment</button>
            </div>
            <button class="btn btn-outline-primary mt-3" onclick="this.parentElement.parentElement.remove()">Cancel</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Add styles for modals
const style = document.createElement('style');
style.textContent = `
    .donation-modal, .payment-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .donation-modal-content, .payment-modal-content {
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }

    .payment-form {
        text-align: left;
        margin: 20px 0;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
    }

    .form-group input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .form-row {
        display: flex;
        gap: 15px;
    }

    .form-row .form-group {
        flex: 1;
    }
`;
document.head.appendChild(style); 