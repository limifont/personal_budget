Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    resources :bills
  end

  # ALWAYS KEEP AT THE VERY BOTTOM
  get '*unmatched_route', to: 'home#index'
end
