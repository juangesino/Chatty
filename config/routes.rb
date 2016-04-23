Rails.application.routes.draw do

  devise_for :users
  resources :users
  resources :messages
  root 'home#chat'

end
