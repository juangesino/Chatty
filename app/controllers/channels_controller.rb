class ChannelsController < ApplicationController
  before_action :set_channel, only: [:show, :edit, :update, :destroy]

  # def index
  #   @channels = Channel.all
  # end

  def show
    @messages = @channel.messages
  end

  # def new
  #   @channel = Channel.new
  # end

  # def edit
  # end

  # def create
  #   @channel = Channel.new(channel_params)
  #
  #   respond_to do |format|
  #     if @channel.save
  #       format.html { redirect_to @channel, notice: 'Channel was successfully created.' }
  #       format.json { render :show, status: :created, location: @channel }
  #     else
  #       format.html { render :new }
  #       format.json { render json: @channel.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # def update
  #   respond_to do |format|
  #     if @channel.update(channel_params)
  #       format.html { redirect_to @channel, notice: 'Channel was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @channel }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @channel.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # def destroy
  #   @channel.destroy
  #   respond_to do |format|
  #     format.html { redirect_to channels_url, notice: 'Channel was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  private
    def set_channel
      if params[:id].present?
        @channel = Channel.find(params[:id])
      else
        @channel = Channel.find_by_name('public')
      end
    end

    def channel_params
      params.require(:channel).permit(:name)
    end
end
