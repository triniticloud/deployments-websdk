(function(window){
	function bannerHTMLAdaptor(templateName, resp){
		var container = "messages";
		var data = {};
		data.images = resp.payload.images;
		data.randId = Math.floor(Math.random() * 90000) + 10000;

		loadDynamicCustomTemplate(templateName, container);
		appendTemplate(templateName, container, data);

		if(data.images.length>1){
	        $("#cardsImage-" + data.randId).slick({
	            centerMode: true,
	            centerPadding: '20px',
	            infinite: true,
	            slidesToShow: 1
	        });
    	}
	}

	window.bannerHTMLAdaptor = bannerHTMLAdaptor;
})(window);