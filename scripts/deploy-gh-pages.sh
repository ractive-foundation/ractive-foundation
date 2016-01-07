#!/bin/bash

#this script only runs after a successful Travis CI build.
#deploy script based on https://medium.com/philosophy-logic/53a8270e87db

if [ "$TRAVIS_TAG" = "" ]
then
	echo "Nothing to deploy. Exiting"
	exit 0
else
	echo "Deploying tag $TRAVIS_TAG to gh-pages"
	( cd public
	 git init
	 git config user.name "Travis-CI"
	 git config user.email "rf-travis@gmail.com"
	 git add .
	 git commit -m "Deployed to Github Pages"
	 git push --force --quiet "https://${GH_TOKEN}@github.com/ractive-foundation/ractive-foundation.git" master:gh-pages > /dev/null 2>&1
	)
	echo "Deploy complete"
fi
