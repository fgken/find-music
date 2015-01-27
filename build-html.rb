# encoding: utf-8
require 'csv'
require 'erb'
require 'htmlentities'

__music_table = CSV.table(ARGV[0])
erb = ERB.new(File.read(ARGV[1]))
puts erb.result(binding)

