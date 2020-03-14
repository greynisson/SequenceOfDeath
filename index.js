// Upphafsstilli breytur og fylki:
let sequence = [];
let delay = 0;
let seqCounter = 0;
let level = 0;
let currentScore = 0;
let highScore = 0;
let computersTurn = true;
let humansTurn = false;
let isGameOver = false;

// Fall sem býr til random tölu á milli 1 og 4:
function randomNumber() {
  return Math.floor(Math.random() * 4) + 1;
}

// Fall sem skilar element-inu sem hefur sama id og random talan:
function randomBox() {
  return $("#" + randomNumber());
}

// Fall sem bætir klasanum "active-box" við element-ið
// og fjarlægir hann síðan eftir 200 ms:
function executeSequence(elem, delay) {
  setTimeout(function() {
    elem.addClass("box-active")
  }, delay);
  setTimeout(function() {
    elem.removeClass("box-active")
  }, delay + 200);
}


function humanGuess(elem) {
  elem.addClass("box-active");
  setTimeout(function() {
    elem.removeClass("box-active")
  }, 200);
}

// Fall sem keyrir executeSequence() og bíður síðan í 1 sek:
function runComputer(elem, delay) {
  humansTurn = false;
  for (var i = 0; i < elem.length; i++) {
    setTimeout(executeSequence(elem[i], delay), delay);
    delay += 1000;
  }
  setTimeout(function() {
    changeStatus()
  }, (elem.length * 1000));
}


function changeStatus() {
  $(".status").text("Repeat the sequence.");
  humansTurn = true;
  seqCounter = 0;
}

function levelCountDown(countDown, levelDelay) {
  setTimeout(function() {
    $(".status").text("Well done! Get ready for next level in " + countDown);
  }, levelDelay);
}

function levelUp() {
  humansTurn = false;
  let levelDelay = 0;
  const countLimit = 3;
  let countDown = countLimit;
  for (var i = 0; i < countLimit; i++) {
    setTimeout(levelCountDown(countDown, levelDelay), levelDelay);
    countDown--;
    levelDelay += 1000;
  }
  setTimeout(nextLevel, levelDelay);
}

function gameOver() {
  console.log("gameOver() called...");
  $(".title").text("Game Over! You reached level " + level);
  $(".status").text("Press Restart to try again");
  humansTurn = false;
  isGameOver = true;
  if ((level - 1) > highScore) {
    highScore = level - 1;
  }
  $(".score").text(highScore);
  $(".btn").removeClass("btn-hide");
  $(".btn").html("Restart");
}

function restart() {
  console.log("restart() called...");
  delay = 0;
  level = 0;
  sequence = [];
  isGameOver = false;
  computersTurn = true;
  $(".btn").addClass("btn-hide");
  //console.log("Call nextLevel() from restart()");

  nextLevel();
}

function nextLevel() {
  console.log("nextLevel() called...");
  level++;
  $(".title").text("Level " + level);
  $(".status").text("Pay attention...");
  sequence.push(randomBox());
  console.log("Level: " + level);
  runComputer(sequence, delay);
}

function runHuman(id) {
  if (humansTurn) {
    var seqID = parseInt(sequence[seqCounter].attr("id"));
    compareId(id, seqID);
    if (seqCounter >= sequence.length) {
      //console.log("Sequence completed...");
      levelUp();
    }
  }
}

// Keyri random röð með time-delay:
// run(sequence,delay);

$(".btn").click(function() {
  $(this).addClass("btn-hide");
  if (computersTurn && !isGameOver) {
    computersTurn = false;
    nextLevel();
  }
});

$(document).on("keydown", function(event) {
  if (humansTurn) {
    runHuman(arrowId(event.key));
  }
});

$(".box").click(function() {
  if (humansTurn) {
    id = parseInt($(this).attr("id"));
    runHuman(id);
  }
});

$(".btn").click(function() {
  if (isGameOver) {
    //console.log("computersTurn: " + computersTurn);
    restart();

  }
})

function arrowId(input) {
  switch (input) {
    case "ArrowUp":
      return 1;
      break;
    case "ArrowLeft":
      return 2;
      break;
    case "ArrowRight":
      return 3;
      break;
    case "ArrowDown":
      return 4;
      break;
  }
}

function compareId(id, seqID) {
  switch (id) {
    case 1:
      if (id == seqID) {
        humanGuess(sequence[seqCounter]);
        seqCounter++;
      } else {
        gameOver();
      }
      break;
    case 2:
      if (id == seqID) {
        humanGuess(sequence[seqCounter]);
        seqCounter++;
      } else {
        gameOver();
      }
      break;
    case 3:
      if (id == seqID) {
        humanGuess(sequence[seqCounter]);
        seqCounter++;
      } else {
        gameOver();
      }
      break;
    case 4:
      if (id == seqID) {
        humanGuess(sequence[seqCounter]);
        seqCounter++;
      } else {
        gameOver();
      }
      break;
  }
}
