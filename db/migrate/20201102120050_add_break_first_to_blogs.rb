class AddBreakFirstToBlogs < ActiveRecord::Migration[5.2]
  def change
    add_column :blogs, :break_first, :integer
  end
end
