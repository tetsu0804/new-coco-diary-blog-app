Rails.application.routes.draw do
  root to: 'home#index'
  namespace :api do
    namespace :v1 do
      post '/user', controller: :users, action: :create
      get '/users', controller: :users, action: :index
      post '/login', controller: :sessions, action: :create
      delete '/logout', controller: :sessions, action: :destroy
    end
  end
end
