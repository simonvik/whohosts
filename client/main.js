(function(){
	chrome.extension.sendRequest({msg: "newpage", "hosts": hosts});
})();
