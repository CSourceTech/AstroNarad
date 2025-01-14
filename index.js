
// import { AppRegistry } from 'react-native';
// import App from './App';
// import { Provider } from 'react-redux';
// import {store } from './src/Redux/store';
// import { name as appName } from './app.json';


// const Root = () => (
//     <Provider store={store}>
//       <App />
//     </Provider>
// );

// AppRegistry.registerComponent(appName, () => Root);

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/Redux/store';

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => Root);



