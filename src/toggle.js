var hidden = false;
var buttons;
var copyIndex;
var j;
var tempArray = [];
var firstHalf;
var secondHalf;
var copyStatus;
console.log("copyStatus4: " + copyStatus);
try {// this runs if it's the first time
	console.log('Check if toggle has already been set');
	chrome.storage.local.get(['value'], function(variable) {
      if (variable.value == null) {
      	console.log('Nope');
      	chrome.storage.local.set({value: "green"}, function() {

		});
      }
    });
}
catch (err) {
	console.log(err);
}
try {// this runs if it's the first time
	console.log('Check if copy has already been set');
	chrome.storage.local.get(['copy'], function(variable) {
	console.log('copyStatus11: ' + copyStatus);
      if (copyStatus == null) {
      	console.log('Nope');
      	chrome.storage.local.set({copy: true}, function() {
			copyStatus = true;
			console.log('copyStatus3: ' + copyStatus);
		});
      }
    });
	chrome.storage.local.get(['value'], function(variable) {
      if (variable.value == "red") {
    	removeDefinitions();
      }
    });
    chrome.storage.local.get(['copy'], function(variable) {
      if (variable.copy == false) {
    	copyStatus = false;
      }
      if (variable.copy == true) {
      	copyStatus = true;
      }
      console.log("copyStatus2: " + copyStatus);
    });
}
catch (err) {
	console.log(err);
}
console.log('copyStatus10: ' + copyStatus);



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.key === "green") {
        removeDefinitions();
        chrome.storage.local.set({value: "red"}, function() {

        });
      } else if (request.key === "red") {
	    restoreDefinitions();
	    chrome.storage.local.set({value: "green"}, function() {

		});
	  }
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.copyKey === true) {
        copyStatus = true;
        chrome.storage.local.set({copy: false}, function() {

        });
      } else if (request.copyKey === false) {
	    copyStatus = false;
	    chrome.storage.local.set({copy: true}, function() {

		});
	  }
    }
);

console.log("copyStatus1: " + copyStatus);

var definitions, exampleSentences, helperDefinitions, dsense, pos2_tooltip, ph, dataPh;
var definitions2 = [];
var exampleSentences2 = [];
var helperDefinitions2 = [];
var dsense2 = [];
var pos2_tooltip_2 = [];
var ph2 = [];
var dataPh2 = [];

var i = 0;
var def = "";

try {
	ph = document.getElementsByClassName("ph");
    for (i = 0; i < ph.length; i++) {
    	if (ph[i].innerHTML == "Principal Translations") {
    		ph[i].innerHTML = "Traducciones Principales";
    	}
    }
}
catch (exception_var) {
	console.log("Principal Translations tweak error");
}

function removeDefinitions() {
	try {
    	definitions = document.getElementsByClassName('ToWrd');
    	exampleSentences = document.getElementsByClassName("ToEx");
    	helperDefinitions = document.getElementsByClassName("To2");
    	dsense = document.getElementsByClassName("dsense");
    	pos2_tooltip = document.getElementsByClassName("POS2 tooltip");
        for (i = 0; i < definitions.length; i++) {
        	def = definitions[i].innerHTML;
			definitions2.push(def);
			definitions[i].setAttribute("onmouseenter", "this.innerHTML='" + def + "';");
			definitions[i].setAttribute("onmouseleave", "this.innerHTML='[...]';");
        	definitions[i].innerHTML = "[...]";
        }
        for (i = 0; i < exampleSentences.length; i++) {
        	def = exampleSentences[i].innerHTML;
            exampleSentences2.push(def);
			exampleSentences[i].setAttribute("onmouseenter", "this.innerHTML='" + def + "';");
			exampleSentences[i].setAttribute("onmouseleave", "this.innerHTML='[...]';");
			exampleSentences[i].innerHTML = "[...]";
		}
		for (i = 0; i < helperDefinitions.length; i++) {
			def = helperDefinitions[i].innerHTML;
            helperDefinitions2.push(def);
			//helperDefinitions[i].setAttribute("onmouseenter", "this.innerHTML='" + def + "';");
			//helperDefinitions[i].setAttribute("onmouseleave", "this.innerHTML='';");
			helperDefinitions[i].setAttribute("style", "text-align:right");
			helperDefinitions[i].innerHTML = "";
		}
		for (i = 0; i < dsense.length; i++) {
			def = dsense[i].innerHTML;
            dsense2.push(def);
			//dsense[i].setAttribute("onmouseenter", "this.innerHTML='" + def + "';");
			//dsense[i].setAttribute("onmouseleave", "this.innerHTML='[...]';");
			dsense[i].setAttribute("style", "text-align:right");
			dsense[i].innerHTML = "";
		}
		for (i = 0; i < pos2_tooltip.length; i++) {
			def = pos2_tooltip[i].innerHTML;
			pos2_tooltip_2.push(def);
			//dsense[i].setAttribute("onmouseenter", "this.innerHTML='" + def + "';");
			//dsense[i].setAttribute("onmouseleave", "this.innerHTML='[...]';");
			pos2_tooltip[i].innerHTML = ".";
		}

		console.log("removed definitions: " + definitions.length + ", removed exampleSentences: " + exampleSentences.length +
					", removed helperDefinitions: " + helperDefinitions.length + ", removed dsense: " + dsense.length);
		hidden = true;
		console.log(hidden);
    }
    catch (exception_var) {
    	console.log("removeDefinitions() failed");
    }
}

function restoreDefinitions() {
	try {
        for (i = 0; i < definitions.length; i++) {
        	definitions[i].innerHTML = definitions2[i];
        	definitions[i].setAttribute("onmouseenter", "this.innerHTML='" + definitions2[i] + "';");
			definitions[i].setAttribute("onmouseleave", "this.innerHTML='" + definitions2[i] + "';");
        }
        for (i = 0; i < exampleSentences.length; i++) {
			exampleSentences[i].innerHTML = exampleSentences2[i];
			exampleSentences[i].setAttribute("onmouseenter", "this.innerHTML='" + exampleSentences2[i] + "';");
            exampleSentences[i].setAttribute("onmouseleave", "this.innerHTML='" + exampleSentences2[i] + "';");
		}
		for (i = 0; i < helperDefinitions.length; i++) {
			helperDefinitions[i].innerHTML = helperDefinitions2[i];
			helperDefinitions[i].setAttribute("onmouseenter", "this.innerHTML='" + helperDefinitions2[i] + "';");
            helperDefinitions[i].setAttribute("onmouseleave", "this.innerHTML='" + helperDefinitions2[i] + "';");
		}
		for (i = 0; i < dsense.length; i++) {
			dsense[i].innerHTML = dsense2[i];
			dsense[i].setAttribute("onmouseenter", "this.innerHTML='" + dsense2[i] + "';");
            dsense[i].setAttribute("onmouseleave", "this.innerHTML='" + dsense2[i] + "';");
		}
		for (i = 0; i < pos2_tooltip.length; i++) {
			pos2_tooltip[i].innerHTML = pos2_tooltip_2[i];
			pos2_tooltip[i].setAttribute("onmouseenter", "this.innerHTML='" + pos2_tooltip_2[i] + "';");
			pos2_tooltip[i].setAttribute("onmouseleave", "this.innerHTML='" + pos2_tooltip_2[i] + "';");
		}
		console.log("restored definitions: " + definitions2.length + ", restored exampleSentences: " + exampleSentences2.length +
					", restored helperDefinitions: " + helperDefinitions2.length + ", restored dsense: " + dsense2.length);
		hidden = false;
        console.log(hidden);
    }
    catch (exception_var) {
    	console.log("restoreDefinitions() failed");
    }
}

function insertCopyButton() {
	alert("insertCopyButton");
}

var nativeExampleSentences;
var FrWrd;
var even;
var tableRow;
var tableData;
var strong;
var tempCopyToClipboardArray = [];
var rowStartIndexes = [];
var rowDataStartIndexes = [];
var rowDataOffset = 3;
var buttonVariable;
var rowStartIndexesCount = 0;
var strongIndexes = [];
var strongIndexesCount = 0;
var nativeExampleSentenceIndexes = [];
var nativeExampleSentenceIndexesCount;
var nativeExampleSentenceRowIndexes = [];
var nativeExampleSentenceRowIndexesCount;
var tempK = 0;
var kCount = 0;
var clipboardArray;
var tableRowTemporary;

try {// button stuff
	nativeExampleSentences = document.getElementsByClassName("FrEx");
	FrWrd = document.getElementsByClassName("FrWrd");
	even = document.getElementsByClassName("even");
	tableRow = document.getElementsByTagName("tr");
	tableData = document.getElementsByTagName("td");
	strong = document.getElementsByTagName("strong");


	console.log("copyStatus5: " + copyStatus);

	rowStartIndexes = [];
	rowDataStartIndexes = [];
	for (let k = 0; k < tableRow.length; k++) {// get location of each header row
		if (tableRow[k].outerHTML.includes("esen:")) {
			rowStartIndexes.push(k);
		}
		if (tableRow[k].outerHTML.includes("FrEx")) {// get location of each definition (in bold)
			nativeExampleSentenceRowIndexes.push(k);
		} else {
			nativeExampleSentenceRowIndexes.push(-1);
		}
	}
	console.log("rowStartIndexes:");
	console.log(rowStartIndexes);
	console.log("nativeExampleSentenceRowIndexes:");
    console.log(nativeExampleSentenceRowIndexes);
	for (let k = 0; k < tableData.length; k++) {
		if (tableData[k].outerHTML.includes("<td>")) {// get location of each data in row
			rowDataStartIndexes.push(k);
		}
		if (tableData[k].outerHTML.includes("<strong>")) {// get location of each definition (in bold)
			strongIndexes.push(k);
		} else {
			strongIndexes.push(-1);
		}
		if (tableData[k].outerHTML.includes("FrEx")) {// get location of each definition (in bold)
			nativeExampleSentenceIndexes.push(k);
		} else {
			nativeExampleSentenceIndexes.push(-1);
		}
	}
	strongIndexes.shift();
	strongIndexes.shift();
	strongIndexes.shift();
	while (strongIndexes[0] == -1) {
		strongIndexes.shift();
	}
	function notEqualToNegativeOne(value) {
		return value != -1;
	}
	function notEqualToZero(value) {
		return value != 0;
	}
	strongIndexes = strongIndexes.filter(notEqualToNegativeOne);
	nativeExampleSentenceIndexes = nativeExampleSentenceIndexes.filter(notEqualToNegativeOne);
	nativeExampleSentenceIndexes.shift();
	nativeExampleSentenceRowIndexes = nativeExampleSentenceRowIndexes.filter(notEqualToNegativeOne);
	nativeExampleSentenceRowIndexes = nativeExampleSentenceRowIndexes.filter(notEqualToZero);

	//tableData[strongIndexes[0] + 3].innerHTML = "<button class=\"button2\" id=\"copyButton" + 1 + "\">Copy</button>";

	for (let k = rowStartIndexes[1]; k < tableRow.length; k++) {
		tableRow[k].onmouseenter = async function(e) {
			if (tableRow[k].outerHTML.includes("dsense")) {
				rowDataOffset = 4;
			} else {
				rowDataOffset = 3;
			}
			//console.log(k);
			tempK = k;
			while (!rowStartIndexes.includes(tempK)) {
				tempK--;
				rowStartIndexesCount++;
			}
			if (copyStatus) {
				//console.log('copyStatus6: ' + copyStatus);
				if (tableRow[k].outerHTML.includes("esen:")) {// first row
					tableData[strongIndexes[rowStartIndexes.indexOf(k)-1] + 3].innerHTML = "<button class=\"button2\" id=\"copyButton" + k + "\">Copy</button>";
					//console.log("button created: copyButton" + k);
					buttonVariable = document.getElementById("copyButton" + k);
				}
				for (let i = k; i < 20; i++) {// second row
					if (!rowStartIndexes.includes(k+rowStartIndexesCount)) {
						buttonVariable.outerHTML = "";
						buttonVariable = "";
						//console.log("rowStartIndexesCount: " + rowStartIndexesCount);
						tableData[strongIndexes[rowStartIndexes.indexOf(k-rowStartIndexesCount)-1] + 3].innerHTML = "<button class=\"button2\" id=\"copyButton" + k + "\">Copy</button>";
						//console.log("button created: copyButton" + k);
						buttonVariable = document.getElementById("copyButton" + k);
					}
				}
			}
			rowStartIndexesCount = 0;
			const sendMessageButton = document.getElementById('copyButton' + k);
			sendMessageButton.onclick = async function(e) {
				tableRowTemporary = tableRow[k-1].innerHTML;
				console.log("tableRow: " + tableRow);
				console.log("k: " + k);
				console.log("rowDataStartIndexes:");
				console.log(rowDataStartIndexes);
				console.log("strongIndexes:");
				console.log(strongIndexes);
				console.log("nativeExampleSentences: ");
				console.log(nativeExampleSentences);
				console.log("nativeExampleSentenceIndexes: ");
				console.log(nativeExampleSentenceIndexes);
				console.log("rowStartIndexes: ");
				console.log(rowStartIndexes);
				console.log("nativeExampleSentenceRowIndexes: ");
				console.log(nativeExampleSentenceRowIndexes);

				kCount = k;
				while (!nativeExampleSentenceRowIndexes.includes(kCount)) {
					kCount++;
				}

				clipboardArray = ((tableRowTemporary.split("(")[1]).split(")")[0] + "\n\n");// definition(s)
				clipboardArray += nativeExampleSentences[nativeExampleSentenceIndexes.indexOf(rowDataStartIndexes[kCount]-1)].innerHTML.replace(/<\/?[^>]+(>|$)/g, "");// example sentence
				tableRow[k-1].innerHTML = tableRowTemporary;

				navigator.clipboard.writeText(clipboardArray);
				console.log("Text copied: " + clipboardArray);

			}
		}
	}

	for (let m = rowStartIndexes[1]; m < tableRow.length; m++) {
		tableRow[m].onmouseleave = async function(e) {
			buttonVariable.outerHTML = "";
            buttonVariable = "";
		}
	}



}
catch (err) {
 	console.log(err);
}