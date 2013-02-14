(function () {
  Ember.Handlebars.registerBoundHelper('paragraphed', function (string) {
    if (!string) return '';
    return new Handlebars.SafeString(string.
      replace(/^\s*/, '<p>').
      replace(/\s*$/, '</p>').
      replace(/\n{2,}/g, "</p><p>").
      replace(/\n/g, '<br/>'));
  });
})();
