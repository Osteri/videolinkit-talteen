#!/bin/bash
#
# Make Firefox installer.
#
# Usage: 
# ./make_installer.sh

ARGS=1
E_BADARGS=85   # Wrong number of arguments passed to script.

if [ $# -ne "$ARGS" ]
then
  echo "Usage: `basename $0` version"
  exit $E_BADARGS
fi

install -d installer/
zip -r installer/video-linkit-talteen-$1.xpi background.js icons/ LICENSE manifest.json popup/ README.md
