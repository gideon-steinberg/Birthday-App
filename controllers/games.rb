get '/games/:game' do
  game = params[:game]
  haml :"/games/#{game}"
end