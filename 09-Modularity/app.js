require(['jquery', 'BugsCollection', 'BugsCollectionView'], function($, BugsCollection, BugsCollectionView){
	$(function(){
		var bugs = new BugsCollection();
		var bugsView = new BugsCollectionView({
			collection : bugs
		});
		bugsView.render().$el.appendTo(document.body);
	});
});