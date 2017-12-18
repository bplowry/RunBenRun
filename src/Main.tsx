import * as React from 'react';
import { Platform, Text } from 'react-native';

export class Main extends React.Component<{

}> {
    render() {
        const p = Platform.OS;
        return <Text>
            { 'This is a' }
            { p === 'ios' ? 'n iOS'
            : p === 'android' ? 'n Android'
            : p === 'macos' ? 'macOS'
            : p === 'windows' ? 'Windows'
            : p }
            { ' app' }
        </Text>;
    }
}
