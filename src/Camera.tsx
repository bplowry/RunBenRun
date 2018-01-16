import * as React from 'react';
import * as Expo from 'expo';

import { View, Button, Image, Alert, ScrollView, PermissionsAndroid, CameraRoll, GetPhotosReturnType } from 'react-native';
import { HttpExecutor } from './Shared/HttpExecutor';
import { BodyText } from './Components/TextComponents';
import { Progress } from './Components/Progress';

export class Camera extends React.Component<{
    navigation: any,
}, {
    image: { height: number, width: number, uri: string; } | null;
}> {
    static navigationOptions = {
        title: 'Camera',
    };

    constructor(props) {
        super(props);

        this.state = { image: null };
    }

    async takePicture() {
        const res = await Expo.ImagePicker.launchCameraAsync();
        if (!res.cancelled) {
            this.setState({image: res});
        }
    }

    async getPhoto() {
        const res = await Expo.ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'All',
        });

        if (!res.cancelled) {
            this.setState({image: res});
        }
    }

    render() {
        const img = this.state.image;
        return (
            <View>
                <Button title='Take photo' onPress={() => this.takePicture()} />
                <Button title='Select image' onPress={() => this.getPhoto()} />
                { img && <Image
                    style={{
                        height: 200,
                        width:  300,
                    }}
                    source={{ uri:  img.uri }}
                />}
            </View>
        );
    }
}
