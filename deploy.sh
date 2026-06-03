#!/bin/bash

cd /home/ec2-user/apps/REPO

git pull origin main

source venv/bin/activate

pip install -r requirements.txt

pkill -f python || true

nohup python app.py > app.log 2>&1 &
