module BlogsHelper

  def rails_env_image_blogs(blogs)
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
