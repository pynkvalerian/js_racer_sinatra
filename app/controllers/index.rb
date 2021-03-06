# HOME PAGE
get '/' do
  # Look in app/views/index.erb
  erb :index
end

# FIND EXISTING PLAYERS OR CREATE NEW PLAYERS
# CREATE NEW GAME
post '/play' do
  #CREATE NEW PLAYERS IF DOESNT EXIST IN DATABASE
  player1_name = params[:player1]
  player2_name = params[:player2]

  player1 = Player.find_or_create_by(name: player1_name.strip)
  player2 = Player.find_or_create_by(name: player2_name.strip)

  #CREATE NEW GAME WITH ASSOCIATED PLAYERS
  game = Game.create

  game.players << player1
  game.players << player2

  #SAVE PLAYERS IDS INTO SESSION
  session[:p1_id] = player1.id
  session[:p2_id] = player2.id

  redirect to("/games/#{game.id}")

end

# DISPLAY GAME PAGE
get '/games/:id' do
  @player1 = Player.find(session[:p1_id])
  @player2 = Player.find(session[:p2_id])
  @games_id = params[:id]

  erb :game
end

# CREATE NEW GAME
get '/new' do
  player1 = Player.find(session[:p1_id])
  player2 = Player.find(session[:p2_id])
  game = Game.create

  game.players << player1
  game.players << player2

  redirect to("/games/#{game.id}")
end

# SUBMIT WINNER ID AND TIME_COMPLETE TO DATABASE
post '/games/:id/results' do
  winner_id = params[:winner_id]
  timer = params[:time_completed]

  game = Game.find(params[:id])
  game.winner_id = winner_id
  game.time_completed = timer
  game.save
  redirect to("/games/#{params[:id]}/results")
end

# DISPLAY RESULTS
get '/games/:id/results' do
  @player1 = Player.find(session[:p1_id])
  @player2 = Player.find(session[:p2_id])

  @games_played_together = []

  @player1.games.each do |game_1|
    @player2.games.each do |game_2|
      if game_1 == game_2
        @games_played_together << game_2.id
      end
    end
  end

  @p1_win = 0
  @p2_win = 0

  @games_played_together.each do |id|

    if Game.find(id).winner_id == @player1.id
      @p1_win += 1
    elsif Game.find(id).winner_id == @player2.id
      @p2_win += 1
    end
  end

  @p1_win
  @p2_win

  erb :results

end











