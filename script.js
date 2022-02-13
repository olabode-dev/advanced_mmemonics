const cards = document.querySelectorAll('.memory-card');
// const fig = document.querySelectorAll('.over');

var score = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

//The function checks if the cards match and if not it runs the function to unflip the cards
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

//this function disables the click event listener on the card 
function disableCards() {
  score++;
  var point = score*10 + " " + "Pts";
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.style.zIndex = "1500"
  secondCard.style.zIndex = "1500"
  console.log('card has been disabled')

  resetBoard();
  document.getElementById('scoreB').innerHTML=point;
  console.log(point);

}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


//start game button 
function disableBtn(){
  const button = document.querySelector('button');

  console.log('this is supposed to disable the button')
  document.getElementById("game-btn").innerHTML='Selecting...';
  document.getElementById("game-btn").style.background='blue';
  button.disabled=true;
}
// code for the timer

function timer(){
  var timeleft = 45;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    console.log('time is over, refresh the browser')
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "00";
    //this is to refresh the browser
    // location.reload();
  } else {
    document.getElementById("countdown").innerHTML = timeleft;
  }
  timeleft -= 1;
}, 1000);
}


// const fig = document.querySelectorAll('.over');
// fig.forEach(card => card.addEventListener('click', newColor))
// function newColor(){
//   console.log('this is the stuff' + this.innerHTML);
//   //this will chnagethe color of the clicked card
//   this.style.color='transparent';
// }
