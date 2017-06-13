# movie store
Implement a "movie store" (like blockbusters or Netflix). 

### How to run
```sh
  $ yarn install
  $ yarn start
  $ open in browser: http://localhost:3000
```

### How to deploy on heroku

https://movie-store-react.herokuapp.com/#/

```sh
  $ git init
  $ heroku create YOURPROJECTNAME --buildpack https://github.com/mars/create-react-app-buildpack.git (creates the heroku project with the create-react-app buildpack specified)
  $ git add .
  $ git commit -m "YOUR COMMENTS"
  $ git push heroku master
  $ heroku open
```