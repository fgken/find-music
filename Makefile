TEMPLATE_DIR=$(CURDIR)/template
DEST_DIR=$(CURDIR)/www

all:
	jekyll build -s $(TEMPLATE_DIR) -d $(DEST_DIR)

