$(document).ready(function () {
    let activeScreen = "#intro-screen";
    let successfulMatches = 0;
    const allImages = [
        "images/img1.jpg", "images/img2.jpg", "images/img3.jpg", "images/img4.jpg", "images/img5.jpg",
        "images/img6.jpg", "images/img7.jpg", "images/img8.jpg", "images/img9.jpg", "images/img10.jpg",
        "images/img11.jpg", "images/img12.jpg", "images/img13.jpg", "images/img14.jpg", "images/img15.jpg",
        "images/img16.png", "images/img17.png", "images/img18.png", "images/img19.png", "images/img20.png",
        "images/img21.png", "images/img22.png", "images/img23.png", "images/img24.png", "images/img25.png"
    ];
    const usedImages = [];
    let draggableImage = "";

    function switchScreen(screenId) {
        $(activeScreen).hide();
        $(screenId).show();
        activeScreen = screenId;
    }

    function startGame() {
        successfulMatches = 0;
        usedImages.length = 0;
        const randomizedImages = [...allImages].sort(() => Math.random() - 0.5);
        $("#grid-area").empty();

        randomizedImages.forEach((imgPath) => {
            const gridCell = $(`<div class="cell" data-img="${imgPath}"><img src="${imgPath}" alt="Game Image"></div>`);
            $("#grid-area").append(gridCell);
        });

        setDraggableImage();
        setupDragAndDrop();
    }

    function setDraggableImage() {
        const availableImages = allImages.filter(img => !usedImages.includes(img));

        if (availableImages.length === 0) {
            alert("Усі зображення були використані!");
            return;
        }

        draggableImage = availableImages[Math.floor(Math.random() * availableImages.length)];
        usedImages.push(draggableImage);

        $("#draggable-item").html(`<img src="${draggableImage}" alt="Draggable Item" class="draggable">`);
        $(".draggable").data("img", draggableImage).draggable({
            revert: "invalid",
            cursor: "move"
        });
    }

    function setupDragAndDrop() {
        $(".cell").droppable({
            accept: ".draggable",
            drop: function (event, ui) {
                const droppedImg = ui.helper.data("img");
                const cellImg = $(this).data("img");

                if (droppedImg === cellImg) {
                    successfulMatches++;
                    $(this).addClass("matched");
                    ui.helper.draggable("disable");
                    $(this).droppable("disable");

                    if (successfulMatches === 10) {
                        displaySuccessDialog();
                    } else {
                        setDraggableImage();
                    }
                } else {
                    displayErrorDialog();
                }
            }
        });
    }

    function displayErrorDialog() {
        $("#failure-popup").dialog({
            modal: true,
            buttons: {
                OK: function () {
                    $(this).dialog("close");
                }
            }
        });
    }

    function displaySuccessDialog() {
        $("#victory-popup").dialog({
            modal: true,
            buttons: {
                OK: function () {
                    $(this).dialog("close");
                    switchScreen("#intro-screen");
                }
            }
        });
    }

    $("#play-button").on("click", function () {
        switchScreen("#game-screen");
        startGame();
    });

    $("#reset-button").on("click", startGame);

    switchScreen("#intro-screen");
});
