class Api::V1::BlogsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    blog = Blog.new(blog_params)
    if blog.save
      if Rails.env.development?
        blog.eyecatch = blog_params[:image]
      end
      render json: { blog: blog }
    else
      render json: "日記の作成失敗しました", status: :unauthorized
    end
  end

  private

    def blog_params
      if Rails.env.production?
        params.permit(:title, :content, :user_id)
        else
        params.permit(:title, :content, :user_id, :image)
      end
    end
end
