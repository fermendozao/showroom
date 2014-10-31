'use strict';
// DOM-based routing
// http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
var SITE = {
	common: {
		init: function(){
			console.log('common');
		}
	},
	home: {
		init: function(){
			$('.main').onepage_scroll({
		      sectionContainer: 'section',     // sectionContainer accepts any kind of selector in case you don't want to use section
		      easing: 'ease',                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
		                                       // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
		      animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
		      pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
		      updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
		      loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
		      keyboard: true,                  // You can activate the keyboard controls
		      responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
		                                       // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
		                                       // the browser's width is less than 600, the fallback will kick in.
		      direction: 'vertical'            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
		   });			
		}
	},
	contact: {
		init: function(){
			var $map = $('#map')[0],
				options = {
					center: new google.maps.LatLng(-34.397, 150.644),
					zoom: 8,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				},
				map;
			map = new google.maps.Map($map, options);
		}
	}
};

var UTIL = {

  fire : function(func,funcname, args){

    var namespace = SITE;  // indicate your obj literal namespace here

    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
      namespace[func][funcname](args);
    }

  },

  loadEvents : function(){

    var bodyId = document.body.id;

    // hit up common first.
    UTIL.fire('common');

    // do all the classes too.
    $.each(document.body.className.split(/\s+/),function(i,classnm){
      UTIL.fire(classnm);
      UTIL.fire(classnm,bodyId);
    });

    UTIL.fire('common','finalize');

  }

};

// kick it all off here 
$(document).ready(UTIL.loadEvents);