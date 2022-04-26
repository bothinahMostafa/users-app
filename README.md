# MyUsersApp

This project are a demo to control some random users data and display them in nice responsive design 

## third parties libararies used 

1. bootstrap 
    - (help to build nice UI design)
2. file-saver 
    - (to export json array to csv) 
3. moment 
    - (to make some manipulations in date objects)
4. ng-lazyload-image 
    - (lazy load large image that may effect application performance)
5. ngx-virtual-scroller 
    - (to handle large number of array item that may over load on the DOM as the total number of elements remains the *same as the user scrolls, just that the current ones are replaced with the next ones)
6. cypress 
    - used for e2e testing

## clone Repo 

git clone https://github.com/bothinahMostafa/users-app.git

## switch to master branch

git checkout master
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma]

## Running end-to-end tests
- Run `npx cypress open` to execute the e2e tests via [cypress]

## Creat and Running docker image
- docker build -t my-users-app-image:latest  .
- docker run -d -p 8080:80 my-users-app-image:latest

# Access you appliction container 
- visit http://localhost:8080/ on your browser

## List docker images
- docker image ls

## List docker running containers
- docker ps


