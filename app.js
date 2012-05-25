
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
	, app = express.createServer()
	, dust = require('express-dust/lib/dust')
	, stylus = require('stylus')
;

function compile(str, path){
	return stylus(str)
		.set('filename', path)
		.set('compress', true);
}

app.use(stylus.middleware({
    src: __dirname + '/views'
  , dest: __dirname + '/public'
  , compile: compile
}));

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'dustjs-linkedin');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
	app.use("/public/images", express.static(__dirname + "/public/images/"));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});
// Routesnpm ERR! Couldn't read dependencies.
routes.start();

app.get('/', routes.index);

app.get('/Institutes', routes.institutes);
app.get('/Institutes/new', routes.newInstitute);
app.get('/Institutes/:id', routes.oneInstitute);
app.post('/Institutes/delete/:id', routes.deleteInstitute);
app.post('/Institutes/edit/:id', routes.editInstitute);
app.post('/Institutes/create', routes.createInstitute);

app.get('/Projects', routes.projects);
app.get('/Projects/new', routes.newProject);
app.get('/Projects/:id', routes.oneProject);
app.post('/Projects/create', routes.createProject);
app.post('/Projects/delete/:id', routes.deleteProject);
app.post('/Projects/edit/:id', routes.editProject);

app.get('/Teams', routes.teams);
app.get('/Teams/new', routes.newTeam);
app.get('/Teams/:id', routes.oneTeam);
app.post('/Teams/create', routes.createTeam);
app.post('/Teams/delete/:id', routes.deleteTeam);
app.post('/Teams/edit/:id', routes.editTeam);

app.get('/Students', routes.studentsI); // by default - sort by Institutes
app.get('/StudentsT', routes.studentsT);
app.get('/StudentsOrd/:by', routes.studentsOrd);
app.get('/Students/new', routes.newStudent);
app.get('/Students/:personal_code', routes.oneStudent);
app.post('/Students/create', routes.createStudent);
app.post('/Students/delete/:personal_code', routes.deleteStudent);
app.post('/Students/edit/:personal_code', routes.editStudent);

app.get('/Teachers', routes.teachers);
app.get('/Teachers/new', routes.newTeacher);
app.get('/Teachers/:personal_code', routes.oneTeacher);
app.post('/Teachers/create', routes.createTeacher);
app.post('/Teachers/delete/:personal_code', routes.deleteTeacher);
app.post('/Teachers/edit/:personal_code', routes.editTeacher);

app.get('/test', routes.test);
app.listen(3001, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


