var FADE_DELAY=100;

$(document).ready(function(){
var regExPattern=/\?story=sto\d\d$/;
if (regExPattern.test(location.href)) {
  showStory(parseInt(/\d\d/.exec(location.href)) - 1); }
  else
  { showLinkList(); }
});

function showStory(intStory) {
	$.getJSON('../js/uidevtest-data.js', function(json) {
			if (intStory < json.objects.length) {
			$('.clsLinkList').hide();
			var theStory=json.objects[intStory];
			$('#title').text(theStory['title']);
			var categories=theStory['categories_name'];
			$('#categories_name').text(categories.toString().replace(',', ' / '));
			$('.dtPosted').text(parseXMLDateToTime(theStory['pub_date']));
			$('.dtUpdated').text(parseXMLDateToTime(theStory['updated']));
			$('#author').text(theStory['author']);
			$('#story').html(theStory['story']);
			$('#photo').attr("src", (theStory['lead_photo_image_url']));
			$('#photo').attr("alt", (theStory['lead_photo_caption']));
			$('#photoCredit').text(theStory['lead_photo_credit']);
			if (theStory['lead_photo_caption'] != null) {
				$('#photoCaption').text(theStory['lead_photo_caption']);
			} else {
				$('#photoCaption').hide();
			}			
		}
		});
}

function showLinkList() {
	$.getJSON('../js/uidevtest-data.js', function(json) {
			if (json.objects.length > 0) {
		$('.clsStory').hide();
			var i=0;
			$.each(json.objects,function() {
				var categories=this['categories_name'];
				var info = '<div class="listItem"><img class="img_thumb" src="' +  this['lead_photo_image_thumb'] + '" /><div class="spnMiddle">';
				info += '<a href="index.html?story=sto' + ((i++>10) ? i : '0'+i) + '" class="headline">' +  this['title'] + '</a><br />';
				info += '<span class="category">' +  categories.toString().replace(',', ' / ') + '</span><p />';
				info += '<span class="posted">Posted: ' +  parseXMLDateToTime(this['pub_date']) + '</span><br />';
				info += '<span class="updated">Updated: ' +  parseXMLDateToTime(this['updated']) + '</span><br />';
				info += '</div></div>';
				$("#divLinkList").append(info);
				
			});
			}
		});
}





jQuery.fn.exists = function(){return this.length>0;}

function parseXMLDateToTime (str) {
	dt=new Date();
	var strDate = getDateFromFormat(str.substring(0,19), "yyyy-MM-ddTHH:mm:ss");
	dt.setTime(strDate);
	var tm = formatDate(dt, "h:mm a EE, NNN. dd, yyyy");
//	alert(tm);
	return tm;
}

// The following code credited to http://webdesignerwall.com/tutorials/html5-grayscale-image-hover

	$(window).load(function(){
		
		// Fade in images so there isn't a color "pop" document load and then on window load
		$(".wide #sprite img").hide();
		
		// clone image
		$('.wide #sprite img').each(function(){
			var el = $(this);
			el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"998","opacity":"0"}).insertBefore(el).queue(function(){
				var el = $(this);
				el.parent().css({"width":this.width,"height":this.height});
				el.dequeue();
			});
			this.src = grayscale(this.src);
			
		});
		$(".wide #sprite img").show();
		// Fade image 
		$('.wide .spnSprite').mouseover(function(){
			$(this).find('img:first').stop().animate({opacity:1}, FADE_DELAY);
		})
		$('.wide .spnSprite').mouseout(function(){
			$(this).find('img:first').stop().animate({opacity:0}, FADE_DELAY);
		});		
	});
	
// Grayscale w canvas method
	function grayscale(src){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var imgObj = new Image();
		imgObj.src = src;
		canvas.width = imgObj.width;
		canvas.height = imgObj.height; 
		ctx.drawImage(imgObj, 0, 0); 
		var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for(var y = 0; y < imgPixels.height; y++){
			for(var x = 0; x < imgPixels.width; x++){
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg; 
				imgPixels.data[i + 1] = avg; 
				imgPixels.data[i + 2] = avg;
			}
		}
		ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
    }