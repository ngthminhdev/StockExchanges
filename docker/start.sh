#!/bin/bash

cd /SERVICE

yarn add global serve

serve -s -l 3002 build

exec "$@"