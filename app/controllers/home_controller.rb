class HomeController < ApplicationController

  def chat
    @messages = Message.all
  end

end
