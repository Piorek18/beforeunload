var utils = this.utils || {};
var forwarding = this.forwarding || {};

utils.def = (function () {
	config = {
		domain: "http://konrad-kowalski.com/"
	}
	
	return {
		getDomain: function () {
			return config.domain;
		}
	};
	
})();

utils.event = (function () {
	return {
		add: function (target, eventType, callback, bubbles) {
			bubbles = bubbles || false;
			if (target.attachEvent) {
				target.attachEvent("on" + eventType, function () {
					callback.call(target);
				});
			} else if (target.addEventListener) {
				target.addEventListener(eventType, callback, bubbles);
			}
		}
	};
})();

utils.browser = (function () {
	var browsers = ["msie", "chrome", "safari", "opera", "mozilla", "konqueror"];
	
	return {
		getName: function () {
			var userAgent = navigator.userAgent.toLowerCase();
			for(var i = 0, len = browsers.length; i < len; ++i) {
				var browser = browsers[i];
				if (new RegExp(browser).test(userAgent)) {
					return browser;
				}
			}
		}
	};
	
})();

forwarding = (function () {
	return {
		close: true,
		closeWin: function (closeBool) {
			this.close = closeBool;
			(closeBool == false) ? this.start() : window.onbeforeunload = null;
		},
		start: function () {
			if (utils.browser.getName() == "chrome") {
				if (this.close == false) {
					window.onbeforeunload = function () {
						$('body').load('src/load.php');
						return "jestem sobie chrome"; // tekst dla Chrome
					};
				}
			} else {
				window.onbeforeunload = function () {
					window.location.href = utils.def.getDomain();
					
					var ret = null;
					switch (utils.browser.getName())
					{
						case "msie": ret = "jestem sobie IE"; break; // tekst dla IE
						case "mozilla": ret = "jestem sobie Mozilla"; break; // tekst dla Mozilli
						default: ret = ""; // tekst dla innych przegladarek
					}
					return ret;
				};
			}
		}
	};
})();

utils.event.add(window, "load", function () {
	utils.event.add(document.body, "mouseover", function () {
		forwarding.closeWin(true);
	}, false);
	utils.event.add(document.body, "mouseout", function () {
		forwarding.closeWin(false);
	}, false);
}, false);