let selectedFrame = '';
let loadedImage = null;

// Função para selecionar a moldura
function selectFrame(frame) {
    selectedFrame = frame;
    // Remove a classe 'selected' de todas as molduras
    document.querySelectorAll('.frame').forEach(img => img.classList.remove('selected'));
    // Adiciona a classe 'selected' à moldura clicada
    event.target.classList.add('selected');
    drawCanvas(); // Desenha a moldura no canvas, mesmo sem imagem carregada
}

// Função para carregar a foto do input
function loadPhoto(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.onload = function () {
            loadedImage = img; // Armazena a imagem carregada
            drawCanvas(); // Desenha a imagem no canvas
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Função para desenhar a imagem e a moldura no canvas
function drawCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Definindo as dimensões do canvas
    const canvasWidth = 1080;
    const canvasHeight = 1920;

    // Limpa o canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (loadedImage) {
        // Ajustando a imagem ao tamanho do canvas
        const imgAspectRatio = loadedImage.width / loadedImage.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgAspectRatio > canvasAspectRatio) {
            // A imagem é mais larga que o canvas
            drawHeight = canvasHeight;
            drawWidth = loadedImage.width * (canvasHeight / loadedImage.height);
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        } else {
            // A imagem é mais alta que o canvas
            drawWidth = canvasWidth;
            drawHeight = loadedImage.height * (canvasWidth / loadedImage.width);
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        }

        // Desenhando a imagem no canvas
        ctx.drawImage(loadedImage, offsetX, offsetY, drawWidth, drawHeight);
    }

    if (selectedFrame) {
        const frame = new Image();
        frame.onload = function () {
            // Desenhando a moldura no canvas
            ctx.drawImage(frame, 0, 0, canvasWidth, canvasHeight);
        };
        frame.src = selectedFrame;
    }
}

// Função para compartilhar a foto com moldura
function sharePhoto() {
    const canvas = document.getElementById('canvas');
    canvas.toBlob(function (blob) {
        const file = new File([blob], 'photo_with_frame.png', { type: 'image/png' });
        const filesArray = [file];

        if (navigator.canShare && navigator.canShare({ files: filesArray })) {
            navigator.share({
                files: filesArray,
                title: 'Minha Foto',
                text: 'Confira minha foto com mold[_{{{CITATION{{{_1{](https://github.com/AAndreLuis-dev/HTML-CSS_CursoEmVideo/tree/6428913bc9fbaa312d2cdade3550496520635d65/modulo-01%2Fmodulo-1%28d%29%2Fd002%2FREADME.md)[_{{{CITATION{{{_2{](https://github.com/lgfranco22/blog/tree/2ff765f5547038ea91aa40671858d9fd9d5ffb28/entrar.php)
