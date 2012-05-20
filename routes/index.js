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

function start(){ 
//	mysql.data(function(db){
    exports.index = function(req, res){
      res.render('page', {
    		scripts: [
    			{ src: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js' },
    			{ src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js' }
    		],
				styles: [
					{ src: '/public/stylesheets/list.css'}
				],
    		title: 'Main Page',
    		selections: ['Institutes', 'Students', 'Projects', 'Teachers', 'Teams']	
    	});
    };
     
    exports.test = function(req, res){
      res.render('test', all);
		}

    exports.institutes = function(req, res){
      res.render('institutes', all);
    	//dust.stream.on('error', console.log(error));
    };
 
    exports.projects = function(req, res){
      res.render('projects', all);
    };

    exports.newInstitute = function(req, res){
      res.render('main', {
    		user: 'K'
    	});
    };
    
    exports.oneInstitute = function(req, res){
    	var id = req.params.id
      res.render('instituteItem', {
    		institute: db.institutes[id-1]
    	});
    };
  	
		exports.newSmth = function(req, res){
			console.log(res);
		}
		
//  });
}

exports.start = start;
