document.addEventListener('DOMContentLoaded', function() {

	var warning = document.getElementById('warning');
	var radio1 = document.getElementById('radio1');
	var radio2 = document.getElementById('radio2');
	var fw = document.getElementById('fw');
	var br1 = document.getElementById('br1');
	var fd = document.getElementById('fd');
	var br2 = document.getElementById('br2');
	var nd = document.getElementById('nd');
	var br3 = document.getElementById('br3');
	var fs = document.getElementById('fs');
	var br4 = document.getElementById('br4');
	var ns = document.getElementById('ns');
	var br5 = document.getElementById('br5');
	var saveChanges = document.getElementById('saveChanges');

	chrome.storage.local.get(['radio', 'fwStatus', 'br1Status', 'fdStatus',
						   	'br2Status', 'ndStatus', 'br3Status', 'fsStatus',
							'br4Status', 'nsStatus', 'br5Status', 'currentHTML'], function(variable) {
		saveChanges.click();
		if (variable.radio == "radio1") {
			radio1.setAttribute("checked", "checked");
		} else if (variable.radio == "radio2") {
			radio2.setAttribute("checked", "checked");
		}
		console.log("variable.currentHTML: " + variable.currentHTML);
		if (variable.currentHTML != null) {
			document.getElementById("wrapperId").innerHTML = variable.currentHTML;
			console.log("HTML updated");
		} else {
			saveChanges.click();
			if (variable.fwStatus == null) {
				//chrome.storage.local.set({fwStatus: !variable.fwStatus}, function() {});
			}
		}
		console.log("loaded fw.checked (before): " + document.getElementById("fw").checked);
		document.getElementById("fw").checked = variable.fwStatus;
		console.log("loaded fw.checked: " + document.getElementById("fw").checked);
		console.log("loaded variable.fwStatus: " + variable.fwStatus);

		warningCheck();

	});

	saveChanges.onclick = async function(e) {
		chrome.storage.local.set({currentHTML: document.getElementById("wrapperId").innerHTML}, function() {});
		console.log("saveChanges clicked");
	}

	function warningCheck() {
			/**
    		if (document.getElementById('fw').checked == false && document.getElementById('fd').checked == false &&
    			document.getElementById('nd').checked == false && document.getElementById('fs').checked == false &&
    			document.getElementById('ns').checked == false) {
    			document.getElementById('warning').innerHTML = "<br>Warning: No checkboxes with text are selected, so nothing will be copied.";
    		} else {
    			document.getElementById('warning').innerHTML = "";
    		}
    		**/
    	}

	radio1.onclick = async function(e) {
		chrome.storage.local.set({radio: "radio1"}, function() {});
	}
	radio2.onclick = async function(e) {
		chrome.storage.local.set({radio: "radio2"}, function() {});
	}

	const sendMessageButton = document.getElementById('toggleDefinitions');
    sendMessageButton.onclick = async function(e) {
        let queryOptions = { active: true, currentWindow: true };
        let tab = await chrome.tabs.query(queryOptions);
    	chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            let url = tabs[0].url;
            chrome.storage.local.get(['toggleDefinitions'], function(variable) {
				chrome.tabs.sendMessage(tabs[0].id, {toggleDefinitionsKey: variable.toggleDefinitions}, function(response) {});
            });
        });
    }

    const sendMessageButton2 = document.getElementById('toggleCopy');
	sendMessageButton2.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			let url = tabs[0].url;
			chrome.storage.local.get(['toggleCopy'], function(variable) {
				chrome.tabs.sendMessage(tabs[0].id, {toggleCopyKey: variable.toggleCopy}, function(response) {});
			});
		});
	}
}, false);

const dragArea = document.querySelector(".wrapper");
new Sortable(dragArea, {
  animation: 350
});
// event listener to work when html is refreshed:
// https://stackoverflow.com/a/14259372
document.querySelector('body').addEventListener('click', function(event) {
		document.getElementById("fwRegion").onmouseleave = async function(e) {
			saveChanges.click();
		}
		document.getElementById("fwRegion").onmouseenter = async function(e) {
			saveChanges.click();
		}
		document.getElementById("fdRegion").onmouseleave = async function(e) {
			saveChanges.click();
		}
		document.getElementById("fdRegion").onmouseenter = async function(e) {
			saveChanges.click();
		}
		document.getElementById("fsRegion").onmouseleave = async function(e) {
			saveChanges.click();
		}
		document.getElementById("fsRegion").onmouseenter = async function(e) {
			saveChanges.click();
		}

	  fw.onclick = async function(e) {
			let queryOptions = { active: true, currentWindow: true };
			let tab = await chrome.tabs.query(queryOptions);
			chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
				chrome.storage.local.get(['fwStatus'], function(variable) {
					chrome.storage.local.set({fwStatus: fw.checked}, function() {});
                    console.log("variable.fwStatus: " + variable.fwStatus);
                    console.log("fw.checked: " + fw.checked);
				});
			});
		}
	  fd.onclick = async function(e) {
      		let queryOptions = { active: true, currentWindow: true };
      		let tab = await chrome.tabs.query(queryOptions);
      		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      			chrome.storage.local.get(['fdStatus'], function(variable) {

      			});
      		});
      	}
		fs.onclick = async function(e) {
			let queryOptions = { active: true, currentWindow: true };
			let tab = await chrome.tabs.query(queryOptions);
			chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
				chrome.storage.local.get(['fsStatus'], function(variable) {

				});
			});
		}
});