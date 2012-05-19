jQuery(function($){
	var $editButton = $('body').find('.edit-button')
		, $saveButton = $('body').find('.save-button')
		, fields = $('.editable').children('span')
		, textareas = $('body').find('.edit-field')
	;
	var it = 0, currentValues = [];
	_.each(fields, function(n){
		$(textareas[it]).val($(n).text());
		currentValues.push($(n).text());
		it++;
	});
	
	$editButton.click(function(){
		$('.edit-mode').css('display', 'block');
	});

	$('#main-form').submit(function(e){
	});

	$saveButton.click(function(){
		var changed = false, it = 0;
		_.each(textareas, function(n){
			if($(n).val() != currentValues[it]){
				changed = true;
			}
			it++;
		});
		
		$('.edit-mode').css('display', 'none');
		$('#main-form').submit();
	});
});
