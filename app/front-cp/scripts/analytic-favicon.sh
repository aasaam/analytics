#!/bin/bash

rm -rf ./static/_icons \
&& mkdir -p ./static/_icons \
&& cp -r ./node_modules/@aasaam/information/logo/icons ./static/_icons \
&& cp -r ./node_modules/@aasaam/information/logo/icons/favicon-16.png ./static/
