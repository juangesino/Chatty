class MessageDecorator < Draper::Decorator
  delegate_all

  def orientation
    user == h.current_user ? 'right' : 'left'
  end

end
