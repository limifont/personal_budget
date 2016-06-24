class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.string :name, null: false
      t.integer :amount, null: false
      t.string :category, null: false
      t.string :due_date, null: false

      t.timestamps null: false
    end
  end
end
