Rails.application.routes.draw do
  root to: 'home#index'
  namespace :api do
    namespace :v1 do
      post '/user', controller: :users, action: :create
      get '/users', controller: :users, action: :index
      post '/login', controller: :sessions, action: :create
      delete '/logout', controller: :sessions, action: :destroy
      post '/blog_new', controller: :blogs, action: :create
      get '/blogs', controller: :blogs, action: :index
      patch '/blogs/:id', controller: :blogs, action: :update
      delete '/blogs/:id', controller: :blogs, action: :delete
      get '/blogs/:id', controller: :blogs, action: :show
    end
  end
end
