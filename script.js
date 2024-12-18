$(document).ready(function() {
  const images = [
    'images/weapon1.jpg', 'images/tank1.jpg', 'images/equipment1.jpg',
    'images/weapon2.jpg', 'images/tank2.jpg', 'images/equipment2.jpg',
    'images/weapon3.jpg', 'images/tank3.jpg', 'images/equipment3.jpg',
    'images/weapon4.jpg', 'images/tank4.jpg', 'images/equipment4.jpg',
    'images/weapon5.jpg', 'images/tank5.jpg', 'images/equipment5.jpg',
    'images/weapon6.jpg', 'images/tank6.jpg', 'images/equipment6.jpg',
    'images/weapon7.jpg', 'images/tank7.jpg', 'images/equipment7.jpg',
    'images/weapon8.jpg', 'images/tank8.jpg', 'images/equipment8.jpg',
    'images/weapon9.jpg', 'images/tank9.jpg', 'images/equipment9.jpg',
    'images/weapon10.jpg', 'images/tank10.jpg', 'images/equipment10.jpg'
  ];

  let completedMatches = 0;
  let shuffledImages = [];

  // Відображаємо перший екран
  $('#screen1').show();

  // При натисканні на кнопку "Почати" переходимо до другого екрану та ініціалізуємо гру
  $('#startBtn').on('click', function() {
    $('#screen1').hide();
    $('#screen2').show();
    setupGame();
  });

  // Перезапуск гри за допомогою кнопки
  $('#restartBtn').on('click', function() {
    setupGame();
  });

  // Ініціалізація та запуск гри
  function setupGame() {
    $('#grid').empty();
    createGridLayout();
    assignDraggableImage();
    completedMatches = 0;
    resetDraggableCoordinates();
  }

  // Створюємо сітку зображень
  function createGridLayout() {
    shuffledImages = images.slice().sort(() => 0.5 - Math.random()).slice(0, 25);

    $.each(shuffledImages, function(index, imgSrc) {
      const $cell = $('<div>').addClass('cell').data('imgSrc', imgSrc);
      const $imgElement = $('<img>').attr('src', imgSrc).css({ width: '100%', height: '100%' });
      $cell.append($imgElement);
      $('#grid').append($cell);
    });

    // Налаштування приймаючих областей для перетягування
    $('.cell').droppable({
      accept: '#draggableImg',
      drop: function(event, ui) {
        const cellImage = $(this).data('imgSrc');
        const draggedImage = ui.draggable.data('imgSrc');
        if (cellImage === draggedImage) {
          $(this).css('background', 'green');
          completedMatches++;
          if (completedMatches === 10) {
            $('#winDialog').dialog();
          } else {
            assignDraggableImage();
            resetDraggableCoordinates();
          }
        } else {
          $('#errorDialog').dialog();
          resetDraggableCoordinates();
        }
      }
    });
  }

  // Вибираємо випадкове зображення для перетягування
  function assignDraggableImage() {
    const selectedImg = shuffledImages[Math.floor(Math.random() * shuffledImages.length)];
    $('#draggableImg').attr('src', selectedImg).data('imgSrc', selectedImg);
    $('#draggableImg').draggable({
      revert: "invalid"
    });
  }

  // Скидаємо позицію перетягуваного елемента
  function resetDraggableCoordinates() {
    $('#draggableImg').css({ top: '0px', left: '0px' }).draggable('option', 'revert', 'invalid');
  }
});
