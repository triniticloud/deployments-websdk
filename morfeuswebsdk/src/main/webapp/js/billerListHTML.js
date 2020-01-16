(function(window){

	function billerListHTMLAdaptor(templateName, resp){

		var container = "messages";
		var listData = [];
		var category = resp.payload.payeeCategory || "";
		var elementStyle = resp.card.elementStyle;
		var data = resp.card.content;
		var listTitle = resp.payload.title;

		for (var j = 0; j < data.length; j++) {

		    if (elementStyle == "caption" && j == 0) {

		        var title = (data[j].element.title) ? data[j].element.title.text : "";
		        var subtitle = (data[j].element.subtitle) ? data[j].element.subtitle.text : "";

		        var rowcaption = {
		            "type": "rowcaption",
		            "title": title,
		            "subtitle": subtitle
		        }

		        listData.push(rowcaption);

		    } else {

		        var isRowbutton = (data[j].element.rowButton == true) ? true : false;

		        if (isRowbutton) {

		            if (data[j].element.buttons) {
		                var rowbutton = {
		                    "type": "rowbutton",
		                    "buttons": data[j].element.buttons,
		                };

		                listData.push(rowbutton);
		            }


		        } else {

		            var isImage = (data[j].element.image && data[j].element.image.imageUrl) ? true : false;
		            var isButtons = (data[j].element.buttons && data[j].element.buttons.length > 0) ? true : false;
		            var title = (data[j].element.title) ? data[j].element.title.text : "";
		            var subtitle = (data[j].element.subtitle) ? data[j].element.subtitle.text : "";

		            var row = {
		                "type": "row",
		                "title": title,
		                "subtitle": subtitle
		            };

		            if (isImage) {
		                row["imageurl"] = data[j].element.image.imageUrl;
		            }

		            if (isButtons) {
		                row["buttons"] = data[j].element.buttons;
		            }

		            listData.push(row);

		        }

		    }
		}

		console.log(listData);
		
		loadDynamicCustomTemplate(templateName, container);
		appendTemplate(templateName, container, {"data":listData, "category" : category, "listTitle":listTitle});

	}

	window.billerListHTMLAdaptor = billerListHTMLAdaptor;

})(window);