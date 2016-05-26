#!/bin/bash
cd `dirname $BASH_SOURCE`
for i in *.svg
do
    name=`basename $i .svg`
    inkscape --export-png=$name.png $i > /dev/null
    optipng -q -o7 -strip all $name.png
done
