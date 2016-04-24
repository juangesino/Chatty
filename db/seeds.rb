if !Channel.find_by_name('ChattyGeneral').present?
  Channel.create(:name => 'ChattyGeneral')
end
