window.App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});

App.Table = DS.Model.extend({
	name: DS.attr("string")
});

App.Table.FIXTURES = [
  {id: 1, name: "Table 1"},
  {id: 2, name: "Table 2"},
  {id: 3, name: "Table 3"},
  {id: 4, name: "Table 4"},
  {id: 5, name: "Table 5"},
  {id: 6, name: "Table 6"}
];