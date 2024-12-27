#!/bin/bash
sudo -i
cd /home/ubuntu

export $(cat gh-token.env | xargs)

git clone https://$GITHUB_TOKEN@github.com/pitroldev/uerj-codeboard-server
cd uerj-codeboard-server

bun install
bun run build

pm2 start ecosystem.config.js
pm2 save
pm2 startup
