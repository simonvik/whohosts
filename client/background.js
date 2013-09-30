var ipstuff = {
        ip2long : function(ip){
                var ippart = ip.split(".");
                return (parseInt(ippart[0]) *  16777216 + parseInt(ippart[1]) * 65536 + parseInt(ippart[2]) * 256 + parseInt(ippart[3]));
        },

        contains_within : function(ip, cidr){
                var parts = cidr.split('/');
                var mask = (~((1 << (32 - parts[1])) - 1)) ;        
                return (((ipstuff.ip2long(ip) & mask) >>> 0) == ((ipstuff.ip2long(parts[0]) & mask) >>> 0));
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
				var h = request.hosts;

				for(var item in h) {
					var ips = h[item].ip_range;
					for(var ip in ips){
						if(ipstuff.contains_within(a.ip, ips[ip])){
							chrome.pageAction.setIcon({tabId: sender.tab.id, path: 'icons/' + h[item].icon});
							chrome.pageAction.setTitle({tabId: sender.tab.id, title: h[item].url});
							chrome.pageAction.show(sender.tab.id);
						}

					}
				}
			}
		}
		xhr.send();


	});
	sendResponse({});

});
