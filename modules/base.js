var _ = require('underscore');

_.str = require('underscore.string');
_.mixin(_.str.exports());
_.str.include('Underscore.string', 'string');
	
Function.prototype.dustify = function(){
	var async = this;
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
		if(type == 'undefined'){
			return "";
		} else if(type == 'string'){
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
		var res;
		if(compiled == ''){
			res = '';
		} else {
			res = " where " + compiled + " ";
		}
		return res;
	}

	function makeFrom(source){
		return " from " + source.table + " ";
	}
	
	function as(alias, value){
		return value + " as " + alias;
	}
	
	function makeColumns(columns){
		var type = typeof(columns);
		if(type == 'undefined'){
			return " * ";
		}	else if(type == 'string'){
			return columns;
		} else if(type == 'array'){
			return _(columns).map(makeColumns).reduce(function(a, b){
				return a==""? b: a + ", " + b
			}, "");
		} else if(type == 'object'){
			return _(columns).reduce(function(a,b,c){
				return a==""? as(c,b): a + ", " + as(c,b)
			}, "")
		}
	};

	function makeSelect(select){
		return res = "select " + makeColumns(select);
	}
	
	function makePage(page){
		if(page === undefined){
			return " ";
		}
		return " limit " + page.count + " offset " + page.count * (page.num - 1);
	}

	function ord(column, dir){
		return column + " " + dir;
	}

	function makeOrder(order){
		if(_.isString(order)){
			return order;
		} else if(_.isArray(order)){
			return _(order).map(makeCondition).reduce(function(a, b){
				return a==''? b: a + ", " + b;
			}, "");
		} else if(_.isObject(order)){
			return _(order).reduce(function(a,b,c){
				return a==''? ord(c,b): a + " , " + ord(c,b)
			}, "")
		}
	}

	function makeOrderBy(order){
		if(order === undefined){
			return " ";
		}
		return " order by " + makeOrder(order);
	}
	var getMany = function(params, cb){
		var self = this;
		var sql;
		var result = [];
		if(typeof(params) == 'function'){
			cb = params;
			params = '';
		} 
		if(params === undefined){
			params = {};
		}
		if(params.sql){
			sql = params.sql;
		} else {
			select = makeSelect(params.select);
			from = makeFrom({table: this.model.table});
			where = makeWhere(params.where);
			order = makeOrderBy(params.order);
			page = makePage(params.page);
			sql = select + from + where + order + page;  
		}
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
	DbCollection.prototype.getMany = getMany;

	_.each(models, function(model, name){
		var collection = new DbCollection(model);
	
		var getObj = (function(condition, cb){
			collection.getMany(condition, cb);
		}).bind(all);

		var getObj2 = function(condition, cb){
			if((cb === undefined) && (typeof(condition)!= 'function')){
		  	var ret = function(cb){
		  		getObj(condition, cb);
		  	}
				return ret;
			} else {
				getObj(condition, cb);
			}
		}
		all[name] = getObj2;
		all[name + '_'] = getObj2.dustify();
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
	  			all[rel.model]({where: condition}, cb);
	  		}).bind(self)
				self[name + '_'] = self[name].dustify();
			});

  		_.each(model.methods, function(method, name){
  			self[name] = method.bind(self);
  			self[name + '_'] = method.dustify();
  		});
		}

		collection.create = DbObject;
	});
	
	return all;
}

module.exports = makeCollections;

