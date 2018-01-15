import * as React from 'react';
import { View, Button, Image, Alert, ScrollView, PermissionsAndroid, CameraRoll, GetPhotosReturnType } from 'react-native';
import { HttpExecutor } from './Shared/HttpExecutor';
import { BodyText } from './Components/TextComponents';
import { Progress } from './Components/Progress';

export class Camera extends React.Component<{
    navigation: any,
}, {
    canUseCamera: boolean | null;
    photos: GetPhotosReturnType | null;
}> {
    constructor(props) {
        super(props);

        this.state = {
            canUseCamera: null,
            photos: null,
        };
    }

    async checkPermissions() {
        let canUseCamera = await PermissionsAndroid.check('android.permission.CAMERA');
        if (!canUseCamera)
            canUseCamera = await PermissionsAndroid.request('android.permission.CAMERA', {
                title: 'Requesting access to use the camera',
                message: 'We need access to the camera to allow you to take and instantly upload photos',
            }) === 'granted';

        const storage = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE; // 'android.permission.READ_EXTERNAL_STORAGE';
        let canReadStorage = await PermissionsAndroid.check(storage);
        if (!canReadStorage)
            canReadStorage = await PermissionsAndroid.request(storage, {
                title: 'Requesting access to storage',
                message: 'We need access to storage so you can select photos/videos to upload',
            }) === 'granted';

        await this.setState({ canUseCamera });
    }

    async getPhotos() {
        if (!CameraRoll || !CameraRoll.getPhotos) {
            console.warn('CameraRoll not a thing');
            return;
        }

        const photos = await CameraRoll.getPhotos({
            assetType: 'All',
            first: 2,
        });

        await this.setState({ photos });
    }

    render() {
        const { canUseCamera, photos } = this.state;
        return (
            <View>
                <Button title='Check permissions' onPress={() => this.checkPermissions()} />
                { canUseCamera === null
                ? <BodyText>Checking permissions ...</BodyText>
                : canUseCamera
                    ? <Button title='Get photos' onPress={() => this.getPhotos()} />
                    : <BodyText>Permission to use camera has been denied.</BodyText> }
                <View>
                    { photos && photos.edges && photos.edges.map((p, i) => {
                        const image = p.node.image;
                        return <Image
                            key={i}
                            source={{ uri: image.uri}}
                            style={{
                                height: image.height,
                                width: image.width,
                            }}
                        />;
                    }) }
                </View>
            </View>
        );
    }
}
