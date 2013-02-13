(function () {
  var App = Ember.Application.create();
  window.App = App;

  App.Router.map(function () {
    this.resource('posts', function () {
      this.route('new');
      this.route('show', {path: '/:post_id'});
      this.route('edit', {path: '/:post_id/edit'});
    });
  });

  App.PostsIndexRoute = Ember.Route.extend({
    model: function() {
      return App.Post.find();
    },
    setupController: function (controller, model) {
      this._super()
      controller.set('posts', model);
    }
  });

  App.PostsNewRoute = Ember.Route.extend({
    model: function () {
      return App.Post.createRecord();
    },
    setupController: function (controller, model) {
      this._super()
      controller.set('content', model);
    }
  });

  App.PostRoute = Ember.Route.extend({
    model: function(params) {
      return App.Post.find(params.post_id);
    },
    setupController: function (controller, model) {
      this._super();
      controller.set('content', model);
    }
  });

  App.PostsShowRoute = App.PostRoute.extend();
  App.PostsEditRoute = App.PostRoute.extend();

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

  App.Store = DS.Store.extend({
    revision: 11
  });

  App.Post = DS.Model.extend({
    title:      DS.attr('string'),
    body:       DS.attr('string'),
    createdAt:  DS.attr('date'),

    comments:   DS.hasMany('App.Comment'),
    categories: DS.hasMany('App.Category')
  });

  Ember.Handlebars.registerBoundHelper('dateFormat', function (date) {
    if (!date) return '';
    var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        zeroPad = function (value) { return (value < 10 ? '0' : '') + value };
    return year + '-' + zeroPad(month) + '-' + zeroPad(day);
  });

  Ember.Handlebars.registerBoundHelper('paragraphed', function (string) {
    if (!string) return '';
    return new Handlebars.SafeString(string.
      replace(/^\s*/, '<p>').
      replace(/\s*$/, '</p>').
      replace(/\n{2,}/g, "</p><p>").
      replace(/\n/g, '<br/>'));
  });
})();
