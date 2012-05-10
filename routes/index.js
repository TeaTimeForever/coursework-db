var mysql = require('../bd/mysql.js')

exports.index = function(req, res){
  res.render('page', {
		scripts: [
			{ src: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js' },
			{ src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js' }
		],
		title: 'Main Page',
		selections: ['Institutes', 'Students', 'Projects', 'Teachers', 'Teams']	
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

exports.oneInstitute = function(req, res){
	var id = req.params.id
  res.render('instituteItem', {
		institute: 	mysql.db.schools[id-1]
	});
};

exports.students = function(req, res){
  res.render('students', {
		students: mysql.db.students
	});
};

exports.newStudent = function(req, res){
  res.render('main', {
		user: 'K'
	});
};

exports.oneStudent = function(req, res){
	var pCode = req.params.personalCode;
	var i;
	for(i = 0; i < mysql.db.students.length; i++){
		if(mysql.db.students[i].personal_code == pCode){
			break;
		}
	}

	res.render('studentItem', {
		student: mysql.db.students[i],
		institute: mysql.db.schools[mysql.db.students[i].university_id - 1]
	});
};

exports.projects = function(req, res){
  res.render('projects', {
		projects: mysql.db.projects
	});
};

exports.newProject = function(req, res){
  res.render('main', {
		user: 'K'
	});
};

exports.oneProject = function(req, res){
	var id = req.params.id
  res.render('projectItem', {
		project: 	mysql.db.projects[id-1],
		institute: mysql.db.schools[id-1]
	});
};


exports.teachers = function(req, res){
  res.render('teachers', {
		teachers: mysql.db.teachers
	});
};

exports.newTeacher = function(req, res){
  res.render('main', {
		user: 'K'
	});
};

exports.oneTeacher = function(req, res){
	var pCode = req.params.personalCode;
	var i;
	for(i = 0; i < mysql.db.teachers.length; i++){
		if(mysql.db.teachers[i].personal_code == pCode){
			break;
		}
	}

	res.render('teacherItem', {
		teacher: mysql.db.teachers[i],
		institute: mysql.db.schools[mysql.db.teachers[i].university_id - 1]
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

