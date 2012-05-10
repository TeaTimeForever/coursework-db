var mysql = require('../bd/mysql.js')

exports.index = function(req, res){
  res.render('page', {
		scripts: [
			{ src: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js' },
			{ src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js' }
		],
		title: 'mypage',
		name: 'K',
		projects: mysql.projects
	});
};
exports.users = function(req, res){
    res.render('main', {
			user: 'K'
		});
		//dust.stream.on('error', console.log(error));
};

