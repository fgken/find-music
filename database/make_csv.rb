
puts "artist,name,fl,ob,cl,fg,tp,tb,hr,tuba,timp,others"
100.times do |artist_num|
	10.times do |music_num|
		puts "Artist-#{artist_num},Music-#{music_num},#{rand(3)},#{rand(3)},#{rand(3)},#{rand(3)},#{rand(3)},#{rand(3)},#{rand(3)},#{rand(3)},#{rand(2)},AAA"
	end
end

