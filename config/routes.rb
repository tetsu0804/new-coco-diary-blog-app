Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'shits/destroy'
    end
  end
  root to: 'home#index'
  namespace :api do
    namespace :v1 do
      post '/user', controller: :users, action: :create
      get '/users', controller: :users, action: :index
      post '/login', controller: :sessions, action: :create
      delete '/logout', controller: :sessions, action: :destroy
      get '/users/:id', controller: :users, action: :show
      patch '/users/:id', controller: :users, action: :update
      delete '/users/:id', controller: :users, action: :destroy
      get '/blog_break_first', controller: :blogs, action: :break_first
      get '/blog_dinner', controller: :blogs, action: :dinner
      post '/blog_new', controller: :blogs, action: :create
      get '/blogs', controller: :blogs, action: :index
      get '/blogs/thismounth', controller: :blogs, action: :thismounth
      get '/blogs_month/:month', controller: :blogs, action: :month
      get '/blogs/:id', controller: :blogs, action: :show
      patch '/blogs/:id', controller: :blogs, action: :update
      delete '/blogs/:id', controller: :blogs, action: :destroy
      get '/shits_all_count', controller: :shits, action: :all_count
      delete '/shits/:id', controller: :shits, action: :destroy
    end
  end
end
