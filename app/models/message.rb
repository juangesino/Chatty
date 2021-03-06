class Message < ActiveRecord::Base
  require 'action_view'
  include ActionView::Helpers::DateHelper

  belongs_to :user
  belongs_to :channel

  validates :text, presence: true

  def time
    self.created_at.to_time.iso8601
  end

end
