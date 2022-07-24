// tab stuff
function openTab(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}


// when the extension pop-up is opened
document.addEventListener('DOMContentLoaded', function() {
	console.log("DOMContentLoaded");

	// assign variables by tags in the extension pop-up
	var warningForSpacing = document.getElementById('warningForSpacing');
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
	var item = document.querySelector('.item');
	//var itemGray = document.querySelector('.itemGray');
	const sendMessageButton = document.getElementById('toggleDefinitions');
	const sendMessageButton2 = document.getElementById('toggleCopy');
	var generalCopyTab = document.getElementById('generalCopyTab');
    var nitpickyCopyTab = document.getElementById('nitpickyCopyTab');

    var fdTooltips = document.getElementById('fdTooltips');
    var ntTooltips = document.getElementById('ntTooltips');
    var hntParenthesis = document.getElementById('hntParenthesis');
    var ftParenthesis = document.getElementById('ftParenthesis');
    var ntSameRow = document.getElementById('ntSameRow');

	generalCopyTab.click();

	chrome.storage.local.get(['fdStatus', 'b1Status', 'ftStatus', 'b2Status', 'ntStatus', 'b3Status', 'fsStatus',
				'b4Status', 'nsStatus', 'b5Status', 'currentHTML', 'dontShowAgain', 'hasDOMeverBeenLoaded',
				'fdTooltips', 'ntTooltips', 'hntParenthesis', 'ftParenthesis', 'ntSameRow'], function(variable) {
		chrome.storage.local.set({currentHTML: document.getElementById("wrapperId").innerHTML}, function() {});
		chrome.storage.local.set({hasDOMeverBeenLoaded: true}, function() {});

		if (!variable.dontShowAgain)
			warningForClick.hidden = false;
		else
			warningForClick.hidden = true;

		if (variable.currentHTML != null) {
			document.getElementById("wrapperId").innerHTML = variable.currentHTML;
			console.log("Row order updated");
		} else {
			chrome.storage.local.set({currentHTML: document.getElementById("wrapperId").innerHTML}, function() {});
			chrome.storage.local.set({ftStatus: true}, function() {});
			chrome.storage.local.set({b2Status: true}, function() {});
			chrome.storage.local.set({fsStatus: true}, function() {});

			console.log("Checkboxes set to their default values");
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

		document.getElementById("fdTooltips").checked = variable.fdTooltips;
		document.getElementById("ntTooltips").checked = variable.ntTooltips;
		document.getElementById("hntParenthesis").checked = variable.hntParenthesis;
		document.getElementById("ftParenthesis").checked = variable.ftParenthesis;
		document.getElementById("ntSameRow").checked = variable.ntSameRow;

		saveChanges.click();
	});

	saveChanges.onclick = async function(e) {
		chrome.storage.local.set({currentHTML: document.getElementById("wrapperId").innerHTML}, function() {});
		console.log("saveChanges clicked");
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			let url = tabs[0].url;
			chrome.storage.local.get(['fdStatus', 'b1Status', 'ftStatus',
									  'b2Status', 'ntStatus', 'b3Status', 'fsStatus',
							        	'b4Status', 'nsStatus', 'b5Status', 'currentHTML', 'dontShowAgain'], function(variable) {
				chrome.tabs.sendMessage(tabs[0].id, {currentHTMLKey: variable.currentHTML}, function(response) {});

			});
		});
	}
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

	generalCopyTab.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			openTab(event, 'generalCopy');
		});
	}
	nitpickyCopyTab.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			openTab(event, 'nitpickyCopy');
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
	chrome.storage.local.get(['hasDOMeverBeenLoaded'], function(variable) {
		chrome.storage.local.set({hasDOMeverBeenLoaded: true}, function() {});
	});

	dragArea.onmouseenter = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			saveChanges.click();
		});
	}
	dragArea.onmouseleave = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			saveChanges.click();
		});
	}

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
				console.log("fdStatus: " + variable.fdStatus);
				saveChanges.click();
			});
		});
	}
	ft.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['ftStatus'], function(variable) {
				chrome.storage.local.set({ftStatus: ft.checked}, function() {});
				saveChanges.click();
			});
		});
	}
	fs.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['fsStatus'], function(variable) {
				chrome.storage.local.set({fsStatus: fs.checked}, function() {});
				saveChanges.click();
			});
		});
	}
	nt.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['ntStatus'], function(variable) {
				chrome.storage.local.set({ntStatus: nt.checked}, function() {});
				saveChanges.click();
			});
		});
	}
	ns.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['nsStatus'], function(variable) {
				chrome.storage.local.set({nsStatus: ns.checked}, function() {});
				saveChanges.click();
			});
		});
	}

	b1.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['b1Status'], function(variable) {
				chrome.storage.local.set({b1Status: b1.checked}, function() {});
				saveChanges.click();
			});
		});
	}
	b2.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['b2Status'], function(variable) {
				chrome.storage.local.set({b2Status: b2.checked}, function() {});
				saveChanges.click();
			});
		});
	}
	b3.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['b3Status'], function(variable) {
				chrome.storage.local.set({b3Status: b3.checked}, function() {});
				saveChanges.click();
			});
		});
	}
	b4.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['b4Status'], function(variable) {
				chrome.storage.local.set({b4Status: b4.checked}, function() {});
				saveChanges.click();
			});
		});
	}
	b5.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['b5Status'], function(variable) {
				chrome.storage.local.set({b5Status: b5.checked}, function() {});
				saveChanges.click();
			});
		});
	}

	fdTooltips.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['fdTooltips'], function(variable) {
				chrome.storage.local.set({fdTooltips: fdTooltips.checked}, function() {});
				console.log("fdTooltips: " + fdTooltips.checked);
				chrome.tabs.sendMessage(tabs[0].id, {fdTooltips: variable.fdTooltips}, function(response) {});
			});
		});
	}
	ntTooltips.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['ntTooltips'], function(variable) {
				chrome.storage.local.set({ntTooltips: ntTooltips.checked}, function() {});
				console.log("ntTooltips: " + ntTooltips.checked);
				chrome.tabs.sendMessage(tabs[0].id, {ntTooltips: variable.ntTooltips}, function(response) {});
			});
		});
	}
    hntParenthesis.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['hntParenthesis'], function(variable) {
				chrome.storage.local.set({hntParenthesis: hntParenthesis.checked}, function() {});
				console.log("hntParenthesis: " + hntParenthesis.checked);
				chrome.tabs.sendMessage(tabs[0].id, {hntParenthesis: variable.hntParenthesis}, function(response) {});
			});
		});
	}
    ftParenthesis.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['ftParenthesis'], function(variable) {
				chrome.storage.local.set({ftParenthesis: ftParenthesis.checked}, function() {});
				console.log("ftParenthesis: " + ftParenthesis.checked);
				chrome.tabs.sendMessage(tabs[0].id, {ftParenthesis: variable.ftParenthesis}, function(response) {});
			});
		});
	}
    ntSameRow.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['ntSameRow'], function(variable) {
				chrome.storage.local.set({ntSameRow: ntSameRow.checked}, function() {});
				console.log("ntSameRow: " + ntSameRow.checked);
				chrome.tabs.sendMessage(tabs[0].id, {ntSameRow: variable.ntSameRow}, function(response) {});
			});
		});
	}
});