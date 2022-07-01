/**
get
toggle
invert
save
**/

document.addEventListener('DOMContentLoaded', function() {
	console.log('PRESSED');
	const sendMessageButton = document.getElementById('toggleButton')
    sendMessageButton.onclick = async function(e) {
    	console.log('toggle attempt');
        let queryOptions = { active: true, currentWindow: true };
        let tab = await chrome.tabs.query(queryOptions);
    	chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            let url = tabs[0].url;
            chrome.storage.local.get(['value'], function(variable) {
              console.log('Value currently is ' + variable.value);
              chrome.tabs.sendMessage(tabs[0].id, {key: variable.value}, function(response) {

    			});
            });
        });
    }
}, false);

console.log('background.js');

