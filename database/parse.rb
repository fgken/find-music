# encoding: utf-8

f = open("tmp.csv")

data = ""

f.each do |line|
	if line.chomp[0] != nil && line.chomp[0] == "ベ" then
		data += "\n"
	end
	data += line.chomp
end

#puts data

arr = []

data.each_line do |line|
	arr.push line.split("AAA").map(&:chomp)
end

arr.each do |music|
	if music[2] != nil then
		music[2] = music[2].downcase.gsub(" ", "").gsub(":", ",").split(",")
#		0.step(tmp.length-1, 2) do |i|
#			p tmp[i] + " " + tmp[i+1]
#		end
	end
end

hash = []
arr.each_with_index do |music, i|
	if music[0] != [""] && music[1] != nil && music[2] != nil then
		hash[i] = {"artist"=>music[0], "name"=>music[1]}
		#p music[2]
		0.step(music[2].length-1,2) do |j|
			hash[i][music[2][j]] = music[2][j+1]
		end
	end
end

puts "artist,name,fl,ob,cl,fg,tp,tb,hr,tuba,timp,others"

hash.each do |line|
	if line != nil then
		#p line
		print line["artist"] + ","
		print line["name"] + ","
		print line["fl"]  if line["fl"] != nil
		print ","
		print line["ob"]  if line["ob"] != nil
		print ","
		print line["cl"]  if line["cl"] != nil
		print ","
		print line["fg"]  if line["fg"] != nil
		print ","
		print line["tp"]  if line["tp"] != nil
		print ","
		print line["tb"]  if line["tb"] != nil
		print ","
		print line["hr"]  if line["hr"] != nil
		print ","
		print line["tuba"] if line["tuba"] != nil
		print ","
		print line["timp"] if line["timp"] != nil
		print ","
		# other
		line.delete("artist")
		line.delete("name")
		line.delete("fl")
		line.delete("ob")
		line.delete("cl")
		line.delete("fg")
		line.delete("tp")
		line.delete("tb")
		line.delete("hr")
		line.delete("tuba")
		line.delete("timp")
		line.each do |key,val|
			print key+"="+val+" "
		end
		puts ""
	end
end


