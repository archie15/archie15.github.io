$(function () {
				
	//footer hover
	$('a img').hover( function () {
		$(this).attr('src', $(this).attr('src').replace(/\.jpg/, '-hover.png') );
	});
	
	
	//banner modal show manually to prevent console error
	$('.btn--watch').on('click',function(e) {
		var title = $(this).data('title');
		$('#movie_title').html(title);
		
		var img = $(this).data('image');
		$('.movie--image--img').attr('src', img); 
		$('.movie--image--img').attr('alt', title); 
		
		var summary = $(this).data('summary');
		$('.movie__summary').html(summary);
		
		var category = $(this).data('category');
		$('.movie--category').html('<small>'+category+'</small>');
		
		var release = $(this).data('rdate');
		$('.movie--rdate').html('<small>'+release+'</small>');
		
		var rent = $(this).data('rent');
		$('.movie--rent').html(rent);
		
		var price = $(this).data('price');
		$('.movie--price').html(price);				
		
		var artist = $(this).data('artist');
		$('.movie--artist').html(artist);
		
		var trailer = $(this).data('trailer');
		$('.movie--trailer').attr('src', trailer);
		
		
		$('#movie_details').modal('show');	
	});
	
	
	//modal event			
	$('#movie_details').on('show.bs.modal', function(e) {	
		var title = $(e.relatedTarget).data('title');
		$('#movie_title').html(title);
		
		var img = $(e.relatedTarget).data('image');
		$('.movie--image--img').attr('src', img); 
		$('.movie--image--img').attr('alt', title); 
		
		var summary = $(e.relatedTarget).data('summary');
		$('.movie__summary').html(summary);
		
		var category = $(e.relatedTarget).data('category');
		$('.movie--category').html('<small>'+category+'</small>');
		
		var release = $(e.relatedTarget).data('rdate');
		$('.movie--rdate').html('<small>'+release+'</small>');
		
		var rent = $(e.relatedTarget).data('rent');
		$('.movie--rent').html(rent);
		
		var price = $(e.relatedTarget).data('price');
		$('.movie--price').html(price);				
		
		var artist = $(e.relatedTarget).data('artist');
		$('.movie--artist').html(artist);
		
		var trailer = $(e.relatedTarget).data('trailer');
		$('.movie--trailer').attr('src', trailer);
	});
	
	$('.btn--back').on('hidden.bs.modal', function (e) { 
		jQuery('.movie--trailer').attr("src", jQuery(".movie--trailer").attr("src"));
	}); 
			
	//search click
	$('#search__results').hide();
	$('#nav__search').click(function() {
		$('#search__results').fadeIn();
		$('html,body').animate({scrollTop: $("#search__results").offset().top}, 'slow');
		$('.search-keyword').focus();				
	});
		
	//search				
	$('#search-keyword').on('keyup', function() {	
		var keyword = $(this).val();
		if(keyword != '') {
			$('#search__results--display').fadeIn();
			$('#search__results--display').html('<img src="img/ajax-loader.gif" alt="loading" />');			
		
			var texts = "";
			var i = 0;
			$.getJSON("https://itunes.apple.com/search?limit=10&media=movie&attribute=featureFilmTerm&term="+encodeURI(keyword)+"&callback=?", function (data) {		
				var count = data.resultCount;
				texts = '<div class="container"> <div class="row text-center">';
					if(count>0) {
						$.each(data.results, function(i, field){
							//console.log(i.results);
							//alert( i + ": " + field );
							//alert(field.artistName);
							var artist = field.artistName;
							var title = field.trackName;
							var video = field.previewUrl;
							var price = field.trackPrice;
							var rent = field.trackRentalPrice;
							var cat = field.primaryGenreName;
							var summary = field.longDescription;
							var rdate = field.releaseDate;
							var img = field.artworkUrl100;
							var bigImg = img.replace('100x100bb.jpg','300x300bb.jpg');
						
							texts = texts + '<div class="col-md-2 col-2"><div class="img__container"><img src="'+bigImg+'" alt="" class="w-100 img__image" /><div class="img__middle"><button class="btn btn--details" data-mdb-toggle="modal" data-mdb-dismiss="modal" data-mdb-target="#movie_details" data-title="'+title.replace(/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,'')+'" data-image="'+bigImg+'" data-summary="'+summary.replace(/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,'')+'" data-category="'+cat+'" data-rdate="'+rdate+'" data-rent="'+rent+'" data-price="'+price+'" data-artist="'+artist+'" data-trailer="'+video+'">Details</button></div></div></div>';
							
						});				
					}else {
						texts = 'No movies found.';
					}	
					

					texts = texts + '</div></div>';
				$('#search__results--display').html('');			
				$('#search__results--display').append(texts);
			});
		}
	});	
	
	
	//slider
	$(".bxslider").html("<img src='img/ajax-loader.gif' alt='Loading' width='16' />");	
				
	$.get("https://itunes.apple.com/us/rss/topmovies/limit=100/xml" , function(data){
		$(".bxslider").html("");
		var texts = "";	
		$(data).find("entry").each(function(){				
			var title = $(this).find("im\\:name").text();
			var summary = $(this).find("summary").eq(0).text();
			var image = $(this).find("im\\:image").eq(2).text();
			var video = $(this).find("link").eq(1).attr("href");
			var cat = $(this).find("category").eq(0).attr("term");
			var rdate = $(this).find("im\\:releaseDate").eq(0).attr('label');
			var rent = $(this).find("im\\:rentalPrice").eq(0).text();
			var price = $(this).find("im\\:price").eq(0).text();
			var artist = $(this).find("im\\:artist").text();
			var bigImg = image.replace('113x170bb.png','300x300bb.png');
															
			body = '';
			body = body + '<div class="img__container"><img src="'+bigImg+'" alt="" class="w-100 img__image" /><div class="img__middle"><button class="btn btn--details" data-mdb-toggle="modal" data-mdb-dismiss="modal" data-mdb-target="#movie_details" data-title="'+title.replace(/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,'')+'" data-image="'+bigImg+'" data-summary="'+summary.replace(/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,'')+'" data-category="'+cat+'" data-rdate="'+rdate+'" data-rent="'+rent+'" data-price="'+price+'" data-artist="'+artist+'" data-trailer="'+video+'">Details</button></div></div>';
			
			$('.bxslider').append(body);

		});//each loop end
							
		 var slider = $('.bxslider').bxSlider({
			responsive: true,
			auto: false,
			preloadImages: 'visible',
			pager: false,
			slideMargin: 15,
			minSlides: 6,
			maxSlides: 10,
			slideWidth: 200,
			moveSlides: 6,
            touchEnabled: false
		});
	});
});	