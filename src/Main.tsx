import * as React from 'react';
import { Platform, View, Button } from 'react-native';
import { BodyText, HeaderText } from './Components/TextComponents';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Home } from './Home';
import { About } from './About';
import { Jokes } from './Jokes';
import { Todo } from './Todo';
import { Camera } from './Camera';

export const Main = () => <Navigator />;

const Navigator = StackNavigator({
    Home: {screen: Home},
    About: {screen: About},
    Jokes: {screen: Jokes},
    Todo: {screen: Todo},
    Camera: {screen: Camera},
});
