//TODO проверить данные перед тем как заноситьих в базу
jQuery(function($){
	var $createButton = $('.create-button');
	$createButton.click(function(){
		$('#create-form').submit();
	});	
});
