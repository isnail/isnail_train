if ( typeof (AC) == "undefined") {
	AC = {}
}
AC.ProductBrowser = function(g) {
	var y = 1, 
		q = 7, 
		r = g.select("ul"), 
		t = r.length, 
		p = g.getWidth(), 
		o = $(g.id.replace(/^pb-/, "pb-pi-")), 
		a = (o) ? o.select("a") : [], 
		E = (o) ? o.down("b.caret") : false, 
		x = g.down(".pb-slide"), 
		n = true, 
		B = false, 
		u = 0, 
		C = false, 
		j = e();
	this.pagesContainer = g;
	this.pagesContainer.addClassName("pb-dynamic");
	if (o && t > 0) {
		document.observe("keydown", s)
	}
	if (j) {
		var D = function(i) {
			if ((i.target == g && i.propertyName == "opacity") || i.eventName == "ac:reveal:cancel") {
				g.addClassName("pb-open");
				g.removeVendorEventListener("transitionEnd", D, false)
			}
		};
		document.observe("ac:reveal:cancel", D);
		g.addVendorEventListener("transitionEnd", D, false);
		if (o && t > 0) {
			x.trackTouches(c, A, f);
			x.addVendorEventListener("transitionEnd", h);
			for (var z = t - 1; z >= 0; z--) {
				r[z].addVendorEventListener("animationStart", m);
				r[z].addVendorEventListener("animationEnd", k)
			}
		}
	} else {
		g.addClassName("pb-open pb-degraded")
	}
	function e() {
		var F = AC.Detector.isCSSAvailable("animation");
		if (F && AC.Detector.isWebKit()) {
			var i = AC.Detector.getAgent().match(/version\/(\d)/);
			if (!i) {
				return F
			}
			if (i[1]) {
				i = i[1]
			}
			if (i) {
				i = parseInt(i)
			}
			if (i == NaN) {
				return F
			}
			if (i < 5) {
				return false
			}
		}
		return F
	}

	function m(i) {
		i.target.addClassName("started")
	}

	function k(i) {
		if (i.animationName.match("open")) {
			if (!B) {
				B = r[0].items.length
			}
			if (B-- == 1) {
				g.removeClassName("pb-open");
				g.addClassName("pb-opened")
			}
		}
		if (i.target.hasAttribute("exit") || i.target.hasAttribute("exited")) {
			i.target.setAttribute("exited", i.target.getAttribute("exit"));
			i.target.removeAttribute("exit");
			if (!i.target.next()) {
				var F = i.target.up("ul");
				if (F) {
					F.setAttribute("exited", i.target.getAttribute("exited"));
					F.removeAttribute("exit")
				}
				$$("[toenter]").each(function(G) {
					G.setAttribute("enter", G.getAttribute("toenter"));
					G.removeAttribute("toenter")
				})
			}
		}
		if (i.target.hasAttribute("enter") || i.target.hasAttribute("entered")) {
			i.target.setAttribute("entered", i.target.getAttribute("enter"));
			i.target.removeAttribute("enter");
			i.target.removeAttribute("style");
			if (!i.target.next()) {
				var F = i.target.up("ul");
				if (F) {
					F.setAttribute("entered", i.target.getAttribute("entered"));
					F.removeAttribute("enter")
				}
			}
			C = false
		}
	}

	function h(i) {
		if (i.target == x && x.hasClassName("end")) {
			n = true;
			l(y);
			x.setVendorPrefixStyle("transition-duration", "");
			x.setVendorPrefixTransform(0, 0);
			x.removeClassName("active");
			x.removeClassName("end");
			x.removeClassName("toucheslock");
			C = false
		}
	}

	function s(G) {
		if (!!C) {
			return
		}
		var I = "";
		if (G.keyCode == Event.KEY_RIGHT) {
			I = "next"
		} else {
			if (G.keyCode == Event.KEY_LEFT) {
				I = "previous"
			}
		}
		if (!I) {
			return
		}
		var H = (G.target) ? G.target : G.srcElement, F = H.getAttribute("contenteditable"), i = true;
		if (F == null) {
			i = false
		}
		if (i && F == document.body.getAttribute("contenteditable")) {
			i = false
		}
		if (i && F == "false") {
			i = false
		}
		if (H.tagName.toLowerCase() == "input" || H.tagName.toLowerCase() == "textarea" || H.tagName.toLowerCase() == "select" || i) {
			return
		}
		if ((I == "next" && y == t) || (I == "previous" && y == 1)) {
			return
		}
		if (I == "next") {
			y++
		}
		if (I == "previous") {
			y--
		}
		C = true;
		l(y, I)
	}

	function c(i) {
		// if (!!C) {
			// return
		// }
		x.setVendorPrefixStyle("transition-duration", "0");
		x.addClassName("active");
		u = -p * (y - 1);
		x.setVendorPrefixTransform(u + "px", 0)
	}

	function A(i) {
		if (!!C) {
			return
		}
		if (AC.Detector.iOSVersion() < 4) {
			x.setVendorPrefixStyle("transition-duration", "")
		}
		x.setVendorPrefixTransform((u - i.difference.x) + "px", 0)
	}

	function f(i) {
		if (!!C) {
			return
		}
		C = true;
		x.addClassName("toucheslock");
		if (!(i.direction.x == "right" && y == t) && !(i.direction.x == "left" && y == 1)) {
			if (i.direction.x == "right") {
				y++
			}
			if (i.direction.x == "left") {
				y--
			}
		}
		x.addClassName("end");
		x.setVendorPrefixStyle("transition-duration", "300ms");
		x.setVendorPrefixTransform("-" + p * (y - 1) + "px", 0);
		d(y)
	}

	function w(i) {
		C = false
	}

	function b(i) {
		if (!!C) {
			return
		}
		C = true;
		var F = parseInt(i.findElement("[page]").getAttribute("page"));
		if (F == y) {
			C = false;
			return
		}
		if (F) {
			l(F)
		}
	}

	var d = this.updateControls = function(F) {
		if (o && t > 0) {
			for (var I = 0; I < t; I++) {
				if (!a[I].hasAttribute("page")) {
					a[I].setAttribute("page", I + 1);
					a[I].observe("click", b)
				}
				if (I + 1 == F) {
					var G = a[I].addClassName("active")
				} else {
					a[I].removeClassName("active")
				}
			}
			if (o.className.match("page-")) {
				o.className = o.className.replace(/page-\d/, "page-" + F)
			} else {
				o.className += " page-" + F
			}
			if (E && G) {
				var J = G.positionedOffset().left, L = G.getWidth() / 2, H = parseInt(J + L);
				if (j) {
					E.setVendorPrefixTransform(H + "px", 0);
					var K = function(i) {
						if (i.target == E) {
							E.setVendorPrefixTransform(H + "px", 0);
							E.removeVendorEventListener("transitionEnd", K, false)
						}
					};
					E.addVendorEventListener("transitionEnd", K, false)
				} else {
					if (n) {
						E.style.left = H + "px"
					} else {
						E.morph("left:" + H + "px", {
							duration : 0.4
						})
					}
				}
			}
		}
	};
	var v = function(i) {
		// var F = AC.Tracking.pageName() + " - product nav - " + ((a[i - 1]) ? a[i - 1].innerHTML : "");
		// AC.Tracking.trackClick({
			// prop3 : F
		// }, this, "o", F)
	};
	var l = this.update = function(i, F) {
		if (t > 1) {
			if (!F) {
				F = (y > i) ? "previous" : "next"
			}
			if ( typeof (i) == "number") {
				y = i
			}
			if (!n) {
				v(y)
			}
			r.each(function(H, G) {
				G++;
				if (G < y) {
					H.wrapper.removeAttribute("enter");
					H.wrapper.removeAttribute("entered");
					if (!j && H.wrapper.visible()) {
						Effect.Fade(H.wrapper, {
							duration : 0.6
						})
					} else {
						if (n) {
							H.wrapper.setAttribute("exited", "previous")
						} else {
							if (!H.wrapper.hasAttribute("exited")) {
								H.wrapper.setAttribute("exit", "previous")
							}
						}
					}
				} else {
					if (G > y) {
						H.wrapper.removeAttribute("enter");
						H.wrapper.removeAttribute("entered");
						if (!j && H.wrapper.visible()) {
							if (n) {
								H.wrapper.hide()
							} else {
								Effect.Fade(H.wrapper, {
									duration : 0.6
								})
							}
						} else {
							if (n) {
								H.wrapper.setAttribute("exited", "next")
							} else {
								if (!H.wrapper.hasAttribute("exited")) {
									H.wrapper.setAttribute("exit", "next")
								}
							}
						}
					} else {
						H.wrapper.removeAttribute("exit");
						H.wrapper.removeAttribute("exited");
						if (!j) {
							Effect.Appear(H.wrapper, {
								duration : 0.6,
								afterFinish : w
							})
						} else {
							if (n) {
								H.wrapper.setAttribute("entered", F)
							} else {
								H.wrapper.setAttribute("toenter", F)
							}
						}
					}
				}
				H.items.each(function(I) {
					I.removeClassName("started");
					if (G < y) {
						I.removeAttribute("enter");
						I.removeAttribute("entered");
						if (n) {
							I.setAttribute("exited", "previous")
						} else {
							if (!I.hasAttribute("exited")) {
								I.setAttribute("exit", "previous")
							}
						}
					} else {
						if (G > y) {
							I.removeAttribute("enter");
							I.removeAttribute("entered");
							if (n) {
								I.setAttribute("exited", "next")
							} else {
								if (!I.hasAttribute("exited")) {
									I.setAttribute("exit", "next")
								}
							}
						} else {
							I.removeAttribute("exit");
							I.removeAttribute("exited");
							if (n) {
								I.setAttribute("entered", F)
							} else {
								I.setAttribute("toenter", F)
							}
						}
					}
				})
			})
		}
		d(i);
		n = false
	};
	r.each(function(H, F) {
		r[F] = {
			index : F + 1,
			wrapper : H,
			items : H.select("li")
		};
		H.writeAttribute("page", F + 1);
		H.setStyle({
			width : "auto"
		});
		var G = H.getWidth() + (parseInt(H.getStyle("left"), 10) * 2);
		var I = Math.floor((p - G) / 2);
		H.setStyle({
			width : G + "px",
			margin : "0 " + I + "px"
		})
	});
	y = 1;
	x.style.width = p * r.length + "px";
	this.update(1)
};
AC.ProductBrowser.setup = function() {
	AC.ProductBrowser.browsers = {};
	var a = $$(".productbrowser");
	document.observe("ac:trackTouches:load", function() {
		a.each(function(d) {
			AC.ProductBrowser.browsers[d.id] = new AC.ProductBrowser(d)
		})
	})
};
AC.ProductBrowser.setup(); 