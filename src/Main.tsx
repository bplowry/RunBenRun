import * as React from 'react';
import { Platform, View } from 'react-native';
import { BodyText, HeaderText } from './Components/TextComponents';

export class Main extends React.Component {
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
            <View>
                <BodyText>
                    { 'This is ' + this.aOrAn }
                    <HeaderText>
                        { this.osName }
                    </HeaderText>
                    { ' app' }
                </BodyText>
                <Button onPress={this.props.navigation.goBack} title='Back' accessibilityLabel='Back' />
            </View>
        );
    }
}
