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
			var theStory=json.objects[intStory];
			var categories=theStory['categories_name'];
			var info = '';
			info += '<span class="category">' +  categories.toString().replace(',', ' / ') + '</span><br />';
			info += '<span class="posted">Posted: ' +  parseXMLDateToTime(theStory['pub_date']) + '</span> | ';
			info += '<span class="updated">Updated: ' +  parseXMLDateToTime(theStory['updated']) + '</span><br />';
			info += '<span class="headline">' +  theStory['title'] + '</span><br />';
			info += '<img class="storyPhoto" src="' +  theStory['lead_photo_image_url'] + '" /><br />';
			info += '<span class="photoCredit">' +  theStory['lead_photo_credit'] + '</span><br />';
			info += '<span class="photoCaption">' +  theStory['lead_photo_caption'] + '</span><br />';
			info += 'By <span class="author">' +  theStory['author'] + '</span><br />';
			info += '<div class="story">' +  theStory['story'] + '</div><br />';
				info += '<hr />';
				$("div").append(info);				
			}
		});
}

function showLinkList() {
	$.getJSON('../js/uidevtest-data.js', function(json) {
			if (json.objects.length > 0) {
			var i=0;
			$.each(json.objects,function() {
				var categories=this['categories_name'];
				var info = '<img class="img_thumb" src="' +  this['lead_photo_image_thumb'] + '" />';
				info += '<a href="index.html?story=sto' + ((i++>10) ? i : '0'+i) + '" class="headline">' +  this['title'] + '</a><br />';
				info += '<span class="category">' +  categories.toString().replace(',', ' / ') + '</span><br />';
				info += '<span class="posted">Posted: ' +  parseXMLDateToTime(this['pub_date']) + '</span><br />';
				info += '<span class="updated">Updated: ' +  parseXMLDateToTime(this['updated']) + '</span><br />';
				info += '<hr />';
				$("div").append(info);
				
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
