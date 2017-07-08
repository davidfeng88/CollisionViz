class CollisionsController < ApplicationController
  def index
    @collisions = Collision.all
  end

  def import
    Collision.import(params[:file])
    redirect_to root_url, notice: "Data imported!"
  end
end
