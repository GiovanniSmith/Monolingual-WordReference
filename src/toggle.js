var hidden = false;
console.log('toggle.js');
/**
chrome.storage.local.set({value: "two"}, function() {
  console.log('Value is set to ' + "two");
});

chrome.storage.local.get(['value'], function(variable) {
  console.log('Value currently is ' + variable.value);
});

https://developer.chrome.com/docs/extensions/reference/storage/
**/

/**
const node = document.createElement("td");
const textnode = document.createTextNode("Water");
node.appendChild(textnode);
node.classList.add("my-class");
document.getElementById("myList").appendChild(node);
<td onmouseover="this.innerHTML='after';" onmouseout="this.innerHTML='before';">after</td>
**/

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

var definitions;
var definitions2 = [];
var exampleSentences;
var exampleSentences2 = [];
var helperDefinitions;
var helperDefinitions2 = [];
var dsense;
var dsense2 = [];
var pos2_tooltip;
var pos2_tooltip_2 = [];
var languages = ["English", "Spanish"];

var i = 0;
var def = "";
function removeDefinitions() {
	try {
		console.log("removeDefinitions()");
    	definitions = document.getElementsByClassName('ToWrd');
    	exampleSentences = document.getElementsByClassName("ToEx");
    	helperDefinitions = document.getElementsByClassName("To2");
    	dsense = document.getElementsByClassName("dsense");
    	pos2_tooltip = document.getElementsByClassName("POS2 tooltip");



		//def = definitions[0].innerHTML;

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