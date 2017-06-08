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

		}
		sort();
		console.table(products);
	});

	describe('Any list by any attribute', function(){
		describe('products by cost', function(){
			//sort()
			//console.table(products);
		});

		describe('products by units', function(){
			//sort();
			//console.table(products);
		});

	});
});

describe('Filter', function(){
	describe('Default Filter (stationary products)', function(){
		//filter()
		//console.table(products);
	});
});