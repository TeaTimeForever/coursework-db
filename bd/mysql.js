var mysql = require('mysql');
var user = mysql.createClient({
	user: 'eq',
	password: 'hjvfirf',
	host: '127.0.0.1',
	port: 3306,
	database: 'dossee'
});

var db = {};
var projects = 'projects'
	, students = 'students'
	, teachers = 'teachers'
	, teams = 'teams'
	, teamMemb = 'team_members'
	, schools = 'high_schools'
;

user.query(
	"select * from " + projects 
, function(err, res, fields){
	db.projects = res;
});

user.query(
	"select * from " + students 
, function(err, res, fields){
	db.students = res;
});

user.query(
	"select * from " + teachers
, function(err, res, fields){
	db.teachers = res;
});

user.query(
	"select * from " + teams
, function(err, res, fields){
	db.teams = res;
});

user.query(
	"select * from " + teamMemb 
, function(err, res, fields){
	db.members = res;
});

user.query(
	"select * from " + schools
, function(err, res, fields){
	db.schools = res;
	user.end();
});

exports.db = db;
