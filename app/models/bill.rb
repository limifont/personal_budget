class Bill < ActiveRecord::Base
  validates_presence_of :name, :amount, :category, :due_date
  validates :category, inclusion: {in: CATEGORIES}
  
  CATEGORIES = ["Food", "Home", "Health", "Recreation", "Transportation"]

  def self.categories
    CATEGORIES
  end
end
