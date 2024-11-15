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

  let correctMatches = 0;
  let gridImages = []; 

  $('#screen1').show();

  $('#startBtn').click(function() {
    $('#screen1').hide();
    $('#screen2').show();
    initializeGame();
  });

  $('#restartBtn').click(function() {
    initializeGame();
  });

  function initializeGame() {
    $('#grid').empty();
    generateGrid();
    setRandomDraggable();
    correctMatches = 0;
    resetDraggablePosition();
  }

  function generateGrid() {
    
    gridImages = images.sort(() => 0.5 - Math.random()).slice(0, 25);

    gridImages.forEach((imgSrc) => {
      const cell = $('<div>').addClass('cell').data('imgSrc', imgSrc);
      const img = $('<img>').attr('src', imgSrc).css({ width: '100%', height: '100%' });
      cell.append(img);
      $('#grid').append(cell);
    });

    $('.cell').droppable({
      accept: '#draggableImg',
      drop: function(event, ui) {
        const cellImg = $(this).data('imgSrc');
        const dragImg = ui.draggable.data('imgSrc');
        if (cellImg === dragImg) {
          $(this).css('background', 'green');
          correctMatches++;
          if (correctMatches === 10) {
            $('#winDialog').dialog();
          } else {
            setRandomDraggable();
            resetDraggablePosition();
          }
        } else {
          $('#errorDialog').dialog();
          resetDraggablePosition();
        }
      }
    });
  }

  function setRandomDraggable() {
    
    const randomImg = gridImages[Math.floor(Math.random() * gridImages.length)];
    $('#draggableImg').attr('src', randomImg).data('imgSrc', randomImg);
    $('#draggableImg').draggable({
      revert: "invalid"
    });
  }

  function resetDraggablePosition() {
    $('#draggableImg').css({ top: '0px', left: '0px' }).draggable('option', 'revert', 'invalid');
  }
});
