#!/bin/bash

echo "Start build docker....!"

docker build --platform linux/arm64 -t tien2712/vani_be .

echo "FINISH!!!"

