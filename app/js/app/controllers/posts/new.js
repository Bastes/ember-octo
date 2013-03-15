App.PostsNewController = Ember.ObjectController.extend({
  save: function () {
    this.store.commit();
    this.transitionToRoute('post', this.content);
  },
  cancel: function () {
    this.content.deleteRecord();
    this.transitionToRoute('posts.index');
  }
});
