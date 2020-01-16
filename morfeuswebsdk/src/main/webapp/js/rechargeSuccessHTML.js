(function(window){

	function rechargeSuccessHTMLAdaptor(templateName, resp){

		var text = resp.text;
		var payload = resp.payload;
		var container = "messages";

		loadDynamicCustomTemplate(templateName, container);
		appendTemplate(templateName, container, {payload:payload, text:text});

	}

	window.rechargeSuccessHTMLAdaptor = rechargeSuccessHTMLAdaptor;

})(window);