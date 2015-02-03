TEMPLATE_DIR=$(shell pwd)/www

all:
	jekyll build -s $(TEMPLATE_DIR) -d $(TEMPLATE_DIR)/_site

