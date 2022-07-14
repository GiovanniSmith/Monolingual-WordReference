const dragArea = document.querySelector(".wrapper");
new Sortable(dragArea, {
  animation: 350
});
/** **/

document.addEventListener('DOMContentLoaded', function() {
	var warning = document.getElementById('warning');

	chrome.storage.local.get(['previousWrapperHTML'], function(variable) {
		if (variable.previousWrapperHTML != null) {
			document.getElementById('wrapperId').innerHTML = variable.previousWrapperHTML;// recalls the order from last time
		}
	});

	var radio1 = document.getElementById('radio1');
	var radio2 = document.getElementById('radio2');
	const fw = document.getElementById('fw');
	const br1 = document.getElementById('br1');
	const fd = document.getElementById('fd');
	const br2 = document.getElementById('br2');
	const nd = document.getElementById('nd');
	const br3 = document.getElementById('br3');
	const fs = document.getElementById('fs');
	const br4 = document.getElementById('br4');
	const ns = document.getElementById('ns');
	const br5 = document.getElementById('br5');

	const saveChangesButton = document.getElementById('saveChanges');


	saveChangesButton.onclick = async function(e) {
		console.log(document.innerHTML);
        console.log("fw: " + document.getElementById('fw').innerHTML);
		chrome.storage.local.set({previousWrapperHTML: document.getElementById('wrapperId').innerHTML}, function() {});
		console.log(document.innerHTML);
        console.log("fw: " + document.getElementById('fw').innerHTML);
	}

	chrome.storage.local.get(['radio', 'fwStatus', 'br1Status', 'fdStatus',
						   	'br2Status', 'ndStatus', 'br3Status', 'fsStatus',
							'br4Status', 'nsStatus', 'br5Status', 'previousWrapperHTML'], function(variable) {

		if (variable.radio == "radio1") {
			radio1.setAttribute("checked", "checked");
		} else if (variable.radio == "radio2") {
            radio2.setAttribute("checked", "checked");
		}
		if (variable.fwStatus == true)
			document.getElementById('fw').checked = true;
		else
			document.getElementById('fw').checked = false;

		console.log(document.innerHTML);
		console.log("fw: " + document.getElementById('fw').innerHTML);

		if (variable.br1Status == true)
			br1.checked = true;
		else
			br1.checked = false;

		if (variable.fdStatus == true || variable.fdStatus == null)
			fd.checked = true;
		else
			fd.checked = false;

		if (variable.br2Status == true || variable.br2Status == null)
			br2.checked = true;
		else
			br2.checked = false;

		if (variable.ndStatus == true)
			nd.checked = true;
		else
			nd.checked = false;

		if (variable.br3Status == true)
			br3.checked = true;
		else
			br3.checked = false;

		if (variable.fsStatus == true || variable.fsStatus == null)
			fs.checked = true;
		else
			fs.checked = false;

		if (variable.br4Status == true)
			br4.checked = true;
		else
			br4.checked = false;

		if (variable.nsStatus == true)
			ns.checked = true;
		else
			ns.checked = false;

		if (variable.br5Status == true)
			br5.checked = true;
		else
			br5.checked = false;

		warningCheck();
	});

	function warningCheck() {
    		if (document.getElementById('fw').checked == false && document.getElementById('fd').checked == false &&
    			document.getElementById('nd').checked == false && document.getElementById('fs').checked == false &&
    			document.getElementById('ns').checked == false) {
    			document.getElementById('warning').innerHTML = "<br>Warning: No checkboxes with text are selected, so nothing will be copied.";
    		} else {
    			document.getElementById('warning').innerHTML = "";
    		}
    	}

	radio1.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			let url = tabs[0].url;
			chrome.storage.local.set({radio: "radio1"}, function() {});
		});
	}
	radio2.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			let url = tabs[0].url;
			chrome.storage.local.set({radio: "radio2"}, function() {});
		});
	}

	document.getElementById('fw').onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['fwStatus'], function(variable) {
				chrome.storage.local.set({fwStatus: !variable.fwStatus}, function() {});
				warningCheck();
				saveChangesButton.hidden = false;
			});
		});
	}
	br1.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['br1Status'], function(variable) {
				chrome.storage.local.set({br1Status: !variable.br1Status}, function() {});
				saveChangesButton.hidden = false;
			});
		});
	}
	fd.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['fdStatus'], function(variable) {
				chrome.storage.local.set({fdStatus: !variable.fdStatus}, function() {});
				warningCheck();
				saveChangesButton.hidden = false;
			});
		});
	}
	br2.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['br2Status'], function(variable) {
				chrome.storage.local.set({br2Status: !variable.br2Status}, function() {});
				saveChangesButton.hidden = false;
			});
		});
	}
	nd.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['ndStatus'], function(variable) {
				chrome.storage.local.set({ndStatus: !variable.ndStatus}, function() {});
				warningCheck();
				saveChangesButton.hidden = false;
			});
		});
	}
	br3.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['br3Status'], function(variable) {
				chrome.storage.local.set({br3Status: !variable.br3Status}, function() {});
				saveChangesButton.hidden = false;
			});
		});
	}
	fs.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['fsStatus'], function(variable) {
				chrome.storage.local.set({fsStatus: !variable.fsStatus}, function() {});
				warningCheck();
				saveChangesButton.hidden = false;
			});
		});
	}
	br4.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['br4Status'], function(variable) {
				chrome.storage.local.set({br4Status: !variable.br4Status}, function() {});
				saveChangesButton.hidden = false;
			});
		});
	}
	ns.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['nsStatus'], function(variable) {
				chrome.storage.local.set({nsStatus: !variable.nsStatus}, function() {});
				warningCheck();
				saveChangesButton.hidden = false;
			});
		});
	}
	br5.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.storage.local.get(['br5Status'], function(variable) {
				chrome.storage.local.set({br5Status: !variable.br5Status}, function() {});
				saveChangesButton.hidden = false;
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