$('#game-screen').hide();
$('#modal-window').hide();

$(document).ready(function() {
    $('#start-game-btn').click(function() {
        $('#start-screen').hide();
        $('#game-screen').show();
        $('body').css('background', 'grey')
    });

    let images = [
        "image1.png", "image2.png", "image3.png", "image4.png", "image5.png",
        "image6.png", "image7.png", "image8.png", "image9.png", "image10.png",
        "image11.png", "image12.png", "image13.png", "image14.png", "image15.png",
        "image16.png", "image17.png", "image18.png", "image19.png", "image20.png",
        "image21.png", "image22.png", "image23.png", "image24.png", "image25.png"
    ];

    let newImage = images[Math.floor(Math.random() * images.length)];
        $("#draggable-img").attr('src', `./img/${newImage}`);

    let correctMatches = 0;
    let originalPosition; 

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    let shuffledImages = shuffle(images);

    shuffledImages.forEach((image, index) => {
        $('#grid').append(`<div class="iav-grid-item" id="cell-${index}">
            <img src="./img/${image}"/>
        </div>`);
    });

    $("#draggable-img").draggable({
        start: function(event, ui) {
            originalPosition = ui.position;
        }
    });

    $(".iav-grid-item").droppable({
        drop: function(event, ui) {
            let draggedImage = ui.draggable.attr('src');
            let targetImage = $(this).find('img').attr('src');

            if (draggedImage === targetImage) {
                $(this).addClass('matched');
                $(this).addClass('iav-true-answer');

                let availableImages = images.filter(img => !$(`img[src='./img/${img}']`).parent().hasClass('matched'));
                if (availableImages.length > 0) {
                    let newImage = availableImages[Math.floor(Math.random() * availableImages.length)];
                    ui.draggable.attr('src', `./img/${newImage}`);
                }

                correctMatches++;
                $('#score-text').text(`${correctMatches}/10`);

                ui.draggable.animate({
                    left: originalPosition.left,
                    top: originalPosition.top
                }, 500); 

                if (correctMatches === 10) {
                    $('#text').text("Вітаю, Ви перемогли!")
                    $('#modal-window').show();

                    $("#draggable-img").draggable("disable");
                }
            } else {
                ui.draggable.animate({
                    left: originalPosition.left,
                    top: originalPosition.top
                }, 500);
                $('#text').text("Не вірний вибір")
                $('#modal-window').show();
            }
        }
    });

    $('#restart-btn').click(function() {
        correctMatches = 0;
        $('#score-text').text(`${correctMatches}/10`);

        $('.iav-true-answer').removeClass('iav-true-answer');
        $('.matched').removeClass('matched');

        $("#draggable-img").draggable("enable");

        let newImage = images[Math.floor(Math.random() * images.length)];
        $("#draggable-img").attr('src', `./img/${newImage}`);
    });

    $('#back-btn').click(function() {
        location.reload();
    });

    $('#ok-btn').click(function() {
        $('#modal-window').hide();
    });

});
