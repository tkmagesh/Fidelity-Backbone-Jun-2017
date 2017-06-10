define(['Bug', 'backbone'], function(Bug, Backbone){
	var BugsCollection = Backbone.Collection.extend({
		model : Bug,
		removeClosed : function(){
			this.forEach(function(model){
				if (model.get('isClosed')){
					model.destroy();
				}
			});
		},
		getClosedCount : function(){
			return this.reduce(function(result, model){
				return model.get('isClosed') ? ++result : result;
			},0);
		}
	});
	return BugsCollection;
});
	