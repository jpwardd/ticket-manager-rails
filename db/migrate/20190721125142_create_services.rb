class CreateServices < ActiveRecord::Migration[5.2]
  def change
    create_table :services do |t|
      t.string :name, null: false
      t.string :price, null: false
      t.string :category, null: false
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
