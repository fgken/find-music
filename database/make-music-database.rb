require 'json'

def get_rand_str len
	(0..len).map{ (65 + rand(26)).chr }.join
end

database = {}

100.times do
	artist = get_rand_str 8
	database[artist] = []
	30.times do
		music = {}
	   	music["name"] = get_rand_str 1+rand(11)
		music["fl"] = rand(3)
		music["ob"] = rand(3)
		music["cl"] = rand(3)
		music["fg"] = rand(3)
		music["tp"] = rand(3)
		music["tb"] = rand(3)
		music["hr"] = rand(3)
		music["tu"] = rand(3)
		music["timp"] = rand(3)
		music["others"] = get_rand_str 1+rand(7)
		database[artist].push music
	end
end

print JSON.generate(database)

