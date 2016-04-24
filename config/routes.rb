Rails.application.routes.draw do

  namespace :ajax do
    resources :messages
    resources :channels
  end

  resources :channels

  devise_for :users
  root 'channels#show'

end
