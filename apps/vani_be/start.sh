echo "Install Packages"

cd "$(dirname "$0")"

yarn install

echo "Run Node"

yarn start
