(function () {
  var App = Ember.Application.create();
  window.App = App;

  App.Router.map(function () {
    this.resource('posts');
  });

  App.PostsRoute = Ember.Route.extend({
    model: function() {
      return App.Post.find();
    },
    setupController: function (controller, model) {
      controller.set('content', model);
    }
  });

  App.Store = DS.Store.extend({
    revision: 11
  });

  App.Post = DS.Model.extend({
    title:      DS.attr('string'),
    body:       DS.attr('string'),
    createdAt:  DS.attr('string'),

    comments:   DS.hasMany('App.Comment'),
    categories: DS.hasMany('App.Category')
  });
})();
