require "csv"

table = CSV.table('music-database.csv')

puts '<table class="instrumentation-table">'
p table[:artist]
p table[1]
