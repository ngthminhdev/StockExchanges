#!/bin/bash

cd /SERVICE

yarn global add serve

serve -s -l 3002 build

exec "$@"