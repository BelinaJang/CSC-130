var i = 0, date = [], parity = [], amount = [], note = [], balance = [], savedate = [], savename = [], savecategory = [], saveamount = [];
let categories = ["Grocery", "Transportation", "Entertainment", "Shopping", "Eating out", "Snack", "Bills"]

let user = {
	"FirstName" : "Belina",
	"LastName" : "Jang",
	"DOB" :"20000000",
	"AcountBalance" : [
		{
		"type" : "Saving",
		"balance" : 3000
		},
		{
		"type" : "Chequing",
		"balance" : 1800
		}
	],
	"SavingHistory" : [
		{
		"date" : "3/1",
    	"parity": "+",
		"amount" : 1000,
		"note" : "from chequing",
		"balance" : 1000
		},
		{
		"date" : "4/15",
    	"parity": "+",
		"amount" : 500,
		"note" : "gift",
		"balance" : 1500
		},
		{
		"date" : "5/1",
    	"parity": "+",
		"amount" : 1500,
		"note" : "from chequing",
		"balance" : 3000
		}
	],
	"SpendingHistory" : [
		{
		"date" : "3/5",
		"name" : "Costco",
		"category" : "Grocery",
		"amount" : 250
		},
		{
		"date" : "3/26",
		"name" : "Buspass",
		"category" : "Transportation",
		"amount" : 40
		},
		{
		"date" : "4/1",
		"name" : "Sushi",
		"category" : "Eating out",
		"amount" : 38
		},
		{
		"date" : "4/22",
		"name" : "Icecream",
		"category" : "Snack",
		"amount" : 8
		},
		{
		"date" : "4/27",
		"name" : "Fido",
		"category" : "Bills",
		"amount" : 70
		},
		{
		"date" : "5/2",
		"name" : "Walmart",
		"category" : "Grocery",
		"amount" : 37
		}
	]
};

// checking localStorage for previous data
if(localStorage.getItem("ls_user") === null){
	tempObj = user;
	console.log("No ls_user found")
} else {
	pasthistory = localStorage.getItem("ls_user");
	tempObj = JSON.parse(pasthistory);

	console.log("tempObj: ");
	console.log(tempObj);
}

// loading saving journal from local storage
function checkSaving() {
	saveIndex = Object.keys(tempObj.SavingHistory);
	i = saveIndex.length;

	for (let j = 0; j < i; j++) {
		date[j] = tempObj.SavingHistory[saveIndex[j]].date;
		parity[j] = tempObj.SavingHistory[saveIndex[j]].parity;
		amount[j] = tempObj.SavingHistory[saveIndex[j]].amount;
		note[j] = tempObj.SavingHistory[saveIndex[j]].note;
		balance[j] = tempObj.SavingHistory[saveIndex[j]].balance;

		let newRow = "<tr>";
		newRow += '<td class="cell">' + date[j] + "</td>";
		newRow += '<td class="cell">' + parity[j] + "</td>";
		newRow += '<td class="cell">' + amount[j] + "</td>";
		newRow += '<td class="cell">' + note[j] + "</td>";
		newRow += '<td class="cell">' + balance[j] + "</td></tr>";
		document.getElementById("savingTable").innerHTML += newRow;
	};

	console.log(
		"arrays - " + 
		" date: " + date +
		" parity: " + parity +
		" amount: " + amount +
		" note: " + note +
		" balance: " + balance
	);
	
	console.log("Found: "+ i +" saving entries in local storage");
};

// loading spending journal from local storage
function checkSpending() {
	spendIndex= Object.keys(tempObj.SpendingHistory);
	j = spendIndex.length;

	for (let i = 0; i < j; i++) {
		savedate[i] = tempObj.SpendingHistory[spendIndex[i]].date;
		savename[i] = tempObj.SpendingHistory[spendIndex[i]].name;
		savecategory[i] = tempObj.SpendingHistory[spendIndex[i]].category;
		saveamount[i] = tempObj.SpendingHistory[spendIndex[i]].amount;

		let newRow = "<tr>";
		newRow += '<td class="cell">' + savedate[i] + "</td>";
		newRow += '<td class="cell">' + savename[i] + "</td>";
		newRow += '<td class="cell">' + savecategory[i] + "</td>";
		newRow += '<td class="cell">' + saveamount[i] + "</td></tr>";
		document.getElementById("spendingTable").innerHTML += newRow;
	};

	console.log(
		"arrays - " + 
		" date: " + savedate +
		" name: " + savename +
		" category: " + savecategory +
		" amount: " + saveamount
	);
	
	console.log("Found: "+ j +" spending entries in local storage");
};

/*Saving*/

function currentbalance(new_parity, new_amount) {
	console.log(tempObj.SavingHistory)

	let savingbalance = tempObj.SavingHistory[i-1].balance;
	new_amount = Number(new_amount);
  
	if (new_parity==="+"){
		savingbalance += new_amount;
	} else {
		savingbalance -= new_amount;
	}

	return savingbalance
}
// not being used
// function checkingbalance(new_parity, new_amount) {

// 	console.log(tempObj.SavingHistory)

//   let savingbalance = tempObj.SavingHistory[i-1].balance;
//   new_amount = Number(new_amount);
  
//   if (new_parity==="+"){
// 	  savingbalance += new_amount;
//   } else {
// 	  savingbalance -= new_amount;
//   }

//   return savingbalance
// }

	
function addSaving() {
	console.log("function addSaving called");
	let new_parity = document.getElementById("parity_input").value;
	var new_amount = document.getElementById("amount_input").value;

	if (new_amount > 0) {
  
	let savingbal = currentbalance(new_parity, new_amount);
  
	let newSaving = {
		"date" : document.getElementById("date_input").value,
    	"parity" : new_parity,
		"amount" : Number(new_amount),
		"note" : document.getElementById("note_input").value,
		"balance" : Number(savingbal)
	};

  	console.log("updated saving balance", newSaving);
	addToArray(newSaving);
	} else {
		alert("invalid value entered");
	}
}


function addToArray(newSaving) {
	console.log("function addToArray ran");

	// user.SavingHistory.push(newSaving); (for mock server user)

	// Add new saving on the table
    let newRow = "<tr>";
    newRow += '<td class="cell">' + newSaving.date + "</td>";
    newRow += '<td class="cell">' + newSaving.parity + "</td>";
    newRow += '<td class="cell">' + newSaving.amount + "</td>";
	newRow += '<td class="cell">' + newSaving.note + "</td>";
    newRow += '<td class="cell">' + newSaving.balance + "</td></tr>";

    document.getElementById("savingTable").innerHTML += newRow;
    tempObj.AcountBalance[0].balance = newSaving.balance;

	newSavingToLS(newSaving);
}

// when there's a new entry
function newSavingToLS(newSaving){
	console.log("function updateLocalStorage ran")
	//update arrays why tho?
	date[i] = newSaving.date;
	parity[i] = newSaving.parity;
	amount[i] = newSaving.amount;
	note[i] = newSaving.note;
	balance[i] = newSaving.balance;

	var tempData = {"date" : date[i],
		"parity" : parity[i],
		"amount" : amount[i],
		"note" : note[i],
		"balance" : balance[i]
	};

	console.log("tempData: ");
	console.log(tempData);
	console.log(" at position " + i);
	tempObj.SavingHistory.push(tempData);

	JSONObj = JSON.stringify(tempObj);
	console.log("JSONObj: ");
	console.log(JSONObj);
	localStorage.setItem("ls_user", JSONObj);
	i++;
}

/*Spending*/

function addSpending() {
	var new_price = document.getElementById("price_input").value;
	if (new_price > 0) {
	let new_date = document.getElementById("spend_date_input").value;
	let new_name = document.getElementById("name_input").value;
	let new_category = document.getElementById("category_input").value;
	
	let newSpending = {
		"date" : new_date,
    	"name" : new_name,
		"category" : new_category,
		"amount" : Number(new_price),
	};
	console.log("new spending item", newSpending);
	
	addToSpendingArray(newSpending);
	} else {
		alert("invalid value entered");
	}
}


function addToSpendingArray(newSpending) {
	let newRow = "<tr>";
	newRow += '<td class="cell">' + newSpending.date + "</td>";
	newRow += '<td class="cell">' + newSpending.name + "</td>";
	newRow += '<td class="cell">' + newSpending.category + "</td>";
	newRow += '<td class="cell">' + newSpending.amount + "</td></tr>";
	document.getElementById("spendingTable").innerHTML += newRow;
	tempObj.AcountBalance[1].balance -= newSpending.amount
	
	/*resetting category table*/
	for (let i = 0; i < categories.length; i++) {
		document.getElementById("spendingCategoryTable").deleteRow(1);
	}
	
	newSpendingToLS(newSpending);
}

function newSpendingToLS(newSpending){
	console.log("newSpending: ");
	console.log(newSpending);
	console.log(" at position " + j);
	tempObj.SpendingHistory.push(newSpending);

	JSONObj = JSON.stringify(tempObj);
	console.log("JSONObj: ");
	console.log(JSONObj);
	localStorage.setItem("ls_user", JSONObj);
	j++;
	addToCategoryArray();
}

/*Categories table*/
function addToCategoryArray(){
	let groceryTotal = 0, transportationTotal = 0, eatingOutTotal = 0, snackTotal = 0, billsTotal = 0, enterTotal = 0, shopTotal = 0;
	let categoryTotal = [groceryTotal, transportationTotal, enterTotal, shopTotal, eatingOutTotal, snackTotal, billsTotal];

	for (let i = 0; i< tempObj.SpendingHistory.length; i++){
			let SpendingObject = tempObj.SpendingHistory[i];
		for (let j = 0; j < categories.length; j++) {
			if (SpendingObject.category === categories[j]){
			categoryTotal[j] += SpendingObject.amount;
			}
		}
	}
	console.log(categoryTotal);

	for (let k = 0; k < categories.length; k++){
		let newRow = "<tr>"
		newRow += '<td class="cell">' + categories[k] + "</td>";
		newRow += '<td class="cell">' + categoryTotal[k] + "</td></tr>";
	  	document.getElementById("spendingCategoryTable").innerHTML += newRow;
	// document.getElementById("spendingCategoryTable").insertAdjacentHTML = newRow;
	}
}
