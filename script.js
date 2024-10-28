const filmRoll = document.getElementById('filmRoll');
const previewImage = document.getElementById('previewImage');
const grainOverlay = document.getElementById('grainOverlay');
const exportButton = document.getElementById('exportButton');
const uploadImage = document.getElementById('uploadImage');
const exportFormat = document.getElementById('exportFormat');

// Automatically apply black-and-white filter and grain based on film roll selection
function applyFilmRollPreset() {
    let filter = 'grayscale(1)'; // Ensures all images are black-and-white
    let grainClass = 'none';

    switch (filmRoll.value) {
        case 'hp5':
            filter += ' contrast(1.2) brightness(1.05)';
            grainClass = 'medium';
            break;
        case 'tri-x':
            filter += ' contrast(1.3) brightness(0.9)';
            grainClass = 'high';
            break;
        case 'neopan':
            filter += ' contrast(1.1)';
            grainClass = 'fine';
            break;
        case 'delta':
            filter += ' contrast(1.4) brightness(1.1)';
            grainClass = 'high';
            break;
        case 'apx':
            filter += ' contrast(1) brightness(1.2)';
            grainClass = 'fine';
            break;
        case 'rollei':
            filter += ' contrast(1.25) brightness(0.95)';
            grainClass = 'medium';
            break;
    }

    previewImage.style.filter = filter;
    grainOverlay.className = `grain ${grainClass}`;
}

// Apply preset and grain when film roll changes
filmRoll.addEventListener('change', applyFilmRollPreset);

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
    applyFilmRollPreset(); // Apply the selected film roll preset on upload
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

        const format = exportFormat.value;
        const mimeType = `image/${format}`;
        
        const link = document.createElement('a');
        link.href = canvas.toDataURL(mimeType);
        link.download = `emulated_photo.${format}`;
        link.click();
    };
}
