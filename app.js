
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
	, app = express.createServer()
	, dust = require('express-dust/lib/dust')
;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'dustjs-linkedin');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routesnpm ERR! Couldn't read dependencies.

app.get('/', routes.index);
app.get('/institutes', routes.institutes);
app.get('/institutes/new', routes.newInstitute);
app.get('/members', routes.members);
app.get('/members/new', routes.newMember);
app.get('/projects', routes.projects);
app.get('/projects/new', routes.newProject);
app.get('/teachers', routes.teachers);
app.get('/teachers/new', routes.newTeacher);
app.get('/teams', routes.teams);
app.get('/teams/new', routes.newTeam);

app.listen(3001, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


