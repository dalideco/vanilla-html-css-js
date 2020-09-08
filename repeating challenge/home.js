function ageInDays(){
	const age = prompt("gimme yoru age buddy :p"); 
	const mot= document.createElement('h2');
	mot.innerText = `you are ${age*365} years old`;
	document.querySelector("#challenge1 .showAge").appendChild(mot);
}

function reset(challenge,place,type){
	document.querySelectorAll(`#${challenge} .${place} ${type}`).forEach(e=>e.remove());
}

//challenge 2

function generate(){
	document.querySelector('#challenge2 .flexBox').innerHTML+=`
		<img src="https://cdn2.thecatapi.com/images/6oq.gif" class="box">`
}

//challenge 3

function appearImage(choice){
	document.querySelector('#challenge3 .computerChoice').innerHTML=`
		<img src="images/${choice}.jpg">`
}

function showMessage(result,color){
	document.querySelector("#challenge3 .message").innerHTML=`<h2 style="color:${color};"> you ${result}</h2>`
}
function randomChoice(array){
	return array[Math.floor(Math.random()*array.length)];
}

function rpsGame(element){
	const winLoseDraw ={
		'rock':{'rock':['draw','grey'],'scissors':['win','green'],'paper':['lose','red']},
		'scissors':{'rock':['lose','red'],'scissors':['draw','grey'],'paper':['win','green']},
		'paper':{'rock':['win','green'],'scissors':['lose','red'],'paper':['draw','grey']}
	};

	const array = ['rock','paper','scissors'];
	const playerChoice=element;
	const computerChoice=randomChoice(array);

	appearImage(computerChoice);
	showMessage(winLoseDraw[playerChoice][computerChoice][0],winLoseDraw[playerChoice][computerChoice][1]);

}

//challenge4
let playerScore =0 ; 
let computerScore =0 ;
let gameOver=false;
let wins= 0 , losses =0 , draws =0;
const hitSound = new Audio('./blackjack/sounds/swish.m4a');
const winSound = new Audio('./blackjack/sounds/cash.mp3');
const loseSound = new Audio('./blackjack/sounds/aww.mp3');

const cards=['A','2','3','4','5','6','7','8','9','10','J','Q','K']
const cardValue={
	'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10
}

function appearImagerps(choice , place){
	document.querySelector(`#challenge4 .GAME .${place} .showCards`).innerHTML += `
		<img src ="blackjack/images/${choice}.png" style="height:150px;width:100px;">`
}

function changeWriting(newScore,place){
	if(newScore>21)
		newScore="you BUST!!!";
	document.querySelector(`#challenge4 .GAME .${place} `).innerHTML= `
		<h2>Your score : ${newScore}</h2>`;
}

function messageGame(result,color,sound=null){
	const message=document.createElement('h2');
	message.append(result);
	message.setAttribute('style',`color:${color};`);
	message.setAttribute('class','removable');
	if(sound!=null)
		sound.play();
	document.querySelector('#challenge4 .GAME .playerCards').appendChild(message);
}

function tableChange(result,number){
	document.querySelector(`#challenge4 .scoreTable .${result}`).innerText = `${number}`;
}

function sleep(ms){
	return new Promise(resolve=>setTimeout(resolve, ms));
}

function draw(){
	const playerChoice=randomChoice(cards);let valueOfCard=0;
	if (playerChoice=='A'){
		while((valueOfCard!=1)&&(valueOfCard!=11))
		 	valueOfCard = parseInt(prompt('1 or 11'));
	}
	else
		valueOfCard = cardValue[playerChoice];
	appearImagerps(playerChoice,'playerCards');
	playerScore += valueOfCard;
	changeWriting(playerScore,'playerScore');
	hitSound.play();
	if(playerScore>21)
		playerScore =0;

}

async function stand(){
	let computerChoice;let valueOfCard;
	while(!(gameOver)){
		computerChoice=randomChoice(cards);
		if(computerChoice=='A')
			valueOfCard = randomChoice([1,11]);
		else 
			valueOfCard = cardValue[computerChoice];
		appearImagerps(computerChoice,'computerCards');
		computerScore +=valueOfCard;
		if(computerScore>playerScore)
			gameOver = true ;
		else if((computerScore == playerScore)&&(computerScore>=18))
			gameOver = true; 
		else if (computerScore>21)
			gameOver = true ; 
		changeWriting(computerScore,'computerScore');
		hitSound.play();
		await sleep(1000);
	}
	if (computerScore >21)
		computerScore = 0; 

	if(computerScore<playerScore){
		messageGame('you win','green',winSound);
		wins++;  
		tableChange('wins',wins);
	}
	else if(computerScore>playerScore){
		messageGame('you lose','red',loseSound); 
		losses++; 
		tableChange('losses',losses);
	}
	else {
		messageGame('draw','grey');
		draws++;
		tableChange('draws',draws);
	}
}

function resetGame(){
	gameOver=false ;
	playerScore = 0; 
	computerScore =0; 
	document.querySelectorAll('#challenge4 .GAME .showCards img').forEach(card =>card.remove());
	document.querySelectorAll('#challenge4 .GAME .removable').forEach(removable => removable.remove());
	document.querySelector('#challenge4 .GAME .playerScore').innerHTML='<h2> Your score : 0 </h2>';
	document.querySelector('#challenge4 .GAME .computerScore').innerHTML= '<h2> score : 0 </h2>';
}

//challenge 5 : change button color 
const buttons = document.querySelectorAll('button');
const orderedButtonColor=[];buttons.forEach(button=>orderedButtonColor.push(button.getAttribute('class')));

function colorSwitch(value){
	if(value=="random")
		buttons.forEach(function(button){button.setAttribute('class',randomChoice(orderedButtonColor))});
	else if(value =="reset"){
		let i=0;
		buttons.forEach(function(button){button.setAttribute('class',orderedButtonColor[i]);i++});
	}
	else 
		buttons.forEach(button =>button.setAttribute('class',value));
}