
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
app.get('/Institutes', routes.institutes);
app.get('/Institutes/new', routes.newInstitute);
app.get('/Members', routes.members);
app.get('/Members/new', routes.newMember);
app.get('/Projects', routes.projects);
app.get('/Projects/new', routes.newProject);
app.get('/Teachers', routes.teachers);
app.get('/Teachers/new', routes.newTeacher);
app.get('/Teams', routes.teams);
app.get('/Teams/new', routes.newTeam);

app.listen(3001, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


