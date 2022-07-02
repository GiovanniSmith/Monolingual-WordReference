console.log('toggle.js');
var hidden = false;
var buttons;
var copyIndex;
var evenTemp;
var j;
var tempArray = [];
var firstHalf;
var secondHalf;

try {
	var nativeExampleSentences = document.getElementsByClassName("FrEx");
	var FrWrd = document.getElementsByClassName("FrWrd");
	var even = document.getElementsByClassName("even");
	buttons = document.getElementsByTagName("td");
	buttons[9].insertAdjacentHTML('beforeend', "<td><button type=\"button2\" id=\"copyButton\">Copy definitions</button></td>");

	console.log('PRESSED');
    const sendMessageButton = document.getElementById('copyButton')
    sendMessageButton.onclick = async function(e) {
    	console.log(even[0].innerHTML);
		firstHalf = even[0].innerHTML.split("(")[1];
		console.log(firstHalf);
		secondHalf = firstHalf.split(")")[0];
		console.log(secondHalf);

    	navigator.clipboard.writeText(
    	RemoveHTMLTags(secondHalf + "\n\n")  +
    	RemoveHTMLTags(nativeExampleSentences[0].innerHTML)
    	);
    }
}
catch (err) {
 	console.log('error for doing stuff');
}

// https://stackoverflow.com/a/41866980
function RemoveHTMLTags(html) {
  var regX = /(<([^>]+)>)/ig;
  return html.replace(regX, "");
}

try {// this runs if it's the first time
	console.log('Check if is first time');
	chrome.storage.local.get(['value'], function(variable) {
      console.log('Value currently is ' + variable.value);
      if (variable.value == null) {
      	chrome.storage.local.set({value: "green"}, function() {
		  console.log("Value was null and is now set to green.");
		});
      }
    });
}
catch (err) {
	console.log('error');
}

console.log('Check if is second or more time');
chrome.storage.local.get(['value'], function(variable) {
	console.log('try');
  if (variable.value == "red") {
	removeDefinitions();
  }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.key === "green") {
        removeDefinitions();
        chrome.storage.local.set({value: "red"}, function() {
          console.log('Value is set to ' + "red");
        });
      } else if (request.key === "red") {
	    restoreDefinitions();
	    chrome.storage.local.set({value: "green"}, function() {
		  console.log('Value is set to ' + "green");
		});
	  }
    }
);

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
		console.log("removeDefinitions()");
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
		console.log("restoreDefinitions()");
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