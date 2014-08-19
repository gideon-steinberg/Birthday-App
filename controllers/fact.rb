require 'json'

get '/fact/new' do
  haml :"/fact/new"
end

get '/fact/show' do
  haml :"/fact/show"
end

get '/fact/all' do
  $DB[:data].where(:disabled => 0).all.to_json
end

get '/fact/search/fact/:param' do
  fact = params[:param]
  $DB[:data].where(Sequel.like(:fact, "%#{fact}%") ,:disabled => 0).all.to_json
end

get '/fact/search/source/:param' do
  source = params[:param]
  $DB[:data].where(Sequel.like(:source, "%#{source}%") ,:disabled => 0).all.to_json
end

post '/fact/new' do
  fact = Rack::Utils.escape_html(params[:fact])
  source = Rack::Utils.escape_html(params[:source])
  $DB[:data].insert(:source => source, :fact => fact, :disabled => 0)
  redirect :"/fact/new"
end

post '/fact/delete' do
  $DB[:data].where(:id => params[:id]).update(:disabled => 1)
  redirect :"/fact/show"
end
