
function getAllImages(){
	baseArray = Array();
	baseArray.push("/memgame/blackstego.png");
	baseArray.push("/memgame/blacktrex.png");
	baseArray.push("/memgame/bluetrex.png");
	baseArray.push("/memgame/greenbronto.png");
	baseArray.push("/memgame/greenstego.png");
	baseArray.push("/memgame/pinktricera.png");
	shuffleArray( baseArray );
	return baseArray;
}
function shuffleArray ( myArray ) {
  var i = myArray.length;
  if ( i == 0 ) return false;
  while ( --i ) {
     var j = Math.floor( Math.random() * ( i + 1 ) );
     var tempi = myArray[i];
     var tempj = myArray[j];
     myArray[i] = tempj;
     myArray[j] = tempi;
   }
}

function MemoryGame(tbodyElement){
	this.tBodyElement = tbodyElement;
	this.cardState = 0; 
	this.cardTable = null;
	this.cardShows1 = null;
	this.cardShows2 = null;
	this.cardsArr = getAllImages();
}

MemoryGame.prototype.createTable = function(width, height){
	var html = [];
	this.w = width;
	this.h = height;
	var maxBoardSize = this.cardsArr.length * 2;

	if(width * height > maxBoardSize){
		alert("Not enough images!");
		return;
	}
	
	this.genCardsTable();
	
	for(var i=0; i<height; i++){
		var line = "<tr>";
		
		for(var j=0; j<width; j++){
			line += "<td><div id='card_"+
				(i*this.w+j)
				+"' onclick='cardClickHandler(\"" + (i*this.w+j) + "\");'>"
				//+this.cardTable[i*this.w+j]
				+"</div></td>";
		}
		line += "</tr>";
		
		html.push(line);
	}
	
	$(this.tBodyElement).html(html.join(""));
}

MemoryGame.prototype.genCardsTable = function(){
	var linearTable = [];
	
	for(var i=0; i<(this.h*this.w)/2; i++){
		linearTable[i*2] = linearTable[i*2+1] = i;
	}
	
	shuffleArray(linearTable);
	
	this.cardTable = linearTable;
}

function padZero10(num){
	if(num < 10){
		return "0"+num;
	}else{
		return ""+num;
	}
}

var clickCount = 0;
var pairsFound = 0;
MemoryGame.prototype.cardClick = function(cardNum){
	var $cardDiv = $(this.tBodyElement).find('#card_'+cardNum);
	
	if($cardDiv.hasClass('showingCard') == true){
		// card already showing, do nothing
		return;
	}

	clickCount = clickCount + 1;
	cardImageNum = this.cardTable[cardNum];
	
	switch(this.cardState){
	case 0:// 0 cards not showing
		$cardDiv.addClass('showingCard');
		url = this.cardsArr[cardImageNum]
		$cardDiv.css('background-image', 'url(' + url + ')')

		this.cardState = 1;
		this.cardShows1 = cardNum;
		break;
	case 1:// 1 card showing
		$cardDiv.addClass("showingCard");

		// check if match
		if(this.cardTable[cardNum] == this.cardTable[this.cardShows1]){
			pairsFound = pairsFound + 1;
			$cardDiv.addClass("pairFound");
			$(this.tBodyElement).find('#card_'+this.cardShows1).addClass("pairFound");
			this.cardState = 0;
		}else{
			this.cardShows2 = cardNum;
			this.cardState = 2;
		}

		// show img anyways
		url = this.cardsArr[cardImageNum]
		$cardDiv.css('background-image', 'url(' + url + ')')
	
		break;
	case 2:
		// 2 cards showing
		card1 = $(this.tBodyElement).find('#card_'+this.cardShows1);
		card1.removeClass("showingCard");
		card1.css('background-image', '');

		card2 = $(this.tBodyElement).find('#card_'+this.cardShows2);
		card2.removeClass("showingCard");
		card2.css('background-image', '');
	
		this.cardShows1 = this.cardShows2 = null;
		clickCount = clickCount - 1;
		
		this.cardState = 0;
		break;
	}
	
	if(pairsFound >= 6){
		/*
			$.get('views/index.ejs',null, function(text){
			var CURRENTDINOID = $(text).find('#CURRENTDINOID')[0].innerHTML
			var CURRENTDINOUSER = $(text).find('#loginstatus').value
			alert("ID: "+CURRENTDINOID)
			alert("USER: "+CURRENTDINOUSER)
		*/
		$.post('/updateScore',
		{
			gameName: "memGame",
			newScore: clickCount
		});
		
		$.post('/updateDino',
		{
		});
		
		alert("You won! A dinosaur has been collected.")
		
		
	
			
			
			
		//});
	}
	


}
function cardClickHandler(cardNum){
	$('#game_table tbody').data('gameobject').cardClick(cardNum);
}

$(function(){
	var game = new MemoryGame($('#game_table tbody'));
	
	game.createTable(4,3);
	
	$('#game_table tbody').data('gameobject', game);
	
});

