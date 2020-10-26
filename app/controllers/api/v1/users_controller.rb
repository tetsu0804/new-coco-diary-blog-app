class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    users = User.all
    render json: { users: users }
  end

  def show
    user = User.find(params[:id])
    render json: { user: user }
  end

  def create
    user = User.new(user_params)
    if user.save
      login(user)
      render json: { user: user, cookie: User.digest(session[:user_id])}
    else
      render json: "ユーザー作成に失敗しました", status: :unauthorized
    end
  end

  def update
    user = User.find(params[:id])
    if user.update_attributes(user_params)
      render json: { user: user }
    else
      render json: "ユーザー作成に失敗しました", status: :unauthorized
    end
  end

  def destroy
    user = User.find(params[:id])
    session.delete(:user_id)
    user.destroy
    head :no_content
  end

  private

    def user_params
      params.permit(:last_name, :first_name, :email, :password, :password_confirmation)
    end
end
