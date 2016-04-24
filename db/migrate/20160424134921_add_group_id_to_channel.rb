class AddGroupIdToChannel < ActiveRecord::Migration
  def change
    add_column :channels, :group_id, :integer
  end
end
