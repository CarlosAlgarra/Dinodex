var imgs = [ [ "http://efdreams.com/data_images/dreams/dinosaur/dinosaur-11.jpg","Triceratops"],
             ["http://orig03.deviantart.net/f652/f/2014/331/5/7/jurassic_world__tyrannosaurus_rex_by_sonichedgehog2-d87wp3n.png","Tyranosaurus Rex"],
             ["http://kindersay.com/files/images/dinosaur.png","Brontosaurus"]
           ]
		   


$("#butt").click(function(){
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
	console.log()
	$("#game").show();
	
	
})

$("#answer").click(function(){
	var myVar=setTimeout(myFunction,5000);
	/* clearTimeout(myVar); */

	
})

function myFunction(){
	var val=document.getElementById("answer").value;
	var val2=$("#dinotext").text();
	if(val==val2){
		alert("you are right");
		
	}
	else{
		alert("you are wrong");
	}
	document.getElementById("answer").value="";


}
