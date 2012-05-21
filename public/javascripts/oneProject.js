jQuery(function($){
	var $showTm = $('.showProj-Team')
		, $members = $('.proj-Team')
	;
	var tmHidden = true;
	$showTm.click(function(){
		if(tmHidden){
			$members.css('display', 'block');
			$showTm.text('Hide Team');
			tmHidden = false;
		} else {
			$members.css('display', 'none');
			$showTm.text('Show Team');
			tmHidden = true;
		}
	});

});


