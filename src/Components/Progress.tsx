import { Platform, ProgressBarAndroid, ProgressViewIOS } from 'react-native';
import { BodyText } from './TextComponents';
import * as React from 'react';

export const Progress = () => Platform.select({
    android: <ProgressBarAndroid indeterminate />,
    ios: <ProgressViewIOS />,
    default: <BodyText> ... loading ...</BodyText>,
});
