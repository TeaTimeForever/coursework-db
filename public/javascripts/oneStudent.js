jQuery(function($){
	var $showTm = $('.showTeam-Stud')
		, $team = $('.stud-Team')
	;
	var tmHidden = true;
	$showTm.click(function(){
		if(tmHidden){
			$team.css('display', 'block');
			$showTm.text('Hide Team');
			tmHidden = false;
		} else {
			$team.css('display', 'none');
			$showTm.text('Show Team');
			tmHidden = true;
		}
	});
});


