class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :messages, dependent: :destroy
  has_and_belongs_to_many(:groups, :join_table => "group_users", :foreign_key => "user_id", :association_foreign_key => "group_id")

  def image
    "http://www.gravatar.com/avatar/#{Digest::MD5.hexdigest(self.email)}?d=identicon"
  end

end
