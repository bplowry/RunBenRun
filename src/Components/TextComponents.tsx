import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

export const BodyText = (props: { children: React.ReactNode }) => (
    <Text style={styles.body}>
        {props.children}
    </Text>
);

export const HeaderText = (props: { children: React.ReactNode }) => (
    <BodyText>
        <Text style={styles.header}>
            {props.children}
        </Text>
    </BodyText>
);

const styles = StyleSheet.create({
    body: {
        color: 'black',
        fontSize: 16,
    },
    header: { // will be merged with styles.body
        color: 'black',
        fontSize: 32,
        fontWeight: 'bold',
    },
});
