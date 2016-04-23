Rails.application.routes.draw do

  namespace :ajax do
    resources :messages
  end

  devise_for :users
  root 'home#chat'

end
