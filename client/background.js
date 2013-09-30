var ipstuff = {
	ip2long : function(ip){
		var ippart = ip.split(".");
		return (parseInt(ippart[0]) << 24 | parseInt(ippart[1]) << 16 | parseInt(ippart[2]) << 8 | parseInt(ippart[3]));
	},

	contains_within : function(ip, cidr){
		

	}
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	chrome.tabs.query({active:true, currentWindow:true},function(tab){
		var uri = tab[0].url;
		var domain = uri.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
		
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://whohost.xil.se/?host=" + domain, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				var a = JSON.parse(xhr.response);
			}
		}
		xhr.send();


		chrome.pageAction.setIcon({tabId: sender.tab.id, path: 'icons/one.ico'});
		chrome.pageAction.setTitle({tabId: sender.tab.id, title: "test"});
		chrome.pageAction.show(sender.tab.id);

	});
	sendResponse({});

});
