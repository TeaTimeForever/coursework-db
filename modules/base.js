var _ = require('underscore');

function DbCollection(db, model){
	this.db = db;
	this.model = model;
}
DbCollection.prototype.getMany = function(conditionString, cb){

	console.log("GET MANY STARTED");
	var self = this;
	var result = [];
	if(typeof(conditionString) == 'function'){
		cb = conditionString;
		conditionString = '(1 = 1)';
	}
	var sql = 'select * from ' + this.model.table + ' where ' + conditionString;

	console.log("DB QUERY STARTED");
	this.db.query(sql, function(err, res, field){
		
		console.log("DB QUERY FINISHED");
		//console.log(sql);
		//console.log(res);
		if(err){
			cb(err);
		} else {
			_.each(res, function(row){
				result.push(new DbObject(self, row));
			});
			cb(false, result);
		}
	});
}

DbCollection.prototype.getOne = function(conditionString, cb){
  	if(typeof(conditionString) == 'function'){
  		cb = conditionString;
  		conditionString = '(1 = 1)';
  	}

	console.log("GET ONE STARTED");
	this.getMany(conditionString, function(err, data){
		console.log("GET MANY FINISHED");

		console.log('~~~~~');
		console.log(cb.toString());
		console.log('~~~~~');
		if(err){
			console.log('into if')
			cb(err);
		} else if (data.length == 0){
			console.log('into elsif 1')
			cb('no data');
		} else if (data.length > 1){
			console.log('into elsif 2')
			cb('too many data');
		} else {
			cb(false, data[0]);
		}
	});
};
	

DbCollection.prototype.getByKey = function(key, cb){
	var conditionString = this.model.key + " = '" + key + "'";
	this.getOne(conditionString, cb);
}

function DbObject(collection, data){
	this.collection = collection;
	this.data = data;
}

DbObject.prototype.getRelated = function(name, cb){
	var self =  this;
	var rel = this.collection.model.relations[name];
	var conditionString = '(1 = 1)';
	_.each(rel.join, function(foreign, own){
		 conditionString += " AND " + foreign + " = '" + self.data[own] +"'"	;
	});
	var foreign = this.collection.db.myCollections[rel.model];

	if(rel.type == 'one'){
		foreign.getOne(conditionString, cb);
	} else {
		foreign.getMany(conditionString, cb);
	}
}


DbObject.prototype.getCrossDomain = function(cross, to, cb){
	var self = this;
	var crossRel = this.collection.model.relations[cross];
	var crossForeign = this.collection.db.myCollections[crossRel.model];
  var rel = crossForeign.collection.model.relations[to];
	var foreign = crossForeign.collection.db.myCollections[rel.model];	
	var conditionString = '(1 = 1)';

	if(rel.type == 'one'){
		foreign.getOne(conditionString, cb);
	} else {
		foreign.getMany(conditionString, cb);
	}
}

DbObject.prototype.getCrossRelated = function(cross, to, cb){
	var self = this;
	var crossRel = this.collection.model.relations[cross];
	var crossForeign = this.collection.db.myCollections[crossRel.model];
	var crossConditionString = '(1 = 1)';
	_.each(crossRel.join, function(foreign, own){
		 crossConditionString += " AND " + foreign + " = '" + self.data[own] +"'"	;
	});
	var one = true;
	var getSome;
	if(crossRel.type == 'one'){
		getSome = function(cb){
			return crossForeign.getOne(crossConditionString, function(err, x){cb(err, [x])});
		}
	} else {
		one = false;
		getSome = function(cb){
		 	return	crossForeign.getMany(crossConditionString, cb);
		}
	}
	getSome(function(err, x){
		var result = [];
		if(err){
		  return cb(err);
		}
		_.each(x, function(crossObject){
      var rel = crossObject.collection.model.relations[to];
    	var foreign = crossObject.collection.db.myCollections[rel.model];	
			var conditionString = '(1 = 1)';
			_.each(rel.join, function(foreign, own){
			 	conditionString += " AND " + foreign + " = '" + crossObject.data[own] +"'"	;
			});
			var getRelated;
  		if(rel.type == 'one'){
	  		getRelated = function(cb){	
					return foreign.getOne(conditionString, function(err, x){console.log("GET ONE");cb(err, [x])});
				}
  		} else {
				one = false;
				getRelated = function(cb){	
					return foreign.getMany(conditionString, cb);
				}
  		}
			getRelated(function(err, x){
				console.log('A');
				if(!err){
				  console.log(x);
					result = result.concat(x);
				} else {
					//TODO
					console.log('ERROR');
					console.log(err);
				}
			});
		});
		if(one){
		  console.log('B');
			console.log(result);
			if(result.length == 0){
			  cb('no data', null);
			} else {
				cb(false, result[0]);
			}
		} else {
			cb(false, result);
		}
	});
}


function initDb(db, models){
	db.myCollections = {};
	_.each(models, function(model, name){
		db.myCollections[name] = new DbCollection(db, model);
	})
	return db.myCollections;
}

module.exports = initDb;
