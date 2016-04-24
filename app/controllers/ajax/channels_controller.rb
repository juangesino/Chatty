module Ajax
  class ChannelsController < Ajax::AjaxController
    respond_to :json
    before_action :set_channel, only: [:show, :edit, :update, :destroy]
    before_action :set_group

    def index
      @channels = @group.channels
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
      def set_channel
        @channel = Channel.find(params[:id])
      end

      def set_group
        if session[:group_id]
          @group = Group.find(session[:group_id])
        else
          @group = current_user.groups.first
          session[:group_id] = @group.id
        end
      end

      def channel_params
        params.permit(:name)
      end
  end
end
