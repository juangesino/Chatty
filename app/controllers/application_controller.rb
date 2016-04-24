class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_filter :check_group

  def check_group
    if current_user.present? && current_user.groups.empty?
      redirect_to join_group_path
    end
  end

end
