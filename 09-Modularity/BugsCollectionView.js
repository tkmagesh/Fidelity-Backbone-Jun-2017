define(['jquery', 'backbone', 'BugView', 'text!bugsCollectionTemplate.html'], function($, Backbone, BugView, bugsCollectionTemplate){
	var BugsCollectionView = Backbone.View.extend({
		//React to collection changes
		initialize : function(){
			this.listenTo(this.collection, 'add', this.renderNewBug);
			this.listenTo(this.collection, 'all', this.updateStats);
		},
		updateStats : function(){
			var total = this.collection.length,
				closedCount = this.collection.getClosedCount();
			this.$('.stats > .closed').html(closedCount);
			this.$('.stats > .total').html(total);
		},
		renderNewBug : function(model, collection){
			var newBugView = new BugView({model : model})
			newBugView.render().$el.appendTo(this.$('.list > ol'));
		},
		//React to user actions
		events : {
			'click #btnAddNew' : 'triggerAddNew',
			'click #btnRemoveClosed' : 'triggerRemoveClosed'
		},
		triggerAddNew : function(){
			var bugName = this.$('#txtBugName').val();
			var newBug = {name : bugName, createdAt : new Date()};
			this.collection.add(newBug);
		},
		triggerRemoveClosed : function(){
			this.collection.removeClosed();
		},

		render : function(){
			this.$el.html(bugsCollectionTemplate);
			return this;
		}
	});
	return BugsCollectionView;
});