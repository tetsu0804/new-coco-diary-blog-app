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
      shit = Shit.new(shit_time: params[:shit_time], blog_id: blog.id)

      if shit.save
        render json: { blog: blog, shit: shit }
      else
        render json: { blog: blog }
      end
    else
      render json: "日記の作成失敗しました", status: :unauthorized
    end
  end

  def update
    blog = Blog.find(params[:id])

    if blog.update_attributes(blog_params)
      shit = Shit.create(shit_time: params[:shit_time], blog_id: blog.id)
      render json: { blog: blog, shit: shit }
    else
      render json: "編集失敗しました", status: :unauthorized
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
    shits = Shit.where('blog_id = ?', blog.id)

    render json: { blog: blog , user: user, shits: shits}
  end

  def destroy
    blog = Blog.find(params[:id])
    if blog.eyecatch.attached?
      blog.eyecatch.purge
    end
    blog.destroy
    head :no_content
  end

  private

    def blog_params
      if Rails.env.production?
        params.permit(:title, :content, :user_id,:break_first, :dinner, shits_attribute: [ :shit_time ])
      else
        params.permit(:title, :content, :user_id, :image, :break_first, :dinner, shits_attribute: [ :shit_time ])
      end
    end

    def encode_base64(image_file)
      image = Base64.encode64(image_file.download)
      blob = ActiveStorage::Blob.find(image_file[:id])
      "data:#{blob[:content_type]};base64,#{image}"
    end
end
