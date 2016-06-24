class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.string :name
      t.integer :amount
      t.string :category
      t.string :due_date

      t.timestamps null: false
    end
  end
end
