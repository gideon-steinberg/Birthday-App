$DB.create_table? :comment do
  primary_key :id
  String :fact
  String :category
  String :person
  bit :disabled
end