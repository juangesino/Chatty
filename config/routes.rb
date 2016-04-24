Rails.application.routes.draw do

  namespace :ajax do
    resources :messages
    resources :channels
  end

  resources :channels
  # resources :groups
  get '/groups/join' => 'groups#join', as: :join_group

  devise_for :users
  root 'channels#show'

end
