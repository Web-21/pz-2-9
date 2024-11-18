// game.js
$(document).ready(function() {
  const images = [
    'equipment1.jpg', 'equipment2.jpg', 'equipment3.jpg', 'equipment4.jpg', 'equipment5.jpg',
    'img16.png', 'img17.png', 'img18.png', 'img19.png', 'img20.png',
    'img21.png', 'img22.png', 'img23.png', 'img24.png', 'img25.png',
    'tank1.jpg', 'tank2.jpg', 'tank3.jpg', 'tank4.jpg', 'tank5.jpg',
    'weapon1.jpg', 'weapon2.jpg', 'weapon3.jpg', 'weapon4.jpg', 'weapon5.jpg'
  ];

  let correctMatches = 0;

  // Старт гри
  $('#start-button').click(function() {
    $('#start-screen').hide();
    $('#game-screen').show();
    startGame();
  });

  // Перезапуск гри
  $('#restart-button, #back-button').click(function() {
    $('#game-screen').hide();
    $('#start-screen').show();
    $('#correct-count').text(0);
    correctMatches = 0;
  });

  // Закриття попапів
  $('#error-ok-button, #congrats-ok-button').click(function() {
    $('#error-popup, #congrats-popup').hide();
  });

  // Початок гри
  function startGame() {
    correctMatches = 0;
    $('#correct-count').text(correctMatches);
    $('#game-field').empty();
    shuffleArray(images);
    for (let i = 0; i < 25; i++) {
      const cell = $('<div></div>').append(`<img src="images/${images[i]}" alt="image">`);
      $('#game-field').append(cell);
    }
    setDraggableImage();
    initializeDroppableCells();
  }

  // Встановлення нового випадкового зображення для перетягування, яке гарантовано є на полі
  function setDraggableImage() {
    let availableImages = [];
    $('#game-field img').each(function() {
      availableImages.push($(this).attr('src'));
    });

    // Вибираємо випадкове зображення із доступних на полі
    currentDraggableImage = availableImages[Math.floor(Math.random() * availableImages.length)];
    $('#draggable-img').attr('src', currentDraggableImage);
    $('#draggable-img').draggable({
      revert: true,
      start: function(event, ui) {
        $(this).css("position", "relative");
      },
      stop: function(event, ui) {
        $(this).css({
          top: "0px",
          left: "0px"
        });
      }
    });
  }

  // Ініціалізація клітинок для прийняття перетягування
  function initializeDroppableCells() {
    $('#game-field div').droppable({
      accept: "#draggable-img",
      drop: function(event, ui) {
        const droppedImage = ui.helper.attr('src');
        const targetImage = $(this).find('img').attr('src');
        if (droppedImage === targetImage) {
          correctMatches++;
          $('#correct-count').text(correctMatches);

          // Видаляємо зображення та генеруємо нове у цій клітинці
          const newRandomImage = images[Math.floor(Math.random() * images.length)];
          $(this).find('img').attr('src', `images/${newRandomImage}`);

          // Перевірка на виграш
          if (correctMatches === 10) {
            $('#congrats-popup').show();
          } else {
            setDraggableImage(); // Генерує нове зображення для перетягування, гарантуючи наявність на полі
          }
        } else {
          $('#error-popup').show();
        }
      }
    });
  }

  // Функція для перемішування масиву зображень
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
});
