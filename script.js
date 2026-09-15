document.addEventListener('DOMContentLoaded', () => {

    // ================= CAROUSEL LOGIC =================
    const carouselImages = document.querySelector('.carousel-images');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
        if (carouselImages) {
            carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }

    function nextSlide() {
        if (totalSlides === 0) return;
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function previousSlide() {
        if (totalSlides === 0) return;
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Attach click events to carousel buttons
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', previousSlide);

    // Auto-play sliding every 3 seconds
    let autoSlide = setInterval(nextSlide, 3000);

    // Pause sliding on mouse hover
    const carouselContainer = document.querySelector('.carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
        carouselContainer.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 3000);
        });
    }


    // ================= BOOKING LOGIC =================
    // Function for Room Cards: Scroll to booking form & select the room (No Alert)
    window.bookRoom = function(roomName) {
        const roomSelect = document.getElementById('room');
        if (roomSelect) {
            roomSelect.value = roomName;
        }

        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Attach Alert Popup specifically to Table Buttons
    const tableButtons = document.querySelectorAll('.room-table button');
    tableButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const roomName = row ? row.cells[0].innerText : 'your selected room';
            
            const roomSelect = document.getElementById('room');
            if (roomSelect) {
                roomSelect.value = roomName;
            }

            alert(`Your room (${roomName}) has been booked!`);

            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Form Submission Handling: Triggers alert on "Confirm Booking" submit
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const selectedRoom = document.getElementById('room').value || 'your selected room';
            alert(`Your room (${selectedRoom}) has been booked!`);
            
            bookingForm.reset();
        });
    }

});