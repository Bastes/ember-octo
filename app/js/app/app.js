(function () {
  var App = Ember.Application.create();
  window.App = App;

  App.Router.map(function () {
    this.resource('posts', function () {
      this.route('new');
      this.route('show', {path: '/:post_id'});
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

  App.PostsShowRoute = Ember.Route.extend({
    model: function(params) {
      return App.Post.find(params.post_id);
    },
    setupController: function (controller, model) {
      this._super();
      controller.set('content', model);
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
