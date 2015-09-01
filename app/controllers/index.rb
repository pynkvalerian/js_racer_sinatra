get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/play' do
  #CREATE NEW PLAYERS IF DOESNT EXIST IN DATABASE
  player1_name = params[:player1]
  player2_name = params[:player2]

  player1 = Player.find_or_create_by(name: player1_name)
  player2 = Player.find_or_create_by(name: player2_name)

  #SAVE PLAYERS IDS INTO SESSION
  session[:p1_id] = player1.id
  session[:p2_id] = player2.id

  redirect to('/start_game')

end

get '/start_game' do
  @player1 = Player.find(session[:p1_id])
  @player2 = Player.find(session[:p2_id])


  #CREATE NEW GAME WITH ASSOCIATED PLAYERS
  game = Game.create

  game.players << @player1
  game.players << @player2

  session[:game_id] = game.id

  erb :game
end

post '/games/:id/results' do
  winner_id = params[:winner_id]
  game = Game.find(params[:id])
  game.winner_id = winner_id
  game.save
end