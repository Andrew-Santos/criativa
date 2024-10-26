let selectedFrame = '';
let loadedImage = null;

// Função para selecionar a moldura
function selectFrame(frame) {
    selectedFrame = frame;
    // Remove a classe 'selected' de todas as molduras
    document.querySelectorAll('.frame').forEach(img => img.classList.remove('selected'));
    // Adiciona a classe 'selected' à moldura clicada
    event.target.classList.add('selected');
    // Se houver uma imagem carregada, desenha a moldura sobre a imagem
    if (loadedImage) {
        drawCanvas(loadedImage);
    }
}

// Função para carregar a foto do input
function loadPhoto(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.onload = function () {
            loadedImage = img; // Armazena a imagem carregada
            drawCanvas(img); // Desenha a imagem no canvas
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Função para desenhar a imagem e a moldura no canvas
function drawCanvas(img) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const frame = new Image();
    frame.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.drawImage(frame, 0, 0, img.width, img.height);
    };
    frame.src = selectedFrame;
}

// Função para fazer o download da foto com moldura
function downloadPhoto() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'photo_with_frame.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
