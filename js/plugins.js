 // make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

// main app
var SUPApp = SUPApp || {};

// Dark UI Interaction class
SUPApp.UIInteraction = function( customSetting ) {

	// overwrite default settings
	var settings = $.extend( {

	}, 
	customSetting || {});

	// vars
	var self = this;

	// init
	this.init = function() {

		// initialize submenu
		initNavigation();

		// init carousel
		initCarousel();

		// init mobile menu
		initMobileMenu();
		
		// init quick nav
		initQuickNavEvent();

		// init accordion
		initAccordion();

		// init faq tab
		initFAQTab();

		// init custom select
		initCustomSelectbox();

		// init smooth scroll (for one page nav)
		initSmoothScroll();

		// init modal on justice page
		initModal();

		// init dropdown menu
		initDropdownMenu();

		// init justices page hash
		initJusticeHashHandler()

		// init text resizer
		initTextResizer();

		// init custom input file 
		initInputCustom();

		// init datepicker
		initDatePicker();

		// init tooltip
		initTooltip();

		// init list date wraper
		initListDate();

		// init table wrapper
		initTableWrapper();
	};

	// method to initialize navighation submenu
	var initNavigation = function(){

		// init submenu
		if( $( '.navigation [data-tab]' ).length > 0 ) {

			// check
			if( $( window ).width() >= 768 ) {

				// add overlay
				$( 'body' ).append( '<div class="overlay"></div>' );

				// go to data tab
				$( '.navigation [data-tab]' ).each( function(){

					// get parent
					var $list = $( this ),
						listid = $list.attr( 'data-tab' );

					// on hover
					$list.on( 'click', function( e ){

						// prevent
						e.preventDefault();
					});

					// on hover
					$list.on( 'mouseover', function(){

						// reset
						$( '.navigation [data-tab]' ).removeClass( 'open' );
						$( '.submenu' ).hide();

						// active
						$list.parent().addClass( 'active' );

						// show box
						$list.addClass( 'open' );
						
						// show box
						$( '#'+listid ).show();

						// show overlay
						$( 'body > .overlay' ).fadeIn( 200 );
					});

					// hide on overlay mouseover
					$( 'body > .overlay' ).on( 'mouseover', function(){
						
						// active
						$list.parent().removeClass( 'active' );

						// show box
						$list.removeClass( 'open' );
						
						// show box
						$( '#'+listid ).hide();

						// show overlay
						$( 'body > .overlay' ).fadeOut( 200 );
					});
				});
			}
		}
	};

	// method to initialize carousel
	var initCarousel = function(){

		// init slick
		if( $( '.carousel' ).length > 0 ) {

			// slick
			$( '.carousel' ).slick({
				'dots'   : true,
				'arrows' : true,
				'prevArrow' : '<a href="#" class="slick-prev slick-arrow"><i class="glyphicon glyphicon-chevron-left"></i></a>',
				'nextArrow' : '<a href="#" class="slick-next slick-arrow"><i class="glyphicon glyphicon-chevron-right"></i></a>'
			});
		}
	};

	// method to initialize mobile menu
	var initMobileMenu = function(){

		// init mobnile menu
		if( $( '.mobilebutton' ).length > 0 ) {

			// click
			$( '.mobilebutton' ).on( 'click', function( e ){

				// e
				e.preventDefault();

				// reset
				$( 'ul.inner' ).css( 'height', 'auto');

				// get window height
				var wh = $( window ).height(),
					spaceleft = wh - 153;

				// assign height
				if( $( 'ul.inner' ).height() > spaceleft ) {
					$( 'ul.inner' ).css( 'height',  spaceleft +'px');
				}

				// toggle class
				$button = $( this );
				$button.parent().toggleClass( 'open' );
			});
		}
	};

	// method to hide the page nav on mobile while scrolling
	var initQuickNavEvent = function(){

		// check
		if( $( 'nav.navigation' ).length !== 0 ) {

			// quick nav click
			$( '.navigation .menu a' ).on( 'click', function( e ){

				// e
				e.preventDefault();

				// reset
				$( '.navigation .container > ul' ).css( 'height', 'auto');

				// check window height
				var wh = $( window ).height(),
					spaceleft = wh - 115;

				// assign
				if( $( '.navigation .container > ul' ).height() > spaceleft ) {
					$( '.navigation .container > ul' ).css( 'height', spaceleft+'px');
				}


				// toggle class
				$( '.navigation ul' ).toggleClass( 'open' );
			});

			// vars
			var didScroll,
				lastScrollTop = 0,
				delta = 5,
				navbarHeight = $('header').outerHeight();

			// scroll event
			$(window).scroll(function(event){
				
				// scroll
				didScroll = true;
			});

			// set interval
			setInterval(function() {
				if (didScroll) {
					hasScrolled();
					didScroll = false;
				}
			}, 250);
		}

		// actually scrolling
		function hasScrolled() {

			// scroll
			var st = $( this ).scrollTop();

			// Make sure they scroll more than delta
			if( Math.abs( lastScrollTop - st ) <= delta )
				return;

			// If they scrolled down and are past the navbar, add class .nav-up.
			// This is necessary so you never see what is "behind" the navbar.\
			// if ( st > lastScrollTop && st > navbarHeight ) {
			if ( st > lastScrollTop ) {

				// Scroll down
				if( st + $( window ).height() < $ (document ).height()) {
					$( '.navigation .menu' ).removeClass( 'nav-up' ).addClass( 'nav-down' );
				}

			} else {
				if( !$( '.navigation ul' ).hasClass( 'open' ) ) {

					// Scroll up
					$( '.navigation .menu' ).removeClass( 'nav-down' ).addClass( 'nav-up' );
				}
			}

			// set
			lastScrollTop = st;
		}
	};

	// method to initialize accordion
	var initAccordion = function(){

		// custom accordion
		if( $( '.accordion.custom' ).length > 0 ) {

			// var
			var $accordion = $( '.accordion.custom' );

			// check
			if( $accordion.hasClass('red') ) {

				// remove plus./minus on empty panel
				$( '.accordion.custom.red > .panel' ).each( function(){
					if( $( this ).find( '.cont' ).length <= 0 ) {
						$( '.pointer', this ).hide();
					}
				});

				// get anchor and click
				$( '.accordion.custom > .panel > .header > a .pointer' ).on( 'click', function( e ){

					// prevent
					e.preventDefault();

					// check
					if( $( this ).parent().parent().parent().hasClass( 'open' ) ) {
						$( this ).parent().parent().parent().removeClass( 'open' );
					} else {
						// get
						var accordionID = $( this ).attr( 'data-parent' );

						// close all accordion
						$( accordionID+' > .panel' ).removeClass( 'open' );

						// open
						$( this ).parent().parent().parent().addClass( 'open' );
					}
				});
			} else {

				// get anchor and click
				$( '.accordion.custom > .panel > .header > a' ).on( 'click', function( e ){

					// prevent
					e.preventDefault();

					// check
					if( $( this ).parent().parent().hasClass( 'open' ) ) {
						$( this ).parent().parent().removeClass( 'open' );
					} else {
						// get
						var accordionID = $( this ).attr( 'data-parent' );

						// close all accordion
						$( accordionID+' > .panel' ).removeClass( 'open' );

						// open
						$( this ).parent().parent().addClass( 'open' );
					}
				});
			}
		}
	};

	// method to initialize FAQ interactivity
	var initFAQTab = function(){

		// faq
		if( $( '.faq' ).length > 0 ) {

			// expand
			$( '.faq .expandall' ).on( 'click', function( e ){

				// prevent
				e.preventDefault();

				// open
				$( '.faq .content ol li' ).addClass( 'open' );
				$( this ).hide();
				$( '.faq .minimizeall' ).css( 'display','block' );
			});

			// expand
			$( '.faq .minimizeall' ).on( 'click', function( e ){

				// prevent
				e.preventDefault();

				// open
				$( '.faq .content ol li' ).removeClass( 'open' );
				$( this ).hide();
				$( '.faq .expandall' ).css( 'display','block' );
			});


			// individual expand
			$( '.faq .content ol li > a' ).on( 'click', function( e ){

				// prevent
				e.preventDefault();

				// add class
				$( this ).parent().toggleClass( 'open' );
			});
		}
	};

	// method to initialize custom selectbox
	var initCustomSelectbox = function(){

		// custom select
		if( $( '.customselect' ).length > 0 ) {

			// init
			$( '.customselect' ).customSelect();
		}
	};

	// method to initialize smooth scroll
	var initSmoothScroll = function(){

		// check
		if( $( '.floatingbutton' ).length > 0 ) {

			// init smooth slide in one page
			$(function() {
				$('.floatingbutton a').click(function() {
					if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
						var target = $(this.hash);
						target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
							if (target.length) {
								$('html,body').animate({
						  			scrollTop: target.offset().top
								}, 1000);
							return false;
						}
					}
				});
			});
		}
	};

	// method to init modal on justice page
	var initModal = function(){

		// check data modal attr
		if( $( '[data-modal]' ).length > 0 ) {

			// on click
			$( '[data-modal]' ).on( 'click', function( e ){

				// prevent
				e.preventDefault();

				// var
				var $link = $( this ),
					idmodal = $link.attr( 'data-modal' ),
					tabselector = $link.attr( 'data-tab' );

				// open
				$( idmodal ).modal();

				// set tab
				$( tabselector+'-tab' ).tab('show');
			});

		}
	};

	// method to initialize sidebar
	var initDropdownMenu = function(){



		// for side menu
		if ( $( '.dropdownmenu').length > 0 ) {

			// add necessary class and html element
			$( '.dropdownmenu ul' ).parent( 'li' ).addClass( 'dropdown' );
			
			// on click
			$('.dropdown > a').click(function (e) {

				// stop event
				e.stopPropagation();
				e.preventDefault();

				// check if the sub menu is already open
				if( $( this ).parent().find( '> ul' ).hasClass( 'open' ) ) {

					// if its open, then close it
					$( this ).parent().find( '> ul' ).removeClass( 'open' );
				} else {

					// open it
					$( this ).parent().find( '> ul' ).addClass( 'open' );
				}

				// return
				return false
			});
		}
	};

	// method to read hash on justices page
	var initJusticeHashHandler = function(){

		// get hash
		var hash = window.location.hash;

		// check
		if( hash != '' ) {

			// vars
			var clean = hash.replace( '#', ''),
				arr = clean.split( '/' ),
				modalID = 'modal-'+ arr[ 0 ],
				tabID = arr[ 0 ]+'-'+arr[ 1 ]+'-tab'; 

			// check if modal exist
			if( $( '#'+modalID ).length > 0 ) {

				// open
				$( '#'+modalID ).modal();

				// set tab
				$( '#'+tabID ).tab('show')
			}
		}
	};

	// method to initialize text resizer
	var initTextResizer = function(){

		// if element exist
		if( $( '.resize' ).length !== 0) {
			
			// initializes
			$.rvFontsize({
				targetSection: '.resize',
				store: false,
				controllers: {}
			}); 
		}
	};

	// method to print only the justice popup
	var initTooltip = function(){

		// check
		if( $( '[data-toggle="tooltip"]' ).length > 0 ) {

			// init
			$('[data-toggle="tooltip"]').tooltip()
		}
	}

	// method to give custom styling to input[type='file'] element
	var initInputCustom = function(){

		var inputValue = '';

		// trigger file
		if ( $( '.upload' ).length !== 0 ) {

			$( '.btn-upload' ).on('click', function(){
				
				$( '.attach' ).trigger( 'click' );
			});
		}
		
		// show the uploaded path file
		$( '.attach' ).on('change', function() {

			if ( $( this ).val() !== '' ){

				inputValue = $( this ).val().replace( "C:\\fakepath\\","");

				$( '.uploadfile' ).slideDown( 300 );
				$( '.value' ).html( inputValue );
			}
		});

		// close
		$( '.close' ).on('click', function(){

			$( '.uploadfile' ).slideUp( 300 );
		})
	};

	// method to init datepicker
	var initDatePicker = function(){

		if ( $( '.datepicker' ).length !== 0 ) {

			var $input = $( '.datepicker' ).pickadate({
				format: 'dd/mm/yyyy'
			});	

			$( '.img-picker' ).on('click',function(){

				var datepicker = $( this ).parent().find( '.picker' );
				 
				// open datepicker
				$( datepicker ).toggleClass('picker--opened');
				$( datepicker ).toggleClass('picker--focused');
			});
		}
	};

	// method to wrap list date
	var initListDate = function(){

		// check element
		if ( $( '.list-date' ).length !== 0 ) {

			// wrap list date
			$( '.list-date' ).wrap('<div class="list-date-wrap"></div>');
		}
	};

	// method to wrap table
	var initTableWrapper = function(){

		// check for table in content
		if( $( '.content table' ).length > 0 ) {

			// each
			$( '.content table' ).each( function(){

				// check if it has an anchor tag
				if( $( this ).parents('.table').length <= 0 ) {

					// add responsive class and wrap in an anchor tag
					$( this ).wrap('<div class="table"></div>' );
				}
			});
		}
	}; 
};
