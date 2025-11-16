# Description

An example react native expo app that displays data from `jsonplaceholder` and includes unit tests using jest and react-native testing library.

## Get started

Ensure you have following the react-native documentation on getting your environment setup to run a react-native project.
[environment-setup](https://reactnative.dev/docs/environment-setup) and [set-up-your-environment](https://reactnative.dev/docs/set-up-your-environment)

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Features

HomeScreen:

- Display two buttons to display two views, `Users` and `Posts`.
- Selecting `Users` will display a list of users using user cards in a scroll view on the screen.
- Selecting `Posts` will display a list of posts from users using post cards in a scroll view on the screen without navigating away from the screen.
- Pressing a post card will display the post card and all comments related to that post card on the screen without navigating away from the screen.

## Useful commands

`npm run test:unit` - To run all available unit tests
`npm run lint` - To run linting against available files
`npm run android` - To quick run an android build on a local emulator
`npm run ios` - To quick run an ios build on a local simulator
