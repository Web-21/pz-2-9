$(document).ready(function () {
  const images = [
    "pictures/image1.png",
    "pictures/image2.png",
    "pictures/image3.png",
    "pictures/image4.png",
    "pictures/image5.png",
    "pictures/image6.png",
    "pictures/image7.png",
    "pictures/image8.png",
    "pictures/image9.png",
    "pictures/image10.png",
    "pictures/image11.png",
    "pictures/image12.png",
    "pictures/image13.png",
    "pictures/image14.png",
    "pictures/image15.png",
    "pictures/image16.png",
    "pictures/image17.png",
    "pictures/image18.png",
    "pictures/image19.png",
    "pictures/image20.png",
    "pictures/image21.png",
    "pictures/image22.png",
    "pictures/image23.png",
    "pictures/image24.png",
    "pictures/image25.png",
  ];
  let correctCount = 0;
  $("#startButton").click(function () {
    $("#screen1").hide();
    $("#screen2").show();
    startGame();
  });
  function startGame() {
    correctCount = 0;
    $("#messageBox").text("");
    shuffleImages();
    setDraggableImage();
  }
  function shuffleImages() {
    const shuffledImages = images.sort(() => 0.5 - Math.random());
    $("#grid").empty();
    for (let i = 0; i < 25; i++) {
      $("<div>")
        .addClass("grid-cell")
        .data("image", shuffledImages[i])
        .append(`<img src="${shuffledImages[i]}" alt="military equipment">`)
        .appendTo("#grid")
        .droppable({
          accept: "#draggableImage",
          drop: function (event, ui) {
            checkMatch($(this));
          },
        });
    }
  }
  function setDraggableImage() {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    $("#draggableImage").show();
    $("#draggableImage").attr("src", randomImage).data("image", randomImage);
    $("#draggableImage").draggable({
      revert: "invalid",
    });
    $("#draggableImage").draggable("enable");
  }

  function checkMatch($cell) {
    if ($cell.data("image") === $("#draggableImage").data("image")) {
        correctCount++;
        if (correctCount >= 10) {
            $("#draggableImage").draggable("disable").hide();
            setTimeout(() => {
                $("#screen2").hide();
                $("#screen1").show();
                alert("Вітаю, ви виграли!");
            }, 2000);
        } else {
            setDraggableImage();
        }
    } else {
        alert("Не вірний вибір");
    }
}

  $("#resetButton").click(function () {
    startGame();
  });
  $("#startButton").click(function () {
    $("#screen1").hide();
    $("#screen2").show();
    startGame();
  });
});
$(document).ready(function () {
  $("#backButton").click(function () {
    $("#screen2").hide();
    $("#screen1").show();
  });
});

