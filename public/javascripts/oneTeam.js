function moveItem(ctrlSource, ctrlTarget) {
  var Source = document.getElementById(ctrlSource);
  var Target = document.getElementById(ctrlTarget);
  if ((Source != null) && (Target != null)) {
    while ( Source.options.selectedIndex >= 0 ) {
      var newOption = new Option(); // Create a new instance of ListItem
      newOption.text = Source.options[Source.options.selectedIndex].text;
      newOption.value = Source.options[Source.options.selectedIndex].value;
      
      Target.options[Target.length] = newOption; //Append the item in Target
      Source.remove(Source.options.selectedIndex);  //Remove the item from Source
    }
  }
}

jQuery(function($){
	var $showMem = $('.showMemb-Team')
		, $tMembers = $('.team-Stud')
		, $saveButton= $('.save-button')
		, $removeMember = $('#remove-member')
		, $addMember = $('#add-member')
	;
	var tmHidden = true;
	$showMem.click(function(){
		if(tmHidden){
			$tMembers.css('display', 'block');
			$showMem.text('Hide Team Members');
			tmHidden = false;
		} else {
			$tMembers.css('display', 'none');
			$showMem.text('Show Team Members');
			tmHidden = true;
		}
	});
	$removeMember.click(function(){
		moveItem('currentMembers', 'avaliableMembers');
	});
	$addMember.click(function(){
		moveItem('avaliableMembers', 'currentMembers');
	});
});


