all:
	ruby -Eutf-8 build-html.rb database/music-database.csv template/index.html.erb > www/index.html
