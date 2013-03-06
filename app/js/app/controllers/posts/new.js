App.PostsNewController = Ember.ObjectController.extend({
  save: function () {
    this.store.commit();
    this.content.addObserver('id', this, 'afterSave');
  },
  cancel: function () {
    this.content.deleteRecord();
    this.transitionToRoute('posts.index');
  },
  afterSave: function () {
    this.content.removeObserver('id', this, 'afterSave');
    this.transitionToRoute('post', this.content);
  }
});
