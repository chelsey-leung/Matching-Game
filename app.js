// README 
<link href="README.docx"></link>
//setting up cards in HTML
const cardlist = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf',
'fa-bicycle','fa-bomb'];
const allcardlist = cardlist.concat(cardlist);

function randomCard(card) {
    return`<li class="card"><i class="fa ${card}"></i></li>`;
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

//shuffle the cards
function gameStart(){
    const deck = document.querySelector('.deck');
    let randomCardHTML = shuffle(allcardlist).map(function(card){
        return randomCard(card);
    });
    deck.innerHTML = randomCardHTML.join('');
};
gameStart(); 

const starLevel = document.querySelectorAll('.fa-star');
const chooseCard = document.querySelectorAll('.card');
let openItem = [];
let numMoves = 0;
let matchedCard = [];
//star rating
function starRating() {
    if (numMoves < 25) {
        starLevel.style.color = 'orange';
    } else if (numMoves >= 25 && numMoves <= 50) {
        starLevel[0].style.color = 'orange';
        starLevel[1].style.color = 'orange';
    } else {
        starLevel[0].style.color = 'orange';
    };
};

//winner message
function winner(){
    let msg;
    let star_str = "";
    if (numMoves < 25){ 
        star_str = String.fromCodePoint(0x2b50,0x2b50,0x2b50);
    }else if (numMoves >= 25 && numMoves <= 50) {
        star_str = String.fromCodePoint(0x2b50,0x2b50);
    } else {
        star_str = String.fromCodePoint(0x2b50);
    }
    if (confirm("Bravo! You made it!" + String.fromCodePoint(0x1f389) + "\n Your finishing time: " + minutes + ":" + seconds 
        + "\n Star rating: " + star_str + "\n Please click OK if you want to play again!" )) {
    //click "ok" play again
        msg = "The game is really interesting!";
        document.location.reload(true);
    } else {
    //click cancel to say goodbye
        msg = "See you again" + String.fromCodePoint(0x1f44b,0x1f3fc);
    }
};


//main body!
chooseCard.forEach(function(card){
    card.addEventListener('click',function(event){
        // check if the card duplicated
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) { 
        openItem.push(card);
        card.classList.add('open','show');
        // set the move counter
            numMoves +=1;
            console.log(numMoves);
            document.getElementById('moveCounter').innerHTML = numMoves;
        }
        
        if(openItem.length == 2) {
            setTimeout(function(){ 

                //check if two cards are match
                if (openItem[0].querySelector('i').className === openItem[1].querySelector('i').className) {
                    
                    openItem[0].classList.add('match');
                    openItem[1].classList.add('match');

                    matchedCard.push(card);
                
                    //set winner message 
                    if (matchedCard.length === 8) {
                        openItem[0].classList.add('match');
                        openItem[1].classList.add('match');
                        
                        function stopTimer(){
                            clearInterval(stopWatch);
                        };
                        stopTimer();

                        starRating();

                        starLevel[0].style.display = "inline";
                        starLevel[1].style.display = "inline";
                        starLevel[2].style.display = "inline";

                        //stop the timer
                        setTimeout (function(){
                            winner();
                        },1000);
                        
                    };

                // if two cards are not match
                } else {
                openItem.forEach(function(card){
                    card.classList.remove('open','show');
                });
            };
               openItem = [];
            }, 500);
            
            
        } else {
            card.classList.add('open','show');
        }
    });

});

// timer start
let seconds = 0;
let minutes = 0;

function startTime(){
        seconds++;
    
        if (seconds / 60 === 1) {
            seconds = 0;
            minutes++;
        };

    document.getElementById('timer').innerHTML = minutes + ":" + seconds;
};

document.addEventListener('click',function(event){
    stopWatch = setInterval(startTime, 1000);
});

//restart the game
const reStart = document.getElementById('playAgain')

reStart.addEventListener('click',function(event){
  document.location.reload(true);
});