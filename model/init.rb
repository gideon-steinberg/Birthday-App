require "sequel"
$DB = Sequel.connect('sqlite://sqlite.db', :max_connections=>10)
require_relative 'data.rb'
require_relative 'comment.rb'