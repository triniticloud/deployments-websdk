(function(window){
	
	window.initializeSliderLabels = function(){

	  	var sliderCards = $('.container-fluid.debit-limit');
	  	var currentCard = sliderCards[sliderCards.length-1];

		if($(currentCard).find('#domestic-atm .mb_slider')){
	        $('#domestic-atm .mb_slider').mbSlider({
	            formatValue : function(val){
	                return 'Rs.'+val;
	            }
	        });
	    }
	    if($(currentCard).find('#domestic-purchase .mb_slider')){
	        $('#domestic-purchase .mb_slider').mbSlider({
	            formatValue : function(val){
	                return 'Rs.'+val;
	            }
	        });
	    }
	    if($(currentCard).find('#international-atm .mb_slider')){
	        $('#international-atm .mb_slider').mbSlider({
	            formatValue : function(val){
	                return 'Rs.'+val;
	            }
	        });
	    }
		
		if($(currentCard).find('#international-purchase .mb_slider')){
      	  $('#international-purchase .mb_slider').mbSlider({
            formatValue : function(val){
                return 'Rs.'+val;
            	}
          });
    	}
	}

	window.extractSliderValues = function(btn){
    	
    	var domesticAtmLmt,
    		domesticPosLmt,
        	intlAtmLmt,
        	intlPosLmt,
        	hasIntl;

    	var currentCard = $(btn).closest('.container-fluid.debit-limit');

	    if($(currentCard).find('#domestic-atm') && $(currentCard).find('#domestic-purchase')){
	        domesticAtmLmt = $(currentCard).find('#domestic-atm').find('.mb_sliderValueLabel').text().split('Rs.')[1];
	        domesticPosLmt = $(currentCard).find('#domestic-purchase').find('.mb_sliderValueLabel').text().split('Rs.')[1];
	    } 
	    if($($(currentCard).find('#international-atm')).length!==0 && $($(currentCard).find('#international-purchase')).length !==0){
	        intlAtmLmt = $(currentCard).find('#international-atm').find('.mb_sliderValueLabel').text().split('Rs.')[1];
	        intlPosLmt = $(currentCard).find('#international-purchase').find('.mb_sliderValueLabel').text().split('Rs.')[1];
	        hasIntl = true;
	    } else{
	        hasIntl = false;
	    }

	    var parsedPayload = JSON.parse(JSON.parse($(btn).attr('data-value')));
	    parsedPayload['userInputs'] = {};
	    parsedPayload['userInputs']['newDomesticATMLmt'] = domesticAtmLmt;
	    parsedPayload['userInputs']['newDomesticPOSLmt'] = domesticPosLmt;

	    if(hasIntl){
	        parsedPayload['userInputs']['intlChange'] = 'yes'; 
	        parsedPayload['userInputs']['newIntlATMLmt'] = intlAtmLmt;
	        parsedPayload['userInputs']['newIntlPOSLmt'] = intlPosLmt;
	    }else{
	        parsedPayload['userInputs']['intlChange'] = 'no'; 
	        parsedPayload['userInputs']['newIntlATMLmt'] = '';
	        parsedPayload['userInputs']['newIntlPOSLmt'] = '';
	    }
	    parsedPayload['userInputs']['limitSet'] = 'yes'; 
	    submitCustomValues(JSON.stringify(parsedPayload));

}	

	function debitCardLimitChangeHTMLAdaptor(templateName, resp){
		var container = "messages";
		var data = {}
		data['payload'] = resp.payload;
		data['buttons'] = resp.card.content[0].element.buttons
		data.payload.limits.forEach(function(limit){
			var category = limit.title.toLowerCase();
			limit.limit.forEach(function(limit){
 				limit['id'] = category+'-'+limit.name.split(' ')[0].toLowerCase();
			});
		});
		loadDynamicCustomTemplate(templateName, container);
		appendTemplate(templateName, container, data);

	}
	window.debitCardLimitChangeHTMLAdaptor = debitCardLimitChangeHTMLAdaptor;
})(window)

