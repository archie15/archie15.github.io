$(function () {
				
	//footer hover
	$('a img').hover( function () {
		$(this).attr('src', $(this).attr('src').replace(/\.jpg/, '-hover.png') );
	});
	
	//modal event			
	$('#movie_details').on('show.bs.modal', function(e) {				
		var title = $(e.relatedTarget).data('title');
		$('#movie_title').html(title);
		
		var img = $(e.relatedTarget).data('image');
		$('.movie--image img').attr('src', img);
		
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
			$.ajax({
				"url": "https://itunes.apple.com/search",
				"dataType": "jsonp",
				"processData": false, 
				"contentType": false, 
				"cache": false,
				"data": {
					"term": encodeURI(keyword),
					"media": "movie",
					"attribute": "featureFilmTerm"
				},
				"error": function (jqXHR, textStatus, message) {
					console.log(message);
				},
				"success": function (data, textStatus, jqXHR) {
					console.log(data);
					data.results.forEach(function (val, index, array) {
						$('#search__results--display').html('');	
						
						var artist = val.artistName;
						var title = val.trackName;
						var video = val.previewUrl;
						var price = val.trackPrice;
						var rent = val.trackRentalPrice;
						var cat = val.primaryGenreName;
						var summary = val.longDescription;
						var rdate = val.releaseDate;
						var img = val.artworkUrl100;
						var bigImg = img.replace('100x100bb.jpg','300x300bb.jpg');
						
						texts = '<div class="container"> <div class="row text-center"><div class="col-4">';
						texts = texts + '<div class="img__container"><img src="'+bigImg+'" alt="" class="img__image" /><div class="img__middle"><div class="img__text"><a href="#movie_details" data-mdb-toggle="modal"  data-mdb-dismiss="modal" data-mdb-target="#movie_details" data-title="'+title.replace(/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,'')+'" data-image="'+bigImg+'" data-summary="'+summary.replace(/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,'')+'" data-category="'+cat+'" data-rdate="'+rdate+'" data-rent="'+rent+'" data-price="'+price+'" data-artist="'+artist+'" data-trailer="'+video+'">Details</a></div></div></div><h4>'+title+'</h4>';
						texts = texts + '</div></div></div>';
						
						$('#search__results--display').append(texts);
					});
				}
			});
			/*
			$.getJSON("https://itunes.apple.com/search?media=movie&attribute=featureFilmTerm&term="+encodeURI(keyword)+"&callback=?", function (data) {		
				var count = data.resultCount;
					if(count>0) {
						var artist = data.results[0].artistName;
						var title = data.results[0].trackName;
						var video = data.results[0].previewUrl;
						var price = data.results[0].trackPrice;
						var rent = data.results[0].trackRentalPrice;
						var cat = data.results[0].primaryGenreName;
						var summary = data.results[0].longDescription;
						var rdate = data.results[0].releaseDate;
						var img = data.results[0].artworkUrl100;
						var bigImg = img.replace('100x100bb.jpg','300x300bb.jpg');
							
						texts = '<div class="container"> <div class="row text-center"><div class="col-4">';
						texts = texts + '<div class="img__container"><img src="'+bigImg+'" alt="" class="img__image" /><div class="img__middle"><div class="img__text"><a href="#movie_details" data-mdb-toggle="modal"  data-mdb-dismiss="modal" data-mdb-target="#movie_details" data-title="'+title.replace(/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,'')+'" data-image="'+bigImg+'" data-summary="'+summary.replace(/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,'')+'" data-category="'+cat+'" data-rdate="'+rdate+'" data-rent="'+rent+'" data-price="'+price+'" data-artist="'+artist+'" data-trailer="'+video+'">Details</a></div></div></div><h4>'+title+'</h4>';
						texts = texts + '</div></div></div>';
					}else {
						texts = 'No movies found.';
					}	
				$('#search__results--display').html(texts);
			});
			*/
		}
	});	
	
	
	//slider
	$(".bxslider").html("<img src='img/ajax-loader.gif' alt='Loading' width='16' />");	
				
	$.get("https://itunes.apple.com/us/rss/topmovies/limit=100/xml" , function(data){
		$(".bxslider").html("");
		var texts = "";	
		$(data).find("entry").each(function(){
			//var vid = $(this).find('id').attr('im\\:id');						
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
			body = body + '';
			
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
		});
	});
});	