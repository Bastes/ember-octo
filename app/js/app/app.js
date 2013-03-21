var App = Ember.Application.create();
window.App = App;

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});
