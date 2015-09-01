class Game < ActiveRecord::Base
  validate :game_must_have_two_players

  has_many :player_games
  has_many :players, through: :player_games

  def game_must_have_two_players

  end

  def self.done?(id)
    if Game.find(id).winner_id.nil?
      false
    else
      true
    end
  end
end
