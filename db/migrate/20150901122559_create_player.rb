class CreatePlayer < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.timestamps null: false
    end
    add_index(:players, :name)
  end
end
