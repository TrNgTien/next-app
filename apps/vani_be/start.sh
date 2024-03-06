echo "Install Packages"

cd "$(dirname "$0")"

npm install

echo "Run Node"

yarn start
