function parseArg(n){
	if (Array.isArray(n)) return add.apply(this, n);
	if (typeof n === 'function') return parseArg(n());
	return isNaN(n) ? 0 : parseInt(n,10);
}
function add(x,y){
	return arguments.length <= 1 ? parseArg(arguments[0]) : parseArg(arguments[0]) + add([].slice.call(arguments, 1));
}



//When a function is invoked as a method of an object
//	this -> object

//When a function is invoked as a 'function'
//  this -> global scope (window)

//Using the 'call' method of the function

//Using the 'apply' method of the function

