class Player < ActiveRecord::Base
  validates :name, uniqueness: true

  has_many :player_games
  has_many :games, through: :player_games


  def self.find_name(id)
    player = Player.find(id)
    @name = player.name
  end
end
