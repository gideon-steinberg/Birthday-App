$DB.create_table? :data do
  primary_key :id
  String :fact
  String :source
  bit :disabled
end