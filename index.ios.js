/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// import App from './App/Views/Home'
import App from './App/Components/Navigator'

AppRegistry.registerComponent('zhihu', () => App);
