class Group < ActiveRecord::Base
  has_and_belongs_to_many(:users, :join_table => "group_users", :foreign_key => "group_id", :association_foreign_key => "user_id")
  has_many :channels, dependent: :destroy
end
