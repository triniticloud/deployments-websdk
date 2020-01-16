(function(window){
	var adaptor = {

		"payeeListHTML":  function(templateName, data){
			payeeListHTMLAdaptor(templateName, data);
		},

		"accountListHTML" : function(templateName, data){
			accountListHTMLAdaptor(templateName, data);
		},

		"payeeCategoryListHTML":  function(templateName, data){
			payeeCategoryListHTMLAdaptor(templateName, data);
		},

		"fundTransferSuccessHtml" : function(templateName, data){
			fundTransferSuccessHtmlAdaptor(templateName, data);
		},

		"rechargeSuccessHTML" : function(templateName, data){
			rechargeSuccessHTMLAdaptor(templateName, data);
		},

		"rechargeCategoryListHTML" : function(templateName, data){
			rechargeCategoryListHTMLAdaptor(templateName, data);
		},

		"billerListHTML" : function(templateName, data){
			billerListHTMLAdaptor(templateName, data);
		},

		"billPaymentDecisionHTML" : function(templateName, data){
			billPaymentDecisionHTMLAdaptor(templateName, data);
		},

		"rechargeServiceProviderListHTML" : function(templateName, data){
			rechargeServiceProviderListHTMLAdaptor(templateName, data);
		},

		"billerCategoryListHTML" : function(templateName, data){
			billerCategoryListHTMLAdaptor(templateName, data);
		},

		"blockCardAccountListHTML" : function(templateName, data){
			blockCardAccountListHTMLAdaptor(templateName, data);
		},

		"balanceInqSingleAccount" : function(templateName, data){
			balanceInqSingleAccountAdaptor(templateName, data);
		},
		"debitCardLimitChangeHTML" : function(templateName, data){
			debitCardLimitChangeHTMLAdaptor(templateName, data);
		},
		"DebitCardLimitChangeSuccess" : function(templateName, data){
			debitCardLimitChangeSuccessAdaptor(templateName, data);
		},
		"cardListHTML" : function(templateName, data){
			cardListHTMLAdaptor(templateName, data);
		},
		"bannerHTML" : function(templateName, data){
			bannerHTMLAdaptor(templateName, data);
		},
		"ChequeBookSuccess" : function(templateName,data){
			ChequeBookSuccessAdaptor(templateName, data);
		},
		"downloadChatHTML" : function(templateName, data){
          downloadChatHTMLAdaptor(templateName, data);
        } 
	}

	window.adaptor = adaptor;

})(window);