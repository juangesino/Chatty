class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :messages
  belongs_to :group

  def image
    "http://www.gravatar.com/avatar/#{Digest::MD5.hexdigest(self.email)}?d=identicon"
  end

end
