var products = [
	{id : 5, name : 'Pen', cost : 30, units : 40, category : 'stationary'},
	{id : 9, name : 'Pencil', cost : 60, units : 70, category : 'stationary'},
	{id : 2, name : 'Len', cost : 20, units : 60, category : 'grocery'},
	{id : 4, name : 'Ten', cost : 50, units : 90, category : 'stationary'},
	{id : 6, name : 'Ken', cost : 70, units : 20, category : 'grocery'},
]

/*
sort
filter
groupBy
*/

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

describe('Default List', function(){
	console.table(products);
});

describe('Sorting', function(){
	describe('Default Sort (products by id)', function(){
		function sort(){
			for(var i=0; i < products.length-1; i++)
				for(var j=i+1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sort();
		console.table(products);
	});

	function sort(list, comparer){
		var comparerFn = null;
		if (typeof comparer === 'function'){
			comparerFn = comparer;
		}
		if (typeof comparer === 'string'){
			comparerFn = function(item1, item2){
				if (item1[comparer] < item2[comparer]) return -1;
				if (item1[comparer] === item2[comparer]) return 0;
				return 1;
			}
		}
		if (!comparerFn) return;
		for(var i=0; i < list.length-1; i++)
			for(var j=i+1; j < list.length; j++)
				if (comparerFn(list[i], list[j]) > 0){
					var temp = list[i];
					list[i] = list[j];
					list[j] = temp;
				}
	}

	describe('Any list by any attribute', function(){
		/*function sort(list, attrName){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}*/
		describe('products by cost', function(){
			sort(products, 'cost');
			console.table(products);
		});

		describe('products by units', function(){
			sort(products, 'units');
			console.table(products);
		});

	});

	describe('Any list by any comparer', function(){
		/*function sort(list, comparerFn){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (comparerFn(list[i], list[j]) > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}*/
		var productComparerByValue = function(p1, p2){
			var p1Value = p1.cost * p1.units,
				p2Value = p2.cost * p2.units;
			if (p1Value < p2Value) return -1;
			if (p1Value === p2Value) return 0;
			return 1;
		}
		describe('products by value [cost * units]', function(){
			
			sort(products, productComparerByValue);
			console.table(products);
		});
		function descending(comparerFn){
			return function(){
				return comparerFn.apply(this, arguments) * -1;
			}
		}
		describe('products by value [cost * units] (descending)', function(){
			var descendingProductComparerByValue = descending(productComparerByValue);
			sort(products, descendingProductComparerByValue);
			console.table(products);
		});

	});
});

describe('Filter', function(){
	describe('Default Filter (stationary products)', function(){
		function filterStationaryProducts(){
			var result = [];
			for(var index=0; index < products.length; index++)
				if (products[index].category === 'stationary')
					result.push(products[index]);
			return result;
		}
		var stationaryProducts = filterStationaryProducts();
		console.table(stationaryProducts);
	});

	describe('Any list by any criteria', function(){
		function filter(list, criteriaFn){
			var result = [];
			for(var index=0; index < list.length; index++)
				if (criteriaFn(list[index]))
					result.push(list[index]);
			return result;
		}
		function negate(criteriaFn){
			return function(){
				return !criteriaFn.apply(this, arguments);
			}
		}

		describe("Filter products by cost", function(){
			var costlyProductCriteria = function(product){
				return product.cost > 50;
			};
			describe("Costly products [cost > 50] ", function(){
				
				var costlyProducts = filter(products, costlyProductCriteria);
				console.table(costlyProducts);
			});

			describe("Affordable products [ cost <= 50 ]", function(){
				/*var affordableProductCriteria = function(product){
					return !costlyProductCriteria(product);
				};*/
				var affordableProductCriteria = negate(costlyProductCriteria);
				var affordableProducts = filter(products, affordableProductCriteria);
				console.table(affordableProducts);
			});

		})
		describe("Filter products by stock", function(){
			var underStockedProductCriteria = function(product){
				return product.units < 50;
			};
			describe("Under stocked products [ units < 50 ]", function(){
				
				var underStockedProducts = filter(products, underStockedProductCriteria);
				console.table(underStockedProducts);
			});

			describe("Well stocked products [ units >= 50 ]", function(){
				/*var wellStockedProductCriteria = function(product){
					return !underStockedProductCriteria(product);
				};*/
				var wellStockedProductCriteria = negate(underStockedProductCriteria)
				var wellStockedProducts = filter(products, wellStockedProductCriteria);
				console.table(wellStockedProducts);
			});
		})
	})
});

describe('GroupBy', function(){
	function groupBy(list, keySelector){
		var result = {};
		for(var index=0; index < list.length; index++){
			var key = keySelector(list[index]);
			/*if (typeof result[key] === 'undefined')
				result[key] = [];*/
			
			result[key] = result[key] || [];
			
			result[key].push(list[index]);	
		}
		return result;
	}
	function printGroup(groupedObj){
		for(var key in groupedObj){
			describe('Key - [' + key + ']', function(){
				console.table(groupedObj[key]);
			});
		}
	}
	describe('Products by category', function(){
		var categoryKeySelector = function(product){
			return product.category;
		};
		var productsByCategory = groupBy(products, categoryKeySelector);
		printGroup(productsByCategory);
	});
	describe('Products by cost', function(){
		var costKeySelector = function(product){
			return product.cost > 50 ? 'costly' : 'affordable';
		};
		var productsByCost = groupBy(products, costKeySelector);
		printGroup(productsByCost);
	});
});