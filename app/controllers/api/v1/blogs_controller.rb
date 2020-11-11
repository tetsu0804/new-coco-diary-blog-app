class Api::V1::BlogsController < ApplicationController
  include BlogsHelper
  skip_before_action :verify_authenticity_token

  def thismounth
    this_mounth_blogs = Blog.where(created_at: Time.now.all_month).order('created_at DESC')
    users = User.all
    blogs = rails_env_image_blogs(this_mounth_blogs)
    render json: { blogs: blogs, users: users}
  end

  def index
    blog_all = Blog.all
    users = User.all
    blogs = rails_env_image_blogs(blog_all)
    render json: { blogs: blogs , users: users}
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
      shit = Shit.new(shit_time: params[:shit_time], blog_id: blog.id)

      if shit.save
        render json: { blog: blog, shit: shit }
      else
        render json: { blog: blog }
      end
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

  def month
    month = Time.zone.parse(params[:month])
    this_mounth_blogs = Blog.where(created_at: month.all_month).order('created_at DESC')
    blogs = rails_env_image_blogs(this_mounth_blogs)

    render json: { blogs: blogs }
  end

  def break_first
    eat_gram = Blog.eat_select_gram
  break_firsts = eat_gram[:break_first]

    break_first_array_in_hash = break_first_take(eat_gram[:break_first])

    render json: { break_firsts: break_first_array_in_hash}
  end

  def dinner
    eat_gram = Blog.eat_select_gram
    dinner_array_in_hash = dinner_take(eat_gram[:dinner])
    render json: { dinners: dinner_array_in_hash}
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
