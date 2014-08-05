require 'sqlite3'

$DB = SQLite3::Database.new "stock.db"

$DB.execute "CREATE TABLE IF NOT EXISTS Stocks(Id INTEGER PRIMARY KEY, 
        Name TEXT, Low_Offer INT, High_Bid INT)"
$DB.execute "CREATE TABLE IF NOT EXISTS Person(Id INTEGER PRIMARY KEY, 
        Name TEXT, Money INT)"
$DB.execute "CREATE TABLE IF NOT EXISTS Stocks_Person(Id INTEGER PRIMARY KEY, 
        Person_id INT, stocks_id INT, amount INT)"

def insertPrices csv_string

  originals = $DB.prepare("select * from Stocks").execute
  stocks = []
  originals.each do |row|
    stocks << row[1]
  end
  csv_string.split("\n").each do |str|
    split = str.split('"')
    name = split[1]
    low_offer = split[2].split(",")[2]
    high_bid = split[2].split(",")[1]
    if stocks.include? name
      $DB.execute "Update Stocks set low_offer = #{low_offer} and high_bid = #{high_bid} where name = '#{name}'"
    else 
      $DB.execute "Insert into Stocks (Name, low_offer, high_bid) Values('#{name}', #{low_offer}, #{high_bid})"
    end
  end

end