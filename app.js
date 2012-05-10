
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
app.get('/users', routes.users);

<<<<<<< HEAD
app.listen(3001, function(){
=======
app.listen(3000, function(){
>>>>>>> 0094cf19565bd7a5780d6a3167070bc19ba9686f
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


