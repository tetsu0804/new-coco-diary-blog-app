class CreateShits < ActiveRecord::Migration[5.2]
  def change
    create_table :shits do |t|
      t.time :shit_time
      t.references :blog, foreign_key: true

      t.timestamps
    end
  end
end
