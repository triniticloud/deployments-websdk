(function(window){

	function billPaymentDecisionHTMLAdaptor(templateName, resp){

		var container = "messages";
		var listData = [];
		var data = resp.card.content;
		var listTitle = resp.payload.list[0].bp_confirm_msg;

		if(data.length>0){

			var rows = data[0].element.buttons;
			var rowsCount = data[0].element.buttons.length;

			rows.forEach(function(rowElement){
				
				var title = rowElement.text;
				var button = rowElement;

				var buttons = [];
					buttons.push(button);


					var row = {
 		                "type": "row",
		                "title": title,
						"buttons" : buttons
 		            };

 		           listData.push(row);

			});
		}
		
		loadDynamicCustomTemplate(templateName, container);
		appendTemplate(templateName, container, {"data":listData, "listTitle":listTitle});

	}

	window.billPaymentDecisionHTMLAdaptor = billPaymentDecisionHTMLAdaptor;

})(window);