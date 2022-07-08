document.addEventListener('DOMContentLoaded', function() {
	const sendMessageButton = document.getElementById('toggleDefinitions');
    sendMessageButton.onclick = async function(e) {
        let queryOptions = { active: true, currentWindow: true };
        let tab = await chrome.tabs.query(queryOptions);
    	chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            let url = tabs[0].url;
            chrome.storage.local.get(['toggleDefinitions'], function(variable) {
            	//if (variable.toggleDefinitions == null) {
            	//	chrome.tabs.sendMessage(tabs[0].id, {toggleDefinitionsKey: true}, function(response) {});
            	//} else {
            		chrome.tabs.sendMessage(tabs[0].id, {toggleDefinitionsKey: variable.toggleDefinitions}, function(response) {});
            	//}
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
				//if (variable.toggleCopy == null) {
				//	chrome.tabs.sendMessage(tabs[0].id, {toggleCopyKey: true}, function(response) {});
				//} else {
					chrome.tabs.sendMessage(tabs[0].id, {toggleCopyKey: variable.toggleCopy}, function(response) {});
				//}
			});
		});
	}
}, false);