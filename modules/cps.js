var add = function(a, b, cb){
	setTimeout(function(){
		cb(a+b);
	}, 1);
}

var x = 1, y = 2, z = 3;
var l = 77;
add(x, y, function(xy){
	l = xy;
	add(xy, z, function(xyz){
		console.log(xyz);
		console.log('kk ' + l);
	})
})
console.log('ss ' + l);


var x = 1, y = 2, z = 3;
var l = 77;
await { 
   add(x, y, defer(xy); 
}

l = xy;
await { add(xy, z, defer(xyz); }
console.log(xyz);
console.log('kk ' + l);






var sum = 0, i = 0;
function loop(cb){
	if(i<10){
		body(cb);
	} else {
		cb();
	}
}
function body(cb){
	add(sum, i, function(_res){
		sum = _res;
		sum(i, 1, function(_res){
			i = _res;
      ...
			loop(cb);
		})
	})
}

loop(function(){
	console.log('sum ' + sum);
});


