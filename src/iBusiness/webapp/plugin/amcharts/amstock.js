if (!AmCharts) var AmCharts = {};
AmCharts.inheriting = {};
AmCharts.Class = function(a) {
	var b = function() {
			arguments[0] !== AmCharts.inheriting && (this.events = {}, this.construct.apply(this, arguments))
		};
	a.inherits ? (b.prototype = new a.inherits(AmCharts.inheriting), b.base = a.inherits.prototype, delete a.inherits) : (b.prototype.createEvents = function() {
		for (var a = 0, b = arguments.length; a < b; a++) this.events[arguments[a]] = []
	}, b.prototype.listenTo = function(a, b, d) {
		a.events[b].push({
			handler: d,
			scope: this
		})
	}, b.prototype.addListener = function(a, b, d) {
		this.events[a].push({
			handler: b,
			scope: d
		})
	}, b.prototype.removeListener = function(a, b, d) {
		a = a.events[b];
		for (b = a.length - 1; 0 <= b; b--) a[b].handler === d && a.splice(b, 1)
	}, b.prototype.fire = function(a, b) {
		for (var d = this.events[a], h = 0, j = d.length; h < j; h++) {
			var k = d[h];
			k.handler.call(k.scope, b)
		}
	});
	for (var d in a) b.prototype[d] = a[d];
	return b
};
AmCharts.charts = [];
AmCharts.addChart = function(a) {
	AmCharts.charts.push(a)
};
AmCharts.removeChart = function(a) {
	for (var b = AmCharts.charts, d = b.length - 1; 0 <= d; d--) b[d] == a && b.splice(d, 1)
};
AmCharts.IEversion = 0; - 1 != navigator.appVersion.indexOf("MSIE") && document.documentMode && (AmCharts.IEversion = Number(document.documentMode));
if (document.addEventListener || window.opera) AmCharts.isNN = !0, AmCharts.isIE = !1, AmCharts.dx = 0.5, AmCharts.dy = 0.5;
document.attachEvent && (AmCharts.isNN = !1, AmCharts.isIE = !0, 9 > AmCharts.IEversion && (AmCharts.dx = 0, AmCharts.dy = 0));
window.chrome && (AmCharts.chrome = !0);
AmCharts.handleResize = function() {
	for (var a = AmCharts.charts, b = 0; b < a.length; b++) {
		var d = a[b];
		d && d.div && d.handleResize()
	}
};
AmCharts.handleMouseUp = function(a) {
	for (var b = AmCharts.charts, d = 0; d < b.length; d++) {
		var e = b[d];
		e && e.handleReleaseOutside(a)
	}
};
AmCharts.handleMouseMove = function(a) {
	for (var b = AmCharts.charts, d = 0; d < b.length; d++) {
		var e = b[d];
		e && e.handleMouseMove(a)
	}
};
AmCharts.resetMouseOver = function() {
	for (var a = AmCharts.charts, b = 0; b < a.length; b++) {
		var d = a[b];
		d && (d.mouseIsOver = !1)
	}
};
AmCharts.onReadyArray = [];
AmCharts.ready = function(a) {
	AmCharts.onReadyArray.push(a)
};
AmCharts.handleLoad = function() {
	for (var a = AmCharts.onReadyArray, b = 0; b < a.length; b++)(0, a[b])()
};
AmCharts.useUTC = !1;
AmCharts.updateRate = 40;
AmCharts.uid = 0;
AmCharts.getUniqueId = function() {
	AmCharts.uid++;
	return "AmChartsEl-" + AmCharts.uid
};
//AmCharts.isNN && (document.addEventListener("mousemove", AmCharts.handleMouseMove, !0), window.addEventListener("resize", AmCharts.handleResize, !0), document.addEventListener("mouseup", AmCharts.handleMouseUp, !0), window.addEventListener("load", AmCharts.handleLoad, !0));
//AmCharts.isIE && (document.attachEvent("onmousemove", AmCharts.handleMouseMove), window.attachEvent("onresize", AmCharts.handleResize), document.attachEvent("onmouseup", AmCharts.handleMouseUp), window.attachEvent("onload", AmCharts.handleLoad));

AmCharts.isNN && (document.addEventListener("mousemove", AmCharts.handleMouseMove, !0),  document.addEventListener("mouseup", AmCharts.handleMouseUp, !0), window.addEventListener("load", AmCharts.handleLoad, !0));
AmCharts.isIE && (document.attachEvent("onmousemove", AmCharts.handleMouseMove),  document.attachEvent("onmouseup", AmCharts.handleMouseUp), window.attachEvent("onload", AmCharts.handleLoad));

AmCharts.AmChart = AmCharts.Class({
	construct: function() {
		this.version = "2.8.3";
		AmCharts.addChart(this);
		this.createEvents("dataUpdated", "init");
		this.height = this.width = "100%";
		this.dataChanged = !0;
		this.chartCreated = !1;
		this.previousWidth = this.previousHeight = 0;
		this.backgroundColor = "#FFFFFF";
		this.borderAlpha = this.backgroundAlpha = 0;
		this.color = this.borderColor = "#000000";
		this.fontFamily = "Verdana";
		this.fontSize = 11;
		this.numberFormatter = {
			precision: -1,
			decimalSeparator: ".",
			thousandsSeparator: ","
		};
		this.percentFormatter = {
			precision: 2,
			decimalSeparator: ".",
			thousandsSeparator: ","
		};
		this.labels = [];
		this.allLabels = [];
		this.titles = [];
		this.marginRight = this.marginLeft = this.autoMarginOffset = 0;
		this.timeOuts = [];
		var a = document.createElement("div"),
			b = a.style;
		b.overflow = "hidden";
		b.position = "relative";
		b.textAlign = "left";
		this.chartDiv = a;
		a = document.createElement("div");
		b = a.style;
		b.overflow = "hidden";
		b.position = "relative";
		this.legendDiv = a;
		this.balloon = new AmCharts.AmBalloon;
		this.balloon.chart = this;
		this.titleHeight = 0;
		this.prefixesOfBigNumbers = [{
			number: 1E3,
			prefix: "k"
		}, {
			number: 1E6,
			prefix: "M"
		}, {
			number: 1E9,
			prefix: "G"
		}, {
			number: 1E12,
			prefix: "T"
		}, {
			number: 1E15,
			prefix: "P"
		}, {
			number: 1E18,
			prefix: "E"
		}, {
			number: 1E21,
			prefix: "Z"
		}, {
			number: 1E24,
			prefix: "Y"
		}];
		this.prefixesOfSmallNumbers = [{
			number: 1E-24,
			prefix: "y"
		}, {
			number: 1E-21,
			prefix: "z"
		}, {
			number: 1E-18,
			prefix: "a"
		}, {
			number: 1E-15,
			prefix: "f"
		}, {
			number: 1E-12,
			prefix: "p"
		}, {
			number: 1E-9,
			prefix: "n"
		}, {
			number: 1E-6,
			prefix: "μ"
		}, {
			number: 0.001,
			prefix: "m"
		}];
		this.panEventsEnabled = !1;
		AmCharts.bezierX = 3;
		AmCharts.bezierY = 6;
		this.product = "amcharts"
	},
	drawChart: function() {
		this.drawBackground();
		this.redrawLabels();
		this.drawTitles()
	},
	drawBackground: function() {
		AmCharts.remove(this.background);
		var a = this.container,
			b = this.backgroundColor,
			d = this.backgroundAlpha,
			e = this.set,
			f = this.updateWidth();
		this.realWidth = f;
		var g = this.updateHeight();
		this.realHeight = g;
		this.background = b = AmCharts.polygon(a, [0, f - 1, f - 1, 0], [0, 0, g - 1, g - 1], b, d, 1, this.borderColor, this.borderAlpha);
		e.push(b);
		if (b = this.backgroundImage) this.path && (b = this.path + b), this.bgImg = a = a.image(b, 0, 0, f, g), e.push(a)
	},
	drawTitles: function() {
		var a = this.titles;
		if (AmCharts.ifArray(a)) for (var b = 20, d = 0; d < a.length; d++) {
			var e = a[d],
				f = e.color;
			void 0 == f && (f = this.color);
			var g = e.size;
			isNaN(e.alpha);
			var h = this.marginLeft,
				f = AmCharts.text(this.container, e.text, f, this.fontFamily, g);
			f.translate(h + (this.realWidth - this.marginRight - h) / 2, b);
			h = !0;
			void 0 != e.bold && (h = e.bold);
			h && f.attr({
				"font-weight": "bold"
			});
			b += g + 6;
			this.freeLabelsSet.push(f)
		}
	},
	write: function(a) {
		var b = this.balloon;
		b && !b.chart && (b.chart = this);
		a = "object" != typeof a ? document.getElementById(a) : a;
		a.innerHTML = "";
		this.div = a;
		a.style.overflow = "hidden";
		a.style.textAlign = "left";
		var b = this.chartDiv,
			d = this.legendDiv,
			e = this.legend,
			f = d.style,
			g = b.style;
		this.measure();
		if (e) switch (e.position) {
		case "bottom":
			a.appendChild(b);
			a.appendChild(d);
			break;
		case "top":
			a.appendChild(d);
			a.appendChild(b);
			break;
		case "absolute":
			var h = document.createElement("div"),
				j = h.style;
			j.position = "relative";
			j.width = a.style.width;
			j.height = a.style.height;
			a.appendChild(h);
			f.position = "absolute";
			g.position = "absolute";
			void 0 != e.left && (f.left = e.left + "px");
			void 0 != e.right && (f.right = e.right + "px");
			void 0 != e.top && (f.top = e.top + "px");
			void 0 != e.bottom && (f.bottom = e.bottom + "px");
			e.marginLeft = 0;
			e.marginRight = 0;
			h.appendChild(b);
			h.appendChild(d);
			break;
		case "right":
			h = document.createElement("div");
			j = h.style;
			j.position = "relative";
			j.width = a.style.width;
			j.height = a.style.height;
			a.appendChild(h);
			f.position = "relative";
			g.position = "absolute";
			h.appendChild(b);
			h.appendChild(d);
			break;
		case "left":
			h = document.createElement("div"), j = h.style, j.position = "relative", j.width = a.style.width, j.height = a.style.height, a.appendChild(h), f.position = "absolute", g.position = "relative", h.appendChild(b), h.appendChild(d)
		} else a.appendChild(b);
		this.listenersAdded || (this.addListeners(), this.listenersAdded = !0);
		this.initChart()
	},
	createLabelsSet: function() {
		AmCharts.remove(this.labelsSet);
		this.labelsSet = this.container.set();
		this.freeLabelsSet.push(this.labelsSet)
	},
	initChart: function() {
		this.divIsFixed = AmCharts.findIfFixed(this.chartDiv);
		this.previousHeight = this.realHeight;
		this.previousWidth = this.realWidth;
		this.destroy();
		var a = 0;
		document.attachEvent && !window.opera && (a = 1);
		this.mouseMode = a;
		this.container = new AmCharts.AmDraw(this.chartDiv, this.realWidth, this.realHeight);
		if (AmCharts.VML || AmCharts.SVG) a = this.container, this.set = a.set(), this.gridSet = a.set(), this.graphsBehindSet = a.set(), this.bulletBehindSet = a.set(), this.columnSet = a.set(), this.graphsSet = a.set(), this.trendLinesSet = a.set(), this.axesLabelsSet = a.set(), this.axesSet = a.set(), this.cursorSet = a.set(), this.scrollbarsSet = a.set(), this.bulletSet = a.set(), this.freeLabelsSet = a.set(), this.balloonsSet = a.set(), this.balloonsSet.setAttr("id", "balloons"), this.zoomButtonSet = a.set(), this.linkSet = a.set(), this.drb(), this.renderFix()
	},
	measure: function() {
		var a = this.div,
			b = this.chartDiv,
			d = a.offsetWidth,
			e = a.offsetHeight,
			f = this.container;
		a.clientHeight && (d = a.clientWidth, e = a.clientHeight);
		var g = AmCharts.removePx(AmCharts.getStyle(a, "padding-left")),
			h = AmCharts.removePx(AmCharts.getStyle(a, "padding-right")),
			j = AmCharts.removePx(AmCharts.getStyle(a, "padding-top")),
			k = AmCharts.removePx(AmCharts.getStyle(a, "padding-bottom"));
		isNaN(g) || (d -= g);
		isNaN(h) || (d -= h);
		isNaN(j) || (e -= j);
		isNaN(k) || (e -= k);
		g = a.style;
		a = g.width;
		g = g.height; - 1 != a.indexOf("px") && (d = AmCharts.removePx(a)); - 1 != g.indexOf("px") && (e = AmCharts.removePx(g));
		a = AmCharts.toCoordinate(this.width, d);
		g = AmCharts.toCoordinate(this.height, e);
		if (a != this.previousWidth || g != this.previousHeight) b.style.width = a + "px", b.style.height = g + "px", f && f.setSize(a, g), this.balloon.setBounds(2, 2, a - 2, g);
		this.realWidth = a;
		this.realHeight = g;
		this.divRealWidth = d;
		this.divRealHeight = e
	},
	destroy: function() {
		this.chartDiv.innerHTML = "";
		this.clearTimeOuts()
	},
	clearTimeOuts: function() {
		var a = this.timeOuts;
		if (a) for (var b = 0; b < a.length; b++) clearTimeout(a[b]);
		this.timeOuts = []
	},
	clear: function(a) {
		AmCharts.callMethod("clear", [this.chartScrollbar, this.scrollbarV, this.scrollbarH, this.chartCursor]);
		this.chartCursor = this.scrollbarH = this.scrollbarV = this.chartScrollbar = null;
		this.clearTimeOuts();
		this.container && (this.container.remove(this.chartDiv), this.container.remove(this.legendDiv));
		a || AmCharts.removeChart(this)
	},
	setMouseCursor: function(a) {
		"auto" == a && AmCharts.isNN && (a = "default");
		this.chartDiv.style.cursor = a;
		this.legendDiv.style.cursor = a
	},
	redrawLabels: function() {
		this.labels = [];
		var a = this.allLabels;
		this.createLabelsSet();
		for (var b = 0; b < a.length; b++) this.drawLabel(a[b])
	},
	drawLabel: function(a) {
		if (this.container) {
			var b = a.y,
				d = a.text,
				e = a.align,
				f = a.size,
				g = a.color,
				h = a.rotation,
				j = a.alpha,
				k = a.bold,
				l = AmCharts.toCoordinate(a.x, this.realWidth),
				b = AmCharts.toCoordinate(b, this.realHeight);
			l || (l = 0);
			b || (b = 0);
			void 0 == g && (g = this.color);
			isNaN(f) && (f = this.fontSize);
			e || (e = "start");
			"left" == e && (e = "start");
			"right" == e && (e = "end");
			"center" == e && (e = "middle", h ? b = this.realHeight - b + b / 2 : l = this.realWidth / 2 - l);
			void 0 == j && (j = 1);
			void 0 == h && (h = 0);
			b += f / 2;
			d = AmCharts.text(this.container, d, g, this.fontFamily, f, e, k, j);
			d.translate(l, b);
			0 != h && d.rotate(h);
			a.url && (d.setAttr("cursor", "pointer"), d.click(function() {
				AmCharts.getURL(a.url)
			}));
			this.labelsSet.push(d);
			this.labels.push(d)
		}
	},
	addLabel: function(a, b, d, e, f, g, h, j, k, l) {
		a = {
			x: a,
			y: b,
			text: d,
			align: e,
			size: f,
			color: g,
			alpha: j,
			rotation: h,
			bold: k,
			url: l
		};
		this.container && this.drawLabel(a);
		this.allLabels.push(a)
	},
	clearLabels: function() {
		for (var a = this.labels, b = a.length - 1; 0 <= b; b--) a[b].remove();
		this.labels = [];
		this.allLabels = []
	},
	updateHeight: function() {
		var a = this.divRealHeight,
			b = this.legend;
		if (b) {
			var d = this.legendDiv.offsetHeight,
				b = b.position;
			if ("top" == b || "bottom" == b) a -= d, 0 > a && (a = 0), this.chartDiv.style.height = a + "px"
		}
		return a
	},
	updateWidth: function() {
		var a = this.divRealWidth,
			b = this.divRealHeight,
			d = this.legend;
		if (d) {
			var e = this.legendDiv,
				f = e.offsetWidth,
				g = e.offsetHeight,
				e = e.style,
				h = this.chartDiv.style,
				d = d.position;
			if ("right" == d || "left" == d) a -= f, 0 > a && (a = 0), h.width = a + "px", "left" == d ? h.left = f + "px" : e.left = a + "px", e.top = (b - g) / 2 + "px"
		}
		return a
	},
	getTitleHeight: function() {
		var a = 0,
			b = this.titles;
		if (0 < b.length) for (var a = 15, d = 0; d < b.length; d++) a += b[d].size + 6;
		return a
	},
	addTitle: function(a, b, d, e, f) {
		isNaN(b) && (b = this.fontSize + 2);
		a = {
			text: a,
			size: b,
			color: d,
			alpha: e,
			bold: f
		};
		this.titles.push(a);
		return a
	},
	addListeners: function() {
		var a = this,
			b = a.chartDiv;
		AmCharts.isNN && (a.panEventsEnabled && "ontouchstart" in document.documentElement && (b.addEventListener("touchstart", function(b) {
			a.handleTouchMove.call(a, b);
			a.handleTouchStart.call(a, b)
		}, !0), b.addEventListener("touchmove", function(b) {
			a.handleTouchMove.call(a, b)
		}, !0), b.addEventListener("touchend", function(b) {
			a.handleTouchEnd.call(a, b)
		}, !0)), b.addEventListener("mousedown", function(b) {
			a.handleMouseDown.call(a, b)
		}, !0), b.addEventListener("mouseover", function(b) {
			a.handleMouseOver.call(a, b)
		}, !0), b.addEventListener("mouseout", function(b) {
			a.handleMouseOut.call(a, b)
		}, !0));
		AmCharts.isIE && (b.attachEvent("onmousedown", function(b) {
			a.handleMouseDown.call(a, b)
		}), b.attachEvent("onmouseover", function(b) {
			a.handleMouseOver.call(a, b)
		}), b.attachEvent("onmouseout", function(b) {
			a.handleMouseOut.call(a, b)
		}))
	},
	dispDUpd: function() {
		var a;
		this.dispatchDataUpdated && (this.dispatchDataUpdated = !1, a = "dataUpdated", this.fire(a, {
			type: a,
			chart: this
		}));
		this.chartCreated || (a = "init", this.fire(a, {
			type: a,
			chart: this
		}))
	},
	drb: function() {
		var a = this.product,
			b = a + ".com",
			d = window.location.hostname.split(".");
		if (2 <= d.length) var e = d[d.length - 2] + "." + d[d.length - 1];
		AmCharts.remove(this.bbset);
		// bo change 2013-1-5 
		if (e == b) {
			var b = b + "/?utm_source=swf&utm_medium=demo&utm_campaign=jsDemo" + a,
				f = "chart by ",
				d = 145;
			"ammap" == a && (f = "tool by ", d = 125);
			e = AmCharts.rect(this.container, d, 20, "#FFFFFF", 1);
			f = AmCharts.text(this.container, f + a + ".com", "#000000", "Verdana", 11, "start");
			f.translate(7, 9);
			e = this.container.set([e, f]);
			"ammap" == a && e.translate(this.realWidth - d, 0);
			this.bbset = e;
			this.linkSet.push(e);
			e.setAttr("cursor", "pointer");
			e.click(function() {
				window.location.href = "http://" + b
			});
			for (a = 0; a < e.length; a++) e[a].attr({
				cursor: "pointer"
			})
		}
	},
	validateSize: function() {
		var a = this;
		a.measure();
		var b = a.legend;
		if ((a.realWidth != a.previousWidth || a.realHeight != a.previousHeight) && 0 < a.realWidth && 0 < a.realHeight) {
			a.sizeChanged = !0;
			if (b) {
				clearTimeout(a.legendInitTO);
				var d = setTimeout(function() {
					b.invalidateSize()
				}, 100);
				a.timeOuts.push(d);
				a.legendInitTO = d
			}
			a.marginsUpdated = !1;
			clearTimeout(a.initTO);
			d = setTimeout(function() {
				a.initChart()
			}, 150);
			a.timeOuts.push(d);
			a.initTO = d
		}
		a.renderFix();
		b && b.renderFix()
	},
	invalidateSize: function() {
		var a = this;
		a.previousWidth = NaN;
		a.previousHeight = NaN;
		a.marginsUpdated = !1;
		clearTimeout(a.validateTO);
		var b = setTimeout(function() {
			a.validateSize()
		}, 5);
		a.timeOuts.push(b);
		a.validateTO = b
	},
	validateData: function(a) {
		this.chartCreated && (this.dataChanged = !0, this.marginsUpdated = !1, this.initChart(a))
	},
	validateNow: function() {
		this.listenersAdded = !1;
		this.write(this.div)
	},
	showItem: function(a) {
		a.hidden = !1;
		this.initChart()
	},
	hideItem: function(a) {
		a.hidden = !0;
		this.initChart()
	},
	hideBalloon: function() {
		var a = this;
		a.hoverInt = setTimeout(function() {
			a.hideBalloonReal.call(a)
		}, 80)
	},
	cleanChart: function() {},
	hideBalloonReal: function() {
		var a = this.balloon;
		a && a.hide()
	},
	showBalloon: function(a, b, d, e, f) {
		var g = this;
		clearTimeout(g.balloonTO);
		g.balloonTO = setTimeout(function() {
			g.showBalloonReal.call(g, a, b, d, e, f)
		}, 1)
	},
	showBalloonReal: function(a, b, d, e, f) {
		this.handleMouseMove();
		var g = this.balloon;
		g.enabled && (g.followCursor(!1), g.changeColor(b), d || g.setPosition(e, f), g.followCursor(d), a && g.showBalloon(a))
	},
	handleTouchMove: function(a) {
		this.hideBalloon();
		var b = this.chartDiv;
		a.touches && (a = a.touches.item(0), this.mouseX = a.pageX - AmCharts.findPosX(b), this.mouseY = a.pageY - AmCharts.findPosY(b))
	},
	handleMouseOver: function() {
		AmCharts.resetMouseOver();
		this.mouseIsOver = !0
	},
	handleMouseOut: function() {
		AmCharts.resetMouseOver();
		this.mouseIsOver = !1
	},
	handleMouseMove: function(a) {
		if (this.mouseIsOver) {
			this.mouseCounter--;
			var b = this.chartDiv;
			a || (a = window.event);
			var d, e;
			if (a) {
				this.posX = AmCharts.findPosX(b);
				this.posY = AmCharts.findPosY(b);
				switch (this.mouseMode) {
				case 1:
					d = a.clientX - this.posX;
					e = a.clientY - this.posY;
					if (!this.divIsFixed) {
						if (a = document.body) var f = a.scrollLeft,
							g = a.scrollTop;
						if (a = document.documentElement) var h = a.scrollLeft,
							j = a.scrollTop;
						f = Math.max(f, h);
						g = Math.max(g, j);
						d += f;
						e += g
					}
					break;
				case 0:
					this.divIsFixed ? (d = a.clientX - this.posX, e = a.clientY - this.posY) : (d = a.pageX - this.posX, e = a.pageY - this.posY)
				}
				this.mouseX = d;
				this.mouseY = e
			}
		}
	},
	handleTouchStart: function(a) {
		this.handleMouseDown(a)
	},
	handleTouchEnd: function(a) {
		AmCharts.resetMouseOver();
		this.handleReleaseOutside(a)
	},
	handleReleaseOutside: function() {},
	handleMouseDown: function(a) {
		AmCharts.resetMouseOver();
		this.mouseIsOver = !0;
		a && a.preventDefault && a.preventDefault()
	},
	addLegend: function(a) {
		AmCharts.extend(a, new AmCharts.AmLegend);
		this.legend = a;
		a.chart = this;
		a.div = this.legendDiv;
		var b = this.handleLegendEvent;
		this.listenTo(a, "showItem", b);
		this.listenTo(a, "hideItem", b);
		this.listenTo(a, "clickMarker", b);
		this.listenTo(a, "rollOverItem", b);
		this.listenTo(a, "rollOutItem", b);
		this.listenTo(a, "rollOverMarker", b);
		this.listenTo(a, "rollOutMarker", b);
		this.listenTo(a, "clickLabel", b)
	},
	removeLegend: function() {
		this.legend = void 0;
		this.legendDiv.innerHTML = ""
	},
	handleResize: function() {
		(AmCharts.isPercents(this.width) || AmCharts.isPercents(this.height)) && this.invalidateSize();
		this.renderFix()
	},
	renderFix: function() {
		if (!AmCharts.VML) {
			var a = this.container;
			a && a.renderFix()
		}
	},
	getSVG: function() {
		if (AmCharts.hasSVG) return this.container
	}
});
AmCharts.Slice = AmCharts.Class({
	construct: function() {}
});
AmCharts.SerialDataItem = AmCharts.Class({
	construct: function() {}
});
AmCharts.GraphDataItem = AmCharts.Class({
	construct: function() {}
});
AmCharts.Guide = AmCharts.Class({
	construct: function() {}
});
AmCharts.toBoolean = function(a, b) {
	if (void 0 == a) return b;
	switch (String(a).toLowerCase()) {
	case "true":
	case "yes":
	case "1":
		return !0;
	case "false":
	case "no":
	case "0":
	case null:
		return !1;
	default:
		return Boolean(a)
	}
};
AmCharts.removeFromArray = function(a, b) {
	for (var d = a.length - 1; 0 <= d; d--) a[d] == b && a.splice(d, 1)
};
AmCharts.getStyle = function(a, b) {
	var d = "";
	document.defaultView && document.defaultView.getComputedStyle ? d = document.defaultView.getComputedStyle(a, "").getPropertyValue(b) : a.currentStyle && (b = b.replace(/\-(\w)/g, function(a, b) {
		return b.toUpperCase()
	}), d = a.currentStyle[b]);
	return d
};
AmCharts.removePx = function(a) {
	return Number(a.substring(0, a.length - 2))
};
AmCharts.getURL = function(a, b) {
	if (a) if ("_self" == b || !b) window.location.href = a;
	else if ("_top" == b && window.top) window.top.location.href = a;
	else if ("_parent" == b && window.parent) window.parent.location.href = a;
	else {
		var d = document.getElementsByName(b)[0];
		d ? d.src = a : window.open(a)
	}
};
AmCharts.formatMilliseconds = function(a, b) {
	if (-1 != a.indexOf("fff")) {
		var d = b.getMilliseconds(),
			e = String(d);
		10 > d && (e = "00" + d);
		10 <= d && 100 > d && (e = "0" + d);
		a = a.replace(/fff/g, e)
	}
	return a
};
AmCharts.ifArray = function(a) {
	return a && 0 < a.length ? !0 : !1
};
AmCharts.callMethod = function(a, b) {
	for (var d = 0; d < b.length; d++) {
		var e = b[d];
		if (e) {
			if (e[a]) e[a]();
			var f = e.length;
			if (0 < f) for (var g = 0; g < f; g++) {
				var h = e[g];
				if (h && h[a]) h[a]()
			}
		}
	}
};
AmCharts.toNumber = function(a) {
	return "number" == typeof a ? a : Number(String(a).replace(/[^0-9\-.]+/g, ""))
};
AmCharts.toColor = function(a) {
	if ("" != a && void 0 != a) if (-1 != a.indexOf(",")) {
		a = a.split(",");
		for (var b = 0; b < a.length; b++) {
			var d = a[b].substring(a[b].length - 6, a[b].length);
			a[b] = "#" + d
		}
	} else a = a.substring(a.length - 6, a.length), a = "#" + a;
	return a
};
AmCharts.toCoordinate = function(a, b, d) {
	var e;
	void 0 != a && (a = String(a), d && d < b && (b = d), e = Number(a), -1 != a.indexOf("!") && (e = b - Number(a.substr(1))), -1 != a.indexOf("%") && (e = b * Number(a.substr(0, a.length - 1)) / 100));
	return e
};
AmCharts.fitToBounds = function(a, b, d) {
	a < b && (a = b);
	a > d && (a = d);
	return a
};
AmCharts.isDefined = function(a) {
	return void 0 == a ? !1 : !0
};
AmCharts.stripNumbers = function(a) {
	return a.replace(/[0-9]+/g, "")
};
AmCharts.extractPeriod = function(a) {
	var b = AmCharts.stripNumbers(a),
		d = 1;
	b != a && (d = Number(a.slice(0, a.indexOf(b))));
	return {
		period: b,
		count: d
	}
};
AmCharts.resetDateToMin = function(a, b, d, e) {
	void 0 == e && (e = 1);
	var f = a.getFullYear(),
		g = a.getMonth(),
		h = a.getDate(),
		j = a.getHours(),
		k = a.getMinutes(),
		l = a.getSeconds(),
		m = a.getMilliseconds();
	a = a.getDay();
	switch (b) {
	case "YYYY":
		f = Math.floor(f / d) * d;
		g = 0;
		h = 1;
		m = l = k = j = 0;
		break;
	case "MM":
		g = Math.floor(g / d) * d;
		h = 1;
		m = l = k = j = 0;
		break;
	case "WW":
		0 == a && 0 < e && (a = 7);
		h = h - a + e;
		m = l = k = j = 0;
		break;
	case "DD":
		h = Math.floor(h / d) * d;
		m = l = k = j = 0;
		break;
	case "hh":
		j = Math.floor(j / d) * d;
		m = l = k = 0;
		break;
	case "mm":
		k = Math.floor(k / d) * d;
		m = l = 0;
		break;
	case "ss":
		l = Math.floor(l / d) * d;
		m = 0;
		break;
	case "fff":
		m = Math.floor(m / d) * d
	}
	return a = new Date(f, g, h, j, k, l, m)
};
AmCharts.getPeriodDuration = function(a, b) {
	void 0 == b && (b = 1);
	var d;
	switch (a) {
	case "YYYY":
		d = 316224E5;
		break;
	case "MM":
		d = 26784E5;
		break;
	case "WW":
		d = 6048E5;
		break;
	case "DD":
		d = 864E5;
		break;
	case "hh":
		d = 36E5;
		break;
	case "mm":
		d = 6E4;
		break;
	case "ss":
		d = 1E3;
		break;
	case "fff":
		d = 1
	}
	return d * b
};
AmCharts.roundTo = function(a, b) {
	if (0 > b) return a;
	var d = Math.pow(10, b);
	return Math.round(a * d) / d
};
AmCharts.toFixed = function(a, b) {
	var d = String(Math.round(a * Math.pow(10, b)));
	if (0 < b) {
		var e = d.length;
		if (e < b) for (var f = 0; f < b - e; f++) d = "0" + d;
		e = d.substring(0, d.length - b);
		"" == e && (e = 0);
		return e + "." + d.substring(d.length - b, d.length)
	}
	return String(d)
};
AmCharts.intervals = {
	s: {
		nextInterval: "ss",
		contains: 1E3
	},
	ss: {
		nextInterval: "mm",
		contains: 60,
		count: 0
	},
	mm: {
		nextInterval: "hh",
		contains: 60,
		count: 1
	},
	hh: {
		nextInterval: "DD",
		contains: 24,
		count: 2
	},
	DD: {
		nextInterval: "",
		contains: Infinity,
		count: 3
	}
};
AmCharts.getMaxInterval = function(a, b) {
	var d = AmCharts.intervals;
	return a >= d[b].contains ? (a = Math.round(a / d[b].contains), b = d[b].nextInterval, AmCharts.getMaxInterval(a, b)) : "ss" == b ? d[b].nextInterval : b
};
AmCharts.formatDuration = function(a, b, d, e, f, g) {
	var h = AmCharts.intervals,
		j = g.decimalSeparator;
	if (a >= h[b].contains) {
		var k = a - Math.floor(a / h[b].contains) * h[b].contains;
		"ss" == b && (k = AmCharts.formatNumber(k, g), 1 == k.split(j)[0].length && (k = "0" + k));
		if (("mm" == b || "hh" == b) && 10 > k) k = "0" + k;
		d = k + "" + e[b] + "" + d;
		a = Math.floor(a / h[b].contains);
		b = h[b].nextInterval;
		return AmCharts.formatDuration(a, b, d, e, f, g)
	}
	"ss" == b && (a = AmCharts.formatNumber(a, g), 1 == a.split(j)[0].length && (a = "0" + a));
	if (("mm" == b || "hh" == b) && 10 > a) a = "0" + a;
	d = a + "" + e[b] + "" + d;
	if (h[f].count > h[b].count) for (a = h[b].count; a < h[f].count; a++) b = h[b].nextInterval, "ss" == b || "mm" == b || "hh" == b ? d = "00" + e[b] + "" + d : "DD" == b && (d = "0" + e[b] + "" + d);
	":" == d.charAt(d.length - 1) && (d = d.substring(0, d.length - 1));
	return d
};
AmCharts.formatNumber = function(a, b, d, e, f) {
	a = AmCharts.roundTo(a, b.precision);
	isNaN(d) && (d = b.precision);
	var g = b.decimalSeparator;
	b = b.thousandsSeparator;
	var h = 0 > a ? "-" : "";
	a = Math.abs(a);
	var j = String(a),
		k = !1; - 1 != j.indexOf("e") && (k = !0);
	0 <= d && (0 != a && !k) && (j = AmCharts.toFixed(a, d));
	if (k) k = j;
	else {
		for (var j = j.split("."), k = "", l = String(j[0]), m = l.length; 0 <= m; m -= 3) k = m != l.length ? 0 != m ? l.substring(m - 3, m) + b + k : l.substring(m - 3, m) + k : l.substring(m - 3, m);
		void 0 != j[1] && (k = k + g + j[1]);
		void 0 != d && (0 < d && "0" != k) && (k = AmCharts.addZeroes(k, g, d))
	}
	k = h + k;
	"" == h && (!0 == e && 0 != a) && (k = "+" + k);
	!0 == f && (k += "%");
	return k
};
AmCharts.addZeroes = function(a, b, d) {
	a = a.split(b);
	void 0 == a[1] && 0 < d && (a[1] = "0");
	return a[1].length < d ? (a[1] += "0", AmCharts.addZeroes(a[0] + b + a[1], b, d)) : void 0 != a[1] ? a[0] + b + a[1] : a[0]
};
AmCharts.scientificToNormal = function(a) {
	var b;
	a = String(a).split("e");
	if ("-" == a[1].substr(0, 1)) {
		b = "0.";
		for (var d = 0; d < Math.abs(Number(a[1])) - 1; d++) b += "0";
		b += a[0].split(".").join("")
	} else {
		var e = 0;
		b = a[0].split(".");
		b[1] && (e = b[1].length);
		b = a[0].split(".").join("");
		for (d = 0; d < Math.abs(Number(a[1])) - e; d++) b += "0"
	}
	return b
};
AmCharts.toScientific = function(a, b) {
	if (0 == a) return "0";
	var d = Math.floor(Math.log(Math.abs(a)) * Math.LOG10E);
	Math.pow(10, d);
	mantissa = String(mantissa).split(".").join(b);
	return String(mantissa) + "e" + d
};
AmCharts.randomColor = function() {
	return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6)
};
AmCharts.hitTest = function(a, b, d) {
	var e = !1,
		f = a.x,
		g = a.x + a.width,
		h = a.y,
		j = a.y + a.height,
		k = AmCharts.isInRectangle;
	e || (e = k(f, h, b));
	e || (e = k(f, j, b));
	e || (e = k(g, h, b));
	e || (e = k(g, j, b));
	!e && !0 != d && (e = AmCharts.hitTest(b, a, !0));
	return e
};
AmCharts.isInRectangle = function(a, b, d) {
	return a >= d.x - 5 && a <= d.x + d.width + 5 && b >= d.y - 5 && b <= d.y + d.height + 5 ? !0 : !1
};
AmCharts.isPercents = function(a) {
	if (-1 != String(a).indexOf("%")) return !0
};
//AmCharts.dayNames = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
//AmCharts.shortDayNames = "Sun Mon Tue Wed Thu Fri Sat".split(" ");
//AmCharts.monthNames = "January February March April May June July August September October November December".split(" ");
//AmCharts.shortMonthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");


AmCharts.dayNames = "星期日 星期一 星期二 星期三 星期四 星期五 星期六".split(" ");
AmCharts.shortDayNames = "周日 周一 周二 周三 周四 周五 周六".split(" ");
AmCharts.monthNames = "一月份 二月份 三月份 四月份 五月份 六月份 七月份 八月份 九月份 十月份 十一月份 十二月份".split(" ");
AmCharts.shortMonthNames = "一月 二月 三月 四月 五月 六月 七月 八月 九月 十月 十一月 十二月".split(" ");

AmCharts.formatDate = function(a, b) {
	var d, e, f, g, h, j, k, l;
	AmCharts.useUTC ? (d = a.getUTCFullYear(), e = a.getUTCMonth(), f = a.getUTCDate(), g = a.getUTCDay(), h = a.getUTCHours(), j = a.getUTCMinutes(), k = a.getUTCSeconds(), l = a.getUTCMilliseconds()) : (d = a.getFullYear(), e = a.getMonth(), f = a.getDate(), g = a.getDay(), h = a.getHours(), j = a.getMinutes(), k = a.getSeconds(), l = a.getMilliseconds());
	var m = String(d).substr(2, 2),
		n = e + 1;
	9 > e && (n = "0" + n);
	var t = f;
	10 > f && (t = "0" + f);
	var r = "0" + g,
		q = h;
	24 == q && (q = 0);
	var p = q;
	10 > p && (p = "0" + p);
	b = b.replace(/JJ/g, p);
	b = b.replace(/J/g, q);
	q = h;
	0 == q && (q = 24);
	p = q;
	10 > p && (p = "0" + p);
	b = b.replace(/HH/g, p);
	b = b.replace(/H/g, q);
	q = h;
	11 < q && (q -= 12);
	p = q;
	10 > p && (p = "0" + p);
	b = b.replace(/KK/g, p);
	b = b.replace(/K/g, q);
	q = h;
	0 == q && (q = 12);
	12 < q && (q -= 12);
	p = q;
	10 > p && (p = "0" + p);
	b = b.replace(/LL/g, p);
	b = b.replace(/L/g, q);
	q = j;
	10 > q && (q = "0" + q);
	b = b.replace(/NN/g, q);
	b = b.replace(/N/g, j);
	j = k;
	10 > j && (j = "0" + j);
	b = b.replace(/SS/g, j);
	b = b.replace(/S/g, k);
	k = l;
	10 > k && (k = "00" + k);
	100 > k && (k = "0" + k);
	j = l;
	10 > j && (j = "00" + j);
	b = b.replace(/QQQ/g, k);
	b = b.replace(/QQ/g, j);
	b = b.replace(/Q/g, l);
	b = 12 > h ? b.replace(/A/g, "am") : b.replace(/A/g, "pm");
	b = b.replace(/YYYY/g, "@IIII@");
	b = b.replace(/YY/g, "@II@");
	b = b.replace(/MMMM/g, "@XXXX@");
	b = b.replace(/MMM/g, "@XXX@");
	b = b.replace(/MM/g, "@XX@");
	b = b.replace(/M/g, "@X@");
	b = b.replace(/DD/g, "@RR@");
	b = b.replace(/D/g, "@R@");
	b = b.replace(/EEEE/g, "@PPPP@");
	b = b.replace(/EEE/g, "@PPP@");
	b = b.replace(/EE/g, "@PP@");
	b = b.replace(/E/g, "@P@");
	b = b.replace(/@IIII@/g, d);
	b = b.replace(/@II@/g, m);
	b = b.replace(/@XXXX@/g, AmCharts.monthNames[e]);
	b = b.replace(/@XXX@/g, AmCharts.shortMonthNames[e]);
	b = b.replace(/@XX@/g, n);
	b = b.replace(/@X@/g, e + 1);
	b = b.replace(/@RR@/g, t);
	b = b.replace(/@R@/g, f);
	b = b.replace(/@PPPP@/g, AmCharts.dayNames[g]);
	b = b.replace(/@PPP@/g, AmCharts.shortDayNames[g]);
	b = b.replace(/@PP@/g, r);
	return b = b.replace(/@P@/g, g)
};
AmCharts.findPosX = function(a) {
	var b = a,
		d = a.offsetLeft;
	if (a.offsetParent) {
		for (; a = a.offsetParent;) d += a.offsetLeft;
		for (;
		(b = b.parentNode) && b != document.body;) d -= b.scrollLeft || 0
	}
	return d
};
AmCharts.findPosY = function(a) {
	var b = a,
		d = a.offsetTop;
	if (a.offsetParent) {
		for (; a = a.offsetParent;) d += a.offsetTop;
		for (;
		(b = b.parentNode) && b != document.body;) d -= b.scrollTop || 0
	}
	return d
};
AmCharts.findIfFixed = function(a) {
	if (a.offsetParent) for (; a = a.offsetParent;) if ("fixed" == AmCharts.getStyle(a, "position")) return !0;
	return !1
};
AmCharts.findIfAuto = function(a) {
	return a.style && "auto" == AmCharts.getStyle(a, "overflow") ? !0 : a.parentNode ? AmCharts.findIfAuto(a.parentNode) : !1
};
AmCharts.findScrollLeft = function(a, b) {
	a.scrollLeft && (b += a.scrollLeft);
	return a.parentNode ? AmCharts.findScrollLeft(a.parentNode, b) : b
};
AmCharts.findScrollTop = function(a, b) {
	a.scrollTop && (b += a.scrollTop);
	return a.parentNode ? AmCharts.findScrollTop(a.parentNode, b) : b
};
AmCharts.formatValue = function(a, b, d, e, f, g, h, j) {
	if (b) {
		void 0 == f && (f = "");
		for (var k = 0; k < d.length; k++) {
			var l = d[k],
				m = b[l];
			void 0 != m && (m = g ? AmCharts.addPrefix(m, j, h, e) : AmCharts.formatNumber(m, e), a = a.replace(RegExp("\\[\\[" + f + "" + l + "\\]\\]", "g"), m))
		}
	}
	return a
};
AmCharts.formatDataContextValue = function(a, b) {
	if (a) for (var d = a.match(/\[\[.*?\]\]/g), e = 0; e < d.length; e++) {
		var f = d[e],
			f = f.substr(2, f.length - 4);
		void 0 != b[f] && (a = a.replace(RegExp("\\[\\[" + f + "\\]\\]", "g"), b[f]))
	}
	return a
};
AmCharts.massReplace = function(a, b) {
	for (var d in b) {
		var e = b[d];
		void 0 == e && (e = "");
		a = a.replace(d, e)
	}
	return a
};
AmCharts.cleanFromEmpty = function(a) {
	return a.replace(/\[\[[^\]]*\]\]/g, "")
};
AmCharts.addPrefix = function(a, b, d, e) {
	var f = AmCharts.formatNumber(a, e),
		g = "",
		h;
	if (0 == a) return "0";
	0 > a && (g = "-");
	a = Math.abs(a);
	if (1 < a) for (h = b.length - 1; - 1 < h; h--) {
		if (a >= b[h].number) {
			a /= b[h].number;
			e = Number(e.precision);
			1 > e && (e = 1);
			a = AmCharts.roundTo(a, e);
			f = g + "" + a + "" + b[h].prefix;
			break
		}
	} else for (h = 0; h < d.length; h++) if (a <= d[h].number) {
		a /= d[h].number;
		e = Math.abs(Math.round(Math.log(a) * Math.LOG10E));
		a = AmCharts.roundTo(a, e);
		f = g + "" + a + "" + d[h].prefix;
		break
	}
	return f
};
AmCharts.remove = function(a) {
	a && a.remove()
};
AmCharts.copyProperties = function(a, b) {
	for (var d in a)"events" != d && (void 0 != a[d] && "function" != typeof a[d]) && (b[d] = a[d])
};
AmCharts.recommended = function() {
	var a = "js";
	document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") || swfobject && swfobject.hasFlashPlayerVersion("8") && (a = "flash");
	return a
};
AmCharts.getEffect = function(a) {
	">" == a && (a = "easeOutSine");
	"<" == a && (a = "easeInSine");
	"elastic" == a && (a = "easeOutElastic");
	return a
};
AmCharts.extend = function(a, b) {
	for (var d in b) void 0 == a[d] && (a[d] = b[d])
};
AmCharts.fixNewLines = function(a) {
	9 > AmCharts.IEversion && 0 < AmCharts.IEversion && (a = AmCharts.massReplace(a, {
		"\n": "\r"
	}));
	return a
};
AmCharts.Bezier = AmCharts.Class({
	construct: function(a, b, d, e, f, g, h, j, k, l) {
		"object" == typeof h && (h = h[0]);
		"object" == typeof j && (j = j[0]);
		g = {
			fill: h,
			"fill-opacity": j,
			"stroke-width": g
		};
		void 0 != k && 0 < k && (g["stroke-dasharray"] = k);
		isNaN(f) || (g["stroke-opacity"] = f);
		e && (g.stroke = e);
		e = "M" + Math.round(b[0]) + "," + Math.round(d[0]);
		f = [];
		for (k = 0; k < b.length; k++) f.push({
			x: Number(b[k]),
			y: Number(d[k])
		});
		1 < f.length && (b = this.interpolate(f), e += this.drawBeziers(b));
		l ? e += l : AmCharts.VML || (e += "M0,0 L0,0");
		this.path = a.path(e).attr(g)
	},
	interpolate: function(a) {
		var b = [];
		b.push({
			x: a[0].x,
			y: a[0].y
		});
		var d = a[1].x - a[0].x,
			e = a[1].y - a[0].y,
			f = AmCharts.bezierX,
			g = AmCharts.bezierY;
		b.push({
			x: a[0].x + d / f,
			y: a[0].y + e / g
		});
		for (var h = 1; h < a.length - 1; h++) {
			var j = a[h - 1],
				k = a[h],
				e = a[h + 1],
				d = e.x - k.x,
				e = e.y - j.y,
				j = k.x - j.x;
			j > d && (j = d);
			b.push({
				x: k.x - j / f,
				y: k.y - e / g
			});
			b.push({
				x: k.x,
				y: k.y
			});
			b.push({
				x: k.x + j / f,
				y: k.y + e / g
			})
		}
		e = a[a.length - 1].y - a[a.length - 2].y;
		d = a[a.length - 1].x - a[a.length - 2].x;
		b.push({
			x: a[a.length - 1].x - d / f,
			y: a[a.length - 1].y - e / g
		});
		b.push({
			x: a[a.length - 1].x,
			y: a[a.length - 1].y
		});
		return b
	},
	drawBeziers: function(a) {
		for (var b = "", d = 0; d < (a.length - 1) / 3; d++) b += this.drawBezierMidpoint(a[3 * d], a[3 * d + 1], a[3 * d + 2], a[3 * d + 3]);
		return b
	},
	drawBezierMidpoint: function(a, b, d, e) {
		var f = Math.round,
			g = this.getPointOnSegment(a, b, 0.75),
			h = this.getPointOnSegment(e, d, 0.75),
			j = (e.x - a.x) / 16,
			k = (e.y - a.y) / 16,
			l = this.getPointOnSegment(a, b, 0.375);
		a = this.getPointOnSegment(g, h, 0.375);
		a.x -= j;
		a.y -= k;
		b = this.getPointOnSegment(h, g, 0.375);
		b.x += j;
		b.y += k;
		d = this.getPointOnSegment(e, d, 0.375);
		j = this.getMiddle(l, a);
		g = this.getMiddle(g, h);
		h = this.getMiddle(b, d);
		l = " Q" + f(l.x) + "," + f(l.y) + "," + f(j.x) + "," + f(j.y);
		l += " Q" + f(a.x) + "," + f(a.y) + "," + f(g.x) + "," + f(g.y);
		l += " Q" + f(b.x) + "," + f(b.y) + "," + f(h.x) + "," + f(h.y);
		return l += " Q" + f(d.x) + "," + f(d.y) + "," + f(e.x) + "," + f(e.y)
	},
	getMiddle: function(a, b) {
		return {
			x: (a.x + b.x) / 2,
			y: (a.y + b.y) / 2
		}
	},
	getPointOnSegment: function(a, b, d) {
		return {
			x: a.x + (b.x - a.x) * d,
			y: a.y + (b.y - a.y) * d
		}
	}
});
AmCharts.Cuboid = AmCharts.Class({
	construct: function(a, b, d, e, f, g, h, j, k, l, m, n, t) {
		this.set = a.set();
		this.container = a;
		this.h = Math.round(d);
		this.w = Math.round(b);
		this.dx = e;
		this.dy = f;
		this.colors = g;
		this.alpha = h;
		this.bwidth = j;
		this.bcolor = k;
		this.balpha = l;
		this.colors = g;
		t ? 0 > b && 0 == m && (m = 180) : 0 > d && 270 == m && (m = 90);
		this.gradientRotation = m;
		0 == e && 0 == f && (this.cornerRadius = n);
		this.draw()
	},
	draw: function() {
		var a = this.set;
		a.clear();
		var b = this.container,
			d = this.w,
			e = this.h,
			f = this.dx,
			g = this.dy,
			h = this.colors,
			j = this.alpha,
			k = this.bwidth,
			l = this.bcolor,
			m = this.balpha,
			n = this.gradientRotation,
			t = this.cornerRadius,
			r = h,
			q = h;
		"object" == typeof h && (r = h[0], q = h[h.length - 1]);
		if (0 < f || 0 < g) {
			var p = q,
				q = AmCharts.adjustLuminosity(r, -0.2),
				q = AmCharts.adjustLuminosity(r, -0.2),
				s = AmCharts.polygon(b, [0, f, d + f, d, 0], [0, g, g, 0, 0], q, j, 0, 0, 0, n);
			if (0 < m) var u = AmCharts.line(b, [0, f, d + f], [0, g, g], l, m, k);
			var v = AmCharts.polygon(b, [0, 0, d, d, 0], [0, e, e, 0, 0], q, j, 0, 0, 0, 0, n);
			v.translate(f, g);
			if (0 < m) var y = AmCharts.line(b, [f, f], [g, g + e], l, 1, k);
			var z = AmCharts.polygon(b, [0, 0, f, f, 0], [0, e, e + g, g, 0], q, j, 0, 0, 0, n),
				A = AmCharts.polygon(b, [d, d, d + f, d + f, d], [0, e, e + g, g, 0], q, j, 0, 0, 0, n);
			if (0 < m) var w = AmCharts.line(b, [d, d + f, d + f, d], [0, g, e + g, e], l, m, k);
			q = AmCharts.adjustLuminosity(p, 0.2);
			p = AmCharts.polygon(b, [0, f, d + f, d, 0], [e, e + g, e + g, e, e], q, j, 0, 0, 0, n);
			if (0 < m) var x = AmCharts.line(b, [0, f, d + f], [e, e + g, e + g], l, m, k)
		}
		1 > Math.abs(e) && (e = 0);
		1 > Math.abs(d) && (d = 0);
		b = 0 == e ? AmCharts.line(b, [0, d], [0, 0], r, m, k) : 0 == d ? AmCharts.line(b, [0, 0], [0, e], r, m, k) : 0 < t ? AmCharts.rect(b, d, e, h, j, k, l, m, t, n) : AmCharts.polygon(b, [0, 0, d, d, 0], [0, e, e, 0, 0], h, j, k, l, m, n);
		e = 0 > e ? [s, u, v, y, z, A, w, p, x, b] : [p, x, v, y, z, A, s, u, w, b];
		for (s = 0; s < e.length; s++)(u = e[s]) && a.push(u)
	},
	width: function(a) {
		this.w = a;
		this.draw()
	},
	height: function(a) {
		this.h = a;
		this.draw()
	},
	animateHeight: function(a, b) {
		var d = this;
		d.easing = b;
		d.totalFrames = 1E3 * a / AmCharts.updateRate;
		d.rh = d.h;
		d.frame = 0;
		d.height(1);
		setTimeout(function() {
			d.updateHeight.call(d)
		}, AmCharts.updateRate)
	},
	updateHeight: function() {
		var a = this;
		a.frame++;
		var b = a.totalFrames;
		a.frame <= b && (b = a.easing(0, a.frame, 1, a.rh - 1, b), a.height(b), setTimeout(function() {
			a.updateHeight.call(a)
		}, AmCharts.updateRate))
	},
	animateWidth: function(a, b) {
		var d = this;
		d.easing = b;
		d.totalFrames = 1E3 * a / AmCharts.updateRate;
		d.rw = d.w;
		d.frame = 0;
		d.width(1);
		setTimeout(function() {
			d.updateWidth.call(d)
		}, AmCharts.updateRate)
	},
	updateWidth: function() {
		var a = this;
		a.frame++;
		var b = a.totalFrames;
		a.frame <= b && (b = a.easing(0, a.frame, 1, a.rw - 1, b), a.width(b), setTimeout(function() {
			a.updateWidth.call(a)
		}, AmCharts.updateRate))
	}
});
AmCharts.AmLegend = AmCharts.Class({
	construct: function() {
		this.createEvents("rollOverMarker", "rollOverItem", "rollOutMarker", "rollOutItem", "showItem", "hideItem", "clickMarker", "rollOverItem", "rollOutItem", "clickLabel");
		this.position = "bottom";
		this.borderColor = this.color = "#000000";
		this.borderAlpha = 0;
		this.markerLabelGap = 5;
		this.verticalGap = 10;
		this.align = "left";
		this.horizontalGap = 0;
		this.spacing = 10;
		this.markerDisabledColor = "#AAB3B3";
		this.markerType = "square";
		this.markerSize = 16;
		this.markerBorderAlpha;
		this.markerBorderThickness = 1;
		this.marginBottom = this.marginTop = 0;
		this.marginLeft = this.marginRight = 20;
		this.autoMargins = !0;
		this.valueWidth = 50;
		this.switchable = !0;
		this.switchType = "x";
		this.switchColor = "#FFFFFF";
		this.rollOverColor = "#CC0000";
		this.selectedColor;
		this.reversedOrder = !1;
		this.labelText = "[[title]]";
		this.valueText = "[[value]]";
		this.useMarkerColorForLabels = !1;
		this.rollOverGraphAlpha = 1;
		this.textClickEnabled = !1;
		this.equalWidths = !0;
		this.dateFormat = "DD-MM-YYYY";
		this.backgroundColor = "#FFFFFF";
		this.backgroundAlpha = 0;
		this.ly;
		this.lx;
		this.showEntries = !0
	},
	setData: function(a) {
		this.data = a;
		this.invalidateSize()
	},
	invalidateSize: function() {
		this.destroy();
		this.entries = [];
		this.valueLabels = [];
		AmCharts.ifArray(this.data) && this.drawLegend()
	},
	drawLegend: function() {
		var a = this.chart,
			b = this.position,
			d = this.width,
			e = a.divRealWidth,
			f = a.divRealHeight,
			g = this.div,
			h = this.data;
		isNaN(this.fontSize) && (this.fontSize = a.fontSize);
		if ("right" == b || "left" == b) this.maxColumns = 1, this.marginLeft = this.marginRight = 10;
		else if (this.autoMargins) {
			this.marginRight = a.marginRight;
			this.marginLeft = a.marginLeft;
			var j = a.autoMarginOffset;
			"bottom" == b ? (this.marginBottom = j, this.marginTop = 0) : (this.marginTop = j, this.marginBottom = 0)
		}
		this.divWidth = b = void 0 != d ? AmCharts.toCoordinate(d, e) : a.realWidth;
		g.style.width = b + "px";
		this.container = new AmCharts.AmDraw(g, b, f);
		this.lx = 0;
		this.ly = 8;
		f = this.markerSize;
		f > this.fontSize && (this.ly = f / 2 - 1);
		0 < f && (this.lx += f + this.markerLabelGap);
		this.titleWidth = 0;
		if (f = this.title) a = AmCharts.text(this.container, f, this.color, a.fontFamily, this.fontSize, "start", !0), a.translate(0, this.marginTop + this.verticalGap + this.ly + 1), a = a.getBBox(), this.titleWidth = a.width + 15, this.titleHeight = a.height + 6;
		this.index = this.maxLabelWidth = 0;
		if (this.showEntries) {
			for (a = 0; a < h.length; a++) this.createEntry(h[a]);
			for (a = this.index = 0; a < h.length; a++) this.createValue(h[a])
		}
		this.arrangeEntries();
		this.updateValues()
	},
	arrangeEntries: function() {
		var a = this.position,
			b = this.marginLeft + this.titleWidth,
			d = this.marginRight,
			e = this.marginTop,
			f = this.marginBottom,
			g = this.horizontalGap,
			h = this.div,
			j = this.divWidth,
			k = this.maxColumns,
			l = this.verticalGap,
			m = this.spacing,
			n = j - d - b,
			t = 0,
			r = 0,
			q = this.container,
			p = q.set();
		this.set = p;
		q = q.set();
		p.push(q);
		for (var s = this.entries, u = 0; u < s.length; u++) {
			var v = s[u].getBBox(),
				y = v.width;
			y > t && (t = y);
			v = v.height;
			v > r && (r = v)
		}
		for (var z = y = 0, A = g, u = 0; u < s.length; u++) {
			var w = s[u];
			this.reversedOrder && (w = s[s.length - u - 1]);
			var v = w.getBBox(),
				x;
			this.equalWidths ? x = g + z * (t + m + this.markerLabelGap) : (x = A, A = A + v.width + g + m);
			x + v.width > n && 0 < u && (y++, z = 0, x = g, A = x + v.width + g + m);
			w.translate(x, (r + l) * y);
			z++;
			!isNaN(k) && z >= k && (z = 0, y++);
			q.push(w)
		}
		v = q.getBBox();
		k = v.height + 2 * l - 1;
		"left" == a || "right" == a ? (j = v.width + 2 * g, h.style.width = j + b + d + "px") : j = j - b - d - 1;
		d = AmCharts.polygon(this.container, [0, j, j, 0], [0, 0, k, k], this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha);
		p.push(d);
		p.translate(b, e);
		d.toBack();
		b = g;
		if ("top" == a || "bottom" == a || "absolute" == a)"center" == this.align ? b = g + (j - v.width) / 2 : "right" == this.align && (b = g + j - v.width);
		q.translate(b, l + 1);
		this.titleHeight > k && (k = this.titleHeight);
		a = k + e + f + 1;
		0 > a && (a = 0);
		h.style.height = Math.round(a) + "px"
	},
	createEntry: function(a) {
		if (!1 !== a.visibleInLegend) {
			var b = this.chart,
				d = a.markerType;
			d || (d = this.markerType);
			var e = a.color,
				f = a.alpha;
			a.legendKeyColor && (e = a.legendKeyColor());
			a.legendKeyAlpha && (f = a.legendKeyAlpha());
			!0 == a.hidden && (e = this.markerDisabledColor);
			var g = this.createMarker(d, e, f);
			this.addListeners(g, a);
			f = this.container.set([g]);
			this.switchable && f.setAttr("cursor", "pointer");
			var h = this.switchType;
			if (h) {
				var j;
				j = "x" == h ? this.createX() : this.createV();
				j.dItem = a;
				!0 != a.hidden ? "x" == h ? j.hide() : j.show() : "x" != h && j.hide();
				this.switchable || j.hide();
				this.addListeners(j, a);
				a.legendSwitch = j;
				f.push(j)
			}
			h = this.color;
			a.showBalloon && (this.textClickEnabled && void 0 != this.selectedColor) && (h = this.selectedColor);
			this.useMarkerColorForLabels && (h = e);
			!0 == a.hidden && (h = this.markerDisabledColor);
			e = AmCharts.massReplace(this.labelText, {
				"[[title]]": a.title
			});
			j = this.fontSize;
			var k = this.markerSize;
			if (g && k <= j) {
				var l = 0;
				if ("bubble" == d || "circle" == d) l = k / 2;
				g.translate(l, l + this.ly - j / 2 + (j + 2 - k) / 2)
			}
			if (e) {
				var m = AmCharts.text(this.container, e, h, b.fontFamily, j, "start");
				m.translate(this.lx, this.ly);
				f.push(m);
				b = m.getBBox().width;
				this.maxLabelWidth < b && (this.maxLabelWidth = b)
			}
			this.entries[this.index] = f;
			a.legendEntry = this.entries[this.index];
			a.legendLabel = m;
			this.index++
		}
	},
	addListeners: function(a, b) {
		var d = this;
		a && a.mouseover(function() {
			d.rollOverMarker(b)
		}).mouseout(function() {
			d.rollOutMarker(b)
		}).click(function() {
			d.clickMarker(b)
		})
	},
	rollOverMarker: function(a) {
		this.switchable && this.dispatch("rollOverMarker", a);
		this.dispatch("rollOverItem", a)
	},
	rollOutMarker: function(a) {
		this.switchable && this.dispatch("rollOutMarker", a);
		this.dispatch("rollOutItem", a)
	},
	clickMarker: function(a) {
		this.switchable ? !0 == a.hidden ? this.dispatch("showItem", a) : this.dispatch("hideItem", a) : this.textClickEnabled && this.dispatch("clickMarker", a)
	},
	rollOverLabel: function(a) {
		a.hidden || (this.textClickEnabled && a.legendLabel && a.legendLabel.attr({
			fill: this.rollOverColor
		}), this.dispatch("rollOverItem", a))
	},
	rollOutLabel: function(a) {
		if (!a.hidden) {
			if (this.textClickEnabled && a.legendLabel) {
				var b = this.color;
				void 0 != this.selectedColor && a.showBalloon && (b = this.selectedColor);
				this.useMarkerColorForLabels && (b = a.lineColor, void 0 == b && (b = a.color));
				a.legendLabel.attr({
					fill: b
				})
			}
			this.dispatch("rollOutItem", a)
		}
	},
	clickLabel: function(a) {
		this.textClickEnabled ? a.hidden || this.dispatch("clickLabel", a) : this.switchable && (!0 == a.hidden ? this.dispatch("showItem", a) : this.dispatch("hideItem", a))
	},
	dispatch: function(a, b) {
		this.fire(a, {
			type: a,
			dataItem: b,
			target: this,
			chart: this.chart
		})
	},
	createValue: function(a) {
		var b = this,
			d = b.fontSize;
		if (!1 !== a.visibleInLegend) {
			var e = b.maxLabelWidth;
			b.equalWidths || (b.valueAlign = "left");
			"left" == b.valueAlign && (e = a.legendEntry.getBBox().width);
			var f = e;
			if (b.valueText) {
				var g = b.color;
				b.useMarkerColorForLabels && (g = a.color);
				!0 == a.hidden && (g = b.markerDisabledColor);
				var h = b.valueText,
					e = e + b.lx + b.markerLabelGap + b.valueWidth,
					j = "end";
				"left" == b.valueAlign && (e -= b.valueWidth, j = "start");
				g = AmCharts.text(b.container, h, g, b.chart.fontFamily, d, j);
				g.translate(e, b.ly);
				b.entries[b.index].push(g);
				f += b.valueWidth + b.markerLabelGap;
				g.dItem = a;
				b.valueLabels.push(g)
			}
			b.index++;
			g = b.markerSize;
			g < d + 7 && (g = d + 7, AmCharts.VML && (g += 3));
			d = b.container.rect(b.markerSize + b.markerLabelGap, 0, f, g, 0, 0).attr({
				stroke: "none",
				fill: "#FFFFFF",
				"fill-opacity": 0.005
			});
			d.dItem = a;
			b.entries[b.index - 1].push(d);
			d.mouseover(function() {
				b.rollOverLabel(a)
			}).mouseout(function() {
				b.rollOutLabel(a)
			}).click(function() {
				b.clickLabel(a)
			})
		}
	},
	createV: function() {
		var a = this.markerSize;
		return AmCharts.polygon(this.container, [a / 5, a / 2, a - a / 5, a / 2], [a / 3, a - a / 5, a / 5, a / 1.7], this.switchColor)
	},
	createX: function() {
		var a = this.markerSize - 3,
			b = {
				stroke: this.switchColor,
				"stroke-width": 3
			},
			d = this.container,
			e = AmCharts.line(d, [3, a], [3, a]).attr(b),
			a = AmCharts.line(d, [3, a], [a, 3]).attr(b);
		return this.container.set([e, a])
	},
	createMarker: function(a, b, d) {
		var e = this.markerSize,
			f = this.container,
			g, h = this.markerBorderColor;
		h || (h = b);
		var j = this.markerBorderThickness,
			k = this.markerBorderAlpha;
		switch (a) {
		case "square":
			g = AmCharts.polygon(f, [0, e, e, 0], [0, 0, e, e], b, d, j, h, k);
			break;
		case "circle":
			g = AmCharts.circle(f, e / 2, b, d, j, h, k);
			g.translate(e / 2, e / 2);
			break;
		case "line":
			g = AmCharts.line(f, [0, e], [e / 2, e / 2], b, d, j);
			break;
		case "dashedLine":
			g = AmCharts.line(f, [0, e], [e / 2, e / 2], b, d, j, 3);
			break;
		case "triangleUp":
			g = AmCharts.polygon(f, [0, e / 2, e, e], [e, 0, e, e], b, d, j, h, k);
			break;
		case "triangleDown":
			g = AmCharts.polygon(f, [0, e / 2, e, e], [0, e, 0, 0], b, d, j, h, k);
			break;
		case "bubble":
			g = AmCharts.circle(f, e / 2, b, d, j, h, k, !0), g.translate(e / 2, e / 2)
		}
		return g
	},
	validateNow: function() {
		this.invalidateSize()
	},
	updateValues: function() {
		for (var a = this.valueLabels, b = this.chart, d = 0; d < a.length; d++) {
			var e = a[d],
				f = e.dItem;
			if (void 0 != f.type) {
				var g = f.currentDataItem;
				if (g) {
					var h = this.valueText;
					f.legendValueText && (h = f.legendValueText);
					f = h;
					f = b.formatString(f, g);
					e.text(f)
				} else e.text(" ")
			} else g = b.formatString(this.valueText, f), e.text(g)
		}
	},
	renderFix: function() {
		if (!AmCharts.VML) {
			var a = this.container;
			a && a.renderFix()
		}
	},
	destroy: function() {
		this.div.innerHTML = "";
		AmCharts.remove(this.set)
	}
});
AmCharts.AmBalloon = AmCharts.Class({
	construct: function() {
		this.enabled = !0;
		this.fillColor = "#CC0000";
		this.fillAlpha = 1;
		this.borderThickness = 2;
		this.borderColor = "#FFFFFF";
		this.borderAlpha = 1;
		this.cornerRadius = 6;
		this.maximumWidth = 220;
		this.horizontalPadding = 8;
		this.verticalPadding = 5;
		this.pointerWidth = 10;
		this.pointerOrientation = "V";
		this.color = "#FFFFFF";
		this.textShadowColor = "#000000";
		this.adjustBorderColor = !1;
		this.showBullet = !0;
		this.show = this.follow = !1;
		this.bulletSize = 3;
		this.textAlign = "middle"
	},
	draw: function() {
		var a = this.pointToX,
			b = this.pointToY,
			d = this.textAlign;
		if (!isNaN(a)) {
			var e = this.chart,
				f = e.container,
				g = this.set;
			AmCharts.remove(g);
			AmCharts.remove(this.pointer);
			this.set = g = f.set();
			e.balloonsSet.push(g);
			if (this.show) {
				var h = this.l,
					j = this.t,
					k = this.r,
					l = this.b,
					m = this.textShadowColor;
				this.color == m && (m = void 0);
				var n = this.balloonColor,
					t = this.fillColor,
					r = this.borderColor;
				void 0 != n && (this.adjustBorderColor ? r = n : t = n);
				var q = this.horizontalPadding,
					p = this.verticalPadding,
					n = this.pointerWidth,
					s = this.pointerOrientation,
					u = this.cornerRadius,
					v = e.fontFamily,
					y = this.fontSize;
				void 0 == y && (y = e.fontSize);
				e = AmCharts.text(f, this.text, this.color, v, y, d);
				g.push(e);
				if (void 0 != m) {
					var z = AmCharts.text(f, this.text, m, v, y, d, !1, 0.4);
					g.push(z)
				}
				v = e.getBBox();
				m = v.height + 2 * p;
				v = v.width + 2 * q;
				window.opera && (m += 2);
				var A, p = y / 2 + p;
				switch (d) {
				case "middle":
					A = v / 2;
					break;
				case "left":
					A = q;
					break;
				case "right":
					A = v - q
				}
				e.translate(A, p);
				z && z.translate(A + 1, p + 1);
				"H" != s ? (A = a - v / 2, d = b < j + m + 10 && "down" != s ? b + n : b - m - n) : (2 * n > m && (n = m / 2), d = b - m / 2, A = a < h + (k - h) / 2 ? a + n : a - v - n);
				d + m >= l && (d = l - m);
				d < j && (d = j);
				A < h && (A = h);
				A + v > k && (A = k - v);
				0 < u || 0 == n ? (r = AmCharts.rect(f, v, m, t, this.fillAlpha, this.borderThickness, r, this.borderAlpha, this.cornerRadius), this.showBullet && (f = AmCharts.circle(f, this.bulletSize, t, this.fillAlpha), f.translate(a, b), this.pointer = f)) : (l = [], u = [], "H" != s ? (h = a - A, h > v - n && (h = v - n), h < n && (h = n), l = [0, h - n, a - A, h + n, v, v, 0, 0], u = b < j + m + 10 && "down" != s ? [0, 0, b - d, 0, 0, m, m, 0] : [m, m, b - d, m, m, 0, 0, m]) : (j = b - d, j > m - n && (j = m - n), j < n && (j = n), u = [0, j - n, b - d, j + n, m, m, 0, 0], l = a < h + (k - h) / 2 ? [0, 0, a - A, 0, 0, v, v, 0] : [v, v, a - A, v, v, 0, 0, v]), r = AmCharts.polygon(f, l, u, t, this.fillAlpha, this.borderThickness, r, this.borderAlpha));
				g.push(r);
				r.toFront();
				z && z.toFront();
				e.toFront();
				a = 1;
				9 > AmCharts.IEversion && this.follow && (a = 6);
				g.translate(A - a, d);
				v = r.getBBox();
				this.bottom = d + v.y + v.height;
				this.yPos = v.y + d
			}
		}
	},
	followMouse: function() {
		if (this.follow && this.show) {
			var a = this.chart.mouseX,
				b = this.chart.mouseY - 3;
			this.pointToX = a;
			this.pointToY = b;
			if (a != this.previousX || b != this.previousY) if (this.previousX = a, this.previousY = b, 0 == this.cornerRadius) this.draw();
			else {
				var d = this.set;
				if (d) {
					var e = d.getBBox(),
						a = a - e.width / 2,
						f = b - e.height - 10;
					a < this.l && (a = this.l);
					a > this.r - e.width && (a = this.r - e.width);
					f < this.t && (f = b + 10);
					d.translate(a, f)
				}
			}
		}
	},
	changeColor: function(a) {
		this.balloonColor = a
	},
	setBounds: function(a, b, d, e) {
		this.l = a;
		this.t = b;
		this.r = d;
		this.b = e
	},
	showBalloon: function(a) {
		this.text = a;
		this.show = !0;
		this.draw()
	},
	hide: function() {
		this.follow = this.show = !1;
		this.destroy()
	},
	setPosition: function(a, b, d) {
		this.pointToX = a;
		this.pointToY = b;
		d && (a != this.previousX || b != this.previousY) && this.draw();
		this.previousX = a;
		this.previousY = b
	},
	followCursor: function(a) {
		var b = this;
		(b.follow = a) ? (b.pShowBullet = b.showBullet, b.showBullet = !1) : void 0 != b.pShowBullet && (b.showBullet = b.pShowBullet);
		clearInterval(b.interval);
		var d = b.chart.mouseX,
			e = b.chart.mouseY;
		!isNaN(d) && a && (b.pointToX = d, b.pointToY = e - 3, b.interval = setInterval(function() {
			b.followMouse.call(b)
		}, 40))
	},
	destroy: function() {
		clearInterval(this.interval);
		AmCharts.remove(this.set);
		AmCharts.remove(this.pointer)
	}
});
AmCharts.AmCoordinateChart = AmCharts.Class({
	inherits: AmCharts.AmChart,
	construct: function() {
		AmCharts.AmCoordinateChart.base.construct.call(this);
		this.createEvents("rollOverGraphItem", "rollOutGraphItem", "clickGraphItem", "doubleClickGraphItem");
		this.plotAreaFillColors = "#FFFFFF";
		this.plotAreaFillAlphas = 0;
		this.plotAreaBorderColor = "#000000";
		this.plotAreaBorderAlpha = 0;
		this.startAlpha = 1;
		this.startDuration = 0;
		this.startEffect = "elastic";
		this.sequencedAnimation = !0;
		this.colors = "#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");
		this.balloonDateFormat = "MMM DD, YYYY";
		this.valueAxes = [];
		this.graphs = []
	},
	initChart: function() {
		AmCharts.AmCoordinateChart.base.initChart.call(this);
		this.createValueAxes();
		AmCharts.VML && (this.startAlpha = 1);
		var a = this.legend;
		a && a.setData(this.graphs)
	},
	createValueAxes: function() {
		if (0 == this.valueAxes.length) {
			var a = new AmCharts.ValueAxis;
			this.addValueAxis(a)
		}
	},
	parseData: function() {
		this.processValueAxes();
		this.processGraphs()
	},
	parseSerialData: function() {
		AmCharts.AmSerialChart.base.parseData.call(this);
		var a = this.graphs,
			b = {},
			d = this.seriesIdField;
		d || (d = this.categoryField);
		this.chartData = [];
		var e = this.dataProvider;
		if (e) {
			var f = !1;
			this.categoryAxis && (f = this.categoryAxis.parseDates);
			if (f) var g = AmCharts.extractPeriod(this.categoryAxis.minPeriod),
				h = g.period,
				g = g.count;
			var j = {};
			this.lookupTable = j;
			for (var k = 0; k < e.length; k++) {
				var l = {},
					m = e[k],
					n = m[this.categoryField];
				l.category = String(n);
				j[m[d]] = l;
				f && (n = isNaN(n) ? new Date(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()) : new Date(n), n = AmCharts.resetDateToMin(n, h, g), l.category = n, l.time = n.getTime());
				var t = this.valueAxes;
				l.axes = {};
				l.x = {};
				for (var r = 0; r < t.length; r++) {
					var q = t[r].id;
					l.axes[q] = {};
					l.axes[q].graphs = {};
					for (var p = 0; p < a.length; p++) {
						var n = a[p],
							s = n.id,
							u = n.periodValue;
						if (n.valueAxis.id == q) {
							l.axes[q].graphs[s] = {};
							var v = {};
							v.index = k;
							n.dataProvider && (m = b);
							v.values = this.processValues(m, n, u);
							this.processFields(n, v, m);
							v.category = l.category;
							v.serialDataItem = l;
							v.graph = n;
							l.axes[q].graphs[s] = v
						}
					}
				}
				this.chartData[k] = l
			}
		}
		for (b = 0; b < a.length; b++) n = a[b], n.dataProvider && this.parseGraphData(n)
	},
	processValues: function(a, b, d) {
		var e = {},
			f = !1;
		if (("candlestick" == b.type || "ohlc" == b.type) && "" != d) f = !0;
		var g = Number(a[b.valueField + d]);
		isNaN(g) || (e.value = g);
		f && (d = "Open");
		g = Number(a[b.openField + d]);
		isNaN(g) || (e.open = g);
		f && (d = "Close");
		g = Number(a[b.closeField + d]);
		isNaN(g) || (e.close = g);
		f && (d = "Low");
		g = Number(a[b.lowField + d]);
		isNaN(g) || (e.low = g);
		f && (d = "High");
		g = Number(a[b.highField + d]);
		isNaN(g) || (e.high = g);
		return e
	},
	parseGraphData: function(a) {
		var b = a.dataProvider,
			d = a.seriesIdField;
		d || (d = this.seriesIdField);
		d || (d = this.categoryField);
		for (var e = 0; e < b.length; e++) {
			var f = b[e],
				g = this.lookupTable[String(f[d])],
				h = a.valueAxis.id;
			g && (h = g.axes[h].graphs[a.id], h.serialDataItem = g, h.values = this.processValues(f, a, a.periodValue), this.processFields(a, h, f))
		}
	},
	addValueAxis: function(a) {
		a.chart = this;
		this.valueAxes.push(a);
		this.validateData()
	},
	removeValueAxesAndGraphs: function() {
		for (var a = this.valueAxes, b = a.length - 1; - 1 < b; b--) this.removeValueAxis(a[b])
	},
	removeValueAxis: function(a) {
		var b = this.graphs,
			d;
		for (d = b.length - 1; 0 <= d; d--) {
			var e = b[d];
			e && e.valueAxis == a && this.removeGraph(e)
		}
		b = this.valueAxes;
		for (d = b.length - 1; 0 <= d; d--) b[d] == a && b.splice(d, 1);
		this.validateData()
	},
	addGraph: function(a) {
		this.graphs.push(a);
		this.chooseGraphColor(a, this.graphs.length - 1);
		this.validateData()
	},
	removeGraph: function(a) {
		for (var b = this.graphs, d = b.length - 1; 0 <= d; d--) b[d] == a && (b.splice(d, 1), a.destroy());
		this.validateData()
	},
	processValueAxes: function() {
		for (var a = this.valueAxes, b = 0; b < a.length; b++) {
			var d = a[b];
			d.chart = this;
			d.id || (d.id = "valueAxis" + b + "_" + (new Date).getTime());
			if (!0 === this.usePrefixes || !1 === this.usePrefixes) d.usePrefixes = this.usePrefixes
		}
	},
	processGraphs: function() {
		for (var a = this.graphs, b = 0; b < a.length; b++) {
			var d = a[b];
			d.chart = this;
			d.valueAxis || (d.valueAxis = this.valueAxes[0]);
			d.id || (d.id = "graph" + b + "_" + (new Date).getTime())
		}
	},
	formatString: function(a, b) {
		var d = b.graph,
			e = d.valueAxis;
		e.duration && b.values.value && (e = AmCharts.formatDuration(b.values.value, e.duration, "", e.durationUnits, e.maxInterval, e.numberFormatter), a = a.split("[[value]]").join(e));
		a = AmCharts.massReplace(a, {
			"[[title]]": d.title,
			"[[description]]": b.description,
			"<br>": "\n"
		});
		a = AmCharts.fixNewLines(a);
		return a = AmCharts.cleanFromEmpty(a)
	},
	getBalloonColor: function(a, b) {
		var d = a.lineColor,
			e = a.balloonColor,
			f = a.fillColors;
		"object" == typeof f ? d = f[0] : void 0 != f && (d = f);
		if (b.isNegative) {
			var f = a.negativeLineColor,
				g = a.negativeFillColors;
			"object" == typeof g ? f = g[0] : void 0 != g && (f = g);
			void 0 != f && (d = f)
		}
		void 0 != b.color && (d = b.color);
		void 0 == e && (e = d);
		return e
	},
	getGraphById: function(a) {
		return this.getObjById(this.graphs, a)
	},
	getValueAxisById: function(a) {
		return this.getObjById(this.valueAxes, a)
	},
	getObjById: function(a, b) {
		for (var d, e = 0; e < a.length; e++) {
			var f = a[e];
			f.id == b && (d = f)
		}
		return d
	},
	processFields: function(a, b, d) {
		if (a.itemColors) {
			var e = a.itemColors,
				f = b.index;
			b.color = f < e.length ? e[f] : AmCharts.randomColor()
		}
		e = "lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url".split(" ");
		for (f = 0; f < e.length; f++) {
			var g = e[f],
				h = a[g + "Field"];
			h && (h = d[h], AmCharts.isDefined(h) && (b[g] = h))
		}
		b.dataContext = d
	},
	chooseGraphColor: function(a, b) {
		if (void 0 == a.lineColor) {
			var d;
			d = this.colors.length > b ? this.colors[b] : AmCharts.randomColor();
			a.lineColor = d
		}
	},
	handleLegendEvent: function(a) {
		var b = a.type;
		if (a = a.dataItem) {
			var d = a.hidden,
				e = a.showBalloon;
			switch (b) {
			case "clickMarker":
				e ? this.hideGraphsBalloon(a) : this.showGraphsBalloon(a);
				break;
			case "clickLabel":
				e ? this.hideGraphsBalloon(a) : this.showGraphsBalloon(a);
				break;
			case "rollOverItem":
				d || this.highlightGraph(a);
				break;
			case "rollOutItem":
				d || this.unhighlightGraph();
				break;
			case "hideItem":
				this.hideGraph(a);
				break;
			case "showItem":
				this.showGraph(a)
			}
		}
	},
	highlightGraph: function(a) {
		var b = this.graphs,
			d, e = 0.2;
		this.legend && (e = this.legend.rollOverGraphAlpha);
		if (1 != e) for (d = 0; d < b.length; d++) {
			var f = b[d];
			f != a && f.changeOpacity(e)
		}
	},
	unhighlightGraph: function() {
		this.legend && (alpha = this.legend.rollOverGraphAlpha);
		if (1 != alpha) for (var a = this.graphs, b = 0; b < a.length; b++) a[b].changeOpacity(1)
	},
	showGraph: function(a) {
		a.hidden = !1;
		this.dataChanged = !0;
		this.marginsUpdated = !1;
		this.initChart()
	},
	hideGraph: function(a) {
		this.dataChanged = !0;
		this.marginsUpdated = !1;
		a.hidden = !0;
		this.initChart()
	},
	hideGraphsBalloon: function(a) {
		a.showBalloon = !1;
		this.updateLegend()
	},
	showGraphsBalloon: function(a) {
		a.showBalloon = !0;
		this.updateLegend()
	},
	updateLegend: function() {
		this.legend && this.legend.invalidateSize()
	},
	animateAgain: function() {
		var a = this.graphs;
		if (a) for (var b = 0; b < a.length; b++) a[b].animationPlayed = !1
	}
});
AmCharts.AmRectangularChart = AmCharts.Class({
	inherits: AmCharts.AmCoordinateChart,
	construct: function() {
		AmCharts.AmRectangularChart.base.construct.call(this);
		this.createEvents("zoomed");
		this.marginRight = this.marginBottom = this.marginTop = this.marginLeft = 20;
		this.verticalPosition = this.horizontalPosition = this.depth3D = this.angle = 0;
		this.heightMultiplier = this.widthMultiplier = 1;
		this.zoomOutText = "显示 全部";
		this.zbSet;
		this.zoomOutButton = {
			backgroundColor: "#b2e1ff",
			backgroundAlpha: 1
		};
		this.trendLines = [];
		this.autoMargins = !0;
		this.marginsUpdated = !1;
		this.autoMarginOffset = 10
	},
	initChart: function() {
		AmCharts.AmRectangularChart.base.initChart.call(this);
		this.updateDxy();
		var a = !0;
		!this.marginsUpdated && this.autoMargins && (this.resetMargins(), a = !1);
		this.updateMargins();
		this.updatePlotArea();
		this.updateScrollbars();
		this.updateTrendLines();
		this.updateChartCursor();
		this.updateValueAxes();
		a && (this.scrollbarOnly || this.updateGraphs())
	},
	drawChart: function() {
		AmCharts.AmRectangularChart.base.drawChart.call(this);
		this.drawPlotArea();
		if (AmCharts.ifArray(this.chartData)) {
			var a = this.chartCursor;
			a && a.draw();
			a = this.zoomOutText;
			"" != a && a && this.drawZoomOutButton()
		}
	},
	resetMargins: function() {
		var a = {};
		if ("serial" == this.chartType) {
			for (var b = this.valueAxes, d = 0; d < b.length; d++) {
				var e = b[d];
				e.ignoreAxisWidth || (e.setOrientation(this.rotate), e.fixAxisPosition(), a[e.position] = !0)
			}
			if ((d = this.categoryAxis) && !d.ignoreAxisWidth) d.setOrientation(!this.rotate), d.fixAxisPosition(), d.fixAxisPosition(), a[d.position] = !0
		} else {
			e = this.xAxes;
			b = this.yAxes;
			for (d = 0; d < e.length; d++) {
				var f = e[d];
				f.ignoreAxisWidth || (f.setOrientation(!0), f.fixAxisPosition(), a[f.position] = !0)
			}
			for (d = 0; d < b.length; d++) e = b[d], e.ignoreAxisWidth || (e.setOrientation(!1), e.fixAxisPosition(), a[e.position] = !0)
		}
		a.left && (this.marginLeft = 0);
		a.right && (this.marginRight = 0);
		a.top && (this.marginTop = 0);
		a.bottom && (this.marginBottom = 0);
		this.fixMargins = a
	},
	measureMargins: function() {
		var a = this.valueAxes,
			b, d = this.autoMarginOffset,
			e = this.fixMargins,
			f = this.realWidth,
			g = this.realHeight,
			h = d,
			j = d,
			k = f - d;
		b = g - d;
		for (var l = 0; l < a.length; l++) b = this.getAxisBounds(a[l], h, k, j, b), h = b.l, k = b.r, j = b.t, b = b.b;
		if (a = this.categoryAxis) b = this.getAxisBounds(a, h, k, j, b), h = b.l, k = b.r, j = b.t, b = b.b;
		e.left && h < d && (this.marginLeft = Math.round(-h + d));
		e.right && k > f - d && (this.marginRight = Math.round(k - f + d));
		e.top && j < d && (this.marginTop = Math.round(this.marginTop - j + d + this.titleHeight));
		e.bottom && b > g - d && (this.marginBottom = Math.round(b - g + d));
		this.animateAgain();
		this.initChart()
	},
	getAxisBounds: function(a, b, d, e, f) {
		if (!a.ignoreAxisWidth) {
			var g = a.labelsSet,
				h = a.tickLength;
			a.inside && (h = 0);
			if (g) switch (g = a.getBBox(), a.position) {
			case "top":
				a = g.y;
				e > a && (e = a);
				break;
			case "bottom":
				a = g.y + g.height;
				f < a && (f = a);
				break;
			case "right":
				a = g.x + g.width + h + 3;
				d < a && (d = a);
				break;
			case "left":
				a = g.x - h, b > a && (b = a)
			}
		}
		return {
			l: b,
			t: e,
			r: d,
			b: f
		}
	},
	drawZoomOutButton: function() {
		var a = this,
			b = a.container.set();
		a.zoomButtonSet.push(b);
		var d = a.color,
			e = a.fontSize,
			f = a.zoomOutButton;
		f && (f.fontSize && (e = f.fontSize), f.color && (d = f.color));
		d = AmCharts.text(a.container, a.zoomOutText, d, a.fontFamily, e, "start");
		e = d.getBBox();
		d.translate(29, 6 + e.height / 2);
		f = AmCharts.rect(a.container, e.width + 40, e.height + 15, f.backgroundColor, f.backgroundAlpha);
		b.push(f);
		a.zbBG = f;
		void 0 != a.pathToImages && (f = a.container.image(a.pathToImages + "lens.png", 0, 0, 16, 16), f.translate(7, e.height / 2 - 1), f.toFront(), b.push(f));
		d.toFront();
		b.push(d);
		f = b.getBBox();
		b.translate(a.marginLeftReal + a.plotAreaWidth - f.width, a.marginTopReal);
		b.hide();
		b.mouseover(function() {
			a.rollOverZB()
		}).mouseout(function() {
			a.rollOutZB()
		}).click(function() {
			a.clickZB()
		}).touchstart(function() {
			a.rollOverZB()
		}).touchend(function() {
			a.rollOutZB();
			a.clickZB()
		});
		for (f = 0; f < b.length; f++) b[f].attr({
			cursor: "pointer"
		});
		a.zbSet = b
	},
	rollOverZB: function() {
		this.zbBG.show()
	},
	rollOutZB: function() {
		this.zbBG.hide()
	},
	clickZB: function() {
		this.zoomOut()
	},
	zoomOut: function() {
		this.updateScrollbar = !0;
		this.zoom()
	},
	drawPlotArea: function() {
		var a = this.dx,
			b = this.dy,
			d = this.marginLeftReal,
			e = this.marginTopReal,
			f = this.plotAreaWidth,
			g = this.plotAreaHeight,
			h = this.plotAreaFillColors,
			j = this.plotAreaFillAlphas,
			k = this.plotAreaBorderColor,
			l = this.plotAreaBorderAlpha;
		this.trendLinesSet.clipRect(d, e, f, g);
		"object" == typeof j && (j = j[0]);
		h = AmCharts.polygon(this.container, [0, f, f, 0], [0, 0, g, g], h, j, 1, k, l, this.plotAreaGradientAngle);
		h.translate(d + a, e + b);
		this.set.push(h);
		0 != a && 0 != b && (h = this.plotAreaFillColors, "object" == typeof h && (h = h[0]), h = AmCharts.adjustLuminosity(h, -0.15), f = AmCharts.polygon(this.container, [0, a, f + a, f, 0], [0, b, b, 0, 0], h, j, 1, k, l), f.translate(d, e + g), this.set.push(f), a = AmCharts.polygon(this.container, [0, 0, a, a, 0], [0, g, g + b, b, 0], h, j, 1, k, l), a.translate(d, e), this.set.push(a))
	},
	updatePlotArea: function() {
		var a = this.updateWidth(),
			b = this.updateHeight(),
			d = this.container;
		this.realWidth = a;
		this.realWidth = b;
		d && this.container.setSize(a, b);
		a = a - this.marginLeftReal - this.marginRightReal - this.dx;
		b = b - this.marginTopReal - this.marginBottomReal;
		1 > a && (a = 1);
		1 > b && (b = 1);
		this.plotAreaWidth = Math.round(a);
		this.plotAreaHeight = Math.round(b)
	},
	updateDxy: function() {
		this.dx = this.depth3D * Math.cos(this.angle * Math.PI / 180);
		this.dy = -this.depth3D * Math.sin(this.angle * Math.PI / 180)
	},
	updateMargins: function() {
		var a = this.getTitleHeight();
		this.titleHeight = a;
		this.marginTopReal = this.marginTop - this.dy + a;
		this.marginBottomReal = this.marginBottom;
		this.marginLeftReal = this.marginLeft;
		this.marginRightReal = this.marginRight
	},
	updateValueAxes: function() {
		for (var a = this.valueAxes, b = this.marginLeftReal, d = this.marginTopReal, e = this.plotAreaHeight, f = this.plotAreaWidth, g = 0; g < a.length; g++) {
			var h = a[g];
			h.axisRenderer = AmCharts.RecAxis;
			h.guideFillRenderer = AmCharts.RecFill;
			h.axisItemRenderer = AmCharts.RecItem;
			h.dx = this.dx;
			h.dy = this.dy;
			h.viW = f - 1;
			h.viH = e - 1;
			h.marginsChanged = !0;
			h.viX = b;
			h.viY = d;
			this.updateObjectSize(h)
		}
	},
	updateObjectSize: function(a) {
		a.width = (this.plotAreaWidth - 1) * this.widthMultiplier;
		a.height = (this.plotAreaHeight - 1) * this.heightMultiplier;
		a.x = this.marginLeftReal + this.horizontalPosition;
		a.y = this.marginTopReal + this.verticalPosition
	},
	updateGraphs: function() {
		for (var a = this.graphs, b = 0; b < a.length; b++) {
			var d = a[b];
			d.x = this.marginLeftReal + this.horizontalPosition;
			d.y = this.marginTopReal + this.verticalPosition;
			d.width = this.plotAreaWidth * this.widthMultiplier;
			d.height = this.plotAreaHeight * this.heightMultiplier;
			d.index = b;
			d.dx = this.dx;
			d.dy = this.dy;
			d.rotate = this.rotate;
			d.chartType = this.chartType
		}
	},
	updateChartCursor: function() {
		var a = this.chartCursor;
		a && (a.x = this.marginLeftReal, a.y = this.marginTopReal, a.width = this.plotAreaWidth - 1, a.height = this.plotAreaHeight - 1, a.chart = this)
	},
	updateScrollbars: function() {},
	addChartCursor: function(a) {
		AmCharts.callMethod("destroy", [this.chartCursor]);
		a && (this.listenTo(a, "changed", this.handleCursorChange), this.listenTo(a, "zoomed", this.handleCursorZoom));
		this.chartCursor = a
	},
	removeChartCursor: function() {
		AmCharts.callMethod("destroy", [this.chartCursor]);
		this.chartCursor = null
	},
	zoomTrendLines: function() {
		for (var a = this.trendLines, b = 0; b < a.length; b++) {
			var d = a[b];
			d.valueAxis.recalculateToPercents ? d.set && d.set.hide() : (d.x = this.marginLeftReal + this.horizontalPosition, d.y = this.marginTopReal + this.verticalPosition, d.draw())
		}
	},
	addTrendLine: function(a) {
		this.trendLines.push(a)
	},
	removeTrendLine: function(a) {
		for (var b = this.trendLines, d = b.length - 1; 0 <= d; d--) b[d] == a && b.splice(d, 1)
	},
	adjustMargins: function(a, b) {
		var d = a.scrollbarHeight;
		"top" == a.position ? b ? this.marginLeftReal += d : this.marginTopReal += d : b ? this.marginRightReal += d : this.marginBottomReal += d
	},
	getScrollbarPosition: function(a, b, d) {
		a.position = b ? "bottom" == d || "left" == d ? "bottom" : "top" : "top" == d || "right" == d ? "bottom" : "top"
	},
	updateChartScrollbar: function(a, b) {
		if (a) {
			a.rotate = b;
			var d = this.marginTopReal,
				e = this.marginLeftReal,
				f = a.scrollbarHeight,
				g = this.dx,
				h = this.dy;
			"top" == a.position ? b ? (a.y = d, a.x = e - f) : (a.y = d - f + h, a.x = e + g) : b ? (a.y = d + h, a.x = e + this.plotAreaWidth + g) : (a.y = d + this.plotAreaHeight + 1, a.x = this.marginLeftReal)
		}
	},
	showZB: function(a) {
		var b = this.zbSet;
		b && (a ? b.show() : b.hide(), this.zbBG.hide())
	},
	handleReleaseOutside: function(a) {
		AmCharts.AmRectangularChart.base.handleReleaseOutside.call(this, a);
		(a = this.chartCursor) && a.handleReleaseOutside()
	},
	handleMouseDown: function(a) {
		AmCharts.AmRectangularChart.base.handleMouseDown.call(this, a);
		var b = this.chartCursor;
		b && b.handleMouseDown(a)
	},
	handleCursorChange: function() {}
});
AmCharts.TrendLine = AmCharts.Class({
	construct: function() {
		this.createEvents("click");
		this.isProtected = !1;
		this.dashLength = 0;
		this.lineColor = "#00CC00";
		this.lineThickness = this.lineAlpha = 1
	},
	draw: function() {
		var a = this;
		a.destroy();
		var b = a.chart,
			d = b.container,
			e, f, g, h, j = a.categoryAxis,
			k = a.initialDate,
			l = a.initialCategory,
			m = a.finalDate,
			n = a.finalCategory,
			t = a.valueAxis,
			r = a.valueAxisX,
			q = a.initialXValue,
			p = a.finalXValue,
			s = a.initialValue,
			u = a.finalValue,
			v = t.recalculateToPercents;
		j && (k && (e = j.dateToCoordinate(k)), l && (e = j.categoryToCoordinate(l)), m && (f = j.dateToCoordinate(m)), n && (f = j.categoryToCoordinate(n)));
		r && !v && (isNaN(q) || (e = r.getCoordinate(q)), isNaN(p) || (f = r.getCoordinate(p)));
		t && !v && (isNaN(s) || (g = t.getCoordinate(s)), isNaN(u) || (h = t.getCoordinate(u)));
		!isNaN(e) && (!isNaN(f) && !isNaN(g) && !isNaN(g)) && (b.rotate ? (j = [g, h], f = [e, f]) : (j = [e, f], f = [g, h]), g = a.lineColor, e = AmCharts.line(d, j, f, g, a.lineAlpha, a.lineThickness, a.dashLength), f = AmCharts.line(d, j, f, g, 0.005, 5), d = d.set([e, f]), d.translate(b.marginLeftReal, b.marginTopReal), b.trendLinesSet.push(d), a.line = e, a.set = d, f.mouseup(function() {
			a.handleLineClick()
		}).mouseover(function() {
			a.handleLineOver()
		}).mouseout(function() {
			a.handleLineOut()
		}), f.touchend && f.touchend(function() {
			a.handleLineClick()
		}))
	},
	handleLineClick: function() {
		var a = {
			type: "click",
			trendLine: this,
			chart: this.chart
		};
		this.fire(a.type, a)
	},
	handleLineOver: function() {
		var a = this.rollOverColor;
		void 0 != a && this.line.attr({
			stroke: a
		})
	},
	handleLineOut: function() {
		this.line.attr({
			stroke: this.lineColor
		})
	},
	destroy: function() {
		AmCharts.remove(this.set)
	}
});
AmCharts.AmSerialChart = AmCharts.Class({
	inherits: AmCharts.AmRectangularChart,
	construct: function() {
		AmCharts.AmSerialChart.base.construct.call(this);
		this.createEvents("changed");
		this.columnSpacing = 5;
		this.columnWidth = 0.8;
		this.updateScrollbar = !0;
		var a = new AmCharts.CategoryAxis;
		a.chart = this;
		this.categoryAxis = a;
		this.chartType = "serial";
		this.zoomOutOnDataUpdate = !0;
		this.skipZoom = !1;
		this.minSelectedTime = 0
	},
	initChart: function() {
		AmCharts.AmSerialChart.base.initChart.call(this);
		this.updateCategoryAxis();
		this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);
		var a = this.chartCursor;
		a && a.updateData();
		for (var a = this.countColumns(), b = this.graphs, d = 0; d < b.length; d++) b[d].columnCount = a;
		this.updateScrollbar = !0;
		this.drawChart();
		this.autoMargins && !this.marginsUpdated && (this.marginsUpdated = !0, this.measureMargins())
	},
	validateData: function(a) {
		this.marginsUpdated = !1;
		this.zoomOutOnDataUpdate && !a && (this.endTime = this.end = this.startTime = this.start = NaN);
		AmCharts.AmSerialChart.base.validateData.call(this)
	},
	drawChart: function() {
		AmCharts.AmSerialChart.base.drawChart.call(this);
		var a = this.chartData;
		if (AmCharts.ifArray(a)) {
			var b = this.chartScrollbar;
			b && b.draw();
			if (0 < this.realWidth && 0 < this.realHeight) {
				var b = a.length - 1,
					d, e;
				d = this.categoryAxis;
				if (d.parseDates && !d.equalSpacing) {
					if (d = this.startTime, e = this.endTime, isNaN(d) || isNaN(e)) d = a[0].time, e = a[b].time
				} else if (d = this.start, e = this.end, isNaN(d) || isNaN(e)) d = 0, e = b;
				this.endTime = this.startTime = this.end = this.start = void 0;
				this.zoom(d, e)
			}
		} else this.cleanChart();
		this.dispDUpd();
		this.chartCreated = !0
	},
	cleanChart: function() {
		AmCharts.callMethod("destroy", [this.valueAxes, this.graphs, this.categoryAxis, this.chartScrollbar, this.chartCursor])
	},
	updateCategoryAxis: function() {
		var a = this.categoryAxis;
		a.id = "categoryAxis";
		a.rotate = this.rotate;
		a.axisRenderer = AmCharts.RecAxis;
		a.guideFillRenderer = AmCharts.RecFill;
		a.axisItemRenderer = AmCharts.RecItem;
		a.setOrientation(!this.rotate);
		a.x = this.marginLeftReal;
		a.y = this.marginTopReal;
		a.dx = this.dx;
		a.dy = this.dy;
		a.width = this.plotAreaWidth - 1;
		a.height = this.plotAreaHeight - 1;
		a.viW = this.plotAreaWidth - 1;
		a.viH = this.plotAreaHeight - 1;
		a.viX = this.marginLeftReal;
		a.viY = this.marginTopReal;
		a.marginsChanged = !0
	},
	updateValueAxes: function() {
		AmCharts.AmSerialChart.base.updateValueAxes.call(this);
		for (var a = this.valueAxes, b = 0; b < a.length; b++) {
			var d = a[b],
				e = this.rotate;
			d.rotate = e;
			d.setOrientation(e);
			e = this.categoryAxis;
			if (!e.startOnAxis || e.parseDates) d.expandMinMax = !0
		}
	},
	updateData: function() {
		this.parseData();
		for (var a = this.graphs, b = 0; b < a.length; b++) a[b].data = this.chartData
	},
	updateMargins: function() {
		AmCharts.AmSerialChart.base.updateMargins.call(this);
		var a = this.chartScrollbar;
		a && (this.getScrollbarPosition(a, this.rotate, this.categoryAxis.position), this.adjustMargins(a, this.rotate))
	},
	updateScrollbars: function() {
		this.updateChartScrollbar(this.chartScrollbar, this.rotate)
	},
	zoom: function(a, b) {
		var d = this.categoryAxis;
		d.parseDates && !d.equalSpacing ? this.timeZoom(a, b) : this.indexZoom(a, b)
	},
	timeZoom: function(a, b) {
		var d = this.maxSelectedTime;
		isNaN(d) || (b != this.endTime && b - a > d && (a = b - d, this.updateScrollbar = !0), a != this.startTime && b - a > d && (b = a + d, this.updateScrollbar = !0));
		var e = this.minSelectedTime;
		if (0 < e && b - a < e) {
			var f = Math.round(a + (b - a) / 2),
				e = Math.round(e / 2);
			a = f - e;
			b = f + e
		}
		var g = this.chartData,
			f = this.categoryAxis;
		if (AmCharts.ifArray(g) && (a != this.startTime || b != this.endTime)) {
			var h = f.minDuration();
			this.firstTime = e = g[0].time;
			var j = g[g.length - 1].time;
			this.lastTime = j;
			a || (a = e, isNaN(d) || (a = j - d));
			b || (b = j);
			a > j && (a = j);
			b < e && (b = e);
			a < e && (a = e);
			b > j && (b = j);
			b < a && (b = a + h);
			this.startTime = a;
			this.endTime = b;
			d = g.length - 1;
			h = this.getClosestIndex(g, "time", a, !0, 0, d);
			g = this.getClosestIndex(g, "time", b, !1, h, d);
			f.timeZoom(a, b);
			f.zoom(h, g);
			this.start = AmCharts.fitToBounds(h, 0, d);
			this.end = AmCharts.fitToBounds(g, 0, d);
			this.zoomAxesAndGraphs();
			this.zoomScrollbar();
			a != e || b != j ? this.showZB(!0) : this.showZB(!1);
			this.updateColumnsDepth();
			this.dispatchTimeZoomEvent()
		}
	},
	indexZoom: function(a, b) {
		var d = this.maxSelectedSeries;
		isNaN(d) || (b != this.end && b - a > d && (a = b - d, this.updateScrollbar = !0), a != this.start && b - a > d && (b = a + d, this.updateScrollbar = !0));
		if (a != this.start || b != this.end) {
			var e = this.chartData.length - 1;
			isNaN(a) && (a = 0, isNaN(d) || (a = e - d));
			isNaN(b) && (b = e);
			b < a && (b = a);
			b > e && (b = e);
			a > e && (a = e - 1);
			0 > a && (a = 0);
			this.start = a;
			this.end = b;
			this.categoryAxis.zoom(a, b);
			this.zoomAxesAndGraphs();
			this.zoomScrollbar();
			0 != a || b != this.chartData.length - 1 ? this.showZB(!0) : this.showZB(!1);
			this.updateColumnsDepth();
			this.dispatchIndexZoomEvent()
		}
	},
	updateGraphs: function() {
		AmCharts.AmSerialChart.base.updateGraphs.call(this);
		for (var a = this.graphs, b = 0; b < a.length; b++) {
			var d = a[b];
			d.columnWidth = this.columnWidth;
			d.categoryAxis = this.categoryAxis
		}
	},
	updateColumnsDepth: function() {
		var a, b = this.graphs;
		AmCharts.remove(this.columnsSet);
		this.columnsArray = [];
		for (a = 0; a < b.length; a++) {
			var d = b[a],
				e = d.columnsArray;
			if (e) for (var f = 0; f < e.length; f++) this.columnsArray.push(e[f])
		}
		this.columnsArray.sort(this.compareDepth);
		if (0 < this.columnsArray.length) {
			b = this.container.set();
			this.columnSet.push(b);
			for (a = 0; a < this.columnsArray.length; a++) b.push(this.columnsArray[a].column.set);
			d && b.translate(d.x, d.y);
			this.columnsSet = b
		}
	},
	compareDepth: function(a, b) {
		return a.depth > b.depth ? 1 : -1
	},
	zoomScrollbar: function() {
		var a = this.chartScrollbar,
			b = this.categoryAxis;
		a && this.updateScrollbar && (b.parseDates && !b.equalSpacing ? a.timeZoom(this.startTime, this.endTime) : a.zoom(this.start, this.end), this.updateScrollbar = !0)
	},
	updateTrendLines: function() {
		for (var a = this.trendLines, b = 0; b < a.length; b++) {
			var d = a[b];
			d.chart = this;
			d.valueAxis || (d.valueAxis = this.valueAxes[0]);
			d.categoryAxis = this.categoryAxis
		}
	},
	zoomAxesAndGraphs: function() {
		if (!this.scrollbarOnly) {
			for (var a = this.valueAxes, b = 0; b < a.length; b++) a[b].zoom(this.start, this.end);
			a = this.graphs;
			for (b = 0; b < a.length; b++) a[b].zoom(this.start, this.end);
			this.zoomTrendLines();
			(b = this.chartCursor) && b.zoom(this.start, this.end, this.startTime, this.endTime)
		}
	},
	countColumns: function() {
		for (var a = 0, b = this.valueAxes.length, d = this.graphs.length, e, f, g = !1, h, j = 0; j < b; j++) {
			f = this.valueAxes[j];
			var k = f.stackType;
			if ("100%" == k || "regular" == k) {
				g = !1;
				for (h = 0; h < d; h++) e = this.graphs[h], !e.hidden && (e.valueAxis == f && "column" == e.type) && (!g && e.stackable && (a++, g = !0), e.stackable || a++, e.columnIndex = a - 1)
			}
			if ("none" == k || "3d" == k) for (h = 0; h < d; h++) e = this.graphs[h], !e.hidden && (e.valueAxis == f && "column" == e.type) && (e.columnIndex = a, a++);
			if ("3d" == k) {
				for (j = 0; j < d; j++) e = this.graphs[j], e.depthCount = a;
				a = 1
			}
		}
		return a
	},
	parseData: function() {
		AmCharts.AmSerialChart.base.parseData.call(this);
		this.parseSerialData()
	},
	getCategoryIndexByValue: function(a) {
		for (var b = this.chartData, d, e = 0; e < b.length; e++) b[e].category == a && (d = e);
		return d
	},
	handleCursorChange: function(a) {
		this.updateLegendValues(a.index)
	},
	handleCursorZoom: function(a) {
		this.updateScrollbar = !0;
		this.zoom(a.start, a.end)
	},
	handleScrollbarZoom: function(a) {
		this.updateScrollbar = !1;
		this.zoom(a.start, a.end)
	},
	dispatchTimeZoomEvent: function() {
		if (this.prevStartTime != this.startTime || this.prevEndTime != this.endTime) {
			var a = {
				type: "zoomed"
			};
			a.startDate = new Date(this.startTime);
			a.endDate = new Date(this.endTime);
			a.startIndex = this.start;
			a.endIndex = this.end;
			this.startIndex = this.start;
			this.endIndex = this.end;
			this.startDate = a.startDate;
			this.endDate = a.endDate;
			this.prevStartTime = this.startTime;
			this.prevEndTime = this.endTime;
			var b = this.categoryAxis,
				d = AmCharts.extractPeriod(b.minPeriod).period,
				b = b.dateFormatsObject[d];
			a.startValue = AmCharts.formatDate(a.startDate, b);
			a.endValue = AmCharts.formatDate(a.endDate, b);
			a.chart = this;
			a.target = this;
			this.fire(a.type, a)
		}
	},
	dispatchIndexZoomEvent: function() {
		if (this.prevStartIndex != this.start || this.prevEndIndex != this.end) {
			this.startIndex = this.start;
			this.endIndex = this.end;
			var a = this.chartData;
			if (AmCharts.ifArray(a) && !isNaN(this.start) && !isNaN(this.end)) {
				var b = {
					chart: this,
					target: this,
					type: "zoomed"
				};
				b.startIndex = this.start;
				b.endIndex = this.end;
				b.startValue = a[this.start].category;
				b.endValue = a[this.end].category;
				this.categoryAxis.parseDates && (this.startTime = a[this.start].time, this.endTime = a[this.end].time, b.startDate = new Date(this.startTime), b.endDate = new Date(this.endTime));
				this.prevStartIndex = this.start;
				this.prevEndIndex = this.end;
				this.fire(b.type, b)
			}
		}
	},
	updateLegendValues: function(a) {
		for (var b = this.graphs, d = 0; d < b.length; d++) {
			var e = b[d];
			e.currentDataItem = isNaN(a) ? void 0 : this.chartData[a].axes[e.valueAxis.id].graphs[e.id]
		}
		this.legend && this.legend.updateValues()
	},
	getClosestIndex: function(a, b, d, e, f, g) {
		0 > f && (f = 0);
		g > a.length - 1 && (g = a.length - 1);
		var h = f + Math.round((g - f) / 2),
			j = a[h][b];
		if (1 >= g - f) {
			if (e) return f;
			e = a[g][b];
			return Math.abs(a[f][b] - d) < Math.abs(e - d) ? f : g
		}
		return d == j ? h : d < j ? this.getClosestIndex(a, b, d, e, f, h) : this.getClosestIndex(a, b, d, e, h, g)
	},
	zoomToIndexes: function(a, b) {
		this.updateScrollbar = !0;
		var d = this.chartData;
		if (d) {
			var e = d.length;
			0 < e && (0 > a && (a = 0), b > e - 1 && (b = e - 1), e = this.categoryAxis, e.parseDates && !e.equalSpacing ? this.zoom(d[a].time, d[b].time) : this.zoom(a, b))
		}
	},
	zoomToDates: function(a, b) {
		this.updateScrollbar = !0;
		var d = this.chartData;
		if (this.categoryAxis.equalSpacing) {
			var e = this.getClosestIndex(d, "time", a.getTime(), !0, 0, d.length),
				d = this.getClosestIndex(d, "time", b.getTime(), !1, 0, d.length);
			this.zoom(e, d)
		} else this.zoom(a.getTime(), b.getTime())
	},
	zoomToCategoryValues: function(a, b) {
		this.updateScrollbar = !0;
		this.zoom(this.getCategoryIndexByValue(a), this.getCategoryIndexByValue(b))
	},
	formatString: function(a, b) {
		var d = b.graph;
		if (-1 != a.indexOf("[[category]]")) {
			var e = b.serialDataItem.category;
			if (this.categoryAxis.parseDates) {
				var f = this.balloonDateFormat,
					g = this.chartCursor;
				g && (f = g.categoryBalloonDateFormat); - 1 != a.indexOf("[[category]]") && (f = AmCharts.formatDate(e, f), -1 != f.indexOf("fff") && (f = AmCharts.formatMilliseconds(f, e)), e = f)
			}
			a = a.replace(/\[\[category\]\]/g, String(e))
		}
		d = d.numberFormatter;
		d || (d = this.numberFormatter);
		e = b.graph.valueAxis;
		if ((f = e.duration) && !isNaN(b.values.value)) e = AmCharts.formatDuration(b.values.value, f, "", e.durationUnits, e.maxInterval, d), a = a.replace(RegExp("\\[\\[value\\]\\]", "g"), e);
		e = "value open low high close total".split(" ");
		f = this.percentFormatter;
		a = AmCharts.formatValue(a, b.percents, e, f, "percents.");
		a = AmCharts.formatValue(a, b.values, e, d, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
		a = AmCharts.formatValue(a, b.values, ["percents"], f); - 1 != a.indexOf("[[") && (a = AmCharts.formatDataContextValue(a, b.dataContext));
		return a = AmCharts.AmSerialChart.base.formatString.call(this, a, b)
	},
	addChartScrollbar: function(a) {
		AmCharts.callMethod("destroy", [this.chartScrollbar]);
		a && (a.chart = this, this.listenTo(a, "zoomed", this.handleScrollbarZoom));
		this.rotate ? void 0 == a.width && (a.width = a.scrollbarHeight) : void 0 == a.height && (a.height = a.scrollbarHeight);
		this.chartScrollbar = a
	},
	removeChartScrollbar: function() {
		AmCharts.callMethod("destroy", [this.chartScrollbar]);
		this.chartScrollbar = null
	},
	handleReleaseOutside: function(a) {
		AmCharts.AmSerialChart.base.handleReleaseOutside.call(this, a);
		AmCharts.callMethod("handleReleaseOutside", [this.chartScrollbar])
	}
});
AmCharts.AmRadarChart = AmCharts.Class({
	inherits: AmCharts.AmCoordinateChart,
	construct: function() {
		AmCharts.AmRadarChart.base.construct.call(this);
		this.marginRight = this.marginBottom = this.marginTop = this.marginLeft = 0;
		this.chartType = "radar";
		this.radius = "35%"
	},
	initChart: function() {
		AmCharts.AmRadarChart.base.initChart.call(this);
		this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);
		this.drawChart()
	},
	updateData: function() {
		this.parseData();
		for (var a = this.graphs, b = 0; b < a.length; b++) a[b].data = this.chartData
	},
	updateGraphs: function() {
		for (var a = this.graphs, b = 0; b < a.length; b++) {
			var d = a[b];
			d.index = b;
			d.width = this.realRadius;
			d.height = this.realRadius;
			d.x = this.marginLeftReal;
			d.y = this.marginTopReal;
			d.chartType = this.chartType
		}
	},
	parseData: function() {
		AmCharts.AmRadarChart.base.parseData.call(this);
		this.parseSerialData()
	},
	updateValueAxes: function() {
		for (var a = this.valueAxes, b = 0; b < a.length; b++) {
			var d = a[b];
			d.axisRenderer = AmCharts.RadAxis;
			d.guideFillRenderer = AmCharts.RadarFill;
			d.axisItemRenderer = AmCharts.RadItem;
			d.autoGridCount = !1;
			d.x = this.marginLeftReal;
			d.y = this.marginTopReal;
			d.width = this.realRadius;
			d.height = this.realRadius
		}
	},
	drawChart: function() {
		AmCharts.AmRadarChart.base.drawChart.call(this);
		var a = this.updateWidth(),
			b = this.updateHeight(),
			d = this.marginTop + this.getTitleHeight(),
			e = this.marginLeft,
			b = b - d - this.marginBottom;
		this.marginLeftReal = e + (a - e - this.marginRight) / 2;
		this.marginTopReal = d + b / 2;
		this.realRadius = AmCharts.toCoordinate(this.radius, a, b);
		this.updateValueAxes();
		this.updateGraphs();
		a = this.chartData;
		if (AmCharts.ifArray(a)) {
			if (0 < this.realWidth && 0 < this.realHeight) {
				a = a.length - 1;
				e = this.valueAxes;
				for (d = 0; d < e.length; d++) e[d].zoom(0, a);
				e = this.graphs;
				for (d = 0; d < e.length; d++) e[d].zoom(0, a)
			}
		} else this.cleanChart();
		this.dispDUpd();
		this.chartCreated = !0
	},
	formatString: function(a, b) {
		var d = b.graph; - 1 != a.indexOf("[[category]]") && (a = a.replace(/\[\[category\]\]/g, String(b.serialDataItem.category)));
		d = d.numberFormatter;
		d || (d = this.numberFormatter);
		a = AmCharts.formatValue(a, b.values, ["value"], d, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
		return a = AmCharts.AmRadarChart.base.formatString.call(this, a, b)
	},
	cleanChart: function() {
		this.callMethod("destroy", [this.valueAxes, this.graphs])
	}
});
AmCharts.AxisBase = AmCharts.Class({
	construct: function() {
		this.viY = this.viX = this.y = this.x = this.dy = this.dx = 0;
		this.axisWidth;
		this.axisThickness = 1;
		this.axisColor = "#000000";
		this.axisAlpha = 1;
		this.gridCount = this.tickLength = 5;
		this.gridAlpha = 0.15;
		this.gridThickness = 1;
		this.gridColor = "#000000";
		this.dashLength = 0;
		this.labelFrequency = 1;
		this.showLastLabel = this.showFirstLabel = !0;
		this.fillColor = "#FFFFFF";
		this.fillAlpha = 0;
		this.labelsEnabled = !0;
		this.labelRotation = 0;
		this.autoGridCount = !0;
		this.valueRollOverColor = "#CC0000";
		this.offset = 0;
		this.guides = [];
		this.visible = !0;
		this.counter = 0;
		this.guides = [];
		this.ignoreAxisWidth = this.inside = !1;
		this.titleColor;
		this.titleFontSize;
		this.titleBold = !0
	},
	zoom: function(a, b) {
		this.start = a;
		this.end = b;
		this.dataChanged = !0;
		this.draw()
	},
	fixAxisPosition: function() {
		var a = this.position;
		"H" == this.orientation ? ("left" == a && (a = "bottom"), "right" == a && (a = "top")) : ("bottom" == a && (a = "left"), "top" == a && (a = "right"));
		this.position = a
	},
	draw: function() {
		var a = this.chart;
		void 0 == this.titleColor && (this.titleColor = a.color);
		isNaN(this.titleFontSize) && (this.titleFontSize = a.fontSize + 1);
		this.allLabels = [];
		this.counter = 0;
		this.destroy();
		this.fixAxisPosition();
		this.labels = [];
		var b = a.container,
			d = b.set();
		a.gridSet.push(d);
		this.set = d;
		b = b.set();
		a.axesLabelsSet.push(b);
		this.labelsSet = b;
		this.axisLine = new this.axisRenderer(this);
		this.autoGridCount && ("V" == this.orientation ? (a = this.height / 35, 3 > a && (a = 3)) : a = this.width / 75, this.gridCount = a);
		this.axisWidth = this.axisLine.axisWidth;
		this.addTitle()
	},
	setOrientation: function(a) {
		this.orientation = a ? "H" : "V"
	},
	addTitle: function() {
		var a = this.title;
		if (a) {
			var b = this.chart;
			this.titleLabel = AmCharts.text(b.container, a, this.titleColor, b.fontFamily, this.titleFontSize, "middle", this.titleBold)
		}
	},
	positionTitle: function() {
		var a = this.titleLabel;
		if (a) {
			var b, d, e = this.labelsSet,
				f = {};
			0 < e.length() ? f = e.getBBox() : (f.x = 0, f.y = 0, f.width = this.viW, f.height = this.viH);
			e.push(a);
			var e = f.x,
				g = f.y;
			AmCharts.VML && (this.rotate ? e -= this.x : g -= this.y);
			var h = f.width,
				f = f.height,
				j = this.viW,
				k = this.viH;
			a.getBBox();
			var l = 0,
				m = this.titleFontSize / 2,
				n = this.inside;
			switch (this.position) {
			case "top":
				b = j / 2;
				d = g - 10 - m;
				break;
			case "bottom":
				b = j / 2;
				d = g + f + 10 + m;
				break;
			case "left":
				b = e - 10 - m;
				n && (b -= 5);
				d = k / 2;
				l = -90;
				break;
			case "right":
				b = e + h + 10 + m - 3, n && (b += 7), d = k / 2, l = -90
			}
			this.marginsChanged ? (a.translate(b, d), this.tx = b, this.ty = d) : a.translate(this.tx, this.ty);
			this.marginsChanged = !1;
			0 != l && a.rotate(l)
		}
	},
	pushAxisItem: function(a) {
		var b = a.graphics();
		0 < b.length() && this.set.push(b);
		(a = a.getLabel()) && this.labelsSet.push(a)
	},
	addGuide: function(a) {
		this.guides.push(a)
	},
	removeGuide: function(a) {
		for (var b = this.guides, d = 0; d < b.length; d++) b[d] == a && b.splice(d, 1)
	},
	handleGuideOver: function(a) {
		clearTimeout(this.chart.hoverInt);
		var b = a.graphics.getBBox(),
			d = b.x + b.width / 2,
			b = b.y + b.height / 2,
			e = a.fillColor;
		void 0 == e && (e = a.lineColor);
		this.chart.showBalloon(a.balloonText, e, !0, d, b)
	},
	handleGuideOut: function() {
		this.chart.hideBalloon()
	},
	addEventListeners: function(a, b) {
		var d = this;
		a.mouseover(function() {
			d.handleGuideOver(b)
		});
		a.mouseout(function() {
			d.handleGuideOut(b)
		})
	},
	getBBox: function() {
		var a = this.labelsSet.getBBox();
		AmCharts.VML || (a = {
			x: a.x + this.x,
			y: a.y + this.y,
			width: a.width,
			height: a.height
		});
		return a
	},
	destroy: function() {
		AmCharts.remove(this.set);
		AmCharts.remove(this.labelsSet);
		var a = this.axisLine;
		a && AmCharts.remove(a.set);
		AmCharts.remove(this.grid0)
	}
});
AmCharts.ValueAxis = AmCharts.Class({
	inherits: AmCharts.AxisBase,
	construct: function() {
		this.createEvents("axisChanged", "logarithmicAxisFailed", "axisSelfZoomed", "axisZoomed");
		AmCharts.ValueAxis.base.construct.call(this);
		this.dataChanged = !0;
		this.gridCount = 8;
		this.stackType = "none";
		this.position = "left";
		this.unitPosition = "right";
		this.recalculateToPercents = this.includeHidden = this.includeGuidesInMinMax = this.integersOnly = !1;
		this.duration;
		this.durationUnits = {
			DD: "d. ",
			hh: ":",
			mm: ":",
			ss: ""
		};
		this.scrollbar = !1;
		this.maxDecCount;
		this.baseValue = 0;
		this.radarCategoriesEnabled = !0;
		this.gridType = "polygons";
		this.useScientificNotation = !1;
		this.axisTitleOffset = 10;
		this.minMaxMultiplier = 1
	},
	updateData: function() {
		0 >= this.gridCount && (this.gridCount = 1);
		this.totals = [];
		this.data = this.chart.chartData;
		"xy" != this.chart.chartType && (this.stackGraphs("smoothedLine"), this.stackGraphs("line"), this.stackGraphs("column"), this.stackGraphs("step"));
		this.recalculateToPercents && this.recalculate();
		this.synchronizationMultiplier && this.synchronizeWithAxis ? this.foundGraphs = !0 : (this.foundGraphs = !1, this.getMinMax())
	},
	draw: function() {
		AmCharts.ValueAxis.base.draw.call(this);
		var a = this.chart,
			b = this.set;
		"duration" == this.type && (this.duration = "ss");
		!0 == this.dataChanged && (this.updateData(), this.dataChanged = !1);
		if (this.logarithmic && (0 >= this.getMin(0, this.data.length - 1) || 0 >= this.minimum)) this.fire("logarithmicAxisFailed", {
			type: "logarithmicAxisFailed",
			chart: a
		});
		else {
			this.grid0 = null;
			var d, e, f = a.dx,
				g = a.dy,
				h = !1,
				j = this.logarithmic,
				k = a.chartType;
			if (!isNaN(this.min) && !isNaN(this.max) && this.foundGraphs && Infinity != this.min && -Infinity != this.max) {
				var l = this.labelFrequency,
					m = this.showFirstLabel,
					n = this.showLastLabel,
					t = 1,
					r = 0,
					q = Math.round((this.max - this.min) / this.step) + 1;
				if (!0 == j) {
					var p = Math.log(this.max) * Math.LOG10E - Math.log(this.minReal) * Math.LOG10E;
					this.stepWidth = this.axisWidth / p;
					2 < p && (q = Math.ceil(Math.log(this.max) * Math.LOG10E) + 1, r = Math.round(Math.log(this.minReal) * Math.LOG10E), q > this.gridCount && (t = Math.ceil(q / this.gridCount)))
				} else this.stepWidth = this.axisWidth / (this.max - this.min);
				d = 0;
				1 > this.step && -1 < this.step && (d = this.getDecimals(this.step));
				this.integersOnly && (d = 0);
				d > this.maxDecCount && (d = this.maxDecCount);
				isNaN(this.precision) || (d = this.precision);
				this.max = AmCharts.roundTo(this.max, this.maxDecCount);
				this.min = AmCharts.roundTo(this.min, this.maxDecCount);
				var s = {};
				s.precision = d;
				s.decimalSeparator = a.numberFormatter.decimalSeparator;
				s.thousandsSeparator = a.numberFormatter.thousandsSeparator;
				this.numberFormatter = s;
				var u = this.guides,
					v = u.length;
				if (0 < v) {
					var y = this.fillAlpha;
					for (e = this.fillAlpha = 0; e < v; e++) {
						var z = u[e],
							A = NaN;
						if (!isNaN(z.toValue)) {
							var A = this.getCoordinate(z.toValue),
								w = new this.axisItemRenderer(this, A, "", !0, NaN, NaN, z);
							this.pushAxisItem(w)
						}
						var x = NaN;
						isNaN(z.value) || (x = this.getCoordinate(z.value), w = new this.axisItemRenderer(this, x, z.label, !0, NaN, (A - x) / 2, z), this.pushAxisItem(w));
						isNaN(A - x) || (w = new this.guideFillRenderer(this, x, A, z), this.pushAxisItem(w), w = w.graphics(), z.graphics = w, z.balloonText && this.addEventListeners(w, z))
					}
					this.fillAlpha = y
				}
				u = !1;
				for (e = r; e < q; e += t) w = AmCharts.roundTo(this.step * e + this.min, d), -1 != String(w).indexOf("e") && (u = !0, String(w).split("e"));
				this.duration && (this.maxInterval = AmCharts.getMaxInterval(this.max, this.duration));
				for (e = r; e < q; e += t) if (r = this.step * e + this.min, r = AmCharts.roundTo(r, this.maxDecCount + 1), !(this.integersOnly && Math.round(r) != r)) {
					!0 == j && (0 == r && (r = this.minReal), 2 < p && (r = Math.pow(10, e)), u = -1 != String(r).indexOf("e") ? !0 : !1);
					this.useScientificNotation && (u = !0);
					this.usePrefixes && (u = !1);
					u ? (w = -1 == String(r).indexOf("e") ? r.toExponential(15) : String(r), w = w.split("e"), d = Number(w[0]), w = Number(w[1]), d = AmCharts.roundTo(d, 14), 10 == d && (d = 1, w += 1), w = d + "e" + w, 0 == r && (w = "0"), 1 == r && (w = "1")) : (j && (d = String(r).split("."), s.precision = d[1] ? d[1].length : -1), w = this.usePrefixes ? AmCharts.addPrefix(r, a.prefixesOfBigNumbers, a.prefixesOfSmallNumbers, s) : AmCharts.formatNumber(r, s, s.precision));
					this.duration && (w = AmCharts.formatDuration(r, this.duration, "", this.durationUnits, this.maxInterval, s));
					this.recalculateToPercents ? w += "%" : (d = this.unit) && (w = "left" == this.unitPosition ? d + w : w + d);
					Math.round(e / l) != e / l && (w = void 0);
					if (0 == e && !m || e == q - 1 && !n) w = " ";
					d = this.getCoordinate(r);
					w = new this.axisItemRenderer(this, d, w);
					this.pushAxisItem(w);
					if (r == this.baseValue && "radar" != k) {
						var B, G, v = this.viW,
							y = this.viH,
							r = this.viX,
							w = this.viY;
						"H" == this.orientation ? 0 <= d && d <= v + 1 && (B = [d, d, d + f], G = [y, 0, g]) : 0 <= d && d <= y + 1 && (B = [0, v, v + f], G = [d, d, d + g]);
						B && (d = AmCharts.fitToBounds(2 * this.gridAlpha, 0, 1), d = AmCharts.line(a.container, B, G, this.gridColor, d, 1, this.dashLength), d.translate(r, w), this.grid0 = d, a.axesSet.push(d), d.toBack())
					}
				}
				e = this.baseValue;
				this.min > this.baseValue && this.max > this.baseValue && (e = this.min);
				this.min < this.baseValue && this.max < this.baseValue && (e = this.max);
				j && e < this.minReal && (e = this.minReal);
				this.baseCoord = this.getCoordinate(e);
				a = {
					type: "axisChanged",
					target: this,
					chart: a
				};
				a.min = j ? this.minReal : this.min;
				a.max = this.max;
				this.fire("axisChanged", a);
				this.axisCreated = !0
			} else h = !0;
			j = this.axisLine.set;
			a = this.labelsSet;
			this.positionTitle();
			"radar" != k ? (k = this.viX, e = this.viY, b.translate(k, e), a.translate(k, e)) : j.toFront();
			!this.visible || h ? (b.hide(), j.hide(), a.hide()) : (b.show(), j.show(), a.show())
		}
	},
	getDecimals: function(a) {
		var b = 0;
		isNaN(a) || (a = String(a), -1 != a.indexOf("e-") ? b = Number(a.split("-")[1]) : -1 != a.indexOf(".") && (b = a.split(".")[1].length));
		return b
	},
	stackGraphs: function(a) {
		var b = this.stackType;
		"stacked" == b && (b = "regular");
		"line" == b && (b = "none");
		"100% stacked" == b && (b = "100%");
		this.stackType = b;
		var d = [],
			e = [],
			f = [],
			g = [],
			h, j = this.chart.graphs,
			k, l, m, n, t = this.baseValue;
		if ("line" == a || "step" == a || "smoothedLine" == a) linetype = !0;
		for (n = this.start; n <= this.end; n++) {
			var r = 0;
			for (m = 0; m < j.length; m++) if (l = j[m], !l.hidden && (k = l.type, l.chart == this.chart && (l.valueAxis == this && a == k && l.stackable) && (k = this.data[n].axes[this.id].graphs[l.id], h = k.values.value, !isNaN(h)))) {
				var q = this.getDecimals(h);
				r < q && (r = q);
				g[n] = isNaN(g[n]) ? Math.abs(h) : g[n] + Math.abs(h);
				g[n] = AmCharts.roundTo(g[n], r);
				l = l.fillToGraph;
				linetype && l && (k.values.open = this.data[n].axes[this.id].graphs[l.id].values.value);
				"regular" == b && (linetype && (isNaN(d[n]) ? (d[n] = h, k.values.close = h, k.values.open = this.baseValue) : (k.values.close = isNaN(h) ? d[n] : h + d[n], k.values.open = d[n], d[n] = k.values.close)), "column" == a && !isNaN(h) && (k.values.close = h, 0 > h ? (k.values.close = h, isNaN(e[n]) ? k.values.open = t : (k.values.close += e[n], k.values.open = e[n]), e[n] = k.values.close) : (k.values.close = h, isNaN(f[n]) ? k.values.open = t : (k.values.close += f[n], k.values.open = f[n]), f[n] = k.values.close)))
			}
		}
		for (n = this.start; n <= this.end; n++) for (m = 0; m < j.length; m++) l = j[m], l.hidden || (k = l.type, l.chart == this.chart && (l.valueAxis == this && a == k && l.stackable) && (k = this.data[n].axes[this.id].graphs[l.id], h = k.values.value, isNaN(h) || (d = 100 * (h / g[n]), k.values.percents = d, k.values.total = g[n], "100%" == b && (isNaN(e[n]) && (e[n] = 0), isNaN(f[n]) && (f[n] = 0), 0 > d ? (k.values.close = AmCharts.fitToBounds(d + e[n], -100, 100), k.values.open = e[n], e[n] = k.values.close) : (k.values.close = AmCharts.fitToBounds(d + f[n], -100, 100), k.values.open = f[n], f[n] = k.values.close)))))
	},
	recalculate: function() {
		for (var a = this.chart.graphs, b = 0; b < a.length; b++) {
			var d = a[b];
			if (d.valueAxis == this) {
				var e = "value";
				if ("candlestick" == d.type || "ohlc" == d.type) e = "open";
				var f, g, h = this.end + 2,
					h = AmCharts.fitToBounds(this.end + 1, 0, this.data.length - 1),
					j = this.start;
				0 < j && j--;
				for (var k = this.start; k <= h && !(g = this.data[k].axes[this.id].graphs[d.id], f = g.values[e], !isNaN(f)); k++);
				for (e = j; e <= h; e++) {
					g = this.data[e].axes[this.id].graphs[d.id];
					g.percents = {};
					var j = g.values,
						l;
					for (l in j) g.percents[l] = "percents" != l ? 100 * (j[l] / f) - 100 : j[l]
				}
			}
		}
	},
	getMinMax: function() {
		for (var a = !1, b = this.chart, d = b.graphs, e = 0; e < d.length; e++) {
			var f = d[e].type;
			if ("line" == f || "step" == f || "smoothedLine" == f) this.expandMinMax && (a = !0)
		}
		a && (0 < this.start && this.start--, this.end < this.data.length - 1 && this.end++);
		"serial" == b.chartType && !0 == b.categoryAxis.parseDates && !a && this.end < this.data.length - 1 && this.end++;
		a = this.minMaxMultiplier;
		this.min = this.getMin(this.start, this.end);
		this.max = this.getMax();
		a = (this.max - this.min) * (a - 1);
		this.min -= a;
		this.max += a;
		a = this.guides.length;
		if (this.includeGuidesInMinMax && 0 < a) for (b = 0; b < a; b++) d = this.guides[b], d.toValue < this.min && (this.min = d.toValue), d.value < this.min && (this.min = d.value), d.toValue > this.max && (this.max = d.toValue), d.value > this.max && (this.max = d.value);
		isNaN(this.minimum) || (this.min = this.minimum);
		isNaN(this.maximum) || (this.max = this.maximum);
		this.min > this.max && (a = this.max, this.max = this.min, this.min = a);
		isNaN(this.minTemp) || (this.min = this.minTemp);
		isNaN(this.maxTemp) || (this.max = this.maxTemp);
		this.minReal = this.min;
		this.maxReal = this.max;
		0 == this.min && 0 == this.max && (this.max = 9);
		this.min > this.max && (this.min = this.max - 1);
		a = this.min;
		b = this.max;
		d = this.max - this.min;
		e = 0 == d ? Math.pow(10, Math.floor(Math.log(Math.abs(this.max)) * Math.LOG10E)) / 10 : Math.pow(10, Math.floor(Math.log(Math.abs(d)) * Math.LOG10E)) / 10;
		isNaN(this.maximum) && isNaN(this.maxTemp) && (this.max = Math.ceil(this.max / e) * e + e);
		isNaN(this.minimum) && isNaN(this.minTemp) && (this.min = Math.floor(this.min / e) * e - e);
		0 > this.min && 0 <= a && (this.min = 0);
		0 < this.max && 0 >= b && (this.max = 0);
		"100%" == this.stackType && (this.min = 0 > this.min ? -100 : 0, this.max = 0 > this.max ? 0 : 100);
		d = this.max - this.min;
		e = Math.pow(10, Math.floor(Math.log(Math.abs(d)) * Math.LOG10E)) / 10;
		this.step = Math.ceil(d / this.gridCount / e) * e;
		d = Math.pow(10, Math.floor(Math.log(Math.abs(this.step)) * Math.LOG10E));
		d = d.toExponential(0).split("e");
		e = Number(d[1]);
		9 == Number(d[0]) && e++;
		d = this.generateNumber(1, e);
		e = Math.ceil(this.step / d);
		5 < e && (e = 10);
		5 >= e && 2 < e && (e = 5);
		this.step = Math.ceil(this.step / (d * e)) * d * e;
		1 > d ? (this.maxDecCount = Math.abs(Math.log(Math.abs(d)) * Math.LOG10E), this.maxDecCount = Math.round(this.maxDecCount), this.step = AmCharts.roundTo(this.step, this.maxDecCount + 1)) : this.maxDecCount = 0;
		this.min = this.step * Math.floor(this.min / this.step);
		this.max = this.step * Math.ceil(this.max / this.step);
		0 > this.min && 0 <= a && (this.min = 0);
		0 < this.max && 0 >= b && (this.max = 0);
		1 < this.minReal && 1 < this.max - this.minReal && (this.minReal = Math.floor(this.minReal));
		d = Math.pow(10, Math.floor(Math.log(Math.abs(this.minReal)) * Math.LOG10E));
		0 == this.min && (this.minReal = d);
		0 == this.min && 1 < this.minReal && (this.minReal = 1);
		0 < this.min && 0 < this.minReal - this.step && (this.minReal = this.min + this.step < this.minReal ? this.min + this.step : this.min);
		d = Math.log(b) * Math.LOG10E - Math.log(a) * Math.LOG10E;
		this.logarithmic && (2 < d ? (this.minReal = this.min = Math.pow(10, Math.floor(Math.log(Math.abs(a)) * Math.LOG10E)), this.max = Math.pow(10, Math.ceil(Math.log(Math.abs(b)) * Math.LOG10E))) : (b = Math.pow(10, Math.floor(Math.log(Math.abs(this.min)) * Math.LOG10E)) / 10, a = Math.pow(10, Math.floor(Math.log(Math.abs(a)) * Math.LOG10E)) / 10, b < a && (this.minReal = this.min = 10 * a)))
	},
	generateNumber: function(a, b) {
		var d = "",
			e;
		e = 0 > b ? Math.abs(b) - 1 : Math.abs(b);
		for (var f = 0; f < e; f++) d += "0";
		return 0 > b ? Number("0." + d + String(a)) : Number(String(a) + d)
	},
	getMin: function(a, b) {
		for (var d, e = a; e <= b; e++) {
			var f = this.data[e].axes[this.id].graphs,
				g;
			for (g in f) {
				var h = this.chart.getGraphById(g);
				if (h.includeInMinMax && (!h.hidden || this.includeHidden)) {
					isNaN(d) && (d = Infinity);
					this.foundGraphs = !0;
					h = f[g].values;
					this.recalculateToPercents && (h = f[g].percents);
					var j;
					if (this.minMaxField) j = h[this.minMaxField], j < d && (d = j);
					else for (var k in h)"percents" != k && "total" != k && (j = h[k], j < d && (d = j))
				}
			}
		}
		return d
	},
	getMax: function() {
		for (var a, b = this.start; b <= this.end; b++) {
			var d = this.data[b].axes[this.id].graphs,
				e;
			for (e in d) {
				var f = this.chart.getGraphById(e);
				if (f.includeInMinMax && (!f.hidden || this.includeHidden)) {
					isNaN(a) && (a = -Infinity);
					this.foundGraphs = !0;
					f = d[e].values;
					this.recalculateToPercents && (f = d[e].percents);
					var g;
					if (this.minMaxField) g = f[this.minMaxField], g > a && (a = g);
					else for (var h in f)"percents" != h && "total" != h && (g = f[h], g > a && (a = g))
				}
			}
		}
		return a
	},
	dispatchZoomEvent: function(a, b) {
		var d = {
			type: "axisZoomed",
			startValue: a,
			endValue: b,
			target: this,
			chart: this.chart
		};
		this.fire(d.type, d)
	},
	zoomToValues: function(a, b) {
		if (b < a) {
			var d = b;
			b = a;
			a = d
		}
		a < this.min && (a = this.min);
		b > this.max && (b = this.max);
		d = {
			type: "axisSelfZoomed"
		};
		d.chart = this.chart;
		d.valueAxis = this;
		d.multiplier = this.axisWidth / Math.abs(this.getCoordinate(b) - this.getCoordinate(a));
		d.position = "V" == this.orientation ? this.reversed ? this.getCoordinate(a) - this.y : this.getCoordinate(b) - this.y : this.reversed ? this.getCoordinate(b) - this.x : this.getCoordinate(a) - this.x;
		this.fire(d.type, d)
	},
	coordinateToValue: function(a) {
		if (isNaN(a)) return NaN;
		var b = this.axisWidth,
			d = this.stepWidth,
			e = this.reversed,
			f = this.rotate,
			g = this.min,
			h = this.minReal;
		return !0 == this.logarithmic ? Math.pow(10, (f ? !0 == e ? (b - a) / d : a / d : !0 == e ? a / d : (b - a) / d) + Math.log(h) * Math.LOG10E) : !0 == e ? f ? g - (a - b) / d : a / d + g : f ? a / d + g : g - (a - b) / d
	},
	getCoordinate: function(a) {
		if (isNaN(a)) return NaN;
		var b = this.rotate,
			d = this.reversed,
			e = this.axisWidth,
			f = this.stepWidth,
			g = this.min,
			h = this.minReal;
		!0 == this.logarithmic ? (a = Math.log(a) * Math.LOG10E - Math.log(h) * Math.LOG10E, b = b ? !0 == d ? e - f * a : f * a : !0 == d ? f * a : e - f * a) : b = !0 == d ? b ? e - f * (a - g) : f * (a - g) : b ? f * (a - g) : e - f * (a - g);
		b = this.rotate ? b + (this.x - this.viX) : b + (this.y - this.viY);
		return Math.round(b)
	},
	synchronizeWithAxis: function(a) {
		this.synchronizeWithAxis = a;
		this.removeListener(this.synchronizeWithAxis, "axisChanged", this.handleSynchronization);
		this.listenTo(this.synchronizeWithAxis, "axisChanged", this.handleSynchronization)
	},
	handleSynchronization: function() {
		var a = this.synchronizeWithAxis,
			b = a.min,
			d = a.max,
			a = a.step,
			e = this.synchronizationMultiplier;
		e && (this.min = b * e, this.max = d * e, this.step = a * e, b = Math.pow(10, Math.floor(Math.log(Math.abs(this.step)) * Math.LOG10E)), b = Math.abs(Math.log(Math.abs(b)) * Math.LOG10E), this.maxDecCount = b = Math.round(b), this.draw())
	}
});
AmCharts.CategoryAxis = AmCharts.Class({
	inherits: AmCharts.AxisBase,
	construct: function() {
		AmCharts.CategoryAxis.base.construct.call(this);
		this.minPeriod = "DD";
		this.equalSpacing = this.parseDates = !1;
		this.position = "bottom";
		this.startOnAxis = !1;
		this.firstDayOfWeek = 1;
		this.gridPosition = "middle";
		this.boldPeriodBeginning = !0;
		this.periods = [{
			period: "ss",
			count: 1
		}, {
			period: "ss",
			count: 5
		}, {
			period: "ss",
			count: 10
		}, {
			period: "ss",
			count: 30
		}, {
			period: "mm",
			count: 1
		}, {
			period: "mm",
			count: 5
		}, {
			period: "mm",
			count: 10
		}, {
			period: "mm",
			count: 30
		}, {
			period: "hh",
			count: 1
		}, {
			period: "hh",
			count: 3
		}, {
			period: "hh",
			count: 6
		}, {
			period: "hh",
			count: 12
		}, {
			period: "DD",
			count: 1
		}, {
			period: "DD",
			count: 2
		}, {
			period: "WW",
			count: 1
		}, {
			period: "MM",
			count: 1
		}, {
			period: "MM",
			count: 2
		}, {
			period: "MM",
			count: 3
		}, {
			period: "MM",
			count: 6
		}, {
			period: "YYYY",
			count: 1
		}, {
			period: "YYYY",
			count: 2
		}, {
			period: "YYYY",
			count: 5
		}, {
			period: "YYYY",
			count: 10
		}, {
			period: "YYYY",
			count: 50
		}, {
			period: "YYYY",
			count: 100
		}];
		this.dateFormats = [{
			period: "fff",
			format: "JJ:NN:SS"
		}, {
			period: "ss",
			format: "JJ:NN:SS"
		}, {
			period: "mm",
			format: "JJ:NN"
		}, {
			period: "hh",
			format: "JJ:NN"
		}, {
			period: "DD",
			format: "MMM DD"
		}, {
			period: "WW",
			format: "MMM DD"
		}, {
			period: "MM",
			format: "MMM"
		}, {
			period: "YYYY",
			format: "YYYY"
		}];
		this.nextPeriod = {};
		this.nextPeriod.fff = "ss";
		this.nextPeriod.ss = "mm";
		this.nextPeriod.mm = "hh";
		this.nextPeriod.hh = "DD";
		this.nextPeriod.DD = "MM";
		this.nextPeriod.MM = "YYYY"
	},
	draw: function() {
		AmCharts.CategoryAxis.base.draw.call(this);
		this.generateDFObject();
		var a = this.chart.chartData;
		this.data = a;
		if (AmCharts.ifArray(a)) {
			var b = this.chart,
				d = this.start,
				e = this.labelFrequency,
				f = 0,
				g = this.end - d + 1,
				h = this.gridCount,
				j = this.showFirstLabel,
				k = this.showLastLabel,
				l, m = "",
				m = AmCharts.extractPeriod(this.minPeriod);
			l = AmCharts.getPeriodDuration(m.period, m.count);
			var n, t, r, q, p;
			n = this.rotate;
			var s = this.firstDayOfWeek,
				u = this.boldPeriodBeginning,
				a = AmCharts.resetDateToMin(new Date(a[a.length - 1].time + 1.05 * l), this.minPeriod, 1, s).getTime();
			this.endTime > a && (this.endTime = a);
			if (this.parseDates && !this.equalSpacing) {
				if (this.timeDifference = this.endTime - this.startTime, d = this.choosePeriod(0), e = d.period, n = d.count, t = AmCharts.getPeriodDuration(e, n), t < l && (e = m.period, n = m.count, t = l), a = e, "WW" == a && (a = "DD"), this.stepWidth = this.getStepWidth(this.timeDifference), h = Math.ceil(this.timeDifference / t) + 1, m = AmCharts.resetDateToMin(new Date(this.startTime - t), e, n, s).getTime(), a == e && 1 == n && (r = t * this.stepWidth), this.cellWidth = l * this.stepWidth, g = Math.round(m / t), d = -1, g / 2 == Math.round(g / 2) && (d = -2, m -= t), 0 < this.gridCount) for (g = d; g <= h; g++) {
					q = m + 1.5 * t;
					q = AmCharts.resetDateToMin(new Date(q), e, n, s).getTime();
					l = (q - this.startTime) * this.stepWidth;
					p = !1;
					this.nextPeriod[a] && (p = this.checkPeriodChange(this.nextPeriod[a], 1, q, m));
					var v = !1;
					p ? (m = this.dateFormatsObject[this.nextPeriod[a]], v = !0) : m = this.dateFormatsObject[a];
					u || (v = !1);
					m = AmCharts.formatDate(new Date(q), m);
					if (g == d && !j || g == h && !k) m = " ";
					l = new this.axisItemRenderer(this, l, m, !1, r, 0, !1, v);
					this.pushAxisItem(l);
					m = q
				}
			} else if (this.parseDates) {
				if (this.parseDates && this.equalSpacing) {
					f = this.start;
					this.startTime = this.data[this.start].time;
					this.endTime = this.data[this.end].time;
					this.timeDifference = this.endTime - this.startTime;
					d = this.choosePeriod(0);
					e = d.period;
					n = d.count;
					t = AmCharts.getPeriodDuration(e, n);
					t < l && (e = m.period, n = m.count, t = l);
					a = e;
					"WW" == a && (a = "DD");
					this.stepWidth = this.getStepWidth(g);
					h = Math.ceil(this.timeDifference / t) + 1;
					m = AmCharts.resetDateToMin(new Date(this.startTime - t), e, n, s).getTime();
					this.cellWidth = this.getStepWidth(g);
					g = Math.round(m / t);
					d = -1;
					g / 2 == Math.round(g / 2) && (d = -2, m -= t);
					g = this.start;
					g / 2 == Math.round(g / 2) && g--;
					0 > g && (g = 0);
					r = this.end + 2;
					r >= this.data.length && (r = this.data.length);
					s = !1;
					for (this.end - this.start > this.gridCount && (s = !0); g < r; g++) if (q = this.data[g].time, this.checkPeriodChange(e, n, q, m)) {
						l = this.getCoordinate(g - this.start);
						p = !1;
						this.nextPeriod[a] && (p = this.checkPeriodChange(this.nextPeriod[a], 1, q, m));
						v = !1;
						p ? (m = this.dateFormatsObject[this.nextPeriod[a]], v = !0) : m = this.dateFormatsObject[a];
						m = AmCharts.formatDate(new Date(q), m);
						if (g == d && !j || g == h && !k) m = " ";
						s ? s = !1 : (u || (v = !1), l = new this.axisItemRenderer(this, l, m, void 0, void 0, void 0, void 0, v), l.graphics(), this.pushAxisItem(l));
						m = q
					}
				}
			} else if (this.cellWidth = this.getStepWidth(g), g < h && (h = g), f += this.start, this.stepWidth = this.getStepWidth(g), 0 < h) {
				u = Math.floor(g / h);
				g = f;
				g / 2 == Math.round(g / 2) && g--;
				0 > g && (g = 0);
				for (h = 0; g <= this.end + 2; g += u) {
					m = 0 <= g && g < this.data.length ? this.data[g].category : "";
					l = this.getCoordinate(g - f);
					r = 0;
					"start" == this.gridPosition && (l -= this.cellWidth / 2, r = this.cellWidth / 2);
					if (g == d && !j || g == this.end && !k) m = void 0;
					Math.round(h / e) != h / e && (m = void 0);
					h++;
					s = this.cellWidth;
					n && (s = NaN);
					l = new this.axisItemRenderer(this, l, m, !0, s, r, void 0, !1, r);
					this.pushAxisItem(l)
				}
			}
			for (g = 0; g < this.data.length; g++) if (j = this.data[g]) k = this.parseDates && !this.equalSpacing ? Math.round((j.time - this.startTime) * this.stepWidth + this.cellWidth / 2) : this.getCoordinate(g - f), j.x[this.id] = k
		}
		j = this.guides.length;
		for (g = 0; g < j; g++) k = this.guides[g], h = u = d = NaN, k.toCategory && (h = b.getCategoryIndexByValue(k.toCategory), isNaN(h) || (d = this.getCoordinate(h - f), l = new this.axisItemRenderer(this, d, "", !0, NaN, NaN, k), this.pushAxisItem(l))), k.category && (h = b.getCategoryIndexByValue(k.category), isNaN(h) || (u = this.getCoordinate(h - f), h = (d - u) / 2, l = new this.axisItemRenderer(this, u, k.label, !0, NaN, h, k), this.pushAxisItem(l))), k.toDate && (this.equalSpacing ? (h = b.getClosestIndex(this.data, "time", k.toDate.getTime(), !1, 0, this.data.length - 1), isNaN(h) || (d = this.getCoordinate(h - f))) : d = (k.toDate.getTime() - this.startTime) * this.stepWidth, l = new this.axisItemRenderer(this, d, "", !0, NaN, NaN, k), this.pushAxisItem(l)), k.date && (this.equalSpacing ? (h = b.getClosestIndex(this.data, "time", k.date.getTime(), !1, 0, this.data.length - 1), isNaN(h) || (u = this.getCoordinate(h - f))) : u = (k.date.getTime() - this.startTime) * this.stepWidth, h = (d - u) / 2, l = "H" == this.orientation ? new this.axisItemRenderer(this, u, k.label, !1, 2 * h, NaN, k) : new this.axisItemRenderer(this, u, k.label, !1, NaN, h, k), this.pushAxisItem(l)), d = new this.guideFillRenderer(this, u, d, k), u = d.graphics(), this.pushAxisItem(d), k.graphics = u, u.index = g, k.balloonText && this.addEventListeners(u, k);
		this.axisCreated = !0;
		b = this.x;
		f = this.y;
		this.set.translate(b, f);
		this.labelsSet.translate(b, f);
		this.positionTitle();
		(b = this.axisLine.set) && b.toFront()
	},
	choosePeriod: function(a) {
		var b = AmCharts.getPeriodDuration(this.periods[a].period, this.periods[a].count),
			b = Math.ceil(this.timeDifference / b),
			d = this.periods;
		return b <= this.gridCount ? d[a] : a + 1 < d.length ? this.choosePeriod(a + 1) : d[a]
	},
	getStepWidth: function(a) {
		var b;
		this.startOnAxis ? (b = this.axisWidth / (a - 1), 1 == a && (b = this.axisWidth)) : b = this.axisWidth / a;
		return b
	},
	getCoordinate: function(a) {
		a *= this.stepWidth;
		this.startOnAxis || (a += this.stepWidth / 2);
		return Math.round(a)
	},
	timeZoom: function(a, b) {
		this.startTime = a;
		this.endTime = b + this.minDuration()
	},
	minDuration: function() {
		var a = AmCharts.extractPeriod(this.minPeriod);
		return AmCharts.getPeriodDuration(a.period, a.count)
	},
	checkPeriodChange: function(a, b, d, e) {
		e = new Date(e);
		var f = this.firstDayOfWeek;
		d = AmCharts.resetDateToMin(new Date(d), a, b, f).getTime();
		a = AmCharts.resetDateToMin(e, a, b, f).getTime();
		return d != a ? !0 : !1
	},
	generateDFObject: function() {
		this.dateFormatsObject = {};
		for (var a = 0; a < this.dateFormats.length; a++) {
			var b = this.dateFormats[a];
			this.dateFormatsObject[b.period] = b.format
		}
	},
	xToIndex: function(a) {
		var b = this.data,
			d = this.chart,
			e = d.rotate,
			f = this.stepWidth;
		this.parseDates && !this.equalSpacing ? (a = this.startTime + Math.round(a / f) - this.minDuration() / 2, d = d.getClosestIndex(b, "time", a, !1, this.start, this.end + 1)) : (this.startOnAxis || (a -= f / 2), d = this.start + Math.round(a / f));
		var d = AmCharts.fitToBounds(d, 0, b.length - 1),
			g;
		b[d] && (g = b[d].x[this.id]);
		e ? g > this.height + 1 && d-- : g > this.width + 1 && d--;
		0 > g && d++;
		return d = AmCharts.fitToBounds(d, 0, b.length - 1)
	},
	dateToCoordinate: function(a) {
		return this.parseDates && !this.equalSpacing ? (a.getTime() - this.startTime) * this.stepWidth : this.parseDates && this.equalSpacing ? (a = this.chart.getClosestIndex(this.data, "time", a.getTime(), !1, 0, this.data.length - 1), this.getCoordinate(a - this.start)) : NaN
	},
	categoryToCoordinate: function(a) {
		return this.chart ? (a = this.chart.getCategoryIndexByValue(a), this.getCoordinate(a - this.start)) : NaN
	},
	coordinateToDate: function(a) {
		return this.equalSpacing ? (a = this.xToIndex(a), new Date(this.data[a].time)) : new Date(this.startTime + a / this.stepWidth)
	}
});
AmCharts.RecAxis = AmCharts.Class({
	construct: function(a) {
		var b = a.chart,
			d = a.axisThickness,
			e = a.axisColor,
			f = a.axisAlpha,
			g = a.offset,
			h = a.dx,
			j = a.dy,
			k = a.viX,
			l = a.viY,
			m = a.viH,
			n = a.viW,
			t = b.container;
		"H" == a.orientation ? (e = AmCharts.line(t, [0, n], [0, 0], e, f, d), this.axisWidth = a.width, "bottom" == a.position ? (a = d / 2 + g + m + l - 1, d = k) : (a = -d / 2 - g + l + j, d = h + k)) : (this.axisWidth = a.height, "right" == a.position ? (e = AmCharts.line(t, [0, 0, -h], [0, m, m - j], e, f, d), a = l + j, d = d / 2 + g + h + n + k - 1) : (e = AmCharts.line(t, [0, 0], [0, m], e, f, d), a = l, d = -d / 2 - g + k));
		e.translate(d, a);
		b.axesSet.push(e);
		this.set = e
	}
});
AmCharts.RecItem = AmCharts.Class({
	construct: function(a, b, d, e, f, g, h, j, k) {
		b = Math.round(b);
		void 0 == d && (d = "");
		k || (k = 0);
		void 0 == e && (e = !0);
		var l = a.chart.fontFamily,
			m = a.fontSize;
		void 0 == m && (m = a.chart.fontSize);
		var n = a.color;
		void 0 == n && (n = a.chart.color);
		var t = a.chart.container,
			r = t.set();
		this.set = r;
		var q = a.axisThickness,
			p = a.axisColor,
			s = a.axisAlpha,
			u = a.tickLength,
			v = a.gridAlpha,
			y = a.gridThickness,
			z = a.gridColor,
			A = a.dashLength,
			w = a.fillColor,
			x = a.fillAlpha,
			B = a.labelsEnabled,
			G = a.labelRotation,
			Z = a.counter,
			O = a.inside,
			Q = a.dx,
			I = a.dy,
			W = a.orientation,
			P = a.position,
			U = a.previousCoord,
			fa = a.viH,
			ca = a.viW,
			da = a.offset,
			la, V;
		h ? (B = !0, isNaN(h.tickLength) || (u = h.tickLength), void 0 != h.lineColor && (z = h.lineColor), isNaN(h.lineAlpha) || (v = h.lineAlpha), isNaN(h.dashLength) || (A = h.dashLength), isNaN(h.lineThickness) || (y = h.lineThickness), !0 == h.inside && (O = !0), isNaN(h.labelRotation) || (G = h.labelRotation)) : "" == d && (u = 0);
		V = "start";
		f && (V = "middle");
		var R = G * Math.PI / 180,
			$, H = 0,
			F = 0,
			C = 0,
			ga = $ = 0;
		"V" == W && (G = 0);
		if (B) var X = AmCharts.text(t, d, n, l, m, V, j),
			ga = X.getBBox().width;
		if ("H" == W) {
			if (0 <= b && b <= ca + 1 && (0 < u && (0 < s && b + k <= ca + 1) && (la = AmCharts.line(t, [b + k, b + k], [0, u], p, s, y), r.push(la)), 0 < v && (V = AmCharts.line(t, [b, b + Q, b + Q], [fa, fa + I, I], z, v, y, A), r.push(V))), F = 0, H = b, h && 90 == G && (H -= m), !1 == e ? (V = "start", F = "bottom" == P ? O ? F + u : F - u : O ? F - u : F + u, H += 3, f && (H += f / 2, V = "middle"), 0 < G && (V = "middle")) : V = "middle", 1 == Z && (0 < x && !h && U < ca) && (e = AmCharts.fitToBounds(b, 0, ca), U = AmCharts.fitToBounds(U, 0, ca), $ = e - U, 0 < $ && (fill = AmCharts.rect(t, $, a.height, w, x), fill.translate(e - $ + Q, I), r.push(fill))), "bottom" == P ? (F += fa + m / 2 + da, O ? 0 < G ? (F = fa - ga / 2 * Math.sin(R) - u - 3, H += ga / 2 * Math.cos(R)) : F -= u + m + 3 + 3 : 0 < G ? (F = fa + ga / 2 * Math.sin(R) + u + 3, H -= ga / 2 * Math.cos(R)) : F += u + q + 3 + 3) : (F += I + m / 2 - da, H += Q, O ? 0 < G ? (F = ga / 2 * Math.sin(R) + u + 3, H -= ga / 2 * Math.cos(R)) : F += u + 3 : 0 < G ? (F = -(ga / 2) * Math.sin(R) - u - 6, H += ga / 2 * Math.cos(R)) : F -= u + m + 3 + q + 3), "bottom" == P ? $ = (O ? fa - u - 1 : fa + q - 1) + da : (C = Q, $ = (O ? I : I - u - q + 1) - da), g && (H += g), I = H, 0 < G && (I += ga / 2 * Math.cos(R)), X && (P = 0, O && (P = ga * Math.cos(R)), I + P > ca + 1 || 0 > I)) X.remove(), X = null
		} else {
			0 <= b && b <= fa + 1 && (0 < u && (0 < s && b + k <= fa + 1) && (la = AmCharts.line(t, [0, u], [b + k, b + k], p, s, y), r.push(la)), 0 < v && (V = AmCharts.line(t, [0, Q, ca + Q], [b, b + I, b + I], z, v, y, A), r.push(V)));
			V = "end";
			if (!0 == O && "left" == P || !1 == O && "right" == P) V = "start";
			F = b - m / 2;
			1 == Z && (0 < x && !h) && (e = AmCharts.fitToBounds(b, 0, fa), U = AmCharts.fitToBounds(U, 0, fa), R = e - U, fill = AmCharts.polygon(t, [0, a.width, a.width, 0], [0, 0, R, R], w, x), fill.translate(Q, e - R + I), r.push(fill));
			F += m / 2;
			"right" == P ? (H += Q + ca + da, F += I, O ? (H -= u + 4, g || (F -= m / 2 + 3)) : (H += u + 4 + q, F -= 2)) : O ? (H += u + 4 - da, g || (F -= m / 2 + 3), h && (H += Q, F += I)) : (H += -u - q - 4 - 2 - da, F -= 2);
			la && ("right" == P ? (C += Q + da + ca, $ += I, C = O ? C - q : C + q) : (C -= da, O || (C -= u + q)));
			g && (F += g);
			O = -3;
			"right" == P && (O += I);
			if (X && (F > fa + 1 || F < O)) X.remove(), X = null
		}
		la && la.translate(C, $);
		!1 == a.visible && (la && la.remove(), X && (X.remove(), X = null));
		X && (X.attr({
			"text-anchor": V
		}), X.translate(H, F), 0 != G && X.rotate(-G), a.allLabels.push(X), " " != d && (this.label = X));
		a.counter = 0 == Z ? 1 : 0;
		a.previousCoord = b;
		0 == this.set.node.childNodes.length && this.set.remove()
	},
	graphics: function() {
		return this.set
	},
	getLabel: function() {
		return this.label
	}
});
AmCharts.RecFill = AmCharts.Class({
	construct: function(a, b, d, e) {
		var f = a.dx,
			g = a.dy,
			h = a.orientation,
			j = 0;
		if (d < b) {
			var k = b;
			b = d;
			d = k
		}
		var l = e.fillAlpha;
		isNaN(l) && (l = 0);
		k = a.chart.container;
		e = e.fillColor;
		"V" == h ? (b = AmCharts.fitToBounds(b, 0, a.viH), d = AmCharts.fitToBounds(d, 0, a.viH)) : (b = AmCharts.fitToBounds(b, 0, a.viW), d = AmCharts.fitToBounds(d, 0, a.viW));
		d -= b;
		isNaN(d) && (d = 4, j = 2, l = 0);
		0 > d && "object" == typeof e && (e = e.join(",").split(",").reverse());
		"V" == h ? (a = AmCharts.rect(k, a.width, d, e, l), a.translate(f, b - j + g)) : (a = AmCharts.rect(k, d, a.height, e, l), a.translate(b - j + f, g));
		this.set = k.set([a])
	},
	graphics: function() {
		return this.set
	},
	getLabel: function() {}
});
AmCharts.RadAxis = AmCharts.Class({
	construct: function(a) {
		var b = a.chart,
			d = a.axisThickness,
			e = a.axisColor,
			f = a.axisAlpha,
			g = a.x,
			h = a.y;
		this.set = b.container.set();
		b.axesSet.push(this.set);
		var j = a.axisTitleOffset,
			k = a.radarCategoriesEnabled,
			l = a.chart.fontFamily,
			m = a.fontSize;
		void 0 == m && (m = a.chart.fontSize);
		var n = a.color;
		void 0 == n && (n = a.chart.color);
		if (b) {
			this.axisWidth = a.height;
			a = b.chartData;
			for (var t = a.length, r = 0; r < t; r++) {
				var q = 180 - 360 / t * r,
					p = g + this.axisWidth * Math.sin(q / 180 * Math.PI),
					s = h + this.axisWidth * Math.cos(q / 180 * Math.PI),
					p = AmCharts.line(b.container, [g, p], [h, s], e, f, d);
				this.set.push(p);
				if (k) {
					var u = "start",
						p = g + (this.axisWidth + j) * Math.sin(q / 180 * Math.PI),
						s = h + (this.axisWidth + j) * Math.cos(q / 180 * Math.PI);
					if (180 == q || 0 == q) u = "middle", p -= 5;
					0 > q && (u = "end", p -= 10);
					180 == q && (s -= 5);
					0 == q && (s += 5);
					q = AmCharts.text(b.container, a[r].category, n, l, m, u);
					q.translate(p + 5, s);
					this.set.push(q);
					q.getBBox()
				}
			}
		}
	}
});
AmCharts.RadItem = AmCharts.Class({
	construct: function(a, b, d, e, f, g, h) {
		void 0 == d && (d = "");
		var j = a.chart.fontFamily,
			k = a.fontSize;
		void 0 == k && (k = a.chart.fontSize);
		var l = a.color;
		void 0 == l && (l = a.chart.color);
		var m = a.chart.container;
		this.set = e = m.set();
		var n = a.axisColor,
			t = a.axisAlpha,
			r = a.tickLength,
			q = a.gridAlpha,
			p = a.gridThickness,
			s = a.gridColor,
			u = a.dashLength,
			v = a.fillColor,
			y = a.fillAlpha,
			z = a.labelsEnabled;
		f = a.counter;
		var A = a.inside,
			w = a.gridType;
		b -= a.height;
		var x;
		g = a.x;
		var B = a.y;
		h ? (z = !0, isNaN(h.tickLength) || (r = h.tickLength), void 0 != h.lineColor && (s = h.lineColor), isNaN(h.lineAlpha) || (q = h.lineAlpha), isNaN(h.dashLength) || (u = h.dashLength), isNaN(h.lineThickness) || (p = h.lineThickness), !0 == h.inside && (A = !0)) : d || (q /= 3, r /= 2);
		var G = "end",
			Z = -1;
		A && (G = "start", Z = 1);
		if (z) {
			var O = AmCharts.text(m, d, l, j, k, G);
			O.translate(g + (r + 3) * Z, b);
			e.push(O);
			this.label = O;
			x = AmCharts.line(m, [g, g + r * Z], [b, b], n, t, p);
			e.push(x)
		}
		b = a.y - b;
		if ("polygons" == w) {
			var Q = [],
				I = [],
				W = a.data.length;
			for (d = 0; d < W; d++) j = 180 - 360 / W * d, Q.push(b * Math.sin(j / 180 * Math.PI)), I.push(b * Math.cos(j / 180 * Math.PI));
			Q.push(Q[0]);
			I.push(I[0]);
			d = AmCharts.line(m, Q, I, s, q, p, u)
		} else d = AmCharts.circle(m, b, "#FFFFFF", 0, p, s, q);
		d.translate(g, B);
		e.push(d);
		if (1 == f && 0 < y && !h) {
			h = a.previousCoord;
			if ("polygons" == w) {
				for (d = W; 0 <= d; d--) j = 180 - 360 / W * d, Q.push(h * Math.sin(j / 180 * Math.PI)), I.push(h * Math.cos(j / 180 * Math.PI));
				Q = AmCharts.polygon(m, Q, I, v, y)
			} else Q = AmCharts.wedge(m, 0, 0, 0, -360, b, b, h, 0, {
				fill: v,
				"fill-opacity": y,
				stroke: 0,
				"stroke-opacity": 0,
				"stroke-width": 0
			});
			e.push(Q);
			Q.translate(g, B)
		}!1 == a.visible && (x && x.hide(), O && O.hide());
		a.counter = 0 == f ? 1 : 0;
		a.previousCoord = b
	},
	graphics: function() {
		return this.set
	},
	getLabel: function() {
		return this.label
	}
});
AmCharts.RadarFill = AmCharts.Class({
	construct: function(a, b, d, e) {
		var f = Math.max(b, d);
		b = d = Math.min(b, d);
		d = a.chart.container;
		var g = e.fillAlpha,
			h = e.fillColor,
			f = Math.abs(f) - a.y;
		b = Math.abs(b) - a.y;
		var j = -e.angle;
		e = -e.toAngle;
		isNaN(j) && (j = 0);
		isNaN(e) && (e = -360);
		this.set = d.set();
		void 0 == h && (h = "#000000");
		isNaN(g) && (g = 0);
		if ("polygons" == a.gridType) {
			e = [];
			for (var k = [], l = a.data.length, m = 0; m < l; m++) j = 180 - 360 / l * m, e.push(f * Math.sin(j / 180 * Math.PI)), k.push(f * Math.cos(j / 180 * Math.PI));
			e.push(e[0]);
			k.push(k[0]);
			for (m = l; 0 <= m; m--) j = 180 - 360 / l * m, e.push(b * Math.sin(j / 180 * Math.PI)), k.push(b * Math.cos(j / 180 * Math.PI));
			this.fill = AmCharts.polygon(d, e, k, h, g)
		} else this.fill = AmCharts.wedge(d, 0, 0, j, e - j, f, f, b, 0, {
			fill: h,
			"fill-opacity": g,
			stroke: 0,
			"stroke-opacity": 0,
			"stroke-width": 0
		});
		this.set.push(this.fill);
		this.fill.translate(a.x, a.y)
	},
	graphics: function() {
		return this.set
	},
	getLabel: function() {}
});
AmCharts.AmGraph = AmCharts.Class({
	construct: function() {
		this.createEvents("rollOverGraphItem", "rollOutGraphItem", "clickGraphItem", "doubleClickGraphItem");
		this.type = "line";
		this.stackable = !0;
		this.columnCount = 1;
		this.columnIndex = 0;
		this.centerCustomBullets = this.showBalloon = !0;
		this.maxBulletSize = 50;
		this.minBulletSize = 0;
		this.balloonText = "[[value]]";
		this.hidden = this.scrollbar = this.animationPlayed = !1;
		this.columnWidth = 0.8;
		this.pointPosition = "middle";
		this.depthCount = 1;
		this.includeInMinMax = !0;
		this.negativeBase = 0;
		this.visibleInLegend = !0;
		this.showAllValueLabels = !1;
		this.showBalloonAt = "close";
		this.lineThickness = 1;
		this.dashLength = 0;
		this.connect = !0;
		this.lineAlpha = 1;
		this.bullet = "none";
		this.bulletBorderThickness = 2;
		this.bulletAlpha = this.bulletBorderAlpha = 1;
		this.bulletSize = 8;
		this.hideBulletsCount = this.bulletOffset = 0;
		this.labelPosition = "top";
		this.cornerRadiusTop = 0;
		this.cursorBulletAlpha = 1;
		this.gradientOrientation = "vertical";
		this.dy = this.dx = 0;
		this.periodValue = "";
		this.y = this.x = 0
	},
	draw: function() {
		var a = this.chart,
			b = a.container;
		this.container = b;
		this.destroy();
		var d = b.set(),
			e = b.set();
		this.behindColumns ? (a.graphsBehindSet.push(d), a.bulletBehindSet.push(e)) : (a.graphsSet.push(d), a.bulletSet.push(e));
		this.bulletSet = e;
		if (!this.scrollbar) {
			var f = a.marginLeftReal,
				a = a.marginTopReal;
			d.translate(f, a);
			e.translate(f, a)
		}
		if ("column" == this.type) var g = b.set();
		AmCharts.remove(this.columnsSet);
		d.push(g);
		this.set = d;
		this.columnsSet = g;
		this.columnsArray = [];
		this.ownColumns = [];
		this.allBullets = [];
		this.animationArray = [];
		AmCharts.ifArray(this.data) && (b = !1, "xy" == this.chartType ? this.xAxis.axisCreated && this.yAxis.axisCreated && (b = !0) : this.valueAxis.axisCreated && (b = !0), !this.hidden && b && this.createGraph())
	},
	createGraph: function() {
		var a = this.chart;
		"inside" == this.labelPosition && (this.labelPosition = "bottom");
		this.startAlpha = a.startAlpha;
		this.seqAn = a.sequencedAnimation;
		this.baseCoord = this.valueAxis.baseCoord;
		this.fillColors || (this.fillColors = this.lineColor);
		void 0 == this.fillAlphas && (this.fillAlphas = 0);
		void 0 == this.bulletColor && (this.bulletColor = this.lineColor, this.bulletColorNegative = this.negativeLineColor);
		void 0 == this.bulletAlpha && (this.bulletAlpha = this.lineAlpha);
		this.bulletBorderColor || (this.bulletBorderAlpha = 0);
		if (!isNaN(this.valueAxis.min) && !isNaN(this.valueAxis.max)) {
			switch (this.chartType) {
			case "serial":
				this.createSerialGraph();
				break;
			case "radar":
				this.createRadarGraph();
				break;
			case "xy":
				this.createXYGraph(), this.positiveClip(this.set)
			}
			this.animationPlayed = !0
		}
	},
	createXYGraph: function() {
		var a = [],
			b = [],
			d = this.xAxis,
			e = this.yAxis;
		this.pmh = e.viH + 1;
		this.pmw = d.viW + 1;
		this.pmy = this.pmx = 0;
		for (var f = this.start; f <= this.end; f++) {
			var g = this.data[f].axes[d.id].graphs[this.id],
				h = g.values,
				j = h.x,
				k = h.y,
				h = d.getCoordinate(j),
				l = e.getCoordinate(k);
			if (!isNaN(j) && !isNaN(k) && (a.push(h), b.push(l), (j = this.createBullet(g, h, l, f)) || (j = 0), k = this.labelText)) g = this.createLabel(g, h, l, k), this.positionLabel(h, l, g, this.labelPosition, j)
		}
		this.drawLineGraph(a, b);
		this.launchAnimation()
	},
	createRadarGraph: function() {
		for (var a = this.valueAxis.stackType, b = [], d = [], e, f, g = this.start; g <= this.end; g++) {
			var h = this.data[g].axes[this.valueAxis.id].graphs[this.id],
				j;
			j = "none" == a || "3d" == a ? h.values.value : h.values.close;
			if (isNaN(j)) this.drawLineGraph(b, d), b = [], d = [];
			else {
				var k = this.y - (this.valueAxis.getCoordinate(j) - this.height),
					l = 180 - 360 / (this.end - this.start + 1) * g;
				j = k * Math.sin(l / 180 * Math.PI);
				k *= Math.cos(l / 180 * Math.PI);
				b.push(j);
				d.push(k);
				(l = this.createBullet(h, j, k, g)) || (l = 0);
				var m = this.labelText;
				m && (h = this.createLabel(h, j, k, m), this.positionLabel(j, k, h, this.labelPosition, l));
				isNaN(e) && (e = j);
				isNaN(f) && (f = k)
			}
		}
		b.push(e);
		d.push(f);
		this.drawLineGraph(b, d);
		this.launchAnimation()
	},
	positionLabel: function(a, b, d, e, f) {
		var g = d.getBBox();
		switch (e) {
		case "left":
			a -= (g.width + f) / 2 + 2;
			break;
		case "top":
			b -= (f + g.height) / 2 + 1;
			break;
		case "right":
			a += (g.width + f) / 2 + 2;
			break;
		case "bottom":
			b += (f + g.height) / 2 + 1
		}
		d.translate(a, b)
	},
	createSerialGraph: function() {
		var a = this.id,
			b = this.index,
			d = this.data,
			e = this.chart.container,
			f = this.valueAxis,
			g = this.type,
			h = this.columnWidth,
			j = this.width,
			k = this.height,
			l = this.y,
			m = this.rotate,
			n = this.columnCount,
			t = AmCharts.toCoordinate(this.cornerRadiusTop, h / 2),
			r = this.connect,
			q = [],
			p = [],
			s, u, v = this.chart.graphs.length,
			y, z = this.dx / this.depthCount,
			A = this.dy / this.depthCount,
			w = f.stackType,
			x = this.labelPosition,
			B = this.start,
			G = this.end,
			Z = this.scrollbar,
			O = this.categoryAxis,
			Q = this.baseCoord,
			I = this.negativeBase,
			W = this.columnIndex,
			P = this.lineThickness,
			U = this.lineAlpha,
			fa = this.lineColor,
			ca = this.dashLength,
			da = this.set;
		"above" == x && (x = "top");
		"below" == x && (x = "bottom");
		var la = x,
			V = 270;
		"horizontal" == this.gradientOrientation && (V = 0);
		this.gradientRotation = V;
		var R = this.chart.columnSpacing,
			$ = O.cellWidth,
			H = ($ * h - n) / n;
		R > H && (R = H);
		var F, C, ga, X = k + 1,
			Va = j + 1,
			Na = 0,
			Wa = 0,
			Xa, Ya, Oa, Pa, Bb = this.fillColors,
			Ea = this.negativeFillColors,
			ya = this.negativeLineColor,
			Fa = this.fillAlphas,
			Ga = this.negativeFillAlphas;
		"object" == typeof Fa && (Fa = Fa[0]);
		"object" == typeof Ga && (Ga = Ga[0]);
		var Qa = f.getCoordinate(f.min);
		f.logarithmic && (Qa = f.getCoordinate(f.minReal));
		this.minCoord = Qa;
		this.resetBullet && (this.bullet = "none");
		if (!Z && ("line" == g || "smoothedLine" == g || "step" == g)) if (1 == d.length && ("step" != g && "none" == this.bullet) && (this.bullet = "round", this.resetBullet = !0), Ea || void 0 != ya) {
			var za = I;
			za > f.max && (za = f.max);
			za < f.min && (za = f.min);
			f.logarithmic && (za = f.minReal);
			var ta = f.getCoordinate(za),
				nb = f.getCoordinate(f.max);
			m ? (X = k, Va = Math.abs(nb - ta), Xa = k, Ya = Math.abs(Qa - ta), Pa = Wa = 0, f.reversed ? (Na = 0, Oa = ta) : (Na = ta, Oa = 0)) : (Va = j, X = Math.abs(nb - ta), Ya = j, Xa = Math.abs(Qa - ta), Oa = Na = 0, f.reversed ? (Pa = l, Wa = ta) : Pa = ta + 1)
		}
		var ua = Math.round;
		this.pmx = ua(Na);
		this.pmy = ua(Wa);
		this.pmh = ua(X);
		this.pmw = ua(Va);
		this.nmx = ua(Oa);
		this.nmy = ua(Pa);
		this.nmh = ua(Xa);
		this.nmw = ua(Ya);
		h = "column" == g ? ($ * h - R * (n - 1)) / n : $ * h;
		1 > h && (h = 1);
		var M;
		if ("line" == g || "step" == g || "smoothedLine" == g) {
			if (0 < B) for (M = B - 1; - 1 < M; M--) if (F = d[M], C = F.axes[f.id].graphs[a], ga = C.values.value) {
				B = M;
				break
			}
			if (G < d.length - 1) for (M = G + 1; M < d.length; M++) if (F = d[M], C = F.axes[f.id].graphs[a], ga = C.values.value) {
				G = M;
				break
			}
		}
		G < d.length - 1 && G++;
		var ha = [],
			ia = [],
			Ha = !1;
		if ("line" == g || "step" == g || "smoothedLine" == g) if (this.stackable && "regular" == w || "100%" == w || this.fillToGraph) Ha = !0;
		for (M = B; M <= G; M++) {
			F = d[M];
			C = F.axes[f.id].graphs[a];
			C.index = M;
			var oa = NaN,
				E = NaN,
				D = NaN,
				S = NaN,
				N = NaN,
				Ra = NaN,
				Aa = NaN,
				Sa = NaN,
				Ba = NaN,
				Y = NaN,
				aa = NaN,
				pa = NaN,
				qa = NaN,
				T = NaN,
				ka = void 0,
				va = Bb,
				Ia = Fa,
				ma = fa;
			void 0 != C.color && (va = C.color);
			C.fillColors && (va = C.fillColors);
			isNaN(C.alpha) || (Ia = C.alpha);
			var ra = C.values;
			f.recalculateToPercents && (ra = C.percents);
			if (ra) {
				T = !this.stackable || "none" == w || "3d" == w ? ra.value : ra.close;
				if ("candlestick" == g || "ohlc" == g) var T = ra.close,
					Za = ra.low,
					Aa = f.getCoordinate(Za),
					$a = ra.high,
					Ba = f.getCoordinate($a);
				var ja = ra.open,
					D = f.getCoordinate(T);
				isNaN(ja) || (N = f.getCoordinate(ja));
				if (!Z) switch (this.showBalloonAt) {
				case "close":
					C.y = D;
					break;
				case "open":
					C.y = N;
					break;
				case "high":
					C.y = Ba;
					break;
				case "low":
					C.y = Aa
				}
				var oa = F.x[O.id],
					wa = Math.floor($ / 2),
					Ja = wa;
				"start" == this.pointPosition && (oa -= $ / 2, wa = 0, Ja = $);
				Z || (C.x = oa); - 1E5 > oa && (oa = -1E5);
				oa > j + 1E5 && (oa = j + 1E5);
				m ? (E = D, S = N, N = D = oa, isNaN(ja) && !this.fillToGraph && (S = Q), Ra = Aa, Sa = Ba) : (S = E = oa, isNaN(ja) && !this.fillToGraph && (N = Q));
				switch (g) {
				case "line":
					isNaN(T) ? r || (this.drawLineGraph(q, p, ha, ia), q = [], p = [], ha = [], ia = []) : (C.isNegative = T < I ? !0 : !1, q.push(E), p.push(D), Y = E, aa = D, pa = E, qa = D, Ha && (!isNaN(N) && !isNaN(S)) && (ha.push(S), ia.push(N)));
					break;
				case "smoothedLine":
					isNaN(T) ? r || (this.drawSmoothedGraph(q, p, ha, ia), q = [], p = [], ha = [], ia = []) : (C.isNegative = T < I ? !0 : !1, q.push(E), p.push(D), Y = E, aa = D, pa = E, qa = D, Ha && (!isNaN(N) && !isNaN(S)) && (ha.push(S), ia.push(N)));
					break;
				case "step":
					isNaN(T) ? r || (u = NaN, this.drawLineGraph(q, p, ha, ia), q = [], p = [], ha = [], ia = []) : (C.isNegative = T < I ? !0 : !1, m ? (isNaN(s) || (q.push(s), p.push(D - wa)), p.push(D - wa), q.push(E), p.push(D + Ja), q.push(E), Ha && (!isNaN(N) && !isNaN(S)) && (ha.push(S), ia.push(N - wa), ha.push(S), ia.push(N + Ja))) : (isNaN(u) || (p.push(u), q.push(E - wa)), q.push(E - wa), p.push(D), q.push(E + Ja), p.push(D), Ha && (!isNaN(N) && !isNaN(S)) && (ha.push(S - wa), ia.push(N), ha.push(S + Ja), ia.push(N))), s = E, u = D, Y = E, aa = D, pa = E, qa = D);
					break;
				case "column":
					var na = ma;
					void 0 != C.lineColor && (na = C.lineColor);
					if (!isNaN(T)) {
						T < I ? (C.isNegative = !0, Ea && (va = Ea), void 0 != ya && (ma = ya)) : C.isNegative = !1;
						var ob = f.min,
							pb = f.max;
						if (!(T < ob && (ja < ob || void 0 == ja) || T > pb && ja > pb)) if (m) {
							if ("3d" == w) var K = D - 0.5 * (h + R) + R / 2 + A * W,
								L = S + z * W;
							else K = D - (n / 2 - W) * (h + R) + R / 2, L = S;
							var J = h,
								Y = E,
								aa = K + h / 2,
								pa = E,
								qa = K + h / 2;
							K + J > k && (J = k - K);
							0 > K && (J += K, K = 0);
							var ba = E - S,
								Cb = L,
								L = AmCharts.fitToBounds(L, 0, j),
								ba = ba + (Cb - L),
								ba = AmCharts.fitToBounds(ba, -L, j - L + z * W);
							if (K < k && 0 < J && (ka = new AmCharts.Cuboid(e, ba, J, z, A, va, Ia, P, na, U, V, t, m), "bottom" != x)) if (x = f.reversed ? "left" : "right", 0 > T) x = f.reversed ? "right" : "left";
							else if ("regular" == w || "100%" == w) Y += this.dx
						} else {
							"3d" == w ? (L = E - 0.5 * (h + R) + R / 2 + z * W, K = N + A * W) : (L = E - (n / 2 - W) * (h + R) + R / 2, K = N);
							J = h;
							Y = L + h / 2;
							aa = D;
							pa = L + h / 2;
							qa = D;
							L + J > j + W * z && (J = j - L + W * z);
							0 > L && (J += L, L = 0);
							var ba = D - N,
								Db = K,
								K = AmCharts.fitToBounds(K, this.dy, k),
								ba = ba + (Db - K),
								ba = AmCharts.fitToBounds(ba, -K + A * W, k - K);
							if (L < j + W * z && 0 < J) if (ka = new AmCharts.Cuboid(e, J, ba, z, A, va, Ia, P, na, this.lineAlpha, V, t, m), 0 > T && "middle" != x) x = "bottom";
							else if (x = la, "regular" == w || "100%" == w) aa += this.dy
						}
						if (ka) {
							var sa = ka.set;
							sa.translate(L, K);
							this.columnsSet.push(sa);
							C.url && sa.setAttr("cursor", "pointer");
							if (!Z) {
								"none" == w && (y = m ? (this.end + 1 - M) * v - b : v * M + b);
								"3d" == w && (m ? (y = (v - b) * (this.end + 1 - M), Y += z * this.columnIndex, pa += z * this.columnIndex, C.y += z * this.columnIndex) : (y = (v - b) * (M + 1), Y += 3, aa += A * this.columnIndex + 7, qa += A * this.columnIndex, C.y += A * this.columnIndex));
								if ("regular" == w || "100%" == w) x = "middle", y = m ? 0 < ra.value ? (this.end + 1 - M) * v + b : (this.end + 1 - M) * v - b : 0 < ra.value ? v * M + b : v * M - b;
								this.columnsArray.push({
									column: ka,
									depth: y
								});
								C.x = m ? K + J / 2 : L + J / 2;
								this.ownColumns.push(ka);
								this.animateColumns(ka, M, E, S, D, N);
								this.addListeners(sa, C)
							}
							C.columnSprite = sa
						}
					}
					break;
				case "candlestick":
					if (!isNaN(ja) && !isNaN($a) && !isNaN(Za) && !isNaN(T)) {
						var Ta, ab;
						T < ja && (C.isNegative = !0, Ea && (va = Ea), Ga && (Ia = Ga), void 0 != ya && (ma = ya));
						na = ma;
						void 0 != C.lineColor && (na = C.lineColor);
						if (m) {
							if (K = D - h / 2, L = S, J = h, K + J > k && (J = k - K), 0 > K && (J += K, K = 0), K < k && 0 < J) {
								var bb, cb;
								T > ja ? (bb = [E, Sa], cb = [S, Ra]) : (bb = [S, Sa], cb = [E, Ra]);
								D < k && 0 < D && (Ta = AmCharts.line(e, bb, [D, D], na, U, P), ab = AmCharts.line(e, cb, [D, D], na, U, P));
								ba = E - S;
								ka = new AmCharts.Cuboid(e, ba, J, z, A, va, Fa, P, na, U, V, t, m)
							}
						} else if (L = E - h / 2, K = N + P / 2, J = h, L + J > j && (J = j - L), 0 > L && (J += L, L = 0), ba = D - N, L < j && 0 < J) {
							var ka = new AmCharts.Cuboid(e, J, ba, z, A, va, Ia, P, na, U, V, t, m),
								db, eb;
							T > ja ? (db = [D, Ba], eb = [N, Aa]) : (db = [N, Ba], eb = [D, Aa]);
							E < j && 0 < E && (Ta = AmCharts.line(e, [E, E], db, na, U, P), ab = AmCharts.line(e, [E, E], eb, na, U, P))
						}
						ka && (sa = ka.set, da.push(sa), sa.translate(L, K), C.url && sa.setAttr("cursor", "pointer"), Ta && (da.push(Ta), da.push(ab)), Y = E, aa = D, pa = E, qa = D, Z || (C.x = m ? K + J / 2 : L + J / 2, this.animateColumns(ka, M, E, S, D, N), this.addListeners(sa, C)))
					}
					break;
				case "ohlc":
					if (!isNaN(ja) && !isNaN($a) && !isNaN(Za) && !isNaN(T)) {
						T < ja && (C.isNegative = !0, void 0 != ya && (ma = ya));
						var fb, gb, hb;
						if (m) {
							var ib = D - h / 2,
								ib = AmCharts.fitToBounds(ib, 0, k),
								qb = AmCharts.fitToBounds(D, 0, k),
								jb = D + h / 2,
								jb = AmCharts.fitToBounds(jb, 0, k);
							gb = AmCharts.line(e, [S, S], [ib, qb], ma, U, P, ca);
							0 < D && D < k && (fb = AmCharts.line(e, [Ra, Sa], [D, D], ma, U, P, ca));
							hb = AmCharts.line(e, [E, E], [qb, jb], ma, U, P, ca)
						} else {
							var kb = E - h / 2,
								kb = AmCharts.fitToBounds(kb, 0, j),
								rb = AmCharts.fitToBounds(E, 0, j),
								lb = E + h / 2,
								lb = AmCharts.fitToBounds(lb, 0, j);
							gb = AmCharts.line(e, [kb, rb], [N, N], ma, U, P, ca);
							0 < E && E < j && (fb = AmCharts.line(e, [E, E], [Aa, Ba], ma, U, P, ca));
							hb = AmCharts.line(e, [rb, lb], [D, D], ma, U, P, ca)
						}
						da.push(gb);
						da.push(fb);
						da.push(hb);
						Y = E;
						aa = D;
						pa = E;
						qa = D
					}
				}
				if (!Z && !isNaN(T)) {
					var sb = this.hideBulletsCount;
					if (this.end - this.start <= sb || 0 == sb) {
						var Ca = this.createBullet(C, pa, qa, M);
						Ca || (Ca = 0);
						var tb = this.labelText;
						if (tb) {
							var ea = this.createLabel(C, 0, 0, tb),
								xa = 0,
								Da = 0,
								ub = ea.getBBox(),
								Ua = ub.width,
								mb = ub.height;
							switch (x) {
							case "left":
								xa = -(Ua / 2 + Ca / 2 + 3);
								break;
							case "top":
								Da = -(mb / 2 + Ca / 2 + 3);
								break;
							case "right":
								xa = Ca / 2 + 2 + Ua / 2;
								break;
							case "bottom":
								m && "column" == g ? (Y = Q, 0 > T ? (xa = -6, ea.attr({
									"text-anchor": "end"
								})) : (xa = 6, ea.attr({
									"text-anchor": "start"
								}))) : (Da = Ca / 2 + mb / 2, ea.x = -(Ua / 2 + 2));
								break;
							case "middle":
								"column" == g && (m ? (xa = -(E - S) / 2 - z, 0 > ba && (xa += z), Math.abs(E - S) < Ua && !this.showAllValueLabels && (ea.remove(), ea = null)) : (Da = -(D - N) / 2, 0 > ba && (Da -= A), Math.abs(D - N) < mb && !this.showAllValueLabels && (ea.remove(), ea = null)))
							}
							if (ea) if (!isNaN(aa) && !isNaN(Y)) if (Y += xa, aa += Da, ea.translate(Y, aa), m) {
								if (0 > aa || aa > k) ea.remove(), ea = null
							} else {
								var vb = 0;
								"3d" == w && (vb = z * W);
								if (0 > Y || Y > j + vb) ea.remove(), ea = null
							} else ea.remove(), ea = null
						}
						if ("column" == g && "regular" == w || "100%" == w) {
							var wb = f.totalText;
							if (wb) {
								var Ka = this.createLabel(C, 0, 0, wb),
									xb = Ka.getBBox(),
									yb = xb.width,
									zb = xb.height,
									La, Ma, Ab = f.totals[M];
								Ab && Ab.remove();
								m ? (Ma = D, La = 0 > T ? E - yb / 2 - 2 : E + yb / 2 + 3) : (La = E, Ma = 0 > T ? D + zb / 2 : D - zb / 2 - 3);
								Ka.translate(La, Ma);
								f.totals[M] = Ka;
								m ? (0 > Ma || Ma > k) && Ka.remove() : (0 > La || La > j) && Ka.remove()
							}
						}
					}
				}
			}
		}
		if ("line" == g || "step" == g || "smoothedLine" == g)"smoothedLine" == g ? this.drawSmoothedGraph(q, p, ha, ia) : this.drawLineGraph(q, p, ha, ia), Z || this.launchAnimation()
	},
	animateColumns: function(a, b) {
		var d = this,
			e = d.chart.startDuration;
		0 < e && !d.animationPlayed && (d.seqAn ? (a.set.hide(), d.animationArray.push(a), e = setTimeout(function() {
			d.animate.call(d)
		}, 1E3 * e / (d.end - d.start + 1) * (b - d.start)), d.timeOuts.push(e)) : d.animate(a))
	},
	createLabel: function(a, b, d, e) {
		var f = this.chart,
			g = this.color;
		void 0 == g && (g = f.color);
		var h = this.fontSize;
		void 0 == h && (h = f.fontSize);
		a = f.formatString(e, a, this);
		a = AmCharts.cleanFromEmpty(a);
		f = AmCharts.text(this.container, a, g, f.fontFamily, h);
		f.translate(b, d);
		this.bulletSet.push(f);
		this.allBullets.push(f);
		return f
	},
	positiveClip: function(a) {
		a.clipRect(this.pmx, this.pmy, this.pmw, this.pmh)
	},
	negativeClip: function(a) {
		a.clipRect(this.nmx, this.nmy, this.nmw, this.nmh)
	},
	drawLineGraph: function(a, b, d, e) {
		if (1 < a.length) {
			var f = this.set,
				g = this.container,
				h = g.set(),
				j = g.set();
			f.push(h);
			f.push(j);
			var k = this.lineAlpha,
				l = this.lineThickness,
				m = this.dashLength,
				f = this.fillAlphas,
				n = this.fillColors,
				t = this.negativeLineColor,
				r = this.negativeFillColors,
				q = this.negativeFillAlphas,
				p = this.baseCoord,
				s = AmCharts.line(g, a, b, this.lineColor, k, l, m, !1, !0);
			h.push(s);
			void 0 != t && (k = AmCharts.line(g, a, b, t, k, l, m, !1, !0), j.push(k));
			if (0 < f && (k = a.join(";").split(";"), l = b.join(";").split(";"), "serial" == this.chartType && (0 < d.length ? (d.reverse(), e.reverse(), k = a.concat(d), l = b.concat(e)) : this.rotate ? (l.push(l[l.length - 1]), k.push(p), l.push(l[0]), k.push(p), l.push(l[0]), k.push(k[0])) : (k.push(k[k.length - 1]), l.push(p), k.push(k[0]), l.push(p), k.push(a[0]), l.push(l[0]))), a = AmCharts.polygon(g, k, l, n, f, 0, 0, 0, this.gradientRotation), h.push(a), r || void 0 != t)) q || (q = f), r || (r = t), g = AmCharts.polygon(g, k, l, r, q, 0, 0, 0, this.gradientRotation), j.push(g);
			this.applyMask(j, h)
		}
	},
	applyMask: function(a, b) {
		var d = a.length();
		"serial" == this.chartType && !this.scrollbar && (this.positiveClip(b), 0 < d && this.negativeClip(a))
	},
	drawSmoothedGraph: function(a, b, d, e) {
		if (1 < a.length) {
			var f = this.set,
				g = this.container,
				h = g.set(),
				j = g.set();
			f.push(h);
			f.push(j);
			var k = this.lineAlpha,
				l = this.lineThickness,
				f = this.dashLength,
				m = this.fillAlphas,
				n = this.fillColors,
				t = this.negativeLineColor,
				r = this.negativeFillColors,
				q = this.negativeFillAlphas,
				p = this.baseCoord,
				s = new AmCharts.Bezier(g, a, b, this.lineColor, k, l, n, 0, f);
			h.push(s.path);
			void 0 != t && (k = new AmCharts.Bezier(g, a, b, t, k, l, n, 0, f), j.push(k.path));
			if (0 < m && (l = a.join(";").split(";"), s = b.join(";").split(";"), k = "", 0 < d.length ? (d.reverse(), e.reverse(), l = a.concat(d), s = b.concat(e)) : (this.rotate ? (k += " L" + p + "," + b[b.length - 1], k += " L" + p + "," + b[0]) : (k += " L" + a[a.length - 1] + "," + p, k += " L" + a[0] + "," + p), k += " L" + a[0] + "," + b[0]), d = new AmCharts.Bezier(g, l, s, NaN, 0, 0, n, m, f, k), h.push(d.path), r || void 0 != t)) q || (q = m), r || (r = t), a = new AmCharts.Bezier(g, a, b, NaN, 0, 0, r, q, f, k), j.push(a.path);
			this.applyMask(j, h)
		}
	},
	launchAnimation: function() {
		var a = this,
			b = a.chart.startDuration;
		if (0 < b && !a.animationPlayed) {
			var d = a.set,
				e = a.bulletSet;
			AmCharts.VML || (d.attr({
				opacity: a.startAlpha
			}), e.attr({
				opacity: a.startAlpha
			}));
			d.hide();
			e.hide();
			a.seqAn ? (b = setTimeout(function() {
				a.animateGraphs.call(a)
			}, 1E3 * a.index * b), a.timeOuts.push(b)) : a.animateGraphs()
		}
	},
	animateGraphs: function() {
		var a = this.chart,
			b = this.set,
			d = this.bulletSet,
			e = this.x,
			f = this.y;
		b.show();
		d.show();
		var g = a.startDuration,
			a = a.startEffect;
		b && (this.rotate ? (b.translate(-1E3, f), d.translate(-1E3, f)) : (b.translate(e, -1E3), d.translate(e, -1E3)), b.animate({
			opacity: 1,
			translate: e + "," + f
		}, g, a), d.animate({
			opacity: 1,
			translate: e + "," + f
		}, g, a))
	},
	animate: function(a) {
		var b = this.chart,
			d = this.container,
			e = this.animationArray;
		!a && 0 < e.length && (a = e[0], e.shift());
		d = d[AmCharts.getEffect(b.startEffect)];
		b = b.startDuration;
		a && (this.rotate ? a.animateWidth(b, d) : a.animateHeight(b, d), a.set.show())
	},
	legendKeyColor: function() {
		var a = this.legendColor,
			b = this.lineAlpha;
		void 0 == a && (a = this.lineColor, 0 == b && (b = this.fillColors) && (a = "object" == typeof b ? b[0] : b));
		return a
	},
	legendKeyAlpha: function() {
		var a = this.legendAlpha;
		void 0 == a && (a = this.lineAlpha, 0 == a && this.fillAlphas && (a = this.fillAlphas), 0 == a && (a = this.bulletAlpha), 0 == a && (a = 1));
		return a
	},
	createBullet: function(a, b, d) {
		var e = this.container,
			f = this.bulletOffset,
			g = this.bulletSize;
		isNaN(a.bulletSize) || (g = a.bulletSize);
		if (!isNaN(this.maxValue)) {
			var h = a.values.value;
			isNaN(h) || (g = h / this.maxValue * this.maxBulletSize)
		}
		g < this.minBulletSize && (g = this.minBulletSize);
		this.rotate ? b += f : d -= f;
		var j;
		if ("none" != this.bullet || a.bullet) {
			var k = this.bulletColor;
			a.isNegative && void 0 != this.bulletColorNegative && (k = this.bulletColorNegative);
			void 0 != a.color && (k = a.color);
			f = this.bullet;
			a.bullet && (f = a.bullet);
			var h = this.bulletBorderThickness,
				l = this.bulletBorderColor,
				m = this.bulletBorderAlpha,
				n = this.bulletAlpha,
				t = a.alpha;
			isNaN(t) || (n = t);
			switch (f) {
			case "round":
				j = AmCharts.circle(e, g / 2, k, n, h, l, m);
				break;
			case "square":
				j = AmCharts.polygon(e, [0, g, g, 0], [0, 0, g, g], k, n, h, l, m);
				b -= g / 2;
				d -= g / 2;
				break;
			case "triangleUp":
				j = AmCharts.triangle(e, g, 0, k, n, h, l, m);
				break;
			case "triangleDown":
				j = AmCharts.triangle(e, g, 180, k, n, h, l, m);
				break;
			case "triangleLeft":
				j = AmCharts.triangle(e, g, 270, k, n, h, l, m);
				break;
			case "triangleRight":
				j = AmCharts.triangle(e, g, 90, k, n, h, l, m);
				break;
			case "bubble":
				j = AmCharts.circle(e, g / 2, k, n, h, l, m, !0)
			}
		}
		h = f = 0;
		if (this.customBullet || a.customBullet) l = this.customBullet, a.customBullet && (l = a.customBullet), l && (j && j.remove(), "function" == typeof l ? (j = new l, j.chart = this.chart, a.bulletConfig && (j.availableSpace = d, j.graph = this, a.bulletConfig.minCoord = this.minCoord - d, j.bulletConfig = a.bulletConfig), j.write(e), j = j.set) : (this.chart.path && (l = this.chart.path + l), j = e.image(l, 0, 0, g, g), this.centerCustomBullets && (b -= g / 2, d -= g / 2, f -= g / 2, h -= g / 2)));
		if (j) {
			a.url && j.setAttr("cursor", "pointer");
			this.allBullets.push(j);
			if ("serial" == this.chartType && (0 > b - f || b - f > this.width || d < -g / 2 || d - h > this.height)) j.remove(), j = null;
			j && (this.bulletSet.push(j), j.translate(b, d), this.addListeners(j, a))
		}
		return g
	},
	showBullets: function() {
		for (var a = this.allBullets, b = 0; b < a.length; b++) a[b].show()
	},
	hideBullets: function() {
		for (var a = this.allBullets, b = 0; b < a.length; b++) a[b].hide()
	},
	addListeners: function(a, b) {
		var d = this;
		a.mouseover(function() {
			d.handleRollOver(b)
		}).mouseout(function() {
			d.handleRollOut(b)
		}).touchend(function() {
			d.handleRollOver(b)
		}).touchstart(function() {
			d.handleRollOver(b)
		}).click(function() {
			d.handleClick(b)
		}).dblclick(function() {
			d.handleDoubleClick(b)
		})
	},
	handleRollOver: function(a) {
		if (a) {
			var b = this.chart,
				d = {
					type: "rollOverGraphItem",
					item: a,
					index: a.index,
					graph: this,
					target: this,
					chart: this.chart
				};
			this.fire("rollOverGraphItem", d);
			b.fire("rollOverGraphItem", d);
			clearTimeout(b.hoverInt);
			d = this.showBalloon;
			b.chartCursor && "serial" == this.chartType && (d = !1, !b.chartCursor.valueBalloonsEnabled && this.showBalloon && (d = !0));
			d && (d = b.formatString(this.balloonText, a, a.graph), d = AmCharts.cleanFromEmpty(d), a = b.getBalloonColor(this, a), b.balloon.showBullet = !1, b.balloon.pointerOrientation = "V", b.showBalloon(d, a, !0))
		}
	},
	handleRollOut: function(a) {
		this.chart.hideBalloon();
		a && (a = {
			type: "rollOutGraphItem",
			item: a,
			index: a.index,
			graph: this,
			target: this,
			chart: this.chart
		}, this.fire("rollOutGraphItem", a), this.chart.fire("rollOutGraphItem", a))
	},
	handleClick: function(a) {
		if (a) {
			var b = {
				type: "clickGraphItem",
				item: a,
				index: a.index,
				graph: this,
				target: this,
				chart: this.chart
			};
			this.fire("clickGraphItem", b);
			this.chart.fire("clickGraphItem", b);
			AmCharts.getURL(a.url, this.urlTarget)
		}
	},
	handleDoubleClick: function(a) {
		a && (a = {
			type: "doubleClickGraphItem",
			item: a,
			index: a.index,
			graph: this,
			target: this,
			chart: this.chart
		}, this.fire("doubleClickGraphItem", a), this.chart.fire("doubleClickGraphItem", a))
	},
	zoom: function(a, b) {
		this.start = a;
		this.end = b;
		this.draw()
	},
	changeOpacity: function(a) {
		var b = this.set;
		b && b.setAttr("opacity", a);
		if (b = this.ownColumns) for (var d = 0; d < b.length; d++) {
			var e = b[d].set;
			e && e.setAttr("opacity", a)
		}(b = this.bulletSet) && b.setAttr("opacity", a)
	},
	destroy: function() {
		AmCharts.remove(this.set);
		AmCharts.remove(this.bulletSet);
		var a = this.timeOuts;
		if (a) for (var b = 0; b < a.length; b++) clearTimeout(a[b]);
		this.timeOuts = []
	}
});
AmCharts.ChartCursor = AmCharts.Class({
	construct: function() {
		this.createEvents("changed", "zoomed", "onHideCursor", "draw");
		this.enabled = !0;
		this.cursorAlpha = 1;
		this.selectionAlpha = 0.2;
		this.cursorColor = "#CC0000";
		this.categoryBalloonAlpha = 1;
		this.color = "#FFFFFF";
		this.type = "cursor";
		this.zoomed = !1;
		this.zoomable = !0;
		this.pan = !1;
		this.animate = !0;
		this.categoryBalloonDateFormat = "MMM DD, YYYY";
		this.categoryBalloonEnabled = this.valueBalloonsEnabled = !0;
		this.rolledOver = !1;
		this.cursorPosition = "middle";
		this.bulletsEnabled = this.skipZoomDispatch = !1;
		this.bulletSize = 8;
		this.selectWithoutZooming = this.oneBalloonOnly = !1
	},
	draw: function() {
		var a = this;
		a.destroy();
		var b = a.chart,
			d = b.container;
		a.rotate = b.rotate;
		a.container = d;
		d = d.set();
		d.translate(a.x, a.y);
		a.set = d;
		b.cursorSet.push(d);
		d = new AmCharts.AmBalloon;
		d.chart = b;
		a.categoryBalloon = d;
		d.cornerRadius = 0;
		d.borderThickness = 0;
		d.borderAlpha = 0;
		d.showBullet = !1;
		var e = a.categoryBalloonColor;
		void 0 == e && (e = a.cursorColor);
		d.fillColor = e;
		d.fillAlpha = a.categoryBalloonAlpha;
		d.borderColor = e;
		d.color = a.color;
		a.rotate && (d.pointerOrientation = "H");
		if (a.valueBalloonsEnabled) for (d = 0; d < b.graphs.length; d++) e = new AmCharts.AmBalloon, e.chart = b, AmCharts.copyProperties(b.balloon, e), b.graphs[d].valueBalloon = e;
		"cursor" == a.type ? a.createCursor() : a.createCrosshair();
		a.interval = setInterval(function() {
			a.detectMovement.call(a)
		}, 40)
	},
	updateData: function() {
		var a = this.chart.chartData;
		this.data = a;
		AmCharts.ifArray(a) && (this.firstTime = a[0].time, this.lastTime = a[a.length - 1].time)
	},
	createCursor: function() {
		var a = this.chart,
			b = this.cursorAlpha,
			d = a.categoryAxis,
			e = d.position,
			f = d.inside,
			g = d.axisThickness,
			h = this.categoryBalloon,
			j, k, l = a.dx,
			m = a.dy,
			n = this.x,
			t = this.y,
			r = this.width,
			q = this.height,
			a = a.rotate,
			p = d.tickLength;
		h.pointerWidth = p;
		a ? (j = [0, r, r + l], k = [0, 0, m]) : (j = [l, 0, 0], k = [m, 0, q]);
		this.line = b = AmCharts.line(this.container, j, k, this.cursorColor, b, 1);
		this.set.push(b);
		a ? (f && (h.pointerWidth = 0), "right" == e ? f ? h.setBounds(n, t + m, n + r + l, t + q + m) : h.setBounds(n + r + l + g, t + m, n + r + 1E3, t + q + m) : f ? h.setBounds(n, t, r + n, q + t) : h.setBounds(-1E3, -1E3, n - p - g, t + q + 15)) : (h.maxWidth = r, d.parseDates && (p = 0, h.pointerWidth = 0), "top" == e ? f ? h.setBounds(n + l, t + m, r + l + n, q + t) : h.setBounds(n + l, -1E3, r + l + n, t + m - p - g) : f ? h.setBounds(n, t, r + n, q + t - p) : h.setBounds(n, t + q + p + g - 1, n + r, t + q + p + g));
		this.hideCursor()
	},
	createCrosshair: function() {
		var a = this.cursorAlpha,
			b = this.container,
			d = AmCharts.line(b, [0, 0], [0, this.height], this.cursorColor, a, 1),
			a = AmCharts.line(b, [0, this.width], [0, 0], this.cursorColor, a, 1);
		this.set.push(d);
		this.set.push(a);
		this.vLine = d;
		this.hLine = a;
		this.hideCursor()
	},
	detectMovement: function() {
		var a = this.chart;
		if (a.mouseIsOver) {
			var b = a.mouseX - this.x,
				d = a.mouseY - this.y;
			0 < b && b < this.width && 0 < d && d < this.height ? (this.drawing ? this.rolledOver || a.setMouseCursor("crosshair") : this.pan && (this.rolledOver || a.setMouseCursor("move")), this.rolledOver = !0, this.setPosition()) : this.rolledOver && (this.handleMouseOut(), this.rolledOver = !1)
		} else this.rolledOver && (this.handleMouseOut(), this.rolledOver = !1)
	},
	getMousePosition: function() {
		var a, b = this.width,
			d = this.height;
		a = this.chart;
		this.rotate ? (a = a.mouseY - this.y, 0 > a && (a = 0), a > d && (a = d)) : (a = a.mouseX - this.x, 0 > a && (a = 0), a > b && (a = b));
		return a
	},
	updateCrosshair: function() {
		var a = this.chart,
			b = a.mouseX - this.x,
			d = a.mouseY - this.y,
			e = this.vLine,
			f = this.hLine,
			b = AmCharts.fitToBounds(b, 0, this.width),
			d = AmCharts.fitToBounds(d, 0, this.height);
		0 < this.cursorAlpha && (e.show(), f.show(), e.translate(b, 0), f.translate(0, d));
		this.zooming && (a.hideXScrollbar && (b = NaN), a.hideYScrollbar && (d = NaN), this.updateSelectionSize(b, d));
		!a.mouseIsOver && !this.zooming && this.hideCursor()
	},
	updateSelectionSize: function(a, b) {
		AmCharts.remove(this.selection);
		var d = this.selectionPosX,
			e = this.selectionPosY,
			f = 0,
			g = 0,
			h = this.width,
			j = this.height;
		isNaN(a) || (d > a && (f = a, h = d - a), d < a && (f = d, h = a - d), d == a && (f = a, h = 0));
		isNaN(b) || (e > b && (g = b, j = e - b), e < b && (g = e, j = b - e), e == b && (g = b, j = 0));
		0 < h && 0 < j && (d = AmCharts.rect(this.container, h, j, this.cursorColor, this.selectionAlpha), d.translate(f + this.x, g + this.y), this.selection = d)
	},
	arrangeBalloons: function() {
		var a = this.valueBalloons,
			b = this.x,
			d = this.y,
			e = this.height + d;
		a.sort(this.compareY);
		for (var f = 0; f < a.length; f++) {
			var g = a[f].balloon;
			g.setBounds(b, d, b + this.width, e);
			g.draw();
			e = g.yPos - 3
		}
		this.arrangeBalloons2()
	},
	compareY: function(a, b) {
		return a.yy < b.yy ? 1 : -1
	},
	arrangeBalloons2: function() {
		var a = this.valueBalloons;
		a.reverse();
		for (var b, d = this.x, e, f = 0; f < a.length; f++) {
			var g = a[f].balloon;
			b = g.bottom;
			var h = g.bottom - g.yPos;
			0 < f && b - h < e + 3 && (g.setBounds(d, e + 3, d + this.width, e + h + 3), g.draw());
			g.set && g.set.show();
			e = g.bottom
		}
	},
	showBullets: function() {
		AmCharts.remove(this.allBullets);
		var a = this.container,
			b = a.set();
		this.set.push(b);
		this.set.show();
		this.allBullets = b;
		for (var b = this.chart.graphs, d = 0; d < b.length; d++) {
			var e = b[d];
			if (!e.hidden && e.balloonText) {
				var f = this.data[this.index].axes[e.valueAxis.id].graphs[e.id],
					g = f.y;
				if (!isNaN(g)) {
					var h, j;
					h = f.x;
					this.rotate ? (j = g, g = h) : j = h;
					e = AmCharts.circle(a, this.bulletSize / 2, this.chart.getBalloonColor(e, f), e.cursorBulletAlpha);
					e.translate(j, g);
					this.allBullets.push(e)
				}
			}
		}
	},
	destroy: function() {
		this.clear();
		AmCharts.remove(this.selection);
		this.selection = null;
		var a = this.categoryBalloon;
		a && a.destroy();
		this.destroyValueBalloons();
		AmCharts.remove(this.set)
	},
	clear: function() {
		clearInterval(this.interval)
	},
	destroyValueBalloons: function() {
		var a = this.valueBalloons;
		if (a) for (var b = 0; b < a.length; b++) a[b].balloon.hide()
	},
	zoom: function(a, b, d, e) {
		var f = this.chart;
		this.destroyValueBalloons();
		this.zooming = !1;
		var g;
		this.rotate ? this.selectionPosY = g = f.mouseY : this.selectionPosX = g = f.mouseX;
		this.start = a;
		this.end = b;
		this.startTime = d;
		this.endTime = e;
		this.zoomed = !0;
		var h = f.categoryAxis,
			f = this.rotate;
		g = this.width;
		var j = this.height;
		h.parseDates && !h.equalSpacing ? (a = e - d + h.minDuration(), a = f ? j / a : g / a) : a = f ? j / (b - a) : g / (b - a);
		this.stepWidth = a;
		this.setPosition();
		this.hideCursor()
	},
	hideObj: function(a) {
		a && a.hide()
	},
	hideCursor: function(a) {
		void 0 == a && (a = !0);
		this.hideObj(this.set);
		this.hideObj(this.categoryBalloon);
		this.hideObj(this.line);
		this.hideObj(this.vLine);
		this.hideObj(this.hLine);
		this.hideObj(this.allBullets);
		this.destroyValueBalloons();
		this.selectWithoutZooming || AmCharts.remove(this.selection);
		this.previousIndex = NaN;
		a && this.fire("onHideCursor", {
			type: "onHideCursor",
			chart: this.chart,
			target: this
		});
		this.drawing || this.chart.setMouseCursor("auto")
	},
	setPosition: function(a, b) {
		void 0 == b && (b = !0);
		if ("cursor" == this.type) {
			if (AmCharts.ifArray(this.data)) {
				isNaN(a) && (a = this.getMousePosition());
				if ((a != this.previousMousePosition || !0 == this.zoomed || this.oneBalloonOnly) && !isNaN(a)) {
					var d = this.chart.categoryAxis.xToIndex(a);
					if (d != this.previousIndex || this.zoomed || "mouse" == this.cursorPosition || this.oneBalloonOnly) this.updateCursor(d, b), this.zoomed = !1
				}
				this.previousMousePosition = a
			}
		} else this.updateCrosshair()
	},
	updateCursor: function(a, b) {
		var d = this.chart,
			e = d.mouseX - this.x,
			f = d.mouseY - this.y;
		this.drawingNow && (AmCharts.remove(this.drawingLine), this.drawingLine = AmCharts.line(this.container, [this.x + this.drawStartX, this.x + e], [this.y + this.drawStartY, this.y + f], this.cursorColor, 1, 1));
		if (this.enabled) {
			void 0 == b && (b = !0);
			this.index = a;
			var g = d.categoryAxis,
				h = d.dx,
				j = d.dy,
				k = this.x,
				l = this.y,
				m = this.width,
				n = this.height,
				t = this.data[a],
				r = t.x[g.id],
				q = d.rotate,
				p = g.inside,
				s = this.stepWidth,
				u = this.categoryBalloon,
				v = this.firstTime,
				y = this.lastTime,
				z = this.cursorPosition,
				A = g.position,
				w = this.zooming,
				x = this.panning,
				B = d.graphs,
				G = g.axisThickness;
			if (d.mouseIsOver || w || x || this.forceShow) if (this.forceShow = !1, x) {
				l = this.panClickPos;
				d = this.panClickEndTime;
				w = this.panClickStartTime;
				h = this.panClickEnd;
				k = this.panClickStart;
				e = (q ? l - f : l - e) / s;
				if (!g.parseDates || g.equalSpacing) e = Math.round(e);
				0 != e && (l = {
					type: "zoomed",
					target: this
				}, l.chart = this.chart, g.parseDates && !g.equalSpacing ? (d + e > y && (e = y - d), w + e < v && (e = v - w), l.start = w + e, l.end = d + e, this.fire(l.type, l)) : h + e >= this.data.length || 0 > k + e || (l.start = k + e, l.end = h + e, this.fire(l.type, l)))
			} else {
				"start" == z && (r -= g.cellWidth / 2);
				"mouse" == z && d.mouseIsOver && (r = q ? f - 2 : e - 2);
				if (q) {
					if (0 > r) if (w) r = 0;
					else {
						this.hideCursor();
						return
					}
					if (r > n + 1) if (w) r = n + 1;
					else {
						this.hideCursor();
						return
					}
				} else {
					if (0 > r) if (w) r = 0;
					else {
						this.hideCursor();
						return
					}
					if (r > m) if (w) r = m;
					else {
						this.hideCursor();
						return
					}
				}
				0 < this.cursorAlpha && (v = this.line, q ? v.translate(0, r + j) : v.translate(r, 0), v.show());
				this.linePos = q ? r + j : r;
				w && (q ? this.updateSelectionSize(NaN, r) : this.updateSelectionSize(r, NaN));
				v = !0;
				w && (v = !1);
				this.categoryBalloonEnabled && v ? (q ? (p && ("right" == A ? u.setBounds(k, l + j, k + m + h, l + r + j) : u.setBounds(k, l + j, k + m + h, l + r)), "right" == A ? p ? u.setPosition(k + m + h, l + r + j) : u.setPosition(k + m + h + G, l + r + j) : p ? u.setPosition(k, l + r) : u.setPosition(k - G, l + r)) : "top" == A ? p ? u.setPosition(k + r + h, l + j) : u.setPosition(k + r + h, l + j - G + 1) : p ? u.setPosition(k + r, l + n) : u.setPosition(k + r, l + n + G - 1), g.parseDates ? (g = AmCharts.formatDate(t.category, this.categoryBalloonDateFormat), -1 != g.indexOf("fff") && (g = AmCharts.formatMilliseconds(g, t.category)), u.showBalloon(g)) : u.showBalloon(t.category)) : u.hide();
				B && this.bulletsEnabled && this.showBullets();
				this.destroyValueBalloons();
				if (B && this.valueBalloonsEnabled && v && d.balloon.enabled) {
					this.valueBalloons = g = [];
					if (this.oneBalloonOnly) for (var j = Infinity, Z, v = 0; v < B.length; v++) s = B[v], s.showBalloon && (!s.hidden && s.balloonText) && (u = t.axes[s.valueAxis.id].graphs[s.id], y = u.y, isNaN(y) || (q ? Math.abs(e - y) < j && (j = Math.abs(e - y), Z = s) : Math.abs(f - y) < j && (j = Math.abs(f - y), Z = s)));
					for (v = 0; v < B.length; v++) if (s = B[v], !(this.oneBalloonOnly && s != Z) && (s.showBalloon && !s.hidden && s.balloonText) && (u = t.axes[s.valueAxis.id].graphs[s.id], y = u.y, !isNaN(y))) {
						r = u.x;
						p = !0;
						if (q) {
							if (j = y, 0 > r || r > n) p = !1
						} else if (j = r, r = y, 0 > j || j > m + h) p = !1;
						p && (p = s.valueBalloon, A = d.getBalloonColor(s, u), p.setBounds(k, l, k + m, l + n), p.pointerOrientation = "H", p.changeColor(A), void 0 != s.balloonAlpha && (p.fillAlpha = s.balloonAlpha), void 0 != s.balloonTextColor && (p.color = s.balloonTextColor), p.setPosition(j + k, r + l), s = d.formatString(s.balloonText, u, s), "" != s && p.showBalloon(s), !q && p.set && p.set.hide(), g.push({
							yy: y,
							balloon: p
						}))
					}
					q || this.arrangeBalloons()
				}
				b ? (l = {
					type: "changed"
				}, l.index = a, l.target = this, l.chart = this.chart, l.zooming = w, l.position = q ? f : e, l.target = this, d.fire("changed", l), this.fire("changed", l), this.skipZoomDispatch = !1) : (this.skipZoomDispatch = !0, d.updateLegendValues(a));
				this.previousIndex = a
			}
		} else this.hideCursor()
	},
	enableDrawing: function(a) {
		this.enabled = !a;
		this.hideCursor();
		this.rolledOver = !1;
		this.drawing = a
	},
	isZooming: function(a) {
		a && a != this.zooming && this.handleMouseDown("fake");
		!a && a != this.zooming && this.handleMouseUp()
	},
	handleMouseOut: function() {
		if (this.enabled) if (this.zooming) this.setPosition();
		else {
			this.index = void 0;
			var a = {
				type: "changed",
				index: void 0,
				target: this
			};
			a.chart = this.chart;
			this.fire("changed", a);
			this.hideCursor()
		}
	},
	handleReleaseOutside: function() {
		this.handleMouseUp()
	},
	handleMouseUp: function() {
		var a = this.chart;
		if (a) {
			var b = a.mouseX - this.x,
				d = a.mouseY - this.y;
			if (this.drawingNow) {
				this.drawingNow = !1;
				AmCharts.remove(this.drawingLine);
				var e = this.drawStartX,
					f = this.drawStartY;
				if (2 < Math.abs(e - b) || 2 < Math.abs(f - d)) e = {
					type: "draw",
					target: this,
					chart: a,
					initialX: e,
					initialY: f,
					finalX: b,
					finalY: d
				}, this.fire(e.type, e)
			}
			if (this.enabled && 0 < this.data.length) {
				if (this.pan) this.rolledOver = !1;
				else if (this.zoomable && !this.selectWithoutZooming && this.zooming) {
					e = {
						type: "zoomed",
						target: this
					};
					e.chart = this.chart;
					if ("cursor" == this.type) this.rotate ? this.selectionPosY = a = d : this.selectionPosX = a = b, 2 > Math.abs(a - this.initialMouse) && this.fromIndex == this.index || (this.index < this.fromIndex ? (e.end = this.fromIndex, e.start = this.index) : (e.end = this.index, e.start = this.fromIndex), a = this.chart.categoryAxis, a.parseDates && !a.equalSpacing && (e.start = this.data[e.start].time, e.end = this.data[e.end].time), this.skipZoomDispatch || this.fire(e.type, e));
					else {
						var g = this.initialMouseX,
							h = this.initialMouseY;
						if (!(3 > Math.abs(b - g) && 3 > Math.abs(d - h))) {
							var f = Math.min(g, b),
								j = Math.min(h, d),
								b = Math.abs(g - b),
								d = Math.abs(h - d);
							a.hideXScrollbar && (f = 0, b = this.width);
							a.hideYScrollbar && (j = 0, d = this.height);
							e.selectionHeight = d;
							e.selectionWidth = b;
							e.selectionY = j;
							e.selectionX = f;
							this.skipZoomDispatch || this.fire(e.type, e)
						}
					}
					AmCharts.remove(this.selection)
				}
				this.panning = this.zooming = this.skipZoomDispatch = !1
			}
		}
	},
	showCursorAt: function(a) {
		var b = this.chart.categoryAxis;
		a = b.parseDates ? b.dateToCoordinate(a) : b.categoryToCoordinate(a);
		this.previousMousePosition = NaN;
		this.forceShow = !0;
		this.setPosition(a, !1)
	},
	handleMouseDown: function(a) {
		if (this.zoomable || this.pan || this.drawing) {
			var b = this.rotate,
				d = this.chart,
				e = d.mouseX - this.x,
				f = d.mouseY - this.y;
			if (0 < e && e < this.width && 0 < f && f < this.height || "fake" == a) this.setPosition(), this.selectWithoutZooming && AmCharts.remove(this.selection), this.drawing ? (this.drawStartY = f, this.drawStartX = e, this.drawingNow = !0) : this.pan ? (this.zoomable = !1, d.setMouseCursor("move"), this.panning = !0, this.panClickPos = b ? f : e, this.panClickStart = this.start, this.panClickEnd = this.end, this.panClickStartTime = this.startTime, this.panClickEndTime = this.endTime) : this.zoomable && ("cursor" == this.type ? (this.fromIndex = this.index, b ? (this.initialMouse = f, this.selectionPosY = this.linePos) : (this.initialMouse = e, this.selectionPosX = this.linePos)) : (this.initialMouseX = e, this.initialMouseY = f, this.selectionPosX = e, this.selectionPosY = f), this.zooming = !0)
		}
	}
});
AmCharts.SimpleChartScrollbar = AmCharts.Class({
	construct: function() {
		this.createEvents("zoomed");
		this.backgroundColor = "#D4D4D4";
		this.backgroundAlpha = 1;
		this.selectedBackgroundColor = "#EFEFEF";
		this.scrollDuration = this.selectedBackgroundAlpha = 1;
		this.resizeEnabled = !0;
		this.hideResizeGrips = !1;
		this.scrollbarHeight = 20;
		this.updateOnReleaseOnly = !1;
		9 > document.documentMode && (this.updateOnReleaseOnly = !0);
		this.dragIconWidth = 11;
		this.dragIconHeight = 18
	},
	draw: function() {
		var a = this;
		a.destroy();
		a.interval = setInterval(function() {
			a.updateScrollbar.call(a)
		}, 40);
		var b = a.chart.container,
			d = a.rotate,
			e = a.chart,
			f = b.set();
		a.set = f;
		e.scrollbarsSet.push(f);
		var g, h;
		d ? (g = a.scrollbarHeight, h = e.plotAreaHeight) : (h = a.scrollbarHeight, g = e.plotAreaWidth);
		a.width = g;
		if ((a.height = h) && g) {
			var j = AmCharts.rect(b, g, h, a.backgroundColor, a.backgroundAlpha);
			a.bg = j;
			f.push(j);
			j = AmCharts.rect(b, g, h, "#000", 0.005);
			f.push(j);
			a.invisibleBg = j;
			j.click(function() {
				a.handleBgClick()
			}).mouseover(function() {
				a.handleMouseOver()
			}).mouseout(function() {
				a.handleMouseOut()
			}).touchend(function() {
				a.handleBgClick()
			});
			j = AmCharts.rect(b, g, h, a.selectedBackgroundColor, a.selectedBackgroundAlpha);
			a.selectedBG = j;
			f.push(j);
			g = AmCharts.rect(b, g, h, "#000", 0.005);
			a.dragger = g;
			f.push(g);
			g.mousedown(function(b) {
				a.handleDragStart(b)
			}).mouseup(function() {
				a.handleDragStop()
			}).mouseover(function() {
				a.handleDraggerOver()
			}).mouseout(function() {
				a.handleMouseOut()
			}).touchstart(function(b) {
				a.handleDragStart(b)
			}).touchend(function() {
				a.handleDragStop()
			});
			g = e.pathToImages;
			d ? (j = g + "dragIconH.gif", g = a.dragIconWidth, d = a.dragIconHeight) : (j = g + "dragIcon.gif", d = a.dragIconWidth, g = a.dragIconHeight);
			h = b.image(j, 0, 0, d, g);
			var j = b.image(j, 0, 0, d, g),
				k = 10,
				l = 20;
			e.panEventsEnabled && (k = 25, l = a.scrollbarHeight);
			var m = AmCharts.rect(b, k, l, "#000", 0.005),
				n = AmCharts.rect(b, k, l, "#000", 0.005);
			n.translate(-(k - d) / 2, -(l - g) / 2);
			m.translate(-(k - d) / 2, -(l - g) / 2);
			d = b.set([h, n]);
			b = b.set([j, m]);
			a.iconLeft = d;
			f.push(a.iconLeft);
			a.iconRight = b;
			f.push(b);
			d.mousedown(function() {
				a.leftDragStart()
			}).mouseup(function() {
				a.leftDragStop()
			}).mouseover(function() {
				a.iconRollOver()
			}).mouseout(function() {
				a.iconRollOut()
			}).touchstart(function() {
				a.leftDragStart()
			}).touchend(function() {
				a.leftDragStop()
			});
			b.mousedown(function() {
				a.rightDragStart()
			}).mouseup(function() {
				a.rightDragStop()
			}).mouseover(function() {
				a.iconRollOver()
			}).mouseout(function() {
				a.iconRollOut()
			}).touchstart(function() {
				a.rightDragStart()
			}).touchend(function() {
				a.rightDragStop()
			});
			AmCharts.ifArray(e.chartData) ? f.show() : f.hide();
			a.hideDragIcons()
		}
		f.translate(a.x, a.y);
		a.clipDragger(!1)
	},
	updateScrollbarSize: function(a, b) {
		var d = this.dragger,
			e, f, g, h;
		this.rotate ? (e = 0, f = a, g = this.width + 1, h = b - a, d.setAttr("height", b - a), d.setAttr("y", f)) : (e = a, f = 0, g = b - a, h = this.height + 1, d.setAttr("width", b - a), d.setAttr("x", e));
		this.clipAndUpdate(e, f, g, h)
	},
	updateScrollbar: function() {
		var a, b = !1,
			d, e, f = this.x,
			g = this.y,
			h = this.dragger,
			j = this.getDBox();
		d = j.x + f;
		e = j.y + g;
		var k = j.width,
			j = j.height,
			l = this.rotate,
			m = this.chart,
			n = this.width,
			t = this.height,
			r = m.mouseX,
			q = m.mouseY;
		a = this.initialMouse;
		m.mouseIsOver && (this.dragging && (m = this.initialCoord, l ? (a = m + (q - a), 0 > a && (a = 0), m = t - j, a > m && (a = m), h.setAttr("y", a)) : (a = m + (r - a), 0 > a && (a = 0), m = n - k, a > m && (a = m), h.setAttr("x", a))), this.resizingRight && (l ? (a = q - e, a + e > t + g && (a = t - e + g), 0 > a ? (this.resizingRight = !1, b = this.resizingLeft = !0) : (0 == a && (a = 0.1), h.setAttr("height", a))) : (a = r - d, a + d > n + f && (a = n - d + f), 0 > a ? (this.resizingRight = !1, b = this.resizingLeft = !0) : (0 == a && (a = 0.1), h.setAttr("width", a)))), this.resizingLeft && (l ? (d = e, e = q, e < g && (e = g), e > t + g && (e = t + g), a = !0 == b ? d - e : j + d - e, 0 > a ? (this.resizingRight = !0, this.resizingLeft = !1, h.setAttr("y", d + j - g)) : (0 == a && (a = 0.1), h.setAttr("y", e - g), h.setAttr("height", a))) : (e = r, e < f && (e = f), e > n + f && (e = n + f), a = !0 == b ? d - e : k + d - e, 0 > a ? (this.resizingRight = !0, this.resizingLeft = !1, h.setAttr("x", d + k - f)) : (0 == a && (a = 0.1), h.setAttr("x", e - f), h.setAttr("width", a)))), this.clipDragger(!0))
	},
	clipDragger: function(a) {
		var b = this.getDBox(),
			d = b.x,
			e = b.y,
			f = b.width,
			b = b.height,
			g = !1;
		if (this.rotate) {
			if (d = 0, f = this.width + 1, this.clipY != e || this.clipH != b) g = !0
		} else if (e = 0, b = this.height + 1, this.clipX != d || this.clipW != f) g = !0;
		g && (this.clipAndUpdate(d, e, f, b), a && (this.updateOnReleaseOnly || this.dispatchScrollbarEvent()))
	},
	maskGraphs: function() {},
	clipAndUpdate: function(a, b, d, e) {
		this.clipX = a;
		this.clipY = b;
		this.clipW = d;
		this.clipH = e;
		this.selectedBG.clipRect(a, b, d, e);
		this.updateDragIconPositions();
		this.maskGraphs(a, b, d, e)
	},
	dispatchScrollbarEvent: function() {
		if (this.skipEvent) this.skipEvent = !1;
		else {
			var a = this.chart;
			a.hideBalloon();
			var b = this.getDBox(),
				d = b.x,
				e = b.y,
				f = b.width,
				b = b.height;
			this.rotate ? (d = e, f = this.height / b) : f = this.width / f;
			a = {
				type: "zoomed",
				position: d,
				chart: a,
				target: this,
				multiplier: f
			};
			this.fire(a.type, a)
		}
	},
	updateDragIconPositions: function() {
		var a = this.getDBox(),
			b = a.x,
			d = a.y,
			e = this.iconLeft,
			f = this.iconRight,
			g, h, j = this.scrollbarHeight;
		this.rotate ? (g = this.dragIconWidth, h = this.dragIconHeight, e.translate((j - h) / 2, d - g / 2), f.translate((j - h) / 2, d + a.height - g / 2)) : (g = this.dragIconHeight, h = this.dragIconWidth, e.translate(b - h / 2, (j - g) / 2), f.translate(b + -h / 2 + a.width, (j - g) / 2))
	},
	showDragIcons: function() {
		this.resizeEnabled && (this.iconLeft.show(), this.iconRight.show())
	},
	hideDragIcons: function() {
		!this.resizingLeft && (!this.resizingRight && !this.dragging) && (this.hideResizeGrips && (this.iconLeft.hide(), this.iconRight.hide()), this.removeCursors())
	},
	removeCursors: function() {
		this.chart.setMouseCursor("auto")
	},
	relativeZoom: function(a, b) {
		this.dragger.stop();
		this.multiplier = a;
		this.position = b;
		this.updateScrollbarSize(b, this.rotate ? b + this.height / a : b + this.width / a)
	},
	destroy: function() {
		this.clear();
		AmCharts.remove(this.set)
	},
	clear: function() {
		clearInterval(this.interval)
	},
	handleDragStart: function() {
		var a = this.chart;
		this.dragger.stop();
		this.removeCursors();
		this.dragging = !0;
		var b = this.getDBox();
		this.rotate ? (this.initialCoord = b.y, this.initialMouse = a.mouseY) : (this.initialCoord = b.x, this.initialMouse = a.mouseX)
	},
	handleDragStop: function() {
		this.updateOnReleaseOnly && (this.updateScrollbar(), this.skipEvent = !1, this.dispatchScrollbarEvent());
		this.dragging = !1;
		this.mouseIsOver && this.removeCursors();
		this.updateScrollbar()
	},
	handleDraggerOver: function() {
		this.handleMouseOver()
	},
	leftDragStart: function() {
		this.dragger.stop();
		this.resizingLeft = !0
	},
	leftDragStop: function() {
		this.resizingLeft = !1;
		this.mouseIsOver || this.removeCursors();
		this.updateOnRelease()
	},
	rightDragStart: function() {
		this.dragger.stop();
		this.resizingRight = !0
	},
	rightDragStop: function() {
		this.resizingRight = !1;
		this.mouseIsOver || this.removeCursors();
		this.updateOnRelease()
	},
	iconRollOut: function() {
		this.removeCursors()
	},
	iconRollOver: function() {
		this.rotate ? this.chart.setMouseCursor("n-resize") : this.chart.setMouseCursor("e-resize");
		this.handleMouseOver()
	},
	getDBox: function() {
		return this.dragger.getBBox()
	},
	handleBgClick: function() {
		if (!this.resizingRight && !this.resizingLeft) {
			this.zooming = !0;
			var a, b, d = this.scrollDuration,
				e = this.dragger;
			a = this.getDBox();
			var f = a.height,
				g = a.width;
			b = this.chart;
			var h = this.y,
				j = this.x,
				k = this.rotate;
			k ? (a = "y", b = b.mouseY - f / 2 - h, b = AmCharts.fitToBounds(b, 0, this.height - f)) : (a = "x", b = b.mouseX - g / 2 - j, b = AmCharts.fitToBounds(b, 0, this.width - g));
			this.updateOnReleaseOnly ? (this.skipEvent = !1, e.setAttr(a, b), this.dispatchScrollbarEvent(), this.clipDragger()) : (b = Math.round(b), k ? e.animate({
				y: b
			}, d, ">") : e.animate({
				x: b
			}, d, ">"))
		}
	},
	updateOnRelease: function() {
		this.updateOnReleaseOnly && (this.updateScrollbar(), this.skipEvent = !1, this.dispatchScrollbarEvent())
	},
	handleReleaseOutside: function() {
		if (this.set) {
			if (this.resizingLeft || this.resizingRight || this.dragging) this.updateOnRelease(), this.removeCursors();
			this.mouseIsOver = this.dragging = this.resizingRight = this.resizingLeft = !1;
			this.hideDragIcons();
			this.updateScrollbar()
		}
	},
	handleMouseOver: function() {
		this.mouseIsOver = !0;
		this.showDragIcons()
	},
	handleMouseOut: function() {
		this.mouseIsOver = !1;
		this.hideDragIcons()
	}
});
AmCharts.ChartScrollbar = AmCharts.Class({
	inherits: AmCharts.SimpleChartScrollbar,
	construct: function() {
		AmCharts.ChartScrollbar.base.construct.call(this);
		this.graphLineColor = "#BBBBBB";
		this.graphLineAlpha = 0;
		this.graphFillColor = "#BBBBBB";
		this.graphFillAlpha = 1;
		this.selectedGraphLineColor = "#888888";
		this.selectedGraphLineAlpha = 0;
		this.selectedGraphFillColor = "#888888";
		this.selectedGraphFillAlpha = 1;
		this.gridCount = 0;
		this.gridColor = "#FFFFFF";
		this.gridAlpha = 0.7;
		this.skipEvent = this.autoGridCount = !1;
		this.color = "#FFFFFF";
		this.scrollbarCreated = !1
	},
	init: function() {
		var a = this.categoryAxis,
			b = this.chart;
		a || (this.categoryAxis = a = new AmCharts.CategoryAxis);
		a.chart = b;
		a.id = "scrollbar";
		a.dateFormats = b.categoryAxis.dateFormats;
		a.boldPeriodBeginning = b.categoryAxis.boldPeriodBeginning;
		a.axisItemRenderer = AmCharts.RecItem;
		a.axisRenderer = AmCharts.RecAxis;
		a.guideFillRenderer = AmCharts.RecFill;
		a.inside = !0;
		a.fontSize = this.fontSize;
		a.tickLength = 0;
		a.axisAlpha = 0;
		this.graph && (a = this.valueAxis, a || (this.valueAxis = a = new AmCharts.ValueAxis, a.visible = !1, a.scrollbar = !0, a.axisItemRenderer = AmCharts.RecItem, a.axisRenderer = AmCharts.RecAxis, a.guideFillRenderer = AmCharts.RecFill, a.labelsEnabled = !1, a.chart = b), b = this.unselectedGraph, b || (b = new AmCharts.AmGraph, b.scrollbar = !0, this.unselectedGraph = b, b.negativeBase = this.graph.negativeBase), b = this.selectedGraph, b || (b = new AmCharts.AmGraph, b.scrollbar = !0, this.selectedGraph = b, b.negativeBase = this.graph.negativeBase));
		this.scrollbarCreated = !0
	},
	draw: function() {
		var a = this;
		AmCharts.ChartScrollbar.base.draw.call(a);
		a.scrollbarCreated || a.init();
		var b = a.chart,
			d = b.chartData,
			e = a.categoryAxis,
			f = a.rotate,
			g = a.x,
			h = a.y,
			j = a.width,
			k = a.height,
			l = b.categoryAxis,
			m = a.set;
		e.setOrientation(!f);
		e.parseDates = l.parseDates;
		e.rotate = f;
		e.equalSpacing = l.equalSpacing;
		e.minPeriod = l.minPeriod;
		e.startOnAxis = l.startOnAxis;
		e.viW = j;
		e.viH = k;
		e.width = j;
		e.height = k;
		e.gridCount = a.gridCount;
		e.gridColor = a.gridColor;
		e.gridAlpha = a.gridAlpha;
		e.color = a.color;
		e.autoGridCount = a.autoGridCount;
		e.parseDates && !e.equalSpacing && e.timeZoom(d[0].time, d[d.length - 1].time);
		e.zoom(0, d.length - 1);
		if (l = a.graph) {
			var n = a.valueAxis,
				t = l.valueAxis;
			n.id = t.id;
			n.rotate = f;
			n.setOrientation(f);
			n.width = j;
			n.height = k;
			n.viW = j;
			n.viH = k;
			n.dataProvider = d;
			n.reversed = t.reversed;
			n.logarithmic = t.logarithmic;
			n.gridAlpha = 0;
			n.axisAlpha = 0;
			m.push(n.set);
			f ? n.y = h : n.x = g;
			for (var g = Infinity, h = -Infinity, r = 0; r < d.length; r++) {
				var q = d[r].axes[t.id].graphs[l.id].values,
					p;
				for (p in q) if ("percents" != p && "total" != p) {
					var s = q[p];
					s < g && (g = s);
					s > h && (h = s)
				}
			}
			Infinity != g && (n.minimum = g); - Infinity != h && (n.maximum = h + 0.1 * (h - g));
			g == h && (n.minimum -= 1, n.maximum += 1);
			n.zoom(0, d.length - 1);
			p = a.unselectedGraph;
			p.id = l.id;
			p.rotate = f;
			p.chart = b;
			p.chartType = b.chartType;
			p.data = d;
			p.valueAxis = n;
			p.chart = l.chart;
			p.categoryAxis = a.categoryAxis;
			p.valueField = l.valueField;
			p.openField = l.openField;
			p.closeField = l.closeField;
			p.highField = l.highField;
			p.lowField = l.lowField;
			p.lineAlpha = a.graphLineAlpha;
			p.lineColor = a.graphLineColor;
			p.fillAlphas = a.graphFillAlpha;
			p.fillColors = a.graphFillColor;
			p.connect = l.connect;
			p.hidden = l.hidden;
			p.width = j;
			p.height = k;
			t = a.selectedGraph;
			t.id = l.id;
			t.rotate = f;
			t.chart = b;
			t.chartType = b.chartType;
			t.data = d;
			t.valueAxis = n;
			t.chart = l.chart;
			t.categoryAxis = e;
			t.valueField = l.valueField;
			t.openField = l.openField;
			t.closeField = l.closeField;
			t.highField = l.highField;
			t.lowField = l.lowField;
			t.lineAlpha = a.selectedGraphLineAlpha;
			t.lineColor = a.selectedGraphLineColor;
			t.fillAlphas = a.selectedGraphFillAlpha;
			t.fillColors = a.selectedGraphFillColor;
			t.connect = l.connect;
			t.hidden = l.hidden;
			t.width = j;
			t.height = k;
			b = a.graphType;
			b || (b = l.type);
			p.type = b;
			t.type = b;
			d = d.length - 1;
			p.zoom(0, d);
			t.zoom(0, d);
			t.set.click(function() {
				a.handleBackgroundClick()
			}).mouseover(function() {
				a.handleMouseOver()
			}).mouseout(function() {
				a.handleMouseOut()
			});
			p.set.click(function() {
				a.handleBackgroundClick()
			}).mouseover(function() {
				a.handleMouseOver()
			}).mouseout(function() {
				a.handleMouseOut()
			});
			m.push(p.set);
			m.push(t.set)
		}
		m.push(e.set);
		m.push(e.labelsSet);
		a.bg.toBack();
		a.invisibleBg.toFront();
		a.dragger.toFront();
		a.iconLeft.toFront();
		a.iconRight.toFront()
	},
	timeZoom: function(a, b) {
		this.startTime = a;
		this.endTime = b;
		this.timeDifference = b - a;
		this.skipEvent = !0;
		this.zoomScrollbar()
	},
	zoom: function(a, b) {
		this.start = a;
		this.end = b;
		this.skipEvent = !0;
		this.zoomScrollbar()
	},
	dispatchScrollbarEvent: function() {
		if (this.skipEvent) this.skipEvent = !1;
		else {
			var a = this.chart.chartData,
				b, d, e = this.dragger.getBBox();
			b = e.x;
			d = e.y;
			var f = e.width,
				e = e.height;
			this.rotate ? (b = d, d = e) : d = f;
			f = {
				type: "zoomed",
				target: this
			};
			f.chart = this.chart;
			var e = this.categoryAxis,
				g = this.stepWidth;
			if (e.parseDates && !e.equalSpacing) {
				var a = a[0].time,
					h = e.minDuration(),
					e = Math.round(b / g) + a,
					a = this.dragging ? e + this.timeDifference : Math.round((b + d) / g) + a - h;
				e > a && (e = a);
				if (e != this.startTime || a != this.endTime) this.startTime = e, this.endTime = a, f.start = e, f.end = a, f.startDate = new Date(e), f.endDate = new Date(a), this.fire(f.type, f)
			} else if (e.startOnAxis || (b += g / 2), d -= this.stepWidth / 2, g = e.xToIndex(b), b = e.xToIndex(b + d), g != this.start || this.end != b) e.startOnAxis && (this.resizingRight && g == b && b++, this.resizingLeft && g == b && (0 < g ? g-- : b = 1)), this.start = g, this.end = this.dragging ? this.start + this.difference : b, f.start = this.start, f.end = this.end, e.parseDates && (a[this.start] && (f.startDate = new Date(a[this.start].time)), a[this.end] && (f.endDate = new Date(a[this.end].time))), this.fire(f.type, f)
		}
	},
	zoomScrollbar: function() {
		var a, b;
		b = this.chart.chartData;
		var d = this.categoryAxis,
			e;
		d.parseDates && !d.equalSpacing ? (e = d.stepWidth, b = b[0].time, a = e * (this.startTime - b), b = e * (this.endTime - b + d.minDuration())) : (a = b[this.start].x[d.id], b = b[this.end].x[d.id], e = d.stepWidth, d.startOnAxis || (d = e / 2, a -= d, b += d));
		this.stepWidth = e;
		this.updateScrollbarSize(a, b)
	},
	maskGraphs: function(a, b, d, e) {
		var f = this.selectedGraph;
		f && f.set.clipRect(a, b, d, e)
	},
	handleDragStart: function() {
		AmCharts.ChartScrollbar.base.handleDragStart.call(this);
		this.difference = this.end - this.start;
		this.timeDifference = this.endTime - this.startTime;
		0 > this.timeDifference && (this.timeDifference = 0)
	},
	handleBackgroundClick: function() {
		AmCharts.ChartScrollbar.base.handleBackgroundClick.call(this);
		this.dragging || (this.difference = this.end - this.start, this.timeDifference = this.endTime - this.startTime, 0 > this.timeDifference && (this.timeDifference = 0))
	}
});
AmCharts.circle = function(a, b, d, e, f, g, h, j) {
	if (void 0 == f || 0 == f) f = 1;
	void 0 == g && (g = "#000000");
	void 0 == h && (h = 0);
	e = {
		fill: d,
		stroke: g,
		"fill-opacity": e,
		"stroke-width": f,
		"stroke-opacity": h
	};
	a = a.circle(0, 0, b).attr(e);
	j && a.gradient("radialGradient", [d, AmCharts.adjustLuminosity(d, -0.6)]);
	return a
};
AmCharts.text = function(a, b, d, e, f, g, h, j) {
	g || (g = "middle");
	"right" == g && (g = "end");
	d = {
		fill: d,
		"font-family": e,
		"font-size": f,
		opacity: j
	};
	!0 == h && (d["font-weight"] = "bold");
	d["text-anchor"] = g;
	return a.text(b, d)
};
AmCharts.polygon = function(a, b, d, e, f, g, h, j, k) {
	isNaN(g) && (g = 0);
	isNaN(j) && (j = f);
	var l = e,
		m = !1;
	"object" == typeof l && 1 < l.length && (m = !0, l = l[0]);
	void 0 == h && (h = l);
	f = {
		fill: l,
		stroke: h,
		"fill-opacity": f,
		"stroke-width": g,
		"stroke-opacity": j
	};
	g = AmCharts.dx;
	h = AmCharts.dy;
	j = Math.round;
	for (var l = "M" + (j(b[0]) + g) + "," + (j(d[0]) + h), n = 1; n < b.length; n++) l += " L" + (j(b[n]) + g) + "," + (j(d[n]) + h);
	a = a.path(l + " Z").attr(f);
	m && a.gradient("linearGradient", e, k);
	return a
};
AmCharts.rect = function(a, b, d, e, f, g, h, j, k, l) {
	isNaN(g) && (g = 0);
	void 0 == k && (k = 0);
	void 0 == l && (l = 270);
	isNaN(f) && (f = 0);
	var m = e,
		n = !1;
	"object" == typeof m && (m = m[0], n = !0);
	void 0 == h && (h = m);
	void 0 == j && (j = f);
	b = Math.round(b);
	d = Math.round(d);
	var t = 0,
		r = 0;
	0 > b && (b = Math.abs(b), t = -b);
	0 > d && (d = Math.abs(d), r = -d);
	t += AmCharts.dx;
	r += AmCharts.dy;
	f = {
		fill: m,
		stroke: h,
		"fill-opacity": f,
		"stroke-opacity": j
	};
	a = a.rect(t, r, b, d, k, g).attr(f);
	n && a.gradient("linearGradient", e, l);
	return a
};
AmCharts.triangle = function(a, b, d, e, f, g, h, j) {
	if (void 0 == g || 0 == g) g = 1;
	void 0 == h && (h = "#000");
	void 0 == j && (j = 0);
	e = {
		fill: e,
		stroke: h,
		"fill-opacity": f,
		"stroke-width": g,
		"stroke-opacity": j
	};
	b /= 2;
	var k;
	0 == d && (k = " M" + -b + "," + b + " L0," + -b + " L" + b + "," + b + " Z");
	180 == d && (k = " M" + -b + "," + -b + " L0," + b + " L" + b + "," + -b + " Z");
	90 == d && (k = " M" + -b + "," + -b + " L" + b + ",0 L" + -b + "," + b + " Z");
	270 == d && (k = " M" + -b + ",0 L" + b + "," + b + " L" + b + "," + -b + " Z");
	return a.path(k).attr(e)
};
AmCharts.line = function(a, b, d, e, f, g, h, j, k, l) {
	g = {
		fill: "none",
		"stroke-width": g
	};
	void 0 != h && 0 < h && (g["stroke-dasharray"] = h);
	isNaN(f) || (g["stroke-opacity"] = f);
	e && (g.stroke = e);
	e = Math.round;
	l && (e = AmCharts.doNothing);
	l = AmCharts.dx;
	f = AmCharts.dy;
	h = "M" + (e(b[0]) + l) + "," + (e(d[0]) + f);
	for (j = 1; j < b.length; j++) h += " L" + (e(b[j]) + l) + "," + (e(d[j]) + f);
	if (AmCharts.VML) return a.path(h, void 0, !0).attr(g);
	k && (h += " M0,0 L0,0");
	return a.path(h).attr(g)
};
AmCharts.doNothing = function(a) {
	return a
};
AmCharts.wedge = function(a, b, d, e, f, g, h, j, k, l, m) {
	var n = Math.round;
	g = n(g);
	h = n(h);
	j = n(j);
	var t = n(h / g * j),
		r = AmCharts.VML,
		q = -359.5 - g / 100; - 359.95 > q && (q = -359.95);
	f <= q && (f = q);
	var p = 1 / 180 * Math.PI,
		q = b + Math.cos(e * p) * j,
		s = d + Math.sin(-e * p) * t,
		u = b + Math.cos(e * p) * g,
		v = d + Math.sin(-e * p) * h,
		y = b + Math.cos((e + f) * p) * g,
		z = d + Math.sin((-e - f) * p) * h,
		A = b + Math.cos((e + f) * p) * j,
		p = d + Math.sin((-e - f) * p) * t,
		w = {
			fill: AmCharts.adjustLuminosity(l.fill, -0.2),
			"stroke-opacity": 0
		},
		x = 0;
	180 < Math.abs(f) && (x = 1);
	e = a.set();
	var B;
	r && (q = n(10 * q), u = n(10 * u), y = n(10 * y), A = n(10 * A), s = n(10 * s), v = n(10 * v), z = n(10 * z), p = n(10 * p), b = n(10 * b), k = n(10 * k), d = n(10 * d), g *= 10, h *= 10, j *= 10, t *= 10, 1 > Math.abs(f) && (1 >= Math.abs(y - u) && 1 >= Math.abs(z - v)) && (B = !0));
	f = "";
	if (0 < k) {
		r ? (path = " M" + q + "," + (s + k) + " L" + u + "," + (v + k), B || (path += " A" + (b - g) + "," + (k + d - h) + "," + (b + g) + "," + (k + d + h) + "," + u + "," + (v + k) + "," + y + "," + (z + k)), path += " L" + A + "," + (p + k), 0 < j && (B || (path += " B" + (b - j) + "," + (k + d - t) + "," + (b + j) + "," + (k + d + t) + "," + A + "," + (k + p) + "," + q + "," + (k + s)))) : (path = " M" + q + "," + (s + k) + " L" + u + "," + (v + k), path += " A" + g + "," + h + ",0," + x + ",1," + y + "," + (z + k) + " L" + A + "," + (p + k), 0 < j && (path += " A" + j + "," + t + ",0," + x + ",0," + q + "," + (s + k)));
		path += " Z";
		c = a.path(path, void 0, void 0, "1000,1000").attr(w);
		e.push(c);
		var G = a.path(" M" + q + "," + s + " L" + q + "," + (s + k) + " L" + u + "," + (v + k) + " L" + u + "," + v + " L" + q + "," + s + " Z", void 0, void 0, "1000,1000").attr(w);
		k = a.path(" M" + y + "," + z + " L" + y + "," + (z + k) + " L" + A + "," + (p + k) + " L" + A + "," + p + " L" + y + "," + z + " Z", void 0, void 0, "1000,1000").attr(w);
		e.push(G);
		e.push(k)
	}
	r ? (B || (f = " A" + n(b - g) + "," + n(d - h) + "," + n(b + g) + "," + n(d + h) + "," + n(u) + "," + n(v) + "," + n(y) + "," + n(z)), g = " M" + n(q) + "," + n(s) + " L" + n(u) + "," + n(v) + f + " L" + n(A) + "," + n(p)) : g = " M" + q + "," + s + " L" + u + "," + v + (" A" + g + "," + h + ",0," + x + ",1," + y + "," + z) + " L" + A + "," + p;
	0 < j && (r ? B || (g += " B" + (b - j) + "," + (d - t) + "," + (b + j) + "," + (d + t) + "," + A + "," + p + "," + q + "," + s) : g += " A" + j + "," + t + ",0," + x + ",0," + q + "," + s);
	a = a.path(g + " Z", void 0, void 0, "1000,1000").attr(l);
	if (m) {
		b = [];
		for (d = 0; d < m.length; d++) b.push(AmCharts.adjustLuminosity(l.fill, m[d]));
		0 < b.length && a.gradient("linearGradient", b)
	}
	e.push(a);
	return e
};
AmCharts.adjustLuminosity = function(a, b) {
	a = String(a).replace(/[^0-9a-f]/gi, "");
	6 > a.length && (a = String(a[0]) + String(a[0]) + String(a[1]) + String(a[1]) + String(a[2]) + String(a[2]));
	b = b || 0;
	var d = "#",
		e, f;
	for (f = 0; 3 > f; f++) e = parseInt(a.substr(2 * f, 2), 16), e = Math.round(Math.min(Math.max(0, e + e * b), 255)).toString(16), d += ("00" + e).substr(e.length);
	return d
};
AmCharts.AmPieChart = AmCharts.Class({
	inherits: AmCharts.AmChart,
	construct: function() {
		this.createEvents("rollOverSlice", "rollOutSlice", "clickSlice", "pullOutSlice", "pullInSlice");
		AmCharts.AmPieChart.base.construct.call(this);
		this.colors = "#FF0F00 #FF6600 #FF9E01 #FCD202 #F8FF01 #B0DE09 #04D215 #0D8ECF #0D52D1 #2A0CD0 #8A0CCF #CD0D74 #754DEB #DDDDDD #999999 #333333 #000000 #57032A #CA9726 #990000 #4B0C25".split(" ");
		this.pieAlpha = 1;
		this.pieBaseColor;
		this.pieBrightnessStep = 30;
		this.groupPercent = 0;
		this.groupedTitle = "Other";
		this.groupedPulled = !1;
		this.groupedAlpha = 1;
		this.marginLeft = 0;
		this.marginBottom = this.marginTop = 10;
		this.marginRight = 0;
		this.minRadius = 10;
		this.hoverAlpha = 1;
		this.depth3D = 0;
		this.startAngle = 90;
		this.angle = this.innerRadius = 0;
		this.outlineColor = "#FFFFFF";
		this.outlineAlpha = 0;
		this.outlineThickness = 1;
		this.startRadius = "500%";
		this.startDuration = this.startAlpha = 1;
		this.startEffect = "bounce";
		this.sequencedAnimation = !1;
		this.pullOutRadius = "20%";
		this.pullOutDuration = 1;
		this.pullOutEffect = "bounce";
		this.pullOnHover = this.pullOutOnlyOne = !1;
		this.labelsEnabled = !0;
		this.labelRadius = 30;
		this.labelTickColor = "#000000";
		this.labelTickAlpha = 0.2;
		this.labelText = "[[title]]: [[percents]]%";
		this.hideLabelsPercent = 0;
		this.balloonText = "[[title]]: [[percents]]% ([[value]])\n[[description]]";
		this.dataProvider;
		this.urlTarget = "_self";
		this.previousScale = 1;
		this.autoMarginOffset = 10;
		this.gradientRatio = []
	},
	initChart: function() {
		AmCharts.AmPieChart.base.initChart.call(this);
		this.dataChanged && (this.parseData(), this.dispatchDataUpdated = !0, this.dataChanged = !1, this.legend && this.legend.setData(this.chartData));
		this.drawChart()
	},
	handleLegendEvent: function(a) {
		var b = a.type;
		if (a = a.dataItem) {
			var d = a.hidden;
			switch (b) {
			case "clickMarker":
				d || this.clickSlice(a);
				break;
			case "clickLabel":
				d || this.clickSlice(a);
				break;
			case "rollOverItem":
				d || this.rollOverSlice(a, !1);
				break;
			case "rollOutItem":
				d || this.rollOutSlice(a);
				break;
			case "hideItem":
				this.hideSlice(a);
				break;
			case "showItem":
				this.showSlice(a)
			}
		}
	},
	invalidateVisibility: function() {
		this.recalculatePercents();
		this.initChart();
		var a = this.legend;
		a && a.invalidateSize()
	},
	drawChart: function() {
		var a = this;
		AmCharts.AmPieChart.base.drawChart.call(a);
		var b = a.chartData;
		if (AmCharts.ifArray(b)) {
			if (0 < a.realWidth && 0 < a.realHeight) {
				AmCharts.VML && (a.startAlpha = 1);
				var d = a.startDuration,
					e = a.container,
					f = a.updateWidth();
				a.realWidth = f;
				var g = a.updateHeight();
				a.realHeight = g;
				var h = AmCharts.toCoordinate,
					j = h(a.marginLeft, f),
					k = h(a.marginRight, f),
					l = h(a.marginTop, g) + a.getTitleHeight(),
					m = h(a.marginBottom, g);
				a.chartDataLabels = [];
				a.ticks = [];
				var n, t, r, q = AmCharts.toNumber(a.labelRadius),
					p = a.measureMaxLabel();
				if (!a.labelText || !a.labelsEnabled) q = p = 0;
				n = void 0 == a.pieX ? (f - j - k) / 2 + j : h(a.pieX, a.realWidth);
				t = void 0 == a.pieY ? (g - l - m) / 2 + l : h(a.pieY, g);
				r = h(a.radius, f, g);
				a.pullOutRadiusReal = AmCharts.toCoordinate(a.pullOutRadius, r);
				r || (f = 0 <= q ? f - j - k - 2 * p : f - j - k, g = g - l - m, r = Math.min(f, g), g < f && (r /= 1 - a.angle / 90, r > f && (r = f)), a.pullOutRadiusReal = AmCharts.toCoordinate(a.pullOutRadius, r), r = 0 <= q ? r - 1.8 * (q + a.pullOutRadiusReal) : r - 1.8 * a.pullOutRadiusReal, r /= 2);
				r < a.minRadius && (r = a.minRadius);
				a.pullOutRadiusReal = h(a.pullOutRadius, r);
				h = h(a.innerRadius, r);
				h >= r && (h = r - 1);
				g = AmCharts.fitToBounds(a.startAngle, 0, 360);
				0 < a.depth3D && (g = 270 <= g ? 270 : 90);
				l = r - r * a.angle / 90;
				for (m = 0; m < b.length; m++) if (f = b[m], !0 != f.hidden && 0 < f.percents) {
					var s = 360 * -f.percents / 100,
						k = Math.cos((g + s / 2) / 180 * Math.PI),
						p = Math.sin((-g - s / 2) / 180 * Math.PI) * (l / r),
						j = {
							fill: f.color,
							stroke: a.outlineColor,
							"stroke-width": a.outlineThickness,
							"stroke-opacity": a.outlineAlpha
						};
					f.url && (j.cursor = "pointer");
					j = AmCharts.wedge(e, n, t, g, s, r, l, h, a.depth3D, j, a.gradientRatio);
					a.addEventListeners(j, f);
					f.startAngle = g;
					b[m].wedge = j;
					if (0 < d) {
						var u = a.startAlpha;
						a.chartCreated && (u = f.alpha);
						j.setAttr("opacity", u)
					}
					f.ix = k;
					f.iy = p;
					f.wedge = j;
					f.index = m;
					if (a.labelsEnabled && a.labelText && f.percents >= a.hideLabelsPercent) {
						s = g + s / 2;
						0 >= s && (s += 360);
						var k = n + k * (r + q),
							u = t + p * (r + q),
							v, p = 0;
						if (0 <= q) {
							var y;
							90 >= s && 0 <= s ? (y = 0, v = "start", p = 8) : 360 >= s && 270 < s ? (y = 1, v = "start", p = 8) : 270 >= s && 180 < s ? (y = 2, v = "end", p = -8) : 180 >= s && 90 < s && (y = 3, v = "end", p = -8);
							f.labelQuarter = y
						} else v = "middle";
						s = a.formatString(a.labelText, f);
						s = AmCharts.text(e, s, a.color, a.fontFamily, a.fontSize, v);
						s.translate(k + 1.5 * p, u);
						f.tx = k + 1.5 * p;
						f.ty = u;
						u = setTimeout(function() {
							a.showLabels.call(a)
						}, 1E3 * d);
						a.timeOuts.push(u);
						0 <= a.labelRadius ? j.push(s) : a.freeLabelsSet.push(s);
						f.label = s;
						a.chartDataLabels[m] = s;
						f.tx = k;
						f.tx2 = k + p
					}
					a.graphsSet.push(j);
					(0 == f.alpha || 0 < d && !a.chartCreated) && j.hide();
					g -= 360 * f.percents / 100;
					0 >= g && (g += 360)
				}
				0 < q && a.arrangeLabels();
				a.pieXReal = n;
				a.pieYReal = t;
				a.radiusReal = r;
				a.innerRadiusReal = h;
				0 < q && a.drawTicks();
				a = this;
				a.chartCreated ? a.pullSlices(!0) : (u = setTimeout(function() {
					a.pullSlices.call(a)
				}, 1200 * d), a.timeOuts.push(u));
				a.chartCreated || a.startSlices();
				a.setDepths()
			}
		} else a.cleanChart();
		a.dispDUpd();
		a.chartCreated = !0
	},
	setDepths: function() {
		for (var a = this.chartData, b = 0; b < a.length; b++) {
			var d = a[b],
				e = d.wedge,
				d = d.startAngle;
			90 >= d && 0 <= d || 360 >= d && 270 < d ? e.toFront() : (270 >= d && 180 < d || 180 >= d && 90 < d) && e.toBack()
		}
	},
	addEventListeners: function(a, b) {
		var d = this;
		a.mouseover(function() {
			d.rollOverSlice(b, !0)
		}).mouseout(function() {
			d.rollOutSlice(b)
		}).click(function() {
			d.clickSlice(b)
		})
	},
	formatString: function(a, b) {
		a = AmCharts.formatValue(a, b, ["value"], this.numberFormatter, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
		a = AmCharts.formatValue(a, b, ["percents"], this.percentFormatter);
		a = AmCharts.massReplace(a, {
			"[[title]]": b.title,
			"[[description]]": b.description,
			"<br>": "\n"
		});
		a = AmCharts.fixNewLines(a);
		return a = AmCharts.cleanFromEmpty(a)
	},
	drawTicks: function() {
		for (var a = this.chartData, b = 0; b < a.length; b++) if (this.chartDataLabels[b]) {
			var d = a[b],
				e = d.ty,
				f = this.radiusReal,
				e = AmCharts.line(this.container, [this.pieXReal + d.ix * f, d.tx, d.tx2], [this.pieYReal + d.iy * f, e, e], this.labelTickColor, this.labelTickAlpha);
			d.wedge.push(e);
			this.ticks[b] = e
		}
	},
	arrangeLabels: function() {
		for (var a = this.chartData, b = a.length, d, e = b - 1; 0 <= e; e--) d = a[e], 0 == d.labelQuarter && !d.hidden && this.checkOverlapping(e, d, 0, !0, 0);
		for (e = 0; e < b; e++) d = a[e], 1 == d.labelQuarter && !d.hidden && this.checkOverlapping(e, d, 1, !1, 0);
		for (e = b - 1; 0 <= e; e--) d = a[e], 2 == d.labelQuarter && !d.hidden && this.checkOverlapping(e, d, 2, !0, 0);
		for (e = 0; e < b; e++) d = a[e], 3 == d.labelQuarter && !d.hidden && this.checkOverlapping(e, d, 3, !1, 0)
	},
	checkOverlapping: function(a, b, d, e, f) {
		var g, h, j = this.chartData,
			k = j.length,
			l = b.label;
		if (l) {
			if (!0 == e) for (h = a + 1; h < k; h++)(g = this.checkOverlappingReal(b, j[h], d)) && (h = k);
			else for (h = a - 1; 0 <= h; h--)(g = this.checkOverlappingReal(b, j[h], d)) && (h = 0);
			!0 == g && 100 > f && (g = b.ty + 3 * b.iy, b.ty = g, l.translate(b.tx2, g), this.checkOverlapping(a, b, d, e, f + 1))
		}
	},
	checkOverlappingReal: function(a, b, d) {
		var e = !1,
			f = a.label,
			g = b.label;
		a.labelQuarter == d && (!a.hidden && !b.hidden && g) && (f = f.getBBox(), d = {}, d.width = f.width, d.height = f.height, d.y = a.ty, d.x = a.tx, a = g.getBBox(), g = {}, g.width = a.width, g.height = a.height, g.y = b.ty, g.x = b.tx, AmCharts.hitTest(d, g) && (e = !0));
		return e
	},
	startSlices: function() {
		for (var a = this, b = 500 * (a.startDuration / a.chartData.length), d = 0; d < a.chartData.length; d++) if (0 < a.startDuration && a.sequencedAnimation) {
			var e = setTimeout(function() {
				a.startSequenced.call(a)
			}, b * d);
			a.timeOuts.push(e)
		} else a.startSlice(a.chartData[d])
	},
	pullSlices: function(a) {
		for (var b = this.chartData, d = 0; d < b.length; d++) {
			var e = b[d];
			e.pulled && this.pullSlice(e, 1, a)
		}
	},
	startSequenced: function() {
		for (var a = this.chartData, b = 0; b < a.length; b++) if (!a[b].started) {
			this.startSlice(this.chartData[b]);
			break
		}
	},
	startSlice: function(a) {
		a.started = !0;
		var b = a.wedge,
			d = this.startDuration;
		if (b && 0 < d) {
			0 < a.alpha && b.show();
			var e = AmCharts.toCoordinate(this.startRadius, this.radiusReal);
			b.translate(Math.round(a.ix * e), Math.round(a.iy * e));
			b.animate({
				opacity: a.alpha,
				translate: "0,0"
			}, d, this.startEffect)
		}
	},
	showLabels: function() {
		for (var a = this.chartData, b = 0; b < a.length; b++) if (0 < a[b].alpha) {
			var d = this.chartDataLabels[b];
			d && d.show();
			(d = this.ticks[b]) && d.show()
		}
	},
	showSlice: function(a) {
		isNaN(a) ? a.hidden = !1 : this.chartData[a].hidden = !1;
		this.hideBalloon();
		this.invalidateVisibility()
	},
	hideSlice: function(a) {
		isNaN(a) ? a.hidden = !0 : this.chartData[a].hidden = !0;
		this.hideBalloon();
		this.invalidateVisibility()
	},
	rollOverSlice: function(a, b) {
		isNaN(a) || (a = this.chartData[a]);
		clearTimeout(this.hoverInt);
		this.pullOnHover && this.pullSlice(a, 1);
		var d = this.innerRadiusReal + (this.radiusReal - this.innerRadiusReal) / 2;
		a.pulled && (d += this.pullOutRadiusReal);
		1 > this.hoverAlpha && a.wedge && a.wedge.attr({
			opacity: this.hoverAlpha
		});
		var e;
		e = a.ix * d + this.pieXReal;
		var d = a.iy * d + this.pieYReal,
			f = this.formatString(this.balloonText, a),
			g = AmCharts.adjustLuminosity(a.color, -0.15);
		this.showBalloon(f, g, b, e, d);
		e = {
			type: "rollOverSlice",
			dataItem: a,
			chart: this
		};
		this.fire(e.type, e)
	},
	rollOutSlice: function(a) {
		isNaN(a) || (a = this.chartData[a]);
		a.wedge && a.wedge.attr({
			opacity: a.alpha
		});
		this.hideBalloon();
		a = {
			type: "rollOutSlice",
			dataItem: a,
			chart: this
		};
		this.fire(a.type, a)
	},
	clickSlice: function(a) {
		isNaN(a) || (a = this.chartData[a]);
		this.hideBalloon();
		a.pulled ? this.pullSlice(a, 0) : this.pullSlice(a, 1);
		AmCharts.getURL(a.url, this.urlTarget);
		a = {
			type: "clickSlice",
			dataItem: a,
			chart: this
		};
		this.fire(a.type, a)
	},
	pullSlice: function(a, b, d) {
		var e = a.ix,
			f = a.iy,
			g = this.pullOutDuration;
		!0 === d && (g = 0);
		d = a.wedge;
		var h = this.pullOutRadiusReal;
		d && d.animate({
			translate: b * e * h + "," + b * f * h
		}, g, this.pullOutEffect);
		1 == b ? (a.pulled = !0, this.pullOutOnlyOne && this.pullInAll(a.index), a = {
			type: "pullOutSlice",
			dataItem: a,
			chart: this
		}) : (a.pulled = !1, a = {
			type: "pullInSlice",
			dataItem: a,
			chart: this
		});
		this.fire(a.type, a)
	},
	pullInAll: function(a) {
		for (var b = this.chartData, d = 0; d < this.chartData.length; d++) d != a && b[d].pulled && this.pullSlice(b[d], 0)
	},
	pullOutAll: function() {
		for (var a = this.chartData, b = 0; b < a.length; b++) a[b].pulled || this.pullSlice(a[b], 1)
	},
	parseData: function() {
		var a = [];
		this.chartData = a;
		var b = this.dataProvider;
		if (void 0 != b) {
			for (var d = b.length, e = 0, f = 0; f < d; f++) {
				var g = {},
					h = b[f];
				g.dataContext = h;
				g.value = Number(h[this.valueField]);
				var j = h[this.titleField];
				j || (j = "");
				g.title = j;
				g.pulled = AmCharts.toBoolean(h[this.pulledField], !1);
				(j = h[this.descriptionField]) || (j = "");
				g.description = j;
				g.url = h[this.urlField];
				g.visibleInLegend = AmCharts.toBoolean(h[this.visibleInLegendField], !0);
				j = h[this.alphaField];
				g.alpha = void 0 != j ? Number(j) : this.pieAlpha;
				h = h[this.colorField];
				void 0 != h && (g.color = AmCharts.toColor(h));
				e += g.value;
				g.hidden = !1;
				a[f] = g
			}
			for (f = b = 0; f < d; f++) g = a[f], g.percents = 100 * (g.value / e), g.percents < this.groupPercent && b++;
			1 < b && (this.groupValue = 0, this.removeSmallSlices(), a.push({
				title: this.groupedTitle,
				value: this.groupValue,
				percents: 100 * (this.groupValue / e),
				pulled: this.groupedPulled,
				color: this.groupedColor,
				url: this.groupedUrl,
				description: this.groupedDescription,
				alpha: this.groupedAlpha
			}));
			for (f = 0; f < a.length; f++) this.pieBaseColor ? h = AmCharts.adjustLuminosity(this.pieBaseColor, f * this.pieBrightnessStep / 100) : (h = this.colors[f], void 0 == h && (h = AmCharts.randomColor())), void 0 == a[f].color && (a[f].color = h);
			this.recalculatePercents()
		}
	},
	recalculatePercents: function() {
		for (var a = this.chartData, b = 0, d = 0; d < a.length; d++) {
			var e = a[d];
			!e.hidden && 0 < e.value && (b += e.value)
		}
		for (d = 0; d < a.length; d++) e = this.chartData[d], e.percents = !e.hidden && 0 < e.value ? 100 * e.value / b : 0
	},
	removeSmallSlices: function() {
		for (var a = this.chartData, b = a.length - 1; 0 <= b; b--) a[b].percents < this.groupPercent && (this.groupValue += a[b].value, a.splice(b, 1))
	},
	animateAgain: function() {
		var a = this;
		a.startSlices();
		var b = setTimeout(function() {
			a.pullSlices.call(a)
		}, 1200 * a.startDuration);
		a.timeOuts.push(b)
	},
	measureMaxLabel: function() {
		for (var a = this.chartData, b = 0, d = 0; d < a.length; d++) {
			var e = this.formatString(this.labelText, a[d]),
				e = AmCharts.text(this.container, e, this.color, this.fontFamily, this.fontSize),
				f = e.getBBox().width;
			f > b && (b = f);
			e.remove()
		}
		return b
	}
});
AmCharts.AmXYChart = AmCharts.Class({
	inherits: AmCharts.AmRectangularChart,
	construct: function() {
		AmCharts.AmXYChart.base.construct.call(this);
		this.createEvents("zoomed");
		this.xAxes;
		this.yAxes;
		this.scrollbarV;
		this.scrollbarH;
		this.maxZoomFactor = 20;
		this.chartType = "xy";
		this.hideXScrollbar;
		this.hideYScrollbar
	},
	initChart: function() {
		AmCharts.AmXYChart.base.initChart.call(this);
		this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);
		this.updateScrollbar = !0;
		this.drawChart();
		this.autoMargins && !this.marginsUpdated && (this.marginsUpdated = !0, this.measureMargins());
		var a = this.marginLeftReal,
			b = this.marginTopReal,
			d = this.plotAreaWidth,
			e = this.plotAreaHeight;
		this.graphsSet.clipRect(a, b, d, e);
		this.bulletSet.clipRect(a, b, d, e);
		this.trendLinesSet.clipRect(a, b, d, e)
	},
	createValueAxes: function() {
		var a = [],
			b = [];
		this.xAxes = a;
		this.yAxes = b;
		for (var d = this.valueAxes, e = 0; e < d.length; e++) {
			var f = d[e],
				g = f.position;
			if ("top" == g || "bottom" == g) f.rotate = !0;
			f.setOrientation(f.rotate);
			g = f.orientation;
			"V" == g && b.push(f);
			"H" == g && a.push(f)
		}
		0 == b.length && (f = new AmCharts.ValueAxis, f.rotate = !1, f.setOrientation(!1), d.push(f), b.push(f));
		0 == a.length && (f = new AmCharts.ValueAxis, f.rotate = !0, f.setOrientation(!0), d.push(f), a.push(f));
		for (e = 0; e < d.length; e++) this.processValueAxis(d[e], e);
		a = this.graphs;
		for (e = 0; e < a.length; e++) this.processGraph(a[e], e)
	},
	drawChart: function() {
		AmCharts.AmXYChart.base.drawChart.call(this);
		AmCharts.ifArray(this.chartData) ? (this.chartScrollbar && this.updateScrollbars(), this.zoomChart()) : this.cleanChart();
		if (this.hideXScrollbar) {
			var a = this.scrollbarH;
			a && (this.removeListener(a, "zoomed", this.handleHSBZoom), a.destroy());
			this.scrollbarH = null
		}
		if (this.hideYScrollbar) {
			if (a = this.scrollbarV) this.removeListener(a, "zoomed", this.handleVSBZoom), a.destroy();
			this.scrollbarV = null
		}
		this.dispDUpd();
		this.chartCreated = !0;
		this.zoomScrollbars()
	},
	cleanChart: function() {
		AmCharts.callMethod("destroy", [this.valueAxes, this.graphs, this.scrollbarV, this.scrollbarH, this.chartCursor])
	},
	zoomChart: function() {
		this.toggleZoomOutButton();
		this.zoomObjects(this.valueAxes);
		this.zoomObjects(this.graphs);
		this.zoomTrendLines();
		this.dispatchAxisZoom()
	},
	toggleZoomOutButton: function() {
		1 == this.heightMultiplier && 1 == this.widthMultiplier ? this.showZB(!1) : this.showZB(!0)
	},
	dispatchAxisZoom: function() {
		for (var a = this.valueAxes, b = 0; b < a.length; b++) {
			var d = a[b];
			if (!isNaN(d.min) && !isNaN(d.max)) {
				var e, f;
				"V" == d.orientation ? (e = d.coordinateToValue(-this.verticalPosition), f = d.coordinateToValue(-this.verticalPosition + this.plotAreaHeight)) : (e = d.coordinateToValue(-this.horizontalPosition), f = d.coordinateToValue(-this.horizontalPosition + this.plotAreaWidth));
				if (!isNaN(e) && !isNaN(f)) {
					if (e > f) {
						var g = f;
						f = e;
						e = g
					}
					d.dispatchZoomEvent(e, f)
				}
			}
		}
	},
	zoomObjects: function(a) {
		for (var b = a.length, d = 0; d < b; d++) {
			var e = a[d];
			this.updateObjectSize(e);
			e.zoom(0, this.chartData.length - 1)
		}
	},
	updateData: function() {
		this.parseData();
		for (var a = this.chartData, b = a.length - 1, d = this.graphs, e = this.dataProvider, f = 0, g = 0; g < d.length; g++) {
			var h = d[g];
			h.data = a;
			h.zoom(0, b);
			if (h = h.valueField) for (var j = 0; j < e.length; j++) {
				var k = e[j][h];
				k > f && (f = k)
			}
		}
		for (g = 0; g < d.length; g++) h = d[g], h.maxValue = f;
		if (a = this.chartCursor) a.updateData(), a.type = "crosshair", a.valueBalloonsEnabled = !1
	},
	zoomOut: function() {
		this.verticalPosition = this.horizontalPosition = 0;
		this.heightMultiplier = this.widthMultiplier = 1;
		this.zoomChart();
		this.zoomScrollbars()
	},
	processValueAxis: function(a) {
		a.chart = this;
		a.minMaxField = "H" == a.orientation ? "x" : "y";
		a.minTemp = NaN;
		a.maxTemp = NaN;
		this.listenTo(a, "axisSelfZoomed", this.handleAxisSelfZoom)
	},
	processGraph: function(a) {
		a.xAxis || (a.xAxis = this.xAxes[0]);
		a.yAxis || (a.yAxis = this.yAxes[0])
	},
	parseData: function() {
		AmCharts.AmXYChart.base.parseData.call(this);
		this.chartData = [];
		for (var a = this.dataProvider, b = this.valueAxes, d = this.graphs, e = 0; e < a.length; e++) {
			for (var f = {
				axes: {},
				x: {},
				y: {}
			}, g = a[e], h = 0; h < b.length; h++) {
				var j = b[h].id;
				f.axes[j] = {};
				f.axes[j].graphs = {};
				for (var k = 0; k < d.length; k++) {
					var l = d[k],
						m = l.id;
					if (l.xAxis.id == j || l.yAxis.id == j) {
						var n = {};
						n.serialDataItem = f;
						n.index = e;
						var t = {},
							r = Number(g[l.valueField]);
						isNaN(r) || (t.value = r);
						r = Number(g[l.xField]);
						isNaN(r) || (t.x = r);
						r = Number(g[l.yField]);
						isNaN(r) || (t.y = r);
						n.values = t;
						this.processFields(l, n, g);
						n.serialDataItem = f;
						n.graph = l;
						f.axes[j].graphs[m] = n
					}
				}
			}
			this.chartData[e] = f
		}
	},
	formatString: function(a, b) {
		var d = b.graph.numberFormatter;
		d || (d = this.numberFormatter);
		a = AmCharts.formatValue(a, b.values, ["value", "x", "y"], d); - 1 != a.indexOf("[[") && (a = AmCharts.formatDataContextValue(a, b.dataContext));
		return a = AmCharts.AmSerialChart.base.formatString.call(this, a, b)
	},
	addChartScrollbar: function(a) {
		AmCharts.callMethod("destroy", [this.chartScrollbar, this.scrollbarH, this.scrollbarV]);
		if (a) {
			this.chartScrollbar = a;
			this.scrollbarHeight = a.scrollbarHeight;
			var b = "backgroundColor backgroundAlpha selectedBackgroundColor selectedBackgroundAlpha scrollDuration resizeEnabled hideResizeGrips scrollbarHeight updateOnReleaseOnly".split(" ");
			if (!this.hideYScrollbar) {
				var d = new AmCharts.SimpleChartScrollbar;
				d.skipEvent = !0;
				d.chart = this;
				this.listenTo(d, "zoomed", this.handleVSBZoom);
				AmCharts.copyProperties(a, d, b);
				d.rotate = !0;
				this.scrollbarV = d
			}
			this.hideXScrollbar || (d = new AmCharts.SimpleChartScrollbar, d.skipEvent = !0, d.chart = this, this.listenTo(d, "zoomed", this.handleHSBZoom), AmCharts.copyProperties(a, d, b), d.rotate = !1, this.scrollbarH = d)
		}
	},
	updateTrendLines: function() {
		for (var a = this.trendLines, b = 0; b < a.length; b++) {
			var d = a[b];
			d.chart = this;
			d.valueAxis || (d.valueAxis = this.yAxes[0]);
			d.valueAxisX || (d.valueAxisX = this.xAxes[0])
		}
	},
	updateMargins: function() {
		AmCharts.AmXYChart.base.updateMargins.call(this);
		var a = this.scrollbarV;
		a && (this.getScrollbarPosition(a, !0, this.yAxes[0].position), this.adjustMargins(a, !0));
		if (a = this.scrollbarH) this.getScrollbarPosition(a, !1, this.xAxes[0].position), this.adjustMargins(a, !1)
	},
	updateScrollbars: function() {
		var a = this.scrollbarV;
		a && (this.updateChartScrollbar(a, !0), a.draw());
		if (a = this.scrollbarH) this.updateChartScrollbar(a, !1), a.draw()
	},
	zoomScrollbars: function() {
		var a = this.scrollbarH;
		a && a.relativeZoom(this.widthMultiplier, -this.horizontalPosition / this.widthMultiplier);
		(a = this.scrollbarV) && a.relativeZoom(this.heightMultiplier, -this.verticalPosition / this.heightMultiplier)
	},
	fitMultiplier: function(a) {
		a > this.maxZoomFactor && (a = this.maxZoomFactor);
		return a
	},
	handleHSBZoom: function(a) {
		var b = this.fitMultiplier(a.multiplier);
		a = -a.position * b;
		var d = -(this.plotAreaWidth * b - this.plotAreaWidth);
		a < d && (a = d);
		this.widthMultiplier = b;
		this.horizontalPosition = a;
		this.zoomChart()
	},
	handleVSBZoom: function(a) {
		var b = this.fitMultiplier(a.multiplier);
		a = -a.position * b;
		var d = -(this.plotAreaHeight * b - this.plotAreaHeight);
		a < d && (a = d);
		this.heightMultiplier = b;
		this.verticalPosition = a;
		this.zoomChart()
	},
	handleCursorZoom: function(a) {
		var b = this.widthMultiplier * this.plotAreaWidth / a.selectionWidth,
			d = this.heightMultiplier * this.plotAreaHeight / a.selectionHeight,
			b = this.fitMultiplier(b),
			d = this.fitMultiplier(d);
		this.horizontalPosition = (this.horizontalPosition - a.selectionX) * b / this.widthMultiplier;
		this.verticalPosition = (this.verticalPosition - a.selectionY) * d / this.heightMultiplier;
		this.widthMultiplier = b;
		this.heightMultiplier = d;
		this.zoomChart();
		this.zoomScrollbars()
	},
	handleAxisSelfZoom: function(a) {
		if ("H" == a.valueAxis.orientation) {
			var b = this.fitMultiplier(a.multiplier);
			a = -a.position / this.widthMultiplier * b;
			var d = -(this.plotAreaWidth * b - this.plotAreaWidth);
			a < d && (a = d);
			this.horizontalPosition = a;
			this.widthMultiplier = b
		} else b = this.fitMultiplier(a.multiplier), a = -a.position / this.heightMultiplier * b, d = -(this.plotAreaHeight * b - this.plotAreaHeight), a < d && (a = d), this.verticalPosition = a, this.heightMultiplier = b;
		this.zoomChart();
		this.zoomScrollbars()
	},
	removeChartScrollbar: function() {
		AmCharts.callMethod("destroy", [this.scrollbarH, this.scrollbarV]);
		this.scrollbarV = this.scrollbarH = null
	},
	handleReleaseOutside: function(a) {
		AmCharts.AmXYChart.base.handleReleaseOutside.call(this, a);
		AmCharts.callMethod("handleReleaseOutside", [this.scrollbarH, this.scrollbarV])
	}
});
AmCharts.AmStockChart = AmCharts.Class({
	construct: function() {
		this.version = "2.8.3";
		this.createEvents("zoomed", "rollOverStockEvent", "rollOutStockEvent", "clickStockEvent", "panelRemoved", "dataUpdated");
		this.colors = "#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");
		this.firstDayOfWeek = 1;
		this.glueToTheEnd = !1;
		this.dataSetCounter = -1;
		this.zoomOutOnDataSetChange = !1;
		this.panels = [];
		this.dataSets = [];
		this.chartCursors = [];
		this.comparedDataSets = [];
		this.categoryAxesSettings = new AmCharts.CategoryAxesSettings;
		this.valueAxesSettings = new AmCharts.ValueAxesSettings;
		this.panelsSettings = new AmCharts.PanelsSettings;
		this.chartScrollbarSettings = new AmCharts.ChartScrollbarSettings;
		this.chartCursorSettings = new AmCharts.ChartCursorSettings;
		this.stockEventsSettings = new AmCharts.StockEventsSettings;
		this.legendSettings = new AmCharts.LegendSettings;
		this.balloon = new AmCharts.AmBalloon;
		this.previousEndDate = new Date(0);
		this.previousStartDate = new Date(0);
		this.dataSetCount = this.graphCount = 0
	},
	write: function(a) {
		a = "object" != typeof a ? document.getElementById(a) : a;
		a.innerHTML = "";
		this.div = a;
		this.measure();
		this.createLayout();
		this.updateDataSets();
		this.addDataSetSelector();
		this.addPeriodSelector();
		this.addPanels();
		this.addChartScrollbar();
		this.updatePanels();
		this.updateData();
		this.skipDefault || this.setDefaultPeriod()
	},
	setDefaultPeriod: function(a) {
		var b = this.periodSelector;
		b && (this.animationPlayed = !1, b.setDefaultPeriod(a))
	},
	updateDataSets: function() {
		var a = this.dataSets;
		!this.mainDataSet && AmCharts.ifArray(a) && (this.mainDataSet = this.dataSets[0]);
		for (var b = 0; b < a.length; b++) {
			var d = a[b];
			d.id || (this.dataSetCount++, d.id = "ds" + this.dataSetCount);
			void 0 == d.color && (d.color = this.colors.length - 1 > b ? this.colors[b] : AmCharts.randomColor())
		}
	},
	updateEvents: function() {
		var a = this.mainDataSet;
		AmCharts.ifArray(a.stockEvents) && AmCharts.parseEvents(a, this.panels, this.stockEventsSettings, this.firstDayOfWeek, this)
	},
	updateData: function() {
		var a = this.mainDataSet;
		if (a) {
			var b = this.categoryAxesSettings; - 1 == AmCharts.getItemIndex(b.minPeriod, b.groupToPeriods) && b.groupToPeriods.unshift(b.minPeriod);
			var d = a.dataProvider;
			if (AmCharts.ifArray(d)) {
				var e = a.categoryField;
				this.firstDate = new Date(d[0][e]);
				this.lastDate = new Date(d[d.length - 1][e]);
				this.periodSelector && this.periodSelector.setRanges(this.firstDate, this.lastDate);
				a.dataParsed || (AmCharts.parseStockData(a, b.minPeriod, b.groupToPeriods, this.firstDayOfWeek), a.dataParsed = !0);
				this.updateComparingData();
				this.updateEvents()
			} else this.lastDate = this.firstDate = void 0;
			this.glueToTheEnd && (this.startDate && this.endDate && this.lastDate) && (AmCharts.getPeriodDuration(b.minPeriod), this.startDate = new Date(this.startDate.getTime() + (this.lastDate.getTime() - this.endDate.getTime())), this.endDate = this.lastDate, this.updateScrollbar = !0);
			this.updatePanelsWithNewData()
		}
		a = {
			type: "dataUpdated",
			chart: this
		};
		this.fire(a.type, a)
	},
	updateComparingData: function() {
		for (var a = this.comparedDataSets, b = this.categoryAxesSettings, d = 0; d < a.length; d++) {
			var e = a[d];
			e.dataParsed || (AmCharts.parseStockData(e, b.minPeriod, b.groupToPeriods, this.firstDayOfWeek), e.dataParsed = !0)
		}
	},
	createLayout: function() {
		var a = this.div,
			b, d, e = this.periodSelector;
		e && (b = e.position);
		if (e = this.dataSetSelector) d = e.position;
		if ("left" == b || "left" == d) e = document.createElement("div"), e.style.cssFloat = "left", e.style.styleFloat = "left", e.style.width = "0px", e.style.position = "absolute", a.appendChild(e), this.leftContainer = e;
		if ("right" == b || "right" == d) b = document.createElement("div"), b.style.cssFloat = "right", b.style.styleFloat = "right", b.style.width = "0px", a.appendChild(b), this.rightContainer = b;
		b = document.createElement("div");
		a.appendChild(b);
		this.centerContainer = b;
		a = document.createElement("div");
		b.appendChild(a);
		this.panelsContainer = a
	},
	addPanels: function() {
		var a = this.chartScrollbarSettings,
			b = this.divRealHeight,
			d = this.panelsSettings.panelSpacing;
		a.enabled && (b -= a.height);
		if ((a = this.periodSelector) && !a.vertical) a = a.offsetHeight, b -= a + d;
		if ((a = this.dataSetSelector) && !a.vertical) a = a.offsetHeight, b -= a + d;
		a = this.panels;
		this.panelsContainer.style.height = b + "px";
		this.chartCursors = [];
		for (var e = 0, f = 0; f < a.length; f++) {
			var g = a[f],
				h = g.percentHeight;
			isNaN(h) && (h = 100 / a.length, g.percentHeight = h);
			e += h
		}
		for (f = 0; f < a.length; f++) g = a[f], g.percentHeight = 100 * (g.percentHeight / e);
		this.panelsHeight = b - d * (a.length - 1);
		for (f = 0; f < a.length; f++) this.addStockPanel(a[f], f);
		this.panelsAdded = !0
	},
	addStockPanel: function(a, b) {
		var d = this.panelsSettings,
			e = document.createElement("div");
		0 < b && !this.panels[b - 1].showCategoryAxis && (e.style.marginTop = d.panelSpacing + "px");
		a.panelBox = e;
		a.stockChart = this;
		a.id || (a.id = "stockPanel" + b);
		a.pathToImages = this.pathToImages;
		e.style.height = Math.round(a.percentHeight * this.panelsHeight / 100) + "px";
		e.style.width = "100%";
		this.panelsContainer.appendChild(e);
		0 < d.backgroundAlpha && (e.style.backgroundColor = d.backgroundColor);
		if (e = a.stockLegend) e.container = void 0, e.title = a.title, e.marginLeft = d.marginLeft, e.marginRight = d.marginRight, e.verticalGap = 3, e.position = "top", AmCharts.copyProperties(this.legendSettings, e), a.addLegend(e);
		a.zoomOutText = "";
		a.removeChartCursor();
		this.addCursor(a)
	},
	enableCursors: function(a) {
		for (var b = this.chartCursors, d = 0; d < b.length; d++) b[d].enabled = a
	},
	updatePanels: function() {
		for (var a = this.panels, b = 0; b < a.length; b++) this.updatePanel(a[b]);
		this.mainDataSet && this.updateGraphs();
		this.currentPeriod = void 0
	},
	updatePanel: function(a) {
		a.seriesIdField = "amCategoryIdField";
		a.dataProvider = [];
		a.chartData = [];
		a.graphs = [];
		var b = a.categoryAxis,
			d = this.categoryAxesSettings;
		AmCharts.copyProperties(this.panelsSettings, a);
		AmCharts.copyProperties(d, b);
		b.parseDates = !0;
		a.zoomOutOnDataUpdate = !1;
		a.showCategoryAxis ? "top" == b.position ? a.marginTop = d.axisHeight : a.marginBottom = d.axisHeight : (a.categoryAxis.labelsEnabled = !1, a.chartCursor && (a.chartCursor.categoryBalloonEnabled = !1));
		var d = a.valueAxes,
			e = d.length,
			f;
		0 == e && (f = new AmCharts.ValueAxis, a.addValueAxis(f));
		b = new AmCharts.AmBalloon;
		AmCharts.copyProperties(this.balloon, b);
		a.balloon = b;
		d = a.valueAxes;
		e = d.length;
		for (b = 0; b < e; b++) f = d[b], AmCharts.copyProperties(this.valueAxesSettings, f);
		a.listenersAdded = !1;
		a.write(a.panelBox)
	},
	zoom: function(a, b) {
		this.zoomChart(a, b)
	},
	zoomOut: function() {
		this.zoomChart(this.firstDate, this.lastDate)
	},
	updatePanelsWithNewData: function() {
		var a = this.mainDataSet;
		if (a) {
			var b = this.panels;
			this.currentPeriod = void 0;
			for (var d = 0; d < b.length; d++) {
				var e = b[d];
				e.categoryField = a.categoryField;
				0 == a.dataProvider.length && (e.dataProvider = [])
			}
			if (b = this.scrollbarChart) {
				d = this.categoryAxesSettings;
				e = d.minPeriod;
				b.categoryField = a.categoryField;
				b.dataProvider = 0 < a.dataProvider.length ? a.agregatedDataProviders[e] : [];
				var f = b.categoryAxis;
				f.minPeriod = e;
				f.firstDayOfWeek = this.firstDayOfWeek;
				f.equalSpacing = d.equalSpacing;
				b.validateData()
			}
			0 < a.dataProvider.length && this.zoomChart(this.startDate, this.endDate)
		}
		this.panelDataInvalidated = !1
	},
	addChartScrollbar: function() {
		var a = this.chartScrollbarSettings,
			b = this.scrollbarChart;
		b && (b.clear(), b.destroy());
		if (a.enabled) {
			var d = this.panelsSettings,
				e = this.categoryAxesSettings,
				b = new AmCharts.AmSerialChart;
			b.pathToImages = this.pathToImages;
			b.autoMargins = !1;
			this.scrollbarChart = b;
			b.id = "scrollbarChart";
			b.scrollbarOnly = !0;
			b.zoomOutText = "";
			b.panEventsEnabled = this.panelsSettings.panEventsEnabled;
			b.marginLeft = d.marginLeft;
			b.marginRight = d.marginRight;
			b.marginTop = 0;
			b.marginBottom = 0;
			var d = e.dateFormats,
				f = b.categoryAxis;
			f.boldPeriodBeginning = e.boldPeriodBeginning;
			d && (f.dateFormats = e.dateFormats);
			f.labelsEnabled = !1;
			f.parseDates = !0;
			if (e = a.graph) {
				var g = new AmCharts.AmGraph;
				g.valueField = e.valueField;
				g.periodValue = e.periodValue;
				g.type = e.type;
				g.connect = e.connect;
				b.addGraph(g)
			}
			e = new AmCharts.ChartScrollbar;
			b.addChartScrollbar(e);
			AmCharts.copyProperties(a, e);
			e.scrollbarHeight = a.height;
			e.graph = g;
			this.removeListener(e, "zoomed", this.handleScrollbarZoom);
			this.listenTo(e, "zoomed", this.handleScrollbarZoom);
			g = document.createElement("div");
			g.style.height = a.height + "px";
			a = this.periodSelectorContainer;
			(e = this.periodSelector) ? "bottom" == e.position ? this.centerContainer.insertBefore(g, a) : this.centerContainer.appendChild(g) : this.centerContainer.appendChild(g);
			b.write(g)
		}
	},
	handleScrollbarZoom: function(a) {
		if (this.skipScrollbarEvent) this.skipScrollbarEvent = !1;
		else {
			var b = a.endDate,
				d = {};
			d.startDate = a.startDate;
			d.endDate = b;
			this.updateScrollbar = !1;
			this.handleZoom(d)
		}
	},
	addPeriodSelector: function() {
		var a = this.periodSelector;
		if (a) {
			var b = this.categoryAxesSettings.minPeriod;
			a.minDuration = AmCharts.getPeriodDuration(b);
			a.minPeriod = b;
			a.chart = this;
			if (b = this.dataSetSelector) var d = b.position,
				e = this.dssContainer;
			var b = this.panelsSettings.panelSpacing,
				f = document.createElement("div");
			this.periodSelectorContainer = f;
			var g = this.leftContainer,
				h = this.rightContainer,
				j = this.centerContainer,
				k = this.panelsContainer,
				l = a.width + 2 * b + "px";
			switch (a.position) {
			case "left":
				g.style.width = a.width + "px";
				g.appendChild(f);
				j.style.paddingLeft = l;
				break;
			case "right":
				j.style.marginRight = l;
				h.appendChild(f);
				h.style.width = a.width + "px";
				break;
			case "top":
				k.style.clear = "both";
				"top" == d ? j.insertAfter(f, e) : j.insertBefore(f, k);
				f.style.paddingBottom = b + "px";
				break;
			case "bottom":
				f.style.marginTop = b + "px", "bottom" == d ? j.insertBefore(f, e) : j.appendChild(f)
			}
			this.removeListener(a, "changed", this.handlePeriodSelectorZoom);
			this.listenTo(a, "changed", this.handlePeriodSelectorZoom);
			a.write(f)
		}
	},
	addDataSetSelector: function() {
		var a = this.dataSetSelector;
		if (a) {
			a.chart = this;
			a.dataProvider = this.dataSets;
			var b = a.position,
				d = this.panelsSettings.panelSpacing,
				e = document.createElement("div");
			this.dssContainer = e;
			var f = this.leftContainer,
				g = this.rightContainer,
				h = this.centerContainer,
				j = this.panelsContainer,
				d = a.width + 2 * d + "px";
			switch (b) {
			case "left":
				f.style.width = a.width + "px";
				f.appendChild(e);
				h.style.paddingLeft = d;
				break;
			case "right":
				h.style.marginRight = d;
				g.appendChild(e);
				g.style.width = a.width + "px";
				break;
			case "top":
				j.style.clear = "both";
				h.insertBefore(e, j);
				break;
			case "bottom":
				h.appendChild(e)
			}
			a.write(e)
		}
	},
	handlePeriodSelectorZoom: function(a) {
		var b = this.scrollbarChart;
		b && (b.updateScrollbar = !0);
		a.predefinedPeriod ? (this.predefinedStart = a.startDate, this.predefinedEnd = a.endDate) : this.predefinedEnd = this.predefinedStart = null;
		this.zoomChart(a.startDate, a.endDate)
	},
	addCursor: function(a) {
		var b = this.chartCursorSettings;
		if (b.enabled) {
			var d = new AmCharts.ChartCursor;
			AmCharts.copyProperties(b, d);
			a.removeChartCursor();
			a.addChartCursor(d);
			this.removeListener(d, "changed", this.handleCursorChange);
			this.removeListener(d, "onHideCursor", this.hideChartCursor);
			this.removeListener(d, "zoomed", this.handleCursorZoom);
			this.listenTo(d, "changed", this.handleCursorChange);
			this.listenTo(d, "onHideCursor", this.hideChartCursor);
			this.listenTo(d, "zoomed", this.handleCursorZoom);
			this.chartCursors.push(d)
		}
	},
	hideChartCursor: function() {
		for (var a = this.chartCursors, b = 0; b < a.length; b++) {
			var d = a[b];
			d.hideCursor(!1);
			(d = d.chart) && d.updateLegendValues()
		}
	},
	handleCursorZoom: function(a) {
		var b = this.scrollbarChart;
		b && (b.updateScrollbar = !0);
		var b = {},
			d;
		if (this.categoryAxesSettings.equalSpacing) {
			var e = this.mainDataSet.categoryField,
				f = this.mainDataSet.agregatedDataProviders[this.currentPeriod];
			d = new Date(f[a.start][e]);
			a = new Date(f[a.end][e])
		} else d = new Date(a.start), a = new Date(a.end);
		b.startDate = d;
		b.endDate = a;
		this.handleZoom(b)
	},
	handleZoom: function(a) {
		this.zoomChart(a.startDate, a.endDate)
	},
	zoomChart: function(a, b) {
		var d = this,
			e = d.firstDate,
			f = d.lastDate,
			g = d.currentPeriod,
			h = d.categoryAxesSettings,
			j = h.minPeriod,
			k = d.panelsSettings,
			l = d.periodSelector,
			m = d.panels,
			n = d.comparedGraphs,
			t = d.scrollbarChart,
			r = d.firstDayOfWeek;
		if (e && f) {
			a || (a = e);
			b || (b = f);
			if (g) {
				var q = AmCharts.extractPeriod(g);
				a.getTime() == b.getTime() && q != j && (b = AmCharts.changeDate(b, q.period, q.count))
			}
			a.getTime() < e.getTime() && (a = e);
			a.getTime() > f.getTime() && (a = f);
			b.getTime() < e.getTime() && (b = e);
			b.getTime() > f.getTime() && (b = f);
			h = AmCharts.getItemIndex(j, h.groupToPeriods);
			f = g;
			g = d.choosePeriod(h, a, b);
			d.currentPeriod = g;
			h = AmCharts.extractPeriod(g);
			AmCharts.getPeriodDuration(h.period, h.count);
			j = AmCharts.getPeriodDuration(j);
			b.getTime() - a.getTime() < j && (a = new Date(b.getTime() - j));
			j = new Date(a);
			j.getTime() == e.getTime() && (j = AmCharts.resetDateToMin(a, h.period, h.count, r));
			for (e = 0; e < m.length; e++) {
				q = m[e];
				if (g != f) {
					for (var p = 0; p < n.length; p++) {
						var s = n[p].graph;
						s.dataProvider = s.dataSet.agregatedDataProviders[g]
					}
					p = q.categoryAxis;
					p.firstDayOfWeek = r;
					p.minPeriod = g;
					q.dataProvider = d.mainDataSet.agregatedDataProviders[g];
					if (p = q.chartCursor) p.categoryBalloonDateFormat = d.chartCursorSettings.categoryBalloonDateFormat(h.period), q.showCategoryAxis || (p.categoryBalloonEnabled = !1);
					q.startTime = j.getTime();
					q.endTime = b.getTime();
					q.validateData(!0)
				}
				p = !1;
				q.chartCursor && q.chartCursor.panning && (p = !0);
				p || (q.startTime = void 0, q.endTime = void 0, q.zoomToDates(j, b));
				0 < k.startDuration && d.animationPlayed ? q.startDuration = 0 : 0 < k.startDuration && (q.animateAgain(), q.validateNow(), d.animationPlayed = !0)
			}
			AmCharts.extractPeriod(g);
			k = new Date(b);
			t && d.updateScrollbar && (t.zoomToDates(a, k), d.skipScrollbarEvent = !0, setTimeout(function() {
				d.resetSkip.call(d)
			}, 100));
			d.updateScrollbar = !0;
			d.startDate = a;
			d.endDate = b;
			l && l.zoom(a, b);
			if (a.getTime() != d.previousStartDate.getTime() || b.getTime() != d.previousEndDate.getTime()) l = {
				type: "zoomed"
			}, l.startDate = a, l.endDate = b, l.chart = d, l.period = g, d.fire(l.type, l), d.previousStartDate = new Date(a), d.previousEndDate = new Date(b)
		}
		d.animationPlayed = !0
	},
	resetSkip: function() {
		this.skipScrollbarEvent = !1
	},
	updateGraphs: function() {
		this.getSelections();
		if (0 < this.dataSets.length) {
			var a = this.panels;
			this.comparedGraphs = [];
			for (var b = 0; b < a.length; b++) {
				for (var d = a[b], e = d.valueAxes, f = 0; f < e.length; f++) e[f].recalculateToPercents = "always" == d.recalculateToPercents ? !0 : !1;
				var e = this.mainDataSet,
					f = this.comparedDataSets,
					g = d.stockGraphs;
				d.graphs = [];
				for (var h = 0; h < g.length; h++) {
					var j = g[h];
					if (!j.title || j.resetTitleOnDataSetChange) j.title = e.title, j.resetTitleOnDataSetChange = !0;
					j.useDataSetColors && (j.lineColor = e.color, j.fillColors = void 0, j.bulletColor = void 0);
					d.addGraph(j);
					var k = !1;
					"always" == d.recalculateToPercents && (k = !0);
					var l = d.stockLegend,
						m, n;
					l && (m = l.valueTextComparing, n = l.valueTextRegular);
					if (j.comparable) {
						var t = f.length;
						0 < t && "whenComparing" == d.recalculateToPercents && (j.valueAxis.recalculateToPercents = !0);
						l && j.valueAxis && !0 == j.valueAxis.recalculateToPercents && (k = !0);
						for (var r = 0; r < t; r++) {
							var q = f[r],
								p = j.comparedGraphs[q.id];
							p || (p = new AmCharts.AmGraph, p.id = "comparedGraph" + r + "_" + q.id);
							p.periodValue = j.periodValue;
							p.dataSet = q;
							j.comparedGraphs[q.id] = p;
							p.seriesIdField = "amCategoryIdField";
							p.connect = j.connect;
							var s = j.compareField;
							s || (s = j.valueField);
							for (var u = !1, v = q.fieldMappings, y = 0; y < v.length; y++) v[y].toField == s && (u = !0);
							if (u) {
								p.valueField = s;
								p.title = q.title;
								p.lineColor = q.color;
								j.compareGraphType && (p.type = j.compareGraphType);
								s = j.compareGraphLineThickness;
								isNaN(s) || (p.lineThickness = s);
								s = j.compareGraphDashLength;
								isNaN(s) || (p.dashLength = s);
								s = j.compareGraphLineAlpha;
								isNaN(s) || (p.lineAlpha = s);
								s = j.compareGraphCornerRadiusTop;
								isNaN(s) || (p.cornerRadiusTop = s);
								s = j.compareGraphCornerRadiusBottom;
								isNaN(s) || (p.cornerRadiusBottom = s);
								s = j.compareGraphBalloonColor;
								isNaN(s) || (p.balloonColor = s);
								if (s = j.compareGraphFillColors) p.fillColors = s;
								if (s = j.compareGraphNegativeFillColors) p.negativeFillColors = s;
								if (s = j.compareGraphFillAlphas) p.fillAlphas = s;
								if (s = j.compareGraphNegativeFillAlphas) p.fillAlphas = s;
								if (s = j.compareGraphNegativeFillAlphas) p.negativeFillAlphas = s;
								if (s = j.compareGraphBullet) p.bullet = s;
								if (s = j.compareGraphNumberFormatter) p.numberFormatter = s;
								if (s = j.compareGraphBalloonText) p.balloonText = s;
								s = j.compareGraphBulletSize;
								isNaN(s) || (p.bulletSize = s);
								s = j.compareGraphBulletAlpha;
								isNaN(s) || (p.bulletAlpha = s);
								p.visibleInLegend = j.compareGraphVisibleInLegend;
								p.valueAxis = j.valueAxis;
								l && (k && m ? p.legendValueText = m : n && (p.legendValueText = n));
								d.addGraph(p);
								this.comparedGraphs.push({
									graph: p,
									dataSet: q
								})
							}
						}
					}
					l && (k && m ? j.legendValueText = m : n && (j.legendValueText = n))
				}
			}
		}
	},
	choosePeriod: function(a, b, d) {
		var e = this.categoryAxesSettings,
			f = e.groupToPeriods,
			g = f[a],
			f = f[a + 1],
			h = AmCharts.extractPeriod(g),
			h = AmCharts.getPeriodDuration(h.period, h.count),
			j = b.getTime(),
			k = d.getTime(),
			e = e.maxSeries;
		return (k - j) / h > e && 0 < e && f ? this.choosePeriod(a + 1, b, d) : g
	},
	handleCursorChange: function(a) {
		var b = a.target,
			d = a.position;
		a = a.zooming;
		for (var e = this.chartCursors, f = 0; f < e.length; f++) {
			var g = e[f];
			g != b && d && (g.isZooming(a), g.previousMousePosition = NaN, g.forceShow = !0, g.setPosition(d, !1))
		}
	},
	getSelections: function() {
		for (var a = [], b = this.dataSets, d = 0; d < b.length; d++) {
			var e = b[d];
			e.compared && a.push(e)
		}
		this.comparedDataSets = a;
		b = this.panels;
		for (d = 0; d < b.length; d++) e = b[d], "never" != e.recalculateToPercents && 0 < a.length ? e.hideDrawingIcons(!0) : e.drawingIconsEnabled && e.hideDrawingIcons(!1)
	},
	addPanel: function(a) {
		this.panels.push(a)
	},
	addPanelAt: function(a, b) {
		this.panels.splice(b, 0, a)
	},
	removePanel: function(a) {
		for (var b = this.panels, d = b.length - 1; 0 <= d; d--) if (b[d] == a) {
			var e = {
				type: "panelRemoved",
				panel: a,
				chart: this
			};
			this.fire(e.type, e);
			b.splice(d, 1);
			a.destroy();
			a.clear()
		}
	},
	validateData: function() {
		this.resetDataParsed();
		this.updateDataSets();
		this.mainDataSet.compared = !1;
		this.updateGraphs();
		this.updateData();
		var a = this.dataSetSelector;
		a && a.write(a.div)
	},
	resetDataParsed: function() {
		for (var a = this.dataSets, b = 0; b < a.length; b++) a[b].dataParsed = !1
	},
	validateNow: function() {
		this.skipDefault = !0;
		this.clear();
		this.write(this.div)
	},
	hideStockEvents: function() {
		this.showHideEvents(!1)
	},
	showStockEvents: function() {
		this.showHideEvents(!0)
	},
	showHideEvents: function(a) {
		for (var b = this.panels, d = 0; d < b.length; d++) for (var e = b[d].graphs, f = 0; f < e.length; f++) {
			var g = e[f];
			!0 == a ? g.showBullets() : g.hideBullets()
		}
	},
	measure: function() {
		var a = this.div,
			b = a.offsetWidth,
			d = a.offsetHeight;
		a.clientHeight && (b = a.clientWidth, d = a.clientHeight);
		this.divRealWidth = b;
		this.divRealHeight = d
	},
	clear: function() {
		for (var a = this.panels, b = 0; b < a.length; b++) a[b].clear(!0);
		(a = this.scrollbarChart) && a.clear();
		this.div.innerHTML = ""
	}
});
AmCharts.StockEvent = AmCharts.Class({
	construct: function() {}
});
AmCharts.DataSet = AmCharts.Class({
	construct: function() {
		this.fieldMappings = [];
		this.dataProvider = [];
		this.agregatedDataProviders = [];
		this.stockEvents = [];
		this.compared = !1;
		this.showInCompare = this.showInSelect = !0
	}
});
AmCharts.PeriodSelector = AmCharts.Class({
	construct: function() {
		this.createEvents("changed");
		this.inputFieldsEnabled = !0;
		this.position = "bottom";
		this.width = 180;
		this.fromText = "开始: ";
		this.toText = "结束: ";
		this.periodsText = "缩放: ";
		this.periods = [];
		this.inputFieldWidth = 100;
		this.dateFormat = "YYYY-MM-DD";
		this.hideOutOfScopePeriods = !0
	},
	zoom: function(a, b) {
		this.inputFieldsEnabled && (this.startDateField.value = AmCharts.formatDate(a, this.dateFormat), this.endDateField.value = AmCharts.formatDate(b, this.dateFormat));
		this.markButtonAsSelected()
	},
	write: function(a) {
		var b = this;
		a.className = "amChartsPeriodSelector";
		b.div = a;
		a.innerHTML = "";
		var d = b.position,
			d = "top" == d || "bottom" == d ? !1 : !0;
		b.vertical = d;
		var e = 0,
			f = 0;
		if (b.inputFieldsEnabled) {
			var g = document.createElement("div");
			a.appendChild(g);
			var h = document.createTextNode(b.fromText);
			g.appendChild(h);
			d ? AmCharts.addBr(g) : (g.style.styleFloat = "left", g.style.display = "inline");
			var j = document.createElement("input");
			j.className = "amChartsInputField";
			j.style.textAlign = "center";
			AmCharts.isNN && j.addEventListener("keypress", function(a) {
				b.handleCalendarChange.call(b, a)
			}, !0);
			AmCharts.isIE && j.attachEvent("onkeypress", function(a) {
				b.handleCalendarChange.call(b, a)
			});
			g.appendChild(j);
			b.startDateField = j;
			if (d) h = b.width - 6 + "px", AmCharts.addBr(g);
			else {
				var h = b.inputFieldWidth + "px",
					k = document.createTextNode(" ");
				g.appendChild(k)
			}
			j.style.width = h;
			j = document.createTextNode(b.toText);
			g.appendChild(j);
			d && AmCharts.addBr(g);
			j = document.createElement("input");
			j.className = "amChartsInputField";
			j.style.textAlign = "center";
			AmCharts.isNN && j.addEventListener("keypress", function(a) {
				b.handleCalendarChange.call(b, a)
			}, !0);
			AmCharts.isIE && j.attachEvent("onkeypress", function(a) {
				b.handleCalendarChange.call(b, a)
			});
			g.appendChild(j);
			b.endDateField = j;
			d ? AmCharts.addBr(g) : e = j.offsetHeight + 2;
			h && (j.style.width = h)
		}
		g = b.periods;
		if (AmCharts.ifArray(g)) {
			h = document.createElement("div");
			d || (h.style.cssFloat = "right", h.style.styleFloat = "right", h.style.display = "inline");
			a.appendChild(h);
			d && AmCharts.addBr(h);
			a = document.createTextNode(b.periodsText);
			h.appendChild(a);
			b.periodContainer = h;
			for (a = 0; a < g.length; a++) {
				var j = g[a],
					l = document.createElement("input");
				l.type = "button";
				l.value = j.label;
				l.period = j.period;
				l.count = j.count;
				l.periodObj = j;
				l.className = "amChartsButton";
				d && (l.style.width = b.width - 1 + "px");
				h.appendChild(l);
				AmCharts.isNN && l.addEventListener("click", function(a) {
					b.handlePeriodChange.call(b, a)
				}, !0);
				AmCharts.isIE && l.attachEvent("onclick", function(a) {
					b.handlePeriodChange.call(b, a)
				});
				j.button = l
			}
			d || (f = l.offsetHeight);
			b.offsetHeight = Math.max(e, f)
		}
	},
	getPeriodDates: function() {
		for (var a = this.periods, b = 0; b < a.length; b++) this.selectPeriodButton(a[b], !0)
	},
	handleCalendarChange: function(a) {
		if (13 == a.keyCode) {
			var b = this.dateFormat;
			a = AmCharts.stringToDate(this.startDateField.value, b);
			b = AmCharts.stringToDate(this.endDateField.value, b);
			try {
				this.startDateField.blur(), this.endDateField.blur()
			} catch (d) {}
			if (a && b) {
				var e = {
					type: "changed"
				};
				e.startDate = a;
				e.endDate = b;
				e.chart = this.chart;
				this.fire(e.type, e)
			}
		}
	},
	handlePeriodChange: function(a) {
		this.selectPeriodButton((a.srcElement ? a.srcElement : a.target).periodObj)
	},
	setRanges: function(a, b) {
		this.firstDate = a;
		this.lastDate = b;
		this.getPeriodDates()
	},
	selectPeriodButton: function(a, b) {
		var d = a.button,
			e = d.count,
			f = d.period,
			g, h, j = this.firstDate,
			k = this.lastDate;
		if (j && k) {
			if ("MAX" == f) g = j, h = k;
			else if ("YTD" == f) g = new Date, g.setMonth(0, 1), g.setHours(0, 0, 0, 0), 0 == e && g.setDate(g.getDate() - 1), h = this.lastDate;
			else {
				var l = AmCharts.getPeriodDuration(f, e);
				this.selectFromStart ? (g = j, h = new Date(j.getTime() + l)) : (g = new Date(k.getTime() - l), h = k)
			}
			a.startTime = g.getTime();
			if (this.hideOutOfScopePeriods && b && a.startTime < j.getTime()) try {
				this.periodContainer.removeChild(d)
			} catch (m) {}
			g.getTime() > k.getTime() && (l = AmCharts.getPeriodDuration("DD", 1), g = new Date(k.getTime() - l));
			g.getTime() < j.getTime() && (g = j);
			"YTD" == f && (a.startTime = g.getTime());
			a.endTime = h.getTime();
			b || (this.skipMark = !0, this.unselectButtons(), d.className = "amChartsButtonSelected", d = {
				type: "changed"
			}, d.startDate = g, d.endDate = h, d.predefinedPeriod = f, d.chart = this.chart, d.count = e, this.fire(d.type, d))
		}
	},
	markButtonAsSelected: function() {
		if (!this.skipMark) {
			var a = this.chart,
				b = this.periods,
				d = a.startDate.getTime(),
				a = a.endDate.getTime();
			this.unselectButtons();
			for (var e = b.length - 1; 0 <= e; e--) {
				var f = b[e],
					g = f.button;
				f.startTime && f.endTime && (d == f.startTime && a == f.endTime) && (this.unselectButtons(), g.className = "amChartsButtonSelected")
			}
		}
		this.skipMark = !1
	},
	unselectButtons: function() {
		for (var a = this.periods, b = a.length - 1; 0 <= b; b--) a[b].button.className = "amChartsButton"
	},
	setDefaultPeriod: function() {
		for (var a = this.periods, b = 0; b < a.length; b++) {
			var d = a[b];
			d.selected && this.selectPeriodButton(d)
		}
	}
});
AmCharts.StockGraph = AmCharts.Class({
	inherits: AmCharts.AmGraph,
	construct: function() {
		AmCharts.StockGraph.base.construct.call(this);
		this.useDataSetColors = !0;
		this.periodValue = "Close";
		this.compareGraphType = "line";
		this.compareGraphVisibleInLegend = !0;
		this.comparedGraphs = {};
		this.comparable = this.resetTitleOnDataSetChange = !1;
		this.comparedGraphs = {}
	}
});
AmCharts.StockPanel = AmCharts.Class({
	inherits: AmCharts.AmSerialChart,
	construct: function() {
		AmCharts.StockPanel.base.construct.call(this);
		this.showCategoryAxis = !0;
		this.recalculateToPercents = "whenComparing";
		this.panelHeaderPaddingBottom = this.panelHeaderPaddingLeft = this.panelHeaderPaddingRight = this.panelHeaderPaddingTop = 0;
		this.trendLineAlpha = 1;
		this.trendLineColor = "#00CC00";
		this.trendLineColorHover = "#CC0000";
		this.trendLineThickness = 2;
		this.trendLineDashLength = 0;
		this.stockGraphs = [];
		this.drawingIconsEnabled = !1;
		this.iconSize = 18;
		this.autoMargins = this.allowTurningOff = this.eraseAll = this.erasingEnabled = this.drawingEnabled = !1
	},
	initChart: function(a) {
		AmCharts.StockPanel.base.initChart.call(this, a);
		this.drawingIconsEnabled && this.createDrawIcons();
		if (a = this.chartCursor) this.removeListener(a, "draw", this.handleDraw), this.listenTo(a, "draw", this.handleDraw)
	},
	addStockGraph: function(a) {
		this.stockGraphs.push(a);
		return a
	},
	removeStockGraph: function(a) {
		for (var b = this.stockGraphs, d = b.length - 1; 0 <= d; d--) b[d] == a && b.splice(d, 1)
	},
	createDrawIcons: function() {
		var a = this,
			b = a.iconSize,
			d = a.container,
			e = a.pathToImages,
			f = a.realWidth - 2 * b - 1 - a.marginRight,
			g = AmCharts.rect(d, b, b, "#000", 0.005),
			h = AmCharts.rect(d, b, b, "#000", 0.005);
		h.translate(b + 1, 0);
		var j = d.image(e + "pencilIcon.gif", 0, 0, b, b);
		a.pencilButton = j;
		h.setAttr("cursor", "pointer");
		g.setAttr("cursor", "pointer");
		g.mouseup(function() {
			a.handlePencilClick()
		});
		var k = d.image(e + "pencilIconH.gif", 0, 0, b, b);
		a.pencilButtonPushed = k;
		a.drawingEnabled || k.hide();
		var l = d.image(e + "eraserIcon.gif", b + 1, 0, b, b);
		a.eraserButton = l;
		h.mouseup(function() {
			a.handleEraserClick()
		});
		g.touchend && (g.touchend(function() {
			a.handlePencilClick()
		}), h.touchend(function() {
			a.handleEraserClick()
		}));
		b = d.image(e + "eraserIconH.gif", b + 1, 0, b, b);
		a.eraserButtonPushed = b;
		a.erasingEnabled || b.hide();
		d = d.set([j, k, l, b, g, h]);
		d.translate(f, 1);
		this.hideIcons && d.hide()
	},
	handlePencilClick: function() {
		var a = !this.drawingEnabled;
		this.disableDrawing(!a);
		this.erasingEnabled = !1;
		this.eraserButtonPushed.hide();
		a ? this.pencilButtonPushed.show() : (this.pencilButtonPushed.hide(), this.setMouseCursor("auto"))
	},
	disableDrawing: function(a) {
		this.drawingEnabled = !a;
		var b = this.chartCursor;
		this.stockChart.enableCursors(a);
		b && b.enableDrawing(!a)
	},
	handleEraserClick: function() {
		this.disableDrawing(!0);
		this.pencilButtonPushed.hide();
		if (this.eraseAll) {
			for (var a = this.trendLines, b = a.length - 1; 0 <= b; b--) {
				var d = a[b];
				d.isProtected || this.removeTrendLine(d)
			}
			this.validateNow()
		} else(this.erasingEnabled = a = !this.erasingEnabled) ? (this.eraserButtonPushed.show(), this.setTrendColorHover(this.trendLineColorHover), this.setMouseCursor("auto")) : (this.eraserButtonPushed.hide(), this.setTrendColorHover())
	},
	setTrendColorHover: function(a) {
		for (var b = this.trendLines, d = b.length - 1; 0 <= d; d--) {
			var e = b[d];
			e.isProtected || (e.rollOverColor = a)
		}
	},
	handleDraw: function(a) {
		var b = this.drawOnAxis;
		b || (b = this.valueAxes[0]);
		var d = this.categoryAxis,
			e = a.initialX,
			f = a.finalX,
			g = a.initialY;
		a = a.finalY;
		var h = new AmCharts.TrendLine;
		h.initialDate = d.coordinateToDate(e);
		h.finalDate = d.coordinateToDate(f);
		h.initialValue = b.coordinateToValue(g);
		h.finalValue = b.coordinateToValue(a);
		h.lineAlpha = this.trendLineAlpha;
		h.lineColor = this.trendLineColor;
		h.lineThickness = this.trendLineThickness;
		h.dashLength = this.trendLineDashLength;
		h.valueAxis = b;
		h.categoryAxis = d;
		this.addTrendLine(h);
		this.listenTo(h, "click", this.handleTrendClick);
		this.validateNow()
	},
	hideDrawingIcons: function(a) {
		(this.hideIcons = a) && this.disableDrawing(a)
	},
	handleTrendClick: function(a) {
		this.erasingEnabled && (a = a.trendLine, !this.eraseAll && !a.isProtected && this.removeTrendLine(a), this.validateNow())
	}
});
AmCharts.CategoryAxesSettings = AmCharts.Class({
	construct: function() {
		this.minPeriod = "DD";
		this.equalSpacing = !1;
		this.axisHeight = 28;
		this.tickLength = this.axisAlpha = 0;
		this.gridCount = 10;
		this.maxSeries = 150;
		this.groupToPeriods = "ss 10ss 30ss mm 10mm 30mm hh DD WW MM YYYY".split(" ");
		this.autoGridCount = !0
	}
});
AmCharts.ChartCursorSettings = AmCharts.Class({
	construct: function() {
		this.enabled = !0;
		this.bulletsEnabled = this.valueBalloonsEnabled = !1;
		this.categoryBalloonDateFormats = [{
			period: "YYYY",
			format: "YYYY"
		}, {
			period: "MM",
			format: "MMM, YYYY"
		}, {
			period: "WW",
			format: "MMM DD, YYYY"
		}, {
			period: "DD",
			format: "MMM DD, YYYY"
		}, {
			period: "hh",
			format: "JJ:NN"
		}, {
			period: "mm",
			format: "JJ:NN"
		}, {
			period: "ss",
			format: "JJ:NN:SS"
		}, {
			period: "fff",
			format: "JJ:NN:SS"
		}]
	},
	categoryBalloonDateFormat: function(a) {
		for (var b = this.categoryBalloonDateFormats, d, e = 0; e < b.length; e++) b[e].period == a && (d = b[e].format);
		return d
	}
});
AmCharts.ChartScrollbarSettings = AmCharts.Class({
	construct: function() {
		this.height = 40;
		this.enabled = !0;
		this.color = "#FFFFFF";
		this.updateOnReleaseOnly = this.autoGridCount = !0;
		this.hideResizeGrips = !1
	}
});
AmCharts.LegendSettings = AmCharts.Class({
	construct: function() {
		this.marginBottom = this.marginTop = 0;
		this.usePositiveNegativeOnPercentsOnly = !0;
		this.positiveValueColor = "#00CC00";
		this.negativeValueColor = "#CC0000";
		this.autoMargins = this.equalWidths = this.textClickEnabled = !1
	}
});
AmCharts.PanelsSettings = AmCharts.Class({
	construct: function() {
		this.marginBottom = this.marginTop = this.marginRight = this.marginLeft = 0;
		this.backgroundColor = "#FFFFFF";
		this.backgroundAlpha = 0;
		this.panelSpacing = 8;
		this.panEventsEnabled = !1
	}
});
AmCharts.StockEventsSettings = AmCharts.Class({
	construct: function() {
		this.type = "sign";
		this.backgroundAlpha = 1;
		this.backgroundColor = "#DADADA";
		this.borderAlpha = 1;
		this.borderColor = "#888888";
		this.rollOverColor = "#CC0000"
	}
});
AmCharts.ValueAxesSettings = AmCharts.Class({
	construct: function() {
		this.tickLength = 0;
		this.showFirstLabel = this.autoGridCount = this.inside = !0;
		this.showLastLabel = !1;
		this.axisAlpha = 0
	}
});
AmCharts.getItemIndex = function(a, b) {
	for (var d = -1, e = 0; e < b.length; e++) a == b[e] && (d = e);
	return d
};
AmCharts.addBr = function(a) {
	a.appendChild(document.createElement("br"))
};
AmCharts.stringToDate = function(a, b) {
	var d = {},
		e = [{
			pattern: "YYYY",
			period: "year"
		}, {
			pattern: "YY",
			period: "year"
		}, {
			pattern: "MM",
			period: "month"
		}, {
			pattern: "M",
			period: "month"
		}, {
			pattern: "DD",
			period: "date"
		}, {
			pattern: "D",
			period: "date"
		}, {
			pattern: "JJ",
			period: "hours"
		}, {
			pattern: "J",
			period: "hours"
		}, {
			pattern: "HH",
			period: "hours"
		}, {
			pattern: "H",
			period: "hours"
		}, {
			pattern: "KK",
			period: "hours"
		}, {
			pattern: "K",
			period: "hours"
		}, {
			pattern: "LL",
			period: "hours"
		}, {
			pattern: "L",
			period: "hours"
		}, {
			pattern: "NN",
			period: "minutes"
		}, {
			pattern: "N",
			period: "minutes"
		}, {
			pattern: "SS",
			period: "seconds"
		}, {
			pattern: "S",
			period: "seconds"
		}, {
			pattern: "QQQ",
			period: "milliseconds"
		}, {
			pattern: "QQ",
			period: "milliseconds"
		}, {
			pattern: "Q",
			period: "milliseconds"
		}],
		f = !0,
		g = b.indexOf("AA"); - 1 != g && (a.substr(g, 2), "pm" == a.toLowerCase && (f = !1));
	for (var g = b, h = 0; h < e.length; h++) {
		var j = e[h].pattern,
			k = e[h].period;
		d[k] = 0;
		"date" == k && 1 == d[k]
	}
	for (h = 0; h < e.length; h++) if (j = e[h].pattern, k = e[h].period, -1 != b.indexOf(j)) {
		var l = AmCharts.getFromDateString(j, a, g);
		b = b.replace(j, "");
		if ("KK" == j || "K" == j || "LL" == j || "L" == j) f || (l += 12);
		d[k] = l
	}
	return new Date(d.year, d.month, d.date, d.hours, d.minutes, d.seconds, d.milliseconds)
};
AmCharts.getFromDateString = function(a, b, d) {
	d = d.indexOf(a);
	b = b.substr(d, a.length);
	"0" == b.charAt(0) && (b = b.substr(1, b.length - 1));
	b = Number(b);
	isNaN(b) && (b = 0); - 1 != a.indexOf("M") && b--;
	return b
};
AmCharts.changeDate = function(a, b, d, e, f) {
	var g = -1;
	void 0 == e && (e = !0);
	void 0 == f && (f = !1);
	!0 == e && (g = 1);
	switch (b) {
	case "YYYY":
		a.setFullYear(a.getFullYear() + d * g);
		!e && !f && a.setDate(a.getDate() + 1);
		break;
	case "MM":
		a.setMonth(a.getMonth() + d * g);
		!e && !f && a.setDate(a.getDate() + 1);
		break;
	case "DD":
		a.setDate(a.getDate() + d * g);
		break;
	case "WW":
		a.setDate(a.getDate() + 7 * d * g + 1);
		break;
	case "hh":
		a.setHours(a.getHours() + d * g);
		break;
	case "mm":
		a.setMinutes(a.getMinutes() + d * g);
		break;
	case "ss":
		a.setSeconds(a.getSeconds() + d * g);
		break;
	case "fff":
		a.setMilliseconds(a.getMilliseconds() + d * g)
	}
	return a
};
AmCharts.parseStockData = function(a, b, d, e) {
	var f = {},
		g = a.dataProvider,
		h = a.categoryField;
	if (h) {
		b = AmCharts.getItemIndex(b, d);
		var j = d.length,
			k, l = g.length,
			m, n = {};
		for (k = b; k < j; k++) m = d[k], f[m] = [];
		var t = {},
			r = a.fieldMappings,
			q = r.length;
		for (k = 0; k < l; k++) {
			var p = g[k],
				s = new Date(p[h]),
				u = s.getTime(),
				v = {};
			for (m = 0; m < q; m++) v[r[m].toField] = p[r[m].fromField];
			for (var y = b; y < j; y++) {
				m = d[y];
				var z = AmCharts.extractPeriod(m),
					A = z.period,
					z = z.count;
				if (y == b || u >= n[m] || !n[m]) {
					t[m] = {};
					t[m][h] = new Date(s);
					t[m].amCategoryIdField = AmCharts.resetDateToMin(s, A, z, e);
					for (var w = 0; w < q; w++) {
						var x = r[w].toField;
						AmCharts.agregateDataObject(t[m], x, v[x])
					}
					f[m].push(t[m]);
					y > b && (w = new Date(s), w = AmCharts.changeDate(w, A, z, !0), w = AmCharts.resetDateToMin(w, A, z, e), n[m] = w.getTime());
					if (y == b) for (var B in p) t[m][B] = p[B]
				} else for (A = 0; A < q; A++) z = r[A].toField, AmCharts.agregateDataObject(t[m], z, v[z])
			}
		}
	}
	a.agregatedDataProviders = f
};
AmCharts.agregateDataObject = function(a, b, d) {
	isNaN(d) || (isNaN(a[b + "Open"]) && (a[b + "Open"] = d), a[b + "Sum"] = isNaN(a[b + "Sum"]) ? d : a[b + "Sum"] + d, isNaN(a[b + "Low"]) ? a[b + "Low"] = d : d < a[b + "Low"] && (a[b + "Low"] = d), isNaN(a[b + "High"]) ? a[b + "High"] = d : d > a[b + "High"] && (a[b + "High"] = d), isNaN(d) || (a[b + "Close"] = d), isNaN(a[b + "Count"]) && (a[b + "Count"] = 0), a[b + "Count"]++, a[b + "Average"] = a[b + "Sum"] / a[b + "Count"])
};
AmCharts.parseEvents = function(a, b, d, e, f) {
	var g = a.stockEvents,
		h = a.agregatedDataProviders,
		j = b.length,
		k, l, m, n, t, r, q;
	for (k = 0; k < j; k++) {
		r = b[k];
		t = r.graphs;
		m = t.length;
		for (l = 0; l < m; l++) n = t[l], n.customBulletField = "amCustomBullet" + n.id + "_" + r.id, n.bulletConfigField = "amCustomBulletConfig" + n.id + "_" + r.id
	}
	for (var p in h) for (var s = h[p], u = AmCharts.extractPeriod(p), v = s.length, y = 0; y < v; y++) {
		var z = s[y];
		k = z[a.categoryField];
		var A = k.getTime();
		l = u.period;
		m = u.count;
		var w = "fff" == l ? k.getTime() + 1 : AmCharts.resetDateToMin(AmCharts.changeDate(new Date(k), u.period, u.count), l, m, e).getTime();
		for (k = 0; k < j; k++) {
			r = b[k];
			t = r.graphs;
			m = t.length;
			for (l = 0; l < m; l++) {
				n = t[l];
				var x = {};
				x.eventDispatcher = f;
				x.eventObjects = [];
				x.letters = [];
				x.descriptions = [];
				x.shapes = [];
				x.backgroundColors = [];
				x.backgroundAlphas = [];
				x.borderColors = [];
				x.borderAlphas = [];
				x.colors = [];
				x.rollOverColors = [];
				x.showOnAxis = [];
				for (q = 0; q < g.length; q++) {
					var B = g[q],
						G = B.date.getTime();
					n == B.graph && (G >= A && G < w) && (x.eventObjects.push(B), x.letters.push(B.text), x.descriptions.push(B.description), B.type ? x.shapes.push(B.type) : x.shapes.push(d.type), void 0 != B.backgroundColor ? x.backgroundColors.push(B.backgroundColor) : x.backgroundColors.push(d.backgroundColor), isNaN(B.backgroundAlpha) ? x.backgroundAlphas.push(d.backgroundAlpha) : x.backgroundAlphas.push(B.backgroundAlpha), isNaN(B.borderAlpha) ? x.borderAlphas.push(d.borderAlpha) : x.borderAlphas.push(B.borderAlpha), void 0 != B.borderColor ? x.borderColors.push(B.borderColor) : x.borderColors.push(d.borderColor), void 0 != B.rollOverColor ? x.rollOverColors.push(B.rollOverColor) : x.rollOverColors.push(d.rollOverColor), x.colors.push(B.color), !B.panel && B.graph && (B.panel = B.graph.chart), x.showOnAxis.push(B.showOnAxis), x.date = new Date(B.date))
				}
				0 < x.shapes.length && (q = "amCustomBullet" + n.id + "_" + r.id, n = "amCustomBulletConfig" + n.id + "_" + r.id, z[q] = AmCharts.StackedBullet, z[n] = x)
			}
		}
	}
};
AmCharts.StockLegend = AmCharts.Class({
	inherits: AmCharts.AmLegend,
	construct: function() {
		AmCharts.StockLegend.base.construct.call(this);
		this.valueTextComparing = "[[percents.value]]%";
		this.valueTextRegular = "[[value]]"
	},
	drawLegend: function() {
		var a = this;
		AmCharts.StockLegend.base.drawLegend.call(a);
		var b = a.chart;
		if (b.allowTurningOff) {
			var d = a.container,
				e = d.image(b.pathToImages + "xIcon.gif", b.realWidth - 17, 3, 17, 17),
				b = d.image(b.pathToImages + "xIconH.gif", b.realWidth - 17, 3, 17, 17);
			b.hide();
			a.xButtonHover = b;
			e.mouseup(function() {
				a.handleXClick()
			}).mouseover(function() {
				a.handleXOver()
			});
			b.mouseup(function() {
				a.handleXClick()
			}).mouseout(function() {
				a.handleXOut()
			})
		}
	},
	handleXOver: function() {
		this.xButtonHover.show()
	},
	handleXOut: function() {
		this.xButtonHover.hide()
	},
	handleXClick: function() {
		var a = this.chart,
			b = a.stockChart;
		b.removePanel(a);
		b.validateNow()
	}
});
AmCharts.DataSetSelector = AmCharts.Class({
	construct: function() {
		this.createEvents("dataSetSelected", "dataSetCompared", "dataSetUncompared");
		this.position = "left";
		this.selectText = "选择:";
		this.comboBoxSelectText = "选择...";
		this.compareText = "比较:";
		this.width = 180;
		this.dataProvider = [];
		this.listHeight = 150;
		this.listCheckBoxSize = 14;
		this.rollOverBackgroundColor = "#b2e1ff";
		this.selectedBackgroundColor = "#7fceff"
	},
	write: function(a) {
		var b = this;
		a.className = "amChartsDataSetSelector";
		b.div = a;
		a.innerHTML = "";
		var d = b.position,
			e;
		e = "top" == d || "bottom" == d ? !1 : !0;
		b.vertical = e;
		var f;
		e && (f = b.width + "px");
		d = b.dataProvider;
		if (1 < b.countDataSets("showInSelect")) {
			var g = document.createTextNode(b.selectText);
			a.appendChild(g);
			e && AmCharts.addBr(a);
			var h = document.createElement("select");
			f && (h.style.width = f);
			b.selectCB = h;
			a.appendChild(h);
			AmCharts.isNN && h.addEventListener("change", function(a) {
				b.handleDataSetChange.call(b, a)
			}, !0);
			AmCharts.isIE && h.attachEvent("onchange", function(a) {
				b.handleDataSetChange.call(b, a)
			});
			for (g = 0; g < d.length; g++) {
				var j = d[g];
				if (!0 == j.showInSelect) {
					var k = document.createElement("option");
					k.text = j.title;
					k.value = g;
					j == b.chart.mainDataSet && (k.selected = !0);
					try {
						h.add(k, null)
					} catch (l) {
						h.add(k)
					}
				}
			}
			b.offsetHeight = h.offsetHeight
		}
		if (0 < b.countDataSets("showInCompare") && 1 < d.length) if (e ? (AmCharts.addBr(a), AmCharts.addBr(a)) : (g = document.createTextNode(" "), a.appendChild(g)), g = document.createTextNode(b.compareText), a.appendChild(g), k = b.listCheckBoxSize, e) {
			AmCharts.addBr(a);
			f = document.createElement("div");
			a.appendChild(f);
			f.className = "amChartsCompareList";
			f.style.overflow = "auto";
			f.style.overflowX = "hidden";
			f.style.width = b.width - 2 + "px";
			f.style.maxHeight = b.listHeight + "px";
			for (g = 0; g < d.length; g++) j = d[g], !0 == j.showInCompare && j != b.chart.mainDataSet && (e = document.createElement("div"), e.style.padding = "4px", e.style.position = "relative", e.name = "amCBContainer", e.dataSet = j, e.style.height = k + "px", j.compared && (e.style.backgroundColor = b.selectedBackgroundColor), f.appendChild(e), h = document.createElement("div"), h.style.width = k + "px", h.style.height = k + "px", h.style.position = "absolute", h.style.backgroundColor = j.color, e.appendChild(h), h = document.createElement("div"), h.style.width = "100%", h.style.position = "absolute", h.style.left = k + 10 + "px", e.appendChild(h), j = document.createTextNode(j.title), h.style.whiteSpace = "nowrap", h.style.cursor = "default", h.appendChild(j), AmCharts.isNN && (e.addEventListener("mouseover", function(a) {
				b.handleRollOver.call(b, a)
			}, !0), e.addEventListener("mouseout", function(a) {
				b.handleRollOut.call(b, a)
			}, !0), e.addEventListener("click", function(a) {
				b.handleClick.call(b, a)
			}, !0)), AmCharts.isIE && (e.attachEvent("onmouseout", function(a) {
				b.handleRollOut.call(b, a)
			}), e.attachEvent("onmouseover", function(a) {
				b.handleRollOver.call(b, a)
			}), e.attachEvent("onclick", function(a) {
				b.handleClick.call(b, a)
			})));
			AmCharts.addBr(a);
			AmCharts.addBr(a)
		} else {
			e = document.createElement("select");
			b.compareCB = e;
			f && (e.style.width = f);
			a.appendChild(e);
			AmCharts.isNN && e.addEventListener("change", function(a) {
				b.handleCBSelect.call(b, a)
			}, !0);
			AmCharts.isIE && e.attachEvent("onchange", function(a) {
				b.handleCBSelect.call(b, a)
			});
			k = document.createElement("option");
			k.text = b.comboBoxSelectText;
			try {
				e.add(k, null)
			} catch (m) {
				e.add(k)
			}
			for (g = 0; g < d.length; g++) if (j = d[g], !0 == j.showInCompare && j != b.chart.mainDataSet) {
				k = document.createElement("option");
				k.text = j.title;
				k.value = g;
				j.compared && (k.selected = !0);
				try {
					e.add(k, null)
				} catch (n) {
					e.add(k)
				}
			}
			b.offsetHeight = e.offsetHeight
		}
	},
	handleDataSetChange: function() {
		var a = this.selectCB,
			a = this.dataProvider[a.options[a.selectedIndex].value],
			b = this.chart;
		b.mainDataSet = a;
		b.zoomOutOnDataSetChange && (b.startDate = void 0, b.endDate = void 0);
		b.validateData();
		a = {
			type: "dataSetSelected",
			dataSet: a,
			chart: this.chart
		};
		this.fire(a.type, a)
	},
	handleRollOver: function(a) {
		a = this.getRealDiv(a);
		a.dataSet.compared || (a.style.backgroundColor = this.rollOverBackgroundColor)
	},
	handleRollOut: function(a) {
		a = this.getRealDiv(a);
		a.dataSet.compared || (a.style.removeProperty && a.style.removeProperty("background-color"), a.style.removeAttribute && a.style.removeAttribute("backgroundColor"))
	},
	handleCBSelect: function(a) {
		for (var b = this.compareCB, d = this.dataProvider, e = 0; e < d.length; e++) {
			var f = d[e];
			f.compared && (a = {
				type: "dataSetUncompared",
				dataSet: f
			});
			f.compared = !1
		}
		d = b.selectedIndex;
		0 < d && (f = this.dataProvider[b.options[d].value], f.compared || (a = {
			type: "dataSetCompared",
			dataSet: f
		}), f.compared = !0);
		b = this.chart;
		b.validateData();
		a.chart = b;
		this.fire(a.type, a)
	},
	handleClick: function(a) {
		a = this.getRealDiv(a).dataSet;
		!0 == a.compared ? (a.compared = !1, a = {
			type: "dataSetUncompared",
			dataSet: a
		}) : (a.compared = !0, a = {
			type: "dataSetCompared",
			dataSet: a
		});
		var b = this.chart;
		b.validateData();
		a.chart = b;
		this.fire(a.type, a)
	},
	getRealDiv: function(a) {
		a || (a = window.event);
		a = a.currentTarget ? a.currentTarget : a.srcElement;
		"amCBContainer" == a.parentNode.name && (a = a.parentNode);
		return a
	},
	countDataSets: function(a) {
		for (var b = this.dataProvider, d = 0, e = 0; e < b.length; e++)!0 == b[e][a] && d++;
		return d
	}
});
AmCharts.StackedBullet = AmCharts.Class({
	construct: function() {
		this.fontSize = 11;
		this.stackDown = !1;
		this.mastHeight = 8;
		this.shapes = [];
		this.backgroundColors = [];
		this.backgroundAlphas = [];
		this.borderAlphas = [];
		this.borderColors = [];
		this.colors = [];
		this.rollOverColors = [];
		this.showOnAxiss = [];
		this.textColor = "#000000";
		this.nextY = 0;
		this.size = 16
	},
	parseConfig: function() {
		var a = this.bulletConfig;
		this.eventObjects = a.eventObjects;
		this.letters = a.letters;
		this.shapes = a.shapes;
		this.backgroundColors = a.backgroundColors;
		this.backgroundAlphas = a.backgroundAlphas;
		this.borderColors = a.borderColors;
		this.borderAlphas = a.borderAlphas;
		this.colors = a.colors;
		this.rollOverColors = a.rollOverColors;
		this.date = a.date;
		this.showOnAxiss = a.showOnAxis;
		this.axisCoordinate = a.minCoord
	},
	write: function(a) {
		this.parseConfig();
		this.container = a;
		this.bullets = [];
		if (this.graph) {
			var b = this.graph.fontSize;
			b && (this.fontSize = b)
		}
		b = this.letters.length;
		(this.mastHeight + 2 * (this.fontSize / 2 + 2)) * b > this.availableSpace && (this.stackDown = !0);
		this.set = a.set();
		for (var d = a = 0; d < b; d++) this.shape = this.shapes[d], this.backgroundColor = this.backgroundColors[d], this.backgroundAlpha = this.backgroundAlphas[d], this.borderAlpha = this.borderAlphas[d], this.borderColor = this.borderColors[d], this.rollOverColor = this.rollOverColors[d], this.showOnAxis = this.showOnAxiss[d], this.color = this.colors[d], this.addLetter(this.letters[d], a, d), this.showOnAxis || a++
	},
	addLetter: function(a, b, d) {
		var e = this.container;
		b = e.set();
		var f = -1,
			g = this.stackDown;
		this.showOnAxis && (this.stackDown = this.graph.valueAxis.reversed ? !0 : !1);
		this.stackDown && (f = 1);
		var h = 0,
			j = 0,
			k = 0,
			l, k = this.fontSize,
			m = this.mastHeight,
			n = this.shape,
			t = this.textColor;
		void 0 != this.color && (t = this.color);
		void 0 == a && (a = "");
		a = AmCharts.text(e, a, t, this.chart.fontFamily, this.fontSize);
		e = a.getBBox();
		this.labelWidth = t = e.width;
		this.labelHeight = e.height;
		e = 0;
		switch (n) {
		case "sign":
			l = this.drawSign(b);
			h = m + 4 + k / 2;
			e = m + k + 4;
			1 == f && (h -= 4);
			break;
		case "flag":
			l = this.drawFlag(b);
			j = t / 2 + 3;
			h = m + 4 + k / 2;
			e = m + k + 4;
			1 == f && (h -= 4);
			break;
		case "pin":
			l = this.drawPin(b);
			h = 6 + k / 2;
			e = k + 8;
			break;
		case "triangleUp":
			l = this.drawTriangleUp(b);
			h = -k - 1;
			e = k + 4;
			f = -1;
			break;
		case "triangleDown":
			l = this.drawTriangleDown(b);
			h = k + 1;
			e = k + 4;
			f = -1;
			break;
		case "triangleLeft":
			l = this.drawTriangleLeft(b);
			j = k;
			e = k + 4;
			f = -1;
			break;
		case "triangleRight":
			l = this.drawTriangleRight(b);
			j = -k;
			f = -1;
			e = k + 4;
			break;
		case "arrowUp":
			l = this.drawArrowUp(b);
			a.hide();
			break;
		case "arrowDown":
			l = this.drawArrowDown(b);
			a.hide();
			e = k + 4;
			break;
		case "text":
			f = -1;
			l = this.drawTextBackground(b, a);
			h = this.labelHeight + 3;
			e = k + 10;
			break;
		case "round":
			l = this.drawCircle(b)
		}
		this.bullets[d] = l;
		this.showOnAxis ? (l = isNaN(this.nextAxisY) ? this.axisCoordinate : this.nextY, k = h * f, this.nextAxisY = l + f * e) : (l = this.nextY, k = h * f);
		a.translate(j, k);
		b.push(a);
		b.translate(0, l);
		this.addEventListeners(b, d);
		this.nextY = l + f * e;
		this.stackDown = g
	},
	addEventListeners: function(a, b) {
		var d = this;
		a.click(function() {
			d.handleClick(b)
		}).mouseover(function() {
			d.handleMouseOver(b)
		}).touchend(function() {
			d.handleMouseOver(b, !0)
		}).mouseout(function() {
			d.handleMouseOut(b)
		})
	},
	drawPin: function(a) {
		var b = -1;
		this.stackDown && (b = 1);
		var d = this.fontSize + 4;
		return this.drawRealPolygon(a, [0, d / 2, d / 2, -d / 2, -d / 2, 0], [0, b * d / 4, b * (d + d / 4), b * (d + d / 4), b * d / 4, 0])
	},
	drawSign: function(a) {
		var b = -1;
		this.stackDown && (b = 1);
		var d = this.mastHeight * b,
			e = this.fontSize / 2 + 2,
			f = AmCharts.line(this.container, [0, 0], [0, d], this.borderColor, this.borderAlpha, 1),
			g = AmCharts.circle(this.container, e, this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha);
		g.translate(0, d + e * b);
		a.push(f);
		a.push(g);
		this.set.push(a);
		return g
	},
	drawFlag: function(a) {
		var b = -1;
		this.stackDown && (b = 1);
		var d = this.fontSize + 4,
			e = this.labelWidth + 6,
			f = this.mastHeight,
			b = 1 == b ? b * f : b * f - d,
			f = AmCharts.line(this.container, [0, 0], [0, b], this.borderColor, this.borderAlpha, 1),
			d = AmCharts.polygon(this.container, [0, e, e, 0], [0, 0, d, d], this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha);
		d.translate(0, b);
		a.push(f);
		a.push(d);
		this.set.push(a);
		return d
	},
	drawTriangleUp: function(a) {
		var b = this.fontSize + 7;
		return this.drawRealPolygon(a, [0, b / 2, -b / 2, 0], [0, b, b, 0])
	},
	drawArrowUp: function(a) {
		var b = this.size,
			d = b / 2,
			e = b / 4;
		return this.drawRealPolygon(a, [0, d, e, e, -e, -e, -d, 0], [0, d, d, b, b, d, d, 0])
	},
	drawArrowDown: function(a) {
		var b = this.size,
			d = b / 2,
			e = b / 4;
		return this.drawRealPolygon(a, [0, d, e, e, -e, -e, -d, 0], [0, -d, -d, -b, -b, -d, -d, 0])
	},
	drawTriangleDown: function(a) {
		var b = this.fontSize + 7;
		return this.drawRealPolygon(a, [0, b / 2, -b / 2, 0], [0, -b, -b, 0])
	},
	drawTriangleLeft: function(a) {
		var b = this.fontSize + 7;
		return this.drawRealPolygon(a, [0, b, b, 0], [0, -b / 2, b / 2])
	},
	drawTriangleRight: function(a) {
		var b = this.fontSize + 7;
		return this.drawRealPolygon(a, [0, -b, -b, 0], [0, -b / 2, b / 2, 0])
	},
	drawRealPolygon: function(a, b, d) {
		b = AmCharts.polygon(this.container, b, d, this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha);
		a.push(b);
		this.set.push(a);
		return b
	},
	drawCircle: function(a) {
		shape = AmCharts.circle(this.container, this.fontSize / 2, this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha);
		a.push(shape);
		this.set.push(a);
		return shape
	},
	drawTextBackground: function(a, b) {
		var d = b.getBBox(),
			e = -d.width / 2 - 5,
			f = d.width / 2 + 5,
			d = -d.height - 12;
		return this.drawRealPolygon(a, [e, -5, 0, 5, f, f, e, e], [-5, -5, 0, -5, -5, d, d, -5])
	},
	handleMouseOver: function(a, b) {
		b || this.bullets[a].attr({
			fill: this.rollOverColors[a]
		});
		var d = this.eventObjects[a],
			e = {
				type: "rollOverStockEvent",
				eventObject: d,
				graph: this.graph,
				date: this.date
			},
			f = this.bulletConfig.eventDispatcher;
		e.chart = f;
		f.fire(e.type, e);
		d.url && this.bullets[a].setAttr("cursor", "pointer");
		this.chart.showBalloon(d.description, "#CC0000", !0)
	},
	handleClick: function(a) {
		a = this.eventObjects[a];
		var b = {
			type: "clickStockEvent",
			eventObject: a,
			graph: this.graph,
			date: this.date
		},
			d = this.bulletConfig.eventDispatcher;
		b.chart = d;
		d.fire(b.type, b);
		b = a.urlTarget;
		b || (b = d.stockEventsSettings.urlTarget);
		AmCharts.getURL(a.url, b)
	},
	handleMouseOut: function(a) {
		this.bullets[a].attr({
			fill: this.backgroundColors[a]
		});
		a = {
			type: "rollOutStockEvent",
			eventObject: this.eventObjects[a],
			graph: this.graph,
			date: this.date
		};
		var b = this.bulletConfig.eventDispatcher;
		a.chart = b;
		b.fire(a.type, a)
	}
});
AmCharts.AmDraw = AmCharts.Class({
	construct: function(a, b, d) {
		AmCharts.SVG_NS = "http://www.w3.org/2000/svg";
		AmCharts.SVG_XLINK = "http://www.w3.org/1999/xlink";
		AmCharts.hasSVG = !! document.createElementNS && !! document.createElementNS(AmCharts.SVG_NS, "svg").createSVGRect;
		1 > b && (b = 10);
		1 > d && (d = 10);
		this.div = a;
		this.width = b;
		this.height = d;
		this.rBin = document.createElement("div");
		if (AmCharts.hasSVG) {
			AmCharts.SVG = !0;
			var e = this.createSvgElement("svg");
			e.style.position = "absolute";
			e.style.width = b + "px";
			e.style.height = d + "px";
			e.setAttribute("version", "1.1");
			a.appendChild(e);
			this.container = e;
			this.R = new AmCharts.SVGRenderer(this)
		} else AmCharts.isIE && AmCharts.VMLRenderer && (AmCharts.VML = !0, AmCharts.vmlStyleSheet || (document.namespaces.add("amvml", "urn:schemas-microsoft-com:vml"), b = document.createStyleSheet(), b.addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true"), AmCharts.vmlStyleSheet = b), this.container = a, this.R = new AmCharts.VMLRenderer(this), this.R.disableSelection(a))
	},
	createSvgElement: function(a) {
		return document.createElementNS(AmCharts.SVG_NS, a)
	},
	circle: function(a, b, d, e) {
		var f = new AmCharts.AmDObject("circle", this);
		f.attr({
			r: d,
			cx: a,
			cy: b
		});
		this.addToContainer(f.node, e);
		return f
	},
	setSize: function(a, b) {
		0 < a && 0 < b && (this.container.style.width = a + "px", this.container.style.height = b + "px")
	},
	rect: function(a, b, d, e, f, g, h) {
		var j = new AmCharts.AmDObject("rect", this);
		AmCharts.VML && (f = 100 * f / Math.min(d, e), d += 2 * g, e += 2 * g, j.bw = g, j.node.style.marginLeft = -g, j.node.style.marginTop = -g);
		1 > d && (d = 1);
		1 > e && (e = 1);
		j.attr({
			x: a,
			y: b,
			width: d,
			height: e,
			rx: f,
			ry: f,
			"stroke-width": g
		});
		this.addToContainer(j.node, h);
		return j
	},
	image: function(a, b, d, e, f, g) {
		var h = new AmCharts.AmDObject("image", this);
		h.attr({
			x: b,
			y: d,
			width: e,
			height: f
		});
		this.R.path(h, a);
		this.addToContainer(h.node, g);
		return h
	},
	addToContainer: function(a, b) {
		b || (b = this.container);
		b.appendChild(a)
	},
	text: function(a, b, d) {
		return this.R.text(a, b, d)
	},
	path: function(a, b, d, e) {
		var f = new AmCharts.AmDObject("path", this);
		e || (e = "100,100");
		f.attr({
			cs: e
		});
		d ? f.attr({
			dd: a
		}) : f.attr({
			d: a
		});
		this.addToContainer(f.node, b);
		return f
	},
	set: function(a) {
		return this.R.set(a)
	},
	remove: function(a) {
		if (a) {
			var b = this.rBin;
			b.appendChild(a);
			b.innerHTML = ""
		}
	},
	bounce: function(a, b, d, e, f) {
		return (b /= f) < 1 / 2.75 ? e * 7.5625 * b * b + d : b < 2 / 2.75 ? e * (7.5625 * (b -= 1.5 / 2.75) * b + 0.75) + d : b < 2.5 / 2.75 ? e * (7.5625 * (b -= 2.25 / 2.75) * b + 0.9375) + d : e * (7.5625 * (b -= 2.625 / 2.75) * b + 0.984375) + d
	},
	easeInSine: function(a, b, d, e, f) {
		return -e * Math.cos(b / f * (Math.PI / 2)) + e + d
	},
	easeOutSine: function(a, b, d, e, f) {
		return e * Math.sin(b / f * (Math.PI / 2)) + d
	},
	easeOutElastic: function(a, b, d, e, f) {
		a = 1.70158;
		var g = 0,
			h = e;
		if (0 == b) return d;
		if (1 == (b /= f)) return d + e;
		g || (g = 0.3 * f);
		h < Math.abs(e) ? (h = e, a = g / 4) : a = g / (2 * Math.PI) * Math.asin(e / h);
		return h * Math.pow(2, -10 * b) * Math.sin((b * f - a) * 2 * Math.PI / g) + e + d
	},
	renderFix: function() {
		var a = this.container,
			b = a.style,
			d;
		try {
			d = a.getScreenCTM() || a.createSVGMatrix()
		} catch (e) {
			d = a.createSVGMatrix()
		}
		a = 1 - d.e % 1;
		d = 1 - d.f % 1;
		0.5 < a && (a -= 1);
		0.5 < d && (d -= 1);
		a && (b.left = a + "px");
		d && (b.top = d + "px")
	}
});
AmCharts.AmDObject = AmCharts.Class({
	construct: function(a, b) {
		this.D = b;
		this.R = b.R;
		this.node = this.R.create(this, a);
		this.children = [];
		this.y = this.x = 0;
		this.scale = 1
	},
	attr: function(a) {
		this.R.attr(this, a);
		return this
	},
	getAttr: function(a) {
		return this.node.getAttribute(a)
	},
	setAttr: function(a, b) {
		this.R.setAttr(this, a, b);
		return this
	},
	clipRect: function(a, b, d, e) {
		this.R.clipRect(this, a, b, d, e)
	},
	translate: function(a, b, d, e) {
		e || (a = Math.round(a), b = Math.round(b));
		this.R.move(this, a, b, d);
		this.x = a;
		this.y = b;
		this.scale = d;
		this.angle && this.rotate(this.angle)
	},
	rotate: function(a) {
		this.R.rotate(this, a);
		this.angle = a
	},
	animate: function(a, b, d) {
		for (var e in a) {
			var f = e,
				g = a[e];
			d = AmCharts.getEffect(d);
			this.R.animate(this, f, g, b, d)
		}
	},
	push: function(a) {
		if (a) {
			var b = this.node;
			b.appendChild(a.node);
			var d = a.clipPath;
			d && b.appendChild(d);
			(d = a.grad) && b.appendChild(d);
			this.children.push(a)
		}
	},
	text: function(a) {
		this.R.setText(this, a)
	},
	remove: function() {
		this.R.remove(this)
	},
	clear: function() {
		var a = this.node;
		if (a.hasChildNodes()) for (; 1 <= a.childNodes.length;) a.removeChild(a.firstChild)
	},
	hide: function() {
		this.setAttr("visibility", "hidden")
	},
	show: function() {
		this.setAttr("visibility", "visible")
	},
	getBBox: function() {
		return this.R.getBBox(this)
	},
	toFront: function() {
		var a = this.node;
		if (a) {
			var b = a.parentNode;
			b && b.appendChild(a)
		}
	},
	toBack: function() {
		var a = this.node;
		if (a) {
			var b = a.parentNode;
			if (b) {
				var d = b.firstChild;
				d && b.insertBefore(a, d)
			}
		}
	},
	mouseover: function(a) {
		this.R.addListener(this, "mouseover", a);
		return this
	},
	mouseout: function(a) {
		this.R.addListener(this, "mouseout", a);
		return this
	},
	click: function(a) {
		this.R.addListener(this, "click", a);
		return this
	},
	dblclick: function(a) {
		this.R.addListener(this, "dblclick", a);
		return this
	},
	mousedown: function(a) {
		this.R.addListener(this, "mousedown", a);
		return this
	},
	mouseup: function(a) {
		this.R.addListener(this, "mouseup", a);
		return this
	},
	touchstart: function(a) {
		this.R.addListener(this, "touchstart", a);
		return this
	},
	touchend: function(a) {
		this.R.addListener(this, "touchend", a);
		return this
	},
	stop: function() {
		var a = this.animationX;
		a && AmCharts.removeFromArray(this.R.animations, a);
		(a = this.animationY) && AmCharts.removeFromArray(this.R.animations, a)
	},
	length: function() {
		return this.node.childNodes.length
	},
	gradient: function(a, b, d) {
		this.R.gradient(this, a, b, d)
	}
});
AmCharts.VMLRenderer = AmCharts.Class({
	construct: function(a) {
		this.D = a;
		this.cNames = {
			circle: "oval",
			rect: "roundrect",
			path: "shape"
		};
		this.styleMap = {
			x: "left",
			y: "top",
			width: "width",
			height: "height",
			"font-family": "fontFamily",
			"font-size": "fontSize",
			visibility: "visibility"
		};
		this.animations = []
	},
	create: function(a, b) {
		var d;
		if ("group" == b) d = document.createElement("div"), a.type = "div";
		else if ("text" == b) d = document.createElement("div"), a.type = "text";
		else if ("image" == b) d = document.createElement("img"), a.type = "image";
		else {
			a.type = "shape";
			a.shapeType = this.cNames[b];
			d = document.createElement("amvml:" + this.cNames[b]);
			var e = document.createElement("amvml:stroke");
			d.appendChild(e);
			a.stroke = e;
			var f = document.createElement("amvml:fill");
			d.appendChild(f);
			a.fill = f;
			f.className = "amvml";
			e.className = "amvml";
			d.className = "amvml"
		}
		d.style.position = "absolute";
		d.style.top = 0;
		d.style.left = 0;
		return d
	},
	path: function(a, b) {
		a.node.setAttribute("src", b)
	},
	setAttr: function(a, b, d) {
		if (void 0 !== d) {
			if (8 === document.documentMode) var e = !0;
			var f = a.node,
				g = a.type,
				h = f.style;
			"r" == b && (h.width = 2 * d, h.height = 2 * d);
			if ("roundrect" == a.shapeType && ("width" == b || "height" == b)) d -= 1;
			"cursor" == b && (h.cursor = d);
			"cx" == b && (h.left = d - AmCharts.removePx(h.width) / 2);
			"cy" == b && (h.top = d - AmCharts.removePx(h.height) / 2);
			var j = this.styleMap[b];
			void 0 != j && (h[j] = d);
			"text" == g && ("text-anchor" == b && (a.anchor = d, j = f.clientWidth, "end" == d && (h.marginLeft = -j + "px"), "middle" == d && (h.marginLeft = -(j / 2) + "px"), "start" == d && (h.marginLeft = "0px")), "fill" == b && (h.color = d), "font-weight" == b && (h.fontWeight = d));
			h = a.children;
			for (j = 0; j < h.length; j++) h[j].setAttr(b, d);
			if ("shape" == g) {
				"cs" == b && (f.style.width = "100px", f.style.height = "100px", f.setAttribute("coordsize", d));
				"d" == b && f.setAttribute("path", this.svgPathToVml(d));
				"dd" == b && f.setAttribute("path", d);
				g = a.stroke;
				a = a.fill;
				"stroke" == b && (e ? g.color = d : g.setAttribute("color", d));
				"stroke-width" == b && (e ? g.weight = d : g.setAttribute("weight", d));
				"stroke-opacity" == b && (e ? g.opacity = d : g.setAttribute("opacity", d));
				"stroke-dasharray" == b && (h = "solid", 0 < d && 3 > d && (h = "dot"), 3 <= d && 6 >= d && (h = "dash"), 6 < d && (h = "longdash"), e ? g.dashstyle = h : g.setAttribute("dashstyle", h));
				if ("fill-opacity" == b || "opacity" == b) 0 == d ? e ? a.on = !1 : a.setAttribute("on", !1) : e ? a.opacity = d : a.setAttribute("opacity", d);
				"fill" == b && (e ? a.color = d : a.setAttribute("color", d));
				"rx" == b && (e ? f.arcSize = d + "%" : f.setAttribute("arcsize", d + "%"))
			}
		}
	},
	attr: function(a, b) {
		for (var d in b) this.setAttr(a, d, b[d])
	},
	text: function(a, b, d) {
		var e = new AmCharts.AmDObject("text", this.D),
			f = e.node;
		f.style.whiteSpace = "pre";
		a = document.createTextNode(a);
		f.appendChild(a);
		this.D.addToContainer(f, d);
		this.attr(e, b);
		return e
	},
	getBBox: function(a) {
		return this.getBox(a.node)
	},
	getBox: function(a) {
		var b = a.offsetLeft,
			d = a.offsetTop,
			e = a.offsetWidth,
			f = a.offsetHeight,
			g;
		if (a.hasChildNodes()) {
			for (var h, j, k = 0; k < a.childNodes.length; k++) {
				g = this.getBox(a.childNodes[k]);
				var l = g.x;
				isNaN(l) || (isNaN(h) ? h = l : l < h && (h = l));
				var m = g.y;
				isNaN(m) || (isNaN(j) ? j = m : m < j && (j = m));
				l = g.width + l;
				isNaN(l) || (e = Math.max(e, l));
				g = g.height + m;
				isNaN(g) || (f = Math.max(f, g))
			}
			0 > h && (b += h);
			0 > j && (d += j)
		}
		return {
			x: b,
			y: d,
			width: e,
			height: f
		}
	},
	setText: function(a, b) {
		var d = a.node;
		d && (d.removeChild(d.firstChild), d.appendChild(document.createTextNode(b)));
		this.setAttr(a, "text-anchor", a.anchor)
	},
	addListener: function(a, b, d) {
		a.node["on" + b] = d
	},
	move: function(a, b, d) {
		var e = a.node,
			f = e.style;
		"text" == a.type && (d -= AmCharts.removePx(f.fontSize) / 2 - 1);
		"oval" == a.shapeType && (b -= AmCharts.removePx(f.width) / 2, d -= AmCharts.removePx(f.height) / 2);
		a = a.bw;
		isNaN(a) || (b -= a, d -= a);
		e.style.left = b + "px";
		e.style.top = d + "px"
	},
	svgPathToVml: function(a) {
		var b = a.split(" ");
		a = "";
		for (var d, e = Math.round, f = 0; f < b.length; f++) {
			var g = b[f],
				h = g.substring(0, 1),
				g = g.substring(1),
				j = g.split(","),
				k = e(j[0]) + "," + e(j[1]);
			"M" == h && (a += " m " + k);
			"L" == h && (a += " l " + k);
			"Z" == h && (a += " x e");
			if ("Q" == h) {
				var l = d.length,
					m = d[l - 1],
					n = j[0],
					t = j[1],
					k = j[2],
					r = j[3];
				d = e(d[l - 2] / 3 + 2 / 3 * n);
				m = e(m / 3 + 2 / 3 * t);
				n = e(2 / 3 * n + k / 3);
				t = e(2 / 3 * t + r / 3);
				a += " c " + d + "," + m + "," + n + "," + t + "," + k + "," + r
			}
			"A" == h && (a += " wa " + g);
			"B" == h && (a += " at " + g);
			d = j
		}
		return a
	},
	animate: function(a, b, d, e, f) {
		var g = this,
			h = a.node;
		if ("translate" == b) {
			var j = d.split(",");
			b = j[1];
			d = h.offsetTop;
			h = {
				obj: a,
				frame: 0,
				attribute: "left",
				from: h.offsetLeft,
				to: j[0],
				time: e,
				effect: f
			};
			g.animations.push(h);
			e = {
				obj: a,
				frame: 0,
				attribute: "top",
				from: d,
				to: b,
				time: e,
				effect: f
			};
			g.animations.push(e);
			a.animationX = h;
			a.animationY = e
		}
		g.interval || (g.interval = setInterval(function() {
			g.updateAnimations.call(g)
		}, AmCharts.updateRate))
	},
	updateAnimations: function() {
		for (var a = this.animations.length - 1; 0 <= a; a--) {
			var b = this.animations[a],
				d = 1E3 * b.time / AmCharts.updateRate,
				e = b.frame + 1,
				f = b.obj,
				g = b.attribute;
			if (e <= d) {
				b.frame++;
				var h = Number(b.from),
					j = Number(b.to) - h,
					b = this.D[b.effect](0, e, h, j, d);
				0 == j ? this.animations.splice(a, 1) : f.node.style[g] = b
			} else f.node.style[g] = Number(b.to), this.animations.splice(a, 1)
		}
	},
	clipRect: function(a, b, d, e, f) {
		a.node.style.clip = "rect(" + d + "px " + (b + e) + "px " + (d + f) + "px " + b + "px)"
	},
	rotate: function(a, b) {
		var d = a.node,
			e = d.style,
			f = this.getBGColor(d.parentNode);
		e.backgroundColor = f;
		e.paddingLeft = 1;
		var f = b * Math.PI / 180,
			g = Math.cos(f),
			h = Math.sin(f),
			j = AmCharts.removePx(e.left),
			k = AmCharts.removePx(e.top),
			l = d.offsetWidth,
			d = d.offsetHeight,
			m = b / Math.abs(b);
		e.left = j + l / 2 - l / 2 * Math.cos(f) - m * d / 2 * Math.sin(f) + 3;
		e.top = k - m * l / 2 * Math.sin(f) + m * d / 2 * Math.sin(f);
		e.cssText = e.cssText + "; filter:progid:DXImageTransform.Microsoft.Matrix(M11='" + g + "', M12='" + -h + "', M21='" + h + "', M22='" + g + "', sizingmethod='auto expand');"
	},
	getBGColor: function(a) {
		var b = "#FFFFFF";
		if (a.style) {
			var d = a.style.backgroundColor;
			"" != d ? b = d : a.parentNode && (b = this.getBGColor(a.parentNode))
		}
		return b
	},
	set: function(a) {
		var b = new AmCharts.AmDObject("group", this.D);
		this.D.container.appendChild(b.node);
		if (a) for (var d = 0; d < a.length; d++) b.push(a[d]);
		return b
	},
	gradient: function(a, b, d, e) {
		var f = "";
		"radialGradient" == b && (b = "gradientradial", d.reverse());
		"linearGradient" == b && (b = "gradient");
		for (var g = 0; g < d.length; g++) {
			var h = Math.round(100 * g / (d.length - 1)),
				f = f + (h + "% " + d[g]);
			g < d.length - 1 && (f += ",")
		}
		a = a.fill;
		90 == e ? e = 0 : 270 == e ? e = 180 : 180 == e ? e = 90 : 0 == e && (e = 270);
		8 === document.documentMode ? (a.type = b, a.angle = e) : (a.setAttribute("type", b), a.setAttribute("angle", e));
		f && (a.colors.value = f)
	},
	remove: function(a) {
		a.clipPath && this.D.remove(a.clipPath);
		this.D.remove(a.node)
	},
	disableSelection: function(a) {
		void 0 != typeof a.onselectstart && (a.onselectstart = function() {
			return !1
		});
		a.style.cursor = "default"
	}
});
AmCharts.SVGRenderer = AmCharts.Class({
	construct: function(a) {
		this.D = a;
		this.animations = []
	},
	create: function(a, b) {
		return document.createElementNS(AmCharts.SVG_NS, b)
	},
	attr: function(a, b) {
		for (var d in b) this.setAttr(a, d, b[d])
	},
	setAttr: function(a, b, d) {
		void 0 !== d && a.node.setAttribute(b, d)
	},
	animate: function(a, b, d, e, f) {
		var g = this,
			h = a.node;
		"translate" == b ? (h = (h = h.getAttribute("transform")) ? String(h).substring(10, h.length - 1) : "0,0", h = h.split(", ").join(" "), h = h.split(" ").join(","), 0 == h && (h = "0,0")) : h = h.getAttribute(b);
		b = {
			obj: a,
			frame: 0,
			attribute: b,
			from: h,
			to: d,
			time: e,
			effect: f
		};
		g.animations.push(b);
		a.animationX = b;
		g.interval || (g.interval = setInterval(function() {
			g.updateAnimations.call(g)
		}, AmCharts.updateRate))
	},
	updateAnimations: function() {
		for (var a = this.animations.length - 1; 0 <= a; a--) {
			var b = this.animations[a],
				d = 1E3 * b.time / AmCharts.updateRate,
				e = b.frame + 1,
				f = b.obj,
				g = b.attribute;
			if (e <= d) {
				b.frame++;
				if ("translate" == g) var h = b.from.split(","),
					g = Number(h[0]),
					h = Number(h[1]),
					j = b.to.split(","),
					k = Number(j[0]),
					j = Number(j[1]),
					k = 0 == k - g ? k : Math.round(this.D[b.effect](0, e, g, k - g, d)),
					b = 0 == j - h ? j : Math.round(this.D[b.effect](0, e, h, j - h, d)),
					g = "transform",
					b = "translate(" + k + "," + b + ")";
				else h = Number(b.from), k = Number(b.to), k -= h, b = this.D[b.effect](0, e, h, k, d), 0 == k && this.animations.splice(a, 1);
				this.setAttr(f, g, b)
			} else "translate" == g ? (j = b.to.split(","), k = Number(j[0]), j = Number(j[1]), f.translate(k, j)) : (k = Number(b.to), this.setAttr(f, g, k)), this.animations.splice(a, 1)
		}
	},
	getBBox: function(a) {
		if (a = a.node) try {
			return a.getBBox()
		} catch (b) {}
		return {
			width: 0,
			height: 0,
			x: 0,
			y: 0
		}
	},
	path: function(a, b) {
		a.node.setAttributeNS(AmCharts.SVG_XLINK, "xlink:href", b)
	},
	clipRect: function(a, b, d, e, f) {
		var g = a.node,
			h = a.clipPath;
		h && this.D.remove(h);
		var j = g.parentNode;
		j && (g = document.createElementNS(AmCharts.SVG_NS, "clipPath"), h = AmCharts.getUniqueId(), g.setAttribute("id", h), this.D.rect(b, d, e, f, 0, 0, g), j.appendChild(g), b = "#", AmCharts.baseHref && !AmCharts.isIE && (b = window.location.href + b), this.setAttr(a, "clip-path", "url(" + b + h + ")"), this.clipPathC++, a.clipPath = g)
	},
	text: function(a, b, d) {
		var e = new AmCharts.AmDObject("text", this.D);
		a = String(a).split("\n");
		for (var f = b["font-size"], g = 0; g < a.length; g++) {
			var h = this.create(null, "tspan");
			h.appendChild(document.createTextNode(a[g]));
			h.setAttribute("y", (f + 2) * g + f / 2 + 0);
			h.setAttribute("x", 0);
			e.node.appendChild(h)
		}
		e.node.setAttribute("y", f / 2 + 0);
		this.attr(e, b);
		this.D.addToContainer(e.node, d);
		return e
	},
	setText: function(a, b) {
		var d = a.node;
		d && (d.removeChild(d.firstChild), d.appendChild(document.createTextNode(b)))
	},
	move: function(a, b, d, e) {
		b = "translate(" + b + "," + d + ")";
		e && (b = b + " scale(" + e + ")");
		this.setAttr(a, "transform", b)
	},
	rotate: function(a, b) {
		var d = a.node.getAttribute("transform"),
			e = "rotate(" + b + ")";
		d && (e = d + " " + e);
		this.setAttr(a, "transform", e)
	},
	set: function(a) {
		var b = new AmCharts.AmDObject("g", this.D);
		this.D.container.appendChild(b.node);
		if (a) for (var d = 0; d < a.length; d++) b.push(a[d]);
		return b
	},
	addListener: function(a, b, d) {
		a.node["on" + b] = d
	},
	gradient: function(a, b, d, e) {
		var f = a.node,
			g = a.grad;
		g && this.D.remove(g);
		b = document.createElementNS(AmCharts.SVG_NS, b);
		g = AmCharts.getUniqueId();
		b.setAttribute("id", g);
		if (!isNaN(e)) {
			var h = 0,
				j = 0,
				k = 0,
				l = 0;
			90 == e ? k = 100 : 270 == e ? l = 100 : 180 == e ? h = 100 : 0 == e && (j = 100);
			b.setAttribute("x1", h + "%");
			b.setAttribute("x2", j + "%");
			b.setAttribute("y1", k + "%");
			b.setAttribute("y2", l + "%")
		}
		for (e = 0; e < d.length; e++) h = document.createElementNS(AmCharts.SVG_NS, "stop"), j = 100 * e / (d.length - 1), 0 == e && (j = 0), h.setAttribute("offset", j + "%"), h.setAttribute("stop-color", d[e]), b.appendChild(h);
		f.parentNode.appendChild(b);
		d = "#";
		AmCharts.baseHref && !AmCharts.isIE && (d = window.location.href + d);
		f.setAttribute("fill", "url(" + d + g + ")");
		a.grad = b
	},
	remove: function(a) {
		a.clipPath && this.D.remove(a.clipPath);
		a.grad && this.D.remove(a.grad);
		this.D.remove(a.node)
	}
});
AmCharts.AmDSet = AmCharts.Class({
	construct: function() {
		this.create("g")
	},
	attr: function(a) {
		this.R.attr(this.node, a)
	},
	move: function(a, b) {
		this.R.move(this.node, a, b)
	}
});