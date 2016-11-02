Rails.application.routes.draw do
  devise_for :users
  resources :ingredients
  resources :recipes
  root 'application#angular'
end
