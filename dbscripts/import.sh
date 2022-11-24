#!/bin/sh

export CONN_STR='localhost:27272'
export CATALOGUE_BE='http://CATALOG'
export RAPP_BE='http://RAPP'
export TRANSLATOR_BE='http://TRANSLATOR'
export SM_BE='http://SM'
export OSM_BE='http://OSM'

export XRM_DISCOVERY_API_KEY='111'
export XRM_TRANSLATOR_API_KEY='222'
export RAPP_DISCOVERY_API_KEY='333'
export SLICE_DISCOVERY_API_KEY='444'
export OSM_API_KEY='555'

mongorestore --port 27272 --drop --archive=gravitee.gz -d gravitee --gzip
mongo --eval "var connStr='$CONN_STR'; var CATALOGUE_BE='$CATALOGUE_BE'; var RAPP_BE='$RAPP_BE'; var TRANSLATOR_BE='$TRANSLATOR_BE'; var SM_BE='$SM_BE'; var OSM_BE='$OSM_BE'; var XRM_DISCOVERY_API_KEY='$XRM_DISCOVERY_API_KEY'; var XRM_TRANSLATOR_API_KEY='$XRM_TRANSLATOR_API_KEY'; var RAPP_DISCOVERY_API_KEY='$RAPP_DISCOVERY_API_KEY'; var SLICE_DISCOVERY_API_KEY='$SLICE_DISCOVERY_API_KEY'; var OSM_API_KEY='$OSM_API_KEY'" import.js