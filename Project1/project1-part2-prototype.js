

let savingArray = [];
let savingbal = 0
	
	
function add-saving() {
	let new_parity = document.getElementById("parity_input").value;
	let new_amount = document.getElementById("amount_input").value
	if (new_parity==="+"){
    savingbal += new_amount;
  } else {
  	savingbal = savingbal - new_amount;
  }

	let newSaving = {
		date: document.getElementById("date_input").value;
		amount: document.getElementById("amount_input").value; 
		note: document.getElementById("note_input").value; 
		balance: bal;
	};
	
	addToArray(newSaving);
}

function addToArray(newSaving) {
  if (newSaving.amount.value > 0) {
    let newRow = "<tr id=\"part3\">";
    newRow += "<td>" + newSaving.date + "</td>";
    newRow += "<td>" + newSaving.amount + "</td>";
	newRow += "<td>" + newSaving.note + "</td>";
    newRow += "<td>" + newSaving.title + "</td></tr>";
    document.getElementById("courseTable").innerHTML += newRow;
  } else {
    alert("invalid value entered");
  }
}

function show() {
	var current = document.getElementById(id).style.display;
            if (current == 'block') {
                document.getElementById(id).style.display = 'none';
            } else {
                document.getElementById(id).style.display = 'block';
        }
}