(function () {
  var App = window.App;

  App.PostsShowController = Ember.ObjectController.extend({
    delete: function () {
      if (confirm('Are you sure?')) {
        this.content.deleteRecord();
        this.store.commit();
        this.transitionToRoute('posts.index');
      }
    }
  });

  App.PostsEditController = Ember.ObjectController.extend({
    headerTitle: 'Edit Post',
    buttonTitle: 'Update',
    save: function () {
      this.store.commit();
      this.transitionToRoute('posts.show', this.content);
    },
    cancel: function () {
      if (this.content.isDirty) this.content.rollback();
      this.transitionToRoute('posts.show', this.content);
    }
  });

  App.PostsNewController = Ember.ObjectController.extend({
    headerTitle: 'New Post',
    buttonTitle: 'Create',
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
      this.transitionToRoute('posts.show', this.content);
    }
  });
})();
