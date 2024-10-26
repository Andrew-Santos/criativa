let selectedFrame = '';
let loadedImage = null;

// Função para selecionar a moldura
function selectFrame(frame) {
    selectedFrame = frame;
    // Remove a classe 'selected' de todas as molduras
    document.querySelectorAll('.frame').forEach(img => img.classList.remove('selected'));
    // Adiciona a classe 'selected' à moldura clicada
    event.target.classList.add('selected');
    // Atualiza o canvas mesmo sem imagem carregada
    drawCanvas(loadedImage || new Image());
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

    // Definindo as dimensões do canvas
    const canvasWidth = 1080;
    const canvasHeight = 1920;

    // Ajustando a imagem ao tamanho do canvas
    const imgAspectRatio = img.width / img.height;
    const canvasAspectRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgAspectRatio > canvasAspectRatio) {
        // A imagem é mais larga que o canvas
        drawHeight = canvasHeight;
        drawWidth = img.width * (canvasHeight / img.height);
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = 0;
    } else {
        // A imagem é mais alta que o canvas
        drawWidth = canvasWidth;
        drawHeight = img.height * (canvasWidth / img.width);
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2;
    }

    // Redefinindo as dimensões do canvas
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Desenhando a imagem e a moldura no canvas
    if (img.src) {
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
    if (selectedFrame) {
        const frame = new Image();
        frame.onload = function () {
            ctx.drawImage(frame, 0, 0, canvasWidth, canvasHeight);
        };
        frame.src = selectedFrame;
    }
}

// Função para fazer o download da foto com moldura
function downloadPhoto() {
    const canvas = document.getElementById('canvas');
    canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'photo_with_frame.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, 'image/png');
}

// Função para compartilhar a foto
function sharePhoto() {
    const canvas = document.getElementById('canvas');
    canvas.toBlob(function (blob) {
        const file = new File([blob], 'photo_with_frame.png', { type: 'image/png' });
        const filesArray = [file];
        if (navigator.share) {
            navigator.share({
                files: filesArray,
                title: 'Minha Foto com Moldura',
                text: 'Olha essa foto com moldura!',
            })
            .then(() => console.log('Compartilhamento bem-sucedido'))
            .catch((error) => console.error('Erro ao compartilhar', error));
        } else {
            alert('Compartilhamento não suportado neste navegador.');
        }
    }, 'image/png');
}
