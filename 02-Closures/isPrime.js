var isPrime = (function (){
	var cache = {};

	function isPrime(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		console.log('processing ', n);
		if (n <= 3){
			cache[n] = true;
		} else {
			cache[n] = true;
			for(var index=2; index < (n/2); index++){
				if (n % index === 0){
					cache[n] = false;
					break;
				}
			}
		}
		return cache[n];
	}
	return isPrime;
})();

var isPrime = (function (){
	
	var cache = {};
	function checkPrime(n){
		console.log('processing ', n);
		if (n <= 3){
			return true;
		}
		for(var index=2; index < (n/2); index++){
			if (n % index === 0){
				return false;
			}
		}
		return true;
	}
	return function(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = checkPrime(n);	
		return cache[n];
	}
	
})();

var isOddOrEven = (function (){
	
	var cache = {};
	function checkOddOrEven(n){
		console.log('processing ', n);
		return n % 2 === 0 ? 'even' : 'odd';
	}

	return function(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = checkOddOrEven(n);	
		return cache[n];
	}
	
})();

function memoize(algoFn){
	var cache = {};
	return function(){
		var key = JSON.stringify(arguments);
		if (typeof cache[key] === 'undefined')
			cache[key] = algoFn.apply(this, arguments);	
		return cache[key];
	}
	
}

function memoize(algoFn, keyGen){
	var cache = {};
	return function(){
		var key = keyGen ? keyGen.apply(this, arguments) : arguments[0];
		if (typeof cache[key] === 'undefined')
			cache[key] = algoFn.apply(this, arguments);	
		return cache[key];
	}
}

var cachedAdd = memoize(
	function(n1, n2){ 
		console.log('processing ', n1, ' and ', n2); 
		return n1 + n2; 
	}
);

var cachedAdd = memoize(
	function(n1, n2){ 
		console.log('processing ', n1, ' and ', n2); 
		return n1 + n2; 
	}, 
	function(){ 
		return JSON.stringify(arguments); 
	}
);

