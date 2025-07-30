 // Tracking Data - This is where you can customize what people see
const trackingData = {
    // Add your custom tracking numbers and their data here
   
    "7891234567": {
        status: "In Transit",
        statusClass: "in-transit",
        estimatedDelivery: "August 2, 2025",
        deliveryAddress: "Bacolod City, Barangay Alijis, Phillipines 6100",
        serviceType: "Standard Shipping",
        weight: "12.2 lbs",
        dimensions: "28\" × 16\" × 10\"",
        shippedDate: "July 22, 2025",
        events: [
            {
                date: "July 22, 2025 - 12:30 PM",
                description: "Shipping label created",
                location: "Sender Processing Facility",
                completed: true
            },
            {
                date: "July 23, 2025 - 4:45 PM",
                description: "Departed sorting facility",
                location: "Regional Hub",
                completed: true
            },
            {
                date: "July 30, 2025 - 2:45 PM",
                description: "Arrived at sorting facility",
                location: "Regional Hub",
                completed: true
            },
            {
                
                description: "Shipment picked up",
                location: "Receiver Location",
                completed: false
            }
        ]
    },

};

// Tracking Form Submission
document.getElementById('trackingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const trackingNumber = document.getElementById('trackingNumber').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    const trackingResults = document.getElementById('trackingResults');
    
    // Check if tracking number exists in our data
    if (trackingData[trackingNumber]) {
        // Hide error message if it was previously shown
        errorMessage.style.display = 'none';
        
        const packageData = trackingData[trackingNumber];
        
        // Display the tracking number
        document.getElementById('displayTrackingNumber').textContent = trackingNumber;
        
        // Update tracking status
        const statusElement = document.getElementById('trackingStatus');
        statusElement.textContent = packageData.status;
        statusElement.className = 'tracking-status ' + packageData.statusClass;
        
        // Update delivery info
        document.getElementById('estimatedDelivery').textContent = packageData.estimatedDelivery;
        document.getElementById('deliveryAddress').textContent = packageData.deliveryAddress;
        
        // Update package details
        document.getElementById('serviceType').textContent = packageData.serviceType;
        document.getElementById('packageWeight').textContent = packageData.weight;
        document.getElementById('packageDimensions').textContent = packageData.dimensions;
        document.getElementById('shippedDate').textContent = packageData.shippedDate;
        
        // Generate timeline events
        const timelineEvents = document.getElementById('timelineEvents');
        timelineEvents.innerHTML = ''; // Clear previous events
        
        packageData.events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'timeline-event';
            
            eventElement.innerHTML = `
                <div class="event-icon ${event.completed ? 'completed' : ''}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div class="event-details">
                    <div class="event-date">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        ${event.date}
                    </div>
                    <div class="event-description">${event.description}</div>
                    <div class="event-location">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        ${event.location}
                    </div>
                </div>
            `;
            
            timelineEvents.appendChild(eventElement);
        });
        
        // Show tracking results with animation
        trackingResults.style.display = 'block';
        
        // Scroll to results
        setTimeout(() => {
            trackingResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        // Show error message
        errorMessage.style.display = 'block';
        trackingResults.style.display = 'none';
    }
});

// Back to Top Button Functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});