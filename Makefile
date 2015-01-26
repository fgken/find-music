all:
	ruby database/make_html.rb database/music-database.csv database/index.html.erb > index.html
