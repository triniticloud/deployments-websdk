(function(window){

	function downloadChatHTMLAdaptor(templateName, resp){


		var payload = {};
		var payloadObj = resp.payload;
		payload.title=resp.card.content[0].element.title.text;
		payload.id = payloadObj.payloadId;
		payload.randId = Math.floor(Math.random() * 90000) + 10000;
		var container = "messages";

		loadDynamicCustomTemplate(templateName, container);
		appendTemplate(templateName, container, {payload:payload});

	}

	window.downloadChatHTMLAdaptor = downloadChatHTMLAdaptor;

})(window);