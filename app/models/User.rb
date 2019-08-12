class User < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates_presence_of :email
  validates_uniqueness_of :email
  has_secure_password

  has_many :services
  has_many :clients
end