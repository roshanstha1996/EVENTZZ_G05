import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import FavouriteList from './FavouriteList';
import EventDetails from './EventDetails';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (

        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="EventDetails" component={EventDetails} />
            <Stack.Screen name="MyFavourite" component={FavouriteList} />
        </Stack.Navigator>
    );
};

export default HomeStack;
