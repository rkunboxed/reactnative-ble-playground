# React Native Todo App with Bluetooth Demo

----
## Requires
  - Node
  - Xcode (Mac only)
  - JSON Server
  - Android Studio (Android only)
  - Java 8 (must be version 8 for Android)

----
## Installing
  - clone this repo
  - cd into project's root folder
  - run `npm install`

----
## Starting Up (iOS Simulator on Mac)
  - cd into project's root folder
  - open App.js and add your local IP address in for the two JSON server calls.
  - run `json-server --host XXX.XXX.X.XXX db.json` with the same local IP address
  - run `react-native run-ios` in a new terminal window from the project's root
  - a new terminal window is spawned and the app should open in your iOS simulator. The first time you do this, it will take awhile. There are one or two more instructions that may appear in the terminal.

----
## Starting Up (Android Emulator on Mac)
  - cd into project's root folder
  - open App.js and add your local IP address in for the two JSON server calls.
  - run `json-server --host XXX.XXX.X.XXX db.json` with the same local IP address
  - start up Android Studio emulator
  - run `react-native run-android` in a new terminal window from the project's root
  - install other SDKs as needed (if you get errors)
    - in Android Studio select preferences menu
    - Appearance & Behavior > System Settings > Android SDKs
    - Check the view package details check box to see the options
