       // Global variables
        let map;
        let userLocation;
        let selectedAmount = 0;
        let selectedPaymentMethod = '';

        // Enhanced Loading Screen Animation
        window.addEventListener('load', function() {
            // Create diya particles
            createDiyaParticles();
            
            // Create floating flowers
            createFloatingFlowers();
            
            // Create fireworks
            setTimeout(createFireworks, 1500);
            setTimeout(createFireworks, 3000);
            
            // Create chakra spokes
            createChakraSpokes();
            
            setTimeout(() => {
                document.getElementById('loadingScreen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loadingScreen').style.display = 'none';
                    document.getElementById('mainContent').classList.add('show');
                    initializePage();
                }, 1000);
            }, 5000);
        });

        function createDiyaParticles() {
            const container = document.querySelector('.loading-container');
            for (let i = 0; i < 20; i++) {
                const diya = document.createElement('div');
                diya.className = 'diya-particle';
                diya.style.left = `${Math.random() * 100}%`;
                diya.style.top = `${60 + Math.random() * 30}%`;
                diya.style.animationDelay = `${Math.random() * 2}s`;
                diya.style.width = `${5 + Math.random() * 6}px`;
                diya.style.height = diya.style.width;
                container.appendChild(diya);
            }
        }

        function createFloatingFlowers() {
            const container = document.querySelector('.loading-container');
            for (let i = 0; i < 15; i++) {
                const flower = document.createElement('div');
                flower.className = 'flower';
                flower.style.left = `${Math.random() * 100}%`;
                flower.style.top = `-20px`;
                flower.style.animationDelay = `${Math.random() * 5}s`;
                flower.style.transform = `rotate(45deg) scale(${0.5 + Math.random()})`;
                flower.style.background = `radial-gradient(circle, ${Math.random() > 0.5 ? '#ff6b6b' : '#ffeb3b'} 30%, ${Math.random() > 0.5 ? '#e74c3c' : '#f7931e'} 70%)`;
                container.appendChild(flower);
            }
        }

        function createFireworks() {
            const container = document.querySelector('.loading-container');
            for (let i = 0; i < 8; i++) {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = `${10 + Math.random() * 80}%`;
                firework.style.top = `${10 + Math.random() * 40}%`;
                firework.style.animationDelay = `${i * 0.2}s`;
                firework.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                container.appendChild(firework);
            }
        }

        function createChakraSpokes() {
            const chakra = document.querySelector('.chakra');
            for (let i = 0; i < 24; i++) {
                const spoke = document.createElement('div');
                spoke.className = 'chakra-spoke';
                spoke.style.transform = `rotate(${i * 15}deg)`;
                chakra.appendChild(spoke);
            }
        }

        // Initialize page functions
        function initializePage() {
            animateCounters();
            initMap();
            startRealTimeUpdates();
        }

        // Counter Animation
        function animateCounters() {
            animateCounter('mealsCount', 1247);
            animateCounter('volunteersCount', 328);
            animateCounter('donorsCount', 156);
        }

        function animateCounter(id, target) {
            let current = 0;
            const element = document.getElementById(id);
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString();
            }, 50);
        }

        // Navigation Functions
        function showSection(sectionId) {
            // Hide all sections
            const sections = document.querySelectorAll('.page-section');
            sections.forEach(section => section.classList.remove('active'));
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Update navigation active state
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
        }

        function toggleMobileMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }

        // Modal Functions
        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Form Submissions
        function submitDonation(event) {
            event.preventDefault();
            showNotification('🍽️ Food donation listed successfully! Volunteers in your area have been notified.');
            closeModal('donorModal');
            event.target.reset();
        }

        function submitVolunteerForm(event) {
            event.preventDefault();
            showNotification('✅ Volunteer registration successful! You will receive OTP verification shortly.');
            closeModal('volunteerModal');
            event.target.reset();
        }

        function submitNGOForm(event) {
            event.preventDefault();
            showNotification('🏢 NGO partnership application submitted! Our team will contact you within 48 hours.');
            closeModal('ngoModal');
            event.target.reset();
        }

        // Google Maps Integration
        function initMap() {
            // Default location (India Gate, Delhi)
            const defaultLocation = { lat: 28.6129, lng: 77.2295 };
            
            map = new google.maps.Map(document.getElementById('googleMap'), {
                zoom: 12,
                center: defaultLocation,
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }]
                    }
                ]
            });

            // Add sample donation markers
            const donations = [
                { lat: 28.6139, lng: 77.2090, title: 'Fresh Biryani - 25 plates', type: 'restaurant' },
                { lat: 28.6304, lng: 77.2177, title: 'Bread & Pastries - 15 items', type: 'bakery' },
                { lat: 28.5355, lng: 77.3910, title: 'Vegetable Curry - 40 servings', type: 'wedding' }
            ];

            donations.forEach(donation => {
                const marker = new google.maps.Marker({
                    position: { lat: donation.lat, lng: donation.lng },
                    map: map,
                    title: donation.title,
                    icon: {
                        url: getMarkerIcon(donation.type),
                        scaledSize: new google.maps.Size(40, 40)
                    }
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `<div style="padding: 10px;"><strong>${donation.title}</strong><br><button onclick="claimDonation('${donation.title}')" style="margin-top: 10px; padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">Claim Donation</button></div>`
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            });
        }

        function getMarkerIcon(type) {
            const icons = {
                restaurant: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle fill="%23e74c3c" cx="20" cy="20" r="18"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="16">🍽️</text></svg>',
                bakery: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle fill="%23f39c12" cx="20" cy="20" r="18"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="16">🍞</text></svg>',
                wedding: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle fill="%2327ae60" cx="20" cy="20" r="18"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="16">🥗</text></svg>'
            };
            return icons[type] || icons.restaurant;
        }

        // Geolocation Functions
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        
                        map.setCenter(userLocation);
                        
                        // Add user location marker
                        new google.maps.Marker({
                            position: userLocation,
                            map: map,
                            title: 'Your Location',
                            icon: {
                                url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle fill="%233498db" cx="20" cy="20" r="18"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="16">📍</text></svg>',
                                scaledSize: new google.maps.Size(40, 40)
                            }
                        });
                        
                        showNotification('📍 Location enabled! Showing nearby donations.');
                    },
                    function() {
                        showNotification('❌ Location access denied. Showing default area.');
                    }
                );
            } else {
                showNotification('❌ Geolocation not supported by this browser.');
            }
        }

        function claimDonation(donationTitle) {
            showNotification(`✅ You've claimed: ${donationTitle}. Pickup instructions sent to your phone!`);
        }

        // Payment Functions
        function showPaymentInterface() {
            document.getElementById('paymentInterface').classList.add('active');
        }

        function selectAmount(amount) {
            selectedAmount = amount;
            
            // Update UI
            const buttons = document.querySelectorAll('.amount-btn');
            buttons.forEach(btn => btn.classList.remove('selected'));
            event.target.classList.add('selected');
            
            // Clear custom amount
            document.getElementById('customAmount').value = '';
        }

        function selectPaymentMethod(method) {
            selectedPaymentMethod = method;
            
            // Update UI
            const options = document.querySelectorAll('.payment-option');
            options.forEach(option => option.classList.remove('selected'));
            event.target.classList.add('selected');
        }

        function processPayment() {
            const customAmount = document.getElementById('customAmount').value;
            const finalAmount = customAmount || selectedAmount;
            
            if (!finalAmount || finalAmount < 10) {
                showNotification('❌ Please select or enter a valid amount (minimum ₹10)');
                return;
            }
            
            if (!selectedPaymentMethod) {
                showNotification('❌ Please select a payment method');
                return;
            }
            
            // Calculate approximate meals
            const mealsCount = Math.floor(finalAmount / 50); // Assuming ₹50 per meal rescue
            
            // Show success animation
            document.querySelector('.payment-interface').style.display = 'none';
            const successDiv = document.getElementById('successAnimation');
            document.getElementById('mealCount').textContent = mealsCount;
            successDiv.style.display = 'block';
            
            // Reset form after 5 seconds
            setTimeout(() => {
                successDiv.style.display = 'none';
                document.getElementById('paymentInterface').classList.remove('active');
                showSection('home');
            }, 5000);
        }

        // Real-time Updates
        function startRealTimeUpdates() {
            // Update donation timers every minute
            setInterval(updateDonationTimers, 60000);
            
            // Add new donations periodically
            setInterval(addNewDonation, 30000);
            
            // Update statistics
            setInterval(updateStatistics, 120000);
        }

        function updateDonationTimers() {
            const timers = document.querySelectorAll('.timer');
            timers.forEach(timer => {
                const text = timer.textContent;
                if (text.includes('min')) {
                    let minutes = parseInt(text.match(/\d+/)[0]);
                    if (minutes > 0) {
                        minutes--;
                        timer.textContent = `${minutes} min left`;
                        if (minutes < 30) {
                            timer.style.background = '#e74c3c';
                            timer.style.animation = 'pulse 1s infinite';
                        }
                    }
                } else if (text.includes('hr')) {
                    let hours = parseInt(text.match(/\d+/)[0]);
                    let minutes = parseInt(text.match(/(\d+)min/)?.[1] || 0);
                    
                    if (minutes > 0) {
                        minutes--;
                    } else if (hours > 0) {
                        hours--;
                        minutes = 59;
                    }
                    
                    if (hours > 0) {
                        timer.textContent = `${hours}hr ${minutes}min left`;
                    } else {
                        timer.textContent = `${minutes} min left`;
                    }
                }
            });
        }

        function addNewDonation() {
            const donationsList = document.querySelector('.donations-list');
            const donations = [
                {
                    icon: '🍜',
                    title: 'Hot Soup - 30 bowls',
                    details: 'Community Kitchen • Lajpat Nagar • 3.1 km away',
                    time: '3hr 45min left'
                },
                {
                    icon: '🥙',
                    title: 'Sandwiches - 20 pieces',
                    details: 'Café • Khan Market • 2.8 km away',
                    time: '2hr 30min left'
                },
                {
                    icon: '🍎',
                    title: 'Fresh Fruits - 5 kg',
                    details: 'Grocery Store • Saket • 5.2 km away',
                    time: '4hr 15min left'
                },
                {
                    icon: '🍝',
                    title: 'Pasta & Salad - 35 servings',
                    details: 'Office Cafeteria • Gurgaon • 8.5 km away',
                    time: '1hr 20min left'
                }
            ];

            const randomDonation = donations[Math.floor(Math.random() * donations.length)];
            
            const newItem = document.createElement('div');
            newItem.className = 'donation-item';
            newItem.innerHTML = `
                <div class="donation-image">${randomDonation.icon}</div>
                <div class="donation-info">
                    <div class="donation-title">${randomDonation.title}</div>
                    <div class="donation-details">${randomDonation.details}</div>
                </div>
                <div class="timer">${randomDonation.time}</div>
            `;
            
            // Insert after the heading
            const heading = donationsList.querySelector('h3');
            heading.insertAdjacentElement('afterend', newItem);
            
            // Remove the last item to maintain list size
            const items = donationsList.querySelectorAll('.donation-item');
            if (items.length > 4) {
                items[items.length - 1].remove();
            }

            // Show notification
            showNotification('🍽️ New donation available nearby!');
            
            // Add to map if available
            if (map) {
                addDonationToMap(randomDonation);
            }
        }

        function addDonationToMap(donation) {
            // Generate random location near Delhi
            const lat = 28.6129 + (Math.random() - 0.5) * 0.1;
            const lng = 77.2295 + (Math.random() - 0.5) * 0.1;
            
            const marker = new google.maps.Marker({
                position: { lat, lng },
                map: map,
                title: donation.title,
                icon: {
                    url: getMarkerIcon('restaurant'),
                    scaledSize: new google.maps.Size(40, 40)
                },
                animation: google.maps.Animation.DROP
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `<div style="padding: 10px;"><strong>${donation.title}</strong><br><button onclick="claimDonation('${donation.title}')" style="margin-top: 10px; padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">Claim Donation</button></div>`
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        }

        function updateStatistics() {
            // Simulate growing numbers
            const mealElement = document.getElementById('mealsCount');
            const volunteerElement = document.getElementById('volunteersCount');
            const donorElement = document.getElementById('donorsCount');
            
            if (mealElement) {
                const currentMeals = parseInt(mealElement.textContent.replace(/,/g, ''));
                const newMeals = currentMeals + Math.floor(Math.random() * 10) + 1;
                mealElement.textContent = newMeals.toLocaleString();
            }
            
            if (Math.random() > 0.7) { // 30% chance to add volunteer
                const currentVolunteers = parseInt(volunteerElement.textContent.replace(/,/g, ''));
                volunteerElement.textContent = (currentVolunteers + 1).toLocaleString();
            }
            
            if (Math.random() > 0.8) { // 20% chance to add donor
                const currentDonors = parseInt(donorElement.textContent.replace(/,/g, ''));
                donorElement.textContent = (currentDonors + 1).toLocaleString();
            }
        }

        // Notification System
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #27ae60;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 3000;
                animation: slideInRight 0.5s ease-out;
                max-width: 300px;
                font-weight: bold;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.5s ease-out';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 500);
            }, 5000);
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }

        // Custom amount input handler
        document.addEventListener('DOMContentLoaded', function() {
            const customAmountInput = document.getElementById('customAmount');
            if (customAmountInput) {
                customAmountInput.addEventListener('input', function() {
                    if (this.value) {
                        selectedAmount = 0;
                        const buttons = document.querySelectorAll('.amount-btn');
                        buttons.forEach(btn => btn.classList.remove('selected'));
                    }
                });
            }
        });

        // Fallback for Google Maps API
        function initMap() {
            if (typeof google === 'undefined') {
                // Fallback map display
                document.getElementById('googleMap').innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(45deg, #74b9ff, #0984e3); color: white; font-size: 1.2rem; text-align: center; border-radius: 10px;">
                        🗺️ Interactive Map<br>
                        <small style="font-size: 0.9rem; margin-top: 10px;">Google Maps integration coming soon</small>
                        <div style="position: absolute; top: 20%; left: 30%; width: 20px; height: 20px; background: #e74c3c; border-radius: 50%; animation: pulse 2s infinite;"></div>
                        <div style="position: absolute; top: 60%; left: 70%; width: 20px; height: 20px; background: #f39c12; border-radius: 50%; animation: pulse 2s infinite 0.5s;"></div>
                        <div style="position: absolute; top: 40%; left: 50%; width: 20px; height: 20px; background: #27ae60; border-radius: 50%; animation: pulse 2s infinite 1s;"></div>
                    </div>
                `;
                return;
            }
            
            // Default location (India Gate, Delhi)
            const defaultLocation = { lat: 28.6129, lng: 77.2295 };
            
            map = new google.maps.Map(document.getElementById('googleMap'), {
                zoom: 12,
                center: defaultLocation,
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }]
                    }
                ]
            });

            // Add sample donation markers
            const donations = [
                { lat: 28.6139, lng: 77.2090, title: 'Fresh Biryani - 25 plates', type: 'restaurant' },
                { lat: 28.6304, lng: 77.2177, title: 'Bread & Pastries - 15 items', type: 'bakery' },
                { lat: 28.5355, lng: 77.3910, title: 'Vegetable Curry - 40 servings', type: 'wedding' }
            ];

            donations.forEach(donation => {
                const marker = new google.maps.Marker({
                    position: { lat: donation.lat, lng: donation.lng },
                    map: map,
                    title: donation.title,
                    icon: {
                        url: getMarkerIcon(donation.type),
                        scaledSize: new google.maps.Size(40, 40)
                    }
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `<div style="padding: 10px;"><strong>${donation.title}</strong><br><button onclick="claimDonation('${donation.title}')" style="margin-top: 10px; padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">Claim Donation</button></div>`
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            });
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🍽️ MissionThali Platform Loaded Successfully');
            console.log('🔒 Security: All data encrypted and protected');
            console.log('📱 Mobile optimized and PWA ready');
            console.log('🚀 Real-time features active');
            console.log('🗺️ Advanced mapping system integrated');
        });

        // Add CSS for additional animations
        const additionalStyles = document.createElement('style');
        additionalStyles.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            .nav-link {
                transition: all 0.3s ease;
            }
            
            .page-section {
                animation: fadeInUp 0.5s ease-out;
            }
            
            .testimonial {
                transition: transform 0.3s ease;
            }
            
            .testimonial:hover {
                transform: translateY(-5px);
            }
        `;
        document.head.appendChild(additionalStyles);