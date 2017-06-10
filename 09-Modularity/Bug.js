define(['backbone'], function(Backbone){
	var Bug = Backbone.Model.extend({
		name : '',
		isClosed : false,
		toggle : function(){
			this.set('isClosed', !this.get('isClosed'));
		}
	});
	return Bug;
});
