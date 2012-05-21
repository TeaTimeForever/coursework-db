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

function addMeta(obj){
	obj.meta ={
		scripts: [
			{ src: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js' },
			{ src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js' },
			{ src: '/javascripts/edit.js'},
			{ src: '/javascripts/create.js'}
		],
		styles: [
			{ src: '/stylesheets/list.css'},
			{ src: '/stylesheets/main.css'},
			{ src: '/stylesheets/newObject.css'},
			{ src: '/stylesheets/style.css'}
		],
		title: 'Main Page',
		selections: ['Institutes', 'Students', 'Projects', 'Teachers', 'Teams']	
	}
	return obj; 
}

var all = addMeta(makeCollections(db, models));

function start(){ 
  exports.index = function(req, res){
			res.render('page', all);
    };
   
// INSTITUTES
    exports.institutes = function(req, res){
      res.render('institutes', all);
    };
    exports.newInstitute = function(req, res){
      res.render('newInstitute', all);
    };
//    exports.oneInstitute = function(req, res){
//			var id = req.params.id;
//      res.render('oneInstitute', );
//    };
    exports.oneInstitute = function(req, res){
			var id = req.params.id;
      res.render('oneInstitute', addMeta({
				institute: all.institutes({id: id}).dustify()
			}));
    };
		exports.createInstitute = function(req, res){
			var inst = req.body.institute;
			db.query('insert into institutes ' +
			 'set name = ?, country = ?, address = ?, postal_code = ?', [
				inst.name, inst.country, inst.address, inst.postal_code
			]);
      res.render('successInstitute', all);
		}
    
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
		exports.createProject= function(req, res){
			var proj = req.body.project;
			db.query('insert into projects ' +
			 'set name = ?, university_id = ?, start_date = ?, end_date = ?, mark = ?, description = ?', [
				proj.name, proj.university_id, proj.start_date, proj.end_date, proj.mark, proj.description
			]);
      res.render('successProject', all);
		}

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
		exports.createTeacher = function(req, res){
			var tc = req.body.teacher;
			db.query('insert into teachers ' +
			 'set Firstname = ?, Lastname = ?, university_id = ?, specialty = ?, email = ?, personal_code = ?', [
				tc.firstname, tc.lastname, tc.institute_id, tc.specialty, tc.email, tc.personal_code
			]);
      res.render('successTeacher', all);
		}

// TEAMS
    exports.teams = function(req, res){
      res.render('teams', all[teams_]);
    };
    exports.newTeam= function(req, res){
      res.render('newTeam', all);
    };
    exports.oneTeam= function(req, res){
			var id = req.params.id;
      res.render('oneTeam', all);
    };
		exports.createTeam = function(req, res){
			var team = req.body.team;
			db.query('insert into teams ' +
			 'set name = ?, project_id = ?', [
				team.name, team.project_id
			]);
      res.render('successTeam', all);
		}

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
		exports.createStudent= function(req, res){
			var st = req.body.student;
			db.query('insert into students ' +
			 'set firstname = ?, lastname = ?, institute_id = ?, education_step = ?, specialty = ?, mark = ?, description = ?, email = ?, personal_code = ?', [
				st.firstname, st.lastname, st.institute_id, st.education_step, st.specialty, st.mark, st.description, st.email, st.personal_code
			]);
      res.render('successStudent', all);
		}

}

exports.start = start;
