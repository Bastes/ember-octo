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

  helpers do
    def post_data
      JSON.parse(request.body.read.to_s)['post'].slice('title', 'body')
    end
  end

  get '/' do
    erb :index
  end

  get '/posts' do
    content_type :json
    {posts: Post.all(order: [:created_at.desc])}.to_json
  end

  get '/posts/:id' do |id|
    content_type :json
    {post: Post.get!(id)}.to_json
  end

  post '/posts' do
    content_type :json
    {post: Post.create(post_data.merge(created_at: Time.now))}.to_json
  end

  put '/posts/:id' do |id|
    content_type :json
    @post = Post.get!(id)
    @post.update post_data
    {post: @post}.to_json
  end

  delete '/posts/:id' do |id|
    content_type :json
    status 204
    {post: Post.get!(id).destroy}.to_json
  end

  get '/posts/:id/comments' do |id|
    content_type :json
    {comments: Post.get!(id).comments}.to_json
  end

  get '/categories' do
    content_type :json
    {categories: Category.all}.to_json
  end

  get '/categories/:id/posts' do |id|
    content_type :json
    {posts: Category.get!(id).posts}.to_json
  end
end
