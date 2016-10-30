Rails.application.routes.draw do
  resources :ingredients
  resources :recipes
  root 'application#angular'
end
