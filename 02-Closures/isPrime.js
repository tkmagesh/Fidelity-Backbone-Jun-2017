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


isOddOrEven
	n -> 'odd' or 'even'
	

