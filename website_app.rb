require 'rubygems'
require 'sinatra'
require 'Haml'
require './helpers/sqlite.rb'
require 'net/http'


set :bind, "0.0.0.0"
set :port, 80

get '/' do
  haml :index
end

get '/:thing' do
  redirect "/"
end

require './controllers/person.rb'

get '/stocks/price' do
  insertPrices Net::HTTP.get('download.finance.yahoo.com', '/d/quotes.csv?s=ASBPA.NZ+XRO.NZ+FSF.NZ+AIR.NZ+ASBPA.NZ+CEN.NZ+FBU.NZ+FPH.NZ+GNE.NZ+MELCA.NZ+SKC.NZ+TEL.NZ+TME.NZ+VCT.NZ+WBC.NZ+WHS.NZ&f=sb2b')
  haml :'stocks/price'
end