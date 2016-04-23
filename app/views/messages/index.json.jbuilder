json.array!(@messages) do |message|
  json.extract! message, :id, :author, :text
  json.url message_url(message, format: :json)
end
