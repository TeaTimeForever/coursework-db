var mysql = require('../modules/mysql.js');
function start(){ 
	mysql.data(function(db){
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
    		institutes: db.institutes
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
    		institute: db.institutes[id-1]
    	});
    };
  	
		exports.newSmth = function(req, res){
			console.log(res);
		}
		
		exports.l = 2;
  });
}

exports.start = start;
