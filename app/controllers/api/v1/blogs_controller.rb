class Api::V1::BlogsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def thismounth
    this_mounth_blogs = Blog.where(created_at: Time.now.all_month).order('created_at DESC')
    users = User.all

    if Rails.env.development?
      this_mounth_blogs.each do |blog|
        if blog.eyecatch.attached?
          blog.blog_image = encode_base64(blog.eyecatch)
        else
          blog.blog_image = "/img/IMG_0883.JPG"
        end
      end
    else
      this_mounth_blogs.each do |blog|
        blog.blog_image = "/img/IMG_0883.JPG"
      end
    end

    render json: { blogs: this_mounth_blogs, users: users}
  end

  def index
    blogs = Blog.all
    users = User.all
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

    if Rails.env.development?
      this_mounth_blogs.each do |blog|
        if blog.eyecatch.attached?
          blog.blog_image = encode_base64(blog.eyecatch)
        else
          blog.blog_image = "/img/IMG_0883.JPG"
        end
      end
    else
      this_mounth_blogs.each do |blog|
        blog.blog_image = "/img/IMG_0883.JPG"
      end
    end
    render json: { blogs: this_mounth_blogs }
  end

  def break_first
    eat_gram = Blog.eat_select_gram
    break_firsts = eat_gram[:break_first]

    break_first_array_in_hash = break_first_take(break_firsts)
    render json: { break_firsts: break_first_array_in_hash}
  end

  def dinner
    eat_gram = Blog.eat_select_gram
    dinners = eat_gram[:dinner]
    dinner_array_in_hash = dinner_take(dinners)
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

    def break_first_take(break_firsts)
      break_first_array = []
      braek_first_ary = []
      break_firsts.each do |break_first|
        break_first_array.push(break_first.break_first)
      end
      break_first_array_in_hash = break_first_array.group_by(&:itself).map{ |key, value| {key.to_s => value.count} }.to_a

      break_first_array_in_hash.each do |break_first|
        break_first.each do |k, v|
          break_first_hash = {}
          break_first_hash[k] = v
          braek_first_ary.push(break_first_hash)
        end
      end

      return braek_first_ary
    end

    def dinner_take(dinners)
      dinners_array = []
      dinner_ary = []
      dinners.each do |dinner|
        dinners_array.push(dinner.dinner)
      end
      dinnders_array_in_hash = dinners_array.group_by(&:itself).map{ |key, value| {key.to_s => value.count} }.to_a

      dinnders_array_in_hash.each do |dinner|
        dinner.each do |k, v|
          dinner_hash = {}
          dinner_hash[k] = v
          dinner_ary.push(dinner_hash)
        end
      end

      return dinner_ary
    end

end
