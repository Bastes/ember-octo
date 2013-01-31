require 'bundler'
Bundler.require

class Application < Sinatra::Base
  set :root, File.dirname(__FILE__)
  register Sinatra::AssetPack

  assets do
    serve '/js',     from: 'app/js'
    serve '/css',    from: 'app/css'
    serve '/images', from: 'app/images'

    js :application, '/js/application.js', [
      '/js/vendor/**/*.js',
      '/js/app/*.js',
      '/js/app/**/*.js'
    ]

    css :application, '/css/application.css', [
      '/css/*.css'
    ]

    js_compression  :jsmin
    css_compression :sass
  end

  get '/' do
    erb :index
  end
end
