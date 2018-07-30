# React Native Todo App with Bluetooth Demo

----
## Requires
  - Node
  - Xcode
  - JSON Server

----
## Installing
  - clone this repo
  - cd into project's root folder
  - run `npm install`

----
## Starting Up (iOS)
  - cd into project's root folder
  - open App.js and add your local IP address in for the two json server calls.
  - run `json-server --host XXX.XXX.X.XXX db.json` with the same local IP address
  - run `react-native run-ios` in a new terminal window from the project's root
  - a new terminal window is spawned and the app should open in your iOS simulator. The first time you do this there are one or two more instructions that appear in the terminal.

----
## Starting Up (Android)
  - cd into project's root folder
  - open App.js and add your local IP address in for the two json server calls.
  - run `json-server --host XXX.XXX.X.XXX db.json` with the same local IP address
  - run `react-native run-android` in a new terminal window from the project's root
  - More to come. These steps have not been confirmed yet.
