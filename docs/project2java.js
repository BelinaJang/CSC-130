var i = 0, date = [], parity = [], amount = [], note = [], balance = [], savedate = [], savename = [], savecategory = [], saveamount = [];
let categories = ["Grocery", "Transportation", "Entertainment", "Shopping", "Eating out", "Snack", "Bills"];
let categorypercent = [];
// var spendingarray = [];
var spendarray = [{name: 'Grocery', y: 0},
		{name: 'Transportation', y: 0},
		{name: 'Entertainment', y: 0},
		{name: 'Shopping', y: 0},
		{name: 'Eating out', y: 0},
		{name: 'Snack', y: 0},
		{name: 'Bills', y: 0}];

let user = {
	"FirstName" : "Belina",
	"LastName" : "Jang",
	"DOB" :"19990910",
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

function reSpendingTable(){
	for (let i = 0; i < tempObj.SpendingHistory.length; i++) {
		if (date.find((element => element == tempObj.SpendingHistory[i].date)) == null) {
			date[i] = tempObj.SpendingHistory[i].date;
			amount[i] = tempObj.SpendingHistory[i].amount;
		} else {
			// when there's other spending for the same day
			amount[date.findIndex((element => element == tempObj.SpendingHistory[i].date))] += tempObj.SpendingHistory[i].amount;
		}
	}

	//remove empty entries
	date = date.filter(Boolean);
	amount = amount.filter(Boolean);

	//chart
	Highcharts.chart('colchart-container', {
		chart: {
			type: 'column'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: date,
			crosshair: true
		},
		yAxis: {
			min: 0,
			title: {
				text: 'dollars ($)'
			}
		},
		tooltip: {
			headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.1f}$</b></td></tr>',
			footerFormat: '</table>',
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
			}
		},
		series: [{
			name: 'Spending',
			data: amount,
			color: '#6083bc'
		}/*, {

			name: 'Berlin',
			data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8,
				51.1]
	
		}*/]
	});
}

function reSavingTable() {
	for (let i = 0; i < tempObj.SavingHistory.length; i++) {
		if (date.find((element => element == tempObj.SavingHistory[i].date)) == null) {
			date[i] = tempObj.SavingHistory[i].date;
			amount[i] = tempObj.SavingHistory[i].amount;
			balance[i] = tempObj.SavingHistory[i].balance;
		} else {
			// when there's other saving transaction for the same day
			if (tempObj.SavingHistory[i].parity == '-') {
				amount[date.findIndex((element => element == tempObj.SavingHistory[i].date))] -= tempObj.SavingHistory[i].amount;
				balance[date.findIndex((element => element == tempObj.SavingHistory[i].date))] -= tempObj.SavingHistory[i].amount;
			} else {
				amount[date.findIndex((element => element == tempObj.SavingHistory[i].date))] += tempObj.SavingHistory[i].amount;
				balance[date.findIndex((element => element == tempObj.SavingHistory[i].date))] += tempObj.SavingHistory[i].amount;
			}
		}
	}

	//remove empty entries
	date = date.filter(Boolean);
	amount = amount.filter(Boolean);
	balance = balance.filter(Boolean);

	Highcharts.chart('linechart-container', {
		chart: {
			type: 'line'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: date
		},
		yAxis: {
			title: {
				text: 'dollars ($)'
			}
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: true
				},
				enableMouseTracking: false
			}
		},
		series: [{
			name: 'Saving amount',
			data: amount,
			color: '#6083bc'
		}, {
			name: 'Saving balance',
			data: balance,
			color: '#f1dfd8'//'#e3beb0'
		}]
	});

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
	
	totalspending = 0;
	for (let i = 0; i  < categoryTotal.length; i++) {
		totalspending += categoryTotal[i];
	}

	console.log(totalspending);

	for (let k = 0; k < categories.length; k++){
		categorypercent[k] = (categoryTotal[k]/totalspending)*100; 
		console.log("percent k:"+ k + "  "+categorypercent[k]);
		let newRow = "<tr>"
		newRow += '<td class="cell">' + categories[k] + "</td>";
		newRow += '<td class="cell">' + categoryTotal[k] + "</td></tr>";
	  	document.getElementById("spendingCategoryTable").innerHTML += newRow;
	// document.getElementById("spendingCategoryTable").insertAdjacentHTML = newRow;
	}

	/*for (let i = 0; i < categories.length; i++) {
		let obj = {name: '', y: 0};
		let key = categories[i];
		obj['name'] = key;
		obj['y'] = parseFloat(categoryTotal[i]);
		spendingarray[i] = obj;
	}
	console.log(spendingarray);*/

	for (let i = 0; i < categories.length; i++) {
		spendarray[i].y = parseFloat(categoryTotal[i]);
	}
	console.log("spend array: ");
	console.log(spendarray);
}

// var spendingarray = [];
// for (let i = 0; i < categories.length; i++) {
// 	let obj = {name: categories[i], y: 1};
// 	let key = categories[i];
// 	// let val = categorypercent[i];
// 	obj['name'] = key;
// 	obj['y'] = Number(categorypercent[i]);
// 	spendingarray[i] = obj;
// }
// console.log(spendingarray);

/* Pie chart #5a9ff3 0%, #d1937c */

function reChart(){
	// Make monochrome colors
	var pieColors = (function () {
		var colors = ['#d1937c', '#e3beb0', '#f1dfd8', '#dfe6f2' , '#a0b5d7', '#809cc9','#6083bc']
			// base = Highcharts.getOptions().colors[0],
			// i;
	
		// for (i = 0; i < 10; i += 1) {
		// 	// Start out with a darkened base color (negative brighten), and end
		// 	// up with a much brighter color
		// 	colors.push(Highcharts.color(base).brighten((i - 3) / 7).get());
		// }
		return colors;
	}());

	// Build the chart
	Highcharts.chart('container', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: '',
			align: 'center'
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		accessibility: {
			point: {
				valueSuffix: '%'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				colors: pieColors,
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
					distance: -50,
					filter: {
						property: 'percentage',
						operator: '>',
						value: 4
					}
				}
			}
		},
		series: [{
			name: 'Percent',
			data: spendarray
		}]
	});
	
}
