App.PostsEditController = Ember.ObjectController.extend({
  save: function () {
    this.store.commit();
    this.transitionToRoute('posts.index');
  },
  cancel: function () {
    this.transitionToRoute('posts.index');
  }
});
