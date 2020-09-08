let ageWorked = false;
function ageInDays(){
	const birthYear = prompt('what year where your born .. Good Friend?');
	document.querySelector('#challenge1 .fillMe').innerHTML=`
			<h1 >
				Your Are ${(2020-birthYear)*365} Days Old
			</h1>
		`;
	ageWorked= true;
}

function reset(){
	if (ageWorked){
		document.querySelector('#challenge1 .fillMe h1').remove();
		ageWorked = false;
	}
}
/* challenge2 */
function generate(){
	const image = document.createElement('img');
	image.setAttribute('src','https://cdn2.thecatapi.com/images/6oq.gif');
	image.setAttribute('class','box');
	document.querySelector('#challenge2 .flexBox').appendChild(image);
}

function resetImage(){
	const imgList=document.querySelectorAll('#challenge2 .flexBox img');
	imgList.forEach(img => img.remove());
}
/*challenge 3 */

function Lose(space){
	document.querySelectorAll('#challenge3 .winORlose h2').forEach(element => element.remove());
	const text = document.createElement('h2');
	text.appendChild(document.createTextNode('You Lose'));
	text.style.color ='red';
	space.appendChild(text);

}
function Draw(space){
	document.querySelectorAll('#challenge3 .winORlose h2').forEach(element => element.remove());
	const text = document.createElement('h2');
	text.appendChild(document.createTextNode('Draw'));
	text.style.color='grey';
	space.appendChild(text);
}
function Win(space){
	document.querySelectorAll('#challenge3 .winORlose h2').forEach(element => element.remove());
	const text = document.createElement('h2');
	text.appendChild(document.createTextNode('You Win'));
	text.style.color='green';
	space.appendChild(text);
}

function initializeImage(){
	document.querySelectorAll('#challenge3 .computerResponse img').forEach(img => img.remove());
}

function appearImage(image){
	const place= document.querySelector('#challenge3 .computerResponse');
	place.innerHTML = `<img src="${image}">`
}

function computerChoosing(){
	const choices =['paper','rock','scissors'];
	return choices[Math.floor(Math.random()*choices.length)];
}

function rpsGame(humanChoice){
	const links={
		'rock': document.querySelector('#challenge3 .rock').src,
		'paper' : document.querySelector('#challenge3 .paper').src,
		'scissors': document.querySelector('#challenge3 .scissors').src
	}

	const judge = {
		'rock':{'rock':'draw','paper':'lose','scissors':'win'},
		'paper':{'rock':'win','paper':'draw','scissors':'lose'},
		'scissors':{'rock':'lose','paper':'win','scissors':'draw'}
	}
	const computerChoice = computerChoosing();
	appearImage(links[computerChoice]);
	const space = document.querySelector('#challenge3 .winORlose');
	switch(judge[humanChoice][computerChoice]){
		case 'win': 
			Win(space);
			break;
		case 'lose':
			Lose(space);
			break;
		case 'draw':
			Draw(space);
}
}
//challenge 4 
function getRandom(array){
	const randomNumber = Math.floor(Math.random()*array.length);
	return array[randomNumber];
}

const buttonArray = document.querySelectorAll('button');
const originalClasses = [];
buttonArray.forEach(button => originalClasses.push(button.className));

function challenge4(){
	const val = document.querySelector('#challenge4 select').value;
	if (val ==='reset'){
		for(i=0;i<buttonArray.length;i++){
			buttonArray[i].className= originalClasses[i];
		}
	}
	else if (val ==='random'){
		buttonArray.forEach(button=>{
			button.className=getRandom(originalClasses);
		})
	}
	else{
		buttonArray.forEach(button=> button.className=val);
	}

}

//blackJack

let userScore= 0;
let computerScore = 0 ; 
let wins = 0,draws = 0,losses= 0;
const hitSound= new Audio('./blackjack/sounds/swish.m4a');
const winSound= new Audio('./blackjack/sounds/cash.mp3');
const loseSound = new Audio('./blackjack/sounds/aww.mp3');

const valueOfCard={
	'2':2,'3':3,'4':4,'5':5,'6':6,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10
}

function deal(){
	document.querySelectorAll("#theGame .userLuck img , #theGame .computerLuck img").forEach(image => image.remove());
	document.querySelectorAll('#theGame .userLuck h1').forEach(element=>element.remove());
	userScore =0;
	computerScore = 0; 
	document.querySelector('#theGame .userScore').innerText='You : 0';
	document.querySelector('#theGame .computerScore').innerText='Computer : 0';
}

function giveScore(){
	let result;let color;
	if(computerScore==userScore){
		draws++;
		document.querySelector('#blackJack .scoreTable .draws').innerText = draws;
		result = 'draw';
		color = 'red';
	}
	else if (userScore>computerScore){
		wins++;
		document.querySelector('#blackJack .scoreTable .wins').innerText = wins;
		result ='win';
		winSound.play();
		color ='green';
	}		
	else {	
		losses++;
		document.querySelector('#blackJack .scoreTable .losses').innerText = losses;
		result='lose';
		loseSound.play();
		color='red';
	}
	document.querySelector('#theGame .userLuck').innerHTML+= `<h1 style="color:${color}">${result}</h1>`

}


function hit(){
		const arrayCards=['A','2','3','4','6','7','8','9','10','J','Q','K'];
		userLuckyCard=getRandom(arrayCards);
		document.querySelector('#theGame .userLuck').innerHTML+=`
			<img src="./blackjack/images/${userLuckyCard}.png" style="height:150px ;width:100px" >
			`;
		hitSound.play();
		if (userLuckyCard=='A'){
			let value=0;
			while ((value!=1)&&(value!=11)){
				value= parseInt(prompt('you hava an A .. choose between 1 and 11'));
			}
			userScore+=value;
		}
		else {
			userScore += valueOfCard[userLuckyCard];
		}

		if (userScore >21 ){
			userScore = 0;
			document.querySelector('#theGame .userScore').innerText='You : BUST !!!!';
		}
		else {
			document.querySelector('#theGame .userScore').innerText=`You : ${userScore}`;
		}
	if ((userScore==0)||(userScore==21)){
		stand();
	}
}


async function stand(){
		let computerEnd= false ; 
		const arrayCards=['A','2','3','4','6','7','8','9','10','J','Q','K'];
		while (!computerEnd){
			computerLuckyCard = getRandom(arrayCards);
			document.querySelector("#theGame .computerLuck").innerHTML+=`
				<img src="./blackjack/images/${computerLuckyCard}.png" style="height:150px;width:100px">
				`;
			if(computerLuckyCard=='A')
				computerScore+=getRandom([1,11]);
			else
				computerScore+=valueOfCard[computerLuckyCard];

			if (computerScore>21){
				computerScore =0 ;
				document.querySelector("#theGame .computerScore").innerText = `Computer : COMPUTER BUST!`;
			}
			else
				document.querySelector("#theGame .computerScore").innerText = `Computer : ${computerScore}`;
			
			if ((computerScore==0)||((computerScore>=userScore))){
				giveScore() ; 
				computerEnd=true;
			} 
		}
	
}