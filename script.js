const filmRoll = document.getElementById('filmRoll');
const grainType = document.getElementById('grainType');
const previewImage = document.getElementById('previewImage');
const grainOverlay = document.getElementById('grainOverlay');
const exportButton = document.getElementById('exportButton');
const uploadImage = document.getElementById('uploadImage');
const exportFormat = document.getElementById('exportFormat');

// Automatically apply film roll presets
function applyFilmRollPreset() {
    let filter = '';
    switch (filmRoll.value) {
        case 'hp5':
            filter = 'contrast(1.2) brightness(1.05) grayscale(1)';
            break;
        case 'tri-x':
            filter = 'contrast(1.3) brightness(0.9) sepia(0.2)';
            break;
        case 'neopan':
            filter = 'contrast(1.1) brightness(1) grayscale(1)';
            break;
        case 'delta':
            filter = 'contrast(1.4) brightness(1.1) sepia(0.1)';
            break;
        case 'apx':
            filter = 'contrast(1) brightness(1.2) grayscale(1)';
            break;
        case 'rollei':
            filter = 'contrast(1.25) brightness(0.95) sepia(0.15)';
            break;
    }
    previewImage.style.filter = filter;
}

// Apply grain overlay
function updateGrain() {
    grainOverlay.className = `grain ${grainType.value}`;
}

filmRoll.addEventListener('change', applyFilmRollPreset);
grainType.addEventListener('change', updateGrain);

// Handle image upload
uploadImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    // Apply default preset when a new image is uploaded
    applyFilmRollPreset();
    updateGrain();
});

// Export function
exportButton.addEventListener('click', () => exportImage());

function exportImage() {
    const canvas = document.createElement('canvas');
    const aspectRatio = previewImage.naturalWidth / previewImage.naturalHeight;
    canvas.width = 1080;
    canvas.height = 1080 / aspectRatio;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = previewImage.src;

    img.onload = () => {
        ctx.filter = previewImage.style.filter;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Set format based on user selection
        const format = exportFormat.value;
        const mimeType = `image/${format}`;
        
        // Create a download link for the exported image
        const link = document.createElement('a');
        link.href = canvas.toDataURL(mimeType);
        link.download = `emulated_photo.${format}`;
        link.click();
    };
}
