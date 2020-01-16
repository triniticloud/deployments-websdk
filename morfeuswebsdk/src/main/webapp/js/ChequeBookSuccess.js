(function(window){
	function ChequeBookSuccessAdaptor(templateName, resp){
		var container = "messages";
		var data = resp;

		loadDynamicCustomTemplate(templateName, container);
		appendTemplate(templateName, container, data);
	}

	window.ChequeBookSuccessAdaptor = ChequeBookSuccessAdaptor;
})(window);