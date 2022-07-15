/*************
   PART 1
*************/
function invert() {
	document.getElementById("part1").style.backgroundColor = "black";
  document.getElementById("part1").style.color = "white";
}

function reset() {
	document.getElementById("part1").style.backgroundColor = "white";
  document.getElementById("part1").style.color = "black";
}

function red() {
	document.getElementById("part1").style.backgroundColor = "red";
}

/*************
   PART 2
*************/
function part_two() {
  let new_color = document.getElementById("color_input").value;
  document.getElementById("part2").style.backgroundColor = new_color;
}

function text_color() {
  let new_color = document.getElementById("text_color_input").value;
  document.getElementById("part2").style.color = new_color;
}


/*************
   PART 3: how does p3 different from part3
*************/
function button_selected() {
	let form = document.getElementById("p3");
  let choice = form.elements.color_choice.value;
  document.getElementById("part3").style.backgroundColor = choice;
}


/*************
   PART 4
*************/
function dropdown_choice() {
	let form = document.getElementById("p4");
  let choice = form.elements.dropdown.value;
  document.getElementById("part4").style.backgroundColor = choice;
}


/*************
   PART 5: .value?
*************/
function greeting() {
  let first_name = document.getElementById("first").value;
  let last_name = document.getElementById("last").value;
  let x = first_name.length; 
  let y = last_name.length;
  
  if (first_name.length === 0 || last_name.length === 0) {
    alert("You didn't enter names into both boxes");
  } else {
    alert("Your first name, " + first_name + ", contains "+ x + " letters, and your last name, " + last_name + ", contains " + y + " letters!");
  }
}


/*************
   PART 6 
*************/
function rgb_selection() {
	let form = document.getElementById("p6");
  let r = form.elements.red.value;
  let g = form.elements.green.value;
  let b = form.elements.blue.value;
  let a = form.elements.alpha.value;
  let rgba = "rgba(" + r + "," + g + "," + b + "," + a + ")";
  document.getElementById("part6").style.backgroundColor = rgba;
}

