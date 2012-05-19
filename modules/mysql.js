var mysql = require('mysql');
var user = mysql.createClient({
	user: 'eq',
	password: 'hjvfirf',
	host: '127.0.0.1',
	port: 3306,
	database: 'dossee'
});

var db = {};
var tables = [
	'projects',
	'students',
	'teachers', 
	'teams', 
	'team_members', 
	'institutes'
];

var getData = function(cb){
	var i, count = 0;
	for(i = 0; i < tables.length; i++){
		(function(i){
			user.query("select * from " + tables[i], function(err, res, fields){
				count += 1;
				db[tables[i]] = res;
				if(count == tables.length){
					user.end();
					cb(db);
				}
			})
		})(i)
	}
};
exports.data = getData;


