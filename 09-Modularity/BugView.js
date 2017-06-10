define(['jquery', 'backbone', 'handlebars', 'text!bugItemTemplate.html'], function($, Backbone, Handlebars, bugItemTemplate){
	var BugView = Backbone.View.extend({
			tagName : 'li',
			render : function(){
				if (!this.templateFn){
					this.templateFn = Handlebars.compile(bugItemTemplate);
				}
				this.$el.html(this.templateFn(this.model.toJSON()));
				return this;
			},
			remove : function(){
				this.$el.remove();
			},
			initialize : function(){
				this.listenTo(this.model, 'change', this.render);
				this.listenTo(this.model, 'destroy', this.remove);
			},
			events : {
				'click span.bugname' : 'triggerToggle'
			},
			triggerToggle : function(){
				this.model.toggle();
			}

		});
	return BugView;
});