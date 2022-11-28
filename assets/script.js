//variables
container = document.querySelector('.container1');
var blocks = [];
var holdList = [];
var nextList = [];
var activeBlock = '';
var scoreBoard = document.querySelector('.score');
var finalScore = 0;
var game = "not ready";

container.style.height =  window.innerHeight + 'px';
container.style.width =  window.innerWidth + 'px';
// create blocks and update
function createBlocks(x){
	for (var i = 0; i < 70; i++) {
		var block = {
			"content" : '',
			"color" : '',
			"active" : false,
			position : i,
		};
		blocks.push(block);
	}
}
//update Block
function updateBlocks(){
	gamebody = document.querySelector('.gamebody');
	gamebody.innerHTML = "";
	for (var i = 0; i <blocks.length; i++) {
		block = document.createElement('div');
		block.textContent = blocks[i].content.toUpperCase();
		block.style.background = blocks[i].color;
		block.classList.add('block');
		gamebody.append(block);
	}
}
//create Single block
function updateBlock(x,y,z){
	var letters = "aeiouabcdefghijklmnopqrstuvwxyz";
	var colors = ["#0341AE","#72CB3B","#FFD500","#FF971C","#FF3213"];
	var block = document.querySelectorAll('.block');
	if (x) {
		game = 'not ready'
		blocks[y.position+z].content = y.content;
		blocks[y.position+z].color = y.color;
		block[y.position+z].textContent = y.content.toUpperCase()
		block[y.position+z].style.background = y.color
		block[y.position].textContent = '';
		block[y.position].style.background = '';
		y.content = '';	
		y.color = '';
		activeBlock += z;
		game = 'ready'
	}else{
		content = letters[Math.floor(Math.random()*(letters.length-1))];
		color = colors[Math.floor(Math.random()*(colors.length-1))];
		if (blocks[3].content == '') {
			blocks[3].content = content;
			blocks[3].color = color;
			activeBlock = 3;
		}else{
			activeBlock = 'GO';
		}
	}
}
//move left
function left(){
	if(activeBlock === '') return
	restriction = [0,7,14,21,28,35,42,49,56,63]
	if(!restriction.includes(activeBlock)){
		if(blocks[activeBlock-1].content == ''){
			updateBlock(true,blocks[activeBlock],-1)
		}
	}
}
//move right
function right(x){
	if(activeBlock === '') return
	restriction = [6,13,20,27,34,41,48,55,62,69]
	if(!restriction.includes(activeBlock)){
		if(blocks[activeBlock+1].content == ''){
			updateBlock(true,blocks[activeBlock],1)
		}
	}
}
//move down
function down(){
	if(activeBlock === '') return
	activeBlock+7 < 70 ? tempRes = goCheck(blocks[activeBlock+7]) : tempRes="";
	if(activeBlock+7 >= 70){
		game = 'not ready';
		score();
		game = 'ready';
		return true;
	}else if(tempRes == true){
		game = 'not ready';
		//score();
		game = 'ready';
		updateBlock(true,blocks[activeBlock],7)
		//updateBlocks()
		return 'hello';
	}else if(tempRes == 'next'){
		return 'next';
	}else{
		return false;
	}
}
//Hold
function holdd(){
	if(activeBlock == '') return
	if (holdList.length <= 2) {
		hold = []
		hold.push(blocks[activeBlock].content)
		hold.push(blocks[activeBlock].color)
		holdList.push(hold)
		blocks[activeBlock].content = ''
		blocks[activeBlock].color = ''
		activeBlock = '';
	}else{
		showNotif('Maximum of 3 holds only!')
	}
	createHold()
	//nextt(false);
	//createNext();
}
function releaseHold(x){
	a1 = holdList[x][0] 
	a2 = holdList[x][1] 
	holdList[x][0] = blocks[activeBlock].content
	holdList[x][1] = blocks[activeBlock].color
	blocks[activeBlock].content = a1
	blocks[activeBlock].color = a2
	createHold()
	updateBlocks()
}
function createHold(){
	hold = document.querySelector('.hold');
	hold.innerHTML = '';
	for (var i = 0; i < holdList.length; i++) {
		block = document.createElement('div');
		block.textContent = holdList[i][0].toUpperCase();
		block.style.background = holdList[i][1];
		block.classList.add('hblock');
		block.setAttribute('onclick','releaseHold('+i+')')
		hold.append(block);
	}
}
//refresh score next and hold
function refresh() {
	scoreBoard.textContent = finalScore;
	combo = 0;
}
function createNext() {
	next = document.querySelector('.next');
	next.innerHTML = '';
	for (var i = 0; i < 7; i++) {
		if (i<3) {
			block = document.createElement('div');
			block.classList.add('nblock');
			block.classList.add('iBlock');
			next.append(block);
		}else{
			block = document.createElement('div');
			block.textContent = nextList[i-3][0].toUpperCase();
			block.style.background = nextList[i-3][1];
			block.classList.add('nblock');
			next.append(block);
		}
	}
}
//next
function nextt(x) {
	var letters = "aeiouabcdefghijklmnopqrstuvwxyz";
	var colors = ["#0341AE","#72CB3B","#FFD500","#FF971C","#FF3213"];
	content = letters[Math.floor(Math.random()*(letters.length-1))];
	color = colors[Math.floor(Math.random()*(colors.length-1))];
	next = [];
	if(x){
		next.push(content);
		next.push(color);
		nextList.push(next)
	}else{
		if(blocks[3].content != ''){
			activeBlock = 'GO'
		}else{
			activeBlock = 3;
			blocks[3].content = nextList[0][0];
			blocks[3].color = nextList[0][1]
			nextList.shift();
			next.push(content);
			next.push(color);
			nextList.push(next)
		}
	}
}
//move to bottom
function bottom(x){
	if(activeBlock === '') return
	for (var i = 70; i >= 0+activeBlock; i-=7) {
		if (blocks[activeBlock+i]?.content == '') {
			var block = document.querySelectorAll('.block');
			game = 'not ready';
			blocks[activeBlock+i].content = blocks[activeBlock].content;
			blocks[activeBlock+i].color = blocks[activeBlock].color;
			block[activeBlock+i].textContent = blocks[activeBlock].content.toUpperCase()
			block[activeBlock+i].style.background = blocks[activeBlock].color
			block[activeBlock].textContent = '';
			block[activeBlock].style.background = '';
			blocks[activeBlock].content = '';
			blocks[activeBlock].color = '';
			//updateBlock();
			//nextt(false);
			//createNext()
			scoreAll()
			activeBlock = '';
			game = 'ready';
			break;
		}
	}
}
//Start Game
var clock;
function start(){
	newGame();
	clearInterval(clock);
	clock = setInterval(function(){
		refresh();
		if(game == 'paused'){

		}else if (activeBlock === '') {
			nextt(false);
			createNext()
			//updateBlock(false);
			updateBlocks();
		}else if(activeBlock == 'GO'){
			scoreBoard.innerHTML += '<br><p class="go">Game Over!</p>'
			clearInterval(clock);
		}else{
			res = down()
			if(res == true || res == 'next'){
				//updateBlock(false);
				nextt(false);
				createNext()
				updateBlocks();
			}else if(res == 'hello'){

			}else{
				clearInterval(clock);
			}
		}
	},1000)
}
//move update Score
function score(){
	area1 = [[0,1,2,3,4,5,6],[7,8,9,10,11,12,13],[14,15,16,17,18,19,20],[21,22,23,24,25,26,27],[28,29,30,31,32,33,34],[35,36,37,38,39,40,41],[42,43,44,45,46,47,48],[49,50,51,52,53,54,55],[56,57,58,59,60,61,62],[63,64,65,66,67,68,69]];
	area2 = [[0,7,14,21,28,35,42,49,56,63],[1,8,15,22,29,36,43,50,57,64],[2,9,16,23,30,37,44,51,58,65],[3,10,17,24,31,38,45,52,59,66],[4,11,18,25,32,39,46,53,60,67],[5,12,19,26,33,40,47,54,61,68],[6,13,20,27,41,48,55,62,69]];
	wordList = [];
	posList = [];
	for (var i = 0; i < area1.length; i++) {
		if(area1[i].includes(activeBlock)){
			store = vscore(area1[i])
			if (store) {
				wordList.push(store[0]);
				posList.push(store[1]);
			}
		}
	}
	for (var j = 0; j < area2.length; j++) {
		if(area2[j].includes(activeBlock)){
			store1 = vscore(area2[j]);
			if (store1) {
				wordList.push(store1[0]);
				posList.push(store1[1]);
			}
		}
	}
	if (wordList.length > 0) {
		scoring1(wordList,posList);
	}
}
function scoreAll(){
	area1 = [[0,1,2,3,4,5,6],[7,8,9,10,11,12,13],[14,15,16,17,18,19,20],[21,22,23,24,25,26,27],[28,29,30,31,32,33,34],[35,36,37,38,39,40,41],[42,43,44,45,46,47,48],[49,50,51,52,53,54,55],[56,57,58,59,60,61,62],[63,64,65,66,67,68,69]];
	area2 = [[0,7,14,21,28,35,42,49,56,63],[1,8,15,22,29,36,43,50,57,64],[2,9,16,23,30,37,44,51,58,65],[3,10,17,24,31,38,45,52,59,66],[4,11,18,25,32,39,46,53,60,67],[5,12,19,26,33,40,47,54,61,68],[6,13,20,27,41,48,55,62,69]];
	wordList = [];
	posList = [];
	for (var i = 0; i < area1.length; i++) {
		//if(area1[i].includes(activeBlock)){
			store = vscore(area1[i])
			if (store) {
				wordList.push(store[0]);
				posList.push(store[1]);
			}
		//}
	}
	for (var j = 0; j < area2.length; j++) {
		//if(area2[j].includes(activeBlock)){
			store1 = vscore(area2[j]);
			if (store1) {
				wordList.push(store1[0]);
				posList.push(store1[1]);
			}
		//}
	}
	if (wordList.length > 0) {
		scoring1(wordList,posList);
	}
}
function vscore(x){
	word = '';
	pos = [];
	for (var i = 0; i < x.length; i++) {
		word += blocks[x[i]].content;
		blocks[x[i]].content != '' ? pos.push(blocks[x[i]].position) : '';
	}
	if(word.length > 2){
		return possibleCombinations(word,pos);
	}else{
		return false;
	}
}
function goCheck(x) {
	if(x.content == ''){
		return true;
	}else{
		game = 'not ready';
		score();
		game = 'ready';
		return 'next'
	}
}
function scoring(x) {
	scoreList = [['a','e','i','l','n','o','r','s','t','u'],['d','g'],['b','c','p','m'],['f','h','v','w','y'],['k'],['j','x'],['q','z']];
	tscore = 0;
	for (var j = 0; j < x.length; j++) {
		for (var i = 0; i < scoreList.length; i++) {
			if(scoreList[i].includes(x[j])){
				if(i == 5){
					tscore += 8;
				}else if(i == 6){
					tscore += 10;
				}else{
					tscore += (i+1);
				}
			}
		}
	}
	return tscore*10;
}
function scoring1(x,y){
	iiHigh = 0;
	iHigh = 0;
	sHigh = 0;
	if(x.length > 1){
		for (var j = 0; j < x.length; j++) {
			for (var i = 0; i < x.length; i++) {
				cScore = scoring(x[j][i][0])
				if(scoring(x[j][i]) > sHigh){
					iiHigh =  j;
					iHigh = i;
					sHigh = cScore;
				}
			}
		}
	}else{
		for (var i = 0; i < x.length; i++) {
			cScore = scoring(x[i][0])
			if(cScore > sHigh){
				iHigh = i;
				sHigh = cScore;
			}
		}
	}
	scoreMe = scoring(x[iiHigh][iHigh]);
	finalScore += scoreMe;
	showNotif('Word "'+x[iiHigh][iHigh]+'" has been cleared and scores '+sHigh)
	adjustAll(y[iiHigh][iHigh]);
}
combo = 0;
function adjustAll(x){
	combo ++;
	combo > 1 ? showNotif(combo + ' Combo') : '';
	for (var i = 0; i < x.length; i++) {
		blocks[x[i]].content = '';
		blocks[x[i]].color = '';
	}
	for (var i = 70 - 1; i >= 0; i--) {
		if(i-7 < 0){
			break;
		}
		if(blocks[i-7].content != '' && blocks[i].content == ''){
			blocks[i].content = blocks[i-7].content;
			blocks[i].color = blocks[i-7].color;
			blocks[i-7].content = '';
			blocks[i-7].color = '';
			updateBlocks();
		}
		if (i == 0) {
			game = 'not ready';
			scoreAll();
			game = 'ready';

		}
		
	}
}
let possibleCombinations = (str,pos) =>{
    let combinations = [];
    let positions = [];
    let vpos = [];
    let vcombinations = [];
    temp = [];
    for(let i = 0 ;i < str.length; i++){
	    for(let j = i + 1; j< str.length + 1; j++){	
	        if(str.slice(i , j).length >= 3){
	        	combinations.push(str.slice(i , j));
	        	positions.push(pos.slice(i , j));
	        }
	    }
	}
    for (var i = 0; i < combinations.length; i++) {
    	if (english[combinations[i]] == 1) {
    		vpos.push(positions[i]);
    		vcombinations.push(combinations[i]);
    	}
    }
    if(vcombinations.length == 0){
    	return
    }else{
    	temp.push(vcombinations)
		temp.push(vpos)
		return temp
    }
}
//pause
function pause(x) {
	if (x.innerHTML == '<ion-icon name="play" role="img" class="md hydrated" aria-label="play"></ion-icon>') {
		x.innerHTML = '<ion-icon name="pause"></ion-icon>'
		game = 'ready';
	}else{
		game = 'paused';
		x.innerHTML = '<ion-icon name="play"></ion-icon>'
	}
	
}
function newGame() {
	blocks = [];
	nextList = [];
	holdList = [];
	finalScore = 0;
	createBlocks();
	nextt(true);nextt(true);nextt(true);nextt(true);
	createNext();
	createHold();
	updateBlocks();
	activeBlock = '';
}
fullscreen = true;
function fstoogle(x) {
	elem = document.querySelector('.container1')
	if(fullscreen){
		elem.requestFullscreen();
		x.src = 'assets/img/fullexit.svg';
		fullscreen = false;
	}else{
		document.exitFullscreen();
		x.src = 'assets/img/fullin.svg';
		fullscreen = true;
	}
}
function showNotif(x){
	floatingNotif = document.querySelector('.floatingNotif')
	floatingNotif.style.opacity = '1';
	floatingNotif.textContent = x;
	setTimeout(function(){
		floatingNotif.style.opacity = '0'
	},3000)
}
createBlocks();
document.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) {
        left();
    }else if(e.keyCode == 38){
    	bottom();
    }else if(e.keyCode == 39){
    	right();
    }else if(e.keyCode == 40){
    	down();
    }else if(e.key === '1' ){
    	releaseHold(0);
    }else if(e.key=== '2' ){
    	releaseHold(1);
    }else if(e.key === '3'){
    	releaseHold(2);
    }else if(e.keyCode == 16){
    	holdd()
    }
});
container.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

container.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false);


function handleGesture() {
    if (touchendX < touchstartX) {
        left();
    }else if (touchendX > touchstartX) {
        right();
    }else if (touchendY < touchstartY) {
       bottom();
    }else if (touchendY > touchstartY) {
        down();
    }
}
updateBlocks();
/*
Make bombs
type = 3x3 block destroyer
horizontal destroyer
vertical destroyer
randomize letter
optimization (updateblocks) animation
fix center bug
combo count
*/
