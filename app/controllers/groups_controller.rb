class GroupsController < ApplicationController
  # before_action :set_group, only: [:show, :edit, :update, :destroy]
  skip_before_filter :set_group, only: [:switch]
  skip_before_filter :check_group, only: [:join]

  layout 'not_signed_in'

  def join
    if params[:token].present?
      @group = Group.find_by_code(params[:token])
      if @group.present?
        @group.users << current_user
        redirect_to root_path, notice: 'Joined group successfully.'
      else
        redirect_to join_group_path, alert: 'Invalid token.'
      end
    elsif params[:name].present?
      @group = Group.new(:name => params[:name], :code => Devise.friendly_token[0,6])
      respond_to do |format|
        if @group.save
          @group.users << current_user
          Channel.create(:name => 'general', :group => @group)
          Channel.create(:name => 'random', :group => @group)
          format.html { redirect_to root_path, notice: 'Group was successfully created.' }
        else
          format.html { redirect_to join_group_path, alert: 'Error creating group.' }
        end
      end
    end

  end

  def switch
    if params[:group_id].present? && Group.find(params[:group_id]).present?
      session[:group_id] = params[:group_id]
    end
    redirect_to root_path
  end

  # def index
  #   @groups = Group.all
  # end

  # def show
  # end

  # def new
  #   @group = Group.new
  # end

  # def edit
  # end

  # def create
  #   @group = Group.new(group_params)
  #
  #   respond_to do |format|
  #     if @group.save
  #       format.html { redirect_to @group, notice: 'Group was successfully created.' }
  #       format.json { render :show, status: :created, location: @group }
  #     else
  #       format.html { render :new }
  #       format.json { render json: @group.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # def update
  #   respond_to do |format|
  #     if @group.update(group_params)
  #       format.html { redirect_to @group, notice: 'Group was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @group }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @group.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # def destroy
  #   @group.destroy
  #   respond_to do |format|
  #     format.html { redirect_to groups_url, notice: 'Group was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  private
    def set_group
      @group = Group.find(params[:id])
    end

    def group_params
      params.require(:group).permit(:name, :code)
    end
end
