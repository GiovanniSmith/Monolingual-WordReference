const version = "1.0.0";
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
    chrome.storage.local.get(['firstTime'], function(variable) {
        if (variable.firstTime == false || variable.firstTime == null) {
            document.getElementById("fd").checked = false;
            document.getElementById("ft").checked = true;
            document.getElementById("fs").checked = true;
            document.getElementById("nt").checked = false;
            document.getElementById("ns").checked = false;

            document.getElementById("b1").checked = false;
            document.getElementById("b2").checked = true;
            document.getElementById("b3").checked = false;
            document.getElementById("b4").checked = false;
            document.getElementById("b5").checked = false;

            document.getElementById("capitalize").checked = true;
            document.getElementById("hntEnabled").checked = true;
            document.getElementById("hntParenthesis").checked = true;
            document.getElementById("ftParenthesis").checked = true;
            document.getElementById("ntSameRow").checked = true;

            document.getElementById("radio1").checked = true;
            document.getElementById("radio2").checked = false;
            document.getElementById("click").checked = true;
            document.getElementById("hover").checked = false;
        }
    });

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// when the extension pop-up is opened
document.addEventListener('DOMContentLoaded', function() {
	console.log("document.addEventListener('DOMContentLoaded', function()");

	const fd = document.getElementById('fd');
	const ft = document.getElementById('ft');
	const fs = document.getElementById('fs');
	const nd = document.getElementById('nd');
	const ns = document.getElementById('ns');

	const b1 = document.getElementById('b1');
	const b2 = document.getElementById('b2');
	const b3 = document.getElementById('b3');
	const b4 = document.getElementById('b4');
	const b5 = document.getElementById('b5');

	const fdCapitalize = document.getElementById('fdCapitalize');
	const ftCapitalize = document.getElementById('ftCapitalize');
	const ndCapitalize = document.getElementById('ndCapitalize');

	const saveChanges = document.getElementById('saveChanges');
	const warningForClick = document.getElementById('warningForClick');
	const item = document.querySelector('.item');

	const sendMessageButton = document.getElementById('toggleDefinitions');
	const sendMessageButton2 = document.getElementById('toggleCopy');
	const generalCopyTab = document.getElementById('generalCopyTab');
    const nitpickyCopyTab = document.getElementById('nitpickyCopyTab');
    const clickOrHoverTab = document.getElementById('clickOrHoverTab');
    const miscTab = document.getElementById('miscTab');
    const copyVariables = document.getElementById('copyVariables');

	const capitalize = document.getElementById('capitalize');
    const fdTooltips = document.getElementById('fdTooltips');
    const ntTooltips = document.getElementById('ntTooltips');
    const hntParenthesis = document.getElementById('hntParenthesis');
    const ftParenthesis = document.getElementById('ftParenthesis');
    const ntSameRow = document.getElementById('ntSameRow');

    const click = document.getElementById('click');
    const hover = document.getElementById('hover');
    const radio1 = document.getElementById('radio1');
    const radio2 = document.getElementById('radio2');

	generalCopyTab.click();

	chrome.storage.local.get(['fdStatus', 'b1Status', 'ftStatus', 'b2Status', 'ntStatus', 'b3Status', 'fsStatus',
				'b4Status', 'nsStatus', 'b5Status', 'currentHTML', 'dontShowAgain', 'hasDOMeverBeenLoaded', 'firstTime',
				'fdTooltips', 'ntTooltips', 'hntParenthesis', 'ftParenthesis', 'ntSameRow',
				'hntEnabled', 'radio1', 'radio2', 'click', 'hover', 'capitalize',
				'fdCapitalize', 'ftCapitalize', 'ntCapitalize', 'toggleDefinitions', 'toggleCopy'], function(variable) {
		if (variable.hasDOMeverBeenLoaded == true)
		    chrome.storage.local.set({firstTime: true}, function() {});

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

			chrome.storage.local.set({capitalize: true}, function() {});
			chrome.storage.local.set({hntEnabled: true}, function() {});
			chrome.storage.local.set({hntParenthesis: true}, function() {});
			chrome.storage.local.set({ftParenthesis: true}, function() {});
			chrome.storage.local.set({ntSameRow: true}, function() {});

			chrome.storage.local.set({click: true}, function() {});
			chrome.storage.local.set({hover: false}, function() {});
			chrome.storage.local.set({radio1: true}, function() {});

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

		document.getElementById("fdCapitalize").checked = variable.fdCapitalize;
		document.getElementById("ftCapitalize").checked = variable.ftCapitalize;
		document.getElementById("ntCapitalize").checked = variable.ntCapitalize;

		document.getElementById("capitalize").checked = variable.capitalize;
		document.getElementById("fdTooltips").checked = variable.fdTooltips;
		document.getElementById("ntTooltips").checked = variable.ntTooltips;
		document.getElementById("hntEnabled").checked = variable.hntEnabled;
		document.getElementById("hntParenthesis").checked = variable.hntParenthesis;
		document.getElementById("ftParenthesis").checked = variable.ftParenthesis;
		document.getElementById("ntSameRow").checked = variable.ntSameRow;

		document.getElementById("radio1").checked = variable.radio1;
		document.getElementById("radio2").checked = variable.radio2;
		document.getElementById("click").checked = variable.click;
		document.getElementById("hover").checked = variable.hover;
		//saveChanges.click();

		copyVariables.onclick = async function(e) {
		    console.log("Variables copied to clipboard.");
            navigator.clipboard.writeText("v" + version +
                                          "\ntoggleDefinitions: " + variable.toggleDefinitions +
                                          "\ntoggleCopy: " + variable.toggleCopy +
                                          "\nfdStatus: " + variable.fdStatus +
                                          "\nftStatus: " + variable.ftStatus +
                                          "\nfsStatus: " + variable.fsStatus +
                                          "\nntStatus: " + variable.ntStatus +
                                          "\nnsStatus: " + variable.nsStatus +
                                          "\nb1Status: " + variable.b1Status +
                                          "\nb2Status: " + variable.b2Status +
                                          "\nb3Status: " + variable.b3Status +
                                          "\nb4Status: " + variable.b4Status +
                                          "\nb5Status: " + variable.b5Status +
                                          "\nfdCapitalize: " + variable.fdCapitalize +
                                          "\nftCapitalize: " + variable.ftCapitalize +
                                          "\nntCapitalize: " + variable.ntCapitalize +
                                          "\ncapitalize: " + variable.capitalize +
                                          "\nfdTooltips: " + variable.fdTooltips +
                                          "\nntTooltips: " + variable.ntTooltips +
                                          "\nhntEnabled: " + variable.hntEnabled +
                                          "\nftParenthesis: " + variable.ftParenthesis +
                                          "\nntSameRow: " + variable.ntSameRow +
                                          "\nradio1: " + variable.radio1 +
                                          "\nradio2: " + variable.radio2 +
                                          "\nclick: " + variable.click +
                                          "\nhover: " + variable.hover +
                                          "\ndontShowAgain: " + variable.dontShowAgain +
                                          "\nhasDOMeverBeenLoaded: " + variable.hasDOMeverBeenLoaded
                                           );
        }
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
			openTab(e, 'generalCopy');
		});
	}
	nitpickyCopyTab.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			openTab(e, 'nitpickyCopy');
		});
	}
	clickOrHoverTab.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			openTab(e, 'clickOrHover');
		});
	}
	miscTab.onclick = async function(e) {
        let queryOptions = { active: true, currentWindow: true };
        let tab = await chrome.tabs.query(queryOptions);
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            openTab(e, 'misc');
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
	console.log("document.querySelector('body').addEventListener('click', function(event)");

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

	fdCapitalize.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['fdCapitalize'], function(variable) {
				chrome.storage.local.set({fdCapitalize: fdCapitalize.checked}, function() {});
				chrome.tabs.sendMessage(tabs[0].id, {fdCapitalize: variable.fdCapitalize}, function(response) {});
				console.log("fdCapitalize: " + variable.fdCapitalize);
				saveChanges.click();
			});
		});
	}
	ftCapitalize.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['ftCapitalize'], function(variable) {
				chrome.storage.local.set({ftCapitalize: ftCapitalize.checked}, function() {});
				chrome.tabs.sendMessage(tabs[0].id, {ftCapitalize: variable.ftCapitalize}, function(response) {});
				console.log("ftCapitalize: " + variable.ftCapitalize);
				saveChanges.click();
			});
		});
	}
	ntCapitalize.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['ntCapitalize'], function(variable) {
				chrome.storage.local.set({ntCapitalize: ntCapitalize.checked}, function() {});
				chrome.tabs.sendMessage(tabs[0].id, {ntCapitalize: variable.ntCapitalize}, function(response) {});
				console.log("ntCapitalize: " + variable.ntCapitalize);
				saveChanges.click();
			});
		});
	}

	capitalize.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['capitalize'], function(variable) {
				chrome.storage.local.set({capitalize: capitalize.checked}, function() {});
				console.log("capitalize: " + capitalize.checked);
				chrome.tabs.sendMessage(tabs[0].id, {capitalize: variable.capitalize}, function(response) {});
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
	hntEnabled.onclick = async function(e) {
    		let queryOptions = { active: true, currentWindow: true };
    		let tab = await chrome.tabs.query(queryOptions);
    		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    			chrome.storage.local.get(['hntEnabled'], function(variable) {
    				chrome.storage.local.set({hntEnabled: hntEnabled.checked}, function() {});
    				console.log("hntEnabled: " + hntEnabled.checked);
    				chrome.tabs.sendMessage(tabs[0].id, {hntEnabled: variable.hntEnabled}, function(response) {});
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

	click.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['click'], function(variable) {
				chrome.storage.local.set({click: click.checked}, function() {});
				chrome.storage.local.set({hover: false}, function() {});
				console.log("click: " + click.checked);
				chrome.tabs.sendMessage(tabs[0].id, {click: variable.click}, function(response) {});
				chrome.tabs.sendMessage(tabs[0].id, {hover: variable.hover}, function(response) {});
			});
		});
	}
	hover.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['hover'], function(variable) {
				chrome.storage.local.set({click: false}, function() {});
				chrome.storage.local.set({hover: hover.checked}, function() {});
				console.log("hover: " + hover.checked);
				chrome.tabs.sendMessage(tabs[0].id, {click: variable.click}, function(response) {});
				chrome.tabs.sendMessage(tabs[0].id, {hover: variable.hover}, function(response) {});
			});
		});
	}
	radio1.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['radio1'], function(variable) {
				chrome.storage.local.set({radio1: radio1.checked}, function() {});
				chrome.storage.local.set({radio2: false}, function() {});
				console.log("radio1: " + radio1.checked);
				chrome.tabs.sendMessage(tabs[0].id, {radio1: variable.radio1}, function(response) {});
				chrome.tabs.sendMessage(tabs[0].id, {radio2: variable.radio2}, function(response) {});
			});
		});
	}
	radio2.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['radio2'], function(variable) {
				chrome.storage.local.set({radio1: false}, function() {});
				chrome.storage.local.set({radio2: radio2.checked}, function() {});
				console.log("radio2: " + radio2.checked);
				chrome.tabs.sendMessage(tabs[0].id, {radio1: variable.radio1}, function(response) {});
				chrome.tabs.sendMessage(tabs[0].id, {radio2: variable.radio2}, function(response) {});
			});
		});
	}
});