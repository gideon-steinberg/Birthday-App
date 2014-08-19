get '/person/:person' do
  @person = params[:person]
  haml :"/person/index"
end

get '/person/:person/pictures' do
  @files = Dir.entries "public/#{params[:person]}"
  @files.select!{|file| file if file != "." && file != ".."}
  @person = params[:person]
  haml :"/person/pictures"
end

get '/person/:person/:category' do
  @person = params[:person]
  @category = params[:category]
  @rows = $DB[:comment].where(:person => @person, :category => @category, :disabled => 0).order(:fact)
  haml :"/person/comment"
end

post '/person/:person/:category' do
  $DB[:comment].insert(:person => params[:person], :category => params[:category], :fact => params[:fact], :disabled => 0)
  redirect :"/person/#{params[:person]}/#{params[:category]}"
end

post '/person/:person/delete/:category' do
  category = params[:category]
  $DB[:comment].where(:id => params[:id]).update(:disabled => 1)
  redirect :"/person/#{params[:person]}/#{category}"
end
