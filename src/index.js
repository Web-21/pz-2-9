$(document).ready(function () {
  let correctMatches = 0;
  const totalMatches = 10;
  const images = [
    'img/weapons/weapon1.jpg', 'img/tanks/tank1.jpg', 'img/equipment/equipment1.jpg',
    'img/weapons/weapon2.jpg', 'img/tanks/tank2.jpg', 'img/equipment/equipment2.jpg',
    'img/weapons/weapon3.jpg', 'img/tanks/tank3.jpg', 'img/equipment/equipment3.jpg',
    'img/weapons/weapon4.jpg', 'img/tanks/tank4.jpg', 'img/equipment/equipment4.jpg',
    'img/weapons/weapon5.jpg', 'img/tanks/tank5.jpg', 'img/equipment/equipment5.jpg'
  ];

  function createStartScreen() {
    const startScreen = `
      <div id="start-screen">
        <h1>Моя друга гра</h1>
        <button id="start-button">Почати гру</button>
      </div>
    `;
    $("body").html(startScreen);
    $("#start-button").on("click", createGameScreen);
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function showModal(message, onClose) {
    const modal = `
        <div id="modal" class="modal">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <p>${message}</p>
            </div>
        </div>
    `;
    $("body").append(modal);

    $("#modal").fadeIn();

    $(".close-button").on("click", function () {
      $("#modal").fadeOut(() => {
        $("#modal").remove();
        if (onClose) onClose();
      });
    });
  }

  function createGameScreen() {
    const shuffledImages = shuffleArray([...images]);
    const currentImage = shuffledImages[Math.floor(Math.random() * shuffledImages.length)];

    const gameScreen = `
      <div id="game-screen">
        <div id="game-area">
          ${createGrid(shuffledImages)}
        </div>
        <div id="controls-area">
          <p id="counter">Correct Matches: ${correctMatches} / ${totalMatches}</p>
          <button id="restart-button">Почати знову</button>
          <div id="draggable-container">
            <img src="${currentImage}" id="draggable-item" class="draggable" />
          </div>
        </div>
      </div>
    `;
    $("body").html(gameScreen);

    $("#draggable-item").draggable();

    $(".grid-cell").droppable({
      accept: "#draggable-item",
      drop: function (event, ui) {
        const draggedImage = ui.draggable.attr("src");
        const targetImage = $(this).data("image");

        if (draggedImage === targetImage) {
          correctMatches++;
          $(this).addClass("matched");
          ui.draggable.draggable("disable");

          if (correctMatches >= totalMatches) {
            updateCounter();
            showModal("Вітаю ви виграли", function () {
              createStartScreen();
            });
          } else {
            updateCounter();
            createGameScreen();
          }
        } else {
          showModal("Не вірний вибір", function () {
            correctMatches = 0;
            createStartScreen();
          });
        }
      }
    });

    $("#restart-button").on("click", createStartScreen);
  }

  function updateCounter() {
    $("#counter").text(`Correct Matches: ${correctMatches} / ${totalMatches}`);
  }

  function createGrid(imageList) {
    let grid = '<div id="grid">';
    imageList.forEach((image, index) => {
      grid += `<div class="grid-cell" data-image="${image}" id="cell-${index}">
                 <img src="${image}" />
               </div>`;
    });
    grid += '</div>';
    return grid;
  }

  createStartScreen();
});
