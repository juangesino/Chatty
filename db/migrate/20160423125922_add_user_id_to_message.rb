class AddUserIdToMessage < ActiveRecord::Migration
  def change
    add_column :messages, :user_id, :integer
    remove_column :messages, :author
  end
end
