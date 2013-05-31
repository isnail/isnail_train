Element.addMethods({
	trackTouches : function(d, i, m, g, b) {
		var l, p, j, u, h, o, n, t = false, k, r = {}, s = false, f;
		if (!b) {
			b = {}
		}
		var f = {
			stopEvent : true,
			stopThreshold : 0
		};
		Object.extend(f, b);
		if ( typeof f.preventDefault !== "undefined") {
			try {
				console.warn("trackTouches.options.preventDefault is deprecated. Use trackTouches.options.stopEvent instead.")
			} catch(q) {
			}
			f.stopEvent = f.preventDefault
		}
		function c() {
			if (event.touches) {
				if (event.touches.length > 1) {
					return false
				}
				if (event.touches.length) {
					if (f.stopEvent === true) {
						event.preventDefault();
						event.stopPropagation()
					}
					l, p = {}, j = {}, u = {}, h, o = {}, t = false, k = {}, r = {}
				}
			}
		}

		function a() {
			if (d.className.match("paginglock")) {
				try {
					console.warn('Lock classname "paginglock" is deprecated. Please use "toucheslock".')
				} catch(D) {
				}
			}
			if ( s = !!(d.className.match("toucheslock") || d.className.match("paginglock"))) {
				return
			}
			if (event.touches || event.changedTouches) {
				if (event.touches.length > 1) {
					return false
				}
				if (event.touches.length || event.changedTouches) {
					var C = {
						x : (event.touches.length) ? event.touches[0].clientX : event.changedTouches[0].clientX,
						y : (event.touches.length) ? event.touches[0].clientY : event.changedTouches[0].clientY
					};
					var z = {};
					Object.extend(z, event);
					z.originalEvent = event;
					z.type = "touch";
					if (!!p.x && !!p.y) {
						t = {
							x : parseInt(p.x - C.x),
							y : parseInt(p.y - C.y)
						};
						t.abs = {
							x : Math.abs(t.x),
							y : Math.abs(t.y)
						};
						var v = parseInt(o.x - C.x), E = parseInt(o.y - C.y);
						if (v !== 0) {
							r.x = (v < 0) ? "left" : "right"
						}
						if (E !== 0) {
							r.y = (E < 0) ? "up" : "down"
						}
						if ( typeof k.x === "undefined") {
							k.x = 0
						} else {
							if (r.x === j.x) {
								k.x += Math.abs(C.x - u.x)
							} else {
								k.x = Math.abs(C.x - u.x)
							}
						}
						if ( typeof k.y === "undefined") {
							k.y = 0
						} else {
							if (r.y === j.y) {
								k.y += Math.abs(C.y - u.y)
							} else {
								k.y = C.y - u.y
							}
						}
						t.current = {
							x : k.x,
							y : k.y
						};
						j.x = r.x;
						j.y = r.y;
						if (event.touches.length) {
							var A = Date.now();
							var w = A - h;
							n = (w > 0) ? ((Math.pow(Math.abs(o.x - C.x), 2) + Math.pow(Math.abs(o.y - C.y), 2)) / 2) / w : n
						}
						o = C;
						z.time = h = A;
						z.duration = l - h;
						z.speed = n;
						z.direction = r;
						z.difference = t;
						z.startCoords = p;
						z.coords = C;
						if (event.touches.length) {
							m(z)
						} else {
							g(z)
						}
					} else {
						l = Date.now();
						n = 0;
						p = z.startCoords = C;
						o = C;
						i(z)
					}
				}
				if (z.difference && z.difference.abs && ((f.stopEvent == "horizontal" && z.difference.abs.x > z.difference.abs.y + f.stopThreshold) || (f.stopEvent == "vertical" && z.difference.abs.y > z.difference.abs.x + f.stopThreshold))) {
					event.preventDefault();
					event.stopPropagation()
				}
				if (f.stopEvent && event.type == "touchend" && !t) {
					var B = event.findElement("a");
					if (B && B.href) {
						document.location = B.href
					}
				}
				u = {
					x : C.x,
					y : C.y
				}
			}
		}
		Event.observe(d, "touchstart", c);
		Event.observe(d, "touchmove", a);
		Event.observe(d, "touchend", a);
		Event.observe(d, "touchcancel", a)
	},
	pagingView : function(d, g, b, a, c) {
		try {
			console.warn("Element.pagingView is deprecated. Use Element.trackTouches instead.")
		} catch(f) {
		}
		d.trackTouches(g, b, a, c)
	}
});
document.fire("ac:trackTouches:load");
document.fire("ac:pagingView:load"); 