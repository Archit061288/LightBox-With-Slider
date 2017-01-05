(function($){

	$.fn.lightboxjqslider = function(options){
		//console.log("here")
		var defaults = {
			speed : 1000

		}
		// Merge Two object
		var options= $.extend({},defaults,options);

		// $this belongs to UL
		$this = $(this);

		$this.wrap("<div class=\"lbslider\" />");

		// Css for div.lbslider
		$this.parent().css({
			'width': '39%',
    		'margin': '0 auto'	
		})

		// Css for UL
		$this.css({
			'list-style':'none',
			'padding':'10px',
			'position':'relative',
			'overflow':'auto'
		})

		// Css For LI
		$this.children().css({
			'padding':'20px',
			'width':'40%',
			'float':'left',
			'cursor':'pointer'
			
		})

		var remainingli=[];
		var remainingprevli=[];

		// Click on LI
		$this.children().on("click",function(){
			remainingli=$(this).next(); // Store next Li
			remainingprevli=$(this).prev(); // Store prev Li
			var sliderdiv="<div id='newdiv'><div class='left-arrow'></div>"+$(this)[0].innerHTML+"<div class='right-arrow'></div>"
			$(sliderdiv).appendTo("body");
			$("#newdiv img").css("position","absolute");
			setTimeout(function(){
				$("#newdiv img").animate({
					'top': '4%',
	    			'width': '41%',
	    			'left': '30%'
				},options.speed)	
			},true)

		})

		// Click on document.
		$(document).on("click",function(e){
			
			// Hide Lightbox except images and arrow.
			if(e.target.nodeName != "IMG" && e.target.nodeName != "DIV"){
				$("body").css("background-color","");
				$("#newdiv").hide(options.speed,function(){
					$("#newdiv").remove();
				});

			}
			// Execute id click on arrow.
			else if(e.target.nodeName == "DIV"){
				// click on next button
				if($(e.target).hasClass("right-arrow")){
					
					if(remainingli.length > 0){
						$("#newdiv").remove();
						var sliderdiv="<div id='newdiv'><div class='left-arrow'></div>"+remainingli[0].innerHTML+"<div class='right-arrow'></div>";
						$(sliderdiv).appendTo("body");
						$("#newdiv img").css("position","absolute");
						setTimeout(function(){
							$("#newdiv img").animate({
								'top': '4%',
				    			'width':'41%',
				    			'left': '30%'
							},options.speed)	
						},true)
						remainingprevli=remainingli.prev();
					}
					remainingli=remainingli.next();
				}
				// click on previous button
				else if($(e.target).hasClass("left-arrow")){
					
					if(remainingprevli.length > 0){
						$("#newdiv").remove();
						var sliderdiv="<div id='newdiv'><div class='left-arrow'></div>"+remainingprevli[0].innerHTML+"<div class='right-arrow'></div>";
						$(sliderdiv).appendTo("body");
						$("#newdiv img").css("position","absolute");
						setTimeout(function(){
							$("#newdiv img").animate({
								'top': '4%',
				    			'width':'41%',
				    			'left': '30%'
							},options.speed)	
						},true)
						var remprev=remainingprevli;
						remainingprevli=remainingprevli.prev();
					}
					remainingli=remprev.next();
				} 
			}
		})









	}	

})(jQuery)