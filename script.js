$(document).ready(function () {
    const images = [
            "img/image1.png",
            "img/image2.png",
            "img/image3.png",
            "img/image4.png",
            "img/image5.png",
            "img/image6.png",
            "img/image7.png",
            "img/image8.png",
            "img/image9.png",
            "img/image10.png",
            "img/image11.png",
            "img/image12.png",
            "img/image13.png",
            "img/image14.png",
            "img/image15.png",
            "img/image16.png",
            "img/image17.png",
            "img/image18.png",
            "img/image19.png",
            "img/image20.png",
            "img/image21.png",
            "img/image22.png",
            "img/image23.png",
            "img/image24.png",
            "img/image25.png",
        ];
        let remainingImages = [...images];
        let correctMatches = 0;
    
        const MAX_MATCHES = 10;
    
        const showScreen = (screenId) => {
            $('.screen').removeClass('visible');
            $(`#${screenId}`).addClass('visible');
        };
    
        const generateBoard = () => {
            $('#game-board').empty();
            images.forEach((imgSrc) => {
                const cell = $('<div class="cell"></div>');
                const img = $(`<img src="${imgSrc}" alt="game image">`);
                cell.append(img);
                $('#game-board').append(cell);
            });
        };
    
        const setRandomDraggableImage = () => {
            if (remainingImages.length > 0 && correctMatches < MAX_MATCHES) {
                const randomIndex = Math.floor(Math.random() * remainingImages.length);
                const imgSrc = remainingImages[randomIndex];
                $('#drag-image')
                    .attr('src', imgSrc)
                    .css({ top: '', left: '' })
                    .draggable({
                        revert: "invalid",
                    });
                remainingImages.splice(randomIndex, 1);
            } else {
                showSuccessDialog();
            }
        };
    
        const setupDroppables = () => {
            $('#game-board .cell img').droppable({
                accept: "#drag-image",
                drop: function (event, ui) {
                    const targetSrc = $(this).attr('src');
                    const draggedSrc = $('#drag-image').attr('src');
                    if (targetSrc === draggedSrc) {
                        correctMatches++;
                        if (correctMatches < MAX_MATCHES) {
                            setTimeout(() => setRandomDraggableImage(), 500);
                        } else {
                            showSuccessDialog();
                        }
                    } else {
                        showErrorDialog();
                    }
                }
            });
        };
    
        const showErrorDialog = () => {
            $("#not-cor").dialog({
                modal: true,
                buttons: {
                    OK: function () {
                        $(this).dialog("close");
                    }
                }
            });
        };
    
        const showSuccessDialog = () => {
            $("#suc-cor").dialog({
                modal: true,
                buttons: {
                    OK: function () {
                        $(this).dialog("close");
                        showScreen('screen-1');
                    }
                }
            });
        };
    
        const resetGame = () => {
            remainingImages = [...images];
            correctMatches = 0;
            generateBoard();
            setRandomDraggableImage();
            setupDroppables();
            showScreen('screen-2');
        };
    
        $('#start-button').on('click', () => { resetGame(); });
    
        $('#restart-button').on('click', () => { resetGame(); });
    
    showScreen('screen-1');
});