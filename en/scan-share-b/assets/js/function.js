//Function for Slideshow
function slideSwitch() {
    //var $active = $('#slideshow IMG.active');

    //if ( $active.length == 0 ) $active = $('#slideshow IMG:last');

    // use this to pull the images in the order they appear in the markup
    //var $next =  $active.next().length ? $active.next()
    //    : $('#slideshow IMG:first');

    // uncomment the 3 lines below to pull the images in random order
    
    // var $sibs  = $active.siblings();
    // var rndNum = Math.floor(Math.random() * $sibs.length );
    // var $next  = $( $sibs[ rndNum ] );


    //$active.addClass('last-active');

    //$next.css({opacity: 0.0})
    //    .addClass('active')
    //    .animate({opacity: 1.0}, 1000, function() {
    //        $active.removeClass('active last-active');
    //    });
	$("#first").animate({opacity: 0}, 500);
	$("#first").animate({marginTop:'0px'});
	$("#first").animate({opacity:1}, 500);
	$("#first").delay(5000);
	$("#first").animate({opacity:0}, 500);
	$("#first").animate({marginTop:'-453px'});
	$("#first").animate({opacity:1}, 500);
	$("#first").delay(5000);
	$("#first").animate({opacity:0}, 500);
	$("#first").animate({marginTop:'-906px'});
	$("#first").animate({opacity:1}, 500);
	$("#first").delay(5000);
	$("#first").animate({opacity:0}, 500);
	$("#first").animate({marginTop:'-1359px'});
	$("#first").animate({opacity:1}, 500);
	$("#first").delay(5000);
	$("#first").animate({opacity:0}, 500);
	$("#first").animate({marginTop:'-1815px'});
	$("#first").animate({opacity:1}, 500);
	$("#first").delay(5000);
}

$(function() {
  setInterval( "slideSwitch()", 5000 );
});
