class Blog < ApplicationRecord
  has_one_attached :eyecatch
  attr_accessor :image
  belongs_to :user
  validates :title, presence: true, length: { maximum: 20 }
  validates :content, presence: true, length: { maximum: 300 }

  def eyecatch=(image)
    if image.present?

      prefix = image[/(image|application)(\/.*)(?=\;)/]
      type = prefix.sub(/(image|application)(\/)/, '')
      data = Base64.decode64(image.sub(/data:#{prefix}base64,/, ''))
      filename = "#{Time.zone.now.strftime('%Y%m%d%H%M%S%L')}.#{type}"

      File.open("#{Rails.root}/tmp/#{filename}", "wb") do |f|
        f.write(data)
      end

      eyecatch.detach if eyecatch.attached?
      eyecatch.attach(io: File.open("#{Rails.root}/tmp/#{filename}"), filename: filename)

      FileUtils.rm("#{Rails.root}/tmp/#{filename}")
    end
  end

end