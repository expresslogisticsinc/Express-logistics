 // Tracking Data - This is where you can customize what people see
const trackingData = {
    // Add your custom tracking numbers and their data here
    "1Z999AA1234567890": {
        status: "Delivered",
        statusClass: "",
        estimatedDelivery: "June 8, 2023",
        deliveryAddress: "123 Main St, Anytown, USA 12345",
        serviceType: "Express Delivery",
        weight: "2.5 lbs",
        dimensions: "12\" × 8\" × 6\"",
        shippedDate: "June 5, 2023",
        events: [
            {
                date: "June 8, 2023 - 2:30 PM",
                description: "Delivered",
                location: "Front door",
                completed: true
            },
            {
                date: "June 8, 2023 - 9:15 AM",
                description: "Out for delivery",
                location: "Anytown, USA",
                completed: true
            },
            {
                date: "June 7, 2023 - 8:45 PM",
                description: "Arrived at local facility",
                location: "Anytown Distribution Center",
                completed: true
            },
            {
                date: "June 6, 2023 - 3:20 PM",
                description: "In transit",
                location: "Regional Sorting Facility",
                completed: true
            },
            {
                date: "June 5, 2023 - 11:30 AM",
                description: "Shipment picked up",
                location: "Sender Location",
                completed: true
            }
        ]
    },
    "7891234567": {
        status: "In Transit",
        statusClass: "in-transit",
        estimatedDelivery: "July 26, 2025",
        deliveryAddress: "Bacolod City, Barangay Alijis, Phillipines 6100",
        serviceType: "Standard Shipping",
        weight: "12.2 lbs",
        dimensions: "28\" × 16\" × 10\"",
        shippedDate: "July 22, 2025",
        events: [
            {
                date: "July 23, 2025 - 4:45 PM",
                description: "Departed sorting facility",
                location: "Regional Hub",
                completed: true
            },
            {
                
                description: "Arrived at sorting facility",
                location: "Regional Hub",
                completed: false
            },
            {
                
                description: "Shipment picked up",
                location: "Receiver Location",
                completed: false
            }
        ]
    },
    "DEMO123456": {
        status: "Processing",
        statusClass: "processing",
        estimatedDelivery: "June 15, 2023",
        deliveryAddress: "789 Pine St, Elsewhere, USA 54321",
        serviceType: "Economy Shipping",
        weight: "1.8 lbs",
        dimensions: "9\" × 6\" × 4\"",
        shippedDate: "June 7, 2023",
        events: [
            {
                date: "June 7, 2023 - 3:00 PM",
                description: "Shipping label created",
                location: "Sender Processing Facility",
                completed: true
            }
        ]
    }
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