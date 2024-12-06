let engineOn = false;
let rpm = 0;
const minRpm = 800; // Minimal RPM when engine is on
const needle = document.getElementById('needle');
const engineStatus = document.getElementById('engineStatus');
const rpmDisplay = document.getElementById('rpm');
const toggleEngine = document.getElementById('toggleEngine');
const accelerate = document.getElementById('accelerate');

// Helper function to update the needle rotation
function updateNeedle(rpm) {
    const maxRpm = 8000; // Maximum RPM for the gauge
    const angle = (rpm / maxRpm) * 270; // Map RPM to 270° range
    needle.style.transform = `rotate(${angle - 135}deg)`; // Adjust for 135° starting angle
}

// Toggle engine on/off
toggleEngine.addEventListener('click', () => {
    engineOn = !engineOn;
    engineStatus.textContent = engineOn ? 'Įjungtas' : 'Išjungtas';
    accelerate.disabled = !engineOn;

    if (engineOn) {
        rpm = minRpm; // Set to minimal RPM
    } else {
        rpm = 0; // Set to 0 RPM when engine is off
    }
    updateNeedle(rpm);
    rpmDisplay.textContent = rpm;
});

// Handle accelerate button
let accelerateInterval;
accelerate.addEventListener('mousedown', () => {
    if (engineOn) {
        clearInterval(accelerateInterval); // Clear any existing interval
        accelerateInterval = setInterval(() => {
            if (rpm < 8000) {
                rpm += 400; // Faster RPM increase
                updateNeedle(rpm);
                rpmDisplay.textContent = rpm;
            }
        }, 50); // Faster update interval
    }
});

accelerate.addEventListener('mouseup', () => {
    clearInterval(accelerateInterval); // Stop increasing RPM
    accelerateInterval = setInterval(() => {
        if (rpm > minRpm) { // Ensure it doesn't drop below minimal RPM
            rpm -= 200; // Faster RPM decrease
            updateNeedle(rpm);
            rpmDisplay.textContent = rpm;
        } else {
            clearInterval(accelerateInterval);
        }
    }, 50); // Faster update interval
});

// Stop decreasing RPM if mouse leaves the button
accelerate.addEventListener('mouseleave', () => {
    clearInterval(accelerateInterval);
});