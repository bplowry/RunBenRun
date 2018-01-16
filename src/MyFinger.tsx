import * as React from 'react';
import { View, Button, Image, Alert, ScrollView, PermissionsAndroid, CameraRoll, GetPhotosReturnType } from 'react-native';
import { BodyText } from './Components/TextComponents';
import { Progress } from './Components/Progress';
import { Fingerprint } from 'expo';

export class MyFinger extends React.Component<{
    navigation: any,
}, {
    authenticated: boolean;
}> {
    constructor(props) {
        super(props);

        this.state = { authenticated: false };
    }

    componentDidMount() {
        this.auth();
    }

    auth = async () => {
        const hasHardware = await Fingerprint.hasHardwareAsync();
        if (!hasHardware)
            return;

        const enrolled = await Fingerprint.isEnrolledAsync();
        if (!enrolled)
            return;

        const res = await Fingerprint.authenticateAsync();
        this.setState({authenticated: res.success});
    };

    render() {
        const { authenticated } = this.state;
        return (
            <View>
                <BodyText>
                    {authenticated ? 'Authenticated' : 'Touch your finger to the scanner to authenticate ...'}
                </BodyText>
                <Button title='Authenticate' onPress={this.auth} />
            </View>
        );
    }
}
