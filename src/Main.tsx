import * as React from 'react';
import { Platform, View, Button } from 'react-native';
import { BodyText, HeaderText } from './Components/TextComponents';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';

export const Main = () => <Navigator />;

const Home = (props: {
    navigation: NavigationScreenProp<{}, {}>;
}) => {
        return (
            <View style={{flex: 1, backgroundColor: 'blue'}}>
                <HeaderText>HOME</HeaderText>
                <Button onPress={() => props.navigation.navigate('About')} title='About' accessibilityLabel='About' />
            </View>
        );
};

class About extends React.Component<{
    navigation: NavigationScreenProp<{}, {}>;
}> {
    private get aOrAn() {
        return Platform.select({
            android: 'an ',
            ios: 'an ',
            default: 'a ',
        });
    }

    private get osName(): string {
        return Platform.select({
            android: 'Android',
            ios: 'iOS',
            macos: 'macOS',
            windows: 'Windows',
            default: Platform.OS,
        });
    }

    render() {
        const p = Platform.OS;
        return (
            <View style={{flex: 1, backgroundColor: 'yellow'}}>
                <BodyText>
                    { 'This is SPARTA ' + this.aOrAn }
                    <HeaderText>
                        { this.osName }
                    </HeaderText>
                    { ' app' }
                </BodyText>
                <Button onPress={() => this.props.navigation.goBack()} title='Back' accessibilityLabel='Back' />
            </View>
        );
    }
}

export const Navigator = StackNavigator({
    Home: {screen: Home},
    About: {screen: About},
});
