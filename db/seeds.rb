
arr = ["Food", "Home", "Health", "Recreation", "Transportation"]

30.times do |number|
	Bill.create(name: Faker::Company.name, 
		amount: Faker::Number.between(1, 500),
		category: arr.sample, due_date: Faker::Date.forward(60))
end

puts "Bills"