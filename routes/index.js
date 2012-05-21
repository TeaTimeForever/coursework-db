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

var queries = {
	institutesWithoutProjects: "select i.* from institutes as i " + 
				"left join projects as p on i.id = p.university_id " +
				"where p.id is null	"

}

function addMeta(root){
	if(typeof(root) === 'function'){
		root = root.dustify();
	}
	obj = {
		root: root
	};
	obj.meta ={
		scripts: [
			{ src: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js' },
			{ src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js' },
			{ src: '/javascripts/edit.js'},
			{ src: '/javascripts/oneInstitute.js'},
			{ src: '/javascripts/oneProject.js'},
			{ src: '/javascripts/oneObject.js'},
			{ src: '/javascripts/create.js'}
		],
		styles: [
			{ src: '/stylesheets/list.css'},
			{ src: '/stylesheets/main.css'},
			{ src: '/stylesheets/oneInstitute.css'},
			{ src: '/stylesheets/oneProject.css'},
			{ src: '/stylesheets/newObject.css'},
			{ src: '/stylesheets/oneObject.css'},
			{ src: '/stylesheets/style.css'}
		],
		title: 'Main Page',
		selections: ['Institutes', 'Students', 'Projects', 'Teachers', 'Teams']	
	}
	return obj;
}

var all = makeCollections(db, models);

function start(){ 
  exports.index = function(req, res){
			res.render('page', addMeta(all));
    };
   
// INSTITUTES
    exports.institutes = function(req, res){
      res.render('institutes', addMeta(all.institutes));
    };
    exports.newInstitute = function(req, res){
      res.render('newInstitute', addMeta());
    };
    exports.oneInstitute = function(req, res){
			var id = req.params.id;
      res.render('oneInstitute', addMeta(
				all.institutes({where:{id: id}})
			));
    };
		exports.createInstitute = function(req, res){
			var inst = req.body.institute;
			db.query('insert into institutes ' +
			 'set name = ?, country = ?, address = ?, postal_code = ?', [
				inst.name, inst.country, inst.address, inst.postal_code
			]);
      res.render('successInstitute', addMeta());
		};
		exports.deleteInstitute = function(req, res){
			var id = req.params.id;
			db.query('delete from institutes where id = ' + id);
      res.render('successDelInstitute', addMeta(all));
		};
  	exports.editInstitute = function(req, res){
			var id = req.params.id;
			var inst = req.body.institute;
			db.query("update institutes " +
				"set name = '" + inst.name + "', address =  '" + inst.address + "', postal_code = '" + inst.postal_code + "' " +
				 "where id=" + id
			)
      res.render('oneInstitute', addMeta(
				all.institutes({where:{id: id}})
			));
		};

// PROJECTS
		exports.projects = function(req, res){
      res.render('projects', addMeta(all.projects));
    };
    exports.newProject = function(req, res){
      res.render('newProject', addMeta(all.institutes({sql: queries.institutesWithoutProjects})));
    };
    exports.oneProject = function(req, res){
			var id = req.params.id;
      res.render('oneProject', addMeta(
				all.projects({where:{id: id}})
			));
    };
		exports.createProject = function(req, res){
			var proj = req.body.project;
			db.query('insert into projects ' +
			 'set name = ?, university_id = ?, start_date = ?, end_date = ?, mark = ?, description = ?', [
				proj.name, proj.university_id, proj.start_date, proj.end_date, proj.mark, proj.description
			]);
      res.render('successProject', addMeta());
		}
		exports.deleteProject = function(req, res){
			var id = req.params.id;
			db.query('delete from projects where id = ' + id);
      res.render('successDelProject', addMeta());
		};
  	exports.editProject = function(req, res){
			var id = req.params.id;
			var proj = req.body.project;
			db.query("update projects" +
				"set name = '" + proj.name + "', start_date =  '" + proj.start_date + "', end_date = '" + end_date + "' " + ", mark = " + proj.mark + ", description = '" + proj.description + "' " + 
				 "where id=" + id
			)
      res.render('oneProject', addMeta(
				all.projects({where:{id: id}})
			));
		};

//TEACHERS
    exports.teachers = function(req, res){
      res.render('teachers', addMeta(all.teachers));
    };
    exports.newTeacher = function(req, res){
      res.render('newTeacher', addMeta(all));
    };
    exports.oneTeacher = function(req, res){
			var pcode = req.params.personal_code;
      res.render('oneTeacher', addMeta(all.teachers({where: {personal_code: pcode}})));
    };
		exports.createTeacher = function(req, res){
			var tc = req.body.teacher;
			db.query('insert into teachers ' +
			 'set Firstname = ?, Lastname = ?, university_id = ?, specialty = ?, email = ?, personal_code = ?', [
				tc.firstname, tc.lastname, tc.institute_id, tc.specialty, tc.email, tc.personal_code
			]);
      res.render('successTeacher', addMeta(all));
		}

// TEAMS
    exports.teams = function(req, res){
      res.render('teams', addMeta(all.teams));
    };
    exports.newTeam= function(req, res){
      res.render('newTeam', addMeta(all));
    };
    exports.oneTeam= function(req, res){
			var id = req.params.id;
      res.render('oneTeam', addMeta(all.teams({where: {id: id}})));
    };
		exports.createTeam = function(req, res){
			var team = req.body.team;
			db.query('insert into teams ' +
			 'set name = ?, project_id = ?', [
				team.name, team.project_id
			]);
      res.render('successTeam', addMeta(all));
		}

// STUDENTS
    exports.studentsI = function(req, res){
			//sort by institute
      res.render('studentsI', addMeta(all));
    };
    exports.studentsT = function(req, res){
			//sort by teams
      res.render('studentsT', addMeta(all));
    };
    exports.newStudent = function(req, res){
      res.render('newStudent', addMeta(all));
    };
    exports.oneStudent = function(req, res){
			var pcode = req.params.personal_code;
      res.render('oneStudent', addMeta(all.students({where: {personal_code: pcode}})));
    };
		exports.createStudent= function(req, res){
			var st = req.body.student;
			db.query('insert into students ' +
			 'set firstname = ?, lastname = ?, institute_id = ?, education_step = ?, specialty = ?, mark = ?, description = ?, email = ?, personal_code = ?', [
				st.firstname, st.lastname, st.institute_id, st.education_step, st.specialty, st.mark, st.description, st.email, st.personal_code
			]);
      res.render('successStudent', addMeta());
		}
		exports.studentsOrd = function(req, res){
			res.render('studentsOrd', addMeta(all.students({order: [req.params.by]})));
		}
}
exports.start = start;
