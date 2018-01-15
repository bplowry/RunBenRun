import * as React from 'react';
import { TextInputProperties, View, TextInput, StyleSheet } from 'react-native';
import { BodyText } from './TextComponents';

export class RbrTextInput extends React.Component<TextInputProperties & {
    floatingLabelText?: string;
    errorText?: string;
}> {
    render() {
        return (
            <View>
                <TextInput {...this.props} style={[this.props.style, styles.input]} ref={undefined} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 56,
    },
});
