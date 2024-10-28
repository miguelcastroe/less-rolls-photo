const filmRoll = document.getElementById('filmRoll');
const grainType = document.getElementById('grainType');
const contrast = document.getElementById('contrast');
const exposure = document.getElementById('exposure');
const tint = document.getElementById('tint');
const previewImage = document.getElementById('previewImage');

function updatePreview() {
    // Adjust the preview image styles based on user inputs
    previewImage.style.filter = `
        contrast(${contrast.value}%)
        brightness(${parseInt(exposure.value) + 100}%)
        sepia(${tint.value}%)
    `;
    // Additional logic for film roll and grain types can be added here
}

// Event listeners
contrast.addEventListener('input', updatePreview);
exposure.addEventListener('input', updatePreview);
tint.addEventListener('input', updatePreview);
