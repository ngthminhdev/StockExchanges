#!/bin/bash

SERVICE="SERVICE"
DEST="./docker"

#Compress
tar -zcvf ${SERVICE}.tgz --exclude="node_modules" *

#Move file
mv ${SERVICE}.tgz ${DEST}/
