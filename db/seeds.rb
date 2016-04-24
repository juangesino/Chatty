if !Channel.find_by_name('public').present?
  Channel.create(:name => 'public')
end
