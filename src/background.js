document.addEventListener('DOMContentLoaded', function() {
	const sendMessageButton = document.getElementById('toggleButton');
    sendMessageButton.onclick = async function(e) {
        let queryOptions = { active: true, currentWindow: true };
        let tab = await chrome.tabs.query(queryOptions);
    	chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            let url = tabs[0].url;
            chrome.storage.local.get(['value'], function(variable) {
              chrome.tabs.sendMessage(tabs[0].id, {key: variable.value}, function(response) {

    			});
            });
        });
    }

    const sendMessageButton2 = document.getElementById('toggleCopy');
	sendMessageButton2.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			let url = tabs[0].url;
			chrome.storage.local.get(['copy'], function(variable) {
			  chrome.tabs.sendMessage(tabs[0].id, {copyKey: variable.copy}, function(response) {

				});
			});
		});
	}

	const sendMessageButton3 = document.getElementById('checkbox1');
	sendMessageButton3.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			let url = tabs[0].url;
			chrome.storage.local.get(['checkbox1'], function(variable) {
			  chrome.tabs.sendMessage(tabs[0].id, {checkbox1Key: variable.checkbox1}, function(response) {

				});
			});
		});
	}

	const sendMessageButton4 = document.getElementById('checkbox2');
	sendMessageButton3.onclick = async function(e) {
		let queryOptions = { active: true, currentWindow: true };
		let tab = await chrome.tabs.query(queryOptions);
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			let url = tabs[0].url;
			chrome.storage.local.get(['checkbox2'], function(variable) {
			  chrome.tabs.sendMessage(tabs[0].id, {checkbox2Key: variable.checkbox2}, function(response) {

				});
			});
		});
	}
}, false);

