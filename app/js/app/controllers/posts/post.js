App.PostController = Ember.ObjectController.extend({
  delete: function () {
    this.get('model').deleteRecord();
    this.transitionToRoute('posts.index');
  }
});
