require 'json'

get '/fact' do
  haml :"/fact/index"
end

get '/fact/new' do
  haml :"/fact/new"
end

get '/fact/show' do
  haml :"/fact/show"
end

get '/fact/all' do
  $DB[:data].all.to_json
end

post '/fact/new' do
  fact = Rack::Utils.escape_html(params[:fact])
  source = Rack::Utils.escape_html(params[:source])
  $DB[:data].insert(:source => source, :fact => fact, :disabled => 0)
  redirect :"/fact/new"
end

post '/fact/delete' do
  $DB[:comment].where(:id => params[:id]).update(:disabled => 1)
  redirect :"/fact/show"
end
