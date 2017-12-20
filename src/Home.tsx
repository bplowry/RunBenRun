import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { HeaderText } from './Components/TextComponents';
import { View, Button } from 'react-native';

export const Home = (props: {
    navigation: NavigationScreenProp<{}, {}>;
}) => {
        return (
            <View style={{flex: 1, padding: 16, justifyContent: 'space-around', backgroundColor: 'blue'}}>
                <HeaderText>HOME</HeaderText>
                <Button onPress={() => props.navigation.navigate('About')} title='About' accessibilityLabel='About' />
                <Button onPress={() => props.navigation.navigate('Jokes')} title='Jokes' accessibilityLabel='Jokes' />
                <Button onPress={() => props.navigation.navigate('Todo')} title='Todo' accessibilityLabel='Todo' />
            </View>
        );
};
