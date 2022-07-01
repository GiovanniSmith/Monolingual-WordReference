var myString = "one";

/**
chrome.storage.local.set({value: "two"}, function() {
  console.log('Value is set to ' + "two");
});

chrome.storage.local.get(['value'], function(variable) {
  console.log('Value currently is ' + variable.value);
});

https://developer.chrome.com/docs/extensions/reference/storage/
**/

try {// this runs if it's the first time
	console.log('Check if is first time');
	chrome.storage.local.get(['value'], function(variable) {
      console.log('Value currently is ' + variable.value);
      if (variable.value == null) {
      	chrome.storage.local.set({value: "green"}, function() {
		  console.log('Value is set to ' + "green");
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

var i = 0;
var def = "";
function removeDefinitions() {
	try {
		console.log("removeDefinitions()");
    	definitions = document.getElementsByClassName('ToWrd');
    	exampleSentences = document.getElementsByClassName("ToEx");
    	helperDefinitions = document.getElementsByClassName("To2");
    	dsense = document.getElementsByClassName("dsense");

		def = definitions[0].innerHTML;

        for (i = 0; i < definitions.length; i++) {
        	def = definitions[i].innerHTML;
            definitions2.push(def);
        	definitions[i].innerHTML = "[...]";
        }
        for (i = 0; i < exampleSentences.length; i++) {
        	def = exampleSentences[i].innerHTML;
            exampleSentences2.push(def);
			exampleSentences[i].innerHTML = "[...]";
		}
		for (i = 0; i < helperDefinitions.length; i++) {
			def = helperDefinitions[i].innerHTML;
            helperDefinitions2.push(def);
			helperDefinitions[i].innerHTML = "";
		}
		for (i = 0; i < dsense.length; i++) {
			def = dsense[i].innerHTML;
            dsense2.push(def);
			dsense[i].innerHTML = "";
		}

		console.log("removed definitions: " + definitions.length);
		console.log("removed exampleSentences: " + exampleSentences.length);
		console.log("removed helperDefinitions: " + helperDefinitions.length);
		console.log("removed dsense: " + dsense.length);
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
        }
        for (i = 0; i < exampleSentences.length; i++) {
			exampleSentences[i].innerHTML = exampleSentences2[i];
		}
		for (i = 0; i < helperDefinitions.length; i++) {
			helperDefinitions[i].innerHTML = helperDefinitions2[i];
		}
		for (i = 0; i < dsense.length; i++) {
			dsense[i].innerHTML = dsense2[i];
		}
		console.log("restored definitions: " + definitions2.length);
		console.log("restored exampleSentences: " + exampleSentences2.length);
		console.log("restored helperDefinitions: " + helperDefinitions2.length);
		console.log("restored dsense: " + dsense2.length);
    }
    catch (exception_var) {
    	console.log("restoreDefinitions() failed");
    }
}