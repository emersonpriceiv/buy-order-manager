# Simple Buy Order Manager

#### Getting Started ####
* Install Ionic and Cordova:
`npm i -g ionic`
* Change to the project directory, and install dependencies:
`npm i`
* Now the app should run with:
`ionic serve`

#### Using the App ####
Once the app is running, the serve command should open it in a browser (localhost:8100). It will look best in the dev console with a mobile form factor (I use iphone 6/7/8). I've implemented some very simple, but real, authentication. At the prompt, create an account with any fake email (email@place.domain), and a password (6 character min). This account can be used to manage your data from now on.

#### Unit Tests ####
To run the unit tests, complete with per-test output and coverage summary, run `npm test`

#### Tech Stack ####
[Ionic](https://ionicframework.com/) - Used for its mobile first design principles and quick UI development.

[Angular](https://angular.io) - Used for managing state and dependency injection, amoung over things.

[Firebase](https://firebase.google.com/) - Used for authentication and real time database as a service.

#### Future Plans ####
For this mvp, I kept decent code coverage as I developed, but I would like to take more time to reach some of the more difficult corners of the application. From a UI perspective, I kept things bare-boned to focus on functionality and addressed the mobile form factor first. While the app should scale reasonably well due to Ionic's responsive design, it will not be pretty as larger form factors.

