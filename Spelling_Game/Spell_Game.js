
var score=0;
var imgs = [ [ "http://efdreams.com/data_images/dreams/dinosaur/dinosaur-11.jpg","Triceratops"],
             ["http://orig03.deviantart.net/f652/f/2014/331/5/7/jurassic_world__tyrannosaurus_rex_by_sonichedgehog2-d87wp3n.png","Tyrannosaurus Rex"],
             ["http://kindersay.com/files/images/dinosaur.png","Brontosaurus"]
           ]
		   
 random();

function random(){
	var x=Math.floor(Math.random() * 3) + 1;
	if(x==1){
		document.getElementById("dino").src=imgs[0][0]
		document.getElementById("dinotext").innerHTML=imgs[0][1]
		
	}
	else if(x==2){
		document.getElementById("dino").src=imgs[1][0]
		document.getElementById("dinotext").innerHTML=imgs[1][1]
		
	}
	else{
		document.getElementById("dino").src=imgs[2][0]
		document.getElementById("dinotext").innerHTML=imgs[2][1]
		
	}
	
	
}

$("#answer").click(function(){
	var myVar=setTimeout(myFunction,10000);
	});
	
function myFunction(){
	var val=document.getElementById("answer").value;
	var val2=$("#dinotext").text();
	if(val==val2){
		score=score+100;
		console.log("you won! the answer was" + val2 + "the score is " + score);
		alert("You won! A dinosaur has been collected.")
		$.post('/updateScore',
			{
			gameName: "spellGame",
			newScore: score
		});

		
	}
	else{
		score=score-50;
		alert("Boo you lost! your total score was " + score );
	}
	document.getElementById("answer").value="";
	document.getElementById("spell").value=score;
	document.getElementById("spell").innerHTML=score;
	$("#score").show();
		


}

