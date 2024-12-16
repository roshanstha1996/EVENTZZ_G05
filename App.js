import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './screens/HomeStack';


/*
Navigation Container
npm install @react-navigation/native

npm install @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

npm install @react-navigation/bottom-tabs

npm install --save react-native-vector-icons

npm install firebase
npm install axios
*/


export default function App() {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
}
