
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
app.get('/Projects', routes.projects);
app.get('/Teams', routes.teams);
app.get('/Students', routes.studentsI); // by default - sort by Institutes
app.get('/StudentsT', routes.studentsT);
app.get('/Teachers', routes.teachers);

app.get('/Institutes/new', routes.newInstitute);
app.get('/Institutes/:id', routes.oneInstitute);
app.post('/Institutes/edit', routes.newSmth);

app.get('/test', routes.test);
app.listen(3001, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


