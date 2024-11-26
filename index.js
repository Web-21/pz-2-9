$(document).ready(function () {
    let currentScreen = "#first-screen";
    let correctMatches = 0;
    const images = ["images/img1.jpg",
        "images/img2.jpg",
        "images/img3.jpg",
        "images/img4.jpg",
        "images/img5.jpg",
        "images/img6.jpg",
        "images/img7.jpg",
        "images/img8.jpg",
        "images/img9.jpg",
        "images/img10.jpg",
        "images/img11.jpg",
        "images/img12.jpg",
        "images/img13.jpg",
        "images/img14.jpg",
        "images/img15.jpg",
        "images/img16.png",
        "images/img17.png",
        "images/img18.png",
        "images/img19.png",
        "images/img20.png",
        "images/img21.png",
        "images/img22.png",
        "images/img23.png",
        "images/img24.png",
        "images/img25.png"];
    const selectedImages = [];
    let currentImage = "";

    function showScreen(screenId) {
        $(currentScreen).hide();
        $(screenId).show();
        currentScreen = screenId;
    }

    function initializeGame() {
        correctMatches = 0;
        selectedImages.length = 0;
        const shuffledImages = images.sort(() => Math.random() - 0.5);
        $("#cell-grid").empty();
        shuffledImages.forEach((imgPath) => {
            const cell = $(`<div class="cell" data-img="${imgPath}"><img src="${imgPath}" alt="image"></div>`);
            $("#cell-grid").append(cell);
        });
        setRandomDraggableImage();
        enableDragAndDrop();
    }


    function setRandomDraggableImage() {
        const remainingImages = images.filter(img => !selectedImages.includes(img));

        if (remainingImages.length === 0) {
            alert("Все изображения были использованы!");
            return;
        }
        let targetImage = remainingImages[Math.floor(Math.random() * remainingImages.length)];
        selectedImages.push(targetImage);
        $("#drag-image").html(`<img src="${targetImage}" alt="Target Image" id="drag-image">`);
        $("#drag-image img").data("img", targetImage);

        $("#drag-image img").draggable({
            revert: "invalid",
            cursor: "move"
        });
    }

    function enableDragAndDrop() {
        $(".cell").droppable({
            accept: "#drag-image img",
            drop: function (event, ui) {
                const draggedImg = ui.helper.data("img");
                const targetImg = $(this).data("img");

                if (draggedImg === targetImg) {
                    correctMatches++;
                    $(this).addClass("matched");
                    ui.helper.draggable("disable");
                    $(this).droppable("disable");

                    if (correctMatches === 10) {
                        showSuccessDialog();
                    } else {
                        setRandomDraggableImage();
                    }
                } else {
                    showErrorDialog();
                }
            }
        });
    }

    function showErrorDialog() {
        $("#error-dialog").dialog({
            modal: true,
            closeOnEscape: false,
            buttons: {
                Добре: function () {
                    $(this).dialog("close");
                }
            }
        });
    }


    function showSuccessDialog() {
        $("#success-dialog").dialog({
            modal: true,
            buttons: {
                OK: function () {
                    $(this).dialog("close");
                    showScreen("#first-screen");
                }
            }
        });
    }

    $("#start-button").on("click", function () {
        showScreen("#second-screen");
        initializeGame();
    });

    $("#restart-button").on("click", initializeGame);

    showScreen("#first-screen");
});
