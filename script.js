const filmRoll = document.getElementById('filmRoll');
const grainType = document.getElementById('grainType');
const contrast = document.getElementById('contrast');
const exposure = document.getElementById('exposure');
const tint = document.getElementById('tint');
const previewImage = document.getElementById('previewImage');
const grainOverlay = document.getElementById('grainOverlay');
const exportButton = document.getElementById('exportButton');
const uploadImage = document.getElementById('uploadImage');
const exportFormat = document.getElementById('exportFormat');

// Update the preview image based on user inputs
function updatePreview() {
    let contrastValue = contrast.value / 100 + 1;
    let brightnessValue = parseInt(exposure.value) + 100;
    let tintValue = tint.value / 100;

    // Apply custom filters based on the selected film roll
    switch (filmRoll.value) {
        case 'hp5':
            contrastValue *= 1.1;
            tintValue += 0.05;
            break;
        case 'tri-x':
            contrastValue *= 1.2;
            brightnessValue -= 10;
            break;
        case 'neopan':
            contrastValue *= 1.05;
            break;
        case 'delta':
            brightnessValue += 20;
            contrastValue *= 1.3;
            break;
        case 'apx':
            contrastValue *= 0.95;
            brightnessValue += 10;
            break;
        case 'rollei':
            contrastValue *= 1.15;
            tintValue -= 0.1;
            break;
    }

    previewImage.style.filter = `
        contrast(${contrastValue})
        brightness(${brightnessValue}%)
        sepia(${tintValue})
    `;
}

// Grain overlay handling
function updateGrain() {
    grainOverlay.className = `grain ${grainType.value}`;
}

contrast.addEventListener('input', updatePreview);
exposure.addEventListener('input', updatePreview);
tint.addEventListener('input', updatePreview);
filmRoll.addEventListener('change', updatePreview);
grainType.addEventListener('change', updateGrain);

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
        
        // Set format
        const mimeType = `image/${exportFormat.value}`;
        const link = document.createElement('a');
        link.href = canvas.toDataURL(mimeType);
        link.download = `emulated_photo.${exportFormat.value}`;
        link.click();
    };
}
