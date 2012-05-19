require('tamejs').register();
var get = require('./test.tjs');

//var institutes = get.institutes(function(){
//	console.log('cb');
//});

var students = get.students(function(){
	console.log('cb');
});
