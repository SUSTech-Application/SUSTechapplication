#! /bin/bash

echo "setting up ossutil..."

curl -o ossutil-2.0.6-beta.01091200-linux-amd64.zip \
'https://gosspublic.alicdn.com/ossutil/v2-beta/2.0.6-beta.01091200/ossutil-2.0.6-beta.01091200-linux-amd64.zip'
unzip -j 'ossutil-2.0.6-beta.01091200-linux-amd64.zip'
chmod +x ossutil
./ossutil --version

echo "ossutil setup complete."

echo "clearing bucket..."

export $(cat .env | xargs)

./ossutil rm -rf oss://sustech-application

echo "uploading files..."

./ossutil cp -r ".vitepress/dist" "oss://sustech-application"

echo "succesfully deployed"
