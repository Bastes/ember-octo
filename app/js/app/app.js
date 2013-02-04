(function () {
  var App = Ember.Application.create();
  window.App = App;

  App.Router.map(function () {
    this.route('posts', {path: '/'});
    this.resource('posts');
    this.resource('post', {path: '/posts/:post_id'});
  });

  App.PostsRoute = Ember.Route.extend({
    model: function() {
      return App.Post.find();
    },
    setupController: function (controller, model) {
      controller.set('posts', model);
    }
  });

  App.PostRoute = Ember.Route.extend({
    model: function(params) {
      return App.Post.find(params.post_id);
    },
    setupController: function (controller, model) {
      this._super()
      controller.set('post', model);
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
    var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        zeroPad = function (value) { return (value < 10 ? '0' : '') + value };
    return year + '-' + zeroPad(month) + '-' + zeroPad(day);
  });

  Ember.Handlebars.registerBoundHelper('paragraphed', function (string) {
    return new Handlebars.SafeString(string.
      replace(/^\s*/, '<p>').
      replace(/\s*$/, '</p>').
      replace(/\n{2,}/g, "</p><p>").
      replace(/\n/g, '<br/>'));
  });
})();
