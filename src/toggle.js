var hidden = false;
var buttons;
var copyIndex;
var j;
var tempArray = [];
var firstHalf;
var secondHalf;
var copyStatus;
// didn't do ca
var languageAbbreviations = ["en", "es", "fr", "pt", "it", "de", "nl", "sv", "ru",
							"pl", "ro", "cz", "gr", "tr", "zh", "ja", "ko", "ar", "is"];
var languageCombinations = [];
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
var nativeExampleSentenceIndexes = [];
var nativeExampleSentenceIndexesCount;
var nativeExampleSentenceRowIndexes = [];
var nativeExampleSentenceRowIndexesCount;
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
var definitions, exampleSentences, helperDefinitions, dsense, pos2_tooltip, ph, dataPh;
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
var i = 0;
var def = "";
var even;
var odd;
var doesSecondOpenParenthesisExist = false;
var noExampleSentenceForDefinition = false;
var deleteThisLater = 3;
var keybindPressed = false;

function createCopyButton(index) {
	return "<button class=\"button2\" id=\"copyButton" + index + "\">Copy</button>";
}

for (let i = 0; i < languageAbbreviations.length; i++) {
	for (let j = 0; j < languageAbbreviations.length; j++) {
    	languageCombinations.push(languageAbbreviations[i] + languageAbbreviations[j] + ":");
    }
}
chrome.storage.local.get(['value', 'copy', 'checkbox1', 'checkbox2'], function(variable) {
  if (variable.value == null) {
	chrome.storage.local.set({value: "green"}, function() {});
  }
  if (variable.copy == null) {
  	chrome.storage.local.set({copy: true}, function() {});
  }
  if (variable.checkbox1 == null) {
	chrome.storage.local.set({checkbox1: true}, function() {});
  }
  if (variable.checkbox2 == null) {
  	chrome.storage.local.set({checkbox2: true}, function() {});
  }
});

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
	  if (request.copyKey === true) {
		  copyStatus = true;
		  chrome.storage.local.set({copy: false}, function() {

		  });
	  } else if (request.copyKey === false) {
		  copyStatus = false;
		  chrome.storage.local.set({copy: true}, function() {

		  });
	  }
	  if (request.checkbox1Key === true) {
		  checkbox1Enabled = true;
		  chrome.storage.local.set({checkbox1: false}, function() {

		  });
	  } else if (request.checkbox1Key === false) {
		  checkbox1Enabled = false;
		  chrome.storage.local.set({checkbox1: true}, function() {

		  });
	  }
	  if (request.checkbox2Key === true) {
		  checkbox2Enabled = true;
		  chrome.storage.local.set({checkbox2: false}, function() {

		  });
	  } else if (request.checkbox2Key === false) {
		  checkbox2Enabled = false;
		  chrome.storage.local.set({checkbox2: true}, function() {

		  });
	  }
    }
);

try {
	chrome.storage.local.get(['value', 'copy', 'checkbox1', 'checkbox2'], function(variable) {
      if (variable.value == "red") {
    	removeDefinitions();
      }
      if (variable.copy == false) {
		copyStatus = true;
	  }
	  if (variable.checkbox1 == false) {
		checkbox1Enabled = true;
	  }
	  if (variable.checkbox2 == false) {
		checkbox2Enabled = true;
	  }
    });
}
catch (err) {
	console.log(err);
	console.log("ERROR-----------");
}


try {

}
catch (exception_var) {
	console.log("Principal Translations tweak error");

}

try {// declare stuff
	definitions = document.getElementsByClassName('ToWrd');
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
}
catch (exception_var) {
	console.log(exception_var);

}

function removeDefinitions() {
	try {
		// .replace(/<\/?[^>]+(>|$)/g, "")
        for (i = 0; i < definitions.length; i++) {// i is 1 so that it doesn't replace the column name text (at least on the first row)
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
		for (i = 0; i < pos2_tooltip.length; i++) {
			def = pos2_tooltip[i].innerHTML;
			pos2_tooltip_2.push(def);
			pos2_tooltip[i].innerHTML = "";
		}
		for (i = 0; i < dsense.length; i++) {
			def = dsense[i].innerHTML;
			dsense2.push(def);
			dsense[i].setAttribute("onmouseenter", "this.innerHTML='" + def + "';");
			dsense[i].setAttribute("onmouseleave", "this.innerHTML=''");
			dsense[i].setAttribute("style", "text-align:right");
			dsense[i].innerHTML = "";
		}

		console.log("removed definitions: " + definitions.length + ", removed exampleSentences: " + exampleSentences.length +
					", removed pos2_tooltip: " + pos2_tooltip.length + ", removed dsense: " + dsense.length);
		hidden = true;
    }
    catch (exception_var) {
    	console.log("removeDefinitions() failed");
    }
}

function restoreDefinitions() {
	try {
        for (i = 1; i < definitions.length; i++) {// i is 1 so that it doesn't replace the column name text (at least on the first row)
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
		hidden = false;
    }
    catch (exception_var) {
    	console.log("restoreDefinitions() failed");
    }
}

function insertCopyButton() {
	alert("insertCopyButton");
}

// button stuff
try {// button stuff
	rowStartIndexes = [];
	rowDataStartIndexes = [];
	for (let k = 0; k < tableRow.length; k++) {// get location of each header row
		for (let i = 0; i < languageCombinations.length; i++) {// used to be: includes ("esen:")
        	if (tableRow[k].outerHTML.includes(languageCombinations[i])) {
				rowStartIndexes.push(k);
				languageCombinationInPage = languageCombinations[i];
				break;
			}
        }
		if (tableRow[k].outerHTML.includes("FrEx")) {// get location of each definition (in bold)
			nativeExampleSentenceRowIndexes.push(k);
		} else {
			nativeExampleSentenceRowIndexes.push(-1);
		}
		if (tableRow[k].outerHTML.includes("<td>")) {
			tableRowIndexes.push(k);
		}
		if (tableRow[k].outerHTML.includes("Additional Translations") || tableRow[k].outerHTML.includes("Compound Forms")) {
			headerRowIndexes.push(k);
		}
	}
	tableRowIndexes.pop();
	tableRowIndexes.pop();
	headerRowIndexes.shift();

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
	}

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
	function notEqualToNegativeOne(num) {
		return num != -1;
	}
	function notEqualToZero(num) {
		return num != 0;
	}
	strongIndexes = strongIndexes.filter(notEqualToNegativeOne);
	nativeExampleSentenceIndexes = nativeExampleSentenceIndexes.filter(notEqualToNegativeOne);
	nativeExampleSentenceIndexes.shift();
	nativeExampleSentenceRowIndexes = nativeExampleSentenceRowIndexes.filter(notEqualToNegativeOne);
	nativeExampleSentenceRowIndexes = nativeExampleSentenceRowIndexes.filter(notEqualToZero);


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


	//tableData[strongIndexes[0] + 3].innerHTML = "<button class=\"button2\" id=\"copyButton" + 1 + "\">Copy</button>";
	// used to be k < tableRow.length
	for (let k = rowStartIndexes[1]; k <= tableRowIndexes[tableRowIndexes.length-1]; k++) {
		tableRow[k].onmouseenter = async function(e) {
			tempK = k;
			while (!rowStartIndexes.includes(tempK)) {
				tempK--;
				rowStartIndexesCount++;
			}
			if (copyStatus
			&& !tableRow[k].outerHTML.includes("Is something important missing? Report an error or suggest an improvement.")
			&& !tableRow[k].outerHTML.includes("Additional Translations")
			&& !tableRow[k].outerHTML.includes("Compound Forms")
			&& !tableRow[k].outerHTML.includes("langHeader")) {

				console.log(k);
				for (let p = 0; p < headerRowIndexes.length; p++) {// account for going past bold headers
					if (k > headerRowIndexes[p]) {
						headerRowOffsetCount = p+1;
					} else if (k < headerRowIndexes[0]){
						headerRowOffsetCount = 0;
					}
				}

				if (tableRow[k].outerHTML.includes(languageCombinationInPage)) {// first row of definition
					//console.log("first row");
					onFirstRow = true;
					tableData[strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 3].innerHTML = createCopyButton(k);

					buttonVariable = document.getElementById("copyButton" + k);
					rowStartIndexesCount = 0;
					copyButtonExists = true;
				} else {// subsequent rows of definition
					//console.log("subsequent row");
					onFirstRow = false;
					//console.log("copyButtonExists: " + copyButtonExists);
					if (copyButtonExists) {
						buttonVariable.outerHTML = "";
                        buttonVariable = "";
					}
					tableData[strongIndexes[rowStartIndexes.indexOf(k-rowStartIndexesCount)-1 + headerRowOffsetCount] + 3].innerHTML = createCopyButton(k);
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

				console.log("k: " + k);
				console.log("kCount: " + kCount);
				console.log("rowDataStartIndexes[kCount]-1: ");
				console.log(rowDataStartIndexes[kCount]-1);
				console.log("rowStartIndexes: ");
				console.log(rowStartIndexes);
				var rowDataStartIndexeskCountVariable;
				if (checkbox1Enabled) {
					console.log("checkbox1Enabled: " + checkbox1Enabled);
				}
				//console.log("tableRowTemporary: " + tableRowTemporary);
				clipboardArrayWithHTML = tableRowTemporary.split("<td")[2].replace(/<\/?[^>]+(>|$)/g, "").substring(2);
				for (let b = 0; b < clipboardArrayWithHTML.length; b++) {
					if (clipboardArrayWithHTML.charAt(b) == ")") {
						console.log("b:" + b);
						clipboardArrayWithHTML = clipboardArrayWithHTML.substring(0, b+1);
						break;
					}
				}
				clipboardArray = clipboardArrayWithHTML;
				// check if there is actually an example sentence available below the current row
				if (!noExampleSentenceForDefinition) {
					if (tableRow[findNativeExampleSentenceCounter].innerHTML.replace(/<\/?[^>]+(>|$)/g, "").includes("&nbsp")) {
						clipboardArray += "\n\n" + (tableRow[findNativeExampleSentenceCounter].innerHTML.replace(/<\/?[^>]+(>|$)/g, "")).substring(6);;
					} else {// accidentally takes text from the copy button, so cut it off
						clipboardArray += "\n\n" + (tableRow[findNativeExampleSentenceCounter].innerHTML.replace(/<\/?[^>]+(>|$)/g, "")).substring(4);
					}
				}



				tableRow[k-1].innerHTML = tableRowTemporary;
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
		}
	}
}
catch (err) {
 	console.log(err);
}