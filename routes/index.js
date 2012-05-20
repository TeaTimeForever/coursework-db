var _ = require('underscore')
	, makeCollections = require('../modules/base.js')
	, models = require('../modules/schema.js')
	, mysql = require('mysql')
	, async = require('async')
;

var db = mysql.createClient({
	user: 'eq',
	password: 'hjvfirf',
	host: '127.0.0.1',
	port: 3306,
	database: 'dossee'
});

var all = makeCollections(db, models);
all.meta ={
	scripts: [
		{ src: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js' },
		{ src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js' },
		{ src: '/javascripts/edit.js'}
	],
	styles: [
		{ src: '/stylesheets/list.css'},
		{ src: '/stylesheets/main.css'},
		{ src: '/stylesheets/style.css'}
	],
	title: 'Main Page',
	selections: ['Institutes', 'Students', 'Projects', 'Teachers', 'Teams']	
} 

function start(){ 
  exports.index = function(req, res){
			res.render('page', all);
    };
   	
		exports.newSmth = function(req, res){
			console.log(res);
		}    
//    exports.test = function(req, res){
//      res.render('test', all);
//		}

// INSTITUTES
    exports.institutes = function(req, res){
      res.render('institutes', all);
    };
    exports.newInstitute = function(req, res){
      res.render('newInstitute', all);
    };
    exports.oneInstitute = function(req, res){
			var id = req.params.id;
      res.render('oneInstitute', all);
    };
    
// PROJECTS
		exports.projects = function(req, res){
      res.render('projects', all);
    };
    exports.newProject = function(req, res){
      res.render('newProject', all);
    };
    exports.oneProject = function(req, res){
			var id = req.params.id;
      res.render('oneProject', all);
    };

//TEACHERS
    exports.teachers = function(req, res){
      res.render('teachers', all);
    };
    exports.newTeacher = function(req, res){
      res.render('newTeacher', all);
    };
    exports.oneTeacher = function(req, res){
			var pcode = req.params.personal_code;
      res.render('oneTeacher', all);
    };

// TEAMS
    exports.teams = function(req, res){
      res.render('teams', all);
    };
    exports.newTeam= function(req, res){
      res.render('newTeam', all);
    };
    exports.oneTeam= function(req, res){
			var id = req.params.id;
      res.render('oneTeam', all);
    };

// STUDENTS
    exports.studentsI = function(req, res){
			//sort by institute
      res.render('studentsI', all);
    };
    exports.studentsT = function(req, res){
			//sort by teams
      res.render('studentsT', all);
    };
    exports.newStudent = function(req, res){
      res.render('newStudent', all);
    };
    exports.oneStudent = function(req, res){
			var pcode = req.params.personal_code;
      res.render('oneStudent', all);
    };

}

exports.start = start;
