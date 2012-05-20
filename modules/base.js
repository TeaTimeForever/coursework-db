var _ = require('underscore');

_.str = require('underscore.string');
_.mixin(_.str.exports());
_.str.include('Underscore.string', 'string');

//подготавливает объекты для ассинхронного использования согласно данным типа schema.js
function makeCollections(db, models){
	all = {};
	function DbCollection(model){
		this.model = model;
	}
	function eq(x,y){
		//TODO заменить 2)' на \' 		и 1) \ на \\
		return "("+x + "='"+y+"')";
	}
	function makeCondition(condition){
		var type = typeof(condition);
		if(type == 'string'){
			return condition;
		} else if(type == 'array'){
			return _(condition).map(makeCondition).reduce(function(a, b){
				return a==''? b: a + " and " + b
			}, "");
		} else if(type == 'object'){
			return _(condition).reduce(function(a,b,c){
				return a==''? eq(c,b): a + " and " + eq(c,b)
			}, "")
		}
	}
	function makeWhere(condition){
		var compiled = makeCondition(condition);
		if(compiled == ''){
			return '';
		} else {
			return " where " + compiled + " ";
		}
	}
	DbCollection.prototype.getMany = function(condition, cb){
		var self = this;
		var result = [];
		if(typeof(condition) == 'function'){
			cb = condition;
			condition = '';
		}
		var sql = 'select * from ' + this.model.table + makeWhere(condition); 
		db.query(sql, function(err, res, field){
			if(err){
				cb(err);
			} else {
				_.each(res, function(row){
					result.push(new self.create(row));
				});
				cb(false, result);
			}
		});
	}
	//async - метод в который передается cb. функция изменяет async
	function dustify(async){
		return function(chunk, context, bodies, params){
			return chunk.map(function(chunk){
				async(function(err, data){
					if(err){
						if(bodies['error']){
							chunk.render(bodies['error'], context.push(err));
						} else {
							chunk.write(err);
						}
					} else {
						return chunk.section(data, context, bodies, params).end();
					}
					return chunk.end();
				});
			});
		}
	}
	_.each(models, function(model, name){
		var collection = new DbCollection(model);
		all[name] = (function(condition, cb){
			collection.getMany(condition, cb);
		}).bind(all);
		all[name + '_'] = dustify(all[name]);
		function DbObject(data){
			var self = this;
			_.each(data, function(value, key){
				self[key] = value;
			});
			_.each(model.relations, function(relation, name){
				self[name] = (function(cb){
	  			var self =  this;
	  			var rel = model.relations[name];
	  			var condition = {};
	  			_.each(rel.join, function(foreign, own){
	  				 condition[foreign] = self[own];
	  			});
	  			all[rel.model](condition, cb);
	  		}).bind(self)
				self[name + '_'] = dustify(self[name]);
			});

  		_.each(model.methods, function(method, name){
  			self[name] = method.bind(self);
  			self[name + '_'] = dustify(method);
  		});
		}

		collection.create = DbObject;
	});
	return all;
}

module.exports = makeCollections;

