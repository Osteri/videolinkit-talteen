# Makefile for `videolinkit-talteen` firefox web extension.
# Firefox extensions (or addons) are distributed as xpi's.
# They are just regular zipped files using .xpi postfix.
#
# Make firefox installer aka .xpi file.
# Produce package name based on `git tag`.
#
# Targets: 
# make 		# make *.xpi
# make install  # install *.xpi to firefox
# make clean 	# clean *.xpi
# make all	# all above
NAME := videolinkit-talteen
GIT_ARG := $(shell git rev-list --tags --max-count=1)
GIT_VERSION := $(shell git describe --tags $(GIT_ARG))
NAME_AND_VERSION := $(NAME)-$(GIT_VERSION)
FILES = background.js icons/ LICENSE manifest.json popup/ README.md

# -----------------------------------------------------------------------------
# Check if there are existing *.xpi packages.
# -----------------------------------------------------------------------------
ifneq ($(wildcard installer/$(NAME)-*.xpi),)
  PACKAGE = installer/$(NAME_AND_VERSION).xpi
else 
  PACKAGE = ''
endif

# -----------------------------------------------------------------------------
# Sanity check if current `git tag` has same the version num as manifest.json.
# -----------------------------------------------------------------------------
MANIFEST_VERSION := $(shell grep 'version\"\: \"$(GIT_VERSION)\"' manifest.json)

# -----------------------------------------------------------------------------
# Build addon. 
# -----------------------------------------------------------------------------
default:
	$(MAKE) manifest_version
	@echo 'Making new firefox installer: $(NAME_AND_VERSION).xpi'
	install -d installer/
	zip -r installer/$(NAME_AND_VERSION).xpi $(FILES)

# -----------------------------------------------------------------------------
# Grep manifest.json version string and compare it to the current `git tag`.
# -----------------------------------------------------------------------------
manifest_version:
ifneq ($(MANIFEST_VERSION),)
	@echo 'Version string in manifest.json is same as $(GIT_VERSION).'
else
	@echo '*** Warning: manifest.json version differs from `git tag`' \
		'$(GIT_VERSION). Update your git tag to be equivalent' \
		'as stated in manifest.json version string.'
endif

# -----------------------------------------------------------------------------
# Install addon.
# -----------------------------------------------------------------------------
install:
ifneq ($(PACKAGE),'')
	@echo 'Installing extension to firefox.'
	$(shell firefox '$(PACKAGE)')
else
	@echo 'No package found.' \
		'Try running `make` or `make all` before `make install`.'
endif

# -----------------------------------------------------------------------------
# Clean addon. 
# -----------------------------------------------------------------------------
clean:
	@echo 'Cleaning old installers:'
	rm -f installer/$(NAME)-*.xpi

# -----------------------------------------------------------------------------
# All above. 
# -----------------------------------------------------------------------------
all:
	$(MAKE) clean
	$(MAKE) default
	$(MAKE) install
