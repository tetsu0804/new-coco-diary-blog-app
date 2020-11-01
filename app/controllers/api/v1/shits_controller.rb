class Api::V1::ShitsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def destroy
    shit = Shit.find(params[:id])
    shit.destroy
    head :no_content
  end
end
