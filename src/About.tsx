import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Platform, View, Button, FlatList } from 'react-native';
import { BodyText, HeaderText } from './Components/TextComponents';

export class About extends React.Component<{
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
            ios: 'iOS',
            android: 'Android',
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
                    { 'This is ' + this.aOrAn }
                    <HeaderText>
                        { this.osName }
                    </HeaderText>
                    { ' app' }
                </BodyText>
                <FlatList
                    ListHeaderComponent={<HeaderText>Contributors</HeaderText>}
                    data={[
                        { key: 'Ben Lowry', text: 'Ben Lowry' },
                        { key: 'Person Two', text: 'Person Two' },
                        { key: 'Third Man', text: 'Third Man' },
                        { key: 'Nuther Wun', text: 'Nuther Wun' },
                    ]}
                    renderItem={({item}) => <BodyText>{item.text}</BodyText>}
                />
                <Button onPress={() => this.props.navigation.goBack()} title='Back' accessibilityLabel='Back' />
            </View>
        );
    }
}
