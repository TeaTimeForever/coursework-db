//TODO REFACTORING!!!
jQuery(function($){
	var $showTc = $('.showInst-Teachers')
		, $teachers = $('.inst-Teachers')
		, $showSt = $('.showInst-Students')
		, $students = $('.inst-Students')
		, $showPr = $('.showInst-Project')
		, $project = $('.inst-Project')
		, $deleteButton = $('.delete-button')
		, $editButton = $('.edit-button')

	;
	var tcHidden = true;
	$showTc.click(function(){
		if(tcHidden){
			$teachers.css('display', 'block');
			$showTc.text('Hide Teachers');
			tcHidden = false;
		} else {
			$teachers.css('display', 'none');
			$showTc.text('Show Teachers');
			tcHidden = true;
		}
	});

	var stHidden = true;
	$showSt.click(function(){
		if(stHidden){
			$students.css('display', 'block');
			$showSt.text('Hide Students');
			stHidden = false;
		} else {
			$students.css('display', 'none');
			$showSt.text('Show Students');
			stHidden = true;
		}
	});

	var prHidden = true;
	$showPr.click(function(){
		if(prHidden){
			$project.css('display', 'block');
			$showPr.text('Hide Project');
			prHidden = false;
		} else {
			$project.css('display', 'none');
			$showPr.text('Show Project');
			prHidden = true;
		}
	});

	$editButton.click(function(){
		
	});








//	$('#main-form').submit(function(e){
//	});
//
//	$saveButton.click(function(){
//		var changed = false, it = 0;
//		_.each(textareas, function(n){
//			if($(n).val() != currentValues[it]){
//				changed = true;
//			}
//			it++;
//		});
//		
//		$('.edit-mode').css('display', 'none');
//		$('#main-form').submit();
//	});
});
