if ( typeof (AC) == "undefined") {
	AC = {}
}
AC.Reveal = {
	loaded : function(a) {
		this._loaded = true;
		window.setTimeout(function() {
			document.body.addClassName("loaded")
		}, 10)
	},
	revealed : function(a) {
		if (a.target.id == "globalfooter" || a.target.className.match("ac-reveal-last")) {
			document.body.addClassName("revealed");
			window.removeVendorEventListener("transitionEnd", AC.Reveal.revealed, false)
		}
	},
	cancel : function(a) {
		if (this._loaded !== true) {
			document.fire("ac:reveal:cancel");
			if ( typeof window.addEventListener == "function") {
				window.removeEventListener("load", AC.Reveal.loaded, false)
			}
			window.removeVendorEventListener("transitionEnd", AC.Reveal.revealed, false);
			document.body.addClassName("loaded");
			document.body.addClassName("revealed");
			document.body.addClassName("canceled")
		}
	}
};
if ( typeof window.addEventListener == "function") {
	window.addEventListener("load", AC.Reveal.loaded, false)
}
window.addVendorEventListener("transitionEnd", AC.Reveal.revealed, false);
window.setTimeout(AC.Reveal.cancel, 3000);
document.fire("ac:reveal:load"); 