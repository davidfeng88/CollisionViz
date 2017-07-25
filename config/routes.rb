Rails.application.routes.draw do
  # for collision data import from csv
  # root to: 'collisions#index'
  # resources :collisions do
  #   collection { post :import }
  # end

  namespace :api, defaults: {format: :json} do
    resources :collisions, only: [:index, :show]
  end

  root "static_pages#root"

end
