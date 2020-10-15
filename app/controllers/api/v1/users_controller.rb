class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    users = User.all
    render json: { users: users }
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: { user: user}
    else
      render json: "ユーザー作成に失敗しました", status: :unauthorized
    end
  end

  private

    def user_params
      params.permit(:last_name, :first_name, :email)
    end
end
