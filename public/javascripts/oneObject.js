jQuery(function(){
	var $info = $('.info')
		, $edit = $('.edit-mode')
		, $saveButton = $('.save-button')
		, $editButton = $('.edit-button')
		, $cancelButton = $('.cancel-button')
	;
	
	$editButton.click(function(){
		$info.css('display', 'none');
		$edit.css('display', 'block');
	});
	$cancelButton.click(function(){
		$edit.css('display', 'none');
		$info.css('display', 'block');
	});
	$saveButton.click(function(){
		$('#edit-form').submit();
		$edit.css('display', 'none');
		$info.css('display', 'block');
	});
});
