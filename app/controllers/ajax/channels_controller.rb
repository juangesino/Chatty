module Ajax
  class ChannelsController < Ajax::AjaxController
    respond_to :json
    before_action :set_channel, only: [:show, :edit, :update, :destroy]

    def index
      @channels = Channel.all
      render :json => @channels.to_json
    end

    def show
      @messages = MessageDecorator.decorate_collection(@channel.messages.last(10))
      render :json => @messages.to_json(
        :include => {
          :user => {
            :methods => [:image]
          }
        },
        :methods => [:time, :orientation]
      )
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_channel
        @channel = Channel.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def channel_params
        params.permit(:name)
      end
  end
end
