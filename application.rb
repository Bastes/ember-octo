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
      '/js/vendor/jquery/*.js',
      '/js/vendor/handlebars/*.js',
      '/js/vendor/ember/*.js',
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

  configure :development do
    DataMapper::Logger.new($stdout, :debug)
    DataMapper.setup :default, "sqlite://#{File.expand_path(File.join(__FILE__, '..', 'db.sqlite'))}"
  end

  class Post
    include DataMapper::Resource

    property :id,         Serial
    property :title,      String
    property :body,       Text
    property :created_at, DateTime

    has n, :comments
    has n, :categorizations
    has n, :categories, through: :categorizations
  end

  class Comment
    include DataMapper::Resource

    property :id,         Serial
    property :posted_by,  String
    property :body,       Text
    property :created_at, DateTime

    belongs_to :post
  end

  class Category
    include DataMapper::Resource

    property :id,   Serial
    property :name, String

    has n, :categorizations
    has n, :posts, through: :categorizations
  end

  class Categorization
    include DataMapper::Resource

    property :id, Serial

    belongs_to :category
    belongs_to :post
  end

  DataMapper.finalize
  DataMapper.auto_upgrade!

  get '/' do
    erb :index
  end

  get '/posts' do
    content_type :json
    Post.all.to_json
  end

  get '/posts/:id' do |id|
    content_type :json
    Post.get!(id).to_json
  end

  post '/posts' do
    render Post.create(params[:post]).to_json
  end

  get '/posts/:id/comments' do |id|
    content_type :json
    Post.get!(id).comments.to_json
  end

  get '/categories' do
    content_type :json
    Category.all.to_json
  end

  get '/categories/:id/posts' do |id|
    content_type :json
    Category.get!(id).posts.to_json
  end
end
