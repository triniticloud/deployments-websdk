(function(window){
	function debitCardLimitChangeSuccessAdaptor(templateName, resp){
		var container = "messages";
		var data = resp;

		loadDynamicCustomTemplate(templateName, container);
		appendTemplate(templateName, container, data);
	}

	window.debitCardLimitChangeSuccessAdaptor = debitCardLimitChangeSuccessAdaptor;
})(window);