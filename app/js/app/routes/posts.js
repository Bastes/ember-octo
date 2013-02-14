(function () {
  var App = window.App;

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
})();
