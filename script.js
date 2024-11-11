$(document).ready(function() {
  const imagePaths = [
    'images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg',
    'images/image4.jpg', 'images/image5.jpg', 'images/image6.jpg',
    'images/image7.jpg', 'images/image8.jpg', 'images/image9.jpg',
    'images/image10.jpg', 'images/image11.jpg', 'images/image12.jpg',
    'images/image13.jpg', 'images/image14.jpg', 'images/image15.jpg',
    'images/image16.jpg', 'images/image17.jpg', 'images/image18.jpg',
    'images/image19.jpg', 'images/image20.jpg', 'images/image21.jpg',
    'images/image22.jpg', 'images/image23.jpg', 'images/image24.jpg',
    'images/image25.jpg'
  ];
let correctMatches = 0;

  $('#mainScreen').show();

  $('#startButton').click(function() {
    $('#mainScreen').hide();
    $('#gameScreen').show();
    startGame();
  });

  $('#restartButton').click(function() {
    startGame();
  });

  $('#backButton').click(function() {
    $('#gameScreen').hide();
    $('#mainScreen').show();
  });

  function startGame() {
    $('#imageGrid').empty();
    createGrid();
    pickRandomImage();
    correctMatches = 0;
    repositionDraggable();
  }

  function createGrid() {
    const shufImgs = imagePaths.sort(() => 0.5 - Math.random()).slice(0, 25);
    shufImgs.forEach((imgSrc) => {
      const cell = $('<div>').addClass('gridCell').data('imgSrc', imgSrc);
      const img = $('<img>').attr('src', imgSrc).css({ width: '100%', height: '100%' });
      cell.append(img);
      $('#imageGrid').append(cell);
    });

    $('.gridCell').droppable({
      accept: '#draggableImage',
      drop: function(event, ui) {
        const cellImg = $(this).data('imgSrc');
        const dragImg = ui.draggable.data('imgSrc');

        if (cellImg === dragImg) {
          $(this).css('background', 'green');
          correctMatches++;
          if (correctMatches === 10) {
            $('#winDialog').dialog({
              buttons: {
                "Добре": function() {
                  $(this).dialog("close");
                }
              }
            });
          } else {
            pickRandomImage();
            repositionDraggable();
          }
        } else {
          correctMatches = 0;
          $('#errorDialog').dialog({
            buttons: {
              "Добре": function() {
                $(this).dialog("close");
              }
            }
          });
          $('#imageGrid').empty();
          createGrid();
          pickRandomImage();
          repositionDraggable();
        }
      }
    });
  }

  function pickRandomImage() {
    const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];
    $('#draggableImage').attr('src', randomImage).data('imgSrc', randomImage);
    $('#draggableImage').draggable({
      revert: 'invalid'
    });
  }

  function repositionDraggable() {
    $('#draggableImage').css({ top: '0px', left: '0px' }).draggable('option', 'revert', 'invalid');
  }
});
