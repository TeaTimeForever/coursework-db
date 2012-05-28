//TODO REFACTORING!!!
jQuery(function($){
	var $showPr = $('.endedProj-button')
		, $project = $('.endedProj')
	;
	var prHidden = true;
	$showPr.click(function(){
		if(prHidden){
			$project.css('display', 'block');
			$showPr.text('Hide Projects');
			prHidden = false;
		} else {
			$project.css('display', 'none');
			$showPr.text('Show ended Projects');
			prHidden = true;
		}
	});
});
