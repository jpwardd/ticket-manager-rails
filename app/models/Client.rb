class Client < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :phone_number, presence: true
  validates_presence_of :email
  
  belongs_to :user
end