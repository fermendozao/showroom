'use strict';
// DOM-based routing
// http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
var SITE = {
	common: {
		init: function(){
			if ( $('#loader-go').length >0 ) {
				var loaderGo = new SVGLoader( document.getElementById( 'loader-go' ), { speedIn : 100 } ),
					loaderBack = new SVGLoader( document.getElementById( 'loader-back' ), { speedIn : 400, easingIn : mina.easeinout } ),
					replaceAll = function () {
						$('.sidebar').on('click', function(){
							// Display page load overlay
							loaderBack.show();
							$('#loader-back').addClass('active');
							// Replace content, change classes and hide page load overlay
							setTimeout(function(){
								$('.wrapper-content').load('/home.html .main', function(){
									$('body').attr('class', '');
									$('body').addClass('home');
									loaderBack.hide();
									$('#loader-back').removeClass('active');
									// Add full page plugin
									console.log('ADD');
									$('.main').fullpage();
									// Add original events after all elements are available
									replaceUnique();
								});
							}, 900);
						});
					},
					replaceUnique = function () {
						$('.main-cover').each(function (i,el){
							$(el).on('click', function (e){
								e.preventDefault();
								// Get page to load and get classes for body
								var url = $(this).attr('href'),
									classes = $(this).data('classes');
								// Display page load overlay
								loaderGo.show();
								$('#loader-go').addClass('active');
								console.log('DESTROY');
								$.fn.fullpage.destroy('all');
								// Replace content, change classes and hide page load overlay
								setTimeout(function(){
									$('.wrapper-content').load(url + ' .main', function(){
										$('.onepage-pagination').remove();
										$('body').attr('class', '');
										$('body').addClass(classes);
										// Verify if is in contact page
										if ($('body').hasClass('contact')) {
											var $map = $('#map')[0],
												options = {
													center: new google.maps.LatLng(-34.397, 150.644),
													zoom: 8,
													mapTypeId: google.maps.MapTypeId.ROADMAP
												},
												map;
											map = new google.maps.Map($map, options);
										}
										// Add original events after all elements are available
										replaceAll();
										loaderGo.hide();
										$('#loader-go').removeClass('active');

									});
								}, 900);
							});
						});
					};
				// Fire events
				replaceUnique();
			}
		}
	},
	home: {
		init: function(){
			// Add full page plugin
		   $('.main').fullpage();
		   // Add full page plugin
		    $('nav li a').on('click', function(e){
		    	e.preventDefault();
		    	var index = $(this).attr('data-menu');
		    	$.fn.fullpage.moveTo(index);
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

			[].slice.call( document.querySelectorAll( 'button.progress-button' ) ).forEach( function( bttn ) {
				new ProgressButton( bttn, {
					callback : function( instance ) {
						var progress = 0,
							interval = setInterval( function() {
								progress = Math.min( progress + Math.random() * 0.1, 1 );
								instance._setProgress( progress );

								if( progress === 1 ) {
									instance._stop(1);
									clearInterval( interval );
								}
							}, 200 );
					}
				} );
			} );
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