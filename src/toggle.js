var buttons;
var copyIndex;
var j;
var tempArray = [];
var firstHalf;
var secondHalf;
var copyStatus = false;
// didn't do ca
var languageAbbreviations = ["en", "es", "fr", "pt", "it", "de", "nl", "sv", "ru",
							"pl", "ro", "cz", "gr", "tr", "zh", "ja", "ko", "ar", "is"];
var languageCombinations = [];
var ToWrd = [];
var languageCombinationInPage;
var nativeExampleSentences;
var FrWrd;
var tableRow;
var tableRowIndexes = [];
var tableRowIndexesCount;
var tableData;
var strong;
var tempCopyToClipboardArray = [];
var rowStartIndexes = [];
var rowDataStartIndexes = [];
var buttonVariable;
var rowStartIndexesCount = 0;
var strongIndexes = [];
var strongIndexesCount = 0;
var strongRowIndexes = [];
var nativeExampleSentenceIndexes = [];
var nativeExampleSentenceIndexesCount;
var nativeExampleSentenceRowIndexes = [];
var nativeExampleSentenceRowIndexesCount;
var notePublRowIndexes = [];
var notePublRowTouchingStrongIndexes = [];
var tempK = 0;
var kCount = 0;
var clipboardArray;
var tableRowTemporary;
var copyButtonExists = false;
var onFirstRow = false;
var checkbox1Enabled;
var checkbox2Enabled;
var headerRow;// only for headers that aren't the first one
var headerRowIndexes = [];
var headerRowOffsetCount = 0;
var findNativeExampleSentenceCounter;
var clipboardSingleElement;
var clipboardArrayWithHTML;
var definitions, exampleSentences, helperDefinitions, dsense, pos2_tooltip, ph, dataPh, notePubl, isSomethingImportantMissing;
definitions = [];
var definitions2 = [];
var exampleSentences2 = [];
var helperDefinitions2 = [];
var dsense = [];
var dsense2 = [];
var dsenseTopRow = [];
var dsenseTopRow2 = [];
var pos2_tooltip_2 = [];
var ph2 = [];
var dataPh2 = [];
var isSomethingImportantMissing = [];
var isSomethingImportantMissingRowIndexes = [];
var i = 0;
var def = "";
var even;
var odd;
var doesSecondOpenParenthesisExist = false;
var noExampleSentenceForDefinition = false;
var deleteThisLater = 3;
var keybindPressed = false;
var kCountUntilNativeExampleSentenceFound;
var newRowVariable;
var countNewRows = 0;
var countNewRowsSentence = 0;
var countNewRowsNotes = 0;
var modifiedRows = [];
var htmlThatButtonRemoved = "";
var currentRowTheCopyButtonIsOn;
var definitionOnlyTakesUpOneRow = false;

var addOneRowToSingleRowDefinitions = false;// very important, it's basically a setting

function createCopyButton(index) {
	return "<button class=\"blueButton\" id=\"copyButton" + index + "\">Copy</button>";
}
function createNewRow(index) {
	return "<tr id=\"newRow" + index + "\"><td></td><td></td><td></td></tr>";
}
function notEqualToNegativeOne(num) {
	return num != -1;
}
function notEqualToZero(num) {
	return num != 0;
}
function areIntegersAreInOrder(array) {
	var returnThis = true;
	for (let i = 0; i < array.length-1; i++) {
		if(array[i+1] == null) {
			console.log("areIntegersAreInOrder: index is null: " + i+1);
		} else if (!(array[i+1] > array[i])) {
			returnThis = false;
			break;
		}
	}
	return returnThis;
}
function addBackslashBeforeApostrophe(text) {
	if (text.includes("\'")) {
		for (let i = 0; i < text.length-1; i++) {
			if (text.substring(i, i+1) == "\'") {
				text = text.substring(0, i) + "\\\'" + text.substring(i+1, text.length);;
				i++;
			}
		}
		return text;
	} else {
		return text;
	}
}

// get every combination of language abbreviation combos: enes, esen, enzh, zhen, etc...
for (let i = 0; i < languageAbbreviations.length; i++) {
	for (let j = 0; j < languageAbbreviations.length; j++) {
    	languageCombinations.push(languageAbbreviations[i] + languageAbbreviations[j] + ":");
    }
}
// have the status of toggleDefinitions and toggleCopy change when the respective button is clicked
chrome.storage.local.get(['toggleDefinitions', 'toggleCopy'], function(variable) {
	if (variable.toggleDefinitions == null) {
		chrome.storage.local.set({toggleDefinitions: false}, function() {});
		console.log("variable.toggleDefinitions was null, now it's: " + variable.toggleDefinitions);
		restoreDefinitions();
	} else if (variable.toggleDefinitions == true) {
		chrome.storage.local.set({toggleDefinitions: true}, function() {});
		console.log("variable.toggleDefinition: " + variable.toggleDefinitions);
		//restoreDefinitions();
	} else if (variable.toggleDefinitions == false) {
		chrome.storage.local.set({toggleDefinitions: false}, function() {});
		console.log("variable.toggleDefinition: " + variable.toggleDefinitions);
		removeDefinitions();
	}

	if (variable.toggleCopy == null) {
		chrome.storage.local.set({toggleCopy: false}, function() {});
		console.log("variable.toggleCopy used to be null, now it's: " + variable.toggleCopy);
		copyStatus = true;
	} else if (variable.toggleCopy == true) {
		chrome.storage.local.set({toggleCopy: true}, function() {});
		console.log("variable.toggleCopy: " + variable.toggleCopy);
		copyStatus = false;
	} else if (variable.toggleCopy == false) {
		chrome.storage.local.set({toggleCopy: false}, function() {});
		console.log("variable.toggleCopy: " + variable.toggleCopy);
		copyStatus = true;
	}
});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.toggleDefinitionsKey == true) {
      	chrome.storage.local.set({toggleDefinitions: !request.toggleDefinitionsKey}, function() {});
      	removeDefinitions();
      } else if (request.toggleDefinitionsKey == false) {
      	chrome.storage.local.set({toggleDefinitions: !request.toggleDefinitionsKey}, function() {});
      	restoreDefinitions();
      }
	  if (request.toggleCopyKey == true) {
	  	chrome.storage.local.set({toggleCopy: !request.toggleCopyKey}, function() {});
	  	copyStatus = true;
	  	console.log("copyStatus: " + copyStatus);
	  } else if (request.toggleCopyKey == false) {
	  	chrome.storage.local.set({toggleCopy: !request.toggleCopyKey}, function() {});
	  	copyStatus = false;
	  	console.log("copyStatus: " + copyStatus);
	  }
    }
);

try {
	ToWrd = document.getElementsByClassName('ToWrd');
	exampleSentences = document.getElementsByClassName("ToEx");
	helperDefinitions = document.getElementsByClassName("To2");
	dsense = document.getElementsByClassName("dsense");
	pos2_tooltip = document.getElementsByClassName("POS2 tooltip");

	nativeExampleSentences = document.getElementsByClassName("FrEx");
	FrWrd = document.getElementsByClassName("FrWrd");
	tableRow = document.getElementsByTagName("tr");
	tableData = document.getElementsByTagName("td");
	strong = document.getElementsByTagName("strong");
	ph = document.getElementsByClassName("ph");
	notePubl = document.getElementsByClassName("notePubl");
	isSomethingImportantMissing = document.getElementsByClassName("even more");
}
catch (exception_var) {
	console.log(exception_var);
}
function removeDataPh(number) {
	return !number.outerHTML.includes("data-ph");
}
// fill up the second array beforehand to ensure that later on, the first array doesn't draw from an empty array
try {
	for (i = 0; i < ToWrd.length; i++) {//
		if (!ToWrd[i].innerHTML.includes("sLang_")) {
			definitions.push(ToWrd[i]);
		}
	}
	console.log(definitions);
	for (i = 0; i < definitions.length; i++) {
		definitions2.push(definitions[i].innerHTML);
	}
	for (i = 0; i < exampleSentences.length; i++) {
		exampleSentences2.push(exampleSentences[i].innerHTML);
	}
	for (i = 0; i < pos2_tooltip.length; i++) {
		pos2_tooltip_2.push(pos2_tooltip[i].innerHTML);
	}
	for (i = 0; i < dsense.length; i++) {
		dsense2.push(dsense[i].innerHTML);
	}
}
catch (exception_var) {
	console.log(exception_var);
}
// hides some html elements to either [...] or a blank
function removeDefinitions() {
	try {
        for (i = 0; i < definitions.length; i++) {
			definitions[i].setAttribute("onmouseenter", "this.innerHTML='" + addBackslashBeforeApostrophe(definitions[i].innerHTML) + "';");
			definitions[i].setAttribute("onmouseleave", "this.innerHTML='[...]';");
			definitions[i].innerHTML = "[...]";
        }
        for (i = 0; i < exampleSentences.length; i++) {
			exampleSentences[i].setAttribute("onmouseenter", "this.innerHTML='" + addBackslashBeforeApostrophe(exampleSentences[i].innerHTML) + "';");
			exampleSentences[i].setAttribute("onmouseleave", "this.innerHTML='[...]';");
			exampleSentences[i].innerHTML = "[...]";
		}
		for (i = 0; i < pos2_tooltip.length; i++) {
			pos2_tooltip[i].innerHTML = "";
		}
		for (i = 0; i < dsense.length; i++) {
			dsense[i].setAttribute("onmouseenter", "this.innerHTML='" + addBackslashBeforeApostrophe(def) + "';");
			dsense[i].setAttribute("onmouseleave", "this.innerHTML=''");
			dsense[i].setAttribute("style", "text-align:right");
			dsense[i].innerHTML = "";
		}

		console.log("removed definitions: " + definitions.length + ", removed exampleSentences: " + exampleSentences.length +
					", removed pos2_tooltip: " + pos2_tooltip.length + ", removed dsense: " + dsense.length);
    }
    catch (exception_var) {
    	console.log("removeDefinitions() failed");
    }
}
// restores some html elements to their original text after they have been hidden
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
		for (i = 0; i < pos2_tooltip.length; i++) {
			pos2_tooltip[i].innerHTML = pos2_tooltip_2[i];
			pos2_tooltip[i].setAttribute("onmouseenter", "this.innerHTML='" + pos2_tooltip_2[i] + "';");
			pos2_tooltip[i].setAttribute("onmouseleave", "this.innerHTML='" + pos2_tooltip_2[i] + "';");
		}
		for (i = 0; i < dsense.length; i++) {
			dsense[i].innerHTML = dsense2[i];
			dsense[i].setAttribute("onmouseenter", "this.innerHTML='" + dsense2[i] + "';");
			dsense[i].setAttribute("onmouseleave", "this.innerHTML='" + dsense2[i] + "';");
		}
		console.log("restored definitions: " + definitions2.length + ", removed restored: " + exampleSentences2.length +
        					", restored pos2_tooltip: " + pos2_tooltip_2.length + ", restored dsense: " + dsense2.length);
    }
    catch (exception_var) {
    	console.log("restoreDefinitions() failed");
    }
}

// button stuff
try {
	for (let k = 0; k < tableRow.length; k++) {
		if (tableRow[k].outerHTML.includes("FrEx")) {
			nativeExampleSentenceRowIndexes.push(k);
		} else {
			nativeExampleSentenceRowIndexes.push(-1);
		}
		if (tableRow[k].outerHTML.includes("<td>")) {
			tableRowIndexes.push(k);
		}
		if (tableRow[k].outerHTML.includes("<strong>") && tableRow[k].outerHTML.includes("FrWrd")) {
			strongRowIndexes.push(k);
		}
		if (tableRow[k].outerHTML.includes("sMainMeanings") || tableRow[k].outerHTML.includes("sAddTrans")
			|| tableRow[k].outerHTML.includes("sCmpdForms")) {
			headerRowIndexes.push(k);
		}
		if (tableRow[k].outerHTML.includes("notePubl")) {
			notePublRowIndexes.push(k);
			if (strongRowIndexes.includes(k - 1)) {
				notePublRowTouchingStrongIndexes.push(k);
			}
		}
		if (tableRow[k].outerHTML.includes("Is something important missing? Report an error or suggest an improvement.")) {
			isSomethingImportantMissingRowIndexes.push(k);
		}
	}
	strongRowIndexes.shift();
	nativeExampleSentenceRowIndexes = nativeExampleSentenceRowIndexes.filter(notEqualToNegativeOne);
    nativeExampleSentenceRowIndexes = nativeExampleSentenceRowIndexes.filter(notEqualToZero);
    notePublRowIndexes.shift();
    isSomethingImportantMissingRowIndexes.shift();
	/**
	console.log("isSomethingImportantMissingRowIndexes: " + isSomethingImportantMissingRowIndexes);
    console.log("strongRowIndexes: " + strongRowIndexes);
    console.log("nativeExampleSentenceRowIndexes: " + nativeExampleSentenceRowIndexes);
    console.log("notePublRowTouchingStrongIndexes: " + notePublRowTouchingStrongIndexes);
    console.log("notePublRowIndexes: " + notePublRowIndexes);
    **/
	for (let k = 0; k < tableRow.length; k++) {// get location of each header row
		for (let i = 0; i < languageCombinations.length; i++) {// used to be: includes ("esen:")
        	if (tableRow[k].outerHTML.includes(languageCombinations[i])) {
				rowStartIndexes.push(k);
				languageCombinationInPage = languageCombinations[i];

				if (addOneRowToSingleRowDefinitions) {
					if (countNewRows < strongRowIndexes[strongRowIndexes.length-1]) {

						if (areIntegersAreInOrder([strongRowIndexes[countNewRows], notePublRowTouchingStrongIndexes[countNewRowsNotes],
							nativeExampleSentenceRowIndexes[countNewRowsSentence],
							nativeExampleSentenceRowIndexes[countNewRowsSentence+1], strongRowIndexes[countNewRows+1]])) {
							console.log("Definition has two foreign example sentences, and contains note that is one row under definition.");
							console.log("1 def:  " + strongRowIndexes[countNewRows]);
							console.log("2 not:  " + notePublRowTouchingStrongIndexes[countNewRowsNotes]);
							console.log("3 sent: " + nativeExampleSentenceRowIndexes[countNewRowsSentence]);
							console.log("4 sent: " + nativeExampleSentenceRowIndexes[countNewRowsSentence+1]);
							console.log("5 def:  " + strongRowIndexes[countNewRows+1]);
							console.log("modified row: ");
							countNewRowsSentence++;
							countNewRowsNotes++;
							modifiedRows.push(rowStartIndexes[countNewRows]);
                            tableRow[rowStartIndexes[countNewRows]].insertAdjacentHTML('afterend', createNewRow(countNewRows));
						} else if (areIntegersAreInOrder([strongRowIndexes[countNewRows], notePublRowTouchingStrongIndexes[countNewRowsNotes],
							nativeExampleSentenceRowIndexes[countNewRowsSentence], strongRowIndexes[countNewRows+1]])) {
							console.log("Definition has one foreign example sentence, and contains note that is one row under definition.");
							console.log("1 def:  " + strongRowIndexes[countNewRows]);
							console.log("2 not:  " + notePublRowTouchingStrongIndexes[countNewRowsNotes]);
							console.log("3 sent: " + nativeExampleSentenceRowIndexes[countNewRowsSentence]);
							console.log("4 def:  " + strongRowIndexes[countNewRows+1]);

							modifiedRows.push(rowStartIndexes[countNewRows]);
                            tableRow[rowStartIndexes[countNewRows]].insertAdjacentHTML('afterend', createNewRow(countNewRows));
						} else if (areIntegersAreInOrder([strongRowIndexes[countNewRows], nativeExampleSentenceRowIndexes[countNewRowsSentence],
							nativeExampleSentenceRowIndexes[countNewRowsSentence+1], strongRowIndexes[countNewRows+1]])) {
							console.log("Definition has two foreign example sentences. Does it contain a note?");
							console.log("1 def:  " + strongRowIndexes[countNewRows]);
							console.log("2 sent: " + nativeExampleSentenceRowIndexes[countNewRowsSentence]);
							console.log("3 sent: " + nativeExampleSentenceRowIndexes[countNewRowsSentence+1]);
							console.log("4 def:  " + strongRowIndexes[countNewRows+1]);
							countNewRowsSentence++;

						} else if (areIntegersAreInOrder([strongRowIndexes[countNewRows], strongRowIndexes[countNewRows+1],
                            nativeExampleSentenceRowIndexes[countNewRowsSentence]])) {
							console.log("Two definitions with no example sentence between them.");
							console.log("1 def:  " + strongRowIndexes[countNewRows]);
							console.log("2 def:  " + strongRowIndexes[countNewRows+1]);
							console.log("3 nat:  " + nativeExampleSentenceRowIndexes[countNewRowsSentence]);
							countNewRowsSentence--;

						}
						else if (!areIntegersAreInOrder([strongRowIndexes[countNewRows], nativeExampleSentenceRowIndexes[countNewRowsSentence],
							strongRowIndexes[countNewRows+1]])) {
							console.log("1 def:  " + strongRowIndexes[countNewRows]);
							console.log("2 sent: " + nativeExampleSentenceRowIndexes[countNewRowsSentence]);
							console.log("3 def:  " + strongRowIndexes[countNewRows+1]);
							modifiedRows.push(rowStartIndexes[countNewRows]);
							tableRow[rowStartIndexes[countNewRows]].insertAdjacentHTML('afterend', createNewRow(countNewRows));
						} else {
							console.log("Normal order. countNewRows: " + countNewRows);
							console.log("Normal - 1 def:  " + strongRowIndexes[countNewRows]);
							console.log("Normal - 2 sent: " + nativeExampleSentenceRowIndexes[countNewRowsSentence]);
							console.log("Normal - 3 def:  " + strongRowIndexes[countNewRows+1]);
						}

					}
					countNewRows++;
					countNewRowsSentence++;
				}

			}
        }
	}


	for (i = 0; i < ph.length; i++) {
		if(languageCombinationInPage == "esen:") {
			if (ph[i].innerHTML == "Principal Translations") {
				ph[i].innerHTML = "Traducciones Principales";
			}
			if (ph[i].innerHTML == "Additional Translations") {
				ph[i].innerHTML = "Traducciones Adicionales";
			}
			if (ph[i].innerHTML == "Compound Forms:") {// why is there a colon at the end of this?
				ph[i].innerHTML = "Traducciones Compuestos";
			}
		} else if (languageCombinationInPage == "iten:") {
			if (ph[i].innerHTML == "Principal Translations/Traduzioni principali") {
				ph[i].innerHTML = "Traduzioni principali";
			}
			if (ph[i].innerHTML == "Compound Forms/Forme composte") {
				ph[i].innerHTML = "Forme composte";
			}
		} else if (languageCombinationInPage == "enit:") {
			if (ph[i].innerHTML == "Principal Translations/Traduzioni principali") {
				ph[i].innerHTML = "Principal Translations";
			}
			if (ph[i].innerHTML == "Compound Forms/Forme composte") {
				ph[i].innerHTML = "Compound Forms";
			}
		}
	}// header change

	for (let k = 0; k < tableData.length; k++) {
		if (tableData[k].outerHTML.includes("<td>")) {// get location of each data in row
			rowDataStartIndexes.push(k);
		}
		if (tableData[k].outerHTML.includes("<strong>")) {// get location of each definition (in bold)
			strongIndexes.push(k);
		} else {
			strongIndexes.push(-1);
		}
		if (tableData[k].outerHTML.includes("FrEx")) {
			nativeExampleSentenceIndexes.push(k);
		} else {
			nativeExampleSentenceIndexes.push(-1);
		}
	}
	console.log("headerRowIndexes befoer shift: " + headerRowIndexes);
	tableRowIndexes.pop();
	tableRowIndexes.pop();
	headerRowIndexes.shift();
	strongIndexes.shift();
	strongIndexes.shift();
	strongIndexes.shift();
	while (strongIndexes[0] == -1) {
		strongIndexes.shift();
	}
	strongIndexes = strongIndexes.filter(notEqualToNegativeOne);
	nativeExampleSentenceIndexes = nativeExampleSentenceIndexes.filter(notEqualToNegativeOne);
	nativeExampleSentenceIndexes.shift();
	/**
	// add an additional row to account for "is something missing" sentence
	tableRowIndexes.push(tableRowIndexes[tableRowIndexes.length-1]+1);
	console.log("--------");
	console.log("strongRowIndexes: " + strongRowIndexes);
	console.log("nativeExampleSentenceRowIndexes: " + nativeExampleSentenceRowIndexes);
	// tableRow[rowStartIndexes[rowStartIndexes.indexOf(3)]].insertAdjacentHTML('afterend', '<tr><td></td><td></td><td></td></tr>');
	console.log("--------");

	console.log("modified rows: " + modifiedRows);
	console.log("tableRowIndexes: " + tableRowIndexes);
	console.log("tableRow: " + tableRow);
	console.log("tableRow.length: " + tableRow.length);
	console.log("rowDataStartIndexes:");
	console.log(rowDataStartIndexes);
	console.log("rowDataStartIndexes.length:" + rowDataStartIndexes.length);
	console.log("strongIndexes:");
	console.log(strongIndexes);
	console.log("strongIndexes.length: " + strongIndexes.length);
	console.log("nativeExampleSentences: ");
	console.log(nativeExampleSentences);
	console.log("nativeExampleSentences.length: " + nativeExampleSentences.length);
	console.log("nativeExampleSentenceIndexes: ");
	console.log(nativeExampleSentenceIndexes);
	console.log("nativeExampleSentenceIndexes.length: " + nativeExampleSentenceIndexes.length);
	console.log("rowStartIndexes: ");
	console.log(rowStartIndexes);
	console.log("rowStartIndexes.length: " + rowStartIndexes.length);
	console.log("nativeExampleSentenceRowIndexes: ");
	console.log(nativeExampleSentenceRowIndexes);
	console.log("nativeExampleSentenceRowIndexes.length: " + nativeExampleSentenceRowIndexes.length);
	console.log("headerRowIndexes: ");
	console.log(headerRowIndexes);
	**/
	for (let k = rowStartIndexes[1]; k <= tableRowIndexes[tableRowIndexes.length-1]; k++) {
		tableRow[k].onmouseenter = async function(e) {
			tempK = k;
			while (!rowStartIndexes.includes(tempK)) {
				tempK--;
				rowStartIndexesCount++;
			}
			if (copyStatus
			//&& !tableRow[k].outerHTML.includes("Is something important missing? Report an error or suggest an improvement.")
			&& !tableRow[k].outerHTML.includes("Additional Translations")
			&& !tableRow[k].outerHTML.includes("Compound Forms")
			&& !tableRow[k].outerHTML.includes("langHeader")) {
				for (let p = 0; p < headerRowIndexes.length; p++) {// account for going past bold headers
					if (k > headerRowIndexes[p]) {
						headerRowOffsetCount = p;
					} else if (k < headerRowIndexes[0]){
						headerRowOffsetCount = 0;
					}
				}
				if (tableRow[k].outerHTML.includes(languageCombinationInPage)) {// first row of definition
					console.log("First row: " + k);
					onFirstRow = true;
					if (!(currentRowTheCopyButtonIsOn == strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 3)) {
						// if there is a note on this row, store it and put it back when the button goes away
						if (tableData[strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 3].innerHTML.substring(0, 3) === "<i>") {
							htmlThatButtonRemoved = tableData[strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 3].innerHTML;
						} else {
							htmlThatButtonRemoved = "";
						}
					}

					if (rowStartIndexes.includes(k+1)) {
						console.log("There are no example sentences for this definition.");
						definitionOnlyTakesUpOneRow = true;
						htmlThatButtonRemoved = tableData[strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 0].innerHTML;
						currentRowTheCopyButtonIsOn = strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 0;
                        tableData[strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 0].innerHTML = htmlThatButtonRemoved + createCopyButton(k);
					} else {
						definitionOnlyTakesUpOneRow = false;
						currentRowTheCopyButtonIsOn = strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 3;
                        tableData[strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 3].innerHTML = createCopyButton(k) + htmlThatButtonRemoved;
					}



					buttonVariable = document.getElementById("copyButton" + k);
					rowStartIndexesCount = 0;
					copyButtonExists = true;
				} else {// subsequent rows of definition
					console.log("Subsequent row: " + k);
					onFirstRow = false;
					definitionOnlyTakesUpOneRow = false;
					if (!(currentRowTheCopyButtonIsOn == strongIndexes[rowStartIndexes.indexOf(k-rowStartIndexesCount)-1 + headerRowOffsetCount] + 3)) {
						// if there is a note on this row, store it and put it back when the button goes away
						if (tableData[strongIndexes[rowStartIndexes.indexOf(k-rowStartIndexesCount)-1 + headerRowOffsetCount] + 3].innerHTML.substring(0, 3) === "<i>") {
							htmlThatButtonRemoved = tableData[strongIndexes[rowStartIndexes.indexOf(k-rowStartIndexesCount)-1 + headerRowOffsetCount] + 3].innerHTML;
						} else {
							htmlThatButtonRemoved = "";
						}
					}

					currentRowTheCopyButtonIsOn = strongIndexes[rowStartIndexes.indexOf(k-rowStartIndexesCount)-1 + headerRowOffsetCount] + 3;
					tableData[strongIndexes[rowStartIndexes.indexOf(k-rowStartIndexesCount)-1 + headerRowOffsetCount] + 3].innerHTML = createCopyButton(k) + htmlThatButtonRemoved;

					buttonVariable = document.getElementById("copyButton" + k);
					rowStartIndexesCount = 0;
					copyButtonExists = true;

				}
			}
			//console.log("buttonVariable:" + buttonVariable);
			const sendMessageButton = document.getElementById('copyButton' + k);
			//console.log("sendMessageButton: " + sendMessageButton.innerHTML);
			sendMessageButton.onclick = async function(e) {
				tableRowTemporary = tableRow[k-1].innerHTML;
				console.log("Copy button clicked");

				kCount = k;
				while (!nativeExampleSentenceRowIndexes.includes(kCount)) {
					kCount++;
					if (tableRow[k].innerHTML.includes("Is something important missing?")) {
						console.log("Row directly below definition is the \"Is something important missing?\" sentence. " +
						"There must not exist an example sentence for this definition.");
						noExampleSentenceForDefinition = true;
						break;
					}
					if (rowStartIndexes.includes(kCount)) {
						console.log("rowStartIndexes value found while increasing kCount. " +
						"There must not exist an example sentence for this definition.");
						noExampleSentenceForDefinition = true;
						break;
					}
					if ((kCount - k) > 30) {
						console.log("kCount is getting too large without finding a nativeExampleSentenceRowIndexes value. " +
						"There must not exist an example sentence for this definition.");
						noExampleSentenceForDefinition = true;
						break;
					}
				}
				findNativeExampleSentenceCounter = k;
				if (!noExampleSentenceForDefinition) {
					while (!tableRow[findNativeExampleSentenceCounter].outerHTML.includes("class=\"FrEx\"")) {
						// nativeExampleSentenceRowIndexes
						findNativeExampleSentenceCounter++;
					}
					console.log("tableRow[findNativeExampleSentenceCounter]: " + tableRow[findNativeExampleSentenceCounter].innerHTML);
				}


				var rowDataStartIndexeskCountVariable;
				console.log("tableRowTemporary: " + tableRowTemporary);
				clipboardArrayWithHTML = tableRowTemporary.split("<td")[2].replace(/<\/?[^>]+(>|$)/g, "").substring(2);
				console.log("Trying to splice this up: " + clipboardArrayWithHTML);
				for (let b = 0; b < clipboardArrayWithHTML.length; b++) {
					if (clipboardArrayWithHTML.charAt(b) == ")") {
						console.log("b:" + b);
						clipboardArrayWithHTML = clipboardArrayWithHTML.substring(0, b+1);
						break;
					}
				}
				console.log("after splice: " + clipboardArrayWithHTML);
				// check if there is actually an example sentence available below the current row
				if (!noExampleSentenceForDefinition) {
					clipboardArray = clipboardArrayWithHTML;
					if (tableRow[findNativeExampleSentenceCounter].innerHTML.replace(/<\/?[^>]+(>|$)/g, "").includes("&nbsp")) {
						clipboardArray += "\n\n" + (tableRow[findNativeExampleSentenceCounter].innerHTML.replace(/<\/?[^>]+(>|$)/g, "")).substring(6);
						console.log("didn't take from the copy button");
					} else {// accidentally takes text from the copy button, so cut it off
						clipboardArray += "\n\n" + (tableRow[findNativeExampleSentenceCounter].innerHTML.replace(/<\/?[^>]+(>|$)/g, "")).substring(4);
						console.log("took from the copy button");
					}
					// check if there is another example sentence under this one
					if (nativeExampleSentenceRowIndexes.includes(findNativeExampleSentenceCounter+1)) {
						clipboardArray += "\n" + (tableRow[findNativeExampleSentenceCounter+1].innerHTML.replace(/<\/?[^>]+(>|$)/g, "")).substring(6);
					}
					tableRow[k-1].innerHTML = tableRowTemporary;
				} else {
					if (clipboardArrayWithHTML == "") {
						// if the html gets messed up, there is no example sentence
						console.log("No example sentence found. The entire definition probably is only one row.");
						tableRowTemporary = tableRow[k].innerHTML;
						clipboardArrayWithHTML = tableRowTemporary.split("<td")[2].replace(/<\/?[^>]+(>|$)/g, "").substring(2);
						clipboardArray = "";
						clipboardArray += clipboardArrayWithHTML;
					} else {
						// if the text copied is already fine
						clipboardArray = "";
                        clipboardArray += clipboardArrayWithHTML;
					}
				}

				console.log("Text copied:\n" + clipboardArray);
				noExampleSentenceForDefinition = false;
				navigator.clipboard.writeText(clipboardArray);

			}
		}
	}
	for (let m = rowStartIndexes[1]; m <= tableRowIndexes[tableRowIndexes.length-1]; m++) {
		tableRow[m].onmouseleave = async function(e) {
			buttonVariable.outerHTML = "";
            buttonVariable = "";
            copyButtonExists = false;
            onFirstRow = false;
		}
	}
}
catch (err) {
 	console.log(err);
}