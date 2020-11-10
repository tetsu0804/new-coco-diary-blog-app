class Api::V1::ShitsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def destroy
    shit = Shit.find(params[:id])
    shit.destroy
    head :no_content
  end

  def all_count
    first_shit = Shit.first.created_at
    time_now = Time.zone.now
    difference_minuted = time_now - first_shit
    difference_day = (difference_minuted / 60 / 60 / 24).floor
    count = Shit.count
    average = count.to_f / difference_day.to_f
    all_count = [{days_count: difference_day, count: count, average: average.round(1)}]
    render json: {all_count: all_count }
  end
end
