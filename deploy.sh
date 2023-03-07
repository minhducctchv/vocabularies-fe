#!/usr/bin/env sh

# config base trong vite.config.js    base: '/ten-repo/',

# abort on errors
set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f https://github.com/<USERNAME>/<REPO>.git master:gh-pages
git push -f https://github.com/minhducctchv/vocabularies-fe.git master:gh-pages

cd -