let margeTitle = "Marge Simpson!";
let margeImg = "marge.png";

let margeDescription = "Marjorie Jacqueline \"Marge\" Simpson (nÃ©e Bouvier) is a fictional character in the American animated sitcom The Simpsons and part of the eponymous family. She is voiced by Julie Kavner and first appeared on television in The Tracey Ullman Show short \"Good Night\" on April 19, 1987. Tracy Ullman provided the first voice of Marge, which was then passed to Julie Kavner upon being picked up by Fox. Marge was created and designed by cartoonist Matt Groening while he was waiting in the lobby of James L. Brooks' office. Groening had been called to pitch a series of shorts based on Life in Hell but instead decided to create a new set of characters. He named the character after his mother Margaret Groening. After appearing on The Tracey Ullman Show for three seasons, the Simpson family received their own series on Fox, which debuted December 17, 1989. From <a href=\"https://en.wikipedia.org/wiki/Marge_Simpson\">Wikipedia</a>.";

let homerTitle = "Homer Simpson!";
let homerImg = "homer.png";

let homerDescription =  "Homer Jay Simpson is a fictional character and the main protagonist of the American animated sitcom The Simpsons as the patriarch of the eponymous family. He is voiced by Dan Castellaneta and first appeared on television, along with the rest of his family, in The Tracey Ullman Show short \"Good Night\" on April 19, 1987. Homer was created and designed by cartoonist Matt Groening while he was waiting in the lobby of James L. Brooks' office. Groening had been called to pitch a series of shorts based on his comic strip Life in Hell but instead decided to create a new set of characters. He named the character after his father, Homer Groening. After appearing for three seasons on The Tracey Ullman Show, the Simpson family got their own series on Fox that debuted December 17, 1989. From <a href=\"https://en.wikipedia.org/wiki/Homer_Simpson\">Wikipedia</a>."

document.getElementById("personTitle").innerHTML = homerTitle;
document.getElementById("myImage").src = homerImg;
document.getElementById("description").innerHTML = homerDescription;

let current = "homer"
/*
function switchCharacter() {
	if (current === "marge") {
		document.getElementById("personTitle").innerHTML = homerTitle;
		document.getElementById("myImage").src = homerImg;
		document.getElementById("description").innerHTML = homerDescription;
		current = "homer";
	} else {
		document.getElementById("personTitle").innerHTML = margeTitle;
		document.getElementById("myImage").src = margeImg;
		document.getElementById("description").innerHTML = margeDescription;
		current = "marge";
	}
	
}
*/
function switchCharacter() {
	if (current === "marge") {
		$("#personTitle").html(homerTitle);
		$("#myImage").attr("src",homerImg);
		$("#description").html(homerDescription);
		current = "homer";
	} else {
		$("#personTitle").html(margeTitle);
		$("#myImage").attr("src",margeImg);
		$("#description").html(margeDescription);
		current = "marge";
	}
	
}