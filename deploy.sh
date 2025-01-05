#Production
git reset --hard
git checkout master
git pull origin master

npm i yarn -g
yarn install
yarn run build
yarn global add serve
pm2 start "yarn run start:prod" --name=Burak-React
#Development