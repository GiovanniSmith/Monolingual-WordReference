// accordion stuff
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
// when the extension pop-up is opened
document.addEventListener('DOMContentLoaded', function() {
	// assign variables by tags in the extension pop-up
	var warning = document.getElementById('warning');
	var radio1 = document.getElementById('radio1');
	var radio2 = document.getElementById('radio2');
	var fw = document.getElementById('fw');
	var b1 = document.getElementById('b1');
	var fd = document.getElementById('fd');
	var b2 = document.getElementById('b2');
	var nd = document.getElementById('nd');
	var b3 = document.getElementById('b3');
	var fs = document.getElementById('fs');
	var b4 = document.getElementById('b4');
	var ns = document.getElementById('ns');
	var b5 = document.getElementById('b5');
	var saveChanges = document.getElementById('saveChanges');
	var warningForClick = document.getElementById('warningForClick');

	chrome.storage.local.get(['radio', 'fdStatus', 'b1Status', 'ftStatus',
						   	'b2Status', 'ntStatus', 'b3Status', 'fsStatus',
							'b4Status', 'nsStatus', 'b5Status', 'currentHTML', 'dontShowAgain'], function(variable) {
		chrome.storage.local.set({currentHTML: document.getElementById("wrapperId").innerHTML}, function() {});
		warningForClick.hidden = true;

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
			chrome.storage.local.set({currentHTML: document.getElementById("wrapperId").innerHTML}, function() {});

		}

		document.getElementById("fd").checked = variable.fdStatus;
		document.getElementById("ft").checked = variable.ftStatus;
		document.getElementById("fs").checked = variable.fsStatus;
		document.getElementById("nt").checked = variable.ntStatus;
		document.getElementById("ns").checked = variable.nsStatus;

		document.getElementById("b1").checked = variable.b1Status;
		document.getElementById("b2").checked = variable.b2Status;
		document.getElementById("b3").checked = variable.b3Status;
		document.getElementById("b4").checked = variable.b4Status;
		document.getElementById("b5").checked = variable.b5Status;

	});

	saveChanges.onclick = async function(e) {
		chrome.storage.local.set({currentHTML: document.getElementById("wrapperId").innerHTML}, function() {});
		console.log("saveChanges clicked");
		var whichTagsAreChecked = [];
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			let url = tabs[0].url;
			chrome.storage.local.get(['radio', 'fdStatus', 'b1Status', 'ftStatus',
									  'b2Status', 'ntStatus', 'b3Status', 'fsStatus',
							        	'b4Status', 'nsStatus', 'b5Status', 'currentHTML', 'dontShowAgain'], function(variable) {
				chrome.tabs.sendMessage(tabs[0].id, {currentHTMLKey: variable.currentHTML}, function(response) {});
				/**
				chrome.tabs.sendMessage(tabs[0].id, {fdStatusKey: variable.fdStatus}, function(response) {});
				chrome.tabs.sendMessage(tabs[0].id, {ftStatusKey: variable.ftStatus}, function(response) {});
				chrome.tabs.sendMessage(tabs[0].id, {fsStatusKey: variable.fsStatus}, function(response) {});
				chrome.tabs.sendMessage(tabs[0].id, {ntStatusKey: variable.ntStatus}, function(response) {});
				chrome.tabs.sendMessage(tabs[0].id, {nsStatusKey: variable.nsStatus}, function(response) {});

				chrome.tabs.sendMessage(tabs[0].id, {b1StatusKey: variable.b1Status}, function(response) {});
				chrome.tabs.sendMessage(tabs[0].id, {b2StatusKey: variable.b2Status}, function(response) {});
				chrome.tabs.sendMessage(tabs[0].id, {b3StatusKey: variable.b3Status}, function(response) {});
				chrome.tabs.sendMessage(tabs[0].id, {b4StatusKey: variable.b4Status}, function(response) {});
				chrome.tabs.sendMessage(tabs[0].id, {b5StatusKey: variable.b5Status}, function(response) {});
				**/
			});
		});
	}

	radio1.onclick = async function(e) {
		chrome.storage.local.set({radio: "radio1"}, function() {});

		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			let url = tabs[0].url;
			chrome.storage.local.get(['radio'], function(variable) {
				chrome.tabs.sendMessage(tabs[0].id, {radioKey: variable.radio}, function(response) {});
				warningForClick.hidden = true;
			});
		});
	}
	radio2.onclick = async function(e) {
		chrome.storage.local.set({radio: "radio2"}, function() {});

		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			let url = tabs[0].url;
			chrome.storage.local.get(['radio', 'dontShowAgain'], function(variable) {
				chrome.tabs.sendMessage(tabs[0].id, {radioKey: variable.radio}, function(response) {});
				if (!variable.dontShowAgain == true) {
					warningForClick.hidden = false;
				}
			});
		});
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
	function warningCheck() {
		if (document.getElementById('fd').checked == false && document.getElementById('ft').checked == false &&
			document.getElementById('fs').checked == false && document.getElementById('nt').checked == false &&
			document.getElementById('ns').checked == false) {
			document.getElementById('warning').innerHTML = "<br>Warning: No checkboxes with text are selected, so nothing will be copied.";
		} else {
			document.getElementById('warning').innerHTML = "";
		}
	}
	warningCheck();

	dontShowAgainButton.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			warningForClick.hidden = true;
			if (dontShowAgainButtonCheck.checked == true) {
				chrome.storage.local.get(['dontShowAgain'], function(variable) {
					chrome.storage.local.set({dontShowAgain: true}, function() {});
				});
			}
		});
	}

	fd.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['fdStatus'], function(variable) {
				chrome.storage.local.set({fdStatus: fd.checked}, function() {});
				warningCheck();
				console.log("fdStatus: " + variable.fdStatus);
			});
		});
	}
	ft.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['ftStatus'], function(variable) {
				chrome.storage.local.set({ftStatus: ft.checked}, function() {});
				warningCheck();
			});
		});
	}
	fs.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['fsStatus'], function(variable) {
				chrome.storage.local.set({fsStatus: fs.checked}, function() {});
				warningCheck();
			});
		});
	}
	nt.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['ntStatus'], function(variable) {
				chrome.storage.local.set({ntStatus: nt.checked}, function() {});
				warningCheck();
			});
		});
	}
	ns.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['nsStatus'], function(variable) {
				chrome.storage.local.set({nsStatus: ns.checked}, function() {});
				warningCheck();
			});
		});
	}

	b1.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['b1Status'], function(variable) {
				chrome.storage.local.set({b1Status: b1.checked}, function() {});

			});
		});
	}
	b2.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['b2Status'], function(variable) {
				chrome.storage.local.set({b2Status: b2.checked}, function() {});

			});
		});
	}
	b3.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['b3Status'], function(variable) {
				chrome.storage.local.set({b3Status: b3.checked}, function() {});

			});
		});
	}
	b4.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['b4Status'], function(variable) {
				chrome.storage.local.set({b4Status: b4.checked}, function() {});

			});
		});
	}
	b5.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['b5Status'], function(variable) {
				chrome.storage.local.set({b5Status: b5.checked}, function() {});

			});
		});
	}
});