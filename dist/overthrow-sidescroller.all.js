/*! overthrow-sidescroller - A sidescroller component based on overthrow. - v0.1.1 - 2014-09-12
* Copyright (c) 2014 Scott Jehl, Filament Group, Inc.; Licensed MIT */
!function(a){var b=a.document,c=b.documentElement,d="overthrow-enabled",e="ontouchmove"in b,f="WebkitOverflowScrolling"in c.style||"msOverflowStyle"in c.style||!e&&a.screen.width>800||function(){var b=a.navigator.userAgent,c=b.match(/AppleWebKit\/([0-9]+)/),d=c&&c[1],e=c&&d>=534;return b.match(/Android ([0-9]+)/)&&RegExp.$1>=3&&e||b.match(/ Version\/([0-9]+)/)&&RegExp.$1>=0&&a.blackberry&&e||b.indexOf("PlayBook")>-1&&e&&-1===!b.indexOf("Android 2")||b.match(/Firefox\/([0-9]+)/)&&RegExp.$1>=4||b.match(/wOSBrowser\/([0-9]+)/)&&RegExp.$1>=233&&e||b.match(/NokiaBrowser\/([0-9\.]+)/)&&7.3===parseFloat(RegExp.$1)&&c&&d>=533}();a.overthrow={},a.overthrow.enabledClassName=d,a.overthrow.addClass=function(){-1===c.className.indexOf(a.overthrow.enabledClassName)&&(c.className+=" "+a.overthrow.enabledClassName)},a.overthrow.removeClass=function(){c.className=c.className.replace(a.overthrow.enabledClassName,"")},a.overthrow.set=function(){f&&a.overthrow.addClass()},a.overthrow.canBeFilledWithPoly=e,a.overthrow.forget=function(){a.overthrow.removeClass()},a.overthrow.support=f?"native":"none"}(this),function(a,b,c){if(b!==c){b.easing=function(a,b,c,d){return c*((a=a/d-1)*a*a+1)+b},b.tossing=!1;var d;b.toss=function(a,e){b.intercept();var f,g,h=0,i=a.scrollLeft,j=a.scrollTop,k={top:"+0",left:"+0",duration:50,easing:b.easing};if(e)for(var l in k)e[l]!==c&&(k[l]=e[l]);return"string"==typeof k.left?(k.left=parseFloat(k.left),f=k.left+i):(f=k.left,k.left=k.left-i),"string"==typeof k.top?(k.top=parseFloat(k.top),g=k.top+j):(g=k.top,k.top=k.top-j),b.tossing=!0,d=setInterval(function(){h++<k.duration?(a.scrollLeft=k.easing(h,i,k.left,k.duration),a.scrollTop=k.easing(h,j,k.top,k.duration)):(f!==a.scrollLeft&&(a.scrollLeft=f),g!==a.scrollTop&&(a.scrollTop=g),b.intercept())},1),{top:g,left:f,duration:b.duration,easing:b.easing}},b.intercept=function(){clearInterval(d),b.tossing=!1}}}(this,this.overthrow),function(a,b,c){if(b!==c){b.scrollIndicatorClassName="overthrow";var d=a.document,e=d.documentElement,f="native"===b.support,g=b.canBeFilledWithPoly,h=(b.configure,b.set),i=b.forget,j=b.scrollIndicatorClassName;b.closest=function(a,c){return!c&&a.className&&a.className.indexOf(j)>-1&&a||b.closest(a.parentNode)};var k=!1;b.set=function(){if(h(),!k&&!f&&g){a.overthrow.addClass(),k=!0,b.support="polyfilled",b.forget=function(){i(),k=!1,d.removeEventListener&&d.removeEventListener("touchstart",u,!1)};var j,l,m,n,o=[],p=[],q=function(){o=[],l=null},r=function(){p=[],m=null},s=function(a){n=j.querySelectorAll("textarea, input");for(var b=0,c=n.length;c>b;b++)n[b].style.pointerEvents=a},t=function(a,b){if(d.createEvent){var e,f=(!b||b===c)&&j.parentNode||j.touchchild||j;f!==j&&(e=d.createEvent("HTMLEvents"),e.initEvent("touchend",!0,!0),j.dispatchEvent(e),f.touchchild=j,j=f,f.dispatchEvent(a))}},u=function(a){if(b.intercept&&b.intercept(),q(),r(),j=b.closest(a.target),j&&j!==e&&!(a.touches.length>1)){s("none");var c=a,d=j.scrollTop,f=j.scrollLeft,g=j.offsetHeight,h=j.offsetWidth,i=a.touches[0].pageY,k=a.touches[0].pageX,n=j.scrollHeight,u=j.scrollWidth,v=function(a){var b=d+i-a.touches[0].pageY,e=f+k-a.touches[0].pageX,s=b>=(o.length?o[0]:0),v=e>=(p.length?p[0]:0);b>0&&n-g>b||e>0&&u-h>e?a.preventDefault():t(c),l&&s!==l&&q(),m&&v!==m&&r(),l=s,m=v,j.scrollTop=b,j.scrollLeft=e,o.unshift(b),p.unshift(e),o.length>3&&o.pop(),p.length>3&&p.pop()},w=function(){s("auto"),setTimeout(function(){s("none")},450),j.removeEventListener("touchmove",v,!1),j.removeEventListener("touchend",w,!1)};j.addEventListener("touchmove",v,!1),j.addEventListener("touchend",w,!1)}};d.addEventListener("touchstart",u,!1)}}}}(this,this.overthrow),function(a){a.overthrow.set()}(this);

(function( w, o ){
	if( !o || !"querySelector" in w.document ){
		return;
	}

	function sendEvent( elem, evt, args, ieID ){
		// TODO needs IE8 support
		if( document.createEvent ){
			var event = document.createEvent( "Event" );
			event.initEvent( evt, true, true );
			event.overthrow = args;
			elem.dispatchEvent( event );
		}
		else {
			w.document.documentElement[ieID][ evt ] = {
				e: evt,
				overthrow: args
			};
			w.document.documentElement[ evt ]++;
		}
	}

	o.sidescroller = function( elems, options ){
		var scrolls = elems,
			evtPrefix = "overthrow",
			evtNext = evtPrefix + "-next",
			evtPrev = evtPrefix + "-prev",
			evtMethod = evtPrefix + "-method",
			evtRefresh = evtPrefix + "-refresh",
			evtResize = evtPrefix + "-resize",
			disabledClassStr = " disabled",
			snapScroll = options && options.snapScroll,
			skip = options && options.skipLinks,
			rewind = options && options.rewind,
			snapTolerance = options && options.snapTolerance !== undefined ? options.snapTolerance : 30,
			args = arguments;

			options = options || {};

		for( var i = 0; i < scrolls.length; i++ ){

			(function(){
				var thisSideScroll = scrolls[ i ],
					thisScroll = scrolls[ i ].querySelector( ".overthrow" ),
					nextPrev = w.document.createElement( "div" ),
					slideNum = 0,
					ieID = "overthrow" + (new Date().getTime()),
					handled = false,
					controls = "<a href='#' class='sidescroll-prev'>Previous</a>" +
						"<a href='#' class='sidescroll-next'>Next</a>",
					skiplinks = "<a href='#' class='sidescroll-rwd'>First</a>" +
						"<a href='#' class='sidescroll-ff'>Last</a>";

				// The second check for options prevents methods from being run on
				// uninitialized overthrow elements
				if( typeof options === "string"	&& thisSideScroll.options ) {
					sendEvent(
						thisSideScroll, // elem to receive event
						evtMethod,
						{ "name": options, "arguments": Array.prototype.slice.call(args, 2) },
						thisSideScroll.ieID
					);

					refresh( thisSideScroll.options );

					return;
				}

				// prevent re-init
				if( thisSideScroll.initialized ){
					return;
				}

				thisSideScroll.initialized = true;
				thisSideScroll.options = options;
				thisSideScroll.setAttribute( "tabindex", "0" );

				// oldIE will need some expando event props
				// TODO move to method
				if( w.document.attachEvent ){
					// these are iterators to trigger a property mutate event in IE8
					w.document.documentElement[ evtPrev ] = 0;
					w.document.documentElement[ evtNext ] = 0;
					w.document.documentElement[ evtMethod ] = 0;
					w.document.documentElement[ evtRefresh ] = 0;
					w.document.documentElement[ evtResize ] = 0;

					// these for for the event data when that property iterates
					w.document.documentElement[ ieID ] = {};
					w.document.documentElement[ ieID ][ evtPrev ] = {};
					w.document.documentElement[ ieID ][ evtNext ] = {};
					w.document.documentElement[ ieID ][ evtMethod ] = {};
					w.document.documentElement[ ieID ][ evtRefresh ] = {};
					w.document.documentElement[ ieID ][ evtResize ] = {};

					thisSideScroll.ieID = ieID;
				}

				nextPrev.className = "sidescroll-nextprev-links";

				if( skip ) {
					controls = controls + skiplinks;
				}
				nextPrev.innerHTML = controls;

				function setSlideWidths(){
					var slides = thisScroll.querySelectorAll( "li" ),
						percent = 100 / slides.length + "%";
					for( var i = 0; i < slides.length; i++ ){
						slides[ i ].style.width = percent;
					}
				}

				function setScrollableWidth(){
					var slides = thisScroll.querySelectorAll( "li" ),
						container = thisScroll.querySelector( "ul" ),
						width = slides[0].offsetWidth;

					// check to make sure scroller is not display: none
					if( width ) {
						container.style.width = (width * slides.length) + "px";
					}
				}

				function refresh( options ) {
					if( !options || !options.fixedItemWidth ) {
						setSlideWidths();
					} else {
						setScrollableWidth();
					}

					sendEvent(
						thisSideScroll, // elem to receive event
						evtRefresh,
						{},
						thisSideScroll.ieID
					);
				}

				function getActiveSlides( left ){
					var slides = thisScroll.querySelectorAll( "li" ),
						numSlides = slides.length,
						slidesWidth = thisScroll.offsetWidth,
						slideWidth = slides[ 0 ].offsetWidth,
						scrollLeft = left !== undefined ? left : thisScroll.scrollLeft,
						startSlide = Math.ceil( scrollLeft / slideWidth ),
						tolerance = 10,
						ret = [];

					startSlide = Math.max( 0, startSlide );
					startSlide = Math.min( numSlides, startSlide );

					ret.push(startSlide);
					for( var i = 2; i < numSlides; i++ ){
						if( i * slideWidth < slidesWidth + tolerance ) {
							ret.push( startSlide + i - 1 );
						}
					}

					slideNum = startSlide;
					return ret;
				}

				function determineSlideLength( activeSlides, opts ){
					var slideLength = 1;
					if( opts && opts.slideLength ){
						if( opts.slideLength === "all" ){
							slideLength = activeSlides.length;
						} else {
							slideLength = parseInt( opts.slideLength, 10 );
						}
					}

					if( isNaN( slideLength ) ){
						slideLength = 1;
					}
					return slideLength;
				}

				// expose the getactiveslides function on the overthrow element
				thisSideScroll.getActiveSlides = getActiveSlides;

				function handleClick( evt ){

					var e = evt || w.event;

					if( e.preventDefault ){
						e.preventDefault();
					}
					else{
						e.returnValue = false;
					}

					if( e.type === "keydown" || ( handled === false || handled === e.type ) ){
						handled = e.type;

						o.intercept();
						var slides = thisScroll.querySelectorAll( "li" ),
							target = e.target || e.srcElement,
							slidesWidth = thisScroll.offsetWidth,
							slideWidth = slides[ 0 ].offsetWidth,
							currScroll = thisScroll.scrollLeft,
							slideNum = Math.round( currScroll / slideWidth ),
							ff = target.className.indexOf( "ff" ) > -1,
							rwd = target.className.indexOf( "rwd" ) > -1,
							next = (e.type !== "keydown" && target.className.indexOf( "next" ) > -1) || e.keyCode === 39,
							slideLength = determineSlideLength( getActiveSlides(), options ),
							newSlide = slideNum + ( next ? slideLength : -slideLength ),
							newScroll = slideWidth * newSlide,
							scrollWidth = thisScroll.scrollWidth - slidesWidth;

						if( target && target.nodeName !== "A" ){
							return;
						}
						if( rwd ) {
							newScroll = 0;
						}
						if( ff ) {
							newScroll = scrollWidth;
						}
						// if can't go left, go to end
						if( rewind ){

							if( newScroll < 0 ){
								newScroll = scrollWidth;
							}
							else if( newScroll > scrollWidth ){
								newScroll = 0;
							}
						}
						else {
							if( newScroll < 0 ){
								newScroll = 0;
							}
							else if( newScroll > scrollWidth ){
								newScroll = scrollWidth;
							}
						}

						var newActive = getActiveSlides( newScroll );

						// if we're planning to show the last slide, force the scroll out to the
						// end of the scrollable area. Necessary to force partially displayed
						// elements when the scroll is manual (not snapped) or the elements are
						// fixed width

						// TODO might be jarring, consider sorting the active slides as a right
						//			offset instead of just forcing the last distance.
						if( newActive[newActive.length - 1] == slides.length - 1 ) {
							newScroll = thisScroll.querySelector( "ul" ).offsetWidth - slidesWidth;
						}

						// TODO probably only need the second condition1
						if( newActive[ 0 ] !== slideNum || newScroll !== currScroll ){

							o.toss( thisScroll, {
								left: newScroll,
								easing: options.easing
							});

							sendEvent(
								thisSideScroll, // elem to receive event
								next ? evtNext : evtPrev, // evt name
								{
									active: newActive, // active slides
									originalEvent: e
								},
								ieID
							);
						}

						setTimeout( function(){ handled = false; }, 900 );
					}
				}

				var scrollStart = false;
				function handleSnap( e ){
					o.intercept();
					var slideWidth = thisScroll.querySelector( "li" ).offsetWidth,
						currScroll = thisScroll.scrollLeft,
						newSlide = Math.round( currScroll / slideWidth );

					if( scrollStart !== false ){
						var distScrolled = currScroll - scrollStart;
						if( Math.abs( distScrolled ) > snapTolerance ){
							newSlide = slideNum + ( distScrolled > 0 ? 1 : -1 );
						}

					}

					var newScroll = slideWidth * newSlide;

					o.toss( thisScroll, {
						left: newScroll,
						duration: 20,
						easing: options.easing
					});

					if( slideNum !== newSlide ){
						sendEvent(
							thisSideScroll, // elem to receive event
							newSlide > slideNum ? evtNext : evtPrev, // evt name
							{
								active: getActiveSlides( newScroll ), // active slides
								originalEvent: e
							},
							ieID
						);
						slideNum = newSlide;
					}
				}

				var debounce;
				function handleResize( e ){
					clearTimeout(debounce);
					debounce = setTimeout(function(){
						sendEvent( thisSideScroll, evtPrefix + "-resize", {}, thisSideScroll.ieID );
						handleSnap( e );
					}, 100);
				}

				var debouncedos;
				function handleScroll( e ){
					if( overthrow.tossing ){
						return;
					}
					clearTimeout( debouncedos );
					debouncedos = setTimeout(function(){
						if( scrollStart === false ){
							scrollStart = thisScroll.scrollLeft;
						}
						if( snapScroll ){
							handleSnap( e );
						} else {
							sendEvent( thisSideScroll,	evtPrefix + "-scroll", {}, ieID );
						}

						scrollStart = false;
					}, 200);
				}

				function handleKey( e ){
					if( e.keyCode === 39 || e.keyCode === 37 ){
						handleClick( e );
					}
				}

				if( w.document.addEventListener ){
					nextPrev.addEventListener( "click", handleClick, false );
					nextPrev.addEventListener( "touchend", handleClick, false );
					w.addEventListener( "resize", handleResize, false );
					scrolls[ i ].addEventListener( "keydown", handleKey, false );

					thisScroll.addEventListener( "scroll", handleScroll, false );
				}
		 		else if( w.document.attachEvent ){
		 			nextPrev.attachEvent( "onclick", handleClick, false );
					w.attachEvent( "onresize", handleResize, false );
					scrolls[ i ].attachEvent( "onkeydown", handleKey, false );

					thisScroll.attachEvent( "onscroll", handleScroll, false );
		 		}

				thisSideScroll.insertBefore( nextPrev, thisScroll );

				refresh( options );

				// Todo this seems really fragile
				// side scroller init for plugins
				sendEvent(
					w.document.documentElement,
					evtPrefix + "-init",
					{ sideScroll: thisSideScroll, options: options },
					w.document.documentElement.ieID
				);
			}());
		}
	};

	// setup the document element to work with overthrow init
	// TODO use the body element, this feels super iffy
	if( w.document.attachEvent ){
		var initId = "overthrow-init" + (new Date().getTime());

		w.document.documentElement[ initId ] = {};
		w.document.documentElement[ initId ][ "overthrow-init" ] = 0;
		w.document.documentElement.ieID = initId;
	}

	o.sidescroller.onEvent = function( evt, elem, callback ){
		function cb( args ){
			var e = {
				type: evt,
				target: elem,
				overthrow: args.overthrow
			};
			callback( e );
		}
		if( w.document.addEventListener ){
			elem.addEventListener( evt, cb );
		}
		else if( w.document.attachEvent ){
			w.document.documentElement.attachEvent( "onpropertychange", function( event ) {
				if( event.propertyName === evt ){
					cb( w.document.documentElement[ elem.ieID ][ evt ] );
				}
			});
		}
	};
}( this, this.overthrow ));

(function(w, overthrow) {
	var lib = overthrow.sidescroller;

	function append( event ) {
		var options = event.overthrow || {}, append, scroller, ul;

		if( options.name !== "append" ){
			return;
		}

		append = options.arguments[0];
		scroller = event.target || event.srcElement;
		ul = scroller.querySelector( "ul" );

		// make sure the new element doesn't jog the scroll bar
		append.style.visibility = "hidden";
		append.style.position = "absolute";

		// add the new element to the dom so we can get an accurate width
		ul.appendChild( append );
		ul.style.width = (ul.offsetWidth + append.offsetWidth) + "px";

		// return the element to normal operating for the purposes of the scroller
		append.style.visibility = "visible";
		append.style.position = "static";
	}

	lib.onEvent( "overthrow-init", w.document.documentElement, function( event ) {
		var scroller = event.overthrow.sideScroll,
			options = event.overthrow.options || {};

		lib.onEvent( "overthrow-method", scroller, append);
	});
})( this, this.overthrow );


(function(w, overthrow) {
	var lib = overthrow.sidescroller,
		beforeEvt = "overthrow-before-goto",
		evt = "overthrow-goto";

	function sendEvent( elem, evt, args, ieID ){
		// TODO needs IE8 support
		if( document.createEvent ){
			var event = document.createEvent( "Event" );
			event.initEvent( evt, true, true );
			event.overthrow = args;
			elem.dispatchEvent( event );
		}
		else {
			w.document.documentElement[ieID][ evt ] = {
				e: evt,
				overthrow: args
			};
			w.document.documentElement[ evt ]++;
		}
	}

	function determineNewSlide( num, currSlideNum ){
		var newSlide = 0, relative = false, sign;

		if( typeof num === "string" ){
			sign = num.charAt( 0 );
			if( sign === "+" || sign === "-" ){
				relative = true;
			}
		}
		if( relative ){
			newSlide = parseInt( num, 10 ) + currSlideNum;
		} else {
			newSlide = parseInt( num, 10 );
		}
		return newSlide;
	}

	function goTo( event ) {
		var options = event.overthrow || {}, goto, scroller, ul, thisScroll;

		if( options.name !== "goTo" ){
			return;
		}

		goto = options.arguments[0];
		scroller = event.target || event.srcElement;
		thisScroll = scroller.querySelector( ".overthrow" );
		ul = scroller.querySelector( "ul" );

		var slides = ul.querySelectorAll( "li" ),
			slidesWidth = thisScroll.offsetWidth,
			slideWidth = slides[ 0 ].offsetWidth,
			currScroll = thisScroll.scrollLeft,
			currSlideNum = Math.round( currScroll / slideWidth ),
			newSlide = determineNewSlide( goto, currSlideNum ),
			newScroll = slideWidth * newSlide,
			scrollWidth = thisScroll.scrollWidth - slidesWidth;

		if( newScroll < 0 ){
			newScroll = 0;
		} else if( newScroll > scrollWidth ){
			newScroll = scrollWidth;
		}

		var newActive = scroller.getActiveSlides( newScroll );

		sendEvent( scroller,
			beforeEvt,
			goto,
			scroller.ieID );

		overthrow.toss( thisScroll, {
			left: newScroll,
			easing: options.easing,
			finished: function() {
				sendEvent( scroller,
					evt,
					goto,
					scroller.ieID );
			}
		});
	}

	lib.onEvent( "overthrow-init", w.document.documentElement, function( event ) {
		var scroller = event.overthrow.sideScroll,
			options = event.overthrow.options || {};

		// register the events
		if( w.document.attachEvent ){
			w.document.documentElement[ evt ] = 0;
			w.document.documentElement[ beforeEvt ] = 0;

			w.document.documentElement[ scroller.ieID ][ evt ] = {};
			w.document.documentElement[ scroller.ieID ][ beforeEvt ] = {};
		}

		lib.onEvent( "overthrow-method", scroller, goTo);
	});
})( this, this.overthrow );

(function(w, overthrow) {
	var rewind, disabledClassStr = " disabled", lib = overthrow.sidescroller;

	// NOTE not a general purpose add class, whitespace accounting done externally
	function addClass( element, classStr ) {
		element.setAttribute( "class", element.getAttribute( "class" ).replace( classStr, "" ));
		element.setAttribute( "class", element.getAttribute( "class" ) + classStr );
	}

	// NOTE not a general purpose remove class, whitespace accounting done externally
	function removeClass( element, classStr ) {
		element.setAttribute( "class", element.getAttribute( "class" ).replace( classStr, "" ));
	}

	function toggleNavigationEvent( event ) {
		event = event || w.event;

		// if this comes from a click or a snap use the active pages
		// calculation provided as an event property, otherwise use
		// the scroll calculation
		toggleNavigation( event.target || event.srcElement, event && event.overthrow && event.overthrow.active );
	}

	function toggleNavigation( target, active, useActiveSlide ) {
		if( rewind ) {
			return;
		}

		var disablePrev = false, disableNext = false,
				slides, slidesWidth, currScroll, scrollWidth, activeSlide,
				nextAnchor, prevAnchor, thisScroll, rwdAnchor, ffAnchor, anchors;


		anchors = target.querySelector( ".sidescroll-nextprev-links" );
		nextAnchor = target.querySelector( "a.sidescroll-next" );
		prevAnchor = target.querySelector( "a.sidescroll-prev" );
		rwdAnchor = target.querySelector( "a.sidescroll-rwd" );
		ffAnchor = target.querySelector( "a.sidescroll-ff" );
		activeSlide = target.querySelector( "li.active" );
		thisScroll = target.querySelector( ".overthrow" );

		if( active ) {
			slides = thisScroll.querySelectorAll( "li" );

			disablePrev = (active[0] == 0);
			disableNext = (active[active.length - 1] >= slides.length - 1);
		} else {
			slidesWidth = thisScroll.offsetWidth,
			currScroll = thisScroll.scrollLeft,
			scrollWidth = thisScroll.scrollWidth - slidesWidth;

			if( useActiveSlide && activeSlide ) {
				disablePrev = !activeSlide.previousElementSibling;
			} else {
				disablePrev = currScroll < 5;
			}
			disableNext = currScroll > scrollWidth - 5;
		}

		removeClass( nextAnchor, disabledClassStr );
		removeClass( prevAnchor, disabledClassStr );

		if( ffAnchor ) {
			removeClass( ffAnchor, disabledClassStr );
		}

		if( rwdAnchor ) {
			removeClass( rwdAnchor, disabledClassStr );
		}

		// if the user can't go anywhere provide for hiding the nav links
		if( disablePrev && disableNext ){
			addClass( anchors, disabledClassStr );
		}

		// if the user can't go back provide for hiding the prev/rewind nav links
		if( disablePrev ) {
			addClass( prevAnchor, disabledClassStr );

			if( rwdAnchor ) {
				addClass( rwdAnchor, disabledClassStr );
			}
		}

		// if the user can't go back provide for hiding the next/fast forward nav links
		if( disableNext ) {
			addClass( nextAnchor, disabledClassStr );

			if( ffAnchor ) {
				addClass( ffAnchor, disabledClassStr );
			}
		}
	}

	lib.onEvent( "overthrow-init", w.document.documentElement, function( event ) {
		var thisSideScroll = event.overthrow.sideScroll,
			options = event.overthrow.options || {}, rewind, rwdButton;

		if( options.disableNav === true ) {
			// alert the toggle nav function that it should be disabled on rewind
			rewind = options.rewind;

			lib.onEvent( "overthrow-scroll", thisSideScroll, toggleNavigationEvent);
			lib.onEvent( "overthrow-next", thisSideScroll, toggleNavigationEvent);
			lib.onEvent( "overthrow-prev", thisSideScroll, toggleNavigationEvent);
			lib.onEvent( "overthrow-refresh", thisSideScroll, toggleNavigationEvent);
			lib.onEvent( "overthrow-resize", thisSideScroll, toggleNavigationEvent);

			// toggle on init to account for a small number of initial elements
			// in fixed width scrollers
			toggleNavigationEvent({ target: thisSideScroll });

			addClass(thisSideScroll.querySelector( "a.sidescroll-prev"), disabledClassStr );

			if( rwdButton = thisSideScroll.querySelector( "a.sidescroll-rwd") ){
				addClass(rwdButton, disabledClassStr );
			}
		}
	});

	lib._toggleNavigation = toggleNavigation;
})( this, this.overthrow );

(function(w, overthrow) {
	var lib = overthrow.sidescroller;

	lib.onEvent( "overthrow-init", w.document.documentElement, function( event ) {
		var options = event.overthrow.options || {},
			oEl = event.overthrow.sideScroll;

		function handleSkip( evt ) {
			var e = evt || w.event,
				target = e.target || e.srcElement,
				scroller = oEl.querySelector( ".sidescroll" ),
				rwd = (e.type !== "keydown" && target.className.indexOf( "sidescroll-rwd" ) > -1),
				ieID = "overthrow" + (new Date().getTime());

			if( target && target.nodeName !== "A" ){
				return;
			}

			w.overthrow.toss( scroller, {
				left: rwd ? 0 : ( scroller.querySelector( "ul" ).offsetWidth - oEl.offsetWidth )
			});
		}

		if( options.skipLinks === true ) {
			var nav = document.createElement( "div" ),
				navLinks = "<a href='#' class='sidescroll-rwd'>Skip to start</a>" +
					"<a href='#' class='sidescroll-ff'>Skip to end</a>";

			nav.setAttribute( "class", "sidescroll-skip-nav" );
			nav.innerHTML = navLinks;
			nav.addEventListener( "click", handleSkip );

			oEl.appendChild( nav );
		}
	});

})( this, this.overthrow );