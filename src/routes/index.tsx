import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import About from '../pages/About';

type StackParamList = {
    Home: undefined;
    About: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const Routes: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
    );
};

export default Routes;
