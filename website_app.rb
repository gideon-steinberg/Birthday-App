require 'rubygems'
require 'sinatra'
require 'Haml'
require 'net/http'

set :bind, "0.0.0.0"
set :port, 80

get '/' do
  haml :index
end

get '/:thing' do
  redirect "/"
end

get '/stocks/price' do
  @stocks = {} 
  csv_string = Net::HTTP.get('download.finance.yahoo.com', '/d/quotes.csv?s=ASBPA.NZ+XRO.NZ+FSF.NZ+AIR.NZ+ASBPA.NZ+CEN.NZ+FBU.NZ+FPH.NZ+GNE.NZ+MELCA.NZ+SKC.NZ+TME.NZ+VCT.NZ+WBC.NZ+WHS.NZ&f=sb2b')
  csv_string.split("\n").each do |str|
    split = str.split('"')
    name = split[1]
    low_offer = split[2].split(",")[2]
    high_bid = split[2].split(",")[1]
    @stocks[name] = [low_offer, high_bid]
  end
  haml :'stocks/price'
end

require './controllers/person.rb'
require './controllers/games.rb'
