get '/person/:person' do
  @person = params[:person]
  haml :"/person/index"
end

def readFile(file)
  File.write(file, "") unless File.file? file
  lines = File.readlines(file)
  lines.map{|line| line.chomp}
end

def addToFile file, text
  oldText = readFile(file)
  newText = "#{oldText.join "\n"}\n#{text}"
  newText = text if oldText == []
  File.write(file, newText)
end

def deleteFromFile file, position
  oldText = readFile(file)
  i = 0
  newText = []
  while i < oldText.size
    newText << oldText[i] unless i == position
    puts newText unless i == position
    i = i + 1
  end
  
  File.write(file, newText.join("\n"))
end

get '/person/:person/pictures' do
  @files = Dir.entries "public/#{params[:person]}"
  @files.select!{|file| file if file != "." && file != ".."}
  @person = params[:person]
  haml :"/person/pictures"
end

get '/person/:person/:name' do
  @page = params[:name]
  @person = params[:person]
  if @page =~ /rb|db/
    redirect :"/home"
  else 
    @text = readFile(File.join(params[:person], @page))
    haml :"/person/showFile"
  end
end

post '/person/:person/:name' do
  page = params[:name]
  addToFile File.join(params[:person], page), params[:text]
  redirect :"/person/#{params[:person]}/#{page}"
end

post '/person/:person/delete/:name' do
  page = params[:name]
  deleteFromFile File.join(params[:person], page), params[:position].to_i
  redirect :"/person/#{params[:person]}/#{page}"
end
