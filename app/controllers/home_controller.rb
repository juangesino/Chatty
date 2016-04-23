class HomeController < ApplicationController

  before_action :authenticate_user!

  def chat
    @messages = Message.all
  end

end
