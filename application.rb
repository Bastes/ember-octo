require 'bundler'
Bundler.require

require 'active_support/core_ext/hash/slice'
require 'sinatra/twitter-bootstrap'

class Application < Sinatra::Base
  set :root, File.dirname(__FILE__)
  register Sinatra::Ember
  register Sinatra::AssetPack
  register Sinatra::Twitter::Bootstrap::Assets

  ember do
    templates '/js/templates.js', ['app/js/app/templates/**/*.hbs'], relative_to: 'app/js/app/templates'
  end

  assets do
    serve '/js',     from: 'app/js'
    serve '/css',    from: 'app/css'
    serve '/images', from: 'app/images'

    js :application, '/js/application.js', [
      '/js/vendor/jquery/*.js',
      '/js/vendor/handlebars/*.js',
      '/js/vendor/ember/*.js',
      '/js/vendor/**/*.js',
      '/js/app/app.js',
      '/js/app/models/*.js',
      '/js/app/*.js',
      '/js/app/**/*.js',
      '/js/templates.js'
    ]

    css :application, '/css/application.css', [
      '/css/*.css'
    ]

    js_compression  :jsmin
    css_compression :sass
  end

  helpers do
    def post_data
      JSON.parse(request.body.read.to_s)['post'].slice('title', 'body')
    end
  end

  get '/' do
    erb :index
  end
end
