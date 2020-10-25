class Api::V1::BlogsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    blogs = Blog.all

    if Rails.env.development?
      blogs.each do |blog|
        if blog.eyecatch.attached?
          blog.blog_image = encode_base64(blog.eyecatch)
        else
          blog.blog_image = "/img/IMG_0883.JPG"
        end
      end
    else
      blogs.each do |blog|
        blog.blog_image = "/img/IMG_0883.JPG"
      end
    end

    render json: { blogs: blogs }
  end

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

  def show
    blog = Blog.find(params[:id])
    user = User.find(blog.user_id)
    if blog.eyecatch.attached?
      blog.blog_image = encode_base64(blog.eyecatch)
    else
      blog.blog_image = "/img/IMG_0883.JPG"
    end
    render json: { blog: blog , user: user}
  end

  private

    def blog_params
      if Rails.env.production?
        params.permit(:title, :content, :user_id)
      else
        params.permit(:title, :content, :user_id, :image)
      end
    end

    def encode_base64(image_file)
      image = Base64.encode64(image_file.download)
      blob = ActiveStorage::Blob.find(image_file[:id])
      "data:#{blob[:content_type]};base64,#{image}"
    end
end
