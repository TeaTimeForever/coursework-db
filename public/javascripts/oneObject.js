jQuery(function(){
	var $info = $('.info')
		, $edit = $('.edit-mode')
		, $saveButton = $('.save-button')
		, $editButton = $('.edit-button')
		, $deleteButton = $('.delete-button')
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
	$deleteButton.click(function(){
		var answer = confirm ("Are you sure you want to delete this item?");
		if (answer){
			$('#delete-form').submit();
		}
	});
});
