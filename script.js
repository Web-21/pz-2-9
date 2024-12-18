$(document).ready(function () {
    const images = [
        "images/bomb.png", "images/grenade.png", "images/gun.png",
        "images/helmet.png", "images/jeep.png", "images/plane.png",
        "images/rocket.png", "images/ship.png", "images/tank.png"
    ];

    let selectedImage = "";
    let correctChoices = 0;

    $("#start-btn").click(function () {
        $("#start-screen").hide();
        $("#game-screen").show();
        setupGame();
    });

    function setupGame() {
        const grid = $(".grid");
        const selectObject = $("#select-object");

        grid.empty();
        selectObject.empty();

        // Дублюємо зображення і перемішуємо
        let gameImages = [...images, ...images].sort(() => Math.random() - 0.5);

        // Додаємо зображення у сітку
        gameImages.forEach((imgSrc) => {
            const img = $(`<img src="${imgSrc}" class="draggable" data-image="${imgSrc}">`);
            grid.append(img);
        });

        // Вибираємо випадковий об'єкт
        selectedImage = images[Math.floor(Math.random() * images.length)];
        selectObject.append(`<img src="${selectedImage}" alt="Обраний об'єкт">`);

        $(".draggable").draggable({
            revert: "invalid"
        });

        $(".grid").droppable({
            accept: ".draggable",
            drop: function (event, ui) {
                const draggedImage = ui.draggable.data("image");
                if (draggedImage === selectedImage) {
                    ui.draggable.draggable("disable").css("opacity", "0.5");
                    correctChoices++;

                    if (correctChoices === 10) {
                        showFinalWinMessage();
                    } else {
                        setupGame();
                    }
                }
            }
        });

        $("#restart-game").click(function () {
            correctChoices = 0;
            $("#final-win-message").hide();
            setupGame();
        });
    }

    function showFinalWinMessage() {
        $("#final-win-message").show();
    }
});
