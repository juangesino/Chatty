class Message < ActiveRecord::Base
  require 'action_view'
  include ActionView::Helpers::DateHelper

  belongs_to :user

  def time_ago
    "#{distance_of_time_in_words_to_now(self.created_at)} ago"
  end

end
