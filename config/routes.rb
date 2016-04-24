Rails.application.routes.draw do

  namespace :ajax do
    resources :messages
    resources :channels
  end

  resources :channels

  get '/groups/join' => 'groups#join', as: :join_group
  get '/groups/switch' => 'groups#switch', as: :switch_group
  # resources :groups

  devise_for :users

  root 'channels#show'

end
