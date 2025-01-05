#Production
git reset --hard
git checkout master
git pull origin master

npm i yarn -g
yarn install
yarn run build
yarn run start:prod
#Development