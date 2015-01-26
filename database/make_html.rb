# encoding: utf-8
require "csv"
require "erb"

__music_table = CSV.table('music-database.csv')
erb = ERB.new(File.read(ARGV[0]))
puts erb.result(binding)

