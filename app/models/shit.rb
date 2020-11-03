class Shit < ApplicationRecord
  belongs_to :blog
  validates :shit_time, presence: true
end
