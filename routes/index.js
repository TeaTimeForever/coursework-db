var mysql = require('../bd/mysql.js')

exports.index = function(req, res){
  res.render('page', {
		scripts: [
			{ src: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js' },
			{ src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js' }
		],
		title: 'Main Page',
		selections: ['Institutes', 'Members', 'Projects', 'Teachers', 'Teams']	
	});
};

exports.institutes = function(req, res){
    res.render('institutes', {
			institutes: mysql.db.schools
		});
		//dust.stream.on('error', console.log(error));
};

exports.newInstitute = function(req, res){
    res.render('main', {
			user: 'K'
		});
};

exports.members = function(req, res){
    res.render('main', {
			user: 'K'
		});
};

exports.newMember = function(req, res){
    res.render('main', {
			user: 'K'
		});
};

exports.projects = function(req, res){
    res.render('main', {
			user: 'K'
		});
};

exports.newProject = function(req, res){
    res.render('main', {
			user: 'K'
		});
};

exports.teachers = function(req, res){
    res.render('main', {
			user: 'K'
		});
};

exports.newTeacher = function(req, res){
    res.render('main', {
			user: 'K'
		});
};

exports.teams = function(req, res){
    res.render('main', {
			user: 'K'
		});
};

exports.newTeam = function(req, res){
    res.render('main', {
			user: 'K'
		});
};

