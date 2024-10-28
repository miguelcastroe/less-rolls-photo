const filmRoll = document.getElementById('filmRoll');
const grainType = document.getElementById('grainType');
const contrast = document.getElementById('contrast');
const exposure = document.getElementById('exposure');
const tint = document.getElementById('tint');
const previewImage = document.getElementById('previewImage');
const exportButton = document.getElementById('exportButton');

// Update the preview image based on user inputs
function updatePreview() {
    previewImage.style.filter = `
        contrast(${contrast.value}%)
        brightness(${parseInt(exposure.value) + 100}%)
        sepia(${tint.value}%)
    `;
}

// Event listeners for controls
contrast.addEventListener('input', updatePreview);
exposure.addEventListener('input', updatePreview);
tint.addEventListener('input', updatePreview);

// Export function to save image as 1080x1080 px
exportButton.addEventListener('click', () => {
    exportImage();
});

function exportImage() {
    // Create a canvas element for exporting
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    // Draw the image onto the canvas at 1080x1080
    const img = new Image();
    img.src = previewImage.src;

    img.onload = () => {
        ctx.drawImage(img, 0, 0, 1080, 1080);

        // Apply current filter settings
        ctx.filter = previewImage.style.filter;

        // Export the canvas as an image
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = 'emulated_photo.jpg';
        link.click();
    };
}
