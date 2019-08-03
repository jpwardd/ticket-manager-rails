class Service < ApplicationRecord
  validates :name, presence: true
  validates :price, presence: true
  validates :category, presence: true
  
  belongs_to :user
end