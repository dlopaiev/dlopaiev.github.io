window.onload = function readyToGo() {

var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");
var hitCard = document.getElementById("hitCard");
//var tryAgain = document.getElementById("tryAgain");
var standPat = document.getElementById("standPat");
var playerTotalBox = document.getElementsByClassName("playerTotalBox");
var playerTotal = document.querySelectorAll("p#playerTotal");
var winnerInfo = document.getElementById("winnerInfo");
var infoBox = document.getElementById("infoBox");

var player1Total = 0;
var player2Total = 0;
var cardsOnHands = [];
var comingCard = 0;
var counter = 0;
var cardAdded = false;

console.log(playerTotal);

//informational purpose
//var arrayValues = document.getElementById("arrayValues");
//alert("Im on the begining of main function");

playNewGame();

function playNewGame(){

player1.innerHTML = "";
player2.innerHTML = "";
player1Total = 0;
player2Total = 0;
cardsOnHands = [];
counter = 0;

//winnerInfo.innerHTML = "";
//alert("Im on the begining of playNewGame function");
playerTotal[1].className = "FadeIn";


//first 4 cards for two players
while (cardsOnHands.length < 4){
comingCard = Math.floor(Math.random() * 52) + 1;
if (cardsOnHands.lastIndexOf(comingCard) === -1){
cardsOnHands.push(comingCard);
}
}

//2 cards assignment for each player
for (var i = 0; i < 2; i++){
//player1 cards values verification
if (cardsOnHands[counter + i] >= 49){
player1Total += 11;
} else if ((cardsOnHands[counter + i] > 36) && (cardsOnHands[counter + i] < 49)){
player1Total += 10;
} else {
player1Total += Math.ceil(cardsOnHands[counter + i]/4) + 1;
}
createNewCard(player1, cardsOnHands[counter + i], 5);
//end player1

//player2 cards values verification
if (cardsOnHands[counter + i + 1] >= 49){
player2Total += 11;
} else if ((cardsOnHands[counter + i + 1] > 36) && (cardsOnHands[counter + i + 1] < 49)){
player2Total += 10;
} else {
player2Total += Math.ceil(cardsOnHands[counter + i + 1]/4) + 1;
}
if ((counter + i + 1) === 3){
createNewCard(player2, 53, 5);
} else {
createNewCard(player2, cardsOnHands[counter + i + 1], 5);
playerTotal[0].innerHTML = player2Total;
}
//end player2
counter++;
} 
movePlayerCardsLeft(player1);
movePlayerCardsLeft(player2);
playerTotal[1].innerHTML = player1Total;
checkPlayer1();

//arrayValues.innerHTML = cardsOnHands.toString();
//alert("Im in the end of playNewGame function");
}//end playNewGame


//tryAgain.addEventListener("click", function(){
//player1.innerHTML = "";
//player2.innerHTML = "";
//playNewGame();
//});

//Don't take any cards. Check the winner.
standPat.addEventListener("click", function(){
player2.lastChild.src = "img/" + cardsOnHands[3] + ".png";
playerTotal[0].innerHTML = player2Total;
while(player2Total < 17){
comingCard = Math.floor(Math.random() * 52) + 1;
if (cardsOnHands.lastIndexOf(comingCard) === -1){
cardsOnHands.push(comingCard);
if (cardsOnHands[cardsOnHands.length - 1] >= 49){
player2Total += 11;
} else if ((cardsOnHands[cardsOnHands.length - 1] > 36) && (cardsOnHands[cardsOnHands.length - 1] < 49)){
player2Total += 10;
} else {
player2Total += Math.ceil(cardsOnHands[cardsOnHands.length - 1]/4) + 1;
}
createNewCard(player2, cardsOnHands[cardsOnHands.length - 1], 5);
movePlayerCardsLeft(player2);
playerTotal[0].innerHTML = player2Total;
}
}
checkTheWinner();
});

//take 1 more card button
hitCard.addEventListener("click", function(){
//alert("Im on the begining of hitCard function");
cardAdded = false;
//playerTotal[1].removeAttribute("class");
//playerTotal[1].className = "FadeOut";
do {
comingCard = Math.floor(Math.random() * 52) + 1;
if (cardsOnHands.lastIndexOf(comingCard) === -1){
cardsOnHands.push(comingCard);
if (cardsOnHands[cardsOnHands.length - 1] >= 49){
player1Total += 11;
} else if ((cardsOnHands[cardsOnHands.length - 1] > 36) && (cardsOnHands[cardsOnHands.length - 1] < 49)){
player1Total += 10;
} else {
player1Total += Math.ceil(cardsOnHands[cardsOnHands.length - 1]/4) + 1;
}
createNewCard(player1, cardsOnHands[cardsOnHands.length - 1], 5);
movePlayerCardsLeft(player1);
playerTotal[1].innerHTML = player1Total;
playerTotal[1].className = "FadeIn";
setTimeout(checkPlayer1(), 3000);
cardAdded = true;
}
} while (!cardAdded)
//setTimeout(playerTotal[1].removeAttribute("class"), 5000);
//alert("Im in the end of hitCard function");
});


function checkPlayer1() {
playerTotal[1].removeAttribute("class");
if (player1Total > 21){
infoBox.className = "infoBoxFadeIn";
winnerInfo.innerHTML = "You lost";
setTimeout(playNewGame, 2000);
setTimeout(iBoxFadeOut, 2000);
} else if (player1Total === 21){
infoBox.className = "infoBoxFadeIn";
winnerInfo.innerHTML = "You win!";
setTimeout(playNewGame, 2000);
setTimeout(iBoxFadeOut, 2000);
}else{
//arrayValues.innerHTML = cardsOnHands.toString();
}
}//end checkPlayer1

function checkTheWinner() {
if(player2Total > 21 || player2Total < player1Total){
infoBox.className = "infoBoxFadeIn";
winnerInfo.innerHTML = "You won";
} else if(player2Total === player1Total){
infoBox.className = "infoBoxFadeIn";
winnerInfo.innerHTML = "Standoff";
}
else {
infoBox.className = "infoBoxFadeIn";
winnerInfo.innerHTML = "You lost";
}
setTimeout(playNewGame, 2000);
setTimeout(iBoxFadeOut, 2000);
}

function movePlayerCardsLeft(player){
player.lastChild.style.left = 440 - 40 * (player.childElementCount - 1) + "px";
}

function createNewCard(player, cardNumber, borderRadius){
var card = document.createElement("img");
card.src = "img/" + cardNumber + ".png";
card.width = 80;
card.height = 112;
card.style.borderRadius = borderRadius + "px";
card.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
player.appendChild(card);
}

function totFadeOut() {

}

function iBoxFadeOut(){
infoBox.className = "infoBoxFadeOut";
}

//console.log();
//alert("Im in the end of main function");
}//end readyToGo