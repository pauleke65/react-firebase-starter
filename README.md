<!-- prettier-ignore-start -->
# React & Firebase Starter

![react-firebase-starter](https://user-images.githubusercontent.com/68360696/129435412-11320287-3afd-4e9d-8595-7194bc358c47.png)


## Tech Stack

* [Firebase](https://firebase.google.com/) - Firestore database, auth, cloud functions, local emulators
* [React](https://reactjs.org/)
* [Webpack](https://webpack.js.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [React Router](https://reactrouter.com/web)
* [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks/)
* [React Helmet](https://www.npmjs.com/package/react-helmet) - SEO
* [Mocha](https://mochajs.org/) - testing for Firebase
* [ESLint](https://eslint.org/) - based on AirBnB config

### Prerequisites

You will need the following to use this starter: 

* [Node](https://nodejs.org/en/)
* [Java DK](https://docs.oracle.com/en/java/javase/16/install/overview-jdk-installation.html#GUID-8677A77F-231A-40F7-98B9-1FD0B48C346A)
* A Firebase project created in [Firebase Console](https://console.firebase.google.com)
* Install Firebase CLI tools: ```npm install -g firebase-tools```

## Setup Guide

Clone this repo:
```git clone https://github.com/codebusters-ca/react-firebase-starter.git```

Go to the Firebase project directory, run the setup script and follow the prompts:
```cd .\react-firebase-starter\ && npm run setup```

## Usage

Run Firebase Emulators with `npm run emulators`.

In another terminal, launch the app with `npm start`. The app will run on [localhost:3000](http://localhost:3000/). 

If the setup process was successful, you will see `Hello from Firestore Emulator` in the app.

### Build

```npm start```

### Test

```npm run emulators```
In another terminal: `npm test`

You should see a list of 3 tests that all pass. 

### Deploy

```npm run build```

### Loom Video

[Video demo](https://www.loom.com/share/3ce039b9a98c423ea9c1a2432d124cca)

## Contribute

We ❤️ feedback and help from fellow devs! Check out [open issues](https://github.com/codebusters-ca/react-firebase-starter/issues), create a [new one](https://github.com/codebusters-ca/react-firebase-starter/issues/new?labels=bug), or send us a [pull request](https://github.com/codebusters-ca/react-firebase-starter/compare).

## Licence

This project is licensed under the [MIT license](https://github.com/codebusters-ca/react-firebase-starter/blob/main/LICENSE).
<!-- prettier-ignore-end -->
