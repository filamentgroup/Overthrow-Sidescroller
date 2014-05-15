/*! overthrow-sidescroller - A sidescroller component based on overthrow. - v0.1.0 - 2014-05-15
* Copyright (c) 2014 Scott Jehl, Filament Group, Inc.; Licensed MIT */
/*! overthrow - An overflow:auto polyfill for responsive design. - v0.6.6 - 2013-10-25
* Copyright (c) 2013 Scott Jehl, Filament Group, Inc.; Licensed MIT */
!function(a){var b=a.document,c=b.documentElement,d="overthrow-enabled",e="ontouchmove"in b,f="WebkitOverflowScrolling"in c.style||"msOverflowStyle"in c.style||!e&&a.screen.width>800||function(){var b=a.navigator.userAgent,c=b.match(/AppleWebKit\/([0-9]+)/),d=c&&c[1],e=c&&d>=534;return b.match(/Android ([0-9]+)/)&&RegExp.$1>=3&&e||b.match(/ Version\/([0-9]+)/)&&RegExp.$1>=0&&a.blackberry&&e||b.indexOf("PlayBook")>-1&&e&&-1===!b.indexOf("Android 2")||b.match(/Firefox\/([0-9]+)/)&&RegExp.$1>=4||b.match(/wOSBrowser\/([0-9]+)/)&&RegExp.$1>=233&&e||b.match(/NokiaBrowser\/([0-9\.]+)/)&&7.3===parseFloat(RegExp.$1)&&c&&d>=533}();a.overthrow={},a.overthrow.enabledClassName=d,a.overthrow.addClass=function(){-1===c.className.indexOf(a.overthrow.enabledClassName)&&(c.className+=" "+a.overthrow.enabledClassName)},a.overthrow.removeClass=function(){c.className=c.className.replace(a.overthrow.enabledClassName,"")},a.overthrow.set=function(){f&&a.overthrow.addClass()},a.overthrow.canBeFilledWithPoly=e,a.overthrow.forget=function(){a.overthrow.removeClass()},a.overthrow.support=f?"native":"none"}(this),function(a,b,c){if(b!==c){b.easing=function(a,b,c,d){return c*((a=a/d-1)*a*a+1)+b},b.tossing=!1;var d;b.toss=function(a,e){b.intercept();var f,g,h=0,i=a.scrollLeft,j=a.scrollTop,k={top:"+0",left:"+0",duration:50,easing:b.easing};if(e)for(var l in k)e[l]!==c&&(k[l]=e[l]);return"string"==typeof k.left?(k.left=parseFloat(k.left),f=k.left+i):(f=k.left,k.left=k.left-i),"string"==typeof k.top?(k.top=parseFloat(k.top),g=k.top+j):(g=k.top,k.top=k.top-j),b.tossing=!0,d=setInterval(function(){h++<k.duration?(a.scrollLeft=k.easing(h,i,k.left,k.duration),a.scrollTop=k.easing(h,j,k.top,k.duration)):(f!==a.scrollLeft&&(a.scrollLeft=f),g!==a.scrollTop&&(a.scrollTop=g),b.intercept())},1),{top:g,left:f,duration:b.duration,easing:b.easing}},b.intercept=function(){clearInterval(d),b.tossing=!1}}}(this,this.overthrow),function(a,b,c){if(b!==c){b.scrollIndicatorClassName="overthrow";var d=a.document,e=d.documentElement,f="native"===b.support,g=b.canBeFilledWithPoly,h=(b.configure,b.set),i=b.forget,j=b.scrollIndicatorClassName;b.closest=function(a,c){return!c&&a.className&&a.className.indexOf(j)>-1&&a||b.closest(a.parentNode)};var k=!1;b.set=function(){if(h(),!k&&!f&&g){a.overthrow.addClass(),k=!0,b.support="polyfilled",b.forget=function(){i(),k=!1,d.removeEventListener&&d.removeEventListener("touchstart",u,!1)};var j,l,m,n,o=[],p=[],q=function(){o=[],l=null},r=function(){p=[],m=null},s=function(a){n=j.querySelectorAll("textarea, input");for(var b=0,c=n.length;c>b;b++)n[b].style.pointerEvents=a},t=function(a,b){if(d.createEvent){var e,f=(!b||b===c)&&j.parentNode||j.touchchild||j;f!==j&&(e=d.createEvent("HTMLEvents"),e.initEvent("touchend",!0,!0),j.dispatchEvent(e),f.touchchild=j,j=f,f.dispatchEvent(a))}},u=function(a){if(b.intercept&&b.intercept(),q(),r(),j=b.closest(a.target),j&&j!==e&&!(a.touches.length>1)){s("none");var c=a,d=j.scrollTop,f=j.scrollLeft,g=j.offsetHeight,h=j.offsetWidth,i=a.touches[0].pageY,k=a.touches[0].pageX,n=j.scrollHeight,u=j.scrollWidth,v=function(a){var b=d+i-a.touches[0].pageY,e=f+k-a.touches[0].pageX,s=b>=(o.length?o[0]:0),v=e>=(p.length?p[0]:0);b>0&&n-g>b||e>0&&u-h>e?a.preventDefault():t(c),l&&s!==l&&q(),m&&v!==m&&r(),l=s,m=v,j.scrollTop=b,j.scrollLeft=e,o.unshift(b),p.unshift(e),o.length>3&&o.pop(),p.length>3&&p.pop()},w=function(){s("auto"),setTimeout(function(){s("none")},450),j.removeEventListener("touchmove",v,!1),j.removeEventListener("touchend",w,!1)};j.addEventListener("touchmove",v,!1),j.addEventListener("touchend",w,!1)}};d.addEventListener("touchstart",u,!1)}}}}(this,this.overthrow),function(a){a.overthrow.set()}(this);
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
				nextAnchor, prevAnchor, thisScroll, rwdAnchor, ffAnchor;


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

		if( disablePrev ) {
			addClass( prevAnchor, disabledClassStr );

			if( rwdAnchor ) {
				addClass( rwdAnchor, disabledClassStr );
			}
		}

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