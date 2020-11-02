class AddDinnerToBlogs < ActiveRecord::Migration[5.2]
  def change
    add_column :blogs, :dinner, :integer
  end
end
