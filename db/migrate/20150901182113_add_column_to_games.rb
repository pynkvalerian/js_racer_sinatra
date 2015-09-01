class AddColumnToGames < ActiveRecord::Migration
  def change
    add_column :games, :time_completed, :string
  end
end
