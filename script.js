const filmRoll = document.getElementById('filmRoll');
const grainType = document.getElementById('grainType');
const contrast = document.getElementById('contrast');
const exposure = document.getElementById('exposure');
const tint = document.getElementById('tint');
const previewImage = document.getElementById('previewImage');
const exportButton = document.getElementById('exportButton');
const uploadImage = document.getElementById('uploadImage');
const exportFormat = document.getElementById('exportFormat');

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
});

// Export function to save image in selected format and 1080x1080 px size
exportButton.addEventListener('click', () => {
    exportImage();
});

function exportImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = previewImage.src;

    img.onload = () => {
        // Apply filter and draw image to canvas
        ctx.filter = previewImage.style.filter;
        ctx.drawImage(img, 0, 0, 1080, 1080);

        // Get the selected export format
        const format = exportFormat.value;
        let mimeType = 'image/jpeg'; // Default format

        if (format === 'png') {
            mimeType = 'image/png';
        } else if (format === 'webp') {
            mimeType = 'image/webp';
        }

        // Export the canvas as an image
        const link = document.createElement('a');
        link.href = canvas.toDataURL(mimeType);
        link.download = `emulated_photo.${format}`;
        link.click();
    };
}
