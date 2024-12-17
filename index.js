$(document).ready(function () {
    let screenCurrent = "#first-screen";
    let matchesCorrect = 0;
    const images = ["images/img1.png",
        "images/img2.png",
        "images/img3.png",
        "images/img4.png",
        "images/img5.png",
        "images/img6.png",
        "images/img7.png",
        "images/img8.png",
        "images/img9.png",
        "images/img10.png",
        "images/img11.png",
        "images/img12.png",
        "images/img13.png",
        "images/img14.png",
        "images/img15.png",
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
    const imageSelected = [];
    let imageCurrent = "";

    function screenShow(scId) {
        $(screenCurrent).hide();
        $(scId).show();
        screenCurrent = scId;
    }

    function intGame() {
        matchesCorrect = 0;
        imageSelected.length = 0;
        const shuffledImages = images.sort(() => Math.random() - 0.5);
        $("#cell-grid").empty();
        shuffledImages.forEach((imgPath) => {
            const cell = $(`<div class="cell" data-img="${imgPath}"><img src="${imgPath}" alt="image"></div>`);
            $("#cell-grid").append(cell);
        });
        RanlmageDraggabel();
        GameDragDrop();
    }


    function RanlmageDraggabel() {
        const remainImages = images.filter(img => !imageSelected.includes(img));

        if (remainImages.length === 0) {
            alert("Все изображения были использованы!");
            return;
        }
        let tarImage = remainImages[Math.floor(Math.random() * remainImages.length)];
        imageSelected.push(tarImage);
        $("#drag-image").html(`<img src="${tarImage}" alt="Target Image" id="drag-image">`);
        $("#drag-image img").data("img", tarImage);

        $("#drag-image img").draggable({
            revert: "invalid",
            cursor: "move"
        });
    }

    function GameDragDrop() {
        $(".cell").droppable({
            accept: "#drag-image img",
            drop: function (event, ui) {
                const draggedImg = ui.helper.data("img");
                const targetImg = $(this).data("img");

                if (draggedImg === targetImg) {
                    matchesCorrect++;
                    $(this).addClass("matched");
                    ui.helper.draggable("disable");
                    $(this).droppable("disable");

                    if (matchesCorrect === 10) {
                        showDialog();
                    } else {
                        RanlmageDraggabel();
                    }
                } else {
                    errorShowD();
                }
            }
        });
    }

    function errorShowD() {
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


    function showDialog() {
        $("#success-dialog").dialog({
            modal: true,
            buttons: {
                OK: function () {
                    $(this).dialog("close");
                    screenShow("#first-screen");
                }
            }
        });
    }

    $("#start-button").on("click", function () {
        screenShow("#second-screen");
        intGame();
    });

    $("#restart-button").on("click", intGame);

    screenShow("#first-screen");
});