class Api::CollisionsController < ApplicationController

  def index
    @collisions = Collision.all

    if (params[:start] && params[:finish])
      @collisions = @collisions.where(time: time_range)
    end

    render "api/collisions/index"
  end

  def show
    @collision = Collision.find(params[:id])
    render "api/collisions/show"
  end

  private

  def time_range
    # params[:timeStart] minutes later than midnight
    # params[:timeInteval] in minutes
    Time.zone = 'Eastern Time (US & Canada)'
    d = Time.parse('2017-06-22')
    offset = Time.parse("0:00", d)
    start = offset + params[:start].to_i.minutes
    finish = offset + params[:finish].to_i.minutes
    start..finish
  end

end
