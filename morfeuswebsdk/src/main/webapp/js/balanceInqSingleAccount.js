(function(window) {
	

	function balanceInqSingleAccountAdaptor(templateName, data){
		
		var container = "messages";
		var respPayload = data.payload;

		var payload = {};
			payload.content = data.card.content;
			payload.buttons = data.card.content[0].element.buttons;
			payload.data = data.payload.accounts;
			payload.randId = Math.floor(Math.random() * 90000) + 10000;

		var accountCategory = data.payload.accounts[0].account.accountCategory;

		if(accountCategory === "ACCOUNT"){
			templateName = "balanceInqSingleAccountNoSuperimpose";
		}


		loadDynamicCustomTemplate(templateName, container);
		appendTemplate(templateName, container, payload);

	}

	window.balanceInqSingleAccountAdaptor = balanceInqSingleAccountAdaptor;

})(window);